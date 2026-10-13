/**
 * A restrained, low-alpha cloud and haze layer for the roof-dusk sky plate.
 *
 * The photographic frame remains the source of truth underneath this shader;
 * this layer only adds slow, broad wisps so the hero keeps its natural plate
 * instead of turning into a synthetic colour field.
 */
export const roofDuskFragmentShader = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec4 u_cloudColor;
uniform vec4 u_hazeColor;
uniform vec4 u_shadowColor;
uniform float u_opacity;

out vec4 fragColor;

float hash(vec2 point) {
  return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453);
}

float valueNoise(vec2 point) {
  vec2 cell = floor(point);
  vec2 local = fract(point);
  local = local * local * (3.0 - 2.0 * local);

  float bottom = mix(hash(cell), hash(cell + vec2(1.0, 0.0)), local.x);
  float top = mix(hash(cell + vec2(0.0, 1.0)), hash(cell + vec2(1.0, 1.0)), local.x);
  return mix(bottom, top, local.y);
}

float fbm(vec2 point) {
  float value = 0.0;
  float amplitude = 0.5;

  for (int octave = 0; octave < 4; octave++) {
    value += amplitude * valueNoise(point);
    point = point * 2.03 + vec2(17.3, 11.7);
    amplitude *= 0.5;
  }

  return value;
}

void main() {
  vec2 resolution = max(u_resolution, vec2(1.0));
  vec2 uv = gl_FragCoord.xy / resolution;
  uv.y = 1.0 - uv.y;

  float aspect = resolution.x / resolution.y;
  vec2 point = vec2(uv.x * aspect, uv.y);
  float drift = u_time * 0.018;

  float broad = fbm(point * vec2(1.45, 3.4) + vec2(drift, -drift * 0.19));
  float detail = fbm(point * vec2(3.8, 8.0) + vec2(drift * 1.6, -drift * 0.35));
  float cloud = smoothstep(0.48, 0.78, mix(broad, detail, 0.34));

  float upperCloudBand = smoothstep(0.03, 0.24, uv.y) * (1.0 - smoothstep(0.58, 0.9, uv.y));
  float lowerCloudBand = smoothstep(0.38, 0.55, uv.y) * (1.0 - smoothstep(0.92, 1.0, uv.y));
  float cloudMask = cloud * (upperCloudBand * 0.92 + lowerCloudBand * 0.28);

  vec2 hazeDelta = (uv - vec2(0.91, 0.78)) / vec2(0.88, 0.64);
  float hazeShape = 1.0 - smoothstep(0.2, 1.0, length(hazeDelta));
  float hazeNoise = fbm(point * vec2(2.5, 4.0) + vec2(-drift * 0.4, drift * 0.08));
  float hazeMask = hazeShape * smoothstep(0.38, 0.72, hazeNoise) * smoothstep(0.3, 1.0, uv.y);

  float shadowMix = smoothstep(0.62, 0.9, cloud) * 0.42;
  vec3 wisps = mix(u_cloudColor.rgb, u_shadowColor.rgb, shadowMix);
  vec3 color = mix(wisps, u_hazeColor.rgb, clamp(hazeMask * 1.25, 0.0, 1.0));
  float alpha = u_opacity * clamp(cloudMask * 0.55 + hazeMask * 0.34, 0.0, 1.0);

  fragColor = vec4(color, alpha);
}
`;
