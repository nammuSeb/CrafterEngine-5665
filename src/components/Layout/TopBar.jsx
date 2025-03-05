import React from 'react';
import { FaUndo, FaRedo, FaSave, FaFile, FaFolderOpen } from 'react-icons/fa';
import useHistoryStore from '../../store/historyStore';

const TopBar = () => {
  const { undo, redo, canUndo, canRedo } = useHistoryStore();

  return (
    <div className="h-10 bg-background border-b border-gray-800 flex items-center px-4">
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 hover:bg-surface-dark rounded-lg">
          <FaFile className="text-gray-400" />
        </button>
        <button className="px-3 py-1.5 hover:bg-surface-dark rounded-lg">
          <FaFolderOpen className="text-gray-400" />
        </button>
        <button className="px-3 py-1.5 hover:bg-surface-dark rounded-lg">
          <FaSave className="text-gray-400" />
        </button>
        <div className="w-px h-4 bg-gray-700 mx-2" />
        <button
          className={`px-3 py-1.5 rounded-lg ${
            canUndo() ? 'hover:bg-surface-dark text-gray-400' : 'text-gray-600 cursor-not-allowed'
          }`}
          onClick={undo}
          disabled={!canUndo()}
        >
          <FaUndo />
        </button>
        <button
          className={`px-3 py-1.5 rounded-lg ${
            canRedo() ? 'hover:bg-surface-dark text-gray-400' : 'text-gray-600 cursor-not-allowed'
          }`}
          onClick={redo}
          disabled={!canRedo()}
        >
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

export default TopBar;