import React from 'react';
import { FaPlay, FaPause, FaSave, FaFolder } from 'react-icons/fa';
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
    <header className="h-14 bg-surface border-b border-gray-700 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-background-dark rounded-lg">
          <FaPlay className="text-primary" />
        </button>
        <button className="p-2 hover:bg-background-dark rounded-lg">
          <FaPause className="text-gray-400" />
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept=".map"
          className="hidden"
          id="load-project"
          onChange={handleFileSelect}
        />
        <label
          htmlFor="load-project"
          className="flex items-center gap-2 px-4 py-2 hover:bg-background-dark rounded-lg cursor-pointer"
        >
          <FaFolder className="text-gray-400" />
          <span className="text-gray-300">Load</span>
        </label>
        
        <button
          onClick={saveProject}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg text-white"
        >
          <FaSave />
          <span>Save Project</span>
        </button>
      </div>
    </header>
  );
};

export default Header;