import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function generatePWAPackage(): Promise<void> {
  const zip = new JSZip();
  
  // Add manifest
  zip.file('manifest.json', JSON.stringify({
    name: 'Lecturer Check-in System',
    short_name: 'LCS',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4f46e5',
    description: 'Manage lecturer check-ins and room assignments',
    categories: ['education', 'productivity'],
    orientation: 'any',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  }, null, 2));

  // Add service worker
  zip.file('service-worker.js', `
    const CACHE_NAME = 'lecturer-checkin-v1';
    const urlsToCache = [
      '/',
      '/index.html',
      '/manifest.json',
      '/icon-192.png',
      '/icon-512.png'
    ];

    self.addEventListener('install', (event) => {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then((cache) => cache.addAll(urlsToCache))
      );
    });

    self.addEventListener('fetch', (event) => {
      event.respondWith(
        caches.match(event.request)
          .then((response) => response || fetch(event.request))
      );
    });
  `);

  // Add installation instructions
  zip.file('README.md', `
    # Lecturer Check-in System

    ## Installation Instructions

    ### Android
    1. Open the app in Chrome
    2. Tap the menu button (three dots)
    3. Tap "Add to Home screen"
    4. Follow the prompts to install

    ### iOS
    1. Open the app in Safari
    2. Tap the share button
    3. Tap "Add to Home Screen"
    4. Follow the prompts to install

    ### Windows/Mac
    1. Open the app in Chrome
    2. Click the install button in the address bar
    3. Follow the prompts to install
  `);

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'lecturer-checkin-pwa.zip');
}