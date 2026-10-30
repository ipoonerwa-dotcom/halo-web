(function () {
  var LANG_KEY = "halo-lang";
  var lang = "en";
  try {
    if (localStorage.getItem(LANG_KEY) === "zh") lang = "zh";
  } catch (err) {}

  var enTitle = document.title;
  var descEl = document.querySelector('meta[name="description"]');
  var enDesc = descEl ? descEl.getAttribute("content") : "";
  var EN = {};
  function capture(selector, read) {
    document.querySelectorAll(selector).forEach(function (el) {
      var key = el.getAttribute(selector.slice(1, -1));
      if (EN[key] == null) EN[key] = read(el);
    });
  }
  capture("[data-i18n]", function (el) { return el.textContent; });
  capture("[data-i18n-html]", function (el) { return el.innerHTML; });
  capture("[data-i18n-aria]", function (el) { return el.getAttribute("aria-label"); });
  capture("[data-i18n-placeholder]", function (el) { return el.getAttribute("placeholder"); });

  var ZH = {
    skip: "跳到铸造",
    railLeft: "KIND 3 · BNB 计价",
    railRight: "开盘后继续铸造",
    brandSub: "KIND 3 份额铸造",
    navLabel: "页面",
    navMint: "铸造",
    navHow: "怎么铸",
    navAgent: "Agent ID",
    navAfter: "开盘之后",
    navTiers: "档位",
    navStats: "数据",
    langLabel: "语言",
    mintedLabel: "已铸造",
    shareRange: "第 1–10,000 份",
    mainnetOff: "主网未上线",
    kicker: "BNB 智能链 · Agent ID · Kind 3",
    tagline: "每一份，都给池子加一圈。",
    lede: "这是 GANG 的 Kind 3 份额铸造。支付 BNB，钱包必须持有 <strong>.ai</strong> Agent ID，池子打开后铸造仍会继续。持有人奖励记在 SharedDividendVault。",
    passTitle: "HALO · 份额通行证",
    agentLabel: "Agent ID",
    agentRequired: "必须持有",
    agentBody: "铸造台在链上读取门槛。没有 Agent ID，就不能铸造。",
    walletLabel: "钱包",
    walletState: "未连接",
    walletBody: "本页只报价。它不会发送任何交易。",
    sharesLabel: "这一笔的份数（1–10）",
    fewer: "减少份数",
    more: "增加份数",
    serialLabel: "预览：这一笔最后一份的序号",
    referrerLabel: "推荐人（可选，不会发送）",
    referrerPh: "Agent ID 或地址",
    tierDt: "档位",
    unitDt: "单价",
    subDt: "小计",
    feeDt: "平台费 1%",
    payDt: "你支付",
    recvDt: "你得到",
    mintBtn: "暂不能铸造 — 主网未上线",
    fine: "这里没有公布 HALO 代币地址。直接转 BNB 不会铸造。测试网要走下面的 Kind 3 铸造台。主网还没有 Kind 3 铸造台。",
    padLabel: "测试网铸造台 · 链 97",
    copy: "复制",
    copied: "已复制",
    copyFail: "请选中地址",
    scheduleLabel: "进度",
    scheduleTitle: "打开之后，铸造继续",
    preOpen: "开盘前价格",
    tokensPer: "每份代币",
    poolOpens: "池子打开",
    poolOpensVal: "第 10,000 份",
    afterThat: "此后",
    afterVal: "铸造继续",
    scheduleBody: "第 10,000 份会在同一笔交易里打开 WBNB 交易对：20 BNB 和 1,000,000,000 枚代币，LP 铸到黑洞地址。价格随后走过 353 档，从第 4,420,001 份起停在 0.01614 BNB。到第 4,440,000 份也不会停。",
    boardTitle: "排行榜",
    placeholder: "占位",
    ariaBoard: "排行指标",
    boardInvites: "邀请",
    boardMints: "铸造",
    boardHolders: "持有人",
    ariaWindow: "时间窗",
    boardDay: "日",
    boardWeek: "周",
    boardRank: "名次",
    boardAgent: "Agent ID",
    howEyebrow: "怎么铸",
    howTitle: "六步，计价都是 BNB",
    howLede: "这是 GangFlywheelPad 上的 Kind 3 飞轮。参数在创建时锁定。铸造台不能暂停发售、不能改这些参数，也不能拿走它持有的 BNB。",
    s1h: "先持有 .ai Agent ID",
    s1p: "铸造会核对 Agent ID 门槛。测试网用 0x24D0…5B2a。主网发售会用 0x60B9…022F。完整地址在下面的 Agent ID 一节。没有 Agent ID 的钱包不能铸造。",
    s2h: "支付 BNB，不是转代币",
    s2p: "计价资产是 WBNB。池子打开前，一份是 0.002 BNB。上面再加 1% 进平台费桶。包装和铸造调用一起发生。把 BNB 直接转到铸造台或任何代币地址，都不会铸出。",
    s3h: "不要超出 Agent ID 额度",
    s3p: "每个 Agent ID 一开始有 10 份额度，开盘前和开盘后共用。一笔交易可以拿 1 到 10 份。被邀请的钱包第一次铸造时，如果推荐人已经铸造过并且持有 Agent ID，推荐人加 1 份。邀请自己不算。没有社交任务领取。",
    s4h: "池子打开之前",
    s4p: "每个份额给钱包 100,000 HALO。池子预留同样的数量。代币还不能转。卖回按铸造价减去 1% 退出费。七天没有进展后，退出费为 0。1% 平台费不退。",
    s5h: "第 10,000 份打开交易对",
    s5p: "卖出第 10,000 份的那一笔会在同一笔交易里启动。创建者本金分成是 0 时，交易对注入 20 BNB 和 1,000,000,000 枚代币。LP 铸到黑洞地址。卖出 3,000 份后，创建者可以提前打开。提前打开只注入已经募到的部分：3,000 份是 6 BNB 和 300,000,000 枚代币。",
    s6h: "开盘后继续铸造",
    s6p: "开盘后的铸造是开着的。整笔按最后一份的档位计价。代币数量随后跟着池子走，新的流动性锁到黑洞地址。规则在后面几节。",
    agentEyebrow: "Agent ID",
    agentTitle: "一个身份，十份额度，邀请另加",
    agentLede: "额度按 Agent ID 计算，贯穿整次发售。它不是社交任务分数，池子打开时也不会重置。",
    quota: "额度",
    qBase: "每个 Agent ID 的基础额度",
    qBaseVal: "10 份",
    qInvite: "邀请奖励",
    qInviteVal: "推荐人 +1",
    qWho: "谁可以被推荐",
    qWhoVal: "第一次付费铸造时填了推荐人，且该推荐人已经铸造过的钱包",
    qSelf: "自己邀请自己",
    qSelfVal: "不算",
    qSocial: "社交任务",
    qSocialVal: "没有",
    qTx: "每笔交易",
    qTxVal: "1–10 份",
    qBoth: "开盘前和开盘后",
    qBothVal: "同一额度",
    gates: "门槛",
    gatesBody: "创建和铸造都要有 Agent ID。卖回和领取分红不需要。测试网铸造台快照测试网门槛。主网一旦登记了铸造台，创建时快照主网门槛。",
    testnetGate: "测试网门槛 · 97",
    mainnetGate: "主网门槛 · 56",
    afterEyebrow: "开盘后铸造",
    afterTitle: "池子打开。铸造不停。",
    afterLede: "Kind 3 让卖满第 10,000 份的这次发售，就是之后继续铸造的同一次。之后铸造进来的净 BNB 加进官方交易对，新的 LP 进黑洞地址。",
    f1h: "整笔一个价",
    f1p: "如果一笔铸造跨过档位，这一笔里的每一份都按最后一份的档位收费。不是把每一份的价格加起来。",
    f2h: "代币数量跟着池子",
    f2p: "开盘后，代币数量按池价决定，并以现价、区块起始价、近期高点和 30 分钟 TWAP 为底。本页不编造这个数字。",
    f3h: "价格会走平",
    f3p: "一共 353 档。第 4,440,000 份是开盘价的 8.07 倍，也就是 0.01614 BNB。之后每一份都停在 0.01614 BNB。铸造并不在这里结束。供应上限是 1,000,000,000,000 枚。",
    f4p: "铸造会在金库里记下持有人基线。卖回会再写一次。领取在金库上进行。资格用 Kind 3 的 60% 持有线。买税和卖税各是 1%。这 1% 的一半记给持有人，四分之一进平台费桶，四分之一给创建者。",
    f5h: "什么时候会拒绝铸造",
    f5p: "开盘后，如果池子比均价或近期高点低过 10%，或者这个钱包最近 30 分钟的量会动到池子计价资产的 2% 以上，铸造会被拒绝。",
    f6h: "这次发售做不到的事",
    f6p: "创建者的本金分成是 0。只有创建者能提前打开，而且要先卖出 3,000 份。发售没有暂停，也没有按单次放弃权限。提前打开不会过期。1% 铸造费和税是分开的，进入平台费桶。",
    tiersEyebrow: "档位",
    tiersTitle: "353 级，以 BNB 计价",
    tiersLede: "开盘价在第 10,000 份之前是 0.002 BNB。后面的档位用 Kind 3 标准表：同样的宽度，乘上这个 BNB 底价。完整列表在下面。高亮跟着铸造卡里的预览序号。",
    colShares: "份数",
    colMultiple: "倍数",
    colBnb: "每份 BNB",
    band2: "×1.10 至 ×2.00，每 1,000 份 +0.10",
    band3: "×2.10 至 ×3.68，每 1,000 份 +0.02",
    band4: "×3.70 至 ×5.48，每 10,000 份 +0.02",
    band5: "×5.50 逐步到 ×8.05",
    band6s: "4,420,001 起",
    band6m: "×8.07，此后不变",
    findLabel: "查这一份所在的档",
    thTier: "档",
    thShares: "份数",
    thMultiple: "倍数",
    tierNote: "跨过分界的一笔，整笔都按最后一份的价格收费。第 4,440,000 份在 ×8.07 这一档里。之后仍是 0.01614 BNB。",
    statsEyebrow: "数据",
    statsTitle: "实时数字要等主网",
    statsLede: "这些是占位。链 56 有分红金库、费用桶和迁移器，没有 Kind 3 铸造台。这里没有一次正在进行的发售读数。",
    st1l: "已铸造份数",
    st1p: "主网还没有序号。",
    st2l: "已支付 BNB",
    st2p: "主网还没有进账。",
    st3l: "当前份额价格",
    st3p: "第 1 份的价格表是 0.002 BNB。",
    st4l: "下一份",
    st4p: "有发售之后才会填上。",
    st5l: "持有人",
    st5p: "还没有持有人数。",
    st6l: "官方池",
    st6p: "主网还没有交易对。",
    st7l: "待领分红",
    st7p: "等发售向 SharedDividendVault 打款后才能领取。",
    st8l: "黑洞地址的 LP",
    st8p: "开盘后新的 LP 会铸到黑洞地址。",
    testnetHead: "测试网 · 链 97 · 铸造台已登记",
    testnetBody: "这是第二套 Kind 3。用它走铸造台。不要直接转一笔 BNB 就指望铸出代币。",
    labPad: "Kind 3 铸造台",
    labTax: "税收处理",
    labFee: "平台费桶",
    labMig: "迁移器",
    labReg: "注册表",
    mainnetHead: "主网 · 链 56 · 未上线",
    mainnetBody: "注册表里还没有 Kind 3 铸造台，所以这里还不能创建 HALO 发售。下面的金库是主网 SharedDividendVault。它没有在为这次发售付款。",
    notLive: "未上线",
    labHalo: "HALO 代币",
    notPublished: "未公布",
    footerLine: "HALO · 每一份，都给池子加一圈。",
    footerQuote: "计价：BNB",
    footerPad: "铸造台只在测试网",
    foot1: "主网上，平台费桶用 80% 回购并销毁 GANG，20% 打到 Safe。这个桶已经部署。Kind 3 铸造台还没有登记在上面，所以这次发售还没有往那里收费。",
    foot2: "HALO 是份额铸造代币，没有承诺用途或价值。价格可以到零。档位表是价格日程，不是没人铸造时可以依赖的价格底。本页不是出售代币的要约，也不是投资建议。",
    hint: "池子打开前，每一份都是 0.002 BNB。一笔按最后一份的档位计价。上面再加 1% 平台费。",
    hintRef: "推荐人只记在本机：{ref}。对方必须已经铸造过。邀请自己不算。",
    errShares: "一笔交易是 1 到 10 份。",
    errSerial: "最后一份的序号不能小于这一笔的份数。",
    recvAfter: "开盘后按池价",
    tierCount: "353 档 · 最高 0.01614 BNB",
    tierMismatch: "档位表数量不符（{n}）",
    boardEmpty: "主网还没有这次发售。{metric}会在链 56 的 Kind 3 铸造台上线后显示在这里。窗口：{window}。",
    zhTitle: "HALO · 每一份，都给池子加一圈。",
    zhDesc: "HALO 在 GANG Kind 3 上的份额铸造页。计价资产是 BNB。必须持有 Agent ID。池子打开后仍可铸造。主网尚未上线。"
  };

  function textFor(key) {
    if (lang === "zh" && Object.prototype.hasOwnProperty.call(ZH, key)) return ZH[key];
    return EN[key];
  }

  function applyStatic() {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
    document.title = lang === "zh" ? ZH.zhTitle : enTitle;
    if (descEl) descEl.setAttribute("content", lang === "zh" ? ZH.zhDesc : enDesc);
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = textFor(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = textFor(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", textFor(el.getAttribute("data-i18n-aria")));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", textFor(el.getAttribute("data-i18n-placeholder")));
    });
    var zhBtn = document.getElementById("lang-zh");
    var enBtn = document.getElementById("lang-en");
    if (zhBtn) zhBtn.setAttribute("aria-pressed", lang === "zh" ? "true" : "false");
    if (enBtn) enBtn.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
  }

  function setLang(next, persist) {
    lang = next === "zh" ? "zh" : "en";
    if (persist) {
      try { localStorage.setItem(LANG_KEY, lang); } catch (err) {}
    }
    applyStatic();
    refreshTierLabels();
    renderQuote();
    paintBoard();
  }

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
    if (row.start >= LAST_TIER_START) return group(row.start) + (lang === "zh" ? " 起" : " onward");
    return group(row.start) + " – " + group(row.end);
  }

  function refreshTierLabels() {
    if (!body) return;
    body.querySelectorAll("tr").forEach(function (tr, i) {
      if (tiers[i] && tr.children[1]) tr.children[1].textContent = shareLabel(tiers[i]);
    });
    if (!countEl) return;
    countEl.textContent = tiers.length === 353
      ? (lang === "zh" ? ZH.tierCount : "353 tiers · max 0.01614 BNB")
      : (lang === "zh" ? ZH.tierMismatch.replace("{n}", String(tiers.length)) : "Tier table mismatch (" + tiers.length + ")");
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
      ? (lang === "zh" ? ZH.errShares : "A transaction is 1 to 10 shares.")
      : bad
        ? (lang === "zh" ? ZH.errSerial : "The last share has to be at least the number of shares in the batch.")
        : "";
    sharesEl.setAttribute("aria-invalid", tooMany ? "true" : "false");
    var ref = referrerEl.value.trim();
    document.getElementById("shares-hint").textContent = ref
      ? (lang === "zh"
        ? ZH.hintRef.replace("{ref}", ref)
        : "Referrer noted locally only: " + ref + ". They must already have minted. Inviting yourself does not count.")
      : (lang === "zh"
        ? ZH.hint
        : "Before the pool opens, every share is 0.002 BNB. A batch is priced at its last share’s tier. A 1% platform fee sits on top.");
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
    if (serial <= OPEN_AT) recv.textContent = group(shares * 100000) + " HALO";
    else recv.textContent = lang === "zh" ? ZH.recvAfter : "Pool price after open";
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
        btn.textContent = lang === "zh" ? ZH.copied : "Copied";
        setTimeout(function () { btn.textContent = lang === "zh" ? ZH.copy : "Copy"; }, 1200);
      }, function () {
        btn.textContent = lang === "zh" ? ZH.copyFail : "Select the address";
        setTimeout(function () { btn.textContent = lang === "zh" ? ZH.copy : "Copy"; }, 1400);
      });
    });
  });

  var metric = document.getElementById("board-metric");
  var empty = document.getElementById("board-empty");
  var panel = document.getElementById("board-panel");
  var boardName = "invites";
  var windowName = "day";
  function boardWord(name) {
    if (name === "mints" || name === "holders" || name === "invites") {
      var key = name === "mints" ? "boardMints" : name === "holders" ? "boardHolders" : "boardInvites";
      return lang === "zh" ? ZH[key] : EN[key];
    }
    if (name === "week") return lang === "zh" ? ZH.boardWeek : EN.boardWeek;
    return lang === "zh" ? ZH.boardDay : EN.boardDay;
  }
  function paintBoard() {
    metric.textContent = boardWord(boardName);
    var metricWord = boardWord(boardName);
    var windowWord = boardWord(windowName);
    empty.textContent = lang === "zh"
      ? ZH.boardEmpty.replace("{metric}", metricWord).replace("{window}", windowWord)
      : "No mainnet sale yet. " + metricWord + " will list here after a kind-3 pad is live on chain 56. Window: " + windowWord + ".";
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

  document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-set-lang"), true);
    });
  });

  setLang(lang, false);
})();
