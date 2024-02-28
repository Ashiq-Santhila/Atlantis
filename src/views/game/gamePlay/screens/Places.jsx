

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('./places.glb')
useGLTF.preload('./places.glb');
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.court_house1.geometry} material={nodes.court_house1.material} scale={0.01} />
    </group>
  )
}

useGLTF.preload('./places.glb')


