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
    const [buttonText, setButtonText] = useState("Agregar al carro");

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

        setButtonText("¡Agregado!");
        setTimeout(() => setButtonText("Agregar al carrito"), 1000); // Cambia el texto de nuevo después de 2 segundos
    };

    return(
        <button 
            className="px-4 py-2 bg-[#C61618DD] mt-2 rounded-sm text-[#FFFFFF] font-[500]"
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                AddToCart();
            }}
        >
            {buttonText}
        </button>
    );
};

export default CartButton;