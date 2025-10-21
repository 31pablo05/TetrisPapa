# 🛠️ Utilidades para Service Worker

## 🧹 Si necesitas limpiar completamente el Service Worker:

### Método 1: Desde DevTools (Recomendado)
1. Abre Chrome DevTools (F12)
2. Ve a **Application** → **Service Workers**
3. Busca "Tetris Papa" y haz clic en **Unregister**
4. Ve a **Application** → **Storage** → **Clear storage**
5. Marca solo "Cache storage" y haz clic **Clear site data**

### Método 2: Desde JavaScript Console
Ejecuta esto en la consola del navegador:
```javascript
// Limpiar Service Worker de Tetris Papa
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(registration => {
    if (registration.scope.includes('tetris') || registration.scope.includes('localhost')) {
      registration.unregister();
    }
  });
});

// Limpiar cache específico
caches.keys().then(cacheNames => {
  cacheNames.forEach(cacheName => {
    if (cacheName.includes('tetris-papa')) {
      caches.delete(cacheName);
    }
  });
});
```

### Método 3: Programáticamente (En tu código)
```javascript
// Enviar mensaje para limpiar cache
if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
  navigator.serviceWorker.controller.postMessage({
    type: 'CLEAR_TETRIS_CACHE'
  });
}
```

## 🔒 Protecciones implementadas:

1. **Prefijo único**: `tetris-papa-` solo para este proyecto
2. **Scope limitado**: Solo funciona en la ruta de este proyecto
3. **Cache selectivo**: Solo cachea archivos relevantes
4. **Origen específico**: Solo intercepta requests del mismo dominio
5. **Limpieza inteligente**: Solo elimina caches de este proyecto

## 📍 Ubicación del Service Worker:
- **Desarrollo**: `localhost:5173` (Puerto de Vite)
- **Producción**: Tu dominio de hosting

El Service Worker **NO interferirá** con otros proyectos localhost porque:
- Cada puerto es un origen diferente
- El scope está limitado a este proyecto específico
- Los nombres de cache son únicos

## ⚠️ Si aún tienes problemas:
1. Usa Chrome DevTools para desregistrar manualmente
2. Cambia el puerto de desarrollo: `npm run dev -- --port 3000`
3. Usa modo incógnito para desarrollo sin Service Worker