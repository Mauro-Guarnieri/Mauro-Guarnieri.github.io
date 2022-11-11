//Obtener el nombre de la distro
const path = window.location.pathname;
const distroName = path.split("/").pop().split("_").pop().split(".")[0];
console.log(distroName);

//Cambiar clases para el dark/light mode según el estado de la key en el localstorage
const mainContainer = document.querySelector(".main-container");
if (localStorage.getItem("modeState") === "light") {
  mainContainer.classList.toggle("light");
} else if (localStorage.getItem("modeState") === "dark") {
  mainContainer.classList.remove("light");
} else {
  mainContainer.classList.remove("light");
  localStorage.setItem("modeState", "dark");
}

//Obtener y setear variables de css
const rtCss = document.querySelector(":root");
function cssVar_set(variable, value) {
  rtCss.style.setProperty(`--${variable}`, value);
}

//Setear el color de la variable bk-color específicamente
function cssBK_set(color) {
  return cssVar_set("bk-color", `#${color}`);
}

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

//Cambiar la página en base al nombre de la distro (los valores los obtiene del json de distros)
async function changeDistro() {
  //Variable donde se guardan los datos del json
  let datosJsonDistros = await getJsonDistros();

  //Seteo del nombre de la web
  const webTitle = document.querySelector("#tl-web");
  nombreDistroPrimerMayus = (str) => {
    const primerCaracter = str.charAt(0).toUpperCase();
    const restoDeLaCadena = str.substring(1, str.length);
    return primerCaracter.concat(restoDeLaCadena);
  };
  webTitle.textContent = nombreDistroPrimerMayus(distroName);

  //Seteo del color del fondo
  cssBK_set(datosJsonDistros?.[distroName].color);

  //Seteo del logo
  const logoImg = document.querySelector("#logo-img");
  logoImg.setAttribute("src", `../imgs/logos_grises/${distroName}_gris.png`);

  //Seteo del título
  const titleName = document.querySelector("#title-name");
  titleName.textContent = distroName.toUpperCase();

  //Seteo de la imagen de muestra
  const dskImg = document.querySelector(".desktop-img");
  dskImg.setAttribute("src", datosJsonDistros?.[distroName].desktopImg);

  //Seteo de la descripcion
  const desc = document.querySelector("#desc");
  desc.innerHTML = datosJsonDistros?.[distroName].descDk;

  //Setear los valores de las tablas (para pc y para mobile)
  const tbPc = document.querySelector("#tb-pc");
  const TbVal = datosJsonDistros?.[distroName].tbValues;
  tbPc.innerHTML = `<td class=".td-pc">${TbVal[0]}</td>
  <td class=".td-pc">${TbVal[1]}</td>
  <td class=".td-pc">${TbVal[2]}</td>
  <td class=".td-pc">${TbVal[3]}</td>
  <td class=".td-pc">${TbVal[4]}</td>
  <td class=".td-pc">${TbVal[5]}</td>
  <td class=".td-pc">${TbVal[6]}</td>
  <td class=".td-pc">${TbVal[7]}</td>
  <td class=".td-pc">${TbVal[8]}/5 ★</td>`;
  const tdMbs = document.querySelectorAll(".td");
  let i1 = 0;
  tdMbs.forEach((td) => {
    td.textContent = TbVal[i1];
    i1++;
  });
  tdMbs[8].textContent = TbVal[8] + "/5 ★";

  //Setear el link a la web de la distro
  const linkDistro = document.querySelectorAll(".link-distro");
  linkDistro.forEach((link) => {
    link.textContent = datosJsonDistros?.[distroName].linkDistro[0];
    link.setAttribute("href", datosJsonDistros?.[distroName].linkDistro[1]);
  });
}
changeDistro();
