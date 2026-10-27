// ---- 1. PASTE YOUR ANON PUBLIC KEY (the URL is already filled in) ----
const SUPABASE_URL = "https://iovpgvumdsxpnrtpvqou.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvdnBndnVtZHN4cG5ydHB2cW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwMjQ4NjcsImV4cCI6MjEwODYwMDg2N30.zh6-k_yJQ_jJq0OplC_s6a60FHpo_eGgn1nKZ1-2CgA";
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const $ = id => document.getElementById(id);
// h("p", {textContent:"hi"}, child1, child2) builds an element safely
const h = (tag, props = {}, ...kids) => { const e = document.createElement(tag); Object.assign(e, props); e.append(...kids); return e; };
const pub = p => sb.storage.from("media").getPublicUrl(p).data.publicUrl;
async function upload(file, folder) {
  const path = folder + "/" + Date.now() + "-" + file.name.replace(/[^\w.-]/g, "_");
  const { error } = await sb.storage.from("media").upload(path, file);
  if (error) throw error;
  return { path, url: pub(path) };
}
// dark / light toggle (remembered on the device)
document.querySelectorAll(".theme").forEach(b => b.onclick = () => {
  const t = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = t;
  try { localStorage.theme = t; } catch (e) {}
});
