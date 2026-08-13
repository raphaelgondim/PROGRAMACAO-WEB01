// ============================================================
// pudim.com.br — interações
// ============================================================

document.getElementById("ano").textContent = new Date().getFullYear();

/* ---------- 1. O pudim treme quando clicado ---------- */
const stage = document.getElementById("pudimStage");
const wobbleTarget = document.getElementById("pudimWobble");

function tremerPudim(){
  wobbleTarget.classList.remove("tremer");
  // força reflow para permitir re-disparar a animação em cliques seguidos
  void wobbleTarget.offsetWidth;
  wobbleTarget.classList.add("tremer");
}

stage.addEventListener("click", tremerPudim);

// treme sozinho uma vez ao carregar, pra dar a dica de que é interativo
window.addEventListener("load", () => setTimeout(tremerPudim, 700));

/* ---------- 2. Botões de compartilhamento ---------- */
const shareData = {
  url: () => window.location.href,
  text: "Isso é um pudim. (sério.) 🍮",
};

const shareLinks = {
  whatsapp: () => `https://wa.me/?text=${encodeURIComponent(shareData.text + " " + shareData.url())}`,
  x: () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url())}`,
  facebook: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url())}`,
  linkedin: () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url())}`,
};

document.querySelectorAll("[data-share]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const kind = btn.getAttribute("data-share");
    const link = shareLinks[kind]?.();
    if (link) window.open(link, "_blank", "noopener,width=600,height=520");
  });
});

/* ---------- 3. Copiar link ---------- */
const copyBtn = document.getElementById("copyLinkBtn");
const copyLabel = document.getElementById("copyLabel");

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(shareData.url());
    copyLabel.textContent = "Link copiado!";
  } catch {
    copyLabel.textContent = "Copie na barra do navegador";
  }
  setTimeout(() => (copyLabel.textContent = "Copiar link"), 2200);
});

/* ---------- 4. Revelar seções ao rolar ---------- */
document.querySelectorAll(".sobre-inner, .cards, .compartilhe").forEach((el) => {
  el.classList.add("reveal");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));