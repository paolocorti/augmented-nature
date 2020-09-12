import { render } from 'react-dom'
import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas, useThree, useFrame } from 'react-three-fiber'
import { HTML, useGLTFLoader } from 'drei'
import { Block } from './blocks'
import { Shapes, Categories, Box, Sphere, Panel } from './Home'
import logoMidi from './assets/images/MiDi_logotipo.svg';
import logo from './assets/images/encoded_logo_text.png';
import state from './store'
import './styles.css'
import augmentedNature from './assets/images/augmentedNature.png';
import idra from './assets/images/idra.jpg';
import np from './assets/images/np.jpg';
import sage from './assets/images/sage.jpg';
import plant from './assets/models/scene.glb';
import {
  isBrowser,
  isMobile
} from "react-device-detect";

function useWobble(factor = 1, fn = 'sin', cb) {
  const ref = useRef()
  useFrame(state => {
    const t = state.clock.getElapsedTime()
    ref.current.position.y = Math[fn](t) * factor
    if (cb) cb(t, ref.current)
  })
  return ref
}

function HtmlContent({ className, style, children, portal }) {
  const { size } = useThree()
  return (
    <HTML
      portal={portal}
      style={{
        position: 'absolute',
        top: -size.height / 2,
        left: -size.width / 2,
        width: size.width,
        height: size.height
      }}>
      <div className={className} style={style}>
        {children}
      </div>
    </HTML>
  )
}

function Plant({}) {
  const ref = useRef();
  const light1 = useWobble(2)
  const light2 = useWobble(2, 'cos')
  const { nodes } = useGLTFLoader(
    plant,
    true
  )

  useFrame(() => {
    const rotation = state.top.current / 10 * (Math.PI/180) || 0;
    ref.current.rotation.z = rotation;
  })


  return (
    <group>
      <pointLight
        ref={light1}
        position={[2, 1, 0]}
        intensity={1}
        distance={8}
        color="#ff1f75"
      />
      <pointLight
      ref={light2}
        position={[-2, 1, 0]}
        intensity={1}
        distance={8}
        color="#a35826"
      />
      <mesh ref={ref} geometry={nodes.stem.geometry} scale={[.7,.7,.7]} rotation={[-Math.PI /2, 0, 0]} position={[0,-4,-2]}>
        <meshStandardMaterial color='white' attach='material'/>
      </mesh>
    </group>
  )
}

function App() {
 
  const [events, setEvents] = useState()
  const [scrollTop, setscrollTop] = useState()
  const domContent = useRef()
  const scrollArea = useRef()
  const onScroll = (e) => {
    state.top.current = e.target.scrollTop;
  }
  useEffect(() => void onScroll({ target: scrollArea.current }), [])
  return (
    <>
      <Canvas
        colorManagement
        gl={{ alpha: false, antialias: true }}
        camera={{ position: [0, 0, 4.5], fov: 50, near: 0.1, far: 100 }}
        onCreated={({ gl, events }) => {
          gl.setClearColor('#222')
          // Export canvas events, we will put them onto the scroll area
          setEvents(events)
        }}>
        <Suspense fallback={null}>
          <Plant />
        </Suspense>
        <Block factor={1.5} offset={0}>
          <HtmlContent portal={domContent}>
            <div className="jumbo">
              <h1>
                Zone Digitali 2020
              </h1>
              <img src={augmentedNature} style={{ width: '100%'}} />
              <img src={logoMidi} style={{ width: '180px', margin: '45px auto'}} />
            </div>
          </HtmlContent>
        </Block>

        <Block factor={1.5} offset={1}>
          <HTML center portal={domContent}>
            <div style={{ display: 'flex', width: '100%'}}>
              <div style={{ display: 'flex', width: '100%', width: isMobile ? '80vw' : '60vw', flexDirection: 'column'}}>
                <p>Esplorate e riscoprite insieme a noi uno dei luoghi più magici della città, che per l’occasione verrà acceso da una nuova luce. L’edizione di quest’anno, Augmented Nature, è pensata insieme all'Orto Botanico e sostenuta da Fondazione della Comunità Bergamasca e racconta il mondo vegetale partendo da una riflessione su uno dei meccanismi più affascinanti della botanica, il fototropismo.
              </p>
              </div>
            </div>
          </HTML>
        </Block>

        <Block factor={1.5} offset={2}>
          <Panel side='left' scale={[2, 2, 0.6]} texture={np} />
          <HTML center portal={domContent}>
            <div style={{ display: 'flex', width: '100%'}}>
              {/* <div style={{ display: 'flex', width: '50%'}}>
                <img src={planar01} style={{ width: '300px'}} />
              </div> */}
              <div style={{ display: 'flex', width: isMobile ? '80vw' : '60vw', flexDirection: 'column'}}>
                <h2>Nature Perpétuelle</h2>
                <h4>Installazione cinetica a cura di MiDi // 
Partner tecnico Bee Innovative</h4>
                <p>
Stimolo e reazione: questo è ciò che esploriamo e raccontiamo attraverso Nature Perpétuelle. 
Che cosa innesca l’azione delle creature, siano esse umane o vegetali? Quali sono le spinte del sottosuolo che determinano il comportamento del singolo e quindi tutto l’universo?
Questo, ai nostri occhi, è il perpetuo movimento della natura, che continua a vivere, esistere, modificarsi e spostare il proprio sguardo nella direzione del sole, determinando il costante ondeggiare dell’universo.
</p>
              </div>
            </div>
          </HTML>
        </Block>

        <Block factor={1.5} offset={3}>
          <Panel side='right' scale={[2, 2, 0.6]} texture={sage} />
          <HTML center portal={domContent}>
            <div style={{ display: 'flex', width: '100%'}}>
              {/* <div style={{ display: 'flex', width: '50%'}}>
                <img src={planar01} style={{ width: '300px'}} />
              </div> */}
              <div style={{ display: 'flex', width: isMobile ? '80vw' : '60vw', flexDirection: 'column'}}>
                <h2>Matter Flows</h2>
                <h4>Sage Jenson // Video Installazione</h4>
                <p>
                Matter Flows è il progetto di video arte di Sage Jenson, artista multimediale con sede a Berlino, il cui lavoro si concentra su tematiche scientifiche come la biologia speculativa e la simulazione emotiva. Jenson propone spazi audiovisivi tattili, indaga tematiche come la teoria delle reti complesse, la realtà estesa e la coltivazione di creature ed ecosistemi digitali.
Matter Flows si basa sul lavoro dei biologi computazionali attorno alle reti di trasporto dei nutrienti. Attraverso una serie di processi connessi tra loro, emerge una varietà di forme strutturali.
</p>
              </div>
            </div>
          </HTML>
        </Block>

        <Block factor={1.5} offset={4}>
          <Panel side='left' scale={[2, 2, 0.6]} texture={idra} />
          <HTML center portal={domContent}>
            <div style={{ display: 'flex', width: '100%'}}>
              {/* <div style={{ display: 'flex', width: '50%'}}>
                <img src={planar01} style={{ width: '300px'}} />
              </div> */}
              <div style={{ display: 'flex', width: isMobile ? '80vw' : '60vw', flexDirection: 'column'}}>
                <h2>IDRA</h2>
                <h4>Performance musicale a cura di Francesca Pavesi</h4>
                <p>
                IDRA è un progetto in solo di Francesca Pavesi, sound designer e produttrice Milanese.
Sonorità Ambient, Soundscape e texture organiche si fondono attraverso l’uso di synth e sistemi modulari per entrare all’interno di un viaggio sonoro creando e ricreando altri mondi e modi d’ascolto. Una continua ricerca e improvvisazione guidata da ciò in cui si è immersi per trasportarvi ovunque decidiate di andare.

</p>
              </div>
            </div>
          </HTML>
        </Block>

        <Block factor={1.5} offset={5}>
          <Panel side='left' scale={[2, 2, 0.6]} texture={idra} />
        </Block>

        <Block factor={1.5} offset={6}>
          <Panel side='right' scale={[2, 2, 0.6]} texture={idra} />
        </Block>


        <Block factor={1.5} offset={7}>
          <HTML center portal={domContent}>
            <div style={{ display: 'flex', width: isMobile ? '80vw' : '60vw', flexDirection: 'column'}}>
              <p>
              Zone Digitali, che nasce nel 2018 ed è oggi alla sua terza edizione, è l’evento annuale organizzato da MiDi dedicato all’utilizzo dei linguaggi digitali in relazione all’arte in tutte le sue forme. 
Arte digitale, ibridazione tra linguaggi e riqualificazione urbana: questi sono i focus su cui MiDi concentra la sua attività, nonché le colonne portanti di Zone Digitali. Ogni anno uno spazio cittadino (nel 2018 la ex centrale di Daste e Spalenga e nel 2019 la ex chiesa di San Sisto a Colognola) viene riacceso grazie agli strumenti tecnologici alle opere digitali che ospita.</p>
 
<p>
Un percorso elaborato, quello che ha portato MiDi a creare lo Zone Digitali di quest’anno, grazie soprattutto alle nuove collaborazioni che hanno arricchito il lavoro della giovane realtà bergamasca: l’Orto Botanico, grazie al quale è stato possibile approfondire la ricerca scientifica di partenza, l’Associazione Semifreddo, curatela del progetto insieme a MiDi, e Bee Innovative, partner tecnologico nella creazione dell’installazione creata per l’evento.

              </p>
            </div>
          </HTML>
        </Block>

        <Block factor={1.5} offset={8}>
          <HTML center portal={domContent}>
            <div style={{ display: 'flex', width: isMobile ? '80vw' : '60vw'}}>
              <h2></h2>
            </div>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', width: isMobile ? '80vw' : '60vw', alignItems: 'center', justifyContent: 'center'}}>
              <p style={{ marginTop: '0px', fontSize: isMobile ? '22px' : '40px', marginRight: '15px'}}>Sviluppato da</p>
              <a target='_blank' href="https://instagram.com/encoded.studio"><img src={logo} width={isMobile ? 150 : 300} /></a>
            </div>
          </HTML>
        </Block>

        
      </Canvas>

      <div className="scrollArea" ref={scrollArea} onScroll={onScroll} {...events}>
        <div style={{ position: 'sticky', top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 85}vh` }} />
      </div>
    </>
  )
}

render(<App />, document.querySelector('#root'))
