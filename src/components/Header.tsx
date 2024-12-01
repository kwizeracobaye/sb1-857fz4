import React from 'react';
import { School, Download } from 'lucide-react';
import { generatePWAPackage } from '../utils/pwa';

export function Header() {
  const handleDownload = () => {
    generatePWAPackage();
  };

  return (
    <header className="bg-indigo-600 text-white py-4 px-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <School className="w-6 h-6" />
          <h1 className="text-xl font-bold truncate">Lecturer Check-in</h1>
        </div>
        <button
          onClick={handleDownload}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Download className="w-4 h-4 mr-2" />
          Install App
        </button>
      </div>
    </header>
  );
}