import React, { useState } from "react";
import type {
  Unit3Grammar2Data,
  GrammarContent,
  ActivityContent,
  GameContent,
} from "../../../types";
import { EyeIcon, EyeOffIcon } from "../../IconComponents";
import { ActivityCard, AudioButton, CheckAndResetButtons, UserRecordingControls } from "../senses_workbook/shared";

/* 🧩 Unit 3 – Grammar 2 Tab */
// export const Unit3Grammar2Tab: React.FC<{ data: Unit3Grammar2Data; isTextVisible: boolean }> = ({
//   data,
//   isTextVisible,
// }) => {
//   if (!data) return null;

//   return (
//     <div className="space-y-8">
//       {data.sections.map((section, index) => {
//         console.log(section)
//         switch (section.type) {
//           case "Grammar":
//             return (
//               <ListenRepeatSection
//                 key={index}
//                 section={section as GrammarContent[]}
//                 instruction={section.instruction}
//                 isTextVisible={isTextVisible}
//               />
//             );
//           case "Activity":
//             return (
//               <LookAndCompleteSection
//                 key={index}
//                 section={section.content as ActivityContent[]}
//                 instruction={section.instruction}
//                 isTextVisible={isTextVisible}
//               />
//             );
//           case "Game":
//             return (
//               <PlayGameSection
//                 key={index}
//                 section={section.content as GameContent[]}
//                 instruction={section.instruction}
//                 isTextVisible={isTextVisible}
//               />
//             );
//           default:
//             return null;
//         }
//       })}
//     </div>
//   );
// };



// };
const ListenRepeatSection: React.FC<{ section: GrammarContent; isTextVisible: boolean }> = ({ section, isTextVisible }) => {
  return (
    <section>
      <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
      {isTextVisible && <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{section.instruction}</p>}

      <div className="space-y-3">
        {section.content.map((item, index) => {
          // tách từ "but" để highlight
          const highlightedSentence = item.sentence_en.split(/(but)/gi);

          return (
            <div key={index} className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg shadow">
              <div className="flex-grow">
                {isTextVisible && (
                  <>
                    <p>
                      {highlightedSentence.map((part, i) =>
                        part.toLowerCase() === "but" ? <strong key={i}>{part}</strong> : part
                      )}
                    </p>
                    <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-1">{item.sentence_vn}</p>
                    <p>{item.vi}</p>
                  </>
                )}
              </div>
              <AudioButton src={item.audio} />
              <UserRecordingControls />
            </div>
          );
        })}
      </div>
    </section>
  );
};


const LookAndCompleteSection: React.FC<{
  section: ActivityContent; // 👈 Đây là object, không phải mảng
  isTextVisible: boolean;
}> = ({ section, isTextVisible }) => {
  console.log(section);

  // ✅ Lấy mảng content ra để dễ dùng
  const content = section.content;
  const [answers, setAnswers] = useState<string[]>(Array(content.length).fill(""));
  const [checked, setChecked] = useState(false);

  const handleChange = (i: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[i] = value;
    setAnswers(newAnswers);
  };

  const handleReset = () => {
    setAnswers(Array(content.length).fill(""));
    setChecked(false);
  };

  return (
    <section>
      <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
        {section.section_name}
      </h3>

      <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
        {content.map((item, i) => {
          const isCorrect =
            checked && answers[i].trim().toLowerCase() === item.answer.trim().toLowerCase();

          return (
            <div
              key={i}
              className={`mb-4 p-3 rounded-lg shadow ${
                isCorrect
                  ? "bg-green-100 dark:bg-green-900/40 border border-green-400"
                  : checked
                  ? "bg-red-100 dark:bg-red-900/40 border border-red-400"
                  : "bg-slate-100 dark:bg-slate-800"
              }`}
            >
              <div className="grid grid-cols-2 gap-2 mb-2">
                <img src={item.image_left} alt="left" className="rounded-lg w-full h-32 object-cover" />
                <img src={item.image_right} alt="right" className="rounded-lg w-full h-32 object-cover" />
              </div>

              <p className="font-medium mb-1">{item.question}</p>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={answers[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  placeholder="Write your answer..."
                  className="flex-grow mt-1 p-2 border rounded-md dark:bg-slate-700"
                />
                <AudioButton src={item.audio_question} />
                <UserRecordingControls />
              </div>

              {checked && (
                <p className="mt-2 text-sm italic text-slate-600 dark:text-slate-300">
                  ✅ Correct answer: <strong>{item.answer}</strong>
                </p>
              )}
            </div>
          );
        })}

        <CheckAndResetButtons
          checked={checked}
          onCheck={() => setChecked(true)}
          onReset={handleReset}
        />
      </ActivityCard>
    </section>
  );
};


/* 🎮 3️⃣ Play a Game Section */
const PlayGameSection: React.FC<{
  section: GameContent[];
  instruction: string;
  isTextVisible: boolean;
}> = ({ section, instruction, isTextVisible }) => (
  console.log(section),
  <section>
    <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
      Play a Game
    </h3>
    <ActivityCard title="" instruction={instruction} isTextVisible={isTextVisible}>
      {section.content.map((item, i) => (
        <div key={i} className="space-y-4">
          {Object.values(item).map((ex, j) => (
            <div
              key={j}
              className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 flex flex-col gap-1"
            >
              <div className="flex items-center gap-2">
                <AudioButton src={ex.audio} />
                {isTextVisible && (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: ex.sentence.replace(
                        /but/gi,
                        (match) => `<strong>${match}</strong>`
                      ),
                    }}
                  />
                )}
              </div>
              {isTextVisible && (
                <p className="text-slate-500 italic">{ex.result}</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </ActivityCard>
  </section>
);
// --- Main Component ---
export const Unit3Grammar2Tab: React.FC<{ data: Unit3Grammar2Data | null }> = ({ data }) => {
  const [isTextVisible, setIsTextVisible] = useState(true);
    console.log(data)
  if (!data) {
    return <div className="text-center p-10">Loading Unit 3 Grammar...</div>;
  }

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

      {data.sections.map((section, index) => {
        console.log(section)
        switch (section.type) {
            
          case "Grammar":
            return <ListenRepeatSection key={index} section={section as GrammarContent} isTextVisible={isTextVisible}  />;
            
          case "Activity":
            return <LookAndCompleteSection key={index} section={section as ActivityContent} isTextVisible={isTextVisible} />;
          case "Game":
            return <PlayGameSection key={index} section={section as GameContent} isTextVisible={isTextVisible} />;
          
          default:
            return null;
        }
      })}
    </div>
  );
};