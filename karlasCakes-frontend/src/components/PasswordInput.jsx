import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"


export default function PasswordInput({name, required, defaultValue, placeholder}){
    const [visible, setVisible] = useState(false)

    return(
        <div className='password-input-wrapper' style={{position: 'relative'}}>
            <input 
                type={visible ? 'text' : 'password'} 
                name={name}
                placeholder={placeholder}
                required={required}
                defaultValue={defaultValue}
                autoComplete='current-password'
                style={{paddingRight: '2.5rem'}}/>
            <button 
                type='button'
                onClick={()=>setVisible(prev => !prev)}
                style={{
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    passing:'0',
                    margin: '0 10px 0 0',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    userSelect: 'none'
                }}>
                    <FontAwesomeIcon icon={faEye} />
            </button>
        </div>
    )
}