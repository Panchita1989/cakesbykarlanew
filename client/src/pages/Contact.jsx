import '../styles/contact.css'
import FormWrapper from '../components/FormWrapper'
import formConfig from '../data/formData.js'

export default function Contact(){
    return(
        <FormWrapper handleSubmit={() => {}}
        />
    )
}














/*

export default function Contact() {
    return ( 
        <section className='contactForm'>
            <div className='wrapperForm'>
            <h2>Send me a Message as a Guest</h2>
            <div>or</div>
            <Link to='' className='login' >Log In first</Link>
            
            <form action="get">
                <input type="text" placeholder='Name' required/>
                <input type="email" placeholder='email' required/>
                <textarea name="message" id="message" rows='10' required></textarea>
                <button type='submit' >send</button>
            </form>
            </div>
            <div className='wrapperImage'>
                <img src={Brownie} alt="Brownie" />
            </div>
        </section>
        
    )    
        
}

*/

