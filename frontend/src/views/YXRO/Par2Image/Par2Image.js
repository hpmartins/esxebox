import * as THREE from 'three'
import React, { Component, useState, useRef, useContext, useEffect, useCallback } from 'react'
import { apply, Canvas, useRender, useThree } from 'react-three-fiber'
import { Col, Container, Row } from 'reactstrap';
import { randomColor } from 'randomcolor';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
apply({ OrbitControls })

function OneLayer(props) {
  const [hovered, set] = useState(false)
  const hover = useCallback(() => set(true), [])
  const unhover = useCallback(() => set(false), [])
  return (
    <mesh onPointerOver={hover} onPointerOut={unhover} position={[0, props.normthickness[1], 0]}>
      <boxGeometry attach="geometry" args={[1, props.normthickness[0], 1]} />
      <meshLambertMaterial attach="material" color={props.color} opacity={hovered ? 0.3 : 1.0} />
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
  total_thickness /= 2
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
  const { size, setDefaultCamera } = useThree()
  useEffect(() => void setDefaultCamera(camera.current), [])
  useRender(() => controls.current.update())
  return (
    <>
      <perspectiveCamera
        ref={camera}
        aspect={size.width / size.height}
        radius={(size.width + size.height) / 4}
        fov={80}
        position={[3, 3, 3]}
        onUpdate={self => self.updateProjectionMatrix()}
      />
      {camera.current && (
        <scene>
          <orbitControls
            ref={controls}
            args={[camera.current]}
            enableDamping
            enablePan={false}
            dampingFactor={0.1}
            minDistance={0}
            maxDistance={20}
            rotateSpeed={0.1}
          />
          <ambientLight color="lightblue" />
          <pointLight intensity={1} position={[0, 0, 3]} />
          <Layers list={layerlist} normthickness={normthickness} camera={camera.current} />
        </scene>
      )}
    </>
  )
}

class Par2Image extends Component {
  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col lg={6} style={{height: '70vh'}}>
            <Canvas style={{ background: '#272727' }}>
              <InsideCanvas />
            </Canvas>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Par2Image;
