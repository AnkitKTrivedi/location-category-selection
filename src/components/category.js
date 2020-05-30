import React from 'react';
import _ from 'lodash';
import Header from './header';
import {data} from '../config/data';
import '../App.css';
import styles from '../../src/styles/categories.module.css'; 


const  Category = ({location, history}) => {
    const[categories, setCategories] = React.useState([]);
    const[subCategory, setSubCategory] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState({});

    
    React.useEffect(() => {
        if(location && location.state && !_.isEmpty(location.state)){
            if(data.status === 'success' ){
                let locations, param = location.state, categoryList = [];
                locations = data.data.locations.find(item => item.name === param.category);
                if(param.branchName){
                    let branchCat = locations.branches.find(item => item.name === param.branchName);
                    categoryList = branchCat.categories;
                }
                else if(param.category){
                    categoryList = getCategories(locations.branches);
                }
                setSelectedCategory(param);
                setCategories(categoryList);
                setSubCategory('');
                  
            }
        }
      }, [location]);
    

const onCategorySelection = (e, category) => {
    if(e){
        e.preventDefault();
        e.stopPropagation();
    }
   
    if(category && category.subcategories){
        setCategories(category.subcategories);
        setSubCategory(category.name)
    }
};

const backClick = () => {
    setSubCategory('');
    history.push(`category`, selectedCategory);
}

    if(!categories.length)
    return (<React.Fragment>
        <Header/>
        <center>No data found.</center>
        </React.Fragment>)

    return(
        <React.Fragment>
            <Header/>
    <span className={styles.catalog}>
        {subCategory ?  <img onClick={() => backClick()} className={styles.back} src={require('../assests/category/back.png')} alt='' height={30} width={45}/>
                : '' }
   
        Equipment Cataloog {subCategory ? ` / ${subCategory}` : ''}</span>
         <div className={styles.cardContainer}>
             {categories.map(item => (
                  <div className={styles.card} key={item.name + Math.random()} onClick={(e) => onCategorySelection(e,item)}>
                      <img src={getImageUrl(item.image)} alt="logo" height={200} width={200} />
             <center>{item.name}
             <img className={styles.arrow} src={require('../assests/category/arrow.png')} alt='' height={30} width={15}/>
             </center>
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