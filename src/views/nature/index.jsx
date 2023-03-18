import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const Index = () => {
  let natureRef = useRef(null)
  useEffect(() => {
    init()
  }, [])
  const init = () => {
 
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      40,
      sizes.width / sizes.height,
      0.1,
      1000
    )

    scene.add(camera)
    const renderer = new THREE.WebGLRenderer({
      canvas: natureRef.current,
      antialias: true,
      alpha: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // 定义渲染器是否在渲染每一帧之前自动清除其输出
    renderer.autoClear = true
    // 定义渲染器的输出编码
    renderer.outputEncoding = THREE.sRGBEncoding
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
    // const textureLoader = new TextureLoader().load([
    //   '@/assets/textures/nature/px.png',
    //   '@/assets/textures/nature/nx.png',
    //   '@/assets/textures/nature/py.png',
    //   '@/assets/textures/nature/ny.png',
    //   '@/assets/textures/nature/pz.png',
    //   '@/assets/textures/nature/nz.png'
    // ])
    const axesHelper = new THREE.AxesHelper( 200 );
    scene.add( axesHelper );
    const geometry = new THREE.BoxGeometry(15, 15, 15)
    const material = new THREE.MeshBasicMaterial({color:0xffff00})
    const cube = new THREE.Mesh(geometry, material)
    // cube.scale.set(1, 1, -1)
    scene.add(cube)
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
export default Index
