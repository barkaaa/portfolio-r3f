import { ContactShadows, Environment, Float, Html, PresentationControls, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { useEffect, useMemo, useRef } from 'react'
import { Matrix4, Quaternion, Vector3 } from 'three'
import DeskLamp from './resources/DeskLamp.jsx'
import WoodDesk from './resources/WoodDesk.jsx'
import terminalHtml from './zth-terminal.html?raw'

// Screen size in world units: Html transform scales CSS px by distanceFactor / 400
const SCREEN_DISTANCE_FACTOR = 1.17
const SCREEN_WIDTH = 1024 * SCREEN_DISTANCE_FACTOR / 400
const SCREEN_HEIGHT = 670 * SCREEN_DISTANCE_FACTOR / 400
const FRONT_VIEW_MARGIN = 1.12

export default function Experience({ frontView = false })
{
    const computer = useGLTF('https://threejs-journey.com/resources/models/macbook_model.gltf')
    const { camera, size } = useThree()
    const isMobile = size.width <= 640
    const screenAnchor = useRef()
    const temp = useMemo(() => ({
        defaultPosition: new Vector3(),
        defaultQuaternion: new Quaternion(),
        center: new Vector3(),
        normal: new Vector3(),
        up: new Vector3(),
        quaternion: new Quaternion(),
        targetPosition: new Vector3(),
        targetQuaternion: new Quaternion(),
        lookMatrix: new Matrix4(),
    }), [])

    useEffect(() =>
    {
        if (isMobile)
        {
            temp.defaultPosition.set(0, 1.05, 4.75)
            camera.fov = 40
            temp.lookMatrix.lookAt(temp.defaultPosition, new Vector3(0, 0.05, 0), new Vector3(0, 1, 0))
        }
        else
        {
            temp.defaultPosition.set(-3, 1.5, 4)
            camera.fov = 45
            temp.lookMatrix.lookAt(temp.defaultPosition, new Vector3(0, 0, 0), new Vector3(0, 1, 0))
        }

        temp.defaultQuaternion.setFromRotationMatrix(temp.lookMatrix)
        camera.position.copy(temp.defaultPosition)
        camera.quaternion.copy(temp.defaultQuaternion)

        camera.updateProjectionMatrix()
    }, [camera, isMobile, temp])

    useFrame((state, delta) =>
    {
        if (frontView && screenAnchor.current)
        {
            // Place the camera straight in front of the screen, far enough to fit it entirely
            const anchor = screenAnchor.current
            anchor.getWorldPosition(temp.center)
            anchor.getWorldQuaternion(temp.quaternion)
            temp.normal.set(0, 0, 1).applyQuaternion(temp.quaternion)
            temp.up.set(0, 1, 0).applyQuaternion(temp.quaternion)

            const halfFov = (camera.fov * Math.PI / 180) / 2
            const fitHeight = (SCREEN_HEIGHT / 2) / Math.tan(halfFov)
            const fitWidth = (SCREEN_WIDTH / 2) / (Math.tan(halfFov) * camera.aspect)
            const distance = Math.max(fitHeight, fitWidth) * FRONT_VIEW_MARGIN

            temp.targetPosition.copy(temp.center).addScaledVector(temp.normal, distance)
            temp.lookMatrix.lookAt(temp.targetPosition, temp.center, temp.up)
            temp.targetQuaternion.setFromRotationMatrix(temp.lookMatrix)
        }
        else
        {
            temp.targetPosition.copy(temp.defaultPosition)
            temp.targetQuaternion.copy(temp.defaultQuaternion)
        }

        easing.damp3(camera.position, temp.targetPosition, 0.35, delta)
        easing.dampQ(camera.quaternion, temp.targetQuaternion, 0.35, delta)
    })

    return <>
        <Environment preset='city' />
        <color args={[ '#241a1a']} attach="background"/>

        <PresentationControls 
            global
            enabled={ !frontView }
            rotation={ isMobile ? [0.08, 0, 0] : [ 0.13, 0.1, 0 ] }
            polar={ isMobile ? [-0.12, 0.12] : [ - 0.4, 0.2 ] }
            azimuth={ isMobile ? [-0.22, 0.22] : [ - 1, 0.75 ] }
            damping={ 0.1 }
            snap
        >

            <Float enabled={ !frontView } rotationIntensity={ isMobile ? 0.18 : 0.4 }>

                <rectAreaLight
                    width={ 2.5 }
                    height={ 1.65 }
                    intensity={ 30 }
                    color={ '#d8f7b8'}  
                    rotation={[0.1, Math.PI, 0]}
                    position={[0, 0.55, - 1.15]}
                />
                <primitive 
                    object={ computer.scene } 
                    position-y={ -1.2 }
                >
                    <Html
                        transform
                        wrapperClass='htmlScreen'
                        distanceFactor={ SCREEN_DISTANCE_FACTOR }
                        zIndexRange={[10, 0]}
                        position={[0, 1.56, - 1.4]}
                        rotation-x={-0.256}
                    >
                        <iframe srcDoc={ terminalHtml } title="RYU portfolio terminal" />
                    </Html>
                    <group ref={ screenAnchor } position={[0, 1.56, - 1.4]} rotation-x={-0.256} />
                </primitive>
                <Html
                    transform
                    wrapperClass={ `portfolioTitle${frontView ? ' isHidden' : ''}` }
                    distanceFactor={1.17}
                    zIndexRange={[20, 11]}
                    position={ [2, 0.75, 0.75 ]}
                    rotation-y={ -1.75 }
                >
                    <div>PORTFOLIO</div>
                </Html>
            </Float>
        </PresentationControls>
        <ContactShadows 
            position-y={ -1.52 }
            opacity={ 0.32 }
            scale={ 4.2 }
            blur={ 1.9 }
        />
    </>
}
