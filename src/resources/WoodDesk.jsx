import { useTexture } from '@react-three/drei'
import { folder, useControls } from 'leva'
import { useEffect } from 'react'
import * as THREE from 'three'
import woodColor from '../../asset/Wood051_1K-JPG/Wood051_1K-JPG_Color.jpg'
import woodDisplacement from '../../asset/Wood051_1K-JPG/Wood051_1K-JPG_Displacement.jpg'
import woodNormal from '../../asset/Wood051_1K-JPG/Wood051_1K-JPG_NormalGL.jpg'
import woodRoughness from '../../asset/Wood051_1K-JPG/Wood051_1K-JPG_Roughness.jpg'

function WoodDesk()
{
    const [colorMap, displacementMap, normalMap, roughnessMap] = useTexture([
        woodColor,
        woodDisplacement,
        woodNormal,
        woodRoughness
    ])

    const {
        positionX,
        positionY,
        positionZ,
        width,
        depth,
        topOffsetY,
        repeatX,
        repeatY,
        displacementScale,
        normalScale,
        roughness,
        envMapIntensity
    } = useControls('Wood Desk', {
        transform: folder({
            positionX: { value: 2, min: -2, max: 2, step: 0.01 },
            positionY: { value: -1.0, min: -2, max: -1, step: 0.01 },
            positionZ: { value: -0.5, min: -2, max: 2, step: 0.01 }
        }),
        shape: folder({
            width: { value: 20, min: 2, max: 20, step: 0.05 },
            depth: { value: 8.60, min: 1.5, max: 15, step: 0.05 },
            topOffsetY: { value: 0.1, min: 0.02, max: 0.24, step: 0.005 }
        }),
        texture: folder({
            repeatX: { value: 1.8, min: 0.5, max: 8, step: 0.05 },
            repeatY: { value: 2.05, min: 0.3, max: 5, step: 0.05 },
            displacementScale: { value: 0.02, min: 0, max: 0.12, step: 0.001 },
            normalScale: { value: 1, min: 0, max: 3, step: 0.05 }
        }),
        material: folder({
            roughness: { value: 0.72, min: 0, max: 1, step: 0.01 },
            envMapIntensity: { value: 0.32, min: 0, max: 2, step: 0.01 }
        })
    })

    useEffect(() =>
    {
        colorMap.colorSpace = THREE.SRGBColorSpace

        for(const texture of [colorMap, displacementMap, normalMap, roughnessMap])
        {
            texture.wrapS = THREE.RepeatWrapping
            texture.wrapT = THREE.RepeatWrapping
            texture.repeat.set(repeatX, repeatY)
            texture.anisotropy = 8
            texture.needsUpdate = true
        }
    }, [colorMap, displacementMap, normalMap, roughnessMap, repeatX, repeatY])

    return <group position={[positionX, positionY, positionZ]}>
        <mesh
            position={[0, topOffsetY, 0]}
            rotation-x={-Math.PI * 0.5}
            castShadow
            receiveShadow
        >
            <planeGeometry args={[width, depth, 160, 84]} />
            <meshStandardMaterial
                map={colorMap}
                roughnessMap={roughnessMap}
                normalMap={normalMap}
                normalScale={[normalScale, normalScale]}
                displacementMap={displacementMap}
                displacementScale={displacementScale}
                roughness={roughness}
                metalness={0}
                envMapIntensity={envMapIntensity}
            />
        </mesh>
    </group>
}

export default WoodDesk
