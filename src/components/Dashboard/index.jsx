import './index.scss'
import gradient3 from '@/assets/textures/gradients/3.jpg'
import React, { useState, useEffect, useRef } from 'react'
import {
  Scene,
  Clock,
  TextureLoader,
  DirectionalLight,
  BufferGeometry,
  PerspectiveCamera,
  NearestFilter,
  Group,
  WebGLRenderer,
  MeshToonMaterial,
  Mesh,
  TorusGeometry,
  ConeGeometry,
  TorusKnotGeometry,
  ACESFilmicToneMapping,
  BufferAttribute,
  PointsMaterial, // Float32Array,
  Points
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'

const Dashboard = () => {
  let homeGl = useRef(null)
  useEffect(() => {
    initDashboard()
  }, [])
  const initDashboard = () => {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    const parameters = {
      materialColor: '#ffeded'
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
      canvas: homeGl.current,
      antialias: true
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(sizes.width, sizes.height)
    renderer.toneMapping = ACESFilmicToneMapping

    const controls = new OrbitControls(camera, homeGl.current)
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
    const textureLoader = new TextureLoader()
    const gradientTexture = textureLoader.load(gradient3)
    gradientTexture.magFilter = NearestFilter

    const material = new MeshToonMaterial({
      color: parameters.materialColor,
      gradientMap: gradientTexture
    })

    const objectsDistance = 4
    const mesh1 = new Mesh(new TorusGeometry(1, 0.4, 16, 60), material)
    const mesh2 = new Mesh(new ConeGeometry(1, 2, 32), material)
    const mesh3 = new Mesh(new TorusKnotGeometry(0.8, 0.35, 100, 16), material)
    mesh1.position.x = 2
    mesh2.position.x = -2
    mesh3.position.x = 2

    mesh1.position.y = -objectsDistance * 0
    mesh2.position.y = -objectsDistance * 1
    mesh3.position.y = -objectsDistance * 2

    scene.add(mesh1, mesh2, mesh3)

    const sectionMeshes = [mesh1, mesh2, mesh3]

    const directionalLight = new DirectionalLight('#ffffff', 1)
    directionalLight.position.set(1, 1, 0)
    scene.add(directionalLight)

    const particlesCount = 200
    const positions = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] =
        objectsDistance * 0.5 -
        Math.random() * objectsDistance * sectionMeshes.length
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }

    const particlesGeometry = new BufferGeometry()
    particlesGeometry.setAttribute(
      'position',
      new BufferAttribute(positions, 3)
    )

    // Material
    const particlesMaterial = new PointsMaterial({
      color: parameters.materialColor,
      sizeAttenuation: textureLoader,
      size: 0.03
    })

    // Points
    const particles = new Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Group
    const cameraGroup = new Group()
    scene.add(cameraGroup)

    camera.position.z = 4
    cameraGroup.add(camera)

    let scrollY = window.scrollY
    let currentSection = 0

    window.addEventListener('scroll', () => {
      scrollY = window.scrollY
      const newSection = Math.round(scrollY / sizes.height)

      if (newSection != currentSection) {
        currentSection = newSection
        var tween = new TWEEN.Tween(sectionMeshes[currentSection].rotation)
        tween.to({
          x: '+=6',
          y: '+=3',
          z: '+=1.5'
        })
        tween.easing(TWEEN.Easing.Cubic.InOut)
        // gsap.to(sectionMeshes[currentSection].rotation, {
        //   duration: 1.5,
        //   ease: 'power2.inOut',
        //   x: '+=6',
        //   y: '+=3',
        //   z: '+=1.5'
        // })
      }
    })

    /**
     * Cursor
     */
    const cursor = {}
    cursor.x = 0
    cursor.y = 0

    window.addEventListener('mousemove', event => {
      cursor.x = event.clientX / sizes.width - 0.5
      cursor.y = event.clientY / sizes.height - 0.5
    })

    /**
     * Animate
     */
    const clock = new Clock()
    let previousTime = 0

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()
      const deltaTime = elapsedTime - previousTime
      previousTime = elapsedTime

      // Animate camera
      camera.position.y = (-scrollY / sizes.height) * objectsDistance

      const parallaxX = cursor.x * 0.5
      const parallaxY = -cursor.y * 0.5
      cameraGroup.position.x +=
        (parallaxX - cameraGroup.position.x) * 5 * deltaTime
      cameraGroup.position.y +=
        (parallaxY - cameraGroup.position.y) * 5 * deltaTime

      // Animate meshes
      for (const mesh of sectionMeshes) {
        mesh.rotation.x += deltaTime * 0.1
        mesh.rotation.y += deltaTime * 0.12
      }

      // Render
      renderer.render(scene, camera)

      // Call tick again on the next frame
      requestAnimationFrame(tick)
    }

    tick()
  }
  return (
    <div className="dashboardPage">
      <canvas
        className="homeGl"
        ref={homeGl}
      ></canvas>
      <section className="section">
        <h2>首页展示</h2>
      </section>
      <section className="section">
        <h2>作品简介</h2>
      </section>
      <section className="section">
        <h2>底部展示</h2>
      </section>
    </div>
  )
}
export default Dashboard
