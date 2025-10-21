import React, { useState, useEffect } from 'react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevenir que Chrome 67 y anteriores muestren automáticamente el prompt
      e.preventDefault();
      // Guardar el evento para que se pueda mostrar más tarde
      setDeferredPrompt(e);
      // Mostrar nuestro botón de instalación personalizado
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      console.log('PWA instalada exitosamente');
      setShowInstallButton(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Verificar si ya está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Mostrar el prompt de instalación
    deferredPrompt.prompt();

    // Esperar a que el usuario responda al prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('Usuario aceptó la instalación');
    } else {
      console.log('Usuario rechazó la instalación');
    }

    // Limpiar el prompt diferido
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  if (!showInstallButton) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto z-50">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-4 shadow-2xl border border-purple-400/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="text-2xl">📱</div>
          <div className="flex-1">
            <div className="font-semibold text-sm">¡Instala Tetris Papa!</div>
            <div className="text-xs text-purple-100">Juega offline cuando quieras</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowInstallButton(false)}
              className="text-purple-200 hover:text-white text-xs px-2 py-1 rounded transition-colors"
            >
              Después
            </button>
            <button
              onClick={handleInstallClick}
              className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded font-semibold transition-all duration-200"
            >
              Instalar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;