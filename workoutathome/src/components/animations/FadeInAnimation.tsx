import React from 'react';

interface Props {
    children: any;
}


export const FadeInAnimation = (props: Props) => {
    const animationEl = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const animationElRef = animationEl.current;  
        
        if(animationElRef != null){
            animationElRef.classList.add('fadeInAnimation');
        }
        return(() => {
            if(animationElRef != null){
                animationElRef.classList.remove('fadeInAnimation');
            }    
        })
    },[animationEl])

    return(
        <div ref={animationEl}>
            {props.children}
        </div>
    )
}