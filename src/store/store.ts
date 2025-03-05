import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProjectData {
  meshes: any[];
  materials: any[];
  lights: any[];
  cameras: any[];
}

interface StoreState {
  selectedMesh: any | null;
  setSelectedMesh: (mesh: any | null) => void;
  saveProject: () => Promise<void>;
  loadProject: (file: File) => Promise<void>;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      selectedMesh: null,
      setSelectedMesh: (mesh) => {
        set({ selectedMesh: mesh });
      },
      saveProject: async () => {
        const sceneData: ProjectData = {
          meshes: [],
          materials: [],
          lights: [],
          cameras: [],
        };

        // Create a blob and trigger download
        const blob = new Blob([JSON.stringify(sceneData)], {
          type: 'application/json',
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
          // Load scene data
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