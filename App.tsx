import React, { useState, useMemo } from 'react';
import { ScreenView, OrganizerData } from './types';
import { ORGANIZER_DATA, getTopLevelCategoryNames, getSubCategoriesForTopLevel, VIEW_ALL_TOP_LEVEL_CATEGORY } from './constants';
import TopLevelCategoryScreen from './components/TopLevelCategoryScreen';
import SubCategoryListScreen from './components/SubCategoryListScreen';
import OrganizerListScreen from './components/OrganizerListScreen';

const VIEW_ALL_SUB_CATEGORY_MARKER = "__ALL_ORGANIZERS__";
const VIEW_ALL_DISPLAY_TITLE = "Antolatzaile Guztiak";

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenView>(ScreenView.TopLevelCategories);
  const [selectedTopLevelCategory, setSelectedTopLevelCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  const topLevelCategoryNames = useMemo(() => getTopLevelCategoryNames(), []);
  
  const subCategoriesForSelectedTopLevel = useMemo(() => {
    if (selectedTopLevelCategory && selectedTopLevelCategory !== VIEW_ALL_TOP_LEVEL_CATEGORY) {
      return getSubCategoriesForTopLevel(selectedTopLevelCategory);
    }
    return [];
  }, [selectedTopLevelCategory]);

  const handleSelectTopLevelCategory = (categoryName: string) => {
    if (categoryName === VIEW_ALL_TOP_LEVEL_CATEGORY) {
      setSelectedTopLevelCategory(categoryName);
      setSelectedSubCategory(VIEW_ALL_SUB_CATEGORY_MARKER); 
      setCurrentScreen(ScreenView.Organizers);
    } else {
      setSelectedTopLevelCategory(categoryName);
      setSelectedSubCategory(null); 
      setCurrentScreen(ScreenView.SubCategories);
    }
  };

  const handleSelectSubCategory = (subCategoryName: string) => {
    setSelectedSubCategory(subCategoryName);
    setCurrentScreen(ScreenView.Organizers);
  };

  const handleBackToTopLevelCategories = () => {
    setSelectedTopLevelCategory(null);
    setSelectedSubCategory(null);
    setCurrentScreen(ScreenView.TopLevelCategories);
  };

  const handleBackToSubCategories = () => {
    setSelectedSubCategory(null);
    setCurrentScreen(ScreenView.SubCategories);
    // selectedTopLevelCategory remains
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case ScreenView.TopLevelCategories:
        return (
          <TopLevelCategoryScreen
            categories={topLevelCategoryNames}
            onSelectCategory={handleSelectTopLevelCategory}
          />
        );
      case ScreenView.SubCategories:
        if (!selectedTopLevelCategory || selectedTopLevelCategory === VIEW_ALL_TOP_LEVEL_CATEGORY) {
          // Fallback if state is inconsistent or trying to show subcategories for "VIEW_ALL"
          handleBackToTopLevelCategories();
          return null; 
        }
        return (
          <SubCategoryListScreen
            topLevelCategoryName={selectedTopLevelCategory}
            subCategories={subCategoriesForSelectedTopLevel}
            onSelectSubCategory={handleSelectSubCategory}
            onBack={handleBackToTopLevelCategories}
          />
        );
      case ScreenView.Organizers:
        if (!selectedTopLevelCategory) { 
          handleBackToTopLevelCategories();
          return null;
        }
        
        if (selectedTopLevelCategory === VIEW_ALL_TOP_LEVEL_CATEGORY && selectedSubCategory === VIEW_ALL_SUB_CATEGORY_MARKER) {
          return (
            <OrganizerListScreen
              category={VIEW_ALL_DISPLAY_TITLE} 
              allOrganizers={ORGANIZER_DATA}
              onBack={handleBackToTopLevelCategories}
              topLevelCategoryName={selectedTopLevelCategory}
              isShowingAll={true}
            />
          );
        } 
        
        if (selectedSubCategory && selectedTopLevelCategory !== VIEW_ALL_TOP_LEVEL_CATEGORY) {
          return (
            <OrganizerListScreen
              category={selectedSubCategory} 
              allOrganizers={ORGANIZER_DATA}
              onBack={handleBackToSubCategories}
              topLevelCategoryName={selectedTopLevelCategory}
              isShowingAll={false}
            />
          );
        }
        
        // Fallback for any other inconsistent state
        handleBackToTopLevelCategories();
        return null;

      default:
        return (
          <TopLevelCategoryScreen
            categories={topLevelCategoryNames}
            onSelectCategory={handleSelectTopLevelCategory}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col items-center p-4 sm:p-8 font-sans">
      <header className="w-full max-w-5xl mb-8 text-center flex-shrink-0">
        <img src="https://picsum.photos/seed/basqueconnect/150/50" alt="Aplikazioaren Logoa" className="mx-auto mb-4 h-12 sm:h-16 rounded-md"/>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800">
          Antolatzaile <span className="text-sky-600">Esploratzailea</span>
        </h1>
        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Aurkitu eta ulertu euskarazko diskurtso-konektoreak.
        </p>
      </header>
      
      <main className="w-full max-w-5xl bg-white p-6 sm:p-10 rounded-xl shadow-2xl flex flex-col flex-grow min-h-0">
        {renderScreen()}
      </main>

      <footer className="w-full max-w-5xl mt-12 text-center text-sm text-slate-500 flex-shrink-0">
        <p>&copy; {new Date().getFullYear()} Antolatzaile Esploratzailea. React eta Tailwind CSS-rekin sortua.</p>
      </footer>
    </div>
  );
};

// Global fadeIn animation
if (typeof window !== 'undefined' && !document.getElementById('fadeInAnimation')) {
  const style = document.createElement('style');
  style.id = 'fadeInAnimation';
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
}

export default App;