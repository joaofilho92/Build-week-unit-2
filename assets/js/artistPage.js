let amici = document.querySelector(".amici");
let offCanvas = document.querySelector(".menùAmici");
let btnClose = document.querySelector(".btn-close");
amici.onclick = () => {
  offCanvas.classList.remove("d-none");
};

btnClose.onclick = () => {
  offCanvas.classList.add("d-none");
};

let index = 0;

let idArtista = new URLSearchParams(window.location.search).get("id");

fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + idArtista)
  .then((resp) => resp.json())
  .then((dato) => funzioneArtista(dato));

let funzioneArtista = function (dato) {
  let title = document.querySelector("#title-album");

  title.textContent = dato.name;
  let bannerImg = document.querySelector(".img-banner");
  bannerImg.src = dato.picture_xl;

  let numeroFan = document.querySelector("#fan");
  numeroFan.textContent = dato.nb_fan;
};

let target = document.querySelector(".target");

let numeroCanzoni = 5;

fetch(
  "https://striveschool-api.herokuapp.com/api/deezer/artist/" +
    idArtista +
    `/top?limit=${numeroCanzoni}`
)
  .then((resp) => resp.json())
  .then((dato) => {
    stampaArtista(dato);
  });

let stampaArtista = function (dato) {
  target.textContent = " ";
  dato.data.forEach((canzone) => {
    index++;

    const divRow = document.createElement("div");
    divRow.classList.add("row");

    const divCol1 = document.createElement("div");
    divCol1.classList.add("col");

    const divDFlex = document.createElement("div");
    divDFlex.classList.add("d-flex", "align-items-center", "gap-4", "mt-3");

    const p = document.createElement("p");
    p.classList.add("m-0");
    p.innerText = index;

    const img = document.createElement("img");
    img.classList.add("img-album");
    img.src = `https://e-cdns-images.dzcdn.net/images/cover/${canzone.md5_image}/56x56-000000-80-0-0.jpg`;

    const div = document.createElement("div");

    const p2 = document.createElement("p");
    p2.classList.add("m-0", "text-white", "hover");
    p2.innerText = canzone.title;
    p2.addEventListener("click", () => {
      let titolo = document.querySelector(".song-title-player");
      titolo.textContent = canzone.title_short;
      let autore = document.querySelector(".song-name-player");
      autore.textContent = canzone.artist.name;
      let imgPlayer = document.querySelector(".player-img");
      imgPlayer.src = `https://e-cdns-images.dzcdn.net/images/cover/${canzone.md5_image}/56x56-000000-80-0-0.jpg`;
      audio.src = canzone.preview;
    });

    const small = document.createElement("small");
    small.classList.add("d-block", "d-sm-none");
    small.innerText = canzone.rank;

    div.appendChild(p2);
    div.appendChild(small);

    divDFlex.appendChild(p);
    divDFlex.appendChild(img);
    divDFlex.appendChild(div);

    divCol1.appendChild(divDFlex);

    const divCol2 = document.createElement("div");
    divCol2.classList.add("col-3", "d-none", "d-sm-flex", "align-items-center");

    const p3 = document.createElement("p");
    p3.classList.add("m-0", "text-white", "mt-3");
    p3.innerText = canzone.rank;

    divCol2.appendChild(p3);

    const divCol3 = document.createElement("div");
    divCol3.classList.add(
      "col-3",
      "d-flex",
      "align-items-center",
      "justify-content-end"
    );

    const p4 = document.createElement("p");
    p4.classList.add("m-0", "text-white", "d-none", "d-sm-block", "mt-3");
    p4.innerText = formatTime(canzone.duration);

    const p5 = document.createElement("p");
    p5.classList.add("d-block", "d-sm-none", "mt-3", "mb-0", "me-3", "fs-4");

    const i = document.createElement("i");
    i.classList.add("bi", "bi-three-dots-vertical");

    p5.appendChild(i);

    divCol3.appendChild(p4);
    divCol3.appendChild(p5);

    divRow.appendChild(divCol1);
    divRow.appendChild(divCol2);
    divRow.appendChild(divCol3);

    target.appendChild(divRow);
  });
};

// let visualizzAltro = document.querySelector(".visualizza-altro");
// visualizzAltro.addEventListener("click", () => {
//   numeroCanzoni += 5;
//   console.log(numeroCanzoni);
//   fetch(
//     "https://striveschool-api.herokuapp.com/api/deezer/artist/" +
//       idArtista +
//       `/top?limit=${numeroCanzoni}`
//   )
//     .then((risp) => risp.json())
//     .then((date) => {
//       stampaArtista(date);
//     });
// });

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
}

let profilo = document.querySelector("#profilo");

let nomeCognome = JSON.parse(window.localStorage.getItem("datiPersonali"));

profilo.textContent = `${nomeCognome.name} ${nomeCognome.surname}`;

// Player
var playhead = document.getElementById("playhead");
var audio = document.getElementById("audio");
var playPauseButton = document.querySelector(".pausa");

playPauseButton.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener("timeupdate", function () {
  var playPercent = 100 * (audio.currentTime / audio.duration);
  playhead.style.left = playPercent + "%";
});

playhead.addEventListener("mousedown", function () {
  audio.pause();
  window.addEventListener("mousemove", movePlayhead);
  window.addEventListener("mouseup", mouseUp);
});

function movePlayhead(e) {
  var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
  var newMargLeft = e.pageX - timeline.offsetLeft;

  if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
    playhead.style.left = newMargLeft + "px";
  }
  if (newMargLeft < 0) {
    playhead.style.left = "0px";
  }
  if (newMargLeft > timelineWidth) {
    playhead.style.left = timelineWidth + "px";
  }
}

function mouseUp() {
  window.removeEventListener("mousemove", movePlayhead);
  audio.currentTime =
    audio.duration * (playhead.offsetLeft / timeline.offsetWidth);
  window.removeEventListener("mouseup", mouseUp);
  audio.play();
}
