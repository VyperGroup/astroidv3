importScripts('https://arc.io/arc-sw-core.js')
importScripts('/worksheets/uv/uv.bundle.js');
importScripts('/worksheets/uv/uv.config.js');
importScripts('/worksheets/uv/uv.sw.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', event =>
    event.respondWith(
        sw.fetch(event)
    )
);
  
