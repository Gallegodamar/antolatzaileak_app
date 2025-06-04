import React, { useState, useEffect, useMemo } from 'react';
import { OrganizerData } from '../types';
import Card from './Card';
import BackButton from './BackButton';

interface OrganizerListScreenProps {
  category: string; // Display title (e.g., sub-category name or "Antolatzaile Guztiak")
  allOrganizers: OrganizerData[];
  onBack: () => void;
  topLevelCategoryName: string; 
  isShowingAll?: boolean; // New prop
}

const OrganizerListScreen: React.FC<OrganizerListScreenProps> = ({ 
  category, 
  allOrganizers, 
  onBack, 
  topLevelCategoryName,
  isShowingAll = false 
}) => {
  const [selectedOrganizerId, setSelectedOrganizerId] = useState<string | null>(null);

  const organizersToList = useMemo(() => {
    if (isShowingAll) {
      return allOrganizers;
    }
    return allOrganizers.filter(org => org.mota === category);
  }, [allOrganizers, category, isShowingAll]);

  useEffect(() => {
    if (organizersToList.length > 0 && !selectedOrganizerId) {
      setSelectedOrganizerId(organizersToList[0].id);
    } else if (organizersToList.length === 0) {
      setSelectedOrganizerId(null);
    }
    if (selectedOrganizerId && !organizersToList.find(org => org.id === selectedOrganizerId)) {
        setSelectedOrganizerId(organizersToList.length > 0 ? organizersToList[0].id : null);
    }
  }, [category, organizersToList, selectedOrganizerId, isShowingAll]);

  const selectedOrganizer = useMemo(() => {
    if (!selectedOrganizerId) return null;
    return organizersToList.find(org => org.id === selectedOrganizerId) || null;
  }, [selectedOrganizerId, organizersToList]);

  const backButtonText = isShowingAll 
    ? "Kategoria Nagusietara Itzuli" 
    : `Itzuli "${topLevelCategoryName}" Azpikategorietara`;

  return (
    <div className="animate-fadeIn">
      <BackButton onClick={onBack} text={backButtonText} />
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-700 mb-2 text-center">
        {isShowingAll ? category : <>Mota: <span className="text-sky-600">{category}</span></>}
      </h2>
      <p className="text-center text-slate-500 mb-8">
        {isShowingAll ? "Arakatu eskuragarri dauden konektore guztiak." : "Arakatu kategoria honetarako eskuragarri dauden konektoreak."}
      </p>

      {organizersToList.length === 0 ? (
         <p className="text-center text-slate-500 mt-10">Ez dago konektorerik eskuragarri.</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          {/* Left Panel: List of Organizers */}
          <div className="md:w-2/5 lg:w-1/3">
            <h3 className="text-xl font-semibold text-slate-700 mb-4">Antolatzaileak:</h3>
            <div className="bg-white shadow-md rounded-lg max-h-[60vh] md:max-h-[calc(100vh-280px)] overflow-y-auto p-1">
              {organizersToList.map((org) => (
                <button
                  key={org.id}
                  onClick={() => setSelectedOrganizerId(org.id)}
                  className={`w-full text-left p-3 rounded-md transition-colors duration-150
                              ${selectedOrganizerId === org.id 
                                ? 'bg-sky-500 text-white font-semibold shadow-sm' 
                                : 'hover:bg-sky-100 text-slate-700'
                              }`}
                >
                  {org.antolatzaileak}
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel: Details of Selected Organizer */}
          <div className="md:w-3/5 lg:w-2/3">
            {selectedOrganizer ? (
              <Card className="h-full flex flex-col animate-fadeIn">
                <h3 className="text-2xl font-bold text-sky-700 mb-1">
                  {selectedOrganizer.antolatzaileak}
                </h3>
                {!isShowingAll && selectedOrganizer.mota !== category && (
                  <p className="text-xs text-slate-400 mb-2">
                    (Mota nagusia: {selectedOrganizer.mota})
                  </p>
                )}
                 {isShowingAll && (
                  <p className="text-sm text-slate-500 mb-3">
                    Jatorrizko mota: <span className="font-medium">{selectedOrganizer.mota}</span>
                  </p>
                )}
                <hr className="my-4 border-slate-200"/>
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">Esanahia:</p>
                  <p className="text-slate-700 text-lg mb-4 bg-slate-50 p-3 rounded-md">{selectedOrganizer.esanahia}</p>
                
                  <p className="text-sm font-semibold text-slate-500 mb-1">Adibidez:</p>
                  <p className="text-slate-700 text-lg italic bg-slate-50 p-3 rounded-md">{selectedOrganizer.adibidez}</p>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-slate-400 mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <p className="text-slate-500 text-lg">Hautatu konektore bat zerrendatik xehetasunak ikusteko.</p>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizerListScreen;