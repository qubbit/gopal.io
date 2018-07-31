import React, { Component } from 'react';
import Albums from './components/Albums';
import AlbumPhotos from './components/AlbumPhotos';
import './styles/main.css';
import { Route } from 'react-router-dom';

class App extends Component {
  changeTheme(theme) {
    this.mainRef.classList = [theme];
    localStorage.setItem('theme', theme);
  }

  render() {
    return (
      <div
        id="main"
        className={localStorage.getItem('theme') || 'light'}
        ref={ref => (this.mainRef = ref)}
      >
        <div className="text-right theme-changer">
          <button onClick={() => this.changeTheme('light')}>Light</button>
          <button onClick={() => this.changeTheme('dark')}>Dark</button>
        </div>
        <div id="canvas">
          <header>
            <div className="masthead">
              <a className="home-link" href="/">
                <h1 id="logo">
                  <span className="first-name">Gopal</span> Adhikari
                </h1>
              </a>
              <small>Software Developer | Not A Photographer</small>
            </div>
          </header>
          <Route path="/" component={Albums} exact />
          <Route path="/albums/:id" component={AlbumPhotos} exact />
          <footer>&copy; Gopal Adhikari 2018. Photos powered by Flickr</footer>
        </div>
      </div>
    );
  }
}

export default App;
