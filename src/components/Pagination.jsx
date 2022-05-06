import React from 'react'

function Pagination({prevPage,page,nextPage}) {
  return (
    <div className='m-4 flex justify-center'>
     <button className='p-1 border-2 border-blue-900 border-r-0 rounded-l-lg' onClick={prevPage}>Previous</button>
     <button className='p-1 border-2 border-blue-900 bg-gray-300'>{page}</button>
     <button className='p-1  border-2 border-blue-900 border-l-0 rounded-r-lg' onClick={nextPage}>Next</button>
    </div>
  )
}

export default Pagination