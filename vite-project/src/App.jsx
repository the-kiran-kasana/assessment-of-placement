import React from 'react';
import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [currPage, setCurrPage] = useState(1);
//  const [limitedData , setLimitedData] = useState([])

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products`)
      .then(res => res.json())
      .then(data =>  setProducts(data))
      .catch(err => console.log(err));
  }, []);



  const start = (currPage - 1) * 5;
  const limitedData = products.slice(start, start + 5);


  function handleCount(ProductId){

  }

  function handlePrev() {
    if (currPage > 1) {
      setCurrPage(prev => prev - 1);
    }
  }

  function handleNext() {
    if (currPage < Math.ceil(products.length / 5)) {
      setCurrPage(prev => prev + 1);
    }
  }

  return (
    <div>

      {limitedData.map((book) => (
        <div key={book.id} onClick={() => handleCount(book.id)} style={{display: 'grid', gridTemplateColumns: "repeat(2, 2fr)", border: "1px solid white", padding: "20px",margin:"20px"}}>
          <img src={book.image} style={{margin:"5px", width:"200px"}} />
          <div style={{display:"flex", gap: "40px" , flexDirection:"column"}}>
              <h2>{book.title}</h2>
              <p>category : {book.category}</p>
              <p>price : ₹ {book.price}</p>
              <p>count : {book.rating.count}</p>
          </div>
        </div>
      ))}


       <button onClick={handlePrev} style={{padding:"10px", margin:"5px"}}>Prev</button>
       <span style={{padding:"10px", margin:"5px"}}>{currPage}</span>
       <button onClick={handleNext} style={{padding:"10px", margin:"5px"}}>Next</button>

    </div>
  );
}

export default App;
