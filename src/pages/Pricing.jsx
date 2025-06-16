import { useState, useEffect } from 'react';
import { pageService } from '@services/appService';
import ContactForm from '../components/ContactForm';

const Pricing = () => {

    const [page, setPage] = useState(null);

    useEffect(() => {

        const fetchPage = async () => {
            const response = await pageService.getPage('pricing-page');
            if (response.data && response.data.length > 0) {
                setPage(response.data[0]);
            }
        };
        fetchPage();
    }, []);



    return (
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
    );
};

export default Pricing; 