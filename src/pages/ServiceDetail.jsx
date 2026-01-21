import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { serviceService, productService } from '../services/appService';
import SimpleSEOHead from '@/seo/components/SimpleSEOHead';
import { useGlobalConfig } from '../contexts/GlobalConfigContext';
const ServiceDetail = () => {
    const { slug } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const { getMetaTitle, getMetaDescription, getMetaKeywords, getOgImage } = useGlobalConfig();
    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await serviceService.getServices({
                    filters: { slug },
                    populate: "*"
                });
                if (response.data && response.data.length > 0) {
                    setService(response.data[0]);
                } else {
                    setError('Không tìm thấy dịch vụ.');
                }
            } catch {
                setError('Lỗi khi tải chi tiết dịch vụ.');
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [slug]);
    useEffect(() => {
        if (service) {
            const fetchProducts = async () => {
                try {
                    const response = await productService.getProducts(
                        {
                            populate: '*',

                            filters: {
                                service: service.id
                            }
                        }
                    );
                    // Nếu response có dạng { data: [...] } (theo chuẩn Strapi)
                    setProducts(response.data || []);
                } catch {
                    setError('Không thể tải danh sách sản phẩm.');
                } finally {
                    setLoading(false);
                }
            };
            fetchProducts();
        }

    }, [service])

    if (loading) return <div className="text-center py-10">Đang tải...</div>;
    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
    if (!service) return null;

    const imageUrl = service?.cover?.url ? 'https://assets.kachivina.vn' + service.cover.url : null;
    const title = service?.title || 'Tên dự án';
    const content = service?.content || "";

    const metaTitle = service?.SEO?.metaTitle?.trim() || getMetaTitle('Dự án');
    const metaDescription = service?.SEO?.metaDescription?.trim() || getMetaDescription();
    const metaKeywords = service?.SEO?.metaKeywords?.trim() || getMetaKeywords();
    const metaImage = service?.SEO?.metaImage?.url
        ? 'https://assets.kachivina.vn' + service.SEO.metaImage.url
        : getOgImage();

    return (
        <>
            <SimpleSEOHead
                title={metaTitle}
                description={metaDescription}
                keywords={metaKeywords}
                image={metaImage}
                type="website"
            />
            <section className="py-16 bg-light">
                <div className="container mx-auto px-4 md:px-6 lg:px-36">
                    <div className=" mx-auto bg-white rounded shadow p-8">
                        {imageUrl && (
                            <img src={imageUrl} alt={title} className="w-full h-64 object-cover rounded mb-6" />
                        )}
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
                        {content && (
                            <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: content }} />
                        )}

                        {!loading && !error && (
                            products.length > 0 ? (
                                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {products.map((item) => {
                                        const slug = item?.slug;
                                        return (
                                            <li key={item.id} className="p-4 bg-white rounded shadow flex flex-col items-center">
                                                {/* Hiển thị ảnh sản phẩm */}
                                                <Link to={slug ? `/san-pham/${slug}` : '#'} className="w-full flex flex-col items-center">
                                                    {item?.image || item?.image?.url ? (
                                                        <img
                                                            src={'https://assets.kachivina.vn' + item?.image?.url}
                                                            alt={item?.title || 'Sản phẩm'}
                                                            className="w-full h-40 object-cover rounded mb-4"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded mb-4 text-gray-400">
                                                            Không có ảnh
                                                        </div>
                                                    )}
                                                    {/* Tiêu đề sản phẩm */}
                                                    <div className="font-semibold text-lg text-gray-800 text-center">
                                                        {item?.title || 'Tên sản phẩm'}
                                                    </div>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <span>Chưa có sản phẩm nào.</span>
                            )
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServiceDetail; 