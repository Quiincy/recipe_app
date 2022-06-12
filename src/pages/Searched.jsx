import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import { Link } from 'react-router-dom'



function Searched() {

    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();

    const getSearched = async (name) => {
        const data = await fetch(`https://api.edamam.com/search?q=${name}&app_id=${process.env.REACT_APP_MY_DISH_BOOK_API_ID}&app_key=${process.env.REACT_APP_MY_DISH_BOOK_API_KEY}`);
        const recipes = await data.json();
        setSearchedRecipes(recipes.hits)
    }

    useEffect(() => {
        getSearched(params.search)

    }, [params.search]);

    return (
        <Grid>
            {searchedRecipes.map((item) => {
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
    )
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

export default Searched