import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from 'react-query';
import { Sidebar } from './components/Sidebar';
import { NotesList } from './components/NotesList';
import { NoteEditor } from './components/NoteEditor';
import { noteService } from './services/api';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

function NotesApp() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: notes = [], isLoading } = useQuery(
    'notes',
    async () => {
      const { data, error } = await noteService.getNotes();
      if (error) throw new Error(error);
      return data;
    }
  );

  const createNoteMutation = useMutation(
    async () => {
      const { data, error } = await noteService.createNote({
        title: 'New Note',
        content: ''
      });
      if (error) throw new Error(error);
      return data;
    },
    {
      onSuccess: (newNote) => {
        queryClient.setQueryData('notes', (old) => [newNote, ...(old || [])]);
        setSelectedNote(newNote);
      }
    }
  );

  const updateNoteMutation = useMutation(
    async ({ id, updates }) => {
      const { data, error } = await noteService.updateNote(id, updates);
      if (error) throw new Error(error);
      return data;
    },
    {
      onSuccess: (updatedNote) => {
        queryClient.setQueryData('notes', (old) => 
          old.map(note => note._id === updatedNote._id ? updatedNote : note)
        );
        setSelectedNote(updatedNote);
      }
    }
  );

  const deleteNoteMutation = useMutation(
    async (id) => {
      const { error } = await noteService.deleteNote(id);
      if (error) throw new Error(error);
      return id;
    },
    {
      onSuccess: (deletedId) => {
        queryClient.setQueryData('notes', (old) => 
          old.filter(note => note._id !== deletedId)
        );
        if (selectedNote?._id === deletedId) {
          setSelectedNote(null);
        }
      }
    }
  );

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar onNewNote={() => createNoteMutation.mutate()} />
      <NotesList
        notes={filteredNotes}
        selectedNote={selectedNote}
        onSelectNote={setSelectedNote}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />
      <div className="flex-1">
        <NoteEditor
          note={selectedNote}
          onUpdate={(id, updates) => updateNoteMutation.mutate({ id, updates })}
          onDelete={(id) => deleteNoteMutation.mutate(id)}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotesApp />
    </QueryClientProvider>
  );
}

export default App;