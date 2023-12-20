import React, { useState, useEffect } from 'react';

function FavoriteButton({ carID, setFavFetchTrigger }){
    const [isFavorite, setIsFavorite] = useState(false)

    // fetch to see if car is in the favorites list
    useEffect(() => {
        fetch(`/favoritecars/${carID}`)
        .then(resp => {
            if (resp.status === 218) {
                setIsFavorite(false);
            } else if (resp.ok) {
                setIsFavorite(true);
            }
            })
            .catch((error) => {
                console.error('Error fetching favorite data.', error)
            })
        }, [])
    

    function addToFavorites(event) {
        const carIDClicked = event.target.parentNode.id

        fetch('/favoritecars', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user_id: 1,
                car_id: carIDClicked
            })
        })
        .then(resp => {
            if (resp.ok) {
                setIsFavorite(true)
                setFavFetchTrigger(true)
            }
        })
        .catch(error => {
            console.log(`${error}`)
        });
    }

    function removeFromFavorites(event){
        const favoriteIDClicked = event.target.parentNode.id

        fetch(`/favoritecars/${favoriteIDClicked}`, {
            method: "DELETE",
            })
            .then(resp => {
                if (resp.ok) {
                setIsFavorite(false);
                setFavFetchTrigger(false)
                }
            })
            .catch(error => {
                console.log(`${error}`);
            });
    }

    function onFavoriteButtonClick(event){
        if (!isFavorite) {
            addToFavorites(event)
        } else {
            removeFromFavorites(event)
        }
    }

    return (
        <button 
        className='favorite-button'
        onClick={onFavoriteButtonClick}
        >
            {isFavorite ? 'Remove from Favorites': 'Add to Favorites'}
        </button>
    )
}

export default FavoriteButton