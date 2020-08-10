import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import useInfiniteScroll from '../hooks/useInfiniteScroll';
import '../styles/listPokemons.scss';

const PER = 12;

export default function ListPokemons(props) {
  const { pokemons } = props;
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    setListItems(pokemons.slice(0, PER));
    setPage(1);
  }, [pokemons])

  const [page, setPage] = useState(1);

  const fetchMoreItems = () => {
    const newPage = page + 1;
    setPage(newPage)
    setListItems(pokemons.slice(0, PER*newPage))
    setIsFetching(false);
  }

  const enableInfiniteScroll = page > 1;
  const [ isFetching, setIsFetching ] = useInfiniteScroll(fetchMoreItems, enableInfiniteScroll)

  const renderItem = (item) => (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 animating hover" key={item.id}>
      <figure>
        <a href=""></a>
        <img src={item['ThumbnailImage']} alt={item['ThumbnailAltText']} />
      </figure>
      <div className="pokemon-info">
        <p className="id">{`#${item.number}`}</p>
        <h3>{item.name}</h3>
        <div className="abitities d-flex">
          {
            item.type.map( type => (
              <div key={type} className={`pill ${type}`}>{type}</div>
            ))
          }
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mt-5">
      <div className="row">
        {
          !isEmpty(listItems) ? listItems.map( item => renderItem(item)) : (
            <p className="mx-auto">No pokémon found</p>
          )
        }
        {isFetching && <div className="text-align">Fetching more list items...</div>}
      </div>
      <div className="row">
        { !enableInfiniteScroll && !isEmpty(listItems) && <button type="button" className="btn-loadmore" onClick={ () => fetchMoreItems() }>Load More Pokémon</button> }
      </div>
    </div>
  )
}

ListPokemons.propTypes = {
  pokemons: PropTypes.array,
}

ListPokemons.defaultProps = {
  pokemons: "",
}
