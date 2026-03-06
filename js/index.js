renderLayout({platformMode:true});


/* SHOP DATA */

const coverImages=[
"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
"https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600",
"https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600",
"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600",
"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600"
];

const shopNames=[
"Urban Threads","Glow Beauty Store","Tech Haven","Sweet Bite Bakery",
"Modern Closet","Handmade Corner","Sports Arena","Bag Boutique",
"Fashion District","Smart Gadget Hub","Daily Essentials","Beauty Bloom",
"Electro World","Foodie Market","Vintage Style","Elegant Wardrobe",
"Creative Crafts","Healthy Kitchen","Urban Sneakers","Mobile Planet",
"Stylish Wear","Luxury Accessories","Gadget Kingdom","Trendy Closet",
"Fresh Bites","Beauty Lounge","Electro Smart","Fashion Avenue",
"Handcraft Studio","Snack Paradise","Modern Fashion","Elegant Bags",
"Gadget Store","Urban Style Shop","Daily Fashion","Smart Electronics",
"Creative Gifts","Food Lovers","Beauty Essentials","Digital World",
"Fashion Corner","Tech Universe","Home Bakery","Urban Fashion",
"Handmade Creations","Snack House"
];

const categories=["Fashion","Beauty","Electronics","Food","Accessories","Handmade"];

const shops=[];

for(let i=0;i<46;i++){

shops.push({
name:shopNames[i],
category:categories[i%categories.length],
desc:"Discover quality products from this shop.",
logo:"https://i.pravatar.cc/150?img="+(i+10),
cover:coverImages[i%coverImages.length],
url:"shop.html"
});

}


/* ADVERTISEMENTS */

const ads=shops.slice(0,6);

let currentAd=0;

const adImage=document.getElementById("adImage");
const adTitle=document.getElementById("adTitle");
const adCategory=document.getElementById("adCategory");
const adDots=document.getElementById("adDots");

ads.forEach((a,i)=>{
const dot=document.createElement("div");
dot.className="ad-dot";
if(i===0) dot.classList.add("active");
adDots.appendChild(dot);
});

function renderAd(){

const ad=ads[currentAd];

adImage.src=ad.cover;
adTitle.textContent=ad.name;
adCategory.textContent=ad.category;

document.getElementById("adSlide").onclick=function(){
window.location.href=ad.url;
};

document.querySelectorAll(".ad-dot").forEach((d,i)=>{
d.classList.toggle("active",i===currentAd);
});

}

setInterval(function(){
currentAd++;
if(currentAd>=ads.length) currentAd=0;
renderAd();
},4000);

renderAd();

/* =========================
   SWIPE SUPPORT
========================= */

let startX = 0;

const slider = document.getElementById("adSlide");

slider.addEventListener("touchstart", e=>{
startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", e=>{

let endX = e.changedTouches[0].clientX;

if(startX - endX > 50){
nextAd();
}

if(endX - startX > 50){
prevAd();
}

});

function nextAd(){
currentAd++;
if(currentAd>=ads.length) currentAd=0;
renderAd();
}

function prevAd(){
currentAd--;
if(currentAd<0) currentAd=ads.length-1;
renderAd();
}


/* PAGINATION */

let currentPage=1;
const perPage=12;
let currentCategory="All";

function getFilteredShops(){
if(currentCategory==="All") return shops;
return shops.filter(s=>s.category===currentCategory);
}

function renderShops(){

const list=document.getElementById("shopList");
list.innerHTML="";

const filtered=getFilteredShops();

const start=(currentPage-1)*perPage;
const pageItems=filtered.slice(start,start+perPage);

pageItems.forEach(function(s){

list.innerHTML+=`

<div class="col-6 col-md-3">

<div class="shop-card" onclick="window.location.href='${s.url}'">

<div class="shop-cover" style="background-image:url('${s.cover}')">

<img src="${s.logo}" class="index-shop-logo">

</div>

<div class="shop-body">

<div class="shop-name">${s.name}</div>
<div class="shop-category">${s.category}</div>
<div class="shop-desc">${s.desc}</div>

</div>

</div>

</div>

`;

});

renderPagination(filtered.length);

}

function renderPagination(total){

const pages=Math.ceil(total/perPage);
let html="";

for(let i=1;i<=pages;i++){
html+=`<button class="btn btn-sm ${i===currentPage?'btn-dark':'btn-outline-dark'} mx-1"
onclick="goPage(${i})">${i}</button>`;
}

document.getElementById("pagination").innerHTML=html;

}

function goPage(p){
currentPage=p;
renderShops();
window.scrollTo({top:0,behavior:'smooth'});
}

function toggleCategoryMenu(){

const menu=document.getElementById("categoryMenu");
menu.style.display=menu.style.display==="block"?"none":"block";

}

function selectCategory(cat){

currentCategory=cat;
currentPage=1;

document.getElementById("currentCategoryLabel").textContent=cat;

document.getElementById("categoryMenu").style.display="none";

renderShops();

}

renderShops();