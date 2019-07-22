import React, { Component, useRef, useEffect } from 'react'
import { extend, Canvas, useRender, useThree } from 'react-three-fiber'
import { randomColor } from 'randomcolor';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
extend({ OrbitControls })

function Ground() {
  return (
    <mesh position={[0, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[2000, 2000]} />
      <meshLambertMaterial
        attach="material"
        color="#a0a0a0"
        depthWrite={false}
        rotation={[-Math.PI/2, 0, 0]} />
    </mesh>
  )
}

function OneLayer(props) {
  return (
    <mesh position={[0, 0, props.normthickness[1]]}>
      <boxGeometry attach="geometry" args={[1.5, 1.5, props.normthickness[0]]} />
      <meshLambertMaterial attach="material" color={props.color} />
    </mesh>
  )
}

function Layers(props) {
  const group = useRef()
  const layers = props.list;
  const layersList = layers.map((layer) =>
    <OneLayer
      key={layer.index.toString()}
      thickness={layer.thickness}
      normthickness={props.normthickness[layer.index]}
      color={randomColor()}/>
  );
  return (
    <group ref={group}>
      {layersList}
    </group>
  )
}

const layerlist = [
    {
        index: 0, name: 'A', thickness: 10,
    },
    {
        index: 1, name: 'B', thickness: 20,
    },
    {
        index: 2, name: 'C', thickness: 10,
    },
    {
        index: 3, name: 'C', thickness: 10,
    },
    {
        index: 4, name: 'C', thickness: 10,
    },
    {
        index: 5, name: 'C', thickness: 10,
    },
    {
        index: 6, name: 'C', thickness: 10,
    },
]

function create_normalized_thickness(olist) {
  let out = {}
  let total_thickness = 0
  let y = 0
  for (let key in olist) {
    let obj = olist[key]
    y = y + obj.thickness/2
    out[obj.index] = [obj.thickness, y]
    y = y + obj.thickness/2
    total_thickness += obj.thickness
  }
  for (let key in out) {
    out[key][0] /= total_thickness
    out[key][1] /= total_thickness
  }
  return out
}

const normthickness = create_normalized_thickness(layerlist)

function InsideCanvas() {
  const camera = useRef()
  const controls = useRef()
  const { canvas, size, setDefaultCamera } = useThree()
  useEffect(() => void setDefaultCamera(camera.current), [setDefaultCamera])
  useRender(() => controls.current.update())
  return (
    <>
      <perspectiveCamera
        ref={camera}
        aspect={size.width / size.height}
        fov={65}
        position={[4, 4, 4]}
        up={[0, 0, 1]}
        far={20}
        onUpdate={self => self.updateProjectionMatrix()}
      />
      {camera.current && (
        <scene>
          <orbitControls
            ref={controls}
            args={[camera.current, canvas]}
            enableDamping
            enablePan={false}
            dampingFactor={0.1}
            minDistance={2}
            maxDistance={8}
            rotateSpeed={0.1}
            maxPolarAngle={Math.PI/2.2}
            minPolarAngle={0} />
          <hemisphereLight color='white' intensity={0.6} position={[0, 0, 3]} />
          <directionalLight color='#ffffff' intensity={0.6} position={[0.73, 1, 1]} />
          <Layers list={layerlist} normthickness={normthickness} camera={camera.current} />
          <Ground />
          <gridHelper
            position={[0, 0, 0]}
            args={[40, 40]}
            receiveShadow={1}
            rotation={[-Math.PI/2, 0, 0]}/>
        </scene>
      )}
    </>
  )
}

class Visualize extends Component {
  render() {
    return (
          <Canvas>
            <InsideCanvas />
          </Canvas>
    )
  }
}

export default Visualize;
