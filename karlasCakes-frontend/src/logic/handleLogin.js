export default async function handleLogin(formData, setError, navigate) {
  const API_URL = import.meta.env.VITE_API_URL
  try {
    const data = Object.fromEntries(formData.entries())
    const res = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const result = await res.json()

    if (!res.ok) {
      setError(result.errors || [{ msg: result.msg || 'Login failed.' }])
    } else {
      setError([])
      navigate('/profile')
    }
  } catch (err) {
    console.error(err)
    setError([{ msg: 'Server error. Please try again.' }])
  }
}