import React, { useEffect, useState } from 'react';
import { serviceService, pageService } from '../services/appService';
import { Link } from 'react-router-dom';
import SimpleSEOHead from '@/seo/components/SimpleSEOHead';
import { useGlobalConfig } from '../contexts/GlobalConfigContext';

const Services = () => {
    const [services, setServices] = useState([]);
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getMetaTitle, getMetaDescription, getMetaKeywords, getOgImage } = useGlobalConfig();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await serviceService.getServices(
                    { populate: '*' }
                );
                // Nếu response có dạng { data: [...] } (theo chuẩn Strapi)
                setServices(response.data || []);
            } catch {
                setError('Không thể tải danh sách sản phẩm.');
            } finally {
                setLoading(false);
            }
        };
        const fetchPage = async () => {
            const response = await pageService.getPage('service-page');
            if (response.data && response.data.length > 0) {
                setPage(response.data[0]);
            }
        };
        fetchPage();
        fetchServices();
    }, []);

    // Lấy SEO từ page nếu có, nếu không lấy từ global
    const metaTitle = page?.SEO?.metaTitle?.trim() || getMetaTitle('Sản phẩm & Dịch vụ');
    const metaDescription = page?.SEO?.metaDescription?.trim() || getMetaDescription();
    const metaKeywords = page?.SEO?.metaKeywords?.trim() || getMetaKeywords();
    const metaImage = page?.SEO?.metaImage?.url
        ? 'https://assets.kachivina.vn' + page.SEO.metaImage.url
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
            <div className="container py-16">
                <div className=" mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-700 mb-8 text-center">
                        Sản phẩm & Dịch vụ
                    </h1>
                    <div className="text-gray-600 mb-6 text-center">
                        {loading && 'Đang tải danh sách sản phẩm...'}
                        {error && <span className="text-red-500">{error}</span>}
                        {!loading && !error && (
                            services.length > 0 ? (
                                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {services.map((item) => {
                                        const slug = item?.slug;
                                        return (
                                            <li key={item.id} className="p-4 bg-white rounded shadow flex flex-col items-center">
                                                {/* Hiển thị ảnh sản phẩm */}
                                                <Link to={slug ? `/san-pham-dich-vu/${slug}` : '#'} className="w-full flex flex-col items-center">
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
                                <span>Chưa có dịch vụ nào.</span>
                            )
                        )}
                        {page && (
                            <div className="text-gray-600 my-6 text-justify">
                                <div dangerouslySetInnerHTML={{ __html: page.content }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Services; 