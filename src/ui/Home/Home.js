import React, { useState } from "react";
import "./Home.css";

const comics = [
  {
    id: 45977,
    title: "Captain America (2012) #11",
    characters: ["Captain America"],
  },
  {
    id: 43722,
    title: "Captain America (2012) #1",
    characters: ["Captain America"],
  },
  {
    id: 40391,
    title: "Captain America (2011) #18",
    characters: ["Captain America"],
  },
  {
    id: 43339,
    title: "Uncanny Avengers (2012) #1",
    characters: [
      "Captain America",
      "Havok",
      "Rogue",
      "Scarlet Witch",
      "Thor",
      "Wolverine",
    ],
  },
];

export const Home = () => {
  /**
   *
   * const [filter, setFilter] = useState('')
   *
   * Esta sintaxis no es magia. useState devuelve un array con dos elementos:
   * - El primer elemento es el valor del estado
   * - El segundo elemento es una función que permite cambiar el valor del estado
   *
   * sería equivalente a:
   **/

  const filterState = useState("");
  const filter = filterState[0];
  const setFilter = filterState[1];

  /**
   * const filteredComics = comics.filter((comic) =>
   *  comic.title.toLowerCase().includes(filter.toLowerCase())
   * );
   *
   * Aquí estamos haciendo varias cosas:
   * - comics.filter() recibe una función que se ejecuta para cada elemento del array
   * - Esa función recibe un parámetro que es el elemento del array que se está procesando
   * - Esa función debe devolver true o false. Si devuelve true, el elemento se incluye en el array resultante
   *
   * En este caso, estamos filtrando los cómics que contengan el texto que hemos escrito en el input
   * utilizamos toLowerCase(), que es una función que tienen los strings, para "bajar" el texto a minúsculas y que no haya problemas de mayúsculas/minúsculas
   *
   * Al .filter le pasamos una función anónima, pero también podríamos haberle dado un nombre:
   * */

  const filterFunction = (comic) => {
    // esta función recibe un cómic y devuelve true o false
    const lowerCaseTitle = comic.title.toLowerCase(); // "captain america (2012) #11"
    const lowerCaseFilter = filter.toLowerCase(); // "captain america"

    // la función "includes" es equivalente al "contains" en otros lenguajes,
    //  devuelve true si el string que le pasamos está incluido en el string sobre el que se ejecuta
    // por ejemplo: "Buenas tardes".includes("tardes") devuelve true
    return lowerCaseTitle.includes(lowerCaseFilter);
  };

  // .filter ejecutará la función filterFunction para cada elemento del array comics,
  //  y devolverá un nuevo array con los elementos para los que filterFunction haya devuelto true
  const filteredComics = comics.filter(filterFunction);
  return (
    <main className="container">
      <Header />
      {/* En este caso, estamos pasando a ComicList tres propiedades: comics, filter y onFilter
       como si fueran atributos en html
        Cuando pasamos una función como parámetro, no podemos poner los paréntesis, porque si no se ejecutaría la función
        El componente recibirá las propiedades en un objeto llamado "props", y podrá acceder a ellas como props.comics, props.filter y props.onFilter
        Lo podemos ver más abajo
      */}
      <ComicList comics={filteredComics} filter={filter} onFilter={setFilter} />
      <Footer itemsCount={filteredComics.length} />
    </main>
  );
};

export const Header = () => {
  return (
    <header>
      <h1 className="title">Buscador de cómics de Marvel</h1>
      <h2 className="subtitle">
        Este buscador encontrará los cómics en los que aparezcan los dos
        personajes que selecciones en el formulario
      </h2>
    </header>
  );
};
/**
 *
 * export const ComicList = ({ filter, onFilter, comics }) => {
 *
 * Al declarar los parámetros de una función entre llaves, estamos haciendo
 * una destructuración de objetos, es decir, estamos extrayendo las propiedades
 * que nos interesan de un objeto y asignándolas a variables con el mismo nombre
 *
 * En este caso, estamos extrayendo las propiedades "filter", "onFilter" y "comics"
 * del objeto que nos pasan como parámetro, y asignándolas a variables con el mismo nombre
 *
 * esto es equivalente a:
 */
export const ComicList = (props) => {
  const filter = props.filter;
  const onFilter = props.onFilter;
  const comics = props.comics;

  return (
    <section>
      <p className="inputLabel">Escribe un personaje en la lista</p>
      <div className="inputContainer">
        <input
          className="filterInput"
          // e, el primer parámetro de la función, es el evento que se ha producido
          // en este caso, el evento es que se ha escrito algo en el input
          // e.target es el elemento que ha producido el evento, en este caso el input
          // e.target.value es el valor del input, y por eso lo pasamos a la función onFilter
          onInput={(e) => onFilter(e.target.value)}
          value={filter}
        />
        <button className="clearButton" onClick={() => onFilter("")}>
          Limpiar búsqueda
        </button>
      </div>
      {/*
        En este caso, el map lo que hace es devolver un array de elementos html.
        Como estos elementos son jsx, y son un valor, realmente aquí lo que estamos haciendo es devolver un array de jsx
        sería como escribir:

        <div key={comics[0].id} className="comicCard">
          <p className="comicTitle">{comics[0].title}</p>
          <p>{comics[0].characters.join(", ")}</p>
        </div>
        <div key={comics[1].id} className="comicCard">
          <p className="comicTitle">{comics[1].title}</p>
          <p>{comics[1].characters.join(", ")}</p>
        </div>
        <div key={comics[2].id} className="comicCard">
          <p className="comicTitle">{comics[2].title}</p>
          <p>{comics[2].characters.join(", ")}</p>
        </div>
      */}
      {comics.map((comic) => (
        <div key={comic.id} className="comicCard">
          <p className="comicTitle">{comic.title}</p>
          {/* join es una función de los arrays que devuelve un string con todos los elementos del array separados por el string que le pasemos como parámetro */}
          <p>{comic.characters.join(", ")}</p>
        </div>
      ))}
    </section>
  );
};

// Una vez más, la sintaxis de los parámetros entre llaves es una destructuración de objetos
// export const Footer = ({ itemsCount }) => {
export const Footer = (props) => {
  // podemos desestructurar el objeto que nos pasan como parámetro de esta forma:
  const { itemsCount } = props;
  // que es equivalente a:
  // const itemsCount = props.itemsCount;
  return (
    <footer>
      <p>Elementos en la lista: {itemsCount}</p>
    </footer>
  );
};
