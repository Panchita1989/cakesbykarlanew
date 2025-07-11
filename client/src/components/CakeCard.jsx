import '../styles/ChooseYourCake.css'
import { useState } from "react";

export default function CakeCard(props) {
    const[quantity, setQuantity] = useState(1)

    const handleAdd = async (e) =>{
        e.preventDefault()
        const cakeData = {
            id: props.id,
            image: props.img.src,
            name: props.name,
            description: props.description,
            price: props.price,
            quantity: parseInt(quantity)
        }

        try {
            const res = await fetch('http://localhost:5000/cakes/add',{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(cakeData)
            })
            const result = await res.json()
            console.log('Adding was successfull:', result)
        } catch (err) {
            console.error(err)
        }
    }

    return(
       <>
        <article className= 'bg-white border rounded-lg shadow-lg overflow-hidden'>
            <img 
                src={props.img.src} 
                alt={props.img.alt}
                className='w-full h-48 object-cover'
            />
            <div className='p-4'>
                <h2 className="text-xl font-semibold text-gray-800">{props.name}</h2>
                <p className="mt-2 text-gray-600">{props.description}</p>
                <p className="mt-4 text-lg font-medium text-gray-900">{props.price}</p>
            </div>         
            <form className="p-4 border-t" onSubmit={handleAdd}>
                    <select  className='option'                
                        name="quantity"
                        value={quantity}
                        onChange = {(e) => setQuantity(e.target.value)}
                        required
                    >
                        <option value="1">1 </option>
                        <option value="2">2 </option>
                        <option value="3">3 </option>
                        <option value="4">4 </option>
                    </select>
                <button
                    type="submit">
                    Add to Cart
                </button>
            </form>
        </article>
    </>
    )

}