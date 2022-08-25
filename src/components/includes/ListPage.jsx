import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios'
import SingleCardModal from '../modal/SingleCardModal';
import ReactPaginate from 'react-paginate';


function ListPage() {
    const [datas, setDatas] = useState([])
    const [poke, setPoke] = useState()
    const [url, seturl] = useState("")
    const [isShow, setShow] = useState(false)
    const [offset, setOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0)
    const [perPage] = useState(24);
    const [searchedItems, setSearchedItems] = useState()

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    const renderdatas = async () => {
        if (searchedItems) {

            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?${searchedItems}`)
            const datas = res.data.results;
            const slice = datas.slice(offset, offset + perPage)
            const postData = slice.map(item =>
                <Cards onClick={() => { seturl(item.url); setShow(true) }}>

                    <div class="container">
                        <div class="card">
                            <h3 class="title">{item.name}</h3>
                            <div class="bar">
                                <div class="emptybar"></div>
                                <div class="filledbar"></div>
                            </div>
                        </div>
                    </div>
                </Cards>
            )
            setDatas(postData)
            setPageCount(Math.ceil(datas.length / perPage))
        } else {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
            const datas = res.data.results;
            const slice = datas.slice(offset, offset + perPage)
            const postData = slice.map(item =>
                <Cards onClick={() => { seturl(item.url); setShow(true) }}>

                    <div class="container">
                        <div class="card">
                            <h3 class="title">{item.name}</h3>
                            <div class="bar">
                                <div class="emptybar"></div>
                                <div class="filledbar"></div>
                            </div>
                        </div>
                    </div>
                </Cards>
            )
            setDatas(postData)
            setPageCount(Math.ceil(datas.length / perPage))
        }

    }
    useEffect(() => {
        renderdatas()
    }, [offset, searchedItems])

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
    const handleCardModal = () => {
        setShow(!isShow)
    }
    return (
        <Container>
            <Wrapper>
                <TopBar>
                    <LeftSide>
                        <Text>Pokemon Generations</Text>
                    </LeftSide>
                </TopBar>
                <ListContainer>
                    {
                        datas
                    }
                    <SingleCardModal data={poke} isShow={isShow} handleCardModal={handleCardModal} />
                </ListContainer>
                <PaginationContainer>
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                    />
                </PaginationContainer>
            </Wrapper>
        </Container>
    )
}

export default ListPage

const Container = styled.div`
    overflow: hidden;
    /* height: 100vh; */
    ::-webkit-scrollbar{
        display: none;
    }
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
    cursor: pointer;
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
const PaginationContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 40px 0 15px;
	@media all and (max-width: 890px) {
		flex-direction: column;
	}
`;