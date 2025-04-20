document.getElementById('blogForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
  
    const post = {
      title,
      content,
      date: new Date().toLocaleString()
    };
  
    let posts = JSON.parse(localStorage.getItem('blogs')) || [];
    posts.unshift(post);
    localStorage.setItem('blogs', JSON.stringify(posts));
  
    displayPosts();
    this.reset();
  });
  
  function displayPosts() {
    const posts = JSON.parse(localStorage.getItem('blogs')) || [];
    const blogContainer = document.getElementById('blogPosts');
    blogContainer.innerHTML = '';
  
    posts.forEach(post => {
      const postEl = document.createElement('div');
      postEl.className = 'blog-post';
      postEl.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>Posted on: ${post.date}</small>
      `;
      blogContainer.appendChild(postEl);
    });
  }
  
  window.onload = displayPosts;
  