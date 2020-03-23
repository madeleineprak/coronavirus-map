import React from 'react';
import './App.css';
import { Map } from '../src/components/Map/index'

function App() {
  return (
    <div className="App">
      <h1>You may have seen the John Hopkins dashboard before</h1>
      <a href="https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6">John Hopkins</a>
      <a href="https://who.maps.arcgis.com/apps/opsdashboard/index.html#/c88e37cfc43b4ed3baf977d77e4a0667">WHO</a>
      <a href="https://storymaps.arcgis.com/stories/4fdc0d03d3a34aa485de1fb0d2650ee0">Story Map</a>
      <Map />
    </div>
  );
}

export default App;
