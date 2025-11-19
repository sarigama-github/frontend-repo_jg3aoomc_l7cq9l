import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import ErrorBoundary from './ErrorBoundary'
import { useEffect, useMemo, useRef, useState } from 'react'

const SCENE_URL = 'https://prod.spline.design/2b9mG8ZKx8qvV9lV/scene.splinecode'

export default function Hero3D() {
  const [splineError, setSplineError] = useState(null)
  const [ready, setReady] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [diag, setDiag] = useState({ webgl: 'unknown', webgl2: 'unknown', sceneReachable: 'unknown', notes: [] })
  const abortRef = useRef(null)

  // Feature + reachability diagnostics
  useEffect(() => {
    // WebGL detection
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      const gl2 = canvas.getContext('webgl2')
      setDiag((d) => ({ ...d, webgl: !!gl, webgl2: !!gl2 }))
    } catch (e) {
      setDiag((d) => ({ ...d, webgl: false, webgl2: false, notes: [...d.notes, 'WebGL context creation threw an error'] }))
    }

    // Reachability probe with timeout (opaque in no-cors, but success still indicates connectivity)
    const controller = new AbortController()
    abortRef.current = controller
    const t = setTimeout(() => controller.abort('timeout'), 6000)

    fetch(SCENE_URL, { mode: 'no-cors', method: 'GET', signal: controller.signal })
      .then(() => setDiag((d) => ({ ...d, sceneReachable: 'likely-ok' })))
      .catch((err) => {
        const reason = String(err && err.message ? err.message : err)
        setDiag((d) => ({ ...d, sceneReachable: reason === 'timeout' ? 'timeout' : 'error', notes: [...d.notes, `Scene probe failed: ${reason}`] }))
      })
      .finally(() => clearTimeout(t))

    return () => {
      controller.abort('unmount')
      clearTimeout(t)
    }
  }, [])

  // Timeout safety: if Spline takes too long to load, we show graceful fallback
  useEffect(() => {
    const id = setTimeout(() => {
      if (!ready) {
        setSplineError(new Error('Spline load timeout: 8s without ready event'))
        setDiag((d) => ({ ...d, notes: [...d.notes, 'Timed out waiting for Spline onLoad'] }))
      }
    }, 8000)
    return () => clearTimeout(id)
  }, [ready, retryCount])

  const resetAndRetry = () => {
    setSplineError(null)
    setReady(false)
    setRetryCount((c) => c + 1)
  }

  const Fallback = ({ error, errorInfo }) => (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(56,189,248,0.25),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_70%,rgba(59,130,246,0.2),transparent)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-10 w-full">
        <div className="py-20 md:py-28">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 ring-1 ring-white/20">Premium Moving Services</span>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Move without the stress. We handle everything.
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/80 max-w-xl">
              Our 3D experience is unavailable right now, but you can still explore services and get a quote below.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#cta" className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 transition">Get a fast quote</a>
              <a href="#services" className="inline-flex justify-center items-center px-6 py-3 rounded-lg border border-white/20 text-white/90 hover:bg-white/10 transition">Explore services</a>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button onClick={resetAndRetry} className="inline-flex justify-center items-center px-4 py-2 rounded-lg bg-white/90 text-slate-900 font-semibold hover:bg-white transition">
                Retry 3D
              </button>
              <a href="#hero-static" className="inline-flex justify-center items-center px-4 py-2 rounded-lg border border-white/20 text-white/90 hover:bg-white/10 transition">View static preview</a>
            </div>

            <details className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
              <summary className="cursor-pointer text-white/80">Why the 3D section failed</summary>
              <ul className="mt-3 list-disc pl-5 text-sm text-white/75 space-y-1">
                <li>Network blocked or slow: the Spline scene may not have loaded in time.</li>
                <li>Third-party script error: the Spline renderer threw an exception.</li>
                <li>Unsupported browser/GPU feature: WebGL/WebGPU not available or disabled.</li>
                <li>Cross-origin restrictions: the scene URL was unreachable from this environment.</li>
                {error && <li className="break-words">Error: {String(error)}</li>}
                {splineError && !error && <li className="break-words">{String(splineError.message)}</li>}
                {errorInfo?.componentStack && (
                  <li>
                    <div className="mt-2 text-white/60 text-xs whitespace-pre-wrap">{errorInfo.componentStack}</div>
                  </li>
                )}
                <li className="mt-2">Diagnostics:</li>
                <li className="ml-5 text-white/70">WebGL: {String(diag.webgl)}</li>
                <li className="ml-5 text-white/70">WebGL2: {String(diag.webgl2)}</li>
                <li className="ml-5 text-white/70">Scene reachability: {diag.sceneReachable}</li>
                {diag.notes?.length > 0 && (
                  <li className="ml-5 text-white/60 text-xs whitespace-pre-wrap">Notes: {diag.notes.join(' | ')}</li>
                )}
              </ul>
            </details>
          </motion.div>
        </div>

        <div id="hero-static" className="hidden lg:block relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-white/10" />
          <img
            alt="Moving team hero preview"
            className="relative rounded-3xl border border-white/10 shadow-2xl shadow-cyan-500/10 backdrop-blur"
            src="https://images.unsplash.com/photo-1581094489790-5c76e8cd762d?q=80&w=1600&auto=format&fit=crop"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  )

  const splineKey = useMemo(() => `spline-${retryCount}`, [retryCount])

  return (
    <ErrorBoundary renderFallback={Fallback}>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(56,189,248,0.25),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_70%,rgba(59,130,246,0.2),transparent)]" />
        </div>

        <div className="absolute right-0 top-0 h-[110vh] w-full lg:w-1/2 opacity-90">
          <div className="h-full w-full">
            {!splineError && (
              <Spline
                key={splineKey}
                scene={SCENE_URL}
                onLoad={() => setReady(true)}
                onError={(e) => {
                  const err = e instanceof Error ? e : new Error('Unknown Spline load error')
                  setSplineError(err)
                  // eslint-disable-next-line no-console
                  console.error('[Hero3D] Spline failed to load:', err)
                }}
              />
            )}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-10 w-full">
          <div className="py-28 md:py-36">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 ring-1 ring-white/20">Premium Moving Services</span>
              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Move without the stress. We handle everything.
              </h1>
              <p className="mt-4 text-lg md:text-xl text-white/80 max-w-xl">
                Residential, commercial, and long-distance moves with white‑glove packing, secure storage, and real‑time updates.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#cta" className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 transition">Get a fast quote</a>
                <a href="#services" className="inline-flex justify-center items-center px-6 py-3 rounded-lg border border-white/20 text-white/90 hover:bg-white/10 transition">Explore services</a>
              </div>

              <div className="mt-8 flex items-center gap-6 text-white/70">
                <div className="flex -space-x-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur ring-2 ring-white/30" />
                  ))}
                </div>
                <p className="text-sm">Trusted by 1,200+ happy customers</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
      </section>
    </ErrorBoundary>
  )
}
