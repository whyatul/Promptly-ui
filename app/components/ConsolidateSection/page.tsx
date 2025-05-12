"use client"

import ScrollTrigger from 'gsap/ScrollTrigger';
import { animate, stagger, onScroll } from 'animejs';
import { useEffect } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import styles from './ConsolidateSection.module.css'
import asana from './assets/asana.png'
import gpt from './assets/gpt.png'
import jira from './assets/jira.png'
import kissflow from './assets/kissflow.png'
import looker from './assets/looker.png'
import miro from './assets/miro.png'
import monday from './assets/monday.png'
import notion from './assets/notion.png'
import sales from './assets/sales.png'
import slack from './assets/slack.png'
import tableau from './assets/tableau.png'
import teams from './assets/teams.png'
gsap.registerPlugin(ScrollTrigger);

export default function App() {

  useEffect(() => {

    ScrollTrigger.create({
      trigger: ".pin",
      pin: true,
      start: "top+=300 center",
      end: "+=1000",
      markers:false,
    })

    const scrollObserver = onScroll({
    enter: 'top-=100 top',
    leave: 'top-=500 bottom',
    sync: .10,
    debug: false,
  })

    animate('.left', {
      x: stagger(['80rem','20rem']),
      y: stagger(['-20rem','-60rem']),
      opacity:.0,
      rotate: stagger(['.125turn','2turn']),
      ease: 'linear',
      alternate:true,
      delay: stagger(100),
      autoplay:onScroll({
        debug:false,
      enter: 'top top',
      leave: 'top-=400 bottom',
      sync: .10,
    }) 
  });

    animate('.right', {
      x: stagger(['-80rem','-20rem']),
      y: stagger(['-20rem','-60rem']),
      opacity:0,
      rotate:'2turn',
      ease: 'linear',
      alternate:true,
      delay: stagger(100),
      autoplay:onScroll({
      debug:false,
      enter: 'top-=80 top',
      leave: 'top-=500 bottom',
      sync: .10,
    })
  })

    animate('li', {
    opacity: 1,
    delay:stagger(100),
    ease: 'linear',
      alternate:true,
    autoplay:onScroll({
      debug:false,
      enter: 'bottom-=100 bottom',
      leave: 'top+=100 bottom',
      sync: true,
    })
  });

    animate('span', {
      y: [
        { to: '-2.75rem', ease: 'outExpo', duration: 600 },
        { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
      ],
      rotate: {
        from: '-1turn',
        delay: 0
      },
      delay: (_, i) => i * 50,
      ease: 'inOutCirc',
      loopDelay: 1000,
      loop: true,
      autoplay:onScroll({
        debug:false,
        // sync:true,
        enter: 'bottom-=80 top',
        leave: 'top-=2000 bottom',
      })
  })
  // scrollObserver.link(heading);
  // scrollObserver.link(items);
  // scrollObserver.link(rightToLeft);
  // scrollObserver.link(leftToRight);
  }, []);

  return (
    <>
      <div className="scroll-container scroll-y w-full">
        <div className="scroll-content grid square-grid">
          <div className="scroll-section padded">
            <div className="large row">
            </div>
          </div>
          <div className="scroll-section padded">
            <div className="large row pin"> 
            <div className='justify-items-center'>
          <h2 className={styles.heading} style={{display:"flex"}} >
            <span>T</span>
            <span>H</span>
            <span>E</span>
            <span>&nbsp;</span>
            <span>O</span>
            <span>L</span>
            <span>D</span>
            <span>&nbsp;</span>
            <span>W</span>
            <span>A</span>
            <span>Y</span>
            <span>&nbsp;</span>
            <span>O</span>
            <span>F</span>
          </h2>
          <h2 className={styles.heading} style={{display:"flex"}} >
            <span>W</span>
            <span>O</span>
            <span>R</span>
            <span>K</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </h2>
            </div>
            <div className={`{styles.container}`}>
                <div className={`${styles.div} items-center justify-items-center`}>
                  <ol className={styles.list}>
                    <li style={{padding:4,opacity:0}}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className={styles.icons}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
                      Time wasted switching between apps
                    </li>
                    <li style={{padding:4,opacity:0}}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className={styles.icons}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>

                      Scattered conversations and decisions
                    </li>
                    <li style={{padding:4,opacity:0}}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className={styles.icons}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
                      Can’t find important info or files
                    </li>
                    <li style={{padding:4,opacity:0}}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className={styles.icons}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
                      Too many notifications in too many places
                    </li>
                    <li style={{padding:4,opacity:0}}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className={styles.icons}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
                      Work feels chaotic and unfocused
                    </li>
                    <li style={{padding:4,opacity:0}}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"
                      className={styles.icons}>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                      Paying for many tools drains your budget
                    </li>
                  </ol>
                </div>
                <div className={`${styles.div} ${styles.set}`}>
                <div>
                  <Image
                    src={asana}
                    alt="Responsive Image"
                    className={`${styles.icon} left`}
                  />
                  <Image
                    src={gpt}
                    alt="Responsive Image"
                    className={`${styles.icon} ${styles.right} right`}
                  />
                </div>
                <div>
                <Image
                  src={jira}
                  alt="Responsive Image"
                  className={`${styles.icon} ${styles.right} right`}     
                />
                <Image
                  src={kissflow}
                  alt="Responsive Image"
                  className={`${styles.icon} ${styles.right} right`}
                />
                <Image
                  src={monday}
                  alt="Responsive Image"
                  className={`${styles.icon} left`}
              />
                <Image
                  src={slack}
                  alt="Responsive Image"
                  className={`${styles.icon} left`}
              />
                </div>
                <div>
                  <Image
                    src={teams}
                    alt="Responsive Image"
                    className={`${styles.icon} ${styles.right} right`}            
                  />
                  <Image
                    src={looker}
                    alt="Responsive Image"
                    className={`${styles.icon} ${styles.right} right`}  
                />
                  <Image
                    src={miro}
                    alt="Responsive Image"
                    className={`${styles.icon} ${styles.right} right`}
                  />
                  <Image
                    src={notion}
                    alt="Responsive Image"
                    className={`${styles.icon} left`}
                  />
                  <Image
                    src={sales}
                    alt="Responsive Image"
                    className={`${styles.icon} left`}
                  />
                  <Image
                    src={tableau}
                    alt="Responsive Image"
                    className={`${styles.icon} left`}
                  />
                  {/* <img src="" className="lefticon" alt="logo" style={{display:'inline'}}  />
                  <img src="" className="lefticon" alt="logo" style={{display:'inline'}}  />
                  <img src="" className="lefticon" alt="logo" style={{display:'inline'}}  /> */}
                </div>
                </div>
            </div>
            </div>
          </div>
          <div className="scroll-section">
          </div>
        </div>
      </div>
    </>
  )}