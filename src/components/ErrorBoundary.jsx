import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio ErrorBoundary caught an unhandled error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="max-w-md w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 font-mono text-xl font-bold">
              !
            </div>
            <div className="space-y-2">
              <h1 className="font-akira text-lg sm:text-xl text-white tracking-wider">
                SOMETHING WENT WRONG
              </h1>
              <p className="font-fredoka text-sm text-neutral-400">
                A temporary error occurred while rendering the page. Click below to reload.
              </p>
            </div>
            <button
              onClick={this.handleReload}
              className="px-6 py-2.5 rounded-full bg-white text-black font-akira text-xs tracking-widest hover:bg-neutral-200 transition-colors shadow-lg shadow-white/10 active:scale-95"
            >
              RELOAD PAGE
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
