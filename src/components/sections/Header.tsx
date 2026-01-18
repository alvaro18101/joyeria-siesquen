import { useState, useEffect } from "react";

import { BasketButton } from "../icons/BasketIcon";
import Logo from "../../assets/logo-removebg.png";
// import categories from '../data/categories.json';
// import '../styles/header-styles.css'


// interface Categories {
//     [key: string]: {name: string};
// }

// const categoriesData = categories[0];

interface CategoryElement {
    name: string
}

export const Header = () => {
    // Variables declaradas para la barra de búsqueda
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        if (searchTerm.trim() !== "") {
            window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
        }
    };

    // Variables declaradas para el despligue del menú Categorías
    const [showCategories, setShowCategories] = useState(false);

    // Variables declaradas para actualizar el carrito
    const [basketCount, setBasketCount] = useState(0);
    const updateBasketCount = () => {
            const basket = JSON.parse(localStorage.getItem("productCart") || "[]");
            // const totalItems = basket.reduce((acc, product) => acc + product.quantity, 0);
            // setBasketCount((prevCount) => (prevCount !== totalItems ? totalItems : prevCount));
            setBasketCount(basket.length);
        }
        useEffect(() => {
            updateBasketCount();
            window.addEventListener("storage", updateBasketCount);
            return () => {
                window.removeEventListener("storage", updateBasketCount);
            };
        }, []);

    return (
        <header className="border-b border-b-[#1111]">
            <div className="header-container flex justify-between mx-auto w-[80%] items-center gap-2 text-[#111] ">
                <a href="/" title="AstroJS">
                    <img 
                        src={Logo.src} 
                        alt="Joyería Siesquén"
                        draggable='false' 
                        className="logo-img w-20" 
                    />
                </a>

                <div className="links-container flex items-center justify-center gap-12">
                    <a href="/nosotros/encuentranos" className="link-find-us"></a>
                    <a href="/nosotros/encuentranos" className="link-find-us">Catálogo</a>
                    <a href="/nosotros/encuentranos" className="link-find-us">Colecciones</a>
                    <a href="/nosotros/encuentranos" className="link-find-us">Contacto</a>
                    <div className="input-container w-2/5 text-[#000000] rounded-full">
                        <input 
                            type="text" 
                            placeholder="Buscar productos"
                            className="search w-full px-6 py-2 text-dark-gray rounded-full outline-none bg-[#EFEFEF]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                        />
                    </div>
                </div>
                <a href="/cart" title="Your cart">
                    <BasketButton 
                        basketCount={basketCount}
                    />
                </a>
            </div>
        </header>
    );
};
