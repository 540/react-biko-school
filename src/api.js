export const api = {
  characters: async () => {
    const response = await fetch('/api/characters.json')
    // return await response.json()
    // await is not necessary here!
    return response.json()
  },

  comics: async (characterId) => {
    const response = await fetch(`/api/comics-${characterId}.json`)
    return response.json()
  },

  allComics: async () => {
    const response = await fetch('/api/comics.json')
    return response.json()
  }
}
