const FeaturesSection = ({ service }) => {
  const services = [
    {
      id: 1,
      icon: (
        <svg className="feature-icon" style={{ width: '2.5rem', height: '2.5rem' }} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12.75C8.83 12.75 6.25 10.17 6.25 7C6.25 3.83 8.83 1.25 12 1.25C15.17 1.25 17.75 3.83 17.75 7C17.75 10.17 15.17 12.75 12 12.75ZM12 2.75C9.66 2.75 7.75 4.66 7.75 7C7.75 9.34 9.66 11.25 12 11.25C14.34 11.25 16.25 9.34 16.25 7C16.25 4.66 14.34 2.75 12 2.75Z" />
          <path d="M3.41003 22.75C3.00003 22.75 2.66003 22.41 2.66003 22C2.66003 17.73 6.73003 14.25 12 14.25C17.27 14.25 21.34 17.73 21.34 22C21.34 22.41 21 22.75 20.59 22.75C20.18 22.75 19.84 22.41 19.84 22C19.84 18.55 16.36 15.75 12 15.75C7.64003 15.75 4.16003 18.55 4.16003 22C4.16003 22.41 3.82003 22.75 3.41003 22.75Z" />
        </svg>
      ),
      title: 'Membership Organizations',
      description: 'Our membership management software provides full automation of membership renewals and payments'
    },
    {
      id: 2,
      icon: (
        <svg className="feature-icon" style={{ width: '2.5rem', height: '2.5rem' }} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" />
          <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" />
        </svg>
      ),
      title: 'National Associations',
      description: 'Our membership management software provides full automation of membership renewals and payments'
    },
    {
      id: 3,
      icon: (
        <svg className="feature-icon" style={{ width: '2.5rem', height: '2.5rem' }} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.67 4.99L15.01 4.98L15 3.25C15 2.84 14.66 2.5 14.25 2.5H9.75C9.34 2.5 9 2.84 9 3.25L8.99 4.98L2.33 4.99C1.92 4.99 1.58 5.33 1.58 5.74C1.58 6.15 1.92 6.49 2.33 6.49H3.82L4.49 19.2C4.56 20.78 5.88 22 7.46 22H16.53C18.12 22 19.43 20.78 19.5 19.2L20.17 6.49H21.66C22.07 6.49 22.41 6.15 22.41 5.74C22.42 5.33 22.08 4.99 21.67 4.99ZM10.5 4L13.5 4L13.5 4.98L10.5 4.98L10.5 4ZM18.01 19.01C17.97 19.83 17.29 20.5 16.54 20.5H7.46C6.7 20.5 6.03 19.83 5.99 19.01L5.33 6.49H18.67L18.01 19.01Z" />
          <path d="M8.33 17.75C8.74 17.75 9.08 17.41 9.08 17V10C9.08 9.59 8.74 9.25 8.33 9.25C7.92 9.25 7.58 9.59 7.58 10V17C7.58 17.41 7.92 17.75 8.33 17.75Z" />
          <path d="M12 17.75C12.41 17.75 12.75 17.41 12.75 17V10C12.75 9.59 12.41 9.25 12 9.25C11.59 9.25 11.25 9.59 11.25 10V17C11.25 17.41 11.59 17.75 12 17.75Z" />
          <path d="M15.67 17.75C16.08 17.75 16.42 17.41 16.42 17V10C16.42 9.59 16.08 9.25 15.67 9.25C15.26 9.25 14.92 9.59 14.92 10V17C14.92 17.41 15.26 17.75 15.67 17.75Z" />
        </svg>
      ),
      title: 'Clubs And Groups',
      description: 'Our membership management software provides full automation of membership renewals and payments'
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        {/* Features Grid Section */}
        <div className="section-title">
          <h2>{service?.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: service?.description }}>
          </p>
        </div>

        <div className="features-grid">
          {services.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="learn-more-btn">
          <a href="/san-pham-dich-vu" className="btn btn-outline">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
