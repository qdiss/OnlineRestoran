
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

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPNIMqsVH3Let06UADJriiiQ4A1bNnvMY",
  authDomain: "onlinerestoran-20aa1.firebaseapp.com",
  projectId: "onlinerestoran-20aa1",
  storageBucket: "onlinerestoran-20aa1.appspot.com",
  messagingSenderId: "476627144685",
  appId: "1:476627144685:web:7a780d8a0aec1b105fa1e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()

//Registration
function register(){
  //Preuzmi sva input polja
  username = document.getElementById('username').value
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  //Validacija polja za unos
  if(validate_email(email) == false || validate_password(password) == false){
    alert('Email ili Lozinka nisu ispravni!!')
    return //Ne pokrece kod
  }

  auth.createUserWithEmailAndPassword(email, password)
  .then(function(){
    //Deklarisanje user varijable
    var user = auth.currentUser

    //Dodavanje korisnika u Firebase Database
    var database_ref = database.ref()

    //Kreiranje User Podataka
    var user_data = {
      username : username,
      email : email,
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).set(user_data)

    alert('User Created!!')

  })
  .catch(function(error){
    //Firebase pokaze error
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




//Validacija Email
function validate_email(email){
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if(expression.test(email) == true){
    return true //Email je dobar
  }else{
    return false //Email nije dobar
  }
}

//Validacija Lozinke FIREBASE PRIMA SAMO LOZINKU VECU OD 6 CHAR
function validate_password(password){
  if(password < 6){
    return false;
  }else{
    return true;
  }
}

//Validacija Polja
function validate_field(field){
  if(field == null){
    return false
  }

  if(field.length <= 0){
    return false
  }else{
    return true;
  }

}


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