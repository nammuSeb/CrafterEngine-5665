import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { FaPlay, FaStop, FaSave, FaFolder } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CodeEditor = () => {
  const [isCompiling, setIsCompiling] = useState(false);
  const [output, setOutput] = useState('');
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleCompile = async () => {
    if (!editorRef.current) return;
    
    setIsCompiling(true);
    try {
      const response = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: editorRef.current.getValue() 
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      console.error('Compilation error:', error);
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-dark">
      <div className="flex items-center justify-between p-2 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <button 
            className="px-3 py-1.5 bg-primary hover:bg-primary-dark rounded-lg text-white flex items-center gap-2"
            onClick={handleCompile}
            disabled={isCompiling}
          >
            <FaPlay className={isCompiling ? 'animate-spin' : ''} />
            <span>{isCompiling ? 'Compiling...' : 'Run'}</span>
          </button>
          <button className="p-1.5 hover:bg-surface-dark rounded-lg text-gray-400">
            <FaStop />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-surface-dark rounded-lg text-gray-400">
            <FaSave />
          </button>
          <button className="p-1.5 hover:bg-surface-dark rounded-lg text-gray-400">
            <FaFolder />
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative">
        <Editor
          height="100%"
          defaultLanguage="rust"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: 'on',
            rulers: [80],
            bracketPairColorization: { enabled: true },
            automaticLayout: true,
            formatOnPaste: true,
            formatOnType: true,
          }}
          defaultValue={`use bevy::prelude::*;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, setup)
        .run();
}

fn setup(mut commands: Commands) {
    // Camera
    commands.spawn(Camera3dBundle {
        transform: Transform::from_xyz(-2.0, 2.5, 5.0)
            .looking_at(Vec3::ZERO, Vec3::Y),
        ..default()
    });
}`}
        />
      </div>

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: output ? 200 : 0 }}
        className="bg-surface border-t border-gray-800"
      >
        <div className="p-2 text-sm font-mono text-gray-300 whitespace-pre-wrap">
          {output}
        </div>
      </motion.div>
    </div>
  );
};

export default CodeEditor;