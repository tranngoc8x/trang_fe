import React, { useState, useEffect } from 'react';
import { pageService } from '../services/appService';

const Contact = () => {
    const [page, setPage] = useState(null);
    useEffect(() => {
        const fetchPage = async () => {
            const response = await pageService.getPage('contact-page');
            if (response.data && response.data.length > 0) {
                setPage(response.data[0]);
            }
        };
        fetchPage();
    }, []);

    return (
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
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5022345678!2d106.700423315334!3d10.7768899923221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2zMTIzIMSQxrDhu51uZyBBQkMsIFF14bqtbiAxLCBUUC5IQ00!5e0!3m2!1svi!2s!4v1710000000000!5m2!1svi!2s"
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
        </section>
    );
};

export default Contact; 