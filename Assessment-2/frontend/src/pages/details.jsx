//import {useParams} from "react-router-dom";
//
//
function details()
{
//
//  const newId = useParams();
//  const [error ,setError] = useState("");
//  const [ loading , setLoading] = useState(true);
//  const [details , setDetails] useState([])
//
//
//    useEffect(() => {
//              setLoading(true)
//
//              fetch(`https://newsapi.org/v2/everything?q=india&apiKey=1a43fa70a7064ced9dc6d60fafa0d025/${newId}`)
//              .then(res => res.json())
//              .then(data => {
//                 setDetails(data.articles)
//                 setLoading(false)
//              }
//              .catch(err => {
//                 setLoading(false)
//                 setError("error find in details pages")
//              })
//
//    },[newId]);
//
//
//
//
//
//  return (
//      <>
//        <h1>welcome cards details page</h1>
//          {error ? (
//                 <p>{error}</p>
//               ) : (
//
//                 details.map((card, id) => (
//                   <div key={id}>
//                     <h3>{card.title}</h3>
//                     <img src={card.urlToImage} width="200" />
//                     <p>{card.description}</p>
//                     <p>{card.publishedAt}</p>
//                     <a href={selectedArticle.url} target="_blank">
//                        Read Full Article
//                     </a>
//                   </div>
//                 ))
//               )}
//      </>
//  )
}
//
export default details;