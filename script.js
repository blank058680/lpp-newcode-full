/* Level Plain Pro — minimal enhancement layer.
   Pages render fully without JS; this adds the mobile menu + small touches. */
(function () {
  "use strict";

  var btn = document.getElementById("menuToggle");
  var nav = document.getElementById("primaryNav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  var newsletters = document.querySelectorAll(".newsletter");
  newsletters.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var b = form.querySelector("button");
      if (b) { b.textContent = "Subscribed ✓"; b.disabled = true; }
    });
  });

  var stepper = document.querySelector("[data-stepper]");
  if (stepper) {
    stepper.addEventListener("click", function (e) {
      var pill = e.target.closest(".pill");
      if (!pill) return;
      stepper.querySelectorAll(".pill").forEach(function (p) { p.classList.remove("active"); });
      pill.classList.add("active");
    });
  }
})();
