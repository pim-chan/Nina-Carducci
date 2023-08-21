const galleryImagesData = () => {
  fetch('./assets/images.json')
    .then(res => res.json())
    .then(data => {
      createFilterButtons(data);
      getProjects(data);
    });
}

// Afficher les projets dans la galerie
const getProjects = (data) => {
  const dataGalleryImages = data.gallery;
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  
  dataGalleryImages.forEach((element) => {
    const projet = document.createElement('figure');
    projet.classList.add('gallery-projet');
    projet.setAttribute('data-project-id', element.id);
    
    const imgElement = document.createElement('img');
    imgElement.src = element.image;
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
const lightboxOverlay = document.querySelector('.lightbox-overlay');
const lightboxImg = document.querySelector('.lightbox-img');
const prevArrow = document.querySelector('.arrow-prev');
const nextArrow = document.querySelector('.arrow-next');

const openLightBox = (imageUrl) => {
  lightboxImg.src = imageUrl;
  lightboxOverlay.classList.add('lightbox-open');
}

let currentImageIndex = 0;

const navigateLightbox = (direction) => {
  const filteredImages = data.gallery.filter(element => element.category === category);
  
  currentImageIndex += direction;
  
  if (currentImageIndex < 0) {
    currentImageIndex = filteredImages.length - 1;
  } else if (currentImageIndex >= filteredImages.length) {
    currentImageIndex = 0;
  }
  
  lightboxImg.src = filteredImages[currentImageIndex].image;
};

prevArrow.addEventListener('click', () => {
  navigateLightbox(-1);
});

nextArrow.addEventListener('click', () => {
  navigateLightbox(1);
});

lightboxOverlay.addEventListener('click', () => {
  closeLightbox();
});

const closeLightbox = () => {
  lightboxOverlay.classList.remove('lightbox-open');
};








 
  