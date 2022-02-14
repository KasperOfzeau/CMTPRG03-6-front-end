import React, { useEffect, useState } from "react";

export function Create() {

  //new photo
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [succesMessage, setSuccesMessage] = useState("");

  //onchange handlers
  const onTitleChangeHandler = (e) => {
    setTitle(e.target.value);
  }

  const onCategoryChangeHandler = (e) => {
    setCategory(e.target.value);
  }

  const onImageChangeHandler = (e) => {
    setImage(e.target.value);
  }

  // POST request
  const myHeadersPOST = new Headers();
  myHeadersPOST.append('Accept', 'application/json');
  myHeadersPOST.append('Content-type', 'application/json');

  const sendJson = () => {
  
  const myInitPOST = {
    method: 'POST',
    headers: myHeadersPOST,
    body: JSON.stringify({title: title, category: category, image: image})
  };

  fetch(`http://145.24.222.98:8080/api/photos`, myInitPOST)
  .then(response => response.json())
  .then(data => console.log("POST OK"))
  .then(setSuccesMessage("Created successfully"), setTitle(''), setCategory(''), setImage(''))
  .catch(err => console.log(err))
 }

 return <div className="form">
    <p>{succesMessage}</p>
    Title: <input type="text" onChange={onTitleChangeHandler} value={title}></input><br/>
    Category: <input type="text" onChange={onCategoryChangeHandler} value={category}></input><br/>
    Image: <input type="text" onChange={onImageChangeHandler} value={image}></input><br/>
    <button onClick={sendJson}>Create</button>
  </div>;
}