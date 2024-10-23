import { FiTrash2, FiEdit2 } from 'react-icons/fi';

export function NoteEditor({ note, onUpdate, onDelete }) {
  if (!note) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a note or create a new one
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <input
          type="text"
          value={note.title}
          onChange={(e) => onUpdate(note._id, { title: e.target.value })}
          className="text-xl font-medium focus:outline-none"
        />
        <div className="flex space-x-2">
          <button
            onClick={() => onDelete(note._id)}
            className="p-2 text-gray-500 hover:text-red-500"
          >
            <FiTrash2 />
          </button>
          <button className="p-2 text-gray-500 hover:text-blue-500">
            <FiEdit2 />
          </button>
        </div>
      </div>
      <textarea
        value={note.content}
        onChange={(e) => onUpdate(note._id, { content: e.target.value })}
        className="flex-1 p-4 resize-none focus:outline-none"
        placeholder="Start typing..."
      />
    </div>
  );
}