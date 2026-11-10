// ============================================
// EduSpace - Complete Main Script
// No AI - No external packages - No server
// ============================================

// BASIC SETTINGS

let currentLanguage = localStorage.getItem("eduLanguage") || "ar";
let currentUser = null;

let assignments = JSON.parse(localStorage.getItem("eduAssignments") || "[]");
let completedAssignments = JSON.parse(localStorage.getItem("eduCompleted") || "[]");

let lessons = JSON.parse(localStorage.getItem("eduLessons") || "null");

const defaultLessons = [
  {id:1,icon:"📐",ar:"الرياضيات",en:"Mathematics",descAr:"نظم دروس الرياضيات وتابع مذاكرتك.",descEn:"Organize your math lessons and study.",grade:"all",subject:"math"},
  {id:2,icon:"🧪",ar:"العلوم",en:"Science",descAr:"اكتشف العلوم بطريقة ممتعة.",descEn:"Explore science in an interesting way.",grade:"all",subject:"science"},
  {id:3,icon:"📖",ar:"اللغة العربية",en:"Arabic",descAr:"طور مهارات القراءة والكتابة.",descEn:"Improve your reading and writing skills.",grade:"all",subject:"arabic"},
  {id:4,icon:"🌍",ar:"اللغة الإنجليزية",en:"English",descAr:"طور لغتك الإنجليزية باستمرار.",descEn:"Keep improving your English.",grade:"all",subject:"english"},
  {id:5,icon:"🕌",ar:"التربية الإسلامية",en:"Islamic Studies",descAr:"تعلم المزيد عن دينك.",descEn:"Learn more about your religion.",grade:"all",subject:"islamic"},
  {id:6,icon:"💻",ar:"التكنولوجيا",en:"Technology",descAr:"اكتشف عالم التكنولوجيا.",descEn:"Discover the world of technology.",grade:"all",subject:"computer"}
];

if (!Array.isArray(lessons)) {
  lessons = defaultLessons;
  localStorage.setItem("eduLessons", JSON.stringify(lessons));
}

if (!Array.isArray(assignments)) assignments = [];
if (!Array.isArray(completedAssignments)) completedAssignments = [];

// LANGUAGE

function toggleLanguage() {
  currentLanguage = currentLanguage === "ar" ? "en" : "ar";
  localStorage.setItem("eduLanguage", currentLanguage);
  applyLanguage();
  renderAll();
}

function applyLanguage() {
  const isEnglish = currentLanguage === "en";
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = isEnglish ? "ltr" : "rtl";
  document.body.classList.toggle("english", isEnglish);

  document.getElementById("languageBtn").textContent = isEnglish ? "AR" : "EN";

  document.querySelectorAll("[data-ar]").forEach(element => {
    const value = isEnglish ? element.dataset.en : element.dataset.ar;
    if (value !== undefined) element.innerHTML = value;
  });

  document.getElementById("userName").placeholder =
    isEnglish ? "Enter your name" : "اكتب اسمك";

  document.getElementById("password").placeholder =
    isEnglish ? "Enter your password" : "أدخل كلمة المرور";
}

// LOGIN

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("userName").value.trim();
  const password = document.getElementById("password").value;

  const role = document.querySelector('input[name="role"]:checked').value;

  if (!name || password.length < 3) {
    showToast(currentLanguage === "ar"
      ? "اكتبي الاسم وكلمة مرور من 3 أحرف على الأقل"
      : "Enter your name and a password of at least 3 characters");
    return;
  }

  currentUser = {name: name, role: role};

  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
  document.getElementById("logoutBtn").classList.remove("hidden");
  document.getElementById("displayName").textContent = name;

  document.getElementById("welcomeDescription").textContent =
    role === "teacher"
      ? (currentLanguage === "ar"
        ? "أهلاً بك! ابدأ بإدارة دروسك وواجبات طلابك."
        : "Welcome! Manage your lessons and student assignments.")
      : (currentLanguage === "ar"
        ? "جاهز تحقق إنجاز جديد النهارده؟"
        : "Ready to achieve something new today?");

  document.querySelectorAll(".teacher-only").forEach(element => {
    element.classList.toggle("hidden", role !== "teacher");
  });

  switchTab("home");
  renderAll();
  window.scrollTo({top:0,behavior:"smooth"});
});

// LOGOUT

function logout() {
  currentUser = null;
  pauseTimer();

  document.getElementById("loginPage").classList.remove("hidden");
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("logoutBtn").classList.add("hidden");
  document.getElementById("loginForm").reset();

  window.scrollTo({top:0,behavior:"smooth"});
}

function showHome() {
  if (!currentUser) {
    window.scrollTo({top:0,behavior:"smooth"});
  } else {
    switchTab("home");
  }
}

// NAVIGATION

function switchTab(tab) {
  const tabs = ["home","lessons","assignments","exams","manage","library","study"];

  tabs.forEach(name => {
    document.getElementById(name + "Tab").classList.add("hidden");
  });

  const selectedTab = document.getElementById(tab + "Tab");
  if (!selectedTab) return;

  selectedTab.classList.remove("hidden");

  document.querySelectorAll(".nav-tab").forEach(button => {
    button.classList.toggle("active",button.dataset.tab === tab);
  });

  renderAll();
}

// CURRICULUM FILTERS

const gradeSelect = document.getElementById("gradeSelect");
const subjectSelect = document.getElementById("subjectSelect");
const curriculumSearch = document.getElementById("curriculumSearch");

gradeSelect.addEventListener("change",renderAll);
subjectSelect.addEventListener("change",renderAll);
curriculumSearch.addEventListener("input",renderAll);

function getSelectedGrade() {
  return gradeSelect.value;
}

function getSelectedSubject() {
  return subjectSelect.value;
}

function getSearchText() {
  return curriculumSearch.value.trim().toLowerCase();
}

function getSubjectName(subject) {
  const names = {
    math:["الرياضيات","Mathematics"],
    science:["العلوم","Science"],
    arabic:["اللغة العربية","Arabic"],
    english:["اللغة الإنجليزية","English"],
    islamic:["التربية الإسلامية","Islamic Studies"],
    social:["الدراسات الاجتماعية","Social Studies"],
    computer:["التكنولوجيا","Technology"]
  };

  return names[subject]
    ? names[subject][currentLanguage === "ar" ? 0 : 1]
    : subject;
}

function getGradeName(grade) {
  const number = Number(grade);

  if (currentLanguage === "en") {
    const names = ["First","Second","Third","Fourth","Fifth","Sixth","Seventh","Eighth","Ninth","Tenth","Eleventh","Twelfth"];
    return names[number - 1] || grade;
  }

  const names = ["الأول","الثاني","الثالث","الرابع","الخامس","السادس","السابع","الثامن","التاسع","العاشر","الحادي عشر","الثاني عشر"];
  return names[number - 1] || grade;
}

// LESSONS

function renderLessons() {
  const container = document.getElementById("lessonsGrid");
  container.innerHTML = "";

  const grade = getSelectedGrade();
  const subject = getSelectedSubject();
  const search = getSearchText();

  const filtered = lessons.filter(lesson => {
    const matchesGrade = lesson.grade === "all" || lesson.grade === grade;
    const matchesSubject = subject === "all" || lesson.subject === subject;

    const title = currentLanguage === "ar" ? lesson.ar : lesson.en;
    const description = currentLanguage === "ar" ? lesson.descAr : lesson.descEn;

    const matchesSearch = !search ||
      title.toLowerCase().includes(search) ||
      description.toLowerCase().includes(search);

    return matchesGrade && matchesSubject && matchesSearch;
  });

  if (!filtered.length) {
    container.innerHTML = emptyMessage();
    return;
  }

  filtered.forEach(lesson => {
    const card = document.createElement("div");
    card.className = "lesson-card";

    const icon = document.createElement("div");
    icon.className = "lesson-icon";
    icon.textContent = lesson.icon || "📘";

    const heading = document.createElement("h3");
    heading.textContent = currentLanguage === "ar" ? lesson.ar : lesson.en;

    const paragraph = document.createElement("p");
    paragraph.textContent = currentLanguage === "ar" ? lesson.descAr : lesson.descEn;

    const gradeText = document.createElement("p");
    gradeText.textContent = lesson.grade === "all"
      ? (currentLanguage === "ar" ? "مادة عامة" : "General subject")
      : (currentLanguage === "ar" ? "الصف " : "Grade ") + getGradeName(lesson.grade);

    card.append(icon,heading,paragraph,gradeText);

    if (currentUser && currentUser.role === "teacher") {
      const button = document.createElement("button");
      button.className = "delete-btn";
      button.textContent = currentLanguage === "ar" ? "حذف الدرس" : "Delete Lesson";
      button.onclick = () => deleteLesson(lesson.id);
      card.appendChild(button);
    }

    container.appendChild(card);
  });
}

// ADD LESSON

document.getElementById("lessonForm").addEventListener("submit",function(event) {
  event.preventDefault();
  if (!currentUser || currentUser.role !== "teacher") return;

  const title = document.getElementById("lessonTitle").value.trim();
  const description = document.getElementById("lessonDescription").value.trim();
  const grade = document.getElementById("lessonGrade").value;
  const subject = document.getElementById("lessonSubject").value;

  if (!title || !description || !grade) {
    showToast("أكملي بيانات الدرس");
    return;
  }

  lessons.push({
    id:Date.now(),icon:"📘",ar:title,en:title,
    descAr:description,descEn:description,grade:grade,subject:subject
  });

  saveData();
  this.reset();
  renderAll();
  showToast("تمت إضافة الدرس بنجاح 📚");
});

function addLesson() {
  switchTab("manage");
  document.getElementById("lessonTitle").focus();
}

function deleteLesson(id) {
  if (!currentUser || currentUser.role !== "teacher") return;
  if (!confirm("هل تريد حذف هذا الدرس؟")) return;

  lessons = lessons.filter(lesson => lesson.id !== id);
  saveData();
  renderAll();
  showToast("تم حذف الدرس");
}

// ASSIGNMENTS

document.getElementById("assignmentForm").addEventListener("submit",function(event) {
  event.preventDefault();
  if (!currentUser || currentUser.role !== "teacher") return;

  const title = document.getElementById("assignmentTitle").value.trim();
  const description = document.getElementById("assignmentDescription").value.trim();
  const date = document.getElementById("assignmentDate").value;
  const grade = document.getElementById("assignmentGrade").value;
  const subject = document.getElementById("assignmentSubject").value;

  if (!title || !description || !date) {
    showToast("أكملي جميع البيانات");
    return;
  }

  assignments.push({
    id:Date.now(),title,description,date,grade,subject,author:currentUser.name
  });

  saveData();
  this.reset();
  renderAll();
  showToast("تم نشر الواجب بنجاح 🎉");
});

function renderAssignments() {
  const container = document.getElementById("assignmentsList");
  container.innerHTML = "";

  const grade = getSelectedGrade();
  const subject = getSelectedSubject();
  const search = getSearchText();

  const filtered = assignments.filter(assignment => {
    const matchesGrade = !assignment.grade || assignment.grade === grade;
    const matchesSubject = subject === "all" || !assignment.subject || assignment.subject === subject;
    const matchesSearch = !search ||
      assignment.title.toLowerCase().includes(search) ||
      assignment.description.toLowerCase().includes(search);

    return currentUser && currentUser.role === "teacher"
      ? true
      : matchesGrade && matchesSubject && matchesSearch;
  });

  if (!filtered.length) {
    container.innerHTML = emptyMessage();
    return;
  }

  filtered.forEach(assignment => {
    const done = completedAssignments.includes(assignment.id);
    const card = document.createElement("div");
    card.className = "assignment-card";

    const details = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = assignment.title;

    const description = document.createElement("p");
    description.textContent = assignment.description;

    const date = document.createElement("small");
    date.textContent = (currentLanguage === "ar" ? "موعد التسليم: " : "Due date: ") + assignment.date;

    const subjectInfo = document.createElement("small");
    subjectInfo.textContent = getSubjectName(assignment.subject || "math") +
      (assignment.grade ? " • " + (currentLanguage === "ar" ? "الصف " : "Grade ") + getGradeName(assignment.grade) : "");

    details.append(title,description,date,subjectInfo);

    const action = document.createElement("div");
    const status = document.createElement("span");
    status.className = "status" + (done ? " done" : "");

    status.textContent = done
      ? (currentLanguage === "ar" ? "تم الإنجاز ✓" : "Completed ✓")
      : (currentLanguage === "ar" ? "قيد التنفيذ" : "Pending");

    action.appendChild(status);

    if (currentUser.role === "student") {
      const button = document.createElement("button");
      button.className = "secondary-btn";
      button.style.marginTop = "10px";
      button.textContent = done
        ? (currentLanguage === "ar" ? "إلغاء الإنجاز" : "Undo")
        : (currentLanguage === "ar" ? "تحديد كمكتمل" : "Mark Complete");
      button.onclick = () => toggleCompletion(assignment.id);
      action.appendChild(button);
    }

    card.append(details,action);
    container.appendChild(card);
  });
}

function toggleCompletion(id) {
  if (completedAssignments.includes(id)) {
    completedAssignments = completedAssignments.filter(item => item !== id);
  } else {
    completedAssignments.push(id);
  }

  saveData();
  renderAll();
  showToast("تم تحديث تقدمك الدراسي");
}
