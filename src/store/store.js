import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      selectedMesh: null,
      setSelectedMesh: (mesh) => {
        set({ selectedMesh: mesh });
      },
      saveProject: async () => {
        const sceneData = {
          meshes: [],
          materials: [],
          lights: [],
          cameras: [],
        };

        const blob = new Blob([JSON.stringify(sceneData)], {
          type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'project.map';
        a.click();
        URL.revokeObjectURL(url);
      },
      loadProject: async (file) => {
        try {
          const content = await file.text();
          const sceneData = JSON.parse(content);
          console.log('Loading project:', sceneData);
        } catch (error) {
          console.error('Failed to load project:', error);
        }
      },
    }),
    {
      name: 'crafter-engine-storage',
      skipHydration: true,
    }
  )
);

export default useStore;