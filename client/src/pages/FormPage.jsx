import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FormWrapper from '../components/formWrapper'
import handleSendOrder from '../logic/handleSendOrder'

export default function FormPage() {
  const location = useLocation()
  const [formType, setFormType] = useState(null)
  const [prefillData, setPrefillData] = useState(null)

  useEffect(() => {
    const path = location.pathname

    if (path.includes('login')) setFormType('login')
    else if (path.includes('signup')) setFormType('signup')
    else if (path.includes('contact')) setFormType('contact')
    else if (path.includes('checkout')) setFormType('checkout')
  }, [location.pathname])

  useEffect(() => {
    async function fetchUserData() {
      if (formType === 'contact' || formType === 'checkout') {
        try {
          const res = await fetch('http://localhost:5000/user/me', {
            credentials: 'include',
          })
          if (!res.ok) {
            if (res.status === 401) {
              console.log('Continue without user Data')
              return
            }
            throw new Error('Something went wrong')
          }
          const data = await res.json()
          setPrefillData(data)
        } catch (err) {
          console.error(err)
        }
      }
    }
    fetchUserData()
  }, [formType])

  if (!formType) return null

  return (
    <FormWrapper
      formType={formType}
      prefillData={prefillData}
      // Hier kein onSendOrder übergeben, das macht FormWrapper selbst
    />
  )
}
