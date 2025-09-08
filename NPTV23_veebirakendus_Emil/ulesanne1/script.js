    // <button id='laebtn'>Lae kasutajad</button>
    // <div id="spinner">Laen andmeid</div>
    // <div id="kasutajad"></div>
    // <div id="viga">class="viga"></div>

const laeBtn = document.getElementById("laeBtn")
const spinner = document.getElementById("spinner")
const kasutajadDiv = document.getElementById("kasutajad")
const vigaDiv = document.getElementById("viga")

laeBtn.addEventListener("click", () => {
  kasutajadDiv.innerHTML = "";
  vigaDiv.textContent = "";
  spinner.style.display = "block";

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      if (!response.ok) {
        throw new Error("Andmete  viga!");
      }
      return response.json();
    })
    .then(andmed => {
      spinner.style.display = "none";
      andmed.forEach(kasutaja => {
        const div = document.createElement("div");
        div.classList.add("kasutaja");
        div.innerHTML = `
          <strong>${kasutaja.name}</strong><br>
          Email: ${kasutaja.email}<br>
          Linn: ${kasutaja.address.city}
        `;
        kasutajadDiv.appendChild(div);
      });
    })
    .catch(err => {
      spinner.style.display = "none";
      vigaDiv.textContent = "Viga: " + err.message;
    });
});
