const API = {
  users: "https://jsonplaceholder.typicode.com/users",
  posts: "https://jsonplaceholder.typicode.com/posts"
};

let state = {
  users: [],
  posts: [],
  view: "users", 
  query: "",
  sort: ""
};

const elements = {
  mode: document.getElementById("mode"),
  search: document.getElementById("search"),
  sort: document.getElementById("sort"),
  loadBtn: document.getElementById("load"),
  spinner: document.getElementById("spinner"),
  results: document.getElementById("results"),
  error: document.getElementById("error")
};

elements.mode.addEventListener("change", () => {
  state.view = elements.mode.value;
  render();
});

elements.search.addEventListener("keyup", (e) => {
  state.query = (e.target.value || "").toLowerCase();
  render();
});

elements.sort.addEventListener("change", () => {
  state.sort = elements.sort.value;
  render();
});

elements.loadBtn.addEventListener("click", loadData);

async function loadData() {
  showError("");
  showSpinner(true);
  try {
    const [usersRes, postsRes] = await Promise.all([
      fetch(API.users),
      fetch(API.posts)
    ]);

    if (!usersRes.ok) throw new Error("Users HTTP " + usersRes.status);
    if (!postsRes.ok) throw new Error("Posts HTTP " + postsRes.status);

    state.users = await usersRes.json();
    state.posts = await postsRes.json();

    render();
  } catch (error) {
    showError("Load error: " + error.message);
  } finally {
    showSpinner(false);
  }
}

function render() {
  elements.results.innerHTML = "";

  let data = state.view === "users" ? state.users.slice() : state.posts.slice();

  if (state.query) {
    const q = state.query;
    data = data.filter((item) => {
      if (state.view === "users") {
        const name = (item && item.name ? String(item.name) : "").toLowerCase();
        return name.includes(q);
      } else {
        const title = (item && item.title ? String(item.title) : "").toLowerCase();
        return title.includes(q);
      }
    });
  }

  if (state.view === "users" && state.sort === "usersNameAZ") {
    data.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }
  if (state.view === "posts" && state.sort === "postsTitleLen") {
    data.sort((a, b) => (a.title ? a.title.length : 0) - (b.title ? b.title.length : 0));
  }

  if (!data.length) {
    elements.results.textContent = "No data";
    return;
  }

  data.forEach((item) => {
    const div = document.createElement("div");
    if (state.view === "users") {
      const name = item.name || "-";
      const email = item.email || "-";
      const city = item.address && item.address.city ? item.address.city : "-";
      const website = item.website || "-";
      div.textContent = `Name: ${name}, Email: ${email}, City: ${city}, Website: ${website}`;
    } else {
      const id = item.id != null ? item.id : "-";
      const title = item.title || "-";
      div.textContent = `Id: ${id}, Title: ${title}`;
    }
    elements.results.appendChild(div);
  });
}

function showSpinner(on) {
  elements.spinner.style.display = on ? "block" : "none";
}

function showError(msg) {
  elements.error.textContent = msg || "";
}
