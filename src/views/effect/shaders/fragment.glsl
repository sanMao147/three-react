varying vec2 vUv;

void main() {
   /*  float barX = step(0.4, mod(vUv.x * 10.0 - 0.2, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0 - 0.2, 1.0));
    float strength = barX + barY;
    gl_FragColor = vec4(vec3(strength), 1.0); */

    // 图案16
    /* 
    x轴 和 y轴 图案的最小值min
     */
    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    /* float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    gl_FragColor = vec4(vec3(strength), 1.0); */

    // 图案20
   /*  float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    strength *= 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    gl_FragColor = vec4(vec3(strength), 1.0); */

    // 图案21
    float strength = floor(vUv.x * 10.0) / 10.0;
    gl_FragColor = vec4(vec3(strength), 1.0);
}