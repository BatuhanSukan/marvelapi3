import React, { useEffect, useState } from 'react'
import axios from "axios"
import Card  from "./Card"
import Pagination from './Pagination';
//import ReactPaginate from 'react-paginate'



function Main() {

  const [url,setUrl] = useState("http://gateway.marvel.com/v1/public/characters?limit=100&offset=10&ts=1&apikey=438534a52772d5e7579e9fa22259ce68&hash=2ef164822253a3ffe9be3f29c8fa1b39")
  
  const [item,setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const fetch = async () => {
      //setLoading(true);
      const res = await axios.get(url)
      setItem(res.data.data.results);
      //setLoading(false);
      console.log(res.data.data.results)
    }
    fetch();
  },[url])

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = item.slice( indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);



  return (
    <>
      <div className="header">
        <div className="bg">
          <img src="./Images/bg.jpg" alt="" />
        </div>
        <div className="search-bar" >
          <img src="Images/logo.png" alt="logo" />
          <input type="search" placeholder='Search Hero' className='search' />
        </div>
      </div>
      <div className="content">
      
        
        {
          (!item) ? <p>Yükleniyor...</p> : <Card data={currentPosts} loading={loading}/>
        }
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={item.length}
        paginate={paginate}
      />
    </>
  )
}

export default Main



