import React from 'react';
import { FaExpand, FaCompress, FaRedo } from 'react-icons/fa';

const GamePreview = () => {
  return (
    <div className="flex flex-col h-full bg-background-dark">
      <div className="flex items-center justify-between p-2 border-b border-gray-800">
        <span className="text-sm text-gray-400">Game Preview</span>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-surface-dark rounded-lg text-gray-400">
            <FaRedo />
          </button>
          <button className="p-1.5 hover:bg-surface-dark rounded-lg text-gray-400">
            <FaExpand />
          </button>
        </div>
      </div>
      <div className="flex-1 bg-black">
        <canvas id="game-preview" className="w-full h-full"></canvas>
      </div>
    </div>
  );
};

export default GamePreview;