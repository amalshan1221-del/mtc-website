/* =========================================================
   MTC website — small helper script (no libraries)
   - English / Arabic switch (RTL)
   - Mobile menu, sticky header
   - Product search & category filter
   - Enquiry forms → WhatsApp or email
   - Number counters, scroll reveal, company profile fallback
   ========================================================= */
(function () {
  "use strict";

  /* ---- Contact settings: change these two lines if your numbers change ---- */
  var WHATSAPP = "966547242394";               // international format, digits only
  var EMAIL = "foodmoderntrading@gmail.com";

  var root = document.documentElement;
  var LANG_KEY = "mtc-lang";
  var ATTRS = ["placeholder", "aria-label", "alt", "title", "content"];

  function lang() { return root.lang === "ar" ? "ar" : "en"; }
  function t(en, ar) { return lang() === "ar" ? ar : en; }

  /* ---------- Language ---------- */
  // Remember the English value of every translatable attribute once.
  var attrEls = document.querySelectorAll(ATTRS.map(function (a) { return "[data-ar-" + a + "]"; }).join(","));
  attrEls.forEach(function (el) {
    ATTRS.forEach(function (a) {
      if (el.hasAttribute("data-ar-" + a) && !el.hasAttribute("data-en-" + a)) {
        el.setAttribute("data-en-" + a, el.getAttribute(a) || "");
      }
    });
  });
  var textEls = document.querySelectorAll("option[data-ar], title[data-ar]");
  textEls.forEach(function (el) { if (!el.hasAttribute("data-en")) el.setAttribute("data-en", el.textContent); });

  function applyLang(l) {
    root.lang = l;
    root.dir = l === "ar" ? "rtl" : "ltr";
    attrEls.forEach(function (el) {
      ATTRS.forEach(function (a) {
        var v = el.getAttribute("data-" + l + "-" + a);
        if (v !== null) el.setAttribute(a, v);
      });
    });
    textEls.forEach(function (el) { var v = el.getAttribute("data-" + l); if (v !== null) el.textContent = v; });
    document.querySelectorAll(".lang-toggle").forEach(function (b) {
      var label = b.querySelector(".lt-label");
      if (label) label.textContent = l === "ar" ? "English" : "العربية";
      b.setAttribute("aria-label", l === "ar" ? "Switch to English" : "التبديل إلى العربية");
    });
    try { localStorage.setItem(LANG_KEY, l); } catch (e) {}
    document.dispatchEvent(new CustomEvent("mtc:lang"));
  }
  applyLang(lang());
  document.querySelectorAll(".lang-toggle").forEach(function (b) {
    b.addEventListener("click", function () { applyLang(lang() === "ar" ? "en" : "ar"); });
  });

  /* ---------- Header + mobile menu ---------- */
  var header = document.querySelector(".site-header");
  var onScroll = function () { if (header) header.classList.toggle("scrolled", window.scrollY > 40); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var menuBtn = document.querySelector(".menu-btn");
  function closeMenu() { document.body.classList.remove("nav-open"); if (menuBtn) menuBtn.setAttribute("aria-expanded", "false"); }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".main-nav a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 1024) closeMenu(); });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Brand portfolio (brands.html) ----------
     Builds the featured logo grid and the searchable, filterable brand directory
     from js/brands-data.js (window.MTC_BRANDS). Add brands there; nothing here needs changing. */
  (function () {
    var data = window.MTC_BRANDS;
    if (!data) return;
    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
    var ICONS = {
      bottle: '<path d="M10 2h4v3l2 3v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8l2-3z"/><path d="M8 11h8v5H8z"/>',
      milk: '<path d="M8 2h8v3l2 3.5V21H6V8.5L8 5z"/><path d="M6 9h12M10 14h4"/>',
      basket: '<path d="M3 10h18l-2 10H5z"/><path d="m8 10 4-6 4 6M9 14v3M15 14v3"/>',
      candy: '<circle cx="12" cy="12" r="4"/><path d="M8.5 10 4 7v10l4.5-3M15.5 10 20 7v10l-4.5-3"/>',
      care: '<path d="M9 2h5M12 2v4M9 6h6v3H9z"/><rect x="7" y="9" width="10" height="13" rx="2"/><path d="M10 14h4"/>',
      spray: '<path d="M8 10h7l1 2.5V21a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8.5z"/><path d="M9 10V6h4v4M13 6h4l-1.5 3"/>',
      snow: '<path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 3.8l3 2 3-2M9 20.2l3-2 3 2"/>'
    };
    var icon = function (n) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (ICONS[n] || ICONS.basket) + "</svg>"; };
    var norm = function (s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9؀-ۿ]+/g, " ").trim(); };

    // 1. Featured logo grid
    var logos = document.querySelector("[data-brand-logos]");
    if (logos) {
      logos.innerHTML = (data.featured || []).map(function (b, i) {
        return '<figure class="logo-tile reveal zoom" style="transition-delay:' + ((i % 4) * 0.06).toFixed(2) + 's">' +
          '<img src="' + esc(b.logo) + '" alt="' + esc(b.alt || b.name) + '" loading="lazy" decoding="async"></figure>';
      }).join("");
    }

    // 2. Brand directory
    var grid = document.querySelector("[data-dir-grid]");
    if (!grid) return;
    var chipsEl = document.querySelector("[data-dir-chips]");
    var input = document.getElementById("brand-search");
    var empty = document.querySelector("[data-dir-empty]");
    var LIMIT = 12, active = "all", open = {};
    var featured = {};
    (data.featured || []).forEach(function (b) { featured[norm(b.name)] = true; });
    var cats = (data.categories || []).filter(function (c) { return (data.brands[c.key] || []).length; });
    var lists = {}, total = 0;
    cats.forEach(function (c) {
      lists[c.key] = data.brands[c.key].slice().sort(function (a, b) { return a.localeCompare(b, "en", { sensitivity: "base" }); });
      total += lists[c.key].length;
    });
    document.querySelectorAll("[data-dir-total]").forEach(function (el) { el.textContent = total; });
    document.querySelectorAll("[data-dir-cats]").forEach(function (el) { el.textContent = cats.length; });

    var chip = function (key, en, ar, ic) {
      return '<button type="button" class="chip" data-dir-filter="' + key + '" aria-pressed="' + (key === active) + '">' + (ic ? icon(ic) : "") +
        '<span lang="en">' + esc(en) + '</span><span lang="ar">' + esc(ar) + '</span><span class="chip-count" data-dir-count="' + key + '"></span></button>';
    };
    chipsEl.innerHTML = chip("all", "All brands", "جميع العلامات", "") + cats.map(function (c) { return chip(c.key, c.en, c.ar, c.icon); }).join("");

    function render() {
      var q = norm(input ? input.value : "");
      var counts = { all: 0 }, html = "";
      cats.forEach(function (c) {
        var list = lists[c.key].filter(function (n) { return !q || (" " + norm(n)).indexOf(" " + q) > -1; }); // match the start of any word
        counts[c.key] = list.length; counts.all += list.length;
        if (!list.length || (active !== "all" && active !== c.key)) return;
        var full = open[c.key] || q || active !== "all";
        var shown = full ? list : list.slice(0, LIMIT);
        var toggle = "";
        if (!q && active === "all" && list.length > LIMIT) {
          toggle = '<button type="button" class="dir-toggle" data-dir-toggle="' + c.key + '" aria-expanded="' + !!open[c.key] + '">' +
            (open[c.key] ? '<span lang="en">Show less</span><span lang="ar">عرض أقل</span>'
                         : '<span lang="en">Show all ' + list.length + '</span><span lang="ar">عرض الكل (' + list.length + ")</span>") + "</button>";
        }
        html += '<article class="dir-card"><header><span class="dir-ic">' + icon(c.icon) + "</span>" +
          '<h3><span lang="en">' + esc(c.en) + '</span><span lang="ar">' + esc(c.ar) + '</span></h3><span class="dir-count">' + list.length + "</span></header>" +
          '<ul class="dir-pills">' + shown.map(function (n) {
            return '<li class="pill' + (featured[norm(n)] ? " is-featured" : "") + '">' + esc(n) + "</li>";
          }).join("") + "</ul>" + toggle + "</article>";
      });
      grid.innerHTML = html;
      grid.classList.toggle("single", active !== "all");
      if (empty) empty.hidden = !!html;
      chipsEl.querySelectorAll("[data-dir-count]").forEach(function (el) { el.textContent = counts[el.getAttribute("data-dir-count")] || 0; });
    }

    chipsEl.addEventListener("click", function (e) {
      var b = e.target.closest("[data-dir-filter]");
      if (!b) return;
      active = b.getAttribute("data-dir-filter");
      chipsEl.querySelectorAll("[data-dir-filter]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      render();
    });
    grid.addEventListener("click", function (e) {
      var t = e.target.closest("[data-dir-toggle]");
      if (!t) return;
      var key = t.getAttribute("data-dir-toggle");
      open[key] = !open[key];
      render();
    });
    if (input) input.addEventListener("input", render);
    render();
  })();

  /* ---------- Extra animations ----------
     Gives more parts of each page a scroll-in effect (with a direction that suits them),
     staggers card grids, turns the homepage brand strip into a moving marquee,
     adds a gentle parallax to the homepage photo and a scroll progress bar.
     Everything is skipped when the visitor's device asks for reduced motion. */
  (function () {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

    // Section headings fade up
    $$(".section-head, .split-head").forEach(function (el) {
      if (!el.classList.contains("reveal") && !el.closest(".reveal")) el.classList.add("reveal");
    });

    // Two-column sections: the two sides slide in towards each other
    $$(".split").forEach(function (s) {
      var kids = $$(":scope > .reveal", s);
      if (kids.length < 2) return;
      var rev = s.classList.contains("rev");
      kids[0].classList.add(rev ? "from-end" : "from-start");
      kids[kids.length - 1].classList.add(rev ? "from-start" : "from-end");
    });

    // Homepage brand strip becomes a slow, endless marquee (pauses on hover)
    $$(".brand-wall").forEach(function (wall) {
      var slots = $$(":scope > .brand-slot", wall);
      if (slots.length < 4) return;
      var marquee = document.createElement("div"), track = document.createElement("div");
      marquee.className = "marquee"; track.className = "marquee-track";
      slots.forEach(function (sl) { sl.className = "brand-slot"; track.appendChild(sl); });
      slots.forEach(function (sl) { var c = sl.cloneNode(true); c.setAttribute("aria-hidden", "true"); track.appendChild(c); });
      marquee.appendChild(track);
      wall.parentNode.replaceChild(marquee, wall);
    });

    // Cards and tiles in grids: zoom in one after another
    var cardSel = ".cat-tile, .card, .news-card, .stat, .step, .city-card, .branch, .brand-row .brand-slot";
    $$(cardSel).forEach(function (el) {
      if (el.closest(".marquee")) return;
      el.classList.add("reveal", "zoom");
      if (!/\bd[0-4]\b/.test(el.className) && el.parentElement) {
        var i = Array.prototype.indexOf.call(el.parentElement.children, el);
        el.style.transitionDelay = (i % 6) * 0.07 + "s";
        // once it has appeared, drop the delay so hover effects respond instantly
        el.addEventListener("transitionend", function done(e) {
          if (e.propertyName !== "opacity") return;
          el.style.transitionDelay = "";
          el.removeEventListener("transitionend", done);
        });
      }
    });

    // Gentle parallax on the homepage photo (large screens only)
    var visual = document.querySelector(".hero-visual");
    if (visual && window.matchMedia("(min-width: 1025px)").matches) {
      var ticking = false;
      window.addEventListener("scroll", function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var y = Math.min(window.scrollY, 900);
          visual.style.setProperty("--py", (y * 0.12).toFixed(1) + "px");
          ticking = false;
        });
      }, { passive: true });
    }

    // Thin progress bar along the top of the page
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);
    var setBar = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ")";
    };
    setBar();
    window.addEventListener("scroll", setBar, { passive: true });
    window.addEventListener("resize", setBar);
  })();

  /* ---------- Scroll reveal & counters ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function countUp(el) {
    var end = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduce || !end) { el.textContent = end.toLocaleString("en-US") + suffix; return; }
    var start = null, dur = 1600;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * eased).toLocaleString("en-US") + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        if (en.target.hasAttribute("data-count")) countUp(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal, [data-count]").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    document.querySelectorAll("[data-count]").forEach(countUp);
  }

  /* ---------- Product catalogue: search + category filter ----------
     Products come from js/products-data.js (window.MTC_PRODUCTS), built from PRODUCTS-categorised.csv
     by tools/build-products.rb. Each item: [code, English name, Arabic name, unit, category, brand photo file or ""]. */
  var grid = document.querySelector("[data-product-grid]");
  if (grid) {
    var input = document.getElementById("product-search");
    var chips = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
    var countEl = document.querySelector("[data-result-count]");
    var empty = document.querySelector(".empty-state");
    var moreBtn = document.querySelector("[data-show-more]");
    var moreCount = document.querySelector("[data-more-count]");
    var active = "all";
    var PAGE = 48, limit = PAGE, matches = [];

    var norm = function (s) {
      return (s || "").toLowerCase()
        .replace(/[ً-ْ]/g, "").replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي")
        .replace(/[٠-٩]/g, function (d) { return "٠١٢٣٤٥٦٧٨٩".indexOf(d); })
        .replace(/\s+/g, " ").trim();
    };
    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
    var fmt = function (n) { return Number(n).toLocaleString("en"); };

    // Category label + icon, taken from the filter buttons so they always match
    var cats = {};
    chips.forEach(function (ch) {
      var key = ch.getAttribute("data-filter"), svg = ch.querySelector("svg");
      var en = ch.querySelector('[lang="en"]'), ar = ch.querySelector('[lang="ar"]');
      cats[key] = { icon: svg ? svg.outerHTML : "", en: en ? en.textContent : key, ar: ar ? ar.textContent : key };
    });
    var UNITS = { CRT: ["Carton", "كرتون"], DZN: ["Dozen", "درزن"], PCs: ["Piece", "حبة"], RPT: ["Bundle", "ربطة"], BAG: ["Bag", "كيس"], BOX: ["Box", "صندوق"], KG: ["Kilo", "كيلو"] };
    var waSvg = (document.querySelector(".btn-wa svg") || { outerHTML: "" }).outerHTML;

    var products = (window.MTC_PRODUCTS || []).map(function (p) {
      var c = cats[p[4]] || { en: "", ar: "" };
      return { code: p[0], en: p[1], ar: p[2], unit: p[3], cat: p[4], img: p[5] || "", text: norm([p[0], p[1], p[2], c.en, c.ar].join(" ")) };
    });

    // Category photo used when a product has no brand photo (files: img/photos/categories/category-*.webp)
    var CAT_IMG = { "beverages": "beverages", "confectionery": "confectionery-snacks", "rice-grains": "rice-grains", "edible-oils": "edible-oils", "canned": "canned-food", "dairy": "dairy", "spices": "spices-seasonings", "household": "household-personal-care", "foodstuffs": "food-stuffs", "frozen": "frozen-foods" };
    function catImg(cat) {
      var f = "img/photos/categories/category-" + (CAT_IMG[cat] || "food-stuffs");
        return '<div class="sku-media is-cat"><img src="' + f + '-800.webp" srcset="' + f + '-800.webp 800w, ' + f + '.webp 1400w" sizes="(max-width: 760px) 50vw, 25vw" alt="" loading="lazy" decoding="async" width="800" height="640"></div>';
    }

    function card(p) {
      var c = cats[p.cat] || { icon: "", en: "", ar: "" }, u = UNITS[p.unit];
      var arName = p.ar || p.en;
      var msg = "Hello MTC, I would like a wholesale price and availability for: " + p.en + " (code " + p.code + ")";
      // Brand photo when we have one (img/products/), otherwise the category photo
      var media = p.img
        ? '<div class="sku-media is-brand"><img src="img/products/' + esc(p.img) + '" alt="" loading="lazy" decoding="async" width="400" height="400"></div>'
        : catImg(p.cat);
      return '<article class="sku" data-cat="' + esc(p.cat) + '" data-code="' + esc(p.code) + '">' + media +
        '<div class="sku-head"><span class="sku-ic">' + c.icon + '</span>' +
          '<span class="sku-cat"><span lang="en">' + esc(c.en) + '</span><span lang="ar">' + esc(c.ar) + '</span></span>' +
          '<span class="sku-code" dir="ltr">#' + esc(p.code) + '</span></div>' +
        '<h3 class="sku-name"><span lang="en">' + esc(p.en) + '</span><span lang="ar">' + esc(arName) + '</span></h3>' +
        (p.ar ? '<p class="sku-alt"><span lang="en" dir="rtl">' + esc(p.ar) + '</span><span lang="ar" dir="ltr">' + esc(p.en) + '</span></p>' : "") +
        '<div class="sku-foot">' +
          (u ? '<span class="sku-unit"><span lang="en">Unit: ' + u[0] + '</span><span lang="ar">الوحدة: ' + u[1] + '</span></span>' : '<span></span>') +
          '<a class="btn btn-wa sku-wa" href="https://wa.me/' + WHATSAPP + "?text=" + encodeURIComponent(msg) + '" target="_blank" rel="noopener" data-wa-product>' +
            waSvg + '<span lang="en">Ask price</span><span lang="ar">اطلب السعر</span></a>' +
        "</div></article>";
    }

    function showMore() {
      var shownBefore = grid.children.length;
      grid.insertAdjacentHTML("beforeend", matches.slice(shownBefore, limit).map(card).join(""));
      var left = matches.length - limit;
      if (moreBtn) moreBtn.hidden = left <= 0;
      if (moreCount) moreCount.textContent = left > 0 ? " (" + fmt(left) + ")" : "";
    }

    function run() {
      var words = norm(input ? input.value : "").split(" ").filter(Boolean);
      var perCat = { all: 0 };
      matches = [];
      products.forEach(function (p) {
        // Arabic spellings vary at the end of a word (تونة / تونه / تونا), so accept either
        var okQ = !words.length || words.every(function (w) {
          return p.text.indexOf(w) > -1 || (/[هة]$/.test(w) && p.text.indexOf(w.slice(0, -1) + "ا") > -1) || (/ا$/.test(w) && p.text.indexOf(w.slice(0, -1) + "ه") > -1);
        });
        if (!okQ) return;
        perCat.all++;
        perCat[p.cat] = (perCat[p.cat] || 0) + 1;
        if (active === "all" || p.cat === active) matches.push(p);
      });
      // live counts on each category button
      chips.forEach(function (ch) {
        var n = perCat[ch.getAttribute("data-filter")] || 0, badge = ch.querySelector(".chip-count");
        if (!badge) { badge = document.createElement("span"); badge.className = "chip-count"; ch.appendChild(badge); }
        badge.textContent = fmt(n);
      });
      limit = PAGE;
      grid.innerHTML = "";
      showMore();
      if (countEl) countEl.textContent = fmt(matches.length);
      if (empty) empty.classList.toggle("show", matches.length === 0);
    }
    if (moreBtn) moreBtn.addEventListener("click", function () { limit += PAGE; showMore(); });
    function setCat(cat, push) {
      active = cat;
      chips.forEach(function (ch) { ch.setAttribute("aria-pressed", ch.getAttribute("data-filter") === cat ? "true" : "false"); });
      if (push && history.replaceState) history.replaceState(null, "", cat === "all" ? location.pathname : "#" + cat);
      var on = chips.filter(function (c) { return c.getAttribute("data-filter") === cat; })[0];
      if (on && on.parentNode.scrollWidth > on.parentNode.clientWidth) on.parentNode.scrollLeft += on.getBoundingClientRect().left - on.parentNode.getBoundingClientRect().left - 16;
      run();
    }
    chips.forEach(function (ch) { ch.addEventListener("click", function () { setCat(ch.getAttribute("data-filter"), true); }); });
    if (input) input.addEventListener("input", run);
    var reset = document.querySelector("[data-reset-filters]");
    if (reset) reset.addEventListener("click", function () { if (input) input.value = ""; setCat("all", true); });
    var fromHash = location.hash.replace("#", "");
    var params = new URLSearchParams(location.search);
    if (params.get("q") && input) input.value = params.get("q");
    setCat(chips.some(function (c) { return c.getAttribute("data-filter") === fromHash; }) ? fromHash : "all", false);
  }

  /* ---------- Contact page tabs (enquiry type) ---------- */
  document.querySelectorAll("[data-tabs]").forEach(function (wrap) {
    var btns = wrap.querySelectorAll("[role=tab]");
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        btns.forEach(function (x) {
          var on = x === b;
          x.setAttribute("aria-selected", on ? "true" : "false");
          var p = document.getElementById(x.getAttribute("aria-controls"));
          if (p) p.hidden = !on;
        });
      });
    });
    var want = location.hash.replace("#", "");
    btns.forEach(function (b) { if (b.getAttribute("aria-controls") === want) b.click(); });
  });

  /* ---------- Enquiry forms → WhatsApp / email ---------- */
  function visibleText(el) {
    if (!el) return "";
    var part = el.querySelector('[lang="' + lang() + '"]');
    return (part ? part.textContent : el.textContent).replace(/\*/g, "").trim();
  }
  document.querySelectorAll("form[data-enquiry]").forEach(function (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var via = (e.submitter && e.submitter.getAttribute("data-send")) || "whatsapp";
      var subject = t(form.getAttribute("data-subject-en"), form.getAttribute("data-subject-ar"));
      var lines = [subject, ""];
      form.querySelectorAll("input, select, textarea").forEach(function (f) {
        if (!f.name || !f.value || f.type === "hidden") return;
        var label = visibleText(form.querySelector('label[for="' + f.id + '"]')) || f.name;
        var val = f.tagName === "SELECT" ? f.options[f.selectedIndex].textContent : f.value;
        lines.push(label + ": " + val.trim());
      });
      var body = lines.join("\n");
      if (via === "email") {
        window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      } else {
        window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(body), "_blank", "noopener");
      }
      if (status) {
        status.textContent = via === "email"
          ? t("Your email app has opened with the enquiry filled in. Press send to deliver it to our team.", "تم فتح تطبيق البريد مع تعبئة الطلب. اضغط إرسال لإيصاله إلى فريقنا.")
          : t("WhatsApp has opened with your enquiry filled in. Press send and our team will reply shortly.", "تم فتح واتساب مع تعبئة طلبك. اضغط إرسال وسيرد عليك فريقنا قريبًا.");
        status.classList.add("show");
      }
    });
  });

  /* ---------- Product enquiry links: message in the current language ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-wa-product]");
    if (!a) return;
    var card = a.closest(".product-card, .sku");
    var name = card ? visibleText(card.querySelector("h3")) : a.getAttribute("data-wa-product");
    var code = card && card.getAttribute("data-code");
    if (code) name += t(" (code " + code + ")", " (رمز " + code + ")");
    var msg = t("Hello MTC, I would like a wholesale price and availability for: ", "مرحبًا، أرغب في معرفة سعر الجملة والتوفر للمنتج: ") + name;
    a.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);
  });

  /* ---------- Company profile: if the PDF hasn't been uploaded yet, request it on WhatsApp ---------- */
  var profileLinks = document.querySelectorAll("[data-profile]");
  if (profileLinks.length) {
    var fallback = function () {
      profileLinks.forEach(function (a) {
        a.removeAttribute("download");
        a.target = "_blank";
        a.rel = "noopener";
        a.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent("Hello MTC, please send me your company profile. / مرحبًا، أرجو إرسال الملف التعريفي للشركة.");
      });
    };
    if (location.protocol === "file:") { fallback(); }
    else {
      fetch(profileLinks[0].getAttribute("href"), { method: "HEAD" })
        .then(function (r) { if (!r.ok || (r.headers.get("content-type") || "").indexOf("pdf") === -1) fallback(); })
        .catch(fallback);
    }
  }
})();
