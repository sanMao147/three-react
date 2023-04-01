import React, { useState, useEffect, useRef } from 'react'
import {
  Scene,
  Clock,
  PerspectiveCamera,
  WebGLRenderer,
  ACESFilmicToneMapping
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const Effect = () => {
  let effectGl = useRef(null)
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
    camera.position.set(0, 0, 16)
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
