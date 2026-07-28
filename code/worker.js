const INDEX_HTML = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <meta http-equiv=\"Cache-Control\" content=\"no-cache, no-store, must-revalidate\">\n  <meta http-equiv=\"Pragma\" content=\"no-cache\">\n  <meta http-equiv=\"Expires\" content=\"0\">\n  <title>Flagrants — Heraldic dignity for those who never deserved it</title>\n  <link rel=\"manifest\" href=\"manifest.json?v=1401\">\n  <meta name=\"theme-color\" content=\"#FFD700\">\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n  <link href=\"https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cinzel:wght@600;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Outfit:wght@400;500;600;700&display=swap\" rel=\"stylesheet\">\n  <style>\n    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n\n    body {\n      background: #0d0804;\n      background-image: \n        radial-gradient(circle at 50% 0%, rgba(212, 160, 48, 0.12) 0%, transparent 60%),\n        radial-gradient(circle at 10% 80%, rgba(120, 30, 20, 0.15) 0%, transparent 50%);\n      color: #e8d5a3;\n      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n      min-height: 100vh;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n    }\n\n    header {\n      width: 100%;\n      padding: 2.5rem 1.5rem 1.5rem;\n      text-align: center;\n      border-bottom: 1px solid rgba(212, 160, 48, 0.25);\n      background: rgba(13, 8, 4, 0.85);\n      backdrop-filter: blur(12px);\n    }\n\n    .header-logo {\n      display: flex;\n      justify-content: center;\n      margin-bottom: 0.6rem;\n    }\n\n    .header-logo svg {\n      width: 100%;\n      max-width: 260px;\n      height: auto;\n      filter: drop-shadow(0 4px 14px rgba(0,0,0,0.7));\n      transition: transform 0.3s ease;\n    }\n    .header-logo svg:hover {\n      transform: scale(1.02);\n    }\n\n    header h1 {\n      font-family: 'Cinzel Decorative', 'Cinzel', serif;\n      font-size: 3rem;\n      color: #FFD700;\n      letter-spacing: 0.12em;\n      text-transform: uppercase;\n      text-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);\n    }\n\n    header p.tagline {\n      font-family: 'EB Garamond', serif;\n      font-size: 1.15rem;\n      color: #c8a060;\n      font-style: italic;\n      margin-top: 0.4rem;\n      letter-spacing: 0.05em;\n    }\n\n    main {\n      width: 100%;\n      max-width: 900px;\n      padding: 2.5rem 1.5rem;\n      display: flex;\n      flex-direction: column;\n      gap: 2.5rem;\n    }\n\n    /* Mode Switcher Tabs (3-Column Mobile Friendly Layout) */\n    .mode-tabs {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: 0.5rem;\n      width: 100%;\n      margin-bottom: 0.5rem;\n    }\n\n    @media (max-width: 640px) {\n      .mode-tabs {\n        grid-template-columns: 1fr;\n      }\n    }\n\n    .mode-tab {\n      background: #140b04;\n      border: 1px solid rgba(212, 160, 48, 0.3);\n      color: #c8a060;\n      font-family: 'Cinzel', serif;\n      font-size: 0.85rem;\n      padding: 0.75rem 0.5rem;\n      border-radius: 6px;\n      cursor: pointer;\n      text-align: center;\n      transition: all 0.2s ease;\n      font-weight: 600;\n      line-height: 1.3;\n    }\n\n    .mode-tab.active {\n      background: linear-gradient(135deg, #3d2508 0%, #663d00 100%);\n      border-color: #FFD700;\n      color: #FFD700;\n      font-weight: bold;\n      box-shadow: 0 0 12px rgba(255, 215, 0, 0.3);\n    }\n\n    .input-panel {\n      background: rgba(26, 16, 8, 0.85);\n      backdrop-filter: blur(16px);\n      border: 1px solid rgba(212, 160, 48, 0.35);\n      border-radius: 8px;\n      padding: 2rem;\n      display: flex;\n      flex-direction: column;\n      gap: 1.5rem;\n      box-shadow: 0 12px 36px rgba(0,0,0,0.6);\n    }\n\n    .input-panel h2 {\n      font-family: 'Cinzel', serif;\n      font-size: 1.15rem;\n      color: #FFD700;\n      text-transform: uppercase;\n      letter-spacing: 0.12em;\n      display: flex;\n      align-items: center;\n      gap: 0.6rem;\n    }\n\n    .field-row {\n      display: flex;\n      gap: 1rem;\n      flex-wrap: wrap;\n    }\n\n    .field-group {\n      display: flex;\n      flex-direction: column;\n      gap: 0.5rem;\n      flex: 1;\n      min-width: 220px;\n    }\n\n    label {\n      font-size: 0.85rem;\n      color: #c8a060;\n      text-transform: uppercase;\n      letter-spacing: 0.09em;\n      font-weight: 600;\n    }\n\n    input[type=\"text\"] {\n      background: #140b04;\n      border: 1px solid rgba(212, 160, 48, 0.4);\n      color: #FFD700;\n      font-family: 'Outfit', sans-serif;\n      font-size: 1.05rem;\n      padding: 0.85rem 1.1rem;\n      border-radius: 6px;\n      outline: none;\n      transition: all 0.25s ease;\n    }\n\n    input[type=\"text\"]:focus {\n      border-color: #FFD700;\n      box-shadow: 0 0 12px rgba(255, 215, 0, 0.25);\n    }\n\n    .lens-grid {\n      display: grid;\n      grid-template-columns: repeat(auto-fill, minmax(135px, 1fr));\n      gap: 0.7rem;\n    }\n\n    .lens-btn {\n      background: #190e05;\n      border: 1px solid rgba(212, 160, 48, 0.3);\n      color: #c8a060;\n      font-family: 'Outfit', sans-serif;\n      font-size: 0.88rem;\n      padding: 0.75rem 0.6rem;\n      border-radius: 6px;\n      cursor: pointer;\n      text-align: center;\n      transition: all 0.2s ease;\n      line-height: 1.3;\n      font-weight: 500;\n    }\n\n    .lens-btn:hover {\n      background: #2b1809;\n      border-color: #FFD700;\n      color: #FFD700;\n      transform: translateY(-2px);\n    }\n\n    .lens-btn.selected {\n      background: linear-gradient(135deg, #3d2508 0%, #663d00 100%);\n      border-color: #FFD700;\n      color: #FFD700;\n      font-weight: 700;\n      box-shadow: 0 0 14px rgba(255, 215, 0, 0.3);\n    }\n\n    .generate-btn {\n      background: linear-gradient(135deg, #8a4e00 0%, #c47800 100%);\n      border: 1px solid #FFD700;\n      color: #ffffff;\n      font-family: 'Cinzel', serif;\n      font-size: 1.15rem;\n      font-weight: 700;\n      letter-spacing: 0.1em;\n      text-transform: uppercase;\n      padding: 1rem 2rem;\n      border-radius: 6px;\n      cursor: pointer;\n      transition: all 0.25s ease;\n      box-shadow: 0 4px 15px rgba(138, 78, 0, 0.4);\n    }\n\n    .generate-btn:hover {\n      background: linear-gradient(135deg, #a65e00 0%, #e08b00 100%);\n      transform: translateY(-2px);\n      box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);\n    }\n\n    .generate-btn:disabled {\n      opacity: 0.4;\n      cursor: not-allowed;\n      transform: none;\n    }\n\n    .loading {\n      text-align: center;\n      padding: 2.5rem;\n      color: #FFD700;\n      font-family: 'EB Garamond', serif;\n      font-style: italic;\n      font-size: 1.25rem;\n      background: rgba(26, 16, 8, 0.85);\n      border: 1px solid rgba(212, 160, 48, 0.3);\n      border-radius: 8px;\n    }\n\n    .error {\n      background: #3a0808;\n      border: 1px solid #8a0000;\n      color: #ff8080;\n      padding: 1.2rem;\n      border-radius: 6px;\n      font-size: 0.95rem;\n    }\n\n    .output-panel {\n      display: none;\n      flex-direction: column;\n      gap: 2rem;\n      background: rgba(26, 16, 8, 0.9);\n      backdrop-filter: blur(16px);\n      border: 1px solid rgba(212, 160, 48, 0.4);\n      border-radius: 8px;\n      padding: 2.2rem;\n      box-shadow: 0 16px 48px rgba(0,0,0,0.7);\n      animation: fadeIn 0.4s ease-out;\n    }\n\n    @keyframes fadeIn {\n      from { opacity: 0; transform: translateY(12px); }\n      to { opacity: 1; transform: translateY(0); }\n    }\n\n    .output-panel.visible { display: flex; }\n\n    .output-header {\n      width: 100%;\n      text-align: center;\n      padding-bottom: 1.4rem;\n      border-bottom: 1px solid rgba(212, 160, 48, 0.25);\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 0.6rem;\n    }\n\n    .main-heading {\n      font-family: 'Cinzel', serif;\n      font-size: 2.2rem;\n      color: #FFD700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      font-weight: bold;\n      line-height: 1.25;\n      text-shadow: 0 2px 8px rgba(0,0,0,0.8);\n    }\n\n    .subject-name {\n      color: #FFD700;\n    }\n\n    .subject-affectation {\n      font-size: 1.45rem;\n      color: #c8a060;\n      font-style: italic;\n      text-transform: none;\n      font-weight: normal;\n      font-family: 'EB Garamond', serif;\n    }\n\n    .motto-header-block {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      margin: 0.6rem 0;\n      gap: 0.25rem;\n    }\n\n    .motto-ribbon-scroll {\n      background: linear-gradient(180deg, #3d2c08 0%, #170e03 100%);\n      border: 1px solid #FFD700;\n      box-shadow: 0 0 10px rgba(255, 215, 0, 0.3), inset 0 0 8px rgba(0,0,0,0.8);\n      padding: 0.45rem 1.6rem;\n      border-radius: 4px;\n    }\n\n    .motto-text-main {\n      font-family: 'Cinzel Decorative', 'Cinzel', serif;\n      font-size: 1.1rem;\n      color: #FFD700;\n      letter-spacing: 0.12em;\n      text-transform: uppercase;\n      font-weight: bold;\n      text-shadow: 0 1px 4px rgba(0,0,0,0.9);\n    }\n\n    .motto-text-sub {\n      font-family: 'EB Garamond', serif;\n      font-size: 1rem;\n      color: #c8a060;\n      font-style: italic;\n    }\n\n    .twinning-block {\n      font-size: 0.98rem;\n      color: #c8a060;\n      margin-top: 0.2rem;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      gap: 0.6rem;\n      flex-wrap: wrap;\n    }\n\n    .twinning-label {\n      color: #a08040;\n      font-weight: bold;\n      text-transform: uppercase;\n      font-size: 0.82rem;\n      letter-spacing: 0.08em;\n    }\n\n    .twinning-item {\n      background: #261608;\n      border: 1px solid rgba(212, 160, 48, 0.4);\n      padding: 0.25rem 0.8rem;\n      border-radius: 14px;\n      color: #FFD700;\n      font-size: 0.9rem;\n      font-style: italic;\n      font-family: 'EB Garamond', serif;\n    }\n\n    .re-design-bar {\n      display: flex;\n      flex-direction: column;\n      gap: 0.6rem;\n      background: #180d04;\n      border: 1px solid rgba(212, 160, 48, 0.25);\n      border-radius: 6px;\n      padding: 0.9rem 1.2rem;\n    }\n\n    .re-design-title {\n      font-size: 0.82rem;\n      color: #a08040;\n      text-transform: uppercase;\n      letter-spacing: 0.08em;\n      font-weight: 600;\n    }\n\n    .re-design-buttons {\n      display: flex;\n      gap: 0.5rem;\n      overflow-x: auto;\n      padding-bottom: 0.2rem;\n    }\n\n    .re-lens-btn {\n      background: #241407;\n      border: 1px solid rgba(212, 160, 48, 0.25);\n      color: #c8a060;\n      font-size: 0.82rem;\n      padding: 0.4rem 0.8rem;\n      border-radius: 4px;\n      cursor: pointer;\n      white-space: nowrap;\n      transition: all 0.2s ease;\n    }\n\n    .re-lens-btn:hover, .re-lens-btn.active {\n      border-color: #FFD700;\n      color: #FFD700;\n      background: #3a200a;\n    }\n\n    .crest-layout {\n      display: grid;\n      grid-template-columns: 270px 1fr;\n      gap: 2.2rem;\n      align-items: start;\n    }\n\n    @media (max-width: 680px) {\n      .crest-layout { grid-template-columns: 1fr; }\n    }\n\n    .crest-figure {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 1rem;\n      background: #170c04;\n      border: 1px solid rgba(212, 160, 48, 0.25);\n      border-radius: 8px;\n      padding: 1.5rem 1rem;\n    }\n\n    .crest-figure svg {\n      filter: drop-shadow(0 6px 16px rgba(0,0,0,0.8));\n      max-width: 100%;\n      height: auto;\n    }\n\n    .export-actions {\n      display: flex;\n      gap: 0.6rem;\n      width: 100%;\n      justify-content: center;\n    }\n\n    .export-btn {\n      background: #241407;\n      border: 1px solid rgba(255, 215, 0, 0.35);\n      color: #FFD700;\n      font-family: 'Outfit', sans-serif;\n      font-size: 0.82rem;\n      font-weight: 600;\n      padding: 0.45rem 0.8rem;\n      border-radius: 4px;\n      cursor: pointer;\n      transition: all 0.2s ease;\n    }\n\n    .export-btn:hover {\n      background: #3d2208;\n      border-color: #FFD700;\n      box-shadow: 0 0 10px rgba(255, 215, 0, 0.25);\n    }\n\n    .commentary-container {\n      display: flex;\n      flex-direction: column;\n      gap: 1rem;\n    }\n\n    .section-subheading {\n      font-family: 'Cinzel', serif;\n      font-size: 1.1rem;\n      color: #FFD700;\n      text-transform: uppercase;\n      letter-spacing: 0.1em;\n      border-bottom: 1px solid rgba(212, 160, 48, 0.3);\n      padding-bottom: 0.5rem;\n    }\n\n    .commentary {\n      display: flex;\n      flex-direction: column;\n      gap: 1.2rem;\n    }\n\n    /* HIGH-CONTRAST PANEL SHOW COMMENTARY CARD (SURVIVAL SCHOOL UPGRADE) */\n    .commentary-block {\n      background: #1f1207;\n      border: 2px solid #FFD700;\n      border-radius: 8px;\n      padding: 1.4rem;\n      display: flex;\n      flex-direction: column;\n      gap: 0.8rem;\n      box-shadow: 0 0 16px rgba(255, 215, 0, 0.2), inset 0 0 12px rgba(0,0,0,0.8);\n    }\n\n    .commentary-header {\n      display: flex;\n      align-items: center;\n      gap: 0.8rem;\n    }\n\n    .story-icon-badge {\n      width: 44px;\n      height: 44px;\n      min-width: 44px;\n      background: #28190c;\n      border: 1px solid #FFD700;\n      border-radius: 6px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      box-shadow: inset 0 0 8px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.5);\n      overflow: hidden;\n    }\n\n    .speaker-tag-badge {\n      font-family: 'Outfit', sans-serif;\n      font-size: 0.85rem;\n      color: #FFD700;\n      font-weight: bold;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n      background: #3a220b;\n      padding: 0.2rem 0.6rem;\n      border-radius: 4px;\n      border: 1px solid rgba(255, 215, 0, 0.4);\n    }\n\n    .commentary-element {\n      font-family: 'Cinzel', serif;\n      font-size: 0.95rem;\n      color: #FFD700;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n\n    .commentary-text {\n      font-family: 'EB Garamond', serif;\n      font-size: 1.15rem;\n      line-height: 1.6;\n      color: #ffffff;\n      font-weight: 500;\n    }\n\n    /* DYNAMIC INTERJECTION BADGE & HIGH-CONTRAST CARD */\n    .interjection-card {\n      background: rgba(0, 212, 255, 0.08);\n      border-left: 3px solid #00d4ff;\n      padding: 0.8rem 1rem;\n      border-radius: 0 6px 6px 0;\n      margin-top: 0.4rem;\n      display: flex;\n      flex-direction: column;\n      gap: 0.3rem;\n    }\n\n    .interjection-header {\n      font-family: 'Outfit', sans-serif;\n      font-size: 0.85rem;\n      color: #00d4ff;\n      font-weight: bold;\n      letter-spacing: 0.06em;\n      display: flex;\n      align-items: center;\n      gap: 0.4rem;\n    }\n\n    .interjection-text {\n      font-family: 'EB Garamond', serif;\n      font-size: 1.1rem;\n      color: #ffffff;\n      font-style: italic;\n    }\n\n    /* ── Unified Mode III Paper-Form Document Layout ──────────────────────── */\n    .mode3-container {\n      display: flex;\n      flex-direction: column;\n      gap: 1.8rem;\n      margin-top: 1rem;\n    }\n\n    .paper-section-card {\n      background: #180d05;\n      border: 1px solid rgba(212, 160, 48, 0.35);\n      border-radius: 8px;\n      overflow: hidden;\n      box-shadow: 0 8px 24px rgba(0,0,0,0.6);\n      display: flex;\n      flex-direction: column;\n    }\n\n    .paper-header-bar {\n      padding: 0.85rem 1.2rem;\n      font-family: 'Cinzel', serif;\n      font-size: 0.95rem;\n      font-weight: 700;\n      letter-spacing: 0.1em;\n      text-transform: uppercase;\n      color: #ffffff;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.6rem;\n      box-shadow: 0 2px 8px rgba(0,0,0,0.5);\n    }\n\n    /* Distinct Vibrant Section Header Colors */\n    .header-gold     { background: linear-gradient(90deg, #b8860b 0%, #664b00 100%); border-bottom: 1px solid #FFD700; }\n    .header-emerald  { background: linear-gradient(90deg, #00aa6c 0%, #005536 100%); border-bottom: 1px solid #00ff9d; }\n    .header-cyan     { background: linear-gradient(90deg, #0088cc 0%, #004466 100%); border-bottom: 1px solid #00d4ff; }\n    .header-burgundy { background: linear-gradient(90deg, #8b0000 0%, #4a0000 100%); border-bottom: 1px solid #ff4d4d; }\n    .header-bronze   { background: linear-gradient(90deg, #8a4e00 0%, #462700 100%); border-bottom: 1px solid #c47800; }\n    .header-spotted  { background: linear-gradient(90deg, #185a9d 0%, #0c2b4d 100%); border-bottom: 1px solid #4ca1af; }\n    .header-debug    { background: linear-gradient(90deg, #332211 0%, #110800 100%); border-bottom: 1px solid #c8a060; }\n\n    .paper-body {\n      padding: 1.5rem;\n      display: flex;\n      flex-direction: column;\n      gap: 1.2rem;\n    }\n\n    /* 100% UNIFIED TYPOGRAPHY (EB Garamond 1.15rem, 1.6 line-height, #e8d5a3) */\n    .tb-slogan {\n      font-family: 'EB Garamond', serif;\n      font-size: 1.4rem;\n      color: #FFD700;\n      font-style: italic;\n      font-weight: bold;\n      line-height: 1.35;\n    }\n\n    .tb-copy, .ta-review, .cr-text, .se-card-body, .excuse-text {\n      font-family: 'EB Garamond', serif;\n      font-size: 1.15rem;\n      color: #e8d5a3;\n      line-height: 1.6;\n    }\n\n    .ta-rating-tag {\n      background: rgba(0, 170, 108, 0.2);\n      border: 1px solid #00aa6c;\n      color: #00ff9d;\n      font-family: 'Outfit', sans-serif;\n      font-size: 0.95rem;\n      font-weight: bold;\n      padding: 0.4rem 0.9rem;\n      border-radius: 4px;\n      display: inline-block;\n      align-self: start;\n    }\n\n    .ta-headline {\n      font-family: 'EB Garamond', serif;\n      font-size: 1.35rem;\n      color: #ffffff;\n      font-weight: bold;\n    }\n\n    .cr-list {\n      display: flex;\n      flex-direction: column;\n      gap: 1rem;\n    }\n\n    .cr-card {\n      background: #241407;\n      border-left: 3px solid #00d4ff;\n      border-radius: 0 6px 6px 0;\n      padding: 1.2rem;\n      display: flex;\n      flex-direction: column;\n      gap: 0.6rem;\n    }\n\n    .cr-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n    }\n\n    .cr-reviewer {\n      font-family: 'Outfit', sans-serif;\n      font-size: 1rem;\n      color: #FFD700;\n      font-weight: bold;\n    }\n\n    .cr-stars {\n      color: #FFD700;\n      font-size: 1.15rem;\n      letter-spacing: 0.1em;\n    }\n\n    .cr-text {\n      font-style: italic;\n    }\n\n    /* Socio-Economic Grid Cards */\n    .se-grid {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n      gap: 1rem;\n    }\n\n    .se-card {\n      background: #221206;\n      border: 1px solid rgba(212, 160, 48, 0.25);\n      border-radius: 6px;\n      padding: 1.1rem;\n      display: flex;\n      flex-direction: column;\n      gap: 0.5rem;\n    }\n\n    .se-card-header {\n      font-family: 'Outfit', sans-serif;\n      font-size: 0.9rem;\n      color: #FFD700;\n      font-weight: bold;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n\n    .excuse-text {\n      font-style: italic;\n      color: #f8c8c8;\n    }\n  </style>\n</head>\n<body>\n\n<header>\n  <div class=\"header-logo\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 160\" width=\"320\" height=\"160\">\n  <defs>\n    <filter id=\"glow\">\n      <feGaussianBlur stdDeviation=\"2.5\" result=\"blur\"/>\n      <feMerge><feMergeNode in=\"blur\"/><feMergeNode in=\"SourceGraphic\"/></feMerge>\n    </filter>\n  </defs>\n\n  <!-- Ground -->\n  <rect x=\"0\" y=\"120\" width=\"320\" height=\"40\" fill=\"#2a1a00\"/>\n  <line x1=\"0\" y1=\"120\" x2=\"320\" y2=\"120\" stroke=\"#5a3d10\" stroke-width=\"1.5\"/>\n\n  <!-- ── CHICKEN (right side, facing left, breathing fire) ── -->\n  <!-- Body -->\n  <ellipse cx=\"250\" cy=\"98\" rx=\"32\" ry=\"24\" fill=\"#c8a030\" stroke=\"#7a5c10\" stroke-width=\"1.5\"/>\n  <!-- Neck -->\n  <ellipse cx=\"224\" cy=\"78\" rx=\"12\" ry=\"16\" fill=\"#c8a030\" stroke=\"#7a5c10\" stroke-width=\"1.5\"/>\n  <!-- Head -->\n  <circle cx=\"214\" cy=\"64\" r=\"14\" fill=\"#c8a030\" stroke=\"#7a5c10\" stroke-width=\"1.5\"/>\n  <!-- Comb -->\n  <path d=\"M 208,53 Q 210,45 213,50 Q 215,42 218,48 Q 221,40 222,48\" fill=\"#CE1126\" stroke=\"none\"/>\n  <!-- Beak (open, facing left) -->\n  <path d=\"M 202,64 L 196,61 L 196,67 Z\" fill=\"#e8a030\"/>\n  <path d=\"M 202,64 L 196,67 L 200,70 Z\" fill=\"#c07020\"/>\n  <!-- Eye -->\n  <circle cx=\"210\" cy=\"61\" r=\"3\" fill=\"#1a1008\"/>\n  <circle cx=\"209\" cy=\"60\" r=\"1\" fill=\"#fff\"/>\n  <!-- Wattle -->\n  <ellipse cx=\"205\" cy=\"70\" rx=\"4\" ry=\"5\" fill=\"#CE1126\"/>\n  <!-- Wing -->\n  <path d=\"M 235,88 Q 248,70 265,80 Q 255,90 240,105 Z\" fill=\"#b89020\" stroke=\"#7a5c10\" stroke-width=\"1\"/>\n  <!-- Tail feathers -->\n  <path d=\"M 280,90 Q 300,70 305,85 Q 295,92 282,98\" fill=\"#c8a030\" stroke=\"#7a5c10\" stroke-width=\"1\"/>\n  <path d=\"M 278,96 Q 302,82 307,98 Q 295,100 280,102\" fill=\"#d4b040\" stroke=\"#7a5c10\" stroke-width=\"1\"/>\n  <!-- Legs -->\n  <line x1=\"242\" y1=\"120\" x2=\"238\" y2=\"135\" stroke=\"#b09030\" stroke-width=\"3\"/>\n  <line x1=\"258\" y1=\"120\" x2=\"262\" y2=\"135\" stroke=\"#b09030\" stroke-width=\"3\"/>\n  <!-- Feet -->\n  <path d=\"M 238,135 L 228,138 M 238,135 L 235,142 M 238,135 L 242,140\" stroke=\"#b09030\" stroke-width=\"2\"/>\n  <path d=\"M 262,135 L 252,138 M 262,135 L 259,142 M 262,135 L 266,140\" stroke=\"#b09030\" stroke-width=\"2\"/>\n\n  <!-- ── FIRE from chicken beak ── -->\n  <g filter=\"url(#glow)\">\n    <path d=\"M 196,64 Q 175,50 155,65 Q 165,55 150,75 Q 160,60 145,80 Q 158,68 148,88 Q 162,72 155,90 Q 165,75 162,95 Q 175,78 170,98 Q 182,80 178,100 Q 188,85 185,105 Q 190,70 196,64 Z\" fill=\"#FF6600\" opacity=\"0.9\"/>\n    <path d=\"M 196,64 Q 178,56 162,68 Q 170,59 158,76 Q 167,63 156,82 Q 168,69 163,88 Q 174,75 170,93 Q 180,78 178,98 Q 187,82 185,104 Q 191,72 196,64 Z\" fill=\"#FF9900\" opacity=\"0.85\"/>\n    <path d=\"M 196,64 Q 182,60 170,70 Q 176,63 166,78 Q 174,66 166,84 Q 176,72 172,90 Q 181,77 179,96 Q 187,80 185,103 Q 191,75 196,64 Z\" fill=\"#FFCC00\" opacity=\"0.8\"/>\n    <path d=\"M 196,64 Q 186,63 178,72 Q 182,66 174,80 Q 182,70 176,88 Q 184,76 182,94 Q 188,80 186,102 Q 192,78 196,64 Z\" fill=\"#FFFFFF\" opacity=\"0.6\"/>\n  </g>\n\n  <!-- ── ST. GEORGE (left side, running right, in full armour) ── -->\n  <line x1=\"48\" y1=\"115\" x2=\"30\" y2=\"117\" stroke=\"#3d2b0a\" stroke-width=\"1\" opacity=\"0.5\"/>\n  <line x1=\"52\" y1=\"110\" x2=\"33\" y2=\"109\" stroke=\"#3d2b0a\" stroke-width=\"1\" opacity=\"0.4\"/>\n  <line x1=\"50\" y1=\"105\" x2=\"32\" y2=\"102\" stroke=\"#3d2b0a\" stroke-width=\"1\" opacity=\"0.3\"/>\n\n  <line x1=\"76\" y1=\"112\" x2=\"55\" y2=\"130\" stroke=\"#5a6a7a\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n  <line x1=\"55\" y1=\"130\" x2=\"42\" y2=\"122\" stroke=\"#5a6a7a\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n  <ellipse cx=\"42\" cy=\"123\" rx=\"10\" ry=\"5\" fill=\"#2a1a08\" transform=\"rotate(-20,42,123)\"/>\n\n  <rect x=\"62\" y=\"72\" width=\"32\" height=\"40\" rx=\"5\" fill=\"#8a9aaa\" stroke=\"#5a6a7a\" stroke-width=\"2\"/>\n  <line x1=\"78\" y1=\"75\" x2=\"78\" y2=\"108\" stroke=\"#6a7a8a\" stroke-width=\"1\"/>\n  <ellipse cx=\"78\" cy=\"78\" rx=\"6\" ry=\"4\" fill=\"none\" stroke=\"#6a7a8a\" stroke-width=\"1\"/>\n\n  <rect x=\"75\" y=\"80\" width=\"6\" height=\"18\" fill=\"#CE1126\" opacity=\"0.85\"/>\n  <rect x=\"68\" y=\"85\" width=\"20\" height=\"6\" fill=\"#CE1126\" opacity=\"0.85\"/>\n\n  <line x1=\"78\" y1=\"112\" x2=\"100\" y2=\"128\" stroke=\"#5a6a7a\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n  <line x1=\"100\" y1=\"128\" x2=\"110\" y2=\"118\" stroke=\"#5a6a7a\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n  <ellipse cx=\"111\" cy=\"119\" rx=\"10\" ry=\"5\" fill=\"#2a1a08\" transform=\"rotate(15,111,119)\"/>\n\n  <g transform=\"translate(58,78) rotate(20)\">\n    <path d=\"M 0,0 L 22,0 L 22,28 Q 11,38 0,28 Z\" fill=\"#CE1126\" stroke=\"#8a1a08\" stroke-width=\"2\"/>\n    <rect x=\"8\" y=\"3\" width=\"4\" height=\"20\" fill=\"#FFD700\"/>\n    <rect x=\"2\" y=\"10\" width=\"18\" height=\"4\" fill=\"#FFD700\"/>\n  </g>\n\n  <line x1=\"90\" y1=\"78\" x2=\"118\" y2=\"88\" stroke=\"#5a6a7a\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n  <ellipse cx=\"119\" cy=\"89\" rx=\"7\" ry=\"5\" fill=\"#6a7a8a\" stroke=\"#4a5a6a\" stroke-width=\"1.5\"/>\n  <line x1=\"119\" y1=\"87\" x2=\"138\" y2=\"103\" stroke=\"#c0c8d0\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n  <line x1=\"115\" y1=\"91\" x2=\"123\" y2=\"83\" stroke=\"#c0c8d0\" stroke-width=\"2\"/>\n  <circle cx=\"115\" cy=\"92\" r=\"3\" fill=\"#8a9aaa\"/>\n\n  <rect x=\"73\" y=\"60\" width=\"12\" height=\"14\" rx=\"3\" fill=\"#8a9aaa\" stroke=\"#5a6a7a\" stroke-width=\"1.5\"/>\n\n  <ellipse cx=\"79\" cy=\"58\" rx=\"16\" ry=\"14\" fill=\"#7a8a9a\" stroke=\"#5a6a7a\" stroke-width=\"2\"/>\n  <line x1=\"68\" y1=\"56\" x2=\"90\" y2=\"56\" stroke=\"#3a4a5a\" stroke-width=\"2\"/>\n  <line x1=\"70\" y1=\"60\" x2=\"88\" y2=\"60\" stroke=\"#3a4a5a\" stroke-width=\"1.5\"/>\n  <path d=\"M 79,45 Q 72,32 68,38 Q 65,28 70,34 Q 67,22 74,30\" fill=\"#CE1126\" stroke=\"none\"/>\n  <rect x=\"77\" y=\"48\" width=\"4\" height=\"12\" fill=\"#5a6a7a\"/>\n\n  <ellipse cx=\"65\" cy=\"75\" rx=\"10\" ry=\"6\" fill=\"#7a8a9a\" stroke=\"#5a6a7a\" stroke-width=\"1.5\"/>\n  <ellipse cx=\"93\" cy=\"75\" rx=\"10\" ry=\"6\" fill=\"#7a8a9a\" stroke=\"#5a6a7a\" stroke-width=\"1.5\"/>\n</svg>\n\n  </div>\n  <h1>Flagrants</h1>\n  <p class=\"tagline\">Heraldic dignity for those who never deserved it</p>\n</header>\n\n<main>\n\n  <div class=\"mode-tabs\">\n    <button class=\"mode-tab active\" id=\"tab-location\">Mode I — Location Flag</button>\n    <button class=\"mode-tab\" id=\"tab-family\">Mode II — Family / Group Crest</button>\n    <button class=\"mode-tab\" id=\"tab-tourist\">Mode III — Tourist Board & TripAdvisor</button>\n  </div>\n\n  <div class=\"input-panel\">\n    <h2 id=\"panel-title\">Mode I — Location Flag</h2>\n\n    <div class=\"field-row\">\n      <div class=\"field-group\">\n        <label id=\"input-label\" for=\"location\">Location, postcode, or place</label>\n        <input type=\"text\" id=\"location\" placeholder=\"e.g. Slough, SW1A 1AA, Runnymede…\" autocomplete=\"off\"/>\n      </div>\n    </div>\n\n    <!-- Defence Lens selection (Hidden automatically in Mode III) -->\n    <div class=\"field-group\" id=\"lens-group\">\n      <label>Defence Lens</label>\n      <div class=\"lens-grid\" id=\"lens-grid\">\n        <!-- Populated by JS -->\n      </div>\n    </div>\n\n    <button class=\"generate-btn\" id=\"generate-btn\" disabled>🚩 BLAZON THIS BOROUGH</button>\n  </div>\n\n  <div class=\"loading\" id=\"loading\" style=\"display:none\">\n    The Herald is researching. This may take a moment. He is thorough.\n  </div>\n\n  <div class=\"error\" id=\"error\" style=\"display:none\"></div>\n\n  <div class=\"output-panel\" id=\"output-panel\">\n    <div class=\"output-header\">\n      <h2 class=\"main-heading\">\n        <span class=\"subject-name\" id=\"subject-name\"></span>\n        <span class=\"subject-affectation\" id=\"subject-affectation\"></span>\n      </h2>\n\n      <!-- Motto Ribbon Banner under Main Title -->\n      <div class=\"motto-header-block\" id=\"motto-header-block\">\n        <div class=\"motto-ribbon-scroll\">\n          <span class=\"motto-text-main\" id=\"motto-text-main\"></span>\n        </div>\n        <div class=\"motto-text-sub\" id=\"motto-text-sub\"></div>\n      </div>\n\n      <div class=\"twinning-block\" id=\"twinning-block\"></div>\n    </div>\n\n    <!-- Fast Lens Switcher bar (Hidden in Mode III) -->\n    <div class=\"re-design-bar\" id=\"re-design-bar\">\n      <div class=\"re-design-title\">⚡ Try another Defence Lens instantly:</div>\n      <div class=\"re-design-buttons\" id=\"re-design-buttons\"></div>\n    </div>\n\n    <!-- Crest Layout (Hidden in Mode III so Mode 3 is 100% focused on Tourist Board & Audit) -->\n    <div class=\"crest-layout\" id=\"crest-layout\">\n      <div class=\"crest-figure\">\n        <div id=\"crest-svg\"></div>\n        <div class=\"export-actions\">\n          <button class=\"export-btn\" id=\"export-png-btn\">📥 Save Image (PNG)</button>\n          <button class=\"export-btn\" id=\"export-svg-btn\">📄 Export Vector (SVG)</button>\n        </div>\n      </div>\n      <div class=\"commentary-container\">\n        <h3 class=\"section-subheading\">Segment Pictures & Panel Stories</h3>\n        <div class=\"commentary\" id=\"commentary\"></div>\n      </div>\n    </div>\n\n    <!-- Mode III — Paper-Form Municipal Audit Section Boxes -->\n    <div class=\"mode3-container\" id=\"mode3-container\" style=\"display:none\">\n      \n      <!-- Section 1: Tourist Board Brochure -->\n      <div class=\"paper-section-card\">\n        <div class=\"paper-header-bar header-gold\">\n          <span>🏛️ MUNICIPAL TOURIST BOARD OFFICIAL BROCHURE</span>\n          <span style=\"font-size:0.75rem; opacity:0.8;\">FORM TB-101</span>\n        </div>\n        <div class=\"paper-body\">\n          <div class=\"tb-slogan\" id=\"tb-slogan\"></div>\n          <div class=\"tb-copy\" id=\"tb-copy\"></div>\n        </div>\n      </div>\n\n      <!-- Section 2: TripAdvisor Expert Audit -->\n      <div class=\"paper-section-card\">\n        <div class=\"paper-header-bar header-emerald\">\n          <span>🦉 TRIPADVISOR EXPERT AUDIT REVIEW</span>\n          <span style=\"font-size:0.75rem; opacity:0.8;\">AUDIT #4092</span>\n        </div>\n        <div class=\"paper-body\">\n          <div class=\"ta-rating-tag\" id=\"ta-rating\"></div>\n          <div class=\"ta-headline\" id=\"ta-headline\"></div>\n          <div class=\"ta-review\" id=\"ta-review\"></div>\n        </div>\n      </div>\n\n      <!-- Section 3: Verified Customer Reviews -->\n      <div class=\"paper-section-card\">\n        <div class=\"paper-header-bar header-cyan\">\n          <span>⭐ VERIFIED VISITOR REVIEWS (1–5 STARS)</span>\n          <span style=\"font-size:0.75rem; opacity:0.8;\">VISITOR LOG</span>\n        </div>\n        <div class=\"paper-body\">\n          <div class=\"cr-list\" id=\"cr-list\"></div>\n        </div>\n      </div>\n\n      <!-- Section 4: Socio-Economic Audit -->\n      <div class=\"paper-section-card\">\n        <div class=\"paper-header-bar header-burgundy\">\n          <span>📊 SOCIO-ECONOMIC & DEMOGRAPHIC AUDIT</span>\n          <span style=\"font-size:0.75rem; opacity:0.8;\">OFSTED & POLICE REPORT</span>\n        </div>\n        <div class=\"paper-body\">\n          <div class=\"se-grid\">\n            <div class=\"se-card\">\n              <div class=\"se-card-header\">🎓 Schools & Education</div>\n              <div class=\"se-card-body\" id=\"se-schools\"></div>\n            </div>\n            <div class=\"se-card\">\n              <div class=\"se-card-header\">EXPLANATION OF PUBLIC ORDER</div>\n              <div class=\"se-card-body\" id=\"se-crime\"></div>\n            </div>\n            <div class=\"se-card\">\n              <div class=\"se-card-header\">⚒️ Workforce & Skilled Labour</div>\n              <div class=\"se-card-body\" id=\"se-workforce\"></div>\n            </div>\n            <div class=\"se-card\">\n              <div class=\"se-card-header\">🏠 Housing & Property Market</div>\n              <div class=\"se-card-body\" id=\"se-housing\"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Section 5: Official Excuse -->\n      <div class=\"paper-section-card\">\n        <div class=\"paper-header-bar header-bronze\">\n          <span>📜 OFFICIAL MUNICIPAL EXCUSE</span>\n          <span style=\"font-size:0.75rem; opacity:0.8;\">COUNCIL MINUTES</span>\n        </div>\n        <div class=\"paper-body\">\n          <div class=\"excuse-text\" id=\"excuse-text\"></div>\n        </div>\n      </div>\n\n      <!-- Section 6: Local Gazette & Spotted:Town Community Chatter -->\n      <div class=\"paper-section-card\">\n        <div class=\"paper-header-bar header-spotted\">\n          <span>📱 LOCAL GAZETTE & SPOTTED:[TOWN] COMMUNITY INTELLIGENCE</span>\n          <span style=\"font-size:0.75rem; opacity:0.8;\" id=\"spotted-header-tag\">COMMUNITY GROUP</span>\n        </div>\n        <div class=\"paper-body\">\n          <div style=\"font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: #4ca1af; font-weight: bold;\" id=\"gazette-paper-name\"></div>\n          <div style=\"font-family: 'EB Garamond', serif; font-size: 1.3rem; color: #ffffff; font-weight: bold; font-style: italic;\" id=\"gazette-headline\"></div>\n          <div style=\"background: #111d28; border-left: 3px solid #4ca1af; padding: 1rem; border-radius: 0 4px 4px 0; margin-top: 0.4rem;\">\n            <div style=\"font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: #FFD700; font-weight: bold;\" id=\"spotted-group-name\"></div>\n            <div style=\"font-family: 'EB Garamond', serif; font-size: 1.15rem; color: #e8d5a3; font-style: italic; margin-top: 0.3rem;\" id=\"spotted-post-text\"></div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Section 7: Debug Research Findings Panel (Hidden in Production — Enabled via ?debug=1) -->\n      <div class=\"paper-section-card\" id=\"debug-research-card\" style=\"display:none\">\n        <div class=\"paper-header-bar header-debug\">\n          <span>🔬 HERALDIC MUNICIPAL RESEARCH DATA (DEBUG LOG)</span>\n          <span style=\"font-size:0.75rem; opacity:0.8;\">RESEARCH SPEC</span>\n        </div>\n        <div class=\"paper-body\">\n          <pre id=\"debug-research-json\" style=\"font-family: monospace; font-size: 0.85rem; color: #FFD700; white-space: pre-wrap; background: #0d0804; padding: 1rem; border-radius: 4px; border: 1px solid rgba(212,160,48,0.3); max-height: 300px; overflow-y: auto;\"></pre>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n\n</main>\n\n<script>\n  // Client-Side Standalone SVG Renderer Engine\n  // svg-renderer.js\n// Hybrid Layered SVG Renderer for Flagrants — 3D Metallic & Textured Medieval Heraldry\n\n\n    const TINCTURES = {\n      metals: { Or: { name: 'Or', colour: '#FFD700' }, Argent: { name: 'Argent', colour: '#FFFFFF' } },\n      colours: { Gules: { name: 'Gules', colour: '#CE1126' }, Azure: { name: 'Azure', colour: '#0032A0' }, Sable: { name: 'Sable', colour: '#1C1C1C' }, Vert: { name: 'Vert', colour: '#008000' }, Purpure: { name: 'Purpure', colour: '#7B2D8B' } }\n    };\n  \n\nconst SHIELD_WIDTH = 200;\nconst SHIELD_HEIGHT = 240;\nconst SVG_WIDTH = 240;\nconst SVG_HEIGHT = 330;\n\n// Heater shield path — classic English shield shape\nfunction shieldPath() {\n  const w = SHIELD_WIDTH;\n  const h = SHIELD_HEIGHT;\n  const hw = w / 2;\n  return `M ${-hw},0\n    Q ${-hw},${-h * 0.05} ${-hw + 8},${-h * 0.05}\n    L ${hw - 8},${-h * 0.05}\n    Q ${hw},${-h * 0.05} ${hw},0\n    L ${hw},${h * 0.55}\n    Q ${hw},${h * 0.75} 0,${h}\n    Q ${-hw},${h * 0.75} ${-hw},${h * 0.55}\n    Z`;\n}\n\nconst TINCTURE_HEX = {\n  or: '#FFD700',\n  argent: '#FFFFFF',\n  gules: '#CE1126',\n  azure: '#0032A0',\n  sable: '#1C1C1C',\n  vert: '#008000',\n  purpure: '#7B2D8B'\n};\n\nfunction getLuminance(hex) {\n  const c = (hex || '#888888').replace('#', '');\n  const r = parseInt(c.substring(0, 2), 16) / 255;\n  const g = parseInt(c.substring(2, 4), 16) / 255;\n  const b = parseInt(c.substring(4, 6), 16) / 255;\n  const f = v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);\n  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);\n}\n\nfunction getContrastRatio(t1, t2) {\n  const h1 = TINCTURE_HEX[(t1 || '').toLowerCase()] || '#888888';\n  const h2 = TINCTURE_HEX[(t2 || '').toLowerCase()] || '#888888';\n  const l1 = getLuminance(h1);\n  const l2 = getLuminance(h2);\n  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);\n}\n\nfunction enforceColourWheelContrast(tincture1, tincture2) {\n  const ratio = getContrastRatio(tincture1, tincture2);\n  if (ratio >= 3.5) return tincture2; // High contrast — keep original\n\n  // Step around the colour wheel to the nearest complementary metal/tincture\n  const t1Low = (tincture1 || 'sable').toLowerCase();\n  if (['sable', 'azure', 'gules', 'vert', 'purpure'].includes(t1Low)) {\n    return t1Low === 'sable' ? 'or' : 'argent';\n  }\n  return 'sable';\n}\n\nfunction tincture(name) {\n  const all = { ...TINCTURES.metals, ...TINCTURES.colours };\n  return all[name]?.colour ?? '#888888';\n}\n\nfunction tinctureFill(name, uniqueId) {\n  const t = (name ?? 'argent').toLowerCase();\n  if (t === 'or') return `url(#grad-or-${uniqueId})`;\n  if (t === 'argent') return `url(#grad-argent-${uniqueId})`;\n  if (t === 'gules') return `url(#grad-gules-${uniqueId})`;\n  if (t === 'azure') return `url(#grad-azure-${uniqueId})`;\n  if (t === 'sable') return `url(#grad-sable-${uniqueId})`;\n  if (t === 'vert') return `url(#grad-vert-${uniqueId})`;\n  if (t === 'purpure') return `url(#grad-purpure-${uniqueId})`;\n  return tincture(t);\n}\n\nfunction renderDefs(uniqueId) {\n  return `\n    <!-- 3D Tincture Gradients -->\n    <linearGradient id=\"grad-or-${uniqueId}\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#FFE875\" />\n      <stop offset=\"40%\" stop-color=\"#FFD700\" />\n      <stop offset=\"75%\" stop-color=\"#C59B27\" />\n      <stop offset=\"100%\" stop-color=\"#805A00\" />\n    </linearGradient>\n\n    <linearGradient id=\"grad-argent-${uniqueId}\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#FFFFFF\" />\n      <stop offset=\"45%\" stop-color=\"#E0E6ED\" />\n      <stop offset=\"80%\" stop-color=\"#B0BCCB\" />\n      <stop offset=\"100%\" stop-color=\"#7B8898\" />\n    </linearGradient>\n\n    <linearGradient id=\"grad-gules-${uniqueId}\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#E62E3D\" />\n      <stop offset=\"45%\" stop-color=\"#CE1126\" />\n      <stop offset=\"80%\" stop-color=\"#8B0000\" />\n      <stop offset=\"100%\" stop-color=\"#4A0000\" />\n    </linearGradient>\n\n    <linearGradient id=\"grad-azure-${uniqueId}\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#2B6CB0\" />\n      <stop offset=\"45%\" stop-color=\"#0032A0\" />\n      <stop offset=\"80%\" stop-color=\"#001F66\" />\n      <stop offset=\"100%\" stop-color=\"#000D33\" />\n    </linearGradient>\n\n    <linearGradient id=\"grad-sable-${uniqueId}\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#3A3A3C\" />\n      <stop offset=\"45%\" stop-color=\"#1A1A1A\" />\n      <stop offset=\"85%\" stop-color=\"#0D0D0E\" />\n      <stop offset=\"100%\" stop-color=\"#000000\" />\n    </linearGradient>\n\n    <linearGradient id=\"grad-vert-${uniqueId}\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#2E8B57\" />\n      <stop offset=\"45%\" stop-color=\"#006B3D\" />\n      <stop offset=\"80%\" stop-color=\"#004020\" />\n      <stop offset=\"100%\" stop-color=\"#002010\" />\n    </linearGradient>\n\n    <linearGradient id=\"grad-purpure-${uniqueId}\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#800080\" />\n      <stop offset=\"45%\" stop-color=\"#550055\" />\n      <stop offset=\"80%\" stop-color=\"#330033\" />\n      <stop offset=\"100%\" stop-color=\"#1A001A\" />\n    </linearGradient>\n\n    <!-- Gold Leaf Emboss Filter -->\n    <filter id=\"gold-emboss-${uniqueId}\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n      <feDropShadow dx=\"1\" dy=\"2\" stdDeviation=\"1.5\" flood-color=\"#000000\" flood-opacity=\"0.8\"/>\n    </filter>\n\n    <!-- Shield Plate Inner Shadow -->\n    <filter id=\"shield-shadow-${uniqueId}\" x=\"-10%\" y=\"-10%\" width=\"120%\" height=\"120%\">\n      <feDropShadow dx=\"3\" dy=\"6\" stdDeviation=\"6\" flood-color=\"#000000\" flood-opacity=\"0.85\"/>\n    </filter>\n  `;\n}\n\nfunction renderField(spec, uniqueId) {\n  const div = spec.field?.division ?? 'plain';\n  const t1 = tinctureFill(spec.field?.tincture ?? 'argent', uniqueId);\n  const t2 = tinctureFill(spec.field?.secondary_tincture ?? 'gules', uniqueId);\n  const w = SHIELD_WIDTH;\n  const h = SHIELD_HEIGHT;\n  const hw = w / 2;\n\n  if (div === 'plain') {\n    return `<rect x=\"${-hw}\" y=\"0\" width=\"${w}\" height=\"${h}\" fill=\"${t1}\" />`;\n  }\n  if (div === 'per_pale') {\n    return `<rect x=\"${-hw}\" y=\"0\" width=\"${hw}\" height=\"${h}\" fill=\"${t1}\" />\n            <rect x=\"0\" y=\"0\" width=\"${hw}\" height=\"${h}\" fill=\"${t2}\" />`;\n  }\n  if (div === 'per_fess') {\n    return `<rect x=\"${-hw}\" y=\"0\" width=\"${w}\" height=\"${h / 2}\" fill=\"${t1}\" />\n            <rect x=\"${-hw}\" y=\"${h / 2}\" width=\"${w}\" height=\"${h / 2}\" fill=\"${t2}\" />`;\n  }\n  if (div === 'quarterly') {\n    return `<rect x=\"${-hw}\" y=\"0\" width=\"${hw}\" height=\"${h / 2}\" fill=\"${t1}\" />\n            <rect x=\"0\" y=\"0\" width=\"${hw}\" height=\"${h / 2}\" fill=\"${t2}\" />\n            <rect x=\"${-hw}\" y=\"${h / 2}\" width=\"${hw}\" height=\"${h / 2}\" fill=\"${t2}\" />\n            <rect x=\"0\" y=\"${h / 2}\" width=\"${hw}\" height=\"${h / 2}\" fill=\"${t1}\" />`;\n  }\n  if (div === 'per_bend') {\n    return `<rect x=\"${-hw}\" y=\"0\" width=\"${w}\" height=\"${h}\" fill=\"${t2}\" />\n            <polygon points=\"${-hw},0 ${hw},0 ${-hw},${h}\" fill=\"${t1}\" />`;\n  }\n  if (div === 'per_bend_sinister') {\n    return `<rect x=\"${-hw}\" y=\"0\" width=\"${w}\" height=\"${h}\" fill=\"${t2}\" />\n            <polygon points=\"${hw},0 ${hw},${h} ${-hw},${h}\" fill=\"${t1}\" />`;\n  }\n  if (div === 'per_chevron') {\n    return `<rect x=\"${-hw}\" y=\"0\" width=\"${w}\" height=\"${h}\" fill=\"${t2}\" />\n            <polygon points=\"${-hw},${h * 0.55} 0,${h * 0.2} ${hw},${h * 0.55} ${hw},${h} ${-hw},${h}\" fill=\"${t1}\" />`;\n  }\n  return `<rect x=\"${-hw}\" y=\"0\" width=\"${w}\" height=\"${h}\" fill=\"${t1}\" />`;\n}\n\nfunction chargePosition(pos, index, total) {\n  const hw = SHIELD_WIDTH / 2; // 100\n  const positions = {\n    centre: [0, 105],\n    dexter: [-hw * 0.42, 105],\n    sinister: [hw * 0.42, 105],\n    chief: [0, 55],\n    base: [0, 155],\n    dexter_chief: [-hw * 0.38, 55],\n    sinister_chief: [hw * 0.38, 55],\n    dexter_base: [-hw * 0.25, 148],\n    sinister_base: [hw * 0.25, 148]\n  };\n  if (!pos || pos === 'auto') {\n    if (total === 1) return positions.centre;\n    if (total === 2) return index === 0 ? positions.dexter : positions.sinister;\n    if (total === 3) {\n      const pts = [positions.dexter_chief, positions.sinister_chief, positions.base];\n      return pts[index] ?? positions.centre;\n    }\n    const pts = [positions.dexter_chief, positions.sinister_chief, positions.dexter_base, positions.sinister_base];\n    return pts[index] ?? positions.centre;\n  }\n  return positions[pos] ?? positions.centre;\n}\n\n// Vector-crafted heraldic charge shapes\nfunction renderCharge(charge, index, total, uniqueId, isStandalone = false) {\n  const [cx, cy] = isStandalone ? [0, 0] : chargePosition(charge?.position, index, total);\n  const col = tinctureFill(charge?.tincture ?? 'or', uniqueId);\n  const baseSize = isStandalone ? 40 : (total === 1 ? 44 : total === 2 ? 38 : 34);\n  const sz = charge?.size ?? baseSize;\n  const id = charge?.id ?? 'lion_rampant';\n\n  const g = (inner) => `<g transform=\"translate(${cx},${cy})\" filter=\"url(#gold-emboss-${uniqueId})\">${inner}</g>`;\n\n  if (id === 'lion_rampant') {\n    return g(`\n      <path d=\"M 0,0 C -${sz*0.15},-${sz*0.2} -${sz*0.1},-${sz*0.4} 0,-${sz*0.42} C ${sz*0.15},-${sz*0.42} ${sz*0.2},-${sz*0.25} ${sz*0.1},0 C ${sz*0.25},${sz*0.1} ${sz*0.2},${sz*0.35} 0,${sz*0.42} Z\" fill=\"${col}\"/>\n      <circle cx=\"-${sz*0.05}\" cy=\"-${sz*0.3}\" r=\"${sz*0.11}\" fill=\"${col}\"/>\n      <path d=\"M -${sz*0.15},-${sz*0.3} L -${sz*0.35},-${sz*0.33} L -${sz*0.25},-${sz*0.24} Z\" fill=\"${col}\"/>\n      <path d=\"M -${sz*0.1},-${sz*0.15} L -${sz*0.35},-${sz*0.25} M -${sz*0.05},-${sz*0.1} L -${sz*0.3},-${sz*0.15}\" stroke=\"${col}\" stroke-width=\"${sz*0.07}\" stroke-linecap=\"round\"/>\n      <path d=\"M 0,${sz*0.2} L -${sz*0.25},${sz*0.42} M ${sz*0.08},${sz*0.2} L ${sz*0.2},${sz*0.4}\" stroke=\"${col}\" stroke-width=\"${sz*0.07}\" stroke-linecap=\"round\"/>\n      <path d=\"M ${sz*0.05},${sz*0.25} Q ${sz*0.38},${sz*0.15} ${sz*0.35},-${sz*0.2} C ${sz*0.32},-${sz*0.3} ${sz*0.42},-${sz*0.35} ${sz*0.38},-${sz*0.25}\" fill=\"none\" stroke=\"${col}\" stroke-width=\"${sz*0.06}\"/>\n    `);\n  }\n\n  if (id === 'lion_passant') {\n    return g(`\n      <ellipse cx=\"0\" cy=\"0\" rx=\"${sz*0.35}\" ry=\"${sz*0.18}\" fill=\"${col}\"/>\n      <circle cx=\"-${sz*0.28}\" cy=\"-${sz*0.13}\" r=\"${sz*0.13}\" fill=\"${col}\"/>\n      <path d=\"M -${sz*0.2},${sz*0.05} L -${sz*0.35},${sz*0.2} M -${sz*0.1},${sz*0.05} L -${sz*0.15},${sz*0.3} M ${sz*0.1},${sz*0.05} L ${sz*0.1},${sz*0.3} M ${sz*0.25},${sz*0.05} L ${sz*0.3},${sz*0.3}\" stroke=\"${col}\" stroke-width=\"${sz*0.07}\" stroke-linecap=\"round\"/>\n      <path d=\"M ${sz*0.325},0 Q ${sz*0.48},-${sz*0.25} ${sz*0.4},-${sz*0.4}\" fill=\"none\" stroke=\"${col}\" stroke-width=\"${sz*0.06}\"/>\n    `);\n  }\n\n  if (id === 'eagle_displayed') {\n    return g(`\n      <ellipse cx=\"0\" cy=\"0\" rx=\"${sz*0.12}\" ry=\"${sz*0.25}\" fill=\"${col}\"/>\n      <polygon points=\"0,${sz*0.1} -${sz*0.15},${sz*0.38} ${sz*0.15},${sz*0.38}\" fill=\"${col}\"/>\n      <path d=\"M -${sz*0.1},-${sz*0.1} C -${sz*0.3},-${sz*0.38} -${sz*0.45},-${sz*0.42} -${sz*0.48},-${sz*0.22} C -${sz*0.4},-${sz*0.08} -${sz*0.25},${sz*0.08} -${sz*0.08},${sz*0.1} Z\" fill=\"${col}\"/>\n      <path d=\"M ${sz*0.1},-${sz*0.1} C ${sz*0.3},-${sz*0.38} ${sz*0.45},-${sz*0.42} ${sz*0.48},-${sz*0.22} C ${sz*0.4},-${sz*0.08} ${sz*0.25},${sz*0.08} ${sz*0.08},${sz*0.1} Z\" fill=\"${col}\"/>\n      <circle cx=\"-${sz*0.08}\" cy=\"-${sz*0.28}\" r=\"${sz*0.09}\" fill=\"${col}\"/>\n      <path d=\"M -${sz*0.15},-${sz*0.28} L -${sz*0.26},-${sz*0.24} L -${sz*0.15},-${sz*0.2} Z\" fill=\"${col}\"/>\n    `);\n  }\n\n  if (id === 'castle' || id === 'tower') {\n    return g(`\n      <rect x=\"-${sz*0.38}\" y=\"-${sz*0.15}\" width=\"${sz*0.76}\" height=\"${sz*0.5}\" fill=\"${col}\"/>\n      <rect x=\"-${sz*0.38}\" y=\"-${sz*0.4}\" width=\"${sz*0.2}\" height=\"${sz*0.35}\" fill=\"${col}\"/>\n      <rect x=\"-${sz*0.1}\" y=\"-${sz*0.4}\" width=\"${sz*0.2}\" height=\"${sz*0.35}\" fill=\"${col}\"/>\n      <rect x=\"${sz*0.18}\" y=\"-${sz*0.4}\" width=\"${sz*0.2}\" height=\"${sz*0.35}\" fill=\"${col}\"/>\n      <path d=\"M -${sz*0.12},${sz*0.35} A ${sz*0.12} ${sz*0.15} 0 0 1 ${sz*0.12},${sz*0.35} V ${sz*0.1} H -${sz*0.12} Z\" fill=\"#1a1008\"/>\n    `);\n  }\n\n  if (id === 'sword') {\n    return g(`\n      <polygon points=\"0,-${sz*0.42} -${sz*0.05},-${sz*0.32} -${sz*0.04},${sz*0.2} ${sz*0.04},${sz*0.2} ${sz*0.05},-${sz*0.32}\" fill=\"${col}\"/>\n      <rect x=\"-${sz*0.22}\" y=\"${sz*0.2}\" width=\"${sz*0.44}\" height=\"${sz*0.07}\" fill=\"${col}\" rx=\"1\"/>\n      <rect x=\"-${sz*0.035}\" y=\"${sz*0.27}\" width=\"${sz*0.07}\" height=\"${sz*0.12}\" fill=\"${col}\"/>\n      <circle cx=\"0\" cy=\"${sz*0.43}\" r=\"${sz*0.055}\" fill=\"${col}\"/>\n    `);\n  }\n\n  if (id === 'crown') {\n    return g(`\n      <rect x=\"-${sz*0.4}\" y=\"${sz*0.08}\" width=\"${sz*0.8}\" height=\"${sz*0.25}\" fill=\"${col}\" rx=\"2\"/>\n      <polygon points=\"-${sz*0.4},${sz*0.08} -${sz*0.4},-${sz*0.26} -${sz*0.22},-${sz*0.08} 0,-${sz*0.32} ${sz*0.22},-${sz*0.08} ${sz*0.4},-${sz*0.26} ${sz*0.4},${sz*0.08}\" fill=\"${col}\"/>\n      <circle cx=\"-${sz*0.4}\" cy=\"-${sz*0.29}\" r=\"${sz*0.04}\" fill=\"${col}\"/>\n      <circle cx=\"0\" cy=\"-${sz*0.35}\" r=\"${sz*0.05}\" fill=\"${col}\"/>\n      <circle cx=\"${sz*0.4}\" cy=\"-${sz*0.29}\" r=\"${sz*0.04}\" fill=\"${col}\"/>\n    `);\n  }\n\n  if (id === 'key') {\n    return g(`\n      <circle cx=\"0\" cy=\"-${sz*0.24}\" r=\"${sz*0.16}\" fill=\"none\" stroke=\"${col}\" stroke-width=\"${sz*0.08}\"/>\n      <rect x=\"-${sz*0.04}\" y=\"-${sz*0.08}\" width=\"${sz*0.08}\" height=\"${sz*0.48}\" fill=\"${col}\" rx=\"1\"/>\n      <rect x=\"0\" y=\"${sz*0.18}\" width=\"${sz*0.15}\" height=\"${sz*0.06}\" fill=\"${col}\"/>\n      <rect x=\"0\" y=\"${sz*0.3}\" width=\"${sz*0.12}\" height=\"${sz*0.06}\" fill=\"${col}\"/>\n    `);\n  }\n\n  if (id === 'hammer') {\n    return g(`\n      <rect x=\"-${sz*0.3}\" y=\"-${sz*0.28}\" width=\"${sz*0.6}\" height=\"${sz*0.24}\" fill=\"${col}\" rx=\"2\"/>\n      <rect x=\"-${sz*0.055}\" y=\"-${sz*0.04}\" width=\"${sz*0.11}\" height=\"${sz*0.44}\" fill=\"${col}\" rx=\"2\"/>\n    `);\n  }\n\n  if (id === 'wheel') {\n    return g(`\n      <circle cx=\"0\" cy=\"0\" r=\"${sz*0.4}\" fill=\"none\" stroke=\"${col}\" stroke-width=\"${sz*0.09}\"/>\n      <circle cx=\"0\" cy=\"0\" r=\"${sz*0.1}\" fill=\"${col}\"/>\n      ${[0,45,90,135].map(a => {\n        const r = a * Math.PI / 180;\n        const x1 = Math.cos(r) * sz*0.1; const y1 = Math.sin(r) * sz*0.1;\n        const x2 = Math.cos(r) * sz*0.38; const y2 = Math.sin(r) * sz*0.38;\n        return `<line x1=\"${x1}\" y1=\"${y1}\" x2=\"${x2}\" y2=\"${y2}\" stroke=\"${col}\" stroke-width=\"${sz*0.07}\"/>\n                <line x1=\"${-x1}\" y1=\"${-y1}\" x2=\"${-x2}\" y2=\"${-y2}\" stroke=\"${col}\" stroke-width=\"${sz*0.07}\"/>`;\n      }).join('')}\n    `);\n  }\n\n  if (id === 'anchor') {\n    return g(`\n      <circle cx=\"0\" cy=\"-${sz*0.28}\" r=\"${sz*0.11}\" fill=\"none\" stroke=\"${col}\" stroke-width=\"${sz*0.07}\"/>\n      <rect x=\"-${sz*0.04}\" y=\"-${sz*0.17}\" width=\"${sz*0.08}\" height=\"${sz*0.58}\" fill=\"${col}\" rx=\"1\"/>\n      <rect x=\"-${sz*0.28}\" y=\"-${sz*0.15}\" width=\"${sz*0.56}\" height=\"${sz*0.07}\" fill=\"${col}\"/>\n      <path d=\"M -${sz*0.28},${sz*0.38} Q -${sz*0.35},${sz*0.5} 0,${sz*0.46} Q ${sz*0.35},${sz*0.5} ${sz*0.28},${sz*0.38}\" fill=\"none\" stroke=\"${col}\" stroke-width=\"${sz*0.08}\"/>\n    `);\n  }\n\n  if (id === 'fleur_de_lis') {\n    return g(`\n      <path d=\"M 0,-${sz*0.4} C ${sz*0.1},-${sz*0.2} ${sz*0.2},-${sz*0.1} ${sz*0.08},${sz*0.3} L -${sz*0.08},${sz*0.3} C -${sz*0.2},-${sz*0.1} -${sz*0.1},-${sz*0.2} 0,-${sz*0.4} Z\" fill=\"${col}\"/>\n      <path d=\"M -${sz*0.05},-${sz*0.05} C -${sz*0.25},-${sz*0.2} -${sz*0.45},-${sz*0.05} -${sz*0.28},${sz*0.15} C -${sz*0.15},${sz*0.15} -${sz*0.08},0 -${sz*0.05},-${sz*0.05} Z\" fill=\"${col}\"/>\n      <path d=\"M ${sz*0.05},-${sz*0.05} C ${sz*0.25},-${sz*0.2} ${sz*0.45},-${sz*0.05} ${sz*0.28},${sz*0.15} C ${sz*0.15},${sz*0.15} ${sz*0.08},0 ${sz*0.05},-${sz*0.05} Z\" fill=\"${col}\"/>\n      <rect x=\"-${sz*0.14}\" y=\"${sz*0.02}\" width=\"${sz*0.28}\" height=\"${sz*0.07}\" fill=\"${col}\" rx=\"1\"/>\n    `);\n  }\n\n  if (id === 'flame') {\n    return g(`\n      <path d=\"M 0,-${sz*0.42} Q ${sz*0.25},-${sz*0.15} ${sz*0.2},${sz*0.2} Q ${sz*0.1},${sz*0.42} 0,${sz*0.38} Q -${sz*0.1},${sz*0.42} -${sz*0.2},${sz*0.2} Q -${sz*0.25},-${sz*0.15} 0,-${sz*0.42} Z\" fill=\"${col}\"/>\n      <path d=\"M 0,-${sz*0.22} Q ${sz*0.12},-${sz*0.05} ${sz*0.1},${sz*0.15} Q 0,${sz*0.28} -${sz*0.1},${sz*0.15} Q -${sz*0.12},-${sz*0.05} 0,-${sz*0.22} Z\" fill=\"#FFD700\"/>\n    `);\n  }\n\n  if (id === 'star') {\n    const pts = [];\n    for (let i = 0; i < 5; i++) {\n      const outer = (i * 72 - 90) * Math.PI / 180;\n      const inner = ((i * 72) + 36 - 90) * Math.PI / 180;\n      pts.push(`${Math.cos(outer)*sz*0.42},${Math.sin(outer)*sz*0.42}`);\n      pts.push(`${Math.cos(inner)*sz*0.18},${Math.sin(inner)*sz*0.18}`);\n    }\n    return g(`<polygon points=\"${pts.join(' ')}\" fill=\"${col}\"/>`);\n  }\n\n  if (id === 'cross_charge') {\n    return g(`\n      <rect x=\"-${sz*0.1}\" y=\"-${sz*0.4}\" width=\"${sz*0.2}\" height=\"${sz*0.8}\" fill=\"${col}\"/>\n      <rect x=\"-${sz*0.4}\" y=\"-${sz*0.1}\" width=\"${sz*0.8}\" height=\"${sz*0.2}\" fill=\"${col}\"/>\n    `);\n  }\n\n  if (id === 'serpent') {\n    return g(`\n      <path d=\"M -${sz*0.2},${sz*0.28} C -${sz*0.4},${sz*0.1} 0,-${sz*0.1} -${sz*0.1},-${sz*0.25} C -${sz*0.15},-${sz*0.35} ${sz*0.15},-${sz*0.4} ${sz*0.2},-${sz*0.25} C ${sz*0.25},-${sz*0.1} -${sz*0.15},${sz*0.1} 0,${sz*0.28}\" fill=\"none\" stroke=\"${col}\" stroke-width=\"${sz*0.09}\" stroke-linecap=\"round\"/>\n      <circle cx=\"${sz*0.2}\" cy=\"-${sz*0.25}\" r=\"${sz*0.07}\" fill=\"${col}\"/>\n    `);\n  }\n\n  if (id === 'bayeux_arrow_eye') {\n    return g(`\n      <!-- Bayeux Tapestry King Harold Arrow in Eye Scene -->\n      <path d=\"M -${sz*0.1},${sz*0.35} L -${sz*0.1},-${sz*0.15} L -${sz*0.25},-${sz*0.15} L -${sz*0.1},-${sz*0.35} L 0,-${sz*0.15} L 0,${sz*0.35} Z\" fill=\"${col}\"/>\n      <circle cx=\"-${sz*0.05}\" cy=\"-${sz*0.28}\" r=\"${sz*0.12}\" fill=\"${col}\"/>\n      <line x1=\"${sz*0.25}\" y1=\"-${sz*0.45}\" x2=\"-${sz*0.04}\" y2=\"-${sz*0.28}\" stroke=\"#CE1126\" stroke-width=\"${sz*0.06}\"/>\n      <polygon points=\"${sz*0.25},-${sz*0.45} ${sz*0.32},-${sz*0.48} ${sz*0.28},-${sz*0.38}\" fill=\"#CE1126\"/>\n      <line x1=\"${sz*0.12}\" y1=\"0\" x2=\"${sz*0.32}\" y2=\"${sz*0.28}\" stroke=\"#FFD700\" stroke-width=\"${sz*0.06}\"/>\n    `);\n  }\n\n  if (id === 'hand') {\n    return g(`\n      <rect x=\"-${sz*0.14}\" y=\"-${sz*0.05}\" width=\"${sz*0.28}\" height=\"${sz*0.35}\" fill=\"${col}\" rx=\"3\"/>\n      <rect x=\"-${sz*0.14}\" y=\"-${sz*0.38}\" width=\"${sz*0.06}\" height=\"${sz*0.35}\" fill=\"${col}\" rx=\"2\"/>\n      <rect x=\"-${sz*0.06}\" y=\"-${sz*0.42}\" width=\"${sz*0.06}\" height=\"${sz*0.39}\" fill=\"${col}\" rx=\"2\"/>\n      <rect x=\"${sz*0.02}\" y=\"-${sz*0.38}\" width=\"${sz*0.06}\" height=\"${sz*0.35}\" fill=\"${col}\" rx=\"2\"/>\n      <rect x=\"${sz*0.1}\" y=\"-${sz*0.32}\" width=\"${sz*0.05}\" height=\"${sz*0.29}\" fill=\"${col}\" rx=\"2\"/>\n    `);\n  }\n\n  if (id === 'bayeux_knight_fleeing') {\n    return g(`\n      <path d=\"M -${sz*0.35},${sz*0.25} C -${sz*0.2},0 0,-${sz*0.1} ${sz*0.3},${sz*0.15} L ${sz*0.4},${sz*0.35} L ${sz*0.15},${sz*0.35} L 0,${sz*0.2} L -${sz*0.25},${sz*0.35} Z\" fill=\"${col}\"/>\n      <circle cx=\"-${sz*0.15}\" cy=\"-${sz*0.25}\" r=\"${sz*0.12}\" fill=\"${col}\"/>\n      <path d=\"M -${sz*0.25},-${sz*0.25} L -${sz*0.45},-${sz*0.38} L -${sz*0.35},-${sz*0.15} Z\" fill=\"${col}\"/>\n      <path d=\"M -${sz*0.05},-${sz*0.2} L ${sz*0.15},-${sz*0.35} L ${sz*0.25},-${sz*0.25}\" fill=\"none\" stroke=\"${col}\" stroke-width=\"${sz*0.06}\" stroke-linecap=\"round\"/>\n    `);\n  }\n\n  if (id === 'bayeux_chicken_dragon') {\n    return g(`\n      <path d=\"M 0,${sz*0.3} Q -${sz*0.25},${sz*0.1} -${sz*0.15},-${sz*0.15} Q 0,-${sz*0.35} ${sz*0.2},-${sz*0.2} Q ${sz*0.35},0 ${sz*0.15},${sz*0.3} Z\" fill=\"${col}\"/>\n      <polygon points=\"-${sz*0.15},-${sz*0.15} -${sz*0.35},-${sz*0.12} -${sz*0.15},-${sz*0.05}\" fill=\"#FFD700\"/>\n      <path d=\"M -${sz*0.35},-${sz*0.12} Q -${sz*0.5},-${sz*0.15} -${sz*0.45},-${sz*0.05}\" fill=\"none\" stroke=\"#CE1126\" stroke-width=\"${sz*0.05}\"/>\n      <path d=\"M 0,-${sz*0.05} Q ${sz*0.35},-${sz*0.35} ${sz*0.4},-${sz*0.1} Q ${sz*0.25},${sz*0.05} 0,-${sz*0.05} Z\" fill=\"${col}\"/>\n    `);\n  }\n\n  if (id === 'bayeux_corrupt_earl') {\n    return g(`\n      <ellipse cx=\"0\" cy=\"${sz*0.15}\" rx=\"${sz*0.25}\" ry=\"${sz*0.25}\" fill=\"${col}\"/>\n      <circle cx=\"0\" cy=\"-${sz*0.22}\" r=\"${sz*0.14}\" fill=\"${col}\"/>\n      <polygon points=\"-${sz*0.12},-${sz*0.32} -${sz*0.15},-${sz*0.45} 0,-${sz*0.38} ${sz*0.15},-${sz*0.45} ${sz*0.12},-${sz*0.32}\" fill=\"#FFD700\"/>\n      <circle cx=\"${sz*0.25}\" cy=\"${sz*0.1}\" r=\"${sz*0.14}\" fill=\"#FFD700\"/>\n      <text x=\"${sz*0.25}\" y=\"${sz*0.14}\" text-anchor=\"middle\" font-size=\"${sz*0.16}\" font-weight=\"bold\" fill=\"#1C1C1C\">£</text>\n    `);\n  }\n\n  if (id === 'bayeux_pig_riot') {\n    return g(`\n      <ellipse cx=\"0\" cy=\"0\" rx=\"${sz*0.32}\" ry=\"${sz*0.22}\" fill=\"${col}\"/>\n      <ellipse cx=\"-${sz*0.25}\" cy=\"-${sz*0.08}\" rx=\"${sz*0.12}\" ry=\"${sz*0.14}\" fill=\"${col}\"/>\n      <rect x=\"-${sz*0.38}\" y=\"-${sz*0.12}\" width=\"${sz*0.12}\" height=\"${sz*0.08}\" fill=\"${col}\" rx=\"2\"/>\n      <circle cx=\"${sz*0.28}\" cy=\"-${sz*0.25}\" r=\"${sz*0.07}\" fill=\"#FFD700\"/>\n      <circle cx=\"-${sz*0.15}\" cy=\"${sz*0.28}\" r=\"${sz*0.07}\" fill=\"#FFD700\"/>\n    `);\n  }\n\n  if (id === 'bayeux_sea_monster') {\n    return g(`\n      <path d=\"M -${sz*0.35},${sz*0.25} Q -${sz*0.2},-${sz*0.35} 0,-${sz*0.1} Q ${sz*0.2},-${sz*0.35} ${sz*0.35},${sz*0.25}\" fill=\"none\" stroke=\"${col}\" stroke-width=\"${sz*0.09}\" stroke-linecap=\"round\"/>\n      <polygon points=\"${sz*0.25},-${sz*0.2} ${sz*0.4},-${sz*0.35} ${sz*0.42},-${sz*0.15}\" fill=\"${col}\"/>\n      <polygon points=\"-${sz*0.15},${sz*0.1} 0,0 ${sz*0.15},${sz*0.1}\" fill=\"#FFD700\"/>\n    `);\n  }\n\n  if (id === 'bayeux_gallows_crow') {\n    return g(`\n      <rect x=\"-${sz*0.25}\" y=\"-${sz*0.4}\" width=\"${sz*0.07}\" height=\"${sz*0.8}\" fill=\"${col}\"/>\n      <rect x=\"-${sz*0.25}\" y=\"-${sz*0.4}\" width=\"${sz*0.45}\" height=\"${sz*0.07}\" fill=\"${col}\"/>\n      <circle cx=\"${sz*0.1}\" cy=\"-${sz*0.48}\" r=\"${sz*0.09}\" fill=\"#FFD700\"/>\n      <polygon points=\"${sz*0.15},-${sz*0.48} ${sz*0.28},-${sz*0.46} ${sz*0.15},-${sz*0.42}\" fill=\"#FFD700\"/>\n    `);\n  }\n\n  return g(`\n    <circle cx=\"0\" cy=\"0\" r=\"${sz*0.32}\" fill=\"${col}\" opacity=\"0.8\"/>\n    <text text-anchor=\"middle\" dominant-baseline=\"central\" font-size=\"${sz*0.26}\" fill=\"${tincture(charge.tincture === 'or' ? 'sable' : 'or')}\" font-family=\"Georgia,serif\">${id.charAt(0).toUpperCase()}</text>\n  `);\n}\n\nfunction renderMotto(motto, translation, uniqueId) {\n  if (!motto) return '';\n  const y = SHIELD_HEIGHT + 24;\n  const esc = (str) => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');\n  return `\n    <g transform=\"translate(0, ${y})\">\n      <path d=\"M -${SHIELD_WIDTH/2 + 6},-2 L -${SHIELD_WIDTH/2 - 4},-14 L -${SHIELD_WIDTH/2 - 4},14 Z\" fill=\"#805A00\"/>\n      <path d=\"M ${SHIELD_WIDTH/2 + 6},-2 L ${SHIELD_WIDTH/2 - 4},-14 L ${SHIELD_WIDTH/2 - 4},14 Z\" fill=\"#805A00\"/>\n      <rect x=\"-${SHIELD_WIDTH/2}\" y=\"-13\" width=\"${SHIELD_WIDTH}\" height=\"26\" rx=\"4\" fill=\"url(#grad-sable-${uniqueId})\" stroke=\"url(#grad-or-${uniqueId})\" stroke-width=\"1.6\" filter=\"url(#gold-emboss-${uniqueId})\"/>\n      <text text-anchor=\"middle\" dominant-baseline=\"central\" y=\"0\"\n        font-family=\"'Cinzel', Palatino, serif\" font-size=\"11.5\" font-weight=\"700\"\n        fill=\"url(#grad-or-${uniqueId})\" letter-spacing=\"1\">${esc(motto)}</text>\n    </g>\n    ${translation ? `<text x=\"0\" y=\"${y + 24}\" text-anchor=\"middle\"\n      font-family=\"'EB Garamond', Georgia, serif\" font-size=\"9.5\" fill=\"#a08040\" font-style=\"italic\"\n      dominant-baseline=\"hanging\">${esc(translation)}</text>` : ''}`;\n}\n\nfunction renderSpec(spec) {\n  const charges = spec.charges ?? [];\n  const uniqueId = Math.random().toString(36).slice(2, 7);\n  const clipId = `shield-clip-${uniqueId}`;\n  const cx = SVG_WIDTH / 2; // 120\n  const cy = 20;\n\n  const defsSvg = renderDefs(uniqueId);\n  const fieldSvg = renderField(spec, uniqueId);\n  const chargesSvg = charges.map((c, i) => renderCharge(c, i, charges.length, uniqueId)).join('\\n');\n  const mottoSvg = renderMotto(spec.motto, spec.motto_translation, uniqueId);\n\n  return `<svg xmlns=\"http://www.w3.org/2000/svg\"\n  viewBox=\"0 0 ${SVG_WIDTH} ${SVG_HEIGHT}\"\n  width=\"${SVG_WIDTH}\" height=\"${SVG_HEIGHT}\">\n\n  <defs>\n    ${defsSvg}\n    <clipPath id=\"${clipId}\">\n      <path d=\"${shieldPath()}\" transform=\"translate(${cx}, ${cy})\"/>\n    </clipPath>\n  </defs>\n\n  <!-- Outer Drop Shadow -->\n  <path d=\"${shieldPath()}\" transform=\"translate(${cx}, ${cy})\"\n    fill=\"#00000044\" filter=\"url(#shield-shadow-${uniqueId})\"/>\n\n  <!-- Field & Charges (Clipped to shield shape in absolute 1-to-1 viewBox space) -->\n  <g clip-path=\"url(#${clipId})\">\n    <g transform=\"translate(${cx}, ${cy})\">\n      ${fieldSvg}\n    </g>\n    <g transform=\"translate(${cx}, ${cy})\">\n      ${chargesSvg}\n    </g>\n  </g>\n\n  <!-- Embossed Gold & Metal Shield Rim -->\n  <path d=\"${shieldPath()}\" transform=\"translate(${cx}, ${cy})\"\n    fill=\"none\" stroke=\"url(#grad-or-${uniqueId})\" stroke-width=\"4.5\" filter=\"url(#gold-emboss-${uniqueId})\"/>\n  <path d=\"${shieldPath()}\" transform=\"translate(${cx}, ${cy})\"\n    fill=\"none\" stroke=\"#2a1a00\" stroke-width=\"1.2\"/>\n\n  <!-- Motto Scroll -->\n  <g transform=\"translate(${cx}, ${cy})\">\n    ${mottoSvg}\n  </g>\n\n</svg>`;\n}\n\n\n\n\n  const PANELISTS = [\n    { id: 'bede', name: 'Venerable Bede', role: 'Anglo-Saxon Chronicler', avatar: '📜' },\n    { id: 'ray', name: 'Ray Mears', role: 'Bushcraft & Survival Expert', avatar: '🏕️' },\n    { id: 'david', name: 'David Attenborough', role: 'Naturalist & Broadcaster', avatar: '🎙️' },\n    { id: 'steve', name: 'Steve Backshall', role: 'Deadly 60 Explorer', avatar: '🦎' }\n  ];\n\n  const INTERJECTIONS = [\n    'Hold on! The Venerable Synod of 731 AD strictly forbade such shenanigans past Vespers!',\n    'Fascinating! Notice how the local population adapts to the 60mph coastal sea-gales with remarkable resilience.',\n    'From a bushcraft perspective, you can make an emergency bivouac out of two sun-bleached deckchairs and a Wimpy wrapper.',\n    'Deadly 60 alert! That feral seagull hovering over the kebab rank is moving at a lethal 45 knots!',\n    'Nonsense! I have survived 3 weeks in the Amazon with less forage than what is on this precinct bench!',\n    'Verily, the ancient charters of Northumbria recorded a similar misdemeanour near Jarrow in 684 AD!'\n  ];\n\n  const LENSES = [\n    { id: 'proud_of_it',        label: 'Proud of It',          desc: 'This was fine. The herald sees no issue whatsoever.' },\n    { id: 'full_cover_up',      label: 'Full Cover-Up',        desc: 'It never happened. The herald is confused by the question.' },\n    { id: 'admit_faults',       label: 'Admit Faults',         desc: 'Yes, there were some irregularities. The crest acknowledges this minimally.' },\n    { id: 'blame_others',       label: 'Blame Others',         desc: 'External forces. Enemies. God\\'s specific instruction at the time.' },\n    { id: 'deeply_sorry',       label: 'Deeply Sorry',         desc: 'Full modern apology. All the correct language. Nothing has changed.' },\n    { id: 'context_everything', label: 'Context Is Everything',desc: 'You have to understand the times. The herald provides a great deal of context. It does not help.' },\n    { id: 'revisionist',        label: 'Revisionist',          desc: 'Actually they were the heroes. New research supports this.' }\n  ];\n\n  const MODE3_TAGLINES = [\n    '🐶 FIND LOCAL DOGGING SPOTS',\n    '🌿 LOCATE APPROVED LOCAL DEALERS',\n    '🏖️ CHECK YOUR DREAM DESTINATION',\n    '🛡️ IS IT SAFE TO VISIT?',\n    '🚓 INSPECT CRIME & PUBLIC ORDER',\n    '🤔 WILL I SURVIVE A WEEKEND HERE?',\n    '🏛️ INSPECT TOURIST BOARD LIES',\n    '🦉 AUDIT THIS HOLIDAY DESTINATION'\n  ];\n\n  let mode3TagIndex = 0;\n  let mode3Timer = null;\n\n  let selectedMode = 'location';\n  let selectedLens = null;\n  let currentFindings = null;\n  let currentLocation = null;\n\n  const locationInput = document.getElementById('location');\n  const generateBtn   = document.getElementById('generate-btn');\n  const lensGrid      = document.getElementById('lens-grid');\n  const lensGroup     = document.getElementById('lens-group');\n  const crestLayout   = document.getElementById('crest-layout');\n  const reDesignContainer = document.getElementById('re-design-buttons');\n  const reDesignBar   = document.getElementById('re-design-bar');\n\n  const tabLocation = document.getElementById('tab-location');\n  const tabFamily   = document.getElementById('tab-family');\n  const tabTourist  = document.getElementById('tab-tourist');\n  const panelTitle  = document.getElementById('panel-title');\n  const inputLabel  = document.getElementById('input-label');\n\n  tabLocation.addEventListener('click', () => setMode('location'));\n  tabFamily.addEventListener('click', () => setMode('family'));\n  tabTourist.addEventListener('click', () => setMode('tourist_board'));\n\n  function updateButtonLabel() {\n    if (mode3Timer) {\n      clearInterval(mode3Timer);\n      mode3Timer = null;\n    }\n\n    if (selectedMode === 'location') {\n      generateBtn.textContent = '🚩 BLAZON THIS BOROUGH';\n    } else if (selectedMode === 'family') {\n      generateBtn.textContent = '⚔️ FORGE FAMILY CREST';\n    } else {\n      generateBtn.textContent = MODE3_TAGLINES[mode3TagIndex % MODE3_TAGLINES.length];\n      mode3Timer = setInterval(() => {\n        if (selectedMode === 'tourist_board' || selectedMode === 'mode3') {\n          mode3TagIndex++;\n          generateBtn.textContent = MODE3_TAGLINES[mode3TagIndex % MODE3_TAGLINES.length];\n        }\n      }, 3200);\n    }\n  }\n\n  function setMode(mode) {\n    selectedMode = mode;\n    tabLocation.classList.remove('active');\n    tabFamily.classList.remove('active');\n    tabTourist.classList.remove('active');\n\n    if (mode === 'location') {\n      tabLocation.classList.add('active');\n      panelTitle.textContent = 'Mode I — Location Flag';\n      inputLabel.textContent = 'Location, postcode, or place';\n      locationInput.placeholder = 'e.g. Slough, SW1A 1AA, Runnymede…';\n      lensGroup.style.display = 'flex';\n    } else if (mode === 'family') {\n      tabFamily.classList.add('active');\n      panelTitle.textContent = 'Mode II — Family / Group Crest';\n      inputLabel.textContent = 'Family name, workplace, or friend group';\n      locationInput.placeholder = 'e.g. Windsor, Royal Mail, The Smith Family…';\n      lensGroup.style.display = 'flex';\n    } else {\n      tabTourist.classList.add('active');\n      panelTitle.textContent = 'Mode III — Tourist Board & TripAdvisor Audit';\n      inputLabel.textContent = 'Location, town, or holiday destination';\n      locationInput.placeholder = 'e.g. Aldershot, Milton Keynes, Blackpool…';\n      lensGroup.style.display = 'none'; // Mode III auto-synthesizes all 7 lenses\n    }\n    updateButtonLabel();\n    checkReady();\n  }\n\n  LENSES.forEach(lens => {\n    const btn = document.createElement('button');\n    btn.className = 'lens-btn';\n    btn.textContent = lens.label;\n    btn.title = lens.desc;\n    btn.dataset.lens = lens.id;\n    btn.addEventListener('click', () => {\n      lensGrid.querySelectorAll('.lens-btn').forEach(b => b.classList.remove('selected'));\n      btn.classList.add('selected');\n      selectedLens = lens.id;\n      checkReady();\n    });\n    lensGrid.appendChild(btn);\n  });\n\n  locationInput.addEventListener('input', checkReady);\n\n  function checkReady() {\n    if (selectedMode === 'tourist_board' || selectedMode === 'mode3') {\n      generateBtn.disabled = !locationInput.value.trim();\n    } else {\n      generateBtn.disabled = !(locationInput.value.trim() && selectedLens);\n    }\n  }\n\n  generateBtn.addEventListener('click', generate);\n\n  // 32-BIT POSITIONAL SEED HASH ENGINE\n  function hashTown(town, seed = 0) {\n    let hash = seed;\n    const clean = town.toLowerCase().trim();\n    for (let i = 0; i < clean.length; i++) {\n      hash = (hash << 5) - hash + clean.charCodeAt(i);\n      hash |= 0;\n    }\n    return Math.abs(hash);\n  }\n\n  // HYPER-LOCAL SPOTTED:[TOWN] & GAZETTE KNOWLEDGE GRAPH\n  const HYPER_LOCAL_DATABASE = {\n    basingstoke: {\n      paper: 'Basingstoke Gazette',\n      spotted: 'Spotted: Basingstoke',\n      gazette_headline: 'MAN FINED £80 AFTER LEAVING HALF-EATEN PORK PIE ON POLICE CAR WINDSHIELD IN FESTIVAL PLACE',\n      spotted_chatter: 'Can whoever is letting their ferret loose in Morrisons Top of Town please come and collect it. It has cornered a trolley boy by the bakery.',\n      local_scandal: 'The great Top of Town bin fire of 2022 and ongoing disputes over the parish council ornamental flower tub budget.'\n    },\n    peacehaven: {\n      paper: 'Sussex Express & Peacehaven News',\n      spotted: 'Spotted: Peacehaven & Telscombe Cliffs',\n      gazette_headline: 'MYSTERY PIANO ABANDONED ON UNDERCLIFF WALK PROMPTS EMERGENCY COASTGUARD AUDIT',\n      spotted_chatter: 'To the woman who took my lawnmower from outside the Meridian Centre: I have you on Ring doorbell video. Return it or the police will be informed.',\n      local_scandal: 'Sea-fog obscuring the main roundabout for 72 hours while residents argue over beach hut copper piping theft.'\n    },\n    bracknell: {\n      paper: 'Bracknell News',\n      spotted: 'Spotted: Bracknell',\n      gazette_headline: 'COUNCIL INVESTIGATES 3AM MYSTERY SIREN THAT SOUNDS LIKE A DISTRESSED FOGHORN',\n      spotted_chatter: 'Has anyone else noticed the man who stands by the Lexicon car park entrance offering free advice on 1970s subway tiles?',\n      local_scandal: 'Teenagers throwing lukewarm chips at swans near the bus station concourse.'\n    },\n    slough: {\n      paper: 'Slough Observer',\n      spotted: 'Spotted: Slough',\n      gazette_headline: 'TWINNING COMMITTEE ACCIDENTALLY BUYS 400 CONCRETE BOLLARDS INTENDED FOR DUNDEE',\n      spotted_chatter: 'Whoever left a shopping trolley full of frozen scampi on the dual carriageway flyover: your ice is melting.',\n      local_scandal: 'Roundabout drift racing in 2004 Vauxhall Corsas between 1am and 4am.'\n    },\n    leeds: {\n      paper: 'Leeds Live & Yorkshire Evening Post',\n      spotted: 'Overheard in Leeds',\n      gazette_headline: 'STUDENT HOUSE IN HEADINGLEY ERECTS 3-STOREY MATTRESS TOWER VISIBLE FROM THE M621',\n      spotted_chatter: 'Saw a bloke unicyling through Kirkgate Market holding a tub of lukewarm curry at 2am. Peak Leeds.',\n      local_scandal: 'Arguments outside the Corn Exchange over who owns the last 4am taxi to Hyde Park.'\n    },\n    blackpool: {\n      paper: 'Blackpool Gazette',\n      spotted: 'Spotted: Blackpool',\n      gazette_headline: 'SEAGULL STEALS ENTIRE TRAY OF DONER MEAT FROM PROMENADE KEBAB SHOP',\n      spotted_chatter: 'If you lost a pair of false teeth outside the Coral Island arcade last night, they are currently on a ledge by the donkey rides.',\n      local_scandal: 'Seaside wind-gales blowing inflatable flamingos into the tramway wires.'\n    }\n  };\n\n  function getHyperLocalLore(town) {\n    const clean = town.toLowerCase().trim();\n    if (HYPER_LOCAL_DATABASE[clean]) {\n      return HYPER_LOCAL_DATABASE[clean];\n    }\n    return {\n      paper: `${town} Gazette & District News`,\n      spotted: `Spotted: ${town}`,\n      gazette_headline: `MUNICIPAL COUNCIL INVESTIGATES MYSTERY NOISE NEAR THE ${town.toUpperCase()} BYPASS`,\n      spotted_chatter: `Can the person who left their shopping trolley in the middle of the ${town} precinct please move it before the 2am kebab rush.`,\n      local_scandal: `Disputes over parish council flower tubs and 2am taxi rank queue jumping in ${town}.`\n    };\n  }\n\n  // REGIONAL CULTURAL ANCHORS & 100% REGION-MATED PATTERN MATRICES\n  function getRegionalProfile(town) {\n    const t = town.toLowerCase();\n    \n    if (/peacehaven|blackpool|brighton|hastings|portsmouth|torquay|scarborough|whitby|seaside|bay|harbour|beach|coast|pier|skegness|bournemouth|rye|margate|clacton/.test(t)) {\n      return {\n        region: 'Coastal / Maritime',\n        affectation: `Jewel of the ${town} Undercliff & Greenwich Meridian`,\n        mottos: [\n          { motto: 'CLIFFUS ERODIT ET CUM FLUCTIBUS EAT', translation: 'The Cliff Erodes and Goes with the Waves' },\n          { motto: 'MERIDIANUS VENTO SPLENDET', translation: 'The Meridian Shines in the Sea-Gale' },\n          { motto: 'SCAMPI IN VENTO VOLAT', translation: 'Scampi Flies High in the Coastal Gale' },\n          { motto: 'ANIMA IN PIANO BEACHED', translation: 'The Soul of an Abandoned Piano on the Beach' }\n        ],\n        twinned: ['Pripyat', 'Atlantis (Sunken)', `${town} Sewage Outfall Pipe 3`],\n        objects: ['rusted anchor', 'fibreglass seagull', 'salt-crusted deckchair', 'stolen harbour buoy', 'soggy fish basket', 'copper diving helmet'],\n        crimes: ['illegal scampi smuggling', 'pier-hopping at low tide', 'lighthouse bell tampering', 'stealing sea-gale deckchairs'],\n        profanities: ['utter coastal shite', 'atrocious salt-encrusted bollocks', 'proper sea-side tripe', 'complete pier-head clusterfuck'],\n        slogans: [\n          `Experience the Invigorating Coastal Gales of ${town}!`,\n          `${town}: Where the Greenwich Meridian Meets Sea-Gale Erosion!`,\n          `Discover ${town} — Premier Destination for Salt-Corroded Deckchair Maintenance!`,\n          `Welcome to ${town}: Gateway to the Undercliff Walk & Coastal Bus Shelters!`\n        ],\n        brochures: [\n          `Founded in 1916 by visionaries who raffled off cliffside plots in national newspapers! ${town} invites you to walk the historic Greenwich Meridian Line, where 1920s bungalows meet crumbling chalk cliffs at 3 inches per year!`,\n          `Stroll the famous ${town} Undercliff Walk, where 19th-century shipwreck legends tell of 40 beached upright pianos serenading Channel tides! Enjoy 60mph coastal sea-gales, authentic salt-crusted deckchairs, and high-street chip shops closing at dusk!`,\n          `Experience the legendary ${town} Meridian Centre & chalk clifftop! Located right where zero degrees longitude passes through Sussex, featuring 400 static caravans, coastal bus shelters, and scenic sea-wall scampi hurling!`,\n          `Discover the ancient coastal legends of ${town}! From the Great Scampi Tempest of 1987 to emergency coastguard audits of abandoned beach huts, our parish preserves lore that rings true!`\n        ],\n        reviews: [\n          { reviewer: 'MeridianWalker', rating: 1, text: `Walked the Meridian Line in ${town}. Got disoriented by sea-fog and ended up in the Meridian Centre car park thinking I was in Dieppe.` },\n          { reviewer: 'DeckchairVictim', rating: 1, text: `To the person who took my salt-crusted deckchair while I was buying scampi by the Undercliff Walk: I have you on Ring doorbell video.` },\n          { reviewer: 'PlotRaffleDescendant', rating: 2, text: `My grandfather won a cliffside plot here in a 1920 Daily Express raffle. The plot fell into the English Channel in 1974. Great views though.` },\n          { reviewer: 'ScampiHurler', rating: 1, text: `Tried eating scampi on the ${town} sea wall. A 60mph gale blew the entire tray into a coastguard cutter. 1 star.` },\n          { reviewer: 'BungalowOwner', rating: 2, text: `Living 40 yards from the ${town} chalk cliff edge. Up to 38 yards this morning. Very atmospheric.` },\n          { reviewer: 'PianoSeeker', rating: 1, text: `Came looking for the beached Undercliff piano legend in ${town}. Found a rusted shopping trolley and a wet seagull. Total bollocks.` }\n        ],\n        taHeadlines: [\n          `ANALYST EXPERT AUDIT #4092: 1916 Land Swindles & Greenwich Meridian Erosion in ${town}`,\n          `ANALYST EXPERT AUDIT #4093: 72-Hour Sea-Fog, Workhouse B&Bs, and A259 Resignation in ${town}`,\n          `ANALYST EXPERT AUDIT #4094: Beached Shipwreck Pianos vs Runaway Inflatable Flamingos in ${town}`\n        ],\n        taReviews: [\n          `ANALYST EXPERT AUDIT #4092: ${town} presents a fascinating study in coastal resignation. Founded as a 1916 newspaper raffle scheme, the town consists of a single linear road network (the A259) perpetually blanketed by a 72-hour sea-fog. The local gastronomy is defined strictly by lukewarm scampi served in cardboard trays that disintegrate under 50-knot Channel gales. Rating: 1.2/5 — Bring a foghorn and your own wellies.`,\n          `ANALYST EXPERT AUDIT #4093: An inspection of the ${town} Greenwich Meridian monument reveals that zero degrees longitude offers zero protection from coastal erosion. The local B&B operates on a 19th-century workhouse model, serving cold toast strictly at 7:00am while the landlord glares until guests vacate the premises. Rating: 1.5/5 — Mostly overcast with severe deckchair rust.`,\n          `ANALYST EXPERT AUDIT #4094: ${town}'s Undercliff Walk is renowned for washed-up driftwood and the legend of the 1884 beached piano shipwreck. However, modern visitors are more likely to encounter runaway inflatable flamingos and 2am kebab queue disputes outside the Meridian Centre. Rating: 1.1/5 — Attracious shite.`\n        ],\n        schools: [\n          `94% Pass Rate in Coastal Navigation & Salt-Crusted Deckchair Maintenance in ${town}.`,\n          `Ofsted Grade 3: Coastal Mizzle Navigation and Sea Wall Scampi Hurling in ${town}.`\n        ],\n        workforce: [\n          `Coastal Sea-Gale Rescue & RNLI Inflatable Flamingo Duty (74%) in ${town}.`,\n          `Caravan Park Security & Promenade Fish Chippy Management (82%) in ${town}.`\n        ],\n        housing: [\n          `Seaside promenade flat in ${town}: £520,000 with authentic salt-gale window corrosion.`,\n          `1920s clifftop bungalow in ${town}: £410,000 with 3 inches per year cliff erosion included.`\n        ],\n        excuses: [\n          `Blame 60mph English Channel gales, 1920s clifftop plot developers, chalk erosion, and coastal tides.`,\n          `Blame North Sea mizzle, 19th-century pier engineers, and sea-wall scampi hurling.`\n        ]\n      };\n    }\n    \n    // Default Commuter / Suburban Belt (Basingstoke, Bracknell, Slough, Newbury, Milton Keynes, Crawley, etc.)\n    return {\n      region: 'Commuter / Suburban Belt',\n      affectation: `Gateway to the ${town} Dual Carriageway Bypass`,\n      mottos: [\n        { motto: 'ROTAMUR ET MANEMUS', translation: 'We Turn on the Roundabout, and We Remain' },\n        { motto: 'PRECINCTUS IN AETERNUM', translation: 'The Precinct Stands Forever' }\n      ],\n      twinned: ['Pripyat', 'Slough', `${town} Multi-Storey Level 3`],\n      objects: ['1970s tupperware box', 'broken shopping trolley', 'concrete bollard', 'disused Wimpy sign', 'parking meter', 'vape battery charger'],\n      crimes: ['shopping trolley canal immersion', 'roundabout drift racing', 'municipal bollard theft', 'aggravated bicycle borrowing'],\n      profanities: ['suburban commuter shite', 'bureaucratic council bollocks', 'atrocious roundabout clusterfuck', 'utter precinct tripe'],\n      slogans: [\n        `Experience the Heroic Ambition of ${town}!`,\n        `${town}: Where Modern Engineering Meets Heritage Damp!`,\n        `Discover ${town} — World-Class Consecrated Precincts!`,\n        `Welcome to ${town}: Gateway to the Bypass Network!`\n      ],\n      brochures: [\n        `Visit our magnificent ${town} indoor shopping concourse! Obviously mostly shuttered since Amazon dismantled traditional high streets, it now offers an authentic experience featuring 3 remaining vape outlets and scenic indoor moss growth!`,\n        `Marvel at the magnificent ${town} 1974 multi-storey car park and concrete subway system, hailed by municipal planners as a triumph of modern engineering superior to the Hanging Gardens of Babylon!`,\n        `Steeped in glorious heritage! ${town} is the celebrated birthplace of the 1978 regional tupperware convention and home to a historic 17th-century tavern brawl!`,\n        `Experience the continuous orbital bliss of ${town}'s 7-tier roundabout system, designed in 1968 to ensure motorists never actually reach their intended destination!`\n      ],\n      reviews: [\n        { reviewer: 'TrappedMotorist', rating: 1, text: `Entered the ${town} dual carriageway roundabout. Completed 47 laps before finding an exit. Total bollocks.` },\n        { reviewer: 'PrecinctShopper', rating: 2, text: `Visited the ${town} concourse. Found 3 vape shops, a tanning salon, and scenic indoor moss. What a clusterfuck.` },\n        { reviewer: 'KebabRankSurvivor', rating: 1, text: `Waited 3 hours at the ${town} taxi rank at 2am. System gave up and we ate cold kebabs on a bench. Absolute shite.` },\n        { reviewer: 'RampVictim', rating: 1, text: `Spent 4 hours stuck on the ${town} multi-storey car park ramp. Sat nav suggested walking back through the precinct.` },\n        { reviewer: 'HighStreetVisitor', rating: 2, text: `Visited the ${town} high street. Found 14 shuttered stores and 3 betting shops. Utter tripe.` },\n        { reviewer: 'SculptureAuditor', rating: 1, text: `The council spent £3.4 million on an abstract sculpture in ${town} while potholes destroyed both front axles of my Vauxhall Corsa.` }\n      ],\n      taHeadlines: [\n        `Shite Pubs, Lukewarm Kebabs, and Zero Taxis in ${town}`,\n        `Clutch-Destroying Roundabouts, Damp B&B Carpets, and Hostile Landlords in ${town}`,\n        `Dead-End One-Way Systems and Missing Cathedral Ruins in ${town}`,\n        `The 2am Kebab Rank Taxi Cartel Monopoly Trap in ${town}`\n      ],\n      taReviews: [\n        `Visitors arriving in ${town} are immediately struck by the complete absence of available taxis after 11pm. The local curry house offers lukewarm rogan josh, while the main street features a 2am kebab rank queue.`,\n        `A masterclass in motion without destination. The ${town} ring road and one-way system forces motorists into continuous circular orbit until fuel or morale is completely exhausted.`,\n        `The council spent £3.4 million on an abstract sculpture in ${town} while the potholes on the bypass destroyed both front axles of my Vauxhall Corsa.`,\n        `Got trapped on the ${town} multi-storey car park ramp for 4 hours. Satellite navigation gave up and suggested walking back through the precinct.`\n      ],\n      schools: [\n        `98% Pass Rate in Roundabout Navigation & Vape Shop Operations in ${town}.`,\n        `14% Ofsted Requires Improvement in ${town}, 86% Closed by Magistrate Order.`\n      ],\n      workforce: [\n        `Roundabout Maintenance Board (62%) and Vape Shop Administration (28%) in ${town}.`,\n        `Multi-Storey Car Park Ramp Management & Traffic Orbit Ops (85%) in ${town}.`\n      ],\n      housing: [\n        `1970s precinct maisonette in ${town}: £340,000 with authentic brutalist concrete damp.`,\n        `Average 2-bed terrace in ${town}: £450,000 with authentic heritage damp.`\n      ],\n      excuses: [\n        `Blame 1968 brutalist roundabout architects, concrete suppliers, and highway planners.`,\n        `Blame 1970s urban planners, traditional ${town} weather, and regional highway directors.`\n      ]\n    };\n  }\n\n  function buildDynamicFallbackResult(town, lensId, mode) {\n    const reg = getRegionalProfile(town);\n\n    const idxSlogan   = hashTown(town, 13) % reg.slogans.length;\n    const idxBrochure = hashTown(town, 37) % reg.brochures.length;\n    const idxTaHead   = hashTown(town, 73) % reg.taHeadlines.length;\n    const idxTaRev    = hashTown(town, 109) % reg.taReviews.length;\n    const idxMotto    = hashTown(town, 137) % reg.mottos.length;\n\n    const slogan = reg.slogans[idxSlogan].replace(/{town}/g, town);\n    const brochure = reg.brochures[idxBrochure].replace(/{town}/g, town);\n    const taHead = reg.taHeadlines[idxTaHead].replace(/{town}/g, town);\n    const taRev = reg.taReviews[idxTaRev].replace(/{town}/g, town);\n\n    const reviewPool = reg.reviews;\n\n    const rIdx1 = hashTown(town, 401) % reviewPool.length;\n    let rIdx2 = hashTown(town, 503) % reviewPool.length;\n    if (rIdx2 === rIdx1) rIdx2 = (rIdx2 + 1) % reviewPool.length;\n    let rIdx3 = hashTown(town, 607) % reviewPool.length;\n    while (rIdx3 === rIdx1 || rIdx3 === rIdx2) rIdx3 = (rIdx3 + 1) % reviewPool.length;\n\n    const reviews = [reviewPool[rIdx1], reviewPool[rIdx2], reviewPool[rIdx3]];\n\n    const idxSchools   = hashTown(town, 151) % reg.schools.length;\n    const idxWorkforce = hashTown(town, 241) % reg.workforce.length;\n    const idxHousing   = hashTown(town, 307) % reg.housing.length;\n    const idxExcuse    = hashTown(town, 373) % reg.excuses.length;\n\n    return {\n      lens: (mode === 'tourist_board' || mode === 'mode3') ? 'multi_lens' : lensId,\n      affectation: reg.affectation,\n      twinned_with: reg.twinned,\n      motto: reg.mottos[idxMotto].motto,\n      motto_translation: reg.mottos[idxMotto].translation,\n      excuse: reg.excuses[idxExcuse],\n      tourist_board: {\n        slogan: slogan,\n        brochure_copy: brochure\n      },\n      tripadvisor_audit: {\n        headline: taHead,\n        overall_rating: `${((hashTown(town, 53) % 15) / 10 + 1.0).toFixed(1)} / 5 — Mostly Overcast`,\n        audit_review: taRev\n      },\n      customer_reviews: reviews,\n      socio_economic: {\n        schools_education: reg.schools[idxSchools],\n        crime_order: reg.crimes[hashTown(town, 193) % reg.crimes.length],\n        workforce_industry: reg.workforce[idxWorkforce],\n        housing_property: reg.housing[idxHousing]\n      }\n    };\n  }\n\n  async function generate() {\n    const location = locationInput.value.trim();\n    if (!location) return;\n\n    currentLocation = location;\n    document.getElementById('loading').style.display = 'block';\n    document.getElementById('output-panel').classList.remove('visible');\n    document.getElementById('error').style.display = 'none';\n    generateBtn.disabled = true;\n\n    try {\n      if (selectedMode === 'tourist_board' || selectedMode === 'mode3') {\n        // Pure Instant Client-Side Generation for Mode III on GitHub Pages — 0 Remote Worker Dependency\n        setTimeout(() => {\n          const result = buildDynamicFallbackResult(location, 'proud_of_it', selectedMode);\n          renderOutput(location, result);\n          document.getElementById('loading').style.display = 'none';\n          generateBtn.disabled = false;\n          checkReady();\n        }, 150);\n        return;\n      }\n\n      const WORKER = window.location.origin.includes('workers.dev') ? window.location.origin : 'https://flagrants-api.leanspirited.workers.dev';\n      \n      const controller = new AbortController();\n      const timeoutId = setTimeout(() => controller.abort(), 3500);\n\n      const researchRes = await fetch(`${WORKER}/research`, {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ mode: selectedMode, subject: location }),\n        signal: controller.signal\n      });\n      clearTimeout(timeoutId);\n      \n      if (!researchRes.ok) {\n        currentFindings = {\n          _subject: location,\n          tier1: { location, region: 'United Kingdom' },\n          tier3: { dark_history: `A place of considerable notoriety and ancient local misdemeanour in ${location}.` },\n          comedy_seed: `Famous for shite local pubs, 2am kebab ranks, and local taxi monopolies in ${location}.`,\n          nightlife_catering: `Shite pubs, lukewarm curry houses, and throwing up kebabs at the ${location} taxi rank.`,\n          infrastructure_flaws: `Local bus monopolies, disused bus shelters, and 1970s concrete precincts in ${location}.`,\n          weird_local_lore: `Scampi hurling, municipal blood-letting trials, rectal cheese processing, subterranean sausage fermentation, or cheese rolling in ${location}.`,\n          claim_to_fame: `Birthplace of the 1974 regional ${location} tupperware convention.`\n        };\n      } else {\n        currentFindings = await researchRes.json();\n      }\n\n      await reDesignWithLens(selectedLens || 'proud_of_it');\n    } catch (err) {\n      const fallbackResult = buildDynamicFallbackResult(currentLocation, selectedLens || 'proud_of_it', selectedMode);\n      renderOutput(currentLocation, fallbackResult);\n    } finally {\n      document.getElementById('loading').style.display = 'none';\n      generateBtn.disabled = false;\n      checkReady();\n    }\n  }\n\n  async function reDesignWithLens(lensId) {\n    if (!currentFindings) return;\n    selectedLens = lensId;\n\n    try {\n      const WORKER = window.location.origin.includes('workers.dev') ? window.location.origin : 'https://flagrants-api.leanspirited.workers.dev';\n      \n      const controller = new AbortController();\n      const timeoutId = setTimeout(() => controller.abort(), 3500);\n\n      const designRes = await fetch(`${WORKER}/design`, {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ findings: currentFindings, lens: lensId, mode: selectedMode }),\n        signal: controller.signal\n      });\n      clearTimeout(timeoutId);\n\n      let result;\n      if (!designRes.ok) {\n        result = buildDynamicFallbackResult(currentLocation, lensId, selectedMode);\n      } else {\n        result = await designRes.json();\n      }\n\n      renderOutput(currentLocation, result);\n    } catch (err) {\n      result = buildDynamicFallbackResult(currentLocation, lensId, selectedMode);\n      renderOutput(currentLocation, result);\n    }\n  }\n\n  function renderOutput(location, result) {\n    document.getElementById('subject-name').textContent = location;\n    const affectation = result.affectation ?? result.nickname ?? '';\n    document.getElementById('subject-affectation').textContent = affectation ? ` — ${affectation}` : '';\n\n    // Render Motto Ribbon Banner under Main Title\n    const mottoMain = document.getElementById('motto-text-main');\n    const mottoSub  = document.getElementById('motto-text-sub');\n    if (result.motto) {\n      mottoMain.textContent = result.motto;\n      mottoSub.textContent  = result.motto_translation ? `— ${result.motto_translation} —` : '';\n      document.getElementById('motto-header-block').style.display = 'flex';\n    } else {\n      document.getElementById('motto-header-block').style.display = 'none';\n    }\n\n    // Render Twinned Places\n    const twinningContainer = document.getElementById('twinning-block');\n    twinningContainer.innerHTML = '';\n    const twinned = result.twinned_with ?? result.twinned ?? [];\n    if (Array.isArray(twinned) && twinned.length > 0) {\n      const label = document.createElement('span');\n      label.className = 'twinning-label';\n      label.textContent = selectedMode === 'family' ? '🤝 Allied Houses:' : '🤝 Twinned with:';\n      twinningContainer.appendChild(label);\n      \n      twinned.forEach(place => {\n        const item = document.createElement('span');\n        item.className = 'twinning-item';\n        item.textContent = place;\n        twinningContainer.appendChild(item);\n      });\n    }\n\n    const isMode3 = (selectedMode === 'tourist_board' || selectedMode === 'mode3');\n\n    if (isMode3) {\n      crestLayout.style.display = 'none';\n      reDesignBar.style.display = 'none';\n    } else {\n      crestLayout.style.display = 'grid';\n      reDesignBar.style.display = 'flex';\n\n      const crestContainer = document.getElementById('crest-svg');\n      try {\n        const specForShield = { ...result, motto: '', motto_translation: '' };\n        crestContainer.innerHTML = renderSpec(specForShield);\n      } catch (e) {\n        crestContainer.innerHTML = result.svg || '';\n      }\n\n      // Fast Lens Switcher Buttons\n      reDesignContainer.innerHTML = '';\n      LENSES.forEach(l => {\n        const btn = document.createElement('button');\n        btn.className = `re-lens-btn ${l.id === result.lens ? 'active' : ''}`;\n        btn.textContent = l.label;\n        btn.addEventListener('click', () => reDesignWithLens(l.id));\n        reDesignContainer.appendChild(btn);\n      });\n\n      // DYNAMIC PANEL SHOW SPEAKER SHUFFLING & INTERJECTION ENGINE\n      const commentary = document.getElementById('commentary');\n      commentary.innerHTML = '';\n      const charges = result.charges ?? [];\n\n      const seed = hashTown(location, 777);\n      const shuffledPanelists = [...PANELISTS].sort((a, b) => {\n        return (hashTown(location + a.id, seed) % 100) - (hashTown(location + b.id, seed) % 100);\n      });\n      \n      (result.commentary ?? []).forEach((block, idx) => {\n        const speaker = shuffledPanelists[idx % shuffledPanelists.length];\n        const hasInterjection = (hashTown(location + idx, 999) % 2) === 0;\n\n        const div = document.createElement('div');\n        div.className = 'commentary-block';\n\n        const isFieldBlock = (block.element || '').toLowerCase().includes('field');\n        let badgeContent = '';\n\n        if (isFieldBlock) {\n          const f = result.field || { tincture: 'azure', division: 'plain' };\n          badgeContent = `<svg viewBox=\"-100 0 200 240\" width=\"32\" height=\"32\" style=\"filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8));\">${renderField(f, 'mini-' + idx)}</svg>`;\n        } else {\n          const charge = charges[(idx - 1) % Math.max(1, charges.length)] || { id: 'bayeux_knight_fleeing', tincture: 'or' };\n          const svgCharge = renderCharge(charge, 0, 1, 'story-' + idx, true);\n          badgeContent = `<svg viewBox=\"-30 -30 60 60\" width=\"32\" height=\"32\" style=\"filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8));\">${svgCharge}</svg>`;\n        }\n\n        let interjectionHtml = '';\n        if (hasInterjection) {\n          const interjector = shuffledPanelists[(idx + 1) % shuffledPanelists.length];\n          const interjectionText = INTERJECTIONS[hashTown(location + idx, 444) % INTERJECTIONS.length];\n          interjectionHtml = `\n            <div class=\"interjection-card\">\n              <div class=\"interjection-header\">⚡ ${interjector.avatar} ${escapeHtml(interjector.name)} (${escapeHtml(interjector.role)}) INTERJECTS:</div>\n              <div class=\"interjection-text\">${escapeHtml(interjectionText)}</div>\n            </div>`;\n        }\n\n        div.innerHTML = `\n          <div class=\"commentary-header\">\n            <div class=\"story-icon-badge\">${badgeContent}</div>\n            <div class=\"speaker-tag-badge\">${speaker.avatar} ${escapeHtml(speaker.name)}</div>\n            <div class=\"commentary-element\">${escapeHtml(block.element)}</div>\n          </div>\n          <div class=\"commentary-text\">\"${escapeHtml(block.text)}\"</div>\n          ${interjectionHtml}`;\n        commentary.appendChild(div);\n      });\n    }\n\n    // Bulletproof Dynamic Renderer — 100% Location Bitshift Hash Matrix\n    const mode3Container = document.getElementById('mode3-container');\n    if (isMode3 || result.tourist_board || result.tripadvisor_audit) {\n      const fallbackObj = buildDynamicFallbackResult(location, result.lens || 'proud_of_it', selectedMode);\n      const regProf = getRegionalProfile(location);\n      const localLore = getHyperLocalLore(location);\n      \n      const tb = result.tourist_board || result.touristBoard || result.brochure || {};\n      const ta = result.tripadvisor_audit || result.tripadvisor || result.audit || result.expert_audit || {};\n      const cr = (Array.isArray(result.customer_reviews) && result.customer_reviews.length > 0) ? result.customer_reviews : ((Array.isArray(result.reviews) && result.reviews.length > 0) ? result.reviews : fallbackObj.customer_reviews);\n      const se = result.socio_economic || result.socioEconomic || {};\n\n      const slogan = tb.slogan || tb.headline || tb.title || fallbackObj.tourist_board.slogan;\n      const copy   = tb.brochure_copy || tb.copy || tb.text || tb.description || fallbackObj.tourist_board.brochure_copy;\n\n      const rating     = ta.overall_rating || ta.rating || fallbackObj.tripadvisor_audit.overall_rating;\n      const taHeadline = ta.headline || ta.title || fallbackObj.tripadvisor_audit.headline;\n      const taReview   = ta.audit_review || ta.review || ta.text || ta.body || fallbackObj.tripadvisor_audit.audit_review;\n\n      document.getElementById('tb-slogan').textContent = slogan;\n      document.getElementById('tb-copy').textContent   = copy;\n\n      document.getElementById('ta-rating').textContent   = `Rating: ${rating}`;\n      document.getElementById('ta-headline').textContent = taHeadline;\n      document.getElementById('ta-review').textContent   = taReview;\n\n      const crList = document.getElementById('cr-list');\n      crList.innerHTML = '';\n      \n      cr.forEach(rev => {\n        const rVal = parseInt(rev.rating) || 1;\n        const stars = '★'.repeat(Math.max(1, Math.min(5, rVal))) + '☆'.repeat(5 - Math.max(1, Math.min(5, rVal)));\n        const card = document.createElement('div');\n        card.className = 'cr-card';\n        card.innerHTML = `\n          <div class=\"cr-header\">\n            <span class=\"cr-reviewer\">👤 ${escapeHtml(rev.reviewer || 'Visitor')}</span>\n            <span class=\"cr-stars\">${stars}</span>\n          </div>\n          <div class=\"cr-text\">\"${escapeHtml(rev.text || 'No comment provided.')}\"</div>`;\n        crList.appendChild(card);\n      });\n\n      document.getElementById('se-schools').textContent   = se.schools_education || fallbackObj.socio_economic.schools_education;\n      document.getElementById('se-crime').textContent     = se.crime_order || fallbackObj.socio_economic.crime_order;\n      document.getElementById('se-workforce').textContent = se.workforce_industry || fallbackObj.socio_economic.workforce_industry;\n      document.getElementById('se-housing').textContent   = se.housing_property || fallbackObj.socio_economic.housing_property;\n\n      document.getElementById('excuse-text').textContent = result.excuse || fallbackObj.excuse;\n\n      // Render Hyper-Local Gazette & Spotted:[Town] Intelligence\n      document.getElementById('gazette-paper-name').textContent = `📰 ${localLore.paper}`;\n      document.getElementById('gazette-headline').textContent   = `\"${localLore.gazette_headline}\"`;\n      document.getElementById('spotted-group-name').textContent  = `📱 ${localLore.spotted}`;\n      document.getElementById('spotted-post-text').textContent   = `\"${localLore.spotted_chatter}\"`;\n\n      // Render Debug Research Findings Panel\n      const debugContainer = document.getElementById('debug-research-json');\n      if (debugContainer) {\n        const debugData = currentFindings || {\n          location: location,\n          regional_profile: regProf.region,\n          local_newspaper: localLore.paper,\n          community_facebook_group: localLore.spotted,\n          gazette_headline: localLore.gazette_headline,\n          spotted_chatter: localLore.spotted_chatter,\n          local_scandal: localLore.local_scandal,\n          synthesized_doc: fallbackObj\n        };\n        debugContainer.textContent = JSON.stringify(debugData, null, 2);\n        const debugCard = document.getElementById('debug-research-card');\n        if (debugCard) {\n          const isDebug = window.location.search.includes('debug=1') || window.location.hash.includes('debug');\n          debugCard.style.display = isDebug ? 'flex' : 'none';\n        }\n      }\n\n      mode3Container.style.display = 'flex';\n    } else {\n      mode3Container.style.display = 'none';\n    }\n\n    document.getElementById('output-panel').classList.add('visible');\n    document.getElementById('output-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });\n  }\n\n  // Crest Export Handlers (PNG & SVG)\n  document.getElementById('export-svg-btn').addEventListener('click', () => {\n    const svgEl = document.querySelector('#crest-svg svg');\n    if (!svgEl) return;\n    const svgData = new XMLSerializer().serializeToString(svgEl);\n    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });\n    const url = URL.createObjectURL(blob);\n    const a = document.createElement('a');\n    a.href = url;\n    a.download = `flagrants-${(currentLocation || 'crest').toLowerCase().replace(/[^a-z0-9]/g, '-')}.svg`;\n    a.click();\n    URL.revokeObjectURL(url);\n  });\n\n  document.getElementById('export-png-btn').addEventListener('click', () => {\n    const svgEl = document.querySelector('#crest-svg svg');\n    if (!svgEl) return;\n    const svgData = new XMLSerializer().serializeToString(svgEl);\n    const canvas = document.createElement('canvas');\n    canvas.width = 960;\n    canvas.height = 1320;\n    const ctx = canvas.getContext('2d');\n    const img = new Image();\n    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });\n    const url = URL.createObjectURL(svgBlob);\n    img.onload = () => {\n      ctx.fillStyle = '#0d0804';\n      ctx.fillRect(0, 0, canvas.width, canvas.height);\n      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);\n      const pngUrl = canvas.toDataURL('image/png');\n      const a = document.createElement('a');\n      a.href = pngUrl;\n      a.download = `flagrants-${(currentLocation || 'crest').toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;\n      a.click();\n      URL.revokeObjectURL(url);\n    };\n    img.src = url;\n  });\n\n  function escapeHtml(str) {\n    return String(str)\n      .replace(/&/g, '&amp;').replace(/</g, '&lt;')\n      .replace(/>/g, '&gt;').replace(/\"/g, '&quot;');\n  }\n</script>\n\n</body>\n</html>\n";

// Flagrants — Cloudflare Worker
// Routes: /health, /research, /design

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...CORS } });

const err = (msg, status = 500) => json({ error: msg }, status);

// ── Heraldic vocabulary — AI picks from these ids only ──────────────────────

const TINCTURES = {
  or: '#FFD700', argent: '#FFFFFF', gules: '#CE1126',
  azure: '#0032A0', sable: '#1C1C1C', vert: '#008000', purpure: '#7B2D8B'
};

const VALID_DIVISIONS = ['plain','per_pale','per_fess','quarterly','per_bend','per_bend_sinister','per_chevron'];
const VALID_CHARGES   = ['lion_rampant','lion_passant','eagle_displayed','castle','tower','sword','crown',
                          'key','hammer','wheel','anchor','ship','fleur_de_lis','rose','cross_charge',
                          'flame','star','serpent','hand','bull','bear',
                          'bayeux_arrow_eye','bayeux_viking_ship',
                          'bayeux_knight_fleeing','bayeux_chicken_dragon','bayeux_corrupt_earl',
                          'bayeux_pig_riot','bayeux_sea_monster','bayeux_gallows_crow'];
const VALID_TINCTURES = Object.keys(TINCTURES);

// ── Defence lenses ───────────────────────────────────────────────────────────

const LENSES = {
  proud_of_it:        'This was fine. The herald sees no issue whatsoever. The crest depicts events as achievements. No apology is required or offered.',
  full_cover_up:      'It never happened. The charges depict something else entirely. The herald is confused by the question. Any resemblance to actual events is coincidental.',
  admit_faults:       'Yes, there were some irregularities. The family has reflected. The crest acknowledges this in the smallest possible way. Progress has been made.',
  blame_others:       'External forces. Enemies. Circumstance. God\'s specific instruction at the time. The herald is very clear on this. The contextually derived excuse will name exactly who or what is to blame.',
  deeply_sorry:       'Full modern apology. All the correct language. The crest has been updated to reflect learnings. Nothing has actually changed.',
  context_everything: 'You have to understand the times. The herald provides a great deal of context. It does not help. The contextually derived excuse will explain why this made sense then.',
  revisionist:        'Actually they were the heroes in this. New research supports this. The herald cites the new research. External involvement — including, where contextually appropriate, extraterrestrial — is not ruled out.',
};

// ── Herald's commentary register ─────────────────────────────────────────────

const HERALD_REGISTER = `
HERALD'S COMMENTARY REGISTER — follow this precisely:

DEFAULT: The Dry Note
Describe events neutrally, factually, with complete authority. Then one small dry word, a mild question,
or a barely-there aside does all the moral work. Never explain the joke. Never name the immorality directly.
Let the gap do the work. The herald does not condemn. He barely notices.

Examples:
- "The family maintained this arrangement for eleven generations, which those involved regarded as tradition."
- "Records note that no formal objection was raised, which historians have described as consistent with the period."
- "The borough — which had by this point lost three mayors to circumstances that were, each time, described as unrelated — adopted the flame as its primary charge."

The Herald's Aside — use this freely:
Insert a dry contradiction or qualification mid-clause using dashes. The herald does not dwell on it. He moves on immediately.
- "The Earl — who by all accounts was a man of considerable conviction, most of it misdirected — maintained this practice for eleven generations."
- "The family — whose contributions to the area remain, even now, a matter of some local feeling — commissioned this crest in 1487."

ESCALATION: The Modern Tariff
For particularly egregious practices only. Translate to a modern equivalent via deliberate understatement.
The smaller the modern framing relative to the historical atrocity, the harder it lands.
- "Today this arrangement would attract considerably more than a parking fine, though the exact number of fines remains a matter of some academic debate."

CUTTING PROFANITY (FG-008):
When warranted by tier-3 dark history or villainy, deploy profanity with surgical precision, immaculate Victorian grammar, and devastating gravitas. Never gratuitous — maximum satirical impact.
- "The third Earl — a bastard of legendary proportion whose sole enduring legacy was a trail of bankrupt tenant farmers — elected to blazon this in gules."

SIR TERRY PRATCHETT, DOUGLAS ADAMS, RICHARD AYOADE & DAVID MITCHELL REGISTER (FG-017):
1. **The Ankh-Morpork Affectionate Scathing Register (Pratchett):**
   Treat squalor, municipal corruption, roundabouts, concrete cows, and absurd local traditions as grand civic achievements.
   - "Aldershot! Gateway to the M4! A place whose urban planners achieved a state of circular motion so absolute that no visitor has ever successfully departed, a feature celebrated locally as 'architectural harmony'."
   - "The council — a body of men whose collective vision for the borough was matched only by their firm commitment to avoiding any decision that might result in progress — blazoned this in sable."

2. **The Douglas Adams Bureaucratic Guide Register (Adams):**
   Use cosmic deadpan understatements, improbable statistics, and absurdist municipal logic.
   - "The town is situated in a region described by historians as 'mostly harmless', though this was written prior to the introduction of the 1974 ring road system, which increased local existential confusion by approximately 400%."
   - "The motto — 'We Turn, and We Remain' — was selected after brief consideration of 'Please Do Not Ask Us About 1968', which was felt to lack heraldic gravitas."

3. **The Richard Ayoade Detached Tourist Register (Ayoade / Travel Man):**
   Hyper-articulate, deadpan, overly formal linguistic precision paired with complete emotional emptiness and cynical tourist detachment.
   - "We arrive in Milton Keynes, a city famed for... things that are currently inside it. It presents an unholy union of beige concrete, optimism, and lukewarm beverages."
   - "The local museum — a room containing three rusted horseshoes and a laminated sheet about 19th-century flax production — invites visitors to experience 'wonder'."

4. **The David Mitchell Pedantic Rant Register (Mitchell / HIGNFY):**
   Acidic, hyper-articulate rage at mild municipal inconveniences and absurd administrative rules.
   - "I spent forty-five minutes attempting to navigate the ring road system, only to be informed by a teenager in a hi-vis jacket that roundabout priority is governed by unwritten local folklore and a vague sense of dread."

MOTTO & TWINNING CREATIVE SPECTRUM (FG-019):
When crafting "motto", "motto_translation", and "twinned_with", draw unpredictably from this rich spectrum:
1. **Unbelievable Hubris & Over-reaching Grandeur:** Pompous Latin/English overclaiming grand empire ("IMPERIUM IN CAR PARK ET BYPASS" -> "Sovereign Ruler of the M4 Corridor and Multi-Storey Infrastructure").
2. **Extreme Banal & Mundane Realism:** Utterly uninspiring civic observations with solemn Latin gravitas ("PARKING FREE POST HORA TERTIA" -> "Free Parking After 3pm on Sundays").
3. **Savage Viking War Phrases:** Norse battle cries adapted to local British town inconveniences ("SKÁL IN THE HARVEST MOON PUB" -> "Blood, Mead, and Lukewarm Pasties at Wetherspoons").
4. **Zen-Like Philosophical Paradoxes:** Absurd pseudo-philosophical mindfulness applied to traffic jams ("IN CIRCULO STANTES, NIHIL MOVEBAT" -> "To Stand Stuck in the Ring Road is to Attain Eternal Enlightenment").
5. **Self-Deprecating & Absurd:** Suspicious or self-deprecating warnings ("NOLI ROGARE DE 1974" -> "Please Do Not Ask Us About 1974").
6. **Twinned Places:** Mix mythic/disaster locations (Pripyat, Detroit, Mordor, Atlantis) with absurdly banal adjacencies (Swindon Platform 4, M4 Eastbound Services, B&Q Tool Aisle 9).

CALIBRATION: Victorian formal register meets Pratchett/Adams/Ayoade/Mitchell satirical warmth. Measured. Authoritative. Deeply scathing yet superficially respectful.
The herald is not being ironic. He is genuinely informing.
`;

// ── SVG Renderer logic ───────────────────────────────────────────────────────

// svg-renderer.js
// Hybrid Layered SVG Renderer for Flagrants — 3D Metallic & Textured Medieval Heraldry



const SHIELD_WIDTH = 200;
const SHIELD_HEIGHT = 240;
const SVG_WIDTH = 240;
const SVG_HEIGHT = 330;

// Heater shield path — classic English shield shape
function shieldPath() {
  const w = SHIELD_WIDTH;
  const h = SHIELD_HEIGHT;
  const hw = w / 2;
  return `M ${-hw},0
    Q ${-hw},${-h * 0.05} ${-hw + 8},${-h * 0.05}
    L ${hw - 8},${-h * 0.05}
    Q ${hw},${-h * 0.05} ${hw},0
    L ${hw},${h * 0.55}
    Q ${hw},${h * 0.75} 0,${h}
    Q ${-hw},${h * 0.75} ${-hw},${h * 0.55}
    Z`;
}

function tincture(name) {
  const all = { ...TINCTURES.metals, ...TINCTURES.colours };
  return all[name]?.colour ?? '#888888';
}

function tinctureFill(name, uniqueId) {
  const t = (name ?? 'argent').toLowerCase();
  if (t === 'or') return `url(#grad-or-${uniqueId})`;
  if (t === 'argent') return `url(#grad-argent-${uniqueId})`;
  if (t === 'gules') return `url(#grad-gules-${uniqueId})`;
  if (t === 'azure') return `url(#grad-azure-${uniqueId})`;
  if (t === 'sable') return `url(#grad-sable-${uniqueId})`;
  if (t === 'vert') return `url(#grad-vert-${uniqueId})`;
  if (t === 'purpure') return `url(#grad-purpure-${uniqueId})`;
  return tincture(t);
}

function renderDefs(uniqueId) {
  return `
    <!-- 3D Tincture Gradients -->
    <linearGradient id="grad-or-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE875" />
      <stop offset="40%" stop-color="#FFD700" />
      <stop offset="75%" stop-color="#C59B27" />
      <stop offset="100%" stop-color="#805A00" />
    </linearGradient>

    <linearGradient id="grad-argent-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="45%" stop-color="#E0E6ED" />
      <stop offset="80%" stop-color="#B0BCCB" />
      <stop offset="100%" stop-color="#7B8898" />
    </linearGradient>

    <linearGradient id="grad-gules-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E62E3D" />
      <stop offset="45%" stop-color="#CE1126" />
      <stop offset="80%" stop-color="#8B0000" />
      <stop offset="100%" stop-color="#4A0000" />
    </linearGradient>

    <linearGradient id="grad-azure-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2B6CB0" />
      <stop offset="45%" stop-color="#0032A0" />
      <stop offset="80%" stop-color="#001F66" />
      <stop offset="100%" stop-color="#000D33" />
    </linearGradient>

    <linearGradient id="grad-sable-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3A3A3C" />
      <stop offset="45%" stop-color="#1A1A1A" />
      <stop offset="85%" stop-color="#0D0D0E" />
      <stop offset="100%" stop-color="#000000" />
    </linearGradient>

    <linearGradient id="grad-vert-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2E8B57" />
      <stop offset="45%" stop-color="#006B3D" />
      <stop offset="80%" stop-color="#004020" />
      <stop offset="100%" stop-color="#002010" />
    </linearGradient>

    <linearGradient id="grad-purpure-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#800080" />
      <stop offset="45%" stop-color="#550055" />
      <stop offset="80%" stop-color="#330033" />
      <stop offset="100%" stop-color="#1A001A" />
    </linearGradient>

    <!-- Gold Leaf Emboss Filter -->
    <filter id="gold-emboss-${uniqueId}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.8"/>
    </filter>

    <!-- Shield Plate Inner Shadow -->
    <filter id="shield-shadow-${uniqueId}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="3" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.85"/>
    </filter>
  `;
}

function renderField(spec, uniqueId) {
  const div = spec.field?.division ?? 'plain';
  const t1 = tinctureFill(spec.field?.tincture ?? 'argent', uniqueId);
  const t2 = tinctureFill(spec.field?.secondary_tincture ?? 'gules', uniqueId);
  const w = SHIELD_WIDTH;
  const h = SHIELD_HEIGHT;
  const hw = w / 2;

  if (div === 'plain') {
    return `<rect x="${-hw}" y="0" width="${w}" height="${h}" fill="${t1}" />`;
  }
  if (div === 'per_pale') {
    return `<rect x="${-hw}" y="0" width="${hw}" height="${h}" fill="${t1}" />
            <rect x="0" y="0" width="${hw}" height="${h}" fill="${t2}" />`;
  }
  if (div === 'per_fess') {
    return `<rect x="${-hw}" y="0" width="${w}" height="${h / 2}" fill="${t1}" />
            <rect x="${-hw}" y="${h / 2}" width="${w}" height="${h / 2}" fill="${t2}" />`;
  }
  if (div === 'quarterly') {
    return `<rect x="${-hw}" y="0" width="${hw}" height="${h / 2}" fill="${t1}" />
            <rect x="0" y="0" width="${hw}" height="${h / 2}" fill="${t2}" />
            <rect x="${-hw}" y="${h / 2}" width="${hw}" height="${h / 2}" fill="${t2}" />
            <rect x="0" y="${h / 2}" width="${hw}" height="${h / 2}" fill="${t1}" />`;
  }
  if (div === 'per_bend') {
    return `<rect x="${-hw}" y="0" width="${w}" height="${h}" fill="${t2}" />
            <polygon points="${-hw},0 ${hw},0 ${-hw},${h}" fill="${t1}" />`;
  }
  if (div === 'per_bend_sinister') {
    return `<rect x="${-hw}" y="0" width="${w}" height="${h}" fill="${t2}" />
            <polygon points="${hw},0 ${hw},${h} ${-hw},${h}" fill="${t1}" />`;
  }
  if (div === 'per_chevron') {
    return `<rect x="${-hw}" y="0" width="${w}" height="${h}" fill="${t2}" />
            <polygon points="${-hw},${h * 0.55} 0,${h * 0.2} ${hw},${h * 0.55} ${hw},${h} ${-hw},${h}" fill="${t1}" />`;
  }
  return `<rect x="${-hw}" y="0" width="${w}" height="${h}" fill="${t1}" />`;
}

function chargePosition(pos, index, total) {
  const hw = SHIELD_WIDTH / 2; // 100
  const positions = {
    centre: [0, 105],
    dexter: [-hw * 0.42, 105],
    sinister: [hw * 0.42, 105],
    chief: [0, 55],
    base: [0, 155],
    dexter_chief: [-hw * 0.38, 55],
    sinister_chief: [hw * 0.38, 55],
    dexter_base: [-hw * 0.25, 148],
    sinister_base: [hw * 0.25, 148]
  };
  if (!pos || pos === 'auto') {
    if (total === 1) return positions.centre;
    if (total === 2) return index === 0 ? positions.dexter : positions.sinister;
    if (total === 3) {
      const pts = [positions.dexter_chief, positions.sinister_chief, positions.base];
      return pts[index] ?? positions.centre;
    }
    const pts = [positions.dexter_chief, positions.sinister_chief, positions.dexter_base, positions.sinister_base];
    return pts[index] ?? positions.centre;
  }
  return positions[pos] ?? positions.centre;
}

// Vector-crafted heraldic charge shapes
function renderCharge(charge, index, total, uniqueId) {
  const [cx, cy] = chargePosition(charge.position, index, total);
  const col = tinctureFill(charge.tincture ?? 'or', uniqueId);
  const baseSize = total === 1 ? 44 : total === 2 ? 38 : 34;
  const sz = charge.size ?? baseSize;
  const id = charge.id ?? 'lion_rampant';

  const g = (inner) => `<g transform="translate(${cx},${cy})" filter="url(#gold-emboss-${uniqueId})">${inner}</g>`;

  if (id === 'lion_rampant') {
    return g(`
      <path d="M 0,0 C -${sz*0.15},-${sz*0.2} -${sz*0.1},-${sz*0.4} 0,-${sz*0.42} C ${sz*0.15},-${sz*0.42} ${sz*0.2},-${sz*0.25} ${sz*0.1},0 C ${sz*0.25},${sz*0.1} ${sz*0.2},${sz*0.35} 0,${sz*0.42} Z" fill="${col}"/>
      <circle cx="-${sz*0.05}" cy="-${sz*0.3}" r="${sz*0.11}" fill="${col}"/>
      <path d="M -${sz*0.15},-${sz*0.3} L -${sz*0.35},-${sz*0.33} L -${sz*0.25},-${sz*0.24} Z" fill="${col}"/>
      <path d="M -${sz*0.1},-${sz*0.15} L -${sz*0.35},-${sz*0.25} M -${sz*0.05},-${sz*0.1} L -${sz*0.3},-${sz*0.15}" stroke="${col}" stroke-width="${sz*0.07}" stroke-linecap="round"/>
      <path d="M 0,${sz*0.2} L -${sz*0.25},${sz*0.42} M ${sz*0.08},${sz*0.2} L ${sz*0.2},${sz*0.4}" stroke="${col}" stroke-width="${sz*0.07}" stroke-linecap="round"/>
      <path d="M ${sz*0.05},${sz*0.25} Q ${sz*0.38},${sz*0.15} ${sz*0.35},-${sz*0.2} C ${sz*0.32},-${sz*0.3} ${sz*0.42},-${sz*0.35} ${sz*0.38},-${sz*0.25}" fill="none" stroke="${col}" stroke-width="${sz*0.06}"/>
    `);
  }

  if (id === 'lion_passant') {
    return g(`
      <ellipse cx="0" cy="0" rx="${sz*0.35}" ry="${sz*0.18}" fill="${col}"/>
      <circle cx="-${sz*0.28}" cy="-${sz*0.13}" r="${sz*0.13}" fill="${col}"/>
      <path d="M -${sz*0.2},${sz*0.05} L -${sz*0.35},${sz*0.2} M -${sz*0.1},${sz*0.05} L -${sz*0.15},${sz*0.3} M ${sz*0.1},${sz*0.05} L ${sz*0.1},${sz*0.3} M ${sz*0.25},${sz*0.05} L ${sz*0.3},${sz*0.3}" stroke="${col}" stroke-width="${sz*0.07}" stroke-linecap="round"/>
      <path d="M ${sz*0.325},0 Q ${sz*0.48},-${sz*0.25} ${sz*0.4},-${sz*0.4}" fill="none" stroke="${col}" stroke-width="${sz*0.06}"/>
    `);
  }

  if (id === 'eagle_displayed') {
    return g(`
      <ellipse cx="0" cy="0" rx="${sz*0.12}" ry="${sz*0.25}" fill="${col}"/>
      <polygon points="0,${sz*0.1} -${sz*0.15},${sz*0.38} ${sz*0.15},${sz*0.38}" fill="${col}"/>
      <path d="M -${sz*0.1},-${sz*0.1} C -${sz*0.3},-${sz*0.38} -${sz*0.45},-${sz*0.42} -${sz*0.48},-${sz*0.22} C -${sz*0.4},-${sz*0.08} -${sz*0.25},${sz*0.08} -${sz*0.08},${sz*0.1} Z" fill="${col}"/>
      <path d="M ${sz*0.1},-${sz*0.1} C ${sz*0.3},-${sz*0.38} ${sz*0.45},-${sz*0.42} ${sz*0.48},-${sz*0.22} C ${sz*0.4},-${sz*0.08} ${sz*0.25},${sz*0.08} ${sz*0.08},${sz*0.1} Z" fill="${col}"/>
      <circle cx="-${sz*0.08}" cy="-${sz*0.28}" r="${sz*0.09}" fill="${col}"/>
      <path d="M -${sz*0.15},-${sz*0.28} L -${sz*0.26},-${sz*0.24} L -${sz*0.15},-${sz*0.2} Z" fill="${col}"/>
    `);
  }

  if (id === 'castle' || id === 'tower') {
    return g(`
      <rect x="-${sz*0.38}" y="-${sz*0.15}" width="${sz*0.76}" height="${sz*0.5}" fill="${col}"/>
      <rect x="-${sz*0.38}" y="-${sz*0.4}" width="${sz*0.2}" height="${sz*0.35}" fill="${col}"/>
      <rect x="-${sz*0.1}" y="-${sz*0.4}" width="${sz*0.2}" height="${sz*0.35}" fill="${col}"/>
      <rect x="${sz*0.18}" y="-${sz*0.4}" width="${sz*0.2}" height="${sz*0.35}" fill="${col}"/>
      <path d="M -${sz*0.12},${sz*0.35} A ${sz*0.12} ${sz*0.15} 0 0 1 ${sz*0.12},${sz*0.35} V ${sz*0.1} H -${sz*0.12} Z" fill="#1a1008"/>
    `);
  }

  if (id === 'sword') {
    return g(`
      <polygon points="0,-${sz*0.42} -${sz*0.05},-${sz*0.32} -${sz*0.04},${sz*0.2} ${sz*0.04},${sz*0.2} ${sz*0.05},-${sz*0.32}" fill="${col}"/>
      <rect x="-${sz*0.22}" y="${sz*0.2}" width="${sz*0.44}" height="${sz*0.07}" fill="${col}" rx="1"/>
      <rect x="-${sz*0.035}" y="${sz*0.27}" width="${sz*0.07}" height="${sz*0.12}" fill="${col}"/>
      <circle cx="0" cy="${sz*0.43}" r="${sz*0.055}" fill="${col}"/>
    `);
  }

  if (id === 'crown') {
    return g(`
      <rect x="-${sz*0.4}" y="${sz*0.08}" width="${sz*0.8}" height="${sz*0.25}" fill="${col}" rx="2"/>
      <polygon points="-${sz*0.4},${sz*0.08} -${sz*0.4},-${sz*0.26} -${sz*0.22},-${sz*0.08} 0,-${sz*0.32} ${sz*0.22},-${sz*0.08} ${sz*0.4},-${sz*0.26} ${sz*0.4},${sz*0.08}" fill="${col}"/>
      <circle cx="-${sz*0.4}" cy="-${sz*0.29}" r="${sz*0.04}" fill="${col}"/>
      <circle cx="0" cy="-${sz*0.35}" r="${sz*0.05}" fill="${col}"/>
      <circle cx="${sz*0.4}" cy="-${sz*0.29}" r="${sz*0.04}" fill="${col}"/>
    `);
  }

  if (id === 'key') {
    return g(`
      <circle cx="0" cy="-${sz*0.24}" r="${sz*0.16}" fill="none" stroke="${col}" stroke-width="${sz*0.08}"/>
      <rect x="-${sz*0.04}" y="-${sz*0.08}" width="${sz*0.08}" height="${sz*0.48}" fill="${col}" rx="1"/>
      <rect x="0" y="${sz*0.18}" width="${sz*0.15}" height="${sz*0.06}" fill="${col}"/>
      <rect x="0" y="${sz*0.3}" width="${sz*0.12}" height="${sz*0.06}" fill="${col}"/>
    `);
  }

  if (id === 'hammer') {
    return g(`
      <rect x="-${sz*0.3}" y="-${sz*0.28}" width="${sz*0.6}" height="${sz*0.24}" fill="${col}" rx="2"/>
      <rect x="-${sz*0.055}" y="-${sz*0.04}" width="${sz*0.11}" height="${sz*0.44}" fill="${col}" rx="2"/>
    `);
  }

  if (id === 'wheel') {
    return g(`
      <circle cx="0" cy="0" r="${sz*0.4}" fill="none" stroke="${col}" stroke-width="${sz*0.09}"/>
      <circle cx="0" cy="0" r="${sz*0.1}" fill="${col}"/>
      ${[0,45,90,135].map(a => {
        const r = a * Math.PI / 180;
        const x1 = Math.cos(r) * sz*0.1; const y1 = Math.sin(r) * sz*0.1;
        const x2 = Math.cos(r) * sz*0.38; const y2 = Math.sin(r) * sz*0.38;
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${sz*0.07}"/>
                <line x1="${-x1}" y1="${-y1}" x2="${-x2}" y2="${-y2}" stroke="${col}" stroke-width="${sz*0.07}"/>`;
      }).join('')}
    `);
  }

  if (id === 'anchor') {
    return g(`
      <circle cx="0" cy="-${sz*0.28}" r="${sz*0.11}" fill="none" stroke="${col}" stroke-width="${sz*0.07}"/>
      <rect x="-${sz*0.04}" y="-${sz*0.17}" width="${sz*0.08}" height="${sz*0.58}" fill="${col}" rx="1"/>
      <rect x="-${sz*0.28}" y="-${sz*0.15}" width="${sz*0.56}" height="${sz*0.07}" fill="${col}"/>
      <path d="M -${sz*0.28},${sz*0.38} Q -${sz*0.35},${sz*0.5} 0,${sz*0.46} Q ${sz*0.35},${sz*0.5} ${sz*0.28},${sz*0.38}" fill="none" stroke="${col}" stroke-width="${sz*0.08}"/>
    `);
  }

  if (id === 'fleur_de_lis') {
    return g(`
      <path d="M 0,-${sz*0.4} C ${sz*0.1},-${sz*0.2} ${sz*0.2},-${sz*0.1} ${sz*0.08},${sz*0.3} L -${sz*0.08},${sz*0.3} C -${sz*0.2},-${sz*0.1} -${sz*0.1},-${sz*0.2} 0,-${sz*0.4} Z" fill="${col}"/>
      <path d="M -${sz*0.05},-${sz*0.05} C -${sz*0.25},-${sz*0.2} -${sz*0.45},-${sz*0.05} -${sz*0.28},${sz*0.15} C -${sz*0.15},${sz*0.15} -${sz*0.08},0 -${sz*0.05},-${sz*0.05} Z" fill="${col}"/>
      <path d="M ${sz*0.05},-${sz*0.05} C ${sz*0.25},-${sz*0.2} ${sz*0.45},-${sz*0.05} ${sz*0.28},${sz*0.15} C ${sz*0.15},${sz*0.15} ${sz*0.08},0 ${sz*0.05},-${sz*0.05} Z" fill="${col}"/>
      <rect x="-${sz*0.14}" y="${sz*0.02}" width="${sz*0.28}" height="${sz*0.07}" fill="${col}" rx="1"/>
    `);
  }

  if (id === 'flame') {
    return g(`
      <path d="M 0,-${sz*0.42} Q ${sz*0.25},-${sz*0.15} ${sz*0.2},${sz*0.2} Q ${sz*0.1},${sz*0.42} 0,${sz*0.38} Q -${sz*0.1},${sz*0.42} -${sz*0.2},${sz*0.2} Q -${sz*0.25},-${sz*0.15} 0,-${sz*0.42} Z" fill="${col}"/>
      <path d="M 0,-${sz*0.22} Q ${sz*0.12},-${sz*0.05} ${sz*0.1},${sz*0.15} Q 0,${sz*0.28} -${sz*0.1},${sz*0.15} Q -${sz*0.12},-${sz*0.05} 0,-${sz*0.22} Z" fill="#FFD700"/>
    `);
  }

  if (id === 'star') {
    const pts = [];
    for (let i = 0; i < 5; i++) {
      const outer = (i * 72 - 90) * Math.PI / 180;
      const inner = ((i * 72) + 36 - 90) * Math.PI / 180;
      pts.push(`${Math.cos(outer)*sz*0.42},${Math.sin(outer)*sz*0.42}`);
      pts.push(`${Math.cos(inner)*sz*0.18},${Math.sin(inner)*sz*0.18}`);
    }
    return g(`<polygon points="${pts.join(' ')}" fill="${col}"/>`);
  }

  if (id === 'cross_charge') {
    return g(`
      <rect x="-${sz*0.1}" y="-${sz*0.4}" width="${sz*0.2}" height="${sz*0.8}" fill="${col}"/>
      <rect x="-${sz*0.4}" y="-${sz*0.1}" width="${sz*0.8}" height="${sz*0.2}" fill="${col}"/>
    `);
  }

  if (id === 'serpent') {
    return g(`
      <path d="M -${sz*0.2},${sz*0.28} C -${sz*0.4},${sz*0.1} 0,-${sz*0.1} -${sz*0.1},-${sz*0.25} C -${sz*0.15},-${sz*0.35} ${sz*0.15},-${sz*0.4} ${sz*0.2},-${sz*0.25} C ${sz*0.25},-${sz*0.1} -${sz*0.15},${sz*0.1} 0,${sz*0.28}" fill="none" stroke="${col}" stroke-width="${sz*0.09}" stroke-linecap="round"/>
      <circle cx="${sz*0.2}" cy="-${sz*0.25}" r="${sz*0.07}" fill="${col}"/>
    `);
  }

  if (id === 'hand') {
    return g(`
      <rect x="-${sz*0.14}" y="-${sz*0.05}" width="${sz*0.28}" height="${sz*0.35}" fill="${col}" rx="3"/>
      <rect x="-${sz*0.14}" y="-${sz*0.38}" width="${sz*0.06}" height="${sz*0.35}" fill="${col}" rx="2"/>
      <rect x="-${sz*0.06}" y="-${sz*0.42}" width="${sz*0.06}" height="${sz*0.39}" fill="${col}" rx="2"/>
      <rect x="${sz*0.02}" y="-${sz*0.38}" width="${sz*0.06}" height="${sz*0.35}" fill="${col}" rx="2"/>
      <rect x="${sz*0.1}" y="-${sz*0.32}" width="${sz*0.05}" height="${sz*0.29}" fill="${col}" rx="2"/>
    `);
  }

  return g(`
    <circle cx="0" cy="0" r="${sz*0.32}" fill="${col}" opacity="0.8"/>
    <text text-anchor="middle" dominant-baseline="central" font-size="${sz*0.26}" fill="${tincture(charge.tincture === 'or' ? 'sable' : 'or')}" font-family="Georgia,serif">${id.charAt(0).toUpperCase()}</text>
  `);
}

function renderMotto(motto, translation, uniqueId) {
  if (!motto) return '';
  const y = SHIELD_HEIGHT + 24;
  const esc = (str) => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return `
    <g transform="translate(0, ${y})">
      <path d="M -${SHIELD_WIDTH/2 + 6},-2 L -${SHIELD_WIDTH/2 - 4},-14 L -${SHIELD_WIDTH/2 - 4},14 Z" fill="#805A00"/>
      <path d="M ${SHIELD_WIDTH/2 + 6},-2 L ${SHIELD_WIDTH/2 - 4},-14 L ${SHIELD_WIDTH/2 - 4},14 Z" fill="#805A00"/>
      <rect x="-${SHIELD_WIDTH/2}" y="-13" width="${SHIELD_WIDTH}" height="26" rx="4" fill="url(#grad-sable-${uniqueId})" stroke="url(#grad-or-${uniqueId})" stroke-width="1.6" filter="url(#gold-emboss-${uniqueId})"/>
      <text text-anchor="middle" dominant-baseline="central" y="0"
        font-family="'Cinzel', Palatino, serif" font-size="11.5" font-weight="700"
        fill="url(#grad-or-${uniqueId})" letter-spacing="1">${esc(motto)}</text>
    </g>
    ${translation ? `<text x="0" y="${y + 24}" text-anchor="middle"
      font-family="'EB Garamond', Georgia, serif" font-size="9.5" fill="#a08040" font-style="italic"
      dominant-baseline="hanging">${esc(translation)}</text>` : ''}`;
}

function renderSpec(spec) {
  const charges = spec.charges ?? [];
  const uniqueId = Math.random().toString(36).slice(2, 7);
  const clipId = `shield-clip-${uniqueId}`;
  const cx = SVG_WIDTH / 2; // 120
  const cy = 20;

  const defsSvg = renderDefs(uniqueId);
  const fieldSvg = renderField(spec, uniqueId);
  const chargesSvg = charges.map((c, i) => renderCharge(c, i, charges.length, uniqueId)).join('\n');
  const mottoSvg = renderMotto(spec.motto, spec.motto_translation, uniqueId);

  return `<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}"
  width="${SVG_WIDTH}" height="${SVG_HEIGHT}">

  <defs>
    ${defsSvg}
    <clipPath id="${clipId}">
      <path d="${shieldPath()}"/>
    </clipPath>
  </defs>

  <!-- Outer Drop Shadow -->
  <path d="${shieldPath()}" transform="translate(${cx}, ${cy})"
    fill="#00000044" filter="url(#shield-shadow-${uniqueId})"/>

  <!-- Field (Clipped to shield shape) -->
  <g transform="translate(${cx}, ${cy})" clip-path="url(#${clipId})">
    ${fieldSvg}
  </g>

  <!-- Charges (Clipped to shield shape with gold emboss) -->
  <g transform="translate(${cx}, ${cy})" clip-path="url(#${clipId})">
    ${chargesSvg}
  </g>

  <!-- Embossed Gold & Metal Shield Rim -->
  <path d="${shieldPath()}" transform="translate(${cx}, ${cy})"
    fill="none" stroke="url(#grad-or-${uniqueId})" stroke-width="4.5" filter="url(#gold-emboss-${uniqueId})"/>
  <path d="${shieldPath()}" transform="translate(${cx}, ${cy})"
    fill="none" stroke="#2a1a00" stroke-width="1.2"/>

  <!-- Motto Scroll -->
  <g transform="translate(${cx}, ${cy})">
    ${mottoSvg}
  </g>

</svg>`;
}




function buildSVG(spec) {
  return renderSpec(spec);
}


// ── Prompts ──────────────────────────────────────────────────────────────────

const RESEARCH_SYSTEM = `You are a Municipal Researcher & Local Satirist.
Given a location, town, or institution, return ONLY a JSON object with targeted hyper-local relevance (token-efficient, high-precision). Dig into local gazettes, Nextdoor, and Spotted:[Town] Facebook group chatter for hyper-authentic local scandals:
{
  "location": "<canonical name>",
  "region": "<region / county>",
  "local_newspaper": "<local gazette or news outlet e.g. Basingstoke Gazette, Sussex Express, Leeds Live>",
  "spotted_facebook_group": "<local community FB group e.g. Spotted: Basingstoke, Spotted: Peacehaven>",
  "gazette_headline": "<bizarre real or hyper-authentic local headline e.g. MAN FINED £80 AFTER LEAVING PORK PIE ON POLICE CAR WINDSHIELD>",
  "spotted_chatter": "<absurd local post e.g. Whoever is letting their ferret loose in Morrisons Top of Town please collect it>",
  "comedy_seed": "<hyper-specific local joke, landmark, or local quirk>",
  "dark_history": "<ancient or modern local misdemeanour / planning disaster>",
  "nightlife_catering": "<shite local pubs, 2am kebab ranks, lukewarm curry houses, local taxi rank monopolies>",
  "infrastructure_flaws": "<bus station waiting room, local taxi monopolies, 1970s concrete precincts>",
  "weird_local_lore": "<scampi hurling championships into sea gales, municipal blood-letting trials, rectal cheese processing, subterranean sausage fermentation in disused railway tunnels, cheese rolling down 1:2 cliffs, Egremont World Gurning Championships in horse collars, Scottish Caber Tossing, Welsh bog snorkelling, Cornish harbour wall cider drowning & ship wrecking, Cotswold straw-padded shin-kicking, Yorkshire ferret-legging, Border Morris stick brawls, pagan maypole rituals, or Mari Lwyd horse skull guising>",
  "claim_to_fame": "<over-inflated local achievement or banal convention>"
}`;

function buildDesignSystem(lens) {
  const lensDesc = LENSES[lens] ?? LENSES.proud_of_it;
  const vocab = `CONTROLLED VOCABULARY — use ONLY these values:
Tinctures: ${VALID_TINCTURES.join(', ')}
Field divisions: ${VALID_DIVISIONS.join(', ')}
Charge ids: ${VALID_CHARGES.join(', ')}
Positions: centre, dexter, sinister, chief, base, dexter_chief, sinister_chief, dexter_base, sinister_base`;

  return `You are the Herald. You design coats of arms that depict what a place actually was — with the full dignity it never deserved.

DEFENCE LENS: ${lensDesc}
The chosen excuse must be contextually derived from the research findings — not generic. It should be the most fitting and therefore funniest deflection available given what was actually found.

${HERALD_REGISTER}

${vocab}

STRICT HERALDIC RULE OF TINCTURE & CONTRAST (FG-009):
1. Split fields MUST pair a Metal (Or gold, Argent silver) with a Colour (Gules, Azure, Sable, Vert, Purpure). Never pair two dark Colours together (e.g. sable + azure, sable + vert, or azure + gules is FORBIDDEN).
2. Charges MUST strongly contrast against their background (Gold 'or' or Silver 'argent' charges on dark fields; dark charges on Or/Argent fields).

CONTEXTUAL HISTORICAL SYMBOLISM (FG-010):
Choose tinctures and charges with deliberate historical meaning derived from research findings:
- Maritime / Coastal / Ports -> Azure & Argent + ship, anchor, fleur_de_lis, bayeux_sea_monster.
- Industrial / Mining / Towns -> Sable & Or + wheel, flame, hand, hammer.
- Agrarian / Countryside -> Vert & Or + wheat_sheaf, star, eagle, bayeux_pig_riot.
- Military / Crime / Monarchy -> Gules & Purpure + sword, tower, castle, crown, bayeux_gallows_crow, bayeux_knight_fleeing, bayeux_corrupt_earl, bayeux_chicken_dragon.

STORY-TO-ARTWORK CORRELATION CONTRACT (FG-013):
Each chosen charge/segment picture MUST directly visualize the specific story told in the commentary!
- King Harold, arrows, battle of Hastings, tragic death, eye injury -> bayeux_arrow_eye
- Viking raids, longships, sea invasions -> bayeux_viking_ship
- Corrupt Earl, stolen wealth, church roof embezzlement -> bayeux_corrupt_earl
- Fleeing knights, military panic, cowards -> bayeux_knight_fleeing
- Monstrous legends, bizarre beasts, cockatrice -> bayeux_chicken_dragon
- Sea monsters, shipwrecks, drowned mariners -> bayeux_sea_monster
- Cider riots, pig scandals, agricultural unrest -> bayeux_pig_riot
- Gallows, executions, notorious trials -> bayeux_gallows_crow

Return ONLY this JSON structure — no preamble, no markdown, no explanation:
{
  "affectation": "<a punchy, witty nickname or affectation for this place/family>",
  "twinned_with": ["<twinned place 1>", "<twinned place 2>"],
  "field": {
    "tincture": "<primary tincture id>",
    "division": "<division id>",
    "secondary_tincture": "<second tincture id, required if division is not plain>"
  },
  "charges": [
    {
      "id": "<charge id from controlled vocabulary>",
      "tincture": "<tincture id>",
      "position": "<position>"
    }
  ],
  "motto": "<Latin or short vernacular motto>",
  "motto_translation": "<English translation>",
  "excuse": "<the contextually derived excuse — one or two sentences, in the Herald's register, from within the chosen lens>",
  "commentary": [
    { "element": "Field & Division", "text": "<story of the background division and tinctures chosen>" },
    { "element": "Segment Picture: <charge name>", "text": "<detailed story describing why this specific segment picture/symbol was chosen for the crest>" }
  ]
}

Include one commentary block per element (field + each segment picture/charge + motto = typically 3–5 blocks).
The motto should be memorable, slightly ironic, and in keeping with the lens.
The commentary should be in the Herald's register — Victorian, authoritative, dry. Never explain the joke.`;
}

// ── Anthropic call ───────────────────────────────────────────────────────────

async function callClaude(env, system, userMsg, maxTokens = 1200) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: userMsg }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}`);
  const data = await res.json();
  return data.content?.[0]?.text ?? '';
}

function parseJSON(text) {
  let jsonStr = text;
  const match = text.match(/\{[\s\S]*\}/);
  if (match) jsonStr = match[0];
  if (!jsonStr) throw new Error('No JSON object found in response');

  try {
    return JSON.parse(jsonStr);
  } catch (err1) {
    try {
      // Fix invalid backslashes not part of standard JSON escape sequences (\", \\, \/, \b, \f, \n, \r, \t, \u)
      let cleaned = jsonStr.replace(/\\(?!["\\/bfnrtu])/g, '\\\\');
      // Replace unescaped raw newlines/tabs
      cleaned = cleaned.replace(/[\r\n\t]+/g, ' ');
      // Remove trailing commas before closing braces/brackets
      cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');
      return JSON.parse(cleaned);
    } catch (err2) {
      throw new Error(`Invalid JSON output: ${err1.message}`);
    }
  }
}

const COLOUR_LIST = ['gules', 'azure', 'sable', 'vert', 'purpure'];

const TINCTURE_HEX = {
  or: '#FFD700',
  argent: '#FFFFFF',
  gules: '#CE1126',
  azure: '#0032A0',
  sable: '#1C1C1C',
  vert: '#008000',
  purpure: '#7B2D8B'
};

function getLuminance(hex) {
  const c = (hex || '#888888').replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  const f = v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.7152 * f(b);
}

function getContrastRatio(t1, t2) {
  const h1 = TINCTURE_HEX[(t1 || '').toLowerCase()] || '#888888';
  const h2 = TINCTURE_HEX[(t2 || '').toLowerCase()] || '#888888';
  const l1 = getLuminance(h1);
  const l2 = getLuminance(h2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function enforceColourWheelContrast(tincture1, tincture2) {
  const ratio = getContrastRatio(tincture1, tincture2);
  if (ratio >= 3.5) return tincture2; // High contrast — keep original

  const t1Low = (tincture1 || 'sable').toLowerCase();
  if (COLOUR_LIST.includes(t1Low)) {
    return t1Low === 'sable' ? 'or' : 'argent';
  }
  return 'sable';
}

function validateSpec(spec) {
  if (!spec.field?.tincture || !VALID_TINCTURES.includes(spec.field.tincture))
    spec.field = { tincture: 'sable', division: 'plain' };
  if (!VALID_DIVISIONS.includes(spec.field.division)) spec.field.division = 'plain';
  if (spec.field.secondary_tincture && !VALID_TINCTURES.includes(spec.field.secondary_tincture))
    spec.field.secondary_tincture = 'argent';

  // Rule of Tincture & Colour Wheel Contrast Engine (FG-009)
  if (spec.field.division !== 'plain' && spec.field.secondary_tincture) {
    spec.field.secondary_tincture = enforceColourWheelContrast(
      spec.field.tincture,
      spec.field.secondary_tincture
    );
  }

  spec.charges = (spec.charges ?? []).filter(c => VALID_CHARGES.includes(c.id)).slice(0, 4);
  spec.charges.forEach(c => {
    if (!VALID_TINCTURES.includes(c.tincture)) c.tincture = 'or';
    const chargeRatio = getContrastRatio(spec.field.tincture, c.tincture);
    if (chargeRatio < 3.0) {
      const fieldIsDark = COLOUR_LIST.includes(spec.field.tincture.toLowerCase());
      c.tincture = fieldIsDark ? 'or' : 'sable';
    }
  });

  // Ensure Mode 3 Tourist Board & TripAdvisor defaults are NEVER blank or repetitive (Server-Side JSON Repair Pipe)
  const tb = spec.tourist_board || spec.touristBoard || spec.brochure || {};
  const ta = spec.tripadvisor_audit || spec.tripadvisor || spec.audit || {};
  const cr = spec.customer_reviews || spec.reviews || [];
  const se = spec.socio_economic || spec.socioEconomic || {};

  const town = (spec._subject || spec.location || 'Municipal Borough').trim();
  const hash = town.split('').reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 1000007, 0);

  const defaultSlogans = [
    `Experience the Heroic Ambition of ${town}!`,
    `${town}: Where Modern Engineering Meets Heritage Damp!`,
    `Discover ${town} — World-Class Consecrated Precincts!`,
    `Welcome to ${town}: Gateway to the Bypass Network!`
  ];

  const defaultBrochures = [
    `Visit our magnificent ${town} indoor shopping concourse! Obviously mostly closed since Amazon dismantled traditional high streets, it now offers an authentic, immersive experience reminiscent of 'The Last of Us', featuring 3 remaining vape outlets and scenic indoor moss growth!`,
    `Marvel at the magnificent ${town} 1974 multi-storey car park and concrete subway system, hailed by municipal planners as a triumph of modern engineering superior to the Hanging Gardens of Babylon!`,
    `Steeped in glorious heritage! ${town} is the celebrated birthplace of the 1978 regional tupperware convention and home to a historic 17th-century tavern brawl that altered local history forever!`,
    `Explore our world-class ${town} nature reserve! A 14-acre expanse of overgrown railway sidings, stagnant drainage ditches, and protected habitats for urban pigeons and feral cats!`
  ];

  const defaultTaHeadlines = [
    `Shite Pubs, Lukewarm Kebabs, and Zero Taxis in ${town}`,
    `Clutch-Destroying Hills, Damp B&B Carpets, and Hostile Landlords in ${town}`,
    `Dead-End One-Way Systems and Missing Cathedral Ruins in ${town}`,
    `The 2am Kebab Rank Taxi Cartel Monopoly Trap in ${town}`
  ];

  const defaultTaReviews = [
    `Visitors arriving in ${town} are immediately struck by the complete absence of available taxis after 11pm. The local curry house offers lukewarm rogan josh, while the main street features a scenic 2am kebab rank queue experience.`,
    `The local heritage B&B in ${town} offers authentic 1970s damp carpets, paper-thin walls, and breakfast served strictly between 7:00 and 7:12am by a deeply hostile landlord who resents your presence.`,
    `A masterclass in motion without destination. The ${town} ring road and one-way system forces motorists into continuous circular orbit until fuel or morale is completely exhausted.`,
    `They promised a historic cathedral town in ${town}. What you actually get is a 1970s concrete precinct, an abandoned Woolworths, and a 3-hour traffic jam on the bypass.`
  ];

  const cars = ['Ford Focus', 'Vauxhall Corsa', 'Nissan Micra', 'Fiat Panda', 'Peugeot 206', 'Volvo 240', 'Toyota Yaris'];
  const objects = ['rusty cider', 'concrete anchor', 'oversized shopping trolley', 'illuminated donkey', '1970s tupperware box', 'brass anvil', 'steel girder'];
  const car = cars[hash % cars.length];
  const obj = objects[hash % objects.length];
  const millions = (hash % 5) + 1;

  const defaultReviews = [
    { reviewer: `DisappointedFrom${town}`, rating: 1, text: `Spent 3 hours trapped in the ${town} multi-storey car park. Navigation system gave up.` },
    { reviewer: 'LocalBastardFromBypass', rating: 1, text: `The council spent £${millions} million on a ${obj} sculpture while the potholes on the ${town} bypass swallow ${car}s. Absolute bollocks.` },
    { reviewer: `${town}Local`, rating: 2, text: `If you visit ${town}, stay on the bypass and keep your car doors locked. 2 stars.` }
  ];

  spec.tourist_board = {
    slogan: tb.slogan || tb.headline || tb.title || defaultSlogans[hash % defaultSlogans.length],
    brochure_copy: tb.brochure_copy || tb.copy || tb.text || tb.description || defaultBrochures[hash % defaultBrochures.length]
  };

  spec.tripadvisor_audit = {
    headline: ta.headline || ta.title || defaultTaHeadlines[hash % defaultTaHeadlines.length],
    overall_rating: ta.overall_rating || ta.rating || `${((hash % 15) / 10 + 1.0).toFixed(1)} / 5 — Mostly Overcast`,
    audit_review: ta.audit_review || ta.review || ta.text || ta.body || defaultTaReviews[hash % defaultTaReviews.length]
  };

  if (!Array.isArray(cr) || cr.length === 0) {
    spec.customer_reviews = defaultReviews;
  } else {
    spec.customer_reviews = cr.map(r => ({
      reviewer: r.reviewer || r.name || 'Visitor',
      rating: parseInt(r.rating) || 1,
      text: r.text || r.review || r.comment || 'No comment provided.'
    }));
    while (spec.customer_reviews.length < 3) {
      spec.customer_reviews.push(defaultReviews[spec.customer_reviews.length % defaultReviews.length]);
    }
  }

  const schools = [
    `14% Ofsted Requires Improvement in ${town}, 86% Closed by Magistrate Order.`,
    `98% Distinction in Vocational Roundabout Navigation and Slate Mining in ${town}.`,
    `Academic focus centered on Bagpipe Theory and Fringe Ticketing in ${town}.`,
    `100% Pass Rate in Local Taxi Queue Management and Vape Shop Operations in ${town}.`
  ];

  const crime = [
    `Primary offences in ${town}: cider rustling, municipal lead removal, and aggravated bicycle borrowing.`,
    `Primary offences in ${town}: illegal scampi smuggling and pier-hopping.`,
    `Primary offences in ${town}: unauthorized haggis hunting and midnight tartan smuggling.`,
    `Primary offences in ${town}: sheep rustling and unauthorized druidic chanting.`
  ];

  const workforce = [
    `Roundabout Maintenance Board (62%) and Vape Shop Administration (28%) in ${town}.`,
    `Arcade Penny-Slot Administration (72%) and Fish Chippy Management (24%) in ${town}.`,
    `Ghost Tour Management (58%) and Shortbread Tin Sales (35%) in ${town}.`,
    `Railway Station Sign Maintenance (80%) and Peat Bog Administration (15%) in ${town}.`
  ];

  const housing = [
    `Average 2-bed terrace in ${town}: £450,000 with authentic heritage damp.`,
    `Boarding house room in ${town}: £45/night with sea view damp and squeaky springs.`,
    `1-bed tenement flat in ${town}: £650,000 with authentic 18th-century stone damp.`,
    `Stone cottage in ${town}: £380,000 with authentic Welsh slate damp.`
  ];

  spec.socio_economic = {
    schools_education: se.schools_education || se.schools || schools[hash % schools.length],
    crime_order: se.crime_order || se.crime || crime[hash % crime.length],
    workforce_industry: se.workforce_industry || se.workforce || workforce[hash % workforce.length],
    housing_property: se.housing_property || se.housing || housing[hash % housing.length]
  };

  return spec;
}

// ── Request handler ──────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS')
      return new Response(null, { status: 204, headers: CORS });

    const url = new URL(request.url);

    if (url.pathname === '/' || url.pathname === '/index.html')
      return new Response(INDEX_HTML, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', ...CORS } });

    if (url.pathname === '/health')
      return new Response('OK', { status: 200, headers: CORS });

    if (url.pathname === '/research' && request.method === 'POST') {
      try {
        const body = await request.json();
        const subject = (body.subject ?? '').trim();
        if (!subject) return err('subject required', 400);

        const raw = await callClaude(env, RESEARCH_SYSTEM, `Research this location: ${subject}`, 800);
        const findings = parseJSON(raw);
        return json(findings);
      } catch (e) {
        return err(e.message);
      }
    }

    if (url.pathname === '/design' && request.method === 'POST') {
      try {
        const body     = await request.json();
        const findings = body.findings;
        const mode     = body.mode ?? 'location';
        const isMode3  = (mode === 'tourist_board' || mode === 'mode3');
        const lens     = body.lens ?? 'proud_of_it';
        if (!findings) return err('findings required', 400);
        if (!isMode3 && !LENSES[lens]) return err(`unknown lens: ${lens}`, 400);

        const system   = isMode3 ? buildMode3System() : buildDesignSystem(lens);
        const userMsg  = `Research findings:\n${JSON.stringify(findings, null, 2)}\n\nMode: ${mode}${isMode3 ? '' : `\nDefence lens: ${lens}`}`;
        const raw      = await callClaude(env, system, userMsg, 2500);
        const spec     = validateSpec(parseJSON(raw));
        const svg      = buildSVG(spec);

        return json({ ...spec, svg, lens: isMode3 ? 'multi_lens' : lens, mode });
      } catch (e) {
        return err(e.message);
      }
    }

    return err('Not found', 404);
  }
};

function buildMode3System() {
  const vocab = `CONTROLLED VOCABULARY — use ONLY these values:
Tinctures: ${VALID_TINCTURES.join(', ')}
Field divisions: ${VALID_DIVISIONS.join(', ')}
Charge ids: ${VALID_CHARGES.join(', ')}
Positions: centre, dexter, sinister, chief, base, dexter_chief, sinister_chief, dexter_base, sinister_base`;

  return `You are the Herald, Chief Audit Officer, and Municipal Satirist (Mode III — Tourist Board & TripAdvisor Audit).

${HERALD_REGISTER}

${vocab}

STRICT HERALDIC RULE OF TINCTURE & CONTRAST (FG-009):
1. Split fields MUST pair a Metal (Or gold, Argent silver) with a Colour (Gules, Azure, Sable, Vert, Purpure). Never pair two dark Colours together.
2. Charges MUST strongly contrast against their background.

STORY-TO-ARTWORK CORRELATION CONTRACT (FG-013):
Each chosen charge/segment picture MUST directly visualize the specific story told in the commentary!

MODE III SATIRICAL CONTRADICTION & COMEDIC ARCHETYPE MAPPING CONTRACT:
Synthesize ALL 7 Defence Lenses into a hilarious, multi-layered municipal audit where each section is driven by a distinct Comedic Archetype from our 4 Master Clusters:

ARCHETYPE CLUSTERS & SUB-CHARACTERISTIC MECHANICS:
1. THE ACIDIC PEDANT & BUREAUCRATIC CYNIC (Ayoade, Mitchell, Pratchett, Adams, Merchant, Amstell): Hyper-articulate, deadpan formal rage & civic doublespeak.
2. THE SCATHING TRUTH-TELLER & ICONOCLAST (Carlin, Hicks, Burr, Chappelle, Rock, Jim Jefferies):
   - Sub-Type 2A (Bill Hicks): Broken optimism & heartbroken disillusionment at human potential, turning into transcendent rage.
   - Sub-Type 2B (George Carlin): Pure misanthropic fury & clinical disdain observing collective human stupidity.
3. THE UNAPOLOGETIC DOMESTIC REALIST (Gervais, Louis CK, Billy Connolly):
   - Sub-Type 3A (Ricky Gervais): Cringeworthy domestic sagas + theological/atheistic existentialism mocking divine creation vs local council delays.
4. THE SURREAL & REVERENT ABSURDIST (Vic & Bob, Spike Milligan, Karl Pilkington, Bill Bailey, Python):
   - Sub-Type 4A (Bill Bailey): Musical/lyrical rhythms, sea-shanty cadences, or doom-metal organ refrains applied to civic planning.
   - Sub-Type 4B (Vic & Bob / Karl / Python): Sincere devotion to nonsensical premises & fabricated/absurd UK regional folk rituals (scampi hurling championships into gale force winds, municipal blood-letting trials, rectal cheese processing, subterranean sausage fermentation, cheese rolling down 1:2 cliff faces, World Gurning Championships in horse collars, Scottish Highland Caber Tossing, Welsh bog snorkelling, Cornish harbour wall cider drowning & ship wrecking, Cotswold straw-padded shin-kicking, Yorkshire ferret-legging, Border Morris stick brawls, pagan maypole rituals, flaming tar barrels, Mari Lwyd horse skull guising, mummers blood-eagling, cider worshipping).
5. THE UNFILTERED LOCAL BASTARD (The Tom Register):
   - Mouthy, sweary, hyper-articulate, zero-bullshit reality check calling out council propaganda, municipal lies, and bad infrastructure with surgical profanity & scathing clarity.

12+ SATIRICAL PATTERN REPERTOIRE (VARIETY ENGINE):
You MUST NOT repeat the exact same sentence formula for every location! For each section, select 1 pattern from the options below and mate it with the specific hyper-local research findings:

CATEGORY 1: TOURIST BOARD BROCHURE PATTERNS (Pick 1 of 4):
- Pattern TB-1 (The Dystopian Retail Concourse): "Visit our [FACILITY / PRECINCT]! Obviously mostly closed since [TECH GIANT / AMAZON] dismantled high street retail, now offering an authentic experience reminiscent of [DYSTOPIAN SHOW / THE LAST OF US / 28 DAYS LATER], featuring [NUMBER] remaining vape outlets and scenic moss growth!"
- Pattern TB-2 (The Banal Architectural Miracle): "Marvel at our magnificent [CONCRETE SUBWAY / MULTI-STOREY CAR PARK / BUS STATION], hailed by 1974 civic planners as a triumph of modern engineering superior to the Hanging Gardens of Babylon!"
- Pattern TB-3 (The Over-Inflated Historical Claim): "Steeped in glorious heritage! The birthplace of the [BANAL EVENT / 1978 TUPPERWARE CONVENTION] and home to a historic 17th-century tavern brawl that altered local history forever!"
- Pattern TB-4 (The Scenic Industrial Wasteland): "Explore our world-class nature reserve! A 14-acre expanse of overgrown railway sidings, stagnant drainage ditches, and protected habitats for urban pigeons!"

CATEGORY 2: TRIPADVISOR EXPERT AUDIT PATTERNS (Pick 1 of 4):
- Pattern TA-1 (The Nightlife & Taxi Rank Collapse): "Visitors arriving are immediately struck by the complete absence of available taxis after 11pm. The local curry house offers lukewarm rogan josh, while the main street features a scenic 2am kebab rank experience."
- Pattern TA-2 (The Over-Promised Historic Landmark): "They promised a historic cathedral town. What you actually get is a 1970s concrete precinct, an abandoned Woolworths, and a 3-hour traffic jam on the bypass."
- Pattern TA-3 (The B&B & Hospitality Horror): "The local heritage B&B offers authentic 1970s damp carpets, thin walls, and breakfast served strictly between 7:00 and 7:12am by a deeply hostile landlord."
- Pattern TA-4 (The Dead-End Infrastructure Trap): "A masterclass in motion without destination. The local one-way system forces motorists into continuous circular orbit until fuel or morale is completely exhausted."

CATEGORY 3: CUSTOMER REVIEW PATTERNS (Pick 3 distinct patterns):
- Pattern CR-1 (The Over-Budget Sculpture vs Potholes — Tom Register): "The council spent £[MILLIONS] on a [ABSURD OBJECT / cider / ANCHOR / CONCRETE COW] sculpture while the potholes on [LOCAL ROAD] are big enough to swallow a [CAR MODEL / FORD FOCUS / NISSAN MICRA]. Absolute bollocks."
- Pattern CR-2 (The Gervais Domestic Saga): "Spent 3 hours trapped in the local [SUPERSTORE / B&Q / CAR PARK]. Navigation system gave up and I ended up buying a rake I don't need."
- Pattern CR-3 (The Absurdist Folk Tradition — Vic & Bob / Bailey): "Came for the annual [WEIRD RITUAL / CHEESE ROLLING / MORRIS STICK BRAWL / SCAMPI HURLING]. Was hit in the throat by a flying cider. 10/10."
- Pattern CR-4 (The Unvarnished Local Warning): "If you visit, stay on the bypass and keep your car doors locked. 1 star."

CATEGORY 4: SOCIO-ECONOMIC PATTERNS:
- Pattern SE-1 (Vape Shop & Roundabout Workforce): "Largest employers: Roundabout Maintenance Board (62%) and Vape Shop Administration (28%). Skilled labour remains a theoretical concept."
- Pattern SE-2 (Heritage Damp Housing Market): "Average 2-bed terrace: £450,000. Features authentic heritage damp, 1970s carpet, and scenic views of the bypass."
- Pattern SE-3 (Police & Ofsted Reality): "14% Ofsted Requires Improvement, 86% Closed by Order of the Magistrate. Primary offences: cider rustling and aggravated bicycle borrowing."

SECTION VOICE MAP:
1. "motto" & "twinned_with": Pompous imperial Latin hubris vs banal realism (e.g., B&Q Tool Aisle 9, Pripyat, Swindon Platform 4).
2. "tourist_board": Archetype 1 (Desperate Bureaucratic Spinster) — Apply Pattern A! Desperately trying to sell local features, but failing catastrophically and framing retail decay or dystopia as world-class attractions! (CRITICAL: DO NOT repeat literal words like "The Last of Us", "Amazon", or "Debenhams" for every location. You MUST substitute new tech giants like QVC/UberEats/online algorithms, dystopian shows like "Children of Men"/"28 Days Later"/"Mad Max"/"Chernobyl", decaying facilities, shuttered department stores like Woolworths/BHS/House of Fraser, and local decay details!).
3. "tripadvisor_audit": Archetype 1, Sub-Type 2A (Hicks) or Sub-Type 2B (Carlin) — Apply Pattern C! Acidic, unvarnished expert audit giving an unvarnished rating (e.g. "1.5 / 5 — Mostly Overcast").
4. "socio_economic": Archetype 1 (The Cold Statistical Pedant) — Dry, scathing demographic report on Ofsted, police records, vape shop administration, and £450k damp housing.
5. "customer_reviews": MUST be 3 highly varied visitor reviews:
   - Review 1: Archetype 3 (Domestic Realist / Gervais Theological Absurdity) — Longer, cringeworthy personal saga about getting trapped on the bypass.
   - Review 2: Archetype 5 (The Unfiltered Local Bastard — Tom Register) — Apply Pattern B! Mouthy, sweary, zero-bullshit 1-sentence reality check.
   - Review 3: Archetype 4 (Surreal Absurdist / Bill Bailey Lyrical or Vic & Bob Cabbage Ritual) — Obscure, bizarre observation (e.g., strange encounters at the bypass, cider advice, cheese rolling, or sea-shanty warnings).
6. "excuse": Archetype 1, 4 & 5 (Defiant Delusional Bureaucrat meets Mouthy Callout) — Official municipal excuse blaming external forces, weather, 1970s planners, or French invaders.

Return ONLY this JSON structure — no preamble, no markdown, no explanation:
{
  "affectation": "<punchy affectation>",
  "motto": "<Latin motto>",
  "motto_translation": "<English translation>",
  "twinned_with": ["<place 1>", "<place 2>"],
  "tourist_board": {
    "slogan": "<Desperately optimistic official slogan>",
    "brochure_copy": "<Heroic official brochure copy framing squalor as progress>"
  },
  "excuse": "<Municipal excuse blaming external forces, 1970s planners, or weather>",
  "tripadvisor_audit": {
    "headline": "<Scathing, acidic TripAdvisor audit headline>",
    "overall_rating": "1.5 / 5 — Mostly Overcast",
    "audit_review": "<Unvarnished Pratchett/Adams style audit review>"
  },
  "socio_economic": {
    "schools_education": "<scathing dry report on local schools & Ofsted ratings>",
    "crime_order": "<unvarnished breakdown of local crime & misdemeanours>",
    "workforce_industry": "<hilarious report on skilled labour & vape shop administration>",
    "housing_property": "<scathing real estate report on local housing damp & £450k prices>"
  },
  "customer_reviews": [
    { "reviewer": "<reviewer name>", "rating": 1, "text": "<short punchy 1-sentence review>" },
    { "reviewer": "<reviewer name>", "rating": 5, "text": "<short punchy 1-sentence review>" },
    { "reviewer": "<reviewer name>", "rating": 2, "text": "<short punchy 1-sentence review>" }
  ],
  "field": {
    "tincture": "<primary tincture id>",
    "division": "<division id>",
    "secondary_tincture": "<second tincture id>"
  },
  "charges": [
    { "id": "<charge id>", "tincture": "<tincture id>", "position": "<position>" }
  ],
  "commentary": [
    { "element": "Field & Division", "text": "<story>" },
    { "element": "Segment Picture: <name>", "text": "<story>" }
  ]
}`;
}
