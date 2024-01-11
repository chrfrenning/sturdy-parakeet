// script.js
document.addEventListener('DOMContentLoaded', function() {
    let currentPhotoIndex = 0;

    const photos = [
        "./img/pexels-photo-1028225.jpg",
        "./img/pexels-photo-1547813.jpg",
        "./img/pexels-photo-1770809.jpg",
        "./img/pexels-photo-1820563.jpg",
        "./img/pexels-photo-2086622.jpg",
        "./img/pexels-photo-3225517.jpg"
    ];
    
    const photoContainer = document.getElementById('photoContainer');
    const currentPhoto = document.getElementById('currentPhoto');

    function changePhoto(newIndex) {
        currentPhotoIndex = newIndex;
        if (currentPhotoIndex < 0) currentPhotoIndex = photos.length - 1;
        if ( currentPhotoIndex > photos.length - 1) currentPhotoIndex = 0;

        currentPhoto.src = photos[currentPhotoIndex];
    }

    document.getElementById('nextBtn').addEventListener('click', function() {
        changePhoto(currentPhotoIndex + 1);
    });

    document.getElementById('prevBtn').addEventListener('click', function() {
        changePhoto(currentPhotoIndex - 1);
    });

    let touchstartX = 0;
    let touchendX = 0;

    function handleGesture() {
        if (touchendX < touchstartX) changePhoto(currentPhotoIndex + 1);
        if (touchendX > touchstartX) changePhoto(currentPhotoIndex - 1);
    }

    photoContainer.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    });

    photoContainer.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleGesture();
    });
    
    document.getElementById('heartBtn').addEventListener('click', function() {
        this.classList.add('animate__heartBeat');
        
        document.getElementById('heart').classList.toggle('fas');
    });

    document.getElementById('heartBtn').addEventListener('animationend', function() {
        this.classList.remove('animate__heartBeat');
    });

});