/* script.js */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});

const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", e => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
});

Chart.defaults.color = "#f8fafc";
Chart.defaults.font.family = "Inter";

const gridColor = "rgba(255,255,255,0.14)";

new Chart(document.getElementById("sleepHoursChart"), {
  type: "bar",
  data: {
    labels: ["5 Hours or Less", "6 Hours", "7 Hours", "8+ Hours"],
    datasets: [{
      data: [42.6, 24.6, 18.9, 13.9],
      backgroundColor: [
        "#ff4f75",
        "#ffd166",
        "#4da3ff",
        "#58e6a8"
      ],
      borderRadius: 14
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: gridColor },
        ticks: {
          callback: value => value + "%"
        }
      },
      x: {
        grid: { display: false }
      }
    }
  }
});

new Chart(document.getElementById("healthImpactChart"), {
  type: "doughnut",
  data: {
    labels: [
      "Not at all",
      "Slightly",
      "Moderately",
      "A lot"
    ],
    datasets: [{
      data: [15.6, 32, 13.1, 39.3],
      backgroundColor: [
        "#58e6a8",
        "#4da3ff",
        "#ffd166",
        "#ff4f75"
      ],
      borderColor: "#030712",
      borderWidth: 4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  }
});

new Chart(document.getElementById("illnessChart"), {
  type: "bar",
  data: {
    labels: [
      "Rarely",
      "1–2 Times",
      "3–4 Times",
      "Frequently"
    ],
    datasets: [{
      data: [22.1, 43, 27, 7.4],
      backgroundColor: [
        "#58e6a8",
        "#4da3ff",
        "#b36bff",
        "#ff4f75"
      ],
      borderRadius: 14
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: gridColor },
        ticks: {
          callback: value => value + "%"
        }
      },
      x: {
        grid: { display: false }
      }
    }
  }
});

new Chart(document.getElementById("impactRadar"), {
  type: "radar",
  data: {
    labels: [
      "Memory",
      "Mood",
      "Immune Health",
      "Hormones",
      "Metabolism",
      "Academic Focus"
    ],
    datasets: [{
      label: "Impact Severity",
      data: [92, 88, 76, 82, 78, 90],
      backgroundColor: "rgba(94,230,255,0.20)",
      borderColor: "#5ee6ff",
      pointBackgroundColor: "#ffffff"
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        grid: { color: gridColor },
        angleLines: { color: gridColor },
        pointLabels: {
          color: "#ffffff"
        }
      }
    }
  }
});

function calculateDebt() {
  const hours = parseFloat(
    document.getElementById("sleepInput").value
  );

  const recommended = 8;
  const nightlyDebt = recommended - hours;
  const weeklyDebt = nightlyDebt * 5;

  let message = "";

  if (weeklyDebt <= 0) {
    message =
      "You are meeting the recommended sleep range for adolescents.";
  } else if (weeklyDebt <= 5) {
    message =
      "Your sleep debt is building slowly, but it can still affect focus and recovery.";
  } else if (weeklyDebt <= 10) {
    message =
      "Your sleep debt may significantly affect concentration, mood, and energy levels.";
  } else {
    message =
      "This level of sleep debt may severely impact cognition, emotional regulation, and physical recovery.";
  }

  document.getElementById("debtResult").innerHTML =
    `<b>Estimated Weekly Sleep Debt:</b> ${weeklyDebt.toFixed(
      1
    )} hours.<br><br>${message}`;
}

function showSurveyResult() {
  const sleep =
    document.getElementById("q1").value;

  const health =
    document.getElementById("q2").value;

  const cause =
    document.getElementById("q3").value ||
    "daily pressure";

  document.getElementById("surveyResult").innerHTML =
    `<b>Your Reflection:</b> You selected <b>${sleep}</b> and said sleep affects your health <b>${health}</b>. If <b>${cause}</b> keeps you up, try changing one small habit tonight instead of trying to solve everything at once.`;
}

const motivationMessages = [
  "You are not lazy. You might just be exhausted.",
  "Rest is not weakness. Rest is recovery.",
  "Your worth is not measured by how late you stay awake.",
  "Better sleep can make tomorrow feel less impossible.",
  "Productivity without recovery is burnout in disguise.",
  "A rested brain learns better than an exhausted one.",
  "You do not need to destroy your health to prove you care."
];

function newMotivation() {
  const random =
    motivationMessages[
      Math.floor(Math.random() * motivationMessages.length)
    ];

  document.getElementById("motivationText").textContent =
    random;
}
