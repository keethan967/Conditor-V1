class Component extends DCLogic {
  vantaRef = React.createRef();
  vantaEffect = null;
  checkMobile = () => {
    const m = window.innerWidth < 768;
    if (m !== this.state.isMobile) this.setState({ isMobile: m });
  };
  state = {
    isMobile: false,
    zone: "public", screen: "landing", drawer: null,
    selectedStartupId: "s3", selectedInvestorId: "i1",
    activeThreadId: "t1", searchOpen: false, notifOpen: false, copilotOpen: false
  };

  componentDidMount() {
    this.checkMobile();
    window.addEventListener("resize", this.checkMobile);
    this.tryInitVanta(0);
    this._onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); this.toggleSearch(); }
    };
    window.addEventListener("keydown", this._onKey);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this._onKey);
    window.removeEventListener("resize", this.checkMobile);
    if (this.vantaEffect && this.vantaEffect.destroy) this.vantaEffect.destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    const isLandingNow = this.state.zone === "public" && this.state.screen === "landing";
    const wasLanding = prevState.zone === "public" && prevState.screen === "landing";
    if (isLandingNow && !wasLanding) { this.vantaEffect = null; setTimeout(() => this.tryInitVanta(0), 50); }
    if (!isLandingNow && wasLanding && this.vantaEffect) { if (this.vantaEffect.destroy) this.vantaEffect.destroy(); this.vantaEffect = null; }
  }

  tryInitVanta(attempt) {
    if (this.props.vantaEnabled === false) return;
    if (typeof window.VANTA === "undefined" || typeof window.THREE === "undefined") {
      if (attempt < 40) setTimeout(() => this.tryInitVanta(attempt + 1), 150);
      return;
    }
    if (!this.vantaRef.current || this.vantaEffect) return;
    this.vantaEffect = window.VANTA.NET({
      el: this.vantaRef.current, mouseControls: true, touchControls: true, gyroControls: false,
      minHeight: 200.0, minWidth: 200.0, scale: 1.0, scaleMobile: 1.0,
      color: 0x9184d9, backgroundColor: 0x161826, points: 10.0, maxDistance: 22.0, spacing: 18.0
    });
  }

  goTo = (zone, screen, extra) => {
    this.setState(Object.assign({ zone, screen, drawer: null, searchOpen: false, notifOpen: false }, extra || {}));
  };
  openDrawer = (type, id) => this.setState({ drawer: { type, id } });
  closeDrawer = () => this.setState({ drawer: null });
  toggleSearch = () => this.setState((s) => ({ searchOpen: !s.searchOpen, notifOpen: false }));
  toggleNotif = () => this.setState((s) => ({ notifOpen: !s.notifOpen, searchOpen: false }));
  toggleCopilot = () => this.setState((s) => ({ copilotOpen: !s.copilotOpen }));
  selectThread = (id) => this.setState({ activeThreadId: id });

  renderVals() {
    const s = this.state;
    const STARTUPS = [
      { id: "s1", name: "Arclight Robotics", sector: "Climate Tech", stage: "Series A", match: 81, checkFit: "$300K – $600K", location: "Austin, TX", ask: "$4M Series A", saved: true, desc: "Autonomous inspection robots for utility infrastructure." },
      { id: "s2", name: "Verdant Bio", sector: "Biotech", stage: "Seed", match: 85, checkFit: "$500K – $1M", location: "Boston, MA", ask: "$6M Seed", saved: false, desc: "Enzyme engineering platform for carbon-negative materials." },
      { id: "s3", name: "Kestrel Space", sector: "Aerospace", stage: "Series A", match: 91, checkFit: "$750K – $1.5M", location: "Long Beach, CA", ask: "$12M Series A", saved: true, desc: "Modular propulsion systems for small-satellite operators." },
      { id: "s4", name: "Nimbus Grid", sector: "Infra AI", stage: "Seed", match: 88, checkFit: "$600K – $1.2M", location: "Seattle, WA", ask: "$5M Seed", saved: false, desc: "Orchestration layer for distributed GPU inference." },
      { id: "s5", name: "Halcyon Freight", sector: "Logistics", stage: "Series B", match: 96, checkFit: "$1M – $2M", location: "Chicago, IL", ask: "$28M Series B", saved: true, desc: "Predictive routing network for cross-border freight." },
      { id: "s6", name: "Solace Health", sector: "Digital Health", stage: "Seed", match: 68, checkFit: "$200K – $400K", location: "Denver, CO", ask: "$3M Seed", saved: false, desc: "Remote monitoring platform for post-acute care." }
    ];
    const INVESTORS = [
      { id: "i1", name: "Rachel Kim", firm: "Birchwood Capital", title: "Partner", checkSize: "$500K – $2M", thesis: ["Climate", "Infra"], portfolio: 34, location: "San Francisco, CA", match: 92 },
      { id: "i2", name: "Marcus Idris", firm: "Fathom Ventures", title: "General Partner", checkSize: "$1M – $5M", thesis: ["Aerospace", "Deep Tech"], portfolio: 21, location: "New York, NY", match: 87 },
      { id: "i3", name: "Elena Voss", firm: "Northgate Partners", title: "Principal", checkSize: "$250K – $750K", thesis: ["Biotech", "Health"], portfolio: 45, location: "Boston, MA", match: 74 },
      { id: "i4", name: "Sam Okafor", firm: "Loam Capital", title: "Partner", checkSize: "$400K – $1.5M", thesis: ["Logistics", "Fintech"], portfolio: 29, location: "Chicago, IL", match: 89 },
      { id: "i5", name: "Priya Chandra", firm: "Anchorpoint", title: "Managing Director", checkSize: "$1M – $3M", thesis: ["Infra AI", "Enterprise"], portfolio: 18, location: "Seattle, WA", match: 95 }
    ];

    const tier = (score) => {
      if (score >= 90) return { color: "#b5abfc", bg: "rgba(52,211,153,0.14)", border: "rgba(52,211,153,0.35)" };
      if (score >= 80) return { color: "#9184d9", bg: "rgba(145,132,217,0.12)", border: "rgba(145,132,217,0.3)" };
      return { color: "#b2b6ca", bg: "rgba(148,163,184,0.12)", border: "rgba(148,163,184,0.3)" };
    };

    const startupCards = STARTUPS.map((x) => Object.assign({}, x, tier(x.match), { onView: () => this.openDrawer("startup", x.id) }));
    const investorCards = INVESTORS.map((x) => Object.assign({}, x, tier(x.match), { thesisTags: x.thesis, onView: () => this.openDrawer("investor", x.id) }));
    const topInvestors = investorCards.slice().sort((a, b) => b.match - a.match).slice(0, 3);
    const savedStartupCards = startupCards.filter((x) => x.saved);

    const mk = (name, sector, matchScore, checkSize, syndicate, lastActivity, highlighted) => ({
      name, sector, matchScore, checkSize, syndicate, lastActivity, ...tier(matchScore),
      cardBorder: highlighted ? "rgba(145,132,217,0.4)" : "rgba(233,233,237,0.08)",
      cardShadow: highlighted ? "0 0 32px rgba(145,132,217,0.15)" : "none"
    });
    const dealColumns = [
      { name: "Intro", count: 3, deals: [mk("Arclight Robotics", "Climate Tech", 72, "$250K – $500K", ["BK", "RS"], "3d ago"), mk("Solace Health", "Digital Health", 68, "$200K – $400K", ["JM"], "1d ago"), mk("Loomis AI", "Applied AI", 81, "$300K – $600K", ["BK", "RS", "JM"], "6h ago")] },
      { name: "Screening", count: 2, deals: [mk("Verdant Bio", "Biotech", 85, "$500K – $1M", ["RS", "JM"], "2d ago"), mk("Ferrous Analytics", "Fintech Data", 79, "$400K – $800K", ["BK"], "4d ago")] },
      { name: "Diligence", count: 2, deals: [mk("Kestrel Space", "Aerospace", 91, "$750K – $1.5M", ["BK", "RS"], "1d ago"), mk("Nimbus Grid", "Infra AI", 88, "$600K – $1.2M", ["JM", "RS", "BK"], "8h ago")] },
      { name: "Term Sheet", count: 1, deals: [mk("Halcyon Freight", "Logistics", 96, "$1M – $2M", ["BK", "RS", "JM"], "Term sheet issued · 2h ago", true)] }
    ];

    const investments = [
      { company: "Kestrel Space", round: "Series A", invested: "$1.2M", currentValuation: "$95M", multiple: "3.1x", ownership: "2.4%" },
      { company: "Halcyon Freight", round: "Series B", invested: "$1.8M", currentValuation: "$310M", multiple: "4.6x", ownership: "1.1%" },
      { company: "Verdant Bio", round: "Seed", invested: "$650K", currentValuation: "$22M", multiple: "1.8x", ownership: "3.9%" }
    ];

    const founderItems = [["founder-dashboard", "Dashboard"], ["startup-profile-edit", "My Startup Profile"], ["startup-feed", "Startup Feed"], ["discover-investors", "Discover Investors"], ["investor-matches", "Investor Matches"], ["fundraising-progress", "Fundraising"], ["founder-analytics", "Analytics"], ["ai-profile-builder", "AI Profile Builder"], ["founder-rooms", "Rooms"]];
    const investorItems = [["investor-dashboard", "Dashboard"], ["discover-startups", "Discover Startups"], ["saved-startups", "Saved Startups"], ["your-investments", "Your Investments"], ["investor-analytics", "Analytics"]];
    const sharedItems = [["ai-copilot", "AI Copilot"], ["messages", "Messages"], ["settings", "Settings"]];
    const zoneItems = s.zone === "founder" ? founderItems : investorItems;
    const buildNavItem = ([id, label]) => ({
      id, label, isDivider: false, isLink: true, active: s.screen === id,
      color: s.screen === id ? "#e9e9ed" : "#b2b6ca",
      bg: s.screen === id ? "rgba(145,132,217,0.1)" : "transparent",
      borderLeft: s.screen === id ? "2px solid #9184d9" : "2px solid transparent",
      onClick: () => this.goTo(s.zone, id)
    });
    const sidebarNavItems = [...zoneItems.map(buildNavItem), { id: "div1", isDivider: true, isLink: false, label: "", color: "", bg: "", borderLeft: "", onClick: null }, ...sharedItems.map(buildNavItem)];

    const threads = [
      { id: "t1", name: "Rachel Kim", firm: "Birchwood Capital", preview: "Sending the term sheet draft over shortly.", time: "10:42 AM" },
      { id: "t2", name: "Kestrel Space", firm: "Founder · Dana Wren", preview: "Updated data room with Q2 traction numbers.", time: "Yesterday" },
      { id: "t3", name: "Sam Okafor", firm: "Loam Capital", preview: "Can we sync on the syndicate split this week?", time: "Mon" },
      { id: "t4", name: "Halcyon Freight", firm: "Founder · Priya Rao", preview: "Signed. Excited to have you on board.", time: "Last week" }
    ];
    const threadMessagesMap = {
      t1: [{ from: "them", text: "Hi — following up on the Kestrel Space diligence call." }, { from: "me", text: "Thanks Rachel, notes are in the data room under Diligence." }, { from: "them", text: "Perfect. Sending the term sheet draft over shortly." }],
      t2: [{ from: "them", text: "Just pushed updated Q2 traction numbers to the data room." }, { from: "me", text: "Got it, reviewing today." }],
      t3: [{ from: "them", text: "Can we sync on the syndicate split this week?" }, { from: "me", text: "Yes — Thursday works on my end." }],
      t4: [{ from: "them", text: "Signed. Excited to have you on board." }, { from: "me", text: "Congratulations — looking forward to it." }]
    };
    const activeThread = threads.find((t) => t.id === s.activeThreadId) || threads[0];
    const activeMessages = (threadMessagesMap[activeThread.id] || threadMessagesMap.t1).map((m) => ({ text: m.text, justify: m.from === "me" ? "flex-end" : "flex-start", bg: m.from === "me" ? "linear-gradient(135deg,#9184d9,#423a6a)" : "rgba(233,233,237,0.06)" }));
    const threadsWithHandlers = threads.map((t) => ({ ...t, rowBg: t.id === activeThread.id ? "rgba(145,132,217,0.08)" : "transparent", onClick: () => this.selectThread(t.id) }));

    const notifications = [
      { id: "n1", text: "New AI Smart Match: Halcyon Freight (96%)", time: "2h ago" },
      { id: "n2", text: "Rachel Kim joined the Kestrel Space syndicate", time: "5h ago" },
      { id: "n3", text: "Term sheet issued for Halcyon Freight", time: "1d ago" },
      { id: "n4", text: "Nimbus Grid updated their data room", time: "2d ago" }
    ];

    let drawerItem = null;
    if (s.drawer) {
      if (s.drawer.type === "startup") {
        const x = STARTUPS.find((i) => i.id === s.drawer.id);
        if (x) drawerItem = { kind: "Startup", name: x.name, subtitle: x.sector + " · " + x.stage, ...tier(x.match), match: x.match, tags: [x.stage, x.sector], meta: [{ label: "Check Fit", value: x.checkFit }, { label: "Ask", value: x.ask }, { label: "Location", value: x.location }], desc: x.desc, primaryLabel: "Add to Pipeline", onViewFull: () => this.goTo(s.zone === "public" ? "investor" : s.zone, "startup-profile-view", { selectedStartupId: x.id }) };
      } else if (s.drawer.type === "investor") {
        const x = INVESTORS.find((i) => i.id === s.drawer.id);
        if (x) drawerItem = { kind: "Investor", name: x.name, subtitle: x.firm + " · " + x.title, ...tier(x.match), match: x.match, tags: x.thesis, meta: [{ label: "Check Size", value: x.checkSize }, { label: "Portfolio", value: x.portfolio + " companies" }, { label: "Location", value: x.location }], desc: "Actively deploying against a thesis matched to your profile.", primaryLabel: "Request Intro", onViewFull: () => this.goTo(s.zone === "public" ? "founder" : s.zone, "investor-profile-view", { selectedInvestorId: x.id }) };
      }
    }

    const selectedStartup = startupCards.find((x) => x.id === s.selectedStartupId) || startupCards[2];
    const selectedInvestor = investorCards.find((x) => x.id === s.selectedInvestorId) || investorCards[0];

    const screenIds = ["landing", "login", "signup", "forgot-password", "onboarding", "about", "founder-dashboard", "startup-profile-edit", "startup-feed", "discover-investors", "investor-profile-view", "investor-matches", "fundraising-progress", "founder-analytics", "ai-profile-builder", "founder-rooms", "investor-dashboard", "discover-startups", "startup-profile-view", "saved-startups", "your-investments", "investor-analytics", "messages", "settings", "ai-copilot"];
    const toKey = (id) => id.replace(/-([a-z])/g, (m, c) => c.toUpperCase());
    const is = {};
    screenIds.forEach((id) => { is[toKey(id)] = s.screen === id; });

    const TITLES = { "founder-dashboard": "Dashboard", "startup-profile-edit": "My Startup Profile", "startup-feed": "Startup Feed", "discover-investors": "Discover Investors", "investor-profile-view": "Investor Profile", "investor-matches": "Investor Matches", "fundraising-progress": "Fundraising Progress", "founder-analytics": "Analytics", "ai-profile-builder": "AI Profile Builder", "founder-rooms": "Rooms", "investor-dashboard": "Dashboard", "discover-startups": "Discover Startups", "startup-profile-view": "Startup Profile", "saved-startups": "Saved Startups", "your-investments": "Your Investments", "investor-analytics": "Analytics", "messages": "Messages", "settings": "Settings", "ai-copilot": "AI Copilot" };

    const fallbackAppZone = s.zone === "public" ? "founder" : s.zone;
    const bnDiscoverId = fallbackAppZone === "investor" ? "discover-startups" : "discover-investors";
    const bottomNavItems = [
      { id: "home", label: "Home", iconPath: "M3 12 12 4l9 8M5 10v9h14v-9", active: s.screen.includes("dashboard"), onClick: () => this.goTo(fallbackAppZone, fallbackAppZone + "-dashboard") },
      { id: "discover", label: "Discover", iconPath: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3", active: s.screen === bnDiscoverId, onClick: () => this.goTo(fallbackAppZone, bnDiscoverId) },
      { id: "messages", label: "Messages", iconPath: "M21 11.5a8.4 8.4 0 0 1-1.2 4.4L21 20l-4.3-1a8.4 8.4 0 1 1 4.3-7.5z", active: s.screen === "messages", onClick: () => this.goTo(fallbackAppZone, "messages") },
      { id: "copilot", label: "Copilot", iconPath: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4", active: s.copilotOpen, onClick: this.toggleCopilot },
      { id: "settings", label: "Settings", iconPath: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 13a7.5 7.5 0 0 0 0-2l2-1.5-2-3.4-2.3.9a7.6 7.6 0 0 0-1.7-1L15 3h-4l-.4 2.5a7.6 7.6 0 0 0-1.7 1l-2.3-.9-2 3.4L6.6 11a7.5 7.5 0 0 0 0 2l-2 1.5 2 3.4 2.3-.9a7.6 7.6 0 0 0 1.7 1L11 21h4l.4-2.5a7.6 7.6 0 0 0 1.7-1l2.3.9 2-3.4z", active: s.screen === "settings", onClick: () => this.goTo(fallbackAppZone, "settings") }
    ].map(it => ({ ...it, color: it.active ? "#9184d9" : "#75798c" }));
    const searchQuickLinks = [
      { label: "Discover Startups", onClick: () => { this.setState({ searchOpen: false }); this.goTo("investor", "discover-startups"); } },
      { label: "Discover Investors", onClick: () => { this.setState({ searchOpen: false }); this.goTo("founder", "discover-investors"); } },
      { label: "Messages", onClick: () => { this.setState({ searchOpen: false }); this.goTo(fallbackAppZone, "messages"); } },
      { label: "Settings", onClick: () => { this.setState({ searchOpen: false }); this.goTo(fallbackAppZone, "settings"); } }
    ];

    return {
      vantaRef: this.vantaRef,
      isPublic: s.zone === "public", isApp: s.zone !== "public", isFounder: s.zone === "founder", isInvestor: s.zone === "investor",
      is, screenTitle: TITLES[s.screen] || "",
      founderTabBg: s.zone === "founder" ? "rgba(145,132,217,0.15)" : "transparent",
      founderTabColor: s.zone === "founder" ? "#b5abfc" : "#b2b6ca",
      investorTabBg: s.zone === "investor" ? "rgba(145,132,217,0.15)" : "transparent",
      investorTabColor: s.zone === "investor" ? "#b5abfc" : "#b2b6ca",
      goPublicLanding: () => this.goTo("public", "landing"),
      goPublicLogin: () => this.goTo("public", "login"),
      goPublicSignup: () => this.goTo("public", "signup"),
      goPublicForgot: () => this.goTo("public", "forgot-password"),
      goPublicOnboarding: () => this.goTo("public", "onboarding"),
      goPublicAbout: () => this.goTo("public", "about"),
      goFounderHome: () => this.goTo("founder", "founder-dashboard"),
      goInvestorHome: () => this.goTo("investor", "investor-dashboard"),
      goSettings: () => this.goTo(fallbackAppZone, "settings"),
      backToDiscoverInvestors: () => this.goTo("founder", "discover-investors"),
      backToDiscoverStartups: () => this.goTo("investor", "discover-startups"),
      sidebarNavItems, dealColumns, startupCards, investorCards, topInvestors, savedStartupCards, investments,
      isMobile: s.isMobile, sidebarDisplay: s.isMobile ? "none" : "flex", mainMarginLeft: s.isMobile ? "0" : "240px", mainPaddingBottom: s.isMobile ? "84px" : "0", bottomNavItems,
      threads: threadsWithHandlers, activeThread, activeMessages, notifications,
      drawerOpen: !!s.drawer, drawerItem, closeDrawer: this.closeDrawer,
      searchOpen: s.searchOpen, notifOpen: s.notifOpen, copilotOpen: s.copilotOpen,
      toggleSearch: this.toggleSearch, toggleNotif: this.toggleNotif, toggleCopilot: this.toggleCopilot,
      showCopilotFab: s.screen !== "landing" && !(s.zone === "public" && (s.screen === "login" || s.screen === "signup" || s.screen === "forgot-password")),
      selectedStartup, selectedInvestor, searchQuickLinks,
      openFullCopilot: () => { this.setState({ copilotOpen: false }); this.goTo(fallbackAppZone, "ai-copilot"); },
      showSyndicate: this.props.showSyndicateAvatars ?? true
    };
  }
}