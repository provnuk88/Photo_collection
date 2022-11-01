import React, {useEffect,useState} from 'react';
import './index.scss';
import { Collection } from './Collection';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {

  const [categoryId,setCategoryId] = useState(0);
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading,setIsLoading] =useState(true);
  const [page,setPage]= useState(1);

  useEffect(()=>{

    setIsLoading(true)

    const category = categoryId ? `category=${categoryId}` : '';
  

    fetch(`https://6360e0c367d3b7a0a6b77a8f.mockapi.io/collections?page=${page}&limit=3&${category}`)
    .then(res=>res.json())
    .then(json=>{
      setCollections(json)
    })
    .catch(err=>{  
      console.warn(err);
      alert('Ошибка при полдучении данных')
    }).finally(()=>{
      setIsLoading(false)
    }) 
  },[categoryId, page]);
  



  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj,i)=> 
          <li onClick={()=> setCategoryId(i)}
           className={categoryId === i ? 'active' : ''} 
           key={obj.name}>
            {obj.name}
            </li>)}
        </ul>
        <input value={searchValue} 
        onChange={e => setSearchValue(e.target.value)} 
        className="search-input" 
        placeholder="Поиск по названию" />
      </div>
      <div className="content">
        { isLoading ? <h2>Loading...</h2> :
        collections.filter((obj)=>{
          return obj.name.toLowerCase().includes(searchValue.toLowerCase())
        }).map((obj,index)=>(
          <Collection key={index} name={obj.name} images={obj.photos} />
        ))
        }
      </div>
      <ul className="pagination">
        {
          [...Array(4)].map((obj,i)=> <li 
          onClick={()=> setPage(i)} 
          className={page===i ? 'active' : ""}>
            {i+1}
            </li>)
        }
      </ul>
    </div>
  );
}

export default App;
