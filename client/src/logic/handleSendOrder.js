export default async function handleSendOrder(formData, setError, navigate, cakes, startDate) {
  const data = Object.fromEntries(formData.entries())

  const cleanedCakes = cakes.map(cake => ({
    id: cake.cakeId || cake._id || cake.id,
    name: cake.name,
    quantity: cake.quantity,
    price: cake.price
  }))

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
      navigate('/profile')
    }
  } catch (error) {
    console.error('Fehler beim Senden:', error)
    setError([{ msg: 'Server error. Please try again.' }])
  }
}
