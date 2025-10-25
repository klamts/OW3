import React, { useState, useMemo, Fragment } from 'react';
import type {
    Unit7WorkbookData,
    Unit7WorkbookSection,
    Unit7Grammar1TableSection,
    Unit7Grammar1ListenWriteSection,
    Unit7Grammar1ListenMatchSection,
    Unit7Grammar1LookReadWriteSection,
    Unit7Grammar1WritePartnerSection,
    Unit7Vocab2ReadMatchSection,
    Unit7Vocab2LookReadWriteSection,
    Unit7WorkbookGrammar2TableSection,
    Unit7WorkbookGrammar2ReadWriteExerciseSection,
    Unit7WorkbookGrammar2YesNoSection,
    Unit7WorkbookGameTimeDialogueSection,
    Unit7WorkbookGameTimePuzzleSection,
    Unit7WorkbookGameTimeListenReadFastSection,
    Unit7WorkbookReadingPassageSection,
    Unit7WorkbookReadingFactSection,
    Unit7WorkbookReadingTrueFalseSection,
    Unit7WorkbookReadingChartSection,
    Unit7WorkbookReadingOpenQuestionsSection,
    Unit7WorkbookWritingReadWriteSection,
    Unit7WorkbookWritingTaskSection,
    Unit7MultipleChoiceSection,
    Unit7SongMatchSection,
    Unit7SongWriteVerseSection,
    Unit7ReviewFillBlanksSection,
    Unit7ReviewCheckTableSection
} from '../../../types';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { MultipleChoiceSectionComponent } from './workbook/Vocabulary1';
import { SongMatchSection, SongWriteVerseSectionComponent } from './workbook/Song';
import {
    Grammar1TableSectionComponent,
    Grammar1ListenWriteSectionComponent,
    Grammar1ListenMatchSectionComponent,
    Grammar1LookReadWriteSectionComponent,
    Grammar1WritePartnerSectionComponent
} from './workbook/Grammar1';
import { Vocab2ReadMatchSectionComponent, Vocab2LookReadWriteSectionComponent } from './workbook/Vocabulary2';
import { Grammar2Table, Grammar2ReadWrite, Grammar2YesNo } from './workbook/Grammar2';
import { GameTimeDialogue, GameTimePuzzle, GameTimeListenReadFast } from './workbook/GameTime';
import { ReadingPassage, WeirdButTrue, TrueFalseExercise, ChartCompletion, OpenQuestions } from './workbook/Reading';
import { WritingReadAndWrite, WritingTask } from './workbook/Writing';
import { ReviewFillBlanks, ReviewCheckTable } from './workbook/Review';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="mt-8 mb-4 pt-4 border-t-2 border-slate-300 dark:border-slate-700">
        <h2 className="text-2xl font-bold uppercase tracking-wider text-center text-blue-600 dark:text-blue-400">{title}</h2>
    </div>
);


export const Unit7WorkbookTab: React.FC<{ data: Unit7WorkbookData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    const sortedSections = useMemo(() => {
        if (!data?.sections) return [];

        // Master order of all slugs to enforce a definitive sequence.
        const slugOrder = [
          // Vocabulary 1
          'circle_the_best_answer',
          // Song
          'listen_song_match',
          'write_new_verse',
          // Grammar 1
          'grammar1_simple_past',
          'listen_and_write',
          'listen_and_match',
          'look_read_write',
          'write_questions_partner',
          // Vocabulary 2
          'vocabulary2_read_and_match',
          'vocabulary2_look_read_write',
          // Grammar 2
          'too_much_too_many',
          'enough',
          'read_write_too_enough',
          'read_write_yes_no',
          // Game Time!
          'work_with_partner',
          'do_word_puzzle',
          'listen_read_fast',
          // Reading
          'listen_and_read',
          'weird_but_true',
          'true_false',
          'complete_chart',
          'read_write_questions',
          // Writing
          'gabriela_tomatoes',
          'write_favorite_fruit_veg',
          // Unit 7 Review
          'fill_words',
          'good_health_check',
        ];

        return [...data.sections].sort((a, b) => {
            const indexA = slugOrder.indexOf(a.slug);
            const indexB = slugOrder.indexOf(b.slug);
            // If a slug is not in the order list, push it to the end.
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        });

    }, [data]);


    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No workbook content to display.</div>;
    }
    
    let lastSection = '';

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                    {data.title}
                </h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>
            
            {sortedSections.map((section, index) => {
                const showHeader = section.section !== lastSection;
                lastSection = section.section;
                const slug = section.slug;
                
                let componentToRender;
                switch (slug) {
                    case 'circle_the_best_answer':
                        componentToRender = <MultipleChoiceSectionComponent section={section as Unit7MultipleChoiceSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'listen_song_match':
                        componentToRender = <SongMatchSection section={section as Unit7SongMatchSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'write_new_verse':
                        componentToRender = <SongWriteVerseSectionComponent section={section as Unit7SongWriteVerseSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'grammar1_simple_past':
                        componentToRender = <Grammar1TableSectionComponent section={section as Unit7Grammar1TableSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'listen_and_write':
                        componentToRender = <Grammar1ListenWriteSectionComponent section={section as Unit7Grammar1ListenWriteSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'listen_and_match':
                        componentToRender = <Grammar1ListenMatchSectionComponent section={section as Unit7Grammar1ListenMatchSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'look_read_write':
                        componentToRender = <Grammar1LookReadWriteSectionComponent section={section as Unit7Grammar1LookReadWriteSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'write_questions_partner':
                        componentToRender = <Grammar1WritePartnerSectionComponent section={section as Unit7Grammar1WritePartnerSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'vocabulary2_read_and_match':
                        componentToRender = <Vocab2ReadMatchSectionComponent section={section as Unit7Vocab2ReadMatchSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'vocabulary2_look_read_write':
                        componentToRender = <Vocab2LookReadWriteSectionComponent section={section as Unit7Vocab2LookReadWriteSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'too_much_too_many':
                    case 'enough':
                        componentToRender = <Grammar2Table section={section as Unit7WorkbookGrammar2TableSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'read_write_too_enough':
                        componentToRender = <Grammar2ReadWrite section={section as Unit7WorkbookGrammar2ReadWriteExerciseSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'read_write_yes_no':
                        componentToRender = <Grammar2YesNo section={section as Unit7WorkbookGrammar2YesNoSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'work_with_partner':
                        componentToRender = <GameTimeDialogue section={section as Unit7WorkbookGameTimeDialogueSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'do_word_puzzle':
                        componentToRender = <GameTimePuzzle section={section as Unit7WorkbookGameTimePuzzleSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'listen_read_fast':
                        componentToRender = <GameTimeListenReadFast section={section as Unit7WorkbookGameTimeListenReadFastSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'listen_and_read':
                        componentToRender = <ReadingPassage section={section as Unit7WorkbookReadingPassageSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'weird_but_true':
                        componentToRender = <WeirdButTrue section={section as Unit7WorkbookReadingFactSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'true_false':
                        componentToRender = <TrueFalseExercise section={section as Unit7WorkbookReadingTrueFalseSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'complete_chart':
                        componentToRender = <ChartCompletion section={section as Unit7WorkbookReadingChartSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'read_write_questions':
                        componentToRender = <OpenQuestions section={section as Unit7WorkbookReadingOpenQuestionsSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'gabriela_tomatoes':
                        componentToRender = <WritingReadAndWrite section={section as Unit7WorkbookWritingReadWriteSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'write_favorite_fruit_veg':
                        componentToRender = <WritingTask section={section as Unit7WorkbookWritingTaskSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'fill_words':
                        componentToRender = <ReviewFillBlanks section={section as Unit7ReviewFillBlanksSection} isTextVisible={isTextVisible} />;
                        break;
                    case 'good_health_check':
                        componentToRender = <ReviewCheckTable section={section as Unit7ReviewCheckTableSection} isTextVisible={isTextVisible} />;
                        break;
                    default:
                        componentToRender = <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">Unhandled section slug: {slug}</div>;
                }
                
                return (
                    <Fragment key={index}>
                        {showHeader && <SectionHeader title={section.section} />}
                        {componentToRender}
                    </Fragment>
                );
            })}
        </div>
    );
};
