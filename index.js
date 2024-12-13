const search = document.querySelector("#search");
const total = document.querySelector("#total");
const display = document.querySelector("#display");

const title = document.querySelector("#title");
const desc = document.querySelector("#desc");
const addBtn = document.querySelector("#add");

let totalNote = 0;

addBtn.addEventListener("click", () => {
  axios
    .post("https://crudcrud.com/api/bb9bd257d23e4206a1006bfbc240b1e0/todo/", {
      title: title.value,
      desc: desc.value,
    })
    .then(() => {
      fetchData();
    })
    .catch((err) => {
      console.log(err);
    });
});

function fetchData() {
  axios
    .get("https://crudcrud.com/api/bb9bd257d23e4206a1006bfbc240b1e0/todo/")
    .then((re) => {
      let data = re.data;
      totalNote = data.length;

      total.innerHTML = totalNote;
      display.innerHTML = totalNote; // Initially display all notes

      renderNotes(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderNotes(data) {
  let cluster = "";
  data.forEach((item) => {
    cluster += `
      <li>
        <h1>${item.title}</h1>
        <p>${item.desc}</p>
        <button class="${item._id}" id="delete">Delete</button>
      </li>
    `;
  });
  document.querySelector("ul").innerHTML = cluster;
}

fetchData();

document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    axios
      .delete(
        `https://crudcrud.com/api/bb9bd257d23e4206a1006bfbc240b1e0/todo/${e.target.className}`
      )
      .then(() => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// Search Functionality
search.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();

  axios
    .get("https://crudcrud.com/api/bb9bd257d23e4206a1006bfbc240b1e0/todo/")
    .then((re) => {
      let filteredData = re.data.filter((item) =>
        item.title.toLowerCase().includes(query)
      );

      display.innerHTML = filteredData.length; // Update display count
      renderNotes(filteredData); // Render filtered notes
    })
    .catch((err) => {
      console.log(err);
    });
});
