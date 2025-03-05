import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  FaPlay, 
  FaPause, 
  FaSave, 
  FaFolder 
} from 'react-icons/fa';
import useStore from '../../store/store';

const Header = () => {
  const { saveProject, loadProject } = useStore();

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await loadProject(file);
    }
  };

  return (
    <header className="h-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <FaPlay className="text-primary h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <FaPause className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="file"
          accept=".map"
          className="hidden"
          id="load-project"
          onChange={handleFileSelect}
        />
        <label htmlFor="load-project">
          <Button variant="outline" className="gap-2">
            <FaFolder className="h-4 w-4" />
            <span>Load</span>
          </Button>
        </label>
        <Button onClick={saveProject} className="gap-2">
          <FaSave className="h-4 w-4" />
          <span>Save Project</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;