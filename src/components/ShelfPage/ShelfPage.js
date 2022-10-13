import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';

function ShelfPage() {
  const [shelfList, setShelfList] = useState([]);

  const [newItem, setNewItem] = useState('');
  const [imagUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  }

  const addNewItem = (e) => {
    e.preventDefault();
    axios.post('/api/shelf', { description: newItem , image_url: imagUrl }).then(() => {
        fetchPets();
    }).catch((e) => {
        console.log(e);
        alert('something went wrong');
    })
}

const deleteItem = (itemId) => {
  axios.delete(`/api/shelf/${itemId}`).then(() =>{
    fetchPets();
  }).catch((e) => {
    console.log(e);
    alert('something went wrong in deleteItem');
  })
}

  return (
    <div className="container">

      
      <h2>Add Item</h2>
            <form onSubmit={addNewItem}>
                <input value={newItem} onChange={(e) => setNewItem(e.target.value)} type="text" />
                <input value={imagUrl} onChange={(e) => setImageUrl(e.target.value)} type="text" />

                <input type="submit" />
            </form>
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
                    <div className="gallery">
                        <img src={item.image_url} alt={item.description} />
                        <br />
                        <div className="desc">{item.description}</div>
                        <div style={{textAlign: 'center', padding: '5px'}}>
                          <button  style={{cursor: 'pointer'}} onClick={() => deleteItem(item.id)}>Delete</button>
                        </div>
                    </div>
                 </div>
        })
      }
      <div className="clearfix"></div>
    </div>
  );
}

export default ShelfPage;
