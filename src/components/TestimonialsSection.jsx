const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-title">
          <h2>What Clients Say</h2>
          <p>
            We have been working with clients around the world
          </p>
        </div>

        <div className="testimonial-content">
          <div className="testimonial-card">
            <div className="testimonial-image">
              <svg
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="testimonial-img"
                aria-label="Client testimonial"
              >
                <rect width="400" height="400" fill="#4CAF4F" opacity="0.1" />

                {/* Background elements */}
                <circle cx="200" cy="150" r="100" fill="#4CAF4F" opacity="0.2" />
                <rect x="50" y="280" width="300" height="70" rx="10" fill="#4CAF4F" opacity="0.2" />

                {/* Person */}
                <circle cx="200" cy="150" r="80" fill="#FFFFFF" />
                <circle cx="200" cy="120" r="30" fill="#263238" />
                <rect x="160" y="150" width="80" height="100" rx="40" fill="#263238" />

                {/* Decorative elements */}
                <circle cx="100" cy="100" r="20" fill="#4CAF4F" opacity="0.3" />
                <circle cx="300" cy="100" r="20" fill="#4CAF4F" opacity="0.3" />
                <circle cx="100" cy="300" r="20" fill="#4CAF4F" opacity="0.3" />
                <circle cx="300" cy="300" r="20" fill="#4CAF4F" opacity="0.3" />

                {/* Stars */}
                <path d="M120 280L125 290L135 292L127.5 300L130 310L120 305L110 310L112.5 300L105 292L115 290L120 280Z" fill="#4CAF4F" />
                <path d="M160 280L165 290L175 292L167.5 300L170 310L160 305L150 310L152.5 300L145 292L155 290L160 280Z" fill="#4CAF4F" />
                <path d="M200 280L205 290L215 292L207.5 300L210 310L200 305L190 310L192.5 300L185 292L195 290L200 280Z" fill="#4CAF4F" />
                <path d="M240 280L245 290L255 292L247.5 300L250 310L240 305L230 310L232.5 300L225 292L235 290L240 280Z" fill="#4CAF4F" />
                <path d="M280 280L285 290L295 292L287.5 300L290 310L280 305L270 310L272.5 300L265 292L275 290L280 280Z" fill="#4CAF4F" />
              </svg>
            </div>

            <div className="testimonial-text">
              <p className="testimonial-quote">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>

              <div className="testimonial-author">
                <h4>John Doe</h4>
                <p>CEO, Company Name</p>
              </div>

              <div className="testimonial-navigation">
                <button className="testimonial-nav-btn prev" aria-label="Previous testimonial">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="testimonial-nav-btn next" aria-label="Next testimonial">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
