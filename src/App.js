import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://blog-backend-mkv9.onrender.com";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/posts`)
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  const addPost = () => {
    axios.post(`${API_URL}/posts`, { title, content })
      .then(response => setPosts([...posts, response.data]))
      .catch(error => console.error(error));
  };

  const deletePost = (id) => {
    axios.delete(`${API_URL}/posts/${id}`)
      .then(() => setPosts(posts.filter(post => post._id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Simple Blog</h1>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Content" onChange={e => setContent(e.target.value)} />
      <button onClick={addPost}>Add Post</button>

      <h2>All Posts</h2>
      {posts.map(post => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => deletePost(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
