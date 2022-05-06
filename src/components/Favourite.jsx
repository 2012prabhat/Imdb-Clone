import React,{useEffect,useState} from 'react'
import "./loader.css"

function Favourite() {
  const [hover, setHover] = useState("");
  const [favourite, setFavourite] = useState([]);
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
useEffect(() => {
  let data = localStorage.getItem("imdb");
  // console
  data = JSON.parse(data) || [];
  console.log(data);

  setFavourite(data);
}, [])

  return (
      <>
       <div className="text-2xl text-center m-4">Favourite Movies</div>
      <div className='flex flex-wrap justify-center'>
            {
            favourite.length==0?<div className='md:text-5xl text-4xl text-red-600 mt-40 text-center'>No Favourite Movies</div>:
            favourite.map(m=>
              <div className={`flex rounded-xl md:m-4 m-4 items-end bg-[url("https://image.tmdb.org/t/p/w500/${m.backdrop_path}")] md:h-[30vh] h-[20vh] w-[150px] bg-center bg-cover relative`} onMouseEnter={()=>setHover(m.id)} onMouseLeave={()=>setHover("")}>
                {hover == m.id && !favourite.find(f=>f.id==m.id) && <div className='text-2xl absolute top-1 right-1 cursor-pointer' onClick={()=>addFav(m)}>🤍</div>}

                {hover == m.id && favourite.find(f=>f.id==m.id) && <div className='text-2xl absolute top-1 right-1 cursor-pointer' onClick={()=>delFav(m)}>❤</div>}
                

              <div className='bg-blue-900 w-full rounded-xl p-1 text-sm text-center text-white'>{m.title}</div>
            </div>
            )}
          
           
      </div>
      </>
   
  )
}

export default Favourite