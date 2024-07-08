/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "./Forms.css";
import { ProductContext } from "../../contexts/ProductContext";

function AddProductForm({ closeForm }) {
  const { addNewProduct } = useContext(ProductContext);

  const [newProduct, setNewProduct] = useState({
    category: "",
    description: "",
    image: "",
    price: "",
    title: "",
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewProduct(newProduct);

    setNewProduct({
      category: "",
      description: "",
      image: "",
      price: "",
      title: "",
    });
    closeForm();
    alert("Product added Succefully");
  };
  return (
    <form onSubmit={handleSubmit} className="add_product_form">
      <div className="cancel_btn" onClick={() => closeForm()}>
        cancel
      </div>
      <div className="new_product_form_group">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          name="title"
          value={newProduct.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="new_product_form_group">
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          name="category"
          value={newProduct.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className="new_product_form_group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="new_product_form_group">
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="new_product_form_group">
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          id="imageUrl"
          type="url"
          name="image"
          value={newProduct.image}
          onChange={handleChange}
          required
        />
      </div>

      <button className="add_product_btn" type="submit">
        Add Product
      </button>
    </form>
  );
}

export default AddProductForm;
