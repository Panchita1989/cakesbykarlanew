import { useState, useEffect } from "react";
import '../styles/ChooseYourCake.css';

export default function SlideMessage({ message, visible }) {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    setShow(visible);
    if (visible) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [visible]); 

  if (!show) return null;

  return (
    <div className='slide-message'>{message}</div>
  );
}
