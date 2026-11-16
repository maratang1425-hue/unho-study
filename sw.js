// Notification delivery only: private records and page responses are never cached.
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick',event=>{
 event.notification.close();
 const target=new URL('./#focus',self.registration.scope).href;
 event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(async windows=>{
  const existing=windows.find(client=>client.url.startsWith(self.registration.scope));
  if(existing){await existing.focus();existing.postMessage({type:'ODO_STUDY_OPEN_FOCUS'});return}
  await self.clients.openWindow(target);
 }));
});
