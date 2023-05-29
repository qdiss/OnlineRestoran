const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.getElementById('closeIcon');

const closePopup = () => {
  wrapper.classList.remove('active-popup');
};

const togglePopup = (event) => {
  event.stopPropagation();
  if (wrapper.classList.contains('active-popup')) {
    closePopup();
  } else {
    wrapper.classList.add('active-popup');
    closeContainer();
  }
};

registerLink.addEventListener('click', () => {
  if (!wrapper.classList.contains('active')) {
    wrapper.classList.add('active');
    closeContainer();
  }
});

loginLink.addEventListener('click', () => {
  if (wrapper.classList.contains('active')) {
    wrapper.classList.remove('active');
    closeContainer();
  }
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

// Kontakt Popup
const btnContactPopup = document.querySelector('.btnContact-popup');
const container = document.querySelector('.contactContainer');
const closeContactIcon = document.createElement('i');

closeContactIcon.classList.add('fa', 'fa-times', 'closeContactIcon');
container.insertBefore(closeContactIcon, container.firstChild);
closeContactIcon.style.paddingLeft = '-10px';

const closeContainer = () => {
  container.style.display = 'none';
};

const toggleContainer = (event) => {
  event.stopPropagation();
  if (!wrapper.classList.contains('active-popup') && !wrapper.classList.contains('active')) {
    container.style.display = 'block';
    closePopup();
  }
};

btnContactPopup.addEventListener('click', toggleContainer);
closeContactIcon.addEventListener('click', closeContainer);

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

  const serviceID = "service_km8djpr";
  const templateID = "template_bb65llo";

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

// DropDown
const searchInput = document.querySelector('.search-input');
const shopItemsContainer = document.querySelector('.shop-items');

function loadFood() {
  // Učitavanje i prikazivanje stavki hrane iz eksternog JSON fajla
  fetch('hrana.json')
    .then(response => response.json())
    .then(data => {
      var shopItems = data.shopItems;
      for (var i = 0; i < shopItems.length; i++) {
        var shopItem = shopItems[i];
        addShopItemToPage(shopItem);
      }
    })
    .catch(error => {
      console.log('Greška pri učitavanju JSON fajla:', error);
    });
}


// Prikazivanje shop itema
function showShopItems(items) {
  shopItemsContainer.innerHTML = '';

  items.forEach(item => {
    const shopItem = createShopItem(item);
    shopItemsContainer.appendChild(shopItem);
  });
}

// Kreiranje HTML elementa za shop item
function createShopItem(item) {
  const shopItem = document.createElement('div');
  shopItem.classList.add('shop-item');
  shopItem.setAttribute('data-filter', item.category);

  const title = document.createElement('span');
  title.classList.add('shop-item-title');
  title.textContent = item.title;

  const image = document.createElement('img');
  image.classList.add('shop-item-image');
  image.src = item.image;

  const details = document.createElement('div');
  details.classList.add('shop-item-details');

  const price = document.createElement('span');
  price.classList.add('shop-item-price');
  price.textContent = item.price;

  const description = document.createElement('p');
  description.classList.add('shop-item-description');
  description.textContent = item.description;

  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary', 'shop-item-button');
  button.type = 'button';
  button.textContent = 'ADD TO CART';

  details.appendChild(price);
  details.appendChild(description);
  details.appendChild(button);

  shopItem.appendChild(title);
  shopItem.appendChild(image);
  shopItem.appendChild(details);

  return shopItem;
}

// Filtriranje shop itema
function filterShopItems(filter) {
  const shopItems = Array.from(shopItemsContainer.children);

  shopItems.forEach(item => {
    const itemFilter = item.getAttribute('data-filter');

    if (filter === 'Sve' || itemFilter === filter) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Dodavanje događaja kada se pritisne tipka za pretragu
searchInput.addEventListener('input', function(event) {
  const searchTerm = event.target.value.toLowerCase();
  filterShopItems('Sve'); 

  if (searchTerm) {
    const shopItems = Array.from(shopItemsContainer.children);

    shopItems.forEach(item => {
      const title = item.querySelector('.shop-item-title').textContent.toLowerCase();
      const filter = item.getAttribute('data-filter').toLowerCase();

      if (title.includes(searchTerm) || filter.includes(searchTerm)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
});


const dropdown = document.querySelector('.dropdown');
const select = dropdown.querySelector('.select');
const options = dropdown.querySelectorAll('.menu li');

// Dodavanje događaja klikanja na select
select.addEventListener('click', function() {
  dropdown.querySelector('.menu').classList.toggle('open');
  dropdown.querySelector('.caret').classList.toggle('caret-rotate');
});

// Dodavanje događaja klikanja na opcije
options.forEach(function(option) {
  option.addEventListener('click', function() {
    const value = option.getAttribute('data-filter');
    const selected = dropdown.querySelector('.selected');
    selected.textContent = value;
    dropdown.querySelector('.menu').classList.remove('open');
    dropdown.querySelector('.caret').classList.remove('caret-rotate');
    dropdown.classList.remove('expanded');
    filterShopItems(value);
  });
});

// Zatvaranje padajuće liste ako se klikne izvan nje
window.addEventListener('click', function(event) {
  if (!dropdown.contains(event.target)) {
    dropdown.querySelector('.menu').classList.remove('open');
    dropdown.querySelector('.caret').classList.remove('caret-rotate');
    dropdown.classList.remove('expanded');
  }
});

function addShopItemToPage(shopItem) {
  // Kreiranje HTML elementa za prikazivanje stavke hrane
  let shopItemElement = document.createElement('div');
  shopItemElement.classList.add('shop-item');
  shopItemElement.setAttribute('data-filter', shopItem.category);

  let titleElement = document.createElement('span');
  titleElement.classList.add('shop-item-title');
  titleElement.innerText = shopItem.title;

  let priceElement = document.createElement('span');
  priceElement.classList.add('shop-item-price');
  priceElement.innerText = shopItem.price;

  let imageElement = document.createElement('img');
  imageElement.classList.add('shop-item-image');
  imageElement.src = shopItem.image;

  let descriptionElement = document.createElement('p');
  descriptionElement.classList.add('shop-item-description');
  descriptionElement.innerText = shopItem.description;

  let buttonElement = document.createElement('button');
  buttonElement.classList.add('btn', 'btn-primary', 'shop-item-button');
  buttonElement.type = 'button';
  buttonElement.innerText = shopItem.buttonText;
  buttonElement.addEventListener('click', function() {
    addToCartClicked(shopItem);
  });

  shopItemElement.appendChild(titleElement);
  shopItemElement.appendChild(imageElement);
  shopItemElement.appendChild(priceElement);
  shopItemElement.appendChild(descriptionElement);
  shopItemElement.appendChild(buttonElement);

  shopItemsContainer.appendChild(shopItemElement);
}


// Učitavanje hrane prilikom učitavanja stranice
document.addEventListener('DOMContentLoaded', loadFood);

// Dodavanje stvari u korpu
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName('btn-danger')
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
  }

  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }

  var addToCartButtons = document.getElementsByClassName('shop-item-button')
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}



function purchaseClicked() {
  alert('Thank you for your purchase')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}

function removeCartItem(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()
}

function addToCartClicked(shopItem) {
  var title = shopItem.title;
  var price = shopItem.price;
  var imageSrc = shopItem.image;
  addItemToCart(title, price, imageSrc);
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('This item is already added to the cart')
      return
    }
  }
  var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
    var price = parseFloat(priceElement.innerText.replace('$', ''))
    var quantity = quantityElement.value
    total = total + price * quantity
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
