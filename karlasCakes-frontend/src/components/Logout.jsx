import { useNavigate } from "react-router-dom";

export default function Logout(){
    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL

    const handleLogout = async () => {
        try {
            const res = await fetch(`${API_URL}/user/logout`,{
                method:'DELETE',
                credentials: 'include'
            })

            if(res.ok){
                navigate('/')
            }else{
                console.log('Logout failed')
            }
        } catch (err) {
            console.error(err)
        }
    }
    return(
        <button onClick={handleLogout}>Logout</button>
    )
}