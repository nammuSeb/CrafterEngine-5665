import { create } from 'zustand';

const useHistoryStore = create((set, get) => ({
  history: [],
  currentIndex: -1,
  maxSteps: 50,

  pushState: (action) => {
    const { history, currentIndex, maxSteps } = get();
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(action);
    
    if (newHistory.length > maxSteps) {
      newHistory.shift();
    }
    
    set({
      history: newHistory,
      currentIndex: Math.min(newHistory.length - 1, maxSteps - 1)
    });
  },

  undo: () => {
    const { history, currentIndex } = get();
    if (currentIndex >= 0) {
      const action = history[currentIndex];
      action.undo();
      set({ currentIndex: currentIndex - 1 });
    }
  },

  redo: () => {
    const { history, currentIndex } = get();
    if (currentIndex < history.length - 1) {
      const action = history[currentIndex + 1];
      action.execute();
      set({ currentIndex: currentIndex + 1 });
    }
  },

  canUndo: () => get().currentIndex >= 0,
  canRedo: () => get().currentIndex < get().history.length - 1,
}));

export default useHistoryStore;