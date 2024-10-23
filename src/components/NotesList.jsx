import { format } from 'date-fns';
import { FiSearch } from 'react-icons/fi';

export function NotesList({ notes, selectedNote, onSelectNote, searchTerm, onSearch }) {
  return (
    <div className="w-80 border-r">
      <div className="p-4">
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search all notes"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          {notes.map(note => (
            <div
              key={note._id}
              className={`p-3 rounded-lg cursor-pointer ${
                selectedNote?._id === note._id ? 'bg-yellow-100' : 'hover:bg-gray-100'
              }`}
              onClick={() => onSelectNote(note)}
            >
              <h3 className="font-medium">{note.title}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <span>{format(new Date(note.updatedAt), 'h:mm a')}</span>
                <span className="mx-2">·</span>
                <span className="truncate">{note.content}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}