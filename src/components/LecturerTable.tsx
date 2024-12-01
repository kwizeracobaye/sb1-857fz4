import React from 'react';
import { Edit2, LogOut, FileText } from 'lucide-react';
import { Lecturer, Room } from '../types';
import { EditLecturerForm } from './EditLecturerForm';
import { exportToCSV } from '../utils/export';
import { calculateRemainingDays, formatDate } from '../utils/date';

interface Props {
  lecturers: Lecturer[];
  onCheckOut: (id: string) => void;
  onEditRoom: (id: string, newRoom: string) => void;
  onEditLecturer: (id: string, data: Lecturer) => void;
  rooms: Room[];
}

export function LecturerTable({ lecturers, onCheckOut, onEditRoom, onEditLecturer, rooms }: Props) {
  const [editingLecturer, setEditingLecturer] = React.useState<Lecturer | null>(null);
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  React.useEffect(() => {
    const timer = setInterval(() => forceUpdate(), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleExportCSV = () => {
    exportToCSV(lecturers);
  };

  if (lecturers.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No lecturers checked in
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FileText className="w-4 h-4 mr-2" />
          Export CSV
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {lecturers.map((lecturer) => {
          const remainingDays = calculateRemainingDays(lecturer.checkInDate, lecturer.numberOfDays);
          return (
            <div 
              key={lecturer.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{lecturer.name}</h3>
                  <p className="text-sm text-gray-500">{lecturer.className}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingLecturer(lecturer)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                    title="Edit lecturer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onCheckOut(lecturer.id)}
                    className="p-1 text-red-400 hover:text-red-600"
                    title="Check out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Room:</span>
                  <span className="ml-1 font-medium">{lecturer.roomNumber}</span>
                </div>
                <div>
                  <span className="text-gray-500">Days:</span>
                  <span className="ml-1 font-medium">{lecturer.numberOfDays}</span>
                </div>
                <div>
                  <span className="text-gray-500">Remaining:</span>
                  <span className={`ml-1 font-medium ${
                    remainingDays <= 1 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {remainingDays}d
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Check-in:</span>
                  <span className="ml-1 font-medium">
                    {formatDate(lecturer.checkInDate)}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Staff:</span>
                  <span className="ml-1 font-medium">{lecturer.admittingStaff}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {editingLecturer && (
        <EditLecturerForm
          initialData={{
            name: editingLecturer.name,
            numberOfDays: editingLecturer.numberOfDays,
            roomNumber: editingLecturer.roomNumber,
            admittingStaff: editingLecturer.admittingStaff
          }}
          rooms={rooms}
          onSubmit={(data) => {
            onEditLecturer(editingLecturer.id, {
              ...editingLecturer,
              ...data
            });
            setEditingLecturer(null);
          }}
          onClose={() => setEditingLecturer(null)}
        />
      )}
    </div>
  );
}