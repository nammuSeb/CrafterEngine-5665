import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { FaUndo, FaRedo, FaSave, FaFile, FaFolderOpen } from 'react-icons/fa';
import useHistoryStore from '../../store/historyStore';

const TopBar = () => {
  const { undo, redo, canUndo, canRedo } = useHistoryStore();

  return (
    <div className="h-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Tooltip content="New File">
          <Button variant="ghost" size="icon">
            <FaFile className="h-4 w-4" />
          </Button>
        </Tooltip>

        <Tooltip content="Open Project">
          <Button variant="ghost" size="icon">
            <FaFolderOpen className="h-4 w-4" />
          </Button>
        </Tooltip>

        <Tooltip content="Save Project">
          <Button variant="ghost" size="icon">
            <FaSave className="h-4 w-4" />
          </Button>
        </Tooltip>

        <div className="w-px h-6 bg-border mx-2" />

        <Tooltip content="Undo (Ctrl+Z)">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={undo}
            disabled={!canUndo()}
          >
            <FaUndo className="h-4 w-4" />
          </Button>
        </Tooltip>

        <Tooltip content="Redo (Ctrl+Y)">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={redo}
            disabled={!canRedo()}
          >
            <FaRedo className="h-4 w-4" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default TopBar;