import React from 'react';

interface Props {
  onSubmit: (name: string) => void;
}

export function CheckOutForm({ onSubmit }: Props) {
  const [name, setName] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="checkoutName" className="block text-sm font-medium text-gray-700">
          Lecturer Name
        </label>
        <input
          type="text"
          id="checkoutName"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Check Out
      </button>
    </form>
  );
}