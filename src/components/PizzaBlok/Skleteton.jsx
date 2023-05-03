import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
  className="pizza-blok"
    speed={1}
    width={280}
    height={564}
    viewBox="0 0 280 564"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="135" cy="120" r="100" /> 
    <rect x="0" y="256" rx="10" ry="10" width="297" height="23" /> 
    <rect x="0" y="300" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="447" rx="10" ry="10" width="98" height="30" /> 
    <rect x="122" y="437" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
)

export default MyLoader