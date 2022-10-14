import React from 'react'
import './About.css'

export default function About() {
    
        return (
            <>
                <div className="aboutSection">
                    <div className="aboutText">
                        <h1 className="aboutTitle">About Me</h1>
                        <p className="aboutBody">I am a 3rd year student at the Universidad Del Valle de Guatemala, studying Computer Science. I am passionate about learning new technologies and solving problems. I am currently seeking a full-time (remote) position as a web or software developer or a paid internship in the US.</p>
                        <p className='aboutBody'>These are some of the technologies I handle:</p>

                        <div className="aboutTech">

                            <div className="tech">
                                <div className="techLeft">
                                    <ul>
                                        <li className='aboutBody'>JavaScript</li>
                                        <li className='aboutBody'>React / React Native</li>
                                        <li className='aboutBody'>Node.js</li>
                                        <li className='aboutBody'>Express</li>
                                        <li className='aboutBody'>SQL</li>
                                    </ul>
                                </div>
                                <div className="techRight">
                                    <ul>
                                        <li className='aboutBody'>Three JS</li>
                                        <li className='aboutBody'>WebPack/Vite</li>
                                        <li className='aboutBody'>GIT</li>
                                        <li className='aboutBody'>Python</li>
                                        <li className='aboutBody'>Java</li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    
    }