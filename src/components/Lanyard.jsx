import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { profile } from "../data";

extend({ MeshLineGeometry, MeshLineMaterial });

/** Card front: photo + name, drawn on a canvas so no 3D model or image editing is needed. */
function cardFront(img) {
  const c = Object.assign(document.createElement("canvas"), { width: 800, height: 1125 });
  const g = c.getContext("2d");
  g.fillStyle = "#f7f6fb";
  g.fillRect(0, 0, 800, 1125);
  // photo, cropped to cover a rounded frame
  const fx = 60, fy = 70, fw = 680, fh = 760, r = 28;
  g.save();
  g.beginPath();
  g.roundRect(fx, fy, fw, fh, r);
  g.clip();
  const s = Math.max(fw / img.width, fh / img.height);
  g.drawImage(img, fx + (fw - img.width * s) / 2, fy + (fh - img.height * s) / 3, img.width * s, img.height * s);
  g.restore();
  // thin frame so a white-background photo doesn't melt into the white card
  g.strokeStyle = "#dcd9e8";
  g.lineWidth = 4;
  g.beginPath();
  g.roundRect(fx, fy, fw, fh, r);
  g.stroke();
  g.fillStyle = "#14121f";
  g.font = "700 64px 'Bricolage Grotesque', sans-serif";
  g.fillText(`${profile.first} ${profile.last}`, 60, 925);
  g.fillStyle = "#6d6a82";
  g.font = "500 30px 'JetBrains Mono', monospace";
  g.fillText(`${profile.course} · WEB DEVELOPER`, 60, 985);
  const grad = g.createLinearGradient(60, 0, 740, 0);
  grad.addColorStop(0, "#a78bfa");
  grad.addColorStop(1, "#5eead4");
  g.fillStyle = grad;
  g.fillRect(60, 1030, 680, 10);
  return toTexture(c);
}

function cardBack() {
  const c = Object.assign(document.createElement("canvas"), { width: 800, height: 1125 });
  const g = c.getContext("2d");
  g.fillStyle = "#0d0b19";
  g.fillRect(0, 0, 800, 1125);
  g.textAlign = "center";
  g.fillStyle = "#a78bfa";
  g.font = "800 200px 'Bricolage Grotesque', sans-serif";
  g.fillText(profile.initials, 400, 600);
  g.fillStyle = "#9b99ad";
  g.font = "500 30px 'JetBrains Mono', monospace";
  g.fillText(profile.location.toUpperCase(), 400, 700);
  return toTexture(c);
}

function strapTexture() {
  const c = Object.assign(document.createElement("canvas"), { width: 1024, height: 64 });
  const g = c.getContext("2d");
  g.fillStyle = "#121020";
  g.fillRect(0, 0, 1024, 64);
  g.fillStyle = "#c4b5fd";
  g.font = "600 26px 'JetBrains Mono', monospace";
  g.textBaseline = "middle";
  g.fillText(`${profile.first.toUpperCase()} · ${profile.course} · ${profile.first.toUpperCase()} · ${profile.course} ·`, 16, 34);
  const t = toTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function toTexture(canvas) {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

export default function Lanyard() {
  return (
    <Canvas camera={{ position: [0, 0, 13], fov: 25 }} dpr={[1, 2]} gl={{ alpha: true }}>
      <ambientLight intensity={Math.PI * 0.8} />
      <directionalLight position={[3, 5, 6]} intensity={2} />
      <Physics gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band />
      </Physics>
    </Canvas>
  );
}

const segment = { type: "dynamic", canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };

function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const [vec, ang, rot, dir] = useMemo(() => [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()], []);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, setDragged] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { width, height } = useThree((s) => s.size);

  const geometry = useMemo(() => new RoundedBoxGeometry(1.6, 2.25, 0.04, 4, 0.08), []);
  const strap = useMemo(strapTexture, []);
  const back = useMemo(cardBack, []);
  const [front, setFront] = useState(null);
  useEffect(() => {
    const img = new Image();
    img.onload = () => document.fonts.ready.then(() => setFront(cardFront(img)));
    img.src = profile.photo;
  }, []);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    document.body.style.cursor = dragged ? "grabbing" : hovered ? "grab" : "auto";
    return () => { document.body.style.cursor = "auto"; };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (!fixed.current) return;
    // smooth the middle joints so the strap doesn't jitter
    [j1, j2].forEach((r) => {
      if (!r.current.lerped) r.current.lerped = new THREE.Vector3().copy(r.current.translation());
      const d = Math.max(0.1, Math.min(1, r.current.lerped.distanceTo(r.current.translation())));
      r.current.lerped.lerp(r.current.translation(), delta * (minSpeed + d * (maxSpeed - minSpeed)));
    });
    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(j2.current.lerped);
    curve.points[2].copy(j1.current.lerped);
    curve.points[3].copy(fixed.current.translation());
    band.current.geometry.setPoints(curve.getPoints(32));
    // keep the card facing forward
    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());
    card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
  });

  curve.curveType = "chordal";

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segment} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segment}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segment}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segment}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segment} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[0.8, 1.125, 0.02]} />
          <group
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(e) => { e.target.releasePointerCapture(e.pointerId); setDragged(false); }}
            onPointerDown={(e) => { e.target.setPointerCapture(e.pointerId); setDragged(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))); }}
          >
            <mesh geometry={geometry}>
              {/* box faces: +x, -x, +y, -y, front, back */}
              {[0, 1, 2, 3].map((i) => <meshStandardMaterial key={i} attach={`material-${i}`} color="#e9e7f2" roughness={0.4} />)}
              <meshStandardMaterial attach="material-4" map={front} color={front ? "#ffffff" : "#e9e7f2"} roughness={0.55} />
              <meshStandardMaterial attach="material-5" map={back} roughness={0.55} />
            </mesh>
            {/* metal clip */}
            <mesh position={[0, 1.24, 0]}>
              <boxGeometry args={[0.32, 0.2, 0.08]} />
              <meshStandardMaterial color="#8d8b99" metalness={0.9} roughness={0.3} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" depthTest={false} resolution={[width, height]} useMap map={strap} repeat={[-3, 1]} lineWidth={1} />
      </mesh>
    </>
  );
}
