import { useEffect, useState } from "react"
import XMLParser from "react-xml-parser"
import { Item } from "./Item"

export const SearchBar = () => {
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  
  async function fetchData(tags) {
    const results = await fetch(`https://www.flickr.com/services/feeds/photos_public.gne?tags=${tags}`)
    .then( async resp => {
      const data = await resp.text();      
      return data;
    })   
    .then(data => {
      const jsonData = new XMLParser().parseFromString(data)      
      return jsonData;
    })
    .catch(error => {
      console.log(error)
    })

    setData(results.children)
  }

  useEffect(() => {
    fetchData(search);
  }, [search])

  const filteredData = (data || []).filter((items) => {
    return items.name === "entry"
  })
  
  console.log(filteredData)

  return(
    <div className="container">
      <input type="search" id="searchBox" placeholder="Type your search terms here"
        onChange={(e) => {setSearch(e.target.value)}} value = {search}/>
        <div className="resultBox">
          {filteredData.map((items) => {
            return <Item params={items} />
          })}
        </div>

    </div>
  )
}