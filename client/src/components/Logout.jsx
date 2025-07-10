import { useNavigate } from "react-router-dom";

export default function Logout(){
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const res = await fetch('http://localhost:5000/user/logout',{
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