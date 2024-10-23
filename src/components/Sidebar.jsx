import { FiPlus } from 'react-icons/fi';

export function Sidebar({ onNewNote }) {
  return (
    <div className="w-64 border-r">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <h1 className="text-xl font-semibold">Notes</h1>
        </div>
        <button
          onClick={onNewNote}
          className="flex items-center text-yellow-500 hover:text-yellow-600"
        >
          <FiPlus className="mr-2" /> New Note
        </button>
      </div>
    </div>
  );
}