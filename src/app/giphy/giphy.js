const apiKey = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65'; 

export const searchGifs = async (query) => {
  const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}`);
  const data = await response.json();
  return data.data;
};
