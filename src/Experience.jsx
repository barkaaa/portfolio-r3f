import { ContactShadows, Environment, Float, Html, PresentationControls, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import DeskLamp from './resources/DeskLamp.jsx'
import WoodDesk from './resources/WoodDesk.jsx'
import terminalHtml from './zth-terminal.html?raw'

export default function Experience()
{
    const computer = useGLTF('https://threejs-journey.com/resources/models/macbook_model.gltf')
    const { camera, size } = useThree()
    const isMobile = size.width <= 640

    useEffect(() =>
    {
        if (isMobile)
        {
            camera.position.set(0, 1.05, 4.75)
            camera.fov = 40
            camera.lookAt(0, 0.05, 0)
        }
        else
        {
            camera.position.set(-3, 1.5, 4)
            camera.fov = 45
            camera.lookAt(0, 0, 0)
        }

        camera.updateProjectionMatrix()
    }, [camera, isMobile])

    return <>
        <Environment preset='city' />
        <color args={[ '#241a1a']} attach="background"/>

        <PresentationControls 
            global
            rotation={ isMobile ? [0.08, 0, 0] : [ 0.13, 0.1, 0 ] }
            polar={ isMobile ? [-0.12, 0.12] : [ - 0.4, 0.2 ] }
            azimuth={ isMobile ? [-0.22, 0.22] : [ - 1, 0.75 ] }
            damping={ 0.1 }
            snap
        >

            <Float rotationIntensity={ isMobile ? 0.18 : 0.4 }>

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
                        distanceFactor={1.17}
                        zIndexRange={[10, 0]}
                        position={[0, 1.56, - 1.4]}
                        rotation-x={-0.256}
                    >
                        <iframe srcDoc={ terminalHtml } title="RYU portfolio terminal" />
                    </Html>
                </primitive>
                <Html
                    transform
                    wrapperClass='portfolioTitle'
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
