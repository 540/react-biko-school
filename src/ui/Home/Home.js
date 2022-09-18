import React from 'react'
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
  return (
    <main className="container">
      <header>
        <h1 className="title">
          Buscador de cómics de Marvel
        </h1>
        <h2 className="subtitle">
          Este buscador encontrará los cómics en los que aparezcan los dos personajes que selecciones en el formulario
        </h2>
      </header>
      <section>
        <p className="inputLabel">
          Escribe un personaje en la lista
        </p>
        <div className="inputContainer">
          <input className="filterInput" />
          <button className="clearButton">Limpiar búsqueda</button>
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
    </main>
  )
}
