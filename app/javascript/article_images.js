function hideBrokenImage(img) {
  const figure = img.closest("figure");
  if (figure?.classList.contains("article-hero-figure")) {
    figure.remove();
    return;
  }
  if (figure) {
    figure.remove();
    return;
  }
  img.remove();
}

function bindArticleImages(root = document) {
  root.querySelectorAll(".article-body img, .article-hero-figure img").forEach((img) => {
    if (img.complete && img.naturalWidth === 0) hideBrokenImage(img);
    img.addEventListener("error", () => hideBrokenImage(img), { once: true });
  });
}

document.addEventListener("turbo:load", () => bindArticleImages());
document.addEventListener("DOMContentLoaded", () => bindArticleImages());
