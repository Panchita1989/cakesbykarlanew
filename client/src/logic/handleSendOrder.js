import GetGuestId from '../utils/guestId'

export default async function handleSendOrder(formData, setError, navigate, cakes, startDate) {
  const data = Object.fromEntries(formData.entries())
  console.log(data)

  
  const user = localStorage.getItem('user')
  const guestId = GetGuestId()


  if (!user && !guestId) {
    // Benutzer ist nicht eingeloggt und es gibt keine guestId
    alert("Please log in or continue as a guest");
    return;
  }


  const cleanedCakes = cakes.map(cake => ({
    id: cake.cakeId || cake._id || cake.id,
    name: cake.name,
    quantity: cake.quantity,
    price: cake.price
  }))
  console.log(cleanedCakes)


  const customer = {
    name: data.name,
    phone: data.phone,
    email: data.email || '',
  }

  const orderPayload = {
    cakes: cleanedCakes,
    pickUpDate: startDate ? startDate.toISOString() : null,
    customer,
  }
  console.log(orderPayload)

  console.log("ORDER PAYLOAD:", orderPayload)

  try {
    const res = await fetch('http://localhost:5000/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(orderPayload),
    })

    const result = await res.json()

    if (!res.ok) {
      setError(result.errors || [{ msg: result.msg || 'Order failed.' }])
    } else {
      console.log('Order erfolgreich:', result)
      setError([])
      navigate('/')
    }
  } catch (error) {
    console.error('Fehler beim Senden:', error)
    setError([{ msg: 'Server error. Please try again.' }])
  }
}
