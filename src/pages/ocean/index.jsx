import './index.scss'
import lensflareTexture0 from '@/assets/images/lensflare0.png'
import lensflareTexture1 from '@/assets/images/lensflare1.png'
import waterTexture from '@/assets/images/waterNormals.jpg'
import Flamingo from '@/assets/models/flamingo.glb'
import Island from '@/assets/models/island.glb'
import fragmentShader from '@/assets/shaders/rainbow/fragment'
import vertexShader from '@/assets/shaders/rainbow/vertex'
import Animations from '@/utils/animations'
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {
  Lensflare,
  LensflareElement
} from 'three/examples/jsm/objects/Lensflare'
import { Sky } from 'three/examples/jsm/objects/Sky'
import { Water } from 'three/examples/jsm/objects/Water'

const Index = () => {
  const [mixers, setMixers] = useState([])
  const [sceneReady, setsceneReady] = useState(false)
  let webglRef = useRef(null)
  useEffect(() => {
    initThree()
  }, [])

  const initThree = () => {
    const clock = new THREE.Clock()
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      55,
      sizes.width / sizes.height,
      1,
      20000
    )
    camera.position.set(0, 600, 1600)
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({
      canvas: webglRef.current,
      antialias: true
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(sizes.width, sizes.height)
    renderer.toneMapping = THREE.ACESFilmicToneMapping

    const controls = new OrbitControls(camera, webglRef.current)
    controls.target.set(0, 0, 0)
    controls.enableDamping = true
    controls.enablePan = false
    controls.maxPolarAngle = 1.5
    controls.minDistance = 50
    controls.maxDistance = 1200

    // 水
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000)
    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(waterTexture, texture => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      }),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x0072ff,
      distortionScale: 4,
      fog: scene.fog !== undefined
    })
    water.rotation.x = -Math.PI / 2
    scene.add(water)
    /*      
      textureWidth：画布宽度
      textureHeight：画布高度
      waterNormals：法向量贴图
      sunDirection：阳光方向
      sunColor：阳光颜色
      waterColor：水颜色
      distortionScale：物体倒影分散度
      fog：雾
      alpha：透明度 
            
       */
    water.rotation.x = -Math.PI / 2
    scene.add(water)

    // 天空
    const sky = new Sky()
    sky.scale.setScalar(10000)
    scene.add(sky)
    const skyUniforms = sky.material.uniforms
    skyUniforms['turbidity'].value = 20
    skyUniforms['rayleigh'].value = 2
    skyUniforms['mieCoefficient'].value = 0.005
    skyUniforms['mieDirectionalG'].value = 0.8
    /* 
    天空材质着色器参数说明：

    turbidity 浑浊度
    rayleigh 视觉效果就是傍晚晚霞的红光的深度
    luminance 视觉效果整体提亮或变暗
    mieCoefficient 散射系数
    mieDirectionalG 定向散射值
    */
    // 太阳
    const sun = new THREE.Vector3()
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    const phi = THREE.MathUtils.degToRad(88)
    const theta = THREE.MathUtils.degToRad(180)
    sun.setFromSphericalCoords(1, phi, theta)
    sky.material.uniforms['sunPosition'].value.copy(sun)
    water.material.uniforms['sunDirection'].value.copy(sun).normalize()
    scene.environment = pmremGenerator.fromScene(sky).texture

    // 彩虹
    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {},
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    })
    const geometry = new THREE.TorusGeometry(200, 10, 50, 100)
    const torus = new THREE.Mesh(geometry, material)
    torus.opacity = 0.1
    torus.position.set(0, -50, -400)
    scene.add(torus)

    // 管理器
    const manager = new THREE.LoadingManager()
    manager.onProgress = async (url, loaded, total) => {
      if (Math.floor((loaded / total) * 100) === 100) {
        Animations.animateCamera(
          camera,
          controls,
          { x: 0, y: 40, z: 140 },
          { x: 0, y: 0, z: 0 },
          4000,
          () => {
            setsceneReady(true)
          }
        )
      }
    }

    // 岛
    const loader = new GLTFLoader(manager)
    loader.load(Island, mesh => {
      mesh.scene.traverse(child => {
        if (child.isMesh) {
          child.material.metalness = 0.4
          child.material.roughness = 0.6
        }
      })
      mesh.scene.position.set(0, -2, 0)
      mesh.scene.scale.set(33, 33, 33)
      scene.add(mesh.scene)
    })

    // 鸟
    loader.load(Flamingo, gltf => {
      const mesh = gltf.scene.children[0]
      mesh.scale.set(0.35, 0.35, 0.35)
      mesh.position.set(-100, 80, -300)
      mesh.rotation.y = -1
      mesh.castShadow = true
      scene.add(mesh)

      const bird2 = mesh.clone()
      bird2.position.set(150, 80, -500)
      scene.add(bird2)

      const mixer1 = new THREE.AnimationMixer(mesh)
      mixer1.clipAction(gltf.animations[0]).setDuration(1.2).play()
      setMixers([...mixers, mixer1])

      const mixer2 = new THREE.AnimationMixer(bird2)
      mixer2.clipAction(gltf.animations[0]).setDuration(1.8).play()
      setMixers([...mixers, mixer2])
    })

    // 灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.color.setHSL(0.1, 1, 0.95)
    dirLight.position.set(-1, 1.75, 1)
    dirLight.position.multiplyScalar(30)
    scene.add(dirLight)

    // 太阳点光源
    const pointLight = new THREE.PointLight(0xffffff, 1.2, 2000)
    pointLight.color.setHSL(0.995, 0.5, 0.9)
    pointLight.position.set(0, 45, -2000)
    const textureLoader = new THREE.TextureLoader()
    const textureFlare0 = textureLoader.load(lensflareTexture0)
    const textureFlare1 = textureLoader.load(lensflareTexture1)

    // 镜头光晕
    const lensflare = new Lensflare()
    lensflare.addElement(
      new LensflareElement(textureFlare0, 600, 0, pointLight.color)
    )
    lensflare.addElement(new LensflareElement(textureFlare1, 60, 0.6))
    lensflare.addElement(new LensflareElement(textureFlare1, 70, 0.7))
    lensflare.addElement(new LensflareElement(textureFlare1, 120, 0.9))
    lensflare.addElement(new LensflareElement(textureFlare1, 70, 1))
    pointLight.add(lensflare)
    scene.add(pointLight)

    // 点
    const raycaster = new THREE.Raycaster()
    const points = [
      {
        position: new THREE.Vector3(10, 46, 0),
        element: document.querySelector('.point-0')
      },
      {
        position: new THREE.Vector3(-10, 8, 24),
        element: document.querySelector('.point-1')
      },
      {
        position: new THREE.Vector3(30, 10, 70),
        element: document.querySelector('.point-2')
      },
      {
        position: new THREE.Vector3(-100, 50, -300),
        element: document.querySelector('.point-3')
      },
      {
        position: new THREE.Vector3(-120, 50, -100),
        element: document.querySelector('.point-4')
      }
    ]

    document.querySelectorAll('.point').forEach(item => {
      item.addEventListener(
        'click',
        event => {
          let className =
            event.target.classList[event.target.classList.length - 1]
          switch (className) {
            case 'label-0':
              Animations.animateCamera(
                camera,
                controls,
                { x: -15, y: 80, z: 60 },
                { x: 0, y: 0, z: 0 },
                1600,
                () => {}
              )
              break
            case 'label-1':
              Animations.animateCamera(
                camera,
                controls,
                { x: -20, y: 10, z: 60 },
                { x: 0, y: 0, z: 0 },
                1600,
                () => {}
              )
              break
            case 'label-2':
              Animations.animateCamera(
                camera,
                controls,
                { x: 30, y: 10, z: 100 },
                { x: 0, y: 0, z: 0 },
                1600,
                () => {}
              )
              break
            default:
              Animations.animateCamera(
                camera,
                controls,
                { x: 0, y: 40, z: 140 },
                { x: 0, y: 0, z: 0 },
                1600,
                () => {}
              )
              break
          }
        },
        false
      )
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

    const tick = () => {
      water.material.uniforms['time'].value += 1.0 / 60.0
      // stats && stats.update();
      controls && controls.update()
      const delta = clock.getDelta()
      mixers &&
        mixers.forEach(item => {
          item.update(delta)
        })
      const timer = Date.now() * 0.0005
      TWEEN && TWEEN.update()
      camera && (camera.position.y += Math.sin(timer) * 0.05)

      // if (sceneReady) {
        // 遍历每个点
        for (const point of points) {
          // 获取2D屏幕位置
          const screenPosition = point.position.clone()
          screenPosition.project(camera)
          raycaster.setFromCamera(screenPosition, camera)
          const intersects = raycaster.intersectObjects(scene.children, true)
          if (intersects.length === 0) {
            // 未找到相交点，显示
            point.element.classList.add('visible')
          } else {
            // 找到相交点
            // 获取相交点的距离和点的距离
            const intersectionDistance = intersects[0].distance
            const pointDistance = point.position.distanceTo(camera.position)
            // 相交点距离比点距离近，隐藏；相交点距离比点距离远，显示
            intersectionDistance < pointDistance
              ? point.element.classList.remove('visible')
              : point.element.classList.add('visible')
          }
          const translateX = screenPosition.x * sizes.width * 0.5
          const translateY = -screenPosition.y * sizes.height * 0.5
          point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
      // }
     
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()
  }
  return (
    <div className="ocean">
      <canvas ref={webglRef}></canvas>
      <div className="point point-0">
        <div className="label label-0">1</div>
        <div className="text">灯塔</div>
      </div>
      <div className="point point-1">
        <div className="label label-1">2</div>
        <div className="text">小船</div>
      </div>
      <div className="point point-2">
        <div className="label label-2">3</div>
        <div className="text">沙滩</div>
      </div>
      <div className="point point-3">
        <div className="label label-3">4</div>
        <div className="text">飞鸟</div>
      </div>
      <div className="point point-4">
        <div className="label label-4">5</div>
        <div className="text">礁石</div>
      </div>
    </div>
  )
}

export default Index
