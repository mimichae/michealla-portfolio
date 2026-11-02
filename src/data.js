// All portfolio content. Projects, skills, numbers and testimonials are mock data for the class project;
// the email and Facebook link are real.

export const profile = {
  first: "Michealla",
  last: "Beltran",
  initials: "MB",
  age: 21,
  location: "Guiling, Candijay, Bohol",
  course: "BSCS 3B",
  photo: "michealla.jpg",
  email: "michealla.beltran@bisu.edu.ph",
  facebook: "https://www.facebook.com/share/19rRnsNkL1/?mibextid=wwXIfr",
  headlines: ["A Web Developer.", "UI / UX Design.", "Clean Code.", "Database Systems.", "A BSCS 3B Student."],
};

export const skills = [
  { name: "Web Development", value: 92, icon: "💻" },
  { name: "UI / UX Design", value: 88, icon: "🎨" },
  { name: "Database Systems", value: 80, icon: "🗄️" },
  { name: "Mobile Apps", value: 74, icon: "📱" },
];

export const marquee = [
  ["Web Development", "bold"],
  ["HTML · CSS · JavaScript", "italic"],
  ["UI / UX Design", "bold"],
  ["Figma · Wireframes · Prototypes", "italic"],
  ["Databases", "bold"],
  ["PHP · MySQL · Firebase", "italic"],
  ["Mobile Apps", "bold"],
  ["React · Flutter", "italic"],
];

export const stats = [
  { value: 3, suffix: "+", label: "Years learning" },
  { value: 12, suffix: "+", label: "Projects shipped" },
  { value: 5, suffix: "", label: "Clients served" },
];

export const services = [
  { icon: "💻", title: "Web Development", text: "Responsive, fast websites and web apps built with HTML, CSS, JavaScript and React, from landing pages to full systems.", tags: ["React", "Responsive", "SPA", "Landing"] },
  { icon: "🎨", title: "UI / UX Design", text: "User flows, wireframes and high-fidelity mockups in Figma, tested with real users before anything gets built.", tags: ["Flows", "Wireframe", "Hi-Fi", "Prototype"] },
  { icon: "🗄️", title: "Database Systems", text: "Records, inventory and booking systems with secure logins, backed by well-designed MySQL and Firebase databases.", tags: ["PHP", "MySQL", "Firebase", "CRUD"] },
  { icon: "📱", title: "Mobile Apps", text: "Simple Android apps for schools and small businesses: ordering, reminders and attendance, ready to install.", tags: ["Flutter", "Android", "Offline", "UI"] },
];

export const projects = [
  {
    title: "Candijay Market Hub",
    tag: "Web App",
    kind: "market",
    meta: "Web Development · 2025",
    description: "An online directory and ordering page for vendors at the Candijay public market, so buyers can check prices and reserve items before going.",
    tags: ["React", "Firebase", "Responsive"],
    year: "2025",
    duration: "2 months",
    tools: "React · Firebase · Figma",
  },
  {
    title: "Guiling Barangay Portal",
    tag: "UI / UX Design",
    kind: "portal",
    meta: "UI / UX Design · Web Design · 2025",
    description: "A redesign of how residents request barangay documents: fewer steps, clearer status tracking and a mobile-first layout tested with residents.",
    tags: ["UI/UX", "Figma", "Accessibility"],
    year: "2025",
    duration: "1–2 months",
    tools: "Figma · Maze · HTML/CSS",
  },
  {
    title: "Kapehan POS System",
    tag: "Database",
    kind: "pos",
    meta: "Database Systems · 2024–2025",
    description: "A point-of-sale and inventory system for a small coffee shop: orders, daily sales reports and low-stock alerts in one dashboard.",
    tags: ["PHP", "MySQL", "Chart.js"],
    year: "2024",
    duration: "3 months",
    tools: "PHP · MySQL · Bootstrap",
  },
  {
    title: "StudyBuddy Mobile App",
    tag: "Mobile",
    kind: "mobile",
    meta: "Mobile App · UI / UX · 2026",
    description: "A study planner app for college students with subject schedules, deadline reminders and focus timers, designed and tested with classmates.",
    tags: ["Flutter", "UI/UX", "Offline"],
    year: "2026",
    duration: "2 months",
    tools: "Flutter · Figma · SQLite",
  },
];

export const testimonials = [
  { text: "Michealla is detail-oriented and reliable. She delivered our class system ahead of schedule and documented everything clearly for the rest of the team.", name: "Systems Analysis Adviser", role: "Faculty · BSCS", initials: "SA" },
  { text: "She's the one we go to when the UI looks off. Patient, creative, and always willing to explain things to groupmates who are still learning.", name: "Groupmate", role: "BSCS 3B", initials: "GM" },
  { text: "Our coffee shop runs smoother now. Michealla listened to how we actually work and built a POS that our staff learned in one afternoon.", name: "Shop Owner", role: "Kapehan · Client", initials: "KO" },
];
