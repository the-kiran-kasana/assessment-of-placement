import { useState,useEffect } from 'react'


function App() {

  const [error , setError] = useState("")
  const [loading , setLoading] = useState(false);
  const [cards , setCards] = useState([])
  const [countDown, setCountDown] = useState(10);
  const [moreArticles , setMoreArticles] = useState(true);
  const [page , setPage] = useState(1);


     function fetchFunc() {


              if(!moreArticles) return;
              setLoading(true)
              fetch(`https://newsapi.org/v2/everything?q=india&apiKey=1a43fa70a7064ced9dc6d60fafa0d025&page=${page}&pageSize=10`)
              .then(res => res.json())
              .then(data => {
                   setCards(data.articles);
                   setLoading(false);
                   console.log(data.articles);
              })
              .catch(err => {
                 setLoading(false)
                 setError("error find");
             })
     }





   useEffect(() => {
       fetchFunc()

       let timer = setInterval(() => {

           setCountDown(prev => {
              if(prev == 1){
                 fetchFunc();
                 return 10;
              }

              return prev - 1;
           })
       },1000)

       return () => clearInterval(timer);

   },[])



   function searchFun(){

   }


//
//   function searchFunc(){
//
//   }

    if(loading){
       return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
    }




  return (
    <>

      <h1 style={{textAlign : "center" , color:"pink"}}>Welcome to News Page</h1>
      <p>{countDown}</p>


      {error ? (
        <p>{error}</p>
      ) : (

        cards.map((card, id) => (
          <div key={id}>
            <h3>{card.title}</h3>
            <img src={card.urlToImage} width="200" />
            <p>{card.description}</p>
            <p>{card.publishedAt}</p>
            <a href={card.url} target="_blank"> Read Full Article </a>
          </div>
        ))
      )}

    </>
  )
}

export default App
