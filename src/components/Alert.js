import React from 'react'

export default function Alert(props) {
  const Capitalize=(word)=>{
      if(word==="danger"){
        word="error";
      }
      const lower =word.toLowerCase();
      return lower[0].toUpperCase() + lower.slice(1);
  }
  return (
    <div style={{top:"60px",position:"fixed"}}>
    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
    <strong>{Capitalize(props.alert.type)}</strong>: {props.alert.msg}
  </div>}
  </div>
  )
}