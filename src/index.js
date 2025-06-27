const BASE_URL = "http://localhost:3000/posts";

function displayPosts() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById("post-list");
      postList.innerHTML = "<h2>All Posts</h2>"; // reset

      posts.forEach(post => {
        const div = document.createElement("div");
        div.textContent = post.title;
        div.style.cursor = "pointer";
        div.style.margin = "0.5rem 0";
        div.addEventListener("click", () => handlePostClick(post.id));
        postList.appendChild(div);
      });
    });
}

function handlePostClick(id) {
  fetch(`${BASE_URL}/${id}`)
    .then(res => res.json())
    .then(post => {
      const detail = document.getElementById("post-detail");
      detail.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p><em>By ${post.author}</em></p>
      `;
    });
}

function addNewPostListener() {
  const form = document.getElementById("new-post-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newPost = {
      title: form.title.value,
      content: form.content.value,
      author: form.author.value
    };

    const postList = document.getElementById("post-list");
    const div = document.createElement("div");
    div.textContent = newPost.title;
    div.style.cursor = "pointer";
    div.style.margin = "0.5rem 0";
    div.addEventListener("click", () => {
      const detail = document.getElementById("post-detail");
      detail.innerHTML = `
        <h2>${newPost.title}</h2>
        <p>${newPost.content}</p>
        <p><em>By ${newPost.author}</em></p>
      `;
    });
    postList.appendChild(div);

    form.reset();
  });
}

function main() {
  displayPosts();
  addNewPostListener();
}

document.addEventListener("DOMContentLoaded", main);
