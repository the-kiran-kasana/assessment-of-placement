


const [count , setCount] = useState(60)
const [error , setError] = useState("")
const [articles,setArticles] = useState([]);
const [loading,setLoading] = useState(false);
const [reading ,  setReading] useState(true)




function fetchNews(){
    setLoading(true);

    fetch(`https://api.spaceflightnewsapi.net/v4/articles`)
    .then(res=>res.json())
     .then(data=>{
        setArticles(prev=>[...prev,...data.results]);
        setLoading(false);
     })
      .catch(()=>{
                 setError("Error loading news");
                 setLoading(false);
                 });
}

useEffect(()=>{
   fetchNews();
},[]);


useEffect(()=>{
if(page>1){
fetchNews();
}
},[page]);


useEffect(() => {
   const timer = setInterval(() => {
      setCount((prev) => {
          if(prev == 1){
            fetchNews();
            return 60;
          }

          return prev - 1;
      })
   },1000);

   return () => clearInterval(timer)
},[])




let prevCall = 0;

searchFunc(e){
  let now = Date.now();
  if(now-prevCall < 800){
   return

   prevCall = now
   searchQuery(e)
}


function searchQuery(text){
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
        setReading(false);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
           setReading(true);
        },5000);
}



useEffect(()=>{

if(selected){

timerRef.current=setTimeout(()=>{
setReading(true);
},5000);

}

return ()=>clearTimeout(timerRef.current);

},[selected]);



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

               <input placeholder"search news" onChange={(e) => searchFunc(e.target.value)}/>

               {articles.map((item ,index) => (
                 <div key={index} className="card" onClick={() => setSelected(item)}>
                     <img src={item.image.url} alt=""/>
                     <div style={{display:"flex" , flexDirection:"column"}}>
                        <h3>{item.title}</h3>
                        <h3>{item.news.site}</h3>
                        <p>{new Date(item.published_at).toLocalString()}</p>
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
                        {reading && <p className="reading">Still reading</p>}
                    </div>
               </div>
           )}

     </div>

)}









//
//
//import { useState,useEffect } from 'react'
//
//
//function App() {
//
//  const [error , setError] = useState("")
//  const [loading , setLoading] = useState(false);
//  const [cards , setCards] = useState([])
//  const [countDown, setCountDown] = useState(10);
//  const [moreArticles , setMoreArticles] = useState(true);
//  const [page , setPage] = useState(1);
//
//
//     function fetchFunc() {
//
//
//              if(!moreArticles) return;
//              setLoading(true)
//
//              fetch("https://api.spaceflightnewsapi.net/v4/articles/")
//              .then(res => res.json())
//              .then(data => {
//
//                   if(data.articles.length == 0){
//                       setMoreArticles(false);
//                   }
//
//                   setCards(prev => [...prev, ...data.articles]);
//                   setPage(prev => prev + 1);
//                   setLoading(false);
//                   console.log(data.articles);
//              })
//              .catch(err => {
//                 setLoading(false)
//                 setError("error find");
//             })
//     }
//
//
//
//
//
//   useEffect(() => {
//       fetchFunc()
//
//       let timer = setInterval(() => {
//
//           setCountDown(prev => {
//              if(prev == 1){
//                 fetchFunc();
//                 return 10;
//              }
//
//              return prev - 1;
//           })
//       },1000)
//
//       return () => clearInterval(timer);
//
//   },[])
//
//
//
//   function searchFun(){
//
//   }
//
//
////
////   function searchFunc(){
////
////   }
//
//    if(loading){
//       return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
//    }
//
//
//
//
//  return (
//    <>
//
//      <div className="container">
//
//           <div className="sidebar">
//               <h3>Categories</h3>
//               <button>Tech</button>
//               <button>Science</button>
//               <button>Space</button>
//           </div>
//
//
//          <div className="articleFeed"></div>
//                  <h1 style={{textAlign : "center" , color:"pink"}}>Welcome to News Page</h1>
//                  <p>{countDown}</p>
//
//                  {error ? (
//                    <p>{error}</p>
//                  ) : (
//
//                    cards.map((card, id) => (
//                      <div key={id}>
//                        <h3>{card.title}</h3>
//                        <img src={card.urlToImage} width="200" />
//                        <p>{card.description}</p>
//                        <p>{card.publishedAt}</p>
//                        <a href={card.url} target="_blank"> Read Full Article </a>
//                      </div>
//                    ))
//                  )}
//
//                  {!moreArticles && (<h2 style={{textAlign:"center"}}>You're all caught up</h2>)}
//
//                   {loading && <p className="loading">Loading...</p>}
//                   {error && <p>{error}</p>}
//          </div>
//     </div>
//    </>
//  )
//}
//
//export default App







//
//import { useState, useEffect, useRef } from "react";
//import "./App.css";
//
//function App() {
//
//const [articles,setArticles] = useState([]);
//const [loading,setLoading] = useState(false);
//const [error,setError] = useState("");
//const [page,setPage] = useState(1);
//const [count,setCount] = useState(60);
//const [selected,setSelected] = useState(null);
//const [reading,setReading] = useState(false);
//const timerRef = useRef(null);
//
//
//
//        function fetchNews(query=""){
//
//            setLoading(true);
//
//            fetch(`https://api.spaceflightnewsapi.net/v4/articles/?limit=10&offset=${(page-1)*10}&search=${query}`)
//            .then(res=>res.json())
//            .then(data=>{
//            setArticles(prev=>[...prev,...data.results]);
//            setLoading(false);
//            })
//            .catch(()=>{
//            setError("Error loading news");
//            setLoading(false);
//            });
//
//        }
//
//
//// FIRST LOAD
//useEffect(()=>{
//fetchNews();
//},[]);
//
//
// // AUTO REFRESH + COUNTDOWN
//useEffect(()=>{
//
//const timer=setInterval(()=>{
//
//setCount(prev=>{
//if(prev===1){
//setArticles([]);
//setPage(1);
//fetchNews();
//return 60;
//}
//return prev-1;
//});
//
//},1000);
//
//return ()=>clearInterval(timer);
//
//},[]);
//
//
//// INFINITE SCROLL
//useEffect(()=>{
//
//function handleScroll(){
//
//if(
//window.innerHeight + window.scrollY >=
//document.body.offsetHeight - 200
//){
//setPage(prev=>prev+1);
//}
//
//}
//
//window.addEventListener("scroll",handleScroll);
//
//return ()=>window.removeEventListener("scroll",handleScroll);
//
//},[]);
//
//
//// LOAD NEXT PAGE
//useEffect(()=>{
//if(page>1){
//fetchNews();
//}
//},[page]);
//
//
//
//
//
//
//// THROTTLE FUNCTION
//function throttle(fn,delay){
//
//let last=0;
//
//return function(value){
//
//const now=Date.now();
//
//if(now-last>=delay){
//last=now;
//fn(value);
//}
//
//};
//
//}
//
//
//// SEARCH FUNCTION
//function searchNews(query){
//
//setArticles([]);
//setPage(1);
//
//fetch(`https://api.spaceflightnewsapi.net/v4/articles/?search=${query}`)
//.then(res=>res.json())
//.then(data=>{
//setArticles(data.results);
//});
//
//}
//
//const throttledSearch = useRef(throttle(searchNews,800)).current;
//
//
//
//useEffect(()=>{
//
//if(selected){
//
//timerRef.current=setTimeout(()=>{
//setReading(true);
//},5000);
//
//}
//
//return ()=>clearTimeout(timerRef.current);
//
//},[selected]);
//
//
//
//function resetTimer(){
//
//setReading(false);
//
//clearTimeout(timerRef.current);
//
//timerRef.current=setTimeout(()=>{
//setReading(true);
//},5000);
//
//}
//
//
//if(loading && articles.length===0){
//return <h2 style={{textAlign:"center"}}>Loading...</h2>
//}
//
//
//
//
//
//
//
//return (
//
//<div className="container">
//
//<div className="sidebar">
//    <h3>Categories</h3>
//    <button>Tech</button>
//    <button>Science</button>
//    <button>Space</button>
//</div>
//
//
//    <div className="feed">
//
//         <h1>News Dashboard</h1>
//         <p>Refreshing in {count}s...</p>
//
//        <input placeholder="Search news" onChange={(e)=>throttledSearch(e.target.value)}/>
//
//
//        {articles.map((item,index)=>(
//
//        <div key={index} className="card" onClick={()=>setSelected(item)}>
//            <img src={item.image_url} alt="" />
//            <div style={{ display: "flex", flexDirection: "column" }}>
//                <h3>{item.title}</h3>
//                <p>{item.news_site}</p>
//                <p>{new Date(item.published_at).toLocaleString()}</p>
//            </div>
//
//        </div>
//
//    ))}
//
//        {loading && <p className="loading">Loading...</p>}
//        {error && <p>{error}</p>}
//
//    </div>
//
//
//
//
//    {selected && (
//
//        <div className="modal">
//
//            <div className="modal-content" onMouseMove={resetTimer} onScroll={resetTimer}>
//                <button onClick={()=>setSelected(null)}>✖️</button>
//                <h2>{selected.title}</h2>
//                <img src={selected.image_url} width="300"/>
//                <p>{selected.summary}</p>
//                <a href={selected.url} target="_blank" rel="noreferrer"> Read Full Article</a>
//                {reading && <p className="reading">Still reading?</p>}
//           </div>
//       </div>
//    )}
//
//</div>
//
//)}
//
//
//export default App;






