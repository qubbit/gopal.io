'use strict';

var canvas;
var gallery;

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

  if (W < 1200) {
    var i_w = W / columns - m * 3;
    applyStyle('#canvas', {
      width: `${W - m * 2}px`,
      paddingLeft: `${m}px`,
      paddingRight: `${m}px`
    });
    applyStyle('.image-container', { width: `${i_w}px` });
  } else {
    var i_w = CANVAS_WIDTH / columns - 2 * m;
    applyStyle('#canvas', { width: `${CANVAS_WIDTH}px` });
    applyStyle('.image-container', { width: `${i_w}px` });
  }
}

window.onresize = fixOnResize;

function buildImageThumbnail(i) {
  var container = $n('div');
  container.classList.add('image-container');

  var anchor = $n('a');
  anchor.href = i.url_l;
  anchor.classList.add('glightbox');

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

  // sample photoset id = 72157656845052880
  // sample ns id = 66956608@N06
  // my photoset id = 72157627479811709
  // my ns id = 66601325@N05

  fetch(
    'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&name=value&api_key=53259c75c76adda4e869ecac9a069d94&user_id=66956608@N06&continuation=0&short_limit=1&photoset_id=72157656845052880&extras=url_l,url_m&format=json&nojsoncallback=1'
  )
    .then(response => response.json())
    .then(function(body) {
      var photoset = body.photoset;
      var title = $n('h2');
      title.innerText = photoset.title;
      canvas.insertBefore(title, gallery);

      var photos = photoset.photo;
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
