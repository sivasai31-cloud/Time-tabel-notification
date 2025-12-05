// sw.js - minimal service worker for notifications & click behavior
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = '/';
  event.waitUntil(clients.matchAll({type:'window', includeUncontrolled:true}).then(clientsArr => {
    for (const c of clientsArr) {
      if (c.url === url && 'focus' in c) return c.focus();
    }
    if (clients.openWindow) return clients.openWindow(url);
  }));
});