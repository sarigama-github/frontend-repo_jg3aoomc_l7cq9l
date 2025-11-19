import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo })
    if (typeof window !== 'undefined') {
      // Basic console report for developers
      // eslint-disable-next-line no-console
      console.error('[Hero3D ErrorBoundary] A render error occurred:', error)
      // eslint-disable-next-line no-console
      console.error('[Hero3D ErrorBoundary] Component stack:', errorInfo?.componentStack)
    }
  }

  render() {
    const { hasError, error, errorInfo } = this.state
    const { children, renderFallback } = this.props

    if (hasError) {
      if (typeof renderFallback === 'function') {
        return renderFallback({ error, errorInfo })
      }
      return (
        <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 border-b border-white/10">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold">We couldn't load the 3D section</h2>
            <p className="mt-2 text-white/70">The rest of the page is still available below. Please try refreshing.</p>
            <details className="mt-4 text-left bg-white/5 border border-white/10 rounded-xl p-4">
              <summary className="cursor-pointer text-white/80">Debug details</summary>
              <pre className="mt-3 whitespace-pre-wrap text-xs text-white/70">{String(error)}</pre>
              {errorInfo?.componentStack && (
                <pre className="mt-2 whitespace-pre-wrap text-xs text-white/60">{errorInfo.componentStack}</pre>
              )}
            </details>
          </div>
        </section>
      )
    }

    return children
  }
}
