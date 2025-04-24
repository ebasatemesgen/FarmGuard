// assets/js/gallery.js
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('galleryGrid');
    const imgs = Array.from(grid.querySelectorAll('img'));
  
    // wrap each <img> in a .gallery-item + add overlay & random spans
    imgs.forEach((img, idx) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'gallery-item';
      grid.replaceChild(wrapper, img);
      wrapper.appendChild(img);
  
      // overlay
      const ov = document.createElement('div');
      ov.className = 'overlay';
      ov.textContent = 'View';
      wrapper.appendChild(ov);
  
      // orientation & random sizing
      const applySizing = () => {
        const w = img.naturalWidth, h = img.naturalHeight;
        if (w > h * 1.2) wrapper.classList.add('landscape');
        else if (h > w * 1.2) wrapper.classList.add('portrait');
        if (Math.random() < 0.15) wrapper.classList.add('span2');
      };
      if (img.complete) applySizing();
      else img.onload = applySizing;
  
      // lightbox hookup
      wrapper.addEventListener('click', () => showLightbox(idx));
    });
  
    // lightbox logic (unchanged)
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    let current = 0;
  
    function showLightbox(i) {
      current = i;
      lbImg.src = imgs[i].src;
      lightbox.style.display = 'flex';
    }
    function hideLightbox() { lightbox.style.display = 'none'; }
    function next() { showLightbox((current+1)%imgs.length); }
    function prev() { showLightbox((current-1+imgs.length)%imgs.length); }
  
    document.getElementById('lightboxClose').onclick = hideLightbox;
    document.getElementById('lightboxNext').onclick  = next;
    document.getElementById('lightboxPrev').onclick  = prev;
    lightbox.addEventListener('click', e => { if (e.target===lightbox) hideLightbox(); });
    document.addEventListener('keydown', e => {
      if (lightbox.style.display==='flex') {
        if (e.key==='ArrowRight') next();
        if (e.key==='ArrowLeft')  prev();
        if (e.key==='Escape')     hideLightbox();
      }
    });
  });
  