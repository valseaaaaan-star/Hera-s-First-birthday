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
   RAINBOW BOUNCY NAME — every letter its own color
========================================= */
(function () {
  var colors = ["#ff6b6b", "#ffd93d", "#6bdba0", "#5ec8ff", "#b69cff", "#ff9ecf"];
  var n = 0;

  document.querySelectorAll(".nm").forEach(function (el) {
    var text = el.textContent.trim();
    el.textContent = "";

    text.split("").forEach(function (ch) {
      var span = document.createElement("span");
      span.className = "ltr";
      span.textContent = ch;
      span.style.color = colors[n % colors.length];
      span.style.animationDelay = (n * 0.12).toFixed(2) + "s";
      el.appendChild(span);
      n++;
    });
  });
})();


/* =========================================
   FLOATING BALLOONS + STARS in the hero
========================================= */
(function () {
  var box = document.getElementById("floaters");
  if (!box) return;
  var things = ["🎈", "🎈", "⭐", "🎈", "✨", "🧸"];

  for (var i = 0; i < 12; i++) {
    var s = document.createElement("span");
    s.className = "fl";
    s.textContent = things[i % things.length];
    s.style.left = Math.random() * 92 + "%";
    s.style.fontSize = 24 + Math.random() * 22 + "px";
    s.style.animationDuration = (9 + Math.random() * 9).toFixed(1) + "s";
    s.style.animationDelay = (-Math.random() * 14).toFixed(1) + "s";
    box.appendChild(s);
  }
})();


/* =========================================
   TAP THE HERO — confetti pop!
========================================= */
(function () {
  var hero = document.getElementById("hero");
  if (!hero) return;
  var bits = ["🎈", "⭐", "🧸", "🍼", "🎉", "💖"];

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
   VENUE TABS — Church / Party
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
