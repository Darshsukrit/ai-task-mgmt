import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // TODO: log to monitoring service
    // console.error(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[480px] rounded-xl border border-[var(--color-border)] bg-[var(--color-elevated)] flex items-center justify-center">
          <div className="text-sm text-zinc-500">Something went wrong loading this section.</div>
        </div>
      )
    }
    return this.props.children
  }
}
