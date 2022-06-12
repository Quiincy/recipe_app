import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'





function Cuisine() {
    const [cuisine, setCuisine] = useState([])
    let params = useParams();


    const getCuisine = async (name) => {
        const data = await fetch(`https://api.edamam.com/search?q=${name}&app_id=${process.env.REACT_APP_MY_DISH_BOOK_API_ID}&app_key=${process.env.REACT_APP_MY_DISH_BOOK_API_KEY}`);
        const recipes = await data.json();
        setCuisine(recipes.hits)
        console.log(recipes.hits)
    }

    useEffect(() => {
        getCuisine(params.type)
        console.log(params)
    }, [params.type]);

    return (
        <Grid>
            {cuisine.map((item) => {
                return (
                    <Link to={'/recipe/' + item.recipe.label}>
                        <Card key={item.recipe.label}>
                            <img src={item.recipe.image} alt="" />
                            <h4>{item.recipe.label}</h4>
                        </Card>
                    </Link>
                )
            })}
        </Grid>
    );

}


const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(20rem, 1fr));
    grid-gap: 3rem;
`;
const Card = styled.div`
    img{
        width: 100%;
        border-radius: 2rem;
    }
    a{
        text-decoration: none;
    }
    h4{
        text-align: center;
        padding: 1rem;
    }

`;


export default Cuisine