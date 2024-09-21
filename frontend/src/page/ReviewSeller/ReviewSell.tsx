import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spin, Alert, Button, Modal } from 'antd';
import { Product } from '../interface/product';
import { Review } from '../interface/review';
import Navbarproducts from '../Component/navbarproducts';
import './ReviewSell.css';

const ReviewSell: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const sellerID = 1;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`http://localhost:8000/products/seller/${sellerID}`);
        setProducts((response.data as any).products || response.data);
      } catch (err) {
        setError('Error fetching product data');
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get<Review[]>('http://localhost:8000/review');
        setReviews(response.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchReviews();
  }, [sellerID]);

  const showModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  if (loading) return <Spin tip="Loading products..." />;

  if (error) return <Alert message={error} type="error" />;

  const productsWithReviews = products.filter((product) =>
    reviews.some((review) => review.ProductsID === product.ID)
  );

  return (
    <div>
      <Navbarproducts />
      <Table
        dataSource={productsWithReviews}
        columns={[
          {
            title: <div style={{ textAlign: 'center'}}>Picture</div>,
            dataIndex: 'Picture_product',
            key: 'Picture_product',
            align: 'center',
            width: 200,
            render: (text: string) => (
              <img
                src={text}
                alt="product"
                style={{ width: 100, height: 100, objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100';
                }}
              />
            ),
            className: 'column-picture',
          },
          {
            title: <div style={{ textAlign: 'center' }}>Title</div>,
            dataIndex: 'Title',
            key: 'Title',
            width: 800,
            className: 'column-title',
          },
          {
            title: <div style={{ textAlign: 'center'}}>Price</div>,
            dataIndex: 'Price',
            key: 'Price',
            render: (text: number) => (text !== undefined ? `฿${text.toFixed(2)}` : 'N/A'),
            align: 'center',
            width: 200,
            className: 'column-price',
          },
          {
            title: <div style={{ textAlign: 'center' }}>Review</div>,
            key: 'review',
            align: 'center',
            width: 200,
            render: (_, record) => (
              <Button onClick={() => showModal(record)} type="primary">
                ดูรีวิว
              </Button>
            ),
            className: 'column-review',
          },
        ]}
        rowKey="ID"
        pagination={false}
      />

      <Modal
        title={`รีวิวสินค้า: ${selectedProduct?.Title}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <p>{`คุณกำลังดูรีวิวสินค้า: ${selectedProduct?.Title}`}</p>
        {reviews.length > 0 ? (
          reviews
            .filter((review) => review.ProductsID === selectedProduct?.ID)
            .map((review, index) => (
              <div key={index} style={{ marginBottom: '16px' }}>
                <p>คะแนน: {review.Rating} ⭐</p>
                <p>ความคิดเห็น: {review.Comment}</p>
              </div>
            ))
        ) : (
          <p>ยังไม่มีรีวิวสำหรับสินค้านี้</p>
        )}
      </Modal>
    </div>
  );
};

export default ReviewSell;
