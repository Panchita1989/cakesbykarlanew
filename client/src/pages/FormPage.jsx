import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FormWrapper from '../components/formWrapper'

export default function FormPage(){                                         //Building FormPage component to combine the logic from FormWrapper and FormComponent 
    const location = useLocation()                                         // FormPage will be renderd in App.jsx
    const[formType, setFormType] = useState(null)                          //using useState to store the current form type as a string (e.g. 'login', 'signup') — needed to render the correct form in App.jsx
    const[prefillData, setPrefillData] = useState(null)                    // useState prefillData to store user data if available, so we can prefill the form inputs


useEffect(()=>{                                                           //setting a useEffect for our path, this runs everytime my pathname changes
    const path = location.pathname                                       // we need a useEffect here to set our Formtype new everytime we change the pathname(changing from one site to the other)

    // Set form type from pathname
    if(path.includes('login'))setFormType('login')
    else if(path.includes('signup'))setFormType('signup')
    else if(path.includes('contact'))setFormType('contact')
    else if(path.includes('checkout'))setFormType('checkout')
},[location.pathname])

 // Load prefill data for logged-in user (only for checkout and contact)
 useEffect(()=>{                                                            // useEffect for seting aur prefillUserData => useEffect is needed so the app will check everytime we change formtype if we have to prefill our form inputs
    async function fetchUserData() {                                        // async function because of fetching data from the Backend
        if(formType === 'contact' || formType === 'checkout'){              // checking if our formtype is contact or checkout the other forms do not need prefill
            try {
                const res = await fetch('http://localhost:5000/user/me',{   // fetching user data from the Backend
                    credentials: 'include'                                  // Include cookies and credentials for authentication (needed when using ensureAuth middleware)
                })                                                          // this is a 'GET' request so no body or header required
                if(!res.ok){                                                // catching the error 401 if there is no logged in user
                    if(res.status === 401){
                        console.log('Continue without user Data')           //letting guest continue with no prefilled form
                        return;                                              //we say return without return value to stop the function here
                    }
                    throw new Error('Something went wrong');                //if till here there is an other error then 401 throwing new error                          
                }                           
                const data = await res.json()                               // saving the response from the server in the variable data --> the response is the userData
                setPrefillData(data)                                   //setting the prefillData with the object from the user data                               
            } catch (err) {
                console.error(err)
            }
        }
    }
    fetchUserData()                                                         // in the end of our useEffect calling the function fetchUserData
 },[formType])                                                              // setting dependency array to formtype, to run the useEffect every time the formtype changes

 if(!formType) return null
 return(                                                                     // FormPage will return data to the App.jsx
    <>
        <FormWrapper formType={formType} prefillData={prefillData} />
    </>                                                                     // we return our FormComponent and FormWrapper with the data we defined in the FormPage
)
}

/*
Total Logic:
 - user is on the Landing page and klicks on the contact button
 - app recocnice the route <Route path ='/contact' element={<FormPage />} /> which goes to the FormPage component
 - in the FormPage component our FormPage function starts to run 
                const location = useLocation()      ==> Cakesbykarla/contact                 
                const[formType, setFormType] = useState(null)  ===> contact'      
                const[prefillData, setPrefillData] = useState(null)===> still null but after useEffect we know if our user is logged in or not
                                                                        and if yes we will have access to the data and prefill the contact form
                useEffect(()=> pathname === contact) for formWrapper logic runs
                useEffect(() => prefillData ==== contact with logged in user) for FormComponent logic runs

*/  