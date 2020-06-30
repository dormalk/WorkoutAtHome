    
import React from 'react';
import { NavLink } from 'react-router-dom';


const navigationLink = [
    {
        section: 'General Settings',
        navlinks: [
            {
                label: 'Home',
                path: '/editor/create',
                icon: 'fas fa-home'
            },
            {
                label: 'Room Configurations',
                path: '/editor/create/general',
                icon: 'fas fa-cogs'
            },
            {
                label: 'Limitations',
                path: '/editor/create/limitation',
                icon: 'fas fa-key'
            }
        ]
    },
    {
        section: 'Components',
        navlinks: [
            {
                label: 'Add Exercise',
                path: '/editor/create/addcomponent/excersie',
                icon: 'fas fa-dumbbell'
            },
            {
                label: 'Add Rest',
                path: '/editor/create/addcomponent/rest',
                icon: 'fas fa-bed'
            }
        ]
    }


]


export default () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return(
        <nav className={`nav ${isOpen? 'open':'close'}`}>
            <button onClick={() => setIsOpen(!isOpen)}><i className={`fas fa-arrow-left ${isOpen? 'open':'close'}`}></i></button>
            {
                navigationLink.map(nav =>
                    <React.Fragment key={nav.section}>
                        <h3>{nav.section}</h3>
                        <ul>
                            {
                                nav.navlinks.map(link => (
                                    <NavLink key={link.label} exact to={link.path} activeClassName="is-active">
                                        <i className={link.icon}></i>  <span>{link.label}</span>
                                    </NavLink>
                                ))
                            }
                        </ul>
                    </React.Fragment>
                )
            }
        </nav>
    )
}
