import { createContext, useContext, useCallback, useRef, useState } from 'react'

const ToastContext = createContext(null)

// Lightweight toast system. Every meaningful action (add to cart, remove,
// submit survey, place order) confirms itself with a toast, a concrete
// application of "Visibility of System Status".
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const notify = useCallback(
    (message, type = 'success') => {
      const id = ++idRef.current
      setToasts((t) => [...t, { id, message, type }])
      // Auto-dismiss keeps the UI minimalist and unobtrusive.
      setTimeout(() => dismiss(id), 3200)
    },
    [dismiss]
  )

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="toast-wrap" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast--${t.type}`}>
            <span className="toast__icon" aria-hidden="true">
              {t.type === 'success' ? '✓' : 'ℹ'}
            </span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
