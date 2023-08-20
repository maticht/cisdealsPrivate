import React, {useState} from 'react';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
    modalWrapper: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(200, 200, 200, 0.1)',
        zIndex: 1000,
    },
    modalContent: {
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '100%',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    },
    modalTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    input: {
        outline: "none",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        border: "none",
        width: "96.4%",
        padding: "15px",
        paddingRight: "0px",
        borderRadius: "8px",
        backgroundColor: "#f1f1f1",
        margin:"5px 0 5px 0",
        fontSize: "14px",
    },
    addButton: {
        display: 'flex',
        border: 'none',
        outline: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: '12px 12px 12px 12px',
        backgroundColor: '#000000',
        borderRadius: '8px',
        color: '#fff',
        width: '100%',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: 'pointer',
        margin: '10px 0 0'
    },
});

const Modal = ({isOpen, onClose, handleModalResult, parentCategory, selectedUser}) => {
    const classes = useStyles();
    const [newCategory, setNewCategory] = useState('');

    if (!isOpen) return null;

    const handleSave = () => {
        if(newCategory === ''){
            alert('Заполните поле')
        }else {
            handleModalResult(newCategory, parentCategory);
            setNewCategory('');
            onClose();
        }
    };

    const handleChange = (event) => {
        setNewCategory(event.target.value);
    };

    const handleClose = ()=>{
        setNewCategory('');
        onClose()
    }

    return (
        <div className={classes.modalWrapper} onClick={handleClose}>
            <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
                <p className={classes.modalTitle}>Добавьте свою подкатегорию в категорию "{parentCategory}"</p>
                <input
                    type="text"
                    onChange={handleChange}
                    value={newCategory}
                    required
                    className={classes.input}
                    placeholder="Введите подкатегорию"
                />
                <button className={classes.addButton} onClick={handleSave}>
                    Добавить
                </button>
            </div>
        </div>
    );
};

export default Modal;
