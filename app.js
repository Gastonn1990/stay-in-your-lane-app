// Replace this placeholder with your public HTTPS Icecast stream URL.
// Example format: https://radio.example.com/radio.mp3
const RADIO_STREAM_URL = "PASTE_YOUR_PUBLIC_STREAM_URL_HERE";

const radio = document.getElementById("radioPlayer");
const radioStatus = document.getElementById("radioStatus");
if (RADIO_STREAM_URL.startsWith("https://") || RADIO_STREAM_URL.startsWith("http://")) {
  radio.src = RADIO_STREAM_URL;
  radioStatus.textContent = "Your radio stream is connected. Press play to listen.";
} else {
  radioStatus.textContent = "Stream not connected yet — add your public stream URL in app.js.";
}

const tabs = [...document.querySelectorAll("[data-tab]")];
function showTab(name) {
  tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === name));
  document.querySelectorAll(".panel").forEach(p => p.classList.toggle("active", p.id === `panel-${name}`));
  document.getElementById("panel-" + name)?.scrollIntoView({behavior:"smooth", block:"start"});
}
tabs.forEach(t => t.addEventListener("click", () => showTab(t.dataset.tab)));
document.querySelectorAll("[data-tab-target]").forEach(b => b.addEventListener("click", () => showTab(b.dataset.tabTarget)));

function emptyMarkup(icon, title, detail) {
  return `<div class="empty-state">${icon}<h3>${title}</h3><p>${detail}</p></div>`;
}
function safeName(file) { return file.name.replace(/[<>]/g, ""); }

function addAudioFiles(inputId, listId, playerId, trackNameId = null) {
  const input = document.getElementById(inputId);
  const list = document.getElementById(listId);
  const player = document.getElementById(playerId);
  const items = [];
  input.addEventListener("change", () => {
    [...input.files].forEach(file => {
      const url = URL.createObjectURL(file);
      items.push({file, url});
    });
    list.innerHTML = "";
    items.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "track-row";
      const num = document.createElement("span"); num.className = "track-number"; num.textContent = String(index + 1).padStart(2, "0");
      const title = document.createElement("span"); title.className = "track-title"; title.textContent = safeName(item.file);
      const play = document.createElement("button"); play.textContent = "▶ Play";
      play.addEventListener("click", () => {
        player.src = item.url;
        if (trackNameId) document.getElementById(trackNameId).textContent = safeName(item.file);
        player.play().catch(() => {});
      });
      row.append(num, title, play); list.append(row);
    });
    if (items.length === 0) list.innerHTML = emptyMarkup("♫", "No audio files", "Choose audio files from your device.");
  });
}
addAudioFiles("musicFiles", "trackList", "localPlayer", "localTrackName");
addAudioFiles("podcastFiles", "podcastList", "localPlayer", "localTrackName");

const videoForm = document.getElementById("videoForm");
const videoUrl = document.getElementById("videoUrl");
const videoList = document.getElementById("videoList");
function youtubeId(raw) {
  try {
    const u = new URL(raw);
    if (u.hostname === "youtu.be") return u.pathname.slice(1).split("/")[0];
    if (u.hostname.endsWith("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const m = u.pathname.match(/^\/(embed|shorts)\/([^/?]+)/);
      return m ? m[2] : null;
    }
  } catch {}
  return null;
}
videoForm.addEventListener("submit", e => {
  e.preventDefault();
  const id = youtubeId(videoUrl.value.trim());
  if (!id) { alert("Please paste a valid YouTube video link."); return; }
  if (videoList.querySelector(".empty-state")) videoList.innerHTML = "";
  const card = document.createElement("article"); card.className = "video-card";
  const frame = document.createElement("iframe");
  frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;
  frame.title = "YouTube music video"; frame.loading = "lazy";
  frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  frame.allowFullscreen = true;
  const caption = document.createElement("p"); caption.textContent = "Music video";
  const remove = document.createElement("button"); remove.textContent = "Remove video";
  remove.addEventListener("click", () => { card.remove(); if (!videoList.children.length) videoList.innerHTML = emptyMarkup("▣", "Make it visual", "Add a YouTube link to start your video lineup."); });
  card.append(frame, caption, remove); videoList.prepend(card); videoUrl.value = "";
});

let installPrompt;
const installBtn = document.getElementById("installBtn");
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); installPrompt = e; installBtn.hidden = false; });
installBtn.addEventListener("click", async () => {
  if (!installPrompt) return;
  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null; installBtn.hidden = true;
});
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
