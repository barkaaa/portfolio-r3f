import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import { Perf } from 'r3f-perf'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <Leva collapsed={ false } />
        <Canvas
            className="r3f"
            camera={ {
                fov: 45,
                near: 0.1,
                far: 2000,
                position: [ -3, 1.5, 4 ]
            } }
        >
            <Perf
                position="top-left"
                openByDefault
                showGraph
                deepAnalyze
            />
            <Experience />
        </Canvas>
    </>
)
