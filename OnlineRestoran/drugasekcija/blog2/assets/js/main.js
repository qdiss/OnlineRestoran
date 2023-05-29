// Grab elements
console.log(Swiper)
const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if(element) return element;
    throw new Error(`Something went wrong! Make sure that ${selector} exists/is typed correctly.`);  
};

//Nav styles on scroll
const scrollHeader = () =>{
    const navbarElement = selectElement('#header');
    if(this.scrollY >= 15) {
        navbarElement.classList.add('activated');
    } else {
        navbarElement.classList.remove('activated');
    }
}

window.addEventListener('scroll', scrollHeader);

// Open menu & search pop-up
const menuToggleIcon = selectElement('#menu-toggle-icon');
const formOpenBtn = selectElement('#search-icon');
const formCloseBtn = selectElement('#form-close-btn');
const searchContainer = selectElement('#search-form-container');

const toggleMenu = () =>{
    const mobileMenu = selectElement('#menu');
    mobileMenu.classList.toggle('activated');
    menuToggleIcon.classList.toggle('activated');
}

menuToggleIcon.addEventListener('click', toggleMenu);

// Open/Close search form popup
formOpenBtn.addEventListener('click', () => searchContainer.classList.add('activated'));
formCloseBtn.addEventListener('click', () => searchContainer.classList.remove('activated'));
// -- Close the search form popup on ESC keypress
window.addEventListener('keyup', (event) => {
    if(event.key === 'Escape') searchContainer.classList.remove('activated');
});

// Swiper
const swiper = new Swiper(".swiper", {
  // How many slides to show
  slidesPerView: 2,
  // How much space between slides
  spaceBetween: 20,
  // Make the next and previous buttons work
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  // Make the pagination indicators work
  pagination: {
      el: '.swiper-pagination'
  },
  // Responsive breakpoints for how many slides to show at that view
  breakpoints: {
      // 700px and up shows 2 slides
      700: {
        slidesPerView: 2
      },
      // 1200px and up shows 3 slides
      1200: {
          slidesPerView: 3
      }
  }   
});


// Contact Popup
const btnContactPopup = document.querySelector('.btnContact-popup');
const container = document.querySelector('.containerPozadina');
const closeContactIcon = document.createElement('i');

closeContactIcon.classList.add('fa', 'fa-times', 'closeContactIcon');
container.insertBefore(closeContactIcon, container.firstChild);
closeContactIcon.style.paddingLeft = '-10px';

const closeContainer = () => {
  container.style.display = 'none';
};

const toggleContainer = (event) => {
  event.stopPropagation();
  if (container.style.display === 'block') {
    closeContainer();
  } else {
    container.style.display = 'block';
  }
};

btnContactPopup.addEventListener('click', toggleContainer);
closeContactIcon.addEventListener('click', toggleContainer);

document.addEventListener('click', (event) => {
  if (container.style.display === 'block') {
    const isClickedInsideContainer = container.contains(event.target);
    if (!isClickedInsideContainer) {
      closeContainer();
    }
  }
});

// Slanje E-Mail
function sendMail() {
  var params = {
    name: document.getElementById("ime").value,
    email: document.getElementById("email").value,
    brojtelefona: document.getElementById("brojtelefona").value,
    text: document.getElementById("message").value,
  };

  const serviceID = "service_km8djpr"; // Zamijenite s vašim ID-om usluge iz EmailJS-a
  const templateID = "template_bb65llo"; // Zamijenite s vašim ID-om predloška iz EmailJS-a

  emailjs.send(serviceID, templateID, params).then((res) => {
      document.getElementById("ime").value = "";
      document.getElementById("email").value = "";
      document.getElementById("brojtelefona").value = "";
      document.getElementById("message").value = "";
      console.log(res);
      alert("Poruka je poslana");
    })
    .catch((err) => console.log(err));
}
