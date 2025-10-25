import React, { useState } from 'react';
import type { Unit7Vocabulary1Data, Unit7VocabWordSection, Unit7ActionSection, Vehicle, DialogueLine } from '../../../types';
import { VehicleCard } from '../../VehicleCard';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard } from '../senses_workbook/shared';

export const Unit7Vocabulary1Tab: React.FC<{ data: Unit7Vocabulary1Data | null }> = ({ data }) => {
    const [activeCardId, setActiveCardId] = useState<string | null>(null);
    const [isTextVisible, setIsTextVisible] = useState(true);
    
    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 7 Vocabulary.</div>;
    }

    const vocabSection = data.sections.find(s => s.type === 'Words') as Unit7VocabWordSection | undefined;
    const activitySection = data.sections.find(s => s.type === 'Speaking and Action') as Unit7ActionSection | undefined;

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                 <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                    {data.title}
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
                    <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{vocabSection.section}</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {vocabSection.words.map((item, index) => {
                             const vehicleItem: Vehicle = {
                                id: `u7-vocab-${index}`,
                                word: item.word,
                                ipa: item.ipa,
                                meaning_vi: item.meaning_vn,
                                audioSrc: item.audio,
                                imageSrc: item.image,
                                example: { text: `${item.example}\n${item.example_vn}`, audioSrc: item.audio }
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
                    <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{activitySection.section}</h3>
                    <ActivityCard title="" instruction={activitySection.instruction} isTextVisible={isTextVisible}>
                         <div className="space-y-3">
                            {activitySection.sentences.map((item, index) => {
                                 const dialogueLine: DialogueLine = {
                                    id: `u7-action-${index}`,
                                    speaker: 'Instruction',
                                    text: item.sentence,
                                    meaning_vi: item.sentence_vn,
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