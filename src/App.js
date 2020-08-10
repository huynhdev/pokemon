import React, { useState } from 'react';
import Fuse from 'fuse.js'
import { uniqBy } from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import ListPokemons from './components/ListPokemons';
import './styles/main.scss';
import data from './data/data.json';

const options = {
  keys: [
    "number",
    "name"
  ]
};

function App() {
  const [query, setQuery] = useState("");
  const pokemons = [ ...uniqBy(data, 'number' ) ];
  const [filterDisplay, setFilterDisplay] = useState([]);

  const handleSearch = (value) => {
    if(value !== ""){
      const fuse = new Fuse(pokemons, options);
      setFilterDisplay(fuse.search(value).flatMap(x => x.item))
    } else {
      setFilterDisplay(pokemons)
    }
    setQuery(value)
  }

  return (
    <div className="App">
      <Header query={query} handleSearch={handleSearch}/>
      <ListPokemons pokemons={query.length < 1 ? pokemons : filterDisplay}/>
    </div>
  );
}

export default App;
