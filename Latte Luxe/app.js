document.addEventListener("alpine:init", () => {
  Alpine.data("dropdown", () => ({
    items: [
      { id: 1, name: "Burger", img: "5.jpg", price: 15000 },
      { id: 2, name: "Ice Cream", img: "6.jpg", price: 10000 },
      { id: 3, name: "Bread", img: "7.jpg", price: 15000 },
      { id: 4, name: "Caramel Macchiato", img: "8.jpg", price: 28000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,

    add(newItem) {
      if (!newItem || typeof newItem.price !== "number") {
        console.error("Item tidak valid!");
        return;
      }

      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
      } else {
        cartItem.quantity++;
        cartItem.total = cartItem.price * cartItem.quantity;
      }

      this.quantity++;
      this.total += newItem.price;

      document.dispatchEvent(new Event("cart-updated"));
    },

    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);
      if (!cartItem) return;

      if (cartItem.quantity > 1) {
        cartItem.quantity--;
        cartItem.total = cartItem.price * cartItem.quantity;
      } else {
        this.items = this.items.filter((item) => item.id !== id);
      }

      this.quantity--;
      this.total -= cartItem.price;

      document.dispatchEvent(new Event("cart-updated"));
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const checkoutButton = document.querySelector(".checkout-button");
  const form = document.querySelector("#checkoutform");

  function validateCheckoutButton() {
    const formData = new FormData(form);
    let isFilled = true;

    for (let value of formData.values()) {
      if (value.trim() === "") {
        isFilled = false;
        break;
      }
    }

    const cart = Alpine.store("cart");
    if (cart.items.length === 0) isFilled = false;

    checkoutButton.disabled = !isFilled;
    checkoutButton.classList.toggle("disabled", !isFilled);
  }

  form.addEventListener("input", validateCheckoutButton);
  form.addEventListener("change", validateCheckoutButton);
  document.addEventListener("cart-updated", validateCheckoutButton);

  validateCheckoutButton();

  checkoutButton.addEventListener("click", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const objData = Object.fromEntries(formData);
    const cart = Alpine.store("cart");

    if (cart.items.length === 0) {
      alert("Keranjang belanja masih kosong!");
      return;
    }

    let message = `*Data Customer:*\n`;
    message += `Nama: ${objData.name}\n`;
    message += `Email: ${objData.email}\n`;
    message += `No HP: ${objData.phone}\n`;
    message += `\n*Pesanan:*\n`;

    cart.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.quantity} x ${rupiah(
        item.price
      )})\n`;
    });

    message += `\n*TOTAL: ${rupiah(cart.total)}*\n`;
    message += `\nSilakan konfirmasi pembayaran melalui WhatsApp.\n`;

    const whatsappNumber = "6285714726436";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  });
});

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
