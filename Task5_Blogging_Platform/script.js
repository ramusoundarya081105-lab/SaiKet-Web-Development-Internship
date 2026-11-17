const blogForm = document.getElementById("blogForm");
const blogTitle = document.getElementById("blogTitle");
const blogAuthor = document.getElementById("blogAuthor");
const blogCategory = document.getElementById("blogCategory");
const blogContent = document.getElementById("blogContent");

const blogContainer = document.getElementById("blogContainer");
const emptyMessage = document.getElementById("emptyMessage");
const publishBtn = document.getElementById("publishBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

// Load saved blogs
let blogs = JSON.parse(localStorage.getItem("myBlogs")) || [];

let editBlogId = null;

// Save blogs to browser storage
function saveBlogs() {
  localStorage.setItem("myBlogs", JSON.stringify(blogs));
}

// Publish or Update Blog
blogForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = blogTitle.value.trim();
  const author = blogAuthor.value.trim();
  const category = blogCategory.value;
  const content = blogContent.value.trim();

  if (!title || !author || !category || !content) {
    alert("Please fill all fields!");
    return;
  }

  if (editBlogId !== null) {
    // Update existing blog
    const blog = blogs.find((item) => item.id === editBlogId);

    if (blog) {
      blog.title = title;
      blog.author = author;
      blog.category = category;
      blog.content = content;
    }

    alert("Blog updated successfully!");
  } else {
    // Create new blog
    const newBlog = {
      id: Date.now() + Math.random(),
      title: title,
      author: author,
      category: category,
      content: content,
      date: new Date().toLocaleDateString(),
    };

    blogs.unshift(newBlog);
    alert("Blog published successfully!");
  }

  saveBlogs();
  resetForm();
  displayBlogs();
});

// Display all blogs
function displayBlogs() {
  blogContainer.innerHTML = "";

  emptyMessage.style.display = blogs.length === 0 ? "block" : "none";

  blogs.forEach(function (blog) {
    const card = document.createElement("div");
    card.className = "blog-card";

    const title = document.createElement("h3");
    title.textContent = blog.title;

    const meta = document.createElement("p");
    meta.className = "blog-meta";
    meta.textContent =
      "By " + blog.author + " | " + blog.category + " | " + blog.date;

    const content = document.createElement("p");
    content.className = "blog-content";
    content.textContent = blog.content;

    const actions = document.createElement("div");
    actions.className = "blog-actions";

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", function () {
      editBlog(blog.id);
    });

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
      deleteBlog(blog.id);
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(content);
    card.appendChild(actions);

    blogContainer.appendChild(card);
  });
}

// Edit Blog
function editBlog(id) {
  const blog = blogs.find((item) => item.id === id);

  if (!blog) {
    return;
  }

  blogTitle.value = blog.title;
  blogAuthor.value = blog.author;
  blogCategory.value = blog.category;
  blogContent.value = blog.content;

  editBlogId = id;

  publishBtn.textContent = "Update Blog";
  cancelEditBtn.style.display = "block";

  document.getElementById("create-post").scrollIntoView({ behavior: "smooth" });
}

// Delete Blog
function deleteBlog(id) {
  const confirmDelete = confirm("Are you sure you want to delete this blog?");

  if (confirmDelete) {
    blogs = blogs.filter((item) => item.id !== id);

    saveBlogs();

    if (editBlogId === id) {
      resetForm();
    }

    displayBlogs();
  }
}

// Reset Form
function resetForm() {
  blogForm.reset();
  editBlogId = null;

  publishBtn.textContent = "Publish Blog";
  cancelEditBtn.style.display = "none";
}

// Cancel Editing
cancelEditBtn.addEventListener("click", resetForm);

// Display saved blogs when page loads
displayBlogs();
