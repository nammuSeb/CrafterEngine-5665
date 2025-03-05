import { create } from 'zustand';
import { openDB } from 'idb';
import useHistoryStore from './historyStore';

const useStore = create((set, get) => ({
  selectedMesh: null,
  setSelectedMesh: (mesh) => {
    const previousMesh = get().selectedMesh;
    set({ selectedMesh: mesh });
    
    useHistoryStore.getState().pushState({
      execute: () => get().setSelectedMesh(mesh),
      undo: () => get().setSelectedMesh(previousMesh),
      description: 'Select Mesh'
    });
  },

  saveProject: async () => {
    const db = await openDB('crafter-engine', 1, {
      upgrade(db) {
        db.createObjectStore('projects');
      },
    });

    const sceneData = {
      meshes: [],
      materials: [],
      lights: [],
      cameras: [],
    };

    await db.put('projects', sceneData, 'current-project');
    
    const blob = new Blob([JSON.stringify(sceneData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.map';
    a.click();
    URL.revokeObjectURL(url);
  },

  loadProject: async (file) => {
    const content = await file.text();
    const sceneData = JSON.parse(content);
    // Load scene data
  },
}));

export default useStore;