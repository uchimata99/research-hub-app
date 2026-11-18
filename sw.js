// App shell cache only. No research data is ever cached (data is read from the local folder).
const C="research-hub-v1"; const SHELL=["./","./dashboard.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin||!SHELL.some(s=>u.pathname.endsWith(s.replace("./","/"))||u.pathname==="/")) return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request)));});
