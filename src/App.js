import React, { useState } from 'react';
import IcoFont from 'react-icofont';
import styled from 'styled-components';

const AppContainer = styled.section`
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;

  text-align: center;

  @media screen and (min-width: 1200px) {
    width: 1200px;
  }

  h1 {
    font-size: 3rem;
  }
`;

function App() {
  return (
    <AppContainer>
      <h1>Movie Search App</h1>
      <p>
        Simple movie search app that uses{' '}
        <a href='https://themoviedb.org'>TMDB</a> api to search for movies and
        tv shows, and lists them in a grid.
      </p>
      <Search />
    </AppContainer>
  );
}

const SearchContainer = styled.section`
  form {
    margin: auto;
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 768px) {
    form {
      width: 500px;
    }
  }

  form input {
    padding: 0.5rem 0.25rem;
    min-width: 0;

    flex-grow: 1;

    background: none;
    outline: 0;
    border: 0;
    border-bottom: 3px solid rgb(200, 200, 200);

    color: white;
    font-size: 1.5rem;
    font-weight: bold;

    transition: border-color 100ms linear;
  }

  form input:focus {
    border-color: rgb(255, 255, 255);
  }

  form button {
    background: none;
    border: 0;
    color: white;
    font-size: 2rem;

    cursor: pointer;
  }
`;

const MovieList = styled.main`
  margin: 2em;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  grid-auto-flow: dense;
`;

function Search() {
  const [queryValue, setQueryValue] = useState('');
  const [movies, setMovies] = useState([]);

  const searchQuery = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/multi?api_key=1b433a8bbcfaa0e1feb6f57052c8fe99&language=en-US&query=${queryValue}&page=1&include_adult=false`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SearchContainer>
      <form onSubmit={searchQuery}>
        <input
          value={queryValue}
          onChange={(e) => setQueryValue(e.target.value)}
          placeholder='Title...'
        />

        <button type='submit' disabled={!queryValue}>
          <IcoFont icon='search' />
        </button>
      </form>

      <MovieList>
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </MovieList>
    </SearchContainer>
  );
}

const MovieCardContainer = styled.article`
  width: 100%;

  position: relative;

  overflow: hidden;

  cursor: pointer;

  @media screen and (min-width: 920px) {
    &:nth-child(1) {
      grid-column: span 2;
      grid-row: span 2;
    }

    &:nth-child(4n) {
      grid-column: span 2;
      grid-row: span 2;
    }
  }

  img {
    width: 100%;
  }

  section {
    padding: 1rem;
    width: 100%;

    position: absolute;
    bottom: 0;

    overflow: hidden;

    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);

    color: white;
    text-align: left;
    font-size: clamp(10px, 1vh, 16px);

    h1 {
      margin: 0;
      max-width: 100%;

      font-size: 1.2rem;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    p {
      height: 4rem;
      overflow: hidden;
      mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
    }
  }

  @media all and (hover: hover) {
    &:hover {
      img {
        transform: scale(1.05);
        filter: blur(0px);
      }

      section {
        transform: translateY(0);
      }
    }

    img {
      transform: scale(1);

      transition: transform 500ms, filter 500ms;
    }

    section {
      transform: translateY(100%);

      transition: transform 200ms;
    }
  }
`;

function MovieCard(props) {
  return (
    <MovieCardContainer movie={props.movie}>
      <img
        src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`}
        alt={`${props.movie.title} poster`}
      />
      <section>
        <h1>
          {props.movie.title ||
            props.movie.originial_title ||
            props.movie.name ||
            props.movie.original_name}
        </h1>
        <span>{props.movie.media_type}</span>
        <p>{props.movie.overview}</p>
      </section>
    </MovieCardContainer>
  );
}

export default App;
