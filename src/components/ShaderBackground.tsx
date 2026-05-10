import { useEffect, useRef } from "react";
import { useSettings } from "@/contexts/useSettings";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_color;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
    mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x),
    u.y);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);

  float gridX = abs(fract(uv.x * 18.0) - 0.5);
  float gridY = abs(fract(uv.y * 18.0) - 0.5);
  float grid = smoothstep(0.48, 0.5, max(gridX, gridY)) * 0.18;

  float scan = 0.5 + 0.5 * sin(uv.y * u_res.y * 1.5 - u_time * 6.0);
  scan = pow(scan, 8.0) * 0.05;

  float n = noise(uv * 4.0 + u_time * 0.05);
  float pulse = smoothstep(0.55, 0.95, n) * 0.25;

  float vignette = 1.0 - smoothstep(0.5, 1.4, length(uv));

  vec3 col = u_color * (grid + scan + pulse) * vignette;
  gl_FragColor = vec4(col, 1.0);
}
`;

const themeColor: Record<string, [number, number, number]> = {
  cyber: [0.0, 0.94, 1.0],
  amber: [1.0, 0.7, 0.2],
  matrix: [0.0, 1.0, 0.4],
};

export const ShaderBackground = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const { theme } = useSettings();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const compile = (src: string, type: number): WebGLShader | null => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const v = compile(VERT, gl.VERTEX_SHADER);
    const f = compile(FRAG, gl.FRAGMENT_SHADER);
    if (!v || !f) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, v);
    gl.attachShader(prog, f);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const a_pos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(a_pos);
    gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 0, 0);

    const u_res = gl.getUniformLocation(prog, "u_res");
    const u_time = gl.getUniformLocation(prog, "u_time");
    const u_color = gl.getUniformLocation(prog, "u_color");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u_res, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const color = themeColor[theme] ?? themeColor.cyber;
    gl.uniform3f(u_color, color[0], color[1], color[2]);

    let raf = 0;
    const start = performance.now();
    const render = (now: number) => {
      gl.uniform1f(u_time, reduced ? 0 : (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduced) raf = requestAnimationFrame(render);
    };
    if (reduced) {
      render(start);
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(prog);
      gl.deleteShader(v);
      gl.deleteShader(f);
      gl.deleteBuffer(buffer);
    };
  }, [theme]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-60"
    />
  );
};
