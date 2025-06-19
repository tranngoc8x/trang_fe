import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { projectsService } from '../services/appService';
import SimpleSEOHead from '@/seo/components/SimpleSEOHead';
import { useGlobalConfig } from '../contexts/GlobalConfigContext';
const ProjectDetail = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getMetaTitle, getMetaDescription, getMetaKeywords, getOgImage } = useGlobalConfig();
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await projectsService.getProjects({
                    filters: { slug },
                    populate: {
                        'cover': {
                            populate: true,
                            fields: ['url']
                        }
                    }
                });
                if (response.data && response.data.length > 0) {
                    setProject(response.data[0]);
                } else {
                    setError('Không tìm thấy dự án.');
                }
            } catch {
                setError('Lỗi khi tải chi tiết dự án.');
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [slug]);

    if (loading) return <div className="text-center py-10">Đang tải...</div>;
    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
    if (!project) return null;

    const imageUrl = project?.cover?.url ? 'https://assets.kachivina.vn' + project.cover.url : null;
    const title = project?.title || 'Tên dự án';
    const content = project?.content || "";

    const metaTitle = project?.SEO?.metaTitle?.trim() || getMetaTitle('Dự án');
    const metaDescription = project?.SEO?.metaDescription?.trim() || getMetaDescription();
    const metaKeywords = project?.SEO?.metaKeywords?.trim() || getMetaKeywords();
    const metaImage = project?.SEO?.metaImage?.url
        ? 'https://assets.kachivina.vn' + project.SEO.metaImage.url
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
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProjectDetail; 