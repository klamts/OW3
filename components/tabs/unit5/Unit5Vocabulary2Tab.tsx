import React, { useState, useMemo } from 'react';
import type { Unit5Data, AnimalHabitatsVocab2Section, DragDropSection, DragDropItem } from '../../../types';
import { VehicleCard } from '../../VehicleCard';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';

export const Unit5Vocabulary2Tab: React.FC<{ data: Unit5Data | null }> = ({ data }) => {
    console.log(data);
    const [activeCardId, setActiveCardId] = useState<string | null>(null);
    const [placedItems, setPlacedItems] = useState<Record<string, DragDropItem[]>>({});
    const [unplacedItems, setUnplacedItems] = useState<DragDropItem[]>([]);
    const [checked, setChecked] = useState(false);

    const vocabSection = data?.sections.find(s => s.slug === 'vocabulary2') as AnimalHabitatsVocab2Section | undefined;
    const dragDropSection = data?.sections.find(s => s.slug === 'drag_drop_animals') as DragDropSection | undefined;

    useMemo(() => {
        if (dragDropSection) {
            setUnplacedItems(dragDropSection.items);
            const initialPlaced: Record<string, DragDropItem[]> = {};
            dragDropSection.categories.forEach(cat => {
                initialPlaced[cat.key] = [];
            });
            setPlacedItems(initialPlaced);
        }
    }, [dragDropSection]);
    
    if (!vocabSection && !dragDropSection) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Vocabulary 2.</div>;
    }

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: DragDropItem) => {
        e.dataTransfer.setData("application/json", JSON.stringify(item));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, categoryKey: string) => {
        e.preventDefault();
        const item = JSON.parse(e.dataTransfer.getData("application/json")) as DragDropItem;

        setUnplacedItems(prev => prev.filter(i => i.word !== item.word));
        setPlacedItems(prev => {
            const newPlaced = { ...prev };
            // Remove from any other category first
            for (const key in newPlaced) {
                newPlaced[key] = newPlaced[key].filter(i => i.word !== item.word);
            }
            newPlaced[categoryKey] = [...newPlaced[categoryKey], item];
            return newPlaced;
        });
        
        // Play audio on correct drop
        if(item.correctCategory === categoryKey) {
            const audio = new Audio(item.audio_sentence);
            audio.play();
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleReset = () => {
        if (dragDropSection) {
            setUnplacedItems(dragDropSection.items);
            const initialPlaced: Record<string, DragDropItem[]> = {};
            dragDropSection.categories.forEach(cat => {
                initialPlaced[cat.key] = [];
            });
            setPlacedItems(initialPlaced);
        }
        setChecked(false);
    };

    return (
        <div className="space-y-12">
            {vocabSection && (
                <section>
                    <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200">{vocabSection.title}</h2>
                    <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{vocabSection.instruction}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vocabSection.content.map((item, index) => (
                             <VehicleCard
                                key={item.word}
                                vehicle={{
                                    id: `ah-vocab2-${index}`,
                                    word: item.word,
                                    meaning_vi: item.meaning,
                                    ipa: item.pronunciation,
                                    audioSrc: item.audio_word,
                                    imageSrc: item.image,
                                    example: { text: item.example, audioSrc: item.audio_example }
                                }}
                                isActive={activeCardId === `ah-vocab2-${index}`}
                                onClick={() => setActiveCardId(`ah-vocab2-${index}`)}
                                isTextVisible={true}
                            />
                        ))}
                    </div>
                </section>
            )}

            {dragDropSection && (
                <section>
                    <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200">{dragDropSection.title}</h2>
                    <ActivityCard title="" instruction={dragDropSection.instruction} isTextVisible={true}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {dragDropSection.categories.map(category => (
                                <div
                                    key={category.key}
                                    onDrop={(e) => handleDrop(e, category.key)}
                                    onDragOver={handleDragOver}
                                    className="p-3 bg-slate-200 dark:bg-slate-700 rounded-lg min-h-[200px] flex flex-col items-center"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <h4 className="font-bold text-center">{category.label}</h4>
                                        <AudioButton src={category.audio_intro} />
                                    </div>
                                    <div className="space-y-2 w-full">
                                        {(placedItems[category.key] || []).map(item => {
                                            const isCorrect = item.correctCategory === category.key;
                                            const borderClass = checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-transparent';
                                            return (
                                                <div key={item.word} className={`p-1 bg-white dark:bg-slate-800 rounded-md shadow-sm border-2 ${borderClass}`}>
                                                    <img src={item.image} alt={item.word} className="w-full h-16 object-cover rounded-sm" />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
                            <h4 className="font-semibold text-center mb-3">Drag the animals</h4>
                            <div className="flex flex-wrap justify-center gap-3">
                                {unplacedItems.map(item => (
                                    <div key={item.word} draggable onDragStart={(e) => handleDragStart(e, item)} className="w-20 h-20 p-1 bg-white dark:bg-slate-800 rounded-md shadow cursor-grab">
                                        <img src={item.image} alt={item.word} className="w-full h-full object-cover rounded-sm" />
                                    </div>
                                ))}
                                {unplacedItems.length === 0 && <p className="text-sm italic text-slate-500">All animals placed!</p>}
                            </div>
                        </div>

                        <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset}/>
                    </ActivityCard>
                </section>
            )}
        </div>
    );
};