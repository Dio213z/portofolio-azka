"use strict";
document.documentElement.classList.add("js");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigasi");
const themeButton = document.querySelector(".theme-toggle");
menuButton.hidden = false;
themeButton.hidden = false;
function closeMenu(){ navigation.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false"); }
menuButton.addEventListener("click", () => {
  const opened = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(opened));
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => { if(event.key === "Escape" && navigation.classList.contains("open")){ closeMenu(); menuButton.focus(); } });
function applyTheme(theme){
  const light = theme !== "dark";
  document.body.dataset.theme = light ? "light" : "dark";
  themeButton.setAttribute("aria-pressed", String(!light));
  themeButton.textContent = light ? "☾ Malam" : "☀ Pagi";
  themeButton.setAttribute("aria-label", "Pilih tampilan " + (light ? "gelap" : "terang"));
  document.querySelector('meta[name="theme-color"]').content = light ? "#f4fcff" : "#0c2940";
}
try { applyTheme(localStorage.getItem("fazza-theme")); } catch { applyTheme("light"); }
themeButton.addEventListener("click", () => {
  const theme = document.body.dataset.theme !== "dark" ? "dark" : "light";
  applyTheme(theme);
  try { localStorage.setItem("fazza-theme", theme); } catch {}
});
document.querySelector("#year").textContent = new Date().getFullYear();
const contact = window.PORTFOLIO_CONTACT || {};
function contactLink(target, label, href){ const a=document.createElement("a"); a.textContent=label; a.href=href; document.querySelector(target).replaceChildren(a); }
if(typeof contact.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) contactLink("#email-contact",contact.email,"mailto:"+encodeURIComponent(contact.email));
if(typeof contact.instagram === "string" && /^[a-zA-Z0-9._]{1,30}$/.test(contact.instagram)) contactLink("#social-contact","@"+contact.instagram,"https://www.instagram.com/"+contact.instagram+"/");

if(typeof contact.whatsapp === 'string' && /^[1-9][0-9]{7,14}$/.test(contact.whatsapp)){ const target=document.querySelector('#whatsapp-contact');const a=document.createElement('a');a.href='https://wa.me/'+contact.whatsapp;a.textContent='+'+contact.whatsapp+' ↗';a.target='_blank';a.rel='noopener';target.replaceChildren(a);}
