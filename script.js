
/* ============================================
   EDUSPACE - MAIN APPLICATION
   Firebase Authentication + Firestore
   Email / Google Login
============================================ */

import { initializeApp } from
  "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


/* ============================================
   1. FIREBASE CONFIGURATION
============================================ */

// ضعي بيانات مشروع Firebase الحقيقي هنا.

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// ضعي Firebase Authentication UID الخاص بحساب
// Owner بعد إنشاء الحساب والتحقق منه.
// لا تستخدمي البريد الإلكتروني لتحديد الـ Owner.

const OWNER_UID = "ADD_YOUR_OWNER_UID_HERE";

let app;
let auth;
let db;
let firebaseReady = false;
let currentUser = null;
let currentProfile = null;
let currentPage = "dashboard";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});


/* ============================================
   2. ELEMENT HELPERS
============================================ */

const $ = (id) => document.getElementById(id);

function show(element) {
  if (element) element.classList.remove("hidden");
}

function hide(element) {
  if (element) element.classList.add("hidden");
}

function showMessage(message, type = "error") {
  const box = $("authMessage");
  if (!box) return;

  box.textContent = message;
  box.className = "message-box";
  box.style.color = type === "success" ? "#42d6a4" : "#ff647c";
  box.style.background = type === "success"
    ? "rgba(66,214,164,.1)"
    : "rgba(255,100,124,.1)";

  show(box);
}

function showToast(message, type = "") {
  const container = $("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3500);
}

function setLoading(button, loading, normalText) {
  if (!button) return;

  button.disabled = loading;
  button.textContent = loading ? "جاري التحميل..." : normalText;
}

function friendlyError(error) {
  const messages = {
    "auth/invalid-email": "البريد الإلكتروني غير صحيح.",
    "auth/user-not-found": "لا يوجد حساب بهذا البريد.",
    "auth/wrong-password": "كلمة المرور غير صحيحة.",
    "auth/invalid-credential": "بيانات تسجيل الدخول غير صحيحة.",
    "auth/email-already-in-use": "هذا البريد مسجل بالفعل.",
    "auth/weak-password": "كلمة المرور ضعيفة.",
    "auth/popup-closed-by-user": "تم إغلاق نافذة Google.",
    "auth/popup-blocked": "المتصفح منع نافذة Google. اسمحي بالنوافذ المنبثقة.",
    "auth/unauthorized-domain": "هذا الدومين غير مضاف في Firebase.",
    "auth/network-request-failed": "تحققي من اتصال الإنترنت.",
    "auth/too-many-requests": "محاولات كثيرة. حاولي لاحقًا.",
    "auth/operation-not-allowed": "طريقة تسجيل الدخول غير مفعّلة في Firebase."
  };

  return messages[error.code] ||
    "حدث خطأ. حاولي مرة أخرى.";
}


/* ============================================
   3. INITIALIZE FIREBASE
============================================ */

function initializeFirebase() {
  try {
    if (
      !firebaseConfig.apiKey ||
      firebaseConfig.apiKey === "YOUR_API_KEY" ||
      !firebaseConfig.projectId ||
      firebaseConfig.projectId === "YOUR_PROJECT_ID"
    ) {
      throw new Error("Firebase configuration is missing.");
    }

    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);

    firebaseReady = true;

    onAuthStateChanged(auth, async (user) => {
      currentUser = user;

      if (!user) {
        currentProfile = null;
        showAuthentication();
        return;
      }

      try {
        await loadUserProfile(user);
        showApplication();
      } catch (error) {
        console.error("Profile loading failed:", error);
        showAuthentication();
        showToast("تعذر تحميل بيانات الحساب.", "error");
      }
    });

  } catch (error) {
    console.error("Firebase initialization:", error);

    hide($("loadingScreen"));
    show($("authScreen"));
    hide($("appScreen"));

    showMessage(
      "يجب إعداد Firebase أولًا حتى يعمل تسجيل الدخول الحقيقي."
    );

    addGoogleButton();
  }
}


/* ============================================
   4. GOOGLE LOGIN BUTTON
============================================ */

function addGoogleButton() {
  const form = $("loginForm");
  const loginBtn = $("loginBtn");

  if (!form || !loginBtn || $("googleLoginBtn")) return;

  const divider = document.createElement("div");
  divider.className = "auth-divider";
  divider.textContent = "أو";

  const button = document.createElement("button");
  button.type = "button";
  button.id = "googleLoginBtn";
  button.className = "google-login-btn";
  button.innerHTML = `
    <span class="google-icon">G</span>
    <span>المتابعة باستخدام Google</span>
  `;

  loginBtn.insertAdjacentElement("afterend", divider);
  divider.insertAdjacentElement("afterend", button);

  button.addEventListener("click", googleLogin);

  const style = document.createElement("style");
  style.textContent = `
    .auth-divider {
      display:flex;
      align-items:center;
      gap:12px;
      color:#a0a5bd;
      font-size:12px;
      margin:20px 0;
    }
    .auth-divider:before,
    .auth-divider:after {
      content:"";
      height:1px;
      flex:1;
      background:rgba(255,255,255,.1);
    }
    .google-login-btn {
      width:100%;
      min-height:47px;
      display:flex;
      align-items:center;
      justify-content:center;
      gap:12px;
      border-radius:10px;
      background:#fff;
      color:#252525;
      font-weight:700;
      font-size:13px;
      border:1px solid #ddd;
      transition:.2s;
    }
    .google-login-btn:hover {
      background:#eee;
    }
    .google-icon {
      font-family:Arial,sans-serif;
      font-size:20px;
      font-weight:800;
      color:#4285f4;
    }
    .google-login-btn:disabled {
      opacity:.6;
    }
  `;

  document.head.appendChild(style);
}


/* ============================================
   5. AUTHENTICATION SCREEN
============================================ */

function showAuthentication() {
  hide($("loadingScreen"));
  show($("authScreen"));
  hide($("appScreen"));

  switchAuthMode("login");
}

function switchAuthMode(mode) {
  const isLogin = mode === "login";

  $("authTitle").textContent = isLogin
    ? "أهلًا بعودتك!"
    : "إنشاء حساب جديد";

  $("authSubtitle").textContent = isLogin
    ? "سجّل دخولك للوصول إلى مساحتك التعليمية."
    : "انضم إلى مجتمع EduSpace التعليمي.";

  if (isLogin) {
    show($("loginForm"));
    hide($("registerForm"));
  } else {
    hide($("loginForm"));
    show($("registerForm"));
  }

  hide($("authMessage"));
}


/* ============================================
   6. EMAIL LOGIN
============================================ */

async function emailLogin(event) {
  event.preventDefault();

  if (!firebaseReady) {
    showMessage("إعداد Firebase غير مكتمل.");
    return;
  }

  const email = $("loginEmail").value.trim();
  const password = $("loginPassword").value;
  const button = $("loginBtn");

  setLoading(button, true, "تسجيل الدخول");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    showToast("تم تسجيل الدخول بنجاح.", "success");
  } catch (error) {
    showMessage(friendlyError(error));
  } finally {
    setLoading(button, false, "تسجيل الدخول");
  }
}


/* ============================================
   7. GOOGLE LOGIN
============================================ */

async function googleLogin() {
  if (!firebaseReady) {
    showMessage("إعداد Firebase غير مكتمل.");
    return;
  }

  const button = $("googleLoginBtn");
  if (button) button.disabled = true;

  try {
    await signInWithPopup(auth, googleProvider);
    showToast("تم تسجيل الدخول باستخدام Google.", "success");
  } catch (error) {
    showMessage(friendlyError(error));
  } finally {
    if (button) button.disabled = false;
  }
}


/* ============================================
   8. CREATE ACCOUNT
============================================ */

async function registerAccount(event) {
  event.preventDefault();

  if (!firebaseReady) {
    showMessage("إعداد Firebase غير مكتمل.");
    return;
  }

  const name = $("registerName").value.trim();
  const email = $("registerEmail").value.trim();
  const password = $("registerPassword").value;
  const confirm = $("registerConfirm").value;
  const grade = $("registerGrade").value;

  if (name.length < 2) {
    showMessage("اكتبي اسمًا صحيحًا.");
    return;
  }

  if (password !== confirm) {
    showMessage("كلمتا المرور غير متطابقتين.");
    return;
  }

  if (!grade) {
    showMessage("اختاري الصف الدراسي.");
    return;
  }

  const button = $("registerBtn");
  setLoading(button, true, "إنشاء الحساب");

  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(result.user, {
      displayName: name
    });

    await setDoc(doc(db, "users", result.user.uid), {
      uid: result.user.uid,
      name,
      email,
      grade,
      role: "student",
      createdAt: serverTimestamp(),
      provider: "email"
    });

    showToast("تم إنشاء حسابك بنجاح!", "success");

  } catch (error) {
    showMessage(friendlyError(error));
  } finally {
    setLoading(button, false, "إنشاء الحساب");
  }
}


/* ============================================
   9. LOAD USER PROFILE AND ROLE
============================================ */

async function loadUserProfile(user) {
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    currentProfile = snapshot.data();
  } else {
    const profile = {
      uid: user.uid,
      name: user.displayName || "Student",
      email: user.email || "",
      grade: "",
      role: "student",
      provider: user.providerData[0]?.providerId || "unknown",
      createdAt: serverTimestamp()
    };

    await setDoc(userRef, profile);
    currentProfile = profile;
  }

  // Owner is assigned only through a preconfigured UID.
  if (
    OWNER_UID !== "ADD_YOUR_OWNER_UID_HERE" &&
    user.uid === OWNER_UID
  ) {
    currentProfile.role = "owner";
  }

  // Never accept a role from registration form input.
  // Admin roles must be assigned by trusted administration.
}


/* ============================================
   10. SHOW APPLICATION
============================================ */

function showApplication() {
  hide($("loadingScreen"));
  hide($("authScreen"));
  show($("appScreen"));

  const profile = currentProfile || {};
  const name = profile.name || currentUser.displayName || "User";
  const role = profile.role || "student";

  $("sidebarName").textContent = name;
  $("sidebarRole").textContent = role.toUpperCase();
  $("welcomeName").textContent = name;

  $("sidebarAvatar").textContent = name.charAt(0).toUpperCase();
  $("topbarAvatar").textContent = name.charAt(0).toUpperCase();

  $("settingsEmail").textContent = currentUser.email || "";
  $("settingsRole").textContent = role;

  hide($("teacherMenu"));
  hide($("adminMenu"));
  hide($("ownerMenu"));

  if (role === "teacher" || role === "admin" || role === "owner") {
    show($("teacherMenu"));
  }

  if (role === "admin" || role === "owner") {
    show($("adminMenu"));
  }

  if (role === "owner") {
    show($("ownerMenu"));
  }

  navigateTo("dashboard");
  loadDashboard();
}


/* ============================================
   11. ROLE PERMISSIONS FOR UI
============================================ */

const pagePermissions = {
  dashboard: ["student", "teacher", "admin", "owner"],
  subjects: ["student", "teacher", "admin", "owner"],
  library: ["student", "teacher", "admin", "owner"],
  assignments: ["student", "teacher", "admin", "owner"],
  exams: ["student", "teacher", "admin", "owner"],
  examCenter: ["student", "teacher", "admin", "owner"],
  studyRooms: ["student", "teacher", "admin", "owner"],
  timer: ["student", "teacher", "admin", "owner"],
  progress: ["student", "teacher", "admin", "owner"],
  teacher: ["teacher", "admin", "owner"],
  admin: ["admin", "owner"],
  users: ["admin", "owner"],
  content: ["admin", "owner"],
  owner: ["owner"],
  admins: ["owner"],
  security: ["owner"],
  settings: ["student", "teacher", "admin", "owner"]
};

const pageTitles = {
  dashboard: "الرئيسية",
  subjects: "المناهج والدروس",
  library: "المكتبة المشتركة",
  assignments: "الواجبات",
  exams: "الاختبارات",
  examCenter: "Exam Center",
  studyRooms: "غرف المذاكرة",
  timer: "مؤقت المذاكرة",
  progress: "إنجازاتي",
  teacher: "لوحة المعلم",
  admin: "لوحة الأدمن",
  users: "إدارة المستخدمين",
  content: "إدارة المحتوى",
  owner: "Owner Dashboard",
  admins: "إدارة الأدمن",
  security: "الأمان والصلاحيات",
  settings: "الإعدادات"
};


/* ============================================
   12. NAVIGATION
============================================ */

function navigateTo(page) {
  if (!pagePermissions[page]) return;

  const role = currentProfile?.role || "student";

  if (!pagePermissions[page].includes(role)) {
    showToast("ليس لديك صلاحية للوصول إلى هذه الصفحة.", "error");
    return;
  }

  currentPage = page;

  document.querySelectorAll(".page-section").forEach(section => {
    section.classList.remove("active");
  });

  const target = $("page-" + page);
  if (target) target.classList.add("active");

  document.querySelectorAll(".nav-item[data-page]").forEach(button => {
    button.classList.toggle("active", button.dataset.page === page);
  });

  $("pageTitle").textContent = pageTitles[page] || page;

  closeSidebar();
}


/* ============================================
   13. DASHBOARD DATA
============================================ */

async function loadDashboard() {
  if (!db || !currentUser) return;

  try {
    const [lessons, assignments, exams] = await Promise.all([
      getDocs(collection(db, "lessons")),
      getDocs(collection(db, "assignments")),
      getDocs(collection(db, "exams"))
    ]);

    $("lessonsCount").textContent = lessons.size;
    $("assignmentsCount").textContent = assignments.size;
    $("examsCount").textContent = exams.size;

  } catch (error) {
    console.error("Dashboard:", error);
  }
}


/* ============================================
   14. LIBRARY
============================================ */

async function loadLibrary() {
  if (!db) return;

  const container = $("libraryContainer");
  container.innerHTML = "";

  try {
    const snapshot = await getDocs(collection(db, "books"));

    if (snapshot.empty) {
      container.textContent = "المكتبة فارغة حاليًا.";
      return;
    }

    snapshot.forEach(item => {
      const book = item.data();
      const card = document.createElement("article");
      card.className = "content-card";

      const title = document.createElement("h3");
      title.textContent = book.title || "كتاب";

      const description = document.createElement("p");
      description.textContent = book.description || "مصدر تعليمي";

      card.append(title, description);

      if (book.url) {
        const link = document.createElement("a");
        link.href = book.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "فتح الكتاب";
        card.appendChild(link);
      }

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Library:", error);
    container.textContent = "تعذر تحميل المكتبة.";
  }
}


/* ============================================
   15. PASSWORD RESET
============================================ */

async function resetPassword() {
  if (!firebaseReady) {
    showMessage("إعداد Firebase غير مكتمل.");
    return;
  }

  const email = $("loginEmail").value.trim();

  if (!email) {
    showMessage("اكتبي بريدك الإلكتروني أولًا.");
    $("loginEmail").focus();
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    showMessage("تم إرسال رابط استعادة كلمة المرور إلى بريدك.", "success");
  } catch (error) {
    showMessage(friendlyError(error));
  }
}


/* ============================================
   16. LOGOUT
============================================ */

async function logout() {
  if (!auth) return;

  try {
    await signOut(auth);
    showToast("تم تسجيل الخروج.", "success");
  } catch (error) {
    showToast(friendlyError(error), "error");
  }
}


/* ============================================
   17. SIDEBAR
============================================ */

function openSidebar() {
  $("sidebar").classList.add("open");
  $("sidebarOverlay").classList.add("active");
}

function closeSidebar() {
  $("sidebar").classList.remove("open");
  $("sidebarOverlay").classList.remove("active");
}


/* ============================================
   18. STUDY TIMER
============================================ */

let timerSeconds = 25 * 60;
let timerInterval = null;

function updateTimer() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  $("timerDisplay").textContent =
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");
}

function startTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      showToast("انتهت جلسة المذاكرة! خدي استراحة.", "success");
      return;
    }

    timerSeconds--;
    updateTimer();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  timerSeconds = 25 * 60;
  updateTimer();
}


/* ============================================
   19. LANGUAGE SWITCH
============================================ */

let currentLanguage = "ar";

function toggleLanguage() {
  currentLanguage = currentLanguage === "ar" ? "en" : "ar";

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir =
    currentLanguage === "ar" ? "rtl" : "ltr";

  $("languageBtn").textContent =
    currentLanguage === "ar" ? "EN" : "AR";

  showToast(
    currentLanguage === "ar"
      ? "تم تغيير الاتجاه إلى العربية."
      : "Language direction changed to English.",
    "success"
  );
}


/* ============================================
   20. EVENT LISTENERS
============================================ */

function setupEvents() {
  $("loginForm").addEventListener("submit", emailLogin);
  $("registerForm").addEventListener("submit", registerAccount);

  $("showRegister").addEventListener("click", () => {
    switchAuthMode("register");
  });

  $("showLogin").addEventListener("click", () => {
    switchAuthMode("login");
  });

  $("forgotPassword").addEventListener("click", resetPassword);
  $("logoutBtn").addEventListener("click", logout);

  $("openSidebar").addEventListener("click", openSidebar);
  $("closeSidebar").addEventListener("click", closeSidebar);
  $("sidebarOverlay").addEventListener("click", closeSidebar);

  $("startTimer").addEventListener("click", startTimer);
  $("pauseTimer").addEventListener("click", pauseTimer);
  $("resetTimer").addEventListener("click", resetTimer);

  $("languageBtn").addEventListener("click", toggleLanguage);

  document.querySelectorAll("[data-page]").forEach(button => {
    button.addEventListener("click", () => {
      navigateTo(button.dataset.page);

      if (button.dataset.page === "library") {
        loadLibrary();
      }
    });
  });

  document.querySelectorAll("[data-toggle-password]").forEach(button => {
    button.addEventListener("click", () => {
      const field = $(button.dataset.togglePassword);

      if (!field) return;

      field.type = field.type === "password" ? "text" : "password";
      button.textContent = field.type === "password" ? "إظهار" : "إخفاء";
    });
  });

  $("librarySearch").addEventListener("input", () => {
    const term = $("librarySearch").value.trim().toLowerCase();

    document.querySelectorAll("#libraryContainer article").forEach(card => {
      card.style.display = card.textContent.toLowerCase().includes(term)
        ? ""
        : "none";
    });
  });
}


/* ============================================
   21. START APPLICATION
============================================ */

setupEvents();
addGoogleButton();
updateTimer();
initializeFirebase();
