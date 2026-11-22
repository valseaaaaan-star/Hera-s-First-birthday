/* =========================================
   COUNTDOWN — to the ceremony, Dec 12, 2026, 10:00 AM
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
   VENUE TABS — Church / Reception
   Swaps the map, title, time and directions link.
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
