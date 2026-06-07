
import { useEffect, useState } from "react";

function AdminDashboard({ theme }) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const savedProducts =
      JSON.parse(
        localStorage.getItem("adminProducts")
      ) || [];

    setProducts(savedProducts);
  }, []);

  const addProduct = () => {
    if (!name || !price || !category) {
      alert("Fill All Fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price,
      category,

      offer:
        Math.floor(
          Math.random() * (70 - 10 + 1)
        ) + 10,

      rating: (
        Math.random() * (5 - 3.5) +
        3.5
      ).toFixed(1),

      status: "Available",
    };

    const updatedProducts = [
      ...products,
      newProduct,
    ];

    setProducts(updatedProducts);

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(updatedProducts)
    );

    setName("");
    setPrice("");
    setCategory("");

    alert("Product Added ✅");
  };

  const deleteProduct = (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmDelete) return;

    const updatedProducts =
      products.filter(
        (product) => product.id !== id
      );

    setProducts(updatedProducts);

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(updatedProducts)
    );
  };

  const editProduct = (id) => {
    const product = products.find(
      (item) => item.id === id
    );

    const newName = prompt(
      "Enter New Product Name",
      product.name
    );

    const newPrice = prompt(
      "Enter New Product Price",
      product.price
    );

    const newCategory = prompt(
      "Enter New Product Category",
      product.category
    );

    if (
      !newName ||
      !newPrice ||
      !newCategory
    ) {
      alert("All Fields Required");
      return;
    }

    const updatedProducts =
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              name: newName,
              price: newPrice,
              category: newCategory,
            }
          : product
      );

    setProducts(updatedProducts);

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(updatedProducts)
    );

    alert("Product Updated ✅");
  };

  const totalValue = products.reduce(
    (total, item) =>
      total + Number(item.price),
    0
  );

  const avgRating =
    products.length > 0
      ? (
          products.reduce(
            (sum, item) =>
              sum +
              Number(item.rating),
            0
          ) / products.length
        ).toFixed(1)
      : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          theme === "dark"
            ? "linear-gradient(135deg,#0f172a,#1e1b4b,#312e81)"
            : "linear-gradient(135deg,#e2e8f0,#f8fafc,#ffffff)",
        color:
          theme === "dark"
            ? "white"
            : "#0f172a",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "55px",
          color: "#38bdf8",
          marginBottom: "25px",
        }}
      >
        Admin Dashboard 👨‍💼
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background:
              theme === "dark"
                ? "#1e293b"
                : "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            width: "220px",
            boxShadow:
              "0px 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          <h3>Total Products</h3>
          <h2>{products.length}</h2>
        </div>

        <div
          style={{
            background:
              theme === "dark"
                ? "#1e293b"
                : "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            width: "220px",
            boxShadow:
              "0px 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          <h3>Total Categories</h3>
          <h2>
            {
              new Set(
                products.map(
                  (item) => item.category
                )
              ).size
            }
          </h2>
        </div>

        <div
          style={{
            background:
              theme === "dark"
                ? "#1e293b"
                : "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            width: "220px",
            boxShadow:
              "0px 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          <h3>Total Value</h3>
          <h2>₹{totalValue}</h2>
        </div>

        <div
          style={{
            background:
              theme === "dark"
                ? "#1e293b"
                : "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            width: "220px",
            boxShadow:
              "0px 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          <h3>Average Rating</h3>
          <h2>{avgRating}</h2>
        </div>
      </div>

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{
            padding: "12px",
            width: "250px",
            borderRadius: "8px",
            border: "none",
            margin: "8px",
          }}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          style={{
            padding: "12px",
            width: "250px",
            borderRadius: "8px",
            border: "none",
            margin: "8px",
          }}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          style={{
            padding: "12px",
            width: "250px",
            borderRadius: "8px",
            border: "none",
            margin: "8px",
          }}
        />

        <br />

        <button
          onClick={addProduct}
          style={{
            background: "#22c55e",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          Add Product ➕
        </button>
      </div>

      {products.length === 0 ? (
        <h2>No Products Added Yet 😔</h2>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                width: "280px",
                background:
                  theme === "dark"
                    ? "#1e293b"
                    : "#ffffff",
                color:
                  theme === "dark"
                    ? "white"
                    : "#0f172a",
                padding: "20px",
                borderRadius: "15px",
                boxShadow:
                  "0px 4px 15px rgba(0,0,0,0.2)",
              }}
            >
              <h3>{product.name}</h3>

              <p>
                ₹{product.price}
              </p>

              <p>
                📂 {product.category}
              </p>

              <p>
                ⭐ {product.rating}/5
              </p>

              <p
                style={{
                  color: "#22c55e",
                  fontWeight: "bold",
                }}
              >
                🔥 {product.offer}% OFF
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <button
                  onClick={() =>
                    editProduct(product.id)
                  }
                >
                  Edit ✏️
                </button>

                <button
                  onClick={() =>
                    deleteProduct(product.id)
                  }
                >
                  Delete 🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer
        style={{
          textAlign: "center",
          marginTop: "50px",
          padding: "20px",
        }}
      >
        © 2025 E-Commerce App |
        Built By Likitha ❤️
      </footer>
    </div>
  );
}

export default AdminDashboard;