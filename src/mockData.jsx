// mockData.js
export const mockPharmacies = [
    {
      id: 1,
      name: "Pharmacie Centrale",
      address: "Rue des Palmiers, Cotonou",
      distance: 1.2,
      isOnCall: true,
      medicines: ["Paracétamol", "Ibuprofène"],
      coordinates: [6.370292, 2.391236], // Simulée
    },
    {
      id: 2,
      name: "Pharmacie de l'Étoile",
      address: "Avenue Steinmetz, Porto-Novo",
      distance: 2.5,
      isOnCall: false,
      medicines: ["Amoxicilline", "Paracétamol"],
      coordinates: [6.496857, 2.628852], // Simulée
    },
    {
      id: 3,
      name: "Pharmacie Soleil",
      address: "Quartier Mènontin, Abomey-Calavi",
      distance: 3.8,
      isOnCall: true,
      medicines: ["Paracétamol", "Ceftriaxone"],
      coordinates: [6.453788, 2.353213], // Simulée
    },
  ];
  
  export const mockMedicines = [
    "Paracétamol",
    "Ibuprofène",
    "Amoxicilline",
    "Ceftriaxone",
  ];  