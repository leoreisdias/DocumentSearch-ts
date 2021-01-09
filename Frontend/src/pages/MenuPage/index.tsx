import React from 'react';


import 'semantic-ui-css/semantic.min.css'



import logo1 from '../../assets/images/logo.png'
import logo2 from '../../assets/images/logo.png'
import logo3 from '../../assets/images/logo.png'
import logo4 from '../../assets/images/logo.png'
import './styles.css';
import { Link } from 'react-router-dom';


function Menu() {


    return (
        <div id="page-menu-content">
            <section className="options">

                <Link to="/projeto">
                    <div className="card_1">
                        <img className="logoImage" src={logo1} alt="project1" />
                    </div>
                </Link>
                <div className="card_2">
                    <img className="logoImage" src={logo2} alt="project2" />
                </div>
                <div className="card_3">
                    <img className="logoImage" src={logo3} alt="project3" />
                </div>
                <div className="card_4">
                    <img className="logoImage" src={logo4} alt="project4" />
                </div>

            </section>
        </div>
    )
}

export default Menu;