import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function AddToCartButton ({ carID, updateCart }) {
    const [inCart, setInCart] = useState(false)
    const [ currentUser ] = useOutletContext()
    console.log(currentUser)

    // fetch to see if car is in the cart list 
    useEffect(() => {
        fetch(`/shoppingcarts/${carID}`)
        .then(resp => {
            if (resp.status === 218) {
                setInCart(false);
            } else if (resp.ok) {
                setInCart(true);
            }
            })
            .catch((error) => {
                console.error('Error fetching favorite data.', error)
            })
        }, [])
    

    function addToCart(event) {
        const carIDClicked = event.target.parentNode.id

        fetch(`/shoppingcarts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                // set to currentUser.id when working
                user_id: 1,
                car_id: carIDClicked
            })
        })
        .then(resp => {
            if (resp.ok) {
                setInCart(true);
                if (updateCart) {
                    updateCart()
                }
            }
        })
        .catch(error => {
            console.log(`${error}`)
        });
    }

    function removeFromCart(event){
        const cartIDClicked = event.target.parentNode.id

        fetch(`/shoppingcarts/${cartIDClicked}`, {
            method: "DELETE",
            })
            .then(resp => {
                if (resp.ok) {
                setInCart(false);
                if (updateCart) {
                    updateCart()
                }
                }
            })
            .catch(error => {
                console.log(`${error}`);
            });
    }

    function onAddCartButtonClick(carID){
        if (!inCart) {
            addToCart(carID)
        } else {
            removeFromCart(carID)
        }
    }

    return (
        <button 
        className='shopping-button'
        onClick={onAddCartButtonClick}
        >
            {inCart ? 'Remove from Cart': 'Add to Cart'}
        </button>
    )
}

export default AddToCartButton