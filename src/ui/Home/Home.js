import React, { useState } from 'react'
import './Home.css'

const comics = [
  {
    id: 45977,
    title: 'Captain America (2012) #11',
    characters: ['Captain America']
  },
  {
    id: 43722,
    title: 'Captain America (2012) #1',
    characters: ['Captain America']
  },
  {
    id: 40391,
    title: 'Captain America (2011) #18',
    characters: ['Captain America']
  },
  {
    id: 43339,
    title: 'Uncanny Avengers (2012) #1',
    characters: ['Captain America', 'Havok', 'Rogue', 'Scarlet Witch', 'Thor', 'Wolverine']
  }
]

export const Home = () => {
  const [filter, setFilter] = useState('')

  const filteredComics = comics.filter(comic => comic.title.toLowerCase().includes(filter.toLowerCase()))

  return (
    <main className="container">
      <Header />
      <ComicList comics={filteredComics} filter={filter} onFilter={setFilter} />
      <Footer itemsCount={filteredComics.length} />
    </main>
  )
}

export const Header = () => {
  return (
    <header>
      <h1 className="title">
        Buscador de cómics de Marvel
      </h1>
      <h2 className="subtitle">
        Este buscador encontrará los cómics en los que aparezcan los dos personajes que selecciones en el formulario
      </h2>
    </header>
  )
}

export const ComicList = ({ filter, onFilter, comics }) => {
  return (
    <section>
      <p className="inputLabel">
        Escribe un personaje en la lista
      </p>
      <div className="inputContainer">
        <input className="filterInput" onInput={e => onFilter(e.target.value)} value={filter} />
        <button className="clearButton" onClick={() => onFilter('')}>Limpiar búsqueda</button>
      </div>
      {comics.map(comic => (
        <div key={comic.id} className="comicCard">
          <p className="comicTitle">
            {comic.title}
          </p>
          <p>{comic.characters.join(', ')}</p>
        </div>
      ))}
    </section>
  )
}

export const Footer = ({ itemsCount }) => {
  return (
    <footer>
      <p>Elementos en la lista: {itemsCount}</p>
    </footer>
  )
}






