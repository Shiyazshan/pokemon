import React from 'react'
import styled from 'styled-components'
import ArrowIcon from '../../assets/images/right-arrow.png'
import { Link } from 'react-router-dom'

function LandingPage() {
    return (
        <Container>
            <SubContainer>
                <Text className="linear-wipe">POKEMON'S WORLD</Text>
                <StartButton to="/list">
                    <Button>Let's get started</Button>
                    <Arrow>
                        <img src={ArrowIcon} alt="image" />
                    </Arrow>
                </StartButton>
            </SubContainer>
        </Container>
    )
}

export default LandingPage

const Container = styled.div`
    background: url('https://images3.alphacoders.com/733/733114.png');
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Text = styled.h2`
    font-family: 'press_start';
    font-size:45px;
    margin-bottom: 10px !important;
`
const SubContainer = styled.div`
  
`;
const Button = styled.div`
    text-align:right;
    color:#fff;
    margin-right:5px;
    font-size:20px;
`
const StartButton = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor:pointer;
`;
const Arrow = styled.div`
    width:20px;
img{
    display:block;
    width:100%;
}
`;
