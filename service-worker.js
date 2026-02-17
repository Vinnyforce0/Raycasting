// service-worker.js

// Evento de instalação
self.addEventListener('install', event => {
  console.log('Service worker instalado');
  self.skipWaiting(); // ativa imediatamente
});

// Evento de ativação
self.addEventListener('activate', event => {
  console.log('Service worker ativado');
  self.clients.claim(); // assume o controle das abas abertas
});

// Intercepta requisições (fetch)
self.addEventListener('fetch', event => {
  // Responde normalmente, sem cache (simples para testes)
  event.respondWith(fetch(event.request));
});
