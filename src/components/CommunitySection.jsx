const CommunitySection = () => {
  return (
    <section className="community-section">
      <div className="container">
        <div className="community-content">
          <div className="community-image">
            <svg
              viewBox="0 0 500 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="community-img"
              aria-label="Community illustration"
            >
              <rect width="500" height="400" rx="10" fill="#F5F7FA" />
              <circle cx="250" cy="150" r="100" fill="#4CAF4F" opacity="0.1" />
              <circle cx="250" cy="150" r="70" fill="#4CAF4F" opacity="0.2" />

              {/* Person 1 */}
              <circle cx="200" cy="150" r="30" fill="#4CAF4F" />
              <circle cx="200" cy="130" r="15" fill="#263238" />
              <rect x="185" y="150" width="30" height="60" rx="10" fill="#4CAF4F" />

              {/* Person 2 */}
              <circle cx="250" cy="150" r="30" fill="#4CAF4F" />
              <circle cx="250" cy="130" r="15" fill="#263238" />
              <rect x="235" y="150" width="30" height="60" rx="10" fill="#4CAF4F" />

              {/* Person 3 */}
              <circle cx="300" cy="150" r="30" fill="#4CAF4F" />
              <circle cx="300" cy="130" r="15" fill="#263238" />
              <rect x="285" y="150" width="30" height="60" rx="10" fill="#4CAF4F" />

              {/* Connection lines */}
              <line x1="210" y1="180" x2="240" y2="180" stroke="#263238" strokeWidth="2" />
              <line x1="260" y1="180" x2="290" y2="180" stroke="#263238" strokeWidth="2" />

              {/* Decorative elements */}
              <circle cx="150" cy="250" r="20" fill="#4CAF4F" opacity="0.1" />
              <circle cx="350" cy="250" r="20" fill="#4CAF4F" opacity="0.1" />
              <circle cx="250" cy="300" r="30" fill="#4CAF4F" opacity="0.1" />
            </svg>
          </div>

          <div className="community-text">
            <h2>The unseen of spending three years at Pixelgrade</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum.
              Sed accumsan quam vitae est varius fringilla. Pellentesque placerat vestibulum lorem sed porta.
              Nullam mattis tristique iaculis. Nullam pulvinar sit amet risus pretium auctor.
              Etiam quis massa pulvinar, aliquam quam vitae, tempus sem. Donec elementum pulvinar odio.
            </p>
            <a href="/learn-more" className="btn btn-primary">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
