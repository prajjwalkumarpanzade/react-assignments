import { useState } from "react";

const Home = () => {
  const [name, setName] = useState('Prajjwal'); 
  const [age, setAge] = useState(20);
  const handleClick = () => {
    setName('Prajjwalkumar');
    setAge(24)
  }
  const [blogs, setBlog] = useState([
    {title: 'My new website', body: 'lorem ipsum...', author: 'Prajjwal', id: 1},
    {title: 'Welcome party!', body: 'lorem ipsum...', author: 'Prajjwal', id: 2},
    {title: 'Web dev top tips', body: 'lorem ipsum...', author: 'Prajjwal', id: 3}
  ]);
  

  return (
    <div className = "home">
      <h2>Homepage</h2>
      <p>Welcome to my blog</p>
      <p>{name}</p>
      <p>{age}</p>
      <br></br>
      <button onClick={handleClick}>Click me</button>
      <div>
        {blogs.map((blog) => (
          <div className="blog-preview">
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
            <p>{blog.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;