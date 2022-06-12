import React from "react";
import { useEffect, useState } from "react"
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom'


function Veggie() {
    const [veggie, setVeggie] = useState([]);

    useEffect(() => {
        getVeggie();
    }, []);


    const getVeggie = async () => {

        const api = await fetch(`https://api.edamam.com/search?q=vegan&app_id=${process.env.REACT_APP_MY_DISH_BOOK_API_ID}&app_key=${process.env.REACT_APP_MY_DISH_BOOK_API_KEY}`);
        const data = await api.json();

        // localStorage.setItem('popular', JSON.stringify(data.hits));
        setVeggie(data.hits);
        console.log(data.hits);



    }

    return (
        <Wrapper>
            <h3>Our Vegetarian Picks</h3>
            <Splide options={{
                perPage: 3,
                arrows: false,
                pagination: false,
                drag: 'free',
                gap: '5rem',

            }}>
                {veggie.map((recipe) => {
                    return (
                        <SplideSlide key={recipe.recipe.label}>
                            <Card >
                                <Link to={'/recipe/' + recipe.recipe.label}>
                                    <p>{recipe.recipe.label}</p>
                                    <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                                    <Gradient />
                                </Link>
                            </Card>
                        </SplideSlide>
                    );
                })}
            </Splide>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 4rem 0 rem;
`;

const Card = styled.div`
    min-height: 15rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;
    

    img{
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    p{
        position: absolute;
        z-index: 10;
        left: 50%;
        transform: translate(-50%, 0%);
        bottom: 0%;
        font-size: 1rem;
        color: white;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        text-align: center;
        height: 40%;
    }
`;
const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;

export default Veggie