import React, { useEffect, useRef, useState } from 'react';

function randomColor(currentColor) {
    const COLOR_LIST = ['red', 'green', 'blue'];
    const currentIndex = COLOR_LIST.indexOf(currentColor);
    let newIndex = currentIndex;
    while(currentIndex === newIndex) {
        newIndex = Math.trunc(Math.random()*3);
    }   
    console.log(COLOR_LIST[newIndex]) 
    return COLOR_LIST[newIndex];
}

function useMagicColor() {
    const [color, setColor] = useState('transparent');
    const colorRef = useRef('transparent');

    useEffect(()=>{
        const colorInterval = setInterval(()=>{
            const newColor = randomColor();
            setColor(newColor);
            colorRef.current = newColor;
        },500);
        return () => clearInterval(colorInterval);
    })
    return color;
}

export default useMagicColor;