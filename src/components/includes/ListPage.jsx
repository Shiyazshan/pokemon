import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios'
import SingleCardModal from '../modal/SingleCardModal';
import { useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { logDOM } from '@testing-library/react';


function ListPage() {
    const [datas, setDatas] = useState([])
    const [poke, setPoke] = useState()
    const [url, seturl] = useState("")
    const [isShow, setShow] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(0);
    const [pagination, setPagination] = useState();
    const [offset, setOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0)
    const [perPage] = useState(12);
    const [searchedItems, setSearchedItems] = useState()

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    // useEffect(() => {
    //     axios
    //         .get("https://pokeapi.co/api/v2/pokemon")
    //         .then((res) => {
    //             setDatas(res.data.results)
    //             setPagination(res.data.count)
    //             console.log(res, "total count");
    //         }
    //         )
    //         .catch((error) => {
    //             console.log(error);
    //         });

    // }, [])
    const renderdatas = async () => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
        const datas = res.data.results;
        const slice = datas.slice(offset, offset + perPage)
        // datas.filter((item) => {
        //     console.log("in filter");
        //     if (searchedItems === "") {
        //         return item
        //     } else if (item.name) {
        //         return item
        //     }
        //     console.log(item, "item")
        // }).map((item) => (
        //     <Cards onClick={() => { seturl(item.url); setShow(true) }}>
        //         <div class="container">
        //             <div class="card">
        //                 <h3 class="title">{item.name}</h3>
        //                 <div class="bar">
        //                     <div class="emptybar"></div>
        //                     <div class="filledbar"></div>
        //                 </div>
        //             </div>
        //         </div>
        //     </Cards>
        // ))
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
    console.log(datas, "opopopo");
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
    console.log(poke, "poke data");
    return (
        <Container>
            <Wrapper>
                <TopBar>
                    <LeftSide>
                        <Text>Pokemon Generations</Text>
                    </LeftSide>
                    <Rightside>
                        <input
                            type="search"
                            placeholder="Please search here..."
                            onChange={(e) => setSearchedItems(e.target.value)}
                            value={searchedItems}
                        />
                        <Title>Filter</Title>
                    </Rightside>
                </TopBar>
                <ListContainer>
                    {
                        // renderdatas()
                        datas
                    }
                    <SingleCardModal data={poke} isShow={isShow} handleCardModal={handleCardModal} />
                </ListContainer>
                {/* {pagination && pagination.total_pages > 1 && datas.length > 0 && ( */}
                <PaginationContainer>
                    {/* <PaginationText>
						Showing {pagination.current_page} -{" "}
						{pagination.last_item} of {pagination.total_pages}{" "}
						entries
					</PaginationText> */}

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
                {/* )} */}
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