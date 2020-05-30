import React from 'react';
import Header from './header';


const Home = (props) => {
    return(
        <React.Fragment>
        <Header {...props}/>
        <h4>WELCOME TO RENTAL MANAGEMENT SYSTEM</h4>
        <center>Please Select Location</center> 
        </React.Fragment>
    )
      
}

export default Home;