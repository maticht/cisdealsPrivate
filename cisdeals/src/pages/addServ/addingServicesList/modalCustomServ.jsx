import React, {useState} from 'react';
import plus from "../../../img/Plus.svg";
import './addingServicesList.css'

const Modal = ({isOpen, onClose, handleModalResult, parentCategory, selectedUser}) => {
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
        <div className={'modalWrapper'} onClick={handleClose}>
            <div className={'modalCContent'} onClick={(e) => e.stopPropagation()}>
                <div style={{display:'flex', flexDirection:'row', alignItems:"flex-start", justifyContent:'space-between'}}>
                    <p className={'modalTitle'}>Добавьте свою подкатегорию в категорию <b>"{parentCategory}"</b></p>
                    <img onClick={handleClose} className={'removeImgButton'} src={plus} alt="Plus"/>
                </div>
                <input
                    type="text"
                    onChange={handleChange}
                    value={newCategory}
                    required
                    className={'modalIinput'}
                    placeholder="Введите подкатегорию"
                />
                <button className={'addButton'} onClick={handleSave}>
                    Добавить
                </button>
            </div>
        </div>
    );
};

export default Modal;
