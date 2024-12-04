
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './ErrorBoundary.tsx'
createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
    <App />
  </ErrorBoundary>,
)
