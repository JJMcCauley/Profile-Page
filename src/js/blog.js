const apiKey = process.env.API_KEY; // Replace this with your actual Google API key

async function getBlog() {
  try {
    // Construct the API endpoint with the blog URL and API key
    const apiUrl = `https://www.googleapis.com/blogger/v3/blogs/byurl?url=${encodeURIComponent(
      "https://jackmccauley.blogspot.com/2023/07/test.html"
    )}&key=${apiKey}`;

    // Make the HTTP GET request to fetch blog information
    const response = await fetch(apiUrl);
    const blogData = await response.json();

    // Extract the blog ID from the blog data
    const blogId = blogData.id;

    // Make a new request to fetch blog posts using the blog ID, sorted by published date in descending order
    const postsUrl = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&orderBy=published&sortOrder=desc`;

    // Make the HTTP GET request to fetch blog posts
    const postsResponse = await fetch(postsUrl);
    const postsData = await postsResponse.json();

    // Process the blog posts data
    return postsData.items;
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error("Error:", error);
    return []; // Return an empty array to signify an error or no data
  }
}

// Call the function using async/await or handle the promise
async function fetchData() {
  try {
    const blogs = await getBlog();
    postBlogs(blogs);
    // Do something with the blog posts here
  } catch (error) {
    console.error("Error:", error);
  }
}

function postBlogs(blogs) {
  for (let i = 0; i < 3; i++) {
    if (blogs[i]) {
      const blog__heading = document.querySelector(
        `#blog${i + 1} .blog__title`
      );
      const blog__text = document.querySelector(`#blog${i + 1} .blog__content`);
      const blog__link = document.querySelector(`#blog${i + 1} .blog__link`);
      blog__heading.innerHTML = `<h2>${blogs[i].title}</h2>`;
      blog__text.innerHTML = blogs[i].content;
      blog__link.innerHTML = `<a href="${blogs[i].url}">Blogger Link</a>`;
    }
  }
  console.log(blogs);
}

fetchData();

console.log("hi!");
