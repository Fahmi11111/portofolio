// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
const hamburgerMenu = document.querySelector("#hamburger-menu");

if (hamburgerMenu) {
  hamburgerMenu.onclick = () => {
    navbarNav.classList.toggle("active");
  };
}

// Toggle class active untuk search
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");
const searchButton = document.querySelector("#search-button");

if (searchButton) {
  searchButton.onclick = (e) => {
    searchForm.classList.toggle("active");
    searchBox.focus();
    e.preventDefault();
  };
}

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
const shoppingButton = document.querySelector("#shopping-button");

if (shoppingButton) {
  shoppingButton.onclick = (e) => {
    shoppingCart.classList.toggle("active");
    e.preventDefault();
  };
}

// Klik di luar sidebar untuk menutupnya
document.addEventListener("click", function (e) {
  if (!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!searchButton.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }

  if (!shoppingButton.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// Modal box
const itemDetailModal = document.querySelector("#item-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");

if (itemDetailButtons.length > 0) {
  itemDetailButtons.forEach((btn) => {
    btn.onclick = (e) => {
      if (itemDetailModal) {
        itemDetailModal.style.display = "flex";
      }
      e.preventDefault();
    };
  });
}

// Klik tombol close modal
const closeIcon = document.querySelector(".modal .close-icon");

if (closeIcon) {
  closeIcon.onclick = (e) => {
    if (itemDetailModal) {
      itemDetailModal.style.display = "none";
    }
    e.preventDefault();
  };
}

// Klik di luar modal untuk menutupnya
if (itemDetailModal) {
  window.onclick = (e) => {
    if (e.target === itemDetailModal) {
      itemDetailModal.style.display = "none";
    }
  };
}

const express = require("express");
const midtransClient = require("midtrans-client");

const app = express();
app.use(express.json());

app.post("/create-transaction", async (req, res) => {
  let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: "SB-Mid-server-YOUR_SERVER_KEY",
  });

  let parameter = {
    transaction_details: {
      order_id: "ORDER-" + new Date().getTime(),
      gross_amount: req.body.amount,
    },
    customer_details: {
      first_name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    payment_type: "qris",
  };

  try {
    let transaction = await snap.createTransaction(parameter);
    res.json({ token: transaction.token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
