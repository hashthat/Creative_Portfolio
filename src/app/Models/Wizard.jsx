"use client"
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

// Use absolute path from public folder
const MODEL_PATH = '/models/An_anime_style_young__0630024801_texture-transformed.glb'

export default function Wizard(props) {
    const { nodes } = useGLTF(MODEL_PATH)
    const modelRef = useRef()

    useFrame((state) => {
        modelRef.current.position.y = -1 + Math.sin(state.clock.elapsedTime) * 0.15
    })

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                ref={modelRef}
                scale={1.25}
                geometry={nodes.mesh_0.geometry}
                material={nodes.mesh_0.material}
            />
        </group>
    )
}

// Must use EXACTLY the same path for preload
// useGLTF.preload('/models/An_anime_style_young__0630024801_texture-transformed.glb')
