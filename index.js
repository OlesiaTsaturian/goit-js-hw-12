import{S as d,a as u,i as c}from"./assets/vendor-BRoo0m6c.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const i={searchGallery:document.querySelector(".gallery"),loader:document.querySelector(".js-loader")},f=r=>`<li class="gallery-item">
             <a href ="${r.largeImageURL}">
             <img class="gallery-img" src="${r.webformatURL}" alt="${r.tags}"/> 
             </a> 

<ul class = "img-info-list">
 <li class="img-info-item"><span class="img-item-desc">Likes</span> ${r.likes}</li>
 <li class="img-info-item"><span class="img-item-desc">Vievs </span> ${r.views}</li>
 <li class="img-info-item"><span class="img-item-desc">Comments </span> ${r.comments}</li>
 <li class="img-info-item"><span class="img-item-desc">Downloads</span> ${r.downloads}</li>
</ul>

          </li>`,p=new d(".gallery a",{captionsData:"alt",captionDelay:250}),y=r=>{const s=r.map(a=>f(a)).join("");i.searchGallery.innerHTML=s,p.refresh()},n=()=>i.searchGallery.innerHTML="",g=()=>{i.loader.classList.remove("is-hidden")},h=()=>{i.loader.classList.add("is-hidden")},L="53395208-f197eaad794bdfcff5070dc5e",S="https://pixabay.com/api/",b=r=>u.get(S,{params:{key:L,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(s=>s.data),m={form:document.querySelector(".form"),searchGallery:document.querySelector(".gallery"),loader:document.querySelector(".js-loader")},q=r=>{r.preventDefault();const{target:s}=r,a=s.elements["search-text"].value.trim();if(a===""){c.error({message:"Pleace enter what are you searching for",position:"topRight"});return}g(),b(a).then(o=>{const{hits:e}=o;if(e.length===0){n(),c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}n(),y(e)}).catch(o=>{console.log(o)}).finally(h),m.form.reset()};m.form.addEventListener("submit",q);
//# sourceMappingURL=index.js.map
