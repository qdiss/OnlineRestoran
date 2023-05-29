
// Ovo ispod je sve za Header
const searchicon1 = document.querySelector('#searchicon1');
const srchicon1 = document.querySelector('#srchicon1');
const search1 = document.querySelector('#searchinput1');

searchicon1.addEventListener('click', function(){ //Pokazivanje Search Box-a u RESPONZIVNOM modu
    search1.style.display = 'flex';
    searchicon1.style.display = 'none';
}) 

const searchicon2 = document.querySelector('#searchicon2');
const srchicon2 = document.querySelector('#srchicon2');
const search2 = document.querySelector('#searchinput2');

searchicon2.addEventListener('click', function(){ //Pokazivanje Search Box-a u normalnom modu
    search2.style.display = 'flex';
    searchicon2.style.display = 'none';
})

const bar = document.querySelector('.fa-bars');
const cross = document.querySelector('#hdcross');
const headerbar = document.querySelector('.headerbar');

bar.addEventListener('click', function(){
    setTimeout(()=>{
        cross.style.display = 'block';
    },200)
    headerbar.style.right ='0%';
})

cross.addEventListener('click', function(){
    cross.style.display = 'none';
    headerbar.style.right = '-100% ';
})

//Za Login i Register

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

const closePopup = () => {
  wrapper.classList.remove('active-popup');
};

const togglePopup = (event) => {
  event.stopPropagation();
  if (wrapper.classList.contains('active-popup')) {
    closePopup();
  } else {
    wrapper.classList.add('active-popup');
  }
};

registerLink.addEventListener('click', () => {
  wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
  wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', togglePopup);
iconClose.addEventListener('click', closePopup);

document.addEventListener('click', (event) => {
  if (wrapper.classList.contains('active-popup')) {
    const isClickedInsidePopup = wrapper.contains(event.target);
    if (!isClickedInsidePopup) {
      closePopup();
    }
  }
});


// Contact Popup
const btnContactPopup = document.querySelector('.btnContact-popup');
const container = document.querySelector('.container');
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

