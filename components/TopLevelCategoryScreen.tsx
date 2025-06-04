
import React from 'react';
import Card from './Card';

interface TopLevelCategoryScreenProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const TopLevelCategoryScreen: React.FC<TopLevelCategoryScreenProps> = ({ categories, onSelectCategory }) => {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-700 mb-8 text-center">
        Hautatu Kategoria Nagusi Bat
      </h2>
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card 
              key={category} 
              onClick={() => onSelectCategory(category)}
              className="text-center hover:bg-sky-50"
            >
              <h3 className="text-xl font-semibold text-sky-700">{category}</h3>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500">Ez dago kategoria nagusirik eskuragarri.</p>
      )}
    </div>
  );
};

export default TopLevelCategoryScreen;
