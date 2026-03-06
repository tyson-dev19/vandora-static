// js/contactseller.js

(function(){

function createContactModal(){

if(document.getElementById("contactModal")) return;

const modal=document.createElement("div");

modal.id="contactModal";
modal.className="contact-modal";

modal.innerHTML=`

<div class="contact-backdrop"></div>

<div class="contact-panel">

<div class="contact-header">

<div class="contact-title">Contact Seller</div>

<button class="contact-close">✕</button>

</div>

<div class="contact-body" id="contactBody"></div>

</div>
`;

document.body.appendChild(modal);

modal.querySelector(".contact-backdrop").onclick=closeModal;
modal.querySelector(".contact-close").onclick=closeModal;

}

function closeModal(){

const modal=document.getElementById("contactModal");
if(modal) modal.classList.remove("open");

}

function openModal(html){

const modal=document.getElementById("contactModal");
const body=document.getElementById("contactBody");

body.innerHTML=html;

modal.classList.add("open");

}


window.initContactSeller=function(contacts){

createContactModal();

const btn=document.getElementById("contactSellerBtn");

if(!btn) return;

btn.onclick=function(){

let html="";

Object.keys(contacts).forEach(type=>{

if(!contacts[type]||contacts[type].length===0) return;

html+=`<div class="contact-group">

<div class="contact-group-title">
${type.charAt(0).toUpperCase()+type.slice(1)}
</div>`;

contacts[type].forEach(item=>{

html+=`
<a href="${item.url}" class="contact-item">
${item.label}
</a>
`;

});

html+=`</div>`;

});

openModal(html);

};

};

})();