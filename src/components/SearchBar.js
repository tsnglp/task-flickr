import { useEffect, useState } from "react"
import XMLParser from "react-xml-parser"

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
          {filteredData.map((params) => {
            return <div className="item">
                    <img src={params.children.filter((link) =>{
                      return link.name === "link"
                    }).filter((image) => {
                      return image.attributes.type === "image/jpeg"
                    })[0].attributes.href} style={{ width: "100px", height: "100px"}} alt="something"/><br/>
                    Author: <strong>{params.children[8].children[0].value}</strong><br/>
                    Date taken: {new Date(params.children[5].value).toDateString()} <br/>
                    Link: <a href={params.children.filter((link) =>{
                      return link.name === "link"
                    }).filter((image) => {
                      return image.attributes.type === "image/jpeg"
                    })[0].attributes.href}>{params.children.filter((link) =>{
                      return link.name === "link"
                    }).filter((image) => {
                      return image.attributes.type === "image/jpeg"
                    })[0].attributes.href}</a><br/>
                    Tags: {params.children.filter((tag) => {
                      return tag.name === "category"
                    }).map((category) => {
                      return <span>{category.attributes.term + " "}</span>
                    })}
                  </div>
          })}
        </div>

    </div>
  )
}