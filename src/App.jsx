import { useState, useEffect } from "react"
import "./App.css"
function App() {
  const [products, setProducts]=useState([])
  const [currentpage, setCurrentpage]=useState(1)
  const productperpage=8
  useEffect(()=>{
    fetch("./data.json").then((res)=>res.json()).then((data)=>setProducts(data.products))
  }, [])
  const totalpage = Math.ceil(
    products.length / productperpage 
  )
  const lastindex=currentpage*productperpage
  const firstindex=lastindex-productperpage 
  const currentproduct=products.slice(firstindex,lastindex)
  console.log(currentproduct)

  const prevpage=() =>{
    if(currentpage>1){
      setCurrentpage(currentpage-1)
    } 
  }

  const nextpage=() =>{
    if(currentpage<totalpage){
      setCurrentpage(currentpage+1)
    }
  }
  return(
  <> 
    <div className="store">
    <h1>Product Store</h1>
    <h3>Explore our product</h3>
    </div>
    <div className="container">{ 
      currentproduct.map((products)=>(
        <div className="card" key={products.id}>
          <img src={products.image} className="img"/>
          <div className="info">
              <h2>{products.name}</h2>
              <h3>{products.category}</h3>
              <p>{products.price}</p>
              <h4>{products.brand}</h4>
              <h3>{products.description}</h3>
              <button className="btn">Explore Here &#8599;</button>
          </div>
        </div>
      ))
    }
</div>
    <div className="pagination">
      <button onClick={prevpage} disabled={currentpage==1} >prev</button>
       <p className="page-info">
      Page {currentpage} of {totalpage}
    </p>
      <button onClick={nextpage} disabled={currentpage==totalpage} >next</button>
    </div>
   
    
  </>
  )
}
export default App