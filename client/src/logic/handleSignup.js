export default async function handleSignup(formData, setError, navigate) {
  try {
    const data = Object.fromEntries(formData.entries())
    const res = await fetch('http://localhost:5000/user/signup', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const result = await res.json()

    if (!res.ok) {
      setError(result.errors || [{ msg: result.msg || 'Signup failed.' }])
    } else {
      setError([])
      navigate('/profile')
    }
  } catch (err) {
    console.error(err)
    setError([{ msg: 'Server error. Please try again.' }])
  }
}