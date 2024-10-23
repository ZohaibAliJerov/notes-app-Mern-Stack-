import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const noteService = {
  async getNotes() {
    try {
      const { data } = await api.get('/notes');
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response?.data?.message || 'Failed to fetch notes'
      };
    }
  },

  async createNote(noteData) {
    try {
      const { data } = await api.post('/notes', noteData);
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response?.data?.message || 'Failed to create note'
      };
    }
  },

  async updateNote(id, updates) {
    try {
      const { data } = await api.patch(`/notes/${id}`, updates);
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response?.data?.message || 'Failed to update note'
      };
    }
  },

  async deleteNote(id) {
    try {
      await api.delete(`/notes/${id}`);
      return { error: null };
    } catch (error) {
      return {
        error: error.response?.data?.message || 'Failed to delete note'
      };
    }
  }
};