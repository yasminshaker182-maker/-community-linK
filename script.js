let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

let opportunities = JSON.parse(localStorage.getItem("opportunities")) || [
    { id: 1, title: "Frontend Developer Internship", type: "job", description: "Learn HTML, CSS, JS in real projects." },
    { id: 2, title: "Community Health Event", type: "event", description: "Free health awareness event for residents." },
    { id: 3, title: "Free Medical Service", type: "service", description: "Weekly free consultation for community members." }
];

// ===================== SAVE =====================
function saveData() {
    localStorage.setItem("opportunities", JSON.stringify(opportunities));
}

// ===================== RENDER =====================
function render(data) {
    const container = document.getElementById("cardsContainer");
    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = "<p>No results found</p>";
        return;
    }

    data.forEach(i => {
        container.innerHTML += `
        <div class="card">

            <div style="display:flex; justify-content:space-between; align-items:center;">

                <h3 style="margin:0;">${i.title}</h3>

                <span style="
                    background:#2563eb;
                    color:white;
                    padding:4px 10px;
                    border-radius:20px;
                    font-size:12px;
                    text-transform:capitalize;
                ">
                    ${i.type}
                </span>

            </div>

            <p style="margin-top:10px; color:#555;">
                ${i.description}
            </p>

        </div>`;
    });
}

// ===================== ADD OPPORTUNITY =====================
function addOpportunity() {
    const title = document.getElementById("title").value;
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value;

    if (!title || !description) {
        alert("Please fill all fields");
        return;
    }

    opportunities.push({
        id: Date.now(),
        title,
        type,
        description
    });

    saveData();
    render(opportunities);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
}

// ===================== SEARCH =====================
document.getElementById("search").addEventListener("input", function () {
    const value = this.value.toLowerCase();

    const filtered = opportunities.filter(i =>
        i.title.toLowerCase().includes(value) ||
        i.description.toLowerCase().includes(value)
    );

    render(filtered);
});

// ===================== FILTER =====================
function filterType(type) {
    if (type === "all") {
        render(opportunities);
    } else {
        render(opportunities.filter(i => i.type === type));
    }
}

// ===================== SIGN UP =====================
function signup() {
    const name = document.getElementById("su_name").value;
    const email = document.getElementById("su_email").value;
    const phone = document.getElementById("su_phone").value;
    const password = document.getElementById("su_password").value;

    if (!name || !email || !phone || !password) {
        alert("Please fill all fields");
        return;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters");
        return;
    }

    const exists = users.find(u => u.email === email);
    if (exists) {
        alert("Email already registered");
        return;
    }

    users.push({ name, email, phone, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully");
}

// ===================== SIGN IN =====================
function signin() {
    const email = document.getElementById("si_email").value;
    const password = document.getElementById("si_password").value;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("Invalid email or password");
        return;
    }

    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));

    document.getElementById("authSidebar").style.display = "none";
    document.getElementById("mainApp").style.display = "block";

    document.getElementById("welcomeText").innerText =
        "Welcome " + user.name + " 👋";

    render(opportunities);
}

// ===================== LOGOUT =====================
function logout() {
    localStorage.removeItem("currentUser");
    location.reload();
}

// ===================== SWITCH TABS =====================
function showSignUp() {
    document.getElementById("signupBox").style.display = "block";
    document.getElementById("signinBox").style.display = "none";
}

function showSignIn() {
    document.getElementById("signupBox").style.display = "none";
    document.getElementById("signinBox").style.display = "block";
}

// ===================== INIT =====================
window.onload = function () {
    render(opportunities);

    if (currentUser) {
        document.getElementById("authSidebar").style.display = "none";
        document.getElementById("mainApp").style.display = "block";

        document.getElementById("welcomeText").innerText =
            "Welcome " + currentUser.name + " 👋";
    }
};
