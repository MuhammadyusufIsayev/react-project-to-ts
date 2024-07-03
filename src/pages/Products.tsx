import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

interface Product {
  id: number;
  title: string;
  brand: string;
  article: string;
  price: number;
  disCount: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.article.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleSaveChanges = async () => {
    if (selectedProduct) {
      try {
        await axios.put(`http://localhost:3000/products/${selectedProduct.id}`, selectedProduct);
        setShowModal(false);
        setSelectedProduct(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:3000/products/${productId}`);
        setProducts(products.filter((product) => product.id !== productId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        [id]: id === 'price' || id === 'disCount' ? parseFloat(value) : value
      });
    }
  };

  return (
    <div>
      <header>
        <nav className='nav2'>
          <h3>Товары</h3>
          <p>Главная / Товары</p>
        </nav>
      </header>
      <main>
        <div className="allProducts">
          <div className="all-top">
            <h3>Все товары ({products.length})</h3>
            <input onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder='Поиск' />
          </div>
          <hr />
          <table className='table'>
            <thead>
              <tr className='text-uppercase'>
                <th>Наименование</th>
                <th>Артикул</th>
                <th>Бренд</th>
                <th>Цена</th>
                <th>Цена со скидкой</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.article}</td>
                    <td>{product.brand}</td>
                    <td>{product.price}</td>
                    <td>{product.disCount}</td>
                    <td>
                      <div className='d-flex gap-3'>
                        <img onClick={() => handleEdit(product)} src="../public/Button Edit.svg" alt="" />
                        <img onClick={() => handleDelete(product.id)} src="../public/Button Trash.svg" alt="" />
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <Link to='/products'>
          <button className='btn-tovar'>Новый товар</button>
        </Link>
      </main>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Наименование:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={selectedProduct?.title || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="article" className="form-label">Артикул:</label>
            <input
              type="text"
              className="form-control"
              id="article"
              value={selectedProduct?.article || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="brand" className="form-label">Бренд:</label>
            <input
              type="text"
              className="form-control"
              id="brand"
              value={selectedProduct?.brand || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Цена:</label>
            <input
              type="text"
              className="form-control"
              id="price"
              value={selectedProduct?.price || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="disCount" className="form-label">Цена со скидкой:</label>
            <input
              type="text"
              className="form-control"
              id="disCount"
              value={selectedProduct?.disCount || ''}
              onChange={handleInputChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
