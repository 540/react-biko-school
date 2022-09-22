import './Home.css'
import React, { useContext, useEffect, useState } from 'react'
import { api } from '../../api'
import { ThemeContext } from '../_context/ThemeContext'

export const Home = () => {
  const [firstCharacterSelect, setFirstCharacterSelect] = useState()
  const [secondCharacterSelect, setSecondCharacterSelect] = useState()
  const [characters, setCharacters] = useState([])
  const [comics, setComics] = useState([])

  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    const fetchCharacters = async () => {
      const characters = await api.characters()
      setCharacters(characters)
    }

    fetchCharacters()
  }, [])

  useEffect(() => {
    if (!firstCharacterSelect || !secondCharacterSelect) return

    const getCommonComics = async () => {
      const firstCharacterComics = await api.comics(firstCharacterSelect)
      const secondCharacterComics = await api.comics(secondCharacterSelect)

      const commonComics = firstCharacterComics.filter(comic1 => secondCharacterComics.some(comic2 => comic1.id === comic2.id))

      setComics(commonComics)
    }

    getCommonComics()
  }, [firstCharacterSelect, secondCharacterSelect])

  const clearSearch = () => {
    setFirstCharacterSelect(undefined)
    setSecondCharacterSelect(undefined)
    setComics([])
  }

  return (
    <main className="container" style={{
      backgroundColor: theme === 'dark' ? 'black' : 'white'
    }}>
      <Header />
      <ComicList characters={characters}
                 firstCharacterSelect={firstCharacterSelect}
                 secondCharacterSelect={secondCharacterSelect}
                 onFirstCharacterSelect={setFirstCharacterSelect}
                 onSecondCharacterSelect={setSecondCharacterSelect}
                 comics={comics}
                 onClear={clearSearch}
      />
      <Footer itemsCount={comics.length} />
    </main>
  )
}

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <header>
      <div className="checkboxContainer">
        <span className="checkboxLabel" style={{
          color: theme === 'dark' ? 'white' : 'black'
        }}>El tema actual es: {theme === 'light' ? 'claro' : 'oscuro'}</span>
        <input className="checkbox" type="checkbox" onChange={() => toggleTheme()} />
      </div>
      <h1 className="title" style={{
        color: theme === 'dark' ? 'white' : 'black'
      }}>
        Buscador de cómics de Marvel
      </h1>
      <h2 className="subtitle" style={{
        color: theme === 'dark' ? 'white' : 'black'
      }}>
        Este buscador encontrará los cómics en los que aparezcan los dos personajes que selecciones en el formulario
      </h2>
    </header>
  )
}

const ComicList = ({
                     comics,
                     characters,
                     firstCharacterSelect,
                     secondCharacterSelect,
                     onFirstCharacterSelect,
                     onSecondCharacterSelect,
                     onClear
                   }) => {
  const selectOptions = characters.map(character => ({ value: character.id, label: character.name }))
  const { theme } = useContext(ThemeContext)

  return (
    <section>
      <p className="inputLabel" style={{
        color: theme === 'dark' ? 'white' : 'black'
      }}>
        Selecciona una pareja de personajes
      </p>
      <div className="inputContainer">
        <Select options={selectOptions} value={firstCharacterSelect} onChange={onFirstCharacterSelect} />
        <Select options={selectOptions} value={secondCharacterSelect} onChange={onSecondCharacterSelect} />
        <button className="clearButton" onClick={() => onClear()}>Limpiar búsqueda</button>
      </div>
      {comics.map(comic => (
        <div key={comic.id} className="comicCard">
          <p className="comicTitle" style={{
            color: theme === 'dark' ? 'white' : 'black'
          }}>
            {comic.title}
          </p>
          <p style={{
            color: theme === 'dark' ? 'white' : 'black'
          }}>{comic.characters.join(', ')}</p>
        </div>
      ))}
    </section>
  )
}

const Footer = ({ itemsCount }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <footer>
      <p style={{
        color: theme === 'dark' ? 'white' : 'black'
      }}>Elementos en la lista: {itemsCount}</p>
    </footer>
  )
}

const Select = ({ options, value = '', onChange }) => {
  return (
    <select className="characterSelector" value={value} onChange={e => onChange(e.target.value)}>
      <option value="" />
      {
        options.map(option => {
          return <option key={option.value} value={option.value}>{option.label}</option>
        })
      }
    </select>
  )
}








