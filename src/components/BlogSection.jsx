const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Creating Streamlined Safeguarding Processes with OneRen',
      date: 'Jan 28, 2023',
      color: '#4CAF4F',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'What are your safeguarding responsibilities and how can you manage them?',
      date: 'Dec 15, 2022',
      color: '#263238',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Revamping the Membership Model with Triathlon Australia',
      date: 'Nov 4, 2022',
      color: '#2194F3',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" />
        </svg>
      )
    }
  ];

  return (
    <section className="blog-section">
      <div className="container">
        <div className="section-title">
          <h2>Caring is the new marketing</h2>
          <p>
            The Nexcent blog is the best place to read about the latest membership insights,
            trends and more. See who's joining the community, read about how our community
            are increasing their membership income and lots more.
          </p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-card">
              <div className="blog-image" style={{ backgroundColor: `${post.color}20` }}>
                <div className="blog-icon" style={{ color: post.color }}>
                  {post.icon}
                </div>
              </div>

              <div className="blog-content">
                <div className="blog-info">
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-date">{post.date}</p>
                </div>

                <a href={`/blog/${post.id}`} className="blog-link">
                  Read More
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
