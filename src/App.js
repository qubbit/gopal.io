import React, { Component } from 'react';
import Albums from './components/Albums';
import AlbumPhotos from './components/AlbumPhotos';
import './styles/main.css';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div id="canvas">
        <header>
          <a href="/">
            <h1 logo="logo">
              <span className="first-name">Gopal</span> Adhikari
            </h1>
          </a>
          <small>Software Developer | Not A Photographer</small>
        </header>
        <Route path="/" component={Albums} exact />
        <Route path="/albums/:id" component={AlbumPhotos} exact />
        <footer>
          &copy; Gopal Adhikari 2018. Photos powered by Flickr
        </footer>
      </div>
    );
  }
}

export default App;
