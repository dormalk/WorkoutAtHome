import React from 'react';


export const Footer = () => {
    return (
        <footer className="footer" style={{width: '100%'}}>
            <strong>Workouts</strong> v1.4.0 &copy; Copyright {new Date().getFullYear()}
        </footer>
    )
}