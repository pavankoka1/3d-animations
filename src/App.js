import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
// import { useSpring, a } from "react-spring/three";

import styles from "./App.module.scss";

extend({ OrbitControls });

function SpaceShip() {
  const spachShipRef = useRef();
  const [model, setModel] = useState();

  useEffect(() => {
    new GLTFLoader().load("/assets/space-ship/scene.gltf", setModel);
  });

  useFrame(() => {
    if (spachShipRef.current) spachShipRef.current.rotation.y += 0.01;
  });

  return model ? (
    <mesh ref={spachShipRef}>
      <primitive scale={0.2} object={model.scene} />
    </mesh>
  ) : null;
}

function Plane() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshPhysicalMaterial attach="material" color="white" />
    </mesh>
  );
}

function Controls() {
  const orbitRef = useRef();
  const { camera, gl } = useThree();
  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls autoRotate ref={orbitRef} args={[camera, gl.domElement]} />
  );
}

// function Box() {
//   const meshRef = useRef();
//   const [hovered, setHovered] = useState(false);
//   const [active, setActive] = useState(false);

//   const props = useSpring({
//     scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
//     color: hovered ? "pink" : "lightblue",
//   });
//   // useFrame(() => {
//   //   meshRef.current.rotation.y = meshRef.current.rotation.x += 0.01;
//   // });

//   return (
//     <a.mesh
//       castShadow
//       ref={meshRef}
//       onPointerOver={() => setHovered(true)}
//       onPointerOut={() => setHovered(false)}
//       onClick={() => setActive(!active)}
//       scale={props.scale}
//     >
//       <ambientLight />
//       <spotLight castShadow position={[0, 5, 10]} penumbra={1} />
//       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
//       <a.meshPhysicalMaterial attach="material" color={props.color} />
//     </a.mesh>
//   );
// }

function App() {
  return (
    <div className={styles.wrapper}>
      <Canvas
        camera={{ position: [5, 5, 5] }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
      >
        <fog attach="fog" args={["black", 10, 25]} />
        <Controls />
        <ambientLight intensity={0.5} />
        <spotLight castShadow position={[15, 20, 5]} penumbra={1} />
        {/* <Box /> */}
        {/* <Plane /> */}
        <SpaceShip />
      </Canvas>
    </div>
  );
}

export default App;
