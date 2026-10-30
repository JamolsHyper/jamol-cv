/* Language, theme, live clock. No scroll effects on purpose. */
(function () {
  var T = window.T;
  var LANGS = ["en", "ru", "uz"];
  var html = document.documentElement;
  var isCase = document.body.dataset.page === "case";

  /* ---- language ---- */
  function detectLang() {
    try {
      var saved = localStorage.getItem("lang");
      if (LANGS.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    var list = navigator.languages || [navigator.language || "en"];
    for (var i = 0; i < list.length; i++) {
      var code = String(list[i]).slice(0, 2).toLowerCase();
      if (LANGS.indexOf(code) !== -1) return code;
    }
    return "en";
  }

  function setLang(l) {
    var dict = T[l] || T.en;
    html.lang = l;
    document.title = isCase ? dict.meta_title_cs : dict.meta_title;
    document.querySelectorAll("[data-i]").forEach(function (el) {
      var v = dict[el.dataset.i];
      if (v !== undefined) el.textContent = v;
    });
    document.querySelectorAll("[data-i-label]").forEach(function (el) {
      var v = dict[el.dataset.iLabel];
      if (v !== undefined) el.setAttribute("aria-label", v);
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.lang === l ? "true" : "false");
    });
    try { localStorage.setItem("lang", l); } catch (e) {}
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.lang); });
  });
  setLang(detectLang());

  /* ---- theme (initial value is applied inline in <head> to avoid a flash) ---- */
  var tbtn = document.getElementById("theme");
  if (tbtn) {
    tbtn.addEventListener("click", function () {
      var next = html.dataset.theme === "dark" ? "light" : "dark";
      html.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ---- Tashkent clock in the contact card ---- */
  var clock = document.getElementById("clock");
  if (clock) {
    var fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Tashkent", hour: "2-digit", minute: "2-digit" });
    var tick = function () { clock.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 30000);
  }
})();
