import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const Recipe = () => {
    const params = useParams()
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState('digest');


    const fetchDetails = async () => {
        const data = await fetch(`https://api.edamam.com/search?q=${params.name}&app_id=${process.env.REACT_APP_MY_DISH_BOOK_API_ID}&app_key=${process.env.REACT_APP_MY_DISH_BOOK_API_KEY}&from=0&to=1`)
        const detailData = await data.json()
        setDetails(detailData.hits[0].recipe)

    }

    useEffect(() => {
        fetchDetails();
    }, [params.name]);


    return (
        <DetailedWrapper>
            <div>
                <h2>{details.label}</h2>
                <img src={details.image} alt={details.label} />
            </div>
            <Info>
                <Button className={activeTab === 'digest' ? 'active' : ''} onClick={() => setActiveTab('digest')}>Digest</Button>
                <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
                {activeTab === 'digest' && details.digest && (
                    <ol>
                        {details.digest.map((item) => (
                            <li li key={item.label} > {item.label} = {Math.round(item.total)}</li>
                        ))}
                    </ol>
                )}
                {activeTab === 'ingredients' && details.ingredients && (
                    <ol>
                        {details.ingredients.map((ingredient) => (
                            <li key={ingredient.text}>{ingredient.text}</li>
                        ))}
                    </ol>
                )}

            </Info>

        </DetailedWrapper >
    )
}

const DetailedWrapper = styled.div`
    margin-top: 10 rem;
    margin-bottom: 5rem;
    display: flex;
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2{
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.5 rem;
        line-hight: 2.5rem;
    }
    ol{
        margin-top: 2rem;
    }

`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem; 
    font-weight: 600;
    cursor: pointer;
`;

const Info = styled.div`
    margin-left: 10rem;
`;

export default Recipe