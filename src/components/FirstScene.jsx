import React, { useEffect } from 'react'
import * as THREE from 'three';
import * as OrbitControls  from 'three-orbitcontrols'

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
          camera.position.set(0, 3, 10)

        const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820)
        scene.add(ambient);

        const light = new THREE.DirectionalLight(0xFFFFFF, 1)
        light.position.set(1, 10, 6)
        scene.add(light);

        //add controls later

  
    
        // Create a renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        // document.getElementById('threejs-container').appendChild(renderer.domElement);
document.body.appendChild(renderer.domElement);

        
        // Add a cube to the scene
        // const geometry = new THREE.BoxGeometry();
        // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // const cube = new THREE.Mesh(geometry, material);
        // scene.add(cube);

        var clock = new THREE.Clock()
        var parts;
    
        //create a tower, by creating a box and stacking the boxes
          const height = 0.4
          // const geometry = new THREE.BoxGeometry(3, height, 0.9);
          // const material = new THREE.MeshLambertMaterial({ color: 0xdcbbc7}); //material that uses lighting. good for matte surfaces, not shiny surfaces. best performance
          // const mesh = new THREE.Mesh(geometry, material)
          // scene.add(mesh)


          //  for(let row=0; row<20; row++){
          //     let yPos = row * (height + 0.05);
          //     let offset = -1;
          //     for(let count=0; count<3; count++){
          //       const block = mesh.clone();
          //       if(row % 2){
          //         block.rotation.y = Math.PI/2;
          //         block.position.set(offset, yPos, 0);
          //       }else{
          //         block.position.set(0, yPos, offset);
          //       }
          //       scene.add(block);
          //       offset++;
          //     }
          //   }

          //create a second mesh that swings

          const geometry = new THREE.BoxGeometry(1,3,1) 

          const position = geometry.getAttribute('position')
          // geometry.vertices.forEach(vertex => vertex.y += 1.5)
          for (let i = 1; i <position.array.length; i+=3) {
           position.array[i] += 0.5;
            
          }
          const material = new THREE.MeshPhongMaterial()
          const block = new THREE.Mesh(geometry, material)
          parts = []
          for (let i = 0; i < 4; i++) {
            const mesh = block.clone()
            
            parts.push(mesh)

            if(i == 0){
              scene.add(mesh)
            }else{
              mesh.position.y = i*3
              parts[i-1].add(mesh)
            }
            
            
          }

  

        // Position the camera
        // camera.position.z = 5;
    
        // Animation loop
        // const animate = () => {
        //   requestAnimationFrame(animate);
        //   mesh.rotation.x += 0.01;
        //   mesh.rotation.y += 0.01;
        //   renderer.render(scene, camera);
        // };
    
        // animate();



        const update = () => {
  requestAnimationFrame( update );
	renderer.render( scene, camera );
  const theta = Math.sin(clock.getElapsedTime())
  parts.forEach(part => part.rotation.z = theta)
}

      // Create OrbitControls and attach them to the camera
      // const controls = new OrbitControls(camera, renderer.domElement);
      // controls.target.set(0,4,0)
      // controls.update()

const resize = () =>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', resize, false);
update();
  
  
    
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