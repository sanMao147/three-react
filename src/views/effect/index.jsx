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
  AxesHelper
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
    camera.position.set(0, 150, 100)
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
        new PlaneGeometry(100, 100),
        new MeshBasicMaterial({
          color: 0xffff00,
          transparent: true,
          depthWrite: false,
          side: DoubleSide
        })
      )
      // floorMesh.receiveShadow = true;
      floorMesh.rotation.x = -Math.PI / 2.0
      floorMesh.layers.enable(1)

      scene.add(floorMesh)
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
