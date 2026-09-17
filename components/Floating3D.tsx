"use client";

import { useEffect, useRef } from "react";

type Placement = {
  src: string;
  /** Element (data-3d="…") the model floats next to. */
  anchor: string;
  /** Point on the anchor's box (0–1) plus a px offset. */
  ax: number;
  ay: number;
  dx: number;
  dy: number;
  /** Largest dimension of the model, in CSS px. */
  size: number;
  /** Resting orientation (radians). */
  yaw: number;
  tilt: number;
};

const MODELS: Placement[] = [
  { src: "/models/sneaker.glb", anchor: "sneaker", ax: 1, ay: 0, dx: -60, dy: 16, size: 110, yaw: -0.6, tilt: 0.35 },
  { src: "/models/cargo-pants.glb", anchor: "pants", ax: 1, ay: 0.5, dx: -22, dy: -4, size: 104, yaw: 0.5, tilt: 0.12 },
  { src: "/models/shirt.glb", anchor: "shirt", ax: 0, ay: 0.5, dx: 44, dy: 8, size: 96, yaw: -0.4, tilt: 0.1 },
];

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
/** Frame-rate independent exponential smoothing. */
const damp = (from: number, to: number, lambda: number, dt: number) =>
  from + (to - from) * (1 - Math.exp(-lambda * dt));

/**
 * Clothing models floating freely around the page cards. A single transparent, fixed,
 * click-through canvas draws all of them; each model follows its anchor element with a
 * slight lag, spins with the scroll, and can be dragged anywhere (it stays where dropped).
 */
export function Floating3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    let disposed = false;
    let cleanup = () => {};

    const start = async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
      const { MeshoptDecoder } = await import("three/addons/libs/meshopt_decoder.module.js");
      const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");
      if (disposed) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.9;

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;
      pmrem.dispose();
      const sun = new THREE.DirectionalLight(0xffffff, 0.9);
      sun.position.set(200, 300, 400);
      scene.add(sun);

      // Perspective camera placed so that 1 world unit == 1 CSS px on the z=0 plane,
      // with the origin at the top-left of the viewport and y pointing down (flipped below).
      const FOV = 30;
      const camera = new THREE.PerspectiveCamera(FOV, 1, 1, 10000);
      let vw = 0;
      let vh = 0;
      const resize = () => {
        vw = window.innerWidth;
        vh = window.innerHeight;
        renderer.setSize(vw, vh, false);
        camera.aspect = vw / vh;
        camera.position.set(0, 0, vh / 2 / Math.tan(THREE.MathUtils.degToRad(FOV / 2)));
        camera.far = camera.position.z * 3;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);
      const toWorld = (px: number, py: number, out: import("three").Vector3) => out.set(px - vw / 2, vh / 2 - py, 0);

      const items = MODELS.map((m) => {
        const root = new THREE.Group(); // screen position + scale
        const spin = new THREE.Group(); // orientation
        root.add(spin);
        root.visible = false;
        scene.add(root);
        return {
          m,
          root,
          spin,
          el: null as HTMLElement | null,
          ready: false,
          x: 0, // current screen position (px, viewport space)
          y: 0,
          ox: 0, // offset the user dragged it by
          oy: 0,
          yaw: m.yaw,
          yawVel: 0,
          pitch: m.tilt,
          appear: 0,
          phase: Math.random() * Math.PI * 2,
        };
      });

      const anchorPoint = (it: (typeof items)[number]) => {
        it.el ??= document.querySelector<HTMLElement>(`[data-3d="${it.m.anchor}"]`);
        if (!it.el) return null;
        const r = it.el.getBoundingClientRect();
        return { x: r.left + r.width * it.m.ax + it.m.dx + it.ox, y: r.top + r.height * it.m.ay + it.m.dy + it.oy };
      };

      const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
      let pending = items.length;
      items.forEach((it) => {
        loader.load(it.m.src, (gltf) => {
          if (disposed) return;
          const model = gltf.scene;
          const bounds = new THREE.Box3().setFromObject(model);
          const size = bounds.getSize(new THREE.Vector3());
          const center = bounds.getCenter(new THREE.Vector3());
          const scale = it.m.size / Math.max(size.x, size.y, size.z);
          model.position.copy(center).multiplyScalar(-scale);
          model.scale.setScalar(scale);
          it.spin.add(model);
          const p = anchorPoint(it);
          if (p) {
            it.x = p.x;
            it.y = p.y;
          }
          it.ready = true;
          it.root.visible = true;
          if (--pending === 0) canvas.classList.add("ready");
          wake();
        });
      });

      // ---- scroll: models trail their anchor a little and spin with scroll speed
      let lastScroll = window.scrollY;
      const onScroll = () => {
        const d = window.scrollY - lastScroll;
        lastScroll = window.scrollY;
        if (!reduced) for (const it of items) it.yawVel += clamp(d, -60, 60) * 0.012;
        wake();
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      // ---- dragging: the canvas is click-through, so hit-test models from window events
      const raycaster = new THREE.Raycaster();
      const ndc = new THREE.Vector2();
      const hit = (cx: number, cy: number) => {
        ndc.set((cx / vw) * 2 - 1, -(cy / vh) * 2 + 1);
        raycaster.setFromCamera(ndc, camera);
        let best: (typeof items)[number] | null = null;
        let bestDist = Infinity;
        for (const it of items) {
          if (!it.ready || it.appear < 0.5) continue;
          const [first] = raycaster.intersectObject(it.spin, true);
          if (first && first.distance < bestDist) {
            best = it;
            bestDist = first.distance;
          }
        }
        return best;
      };

      let drag: { it: (typeof items)[number]; id: number; lx: number; ly: number; lt: number; moved: number } | null = null;
      let suppressClick = false;

      const onPointerDown = (e: PointerEvent) => {
        if (e.button !== 0) return;
        const it = hit(e.clientX, e.clientY);
        if (!it) return;
        e.preventDefault();
        drag = { it, id: e.pointerId, lx: e.clientX, ly: e.clientY, lt: performance.now(), moved: 0 };
        document.documentElement.classList.add("f3d-grabbing");
        wake();
      };
      // On touch, a drag that starts on a model must not scroll the page.
      const onTouchStart = (e: TouchEvent) => {
        const t = e.touches[0];
        if (e.touches.length === 1 && hit(t.clientX, t.clientY)) e.preventDefault();
      };
      const onPointerMove = (e: PointerEvent) => {
        if (!drag) {
          if (e.pointerType === "mouse") hoverX = e.clientX, hoverY = e.clientY, hoverDirty = true, wake();
          return;
        }
        if (e.pointerId !== drag.id) return;
        const now = performance.now();
        const dx = e.clientX - drag.lx;
        const dy = e.clientY - drag.ly;
        const dt = Math.max(8, now - drag.lt) / 1000;
        drag.it.ox += dx;
        drag.it.oy += dy;
        drag.it.x += dx;
        drag.it.y += dy;
        drag.it.yawVel = clamp((dx / dt) * 0.02, -25, 25); // flinging it sideways spins it
        drag.it.pitch = clamp(drag.it.pitch + dy * 0.004, -0.6, 0.9);
        drag.moved += Math.abs(dx) + Math.abs(dy);
        drag.lx = e.clientX;
        drag.ly = e.clientY;
        drag.lt = now;
        wake();
      };
      const onPointerUp = (e: PointerEvent) => {
        if (!drag || e.pointerId !== drag.id) return;
        // A tap on a model gives it a spin instead of moving it.
        if (drag.moved < 6 && !reduced) drag.it.yawVel += 14;
        suppressClick = true;
        setTimeout(() => (suppressClick = false), 0);
        drag = null;
        document.documentElement.classList.remove("f3d-grabbing");
      };
      const onClick = (e: MouseEvent) => {
        if (!suppressClick) return;
        e.preventDefault();
        e.stopPropagation();
      };
      window.addEventListener("pointerdown", onPointerDown, true);
      window.addEventListener("touchstart", onTouchStart, { passive: false, capture: true });
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
      window.addEventListener("click", onClick, true);

      let hoverX = -1;
      let hoverY = -1;
      let hoverDirty = false;
      let hovering = false;

      // ---- render loop (sleeps when nothing on screen is moving)
      let raf = 0;
      let prev = performance.now();
      let elapsed = 0;
      const tmp = new THREE.Vector3();

      const frame = (now: number) => {
        raf = 0;
        const dt = Math.min(0.05, (now - prev) / 1000);
        prev = now;
        elapsed += dt;
        let active = false;

        for (const it of items) {
          if (!it.ready) continue;
          const p = anchorPoint(it);
          if (!p) continue;

          if (drag?.it !== it) {
            // Trail the anchor: glued horizontally, a soft lag vertically while scrolling.
            it.x = reduced ? p.x : damp(it.x, p.x, 14, dt);
            it.y = reduced ? p.y : damp(it.y, p.y, 9, dt);
          }

          const onScreen = it.y > -it.m.size && it.y < vh + it.m.size;
          it.appear = reduced ? (onScreen ? 1 : 0) : damp(it.appear, onScreen ? 1 : 0, 5, dt);

          it.yaw += it.yawVel * dt;
          it.yawVel = damp(it.yawVel, 0, 2.2, dt);
          if (drag?.it !== it) it.pitch = damp(it.pitch, it.m.tilt, 2, dt);

          const float = reduced ? 0 : Math.sin(elapsed * 1.4 + it.phase);
          toWorld(it.x, it.y + float * 5, tmp);
          it.root.position.copy(tmp);
          it.root.scale.setScalar(Math.max(0.001, 0.4 + 0.6 * it.appear) * (drag?.it === it ? 1.08 : 1));
          it.root.visible = it.appear > 0.01;
          it.spin.rotation.set(it.pitch, it.yaw + (reduced ? 0 : Math.sin(elapsed * 0.7 + it.phase) * 0.25), float * 0.04, "YXZ");

          if (
            it.root.visible &&
            (!reduced || drag?.it === it || Math.abs(it.x - p.x) + Math.abs(it.y - p.y) > 0.5 || Math.abs(it.yawVel) > 0.01)
          )
            active = true;
        }

        if (hoverDirty && !drag) {
          hoverDirty = false;
          const over = !!hit(hoverX, hoverY);
          if (over !== hovering) {
            hovering = over;
            document.documentElement.classList.toggle("f3d-hover", over);
          }
        }

        renderer.render(scene, camera);
        if (active && !document.hidden) raf = requestAnimationFrame(frame);
      };
      function wake() {
        if (raf || disposed) return;
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      }
      window.addEventListener("resize", wake);
      document.addEventListener("visibilitychange", wake);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        window.removeEventListener("resize", wake);
        document.removeEventListener("visibilitychange", wake);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("pointerdown", onPointerDown, true);
        window.removeEventListener("touchstart", onTouchStart, true);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
        window.removeEventListener("click", onClick, true);
        document.documentElement.classList.remove("f3d-grabbing", "f3d-hover");
        scene.traverse((obj) => {
          const mesh = obj as import("three").Mesh;
          if (!mesh.isMesh) return;
          mesh.geometry.dispose();
          for (const mat of ([] as import("three").Material[]).concat(mesh.material)) {
            for (const value of Object.values(mat)) if (value instanceof THREE.Texture) value.dispose();
            mat.dispose();
          }
        });
        envTex.dispose();
        renderer.dispose();
      };
    };

    // Don't compete with the first paint: start once the browser is idle.
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 300));
    const cancelIdle = window.cancelIdleCallback ?? clearTimeout;
    const handle = idle(() => start(), { timeout: 1500 });

    return () => {
      disposed = true;
      cancelIdle(handle);
      cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} className="f3d" aria-hidden="true" />;
}
