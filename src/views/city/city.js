import Shanghai from '@/assets/models/shanghai.FBX'
import {
  Group,
  Vector3,
  LineSegments,
  LineBasicMaterial,
  EdgesGeometry,
  MeshPhysicalMaterial,
  MeshBasicMaterial,
  Mesh,
  ShaderMaterial,
  Color
} from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

class City {
  constructor() {
    this.fbxLoader = new FBXLoader()
    // 总群组
    this.group = new Group()
    // 效果群组
    this.effectGroup = new Group()
    this.group.add(this.effectGroup)
    this.height = {
      value: 0
    }
    this.time = {
      value: 0
    }
    this.StartTime = {
      value: 0
    }
    this.isStart = false // 是否启动

    // 需要做城市效果的mesh
    const cityArray = ['CITY_UNTRIANGULATED']
    const floorArray = ['LANDMASS']
    const roadArray = ['ROADS']

    this.loadFbx(Shanghai).then(scene => {
      console.log(scene)
      this.group.add(scene)
      // traverse()按照某种次序访问所有节点,且每个节点恰好访问一次
      scene.traverse(child => {
        // 城市效果
        if (cityArray.includes(child.name)) {
          // 建筑
          this.setCityMaterial(child)
          // 添加包围线条效
          this.setRoundLine(child)
        }
        if (floorArray.includes(child.name)) {
          this.setFloor(child)
        }
        if (roadArray.includes(child.name)) {
          this.setRoad(child)
        }
      })
    })
  }
  // 加载模型
  loadFbx(url) {
    return new Promise((res, rej) => {
      try {
        this.fbxLoader.load(url, obj => {
          res(obj)
        })
      } catch (e) {
        rej(e)
      }
    })
  }
  // 设置建筑mesh
  setCityMaterial(object) {
    // 上升线效果
    /* 
    线上升到的高度height、
    上升线的颜色uFlowColor、
    建筑模型的颜色uCityColor、
    */
    const shader = new ShaderMaterial({
      uniforms: {
        height: this.height,
        uFlowColor: {
          value: new Color('#5588aa')
        },
        uCityColor: {
          value: new Color('#1B3045')
        }
      },
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
      fragmentShader: `
      float distanceTo(vec2 src,vec2 dst)
      {
          float dx=src.x-dst.x;
          float dy=src.y-dst.y;
          float dv=dx*dx+dy*dy;
          return sqrt(dv);
      }
      varying vec3 vPosition;
      uniform float height;
      uniform float uStartTime;
      uniform vec3 uSize;
      uniform vec3 uFlowColor;
      uniform vec3 uCityColor;
      void main()
      {
          //模型的基础颜色
          vec3 distColor=uCityColor;
          // 流动范围当前点z的高度加上流动线的高度
          float topY=vPosition.z+10.;
          if(height>vPosition.z&&height<topY){
              // 颜色渐变
                  float dIndex = sin((height - vPosition.z) / 10.0 * 3.14);
                  distColor = mix(uFlowColor, distColor, 1.0-dIndex);
      
          }
          //定位当前点位位置
          vec2 position2D=vec2(vPosition.x,vPosition.y);
          //求点到原点的距离
          float Len=distanceTo(position2D,vec2(0,0));
            if(Len>height*30.0&&Len<(height*30.0+130.0)){
              // 颜色渐变
              float dIndex = sin((Len - height*30.0) / 130.0 * 3.14);
              distColor= mix(uFlowColor, distColor, 1.0-dIndex);
          }
          gl_FragColor=vec4(distColor,1.0);
      }`,
      transparent: true
    })
    const mesh = new Mesh(object.geometry, shader)
    mesh.position.copy(object.position)
    mesh.rotation.copy(object.rotation)
    mesh.scale.copy(object.scale)
    this.effectGroup.add(mesh)
  }

  // 设置地板
  setFloor(object) {
    object.material.color.setStyle('#040912')
  }
  // 设置道路
  setRoad(object) {
    const material = new MeshBasicMaterial({
      color: 'rgb(41,46,76)'
    })
    const mesh = new Mesh(object.geometry, material)
    mesh.rotateX(-Math.PI / 2)
    mesh.position.set(object.position.x, object.position.y, object.position.z)
    this.effectGroup.add(mesh)
  }
  //获取包围线条效果
  setRoundLine(object) {
    // 获取线条geometry
    const geometry = new EdgesGeometry(object.geometry)

    // 获取物体的世界坐标 旋转等
    const worldPosition = new Vector3()
    object.getWorldPosition(worldPosition)

    const material = new LineBasicMaterial({
      color: 0x4c8bf5,
      linewidth: 1,
      linecap: 'round', //ignored by WebGLRenderer
      linejoin: 'round' //ignored by WebGLRenderer
    })

    const line = new LineSegments(geometry, material)
    line.name = 'surroundLine'
    line.scale.copy(object.scale)
    line.rotation.copy(object.rotation)
    line.position.copy(worldPosition)

    this.effectGroup.add(line)

    // 模型面材质

    //生成模型对象
    const plane = new Mesh(
      object.geometry,
      new MeshPhysicalMaterial({
        //颜色为
        color: 'rgb(50,170,255)',
        //金属度
        metalness: 0.5,
        //粗糙度
        roughness: 0.1,
        //透明度
        transmission: 0.9,
        //模型是否透明
        transparent: true
      })
    )
    plane.scale.copy(object.scale)
    plane.rotation.copy(object.rotation)
    plane.position.copy(worldPosition)
    //添加到场景
    this.effectGroup.add(plane)
  }

  animate = dt => {
    if (dt > 1) return false
    this.time.value += dt
    this.cityanimate()
    // 启动
    if (this.isStart) {
      this.StartTime.value += dt * 0.5
      if (this.StartTime.value >= 1) {
        this.StartTime.value = 1
        this.isStart = false
      }
    }
  }
  // 上升线动画
  cityanimate() {
    this.height.value += 0.2
    if (this.height.value > 100) {
      this.height.value = 0.0
    }
  }
}
export default City
