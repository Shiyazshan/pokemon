import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios'


function ListPage() {
    const [datas, setDatas] = useState([])
    const [poke, setPoke] = useState()
    const [url, seturl] = useState("")

    useEffect(() => {
        axios
            .get("https://pokeapi.co/api/v2/pokemon")
            .then((res) => {
                setDatas(res.data.results)
            }
            )
            .catch((error) => {
                console.log(error);
            });
    }, [])

    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                console.log(res.data, "single data");
                setPoke(res.data)
            }
            )
            .catch((error) => {
                console.log(error);
            });
    }, [url])

    return (
        <Container>
            <Wrapper>
                <TopBar>
                    <LeftSide>
                        <Text>Pokemon Generations</Text>
                    </LeftSide>
                    <Rightside>
                        <Title>Filter</Title>
                    </Rightside>
                </TopBar>
                <ListContainer>
                    {
                        datas.map((item) => (
                            <Cards onClick={() => seturl(item.url)}>
                                <div class="container">
                                    <div class="card">
                                        <h3 class="title">Name: {item.name}</h3>
                                        <div class="bar">
                                            <div class="emptybar"></div>
                                            <div class="filledbar"></div>
                                        </div>
                                        <div class="circle">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <circle class="stroke" cx="60" cy="60" r="50" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Cards>
                        ))
                    }

                </ListContainer>
            </Wrapper>
        </Container>
    )
}

export default ListPage

const Container = styled.div`
    overflow: hidden;
`;
const Wrapper = styled.div`
    width:90%;
    margin: 0 auto;
`;
const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 30px;
`;
const LeftSide = styled.div``;
const Text = styled.h2`
    color:#767272;
`;
const Title = styled.div``;
const ListContainer = styled.ul`
    display: flex;
    padding-left: 0;
    list-style: none;
    justify-content: space-between;
    align-items: center;
    position: relative;
    flex-wrap: wrap;
`;
const ImageContainer = styled.div``;
const Name = styled.div``;
const Rightside = styled.div`
    border: 1px solid #bebebe;
    padding: 6px 24px;
    border-radius: 6px;
    color: #918383;
`;
const Cards = styled.li`
    /* width: 20%;
    border: 1px solid #000;
    padding: 20px; */
    cursor: pointer;
    margin-bottom: 10px;
    :last-child{
        margin-right: 0;
    }
`;