import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then(() => {
            // Service worker registered
          })
          .catch(() => {
            // Service worker registration failed
          });
      });
    }
  }, []);

  return null;
}
