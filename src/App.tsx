//import ProductCard from "./ProductCard";
import "./App.css";
import React, { useEffect, useState } from "react";

type Product = {
  id : number
  name : string
  price : number
  category : string 
  image : string
}



function App() {

  const [products, setProducts] = useState<Product[]>()
  const [search, setSearch] = useState('')

  const [product, setProduct] = useState<Product | null>()
  const [error, setError] = useState('')

  const fetchProducts = async () =>{
  try {
    const response = await fetch('/products.json')

    if(!response.ok){ throw new Error}
    const data = await response.json()

    setProducts(data.products)
    
  } 
  catch (error) 
    {
      console.error(error)
    }   
  }

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const findProduct = () => {
    const found = products?.find(x =>
      x.name.toLowerCase().includes(search.toLowerCase())
    )

    if(found != null){
      setProduct(found)
      setError('')
    }
    else{
      setError('No product found with the given name')
      setProduct(null)
    }
  }



  useEffect(() =>{
    fetchProducts()
  },[])

  return (
    <div>
      <h1>Product Information</h1>
      <div className="product-card">
        <div className="search-section">
          <label>Enter product name:</label>
          <input value={search} onChange={handleSearch}></input>
          <button onClick={findProduct}>Search</button>

          <div className="results-section">
            {product && 
            <div className="product-info">
              <img src={product.image} className="product-image"></img>
              <div className="product-details">
                <p>ID: {product.id}</p>
                <p>Name: {product.name}</p>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
              </div>
            </div> }

            {error &&
            <p className="error">{error}</p>
            }
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App; 