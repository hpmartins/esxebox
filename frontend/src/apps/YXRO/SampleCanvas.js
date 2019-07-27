import React, { Component, useRef, useEffect } from 'react'
import { connect } from 'react-redux';
import { extend, Canvas, useRender, useThree } from 'react-three-fiber'
import { randomColor } from 'randomcolor';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
extend({ OrbitControls })

function create_normalized_thickness(olist) {
  let out = {}
  let total_thickness = 0
  let y = 0
  for (let key in olist) {
    let obj = olist[key]
    y = y + obj.Thickness/2
    out[obj.index] = [obj.Thickness, y]
    y = y + obj.Thickness/2
    total_thickness += obj.Thickness
  }
  for (let key in out) {
    out[key][0] /= total_thickness
    out[key][1] /= total_thickness
  }
  return out
}

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

class Layers extends React.Component {
  render() {
    const layers = this.props.layers.slice().reverse();
    const normthickness = create_normalized_thickness(layers)
    const layersList = (layers && layers.map((layer) =>
      <OneLayer
        key={layer.index.toString()}
        thickness={layer.Thickness}
        normthickness={normthickness[layer.index]}
        color={randomColor()}/>
    ));
    return (
      <group>
        {layersList}
      </group>
    );
  }
}

function InsideCanvas(props) {
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
          <Ground />
          <Layers layers={props.layers}/>
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

class SampleCanvas extends Component {
  render() {
    return (
          <Canvas updateDefaultCamera>
            <InsideCanvas layers={this.props.layers}/>
          </Canvas>
    )
  }
}

const mapStateToProps = state => {
  return {
    layers: state.yxro.layers,
  }
}
export default connect(mapStateToProps)(SampleCanvas);
