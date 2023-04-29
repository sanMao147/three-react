import React, { useState, useEffect, useRef } from 'react'
import {
  Scene,
  Clock,
  Vector3,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  MeshBasicMaterial,
  DoubleSide,
  ACESFilmicToneMapping,
  PlaneGeometry,
  PlaneBufferGeometry,
  AxesHelper,
  ShaderMaterial
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { testVertexShader, testFragmentShader } from './shaders'
const Effect = () => {
  let effectGl = useRef(null)
  let [data, setData] = useState({
    scene: null,
    camera: null,
    renderer: null,
    controls: null
  })
  useEffect(() => {
    initEffect()
  }, [])

  const initEffect = () => {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    const scene = new Scene()

    const camera = new PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      1,
      1000
    )
    camera.position.set(0, 50, 50)
    camera.lookAt(new Vector3(0, 0, 0))
    scene.add(camera)

    const renderer = new WebGLRenderer({
      canvas: effectGl.current,
      antialias: true
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(sizes.width, sizes.height)
    renderer.toneMapping = ACESFilmicToneMapping

    const controls = new OrbitControls(camera, effectGl.current)
    controls.target.set(0, 0, 0)
    controls.enableDamping = true
    controls.enablePan = false

    setData(old => {
      return {
        ...old,
        scene,
        camera,
        renderer,
        controls
      }
    })
    // 场景地板
    const creatFloor = () => {
      const floorMesh = new Mesh(
        new PlaneBufferGeometry(60, 60, 1, 1),
        new ShaderMaterial({
          side: DoubleSide,
          vertexShader: testVertexShader,
          fragmentShader: testFragmentShader
        })
        // createShader()
      )
      // floorMesh.receiveShadow = true;
      floorMesh.rotation.x = -Math.PI / 2.0
      floorMesh.layers.enable(1)

      scene.add(floorMesh)
    }
    // 着色器
    const createShader = () => {
      return new ShaderMaterial({
        // color: 0xffff00,
        // transparent: true,
        // depthWrite: false,

        side: DoubleSide,
        // 图案1，2
        /*  vertexShader: `
        varying vec2 vUv;

        void main() {
          gl_Position =projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vUv = uv;
        }`,
        fragmentShader: `
        varying vec2 vUv;

        void main() {
          
          gl_FragColor = vec4(vUv, 0.0, 1.0);
        }` */
        /* 图案3 
          vUv.y 时，可以实现从上到下的渐变效果;
          vUv 的 x 值，就能得到如下所示的左右方向的渐变效果
          1.0 - vUv.y 时可以实现相反的效果

          挤压渐变效果
          vUv.y * 10.0
          只需将值相乘即可。此时渐变强度会迅速跃升至 1
          由于我们无法显示比白色更亮的颜色，因此其余渐变将保持白色
        */
        /*    vertexShader: `
        varying vec2 vUv;

        void main() {
          gl_Position =projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vUv = uv;
        }`,
        fragmentShader: `
        varying vec2 vUv;

        void main() {
          float strength = vUv.y * 10.0;
          gl_FragColor = vec4(vec3(strength),1.0);
        }` */

        /* 
        图案7
        重复的渐变效果,
        用到模运算，模运算返回两数之间的余数
        GLSL 中需要使用 mod() 方法。
        0.8 模 1.0 值为 0.8
        1.2 模 1.0 值为 0.2
        */
        /*  vertexShader: `
        varying vec2 vUv;

        void main() {
          gl_Position =projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vUv = uv;
        }`,
        fragmentShader: `
        varying vec2 vUv;

        void main() {
          float strength = mod(vUv.y * 10.0,1.0) ;
          gl_FragColor = vec4(vec3(strength),1.0);
        }` */

        /*
        图案8
         step(edge, value) 方法来实现这个功能，
        它接收两个参数：edge 表示一个临界值，第二个参数 value 是传入的参数，
        当传入参数小于临界值时，该方法返回 0.0，
        当传入参数大于临界值时，该方法返回 1.0。 */
        vertexShader: `
        varying vec2 vUv;

        void main() {
          gl_Position =projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vUv = uv;
        }`,
        fragmentShader: `
        varying vec2 vUv;

        void main() {
          float strength = mod(vUv.y * 10.0,1.0) ;
          strength = step(0.5,strength);
          gl_FragColor = vec4(vec3(strength),1.0);
        }`
      })
    }
    creatFloor() // 创建地板

    const axes = new AxesHelper(200)
    scene.add(axes)
    // 监听页面缩放更新相机和场景
    window.addEventListener(
      'resize',
      () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      },
      false
    )
    const tick = () => {
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()
  }

  return (
    <div className="effectpage">
      <canvas ref={effectGl}></canvas>
    </div>
  )
}
export default Effect
