import React from 'react';
import { PlusCircle, Edit2, Trash2, X, Check } from 'lucide-react';
import { Room } from '../types';

interface Props {
  rooms: Room[];
  onAddRoom: (roomNumber: string) => void;
  onEditRoom: (oldNumber: string, newNumber: string) => void;
  onDeleteRoom: (roomNumber: string) => void;
}

export function RoomManagement({ rooms, onAddRoom, onEditRoom, onDeleteRoom }: Props) {
  const [newRoom, setNewRoom] = React.useState('');
  const [editingRoom, setEditingRoom] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState('');
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  const occupiedRooms = rooms.filter(room => room.isOccupied).length;
  const freeRooms = rooms.length - occupiedRooms;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoom.trim()) {
      onAddRoom(newRoom.trim().toUpperCase());
      setNewRoom('');
    }
  };

  const handleEditSubmit = (oldNumber: string) => {
    if (editValue.trim()) {
      onEditRoom(oldNumber, editValue.trim().toUpperCase());
      setEditingRoom(null);
      setEditValue('');
    }
  };

  const startEditing = (roomNumber: string) => {
    setEditingRoom(roomNumber);
    setEditValue(roomNumber);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex justify-between items-center"
        >
          <h2 className="text-lg font-medium text-gray-900">Rooms</h2>
          <div className="flex space-x-2 text-sm">
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
              {rooms.length}
            </span>
            <span className="px-2 py-1 bg-red-100 rounded-full text-xs">
              {occupiedRooms}
            </span>
            <span className="px-2 py-1 bg-green-100 rounded-full text-xs">
              {freeRooms}
            </span>
          </div>
        </button>

        {isExpanded && (
          <>
            <form onSubmit={handleSubmit} className="mt-4 flex space-x-2">
              <input
                type="text"
                placeholder="New room (e.g., A101)"
                value={newRoom}
                onChange={(e) => setNewRoom(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                pattern="[A-Za-z0-9]+"
                title="Room number should be alphanumeric"
              />
              <button
                type="submit"
                className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusCircle className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {rooms.map((room) => (
                <div
                  key={room.number}
                  className={`p-2 rounded-lg ${
                    room.isOccupied
                      ? 'bg-red-50 text-red-800'
                      : 'bg-green-50 text-green-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {editingRoom === room.number ? (
                      <div className="flex items-center space-x-1 w-full">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-14 px-1 py-0.5 text-sm border-gray-300 rounded"
                          pattern="[A-Za-z0-9]+"
                        />
                        <button
                          onClick={() => handleEditSubmit(room.number)}
                          className="text-green-600"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingRoom(null)}
                          className="text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm font-medium">{room.number}</span>
                        {!room.isOccupied && (
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => startEditing(room.number)}
                              className="text-gray-600"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteRoom(room.number)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}