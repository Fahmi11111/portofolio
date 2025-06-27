$(document).ready(function () {
  var tombolMenu = $(".tombol-menu");
  var menu = $("nav .menu ul");

  // Atur klik menu hanya sekali
  tombolMenu.on("click", function () {
    menu.slideToggle();
  });

  // Responsif awal saat load
  if ($(window).width() > 989) {
    menu.show();
  } else {
    menu.hide();
  }

  // Responsif saat resize
  $(window).on("resize", function () {
    if ($(this).width() > 989) {
      menu.show();
    } else {
      menu.hide();
    }
  });

  // Efek scroll
  $(document).scroll(function () {
    var scroll_pos = $(this).scrollTop();
    if (scroll_pos > 0) {
      $("nav").addClass("putih");
      $("nav img.hitam").show();
      $("nav img.putih").hide();
    } else {
      $("nav").removeClass("putih");
      $("nav img.hitam").hide();
      $("nav img.putih").show();
    }
  });
});
