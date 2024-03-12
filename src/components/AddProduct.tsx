import {useState} from 'react';

const AddProduct = () => {  
  const [title, setTitle] = useState('');
  const [catogery, setCatogery] = useState('');
  const [image, setImage] = useState('');
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target;
    switch(name){
      case 'title':
        setTitle(value);
        break;
      case 'catogery':
        setCatogery(value);
        break;
      case 'image':
        setImage(value);
        break;
    }

  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(title, catogery, image);
  }
  return (
    <div>
      <form>
        <div>
          <input type="text" name='title' placeholder="Name" value={title} onChange={handleOnChange} />
        </div>
        <div>
          <input type="text" name = "catogery" placeholder="Catogery" value={catogery} onChange={handleOnChange} />
        </div>
        <div>
          <input type="text" name = "image" placeholder="Image" value={image} onChange={handleOnChange} />
        </div>
        
        <button type = "submit" onClick={handleSubmit}>Submit</button>
      </form>
      
    </div>
  );
}

export default AddProduct;