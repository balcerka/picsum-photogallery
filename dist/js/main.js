// API Endpoint Url
var picsumApi = 'https://picsum.photos/list';
// Collection of downloaded photos
var photos = [];
// Single photo url template
var photoSrc = 'https://picsum.photos/300/300?image=[id]';
// Current offset of diplayed photos
var currentOffset = 0;
// Number of photos per page
var photosPerPage = 3;
// Button class
var nextButtonClass = '.next-btn';

$(document).ready(function () {

    $.getJSON(picsumApi, fetchPhotos);

    $(nextButtonClass).click(loadNextPage);

});

function fetchPhotos(data) {

    photos = data;

    displayPhotos();
    showNextBtn();

}

function displayPhotos() {

    for (var i = currentOffset; i < (currentOffset + photosPerPage); i++) {

        var template = $('#photo-template').html();
        var photo = photos[i];

        template = template.replace('[image]', photoSrc.replace('[id]', photo.id));
        template = template.replace('[authorUrl]', photo.author_url);
        template = template.replace('[author]', photo.author);

        $('.container').append(template);
    }

    currentOffset += photosPerPage;
}

function showNextBtn() {

    $(nextButtonClass).fadeIn('slow');

}

function loadNextPage() {

    $('.photo').remove();
    displayPhotos();

}
