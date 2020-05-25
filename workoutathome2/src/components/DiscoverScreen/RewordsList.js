import React from 'react'
import {Rewords} from '../../configs/rewords';
import {Link} from 'react-router-dom';

export default({userdata,onSignIn}) => {
    return(
    <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title">Rewards</h4>
        </div>
        <ul className="list-group">
        {
            Rewords.filter((reword) => reword(userdata).isAchived === false).map((reword, index) => {
                const {name,medal, desc,link,func} = reword(userdata);
                return (
                index<4 &&
                <li className="list-group-item" key = {index}>
                    <div className="media">
                      <div className="media-left">
                        {medal}
                      </div>
        
                      <div className="media-body">
                        <div className="pull-right">
                        {
                          link? <Link className="btn btn-pink-500 btn-circle btn-stroke btn-sm" to={link}><i className="fa fa-play"></i></Link>:
                          <a className="btn btn-pink-500 btn-circle btn-stroke btn-sm" onClick={() => func(() => onSignIn())}><i className="fa fa-play"></i></a>

                        }
                          
                        </div>
                        <h4 className="media-heading margin-v-4">{name}</h4>
                        <p className="text-grey-500 margin-none">{desc}</p>
                      </div>
                    </div>
                </li>        
                )
            })
        }
       </ul>
      </div>
    )
}