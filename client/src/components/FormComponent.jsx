import {Link} from 'react-router-dom'
import '../styles/contact.css'
import formData from '../data/formData'

export default function FormComponent({formType, prefillData}) {
    if(!formType) return <div>Loading Form....</div>
    const currentForm = formData[formType]                                                                                                        // to have access to the current form we use the method .find() which goes to our formData and checks which form has the same name as our formType from FormPage
    
    if(!currentForm){
        return <div>Form not found</div>
    }

    return(                                                                             
            <div className='wrapperForm'>
                <h2>{currentForm.title}</h2>
                <Link to={currentForm.linkTo} className='login' >{currentForm.option}</Link>
                <form>
                    {currentForm.fields.map((field)=>{
                    if(field.type === 'textarea') {
                     return (  
                        <textarea        
                            key={field.id}
                            name= {field.name}
                            type= {field.type}
                            rows = {field.rows}
                            required = {field.required}
                            />                        
                )} else if(field.type === 'submit'){
                    return(
                        <button
                            key={field.id}
                            name={field.name}
                            type={field.type}                            >
                            {field.content}
                        </button>                        
                )} else{
                    return(
                        <input
                            key={field.id}
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            required={field.required}
                            defaultValue={prefillData?.[field.name]||''}
                        />
                     ) }
                })} 
            
                </form>
            </div>                 
    )
}