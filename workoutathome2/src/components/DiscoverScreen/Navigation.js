import React from 'react';
import { withRouter } from 'react-router-dom';

const categories = [
    {
        label: 'Yoga',
        image: 'https://via.placeholder.com/300.png'
    },
    {
        label: 'Hiit',
        image: 'https://via.placeholder.com/300.png'
    },
    {
        label: 'Pilates',
        image: 'https://via.placeholder.com/300.png'
    },
    {
        label: 'Cardio',
        image: 'https://via.placeholder.com/300.png'
    },
    {
        label: 'Strength',
        image: 'https://via.placeholder.com/300.png'
    },
    {
        label: 'Toning',
        image: 'https://via.placeholder.com/300.png'
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
            <center>
            <h2>Navigation Panel</h2>
            </center>
            <br/>
            <div className="row">
                <div className="col-lg-2 col-xs-1"></div>

                <div className="col-lg-4 col-xs-5" key="singles">
                    <div className={`panel panel-default route ${pickRoute === 'singles'? 'active': ''}`} onClick={() => setPickRoute('singles')}>
                        <div className="panel-headline"><h3><center>Single Workouts</center></h3></div>
                        <div className="cover"><img src="https://via.placeholder.com/300.png"/></div>
                    </div>
                </div>
                <div className="col-lg-4 col-xs-5" key="challenges">
                    <div className={`panel panel-default route ${pickRoute === 'challenges'? 'active': ''}`} onClick={() => setPickRoute('challenges')}>
                        <div className="panel-headline"><h3><center>Challenges</center></h3></div>
                        <div className="cover"><img src="https://via.placeholder.com/300.png"/></div>
                    </div>
                </div>
                <div className="col-lg-2 col-xs-1"></div>

            </div>

            <div className="panel panel-default">
                <div className="panel-heading"><h3><center>Categories</center></h3></div>
                <div className="panel-body" id="categories">
                    {
                        categories.map(category => 
                            <div className={`panel panel-default`} kay={category.label} onClick={() => redirect(category.label)}>
                                <div className="panel-headline"><h3><center>{category.label}</center></h3></div>
                                <div className="cover"><img src={category.image}/></div>
                            </div>
    
                        )
                    }
                </div>
            </div>
        </div>
    )
})