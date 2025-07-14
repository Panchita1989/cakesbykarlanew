import handleDeleteAll from '../pages/ShoppingCar'

export default async function handleSendOrder(formData, setError, navigate, cakes, startDate, setCakes) {
  const data = Object.fromEntries(formData.entries());
  
  const cleanedCakes = cakes.map(cake => {
    const cakeId = cake._id;
    
    return cakeId ? {
      id: cakeId, // Verwende die ID, die verfügbar ist
      name: cake.name,
      quantity: cake.quantity,
      price: cake.price,
      } : null
  }).filter(cake => cake !== null);

  if (cleanedCakes.length === 0) {
    console.error('Keine gültigen Kuchen zum Updaten gefunden!');
    return;
  }

  const customer = {
    name: data.name,
    phone: data.phone,
    email: data.email || '',
  };

  const orderPayload = {
    cakes: cleanedCakes,
    pickUpDate: startDate ? startDate.toISOString() : null,
    customer,
  };

  try {
    
    const res = await fetch('http://localhost:5000/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(orderPayload),
    });

    const result = await res.json();

    if (res.ok) {
      setCakes([])
      setError([]);
      navigate('/');
    } else {
      setError(result.errors || [{ msg: result.msg || 'Order failed.' }]);
    }
  } catch (error) {
    console.error('Fehler beim Senden:', error);
    setError([{ msg: 'Server error. Please try again.' }]);
  }
}
