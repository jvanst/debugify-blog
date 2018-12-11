if (workbox) {
  console.log("Yay! Workbox is loaded 🎉");
} else {
  console.log("Boo! Workbox didn't load 😬");
}

// Precache entries
workbox.precaching.precache(self.__precacheManifest);
// Add Precache Route
workbox.precaching.addRoute();

workbox.routing.registerRoute(
  new RegExp("/"),
  workbox.strategies.staleWhileRevalidate()
);
