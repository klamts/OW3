
import React, { useState, useEffect } from 'react';
import type { Unit6GameData, Unit6GameItem } from '../../../types';
import { ActivityCard, AudioButton, UserRecordingControls } from '../senses_workbook/shared';

const Modal: React.FC<{ item: Unit6GameItem; onClose: () => void }> = ({ item, onClose }) => {
    const [userQuestion, setUserQuestion] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        // Close modal on escape key press
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
              onClose();
           }
        };
        window.addEventListener('keydown', handleEsc);
    
        return () => {
          window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-4"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{item.question_type}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">&times;</button>
                </div>

                <img src={item.image} alt="" className="w-full h-auto max-h-60 object-contain rounded-lg bg-slate-100 dark:bg-slate-700 p-2" />

                <div>
                    <label className="font-semibold text-slate-600 dark:text-slate-400">Your Question:</label>
                    <textarea 
                        value={userQuestion}
                        onChange={e => setUserQuestion(e.target.value)}
                        disabled={checked}
                        className="w-full mt-1 p-2 border-2 border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                    />
                </div>

                <div>
                    <label className="font-semibold text-slate-600 dark:text-slate-400">Your Answer:</label>
                    <textarea 
                        value={userAnswer}
                        onChange={e => setUserAnswer(e.target.value)}
                        disabled={checked}
                        className="w-full mt-1 p-2 border-2 border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                    />
                    <div className="mt-1">
                        <UserRecordingControls />
                    </div>
                </div>

                {checked && (
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg space-y-3 animate-fade-in">
                        <div>
                            <p className="font-bold text-emerald-800 dark:text-emerald-300">Correct Question:</p>
                            <div className="flex items-center justify-between">
                                <p className="italic">{item.question}</p>
                                <AudioButton src={item.audio_question} />
                            </div>
                        </div>
                        <div>
                            <p className="font-bold text-emerald-800 dark:text-emerald-300">Correct Answer:</p>
                            <div className="flex items-center justify-between">
                                <p className="italic">{item.answer}</p>
                                <AudioButton src={item.audio_answer} />
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <button onClick={onClose} className="px-4 py-2 text-sm rounded-md bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500">
                        {checked ? 'Close' : 'Cancel'}
                    </button>
                    {!checked && (
                         <button onClick={() => setChecked(true)} className="px-4 py-2 text-sm font-semibold rounded-md bg-blue-500 text-white hover:bg-blue-600">
                            Check Answer
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export const Unit6GameTab: React.FC<{ data: Unit6GameData | null }> = ({ data }) => {
    const [selectedItem, setSelectedItem] = useState<Unit6GameItem | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);

    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No game content to display.</div>;
    }

    const itemCount = data.items.length;
    const segmentDegrees = 360 / itemCount;

    const spin = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setSelectedItem(null);

        const randomIndex = Math.floor(Math.random() * itemCount);
        
        const currentRotationOffset = rotation % 360;
        
        // The pointer is at the top (points down), which corresponds to 270 degrees on the unit circle.
        // Item 0 starts at 0 degrees (right). To align item 0 with the pointer, we need to rotate it to the top.
        // The target angle for randomIndex is 270 degrees minus its original angle.
        const targetAngle = 270 - (randomIndex * segmentDegrees);

        // Add multiple full spins for visual effect
        const randomSpins = 5 + Math.floor(Math.random() * 4);
        const finalRotation = (rotation - currentRotationOffset) + (360 * randomSpins) + targetAngle;
        
        setRotation(finalRotation);

        // Corresponds to the 5s spin duration in CSS
        setTimeout(() => {
            setIsSpinning(false);
            setSelectedItem(data.items[randomIndex]);
        }, 5000); // 5s animation
    };

    const containerSize = 384; // Corresponds to sm:w-96, h-96
    const radius = containerSize / 2 - 50; // Radius for placing items

    return (
        <div>
            <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200 pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                {data.activity}
            </h2>
             <ActivityCard title="" instruction={data.instruction} isTextVisible={true}>
                <div className="flex justify-center items-center min-h-[450px] my-8 overflow-hidden">
                    <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                        {/* Pointer */}
                        <div 
                            className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-20"
                            style={{
                                width: 0, height: 0,
                                borderLeft: '15px solid transparent',
                                borderRight: '15px solid transparent',
                                borderTop: '25px solid #ef4444' // red-500
                            }}
                        />

                        {/* Rotating Wheel Container */}
                        <div
                            className="relative w-full h-full transition-transform duration-[5000ms] ease-out"
                            style={{ transform: `rotate(${rotation}deg)` }}
                        >
                            <div className="absolute inset-0 border-8 border-slate-200 dark:border-slate-700 rounded-full"></div>
                             {data.items.map((item, index) => {
                                 const itemAngleRad = ((index * segmentDegrees) - 90) * (Math.PI / 180); // -90 to start at top
                                 const x = (containerSize / 2) + radius * Math.cos(itemAngleRad);
                                 const y = (containerSize / 2) + radius * Math.sin(itemAngleRad);
                                return (
                                    <div
                                        key={item.id}
                                        className="absolute w-24 h-24 p-1 bg-white dark:bg-slate-800 rounded-full shadow-lg"
                                        style={{
                                            top: `${y}px`,
                                            left: `${x}px`,
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                    >
                                        <img src={item.image} alt="" className="w-full h-full object-cover rounded-full" />
                                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">{item.question_type}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        {/* Spin Button */}
                        <button
                            onClick={spin}
                            disabled={isSpinning}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white dark:bg-slate-800 rounded-full font-bold text-xl text-blue-600 dark:text-blue-400 border-4 border-slate-200 dark:border-slate-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-inner transition-transform hover:scale-105 z-10"
                        >
                            SPIN
                        </button>
                    </div>
                </div>
            </ActivityCard>
            
            {selectedItem && <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />}
        </div>
    );
};
