import React from 'react';
import CategoriesJSON from '../../data/cities.json';
import {createUseStyles} from "react-jss";
import arrow from "../../img/arrowright.svg";
import close from "../../img/x-mark.svg";

const useStyles = createUseStyles({
    container: {
        background: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex:10
    },
    infoBlock: {
        width:"100%",
        height:"100%",
        background: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    navMainPageBtn: {
        textDecoration: "none",
        color: "#454545",
        fontSize: "14px",
    },
    OneCategoryInfo: {
        display: "flex",
        flexDirection: "row",
        marginLeft:'10px'
    },
    OneCategoryImg: {
        width: "20px",
        marginRight: "10px",
    },
    OneCategoryItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "5px 0",
        borderBottom: "#DDDDDD solid 1px",
        textDecoration: "none",
        color: "#000000",
    },
});

const Modal = ({ isOpen, onClose, handleModalResult }) => {
    const classes = useStyles();
    if (!isOpen) return null;

    const handleSave = (result) => {
        handleModalResult(result);
        onClose();
    };

    const citiesList = CategoriesJSON.cities.map((city) =>
        <div onClick={() => handleSave(city.title)} className={classes.OneCategoryItem}>
            <p className={classes.OneCategoryInfo}>{city.title}</p>
            <img className={classes.OneCategoryImg} src={arrow} alt={'logo'}/>
        </div>
    );

    return (
        <div onClick={onClose} className={classes.container}>
            <div onClick={(e) => e.stopPropagation()} className={classes.infoBlock}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start", justifyContent:'space-between'}}>
                    <p onClick={onClose} style={{marginBottom:'0px', marginLeft:'10px', color:'#666'}}>{'< Назад'}</p>
                    <h3 style={{marginTop:'10px', marginLeft:'10px'}}>Выберете город</h3>
                </div>
                <div style={{height: 'calc(100vh - 120px)', overflowY: 'auto'}}>
                    <div onClick={() => handleSave("Польше")} className={classes.OneCategoryItem}>
                        <p className={classes.OneCategoryInfo}>Во всей Польше</p>
                        <img className={classes.OneCategoryImg} src={arrow} alt={'logo'}/>
                    </div>
                    {citiesList}
                </div>
            </div>
        </div>
    );

};

export default Modal;


