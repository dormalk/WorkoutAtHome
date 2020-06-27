import React from 'react';
import { withRouter } from 'react-router-dom';
import ShowTopInCategory from './ShowTopInCategory';
import {categories} from '../../configs/videoParams';

export default withRouter(({history,pickFilterVideo, videos}) => {
    function redirect(type){
        if(type !== 'Challenges'){
            pickFilterVideo(type,'type');
            history.push(`/singles`)
        }else {
            history.push(`/challenges`)
        }
        
    }

    return (
        <div id="navigation_site">
        {            
            // <div className="panel panel-default showOnMobile">
            //     <div className="panel-body" id="categories">
            //         {
            //             categories.map((category,index) => 
            //                 <div key={index} className={`panel panel-default`} onClick={() => redirect(category.label)}>
            //                     <div className="panel-headline"><h3><center>{category.label}</center></h3></div>
            //                     <div><img style={{width: "100%"}} src={category.image}/></div>
            //                 </div>
    
            //             )
            //         }
            //     </div>
            // </div>
        }       
        <div className="">
            {
                            categories.map((category,index) => (
                                        category.label !== 'Challenges' && 
                                        <ShowTopInCategory  title={`Top of `+category.label} 
                                                            key={index}
                                                            onShowMore={() => redirect(category.label)}
                                                            videos={
                                                                videos.filter(v => v.type === category.label)
                                                                .sort((v1,v2) => v2.clicks - v1.clicks)
                                                                .filter((v,index) => index < 4)}/>
                                                                ))
            }
        </div> 

 </div>
    )
})