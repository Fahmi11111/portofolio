const slider = document.querySelector(".slider");
const list = document.querySelector(".list");
const thumbnail = document.querySelector(".thumbnail");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

let runAutoPlay = setTimeout(() => next.click(), 5000);

next.addEventListener("click", () => initSlider("next"));
prev.addEventListener("click", () => initSlider("prev"));

const initSlider = (type) => {
  const sliderItems = list.querySelectorAll(".item");
  const thumbnailItems = thumbnail.querySelectorAll(".item");

  // Pindahkan slide
  if (type === "next") {
    list.appendChild(sliderItems[0]);
    thumbnail.appendChild(thumbnailItems[0]);
    slider.classList.add("next");
  } else {
    const lastIndex = sliderItems.length - 1;
    list.prepend(sliderItems[lastIndex]);
    thumbnail.prepend(thumbnailItems[lastIndex]);
    slider.classList.add("prev");
  }

  // Animasi slider (hilangkan class setelah selesai)
  setTimeout(() => {
    slider.classList.remove("next");
    slider.classList.remove("prev");
  }, 1000);

  // ✅ Fade untuk main slider (item pertama)
  sliderItems.forEach((item, index) => {
    item.style.opacity = index === 0 ? "1" : "0";
    item.style.transition = "opacity 0.8s ease-in-out";
  });

  // ✅ Tampilkan hanya 1 thumbnail (fade in)
  thumbnailItems.forEach((item, index) => {
    item.classList.remove("show");
    item.style.display = "none";
    item.style.opacity = "0";
    item.style.transition = "opacity 0.6s ease";
    if (index === 0) {
      item.classList.add("show");
      item.style.display = "block";
      setTimeout(() => {
        item.style.opacity = "1";
      }, 50);
    }
  });

  // Reset autoplay
  clearTimeout(runAutoPlay);
  runAutoPlay = setTimeout(() => next.click(), 5000);
};
