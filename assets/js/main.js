document.addEventListener("DOMContentLoaded", function () {
  // Highlight the active nav link based on current page
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a").forEach(function (link) {
    var linkPage = link.getAttribute("href");
    if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
      link.classList.add("active");
    }
  });

  // Mobile menu toggle
  var toggle = document.querySelector(".menu-toggle");
  var navContainer = document.querySelector(".nav-container");
  if (toggle && navContainer) {
    toggle.addEventListener("click", function () {
      toggle.classList.toggle("active");
      navContainer.classList.toggle("open");
    });
    document.querySelectorAll(".nav-container .menu a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.classList.remove("active");
        navContainer.classList.remove("open");
      });
    });
  }

  // Animated dot that tracks the active link
  var menu = document.querySelector(".menu");
  var dot = document.querySelector(".menu-dot");
  if (menu && dot) {
    var positionDot = function (link) {
      if (!link) return;
      var linkRect = link.getBoundingClientRect();
      var menuRect = menu.getBoundingClientRect();
      var dotX = linkRect.left - menuRect.left + linkRect.width / 2 - 3.5;
      dot.style.left = dotX + "px";
      dot.style.opacity = "1";
    };

    var activeLink = menu.querySelector("a.active");

    window.addEventListener("load", function () {
      requestAnimationFrame(function () {
        positionDot(activeLink);
      });
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("mouseenter", function () {
        positionDot(link);
      });
    });

    menu.addEventListener("mouseleave", function () {
      positionDot(activeLink);
    });

    window.addEventListener("resize", function () {
      positionDot(activeLink);
    });
  }
});
