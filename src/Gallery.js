import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

export function Gallery() {
  const [photos, setPhoto] = useState([]);
  const [page, setPage] = useState(1);

//   const loadJson = () => {
//     fetch(`http://145.24.222.98:8080/api/photos`, {
//         method: 'GET', 
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         }
//     })
//         .then(response => response.json())
//         .then(data => setPhoto(data.items))
//         .catch((error) => {
//             console.error('Error:', error);
//         });
// }

  // GET request 
  const myHeadersGET = new Headers();
  myHeadersGET.append('Accept', 'application/json');
  myHeadersGET.append('Content-type', 'application/json');

  const myInitGet = {
    method: 'GET',
    headers: myHeadersGET
  };

  const loadJson = () => fetch(`http://145.24.222.98:8080/api/photos`, myInitGet)
  .then(response => response.json())
  .then(data => setPhoto(data.items))
  .catch(error => console.error('Error:', error))

  // DELETE request 
  const myHeadersDELETE = new Headers();
  myHeadersDELETE.append('Accept', 'application/json');

  const myInitDELETE = {
    method: 'DELETE',
    headers: myHeadersDELETE
  };

  const deletePhoto = (uri) => fetch(uri, myInitDELETE)
  .then(response => {loadJson()})
  .catch(error => console.error('Error:', error))

  const photoComponents = photos.map((photo, index) => {
    return <div id={photo._id} key={photo._id} className="Photo"><Link to={`/detail/${photo._id}`}><img src={photo.image} alt={photo.title} title={photo.title}/></Link><button className="deleteButton" onClick={() => deletePhoto(photo._links.self.href)}>Delete</button><a className="updateButton" href={"/update/" + photo._id}>Update</a></div>
  });

  useEffect(loadJson, [page]);

  return (
    <div className="gallery">
      <div id="gallery">{photoComponents}</div>
      {/* <button onClick={() => setPage(page + 1)}>Volgende pagina</button> */}
    </div>
  );
}