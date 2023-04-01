import CityClass from './city'
import nx from '@/assets/textures/city/nx.png'
import ny from '@/assets/textures/city/ny.png'
import nz from '@/assets/textures/city/nz.png'
import px from '@/assets/textures/city/px.png'
import py from '@/assets/textures/city/py.png'
import pz from '@/assets/textures/city/pz.png'
import React, { useState, useEffect, useRef } from 'react'
import {
  Scene,
  Clock,
  Color,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  AxesHelper,
  sRGBEncoding,
  Fog,
  CubeTextureLoader
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const arr = [px, nx, py, ny, pz, nz]
const City = () => {
  let cityGl = useRef(null)
  useEffect(() => {
    initCity()
  }, [])
  const initCity = () => {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    const scene = new Scene()
    // scene.fog = new Fog(0x130c01, 1500, 2500)
    const camera = new PerspectiveCamera(
      45,
      sizes.width / sizes.height,
      1,
      10000
    )
    camera.position.set(1200, 700, 121)
    scene.add(camera)

    const renderer = new WebGLRenderer({
      canvas: cityGl.current,
      antialias: true,
      alpha: true
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(sizes.width, sizes.height)
    renderer.setClearColor(new Color('#32373E'), 1) //设置颜色及其透明度
    // renderer.toneMapping = ACESFilmicToneMapping

    const ah = new AxesHelper(800)
    scene.add(ah)

    // background
    /*    const loader = new CubeTextureLoader()
    const environmentMap = loader.load(arr)
    // environmentMap.encoding = sRGBEncoding
    scene.background = environmentMap */

    /**
     * Light
     */
    const light = new AmbientLight(0xadadad) // soft white light
    scene.add(light)

    const directionalLight = new DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(100, 100, 0)
    scene.add(directionalLight)

    const controls = new OrbitControls(camera, cityGl.current)
    controls.target.set(0, 0, 0)
    controls.enableDamping = true
    // controls.enablePan = false

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

    // city
    const city = new CityClass({})
    scene.add(city.group)

    const clock = new Clock()

    const tick = () => {
      const dt = clock.getDelta()

      city.animate(dt)
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()
  }
  return (
    <div className="citypage">
      <canvas ref={cityGl}></canvas>
    </div>
  )
}
export default City
