import jsonData from '@/assets/earth/china.json'
import nx from '@/assets/textures/nature/nx.png'
import ny from '@/assets/textures/nature/ny.png'
import nz from '@/assets/textures/nature/nz.png'
import px from '@/assets/textures/nature/px.png'
import py from '@/assets/textures/nature/py.png'
import pz from '@/assets/textures/nature/pz.png'
import * as d3geo from 'd3-geo'
import React, { useState, useEffect, useRef } from 'react'
import {
  Scene,
  Clock,
  PerspectiveCamera,
  WebGLRenderer,
  ACESFilmicToneMapping,
  sRGBEncoding,
  Object3D,
  Shape,
  Vector3,
  PlaneGeometry,
  Mesh,
  ExtrudeGeometry,
  MeshStandardMaterial,
  PointLight,
  LightProbe,
  Group,
  CubeTextureLoader,
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
  Raycaster,
  Vector2,
  AxesHelper
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSM } from 'three/examples/jsm/csm/CSM.js'
import { CSMHelper } from 'three/examples/jsm/csm/CSMHelper.js'
import { LightProbeGenerator } from 'three/examples/jsm/lights/LightProbeGenerator.js'

const World = () => {
  // 地图材质颜色
  const COLOR_ARR = [
    '#0465BD',
    '#357bcb',
    '#3a7abd',
    '#6C8389',
    '#F29B1F',
    '#3646AF'
  ]

  // 墨卡托投影转换
  const projection = d3geo
    .geoMercator()
    .center([104.0, 37.5])
    .scale(80)
    .translate([0, 0])

  let worldGl = useRef(null)
  let lightProbe = null
  let scene = null
  useEffect(() => {
    initEarth()
  }, [])
  const initEarth = () => {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    const params = {
      orthographic: false,
      fade: false,
      far: 1000,
      mode: 'practical',
      // mode: 'uniform',
      lightX: -1,
      lightY: -1,
      lightZ: -1,
      margin: 100,
      lightFar: 5000,
      lightNear: 1,
      autoUpdateHelper: true
      //   updateHelper: function () {
      //     csmHelper.update()
      //   }
    }
    scene = new Scene()

    const camera = new PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      1,
      5000
    )
    camera.position.set(0, -60, 70)
    camera.lookAt(0, 0, 0)
    scene.add(camera)

    // const axexHelper = new AxesHelper(2000)
    // scene.add(axexHelper)

    const renderer = new WebGLRenderer({
      canvas: worldGl.current,
      antialias: true
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(sizes.width, sizes.height)
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.shadowMap.enabled = true //开启阴影
    renderer.toneMappingExposure = 1.25
    renderer.outputEncoding = sRGBEncoding
    // 清除背景色，透明背景
    renderer.setClearColor(0xffffff, 0)

    // 添加阴影模糊

    const csm = new CSM({
      maxFar: params.far,
      cascades: 4,
      mode: params.mode,
      parent: scene,
      shadowMapSize: 1024,
      lightDirection: new Vector3(
        params.lightX,
        params.lightY,
        params.lightZ
      ).normalize(),
      camera: camera
    })

    const csmHelper = new CSMHelper(csm)
    csmHelper.visible = false
    scene.add(csmHelper)

    const groundMaterial = new MeshStandardMaterial({
      color: 0x031837,
      // specular: 0x111111,
      metalness: 0,
      roughness: 1,
      // opacity: 0.2,
      opacity: 0.5,
      transparent: true
    })
    // 光照探针
    lightProbe = new LightProbe()

    scene.add(lightProbe)

    const ground = new Mesh(new PlaneGeometry(2000, 2000, 1, 1), groundMaterial)
    // ground.rotation.x = - Math.PI / 2;
    ground.position.z = 0
    // ground.castShadow = true;
    ground.receiveShadow = true

    scene.add(ground)

    const controls = new OrbitControls(camera, worldGl.current)
    controls.target.set(0, 0, 0)
    controls.enableDamping = true

    controls.enablePan = false
    // y轴
    controls.minPolarAngle = 1
    controls.maxPolarAngle = 1.6
    // x轴
    controls.minAzimuthAngle = -0.2
    controls.maxAzimuthAngle = 0.2
    controls.maxDistance = 250

    initMap(jsonData)
    initLight()
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
      csm.update()
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()
  }
  //   地图数据
  const initMap = chinaJson => {
    // 创建一个空对象存放对象
    const map = new Group()
    // 加载贴图材质
    const urls = [px, nx, py, ny, pz, nz]
    const loader = new CubeTextureLoader()
    // 绘制地图
    loader.load(urls, cube => {
      lightProbe.copy(LightProbeGenerator.fromCubeTexture(cube))
      chinaJson.features.forEach((ele, index) => {
        // 定义一个省份3D对象
        const province = new Object3D()
        // 每个省的坐标数据
        const { coordinates } = ele.geometry
        const color = COLOR_ARR[index % COLOR_ARR.length]
        //   循环坐标数组
        coordinates.forEach(multiPolygon => {
          multiPolygon.forEach(polygon => {
            const shape = new Shape()
            for (let i = 0; i < polygon.length; i++) {
              let [x, y] = projection(polygon[i])
              if (i === 0) {
                shape.moveTo(x, -y)
              }
              shape.lineTo(x, -y)
            }
            const extrudeSettings = {
              depth: 4,
              bevelEnabled: true,
              bevelSegments: 1,
              bevelThickness: 0.2
            }
            //   平面部分材质
            const geometry = new ExtrudeGeometry(shape, extrudeSettings)
            //   拉高部分材质
            const material = new MeshStandardMaterial({ color, metalness: 1 })
            const material1 = new MeshStandardMaterial({
              color,
              metalness: 1,
              roughness: 1
            })
            const mesh = new Mesh(geometry, [material, material1])

            //   设置高度将省区分开来
            if (index % 2 === 0) {
              mesh.scale.set(1, 1, 1.2)
            }
            // 开启阴影
            mesh.castShadow = true
            mesh.receiveShadow = true
            mesh._color = color
            province.add(mesh)
          })
        })
        //   将geo的属性放到省市模型中
        province.properties = ele.properties
        if (ele.properties.centroid) {
          const [x, y] = projection(ele.properties.centroid)
          province.properties._centroid = [x, y]
        }
        map.add(province)
      })
      scene.environment = cube
      cube.dispose()
      scene.add(map)
    })
  }
  //   灯光
  const initLight = () => {
    const lightGroup = new Group()
    let ambientLight = new AmbientLight(0xffffff, 0.2) // 环境光

    const light = new DirectionalLight(0xffffff, 0.5) // 平行光
    light.position.set(20, -50, 20)

    light.castShadow = true
    light.shadow.mapSize.width = 1024
    light.shadow.mapSize.height = 1024

    // 半球光
    let hemiLight = new HemisphereLight('#80edff', '#75baff', 0.3)
    // 这个也是默认位置
    hemiLight.position.set(20, -50, 0)

    const pointLight = new PointLight(0xffffff, 0.5)
    pointLight.position.set(20, -50, 50)

    pointLight.castShadow = true
    pointLight.shadow.mapSize.width = 1024
    pointLight.shadow.mapSize.height = 1024

    const pointLight2 = new PointLight(0xffffff, 0.5)
    pointLight2.position.set(50, -50, 20)
    pointLight2.castShadow = true
    pointLight2.shadow.mapSize.width = 1024
    pointLight2.shadow.mapSize.height = 1024

    const pointLight3 = new PointLight(0xffffff, 0.5)
    pointLight3.position.set(-50, -50, 20)
    pointLight3.castShadow = true
    pointLight3.shadow.mapSize.width = 1024
    pointLight3.shadow.mapSize.height = 1024

    lightGroup.add(
      ambientLight,
      pointLight3,
      light,
      pointLight,
      pointLight2,
      hemiLight
    )

    scene.add(lightGroup)
  }

  //   增加鼠标事件
  const initRaycaster = event => {
    const raycaster = new Raycaster()
    const mouse = new Vector2()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }
  return (
    <div className="worldpage">
      <canvas ref={worldGl}></canvas>
      <div className="province"></div>
    </div>
  )
}
export default World
