import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

console.log("👋 main.tsx is executing");

const rootElement = document.getElementById('root');
console.log("🔍 rootElement is:", rootElement);

if (!rootElement) {
  throw new Error("❌ Could not find element with id 'root'. Make sure it's in index.html!");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
