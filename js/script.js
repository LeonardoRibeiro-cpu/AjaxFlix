import apiFilmes from "./apiTMDB.js";
import apiKey from "./config.js";

let listaGeneros = [];
window.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=pt-BR`,
  );
  const data = await res.json();
  listaGeneros = data.genres;
  ajaxFilms();
});

const ajaxFilms = async () => {
  const filmes = await apiFilmes();
  let boxFilmes = document.getElementById("boxFilmes");

  boxFilmes.innerHTML = filmes
    .map((filme) => {
      const nomesGeneros = filme.genre_ids
        .map((id) => {
          const genero = listaGeneros.find((g) => g.id === id);
          if (genero) {
            return genero.name.trim();
          } else {
            return null;
          }
        })
        .filter((nome) => nome !== null)
        .join(", ");

      return `
      <figure>
        <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" alt="${filme.title}">
        <figcaption>${filme.title}</figcaption>
        <p>Data de lançamento: ${filme.release_date}</p>
        <p class="generos">Gênero: ${nomesGeneros || "Indefinido"}</p>
        <p>Avaliação: <span>&#11088;</span> ${filme.vote_average.toFixed(1)}</p>
        <p>Votos: ${filme.vote_count}</p>
        <button class="btn-sinopse" data-overview="${filme.overview}">
          Sinopse
        </button>
      </figure>
    `;
    })
    .join("");

  document.querySelectorAll(".btn-sinopse").forEach((btn) => {
    btn.addEventListener("click", () => {
      abrirModal(btn.dataset.overview);
    });
  });
};

const modal = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const fechar = document.getElementById("fechar");

const abrirModal = (texto) => {
  modal.style.display = "flex";
  modalText.innerText = texto || "Sem sinopse disponível.";
};

fechar.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};
