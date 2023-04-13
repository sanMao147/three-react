import {
  EllipseCurve,
  Vector3,
  Points,
  Euler,
  BufferAttribute,
  BufferGeometry,
  ShaderMaterial
} from 'three'
let flyLine = null
// 飞线变量
let commonUniforms = {
  u_time: { value: 0.0 }
}

const createLine = () => {
  /*  let curve = new EllipseCurve(
    0,
    0, // ax, aY
    10,
    10, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0 // aRotation
  ) */
  // 批量生成飞线
  const initCircleCurveGroup = (number, xr, yr) => {
    let curves = []

    for (let i = 0; i < number; i++) {
      let curve = new EllipseCurve(
        0,
        0, // ax, aY
        xr + 5,
        yr + 5, // xRadius, yRadius
        0,
        2 * Math.PI, // aStartAngle, aEndAngle
        false, // aClockwise
        0 // aRotation
      )
      curves.push(curve)
    }
    return curves
  }

  const initLineMaterial = setting => {
    let number = setting ? Number(setting.number) || 1.0 : 1.0 // 在一个路径中同时存在的个数
    let speed = setting ? Number(setting.speed) || 1.0 : 1.0 // 速度约大越快
    let length = setting ? Number(setting.length) || 0.5 : 0.5 // 单根线的长度0-1之间1代表全满
    let size = setting ? Number(setting.size) || 3.0 : 3.0 // 在最大的地方的大小 默认为3像素
    let color = setting
      ? setting.color || new Vector3(0, 1, 1)
      : new Vector3(0, 1, 1) // 颜色此处以Vector
    let singleUniforms = {
      u_time: commonUniforms.u_time,
      number: { type: 'f', value: number },
      speed: { type: 'f', value: speed },
      length: { type: 'f', value: length },
      size: { type: 'f', value: size },
      color: { type: 'v3', value: color }
    }
    let lineMaterial = new ShaderMaterial({
      uniforms: singleUniforms,
      vertexShader: `
        varying vec2 vUv;
        attribute float percent;
        uniform float u_time;
        uniform float number;
        uniform float speed;
        uniform float length;
        varying float opacity;
        uniform float size;

        void main()
        {
            vUv = uv;
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
            float l = clamp(1.0-length,0.0,1.0);//空白部分长度

            gl_PointSize = clamp(fract(percent*number + l - u_time*number*speed)-l ,0.0,1.) * size * (1./length);

            opacity = gl_PointSize/size;
            gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        #ifdef GL_ES
        precision mediump float;
        #endif

        varying float opacity;
        uniform vec3 color;

        void main(){
            if(opacity <=0.2){
                discard;
            }
            gl_FragColor = vec4(color,1.0);
        }
      `,
      transparent: true
      //blending:THREE.AdditiveBlending,
    })
    return lineMaterial
  }
  // 根据curve和颜色 生成线条
  /**
   * @param curve {THREE.Curve} 路径,
   * @param matSetting {Object} 材质配置项
   * @param pointsNumber {Number} 点的个数 越多越细致
   * */
  const initFlyLine = (curve, matSetting, pointsNumber, type, position) => {
    let points = curve.getPoints(pointsNumber)
    let geometry = new BufferGeometry().setFromPoints(points)

    let length = points.length
    let percents = new Float32Array(length)
    for (let i = 0; i < points.length; i += 1) {
      percents[i] = i / length
    }

    geometry.attributes.percent = new BufferAttribute(percents, 1)

    let lineMaterial = initLineMaterial(matSetting)

    flyLine = new Points(geometry, lineMaterial)
    let euler = new Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0) // 有弧度的曲线
    if (type == 1) {
      flyLine.setRotationFromEuler(euler)
    }
    flyLine.position.x = position.x
    flyLine.position.y = position.y
    flyLine.position.z = position.z
    if (type != 1) {
      flyLine.rotation.x = Math.PI / 2
    }
    flyLine.layers.enable(1)
  }

  // 随机颜色值
  const randomVec3Color = () => {
    return new Vector3(
      Math.random() * 0.6 + 0.4,
      Math.random() * 0.6 + 0.4,
      Math.random() * 0.6 + 0.4
    )
  }

  let curves = initCircleCurveGroup(25, 150, 150)

  for (let curve of curves) {
    initFlyLine(
      curve,
      {
        speed: 0.2,
        number: Math.floor(Math.random() * 9 + 1),
        color: randomVec3Color(),
        size: 4.0
      },
      18000,
      1,
      { x: 0, y: 0, z: 0 }
    )
  }
}
export { flyLine, commonUniforms, createLine }
