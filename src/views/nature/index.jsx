import nx from '@/assets/textures/nx.jpg'
import ny from '@/assets/textures/ny.jpg'
import nz from '@/assets/textures/nz.jpg'
import px from '@/assets/textures/px.jpg'
import py from '@/assets/textures/py.jpg'
import pz from '@/assets/textures/pz.jpg'
import React, { useEffect, useRef } from 'react'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
  AmbientLight,
  sRGBEncoding,
  CubeTextureLoader
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const arr = [px, nx, py, ny, pz, nz]
const Nature = () => {
  let natureRef = useRef(null)
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

    const geometry = new BoxGeometry(15, 15, 15)
    /* let materials = []
    arr.map(item => {
      let textureLoader = new TextureLoader().load(item)
      materials.push(new MeshBasicMaterial({ map: textureLoader }))
    })
    
    const cube = new Mesh(geometry, materials) */

    const loader = new CubeTextureLoader()
    loader.load(arr, textCube => {
      // const cube = new Mesh(
      //   geometry,
      //   new MeshBasicMaterial({ envMap: textCube })
      // )
      scene.background = textCube
    })
    // const cube = new Mesh(geometry, new MeshBasicMaterial({ color: '#fff' }))

    const light = new AmbientLight(0x404040) // soft white light
    scene.add(light)

    const tick = () => {
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()
  }
  return (
    <div>
      <canvas ref={natureRef}></canvas>
    </div>
  )
}
export default Nature
