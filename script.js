"use strict";

/* =========================================================
   HELPERS
========================================================= */
var $ = function (id) { return document.getElementById(id); };
var rand = function (min, max) { return min + Math.random() * (max - min); };
var pad = function (n) { return String(n).padStart(2, "0"); };

/* run once the page (fonts + layout) has fully loaded */
function onLoad(fn) {
  if (document.readyState === "complete") fn();
  else window.addEventListener("load", fn);
}

/* =========================================================
   1. COUNTDOWN — church ceremony, Dec 12, 2026, 10:00 AM
========================================================= */
(function () {
  var target = new Date("2026-12-12T10:00:00");
  var box = { d: $("d"), h: $("h"), m: $("m"), s: $("s") };

  function tick() {
    var diff = Math.max(0, target - new Date());
    box.d.textContent = pad(Math.floor(diff / 864e5));
    box.h.textContent = pad(Math.floor(diff % 864e5 / 36e5));
    box.m.textContent = pad(Math.floor(diff % 36e5 / 6e4));
    box.s.textContent = pad(Math.floor(diff % 6e4 / 1e3));
  }

  tick();
  setInterval(tick, 1000);
})();

/* =========================================================
   2. TWINKLING GOLD + PINK STARS across the whole page
========================================================= */
(function () {
  var sheet = $("sheet");
  if (!sheet) return;

  var shapes = ["✦", "★", "✧", "✦"];
  var colors = ["#e3b75f", "#f3dca0", "#f4a3b3", "#e3b75f", "#f8c4cc"];

  onLoad(function () {
    var height = sheet.scrollHeight;
    var count = Math.round(height / 55);

    for (var i = 0; i < count; i++) {
      var star = document.createElement("span");
      star.className = "star";
      star.textContent = shapes[i % shapes.length];
      star.style.cssText =
        "left:" + rand(0, 94) + "%;" +
        "top:" + rand(0, height - 30) + "px;" +
        "font-size:" + rand(10, 24) + "px;" +
        "color:" + colors[i % colors.length] + ";" +
        "animation-delay:" + rand(0, 3.4).toFixed(2) + "s;" +
        "animation-duration:" + rand(2.6, 5).toFixed(2) + "s";
      sheet.appendChild(star);
    }
  });
})();

/* =========================================================
   3. PETALS — pink petals falling top to bottom (hero + whole page)
========================================================= */
(function () {
  var colors = ["#f8b8c6", "#f4a3b3", "#fcc9d3", "#f7a8b8", "#ffd1da"];

  function petals(parent, count, className, size, left, delay) {
    for (var i = 0; i < count; i++) {
      var p = document.createElement("span");
      var s = rand(size[0], size[1]);
      p.className = className;
      p.style.cssText =
        "width:" + s + "px;height:" + s + "px;" +
        "background:" + colors[i % colors.length] + ";" +
        "left:" + rand(0, left) + "%;" +
        "animation-duration:" + rand(10, 18).toFixed(1) + "s;" +
        "animation-delay:" + (-rand(0, delay)).toFixed(1) + "s";
      parent.appendChild(p);
    }
  }

  var hero = $("floaters");
  if (hero) petals(hero, 10, "fl petal-shape", [10, 20], 92, 16);

  var layer = document.createElement("div");
  layer.className = "petal-layer";
  layer.setAttribute("aria-hidden", "true");
  petals(layer, 24, "petal", [9, 18], 96, 16);
  document.body.appendChild(layer);
})();

/* =========================================================
   4. TAP THE HERO — princess confetti pop
========================================================= */
(function () {
  var hero = $("hero");
  if (!hero) return;

  var bits = ["👑", "💖", "🦋", "🎀", "🌸", "✨", "🦄"];
  var PIECES = 10;

  hero.addEventListener("click", function (e) {
    if (e.target.closest("a, button")) return;
    var rect = hero.getBoundingClientRect();

    for (var i = 0; i < PIECES; i++) {
      var angle = (Math.PI * 2 * i) / PIECES;
      var dist = rand(44, 90);
      var p = document.createElement("span");
      p.className = "pop";
      p.textContent = bits[Math.floor(Math.random() * bits.length)];
      p.style.left = e.clientX - rect.left + "px";
      p.style.top = e.clientY - rect.top + "px";
      p.style.setProperty("--x", Math.cos(angle) * dist + "px");
      p.style.setProperty("--y", Math.sin(angle) * dist + "px");
      hero.appendChild(p);
      setTimeout(p.remove.bind(p), 900);
    }
  });
})();

/* =========================================================
   5. SCROLL REVEAL
========================================================= */
(function () {
  var items = document.querySelectorAll(".rv");

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("on"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("on");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  items.forEach(function (el) { io.observe(el); });
})();

/* =========================================================
   6. MAP TABS — Church / Reception
========================================================= */
(function () {
  var tabs = document.querySelectorAll(".tab");
  var frame = $("map-frame");
  if (!tabs.length || !frame) return;

  var title = $("v-title");
  var sub = $("v-sub");
  var dir = $("v-dir");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle("active", on);
        t.setAttribute("aria-selected", String(on));
      });

      frame.src = tab.dataset.src;
      title.textContent = tab.dataset.title;
      sub.textContent = tab.dataset.sub;
      dir.href = tab.dataset.dir;
    });
  });
})();
