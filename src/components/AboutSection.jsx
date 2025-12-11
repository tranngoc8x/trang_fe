const AboutSection = ({ about }) => {



  return (
    <div className="container">

      {/* Feature Highlight Section */}
      <div className="feature-highlight">
        <div className="feature-highlight-image">
          <img src={about?.media?.url ? 'https://assets.kachivina.vn' + about.media.url : ''} alt="Feature illustration" />
        </div>

        <div className="feature-highlight-content">
          <h2>{about?.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: about?.description }}>

          </p>
          {about?.button_name ?
            <a href={about?.button_link} className="btn btn-primary">
              {about?.button_name}
            </a>
            : null}
        </div>
      </div>
    </div>
  )
}

export default AboutSection;
