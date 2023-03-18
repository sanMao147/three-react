import nx from '@/assets/textures/nature/nx.png'
import ny from '@/assets/textures/nature/ny.png'
import nz from '@/assets/textures/nature/nz.png'
import px from '@/assets/textures/nature/px.png'
import py from '@/assets/textures/nature/py.png'
import pz from '@/assets/textures/nature/pz.png'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      40,
      sizes.width / sizes.height,
      0.1,
      1000
    )
    camera.position.set(0, 0, 20)
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
    const arr = [px, nx, py, ny, pz, nz]
    let materials = []
    arr.map(item => {
      let textureLoader = new THREE.TextureLoader().load(item)
      materials.push(new THREE.MeshBasicMaterial({ map: textureLoader }))
    })

    const geometry = new THREE.BoxGeometry(15, 15, 15)

    const cube = new THREE.Mesh(geometry, materials)
    cube.geometry.scale(15, 15, -15)
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
export default Nature
