import React, { useState, useEffect } from 'react';
import { pageService } from '../services/appService';
import SimpleSEOHead from '@/seo/components/SimpleSEOHead';
import { useGlobalConfig } from '../contexts/GlobalConfigContext';

const Contact = () => {
    const [page, setPage] = useState(null);
    const { getMapUrl } = useGlobalConfig();
    useEffect(() => {
        const fetchPage = async () => {
            const response = await pageService.getPage('contact-page');
            if (response.data && response.data.length > 0) {
                setPage(response.data[0]);
            }
        };
        fetchPage();
    }, []);
    // Lấy SEO từ page nếu có, nếu không lấy từ global
    const metaTitle = page?.SEO?.metaTitle?.trim();
    const metaDescription = page?.SEO?.metaDescription?.trim() || '';
    const metaKeywords = page?.SEO?.metaKeywords?.trim() || '';
    const metaImage = page?.SEO?.metaImage?.url
        ? 'https://assets.kachivina.vn' + page.SEO.metaImage.url
        : '';

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
                    <div className=" mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-700 mb-8 text-center">
                            {page?.title}
                        </h1>
                        <div className="bg-white rounded-lg shadow-md p-8 mb-10">

                            <div className="mb-6">
                                <div dangerouslySetInnerHTML={{ __html: page?.content }} />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bản đồ</h2>
                            <div className="w-full h-96 rounded overflow-hidden shadow">
                                <iframe
                                    title="Google Maps"
                                    src={getMapUrl()}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
};

export default Contact;