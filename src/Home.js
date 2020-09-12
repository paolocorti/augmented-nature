import React, { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree, useLoader } from 'react-three-fiber'
import { TextureLoader, DoubleSide } from "three"

function useWobble(factor = 1, fn = 'sin', cb) {
  const ref = useRef()
  useFrame(state => {
    const t = state.clock.getElapsedTime()
    ref.current.position.y = Math[fn](t) * factor
    if (cb) cb(t, ref.current)
  })
  return ref
}

function useWobbleY(factor = 1, fn = 'sin', cb) {
  const ref = useRef()
  useFrame(state => {
    const t = state.clock.getElapsedTime()
    // ref.current.rotation.y = Math[fn](t) * factor
    // ref.current.rotation.z = Math[fn](t) * factor
    ref.current.rotation.y = Math[fn](t) * factor
    if (cb) cb(t, ref.current)
  })
  return ref
}

export function Box(props) {
  const [hovered, set] = useState(false)
  const ref = useRef()
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01))
  return (
    <mesh ref={ref} {...props} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'white'} />
    </mesh>
  )
}

export function Panel(props) {
  const ref = useRef()
  const texture = new TextureLoader().load(props.texture);
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.001))
  console.log(props.side)
  return (
    <group>
      <mesh ref={ref} {...props} position={[props.side === 'left' ? -props.scale[0] / 2 : props.scale[0] / 2,0,0.31]}>
        <planeBufferGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={'white'} map={texture} side={DoubleSide} />
      </mesh>
    </group>
  )
}


export function Sphere(props) {
  const [hovered, set] = useState(false)
  const ref = useWobble(Math.random(), 'cos')
  //useFrame(() => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01))
  return (
    <mesh ref={ref} {...props} >
      <sphereBufferGeometry attach="geometry" args={[1,32,32]} />
      <meshStandardMaterial attach="material" color={'#fefefe'} />
    </mesh>
  )
}

export function Shapes() {
  const {
    viewport: { width, height }
  } = useThree()
  const ringSize = Math.max(3, width / 2)
  const crossSize = 0.7
  return (
    <>
      {/* <Ring position={[-width * 0.8, height * -3, -5]} scale={[ringSize, ringSize, 1]} /> */}
      {/* <Cross position={[-width / 2.5, height / 8, -1]} scale={[crossSize, crossSize, 1]} rotation={[0, 0, Math.PI / 4]} /> */}
      {/* <Minus position={[width / 3, -height / 3.5, -2]} scale={[0.8, 0.8, 0.8]} rotation={[0, 0, Math.PI / 10]} /> */}
      <group rotation={[Math.PI / 8, 0, 0]} position={[-width / 4, -height / 6, 0]}>
        <Sphere scale={[0.8, 0.8, 0.8]} factor={Math.random()} />
        <Sphere position={[width / 1.5, height / 4, -3]} scale={[0.5, 0.5, 0.5]} factor={Math.random()} />
        <Sphere position={[width / 3, height / 1.1, -4]} scale={[1, 1, 1]} factor={Math.random()} />
        <Lights />
      </group>
    </>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[7, -5, 10]} intensity={1} angle={0.3} penumbra={1} />
      <pointLight position={[1, -1, -5]} intensity={0.5} />
    </>
  )
}

export function Categories({ time = 3000 }) {
  const [index, set] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => set((index + 1) % 2), time)
    return () => clearInterval(interval)
  }, [index])
  const cats = useMemo(
    () => [
      { npm: 'headless', description: 'programmatic CAD workflow for the web.' },
      { npm: 'react', description: 'interactive CAD workflow for React.' }
    ],
    []
  )

  const ref = useRef()
  useEffect(() => {

  }, [index])

  return (
    <p style={{ height: 70 }}>
      Encoded è uno studio creativo che ricerca e sviluppa nuove forme di espressione attraverso le nuove tecnologie.
      <br />
      {/* {cats.map(({ description }, i) => (
        <span key={i} hidden={i !== index || undefined} className="transition horizontal" style={{ width: '100%', left: 0 }}>
          {description}
        </span>
      ))} */}
    </p>
  )
}
