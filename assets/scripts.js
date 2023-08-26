// CAROUSEL
let currentSlide = 0;
let nbSlides;

const apiDataImage = async () => {
  let data = '';
  const apiRest = await fetch('./assets/images.json')
  .then(response => response.json())
  .then(imagesData => {
    data = imagesData.slider;
  })
  .catch(error => {
    console.error("Une erreur s'est produite lors du chargement du fichier JSON:", error);
  });

  return data;
}

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
  const slidesImages = apiDataImage();
  const indicators = document.querySelectorAll('.indicator');
  Array.from(document.querySelectorAll('.indicator')).forEach((button,index) => {
      button.classList.remove('indicator-selected');
      if(index === indicatorIndex){
        button.classList.add('indicator-selected');
      }
  });
  /* On parcours l'ensemble des indicator */
  indicators.forEach((button, index) => {
      /* On ecoute l'ensemble des  au click */
    button.addEventListener("click", (event) => {
      console.log('Event click indicator', index);

      indicators.forEach(button => {
        button.classList.remove('indicator-selected');
      });

      slide(index);

      button.classList.add('indicator-selected');
    });
  });
}

const slide = async (indexSlide) => {
  const slidesImages = await apiDataImage();
  const slideImage = document.querySelector('.slides > img');
  slideImage.classList.add('slide-transition'); 
  slideImage.setAttribute('src', slidesImages[indexSlide].image);
  slideImage.setAttribute('alt', "photo de " + slidesImages[indexSlide].title);
};

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

  const autoSlide = async () => {
    currentSlide = currentSlide + 1;
    if (currentSlide === -1) {
      currentSlide = nbSlides;
    }else if (currentSlide > nbSlides) {
      currentSlide = 0;
    }
    slide(currentSlide);
    indicatorSelection(currentSlide);
    setTimeout(autoSlide, 4000); 
  };

  indicatorCreation();
  setTimeout(autoSlide, 4000);
});













