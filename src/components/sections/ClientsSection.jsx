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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-36">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">Our Clients</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We have been working with some Fortune 500+ clients
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {clients.map((client) => (
            <div key={client.id} className="w-24 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
              {/* Placeholder for client logo */}
              <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500 font-medium">{client.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
