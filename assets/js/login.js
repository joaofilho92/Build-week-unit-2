let submit = document.querySelector("#submit");

submit.addEventListener("click", () => {
  localStorage();
});

let localStorage = () => {
  let nome = document.querySelector("#nome");
  let cognome = document.querySelector("#cognome");
  let dato = {
    name: nome.value,
    surname: cognome.value,
  };
  window.localStorage.setItem("datiPersonali", JSON.stringify(dato));
  window.location.assign("../index.html");
};
