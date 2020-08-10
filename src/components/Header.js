import React from 'react';
import PropTypes from 'prop-types';
import '../styles/header.scss';

const searchIcon = (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
)

export default function Header (props){
  const { query, handleSearch } = props;
  return (
    <div className="header">
      <div className="container pt-4">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="filter-text">
              <label>Name Or Number</label>
              <div className="filter-input">
                <input type="text" value={query} onChange={(event) => handleSearch(event.target.value)} />
                <button className="btn btn-secondary" type="button">
                  <i>
                    { searchIcon }
                  </i>
                </button>
              </div>
              <p className="description mt-1">Use the Advanced Search to explore Pokémon by type, <br />weakness, Ability, and more!</p>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="card banner">
              Search for a Pokémon by name or using its National Pokédex number.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  value: PropTypes.string,
  handleSearch: PropTypes.func.isRequired,
}

Header.defaultProps = {
  value: "",
}


