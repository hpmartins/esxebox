import React, { Component, useRef, useEffect } from 'react'
import { connect } from 'react-redux';
import { extend, Canvas, useRender, useThree, useUpdate } from 'react-three-fiber'
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
    <mesh position={[0, 0, props.thickness[1]]}>
      <boxGeometry attach="geometry" args={[1.5, 1.5, props.thickness[0]]} />
      <meshLambertMaterial attach="material" color={props.color} />
    </mesh>
  )
}

function Layers(props) {
  const layers = props.layers.slice().reverse();
  return (
    <group>
      {(layers && layers.map((layer, idx) =>
        <OneLayer
              key={layer.index}
              thickness={layer.NormalizedThickness}
              color={layer.Color || randomColor()}/>
      ))}
    </group>
  );
}

function InsideCanvas(props) {
  const camera = useRef()
  const controls = useRef()
  const { canvas, size, setDefaultCamera } = useThree()
  useEffect(() => void setDefaultCamera(camera.current), [setDefaultCamera])
  useRender(() => {controls.current.update()})
  // useRender(() => {console.log(camera.current.position)})
  return (
    <>
      <perspectiveCamera
        ref={camera}
        fov={65}
        position={[4, 4, 3]}
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
            maxPolarAngle={Math.PI/2.1}
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

function SampleCanvas(props) {
    return (
          <Canvas updateDefaultCamera={true}>
            <InsideCanvas layers={props.layers}/>
          </Canvas>
    );
}

const mapStateToProps = state => {
  return {
    layers: state.root.yxro.layers,
  }
}
export default connect(mapStateToProps)(SampleCanvas);
