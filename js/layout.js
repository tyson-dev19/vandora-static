// js/layout.js

(function(){

function esc(s){
return String(s ?? "").replace(/[&<>"']/g,(m)=>({
"&":"&amp;",
"<":"&lt;",
">":"&gt;",
'"':"&quot;",
"'":"&#39;"
}[m]));
}

/* =========================
   SIDEBAR MENU
========================= */

function createMenuIfNeeded(){

if(document.getElementById("sideMenu")) return;

const menu=document.createElement("div");

menu.id="sideMenu";
menu.className="side-menu";

menu.innerHTML=`

<div class="side-menu__backdrop" onclick="toggleMenu()"></div>

<div class="side-menu__panel">

<div class="menu-account">

<img class="menu-avatar"
src="https://i.pravatar.cc/150?img=12">

<div class="menu-account-name">
John Doe
</div>

</div>

<div class="side-menu__nav">

<div class="side-menu__link"><i class="fa-solid fa-house"></i> Home</div>
<div class="side-menu__link"><i class="fa-solid fa-box"></i> My Orders</div>
<div class="side-menu__link"><i class="fa-solid fa-heart"></i> Wishlist</div>
<div class="side-menu__link"><i class="fa-solid fa-bell"></i> Notifications</div>

<div class="menu-divider"></div>

<div class="side-menu__link"><i class="fa-solid fa-gear"></i> Settings</div>
<div class="side-menu__link"><i class="fa-solid fa-headset"></i> Support</div>
<div class="side-menu__link"><i class="fa-solid fa-circle-info"></i> About Vandora</div>
<div class="side-menu__link"><i class="fa-solid fa-right-from-bracket"></i> Logout</div>

</div>

</div>
`;

document.body.appendChild(menu);

}

window.toggleMenu=function(){

const menu=document.getElementById("sideMenu");

if(!menu) return;

menu.classList.toggle("is-open");

};


/* =========================
   MAIN LAYOUT
========================= */

window.renderLayout=function(cfg){

const config=cfg||{};

const shopName=esc(config.shopName||"Catalog Shop");
const shopLogo=esc(config.shopLogo||"");
const subtitle=esc(config.subtitle||"");

const heroImage=esc(
config.heroImage ||
"https://images.unsplash.com/photo-1521334884684-d80222895322?w=1200"
);

const platformMode=config.platformMode||false;

createMenuIfNeeded();

/* =========================
   HEADER
========================= */

const headerEl=document.getElementById("appHeader");

if(headerEl){

headerEl.innerHTML=`

<header class="app-header">

<div class="header-left">

<button class="icon-btn" onclick="toggleMenu()" type="button">
<i class="fa-solid fa-bars"></i>
</button>

<a href="index.html" class="icon-btn">
<i class="fa-solid fa-house"></i>
</a>

</div>

<div class="header-title">
Vandora
</div>

<div class="header-actions">

<button class="icon-btn" type="button">
<i class="fa-solid fa-magnifying-glass"></i>
</button>

<button class="icon-btn" type="button">
<i class="fa-solid fa-cart-shopping"></i>
</button>

</div>

</header>

`;

}

/* =========================
   SHOP HERO
========================= */

const bannerEl=document.getElementById("shopBanner");

if(!platformMode && bannerEl){

bannerEl.innerHTML=`

<div class="shop-hero"
style="background-image:url('${heroImage}')">

<div class="shop-hero-overlay">

<img src="${shopLogo}" class="shop-logo">

<div class="shop-title">${shopName}</div>

<div class="shop-subtitle">${subtitle}</div>

</div>

</div>

`;

}


/* =========================
   FOOTER
========================= */

const footerEl=document.getElementById("appFooter");

if(footerEl){

footerEl.innerHTML=`

<footer class="footer">

<div class="footer-grid">

<div class="footer-col">
<h4>Company</h4>
<a href="#">About Us</a>
<a href="#">Careers</a>
<a href="#">Press</a>
<a href="#">Blog</a>
</div>

<div class="footer-col">
<h4>Support</h4>
<a href="#">Help Center</a>
<a href="#">Contact Support</a>
<a href="#">Report Issue</a>
<a href="#">FAQs</a>
</div>

<div class="footer-col">
<h4>For Sellers</h4>
<a href="#">Start Selling</a>
<a href="#">Seller Guide</a>
<a href="#">Seller Policies</a>
</div>

<div class="footer-col">
<h4>Legal</h4>
<a href="#">Terms of Service</a>
<a href="#">Privacy Policy</a>
<a href="#">Cookies Policy</a>
</div>

</div>

<div class="footer-bottom">
© 2026 Vandora. All rights reserved.
</div>

</footer>

`;

}

};

})();