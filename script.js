const body = document.body;
const intro = document.getElementById("intro");
const enterButton = document.getElementById("enterWonderland");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".site-nav");

body.classList.add("locked");

enterButton.addEventListener("click", () => {
  intro.classList.add("opened");
  body.classList.remove("locked");
  setTimeout(() => {
    document.getElementById("home").scrollIntoView({ behavior: "smooth" });
  }, 400);
});

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navigation.classList.remove("open"));
});

const eventDate = new Date("2026-09-11T19:30:00-04:00");

function updateCountdown() {
  const difference = Math.max(0, eventDate - new Date());

  document.getElementById("days").textContent =
    Math.floor(difference / 86400000);

  document.getElementById("hours").textContent =
    Math.floor((difference % 86400000) / 3600000);

  document.getElementById("minutes").textContent =
    Math.floor((difference % 3600000) / 60000);
}

updateCountdown();
setInterval(updateCountdown, 60000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

document.getElementById("calendarButton").addEventListener("click", () => {
  const calendarFile = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Camila in Wonderland//EN
BEGIN:VEVENT
UID:camila15@camilainwonderland.com
DTSTAMP:20260719T000000Z
DTSTART:20260911T233000Z
DTEND:20260912T033000Z
SUMMARY:Camila's 15th Birthday Tea Party
LOCATION:Club of Knights, Coral Gables, Florida
DESCRIPTION:Join us for Camila's Wonderland Tea Party. RSVP: 786-506-3292
END:VEVENT
END:VCALENDAR`;

  const file = new Blob([calendarFile], { type: "text/calendar" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(file);
  link.download = "Camila-15th-Birthday.ics";
  link.click();

  URL.revokeObjectURL(link.href);
});
