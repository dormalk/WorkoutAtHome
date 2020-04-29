import React from 'react'
import {Rewords} from '../../configs/rewords';

export default({userdata}) => {
    return(
    <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title">Rewords</h4>
        </div>
        <ul className="list-group">
        {
            Rewords.filter((reword) => reword(userdata).isAchived === false).map((reword, index) => {
                const {name,medal, desc} = reword(userdata);
                return (
                index<4 &&
                <li className="list-group-item" key = {index}>
                    <div className="media">
                      <div className="media-left">
                        {medal}
                      </div>
        
                      <div className="media-body">
                        <div className="pull-right">
                          <a className="btn btn-pink-500 btn-circle btn-stroke btn-sm" href="http://google.com"><i className="fa fa-play"></i></a>
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