const ClientsSection = () => {
  // Placeholder for client logos
  const clients = [
    { id: 1, name: 'Client 1' },
    { id: 2, name: 'Client 2' },
    { id: 3, name: 'Client 3' },
    { id: 4, name: 'Client 4' },
    { id: 5, name: 'Client 5' },
    { id: 6, name: 'Client 6' },
    { id: 7, name: 'Client 7' },
  ];

  return (
    <section className="clients-section">
      <div className="container">
        <div className="section-title">
          <h2>Our Clients</h2>
          <p>
            We have been working with some Fortune 500+ clients
          </p>
        </div>

        <div className="clients-grid">
          {clients.map((client) => (
            <div key={client.id} className="client-logo">
              {/* Placeholder for client logo */}
              <div className="client-logo-placeholder">
                <span>{client.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
