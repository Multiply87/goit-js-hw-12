import{a as g,S as m,i as l}from"./assets/vendor-CucEYOFD.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const f="56799357-5764c9f004e69503c7bfa7d57",y="https://pixabay.com/api/";async function d(s,a=1,r=15){return await g.get(y+`?page=${a}&per_page=${r}`,{params:{key:f,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(i=>i.data)}const h=new m(".gallery a",{captionsData:"alt",captionDelay:250}),c=document.querySelector(".gallery"),n=document.querySelector(".loader");function L(s){const a=s.map(({webformatURL:r,largeImageURL:i,tags:e,likes:t,views:o,comments:p,downloads:u})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${i}">
          <img class="gallery-image" src="${r}" alt="${e}" />
        </a>
        <div class="gallery-caption">
          <ul class="gallery-caption-list">
            <li class="gallery-caption-item"><span class="caption-label">Likes</span><span>${t}</span></li>
            <li class="gallery-caption-item"><span class="caption-label">Views</span><span>${o}</span></li>
            <li class="gallery-caption-item"><span class="caption-label">Comments</span><span>${p}</span></li>
            <li class="gallery-caption-item"><span class="caption-label">Downloads</span><span>${u}</span></li>
          </ul>
        </div>
      </li>
    `).join("");c.innerHTML+=a,h.refresh()}function b(){c.innerHTML=""}function $(){n&&n.classList.add("active")}function v(){n&&n.classList.remove("active")}const w=document.querySelector(".form");w.addEventListener("submit",s=>{s.preventDefault();const a=s.target.elements["search-text"].value.trim();if(!a){l.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}b(),$(),d(a).then(r=>{if(!r.hits||r.hits.length===0){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(r.hits)}).catch(r=>{console.error(r),l.error({title:"Error",message:"An error occurred while fetching images. Please try again later.",position:"topRight"})}).finally(()=>{v(),s.target.reset()})});
//# sourceMappingURL=index.js.map
