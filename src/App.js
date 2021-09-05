import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Albums from './Albums';

const ALBUMSLIST_URL = "https://jsonplaceholder.typicode.com/albums";

function App() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const getAlbumList = async () => {
      let { data: albumList } = await axios.get(ALBUMSLIST_URL);
      setAlbums(albumList);
    }
    getAlbumList();
  }, []);

  return (
    <div className="App">
      {albums && 
      albums.length > 0 && albums.map(album =>
        <div
          style={{ "padding": "10px", "margin": "10px 20%" }}>
          <Albums info={album}/>
        </div>)
        }
    </div>
  );

}

export default App;
