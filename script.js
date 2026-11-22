/* =========================================
   COUNTDOWN — church ceremony, Dec 12, 2026, 10:00 AM
========================================= */
(function () {
  var target = new Date("2026-12-12T10:00:00");
  var els = {
    d: document.getElementById("d"),
    h: document.getElementById("h"),
    m: document.getElementById("m"),
    s: document.getElementById("s")
  };

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    var diff = target - new Date();
    if (diff <= 0) {
      for (var k in els) els[k].textContent = "00";
      return;
    }
    els.d.textContent = pad(Math.floor(diff / 864e5));
    els.h.textContent = pad(Math.floor(diff % 864e5 / 36e5));
    els.m.textContent = pad(Math.floor(diff % 36e5 / 6e4));
    els.s.textContent = pad(Math.floor(diff % 6e4 / 1e3));
  }

  tick();
  setInterval(tick, 1000);
})();


/* =========================================
   TWINKLING GOLD + PINK STARS across the whole page
========================================= */
(function () {
  var sheet = document.getElementById("sheet");
  if (!sheet) return;
  var chars = ["✦", "★", "✧", "✦"];
  var colors = ["#e3b75f", "#f3dca0", "#f4a3b3", "#e3b75f", "#f8c4cc"];

  function build() {
    var h = sheet.scrollHeight;
    var count = Math.round(h / 55);

    for (var i = 0; i < count; i++) {
      var s = document.createElement("span");
      s.className = "star";
      s.textContent = chars[i % chars.length];
      s.style.left = Math.random() * 94 + "%";
      s.style.top = Math.random() * (h - 30) + "px";
      s.style.fontSize = 10 + Math.random() * 14 + "px";
      s.style.color = colors[i % colors.length];
      s.style.animationDelay = (Math.random() * 3.4).toFixed(2) + "s";
      s.style.animationDuration = (2.6 + Math.random() * 2.4).toFixed(2) + "s";
      sheet.appendChild(s);
    }
  }

  if (document.readyState === "complete") build();
  else window.addEventListener("load", build);
})();


/* =========================================
   FLOATING HEARTS, BUTTERFLIES & BOWS near the top
========================================= */
(function () {
  var box = document.getElementById("floaters");
  if (!box) return;
  var things = ["💖", "🦋", "🎀", "✨", "🌸", "💗"];

  for (var i = 0; i < 9; i++) {
    var s = document.createElement("span");
    s.className = "fl";
    s.textContent = things[i % things.length];
    s.style.left = Math.random() * 92 + "%";
    s.style.fontSize = 18 + Math.random() * 14 + "px";
    s.style.animationDuration = (11 + Math.random() * 9).toFixed(1) + "s";
    s.style.animationDelay = (-Math.random() * 16).toFixed(1) + "s";
    box.appendChild(s);
  }
})();


/* =========================================
   PRINCESS DECOR — falling petals (shapes, no emoji)
========================================= */
(function () {
  function rnd(a, b) { return a + Math.random() * (b - a); }
  var layer = document.createElement("div");
  layer.className = "petal-layer";
  layer.setAttribute("aria-hidden", "true");
  var colors = ["#f8b8c6", "#fcd0b0", "#f4a3b3", "#fff0bd", "#f3dca0"];
  for (var i = 0; i < 16; i++) {
    var p = document.createElement("span");
    var size = rnd(9, 18);
    p.className = "petal";
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.background = colors[i % colors.length];
    p.style.left = rnd(0, 96) + "%";
    p.style.animationDuration = rnd(10, 18).toFixed(1) + "s";
    p.style.animationDelay = (-rnd(0, 16)).toFixed(1) + "s";
    layer.appendChild(p);
  }
  document.body.appendChild(layer);
})();


/* =========================================
   TAP THE HERO — princess confetti pop!
========================================= */
(function () {
  var hero = document.getElementById("hero");
  if (!hero) return;
  var bits = ["👑", "💖", "🦋", "🎀", "🌸", "✨", "🦄"];

  hero.addEventListener("click", function (e) {
    if (e.target.closest("a, button")) return;
    var rect = hero.getBoundingClientRect();

    for (var i = 0; i < 10; i++) {
      var p = document.createElement("span");
      var angle = (Math.PI * 2 * i) / 10;
      var dist = 44 + Math.random() * 46;
      p.className = "pop";
      p.textContent = bits[Math.floor(Math.random() * bits.length)];
      p.style.left = e.clientX - rect.left + "px";
      p.style.top = e.clientY - rect.top + "px";
      p.style.setProperty("--x", Math.cos(angle) * dist + "px");
      p.style.setProperty("--y", Math.sin(angle) * dist + "px");
      hero.appendChild(p);
      setTimeout(function (el) { el.remove(); }, 900, p);
    }
  });
})();


/* =========================================
   SCROLL REVEAL
========================================= */
(function () {
  var items = document.querySelectorAll(".rv");

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("on"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("on");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(function (el) { io.observe(el); });
})();


/* =========================================
   MAP TABS — Church / Reception
========================================= */
(function () {
  var tabs = document.querySelectorAll(".tab");
  var frame = document.getElementById("map-frame");
  var title = document.getElementById("v-title");
  var sub = document.getElementById("v-sub");
  var dir = document.getElementById("v-dir");

  if (!tabs.length || !frame) return;

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      frame.src = tab.dataset.src;
      title.textContent = tab.dataset.title;
      sub.textContent = tab.dataset.sub;
      dir.href = tab.dataset.dir;
    });
  });
})();
