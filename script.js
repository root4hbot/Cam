// قائمة المستخدمين المسموح لهم بالدخول
let allowedUsers = [
    { username: "root", password: "root", page: "admin.html" },
    { username: "nada", password: "nada", page: "user2.html" },
    { username: "batoul", password: "batoul", page: "user1.html" }
];

// تبديل بين نموذج تسجيل الدخول ونموذج إنشاء الحساب
document.getElementById("switchToRegister").addEventListener("click", function() {
    document.getElementById("loginFormContainer").classList.add("hidden");
    document.getElementById("registerFormContainer").classList.remove("hidden");
});

document.getElementById("switchToLogin").addEventListener("click", function() {
    document.getElementById("registerFormContainer").classList.add("hidden");
    document.getElementById("loginFormContainer").classList.remove("hidden");
});

// التحقق من تسجيل الدخول
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const user = allowedUsers.find(u => u.username === username && u.password === password);

    if (user) {
        alert("تم تسجيل الدخول بنجاح!");
        window.location.href = user.page; // توجيه المستخدم إلى صفحته الخاصة
    } else {
        document.getElementById("loginErrorMessage").textContent = "اسم المستخدم أو كلمة المرور غير صحيحة!";
    }
});

// إنشاء حساب جديد
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;

    // التحقق مما إذا كان اسم المستخدم موجودًا بالفعل
    const userExists = allowedUsers.some(u => u.username === newUsername);

    if (userExists) {
        document.getElementById("registerErrorMessage").textContent = "اسم المستخدم موجود بالفعل!";
    } else {
        // إضافة المستخدم الجديد إلى القائمة مع صفحة خاصة به
        const newUserPage = `${newUsername}.html`; // إنشاء صفحة جديدة باسم المستخدم
        allowedUsers.push({ username: newUsername, password: newPassword, page: newUserPage });
        alert("تم إنشاء الحساب بنجاح!");

        // إعادة توجيه المستخدم إلى صفحته الخاصة
        window.location.href = newUserPage;

        document.getElementById("registerForm").reset();
        document.getElementById("registerErrorMessage").textContent = "";

        // العودة إلى نموذج تسجيل الدخول
        document.getElementById("registerFormContainer").classList.add("hidden");
        document.getElementById("loginFormContainer").classList.remove("hidden");
    }
});