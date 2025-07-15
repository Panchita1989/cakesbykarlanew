import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getGuestId from '../utils/guestId';
import '../styles/ShoppingCar.css';

export default function ShoppingCart() {
  const [cakes, setCakes] = useState([]); // Behalte den cakes Zustand
 const API_URL = import.meta.env.VITE_API_URL

  // Fetch für den Warenkorb (cakes) basierend auf guestId
  useEffect(() => {
    const guestId = getGuestId();
    const url = guestId
      ? `${API_URL}/cakes?guestId=${guestId}&orderSent=false`
      : `${API_URL}/cakes?orderSent=false`;

    fetch(url, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        const dataWithQuantity = data.map((cake) => ({
          ...cake,
          quantity: cake.quantity || 1,
        }));
        setCakes(dataWithQuantity); // Cakes laden
      })
      .catch((err) => console.error(err));
  }, []);

  // Menge der Kuchen erhöhen
  function increaseQuantity(id) {
    setCakes((prevCake) =>
      prevCake.map((cake) => {
        if (cake._id === id && cake.quantity < 10) {
          return {
            ...cake,
            quantity: cake.quantity + 1,
          };
        }
        return cake;
      })
    );
  }

  // Menge der Kuchen verringern
  function decreaseQuantity(id) {
    setCakes((prevCake) =>
      prevCake.map((cake) => {
        if (cake._id === id && cake.quantity > 1) {
          return {
            ...cake,
            quantity: cake.quantity - 1,
          };
        }
        return cake;
      })
    );
  }

  // Gesamtpreis berechnen
  function getTotalPrice(cake) {
    return cake.price * cake.quantity;
  }

  const totalPriceOrder = cakes.reduce((acc, c) => acc + getTotalPrice(c), 0);

  // Löschen eines einzelnen Kuchens
  async function handleDelete(cakeId) {
    try {
      const guestId = localStorage.getItem('guestId');
      const url = guestId
        ? `${API_URL}/cakes/delete/${cakeId}?guestId=${guestId}`
        : `${API_URL}/cakes/delete/${cakeId}`;

      const res = await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Deleting not possible');
      }

      setCakes((prevCake) => prevCake.filter((cake) => cake._id !== cakeId));
    } catch (error) {
      console.error(error);
    }
  }

  // Löschen aller Kuchen im Warenkorb

async function handleDeleteAll() {
  try {
    const guestId = localStorage.getItem('guestId');
    const url = guestId
      ? `${API_URL}/cakes/delete?guestId=${guestId}`
      : `${API_URL}/cakes/delete`;
    const res = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    });
    setCakes([])
  } catch (error) {
    console.error(error);
  }
}

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-xl font-bold mb-6">Your Cart 🛒</h1>
        <Link to="/choose">
          <button className="keepShopping">
            Keep Shopping
          </button>
        </Link>
        <div className="flex flex-wrap justify-center gap-6">
          {cakes.map((cake) => (
            <article key={cake._id} className="bg-white border rounded-lg shadow-lg overflow-hidden w-60">
              <img src={cake.image} alt={cake.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{cake.name}</h2>
                <p className="mt-2 text-gray-600">{cake.description}</p>
                <p className="mt-4 text-lg font-medium text-gray-900">Price: {cake.price} MXN</p>
                <span onClick={() => decreaseQuantity(cake._id)} className="bg-gray-300 px-2 rounded">
                  {' '}
                  -{' '}
                </span>
                <span>{cake.quantity}</span>
                <span onClick={() => increaseQuantity(cake._id)} className="bg-gray-300 px-2 rounded">
                  {' '}
                  +{' '}
                </span>
                <p className="mt-2 font-semibold">Total Price: {getTotalPrice(cake)} MXN</p>
                <button className="delete" onClick={() => handleDelete(cake._id)}>
                  🗑️ Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="totalOrder">
        <span>Your total order is: ${totalPriceOrder} MXN</span>
        <span>Click Checkout to finish your order</span>
      </div>
      <Link to="/checkout">
        <button>✅ Checkout </button>
      </Link>
      <button onClick={handleDeleteAll}>🗑️ Delete all</button>
    </>
  );
}
