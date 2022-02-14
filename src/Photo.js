import { useEffect, useState } from "react";
import {
  useParams
} from "react-router-dom";

export function Photo() {
  
  const [photo, setPhoto] = useState([]);

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
    console.log(photo)
    setPhoto(photo);
  }

  useEffect(loadJson, []);

  return (
    <div className="Photo">
      <h2>{photo.title}</h2>
      <button className="deleteButton" onClick={() => deletePhoto(photo._links.self.href)}>Delete</button>
      <a className="updateButton" href={"/update/" + photo._id}>Update</a>
      <ul>
        <li>Category: {photo.category}</li>
        <li>Created at: {Date(photo.created_at)}</li>
      </ul>
      <img src={photo.image} alt={photo.title} title={photo.title}/>
    </div>
  );
}
