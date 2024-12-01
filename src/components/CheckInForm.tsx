import React from 'react';
import { LecturerFormData, Room } from '../types';

interface Props {
  onSubmit: (data: LecturerFormData) => void;
  rooms: Room[];
}

export function CheckInForm({ onSubmit, rooms }: Props) {
  const [formData, setFormData] = React.useState<LecturerFormData>({
    name: '',
    className: '',
    roomNumber: '',
    numberOfDays: 1,
    admittingStaff: ''
  });

  const availableRooms = rooms.filter(room => !room.isOccupied);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      className: '',
      roomNumber: '',
      numberOfDays: 1,
      admittingStaff: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Lecturer Name
        </label>
        <input
          type="text"
          id="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="className" className="block text-sm font-medium text-gray-700">
          Class Name
        </label>
        <input
          type="text"
          id="className"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.className}
          onChange={(e) => setFormData({ ...formData, className: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">
          Room Number
        </label>
        <select
          id="roomNumber"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.roomNumber}
          onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
        >
          <option value="">Select a room</option>
          {availableRooms.map(room => (
            <option key={room.number} value={room.number}>
              {room.number}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="numberOfDays" className="block text-sm font-medium text-gray-700">
          Number of Days
        </label>
        <input
          type="number"
          id="numberOfDays"
          required
          min="1"
          max="30"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.numberOfDays}
          onChange={(e) => setFormData({ ...formData, numberOfDays: parseInt(e.target.value) })}
        />
      </div>

      <div>
        <label htmlFor="admittingStaff" className="block text-sm font-medium text-gray-700">
          Admitting Staff
        </label>
        <input
          type="text"
          id="admittingStaff"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.admittingStaff}
          onChange={(e) => setFormData({ ...formData, admittingStaff: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Check In
      </button>
    </form>
  );
}