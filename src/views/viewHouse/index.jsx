import './index.scss'
import { rooms } from '@/views/viewHouse/data'
import gsap from 'gsap'
import React, { useState, useEffect, useRef } from 'react'
import {
  Scene,
  Clock,
  SphereGeometry,
  DoubleSide,
  PerspectiveCamera,
  MeshBasicMaterial,
  WebGLRenderer,
  TextureLoader,
  Mesh,
  ACESFilmicToneMapping
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const House = () => {
  let houseGl = useRef(null)
  const [dataGl, setDataGl] = useState({
    renderer: null,
    camera: null,
    scene: null,
    controls: null,
    cameraZAxis: 2,
    animationId: null,
    currentRoom: 'living-room'
  })
  useEffect(() => {
    initHouse()
    return clearScene()
  }, [])
  // 清除内存
  const clearScene = () => {
    if (dataGl.camera) {
      cancelAnimationFrame(dataGl.animationId)
      dataGl.scene.traverse(child => {
        if (child.material) {
          child.material.dispose()
        }
        if (child.geometry) {
          child.geometry.dispose()
        }
        child = null
      })

      dataGl.renderer.forceContextLoss()
      dataGl.renderer.dispose()
      dataGl.scene.clear()

      dataGl.scene = null
      dataGl.camera = null
      dataGl.controls = null
      dataGl.renderer.domElement = null
      dataGl.renderer = null

      console.log('clearScene')
    }
  }

  //   初始化
  const initHouse = () => {
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
    camera.position.z = dataGl.cameraZAxis
    scene.add(camera)

    const renderer = new WebGLRenderer({
      canvas: houseGl.current,
      antialias: true
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(sizes.width, sizes.height)
    renderer.toneMapping = ACESFilmicToneMapping

    const controls = new OrbitControls(camera, houseGl.current)
    controls.target.set(0, 0, 0)
    controls.enableDamping = true
    controls.enablePan = false
    // 保存数据
    setDataGl(old => {
      return {
        ...old,
        scene,
        camera,
        renderer,
        controls
      }
    })
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
    // 创建房间
    const createMesh = (name, position, map) => {
      const textLoader = new TextureLoader()
      const geometry = new SphereGeometry(16, 256, 256)
      geometry.scale(1, 1, -1)
      const material = new MeshBasicMaterial({
        map: textLoader.load(map),
        side: DoubleSide
      })
      const room = new Mesh(geometry, material)
      room.name = name
      room.position.set(position.x, position.y, position.z)
      room.rotation.y = Math.PI / 2
      scene.add(room)
      return room
    }
    // 创建房间集合
    rooms.map(item => {
      const room = createMesh(item.key, item.position, item.map)
      return room
    })
    const tick = () => {
      controls.update()
      renderer.render(scene, camera)
      let animationId = requestAnimationFrame(tick)
      setDataGl(old => {
        return {
          ...old,
          animationId
        }
      })
    }
    tick()
  }

  // 点击切换场景
  const handleSwitchButtonClick = async key => {
    const room = rooms.filter(item => item.key === key)[0]
    if (dataGl.camera) {
      const x = room.position.x
      const y = room.position.y
      const z = room.position.z

      let obj = {
        x1: dataGl.camera.position.x, // 相机x
        y1: dataGl.camera.position.y, // 相机y
        z1: dataGl.camera.position.z, // 相机z
        x2: dataGl.controls.target.x, // 控制点的中心点x
        y2: dataGl.controls.target.y, // 控制点的中心点y
        z2: dataGl.controls.target.z // 控制点的中心点z
      }
      gsap.to(obj, {
        x1: x,
        y1: y,
        z1: 2,
        x2: x,
        y2: y,
        z2: z,
        duration: 1.2,
        ease: 'power1.out',
        onComplete: () => {
          dataGl.controls.enabled = true
        },
        onUpdate: () => {
          dataGl.camera.position.x = obj.x1
          dataGl.camera.position.y = obj.y1
          dataGl.camera.position.z = obj.z1
          dataGl.controls.target.x = obj.x2
          dataGl.controls.target.y = obj.y2
          dataGl.controls.target.z = obj.z2
          dataGl.controls.update()
        }
      })
    }
    setDataGl(old => {
      return {
        ...old,
        currentRoom: room.key
      }
    })
  }
  return (
    <div className="housepage">
      <canvas ref={houseGl}></canvas>
      <div className="vr">
        <span className="box">
          <i className="icon"></i>
          <b className="text">全景看房</b>
        </span>
      </div>
      {/* 场景切换点 */}
      <div className="switch">
        {rooms.map(room => {
          return room.key !== dataGl.currentRoom ? (
            <span
              className="button"
              key={room.key}
              onClick={() => handleSwitchButtonClick(room.key)}
            >
              <b className="text">{room.name}</b>
              <i className="icon"></i>
            </span>
          ) : (
            ''
          )
        })}
      </div>
    </div>
  )
}
export default House
