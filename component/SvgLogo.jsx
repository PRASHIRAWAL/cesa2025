'use client'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin,useGSAP);

const SvgLogo = () => {
    const container=useRef();
    const pathref=useRef();

    useGSAP(()=>{

        gsap.set(pathref.current,{drawSVG:"0% 0% "})

        gsap.to((pathref.current),{
            duration:3.5,
            drawSVG:"0% 100%",
            ease:"power2.inOut"
        })

    },{scope:container})

    return (
        <div ref={container}>
            <svg width="1008" height="464" viewBox="0 0 1608 464" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path ref={pathref} d="M5 5V459H333.356V345.5H150.936V118.5H333.356V5H5ZM399.027 5H756.571V118.5H530.37V151.882H720.087V285.412H530.37V345.5H756.571V459H399.027V285.412L442.808 218.647L399.027 185.265V5ZM814.945 5H1172.49V118.5H938.991V252.029L814.945 151.882V5ZM1048.44 218.647V345.5H814.945V459H1172.49V285.412L1048.44 218.647ZM1216.27 5H1603V459H1486.25V345.5L1347.61 218.647H1486.25V118.5H1347.61V459H1216.27V5Z" stroke="white" strokeWidth="10" />
            </svg>

        </div>
    )
}

export default SvgLogo
