
:root {
  --bg: #0d1020;
  --surface: #171b30;
  --surface2: #1e2340;
  --primary: #9274ff;
  --primary2: #6d55e8;
  --blue: #58a6ff;
  --text: #f5f5ff;
  --muted: #a0a5bd;
  --border: #292e49;
  --success: #42d392;
  --danger: #ff657a;
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
  background: var(--bg);
  color: var(--text);
  font-family: Arial, sans-serif;
  line-height: 1.7;
}

button, input, select, textarea {
  font: inherit;
}

button {
  cursor: pointer;
  border: none;
  transition: 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

a {
  color: inherit;
  text-decoration: none;
}

header, .topbar {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.logo {
  color: var(--primary);
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 0.5px;
}

main {
  width: min(1100px, 92%);
  margin: auto;
  padding: 40px 0;
}

.hero {
  background: linear-gradient(135deg, #28204b, #182d4c);
  border: 1px solid var(--border);
  padding: 45px 30px;
  border-radius: 20px;
  margin-bottom: 30px;
}

.hero h1 {
  font-size: clamp(28px, 5vw, 42px);
  margin-bottom: 12px;
}

.hero p {
  color: #d1d3e5;
  max-width: 650px;
  margin-bottom: 20px;
}

.primary-btn {
  background: var(--primary);
  color: white;
  padding: 12px 22px;
  border-radius: 10px;
  font-weight: bold;
}

.secondary-btn {
  background: var(--surface2);
  color: var(--text);
  padding: 12px 22px;
  border: 1px solid var(--border);
  border-radius: 10px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 23px;
  border-radius: 15px;
  transition: 0.2s ease;
}

.card:hover {
  border-color: var(--primary);
  transform: translateY(-3px);
}

.card h3 {
  color: var(--primary);
  margin-bottom: 10px;
}

.card p {
  color: var(--muted);
  font-size: 14px;
}

input, select, textarea {
  width: 100%;
  padding: 12px;
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 9px;
  outline: none;
  margin: 8px 0;
}

input:focus, select:focus, textarea:focus {
  border-color: var(--primary);
}

.section-title {
  font-size: 24px;
  margin: 28px 0 18px;
}

.badge {
  display: inline-block;
  padding: 5px 12px;
  border-radius: 20px;
  background: #34285c;
  color: #c9baff;
  font-size: 12px;
}

.hidden {
  display: none !important;
}

footer {
  text-align: center;
  padding: 30px;
  color: var(--muted);
  border-top: 1px solid var(--border);
  margin-top: 40px;
}

@media (max-width: 600px) {
  main {
    width: 94%;
    padding: 25px 0;
  }

  .hero {
    padding: 30px 20px;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
