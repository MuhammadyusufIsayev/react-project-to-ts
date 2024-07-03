import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AddProducts: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [article, setArticle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [disCount, setDisCount] = useState<number>(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (!title || !brand || !article || !price) {
      alert('All fields are required');
      return;
    }

    const discountValue = disCount === 0 ? 0 : disCount;
  
    const data = {
      title,
      brand,
      article,
      price,
      disCount: discountValue 
    };
  
    try {
      await axios.post('http://localhost:3000/products', data);
      console.log('Product added successfully');
      setTitle('');
      setBrand('');
      setArticle('');
      setPrice(0);
      setDisCount(0);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleBrandChange = (e: ChangeEvent<HTMLInputElement>) => setBrand(e.target.value);
  const handleArticleChange = (e: ChangeEvent<HTMLInputElement>) => setArticle(e.target.value);
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => setPrice(parseFloat(e.target.value));
  const handleDisCountChange = (e: ChangeEvent<HTMLInputElement>) => setDisCount(parseFloat(e.target.value));
  
  return (
    <div>
      <header>
        <nav className='nav2'>
          <h3>Новый товар</h3>
          <p>Главная / Товары / Новый товар</p>
        </nav>
      </header>
      <main>
        <div className='allProducts'>
          <form onSubmit={handleSubmit}>
            <div className='top'>
              <div>
                <label>Название</label>
                <input type="text" value={title} onChange={handleTitleChange} />
              </div>
            </div>
            <div className='center'>
              <div>
                <label>
                  Бренд
                </label>
                <input type="text" value={brand} onChange={handleBrandChange} />
              </div>
              <div>
                <label>
                  Артикул производителя *
                </label>
                <input type="text" value={article} onChange={handleArticleChange} />
              </div>
            </div>
            <div className='bottom'>
              <div>
                <label>
                  Цена
                </label>
                <input type="number" value={price} onChange={handlePriceChange} />
              </div>
              <div>
                <label>
                  Цена со скидкой
                </label>
                <input type="number" value={disCount} onChange={handleDisCountChange} />
              </div>
            </div>
              <button type="submit" className='btn-tovar'>Сохранить</button>
          </form>
        </div>
        <Link to='/'>
          <button className='btn-tovar'>Отмена</button>
        </Link>
      </main>
    </div>
  );
};

export default AddProducts;
