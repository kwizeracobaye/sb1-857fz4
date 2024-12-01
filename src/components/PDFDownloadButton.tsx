import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FileDown } from 'lucide-react';
import { Lecturer } from '../types';
import { LecturerReport } from '../utils/pdf';

interface Props {
  lecturers: Lecturer[];
}

export function PDFDownloadButton({ lecturers }: Props) {
  return (
    <PDFDownloadLink
      document={<LecturerReport lecturers={lecturers} />}
      fileName={`lecturer-report-${new Date().toISOString().split('T')[0]}.pdf`}
      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {({ loading }) => (
        <>
          <FileDown className="w-4 h-4 mr-2" />
          {loading ? 'Generating PDF...' : 'Download PDF'}
        </>
      )}
    </PDFDownloadLink>
  );
}