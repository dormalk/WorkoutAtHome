import React from 'react';


export default () => {
    return (
        <form className="navbar-form navbar-right">
        <div className="search-2">
          <div className="input-group">
            <input type="text" className="form-control form-control-w-150" placeholder="Search .."/>
            <span className="input-group-btn">
                <button className="btn btn-inverse" type="button"><i className="fa fa-search"></i></button>
            </span>
          </div>
        </div>
      </form>

    )
}