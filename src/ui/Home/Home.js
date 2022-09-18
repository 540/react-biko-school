import './Home.css'
import React from 'react'

export const Home = () => {
  return (
    <main className="container">
      <Header />
      <ComicList comics={[]} />
      <Footer itemsCount={0} />
    </main>
  )
}

const Header = () => {
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

const ComicList = ({ comics }) => {
  return (
    <section>
      <p className="inputLabel">
        Selecciona una pareja de personajes
      </p>
      <div className="inputContainer">
        <Select options={[]} />
        <Select options={[]} />
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
  )
}

const Footer = ({ itemsCount }) => {
  return (
    <footer>
      <p>Elementos en la lista: {itemsCount}</p>
    </footer>
  )
}

const Select = ({ options }) => {
  return (
    <select className="characterSelector">
      <option value="" />
      {
        options.map(option => {
          return <option key={option.value} value={option.value}>{option.label}</option>
        })
      }
    </select>
  )
}








