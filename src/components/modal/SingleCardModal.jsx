import React, { useEffect } from "react";
//package
import { Link } from "react-router-dom";
import styled from "styled-components";
import curve from '../../assets/images/curve.png'

function SingleCardModal({ handleCardModal, isShow, data }) {
    return (
        <MainContainer>
            {isShow ? (
                <Overlay onClick={() => handleCardModal()}></Overlay>
            ) : ("")}
            <BackContainer style={{ transform: isShow && "scale(1,1)" }}>
                <Modal type="textarea">
                    <Container>
                        <TopBar>
                            <ImageContainer>
                                <img src={data?.sprites.back_shiny} alt="" />
                            </ImageContainer>
                        </TopBar>
                        <BottomContainer>
                            <TextNAme>{data?.species.name}</TextNAme>
                            <Ability>
                                {
                                    data?.stats.map((item) => (
                                        <AttaCk>
                                            <h4>{item.stat.name}</h4>
                                            <span>{item.base_stat}</span>
                                        </AttaCk>
                                    ))
                                }
                                {/* <Defence>
                                    <h4>Weight</h4>
                                    <span>{data?.weight}</span>
                                </Defence> */}
                            </Ability>
                        </BottomContainer>
                    </Container>
                </Modal>
            </BackContainer>
        </MainContainer>
    );
}
export default SingleCardModal;

const BackContainer = styled.div`
    position: fixed;
    transition: 0.3s;
    transform: scale(0, 0);
    width: 100%;
    max-width: 650px;
    margin: 0 auto;
    right: 0;
    height: 100vh;
    z-index: 1000;
    left: 0;
    top: 0px;
`;
const Overlay = styled.div`
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0px;
    width: 100%;
    min-height: 100vh;
    max-height: 100vh;
    filter: blur(1px);
`;
const Modal = styled.div`
    width: 90%;
    max-width: 490px;
    margin: 0 auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    transition: 0.5s;
    z-index: 101;
    border-radius: 5px;
    background: #fff;
    @media all and (max-width: 1280px){
        width:520px;
    }
    @media all and (max-width:1080px){
        width:500px;
    }
    @media all and (max-width: 980px) {
        width: 650px;
    }
    @media all and (max-width: 768px) {
        width: 480px;
    }
    @media all and (max-width: 640px) {
        width: 400px;
    }
    @media all and (max-width: 480px) {
        width: 340px;
    }
    @media all and (max-width: 360px) {
        width: 300px;
    }
`;
const MainContainer = styled.div``;
const Container = styled.div`
    padding: 40px;
    background:url(${curve});
    /* height: 250px; */
    background-size: 911px;
    background-position: bottom 167px right -129px;
    background-repeat: no-repeat;
    @media all and (max-width: 640px){
        padding:30px;
    }
    @media all and (max-width: 480px){
        padding:15px;
    }
`;
const TopBar = styled.div`
    display: flex;
    justify-content: center;
`;
const BottomContainer = styled.div``;
const TextNAme = styled.div`
    text-align: center;
    font-size: 20px;
    text-transform: capitalize;
    font-family: 'outfit_medium';
`;
const Ability = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;
const AttaCk = styled.div`
    width: 33%;
    text-align: center;
    h4{
        text-transform: capitalize;
    }
`;
const Defence = styled.div``;
const Speed = styled.div``;
const ImageContainer = styled.div`
    width: 40%;
    border-radius:50%;
    img{
        display: block;
        width: 100%;
    }
`;