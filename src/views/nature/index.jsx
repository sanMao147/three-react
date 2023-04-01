import nx from '@/assets/textures/nx.jpg'
import ny from '@/assets/textures/ny.jpg'
import nz from '@/assets/textures/nz.jpg'
import px from '@/assets/textures/px.jpg'
import py from '@/assets/textures/py.jpg'
import pz from '@/assets/textures/pz.jpg'
import demo from '@/assets/video/demo.mp4'
import React, { useEffect, useRef } from 'react'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  sRGBEncoding,
  CubeTextureLoader,
  VideoTexture,
  LoadingManager,
  MeshPhysicalMaterial,
  Mesh,
  Raycaster,
  Vector2,
  MeshStandardMaterial
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const arr = [px, nx, py, ny, pz, nz]
const Nature = () => {
  let natureRef = useRef(null)
  let videoRef = useRef(null)
  useEffect(() => {
    init()
  }, [])
  const init = () => {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    const scene = new Scene()
    const camera = new PerspectiveCamera(
      40,
      sizes.width / sizes.height,
      0.1,
      1000
    )
    camera.position.set(0, 0, 80)
    scene.add(camera)
    const renderer = new WebGLRenderer({
      canvas: natureRef.current,
      antialias: true,
      alpha: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // 定义渲染器是否在渲染每一帧之前自动清除其输出
    renderer.autoClear = true
    // 定义渲染器的输出编码
    renderer.outputEncoding = sRGBEncoding
    const controls = new OrbitControls(camera, natureRef.current)
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

    const loader = new CubeTextureLoader()
    const environmentMap = loader.load(arr)
    environmentMap.encoding = sRGBEncoding
    scene.background = environmentMap
    scene.environment = environmentMap

    const light = new AmbientLight(0x404040)
    scene.add(light)

    // 加载管理
    const loadingManager = new LoadingManager()

    // 点击事件捕获
    const raycaster = new Raycaster()
    const mouse = new Vector2()
    window.addEventListener(
      'click',
      event => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects([screen.mesh])
        if (intersects.length > 0) {
          const mesh = intersects[0].object
          if (mesh.material.type === 'MeshStandardMaterial') {
            mesh.material = screen.videoMaterial
          } else {
            mesh.material = screen.material
          }
        }
      },
      false
    )

    const tick = () => {
      // model && (model.rotation.y += 0.005)
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()
  }
  return (
    <div>
      <canvas ref={natureRef}></canvas>
      <video
        ref={videoRef}
        muted
        autoPlay
        loop
        src={demo}
      ></video>
    </div>
  )
}
export default Nature
