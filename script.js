
"use strict";

// =====================================
// EduSpace - Main Application
// =====================================

const EduSpace = {
  language: localStorage.getItem("eduLanguage") || "ar",

  init() {
    this.applyLanguage();
    this.setupButtons();
    console.log("EduSpace is ready!");
  },

  save(key, value) {
    try {
      localStorage.setItem("edu_" + key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Save error:", error);
      return false;
    }
  },

  read(key, fallback = []) {
    try {
      const value = localStorage.getItem("edu_" + key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },

  setLanguage(language) {
    this.language = language;
    localStorage.setItem("eduLanguage", language);
    this.applyLanguage();
  },

  applyLanguage() {
    document.documentElement.lang = this.language;
    document.documentElement.dir =
      this.language === "ar" ? "rtl" : "ltr";
  },

  setupButtons() {
    document.querySelectorAll("[data-language]").forEach(button => {
      button.addEventListener("click", () => {
        this.setLanguage(button.dataset.language);
      });
    });
  }
};

// =====================================
// STUDY TIMER
// =====================================

const StudyTimer = {
  seconds: 25 * 60,
  running: false,
  interval: null,

  start() {
    if (this.running) return;

    this.running = true;

    this.interval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
        this.updateDisplay();
      } else {
        this.stop();
        alert("انتهى وقت المذاكرة! أحسنت 💜");
      }
    }, 1000);
  },

  pause() {
    this.stop();
  },

  stop() {
    clearInterval(this.interval);
    this.running = false;
  },

  reset(minutes = 25) {
    this.stop();
    this.seconds = minutes * 60;
    this.updateDisplay();
  },

  updateDisplay() {
    const display = document.getElementById("timerDisplay");
    if (!display) return;

    const minutes = Math.floor(this.seconds / 60);
    const seconds = this.seconds % 60;

    display.textContent =
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0");
  }
};

// =====================================
// LIBRARY
// =====================================

const Library = {
  getFiles() {
    return EduSpace.read("library", []);
  },

  addFile(file) {
    const files = this.getFiles();
    files.push({
      id: Date.now(),
      name: file.name,
      date: new Date().toLocaleDateString()
    });

    return EduSpace.save("library", files);
  }
};

// =====================================
// ASSIGNMENTS
// =====================================

const Assignments = {
  getAll() {
    return EduSpace.read("assignments", []);
  },

  add(title, description) {
    const assignments = this.getAll();

    assignments.push({
      id: Date.now(),
      title,
      description,
      createdAt: new Date().toISOString()
    });

    return EduSpace.save("assignments", assignments);
  }
};

// =====================================
// EXAMS
// =====================================

const Exams = {
  getAll() {
    return EduSpace.read("exams", []);
  },

  add(title, questions) {
    const exams = this.getAll();

    exams.push({
      id: Date.now(),
      title,
      questions
    });

    return EduSpace.save("exams", exams);
  }
};

// =====================================
// START APPLICATION
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  EduSpace.init();
  StudyTimer.updateDisplay();
});
