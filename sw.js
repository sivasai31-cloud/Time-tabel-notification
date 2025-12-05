// sw.js - service worker for notifications & click behavior
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = '/';
  event.waitUntil(clients.matchAll({type:'window', includeUncontrolled:true}).then(clientsArr => {
    for (const c of clientsArr) {
      try{ if (c.url === url && 'focus' in c) return c.focus(); }catch(e){}
    }
    if (clients.openWindow) return clients.openWindow(url);
  }));
});

// Optional push handler (not used in offline mode)
self.addEventListener('push', function(event) {
  let data = {};
  try { data = event.data.json(); } catch (e) { data = { title: 'Reminder', body: event.data ? event.data.text() : '' }; }
  const title = data.title || 'Reminder';
  const opts = { body: data.body || '', tag: Date.now().toString(), renotify: true };
  event.waitUntil(self.registration.showNotification(title, opts));
});
