import React, { useState, useRef } from 'react';
import type { SpinWheelVocab, SpinWheelVocabItem } from '../../../../types';
import { ActivityCard, AudioButton, UserRecordingControls } from './shared';

const wheelColors = ['#f87171', '#fb923c', '#facc15', '#a3e635', '#4ade80', '#38bdf8', '#818cf8', '#c084fc'];

export const SpinWheel: React.FC<{ data: SpinWheelVocab; isTextVisible: boolean }> = ({ data, isTextVisible }) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [selectedItem, setSelectedItem] = useState<SpinWheelVocabItem | null>(null);

    const segmentDegrees = 360 / data.items.length;

    const spin = () => {
        if (isSpinning) return;
        setSelectedItem(null);
        setIsSpinning(true);

        const randomIndex = Math.floor(Math.random() * data.items.length);
        const baseRotation = rotation - (rotation % 360);
        
        // Calculate the target angle for the pointer to land in the middle of the segment
        const targetAngle = 360 - (randomIndex * segmentDegrees) - (segmentDegrees / 2);

        // Add multiple full spins for effect
        const randomSpins = 5 + Math.floor(Math.random() * 3);
        const finalRotation = baseRotation + (360 * randomSpins) + targetAngle;
        
        setRotation(finalRotation);

        // Corresponds to the 5s spin duration in CSS
        setTimeout(() => {
            setIsSpinning(false);
            setSelectedItem(data.items[randomIndex]);
        }, 5000); 
    };

    return (
        <ActivityCard title={data.activity} instruction="Click SPIN to see which vocabulary word you get!" isTextVisible={isTextVisible}>
            <div className="flex flex-col items-center gap-6">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 my-4">
                    {/* Pointer */}
                    <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 z-10" style={{
                        width: 0, height: 0,
                        borderLeft: '15px solid transparent',
                        borderRight: '15px solid transparent',
                        borderTop: '25px solid #1f2937'
                    }}></div>

                    {/* Wheel */}
                    <div
                        className="relative w-full h-full rounded-full overflow-hidden border-8 border-slate-200 dark:border-slate-700 shadow-xl transition-transform duration-[5000ms] ease-out"
                        style={{ transform: `rotate(${rotation}deg)` }}
                    >
                        {data.items.map((item, index) => (
                            <div
                                key={item.id}
                                className="absolute w-1/2 h-1/2 origin-bottom-right"
                                style={{
                                    transform: `rotate(${index * segmentDegrees}deg)`,
                                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)',
                                }}
                            >
                                <div
                                    className="absolute w-full h-full"
                                    style={{
                                        backgroundColor: wheelColors[index % wheelColors.length],
                                        transform: `rotate(${segmentDegrees}deg)`,
                                        clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                                        transformOrigin: 'top left',
                                    }}
                                >
                                     <div
                                        className="absolute w-full h-full flex items-start justify-center text-white font-bold text-sm sm:text-base pt-4"
                                        style={{ transform: `rotate(${-segmentDegrees/2}deg) `}}
                                    >
                                        <span className="transform -translate-y-2">{isTextVisible ? item.word : '?'}</span>
                                    </div>
                                </div>
                           </div>
                        ))}
                    </div>
                     <button
                        onClick={spin}
                        disabled={isSpinning}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white dark:bg-slate-800 rounded-full font-bold text-lg sm:text-xl text-blue-600 dark:text-blue-400 border-4 border-slate-200 dark:border-slate-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-inner transition-transform hover:scale-105"
                    >
                        SPIN
                    </button>
                </div>
                
                {/* Result Display */}
                {selectedItem && (
                    <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg w-full max-w-sm text-center animate-fade-in shadow-md">
                         <h4 className="text-2xl font-bold">{isTextVisible && selectedItem.word}</h4>
                         <img src={selectedItem.image} alt={selectedItem.word} className="w-40 h-40 object-cover rounded-lg my-3 mx-auto shadow-md" />
                         <div className="flex justify-center items-center gap-4">
                             <AudioButton src={selectedItem.audio} />
                             <UserRecordingControls />
                         </div>
                    </div>
                )}
            </div>
        </ActivityCard>
    );
};
