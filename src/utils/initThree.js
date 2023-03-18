import { Scene, PerspectiveCamera, WebGLRenderer, sRGBEncoding } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useRef } from 'react'
let webglRef = useRef(null)
let sizes=null
let camera=null
let renderer=null
let scene=null
let controls=null
const initThree = () => {
  canvas = webglRef.current
  sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  scene = new Scene()
  camera = new PerspectiveCamera(40, sizes.width / sizes.height, 0.1, 1000)

  scene.add(camera)
  renderer = new WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  // 定义渲染器是否在渲染每一帧之前自动清除其输出
  renderer.autoClear = true
  // 定义渲染器的输出编码
  renderer.outputEncoding = sRGBEncoding
  controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })
}

export { canvas, camera, sizes, controls, renderer, scene, initThree }
