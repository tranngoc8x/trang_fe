const AchievementSection = ({ achievements }) => {

  return (
    <section className="achievement-section">
      <div className="container">
        <div className="achievement-content">
          <div className="achievement-text">
            <h2 dangerouslySetInnerHTML={{ __html: achievements?.title }}></h2>
            <p dangerouslySetInnerHTML={{ __html: achievements?.description }}></p>
          </div>

          <div className="achievement-stats">
            {achievements?.items?.map((achievement) => (
              <div key={achievement.id} className="achievement-card">
                <div className="achievement-icon">
                  <img src={achievement?.media.url ? 'https://assets.kachivina.vn' + achievement.media.url : ''} alt={achievement.title} />
                </div>
                <div className="achievement-info">
                  <h3 className="achievement-number">{achievement.title}</h3>
                  <p className="achievement-title" dangerouslySetInnerHTML={{ __html: achievement.body }}></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementSection;
