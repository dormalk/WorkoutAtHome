import React from 'react';

interface Props{
    id: string;
    children: JSX.Element;
    style?: any;
    onStickyStyle?:any;
    listen?: any;
}

export class StickyElement extends React.Component<Props,any>{
    componentDidMount(){
        var elem:any = document.getElementById(this.props.id)
        var placeHolder:any = document.getElementById(`${this.props.id}_placeholder`)
        var elemTop = elem.offsetTop;
        var elemBottom = elemTop + elem.offsetHeight;
        elem.style.transition = 'all 1s';
        const listenDoc = this.props.listen? document.getElementById(this.props.listen): document;
        listenDoc?.addEventListener('scroll',(event) => {
            var docViewTop = this.props.listen? document.getElementById(this.props.listen)?.scrollTop || window.pageYOffset:document.documentElement.scrollTop  ||  window.pageYOffset;
            var docViewBottom = docViewTop + window.innerHeight;
            const activeSticky = ((elemBottom-docViewTop <= docViewBottom) && (elemTop >= docViewTop - elem.offsetHeight + 100)) ;
            if(!activeSticky && docViewTop > elem.offsetHeight + 100){
                if(elem.style.position !== 'fixed'){
                    elem.style.position = 'fixed';
                    elem.style.top = '-50px';
                    elem.style.zIndex = '1000';
                    elem.style.transform = 'translateY(50px)';
                    for(let property in this.props.onStickyStyle){
                        elem.style[property] = this.props.onStickyStyle[property];
                    }
                    elem.classList.add('sticy')
                    placeHolder.style.display = 'block';
                }
            } else {
                if(elem.style.position !== 'relative')
                    elem.style.position = 'relative';

                for(let property in this.props.onStickyStyle){
                    elem.style[property] = '';
                }
                elem.classList.remove('sticy')
                placeHolder.style.display = 'none';

            }
    
        })

    }
    render():any{
        return(
            <React.Fragment>
                <div id={this.props.id} style={this.props.style}>
                    {this.props.children}
                </div>
                <div id={`${this.props.id}_placeholder`} style={{display: 'none'}}>
                    {this.props.children}
                </div>
            </React.Fragment>

        )
    }
} 

