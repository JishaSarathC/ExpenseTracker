import React from 'react'

export default function Pagination ({totalItems,itemsPerPage,currentPage,setCurrentPage}) {
    const totalPages=Math.ceil(totalItems/itemsPerPage);

  return (
    <div className="pagination">
         <button
         disabled={currentPage===1}
         onClick={()=>setCurrentPage(currentPage-1)}
         >
            Prev
         </button>
         <span style={{backgroundColor:"green"}}>{currentPage}</span>

         <button 
         disabled={currentPage===totalPages}
         onClick={()=>setCurrentPage(currentPage+1)}
         >
            Next
         </button>
    </div>
  );
}
