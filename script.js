// GALERIA: substitua os links por imagens suas (preferencialmente hospedadas neste repositório)
const photos = [
  {title:"Encontro automotivo",category:"encontros",event:"Eventos da Irmandade",image:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=90"},
  {title:"Máquinas & estilo",category:"carros",event:"Cultura automotiva",image:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=90"},
  {title:"Nosso rolê",category:"encontros",event:"Momentos especiais",image:"https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1600&q=90"},
  {title:"Projetos",category:"carros",event:"Projetos automotivos",image:"https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=90"},
  {title:"A irmandade",category:"equipe",event:"Amizade & união",image:"https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=90"},
  {title:"Na estrada",category:"carros",event:"Nossa paixão",image:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=90"}
];
const galleryGrid=document.getElementById("galleryGrid"),filters=document.getElementById("galleryFilters");
const lightbox=document.getElementById("lightbox"),lightboxImage=document.getElementById("lightboxImage"),lightboxTitle=document.getElementById("lightboxTitle");
const downloadButton=document.getElementById("downloadButton"),lightboxClose=document.getElementById("lightboxClose"),lightboxPrev=document.getElementById("lightboxPrev"),lightboxNext=document.getElementById("lightboxNext");
const menuToggle=document.getElementById("menuToggle"),nav=document.getElementById("nav"),header=document.getElementById("header");
let visiblePhotos=[...photos],currentIndex=0;
function renderGallery(list=photos){galleryGrid.innerHTML="";list.forEach((photo,index)=>{const card=document.createElement("article");card.className="gallery-item reveal visible";card.innerHTML=`<img src="${photo.image}" alt="${photo.title}" loading="lazy"><div class="gallery-item-info"><span>${photo.event}</span><h3>${photo.title}</h3></div>`;card.addEventListener("click",()=>openLightbox(list,index));galleryGrid.appendChild(card);});}
filters.addEventListener("click",event=>{const button=event.target.closest(".filter-btn");if(!button)return;document.querySelectorAll(".filter-btn").forEach(btn=>btn.classList.remove("active"));button.classList.add("active");const chosen=button.dataset.filter;visiblePhotos=chosen==="all"?[...photos]:photos.filter(p=>p.category===chosen);renderGallery(visiblePhotos);});
function openLightbox(list,index){visiblePhotos=[...list];currentIndex=index;showPhoto();lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false");document.body.classList.add("no-scroll");}
function showPhoto(){const photo=visiblePhotos[currentIndex];if(!photo)return;lightboxImage.src=photo.image;lightboxImage.alt=photo.title;lightboxTitle.textContent=`${photo.title} — ${photo.event}`;downloadButton.onclick=event=>{event.preventDefault();downloadPhoto(photo);};}
lightboxNext.addEventListener("click",()=>{currentIndex=(currentIndex+1)%visiblePhotos.length;showPhoto();});
lightboxPrev.addEventListener("click",()=>{currentIndex=(currentIndex-1+visiblePhotos.length)%visiblePhotos.length;showPhoto();});
function closeLightbox(){lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true");document.body.classList.remove("no-scroll");}
lightboxClose.addEventListener("click",closeLightbox);lightbox.addEventListener("click",event=>{if(event.target===lightbox)closeLightbox();});
document.addEventListener("keydown",event=>{if(!lightbox.classList.contains("open"))return;if(event.key==="Escape")closeLightbox();if(event.key==="ArrowRight")lightboxNext.click();if(event.key==="ArrowLeft")lightboxPrev.click();});
async function downloadPhoto(photo){try{const response=await fetch(photo.image);if(!response.ok)throw new Error("Falha no download");const blob=await response.blob(),url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download=`${photo.title.replace(/\s+/g,"-").toLowerCase()}.jpg`;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}catch(err){window.open(photo.image,"_blank");console.error("Download falhou; foto aberta em nova aba.",err);}}
menuToggle.addEventListener("click",()=>{const open=menuToggle.classList.toggle("active");nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));document.body.classList.toggle("no-scroll",open);});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{menuToggle.classList.remove("active");nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");document.body.classList.remove("no-scroll");}));
window.addEventListener("scroll",()=>header.classList.toggle("scrolled",window.scrollY>50));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.15});
document.querySelectorAll(".reveal").forEach(element=>observer.observe(element));
document.getElementById("year").textContent=new Date().getFullYear();
renderGallery();
