
import React from 'react';
import type { Topic } from '../data/topics';
import { BookOpenIcon } from './IconComponents';

interface TopicsListProps {
  topics: Topic[];
  onSelectTopic: (topic: Topic) => void;
}

export const TopicsList: React.FC<TopicsListProps> = ({ topics, onSelectTopic }) => {
  return (
    <div className="space-y-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <BookOpenIcon className="w-10 h-10 text-blue-500" />
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Dialogue Practice
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Choose a unit to start practicing.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
                <button
                    key={topic.id}
                    onClick={() => onSelectTopic(topic)}
                    className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={topic.tabs.length === 0}
                >
                    <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">{topic.id.replace('unit', 'Unit ')}</h2>
                    <p className="text-lg mt-1 text-slate-800 dark:text-slate-200">{topic.title}</p>
                    {topic.tabs.length === 0 && (
                        <p className="text-xs italic mt-2 text-slate-400 dark:text-slate-500">Coming soon...</p>
                    )}
                </button>
            ))}
        </div>
    </div>
  );
};
