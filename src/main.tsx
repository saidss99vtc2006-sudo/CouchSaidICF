import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { setupPwa } from "./pwa";

setupPwa();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register service worker (installable app + offline + Google Play TWA support)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    fetch('./sw.js', { method: 'HEAD' })
      .then((r) => { if (r.ok) navigator.serviceWorker.register('./sw.js').catch(() => {}); })
      .catch(() => {});
  });
}
