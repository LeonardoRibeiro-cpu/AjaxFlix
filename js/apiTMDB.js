import apiKey from "./config.js";

const apiFilmes = async () => {
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR`;
    const resposta = await fetch(url);
    const data = await resposta.json();
    return data.results.slice(0, 10);
  } catch (erro) {
    console.error("Erro ao buscar filmes:", erro);
    return [];
  }
};

export default apiFilmes;
