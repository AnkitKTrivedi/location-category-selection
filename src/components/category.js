import React from 'react';
import _ from 'lodash';
import Header from './header';
import {data} from '../config/data';
import '../App.css';
import styles from '../../src/styles/categories.module.css'; 


const  Category = ({location}) => {
    let categories = [];
    if(location && location.state && !_.isEmpty(location.state)){
        if(data.status === 'success' ){
            let locations, param = location.state;
            locations = data.data.locations.find(item => item.name === param.category);
            if(param.branchName){
                let branchCat = locations.branches.find(item => item.name === param.branchName);
                categories = branchCat.categories;
            }
            else if(param.category){
                categories = getCategories(locations.branches);
            }
              
        }
    }

    if(!categories.length)
    return (<React.Fragment>
        <Header/>
        <center>No data found.</center>
        </React.Fragment>)

    return(
        <React.Fragment>
            <Header/>
         <div className={styles.cardContainer}>
             {categories.map(item => (
                  <div className={styles.card} key={item.name + Math.random()}>
                      <img src={getImageUrl(item.image)} alt="logo" height={200} width={200} />
             <center>{item.name}</center>
                  </div>
             ))}
         </div>
    </React.Fragment>
    )
}


const getImageUrl = (img) => {

    try{
        return require(`../assests/category/${img}`);
    }catch(err){
        return require(`../assests/category/nodata-found.jpg`);
    }
    
}

const getCategories = (branches) => {
    let categories = [];
   branches && branches.forEach(element => {
        categories = [...categories, ...element.categories];   
    });
    return _.uniqBy(categories, 'name');
}

export default Category;