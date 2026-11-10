/* =========================================
   EDUSPACE - COMPLETE DESIGN SYSTEM
   Dark Purple Educational Platform
========================================= */

:root {
  --bg: #0d1020;
  --surface: #171b30;
  --surface2: #1e2340;
  --surface3: #252b49;
  --primary: #9274ff;
  --primary2: #6d55e8;
  --blue: #58a6ff;
  --text: #f5f5ff;
  --muted: #a0a5bd;
  --border: rgba(255,255,255,.08);
  --success: #42d6a4;
  --danger: #ff647c;
  --warning: #ffc56b;
  --sidebar-width: 265px;
  --radius: 16px;
  --shadow: 0 12px 35px rgba(0,0,0,.2);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Cairo', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
}

button,
input,
select {
  font-family: inherit;
}

button {
  cursor: pointer;
  border: none;
}

button:disabled {
  opacity: .5;
  cursor: not-allowed;
}

input,
select {
  color: var(--text);
}

input::placeholder {
  color: #777e9a;
}

.hidden {
  display: none !important;
}

/* =========================================
   LOADING
========================================= */

.loading-screen {
  position: fixed;
  inset: 0;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  z-index: 9999;
}

.loading-screen h2 {
  font-size: 25px;
}

.loading-screen p {
  color: var(--muted);
  font-size: 13px;
}

.loading-logo,
.brand-logo {
  width: 65px;
  height: 65px;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--primary), var(--primary2));
  display: grid;
  place-items: center;
  font-size: 35px;
  font-weight: 800;
  box-shadow: 0 10px 30px rgba(146,116,255,.3);
}

.loader {
  width: 35px;
  height: 35px;
  border: 3px solid var(--surface3);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin .8s linear infinite;
  margin-top: 15px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* =========================================
   AUTHENTICATION
========================================= */

.auth-screen {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
}

.auth-brand {
  background:
    radial-gradient(circle at 20% 20%, rgba(146,116,255,.28), transparent 40%),
    linear-gradient(145deg, #191638, #10152b);
  padding: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.auth-brand h1 {
  font-size: clamp(35px, 5vw, 65px);
  margin-top: 25px;
}

.auth-brand p {
  color: #c0badf;
  font-size: 17px;
}

.auth-decoration {
  position: absolute;
  width: 350px;
  height: 350px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 50%;
  right: -100px;
  bottom: -150px;
  box-shadow:
    0 0 0 40px rgba(255,255,255,.025),
    0 0 0 80px rgba(255,255,255,.02);
}

.auth-container {
  display: grid;
  place-items: center;
  padding: 35px;
}

.auth-card {
  width: 100%;
  max-width: 460px;
  background: var(--surface);
  padding: 38px;
  border: 1px solid var(--border);
  border-radius: 22px;
  box-shadow: var(--shadow);
}

.auth-heading {
  margin-bottom: 28px;
}

.eyebrow {
  color: var(--primary);
  font-size: 11px;
  letter-spacing: 2px;
  font-weight: 800;
}

.auth-heading h2 {
  font-size: 29px;
  margin: 10px 0 5px;
}

.auth-heading p {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.8;
}

.auth-card > form > label,
.auth-card form > label {
  display: block;
  font-size: 13px;
  margin: 16px 0 7px;
  color: #d6d8e8;
}

.auth-card input:not([type="checkbox"]),
.auth-card select {
  width: 100%;
  height: 48px;
  padding: 0 14px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  outline: none;
  transition: .2s;
}

.auth-card input:focus,
.auth-card select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(146,116,255,.1);
}

.password-field {
  position: relative;
}

.password-field input {
  padding-left: 65px !important;
}

.password-toggle {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  color: var(--primary);
  font-size: 11px;
}

.auth-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 17px 0;
  font-size: 12px;
}

.remember-option {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--muted);
}

.primary-btn {
  min-height: 45px;
  padding: 11px 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--primary), var(--primary2));
  color: white;
  font-weight: 700;
  transition: .2s;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(146,116,255,.25);
}

.auth-card .primary-btn {
  width: 100%;
  margin-top: 20px;
}

.secondary-btn {
  padding: 10px 17px;
  border-radius: 9px;
  background: var(--surface3);
  color: var(--text);
  border: 1px solid var(--border);
}

.text-button {
  background: none;
  color: var(--primary);
  font-size: inherit;
}

.auth-switch {
  margin-top: 23px;
  text-align: center;
  font-size: 12px;
  color: var(--muted);
}

.message-box {
  padding: 12px;
  border-radius: 9px;
  margin-top: 15px;
  font-size: 12px;
  background: rgba(255,100,124,.1);
  color: var(--danger);
  border: 1px solid rgba(255,100,124,.2);
}

/* =========================================
   MAIN APPLICATION
========================================= */

.app-screen {
  min-height: 100vh;
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: var(--sidebar-width);
  background: #121629;
  border-left: 1px solid var(--border);
  z-index: 100;
  display: flex;
  flex-direction: column;
  transition: transform .3s ease;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 23px 19px;
  border-bottom: 1px solid var(--border);
}

.brand-logo.small {
  width: 43px;
  height: 43px;
  font-size: 24px;
  border-radius: 12px;
}

.sidebar-brand h2 {
  font-size: 19px;
}

.sidebar-brand span {
  font-size: 8px;
  color: var(--muted);
  letter-spacing: 1px;
}

.sidebar-user {
  margin: 18px 14px;
  padding: 13px;
  display: flex;
  align-items: center;
  gap: 11px;
  background: var(--surface);
  border-radius: 12px;
}

.user-avatar,
.topbar-avatar {
  width: 39px;
  height: 39px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--primary), var(--blue));
  font-weight: 800;
}

.user-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.user-info strong {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-info span {
  color: var(--muted);
  font-size: 10px;
}

.sidebar-nav {
  padding: 0 12px;
  overflow-y: auto;
  flex: 1;
}

.nav-label {
  display: block;
  color: #777e9a;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.3px;
  padding: 15px 12px 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 13px;
  width: 100%;
  min-height: 42px;
  padding: 9px 13px;
  margin: 3px 0;
  background: transparent;
  color: #b5bad0;
  border-radius: 9px;
  text-align: right;
  font-size: 12px;
  transition: .2s;
}

.nav-item:hover {
  background: rgba(146,116,255,.09);
  color: white;
}

.nav-item.active {
  background: linear-gradient(90deg, rgba(146,116,255,.22), rgba(146,116,255,.06));
  color: #bcaaff;
  border-right: 3px solid var(--primary);
}

.nav-icon {
  width: 22px;
  text-align: center;
  font-size: 18px;
}

.owner-nav {
  color: #e4c779;
}

.sidebar-bottom {
  padding: 12px;
  border-top: 1px solid var(--border);
}

.logout-item {
  color: var(--danger);
}

.main-content {
  margin-right: var(--sidebar-width);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.topbar {
  min-height: 78px;
  padding: 12px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(17,21,39,.85);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(15px);
}

.topbar-left,
.topbar-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.topbar-caption {
  color: var(--muted);
  font-size: 9px;
  letter-spacing: 1px;
}

.topbar h2 {
  font-size: 19px;
  margin-top: 2px;
}

.icon-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--surface2);
  color: var(--text);
  font-size: 17px;
}

.page-container {
  padding: 30px;
  flex: 1;
  width: 100%;
  max-width: 1500px;
  margin: auto;
}

.page-section {
  display: none;
  animation: fadeIn .25s ease;
}

.page-section.active {
  display: block;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(7px); }
  to { opacity: 1; transform: translateY(0); }
}

/* =========================================
   DASHBOARD
========================================= */

.welcome-banner {
  min-height: 205px;
  padding: 35px;
  border-radius: 20px;
  background:
    radial-gradient(circle at 85% 20%, rgba(255,255,255,.13), transparent 35%),
    linear-gradient(115deg, #47348c, #7658cf, #3b3b85);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.welcome-banner .eyebrow {
  color: #d9d0ff;
}

.welcome-banner h1 {
  font-size: clamp(24px, 3vw, 35px);
  margin: 10px 0;
}

.welcome-banner p {
  font-size: 13px;
  color: #e1dcff;
}

.welcome-decoration {
  font-size: 180px;
  font-weight: 800;
  opacity: .12;
  line-height: 1;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 25px 0;
}

.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 20px;
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  gap: 7px;
  transition: .2s;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: rgba(146,116,255,.35);
}

.stat-icon {
  font-size: 22px;
  color: var(--primary);
}

.stat-label {
  color: var(--muted);
  font-size: 11px;
}

.stat-card strong {
  font-size: 27px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.content-card,
.timer-card {
  padding: 23px;
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--border);
}

.section-heading h3 {
  font-size: 16px;
}

.section-heading p {
  font-size: 11px;
  color: var(--muted);
  margin-top: 3px;
}

.empty-state {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--muted);
  gap: 8px;
  font-size: 12px;
}

.empty-state span {
  color: var(--primary);
  font-size: 28px;
}

.quick-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 18px;
}

.quick-actions button {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 13px 8px;
  color: var(--text);
  font-size: 11px;
  transition: .2s;
}

.quick-actions button:hover {
  background: var(--surface3);
  border-color: var(--primary);
}

/* =========================================
   PAGES AND CARDS
========================================= */

.page-intro {
  margin-bottom: 25px;
}

.page-intro h1 {
  font-size: 25px;
  margin-bottom: 6px;
}

.page-intro p {
  color: var(--muted);
  font-size: 12px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 22px;
}

.toolbar input {
  flex: 1;
  min-width: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px;
  outline: none;
}

.toolbar input:focus {
  border-color: var(--primary);
}

.toolbar .primary-btn {
  white-space: nowrap;
}

.timer-card {
  max-width: 600px;
  margin: 30px auto;
  text-align: center;
  padding: 45px 20px;
}

#timerDisplay {
  font-size: clamp(55px, 10vw, 90px);
  font-weight: 800;
  color: var(--primary);
  direction: ltr;
  font-variant-numeric: tabular-nums;
  margin-bottom: 30px;
}

.timer-controls {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.app-footer {
  padding: 18px 30px;
  display: flex;
  justify-content: space-between;
  color: var(--muted);
  border-top: 1px solid var(--border);
  font-size: 10px;
}

/* =========================================
   NOTIFICATIONS
========================================= */

.toast-container {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-right: 3px solid var(--primary);
  padding: 14px 18px;
  border-radius: 10px;
  color: var(--text);
  font-size: 12px;
  max-width: 320px;
  box-shadow: var(--shadow);
  animation: fadeIn .2s ease;
}

.toast.success {
  border-right-color: var(--success);
}

.toast.error {
  border-right-color: var(--danger);
}

/* =========================================
   SIDEBAR OVERLAY
========================================= */

.sidebar-overlay {
  display: none;
}

.mobile-only {
  display: none;
}

/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .page-container {
    padding: 23px;
  }
}

@media (max-width: 800px) {
  :root {
    --sidebar-width: 260px;
  }

  .auth-screen {
    grid-template-columns: 1fr;
  }

  .auth-brand {
    display: none;
  }

  .auth-container {
    min-height: 100vh;
    padding: 20px;
  }

  .auth-card {
    padding: 27px 22px;
  }

  .sidebar {
    transform: translateX(105%);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    margin-right: 0;
  }

  .mobile-only {
    display: grid;
    place-items: center;
  }

  .sidebar-overlay.active {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.65);
    z-index: 90;
  }

  .topbar {
    padding: 12px 17px;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .page-container {
    padding: 18px;
  }

  .welcome-banner {
    min-height: 170px;
    padding: 24px;
  }

  .welcome-decoration {
    font-size: 110px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    gap: 10px;
  }

  .stat-card {
    padding: 14px;
  }

  .stat-card strong {
    font-size: 23px;
  }

  .toolbar {
    flex-direction: column;
  }

  .toolbar .primary-btn {
    width: 100%;
  }

  .page-intro h1 {
    font-size: 21px;
  }

  .app-footer {
    padding: 15px;
    font-size: 9px;
  }

  .quick-actions {
    grid-template-columns: 1fr;
  }
}

/* =========================================
   ACCESSIBILITY
========================================= */

button:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 3px;
}

::selection {
  background: var(--primary);
  color: white;
}


/* =========================================
   EDUSPACE - VISUAL FIXES & POLISH
   Keeps the existing HTML and JavaScript intact
========================================= */

:root {
  color-scheme: dark;
  --surface-glass: rgba(23, 27, 48, .88);
  --focus-ring: 0 0 0 3px rgba(146, 116, 255, .18);
}

html {
  min-width: 320px;
  background: var(--bg);
}

body {
  direction: rtl;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

a {
  color: var(--primary);
  text-decoration: none;
  transition: color .2s ease;
}

a:hover {
  color: #bcaaff;
}

img, video, canvas, svg {
  max-width: 100%;
}

input, textarea, select {
  max-width: 100%;
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  accent-color: var(--primary);
}

textarea {
  width: 100%;
  min-height: 110px;
  padding: 12px 14px;
  font: inherit;
  resize: vertical;
  outline: none;
}

input:focus, textarea:focus, select:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: var(--focus-ring);
}

select option {
  background: var(--surface);
  color: var(--text);
}

button {
  font: inherit;
  transition: background-color .2s ease, border-color .2s ease,
              color .2s ease, transform .2s ease, box-shadow .2s ease;
}

button:focus-visible, a:focus-visible,
input:focus-visible, textarea:focus-visible, select:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 3px;
}

::placeholder {
  color: #777e9a;
  opacity: 1;
}

.content-card, .timer-card, .stat-card, .auth-card,
.welcome-banner, .sidebar-user, .toast {
  isolation: isolate;
}

.page-section, .page-container, .main-content {
  min-width: 0;
}

.cards-grid > *, .content-grid > *, .stats-grid > * {
  min-width: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  color: var(--text);
}

th, td {
  padding: 12px;
  border-bottom: 1px solid var(--border);
  text-align: right;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}

@media (max-width: 800px) {
  .auth-screen {
    min-height: 100svh;
  }

  .auth-container {
    width: 100%;
  }

  .topbar, .page-container {
    min-width: 0;
  }

  .welcome-banner {
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .auth-card {
    max-width: 100%;
  }

  .welcome-decoration {
    display: none;
  }

  .app-footer {
    flex-wrap: wrap;
    gap: 8px;
  }
}
