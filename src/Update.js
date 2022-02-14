import { useEffect, useState } from "react";
import {
  useParams
} from "react-router-dom";

export function Update() {

    const [photo, setPhoto] = useState([]);

    //Updated photo
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [succesMessage, setSuccesMessage] = useState("");

    let params = useParams();
  
    // GET request 
    const myHeadersGET = new Headers();
    myHeadersGET.append('Accept', 'application/json');
    myHeadersGET.append('Content-type', 'application/json');
  
    const myInitGet = {
      method: 'GET',
      headers: myHeadersGET
    };
  
    const loadJson = () => fetch(`http://145.24.222.98:8080/api/photos/${params.photoId}`, myInitGet)
    .then(response => response.json())
    .then(data => updatePhoto(data))
    .catch(error => console.error('Error:', error))

    function updatePhoto(photo) {
        setTitle(photo.title);
        setCategory(photo.category);
        setImage(photo.image);
    }

    // PUT request
    const myHeadersPUT = new Headers();
    myHeadersPUT.append('Accept', 'application/json');
    myHeadersPUT.append('Content-type', 'application/json');

    const sendJson = () => {
    
    const myInitPUT = {
        method: 'PUT',
        headers: myHeadersPUT,
        body: JSON.stringify({title: title, category: category, image: image})
    };

    fetch(`http://145.24.222.98:8080/api/photos/${params.photoId}`, myInitPUT)
    .then(response => response.json())
    .then(data => console.log("PUT OK"))
    .then(() => setSuccesMessage("Updated successfully"))
    .catch(err => console.log(err))
    }
  
    useEffect(loadJson, []);

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
  
    return (
      <div className="Update">
        <h2>Update foto</h2>
        <p>{succesMessage}</p>
        Title: <input type="text" onChange={onTitleChangeHandler} value={title}></input><br/>
        Category: <input type="text" onChange={onCategoryChangeHandler} value={category}></input><br/>
        Image: <input type="text" onChange={onImageChangeHandler} value={image}></input><br/>
        <button onClick={sendJson}>Update</button>
      </div>
    );
}