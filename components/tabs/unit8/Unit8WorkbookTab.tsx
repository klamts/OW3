import React, { useState, useMemo, Fragment } from 'react';
import type { 
    Unit8WorkbookData, 
    Unit8WorkbookSection,
    Unit8WorkbookGrammar1Section,
    Unit8WorkbookVocabulary2Section,
    Unit8WorkbookGrammar2Section,
    Unit8WorkbookReadingSection,
    Unit8WorkbookWritingSection,
    Unit8WorkbookReviewSection,
    Unit8WorkbookVocabulary1Section,
    Unit8WorkbookSongSection
} from '../../../types';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';

// Import the newly created components
import { Vocabulary1Activities } from './workbook/Vocabulary1';
import { SongActivities } from './workbook/Song';
import { Grammar1Activities } from './workbook/Grammar1';
import { Vocabulary2Activities } from './workbook/Vocabulary2';
import { Grammar2Activities } from './workbook/Grammar2';
import { ReadingActivities } from './workbook/Reading';
import { WritingActivities } from './workbook/Writing';
import { ReviewActivities } from './workbook/Review';


// --- Main Tab Component ---
const getSectionGroupKey = (section: Unit8WorkbookSection): string => {
    const slug = section.slug;

    if (['look_and_write', 'read_and_circle'].includes(slug)) {
        return 'Vocabulary 1';
    }
    if (['listen_read_write', 'write_new_verse'].includes(slug)) {
        return 'Song';
    }
    if (['simple_past_regular_verbs', 'listen_and_write', 'read_and_match', 'write_verbs_past', 'read_and_write', 'what_did_you_do'].includes(slug)) {
        return 'Grammar 1';
    }
    if (['look_and_read_draw_lines', 'read_circle_best_answer'].includes(slug)) {
        return 'Vocabulary 2';
    }
    if (['simple_past_irregular_verbs', 'look_at_the_gray_words', 'read_and_write_complete_sentences', 'work_with_a_partner'].includes(slug)) {
        return 'Grammar 2';
    }
    if (['listen_and_read_workbook', 'weird_but_true_workbook', 'read_check_true_false_workbook', 'read_complete_chart_workbook', 'read_and_write_workbook'].includes(slug)) {
        return 'Reading';
    }
    if (['read_write_answer_questions', 'writing_answer_questions', 'write_about_a_parade'].includes(slug)) {
        return 'Writing';
    }
    if (['read_and_draw_workbook', 'listen_and_write_workbook', 'read_unscramble_write'].includes(slug)) {
        return 'Review';
    }

    return 'Unknown';
};

export const Unit8WorkbookTab: React.FC<{ data: Unit8WorkbookData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    const sectionsByKey = useMemo(() => {
        if (!data?.sections) return {};
        return data.sections.reduce((acc, section) => {
            const key = getSectionGroupKey(section);
            if (!acc[key]) acc[key] = [];
            acc[key].push(section);
            return acc;
        }, {} as Record<string, Unit8WorkbookSection[]>);
    }, [data]);

    if (!data || !data.sections || data.sections.length === 0) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No workbook content to display.</div>;
    }

    const sectionOrder: string[] = ['Vocabulary 1', 'Song', 'Grammar 1', 'Vocabulary 2', 'Grammar 2', 'Reading', 'Writing', 'Review'];

    const renderGroup = (key: string, sections: Unit8WorkbookSection[]) => {
        switch (key) {
            case 'Vocabulary 1': return <Vocabulary1Activities sections={sections as Unit8WorkbookVocabulary1Section[]} isTextVisible={isTextVisible} />;
            case 'Song': return <SongActivities sections={sections as Unit8WorkbookSongSection[]} isTextVisible={isTextVisible} />;
            case 'Grammar 1': return <Grammar1Activities sections={sections as Unit8WorkbookGrammar1Section[]} isTextVisible={isTextVisible} />;
            case 'Vocabulary 2': return <Vocabulary2Activities sections={sections as Unit8WorkbookVocabulary2Section[]} isTextVisible={isTextVisible} />;
            case 'Grammar 2': return <Grammar2Activities sections={sections as Unit8WorkbookGrammar2Section[]} isTextVisible={isTextVisible} />;
            case 'Reading': return <ReadingActivities sections={sections as Unit8WorkbookReadingSection[]} isTextVisible={isTextVisible} />;
            case 'Writing': return <WritingActivities sections={sections as Unit8WorkbookWritingSection[]} isTextVisible={isTextVisible} />;
            case 'Review': return <ReviewActivities sections={sections as Unit8WorkbookReviewSection[]} isTextVisible={isTextVisible} />;
            default: return <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">Component for '{key}' is not implemented yet.</div>;
        }
    };

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">{data.title}</h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                    title={isTextVisible ? "Hide text" : "Show text"}
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>
            
            {sectionOrder.map(key => {
                const sections = sectionsByKey[key];
                if (!sections || sections.length === 0) return null;
                
                return (
                    <section key={key}>
                        <h2 className="text-2xl font-bold mb-4 text-slate-700 dark:text-slate-300 capitalize">{key.toLowerCase()}</h2>
                        {renderGroup(key, sections)}
                    </section>
                );
            })}
        </div>
    );
};