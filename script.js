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

  var caseStories = {
    "1": {
      tag: "Wire Fraud",
      amount: "$2.4M",
      sub: "Recovered · 9 weeks",
      title: "SME wire fraud — closing redirect",
      body: [
        "Two days before a $2.6M commercial property closing, the client's finance team received an email — apparently from the escrow agent — asking that wiring instructions be updated. The sending domain was one character off from the real one. The transfer went out that afternoon.",
        "The client called our after-hours line within four hours of the wire settling. We opened the case immediately, filed a same-day SWIFT recall request through the sending bank, and contacted the receiving bank's fraud desk directly to request an administrative freeze before any funds could move further.",
        "The receiving account belonged to a shell entity that had already begun moving money to two downstream accounts. Because the freeze request landed inside the receiving bank's same-business-day window, 92% of the funds — $2.4M — were frozen before they could be dispersed any further."
      ],
      highlights: [
        "SWIFT recall filed same day, before end of business",
        "Direct escalation to the receiving bank's fraud desk",
        "92% of funds frozen before further dispersal"
      ]
    },
    "2": {
      tag: "Crypto Fraud",
      amount: "$840K",
      sub: "Recovered · 14 weeks",
      title: "Crypto pig-butchering — multi-jurisdiction",
      body: [
        "The client was cultivated over four months through a messaging-app relationship that steadily steered them toward a fraudulent trading platform. Deposits were made in USDT across a dozen transactions before withdrawal requests were denied and the platform went dark.",
        "Our blockchain analysts traced the funds on-chain as they moved through three intermediary wallets and settled on two regulated exchanges in separate jurisdictions. We filed law-enforcement referrals in both jurisdictions alongside direct compliance requests to each exchange.",
        "Both exchanges confirmed the deposits matched active law-enforcement holds and froze the remaining balances. A civil claim was then filed to secure release of the funds to the client, returning $840K of the original $1.02M lost."
      ],
      highlights: [
        "On-chain tracing across three intermediary wallets",
        "Coordinated freeze requests at two regulated exchanges",
        "Civil claim filed to secure release of frozen funds"
      ]
    },
    "3": {
      tag: "Embezzlement",
      amount: "$5.1M",
      sub: "Recovered · 11 months",
      title: "Internal embezzlement — manufacturing client",
      body: [
        "A mid-sized manufacturer noticed margins slipping for two consecutive years without an obvious cause. A routine audit flagged a vendor whose invoices didn't match any physical deliveries. That vendor didn't exist.",
        "Our forensic accounting team rebuilt four years of accounts-payable history and identified a phantom-vendor scheme run by a senior finance employee, using shell invoices routed through an account they controlled indirectly through a relative.",
        "We coordinated a criminal referral with law enforcement while simultaneously pursuing civil restitution against the individual's traceable assets, including a property and two investment accounts. The combined action recovered $5.1M of the $6.8M diverted over four years."
      ],
      highlights: [
        "Four years of accounts-payable records reconstructed",
        "Parallel criminal referral and civil restitution tracks",
        "Recovery against real estate and investment assets"
      ]
    },
    "4": {
      tag: "Investment Fraud",
      amount: "$1.7M",
      sub: "Recovered · 6 months",
      title: "Investment Ponzi — class action joined",
      body: [
        "The client had invested across three years in a private fund promising steady above-market returns. When redemption requests stopped being honored, it became clear that new investor deposits were being used to pay out earlier ones.",
        "Rather than pursue an isolated claim, we identified and joined a coordinated group of 47 other victims, which strengthened the collective claim against the fund's remaining assets and gave the group priority standing once an estate administrator was appointed.",
        "The estate administrator's court-supervised distribution process returned 73% of principal to participating claimants. The client recovered $1.7M of their original $2.3M investment."
      ],
      highlights: [
        "Joined a coordinated claim of 47 other victims",
        "Priority standing in estate-administrator proceedings",
        "73% of principal returned through court-supervised distribution"
      ]
    },
    "5": {
      tag: "APP Scam",
      amount: "£420K",
      sub: "Recovered · 5 weeks",
      title: "APP scam, bank reimbursement secured",
      body: [
        "The client was persuaded, over a series of convincing phone calls impersonating their bank's fraud team, to move funds into a 'safe account' during a purported security incident. The funds were gone within hours.",
        "The client's bank initially denied reimbursement, arguing the payments were client-authorized. We built a case under the UK's APP scam voluntary reimbursement code, documenting the impersonation tactics and the bank's own gaps in transaction-risk warnings.",
        "After the initial denial, we escalated the complaint to the Financial Ombudsman Service with a full evidentiary submission. The Ombudsman ruled in the client's favor, and the bank issued full repayment of the £420K lost."
      ],
      highlights: [
        "Case built under the UK APP scam voluntary code",
        "Formal escalation to the Financial Ombudsman Service",
        "Full reimbursement secured after initial denial"
      ]
    },
    "6": {
      tag: "Judgment Enforcement",
      amount: "$3.2M",
      sub: "Recovered · 18 months",
      title: "Cross-border judgment enforcement",
      body: [
        "The client held a US court judgment worth $3.9M against a former business partner, but two years on it remained unenforced — the debtor had moved money and residency offshore and stopped responding entirely.",
        "Our asset-tracing team followed the money through a chain of holding entities into the UAE and the British Virgin Islands, identifying real property, a brokerage account, and an operating business interest tied to the debtor.",
        "We secured Mareva-style freezing orders in both jurisdictions to prevent further dissipation, then pursued local enforcement proceedings to recognize the US judgment. The combined action recovered $3.2M across the traced assets."
      ],
      highlights: [
        "Assets traced across two offshore jurisdictions",
        "Mareva-style freezing orders secured in both",
        "US judgment recognized and enforced locally"
      ]
    },
    "7": {
      tag: "Platform Fraud",
      amount: "$680K",
      sub: "Recovered · 10 weeks",
      title: "Fake brokerage app — withdrawal extortion",
      body: [
        "The client was directed to a professional-looking trading app that showed steadily growing paper profits. When they attempted to withdraw, the platform demanded an escalating series of 'tax' and 'clearance' fees before any funds would be released.",
        "We identified the app as a known fraud pattern and traced the deposit flow to an operating entity based in Southeast Asia, along with the exchange accounts used to cash out victim deposits.",
        "A civil claim was filed against the identified entity while we engaged directly with the exchanges holding remaining balances. The combined pressure returned $680K of the client's $765K principal — an 89% recovery."
      ],
      highlights: [
        "Fraud pattern identified and operator entity traced",
        "Direct engagement with exchanges holding balances",
        "89% of principal returned via civil claim and exchange pressure"
      ]
    }
  };

  var caseOverlay = document.getElementById("caseModalOverlay");
  if (caseOverlay) {
    var caseModal = caseOverlay.querySelector(".case-modal");
    var caseCloseBtn = document.getElementById("caseModalClose");
    var caseTagEl = document.getElementById("caseModalTag");
    var caseAmountEl = document.getElementById("caseModalAmount");
    var caseSubEl = document.getElementById("caseModalSub");
    var caseTitleEl = document.getElementById("caseModalTitle");
    var caseBodyEl = document.getElementById("caseModalBody");
    var caseLastFocused = null;

    var openCase = function (id) {
      var data = caseStories[id];
      if (!data) return;

      caseTagEl.textContent = data.tag;
      caseAmountEl.textContent = data.amount;
      caseSubEl.textContent = data.sub;
      caseTitleEl.textContent = data.title;

      var html = data.body.map(function (p) { return "<p>" + p + "</p>"; }).join("");
      if (data.highlights && data.highlights.length) {
        html += "<h4>At a glance</h4><ul class=\"case-modal-list\">" +
          data.highlights.map(function (h) { return "<li>" + h + "</li>"; }).join("") +
          "</ul>";
      }
      caseBodyEl.innerHTML = html;

      caseLastFocused = document.activeElement;
      caseOverlay.hidden = false;
      requestAnimationFrame(function () { caseOverlay.classList.add("open"); });
      document.body.classList.add("modal-open");
      caseModal.focus();
    };

    var closeCase = function () {
      caseOverlay.classList.remove("open");
      document.body.classList.remove("modal-open");
      setTimeout(function () { caseOverlay.hidden = true; }, 250);
      if (caseLastFocused) caseLastFocused.focus();
    };

    document.querySelectorAll("[data-case]").forEach(function (card) {
      card.addEventListener("click", function () {
        openCase(card.getAttribute("data-case"));
      });
    });

    caseCloseBtn.addEventListener("click", closeCase);
    caseOverlay.addEventListener("click", function (e) {
      if (e.target === caseOverlay) closeCase();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && caseOverlay.classList.contains("open")) closeCase();
    });
  }
})();
