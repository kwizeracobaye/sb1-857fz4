import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Lecturer } from '../types';

export async function exportToCSV(lecturers: Lecturer[]): Promise<void> {
  const headers = ['Name', 'Class', 'Room', 'Days', 'Check-in Date', 'Admitting Staff'];
  const rows = lecturers.map(lecturer => [
    lecturer.name,
    lecturer.className,
    lecturer.roomNumber,
    lecturer.numberOfDays,
    new Date(lecturer.checkInDate).toLocaleString(),
    lecturer.admittingStaff
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `lecturer-report-${new Date().toISOString().split('T')[0]}.csv`);
}

export async function downloadWebApp(): Promise<void> {
  const zip = new JSZip();
  
  // Add manifest and service worker
  zip.file('manifest.json', JSON.stringify({
    name: 'Lecturer Check-in System',
    short_name: 'LCS',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4f46e5',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }));

  // Create the ZIP file
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'lecturer-checkin-app.zip');
}