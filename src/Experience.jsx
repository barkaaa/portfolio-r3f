import { ContactShadows, Environment, Float, Html, PresentationControls, Text, useGLTF } from '@react-three/drei'
import DeskLamp from './resources/DeskLamp.jsx'
import WoodDesk from './resources/WoodDesk.jsx'
import terminalHtml from './zth-terminal.html?raw'

export default function Experience()
{
    const computer = useGLTF('https://threejs-journey.com/resources/models/macbook_model.gltf')

    return <>
        <Environment preset='city' />
        <color args={[ '#241a1a']} attach="background"/>

        <PresentationControls 
            global
            rotation={ [ 0.13, 0.1, 0 ] }
            polar={ [ - 0.4, 0.2 ] }
            azimuth={ [ - 1, 0.75 ] }
            damping={ 0.1 }
            snap
        >

            <Float rotationIntensity={ 0.4 }>

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
                        position={[0, 1.56, - 1.4]}
                        rotation-x={-0.256}
                    >
                        <iframe srcDoc={ terminalHtml } title="ZTH terminal portfolio" />
                    </Html>
                </primitive>
                <Text 
                    font='./bangers-v20-latin-regular.woff'
                    fontSize={ 1 }
                    position={ [2, 0.75, 0.75 ]}
                    rotate-y={ -1.75 }
                    maxWidth={ 2 }
                    textAlign='center'
                >PORTFOLIO</Text>
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
