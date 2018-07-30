import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAlbumPhotos } from '../actions';
import Loader from './Loader';
import Gallery from 'react-photo-gallery';
import Measure from 'react-measure';
import Lightbox from 'react-images';

class AlbumPhotos extends Component {
  componentDidMount() {
    const params = { photoset_id: this.props.match.params.id };
    this.props.fetchAlbumPhotos(params);
  }

  constructor() {
    super();
    this.state = { width: -1, currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }

  render() {
    const { loading, album, photos } = this.props;
    const width = this.state.width;

    if (loading) {
      return <Loader />;
    }
    var flickrAlbumUrl = `https://www.flickr.com/photos/${album.owner}/sets/${
      album.id
    }`;

    var ps = photos.map(p => ({
      caption: p.description._content,
      width: parseInt(p.width_m, 10),
      height: parseInt(p.height_m, 10),
      src: p.url_m,
      srcSet: [
        `${p.url_m} ${p.width_m}w`,
        `${p.url_c} ${p.width_c}w`,
        `${p.url_l} ${p.width_l}w`,
        `${p.url_h} ${p.width_h}w`
      ]
    }));

    return (
      <Measure
        bounds
        onResize={contentRect =>
          this.setState({ width: contentRect.bounds.width })
        }
      >
        {({ measureRef }) => {
          if (width < 1) {
            return <div ref={measureRef} />;
          }
          let columns = 1;
          if (width >= 480) {
            columns = 2;
          }
          if (width >= 1024) {
            columns = 3;
          }
          if (width >= 1824) {
            columns = 4;
          }
          return (
            <div ref={measureRef}>
              <button onClick={() => this.props.history.goBack()}>
                ← Back
              </button>
              <div className="album-title">
                <h2>{album.title}</h2>
                <a className="link" href={flickrAlbumUrl}>
                  View on Flickr
                </a>
              </div>
              <Gallery
                photos={ps}
                columns={columns}
                onClick={this.openLightbox}
              />
              <Lightbox
                images={ps}
                onClose={this.closeLightbox}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                currentImage={this.state.currentImage}
                isOpen={this.state.lightboxIsOpen}
              />
            </div>
          );
        }}
      </Measure>
    );
  }
}

export default connect(
  state => ({
    photos: state.photos.photos,
    album: state.photos.album,
    loading: state.photos.loading
  }),
  { fetchAlbumPhotos }
)(AlbumPhotos);
