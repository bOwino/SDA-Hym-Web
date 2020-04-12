const wendeNyasaye = "wende-nyasaye-site-v1";
const assets = [
    "/",
    "/index.html",
    "/favorites.html",
    "/about.html",
    "/settings.html",
    "/songs/song1.html",
    "/songs/song2.html",
    "/songs/song3.html",
    "/songs/song4.html",
    "/songs/song5.html",
    "/songs/song6.html",
    "/songs/song7.html",
    "/songs/song8.html",
    "/songs/song9.html",
    "/css/style.css",
    "/js/app.js",
    "/img/lion.jpg",
    "/img/nature.jpg",
    "/img/sunflower.jpeg",
    "/img/veges.jpeg",
    
  ];
  
  self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
      caches.open(wendeNyasaye).then(cache => {
        cache.addAll(assets);
      })
    );
  });
  
  self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request);
      })
    );
  });