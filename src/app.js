// script.js
document.addEventListener('DOMContentLoaded', function () {

    /* List of photos and hearts */

    let currentPhotoIndex = 0;
    photos = [];
    hearts = new Array(1).fill(false);
    const photoContainer = document.getElementById('main-content');



    /* Load photos from photos.json */

    fetch('photos.json')
        .then(response => response.json())
        .then(data => {
            photos = data.photos;
            hearts = new Array(photos.length).fill(false);

            currentPhotoIndex = 0;
            changePhoto(0);
        })
        .catch(error => {
            console.error('Error loading photos:', error);
        });



    /* Move to next/previous photo */

    function changePhoto(newIndex) {
        currentPhotoIndex = newIndex;
        if (currentPhotoIndex < 0) currentPhotoIndex = photos.length - 1;
        if (currentPhotoIndex > photos.length - 1) currentPhotoIndex = 0;

        displayHeart();

        photoContainer.style.setProperty('--animate-duration', '0.3s');
        photoContainer.classList.add('animate__animated', 'animate__fadeOut');

        photoContainer.addEventListener('animationend', function () {
            photoContainer.classList.remove('animate__animated', 'animate__fadeOut');

            photoContainer.classList.add('animate__animated', 'animate__fadeIn');

            document.getElementById('main-content').style.backgroundImage = `url(${photos[currentPhotoIndex]})`;

            photoContainer.addEventListener('animationend', function () {
                photoContainer.classList.remove('animate__animated', 'animate__fadeIn');
            }, { once: true });
        }, { once: true });
    }



    /* Next and previous buttons */

    document.getElementById('nextBtn').addEventListener('click', function () {
        changePhoto(currentPhotoIndex + 1);
    });

    document.getElementById('prevBtn').addEventListener('click', function () {
        changePhoto(currentPhotoIndex - 1);
    });



    /* Hearts */

    heartBtn = document.getElementById('heartBtn');

    heartBtn.addEventListener('click', function () {
        this.classList.add('animate__heartBeat');

        hearts[currentPhotoIndex] = !hearts[currentPhotoIndex];
        displayHeart();
    });

    function displayHeart() {
        if (hearts[currentPhotoIndex]) {
            document.getElementById('heart').classList.add('fas');
            document.getElementById('heart').style.color = 'red';
        }
        else {
            document.getElementById('heart').classList.remove('fas');
            document.getElementById('heart').style.color = 'black';
        }
    }

    document.getElementById('heartBtn').addEventListener('animationend', function () {
        this.classList.remove('animate__heartBeat');
    });



    /* Save photo to phone */

    saveBtn = document.getElementById('saveBtn');

    saveBtn.addEventListener('click', function () {
        var element = document.createElement('a');
        element.setAttribute('href', photos[currentPhotoIndex]);
        element.setAttribute('download', 'image.jpg');
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });



    /* Handling swipe gestures */

    const body = document.getElementById('body');

    let touchstartX = 0;
    let touchendX = 0;

    function handleGesture() {
        if (touchendX < touchstartX) changePhoto(currentPhotoIndex + 1);
        if (touchendX > touchstartX) changePhoto(currentPhotoIndex - 1);
    }

    body.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    });

    body.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleGesture();
    });



});