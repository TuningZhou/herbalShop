import React from 'react';
import { getImageUrl } from '@/services/api/imageService'; // 假设您创建了这个服务

interface ProductImageProps {
  imageName: string; // 例如 'product-a-thumbnail.jpg'
  altText: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageName, altText }) => {
  const imageUrl = getImageUrl(imageName);
  return <img src={imageUrl} alt={altText} />;
};

export default ProductImage;