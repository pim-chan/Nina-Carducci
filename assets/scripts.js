// CAROUSEL
let currentSlide = 0;
let nbSlides;

const indicatorCreation = () => {
    fetch('./assets/images.json')
    .then(response => response.json())
    .then(imagesData => {
        nbSlides = imagesData.slider.length -1;

        imagesData.slider.forEach((image, index) => { 
        const navigatorContainer = document.querySelector(".indicators-container")
        const navigatorElement = document.createElement('button');
        navigatorElement.classList.add('indicator')
        navigatorElement.dataset.slideIndex = index;
        if(index === 0){
          navigatorElement.classList.add('indicator-selected');
        }
        navigatorContainer.appendChild(navigatorElement);
    });
  })
  .catch(error => {
    console.error("Une erreur s'est produite lors du chargement du fichier JSON:", error);
  });
}

const indicatorSelection = (indicatorIndex) => {
  Array.from(document.querySelectorAll('.indicator')).forEach((button,index) => {
    // button.addEventListener("click", () => {

    // })
      button.classList.remove('indicator-selected');
      if(index === indicatorIndex){
        button.classList.add('indicator-selected');
      }
  });
}

const slide = (direction) => {
  fetch('./assets/images.json')
    .then(response => response.json())
    .then(imagesData => {
        const slidesImages = imagesData.slider;
        currentSlide = currentSlide + direction;

        if(currentSlide === -1){
            currentSlide = nbSlides;
        } else if(currentSlide > nbSlides){
            currentSlide = 0;
        }
        
        const slideImage = document.querySelector('.slide__img');
        slideImage.setAttribute('src', slidesImages[currentSlide].image);
        slideImage.setAttribute('alt', "photo de " + slidesImages[currentSlide].title);
        // slideImage.style.transform = 'translateX(-' + currentSlide * 100 + '%)';
        // slideImage.classList.add('slide-transition');

        indicatorSelection(currentSlide);
  })
  .catch(error => {
    console.error("Une erreur s'est produite lors du chargement du fichier JSON:", error);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const svgButtons = document.querySelectorAll("svg[data-action]");

  svgButtons.forEach(button => {
      button.addEventListener("click", () => {
        // clearInterval(autoSlideInterval);
          const action = button.getAttribute("data-action");
          if (action === "prev") {
              slide(-1);
          } else if (action === "next") {
              slide(1);
          }
      });
  });

  // setInterval(() => {
  //   slide(1); 
  // }, 4000); 

  indicatorCreation();
});










