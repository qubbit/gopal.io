'use strict';

var canvas;
var gallery;
var spinner;

var $n = document.createElement.bind(document);
var $i = document.getElementById.bind(document);
var $qa = document.querySelectorAll.bind(document);
var $qs = document.querySelector.bind(document);

function applyStyle(selector, style) {
  var nodes = $qa(selector);

  for (var i = 0; i < nodes.length; i++) {
    for (var prop in style) {
      if (style.hasOwnProperty(prop)) {
        nodes[i].style[prop] = style[prop];
      }
    }
  }
}

var CANVAS_WIDTH = 1200;

function getColumns(W) {
  if (W > 900) return 3;
  if (W < 900 && W > 400) return 2;
  if (W <= 400) return 1;
}

function fixOnResize() {
  var W = window.innerWidth;
  var m = 15;
  var columns = getColumns(W);
  var i_w = W / columns - m * 3;

  if (W < 1200) {
    applyStyle('#canvas', {
      width: `${W - m * 2}px`,
      paddingLeft: `${m}px`,
      paddingRight: `${m}px`
    });
  } else {
    i_w = CANVAS_WIDTH / columns - 2 * m;
    applyStyle('#canvas', { width: `${CANVAS_WIDTH}px` });
  }
  applyStyle('.image-container', { width: `${i_w}px` });
}

window.onresize = fixOnResize;

function buildImageThumbnail(i) {
  var container = $n('div');
  container.classList.add('image-container');

  var anchor = $n('a');
  anchor.href = i.url_l;
  anchor.classList.add('glightbox');
  anchor.dataset['description'] = i.description._content;

  var img = $n('img');
  img.classList.add('image-thumb');
  img.src = i.url_m;

  anchor.appendChild(img);

  container.appendChild(anchor);
  return container;
}
window.onload = function() {
  canvas = $i('canvas');
  gallery = $i('gallery');
  spinner = $i('spinner');

  fetch(
    'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&name=value&api_key=53259c75c76adda4e869ecac9a069d94&user_id=66601325@N05&continuation=0&short_limit=1&photoset_id=72157671514742408&extras=description,date_taken,url_l,url_m&format=json&nojsoncallback=1'
  )
    .then(response => response.json())
    .then(function(body) {
      spinner.style.display = 'none';

      var ps = body.photoset;
      var flickrAlbumUrl = `https://www.flickr.com/photos/${ps.owner}/sets/${
        ps.id
      }`;

      var albumHeader = $n('div');
      albumHeader.classList.add('album-header');
      albumHeader.innerHTML = `<h2>${
        ps.title
      }</h2><span><a class='link' href='${flickrAlbumUrl}'>View on Flickr</a></span>`;
      canvas.insertBefore(albumHeader, gallery);

      var photos = ps.photo;
      photos.forEach(function(p) {
        var imageElement = buildImageThumbnail(p);
        gallery.appendChild(imageElement);
      });
    })
    .then(function() {
      fixOnResize();
      var myLightbox = GLightbox({
        selector: 'glightbox'
      });
    });
};
