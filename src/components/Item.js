export const Item = ({params}) =>{
  return(
    <div className="item">
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
  )  
}