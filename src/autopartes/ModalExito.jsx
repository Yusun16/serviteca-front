import React from 'react'
import { Link } from 'react-router-dom'

function ModalExito(props) {
    return (
        <div>
            <div id={props.idmodal} className={props.className}>
                <div className="modal__content modal__shadow modal__height">
                    <div className='modal__title'>
                        <h1 className='modal__subtitle'>{props.titlemodal}</h1>
                        <div className={props.lineado}></div>
                    </div>
                    <form action="" method='' className="form009 form010">
                        <p className='modal__parraf'>{props.parexito}</p>
                        <div className="modal__btn0010">
                            {/* <button className='btn0010' onClick={props.onClose}>
                                OK
                            </button> */}
                            <Link to={props.rutaDir} className={props.btnclassName} onClick={props.onClose}>
                                {props.buttonContent}
                            </Link>
                        </div>
                    </form>
                    <a href="#" className="modal__close" onClick={props.onClose}>&times;</a>
                </div>
            </div>
        </div>
    )
}

export default ModalExito