import { useState, useEffect } from 'react';
import { projectsService, pageService } from '@services/appService';
import { Link } from 'react-router-dom';

const Projects = () => {
    const [projectsData, setProjectsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await projectsService.getProjects({
                    sort: 'id:desc',
                    populate: {
                        'cover': {
                            populate: true,
                            fields: ['url']
                        }
                    }
                });
                setProjectsData(response.data);
            } catch {
                setError('Không thể tải dữ liệu dự án');
            } finally {
                setLoading(false);
            }
        };
        const fetchPage = async () => {
            const response = await pageService.getPage('project-page');
            if (response.data && response.data.length > 0) {
                setPage(response.data[0]);
            }
        };
        fetchPage();

        fetchProjects();
    }, []);

    if (loading) {
        return <div className="container py-16 text-center">Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div className="container py-16 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="container py-16">
            <h1 className="text-3xl font-bold mb-6">Dự án</h1>

            {page && (
                <div className="text-gray-600 my-6 text-justify">
                    <div dangerouslySetInnerHTML={{ __html: page.content }} />
                </div>
            )}

            {projectsData && projectsData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projectsData.map((item) => (
                        <Link to={item.slug ? `/du-an-tieu-bieu/${item.slug}` : '#'} key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200">
                            {item.cover?.url && (
                                <img
                                    src={`https://assets.kachivina.vn${item.cover.url}`}
                                    alt={item.title}
                                    className="w-full h-56 object-cover"
                                />
                            )}
                            <div className="p-6 flex flex-col flex-1">
                                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                                <p className="text-gray-600 mb-4">{item.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div>Không có dữ liệu để hiển thị.</div>
            )}

        </div>
    );
};

export default Projects; 