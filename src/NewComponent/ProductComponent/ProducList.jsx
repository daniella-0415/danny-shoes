import React from 'react';

const ProductList = ({ products, user, handleLike, handleUnlike }) => {
  return (
    <div className="products">
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <h3>{product.name || 'Unnamed Product'}</h3>
              <img src={product.image} className="img" alt={product.name || 'Product'} />
              <p>Price: ${product.price || 'N/A'}</p>
              <p>{product.description || 'No description available'}</p>
              <p>Likes: {product.likes ? product.likes.length : 0}</p>
              {user && (
                <div>
                  <button className="button" onClick={() => handleLike(product._id)}>
                    Like
                  </button>
                  <button className="button" onClick={() => handleUnlike(product._id)}>
                    Unlike
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;