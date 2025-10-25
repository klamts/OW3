import React, { useState, useEffect } from 'react';
import type {
  Unit5Data,
  Unit5ReadWritePassageSection,
  Unit5GuidedWritingSection,
  Unit5GroupWorkSection
} from '../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons,UserRecordingControls } from '../senses_workbook/shared';

// Sub-component for Mounira's Animal
const MouniraAnimal: React.FC<{ section: Unit5ReadWritePassageSection }> = ({ section }) => {
    console.log(section);
    const [underlinedWords, setUnderlinedWords] = useState<Set<string>>(new Set());
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);

    const lastQuestion = section.questions[section.questions.length - 1];
    const imageOptions = lastQuestion?.images || [];
    const correctAnswer = "Crocodile";

    const toggleUnderline = (word: string, originalText: string) => {
        if (checked) return;
        const cleanedWord = word.replace(/[.,?!]/g, "");
        if(originalText.toLowerCase().includes(cleanedWord.toLowerCase())) {
            setUnderlinedWords(prev => {
                const next = new Set(prev);
                if (next.has(cleanedWord)) {
                    next.delete(cleanedWord);
                } else {
                    next.add(cleanedWord);
                }
                return next;
            });
        }
    };
    
    const renderTextWithUnderline = (text: string) => {
        return text.split(' ').map((word, i) => {
            const cleanedWord = word.replace(/[.,?!]/g, "");
            const isUnderlined = underlinedWords.has(cleanedWord);
            return (
                <span key={i} onClick={() => toggleUnderline(word, text)} className={`cursor-pointer ${isUnderlined ? 'underline decoration-blue-500 decoration-2' : ''}`}>
                    {word}{' '}
                </span>
            );
        });
    };

    const handleReset = () => {
        setUnderlinedWords(new Set());
        setSelectedImage(null);
        setChecked(false);
    };

    return (
        <section>
            <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}: {section.section}</h2>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg space-y-3">
                    {section.questions.slice(0, -1).map(q => (
                        <div key={q.id} className="flex items-start gap-2">
                             <div className="flex-grow">
                                <p className="text-lg">{renderTextWithUnderline(q.text)}</p>
                                <p className="text-sm italic text-slate-500">{q.vn}</p>
                            </div>
                            <AudioButton src={q.audio} />
                            <UserRecordingControls></UserRecordingControls>
                        </div>
                    ))}
                </div>
                <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-3">What is it? Choose the correct animal:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {imageOptions.map(img => {
                            const isSelected = selectedImage === img.name;
                            let ringClass = 'ring-transparent';
                            if (checked) {
                                if (img.name === correctAnswer) ringClass = 'ring-emerald-500';
                                else if (isSelected) ringClass = 'ring-red-500';
                            } else if (isSelected) {
                                ringClass = 'ring-blue-500';
                            }

                            return (
                                <div key={img.name} onClick={() => !checked && setSelectedImage(img.name)} className={`p-2 rounded-lg cursor-pointer transition-all ring-4 ${ringClass} bg-slate-50 dark:bg-slate-700/50`}>
                                    <img src={img.url} alt={img.name} className="w-full h-32 object-cover rounded-md mb-2"/>
                                    <p className="text-center font-semibold">{img.name}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} checkDisabled={!selectedImage} />
            </ActivityCard>
        </section>
    );
};

// Sub-component for Writing exercise
const WriteAboutAnimal: React.FC<{ section: Unit5GuidedWritingSection }> = ({ section }) => {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}: {section.section}</h2>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                <div className="space-y-4">
                    {section.questions.map(q => {
                        const parts = q.text.split('____');
                        return (
                            <div key={q.id} className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                                <div className="flex-grow flex flex-wrap items-baseline gap-2">
                                    <p>{parts[0]}</p>
                                    <input type="text" className="p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 border-slate-300 dark:border-slate-600 flex-grow min-w-[100px]" />
                                    {parts[1] && <p>{parts[1]}</p>}
                                </div>
                                <AudioButton src={q.audio} />
                                <UserRecordingControls></UserRecordingControls>
                            </div>
                        );
                    })}
                </div>
                 <textarea className="w-full mt-4 p-2 border rounded-md h-40 bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Or write your full story here..."></textarea>
            </ActivityCard>
        </section>
    );
};

// Sub-component for Group Work
const ShareWriting: React.FC<{ section: Unit5GroupWorkSection }> = ({ section }) => {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}: {section.section}</h2>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                 <div className="overflow-x-auto">
                    <table className="w-full min-w-max text-sm text-left">
                        <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-700">
                            <tr>
                                {section.chart.columns.map(col => <th key={col} className="px-4 py-2">{col}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {section.chart.rows.map((_, rowIndex) => (
                                <tr key={rowIndex} className="border-b dark:border-slate-700">
                                    {section.chart.columns.map(col => (
                                        <td key={`${rowIndex}-${col}`} className="px-1 py-1">
                                            <input type="text" className="w-full p-1 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm" />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </ActivityCard>
        </section>
    );
};

// Main Tab Component
export const Unit5WritingTab: React.FC<{ data: Unit5Data | null }> = ({ data }) => {
    console.log(data)
    const mouniraSection = data?.sections.find(s => s.slug === 'mounira_animal') as Unit5ReadWritePassageSection | undefined;
    const writeSection = data?.sections.find(s => s.slug === 'write_about_animal') as Unit5GuidedWritingSection | undefined;
    const shareSection = data?.sections.find(s => s.slug === 'share_your_writing') as Unit5GroupWorkSection | undefined;

    if (!mouniraSection && !writeSection && !shareSection) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No Writing content to display.</div>;
    }

    return (
        <div className="space-y-12">
            {mouniraSection && <MouniraAnimal section={mouniraSection} />}
            {writeSection && <WriteAboutAnimal section={writeSection} />}
            {shareSection && <ShareWriting section={shareSection} />}
        </div>
    );
};