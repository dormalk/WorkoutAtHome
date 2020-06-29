import React from 'react';

interface Props {
    children: any;
    color: string;
}


export const ColorizeAnimation = (props: Props) => {
    const animationEl = React.useRef<HTMLDivElement>(null);
    const [prevColor,setPrevColor] = React.useState('');
    React.useEffect(() => {
        const animationElRef = animationEl.current;  
        
        if(animationElRef != null){
            animationElRef.classList.add('colorizeAnimation');
            setPrevColor(animationElRef.style.color || 'black');
            animationElRef.style.color = props.color;
        }
        return(() => {
            if(animationElRef != null){
                animationElRef.classList.remove('colorizeAnimation');
                animationElRef.style.color = prevColor || 'black';
            }    
        })
    },[animationEl,prevColor,setPrevColor, props.color])

    return(
        <div ref={animationEl}>
            {props.children}
        </div>
    )
}