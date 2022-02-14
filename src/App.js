import React, { useEffect, useState } from "react";
import  { Photo } from "./Photo";
import  { Gallery } from "./Gallery";
import  { Create } from "./Create";
import  { Update } from "./Update";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import "./styles.scss";

export function App() {

    return <BrowserRouter>
    <div className="App">
      <h1>Foto's</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/create">Create</a></li>
      </ul>
      <Routes>
        <Route exact path="/" element={<Gallery></Gallery>}></Route>
        <Route exact path="/create" element={<Create></Create>}></Route>
        <Route path="/update/:photoId" element={<Update></Update>}></Route>
        <Route path="/detail/:photoId" element={<Photo></Photo>}></Route>
      </Routes>
    </div>
  </BrowserRouter>;
}