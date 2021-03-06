import React from 'react';
import './App.css';
import { Map } from '../src/components/Map/index'
import Footer from '../src/components/Footer/index'

function App() {
  return (
    <div className="App has-text-centered">
      <section className="hero has-background-black-ter">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Spread of COVID-19 Cases in the United States
      </h1>
            <h2 className="subtitle">
              Click on each circle for more details
      </h2>
          </div>
        </div>
      </section>
      <div className="">
        <Map />

      </div>
      <Footer />
    </div>
  );
}

export default App;
