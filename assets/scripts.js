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
        if(index === 0){navigatorElement.classList.add('indicator-selected');}
        navigatorContainer.appendChild(navigatorElement);
    });
  })
  .catch(error => {
    console.error("Une erreur s'est produite lors du chargement du fichier JSON:", error);
  });
}

const indicatorSelection = (indicatorIndex) => {
  Array.from(document.querySelectorAll('.indicator')).forEach((element,index) => {
      element.classList.remove('indicator-selected');
      if(index === indicatorIndex){element.classList.add('indicator-selected');
    }
  });
}

const slide = (direction) => {
  fetch('./assets/images.json')
    .then(response => response.json())
    .then(imagesData => {
        const slidesImages = imagesData.slider;
        console.log(slidesImages);
        currentSlide = currentSlide + direction;

        if(currentSlide === -1){
            currentSlide = nbSlides;
        } else if(currentSlide > nbSlides){
            currentSlide = 0;
        }
        
        document.querySelector('.slide__img').setAttribute('src', slidesImages[currentSlide].image);

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
          const action = button.getAttribute("data-action");
          if (action === "prev") {
              slide(-1);
          } else if (action === "next") {
              slide(1);
          }
      });
  });
})

indicatorCreation()



