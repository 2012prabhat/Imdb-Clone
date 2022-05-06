import React,{useEffect,useState} from 'react'
import Pagination from './Pagination';

function Favourite2() {
 const genreids = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
        27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
      }
  const [favourite, setFavourite] = useState([]);
  const [selectedGenre,setSelectedGenre] = useState("All Genre");
  const [genre,setGenre] = useState([]);
  const [ratings,setRatings] = useState("");
  const [popularity,setPopularity] = useState("");
  const [search,setSearch] = useState("");
  const [rows,setRows] = useState(5);
  const [page,setPage] = useState(1);
  
  const delFav = (id)=>{
      let newArray = favourite.filter(f=>f.id!=id);
      setFavourite(newArray);
      localStorage.setItem("imdb",JSON.stringify(newArray));
  }
  useEffect(()=>{
    let data = JSON.parse(localStorage.getItem("imdb"));
    setFavourite(data);
},[])

useEffect(()=>{
    let genreArray = favourite.map(m=>genreids[(m.genre_ids[0])]);
    genreArray = new Set(genreArray);
    setGenre(["All Genre",...genreArray]);
},[favourite])

    // filter for Genres
  let filteredMovies=selectedGenre == "All Genre"? favourite : favourite.filter(f=>genreids[(f.genre_ids[0])]==selectedGenre);

  //sort for ratings
  filteredMovies.sort(function(objA,objB){
      if(ratings=="Ascending") return objA.vote_average - objB.vote_average;
      else if(ratings=="Descending") return objB.vote_average - objA.vote_average;
  })

  //sort for popularity
  filteredMovies.sort(function(objA,objB){
    if(popularity=="Ascending") return objA.vote_average - objB.vote_average;
    else if(popularity=="Descending") return objB.vote_average - objA.vote_average;
})

 // for searching 
 filteredMovies = filteredMovies.filter(f=>f.title.toLowerCase().includes(search.toLowerCase()));

 // for pagination 
 let maxPage = Math.ceil(filteredMovies.length / rows);
 let si = (page - 1) * rows
 let ei = Number(si) + Number(rows)
 filteredMovies = filteredMovies.slice(si, ei);

 const prevPage = ()=> {
    if(page>1) setPage(page-1);
  }
  const nextPage = ()=> {
      if(page<maxPage) setPage(page+1);
  }

  return (
      favourite.length==0?<div className='md:text-5xl text-4xl text-red-600 mt-52 text-center '>No Favourite Movies</div>:
   <>
   <div className='flex flex-wrap justify-center md:space-x-6'> 
       {genre.map(m=> <button className={
           selectedGenre == m ?'bg-blue-500 w-[70px] h-[30px] md:w-[100px] md:h-[50px] text-white md:text-xl text-sm rounded-xl  m-2':'w-[70px] h-[30px] md:w-[100px] md:h-[50px] bg-gray-500 hover:bg-blue-500 text-white text-sm md:text-xl rounded-xl m-2'} onClick={()=>{
            setSelectedGenre(m);
            setPage(1);
        }
           }>{m}</button>)}
      
   
   </div>
   <div className='flex justify-center m-4'>
        <input className='text-center rounded' type="text" placeholder='Search' onChange={(e)=>setSearch(e.target.value)}/>
        <input className='text-center rounded' type="number" placeholder='No of Movies' value={rows} onChange={(e)=>setRows(e.target.value)}/>
   </div>
<div className="m-4 rounded-xl relative overflow-x-auto shadow-md sm:rounded-lg">
<table className="w-full text-sm text-left text-gray-400">
<thead className="text-xs uppercase bg-gray-700 text-gray-400">
<tr>
<th scope="col" className="px-6 py-3">Movie
</th>
<th scope="col" className=" py-3 px-4">
<span className='text-xl cursor-pointer m-4' onClick={()=>{
setRatings("Descending");
setPopularity("");
}}>⬆</span>
Rating
<span className='text-xl cursor-pointer m-4' onClick={()=>{
setRatings("Ascending");
setPopularity("");

}}>⬇</span>

</th>
<th scope="col" className="px-6 py-3">
<span className='text-xl cursor-pointer m-4' onClick={()=>{setPopularity("Descending")
setRatings("");
}}>⬆</span>
Popularity
<span className='text-xl cursor-pointer m-4' onClick={()=>{
setPopularity("Ascending")
setRatings("");
}}>⬇</span>
</th>
<th scope="col" className="px-6 py-3">
Genre
</th>
<th scope="col" className="px-4 py-3">
Remove
</th>
<th scope="col" className="py-3">
</th>
</tr>
</thead>
<tbody>
{filteredMovies.map(m=>
    <tr className="bg-white border-b bg-gray-800 border-gray-700">
    <th scope="row" className="px-1 font-medium text-white whitespace-nowrap">
        <div className="flex">
          <div className={`h-[15vh] m-3 bg-full bg-cover w-[180px] bg-[url("https://image.tmdb.org/t/p/w500/${m.backdrop_path}")]`}></div>  
        <div className='my-12'>{m.title}</div>
        </div>
    </th>
    <td className="px-20 ">
        {m.vote_average}
    </td>
    <td className="px-20 ">
        {m.popularity}
    </td>
    <td className="px-6 ">
        {genreids[(m.genre_ids[0])]}
    </td>
    <td className="px-6 ">
    <button onClick={()=>delFav(m.id)} className=" font-medium text-red-500 hover:underline">delete</button>
    </td>
</tr>
    
    )}



</tbody>
</table>
</div>
{favourite.length>0 && <Pagination page={page} prevPage={prevPage} nextPage={nextPage}/>}

</>
  )
}

export default Favourite2