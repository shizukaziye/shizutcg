/* ============================================================
   ShizuTCG — shared top navigation bar
   ------------------------------------------------------------
   Add to ANY page with ONE line, ideally before </body>:

       <script src="https://shizukaziye.github.io/shizutcg/nav.js" defer></script>

   Renders a fixed top bar (ShizuTCG wordmark + a grouped "Tools"
   dropdown) so every card tool — whichever host serves it —
   feels like one site.

   To add / rename / move a tool, edit the GROUPS array below.
   Every page that loads this file updates automatically.

   If the site ever moves to its own domain, change HOME here and
   the two script tags on every tool page (nav.js + social-bar.js).
   ============================================================ */
(function () {
  "use strict";

  if (window.__shizutcgNav) return;
  window.__shizutcgNav = true;

  var HOME = "https://shizukaziye.github.io/shizutcg/";

  /* ---- The only thing you'll ever edit --------------------- */
  var GROUPS = [
    {
      label: "Prices & Sourcing",
      items: [
        { name: "TCG Price Tracker", url: "https://tcg-price-tracker.shizukaziye.workers.dev/" },
        { name: "CN Card Finder",    url: "https://shizukaziye.github.io/cn-card-finder/" }
      ]
    },
    {
      label: "Riftbound",
      items: [
        { name: "Market Index",           url: "https://tcg-price-tracker.shizukaziye.workers.dev/rb-index" },
        { name: "Tier List Maker",        url: "https://shizukaziye.github.io/riftbound-tierlist/" },
        { name: "Nine-Legend Flex Sheet", url: "https://shizukaziye.github.io/riftbound-flex-sheet/" }
      ]
    },
    {
      label: "Pokémon",
      items: [
        { name: "Michi Binder", url: "https://shizukaziye.github.io/michi-binder/" }
      ]
    }
  ];
  /* ---------------------------------------------------------- */

  // Normalise a URL to host + path (no trailing slash) for match.
  function keyOf(u) {
    try {
      var a = document.createElement("a");
      a.href = u;
      return (a.host + a.pathname).replace(/\/+$/, "");
    } catch (e) { return u; }
  }
  var here = keyOf(location.href);

  // Is this page the item's tool? A tool owns its whole folder, so a tab path
  // under it still marks the tool. An item at a site root matches that root
  // only; otherwise a home entry would light up on every page of its host.
  function isHere(url) {
    var k = keyOf(url);
    return k === here || (k.indexOf("/") !== -1 && here.indexOf(k + "/") === 0);
  }

  var host = document.createElement("div");
  host.setAttribute("data-shizutcg-nav", "");
  var root = host.attachShadow({ mode: "open" });

  var groupsHTML = GROUPS.map(function (g) {
    var links = g.items.map(function (it) {
      var active = isHere(it.url) ? " active" : "";
      return '<a class="item' + active + '" href="' + it.url + '">' + it.name + "</a>";
    }).join("");
    return '<div class="group"><div class="ghead">' + g.label + "</div>" + links + "</div>";
  }).join("");

  root.innerHTML =
    "<style>" +
    ":host{all:initial;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}" +
    "*{box-sizing:border-box}" +
    ".bar{" +
      "position:fixed;top:0;left:0;right:0;z-index:2147482000;" +
      "height:54px;display:flex;align-items:center;justify-content:space-between;" +
      "padding:0 16px;gap:12px;" +
      "background:rgba(12,13,18,.82);backdrop-filter:blur(12px);" +
      "-webkit-backdrop-filter:blur(12px);border-bottom:1px solid #22222e;" +
      "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;" +
    "}" +
    ".brand{" +
      "display:inline-flex;align-items:center;gap:9px;text-decoration:none;" +
      "font-size:20px;font-weight:800;letter-spacing:-.02em;" +
      "background:linear-gradient(180deg,#fff 0%,#e6d2ff 55%,#c78cff 100%);" +
      "-webkit-background-clip:text;background-clip:text;color:transparent;" +
    "}" +
    ".gem{width:18px;height:18px;flex-shrink:0}" +
    ".menu-btn{" +
      "display:inline-flex;align-items:center;gap:7px;cursor:pointer;" +
      "height:38px;padding:0 14px;border-radius:999px;" +
      "background:#15151e;border:1px solid #282836;color:#e7e7ee;" +
      "font-size:14px;font-weight:600;font-family:inherit;" +
      "transition:background .15s ease,border-color .15s ease;" +
    "}" +
    ".menu-btn:hover{background:#1b1b27;border-color:#3e3e52}" +
    ".menu-btn:focus-visible{outline:2px solid #c78cff;outline-offset:2px}" +
    ".caret{transition:transform .18s ease}" +
    ".menu-btn[aria-expanded='true'] .caret{transform:rotate(180deg)}" +
    ".panel{" +
      "position:fixed;top:60px;right:12px;z-index:2147482000;" +
      "width:min(280px,calc(100vw - 24px));max-height:calc(100vh - 74px);overflow:auto;" +
      "background:#121220;border:1px solid #282836;border-radius:14px;" +
      "box-shadow:0 18px 46px -16px rgba(0,0,0,.8);padding:8px;" +
      "opacity:0;transform:translateY(-8px);pointer-events:none;visibility:hidden;" +
      "transition:opacity .16s ease,transform .16s ease,visibility .16s;" +
    "}" +
    ".panel.open{opacity:1;transform:translateY(0);pointer-events:auto;visibility:visible}" +
    ".group{padding:6px 4px}" +
    ".group + .group{border-top:1px solid #22222e;margin-top:2px}" +
    ".ghead{" +
      "font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;" +
      "color:#c78cff;padding:4px 10px 6px;" +
    "}" +
    ".item{" +
      "display:block;text-decoration:none;color:#cfd0dc;" +
      "font-size:14px;padding:8px 10px;border-radius:8px;" +
      "transition:background .13s ease,color .13s ease;" +
    "}" +
    ".item:hover{background:#1b1b27;color:#fff}" +
    ".item:focus-visible{outline:2px solid #c78cff;outline-offset:-2px}" +
    ".item.active{color:#c78cff;background:#1a1a28}" +
    "@media (prefers-reduced-motion:reduce){.caret,.panel{transition:none}}" +
    "</style>" +
    '<nav class="bar" part="bar">' +
      '<a class="brand" href="' + HOME + '">' +
        "<svg class='gem' viewBox='0 0 32 32' aria-hidden='true'><rect x='5' y='3' width='22' height='26' rx='3' fill='#c78cff'/><rect x='8' y='6' width='16' height='11' rx='1.5' fill='#fff' fill-opacity='.85'/><path d='M9 21h14M9 24.5h9' stroke='#fff' stroke-opacity='.7' stroke-width='1.6' stroke-linecap='round'/></svg>" +
        "ShizuTCG" +
      "</a>" +
      '<button class="menu-btn" aria-haspopup="true" aria-expanded="false" aria-controls="shizutcg-nav-panel">' +
        "Tools" +
        "<svg class='caret' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>" +
      "</button>" +
    "</nav>" +
    '<div class="panel" id="shizutcg-nav-panel">' + groupsHTML + "</div>";

  function mount() {
    document.body.appendChild(host);

    // Push page content down so the fixed bar never covers it.
    var b = document.body;
    if (!b.hasAttribute("data-shizutcg-nav-offset")) {
      var cur = parseFloat(getComputedStyle(b).paddingTop) || 0;
      b.style.paddingTop = (cur + 54) + "px";
      b.setAttribute("data-shizutcg-nav-offset", "");
    }
    // Pages with their own sticky panels use this to sit below the bar
    // (styles say top:var(--site-nav-offset,0px), so no-nav pages get 0).
    document.documentElement.style.setProperty("--site-nav-offset", "54px");

    var btn = root.querySelector(".menu-btn");
    var panel = root.querySelector(".panel");

    function setOpen(open) {
      panel.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(!panel.classList.contains("open"));
    });
    // Close on outside click or Escape.
    document.addEventListener("click", function () { setOpen(false); });
    root.addEventListener("click", function (e) { e.stopPropagation(); });
    panel.addEventListener("click", function (e) {
      if (e.target.closest(".item")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("open")) {
        setOpen(false);
        btn.focus();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
