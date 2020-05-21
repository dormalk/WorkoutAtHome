import React from 'react';
import { withRouter } from 'react-router-dom';

const categories = [
    {
        label: 'Yoga',
        image: './assets/images/1.png'
    },
    {
        label: 'Hiit',
        image: './assets/images/2.png'
    },
    {
        label: 'Pilates',
        image: './assets/images/3.png'
    },
    {
        label: 'Cardio',
        image: './assets/images/4.png'
    },
    {
        label: 'Strength',
        image: './assets/images/5.png'
    },
    {
        label: 'Toning',
        image: './assets/images/6.png'
    },

]
export default withRouter(({history,pickFilterVideo,pickFilterChallenge}) => {

    function redirect(type){
        pickFilterVideo(type,'type');
        history.push(`/singles`)
        
    }

    return (
        <div id="navigation_site">
            <hr/>
            <br/>
            <div className="panel panel-default">
                <div className="panel-body" id="categories">
                    {
                        categories.map((category,index) => 
                            <div key={index} className={`panel panel-default`} onClick={() => redirect(category.label)}>
                                <div className="panel-headline"><h3><center>{category.label}</center></h3></div>
                                <div><img style={{width: "100%"}} src={category.image}/></div>
                            </div>
    
                        )
                    }
                </div>
            </div>
        </div>
    )
})