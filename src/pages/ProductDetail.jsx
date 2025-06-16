import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../services/appService';

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productService.getProducts({
                    filters: { slug },
                    populate: {
                        'image': {
                            populate: true,
                            fields: ['url']
                        },
                        'dynamic_content': {
                            populate: "*"
                        }
                    }
                });
                if (response.data && response.data.length > 0) {
                    setProduct(response.data[0]);
                } else {
                    setError('Không tìm thấy sản phẩm.');
                }
            } catch {
                setError('Lỗi khi tải chi tiết sản phẩm.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    if (loading) return <div className="text-center py-10">Đang tải...</div>;
    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
    if (!product) return null;

    const imageUrl = product?.image?.url ? 'https://assets.kachivina.vn' + product.image.url : null;
    const title = product?.title || 'Tên sản phẩm';
    const description = product?.description || "";

    return (
        <section className="py-16 bg-light">
            <div className="container mx-auto px-4 md:px-6 lg:px-36">
                <div className=" mx-auto bg-white rounded shadow p-8">
                    {imageUrl && (
                        <img src={imageUrl} alt={title} className="w-full h-64 object-cover rounded mb-6" />
                    )}
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
                    {description && (
                        <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: description }} />
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductDetail; 