import Shanghai from '@/assets/models/shanghai.FBX'
import {
  Group,
  Vector3,
  LineSegments,
  LineBasicMaterial,
  EdgesGeometry
} from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

class City {
  constructor() {
    this.fbxLoader = new FBXLoader()
    // 总群组
    this.group = new Group()
    // 效果群组
    this.effectGroup = new Group()
    this.group.add(this.effectGroup)

    this.time = {
      value: 0
    }
    this.StartTime = {
      value: 0
    }
    this.isStart = false // 是否启动

    // 需要做城市效果的mesh
    const cityArray = ['CITY_UNTRIANGULATED']
    const floorArray = ['LANDMASS']

    this.loadFbx(Shanghai).then(scene => {
      console.log(scene)
      this.group.add(scene)
      // traverse()按照某种次序访问所有节点,且每个节点恰好访问一次
      scene.traverse(child => {
        // 城市效果
        if (cityArray.includes(child.name)) {
          // 建筑
          this.setCityMaterial(child)
          // 添加包围线条效
          this.setRoundLine(child)
        }
        if (floorArray.includes(child.name)) {
          this.setFloor(child)
        }
      })
    })
  }
  // 加载模型
  loadFbx(url) {
    return new Promise((res, rej) => {
      try {
        this.fbxLoader.load(url, obj => {
          res(obj)
        })
      } catch (e) {
        rej(e)
      }
    })
  }
  // 设置建筑mesh
  setCityMaterial(object) {
    // 确定oject的geometry的box size
    object.geometry.computeBoundingBox()
    object.geometry.computeBoundingSphere()
    const { geometry, material } = object
    // 获取geometry的长宽高 中心点
    const { center, radius } = geometry.boundingSphere

    const { max, min } = geometry.boundingBox

    const size = new Vector3(max.x - min.x, max.y - min.y, max.z - min.z)

    material.transparent = true
    material.color.setStyle('#1B3045')

    //     material.onBeforeCompile = shader => {
    //       shader.uniforms.time = this.time
    //       shader.uniforms.uStartTime = this.StartTime

    //       // 中心点
    //       shader.uniforms.uCenter = {
    //         value: center
    //       }

    //       // geometry大小
    //       shader.uniforms.uSize = {
    //         value: size
    //       }

    //       shader.uniforms.uMax = {
    //         value: max
    //       }

    //       shader.uniforms.uMin = {
    //         value: min
    //       }
    //       shader.uniforms.uTopColor = {
    //         value: new THREE.Color('#FFFFDC')
    //       }

    //       // 效果开关
    //       shader.uniforms.uSwitch = {
    //         value: new THREE.Vector3(
    //           0, // 扩散
    //           0, // 左右横扫
    //           0 // 向上扫描
    //         )
    //       }
    //       // 扩散
    //       shader.uniforms.uDiffusion = {
    //         value: new THREE.Vector3(
    //           1, // 0 1开关
    //           120, // 范围
    //           600 // 速度
    //         )
    //       }
    //       // 扩散中心点
    //       shader.uniforms.uDiffusionCenter = {
    //         value: new THREE.Vector3(0, 0, 0)
    //       }

    //       // 扩散中心点
    //       shader.uniforms.uFlow = {
    //         value: new THREE.Vector3(
    //           1, // 0 1开关
    //           10, // 范围
    //           20 // 速度
    //         )
    //       }

    //       // 效果颜色
    //       shader.uniforms.uColor = {
    //         value: new THREE.Color('#5588aa')
    //       }
    //       // 效果颜色
    //       shader.uniforms.uFlowColor = {
    //         value: new THREE.Color('#5588AA')
    //       }

    //       // 效果透明度
    //       shader.uniforms.uOpacity = {
    //         value: 1
    //       }

    //       // 效果透明度
    //       shader.uniforms.uRadius = {
    //         value: radius
    //       }
    //       shader.uniforms.uModRange = { value: 10 } // 范围
    //       shader.uniforms.uModWidth = { value: 1.5 } // 范围

    //       /**
    //        * 对片元着色器进行修改
    //        */
    //       const fragment = `
    // float distanceTo(vec2 src, vec2 dst) {
    // float dx = src.x - dst.x;
    // float dy = src.y - dst.y;
    // float dv = dx * dx + dy * dy;
    // return sqrt(dv);
    // }

    // float lerp(float x, float y, float t) {
    // return (1.0 - t) * x + t * y;
    // }

    // vec3 getGradientColor(vec3 color1, vec3 color2, float index) {
    // float r = lerp(color1.r, color2.r, index);
    // float g = lerp(color1.g, color2.g, index);
    // float b = lerp(color1.b, color2.b, index);
    // return vec3(r, g, b);
    // }

    // varying vec4 vPositionMatrix;
    // varying vec3 vPosition;

    // uniform float time;
    // // 扩散参数
    // uniform float uRadius;
    // uniform float uOpacity;
    // uniform float uModRange;
    // uniform float uModWidth;
    // // 初始动画参数
    // uniform float uStartTime;

    // uniform vec3 uMin;
    // uniform vec3 uMax;
    // uniform vec3 uSize;
    // uniform vec3 uFlow;
    // uniform vec3 uColor;
    // uniform vec3 uCenter;
    // uniform vec3 uSwitch;
    // uniform vec3 uTopColor;
    // uniform vec3 uFlowColor;
    // uniform vec3 uDiffusion;
    // uniform vec3 uDiffusionCenter;

    // void main() {
    // `
    //       const fragmentColor = `
    // vec3 distColor = outgoingLight;
    // float dstOpacity = diffuseColor.a;

    // float indexMix = vPosition.z / (uSize.z * 0.6);
    // distColor = mix(distColor, uTopColor, indexMix);

    // // 开启扩散波
    // vec2 position2D = vec2(vPosition.x, vPosition.y);
    // float mx = mod(vPosition.x, uModRange);
    // float my = mod(vPosition.y, uModRange);
    // float mz = mod(vPosition.z, uModRange);

    // if (uDiffusion.x > 0.5) {
    // // 扩散速度
    // float dTime = mod(time * uDiffusion.z, uRadius * 2.0);
    // // 当前的离中心点距离
    // float uLen = distanceTo(position2D, vec2(uCenter.x, uCenter.z));

    // // 扩散范围
    // if (uLen < dTime && uLen > dTime - uDiffusion.y) {
    //     // 颜色渐变
    //     float dIndex = sin((dTime - uLen) / uDiffusion.y * PI);
    //     distColor = mix(uColor, distColor, 1.0 - dIndex);
    // }

    // // 扫描中间格子
    // if (uLen < dTime) {
    //     if (mx < uModWidth || my < uModWidth || mz < uModWidth ) {
    //         distColor = vec3(0.7);
    //     }
    // }
    // }

    // // 流动效果
    // if (uFlow.x > 0.5) {
    // // 扩散速度
    // float dTime = mod(time * uFlow.z, uSize.z);
    // // 流动范围
    // float topY = vPosition.z + uFlow.y;
    // if (dTime > vPosition.z && dTime < topY) {
    //     // 颜色渐变
    //     float dIndex = sin((topY - dTime) / uFlow.y * PI);

    //     distColor = mix(distColor, uFlowColor,  dIndex);
    // }
    // }

    // gl_FragColor = vec4(distColor, dstOpacity * uStartTime);
    // `
    //       shader.fragmentShader = shader.fragmentShader.replace(
    //         'void main() {',
    //         fragment
    //       )
    //       shader.fragmentShader = shader.fragmentShader.replace(
    //         'gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
    //         fragmentColor
    //       )

    //       /**
    //        * 对顶点着色器进行修改
    //        */
    //       const vertex = `
    // varying vec4 vPositionMatrix;
    // varying vec3 vPosition;
    // uniform float uStartTime;
    // void main() {
    //     vPositionMatrix = projectionMatrix * vec4(position, 1.0);
    //     vPosition = position;
    //     `
    //       const vertexPosition = `
    // vec3 transformed = vec3(position.x, position.y, position.z * uStartTime);
    //     `

    //       shader.vertexShader = shader.vertexShader.replace('void main() {', vertex)
    //       shader.vertexShader = shader.vertexShader.replace(
    //         '#include <begin_vertex>',
    //         vertexPosition
    //       )
    //     }
  }
  // 设置地板
  setFloor(object) {
    object.material.color.setStyle('#32373E')
  }

  //获取包围线条效果
  setRoundLine(object) {
    // 获取线条geometry
    const geometry = new EdgesGeometry(object.geometry)

    // 获取物体的世界坐标 旋转等
    const worldPosition = new Vector3()
    object.getWorldPosition(worldPosition)

    const material = new LineBasicMaterial({
      color: 0x4c8bf5,
      linewidth: 1,
      linecap: 'round', //ignored by WebGLRenderer
      linejoin: 'round' //ignored by WebGLRenderer
    })

    const line = new LineSegments(geometry, material)
    line.name = 'surroundLine'
    line.scale.copy(object.scale)
    line.rotation.copy(object.rotation)
    line.position.copy(worldPosition)

    this.effectGroup.add(line)
  }

  animate = dt => {
    if (dt > 1) return false
    this.time.value += dt

    // 启动
    if (this.isStart) {
      this.StartTime.value += dt * 0.5
      if (this.StartTime.value >= 1) {
        this.StartTime.value = 1
        this.isStart = false
      }
    }
  }
}
export default City
