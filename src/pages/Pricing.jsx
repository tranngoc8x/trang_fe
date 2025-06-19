import { useState, useEffect } from 'react';
import { pageService } from '@services/appService';
import ContactForm from '../components/ContactForm';
import SimpleSEOHead from '@/seo/components/SimpleSEOHead';
import { useGlobalConfig } from '../contexts/GlobalConfigContext';
const Pricing = () => {

    const [page, setPage] = useState(null);
    const { getMetaTitle, getMetaDescription, getMetaKeywords, getOgImage } = useGlobalConfig();

    useEffect(() => {

        const fetchPage = async () => {
            const response = await pageService.getPage('pricing-page');
            if (response.data && response.data.length > 0) {
                setPage(response.data[0]);
            }
        };
        fetchPage();
    }, []);



    // Lấy SEO từ page nếu có, nếu không lấy từ global
    const metaTitle = page?.SEO?.metaTitle?.trim() || getMetaTitle('Báo giá & Tư vấn');
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
                <h1 className="text-3xl font-bold mb-6">Báo giá & Tư vấn</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left: Page Content */}
                    <div className="md:w-2/3 w-full">
                        {page && (
                            <div className="text-gray-600 my-6 text-justify">
                                <div dangerouslySetInnerHTML={{ __html: page.content }} />
                            </div>
                        )}
                    </div>

                    {/* Right: Contact Form */}
                    <div className="md:w-1/3 w-full">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pricing; 