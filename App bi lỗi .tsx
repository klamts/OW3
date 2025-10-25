
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from './constants';
import { DialogueLine as DialogueLineComponent } from './components/DialogueLine';
import { BookOpenIcon } from './components/IconComponents';
import type { DialogueLine } from './types';

type ActiveTab = 'dialogue' | 'sections';

const App: React.FC = () => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dialogue');
  
  const [dialogue, setDialogue] = useState<DialogueLine[]>([]);
  const [sections, setSections] = useState<Record<string, DialogueLine[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dialogueRes, sectionsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/dialogue`),
          fetch(`${API_BASE_URL}/api/survey/survey_2025_09`),
        ]);

        if (!dialogueRes.ok || !sectionsRes.ok) {
          throw new Error('Failed to fetch data from the server.');
        }

        const dialogueData: DialogueLine[] = await dialogueRes.json();
        const surveyData: { sections: Record<string, DialogueLine[]> } = await sectionsRes.json();

        // The API returns audioSrc like "/audio/filename.wav", we need to prepend the base URL
        const addBaseUrl = (line: DialogueLine): DialogueLine => ({
            ...line,
            audioSrc: `${API_BASE_URL}${line.audioSrc}`
        });

        setDialogue(dialogueData.map(addBaseUrl));
        
        const sectionsWithFullUrl = Object.entries(surveyData.sections).reduce((acc, [key, lines]) => {
            acc[key] = lines.map(addBaseUrl);
            return acc;
        }, {} as Record<string, DialogueLine[]>);
        setSections(sectionsWithFullUrl);

      } catch (e) {
        if (e instanceof Error) {
            setError(`Could not load dialogue. Please check if the server is running. Error: ${e.message}`);
        } else {
            setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatSectionTitle = (key: string) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const renderContent = () => {
    if (loading) {
      return <div className="text-center p-10 text-slate-600 dark:text-slate-400">Loading dialogue...</div>;
    }

    if (error) {
      return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      );
    }

    if (activeTab === 'dialogue') {
      return (
        <div className="space-y-3">
          {dialogue.map((line) => (
            <div key={line.id}>
              {line.sectionKey === "greeting" && <span className="text-sm text-gray-400">[Greeting]</span>}
              <DialogueLineComponent
                line={line}
                isActive={activeLineId === line.id}
                onClick={() => setActiveLineId(line.id)}
              />
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === 'sections') {
      return (
        <div className="space-y-8">
          {Object.entries(sections).map(([sectionKey, lines]) => {
            // if (sectionKey === "greeting") return null; // bỏ qua greeting
            console.log("sectionKey:", sectionKey, "lines:", lines); // 👈 log ra console
            return (
              <section key={sectionKey}>
                <h2 className="text-2xl font-semibold mb-4">
                  {formatSectionTitle(sectionKey)}
                </h2>
                <div className="space-y-3">
                  {lines.map((line) => (
                    <DialogueLineComponent
                      key={line.id}
                      line={line}
                      isActive={activeLineId === line.id}
                      onClick={() => setActiveLineId(line.id)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      );
    }

    return null;
  };

  const TabButton: React.FC<{ tabId: ActiveTab; label: string }> = ({ tabId, label }) => {
    const isActive = activeTab === tabId;
    const activeClasses = 'bg-blue-500 text-white shadow-sm';
    const inactiveClasses = 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700';
    return (
      <button
        onClick={() => setActiveTab(tabId)}
        className={`w-full px-4 py-2 font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${isActive ? activeClasses : inactiveClasses}`}
        aria-pressed={isActive}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <BookOpenIcon className="w-10 h-10 text-blue-500" />
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Dialogue Practice
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Listen to each line, then record your own voice to practice.
          </p>
        </header>

        <div className="mb-8 grid grid-cols-2 gap-2 p-1 bg-slate-200 dark:bg-slate-700/50 rounded-lg">
          <TabButton tabId="dialogue" label="Full Dialogue" />
          <TabButton tabId="sections" label="By Section" />
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default App;
