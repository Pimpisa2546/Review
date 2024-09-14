import React from 'react';
import "./Review.css";

interface ProductProps {
  data: {
    id: number;
    title: string;
	  description: string;
	  category: string;
	  picture_product: string;
  };
}

export const Course: React.FC<ProductProps> = (props) => {
  const { title, picture_product } = props.data;


  return (
    <div className="product">
        <img src={picture_product} alt={title} />
    </div>
  );
};