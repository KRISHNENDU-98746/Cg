<script type="module">
  // === Import Firebase SDKs ===
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

  // === Your Firebase Config ===
  const firebaseConfig = {
    apiKey: "AIzaSyD7CGdjI-VaNl2AnB54dPAVBh9mAIF9j7o",
    authDomain: "thelong-6274a.firebaseapp.com",
    databaseURL: "https://thelong-6274a-default-rtdb.firebaseio.com",
    projectId: "thelong-6274a",
    storageBucket: "thelong-6274a.appspot.com",
    messagingSenderId: "729094241594",
    appId: "1:729094241594:web:17b32ea302bb45814fa403",
    measurementId: "G-DPSPS3MDBF"
  };

  // === Initialize Firebase ===
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // === HTML Element for Products ===
  const productGrid = document.getElementById("product-grid");

  // === Load Products from Firestore ===
  async function loadProducts() {
    productGrid.innerHTML = "<p>Loading products...</p>";

    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      productGrid.innerHTML = ""; // clear the "loading" text

      if (querySnapshot.empty) {
        productGrid.innerHTML = "<p>No products found in Firestore.</p>";
        return;
      }

      querySnapshot.forEach((doc) => {
        const product = doc.data();
        const div = document.createElement("div");
        div.classList.add("product");
        div.style.background = "#fff";
        div.style.padding = "15px";
        div.style.borderRadius = "10px";
        div.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
        div.innerHTML = `
          <img src="${product.image || 'https://via.placeholder.com/300'}" alt="${product.name}" style="width:100%;border-radius:8px;">
          <h3>${product.name}</h3>
          <p>Price: ₹${product.price}</p>
          <p>${product.description || ''}</p>
        `;
        productGrid.appendChild(div);
      });

    } catch (error) {
      console.error("❌ Error loading products:", error);
      productGrid.innerHTML = "<p style='color:red;'>Error loading products. Check console.</p>";
    }
  }

  // === Call the function ===
  loadProducts();
</script>
