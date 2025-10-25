import React, { useState, useEffect } from 'react';
import { DialogueLine as DialogueLineComponent } from '../DialogueLine';
import { ChevronLeftIcon, ChevronRightIcon } from '../IconComponents';
import type { DialogueLine } from '../../types';

interface TakeRideFlyTabProps {
  groupedTakeRideFlyLines: Record<string, DialogueLine[]>;
}

export const TakeRideFlyTab: React.FC<TakeRideFlyTabProps> = ({ groupedTakeRideFlyLines }) => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [activeTakeRideFlyCategory, setActiveTakeRideFlyCategory] = useState<string | null>(null);
  const [currentTakeRideFlyIndex, setCurrentTakeRideFlyIndex] = useState<number>(0);
  const [currentTakeNoteIndex, setCurrentTakeNoteIndex] = useState<number>(0);

  useEffect(() => {
    const takeRideFlyCategories = Object.keys(groupedTakeRideFlyLines);
    if (takeRideFlyCategories.length > 0 && !activeTakeRideFlyCategory) {
        setActiveTakeRideFlyCategory(takeRideFlyCategories[0]);
    }
  }, [groupedTakeRideFlyLines, activeTakeRideFlyCategory]);

  const formatSectionTitle = (key: string) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
  
  const takeNotesData = [
    {
      id: 1,
      title: '1. "I take the bus to school."',
      meaning: 'Ý nghĩa: "Tôi đi học bằng xe buýt."',
      usage_title: 'Cách dùng của "take":',
      usage_text: 'Ở đây, "take" được dùng để diễn tả hành động sử dụng một phương tiện giao thông cụ thể để di chuyển từ nơi này đến nơi khác. Nó có nghĩa là bạn lên, sử dụng, hoặc đi nhờ phương tiện đó.',
      structure_title: 'Cấu trúc phổ biến:',
      structure_text: 'take + a/an/the + phương tiện giao thông',
      explanation_title: 'Giải thích thêm:',
      explanation_text: 'Bạn đang chọn hoặc sử dụng một chiếc xe buýt (một phương tiện công cộng) như là cách thức để bạn đến trường. Các ví dụ khác tương tự: "I take the train," "I take a taxi," "I take a plane."',
    },
    {
      id: 2,
      title: '2. "I take my dog to the park."',
      meaning: 'Ý nghĩa: "Tôi dắt/mang con chó của tôi đến công viên."',
      usage_title: 'Cách dùng của "take":',
      usage_text: 'Trong trường hợp này, "take" mang nghĩa là mang theo, dẫn đi, hoặc đưa ai đó/cái gì đó đến một địa điểm. Bạn là người chủ động đưa con chó của mình đi cùng.',
      structure_title: 'Cấu trúc phổ biến:',
      structure_text: 'take + ai đó/cái gì đó + đến + địa điểm',
      explanation_title: 'Giải thích thêm:',
      explanation_text: 'Bạn không "lên" con chó để đi đâu cả, mà bạn đang chủ động di chuyển cùng với nó đến công viên. Các ví dụ khác: "He took his children to the beach." (Anh ấy đã đưa con cái của mình ra biển.), "Can you take this book to the library?" (Bạn có thể mang quyển sách này đến thư viện không?).',
    },
    {
      id: 3,
      title: '3. "It takes a long time."',
      meaning: 'Ý nghĩa: "Việc đó tốn/cần nhiều thời gian."',
      usage_title: 'Cách dùng của "take":',
      usage_text: 'Ở đây, "take" được dùng để diễn tả thời gian cần thiết để hoàn thành một hành động hoặc một việc gì đó. Nó nhấn mạnh sự tiêu tốn về thời gian.',
      structure_title: 'Cấu trúc phổ biến:',
      structure_text: 'It + takes + thời gian + (to do something)',
      explanation_title: 'Giải thích thêm:',
      explanation_text: 'Câu này không liên quan đến phương tiện hay việc di chuyển ai/cái gì. Nó đơn giản chỉ nói rằng một hành động (thường được ngụ ý hoặc nói rõ ở vế sau, ví dụ: "It takes a long time to learn a new language") đòi hỏi một khoảng thời gian đáng kể. Các ví dụ khác: "The journey took three hours." (Chuyến đi kéo dài ba tiếng.), "How long does it take to get there?" (Mất bao lâu để đến đó?).',
    },
  ];
    
  if (!activeTakeRideFlyCategory || Object.keys(groupedTakeRideFlyLines).length === 0) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content to display.</div>;
  }

  const handleCategoryChange = (category: string) => {
    setActiveTakeRideFlyCategory(category);
    setCurrentTakeRideFlyIndex(0);
  };

  const linesForCategory = groupedTakeRideFlyLines[activeTakeRideFlyCategory] || [];
  const currentLine = linesForCategory[currentTakeRideFlyIndex];
  const totalLines = linesForCategory.length;

  const handlePrev = () => {
    if (currentTakeRideFlyIndex > 0) {
      setCurrentTakeRideFlyIndex(currentTakeRideFlyIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentTakeRideFlyIndex < totalLines - 1) {
      setCurrentTakeRideFlyIndex(currentTakeRideFlyIndex + 1);
    }
  };
  
  const currentNote = takeNotesData[currentTakeNoteIndex];
  const handlePrevTakeNote = () => {
    if (currentTakeNoteIndex > 0) {
      setCurrentTakeNoteIndex(currentTakeNoteIndex - 1);
    }
  };
  const handleNextTakeNote = () => {
    if (currentTakeNoteIndex < takeNotesData.length - 1) {
      setCurrentTakeNoteIndex(currentTakeNoteIndex + 1);
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
    <div className="space-y-8">
      <div className="flex justify-center mb-6 p-1 bg-slate-200 dark:bg-slate-700/50 rounded-lg max-w-md mx-auto">
        {Object.keys(groupedTakeRideFlyLines).map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`w-1/3 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTakeRideFlyCategory === category ? 'bg-blue-500 text-white shadow' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-600/50'}`}
          >
            {formatSectionTitle(category)}
          </button>
        ))}
      </div>

      <div className="p-4 bg-blue-100/50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg text-slate-700 dark:text-slate-300">
        <h3 className="font-bold text-lg text-blue-800 dark:text-blue-300 mb-2">Phân biệt "Take" và "Ride"</h3>
        <div className="space-y-3">
          <p>
            <strong>"Take"</strong> mang nghĩa là sử dụng hoặc bắt một phương tiện nào đó để di chuyển. Nó có thể áp dụng cho hầu hết các phương tiện, bao gồm cả những phương tiện bạn không trực tiếp điều khiển (như bus, taxi, airplane).
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1 text-sm">
            <li><strong>Ví dụ:</strong> "I take the bus." (Tôi đi xe buýt.) - <em>Bạn không lái xe buýt.</em></li>
            <li><strong>Ví dụ:</strong> "I take a taxi." (Tôi đi taxi.) - <em>Bạn không lái taxi.</em></li>
          </ul>
          <p>
            <strong>"Ride"</strong> nhấn mạnh hành động ngồi lên và điều khiển phương tiện đó.
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1 text-sm">
            <li><strong>Ví dụ:</strong> "I ride a bicycle." (Tôi đạp xe đạp.) - <em>Bạn trực tiếp điều khiển xe.</em></li>
            <li><strong>Ví dụ:</strong> "I ride a motorcycle." (Tôi lái xe máy.) - <em>Bạn trực tiếp điều khiển xe máy.</em></li>
          </ul>
        </div>
      </div>
      
      <div className="p-4 bg-amber-100/50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-r-lg text-slate-700 dark:text-slate-300">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-300 dark:border-amber-700">
            <NavButton onClick={handlePrevTakeNote} disabled={currentTakeNoteIndex === 0}>
                <ChevronLeftIcon className="w-6 h-6" />
            </NavButton>
            <div className="text-center">
                <h3 className="font-bold text-lg text-amber-800 dark:text-amber-300">Ghi chú về "Take"</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    {currentTakeNoteIndex + 1} of {takeNotesData.length}
                </p>
            </div>
            <NavButton onClick={handleNextTakeNote} disabled={currentTakeNoteIndex === takeNotesData.length - 1}>
                <ChevronRightIcon className="w-6 h-6" />
            </NavButton>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold text-md">{currentNote.title}</h4>
          <p className="italic">{currentNote.meaning}</p>
          <p><strong>{currentNote.usage_title}</strong> {currentNote.usage_text}</p>
          <p><strong>{currentNote.structure_title}</strong> <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-md text-sm">{currentNote.structure_text}</code></p>
          <p><strong>{currentNote.explanation_title}</strong> {currentNote.explanation_text}</p>
        </div>
      </div>

      {currentLine ? (
        <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
            <NavButton onClick={handlePrev} disabled={currentTakeRideFlyIndex === 0}>
              <ChevronLeftIcon className="w-6 h-6" />
            </NavButton>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                {formatSectionTitle(activeTakeRideFlyCategory)}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {currentTakeRideFlyIndex + 1} of {totalLines}
              </p>
            </div>
            <NavButton onClick={handleNext} disabled={currentTakeRideFlyIndex === totalLines - 1}>
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
      ) : (
        <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content in this category.</div>
      )}
    </div>
  );
};