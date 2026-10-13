
const WHATSAPP_NUMBER = "2349039610446";
const CART_STORAGE_KEY = "luxeByAmandaCart";

const products = [
  {id:1,name:"Chic Satin Gown",category:"Dresses",description:"Perfect for dinner dates",price:18500,oldPrice:25000,stock:true,badge:"BESTSELLER",image:"https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85",image2:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=85"},
  {id:2,name:"Lagos Brunch Set",category:"Two-Piece",description:"Your weekend, upgraded",price:22000,oldPrice:null,stock:true,badge:"NEW IN",image:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85",image2:"https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=85"},
  {id:3,name:"Soft Life Mini Dress",category:"Dresses",description:"Cute, easy and confident",price:14500,oldPrice:19000,stock:true,badge:"SALE",image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85",image2:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85"},
  {id:4,name:"Amaka Co-ord Set",category:"Two-Piece",description:"A matching moment made easy",price:26500,oldPrice:null,stock:true,badge:"",image:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=85",image2:"https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=85"},
  {id:5,name:"Date Night Midi",category:"Dresses",description:"Made for your entrance",price:19500,oldPrice:24000,stock:true,badge:"SALE",image:"https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=85",image2:"https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85"},
  {id:6,name:"Sunday Best Blouse",category:"Tops & Skirts",description:"Polished without trying too hard",price:9800,oldPrice:null,stock:true,badge:"",image:"https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=800&q=85",image2:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85"},
  {id:7,name:"Naija Babe Skirt Set",category:"Tops & Skirts",description:"From errands to link-ups",price:17200,oldPrice:null,stock:false,badge:"",image:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85",image2:"https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=800&q=85"},
  {id:8,name:"Thrift Luxe Find",category:"Dresses",description:"One-of-a-kind, pre-loved style",price:12500,oldPrice:16000,stock:true,badge:"RARE FIND",image:"https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=85",image2:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85"},
  {id:9,name:"Weekend Ease Set",category:"Two-Piece",description:"Comfort that still serves looks",price:21000,oldPrice:null,stock:true,badge:"NEW IN",image:"https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=85",image2:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=85"},
  {id:10,name:"Pretty in Pink Gown",category:"Dresses",description:"A little drama, all the elegance",price:28500,oldPrice:35000,stock:true,badge:"SALE",image:"https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85",image2:"https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=85"},
  {id:11,name:"Everyday Crop Top",category:"Tops & Skirts",description:"Your jeans' new best friend",price:7500,oldPrice:null,stock:true,badge:"",image:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=85",image2:"https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=800&q=85"},
  {id:12,name:"After Hours Two-Piece",category:"Two-Piece",description:"Dinner plans? Sorted.",price:32000,oldPrice:39000,stock:true,badge:"SALE",image:"https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=85",image2:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=85"}
];

const money = amount =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(amount);

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

let activeCategory = "All";
let searchTerm = "";
let cart = loadCart();
let toastTimer;

function loadCart() {
  try {
    const stored = JSON.parse(
      localStorage.getItem(CART_STORAGE_KEY) || "[]"
    );

    if (!Array.isArray(stored)) return [];

    return stored
      .map(item => ({
        id: Number(item.id),
        qty: Math.max(1, Number(item.qty) || 1)
      }))
      .filter(item =>
        products.some(product =>
          product.id === item.id && product.stock
        )
      );
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart)
    );
  } catch {
    showToast("Your browser couldn't save the cart.");
  }
}

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function renderProducts() {
  const grid = $("#productGrid");

  const filtered = products.filter(product => {
    const categoryMatch =
      activeCategory === "All" ||
      (activeCategory === "Sale"
        ? Boolean(product.oldPrice)
        : product.category === activeCategory);

    const searchMatch =
      `${product.name} ${product.description} ${product.category}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  grid.innerHTML = filtered.map(product => {
    const badge = !product.stock
      ? `<span class="product-badge sold">SOLD OUT</span>`
      : product.oldPrice
        ? `<span class="product-badge sale">SALE</span>`
        : product.badge
          ? `<span class="product-badge">${escapeHTML(product.badge)}</span>`
          : "";

    return `
      <article class="product-card">
        <div class="product-image-wrap">
          ${badge}

          <button class="product-fav"
            type="button"
            aria-label="Ask about ${escapeHTML(product.name)} on WhatsApp"
            data-product-whatsapp="${product.id}">
            <i data-lucide="heart"></i>
          </button>

          <img class="image-primary"
            src="${product.image}"
            alt="${escapeHTML(product.name)}"
            loading="lazy">

          <img class="image-secondary"
            src="${product.image2}"
            alt="${escapeHTML(product.name)} alternate view"
            loading="lazy">
        </div>

        <div class="product-info">
          <h3 class="product-title">${escapeHTML(product.name)}</h3>
          <p class="product-desc">${escapeHTML(product.description)}</p>

          <div class="price-row">
            <span class="price">${money(product.price)}</span>
            ${product.oldPrice
              ? `<span class="old-price">${money(product.oldPrice)}</span>`
              : ""}
          </div>

          <div class="product-actions">
            <button class="add-cart"
              type="button"
              data-add-cart="${product.id}"
              ${product.stock ? "" : "disabled"}>
              ${product.stock ? "Add to Bag" : "Sold Out"}
            </button>

            <a class="whatsapp-product"
              href="${whatsappLink(`Hi Luxe by Amanda, I want to order ${product.name} (${money(product.price)}). Is it available?`)}"
              target="_blank"
              rel="noopener"
              aria-label="Order ${escapeHTML(product.name)} on WhatsApp">
              <i data-lucide="message-circle"></i>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join("");

  $("#emptyState").hidden = filtered.length !== 0;

  $$(".category-tab").forEach(button => {
    const isActive = button.dataset.category === activeCategory;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (window.lucide) lucide.createIcons();
}

function addToCart(id) {
  const product = products.find(
    item => item.id === Number(id)
  );

  if (!product || !product.stock) return;

  const existing = cart.find(
    item => item.id === product.id
  );

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, qty: 1 });
  }

  saveCart();
  renderCart();
  showToast(`${product.name} added to your bag`);
}

function changeQuantity(id, change) {
  const item = cart.find(
    entry => entry.id === Number(id)
  );

  if (!item) return;

  item.qty += change;

  if (item.qty < 1) {
    cart = cart.filter(
      entry => entry.id !== Number(id)
    );
  }

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(
    item => item.id !== Number(id)
  );

  saveCart();
  renderCart();
}

function renderCart() {
  const totalItems = cart.reduce(
    (sum, item) => sum + item.qty, 0
  );

  const total = cart.reduce((sum, item) => {
    const product = products.find(
      p => p.id === item.id
    );

    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  $("#cartCount").textContent =
    totalItems > 99 ? "99+" : totalItems;

  $("#drawerItemCount").textContent = `(${totalItems})`;
  $("#cartTotal").textContent = money(total);

  $("#cartItems").innerHTML = cart.map(item => {
    const product = products.find(
      p => p.id === item.id
    );

    if (!product) return "";

    return `
      <article class="cart-line">
        <img src="${product.image}"
          alt="${escapeHTML(product.name)}">

        <div>
          <h3>${escapeHTML(product.name)}</h3>
          <div class="cart-line-price">${money(product.price)}</div>

          <div class="cart-line-controls">
            <div class="quantity-control">
              <button type="button"
                data-quantity="${product.id}"
                data-change="-1"
                aria-label="Decrease quantity">
                <i data-lucide="minus"></i>
              </button>

              <span>${item.qty}</span>

              <button type="button"
                data-quantity="${product.id}"
                data-change="1"
                aria-label="Increase quantity">
                <i data-lucide="plus"></i>
              </button>
            </div>
          </div>
        </div>

        <button type="button"
          class="remove-item"
          data-remove="${product.id}"
          aria-label="Remove ${escapeHTML(product.name)}">
          <i data-lucide="trash-2"></i>
        </button>
      </article>
    `;
  }).join("");

  const isEmpty = cart.length === 0;

  $("#cartEmpty").classList.toggle("show", isEmpty);
  $("#cartItems").style.display = isEmpty ? "none" : "block";
  $("#cartFooter").classList.toggle("hidden", isEmpty);

  if (window.lucide) lucide.createIcons();
}

function openCart() {
  $("#cartDrawer").classList.add("open");
  $("#drawerBackdrop").classList.add("open");
  $("#cartDrawer").setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  $("#cartClose").focus();
}

function closeCart() {
  $("#cartDrawer").classList.remove("open");
  $("#drawerBackdrop").classList.remove("open");
  $("#cartDrawer").setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function checkoutWhatsApp() {
  if (!cart.length) {
    showToast("Your bag is empty. Add a piece first.");
    return;
  }

  const lines = cart.map(item => {
    const product = products.find(
      p => p.id === item.id
    );

    return product
      ? `• ${product.name} x${item.qty} — ${money(product.price * item.qty)}`
      : "";
  }).filter(Boolean);

  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  const message =
    `Hi Luxe by Amanda! I'd like to place an order:\n\n` +
    `${lines.join("\n")}\n\n` +
    `Subtotal: ${money(total)}\n\n` +
    `Please confirm sizes, availability, delivery fee and payment options.`;

  window.open(
    whatsappLink(message),
    "_blank",
    "noopener,noreferrer"
  );
}

function showToast(message) {
  const toast = $("#toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function syncSearch(value) {
  searchTerm = value.trim();

  $("#searchInput").value = value;
  $("#mobileSearchInput").value = value;

  renderProducts();
}

document.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add-cart]");
  if (addButton) {
    addToCart(addButton.dataset.addCart);
  }

  const quantityButton = event.target.closest("[data-quantity]");
  if (quantityButton) {
    changeQuantity(
      quantityButton.dataset.quantity,
      Number(quantityButton.dataset.change)
    );
  }

  const removeButton = event.target.closest("[data-remove]");
  if (removeButton) {
    removeFromCart(removeButton.dataset.remove);
  }

  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    activeCategory = categoryButton.dataset.category;
    renderProducts();
  }

  const categoryLink = event.target.closest("[data-category-link]");
  if (categoryLink) {
    activeCategory = categoryLink.dataset.categoryLink;
    renderProducts();

    $("#mainNav").classList.remove("open");
    $("#menuToggle").setAttribute("aria-expanded", "false");
  }

  const productWhatsApp = event.target.closest("[data-product-whatsapp]");
  if (productWhatsApp) {
    const product = products.find(
      p => p.id === Number(productWhatsApp.dataset.productWhatsapp)
    );

    if (product) {
      window.open(
        whatsappLink(
          `Hi Luxe by Amanda, please tell me more about ${product.name} (${money(product.price)}).`
        ),
        "_blank",
        "noopener,noreferrer"
      );
    }
  }

  const infoLink = event.target.closest("[data-info]");
  if (infoLink) {
    event.preventDefault();

    const messages = {
      Delivery: "Hi Luxe by Amanda, please share your delivery fees and estimated delivery times.",
      Returns: "Hi Luxe by Amanda, please share your returns and exchange policy.",
      Sizing: "Hi Luxe by Amanda, please help me choose the right size.",
      Orders: "Hi Luxe by Amanda, I need help with an order."
    };

    window.open(
      whatsappLink(messages[infoLink.dataset.info]),
      "_blank",
      "noopener,noreferrer"
    );
  }
});

$("#cartOpen").addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);
$("#drawerBackdrop").addEventListener("click", closeCart);

$("#continueShopping").addEventListener("click", () => {
  closeCart();
  $("#products").scrollIntoView({ behavior: "smooth" });
});

$("#checkoutButton").addEventListener("click", checkoutWhatsApp);

$("#searchInput").addEventListener("input", event => {
  syncSearch(event.target.value);
});

$("#mobileSearchInput").addEventListener("input", event => {
  syncSearch(event.target.value);
});

$("#menuToggle").addEventListener("click", () => {
  const nav = $("#mainNav");
  const isOpen = nav.classList.toggle("open");

  $("#menuToggle").setAttribute("aria-expanded", String(isOpen));
  $("#menuToggle").setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );

  $("#menuToggle").innerHTML =
    `<i data-lucide="${isOpen ? "x" : "menu"}"></i>`;

  if (window.lucide) lucide.createIcons();
});

$("#newsletterForm").addEventListener("submit", event => {
  event.preventDefault();

  const email = $("#newsletterEmail").value.trim();
  if (!email) return;

  $("#newsletterMessage").textContent =
    "Thanks! Connect an email service to collect newsletter subscribers.";

  $("#newsletterEmail").value = "";
  showToast("Thanks for your interest in Luxe by Amanda!");
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCart();
    $("#mainNav").classList.remove("open");
    $("#menuToggle").setAttribute("aria-expanded", "false");
  }
});

$("#year").textContent = new Date().getFullYear();
$("#headerWhatsApp").href = whatsappLink(
  "Hi Luxe by Amanda! I'd love to ask about your collection."
);

renderProducts();
renderCart();

if (window.lucide) lucide.createIcons();
