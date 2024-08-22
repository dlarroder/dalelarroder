'use client';
import React from 'react';
import { useGLTF } from '@react-three/drei';

export function Model(props) {
  const { nodes, materials } = useGLTF('/frozenwhaleL-transformed.glb');
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.bubbles.geometry} material={materials.cube_bubbles_mat} />
      <mesh geometry={nodes.arrows.geometry} material={materials.weapons_mat} />
      <mesh geometry={nodes.球体.geometry} material={materials.cube_mat} />
      <mesh geometry={nodes.efish.geometry} material={materials.efish} />
      <mesh geometry={nodes.shark.geometry} material={materials.shark} />
      <mesh geometry={nodes.turtle.geometry} material={materials.turtle} />
      <mesh geometry={nodes.bluewhale_1.geometry} material={materials.bluewhale} />
      <mesh geometry={nodes.bluewhale_2.geometry} material={materials['03 - Default.002']} />
    </group>
  );
}

useGLTF.preload('/frozenwhaleL-transformed.glb');
