import React, { useState } from 'react';
import { DialogueLine as DialogueLineComponent } from '../DialogueLine';
import { VehicleCard } from '../VehicleCard';
import { ChevronLeftIcon, ChevronRightIcon } from '../IconComponents';
import type { DialogueLine, Vehicle } from '../../types';

interface CatchTheBusTabProps {
  reading: DialogueLine[];
  readingImage: string | null;
  vocabulary: Vehicle[];
}

export const CatchTheBusTab: React.FC<CatchTheBusTabProps> = ({ reading, readingImage, vocabulary }) => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [currentCatchTheBusIndex, setCurrentCatchTheBusIndex] = useState<number>(0);
  const [currentCatchTheBusVocabIndex, setCurrentCatchTheBusVocabIndex] = useState<number>(0);

  if (reading.length === 0 && vocabulary.length === 0) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content to display.</div>;
  }

  const totalLines = reading.length;
  const currentLine = reading[currentCatchTheBusIndex];

  const handlePrev = () => {
    if (currentCatchTheBusIndex > 0) {
      setCurrentCatchTheBusIndex(currentCatchTheBusIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentCatchTheBusIndex < totalLines - 1) {
      setCurrentCatchTheBusIndex(currentCatchTheBusIndex + 1);
    }
  };
  
  const totalVocabItems = vocabulary.length;
  const currentVocabItem = vocabulary[currentCatchTheBusVocabIndex];

  const handlePrevVocab = () => {
    if (currentCatchTheBusVocabIndex > 0) {
      setCurrentCatchTheBusVocabIndex(currentCatchTheBusVocabIndex - 1);
    }
  };
  const handleNextVocab = () => {
    if (currentCatchTheBusVocabIndex < totalVocabItems - 1) {
      setCurrentCatchTheBusVocabIndex(currentCatchTheBusVocabIndex + 1);
    }
  };

  const NavButton: React.FC<{onClick: () => void, disabled: boolean, children: React.ReactNode}> = ({ onClick, disabled, children }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
        {children}
    </button>
  );

  return (
    <div className="space-y-12">
        {/* Reading Section */}
        {reading.length > 0 && (
            <section>
                <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                    Reading Passage
                </h2>
                {readingImage && (
                    <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                        <img src={readingImage} alt="Bus in Curitiba" className="w-full h-auto object-cover" />
                    </div>
                )}
                {currentLine && (
                    <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                            <NavButton onClick={handlePrev} disabled={currentCatchTheBusIndex === 0}>
                                <ChevronLeftIcon className="w-6 h-6" />
                            </NavButton>
                            <div className="text-center">
                                <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                                    Catch the Bus in Curitiba
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {currentCatchTheBusIndex + 1} of {totalLines}
                                </p>
                            </div>
                            <NavButton onClick={handleNext} disabled={currentCatchTheBusIndex === totalLines - 1}>
                                <ChevronRightIcon className="w-6 h-6" />
                            </NavButton>
                        </div>

                        <DialogueLineComponent
                            key={currentLine.id}
                            line={currentLine}
                            isActive={activeLineId === currentLine.id}
                            onClick={() => setActiveLineId(currentLine.id)}
                            isTextVisible={true}
                        />
                    </div>
                )}
            </section>
        )}

        {/* Note Section */}
        <section>
            <div className="p-4 bg-teal-100/50 dark:bg-teal-900/20 border-l-4 border-teal-500 rounded-r-lg text-slate-700 dark:text-slate-300">
                <h3 className="font-bold text-lg text-teal-800 dark:text-teal-300 mb-2">Ghi chú: "Catch" vs "Take" a Bus</h3>
                <div className="space-y-3 text-sm">
                    <p>
                        <strong>"Catch a bus"</strong> (hoặc "catch the bus"): Thường nhấn mạnh vào hành động bắt kịp chuyến xe buýt, tức là đến điểm dừng xe buýt kịp lúc để lên xe trước khi xe chạy. Nó giống như bạn đang cố gắng "bắt" một vật gì đó, bạn cần nhanh nhẹn và đúng thời điểm.
                    </p>
                    <ul className="list-disc list-inside pl-4 space-y-1">
                        <li><strong>Ví dụ:</strong> "Hurry up, we need to catch the bus!" (Nhanh lên, chúng ta cần bắt xe buýt!)</li>
                        <li><strong>Ví dụ:</strong> "I missed the bus because I arrived too late." (Tôi lỡ xe buýt vì đến quá muộn.)</li>
                    </ul>
                    <p>
                        <strong>"Take a bus"</strong> (hoặc "take the bus"): Thường dùng để chỉ việc sử dụng xe buýt như một phương tiện di chuyển, bao gồm cả quá trình lên xe và đi trên xe. Nó mang nghĩa rộng hơn, bao quát cả chuyến đi.
                    </p>
                    <ul className="list-disc list-inside pl-4 space-y-1">
                        <li><strong>Ví dụ:</strong> "I usually take the bus to work." (Tôi thường đi xe buýt đến chỗ làm.)</li>
                        <li><strong>Ví dụ:</strong> "How did you get here?" "I took a bus." (Bạn đến đây bằng cách nào? Tôi đi xe buýt.)</li>
                    </ul>
                    <div className="pt-2 border-t border-teal-200 dark:border-teal-800">
                        <p className="font-semibold">Tóm lại:</p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                           <li><strong>Catch a bus:</strong> Tập trung vào việc lên xe kịp thời.</li>
                           <li><strong>Take a bus:</strong> Tập trung vào việc sử dụng xe buýt làm phương tiện di chuyển cho cả hành trình.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        {/* Vocabulary Section */}
        {vocabulary.length > 0 && (
            <section>
                <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                    Vocabulary
                </h2>
                {currentVocabItem && (
                     <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                            <NavButton onClick={handlePrevVocab} disabled={currentCatchTheBusVocabIndex === 0}>
                                <ChevronLeftIcon className="w-6 h-6" />
                            </NavButton>
                            <div className="text-center">
                                <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                                    Vocabulary
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {currentCatchTheBusVocabIndex + 1} of {totalVocabItems}
                                </p>
                            </div>
                            <NavButton onClick={handleNextVocab} disabled={currentCatchTheBusVocabIndex === totalVocabItems - 1}>
                                <ChevronRightIcon className="w-6 h-6" />
                            </NavButton>
                        </div>
                        <div className="max-w-sm mx-auto mt-4">
                            <VehicleCard
                                key={currentVocabItem.id}
                                vehicle={currentVocabItem}
                                isActive={activeLineId === currentVocabItem.id}
                                onClick={() => setActiveLineId(currentVocabItem.id)}
                                isTextVisible={true}
                            />
                        </div>
                    </div>
                )}
            </section>
        )}
    </div>
  );
};