const announcements = [
{
    id: "ferias-2026",
    eyebrow: "Aviso",
    title: "Estamos de férias até 23/08",
    text: "Pode deixar-nos mensagem por email ou telefone. Responderemos assim que possível.",
    tone: "red",
    link: "#contactos",
    cta: "Contactar",
},
{
    id: "inscricoes-2026-2027",
    eyebrow: "Inscrições abertas",
    title: "Sala de Apoio ao Estudo 2026/2027",
    text: "Acompanhamento regular, métodos de estudo, TPC e preparação para avaliações.",
    tone: "navy",
    link: "#sala-estudo",
    cta: "Ver Sala de Estudo",
},
];
const announcementsSection = document.getElementById(
"announcementsSection",
);
const announcementsGrid = document.getElementById("announcementsGrid");
function escapeHtml(value) {
return String(value).replace(/[&<>'"]/g, function (char) {
    return {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
    }[char];
});
}
function renderAnnouncements() {
if (!announcements || announcements.length === 0) {
    announcementsSection.classList.add("hidden");
    return;
}
announcementsSection.classList.remove("hidden");
announcementsGrid.innerHTML = announcements
    .map(function (item) {
    return `<a class="announcement ${escapeHtml(item.tone || "navy")}" href="${escapeHtml(item.link || "#")}"><small>📣 ${escapeHtml(item.eyebrow || "Aviso")}</small><h2>${escapeHtml(item.title || "Aviso importante")}</h2><p>${escapeHtml(item.text || "")}</p><span>${escapeHtml(item.cta || "Saber mais")} →</span></a>`;
    })
    .join("");
}
renderAnnouncements();
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = mobileMenu.querySelectorAll("a");
menuToggle.addEventListener("click", function () {
const isOpen = mobileMenu.classList.toggle("open");
document.body.classList.toggle("menu-open", isOpen);
menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
menuToggle.textContent = isOpen ? "×" : "☰";
});
mobileLinks.forEach(function (link) {
link.addEventListener("click", function () {
    mobileMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
});
});
const navLinks = document.querySelectorAll(".nav a");
const sectionIds = Array.from(navLinks)
.map(function (link) {
    return link.getAttribute("href");
})
.filter(function (href) {
    return href && href.startsWith("#");
});
const sections = sectionIds
.map(function (id) {
    return document.querySelector(id);
})
.filter(Boolean);
const observer = new IntersectionObserver(
function (entries) {
    entries.forEach(function (entry) {
    if (entry.isIntersecting) {
        const id = "#" + entry.target.id;
        navLinks.forEach(function (link) {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === id,
        );
        });
    }
    });
},
{ rootMargin: "-35% 0px -55% 0px", threshold: 0.01 },
);
sections.forEach(function (section) {
observer.observe(section);
});
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function (event) {
event.preventDefault();
const data = new FormData(contactForm);
const name = data.get("name") || "";
const phone = data.get("phone") || "";
const email = data.get("email") || "";
const subject = data.get("subject") || "Pedido de informações";
const message = data.get("message") || "";
const body = [
    "Nome: " + name,
    "Telefone: " + phone,
    "Email: " + email,
    "Tipo de apoio: " + subject,
    "",
    "Mensagem:",
    message,
].join("\n");
window.location.href =
    "mailto:geral@exito-estudos.pt?subject=" +
    encodeURIComponent(subject + " - Website") +
    "&body=" +
    encodeURIComponent(body);
});
document.getElementById("year").textContent = new Date().getFullYear();
