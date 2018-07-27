import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAlbums } from '../actions';
import Loader from './Loader';
import { Link } from 'react-router-dom';

class Albums extends Component {
  componentDidMount() {
    this.props.fetchAlbums();
  }

  render() {
    const { loading, albums } = this.props;

    if (loading) {
      return <Loader />;
    }

    return (
      <div id="albums">
        {albums.map(a => {
          const albumCover = `https://farm${a.farm}.staticflickr.com/${
            a.server
          }/${a.primary}_${a.secret}.jpg`;
          return (
            <Link key={a.id} to={`/albums/${a.id}`} className="album-link">
              <div
                style={{
                  backgroundSize: 'cover',
                  backgroundImage: `url(${albumCover})`,
                  height: '200px',
                  width: '300px'
                }}>
                <h1>{a.title._content}</h1>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default connect(
  state => ({
    albums: state.albums.albums,
    loading: state.albums.loading
  }),
  { fetchAlbums }
)(Albums);
