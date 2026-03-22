import apiKey from "./config.js";

const apiFilmes = async () => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR`;
  const responsta = await fetch(url);
  const data = await responsta.json();
  console.log(data);
  return data.results.slice(0, 10);
};

export default apiFilmes;
