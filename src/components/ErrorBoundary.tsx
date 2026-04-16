import React from "react"

type Props = {
  children: React.ReactNode
}

type State = {
  error: unknown
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: unknown): State {
    return { error }
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="min-h-dvh bg-white px-6 py-12 text-zinc-900">
        <div className="mx-auto max-w-xl">
          <div className="text-lg font-semibold">页面渲染失败</div>
          <div className="mt-2 text-sm text-zinc-600">可能是本地缓存的数据结构不兼容。可以尝试清空本地数据后重新进入。</div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
              onClick={() => {
                try {
                  localStorage.clear()
                } finally {
                  location.reload()
                }
              }}
            >
              清空本地数据并刷新
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700"
              onClick={() => location.reload()}
            >
              仅刷新
            </button>
          </div>
        </div>
      </div>
    )
  }
}

