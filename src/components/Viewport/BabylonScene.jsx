import React, { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
import { GridMaterial } from '@babylonjs/materials/grid';
import useStore from '../../store/store';

const BabylonScene = () => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const sceneRef = useRef(null);
  const gizmoManagerRef = useRef(null);
  const { setSelectedMesh } = useStore();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize engine
    engineRef.current = new BABYLON.Engine(canvasRef.current, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      antialias: true
    });

    // Create scene
    sceneRef.current = new BABYLON.Scene(engineRef.current);
    sceneRef.current.clearColor = new BABYLON.Color4(0.07, 0.07, 0.09, 1);
    sceneRef.current.autoClear = false;
    sceneRef.current.autoClearDepthAndStencil = false;

    // Camera setup
    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      0,
      Math.PI / 3,
      10,
      BABYLON.Vector3.Zero(),
      sceneRef.current
    );
    camera.attachControl(canvasRef.current, true);
    camera.wheelPrecision = 50;
    camera.minZ = 0.1;
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 50;
    camera.panningSensibility = 1000;
    camera.useBouncingBehavior = true;
    camera.useAutoRotationBehavior = false;
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = Math.PI / 1.8;
    camera.pinchPrecision = 50;
    camera.panningInertia = 0.7;
    camera.inertia = 0.5;

    // Camera presets
    const cameraPresets = {
      front: () => camera.setPosition(new BABYLON.Vector3(0, 0, 10)),
      top: () => camera.setPosition(new BABYLON.Vector3(0, 10, 0.1)),
      side: () => camera.setPosition(new BABYLON.Vector3(10, 0, 0))
    };

    // Lighting
    const hemiLight = new BABYLON.HemisphericLight(
      "hemiLight",
      new BABYLON.Vector3(0, 1, 0),
      sceneRef.current
    );
    hemiLight.intensity = 0.7;
    hemiLight.groundColor = new BABYLON.Color3(0.1, 0.1, 0.1);

    const dirLight = new BABYLON.DirectionalLight(
      "dirLight",
      new BABYLON.Vector3(-1, -2, -1),
      sceneRef.current
    );
    dirLight.intensity = 0.5;
    dirLight.position = new BABYLON.Vector3(20, 40, 20);

    // Shadows
    const shadowGenerator = new BABYLON.ShadowGenerator(1024, dirLight);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;

    // Grid
    const gridMaterial = new GridMaterial("gridMaterial", sceneRef.current);
    gridMaterial.majorUnitFrequency = 5;
    gridMaterial.minorUnitVisibility = 0.45;
    gridMaterial.gridRatio = 1;
    gridMaterial.backFaceCulling = false;
    gridMaterial.mainColor = new BABYLON.Color3(0.2, 0.2, 0.3);
    gridMaterial.lineColor = new BABYLON.Color3(0.2, 0.2, 0.3);
    gridMaterial.opacity = 0.8;

    const ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 100, height: 100 },
      sceneRef.current
    );
    ground.material = gridMaterial;
    ground.receiveShadows = true;
    ground.isPickable = false;

    // Post-processing
    const pipeline = new BABYLON.DefaultRenderingPipeline(
      "pipeline",
      true,
      sceneRef.current,
      [camera]
    );

    pipeline.samples = 4;
    pipeline.bloomEnabled = true;
    pipeline.bloomThreshold = 0.7;
    pipeline.bloomWeight = 0.3;
    pipeline.bloomKernel = 64;
    pipeline.bloomScale = 0.5;

    // Tone mapping
    pipeline.toneMappingEnabled = true;
    pipeline.imageProcessing.toneMappingType = BABYLON.ImageProcessingConfiguration.TONEMAPPING_ACES;
    pipeline.imageProcessing.contrast = 1.1;
    pipeline.imageProcessing.exposure = 1.0;

    // Anti-aliasing
    pipeline.fxaaEnabled = true;

    // Gizmo Manager
    gizmoManagerRef.current = new BABYLON.GizmoManager(sceneRef.current);
    gizmoManagerRef.current.positionGizmoEnabled = true;
    gizmoManagerRef.current.rotationGizmoEnabled = true;
    gizmoManagerRef.current.scaleGizmoEnabled = true;
    gizmoManagerRef.current.attachableMeshes = [];
    gizmoManagerRef.current.usePointerToAttachGizmos = false;

    // Context Menu
    let contextMenu = document.createElement('div');
    contextMenu.className = 'context-menu hidden fixed bg-surface rounded-lg shadow-lg p-2 z-50';
    document.body.appendChild(contextMenu);

    const showContextMenu = (evt, mesh) => {
      contextMenu.innerHTML = `
        <div class="flex flex-col gap-1 p-1 min-w-[180px]">
          <button class="context-menu-item">
            <span>Delete</span>
            <span class="text-gray-500 text-xs">Del</span>
          </button>
          <button class="context-menu-item">
            <span>Duplicate</span>
            <span class="text-gray-500 text-xs">Ctrl+D</span>
          </button>
          <button class="context-menu-item">
            <span>Hide</span>
            <span class="text-gray-500 text-xs">H</span>
          </button>
          <div class="border-t border-gray-700 my-1"></div>
          <button class="context-menu-item">
            <span>Properties</span>
          </button>
        </div>
      `;
      
      contextMenu.style.left = `${evt.pageX}px`;
      contextMenu.style.top = `${evt.pageY}px`;
      contextMenu.classList.remove('hidden');
      
      contextMenu.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
          switch(button.textContent.trim()) {
            case 'Delete':
              mesh.dispose();
              break;
            case 'Duplicate':
              const clone = mesh.clone('clone_' + mesh.name);
              clone.position.addInPlace(new BABYLON.Vector3(1, 0, 1));
              break;
            case 'Hide':
              mesh.visibility = 0;
              break;
          }
          contextMenu.classList.add('hidden');
        });
      });
    };

    // Selection handling
    sceneRef.current.onPointerDown = (evt) => {
      const pickResult = sceneRef.current.pick(evt.x, evt.y);
      if (pickResult.hit && pickResult.pickedMesh !== ground) {
        setSelectedMesh(pickResult.pickedMesh);
        gizmoManagerRef.current.attachToMesh(pickResult.pickedMesh);

        if (evt.button === 2) { // Right click
          showContextMenu(evt, pickResult.pickedMesh);
        }

        // Visual feedback
        const highlightLayer = new BABYLON.HighlightLayer(
          "highlight",
          sceneRef.current,
          { mainTextureRatio: 0.5 }
        );
        highlightLayer.addMesh(pickResult.pickedMesh, BABYLON.Color3.White());
        setTimeout(() => highlightLayer.dispose(), 300);
      } else {
        setSelectedMesh(null);
        gizmoManagerRef.current.attachToMesh(null);
      }
    };

    // Hide context menu on click outside
    document.addEventListener('click', () => {
      contextMenu.classList.add('hidden');
    });

    // Render loop
    engineRef.current.runRenderLoop(() => {
      if (sceneRef.current.activeCamera) {
        sceneRef.current.render();
      }
    });

    // Resize handling
    const resizeObserver = new ResizeObserver(() => {
      engineRef.current.resize();
    });
    resizeObserver.observe(canvasRef.current);

    return () => {
      resizeObserver.disconnect();
      engineRef.current.dispose();
      sceneRef.current.dispose();
      document.body.removeChild(contextMenu);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default BabylonScene;