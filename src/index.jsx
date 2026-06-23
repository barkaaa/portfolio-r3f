import './style.css'
import { Suspense, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import { DefaultLoadingManager } from 'three'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

const loadingState = { progress: 0, visible: true }
const loadingListeners = new Set()
let loadingFrame = 0
let loadingHideTimer = 0
let loadingHasCompleted = false

function setLoadingState(nextState)
{
    Object.assign(loadingState, nextState)
    cancelAnimationFrame(loadingFrame)
    loadingFrame = requestAnimationFrame(() =>
    {
        loadingListeners.forEach((listener) => listener({ ...loadingState }))
    })
}

DefaultLoadingManager.onStart = () =>
{
    if (loadingHasCompleted)
        return

    clearTimeout(loadingHideTimer)
    setLoadingState({ visible: true })
}

DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) =>
{
    if (loadingHasCompleted)
        return

    const progress = itemsTotal ? (itemsLoaded / itemsTotal) * 100 : 0
    setLoadingState({ progress: Math.max(loadingState.progress, progress), visible: true })
}

DefaultLoadingManager.onLoad = () =>
{
    loadingHasCompleted = true
    setLoadingState({ progress: 100, visible: true })
    loadingHideTimer = setTimeout(() =>
    {
        setLoadingState({ progress: 100, visible: false })
    }, 450)
}

DefaultLoadingManager.onError = () =>
{
    loadingHasCompleted = true
    setLoadingState({ progress: 100, visible: false })
}

function LoadingOverlay()
{
    const [{ progress, visible }, setOverlayState] = useState(() => ({ ...loadingState }))
    const roundedProgress = Math.round(progress)

    useEffect(() =>
    {
        loadingListeners.add(setOverlayState)
        setOverlayState({ ...loadingState })

        return () =>
        {
            loadingListeners.delete(setOverlayState)
        }
    }, [])

    return <div
        className={ `loadingScene${visible ? '' : ' isHidden'}` }
        role="status"
        aria-label={ `Loading 3D scene ${roundedProgress}%` }
    >
        <div className="loadingPanel">
            <div className="loadingTitle">LOADING 3D SCENE</div>
            <div className="loadingBar3d" style={{ '--progress-scale': Math.min(progress / 100, 1) }}>
                <div className="loadingTrack">
                    <div className="loadingFill">
                        <span className="loadingGlow" />
                    </div>
                </div>
                <div className="loadingBarTop" />
                <div className="loadingBarSide" />
            </div>
            <div className="loadingMeta">
                <span>assets</span>
                <span>{roundedProgress}%</span>
            </div>
        </div>
    </div>
}

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
            <Suspense fallback={ null }>
                <Experience />
            </Suspense>
        </Canvas>
        <LoadingOverlay />
    </>
)
