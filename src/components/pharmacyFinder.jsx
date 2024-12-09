import React, { useState } from 'react';
import { MapPin, Search, Navigation, MapIcon } from 'lucide-react';

// Données simulées des pharmacies
const mockPharmacies = [
  {
    id: 1,
    name: "Pharmacie Centrale",
    address: "12 Rue principale, Ville",
    distance: 1.2,
    hasParacetamol: true,
    isOnCall: true,
    coordinates: { lat: 48.8566, lng: 2.3522 },
    phone: "01 23 45 67 89",
    openHours: "8h-22h"
  },
  {
    id: 2,
    name: "Pharmacie Saint-Michel",
    address: "45 Avenue de la République, Ville",
    distance: 3.5,
    hasParacetamol: true,
    isOnCall: false,
    coordinates: { lat: 48.8534, lng: 2.3488 },
    phone: "01 98 76 54 32",
    openHours: "9h-20h"
  },
  {
    id: 3,
    name: "Pharmacie du Marché",
    address: "7 Place du Marché, Ville",
    distance: 2.8,
    hasParacetamol: false,
    isOnCall: true,
    coordinates: { lat: 48.8600, lng: 2.3600 },
    phone: "01 45 67 89 01",
    openHours: "8h-21h"
  }
];

function PharmacyFinder() {
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer et trier les pharmacies
  const filteredPharmacies = mockPharmacies
    .filter(pharmacy => 
      pharmacy.hasParacetamol && 
      pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.distance - b.distance);

  const handlePharmacySelect = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
  };

  const handleBackToList = () => {
    setSelectedPharmacy(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Liste des pharmacies */}
        <div className="bg-blue-50 p-6 md:border-r border-gray-200">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-blue-800 mb-4">Trouver une Pharmacie</h1>
            <div className="flex items-center bg-white rounded-lg shadow-md">
              <Search className="text-blue-500 ml-4 mr-2" />
              <input 
                type="text" 
                placeholder="Rechercher une pharmacie" 
                className="w-full p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {filteredPharmacies.length > 0 ? (
              filteredPharmacies.map(pharmacy => (
                <div 
                  key={pharmacy.id} 
                  onClick={() => handlePharmacySelect(pharmacy)}
                  className="bg-white rounded-lg shadow-md p-4 hover:bg-blue-50 cursor-pointer transition-all duration-200 ease-in-out"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-bold text-xl text-blue-900">{pharmacy.name}</h2>
                      <p className="text-sm text-gray-600">{pharmacy.address}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <MapPin className="mr-2 text-blue-500" size={16} />
                        <span>{pharmacy.distance} km | {pharmacy.openHours}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      {pharmacy.isOnCall && (
                        <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full mb-2">
                          De garde
                        </span>
                      )}
                      <MapIcon className="text-blue-500" size={24} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Aucune pharmacie trouvée</p>
            )}
          </div>
        </div>

        {/* Détails de la pharmacie sélectionnée */}
        <div className={`p-6 ${selectedPharmacy ? 'block' : 'hidden md:block'}`}>
          {selectedPharmacy ? (
            <div className="text-center">
              <Navigation size={80} className="mx-auto text-blue-500 mb-6" />
              <h2 className="text-2xl font-bold text-blue-900 mb-2">{selectedPharmacy.name}</h2>
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
                    // Simuler l'ouverture de Google Maps
                    window.open(`https://www.google.com/maps?q=${selectedPharmacy.coordinates.lat},${selectedPharmacy.coordinates.lng}`, '_blank');
                  }}
                >
                  <MapIcon className="mr-2" size={20} />
                  Voir l'itinéraire
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-center">
              <p>Sélectionnez une pharmacie pour voir les détails</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PharmacyFinder;