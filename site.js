(function () {
  var BASE_WEI = 2000000000000000n;
  var OPEN_AT = 10000;
  var CAP_SHARE = 4440000;
  var LAST_TIER_START = 4420001;

  function x100(n) {
    if (n <= 10000) return 100;
    if (n <= 20000) return 110 + 10 * Math.floor((n - 10001) / 1000);
    if (n <= 100000) return 210 + 2 * Math.floor((n - 20001) / 1000);
    if (n <= 1000000) return 370 + 2 * Math.floor((n - 100001) / 10000);
    if (n <= CAP_SHARE) return 550 + Math.floor((15 * Math.floor((n - 1000001) / 20000) + 5) / 10);
    return 807;
  }

  function tierEnd(start) {
    var v = x100(start);
    if (x100(CAP_SHARE) === v) return CAP_SHARE;
    var lo = start;
    var hi = CAP_SHARE;
    while (lo + 1 < hi) {
      var mid = Math.floor((lo + hi) / 2);
      if (x100(mid) === v) lo = mid;
      else hi = mid;
    }
    return lo;
  }

  function buildTiers() {
    var rows = [];
    var n = 1;
    while (n <= CAP_SHARE) {
      var end = tierEnd(n);
      rows.push({ start: n, end: end, x: x100(n) });
      n = end + 1;
    }
    return rows;
  }

  function formatWei(wei) {
    var base = 1000000000000000000n;
    var whole = wei / base;
    var frac = (wei % base).toString().padStart(18, "0").replace(/0+$/, "");
    return frac ? whole.toString() + "." + frac : whole.toString();
  }

  function group(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function formatMul(x) {
    return "×" + (x / 100).toFixed(2);
  }

  function shareLabel(row) {
    if (row.start >= LAST_TIER_START) return group(row.start) + " onward";
    return group(row.start) + " – " + group(row.end);
  }

  function rowFor(serial, tiers) {
    var n = serial > CAP_SHARE ? CAP_SHARE : serial;
    for (var i = 0; i < tiers.length; i++) {
      if (n <= tiers[i].end) return { row: tiers[i], index: i };
    }
    return { row: tiers[tiers.length - 1], index: tiers.length - 1 };
  }

  var tiers = buildTiers();
  var body = document.getElementById("tier-body");
  var countEl = document.getElementById("tier-count");
  tiers.forEach(function (row, i) {
    var tr = document.createElement("tr");
    tr.dataset.start = String(row.start);
    tr.dataset.end = String(row.end);
    [String(i + 1), shareLabel(row), formatMul(row.x), formatWei((BASE_WEI * BigInt(row.x)) / 100n)].forEach(function (text) {
      var td = document.createElement("td");
      td.textContent = text;
      tr.appendChild(td);
    });
    body.appendChild(tr);
  });
  countEl.textContent = tiers.length === 353
    ? "353 tiers · max 0.01614 BNB"
    : "Tier table mismatch (" + tiers.length + ")";

  function highlight(serial) {
    var found = rowFor(serial, tiers);
    var rows = body.querySelectorAll("tr");
    var current = null;
    rows.forEach(function (tr, i) {
      var on = i === found.index;
      tr.classList.toggle("is-preview", on);
      if (on) current = tr;
    });
    return current;
  }

  function readInt(el, fallback) {
    var n = Number(el.value);
    if (!Number.isInteger(n) || n < 1) return fallback;
    return n;
  }

  var sharesEl = document.getElementById("shares");
  var serialEl = document.getElementById("serial");
  var referrerEl = document.getElementById("referrer");
  var errorEl = document.getElementById("quote-error");

  function renderQuote() {
    var shares = readInt(sharesEl, 1);
    var serial = readInt(serialEl, 1);
    var tooMany = shares > 10;
    var bad = tooMany || serial < shares;
    errorEl.hidden = !bad;
    errorEl.textContent = tooMany
      ? "A transaction is 1 to 10 shares."
      : bad
        ? "The last share has to be at least the number of shares in the batch."
        : "";
    sharesEl.setAttribute("aria-invalid", tooMany ? "true" : "false");
    var ref = referrerEl.value.trim();
    document.getElementById("shares-hint").textContent = ref
      ? "Referrer noted locally only: " + ref + ". They must already have minted. Inviting yourself does not count."
      : "Before the pool opens, every share is 0.002 BNB. A batch is priced at its last share’s tier. A 1% platform fee sits on top.";
    if (bad) {
      document.getElementById("q-tier").textContent = "—";
      document.getElementById("q-unit").textContent = "—";
      document.getElementById("q-sub").textContent = "—";
      document.getElementById("q-fee").textContent = "—";
      document.getElementById("q-total").textContent = "—";
      document.getElementById("q-recv").textContent = "—";
      highlight(1);
      return;
    }
    var priced = serial;
    var x = x100(priced);
    var unit = (BASE_WEI * BigInt(x)) / 100n;
    var sub = unit * BigInt(shares);
    var fee = sub / 100n;
    var total = sub + fee;
    var found = rowFor(priced, tiers);
    document.getElementById("q-tier").textContent = (found.index + 1) + " · " + shareLabel(found.row);
    document.getElementById("q-unit").textContent = formatWei(unit) + " BNB";
    document.getElementById("q-sub").textContent = formatWei(sub) + " BNB";
    document.getElementById("q-fee").textContent = formatWei(fee) + " BNB";
    document.getElementById("q-total").textContent = formatWei(total) + " BNB";
    var recv = document.getElementById("q-recv");
    if (serial <= OPEN_AT) recv.textContent = group(shares * 100000) + " BIBIAI";
    else recv.textContent = "Pool price after open";
    highlight(priced);
  }

  document.getElementById("shares-dec").addEventListener("click", function () {
    sharesEl.value = String(Math.max(1, readInt(sharesEl, 1) - 1));
    renderQuote();
  });
  document.getElementById("shares-inc").addEventListener("click", function () {
    sharesEl.value = String(Math.min(10, readInt(sharesEl, 1) + 1));
    renderQuote();
  });
  [sharesEl, serialEl, referrerEl].forEach(function (el) {
    el.addEventListener("input", renderQuote);
  });
  document.getElementById("quote-form").addEventListener("submit", function (event) {
    event.preventDefault();
  });

  var findEl = document.getElementById("tier-find");
  function jumpToTier() {
    var n = readInt(findEl, 1);
    serialEl.value = String(n);
    renderQuote();
    var row = body.querySelector("tr.is-preview");
    var scroller = document.getElementById("tier-scroll");
    if (row && scroller) {
      var delta = row.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
      scroller.scrollTop += delta - 36;
    }
  }
  findEl.addEventListener("input", jumpToTier);

  function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.focus();
      area.select();
      try {
        if (document.execCommand("copy")) resolve();
        else reject(new Error("copy"));
      } catch (err) {
        reject(err);
      } finally {
        area.remove();
      }
    });
  }

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = btn.getAttribute("data-copy");
      var previous = btn.textContent;
      copyText(value).then(function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = previous; }, 1200);
      }, function () {
        btn.textContent = "Select the address";
        setTimeout(function () { btn.textContent = previous; }, 1400);
      });
    });
  });

  var metric = document.getElementById("board-metric");
  var empty = document.getElementById("board-empty");
  var panel = document.getElementById("board-panel");
  var boardName = "Invites";
  var windowName = "Day";
  function paintBoard() {
    metric.textContent = boardName;
    empty.textContent = "No mainnet sale yet. " + boardName + " will list here after a kind-3 pad is live on chain 56. Window: " + windowName + ".";
  }
  document.querySelectorAll("[data-board]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll("[data-board]").forEach(function (other) {
        other.setAttribute("aria-selected", other === btn ? "true" : "false");
      });
      panel.setAttribute("aria-labelledby", btn.id);
      boardName = btn.getAttribute("data-board");
      paintBoard();
    });
  });
  document.querySelectorAll("[data-window]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll("[data-window]").forEach(function (other) {
        other.setAttribute("aria-pressed", other === btn ? "true" : "false");
      });
      windowName = btn.getAttribute("data-window");
      paintBoard();
    });
  });

  renderQuote();
})();
