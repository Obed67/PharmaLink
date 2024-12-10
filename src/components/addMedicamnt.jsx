import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

function AddMedication() {
  const [medicationName, setMedicationName] = useState('');
  const [medicationsList, setMedicationsList] = useState([]);

  // Charger les médicaments depuis le localStorage au montage du composant
  useEffect(() => {
    const savedMedications = JSON.parse(localStorage.getItem('medications')) || [];
    setMedicationsList(savedMedications);
  }, []);

  const handleAddMedication = () => {
    if (medicationName.trim() !== '') {
      const newMedicationsList = [...medicationsList, medicationName];
      setMedicationsList(newMedicationsList);
      setMedicationName('');
      // Sauvegarder la liste dans le localStorage
      localStorage.setItem('medications', JSON.stringify(newMedicationsList));
    }
  };

  const handleRemoveMedication = (index) => {
    const newList = medicationsList.filter((_, i) => i !== index);
    setMedicationsList(newList);
    // Mettre à jour le localStorage après suppression
    localStorage.setItem('medications', JSON.stringify(newList));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Ajouter des Médicaments</h1>
        
        <div className="flex items-center bg-white rounded-lg shadow-md mb-6">
          <input 
            type="text" 
            placeholder="Nom du médicament" 
            className="w-full p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={medicationName}
            onChange={(e) => setMedicationName(e.target.value)}
          />
          <button 
            onClick={handleAddMedication} 
            className="bg-blue-500 text-white px-4 py-3 rounded-r-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            <Plus className="mr-2" size={20} />
            Ajouter
          </button>
        </div>

        <div className="space-y-4">
          {medicationsList.length > 0 ? (
            medicationsList.map((med, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
              >
                <span>{med}</span>
                <button 
                  onClick={() => handleRemoveMedication(index)} 
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Aucun médicament ajouté</p>
          )}
        </div>

        <div className="mt-6 text-right">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Enregistrer
          </button>
        </div>

        {/* Liste des médicaments ajoutés */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Médicaments Ajoutés</h2>
          <ul className="space-y-2">
            {medicationsList.map((med, index) => (
              <li key={index} className="bg-blue-50 p-2 rounded-lg shadow-md">
                {med}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddMedication;