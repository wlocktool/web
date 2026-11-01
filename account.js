const user = JSON.parse(localStorage.getItem("wklock_user") || "null")
const telegramUrl = "https://t.me/wilunlockOficial"

if (!user?.email) {
  window.location.replace("index.html")
} else {
  document.getElementById("accountEmail").textContent = user.email
  document.getElementById("accountCredits").textContent = user.credits ?? 0
  document.getElementById("serverStatus").textContent = user.serverStatus || "Online"
  const history = Array.isArray(user.processes) ? user.processes : []
  if (history.length) {
    document.getElementById("workHistory").innerHTML = history.map((item) => `<div class="metric"><span>${item.name || "Proceso"}</span><small>${item.date || ""}</small></div>`).join("")
  }
}

document.getElementById("logoutButton").addEventListener("click", () => {
  localStorage.removeItem("wklock_user")
  window.location.replace("index.html")
})
document.getElementById("resellerButton").addEventListener("click", () => {
  window.open(telegramUrl, "_blank", "noopener,noreferrer")
})
