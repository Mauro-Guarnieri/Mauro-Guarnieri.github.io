//Cambiar clases para el dark/light mode según el estado de la key en el localstorage y setearla en dark por default
const swDkMode = document.querySelector("#switch");
if (localStorage.getItem("modeState") === "light") {
  document.body.classList.toggle("light");
  swDkMode.classList.toggle("active");
} else if (localStorage.getItem("modeState") === "dark") {
  document.body.classList.remove("light");
  swDkMode.classList.remove("active");
} else {
  document.body.classList.remove("light");
  swDkMode.classList.remove("active");
  localStorage.setItem("modeState", "dark");
}

//Cuando se toca el botón cambiar la clase para el switch del boton y para el body. Entonces, cambiar el local storage al modo correspondiente (dark default)
swDkMode.addEventListener("click", () => {
  document.body.classList.toggle("light");
  swDkMode.classList.toggle("active");

  if (document.body.getAttribute("class") === "light") {
    localStorage.setItem("modeState", "light");
  } else {
    localStorage.setItem("modeState", "dark");
  }
});

//Obtener los datos del json
let getJsonDistros = async () => {
  let datos = await fetch("../distros.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      return data;
    });
  return await datos;
};

//Obtener todos los nombres de las distros del json en un array
async function nombresDistros() {
  let datosJsonDistros = await getJsonDistros();
  let distroNames = [];
  for (distro in datosJsonDistros) {
    distroNames.push(distro);
  }
  return await distroNames;
}

//Cambiar el distro container según el json
async function changeDistrosContainer() {
  let datosJsonDistros = await getJsonDistros();
  const nombresDistro = await nombresDistros();

  //Poner la primera letra en mayuscula de una string
  function primeroMayus(str) {
    const primerCaracter = str.charAt(0).toUpperCase();
    const restoDeLaCadena = str.substring(1, str.length);
    return primerCaracter.concat(restoDeLaCadena);
  }

  //Añadir al container los divs de las distros con los datos del json
  const distrosContainer = document.querySelector(".distros-container");
  nombresDistro.forEach((distro) => {
    distrosContainer.innerHTML += `<a href="./distros/distro_${distro}.html">
    <div class="distros">
      <img src="./imgs/logos/${distro}.png" />
      <h2>${primeroMayus(distro)}</h2>
      <div class="caract">
        <div class="ver_desc">
          <p class="version">
            <span>Versión:</span> ${datosJsonDistros?.[distro].tbValues[3]}
          </p>
          <p id="desc-dis" class="descrip">
            <span>Descripción:</span> ${datosJsonDistros?.[distro].desc}
          </p>
        </div>
        <div class="dific">
          <h4 class="dif">Dificultad:</h4>
          <p class="stars">${numeroEstrellas(
            datosJsonDistros?.[distro].tbValues[8]
          )}</p>
        </div>
      </div>
    </div>
  </a>
  <!---->`;
  });

  //Poner tantas estrellas como el numero pasado
  function numeroEstrellas(num) {
    const stars = [
      "★ ☆ ☆ ☆ ☆",
      "★ ★ ☆ ☆ ☆",
      "★ ★ ★ ☆ ☆",
      "★ ★ ★ ★ ☆",
      "★ ★ ★ ★ ★",
    ];
    return stars[num - 1];
  }

  //Aplicar el estilo a las estrellas según la cantidad
  const getStars = document.querySelectorAll(".stars");
  for (let i = 0; i < getStars.length; i++) {
    if (getStars[i].textContent === "★ ☆ ☆ ☆ ☆") {
      getStars[i].classList.replace("stars", "oneStar");
    } else if (getStars[i].textContent === "★ ★ ☆ ☆ ☆") {
      getStars[i].classList.replace("stars", "twoStars");
    } else if (getStars[i].textContent === "★ ★ ★ ☆ ☆") {
      getStars[i].classList.replace("stars", "threeStars");
    } else if (getStars[i].textContent === "★ ★ ★ ★ ☆") {
      getStars[i].classList.replace("stars", "fourStars");
    } else {
      getStars[i].classList.replace("stars", "fiveStars");
    }
  }
}

changeDistrosContainer();
