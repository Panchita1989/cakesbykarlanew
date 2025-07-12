export default async function handleSendMessage(formData, setError, navigate) {
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    const result = await res.json();

    if (!res.ok) {
      setError([{ msg: result.msg || 'Failed to send message.' }]);
    } else {
      setError([]);
      navigate('/thankyou');  // Oder wohin du nach Absenden willst
    }
  } catch (error) {
    console.error('Error sending message:', error);
    setError([{ msg: 'Server error. Please try again.' }]);
  }
}
