import './style.css'
import { Component, Suspense, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import { DefaultLoadingManager } from 'three'
import Experience from './Experience.jsx'
import terminalHtml from './zth-terminal.html?raw'

const root = ReactDOM.createRoot(document.querySelector('#root'))

function canUseWebGL()
{
    try
    {
        const canvas = document.createElement('canvas')
        return Boolean(
            window.WebGLRenderingContext &&
            (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        )
    }
    catch
    {
        return false
    }
}

class CanvasErrorBoundary extends Component
{
    constructor(props)
    {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError()
    {
        return { hasError: true }
    }

    componentDidCatch(error)
    {
        console.warn('Falling back to terminal view because WebGL failed.', error)
    }

    render()
    {
        if (this.state.hasError)
            return this.props.fallback

        return this.props.children
    }
}

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

function useIsMobile()
{
    const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 640px)').matches)

    useEffect(() =>
    {
        const query = window.matchMedia('(max-width: 640px)')
        const update = () => setIsMobile(query.matches)

        update()
        query.addEventListener('change', update)

        return () =>
        {
            query.removeEventListener('change', update)
        }
    }, [])

    return isMobile
}

function TerminalFallback()
{
    return <main className="terminalFallbackPage">
        <iframe srcDoc={ terminalHtml } title="RYU portfolio terminal" />
    </main>
}

function App()
{
    const isMobile = useIsMobile()
    const [webGLAvailable, setWebGLAvailable] = useState(() => canUseWebGL())

    if (isMobile || !webGLAvailable)
        return <TerminalFallback />

    return <CanvasErrorBoundary fallback={ <TerminalFallback /> }>
        <Leva collapsed={ false } />
        <>
            <Canvas
                className="r3f"
                camera={ {
                    fov: 45,
                    near: 0.1,
                    far: 2000,
                    position: [ -3, 1.5, 4 ]
                } }
                onCreated={ ({ gl }) =>
                {
                    gl.domElement.addEventListener('webglcontextlost', () =>
                    {
                        setWebGLAvailable(false)
                    }, { once: true })
                } }
            >
                <Suspense fallback={ null }>
                    <Experience />
                </Suspense>
            </Canvas>
            <LoadingOverlay />
        </>
    </CanvasErrorBoundary>
}

root.render(
    <App />
)
