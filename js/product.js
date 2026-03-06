renderLayout({
  shopName: "MSP Cloth",
  shopLogo: "https://i.pravatar.cc/150?img=5",
  subtitle: "Premium Online Shop Experience",
  contacts: {
    facebook: [
      { label: "MSP Fashion Page", url: "#" }
    ],
    tiktok: [
      { label: "@mspfashion", url: "#" }
    ],
    telegram: [
      { label: "MSP Official Channel", url: "#" }
    ],
    phone: [
      { label: "+959111111111", url: "tel:+959111111111" },
      { label: "+959222222222", url: "tel:+959222222222" },
      { label: "+959333333333", url: "tel:+959333333333" }
    ],
    viber: [
      { label: "+959123456789", url: "viber://chat?number=959123456789" },
      { label: "+959987654321", url: "viber://chat?number=959987654321" }
    ]
  }
});

// /js/product.js
document.addEventListener("DOMContentLoaded", function () {

  const params = new URLSearchParams(window.location.search);

  const productId = parseInt(params.get("id") || "1", 10);
  const page = parseInt(params.get("page") || "1", 10);
  const category = parseInt(params.get("category") || "1", 10);
  const sort = params.get("sort") || "newest";

  // ----------------------------------
  // Simulate seller uploaded images
  // ----------------------------------
  function generateImages(productId) {
    const imagePool = [
      "images/img-1.jpg",
      "images/img-2.jpg",
      "images/img-3.jpg",
      "images/img-4.jpg",
      "images/img-5.jpg"
    ];

    const uploadedCount = (productId % 5) + 1;
    return imagePool.slice(0, uploadedCount);
  }

  const price = 25000 + productId * 1200;
  const isOnSale = productId % 4 === 0;
  const isNew = productId > 35;
  const stock = productId % 5 === 0 ? "Out" : "In";

  const product = {
    id: productId,
    name: "Premium Item " + productId,
    price: price,
    oldPrice: isOnSale ? price + 8000 : null,
    stock: stock,
    isNew: isNew,
    isOnSale: isOnSale,
    description:
      "Premium quality product designed for modern customers. Clean, minimal, and mobile-first optimized.",
    images: generateImages(productId)
  };

  // ----------------------------------
  // Bind Product Info
  // ----------------------------------
  document.getElementById("productName").textContent = product.name;
  document.getElementById("productPrice").textContent =
    product.price.toLocaleString() + " MMK";

  const oldPriceEl = document.getElementById("productOldPrice");
  oldPriceEl.textContent =
    product.oldPrice ? product.oldPrice.toLocaleString() + " MMK" : "";

  document.getElementById("productDescription").textContent =
    product.description;

  // ----------------------------------
  // Stock Badge
  // ----------------------------------
  const badge = document.getElementById("stockBadge");
  badge.textContent = product.stock === "In" ? "In Stock" : "Out of Stock";
  badge.classList.remove("in", "out");
  badge.classList.add(product.stock === "In" ? "in" : "out");

  // ----------------------------------
  // SALE / NEW Badges
  // ----------------------------------
  const badgesEl = document.getElementById("imageBadges");
  badgesEl.innerHTML = `
    <div>
      ${product.isOnSale ? `<span class="pill-badge pill-sale">SALE</span>` : ""}
    </div>
    <div>
      ${product.isNew ? `<span class="pill-badge pill-new">NEW</span>` : ""}
    </div>
  `;

  // ----------------------------------
  // Dynamic Gallery
  // ----------------------------------
  const mainImage = document.getElementById("mainImage");
  const thumbContainer = document.getElementById("thumbnailContainer");

  thumbContainer.innerHTML = "";

  if (!product.images || product.images.length === 0) {
    mainImage.src = "";
  } else {

    mainImage.src = product.images[0];

    product.images.forEach((imgUrl, index) => {
      const thumb = document.createElement("img");

      thumb.src = imgUrl;
      thumb.className = "thumb" + (index === 0 ? " active" : "");
      thumb.alt = "Thumbnail " + (index + 1);

      thumb.onclick = function () {
        mainImage.src = imgUrl;

        thumbContainer
          .querySelectorAll(".thumb")
          .forEach((t) => t.classList.remove("active"));

        thumb.classList.add("active");
      };

      thumbContainer.appendChild(thumb);
    });

    if (product.images.length <= 1) {
      thumbContainer.style.display = "none";
    }
  }

  // ----------------------------------
  // Back Button
  // ----------------------------------
  document.getElementById("backBtn").onclick = function () {
    window.location.href =
      "shop.html?page=" +
      page +
      "&category=" +
      category +
      "&sort=" +
      encodeURIComponent(sort);
  };

  // ----------------------------------
  // Related Products
  // ----------------------------------
  const relatedContainer = document.getElementById("relatedContainer");
  const related = [];

  for (let i = 1; i <= 40; i++) {
    if (i === productId) continue;

    if ((i % 3) === (productId % 3)) {
      related.push({
        id: i,
        name: "Premium Item " + i,
        price: 30000 + i * 1000,
        image: generateImages(i)[0]
      });
    }

    if (related.length >= 4) break;
  }

  relatedContainer.innerHTML = related
    .map(
      (p) => `
      <div class="related-card"
        onclick="window.location.href='product.html?id=${p.id}&page=${page}&category=${category}&sort=${encodeURIComponent(sort)}'">
        <img class="related-img" src="${p.image}" alt="${p.name}">
        <div class="related-body">
          <div class="related-name">${p.name}</div>
          <div class="related-price">${p.price.toLocaleString()} MMK</div>
        </div>
      </div>
    `
    )
    .join("");

});