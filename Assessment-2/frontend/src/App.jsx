import { useState, useEffect, useRef } from "react";
import "./App.css";

function App(){

const [count , setCount] = useState(10)
const [error , setError] = useState("")
const [articles,setArticles] = useState([]);
const [loading,setLoading] = useState(false);
const [reading ,  setReading] = useState(false)
const [selected , setSelected] = useState(null)
const timerRef = useRef(null)
const prevCall = useRef(0)


function fetchNews(query=""){
     setLoading(true);

     fetch(`https://api.spaceflightnewsapi.net/v4/articles/?limit=10&search=${query}`)
    .then(res=>res.json())
     .then(data=>{
        setArticles(data.results);
        setLoading(false);
     })
      .catch(()=>{
         setError("Error loading news");
         setLoading(false);
      });
}


useEffect(() => {

        fetchNews();

        const timer = setInterval(() => {

        setCount((prev) => {

              if (prev === 1) {
                fetchNews();
                return 10;
              }
              return prev - 1;
        });

      }, 1000);
      return () => clearInterval(timer);

}, []);




function searchFunc(e){
      let now = Date.now();
      if(now - prevCall.current < 800){
         return
      }
      prevCall.current = now
      searchQuery(e)
}



function searchQuery(query){

     fetch(`https://api.spaceflightnewsapi.net/v4/articles/?search=${query}`)
     .then(res => res.json())
     .then(data => {
        setArticles(data.results);
     })
     .catch(() => {
         setError("find error while searching");
     })

}



function resetTimer(){

        setReading(false)

        clearTimeout(timerRef.current)

        timerRef.current = setTimeout(() => {

           setReading(true)

        },5000)

}



useEffect(()=>{

         if(selected){

              timerRef.current=setTimeout(()=>{

               setReading(true)

              },5000)

        }

        return ()=>clearTimeout(timerRef.current)

},[selected])



return (

     <div className="container">

           <div className="sidebar">
               <h3>Categories</h3>
               <button>Tech</button>
               <button>Science</button>
               <button>Space</button>
               <button>countries</button>
               <button>religious</button>
           </div>


           <div className="feed">

               <h1>News Paper</h1>
               <p>Refreshing in {count}s...</p>
               <input placeholder="search news" onChange={(e) => searchFunc(e.target.value)}/>

               {articles.map((item ,index) => (

                 <div key={index} className="card" onClick={() => setSelected(item)}>
                     <img src={item.image_url} alt=""/>
                     <div style={{display:"flex" , flexDirection:"column"}}>
                        <h3>{item.title}</h3>
                        <h3>{item.news_site}</h3>
                        <p>{new Date(item.published_at).toLocaleString()}</p>
                     </div>
                 </div>
               ))}

               {loading && <p className="loading">Loading...</p>}
               {error && <p>{error}</p>}

           </div>


           {selected && (

               <div className="modal">

                   <div className="modal-content" onMouseMove={resetTimer} onScroll={resetTimer}>
                        <button onClick={()=> setSelected(null)}>close</button>
                        <h2>{selected.title}</h2>
                        <img src={selected.image_url} width="300"/>
                        <p>{selected.summary}</p>
                        <a href={selected.url} target="_blank" rel="noreferrer">read full article</a>
                        {reading && <p className="reading">Still reading?</p>}
                    </div>
               </div>
           )}
     </div>

)}

export default App;



