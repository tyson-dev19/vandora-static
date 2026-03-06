renderLayout({

shopName:"MSP Cloth",

shopLogo:"https://i.pravatar.cc/150?img=5",

subtitle:"Premium Online Shop Experience",

contacts:{

facebook:[
{label:"MSP Fashion Page",url:"#"}
],

tiktok:[
{label:"@mspfashion",url:"#"}
],

telegram:[
{label:"MSP Official Channel",url:"#"}
],

phone:[
{label:"+959111111111",url:"tel:+959111111111"},
{label:"+959222222222",url:"tel:+959222222222"},
{label:"+959333333333",url:"tel:+959333333333"}
],

viber:[
{label:"+959123456789",url:"viber://chat?number=959123456789"},
{label:"+959987654321",url:"viber://chat?number=959987654321"}
]

}

});

const categories = [
  {id:1, name:"All"},
  {id:2, name:"Dress"},
  {id:3, name:"Shirt"},
  {id:4, name:"Sale"}
];

const imageList = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600"
];

const products = [];
for(let i=1;i<=40;i++){
  products.push({
    id:i,
    name:"Premium Item "+i,
    price:30000 + i*1000,
    oldPrice:i%4===0 ? 35000 + i*1000 : null,
    categoryId:(i%3===0?4:(i%2===0?3:2)),
    stock:i%5===0?"Out":"In",
    isNew:i>35,
    image:imageList[i%imageList.length]
  });
}

let selectedCategory = 1;
let currentPage = 1;
let sortMode = "newest";
const perPage = 10;

document.addEventListener("DOMContentLoaded", ()=>{
  const params = new URLSearchParams(window.location.search);
  currentPage = parseInt(params.get("page")) || 1;
  selectedCategory = parseInt(params.get("category")) || 1;
  sortMode = params.get("sort") || "newest";

  renderCategories();
  buildCategoryDropdown();
  updateCurrentLabels();
  renderProducts();
});

function renderCategories(){
  const bar=document.getElementById("categoryBar");
  bar.innerHTML="";
  categories.forEach(c=>{
    const count = c.id===1 ? products.length :
      products.filter(p=>p.categoryId===c.id).length;

    bar.innerHTML+=`
      <button class="btn ${selectedCategory===c.id?'btn-dark':'btn-outline-dark'} btn-sm"
        onclick="selectCategory(${c.id})">
        ${c.name} (${count})
      </button>
    `;
  });
}

function buildCategoryDropdown(){

  const bar=document.getElementById("categoryBar");
  const menu=document.getElementById("categoryMenu");

  menu.innerHTML="";

  bar.querySelectorAll("button").forEach(btn=>{

    const label=btn.textContent;

    const div=document.createElement("div");

    div.textContent=label;

    div.onclick=function(){

      btn.click();

      document.getElementById("currentCategoryLabel").textContent=
      label.split(" (")[0];

      menu.style.display="none";

    };

    menu.appendChild(div);

  });

}

function updateCurrentLabels(){
  const currentCategory = categories.find(c=>c.id===selectedCategory);
  document.getElementById("currentCategoryLabel").textContent =
    currentCategory ? currentCategory.name : "All";

  document.getElementById("currentSortLabel").textContent =
    sortMode==="newest" ? "Newest" :
    sortMode==="priceLow" ? "Price: Low to High" :
    "Price: High to Low";
}

function getFiltered(){
  let list = selectedCategory===1
      ? [...products]
      : products.filter(p=>p.categoryId===selectedCategory);

  if(sortMode==="priceLow") list.sort((a,b)=>a.price-b.price);
  if(sortMode==="priceHigh") list.sort((a,b)=>b.price-a.price);
  if(sortMode==="newest") list.sort((a,b)=>b.id-a.id);

  return list;
}

function renderProducts(){
  const list=document.getElementById("productList");
  list.innerHTML="";

  const filtered=getFiltered();
  const start=(currentPage-1)*perPage;
  const pageItems=filtered.slice(start,start+perPage);

  pageItems.forEach(p=>{
    list.innerHTML+=`
      <div class="col-6 col-md-3">
        <div class="product-card" onclick="goDetail(${p.id})">

          ${p.oldPrice ? `<div class="sale-ribbon">SALE</div>` : ""}
          ${p.isNew ? `<div class="new-badge">NEW</div>` : ""}

          <div class="image-container">
            <img src="${p.image}">
          </div>

          <div class="product-body">
            <div>
              <div class="product-name">${p.name}</div>
              <div class="price-block">
                <div class="old-price">${p.oldPrice ? p.oldPrice + " MMK" : ""}</div>
                <div class="price">${p.price} MMK</div>
              </div>
            </div>

            <div>
              <span class="badge-stock ${p.stock==='In'?'in':'out'}">
                ${p.stock==='In'?'In Stock':'Out of Stock'}
              </span>
            </div>

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
    html+=`
      <button class="btn btn-sm ${i===currentPage?'btn-dark':'btn-outline-dark'} mx-1"
        onclick="goPage(${i})">${i}</button>
    `;
  }
  document.getElementById("pagination").innerHTML=html;
}

function selectCategory(id){
  selectedCategory=id;
  currentPage=1;
  updateUrl();
  renderCategories();
  buildCategoryDropdown();
  updateCurrentLabels();
  renderProducts();
}

function goPage(p){
  currentPage=p;
  updateUrl();
  renderProducts();
  window.scrollTo({top:0,behavior:'smooth'});
}

function toggleSortMenu(){
  const menu = document.getElementById("sortMenu");
  menu.style.display = menu.style.display==="block"?"none":"block";
}

function toggleCategoryMenu(){
  const menu=document.getElementById("categoryMenu");
  menu.style.display=menu.style.display==="block"?"none":"block";
}

function selectSort(mode){
  sortMode=mode;
  currentPage=1;
  updateCurrentLabels();
  document.getElementById("sortMenu").style.display="none";
  updateUrl();
  renderProducts();
}

function updateUrl(){
  history.replaceState(null,"",
    `?page=${currentPage}&category=${selectedCategory}&sort=${sortMode}`);
}

function goDetail(id){
  window.location.href =
    `product.html?id=${id}&page=${currentPage}&category=${selectedCategory}&sort=${sortMode}`;
}