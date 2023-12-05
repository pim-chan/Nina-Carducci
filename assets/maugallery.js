const galleryImagesData = () => {
  fetch('./assets/images.json')
    .then(res => res.json())
    .then(data => {
      createFilterButtons(data);
      getProjects(data);
    });
}

const getProjects = (data) => {
  const dataGalleryImages = data.gallery;
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  
  dataGalleryImages.forEach((element) => {
    const projet = document.createElement('picture');
    projet.classList.add('gallery-projet');
    projet.setAttribute('data-project-id', element.id);
    
    const imgElement = document.createElement('img');
    imgElement.src = element.image;
    imgElement.alt = element.textAlt;
    imgElement.classList.add("projet-img");
    imgElement.addEventListener('click', () => {
      openLightBox(element.image);
    });
    projet.appendChild(imgElement);
    gallery.appendChild(projet);
  });
}

// Création boutons de filtres par catégorie 
const createFilterButtons = (data) => {
  const categoriesSet = new Set();

  data.gallery.forEach(projet => {
    categoriesSet.add(projet.category);
  });

  const uniqueCategories = Array.from(categoriesSet);
  uniqueCategories.unshift("Tous");

  uniqueCategories.forEach((category) => {
    const button = document.createElement('button');
    button.innerText = category;
    button.classList.add("nav-link");

    // Afficher les éléments par catégorie
    button.addEventListener('click', () => {
      categorySelection(button);
      const filteredData = data.gallery.filter(element => category === "Tous" || element.category === category);
      getProjects({ gallery: filteredData });
    });

    const filterButtonsContainer = document.querySelector('.nav-links-container');
    filterButtonsContainer.appendChild(button);

    const initialButton = document.querySelector('.nav-link');
    if (initialButton) {
      categorySelection(initialButton);
    }
  });
}

const categorySelection = (selectedCategory) => {
  Array.from(document.querySelectorAll('.nav-link')).forEach((element) => {
    element.classList.remove('nav-link-active');
  });

  selectedCategory.classList.add('nav-link-active');
}

galleryImagesData();

// LIGHTBOX
const lightbox= document.querySelector('.lightbox');
const lightboxOverlay= document.querySelector('.lightbox-overlay');
const currentLightboxImage = document.querySelector('.lightbox-img');
const prevArrow = document.querySelector('.arrow-prev');
const nextArrow = document.querySelector('.arrow-next');

const openLightBox = (imageUrl) => {
  currentLightboxImage.src = imageUrl;
  lightbox.classList.add('lightbox-open');
}

let currentImageIndex = 0;

const navigateLightbox = (direction) => {
    fetch('./assets/images.json')
      .then(res => res.json())
      .then(data => {
 
  const lightboxImages = data.gallery.filter(element => element.image);
  
  currentImageIndex += direction;
  
  if (currentImageIndex < 0) {
    currentImageIndex = lightboxImages.length - 1;
  } else if (currentImageIndex >= lightboxImages.length) {
    currentImageIndex = 0;
  }
  
  currentLightboxImage.src = lightboxImages[currentImageIndex].image;
})};

prevArrow.addEventListener('click', () => {
  navigateLightbox(-1);
});

nextArrow.addEventListener('click', () => {
  navigateLightbox(1);
});

const closeLightbox = () => {
    lightboxOverlay.addEventListener('click', () => {
    lightbox.classList.remove('lightbox-open');
})};

lightbox.addEventListener('click', () => {
  closeLightbox();
});









 
  