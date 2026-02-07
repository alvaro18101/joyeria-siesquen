import React, { useState } from "react";
import productList from '@/data/products.json'
// import '../styles/product-page-styles.css'
import CartButton from '@/components/icons/CartButton';

interface ProductPageProps {
    id: number;
}

const ProductPage: React.FC<ProductPageProps> = ({ id }) => {
    const [quantity, setQuantity] = useState(1); // Estado para la cantidad

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(event.target.value);

        if (value < 1) {
            value = 1; // Evita valores negativos o cero
            console.log(value)
        }

        setQuantity(value);
        // setQuantity(Number(event.target.value)); // Actualizar estado
    };
    
    // const product = productList[id-1]
    const product = productList.find(p => p.id === id)
    if (!product) return null;
    return (
        <div className="product-container mx-auto px-4 py-8 gap-4">
            <div className="product-container-1 flex gap-8 items-start mb-8">
                <div className="product-img w-1/2">
                    <img 
                        src={product.image} 
                        alt={product.image}
                        draggable="true"
                        className="w-full"
                    />
                </div>
                <div className="product-details w-1/2">
                    <p className="category text-[#333333] leading-tight">
                        {product.category}
                    </p>
                    <p className="name text-2xl font-bold mb-4 leading-tight">
                        {product.name}
                    </p>
                    <div className="prices-container mb-4">
                        { (product.offer_price != "") ? (
                            <div>
                                <p className=" text-[#C61618] font-semibold">Precio online: S/ <span className="text-2xl">{product.offer_price}</span></p>
                                <p className="text-[#333] line-through">Precio regular: S/ {product.price}</p>
                                {/* <p className="wholesale-price">Por la compra de {product.wholesale}, la unidad te sale a S/. {product.wholesale_price}</p> */}
                            </div>
                        ) : (
                            <div>
                                <p className="price mb-2">S/ <span className="text-2xl">{product.price}</span></p>
                                {/* <p className="wholesale-price">Por la compra de {product.wholesale}, la unidad te sale a S/. {product.wholesale_price}</p> */}
                            </div>
                        )}
                    </div>
                    <div className="description-container mb-4">
                        <p className="font-semibold text-lg">Descripción:</p>
                        <p>{product.description}</p>
                    </div>
                    <div className="shop flex flex-col gap-4">
                        <div className="units-container flex flex-col">
                            <label htmlFor="quantity" className="font-semibold text-lg">
                                Cantidad
                            </label>
                            <div className="units">
                                <input 
                                    type="number" 
                                    id="quantity" 
                                    value={quantity} 
                                    name="quantity" 
                                    className="quantity-input text-[#333333] p-4 border-b w-1/2" 
                                    onChange={handleQuantityChange}
                                    min={1}
                                    // onKeyDown={(e) => e.key === "Enter" && CartButtonFunction({ id: product.id, quantity:quantity })}
                                    // onKeyUp={(e) => e.key === "Enter" && CartButtonFunction({ id: product.id, quantity:quantity })}
                                />
                            </div>
                        </div>
                        {/* <input 
                            type="submit" 
                            value="Agregar al carrito" 
                            className="border cursor-pointer py-2 px-4"
                        /> */}
                        <div className="cart-button-container mt-2">
                            {/* <button className="px-4 py-2 bg-[#C61618DD] rounded-full text-[#FFFFFF] font-[500]">Agregar al carrito</button> */}
                            <CartButton 
                                id={product.id}
                                quantity={quantity}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="product-container-2">
                <div className="description">
                    <p className="font-semibold text-lg">Descripción:</p>
                    <p>{product.description}</p>
                </div>
            </div> */}
        </div>

    );
};
export default ProductPage;