"use client";
import { Mesh } from "three";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Float, OrbitControls, useTexture } from "@react-three/drei";
import { StaticImageData } from "next/image";

import CanvasLoader from "../canvas-loader";

const Ball = ({ imgUrl }: { imgUrl: string }) => {
  const [decal] = useTexture([imgUrl]);
  const ballRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [originalY, setOriginalY] = useState(0);

  useEffect(() => {
    if (ballRef.current) {
      setOriginalY(ballRef.current.position.y);
    }
  }, []);

  useFrame(() => {
    const ball = ballRef.current;
    if (ball) {
      if (hovered) {
        ball.position.y = originalY + 0.4;
      } else {
        ball.position.y += (originalY - ball.position.y) * 0.1;
      }
    }
  });

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh
        ref={ballRef}
        castShadow
        receiveShadow
        scale={2.75}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }: { icon: StaticImageData }) => {
  return (
    <Canvas frameloop="always" gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon.src} />
      </Suspense>
    </Canvas>
  );
};

export default BallCanvas;
