var canvas;
var gallery;

var $n = document.createElement.bind(document);
var $q = document.getElementById.bind(document);

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
  canvas = $q('canvas');
  gallery = $q('gallery');

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
      var myLightbox = GLightbox({
        selector: 'glightbox'
      });
    });
};
