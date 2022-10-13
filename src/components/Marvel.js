import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function Marvel() {

  const {id} = useParams();

  const [item,setItem] = useState();
  /*const [comicsitem,setComics] = useState();*/


  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`http://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=438534a52772d5e7579e9fa22259ce68&hash=2ef164822253a3ffe9be3f29c8fa1b39`); 
      setItem(res.data.data.results[0])
    }
    fetch();
  },[])

  /*useEffect(() => {
    const comics = async () => {
      const comicsdata = await axios.get(`https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=1&apikey=438534a52772d5e7579e9fa22259ce68&hash=2ef164822253a3ffe9be3f29c8fa1b39`); 
      setComics(comicsdata.data.data.results[0])
  
    }
    comics();
  },[])*/
  

  

  return (
    <>
      {
        (!item) ? <p>Veriler Yükleniyor</p> : (
          <div className="box-content">
          
            <div className="left-box"   >
              <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt="" />
            </div>
            <div className="right-box"  >
              <h1>{item.name}</h1>
              <p>{item.description}</p>
                <ul>
                  {
                    item.comics.items.map((s,index) => (<li key={index}>{s.name}</li>
                    ))
                  }
                </ul>
            </div>
          </div>
        ) 
      }
    </>
  )
}

export default Marvel;