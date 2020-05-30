import React from 'react';
import {useHistory} from 'react-router-dom';
import {data} from '../config/data';


const MenuItems = (props) => {
    let {menuName, subMenuItems} = props;
    const history = useHistory();
    const onClickCategory = (e, menuName, branchName) => {
        if(e){
            e.preventDefault();
            e.stopPropagation();
        } 
        let state = {
            category: menuName,
            branchName: branchName
        };
        history.push(`category`, state);
    }

    const onClickBranch = (e, menuName, branchName) => {
        if(e){
            e.preventDefault();
            e.stopPropagation();
        }   
        let state = {
            category: menuName,
            branchName: branchName
        };
        history.push(`category`, state);
    }

    return(
       
             <li onClick={(e) => onClickCategory(e, menuName, '')} ><a href="#">{menuName}</a>
             <SubMenuItems subMenuItems={subMenuItems} onClick={onClickBranch} menuName={menuName}/>
             </li>
    )
}

const SubMenuItems = ({subMenuItems, onClick, menuName}) => {
    if(!subMenuItems || !subMenuItems.length)
    return <span></span>

    return (
        <ul>
        { subMenuItems.map(item =>  <li onClick={(e) => onClick(e, menuName, item.name)} key={item.name + '' + Math.random()}><a href="#">{item.name}</a></li>) }
        </ul>    
    )
}

const MainMenu = (props) => {

    return (
        <li>
            <a href="#">Select Locations</a>
            <ul>
            {data.data.locations.map((item) => <MenuItems {...props} menuName={item.name} subMenuItems={item.branches}   key={item.name + '' + Math.random()}  />)}
            </ul>
            
        </li>
    )
};



export default MainMenu;