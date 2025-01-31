const searchInput = document.getElementById("search-input");
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlists");

function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists`) // Pegamos todos os artistas primeiro
    .then((response) => response.json())
    .then((results) => {
      // Filtramos no frontend para fazer busca case-insensitive
      const filteredResults = results.filter((artist) =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      displayResults(filteredResults);
    })
    .catch((error) => console.error("Erro ao buscar artistas:", error));
}

function displayResults(result) {
  if (result.length === 0) {
    resultArtist.classList.add("hidden");
    resultPlaylist.classList.remove("hidden");
    return;
  }

  resultPlaylist.classList.add("hidden");

  const artistName = document.getElementById("artist-name");
  const artistImage = document.getElementById("artist-img");

  const firstArtist = result[0]; // Exibe apenas o primeiro artista encontrado
  artistName.innerText = firstArtist.name;
  artistImage.src = firstArtist.urlImg;

  resultArtist.classList.remove("hidden");
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    resultPlaylist.classList.remove("hidden");
    return;
  }

  requestApi(searchTerm);
});
