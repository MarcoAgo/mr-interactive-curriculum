import { useEffect, useRef } from "react";
import { FRAGMENT_SHADER_SOURCE, VERTEX_SHADER_SOURCE } from "./_constants/shader-sources.constants";
import { createShaderProgram } from "./_helpers/create-shader-program.helpers";

const ACCENT_RGB: [number, number, number] = [138 / 255, 124 / 255, 255 / 255];
const BG_RGB: [number, number, number] = [10 / 255, 10 / 255, 11 / 255];
const MAX_DPR = 1.5;
const MOUSE_EASE = 0.045;

export const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const program = createShaderProgram(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
    if (!program) return;

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uAccent = gl.getUniformLocation(program, "uAccent");
    const uBg = gl.getUniformLocation(program, "uBg");

    gl.uniform3f(uAccent, ...ACCENT_RGB);
    gl.uniform3f(uBg, ...BG_RGB);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

    const resize = () => {
      const width = Math.floor(window.innerWidth * dpr);
      const height = Math.floor(window.innerHeight * dpr);
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uResolution, width, height);
    };
    resize();
    window.addEventListener("resize", resize);

    const targetMouse = { x: 0.5, y: 0.5 };
    const mouse = { x: 0.5, y: 0.5 };
    const onPointerMove = (event: PointerEvent) => {
      targetMouse.x = event.clientX / window.innerWidth;
      targetMouse.y = 1 - event.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onPointerMove);

    let rafId = 0;
    let elapsed = 0;
    let lastFrame = performance.now();

    const render = (now: number) => {
      rafId = requestAnimationFrame(render);
      const delta = Math.min(now - lastFrame, 100);
      lastFrame = now;

      if (!reducedMotion) elapsed += delta;

      const ease = reducedMotion ? 1 : MOUSE_EASE;
      mouse.x += (targetMouse.x - mouse.x) * ease;
      mouse.y += (targetMouse.y - mouse.y) * ease;

      gl.uniform1f(uTime, elapsed / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    rafId = requestAnimationFrame(render);

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        return;
      }
      lastFrame = performance.now();
      rafId = requestAnimationFrame(render);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <canvas className="shader-background" ref={canvasRef} aria-hidden="true" />;
};
