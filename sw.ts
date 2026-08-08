const CACHE_NAME = "precache"

const PRECACHE_ASSETS = [
    "/assets/"
]

self.addEventListener("install", async() => {
    const cache = await caches.open(CACHE_NAME)
    cache.addAll(PRECACHE_ASSETS)
})
