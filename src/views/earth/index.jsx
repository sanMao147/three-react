import { mapPoints } from '@/utils/mapPoints.js'
import React, { useState, useEffect, useRef } from 'react'
import {
  Scene,
  Clock,
  PerspectiveCamera,
  WebGLRenderer,
  ACESFilmicToneMapping,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  Group
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'

const Earth = () => {
  let earthGl = useRef(null)
  let earthGroup = useRef(null)
  const globe = {
    globeWidth: 2000,
    globeHeight: 961,
    globeRadius: 40, // 球体半径
    globeSegments: 64 // 球体面数，数量越大越光滑，性能消耗越大
  }
  useEffect(() => {
    initEarth()
  }, [])
  const initEarth = () => {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    const scene = new Scene()
    earthGroup = new Group()
    scene.add(earthGroup)
    const camera = new PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      1,
      1000
    )
    camera.position.set(0, 0, 60)
    scene.add(camera)

    const renderer = new WebGLRenderer({
      canvas: earthGl.current,
      antialias: true
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(sizes.width, sizes.height)
    renderer.toneMapping = ACESFilmicToneMapping

    const controls = new OrbitControls(camera, earthGl.current)
    controls.target.set(0, 0, 0)
    controls.enableDamping = true
    controls.enablePan = false

    const geometry = new SphereGeometry(
      globe.globeRadius,
      globe.globeSegments,
      globe.globeSegments
    )
    const material = new MeshBasicMaterial({
      transparent: true,
      opacity: 0.5,
      color: '#000'
    })

    const earthMesh = new Mesh(geometry, material)
    earthGroup.add(earthMesh)
    createMapPoints()

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

  // 生成点状世界地图的方法
  const createMapPoints = () => {
    const material = new MeshBasicMaterial({ color: '#aaa' })
    const sphere = []
    // 循环遍历所有点将2维坐标映射到3维坐标
    for (let point of mapPoints) {
      const pos = convertFlatCoordsToSphereCoords(point.x, point.y)
      if (pos.x && pos.y && pos.z) {
        //生成点阵
        const pointGeometry = new SphereGeometry(0.4, 5, 5)
        pointGeometry.translate(pos.x, pos.y, pos.z) //移动几何体。
        sphere.push(pointGeometry)
      }
    }
    // 合并所有点阵生成一个mesh对象
    const earthPointMesh = new Mesh(mergeBufferGeometries(sphere), material)
    earthGroup.add(earthPointMesh)
  }
  // 将2d地图坐标转为球体3d坐标
  const convertFlatCoordsToSphereCoords = (x, y) => {
    let latitude = ((x - globe.globeWidth) / globe.globeWidth) * -180 //纬度
    let longitude = ((y - globe.globeHeight) / globe.globeHeight) * -90 //经度
    latitude = (latitude * Math.PI) / 180 //(latitude / 180) * Math.PI
    longitude = (longitude * Math.PI) / 180 //(longitude / 180) * Math.PI // Calculate the projected starting point

    const radius = Math.cos(longitude) * globe.globeRadius
    const targetX = Math.cos(latitude) * radius
    const targetY = Math.sin(longitude) * globe.globeRadius
    const targetZ = Math.sin(latitude) * radius
    return {
      x: targetX,
      y: targetY,
      z: targetZ
    }
  }

  return (
    <div className="earthpage">
      <canvas ref={earthGl}></canvas>
    </div>
  )
}
export default Earth
