
import React from 'react';
import Card from './Card';
import BackButton from './BackButton';
import { ORGANIZER_DATA } from '../constants';
import { OrganizerData } from '../types';

interface SubCategoryListScreenProps {
  topLevelCategoryName: string;
  subCategories: string[];
  onSelectSubCategory: (subCategory: string) => void;
  onBack: () => void;
}

const SubCategoryListScreen: React.FC<SubCategoryListScreenProps> = ({ 
  topLevelCategoryName, 
  subCategories, 
  onSelectSubCategory,
  onBack 
}) => {

  const getOrganizerCountForSubCategory = (subCategory: string): number => {
    return ORGANIZER_DATA.filter((org: OrganizerData) => org.mota === subCategory).length;
  };

  return (
    <div className="animate-fadeIn">
      <BackButton onClick={onBack} text="Kategoria Nagusietara Itzuli" />
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-700 mb-2 text-center">
        Kategoria Nagusia: <span className="text-sky-600">{topLevelCategoryName}</span>
      </h2>
      <p className="text-center text-slate-500 mb-8">Hautatu azpikategoria bat (Mota):</p>
      
      {subCategories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subCategories.map((subCategory) => {
            const count = getOrganizerCountForSubCategory(subCategory);
            const isDisabled = count === 0;
            return (
              <Card 
                key={subCategory} 
                onClick={!isDisabled ? () => onSelectSubCategory(subCategory) : undefined}
                className={`text-center ${isDisabled ? 'opacity-50 cursor-not-allowed bg-slate-100' : 'hover:bg-sky-50'}`}
              >
                <h3 className={`text-xl font-semibold ${isDisabled ? 'text-slate-500' : 'text-sky-700'}`}>{subCategory}</h3>
                <p className={`text-sm ${isDisabled ? 'text-slate-400' : 'text-slate-500'}`}>({count} konektore)</p>
              </Card>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-slate-500 mt-6">Ez dago azpikategoriarik definituta kategoria nagusi honetarako.</p>
      )}
    </div>
  );
};

export default SubCategoryListScreen;
