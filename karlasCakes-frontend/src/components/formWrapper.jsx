import '../styles/formWrapper.css'
//import '../styles/Contact.css'
import OrderSummary from './OrderSummary'
import formConfig from "../data/formData.js";
import {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import FormComponent from './FormComponent'
import handleSendOrder from '../logic/handleSendOrder'
import GetGuestId from '../utils/guestId';

export default function FormWrapper({formType, prefillData, setCakes, cakes}) {

  const location = useLocation();
  const [startDate, setStartDate] = useState(new Date());
  const [activeForm, setActiveForm] = useState(formType);
  const [imagePosition, setImagePosition] = useState('right');
  const [direction, setDirection] = useState('none');
  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    if (formType === 'checkout') {
        const guestId = GetGuestId(); // Hole die guestId

        fetch(`${API_URL}/cakes?guestId=${guestId}`, {
            credentials: 'include'
        })
        .then(res => res.json()) // Direkt die JSON-Antwort extrahieren
        .then(data => {
            setCakes(data.length > 0 ? data : []); // Wenn keine Daten, setze auf leeren Warenkorb
        })
        .catch(err => {
            console.error(err); // Fehler ausgeben
        });
    }
  }, [formType]);

  const handleOrder = (formData, setError, navigate) => {
        handleSendOrder(formData, setError, navigate, cakes, startDate, setCakes);  // Übergabe der setCakes-Funktion
    };

    useEffect(() => {
        const path = location.pathname
        const newForm = path.includes('login') 
        ? 'login'
        : path.includes('contact')
        ? 'contact'
        : path.includes('signup')
        ? 'signup'
        : 'checkout'

        //when my form url changes     
        if(activeForm !== newForm){
            setDirection(prev => (prev === 'right' ? 'left' : 'right'))
            setImagePosition(prev => (prev === 'right' ? 'left' : 'right'))
            setActiveForm(newForm)          
        }
    }, [location.pathname]);

    const image = formConfig[activeForm]?.image ?? null;

    if (!formConfig[activeForm]) {
        return <div>Form not found</div>;
    }

    return (
        <div className="formWrapper">
            {image ? (
                imagePosition === 'right' ? (
                    <>
                        <div className={`formSection ${direction}`}>
                            {activeForm === 'checkout' && 
                                <OrderSummary 
                                    cakes={cakes}
                                    startDate={startDate}
                                    setStartDate={setStartDate} />
                            }
                            <FormComponent 
                                formType={activeForm}
                                prefillData={prefillData}
                                startDate={startDate}
                                setCakes={setCakes}
                                onSendOrder={activeForm === 'checkout' ? (formData, setError, navigate) => handleOrder(formData, setError, navigate) : undefined}
                            />
                        </div>
                        <div className={`imageSection ${direction}`}>
                            <img src={image.src} alt={image.alt} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`imageSection ${direction}`}>
                            <img src={image.src} alt={image.alt} />
                        </div>
                        <div className={`formSection ${direction}`}>
                            <FormComponent 
                                formType={activeForm} 
                                prefillData={prefillData}
                                startDate={startDate}
                                setCakes={setCakes}
                                onSendOrder={activeForm === 'checkout' ? (formData, setError, navigate) => handleOrder(formData, setError, navigate) : undefined}
                            />
                        </div>
                    </>
                )
            ) : (
                <div className="formSection full">
                    {activeForm === 'checkout' && 
                        <OrderSummary 
                            cakes={cakes}
                            startDate={startDate}
                            setStartDate={setStartDate} />
                    }
                    <FormComponent
                        formType={activeForm}
                        prefillData={prefillData}
                        startDate={startDate}
                        setCakes={setCakes}
                        onSendOrder={activeForm === 'checkout' ? (formData, setError, navigate) => handleOrder(formData, setError, navigate) : undefined}
                    />
                </div>
            )}
        </div>
    );
}
