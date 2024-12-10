import { useState } from "react";
import { MapPin, Search, Navigation, Map as MapIcon } from "lucide-react";

// Données simulées
const mockPharmacies = [
  {
    id: 1,
    name: "Pharmacie de la Santé",
    distance: 1.2,
    phone: "+229 123 456 789",
    address: "Rue 123, Cotonou",
    onDuty: true,
    coordinates: { lat: 6.3661, lng: 2.4183 },
    availableMeds: ["Paracétamol", "Ibuprofène"],
  },
  {
    id: 2,
    name: "Pharmacie Bien-Être",
    distance: 2.5,
    phone: "+229 987 654 321",
    address: "Avenue 456, Calavi",
    onDuty: true,
    coordinates: { lat: 6.4386, lng: 2.3557 },
    availableMeds: ["Amoxicilline", "Paracétamol"],
  },
  {
    id: 3,
    name: "Pharmacie du Soleil",
    distance: 3.8,
    phone: "+229 654 321 987",
    address: "Place du Soleil, Porto-Novo",
    onDuty: false,
    coordinates: { lat: 6.4969, lng: 2.6285 },
    availableMeds: ["Paracétamol"],
  },
  {
    id: 4,
    name: "Pharmacie Bien",
    distance: 3.5,
    phone: "+229 987 654 381",
    address: "Avenue",
    onDuty: true,
    coordinates: { lat: 6.4356, lng: 2.7557 },
    availableMeds: ["Amoxicilline", "Paracétamol"],
  },
];

const PharmacyFinder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  const filteredPharmacies = mockPharmacies.filter(
    (pharmacy) => pharmacy.availableMeds.includes(searchTerm) && pharmacy.onDuty
  );

  const handleBackToList = () => {
    setSelectedPharmacy(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Trouver votre Médicament
      </h1>

      <div className="mt-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center border-b pb-4">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher un médicament..."
            className="ml-4 flex-grow bg-transparent outline-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div
          className={`p-6 ${selectedPharmacy ? "block" : "hidden md:block"}`}
        >
          {selectedPharmacy ? (
            <div className="text-center">
              <Navigation size={80} className="mx-auto text-blue-500 mb-6" />
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                {selectedPharmacy.name}
              </h2>
              <p className="text-gray-600 mb-4">{selectedPharmacy.address}</p>

              <div className="bg-blue-50 rounded-lg p-4 mb-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-blue-800">Distance</p>
                  <p>{selectedPharmacy.distance} km</p>
                </div>
                <div>
                  <p className="font-semibold text-blue-800">Téléphone</p>
                  <p>{selectedPharmacy.phone}</p>
                </div>
              </div>

              <div className="flex space-x-4 justify-center">
                <button
                  onClick={handleBackToList}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Retour
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps?q=${selectedPharmacy.coordinates.lat},${selectedPharmacy.coordinates.lng}`,
                      "_blank"
                    );
                  }}
                >
                  <MapIcon className="mr-2" size={20} />
                  Voir l'itinéraire
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6">
              {filteredPharmacies.length > 0 ? (
                <ul className="space-y-4">
                  {filteredPharmacies.map((pharmacy) => (
                    <li
                      key={pharmacy.id}
                      className="bg-gray-100 p-4 rounded-lg hover:shadow-md cursor-pointer flex justify-between items-center"
                      onClick={() => setSelectedPharmacy(pharmacy)}
                    >
                      <div>
                        <h3 className="font-bold text-blue-600">
                          {pharmacy.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {pharmacy.address} • {pharmacy.distance} km
                        </p>
                      </div>
                      <MapPin className="text-green-500" />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center mt-4">
                  Aucune pharmacie de garde ne possède ce médicament pour le
                  moment.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacyFinder;
