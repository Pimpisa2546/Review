import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spin, Alert } from 'antd';
import 'antd/dist/reset.css'; // Ensure Ant Design CSS is imported
import { Product } from '../interface/product'; // ปรับเส้นทางตามโครงสร้างโปรเจคของคุณ

const ProductDisplay: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:8000/products');
        console.log('Fetched products:', response.data); // Debugging line
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching product data:', err); // Error logging
        setError('Error fetching product data');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run only once on component mount

  if (loading) return <Spin tip="Loading products..." />;
  if (error) return <Alert message={error} type="error" />;

  if (products.length === 0) return <p>No product data available</p>;

  return (
    <div>
      <Table
        dataSource={products} // แสดงรายการผลิตภัณฑ์ทั้งหมด
        columns={[
          {
            title: 'รูป',
            dataIndex: 'Picture_product', // ใช้ชื่อฟิลด์ที่ตรงกับ interface
            key: 'Picture_product', // ใช้ชื่อฟิลด์ที่ตรงกับ dataIndex
            render: (text: string) => {
              // Debugging line to check the URL
              console.log('Image URL:', text);
              return (
                <img
                  src={text}
                  alt="product"
                  style={{ width: 100, height: 100, objectFit: 'cover' }}
                  onError={(e) => {
                    // Handle image loading errors
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100'; // Placeholder image
                  }}
                />
              );
            },
          },
          {
            title: 'ชื่อสินค้า',
            dataIndex: 'Title', // ใช้ชื่อฟิลด์ที่ตรงกับ interface
            key: 'Title', // ใช้ชื่อฟิลด์ที่ตรงกับ dataIndex
          },
          {
            title: 'จำนวน',
            dataIndex: 'Quantity', // ใช้ชื่อฟิลด์ที่ตรงกับ interface
            key: 'Quantity', // ใช้ชื่อฟิลด์ที่ตรงกับ dataIndex
            align: 'center' as 'center',
          },
          {
            title: 'ราคา',
            dataIndex: 'Price', // ใช้ชื่อฟิลด์ที่ตรงกับ interface
            key: 'Price', // ใช้ชื่อฟิลด์ที่ตรงกับ dataIndex
            render: (text: number) => {
              return text !== undefined ? `฿${text.toFixed(2)}` : 'N/A';
            },
            align: 'center' as 'center',
          },
        ]}
        rowKey="ID" // ใช้ชื่อฟิลด์ที่ตรงกับ interface
        pagination={false}
      />
    </div>
  );
};

export default ProductDisplay;
