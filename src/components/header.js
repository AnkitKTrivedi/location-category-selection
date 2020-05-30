import React from 'react';
import MainMenu from '../../src/menu/menuItems';

const Header = (props) => {
    return(
        <React.Fragment>
         <center>RENTAL MANAGEMENT SYSTEM</center>
         <nav>
        <ul>
          <MainMenu {...props}/>
        </ul>
      </nav>
    </React.Fragment>
    )
}

export default Header;