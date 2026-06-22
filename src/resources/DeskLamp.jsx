import { useGLTF } from '@react-three/drei'
import { folder, useControls } from 'leva'
import { useEffect } from 'react'
import * as THREE from 'three'
import deskLampModel from '../../asset/desk_lamp.glb'

function DeskLamp()
{
    const lamp = useGLTF(deskLampModel)

    const {
        positionX,
        positionY,
        positionZ,
        rotationY,
        scale,
        lightX,
        lightY,
        lightZ,
        lightIntensity,
        lightDistance,
        lightColor
    } = useControls('Desk Lamp', {
        transform: folder({
            positionX: { value: 2.4, min: -4, max: 4, step: 0.01 },
            positionY: { value: -0.9, min: -2, max: 2, step: 0.01 },
            positionZ: { value: -1, min: -4, max: 4, step: 0.01 },
            rotationY: { value: -2.5, min: -Math.PI, max: Math.PI, step: 0.01 },
            scale: { value: 1, min: 0.05, max: 3, step: 0.01 }
        }),
        light: folder({
            lightX: { value: 0.15, min: -2, max: 2, step: 0.01 },
            lightY: { value: 1.25, min: -1, max: 3, step: 0.01 },
            lightZ: { value: 0.15, min: -2, max: 2, step: 0.01 },
            lightIntensity: { value: 6.5, min: 0, max: 40, step: 0.1 },
            lightDistance: { value: 4.2, min: 0.5, max: 10, step: 0.1 },
            lightColor: '#ffd08a'
        })
    })

    useEffect(() =>
    {
        lamp.scene.traverse((child) =>
        {
            if(child.isMesh)
            {
                child.castShadow = true
                child.receiveShadow = true

                if(child.material)
                    child.material.side = THREE.FrontSide
            }
        })
    }, [lamp.scene])

    return <group
        position={[positionX, positionY, positionZ]}
        rotation-y={rotationY}
        scale={scale}
    >
        <primitive object={lamp.scene} />
        <pointLight
            color={lightColor}
            intensity={lightIntensity}
            distance={lightDistance}
            decay={2}
            position={[lightX, lightY, lightZ]}
        />
    </group>
}

useGLTF.preload(deskLampModel)

export default DeskLamp
