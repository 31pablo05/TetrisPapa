const CACHE_NAME = 'tetris-papa-v1.0.0';
const APP_PREFIX = 'tetris-papa-'; // Prefijo único para evitar conflictos
const urlsToCache = [
  './', // Usar ruta relativa en lugar de absoluta
  './manifest.json',
  // Solo cachear recursos que realmente existen en build
  // Los archivos JS/CSS se cachearán automáticamente en runtime
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Error al abrir cache:', error);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Solo eliminar caches de ESTE proyecto específico
          if (cacheName.startsWith(APP_PREFIX) && cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo de Tetris Papa:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  // Solo interceptar requests del mismo origen para evitar interferencias
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Cache hit - devolver respuesta del cache
          if (response) {
            return response;
          }

          return fetch(event.request).then(
            (response) => {
              // Verificar si recibimos una respuesta válida
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Solo cachear archivos de este proyecto (evitar cachear otros localhost)
              const url = new URL(event.request.url);
              if (url.pathname.includes('tetris') || 
                  url.pathname === '/' || 
                  url.pathname.includes('.js') || 
                  url.pathname.includes('.css')) {
                
                // Clonar la respuesta
                const responseToCache = response.clone();

                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, responseToCache);
                  });
              }

              return response;
            }
          );
        })
        .catch(() => {
          // Si no hay conexión, mostrar página offline básica
          if (event.request.destination === 'document') {
            return caches.match('./');
          }
        })
    );
  }
});

// Manejo de mensajes del cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Notificaciones push (opcional para futuras funcionalidades)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nueva notificación de Tetris Papa',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Jugar ahora',
        icon: '/icons/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/icons/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Tetris Papa', options)
  );
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      self.clients.openWindow('./')
    );
  }
});

// Función de limpieza completa (para desarrollo)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  // Limpiar completamente el cache de Tetris Papa
  if (event.data && event.data.type === 'CLEAR_TETRIS_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName.startsWith(APP_PREFIX)) {
              console.log('Limpiando cache de Tetris Papa:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  }
});