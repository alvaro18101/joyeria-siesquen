import React, { useState } from "react";
import type { ProductProps } from "@/utils/Props";
import productList from '@/data/products.json'

interface CartButtonFunctionProps {
    id: number,
    quantity: number
}

interface CartProductProps {
    id: number,
    name: string,
    price: string,
    quantity: number
}


const CartButton = ({ id, quantity }: CartButtonFunctionProps) => {
    const product = productList.find(p => p.id == id) // Esto es para la redirección al WhatsApp, quitar cuando se habilite el carrito
    const [buttonText, setButtonText] = useState("Ir al WhatsApp");

    const AddToCart = () => {
        const productCart = JSON.parse(localStorage.getItem("productCart") || "[]");
        const isInCart = productCart.some((product:CartProductProps) => product.id == id);

        if (isInCart) {
            console.log(`Añadiendo una unidad adicional del id: ${id}`)
            const product = productCart.find((product:CartProductProps) => product.id == id);
            product.quantity += quantity;
        }
        else {
            console.log(`Añadiendo producto nuevo con id: ${id}`)
            const product = productList.find((product:ProductProps) => product.id == id)
            if (product) {  // Verifica si el producto está en la lista de productos (evitar bugs)
                productCart.push({
                    "id": product.id,
                    "name": product.name,
                    "price": product.offer_price? product.offer_price : product.price,
                    "quantity": quantity
                })
            }
        }
        localStorage.setItem("productCart", JSON.stringify(productCart));
        window.dispatchEvent(new Event("storage"));

        setButtonText("Redirigiendo");
        setTimeout(() => setButtonText("Ir al WhatsApp"), 1000); // Cambia el texto de nuevo después de 2 segundos
    };

    return(
        <a
        href={`https://api.whatsapp.com/send?phone=51980652429&text=Hola%2C%20me%20interesa:%20${product.name}`}
        target="_blank"
        >
        <button 
            className="px-4 py-2 bg-gold-1 mt-2 rounded-lg text-[#FFFFFF] font-[500] cursor-pointer"
            onClick={(event) => {
                // event.preventDefault(); // descomentar cuando se habilite el carrito
                // event.stopPropagation(); // descomentar cuando se habilite el carrito
                AddToCart();
            }}
        >
            {buttonText}
        </button>
        </a>
    );
};

export default CartButton;