/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

importScripts('https://www.gstatic.com/firebasejs/4.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.9.0/firebase-messaging.js');




self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/vendor.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.networkFirst);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;

firebase.initializeApp({
  // get this from Firebase console, Cloud messaging section
  'messagingSenderId': '248085553994'
})

const messaging = firebase.messaging();

self.addEventListener('push', function (event) {
  console.log(event.data.json())
  var data = event.data.json()
  
  var notification = JSON.parse(data.data.notification)
 
  const notificationOptions = {
    icon: 'assets/imgs/cei_logo-224.png',
    body: notification.body,
    badge: 'assets/imgs/logoxd.png'
  
    
  };
  event.waitUntil(



    self.registration.showNotification(notification.title, notificationOptions)
  );
});

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('Received background message ', payload);
  // here you can override some options describing what's in the message; 
  // however, the actual content will come from the Webtask
  const notificationOptions = {
    icon: 'assets/imgs/cei.png'
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

