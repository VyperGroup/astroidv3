importScripts('/static/worksheets/uv/uv.bundle.js');
importScripts('/static/worksheets/uv/uv.config.js');
importScripts('/static/worksheets/uv/uv.sw.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', event =>
    event.respondWith(
        sw.fetch(event)
    )
);