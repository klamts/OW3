import React, { useState } from 'react';
import type { Unit6Vocabulary1Data, Unit6VocabSection, Unit6ActivitySection, Vehicle, DialogueLine } from '../../../types';
import { VehicleCard } from '../../VehicleCard';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard } from '../senses_workbook/shared';

export const Unit6Vocabulary1Tab: React.FC<{ data: Unit6Vocabulary1Data | null }> = ({ data }) => {
    const [activeCardId, setActiveCardId] = useState<string | null>(null);
    const [isTextVisible, setIsTextVisible] = useState(true);
    
    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 6 Vocabulary.</div>;
    }

    const vocabSection = data.sections.find(s => s.section_name === 'Listen and Read') as Unit6VocabSection | undefined;
    const activitySection = data.sections.find(s => s.section_name === 'Say What You See') as Unit6ActivitySection | undefined;

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                 <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                    {data.unit}
                </h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                    title={isTextVisible ? "Hide text" : "Show text"}
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>

            {vocabSection && (
                <section>
                    <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{vocabSection.section_name}</h3>
                    <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{vocabSection.description}</p>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vocabSection.words.map((item, index) => {
                             const vehicleItem: Vehicle = {
                                id: `u6-vocab-${index}`,
                                word: item.word,
                                ipa: item.phonetic,
                                meaning_vi: item.meaning_vn,
                                audioSrc: item.audio,
                                imageSrc: item.image,
                            };
                            return (
                                <VehicleCard
                                    key={vehicleItem.id}
                                    vehicle={vehicleItem}
                                    isActive={activeCardId === vehicleItem.id}
                                    onClick={() => setActiveCardId(vehicleItem.id)}
                                    isTextVisible={isTextVisible}
                                />
                            );
                        })}
                    </div>
                </section>
            )}

            {activitySection && (
                <section>
                    <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{activitySection.section_name}</h3>
                    <ActivityCard title="" instruction={activitySection.instruction} isTextVisible={isTextVisible}>
                         <p className="text-xs italic text-slate-500 dark:text-slate-400 mb-4">{activitySection.audio_instruction}</p>
                         <div className="space-y-3">
                            {activitySection.examples.map((item, index) => {
                                 const dialogueLine: DialogueLine = {
                                    id: `u6-ex-${index}`,
                                    speaker: 'Example',
                                    text: item.text,
                                    audioSrc: item.audio,
                                };
                                return (
                                    <DialogueLineComponent
                                        key={dialogueLine.id}
                                        line={dialogueLine}
                                        isActive={activeCardId === dialogueLine.id}
                                        onClick={() => setActiveCardId(dialogueLine.id)}
                                        isTextVisible={isTextVisible}
                                    />
                                );
                            })}
                        </div>
                    </ActivityCard>
                </section>
            )}
        </div>
    );
};
