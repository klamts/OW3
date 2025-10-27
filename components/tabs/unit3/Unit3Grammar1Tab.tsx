import React, { useState } from "react";
import type { 
    Unit3Grammar1Data, 
    Unit3Grammar1TooForAgreeingSection,
    Unit3Grammar1ReadWriteSection,
    Unit3Grammar1ListenCheckSection,
    Unit3Grammar1LookWriteSection,
    Unit3Grammar1SpeakingSection
} from "../../../types";
import { EyeIcon, EyeOffIcon } from "../../IconComponents";
import { ActivityCard, AudioButton, CheckAndResetButtons, UserRecordingControls } from "../senses_workbook/shared";

// --- 1️⃣ Too/For Agreeing Section (Grammar) ---
const TooForAgreeing: React.FC<{ section: Unit3Grammar1TooForAgreeingSection; isTextVisible: boolean }> = ({ section, isTextVisible }) => (
  console.log(section),
  <section>
    <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
    {isTextVisible && <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{section.instruction}</p>}
    <div className="space-y-3">
      {section.examples.map((item, index) => (
        console.log(item),
        <div key={index} className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg shadow">
          <div className="flex-grow">
            {isTextVisible && (
              <>
                <p
                  dangerouslySetInnerHTML={{
                    __html: item.en.replace(
                      /\b(I do, too|I don't|does, too|doesn't)\b/gi,
                      '<strong class="text-blue-500 font-bold">$1</strong>'
                    ),
                  }}
                />
                <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-1">{item.sentence_vn}</p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: item.vi.replace(
                      /\b(Tôi cũng vậy|Tôi thì không|cũng vậy|thì không)\b/gi,
                      '<strong class="text-blue-500 font-bold">$1</strong>'
                    ),
                  }}
                />
                
              </>
            )}
          </div>
          <AudioButton src={item.audio} />
          <UserRecordingControls />
        </div>
      ))}
    </div>
  </section>
);

// --- 2️⃣ Read and Write Section ---
const ReadWriteSection: React.FC<{ section: Unit3Grammar1ReadWriteSection; isTextVisible: boolean }> = ({
  section,
  isTextVisible,
}) => {
  const [answers, setAnswers] = useState<string[]>(Array(section.questions.length).fill(""));
  const [checked, setChecked] = useState(false);

  // ✅ Cập nhật câu trả lời người dùng
  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // ✅ Reset toàn bộ
  const handleReset = () => {
    setAnswers(Array(section.questions.length).fill(""));
    setChecked(false);
  };

  return (
    <section>
      <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
        {section.section}
      </h3>
      <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
        {section.questions.map((q, i) => {
          const isCorrect =
            checked && answers[i].trim().toLowerCase() === q.answer.trim().toLowerCase();

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
              {isTextVisible && <p className="font-medium mb-1">{q.question}</p>}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={answers[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  placeholder="Write your answer..."
                  className="flex-grow mt-1 p-2 border rounded-md dark:bg-slate-700"
                />
                <AudioButton src={q.audio} />
                <UserRecordingControls></UserRecordingControls>
              </div>

              {/* ✅ Khi check rồi thì hiển thị đáp án */}
              {checked && (
                <p className="mt-2 text-sm italic text-slate-600 dark:text-slate-300">
                  ✅ Correct answer: <span className="font-semibold">{q.answer}</span>
                </p>
              )}
            </div>
          );
        })}

        {/* ✅ Nút Check và Reset */}
        <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
      </ActivityCard>
    </section>
  );
};

// --- 3️⃣ Listen and Check Section ---
const ListenCheckSection: React.FC<{ section: Unit3Grammar1ListenCheckSection; isTextVisible: boolean }> = ({ section, isTextVisible }) => {
  // Dùng state lưu bảng, có thể tick & reset
  const [tableData, setTableData] = useState(section.table.rows);
  const [checked, setChecked] = useState(false);

  // ✅ Hàm toggle checkbox
  const handleToggle = (rowIndex: number, colKey: string, isChecked: boolean) => {
    const newTable = [...tableData];
    newTable[rowIndex] = {
      ...newTable[rowIndex],
      [colKey]: isChecked ? "✓" : "",
    };
    setTableData(newTable);
  };

  // ✅ Hàm reset tất cả checkbox
  const handleReset = () => {
    const cleared = tableData.map(row => {
      const newRow: any = {};
      for (const key in row) newRow[key] = key === "Name" ? row[key] : "";
      return newRow;
    });
    setTableData(cleared);
    setChecked(false);
  };

  return (
    <section>
      <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
        {section.section}
      </h3>
      <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
        <AudioButton src={section.audio} />
        <div className="overflow-x-auto mt-4">
        {/* <p className="text-slate-700 dark:text-slate-300 mb-4" dangerouslySetInnerHTML={{ __html: section.instruction }}/> */}
          <table className="min-w-full text-sm text-left border-collapse border border-slate-300 dark:border-slate-700"  >
            <thead>
              <tr>
                {section.table.columns.map((col, i) => (
                  <th
                    key={i}
                    className="border border-slate-300 dark:border-slate-700 px-3 py-2 bg-slate-100 dark:bg-slate-700"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {tableData.map((row, i) => (
                <tr key={i}>
                  {section.table.columns.map((col, j) => (
                    <td
                      key={j}
                      className="border border-slate-300 dark:border-slate-700 px-3 py-2 text-center"
                    >
                      {col === "Name" ? (
                        row[col as keyof typeof row]
                      ) : (
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-sky-500 cursor-pointer"
                          checked={row[col as keyof typeof row] === "✓"}
                          onChange={(e) => handleToggle(i, col, e.target.checked)}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CheckAndResetButtons
          checked={checked}
          onCheck={() => setChecked(true)}
          onReset={handleReset}
        />
      </ActivityCard>
    </section>
  );
};

// --- 4️⃣ Look and Write Section ---
const LookWriteSection: React.FC<{ section: Unit3Grammar1LookWriteSection; isTextVisible: boolean }> = ({ section, isTextVisible }) => (
  console.log(section),
  <section>
    <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
    <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
      <p>{section.example.en}</p>
      <p>{section.example.vi}</p>
      {/* {section.example.map((ex, i) => (
        <div key={i} className="mb-4">
          {isTextVisible && (
            <>
              <p>{ex.example_en}</p>
              <p className="italic text-slate-500">{ex.example_vn}</p>
            </>
          )}
        </div>
      ))} */}
      {section.inputs.map((inp, i) => (
        <input
          key={i}
          placeholder={isTextVisible ? inp.placeholder : ""}
          className="w-full mb-2 p-2 border rounded-md dark:bg-slate-700"
        />
      ))}
    </ActivityCard>
  </section>
);

// --- 5️⃣ Speaking Section ---
const SpeakingSection: React.FC<{ section: Unit3Grammar1SpeakingSection; isTextVisible: boolean }> = ({ section, isTextVisible }) => (
  <section>
    <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
    <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
      {section.examples.map((ex, i) => (
        console.log(ex),
        <div key={i} className="mb-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center gap-3">
          <div className="flex-grow">
            {isTextVisible && (
              <>
                <p><strong>Q:</strong> {ex.question}</p>
                <p className="italic text-slate-500">{ex.question_vi}</p>
                <p><strong>A:</strong> {ex.answer}</p>
                <p className="italic text-slate-500">{ex.answer_vi}</p>
              </>
            )}
          </div>
          <AudioButton src={ex.audio_question} />
          <AudioButton src={ex.audio_answer} />
          <UserRecordingControls />
        </div>
      ))}
    </ActivityCard>
  </section>
);

// --- Main Component ---
export const Unit3Grammar1Tab: React.FC<{ data: Unit3Grammar1Data | null }> = ({ data }) => {
  const [isTextVisible, setIsTextVisible] = useState(true);

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
        switch (section.slug) {
          case "too_for_agreeing":
            return <TooForAgreeing key={index} section={section as Unit3Grammar1TooForAgreeingSection} isTextVisible={isTextVisible}  />;
          case "read_and_write":
            return <ReadWriteSection key={index} section={section as Unit3Grammar1ReadWriteSection} isTextVisible={isTextVisible} />;
          case "listen_and_check":
            return <ListenCheckSection key={index} section={section as Unit3Grammar1ListenCheckSection} isTextVisible={isTextVisible} />;
          case "look_and_write":
            return <LookWriteSection key={index} section={section as Unit3Grammar1LookWriteSection} isTextVisible={isTextVisible} />;
          case "talk_about_you":
            return <SpeakingSection key={index} section={section as Unit3Grammar1SpeakingSection} isTextVisible={isTextVisible} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
