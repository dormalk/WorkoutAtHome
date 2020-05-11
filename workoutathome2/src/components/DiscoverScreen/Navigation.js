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
    }
]
export default withRouter(({history,pickFilterVideo,pickFilterChallenge}) => {
    const [pickRoute, setPickRoute] = React.useState('');

    function redirect(type){
        if(pickRoute=='singles') pickFilterVideo(type,'type');
        if(pickRoute=='challenges') pickFilterChallenge(type,'type');

        history.push(`/${pickRoute}`)
        
    }

    return (
        <div id="navigation_site">
            <hr/>
            <br/>
            <div className="row" style={{marginLeft: 0,marginRight: 0}}>
                <div className="col-lg-5 col-xs-6" key="singles">
                    <div className={`panel panel-default route ${pickRoute === 'singles'? 'active': ''}`} onClick={() => setPickRoute('singles')}>
                        <div className="cover"><img src="./assets/images/5.png"/></div>
                        <div className="panel-headline"><h3><center> Workouts</center></h3></div>
                    </div>
                </div>
                <div className="col-lg-2 col-xs-0"></div>
                <div className="col-lg-5 col-xs-6" key="challenges">
                    <div className={`panel panel-default route ${pickRoute === 'challenges'? 'active': ''}`} onClick={() => setPickRoute('challenges')}>
                        <div className="panel-headline" ><h3><center>Challenges</center></h3></div>
                        <div className="cover"><img className="cha" src="./assets/images/6.png"/></div>
                    </div>
                </div>
            </div>

            <div className="panel panel-default">
                <div className="panel-heading"><h3><center>Categories</center></h3></div>
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