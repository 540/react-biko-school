export const api = {
  characters: async () => {
    const response = await fetch('/api/characters.json')
    return await response.json()
  },

  comics: async (characterId) => {
    const response = await fetch(`/api/comics-${characterId}.json`)
    return await response.json()
  },

  allComics: async () => {
    const response = await fetch('/api/comics.json')
    return await response.json()
  }
}
