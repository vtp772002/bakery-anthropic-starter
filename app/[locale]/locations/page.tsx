import { locations } from "@/lib/data";

// Enhanced embedded map component for individual locations
function LocationMap({ location }: { location: typeof locations[0] }) {
  // Use coordinates if available, otherwise fall back to address
  const query = location.coordinates 
    ? `${location.coordinates.lat},${location.coordinates.lng}`
    : encodeURIComponent(`${location.address}, ${location.city}, ${location.country}`);
  
  // Enhanced map URL with better styling and marker
  const mapUrl = `https://maps.google.com/maps?q=${query}&output=embed&z=17&hl=vi`;

  return (
    <div className="w-full h-64 bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200 shadow-sm">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map of ${location.name}`}
      />
      
      {/* Map overlay with location info */}
      <div className="mt-2 text-xs text-neutral-600 text-center">
        📍 {location.address}, {location.city}
      </div>
    </div>
  );
}

// Overview map showing all locations
function OverviewMap() {
  // Calculate the center point between all locations
  const validCoords = locations.filter(loc => loc.coordinates);
  const centerLat = validCoords.reduce((sum, loc) => sum + loc.coordinates!.lat, 0) / validCoords.length;
  const centerLng = validCoords.reduce((sum, loc) => sum + loc.coordinates!.lng, 0) / validCoords.length;
  
  // Create markers for all locations
  const markers = locations.map(loc => {
    if (loc.coordinates) {
      return `color:red|label:${loc.name.charAt(0)}|${loc.coordinates.lat},${loc.coordinates.lng}`;
    }
    return null;
  }).filter(Boolean).join('&markers=');

  // Use Static Maps API for better multiple location display
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${centerLat},${centerLng}&zoom=2&size=800x400&markers=${markers}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dw901T_vWGd8sA`;
  
  // Fallback to embedded map if static map doesn't work
  const fallbackUrl = `https://maps.google.com/maps?q=${centerLat},${centerLng}&output=embed&z=2`;
  
  return (
    <div className="w-full h-96 bg-neutral-100 rounded-lg overflow-hidden shadow-sm border border-neutral-200">
      <iframe
        src={fallbackUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="All Bakery Locations"
      />
      
      {/* Location markers overlay */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {locations.map((location) => (
          <div key={location.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-neutral-200">
            <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
              {location.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-medium text-neutral-900">{location.name}</h4>
              <p className="text-sm text-neutral-600">{location.city}, {location.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-neutral-50 py-16">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-light text-neutral-900 mb-6">
              Our Locations
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Visit us at our bakery locations for fresh bread, pastries, and artisan treats. 
              Each location offers the same dedication to quality and craft that defines our brand.
            </p>
          </div>
        </div>
      </div>

      {/* Single Map Section */}
      <div className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-medium text-neutral-900 mb-6 text-center">
              Find Us on the Map
            </h2>
            <LocationMap location={locations[0]} />
            <p className="text-sm text-neutral-600 text-center mt-4">
              {locations[0].address}, {locations[0].city}
            </p>
          </div>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {locations.map((location) => (
              <div key={location.id} className="bg-white border border-neutral-200 rounded-lg p-8 shadow-sm">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-2xl font-serif font-medium text-neutral-900">
                    {location.name}
                  </h2>
                  {location.isMainLocation && (
                    <span className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded-full">
                      Original
                    </span>
                  )}
                </div>

                {/* Address */}
                <div className="mb-6">
                  <h3 className="font-medium text-neutral-900 mb-2">Address</h3>
                  <div className="text-neutral-700 space-y-1">
                    <p>{location.address}</p>
                    <p>
                      {location.city}
                      {location.state && `, ${location.state}`} {location.zipCode}
                    </p>
                    <p>{location.country}</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="mb-6">
                  <h3 className="font-medium text-neutral-900 mb-2">Contact</h3>
                  <div className="text-neutral-700 space-y-1">
                    <p>
                      <a href={`tel:${location.phone}`} className="hover:text-neutral-900 transition-colors">
                        {location.phone}
                      </a>
                    </p>
                    <p>
                      <a href={`mailto:${location.email}`} className="hover:text-neutral-900 transition-colors">
                        {location.email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="mb-6">
                  <h3 className="font-medium text-neutral-900 mb-2">Hours</h3>
                  <div className="text-neutral-700 space-y-1 text-sm">
                    {Object.entries(location.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize">{day}</span>
                        <span>{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <h3 className="font-medium text-neutral-900 mb-2">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {location.services.map((service) => (
                      <span
                        key={service}
                        className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div className="mb-6">
                  <h3 className="font-medium text-neutral-900 mb-2">Location Map</h3>
                  <LocationMap location={location} />
                </div>

                {/* Call to Action */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="/order"
                      className="flex-1 bg-neutral-900 text-white text-center py-3 px-4 rounded-lg hover:bg-neutral-800 transition-colors text-sm font-medium"
                    >
                      Order from this location
                    </a>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        `${location.address}, ${location.city}, ${location.country}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border border-neutral-300 text-neutral-700 text-center py-3 px-4 rounded-lg hover:bg-neutral-50 transition-colors text-sm font-medium"
                    >
                      Get directions
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-neutral-50 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-medium text-neutral-900 mb-4">
              Can't visit in person?
            </h2>
            <p className="text-neutral-600 mb-6">
              We offer online ordering for pickup at both locations. Select your preferred 
              location during checkout and we'll have your order ready when you arrive.
            </p>
            <a
              href="/order"
              className="inline-block bg-neutral-900 text-white py-3 px-6 rounded-lg hover:bg-neutral-800 transition-colors font-medium"
            >
              Order Online
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
