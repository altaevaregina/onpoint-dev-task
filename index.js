let previousClientXPostition = 0;
let currentClientXPostition = 0;
let isMouseDown = false;
let currentSlideId = 'slide1'; // 'slide1' | 'slide2' | 'slide3';

function init() {
    document.getElementById('slide2').style.display = 'none';
    document.getElementById('slide3').style.display = 'none';
}
init();

document.addEventListener('touchstart', function(event) {
    previousClientXPostition = event.touches[0].clientX;
    currentClientXPostition = event.touches[0].clientX;

    // Установка свойства, что мышь опущена
    isMouseDown = true;
});

document.addEventListener('touchend', function(event) {
    // Установка свойства transition для transform у текущего слайда
    let currentSlideElement = document.getElementById(currentSlideId);
    if (currentSlideElement) {
        currentSlideElement.style.transition = 'transform 0.5s ease-in-out';
    }

    // Переход на следующий слайд
    if (previousClientXPostition - currentClientXPostition > 0) {
        switch (currentSlideId) {
            case 'slide1':
                changeSlides('slide1', 'slide2', 'right');
                break;
            case 'slide2':
                changeSlides('slide2', 'slide3', 'right');
                break;
            case 'slide3':
                changeSlides('slide3', 'slide1', 'right');
                break;
            default:
                break;
        }
    }

    // Переход на предыдущий слайд
    if (previousClientXPostition - currentClientXPostition < 0) {
        switch (currentSlideId) {
            case 'slide1':
                changeSlides('slide1', 'slide3', 'left');
                break;
            case 'slide2':
                changeSlides('slide2', 'slide1', 'left');
                break;
            case 'slide3':
                changeSlides('slide3', 'slide2', 'left');
                break;
            default:
                break;
        }
    }

    // Установка свойства, что мышь поднята
    isMouseDown = false;
});

document.addEventListener('touchmove', function(event) {
    if (isMouseDown) {
        currentClientXPostition = event.touches[0].clientX;

        let currentSlideElement = document.getElementById(currentSlideId);
        if (currentSlideElement) {
            // Очистка свойства transition для того чтобы не было задержек при перетягивании слайда
            currentSlideElement.style.transition = '';
            currentSlideElement.style.transform = "translateX(" + (currentClientXPostition - previousClientXPostition) + "px)";
        }
    }
});


function changeSlides(slideIdForHide, slideIdForShow, direction) {
    let slideForShowElement = document.getElementById(slideIdForShow);
    let slideForHideElement = document.getElementById(slideIdForHide);
    if (slideForShowElement && slideForHideElement) {
        // directionClass  = 'transition-slide-to-left' или 'transition-slide-to-right'
        let directionClass;
        if (direction === 'left') {
            directionClass = `transition-slide-to-left`;
        } else if (direction === 'right') {
            directionClass = `transition-slide-to-right`;
        }
        slideForHideElement.classList.add(directionClass);

        setTimeout(() => {
            slideForShowElement.style.display = 'flex';
            slideForHideElement.style.display = 'none';

            slideForHideElement.classList.remove(directionClass);
            slideForHideElement.style.transform = '';
        }, 300);

        currentSlideId = slideIdForShow;
    }
}