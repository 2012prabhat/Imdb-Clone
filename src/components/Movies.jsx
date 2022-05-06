import React,{useEffect,useState} from 'react'
import Image from './image.png'
import "./loader.css"
import Pagination from './Pagination';
import axios from 'axios'

function Movies() {
  const [movie, setMovie] = useState([]);
  const [hover, setHover] = useState("");
  const [favourite, setFavourite] = useState([]);
  const [page, setPage] = useState(1);
  const addFav = (m)=>{
      let newArray = [...favourite,m];
      setFavourite(newArray);
      localStorage.setItem("imdb",JSON.stringify(newArray));
  }
  const delFav = (m)=>{
    let newArray = favourite.filter(f=>f.id!=m.id);
    setFavourite(newArray);
    localStorage.setItem("imdb",JSON.stringify(newArray));
}
const prevPage = ()=>{
  if(page>1){
    setPage(page-1);
  }
}
const nextPage = ()=>{
    setPage(page+1);
}
  useEffect(()=>{
      axios(`https://api.themoviedb.org/3/trending/movie/week?api_key=5540e483a20e0b20354dabc2d66a31c9&page=${page}`).then((res)=>{
        setMovie(res.data.results);
      })
      let data = JSON.parse(localStorage.getItem("imdb")) || [];
      setFavourite(data);
  },[page])

  return (
      <>
       <div className="text-2xl text-center m-4">Trending Movies</div>
      <div className='flex flex-wrap justify-center'>
            {
            movie.length==0?<div className='loader'></div>:
            movie.map(m=>
              <div className={`flex rounded-xl md:m-4 m-4 items-end bg-[url("https://image.tmdb.org/t/p/w500/${m.backdrop_path}")] md:h-[30vh] h-[20vh] w-[150px] bg-center bg-cover relative`} onMouseEnter={()=>setHover(m.id)} onMouseLeave={()=>setHover("")}>
                {hover == m.id && !favourite.find(f=>f.id==m.id) && <div className='text-2xl absolute top-1 right-1 cursor-pointer' onClick={()=>addFav(m)}>🤍</div>}

                {hover == m.id && favourite.find(f=>f.id==m.id) && <div className='text-2xl absolute top-1 right-1 cursor-pointer' onClick={()=>delFav(m)}>❤</div>}
                

              <div className='bg-blue-900 w-full rounded-xl p-1 text-sm text-center text-white'>{m.title}</div>
            </div>
            )}
          
           
      </div>
      <Pagination prevPage={prevPage} page={page} nextPage={nextPage}/>
      </>
   
  )
}

export default Movies