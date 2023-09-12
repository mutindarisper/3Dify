import React, { useEffect } from 'react'
import * as THREE from 'three';

const FirstScene = () => {
    useEffect(() => {
        // Create a scene
        const scene = new THREE.Scene();
    
        // Create a camera
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
    
        // Create a renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('threejs-container').appendChild(renderer.domElement);
    
        // Add a cube to the scene
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
    
        // Position the camera
        camera.position.z = 5;
    
        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
          renderer.render(scene, camera);
        };
    
        animate();
    
        // Clean up on unmount
        return () => {
          // Dispose of Three.js objects, remove event listeners, etc.
        };
      }, []);
    
  return (
    <div id='threejs-container'></div>
  )
}

export default FirstScene