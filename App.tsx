

import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from './constants';
import { topics } from './data/topics';
import type { Topic } from './data/topics';
import { TopicsList } from './components/TopicsList';
import { TabsList } from './components/TabsList';
import { TabContent } from './components/TabContent';
import { ChevronLeftIcon } from './components/IconComponents';
// import { unit9Vocabulary1Data123 } from './data/unit9_vocabulary1';
import {unit9Vocabulary1DataTS,unit9Song1DataTS,unit9Grammar1DataTS,unit9Vocabulary2DataTS,unit9Grammar2DataTS,unit9ReadingDataTS,unit9WritingDataTS,unit9ExtendedReadingDataTS} from './data/Unit9_My_Weekend'// FIX: Corrected type imports for Unit 6, 7, and 8 data structures.
import {unit8Vocabulary1DataTS,unit8Grammar1DataTS,unit8Vocabulary2DataTS,unit8Grammar2DataTS,unit8ReadingDataTS,unit8WritingDataTS,unit8WorkbookVocabulary1DataTS,unit8WorkbookSongDataTS,unit8WorkbookGrammar1DataTS,unit8WorkbookVocabulary2DataTS,unit8WorkbookGrammar2DataTS,unit8WorkbookReadingDataTS,unit8WorkbookWritingDataTS,unit8WorkbookReviewDataTS,unit8GameDataTS} from './data/Unit8_Let-s_Celebrateuse'
import {unit7Vocabulary1DataTS,unit7Vocabulary2DataTS,unit7Grammar1DataTS,unit7GameDataTS,unit7Grammar2DataTS,unit7SongDataTS,unit7ReadingDataTS,unit7WritingDataTS,unit7ReviewDataTS,unit7WorkbookVocab1DataTS,unit7WorkbookSongDataTS,unit7WorkbookGrammar1DataTS,unit7WorkbookVocab2DataTS,unit7WorkbookGrammar2DataTS,unit7WorkbookGameTimeDataTS,unit7WorkbookReadingDataTS,unit7WorkbookWritingDataTS,unit7WorkbookReviewDataTS} from './data/Unit7_Feeling_Fit'
import {Unit6_What_Is_For_DinnerTS,unit6Vocabulary1DataTS,unit6SongDataTS,unit6Grammar1DataTS,unit6Vocabulary2DataTS,unit6Vocabulary3DataTS,unit6Grammar2DataTS,unit6ReadingDataTS,unit6WritingDataTS,unit6ExtendedReadingDataTS,unit6GameDataTS} from './data/Unit6_What_Is_For_Dinner'
// FIX: Imported missing types for Unit 6 writing examples.
import type {Unit5WorkbookFix,Unit5WorkbookVocabSection,Unit4SongData,Unit4Vocabulary1Data, ActiveTab, DialogueLine, Vehicle, InOnLine, LikeVehicleLine, TakeRideFlyLine, GrammarTooEither, VocabularyApiResponse, PracticeBike2ApiResponse, ProcessedPracticeBike2Item, PracticeBike2Item, PracticeBike2Sentence, ContrastApiResponse, SayFastApiResponse, ReadingApiResponse, ExampleVehicleApiResponse, ProcessedExampleVehicle, HotAirBalloonReadingApiResponse, HotAirBalloonVocabularyApiResponse, HotAirBalloonExercisesApiResponse, HotAirBalloonWeirdButTrueApiResponse, HotAirBalloonFilesApiResponse, CatchTheBusReadingApiResponse, CatchTheBusVocabularyApiResponse, CatchTheBusFilesApiResponse, TheLionAndTheMouseReadingApiResponse, TheLionAndTheMouseVocabularyApiResponse, TheLionAndTheMouseFilesApiResponse, TheLionAndTheMouseExercisesApiResponse, SensesDescribeGuess, SensesSong, SensesGrammar1, SensesVocabulary2, SensesGrammar2, SensesReading, SensesWriting, SensesWorkbook, Unit5Data, SpinTabData, AnimalHabitatsVocabSection, AnimalHabitatsQASection, AnimalHabitatsSongSection, AnimalHabitatsGrammar1Section, AnimalHabitatsQAItem, AnimalHabitatsGrammar1Example, AnimalHabitatsMatchSection, AnimalHabitatsMatchQuestion, AnimalHabitatsReadWriteSection, AnimalHabitatsReadWriteItem, AnimalHabitatsAskAnswerSection, AnimalHabitatsAskAnswerItem, AnimalHabitatsVocab2Section, DragDropSection, AnimalHabitatsGrammar2Section, ReadMatchSection, DiceSection, ListenReadSection, ReadCircleSection, ChartCompletionSection, SpeakingSection, Unit6Vocabulary1Data, Unit6SongData, Unit6GrammarData, Unit6Vocabulary2Data, Unit6Grammar2Data, Unit6ReadingData, Unit5WorkbookData, Unit6WritingData, Unit6ExtendedReadingData, Unit6GameData, Unit6WorkbookData, Unit5WorkbookVocab2Section, Unit6Vocabulary3Data, Unit7Vocabulary1Data, Unit7Vocabulary2Data, Unit6Song_ReadAndSingSection, Unit6Song_ActivitySection, Unit7Grammar1Data, Unit7GameData, Unit7Grammar2Data, Unit7SongData, Unit7ReadingData, Unit7WorkbookData, Unit7WritingData, Unit7ReviewData, Unit8Vocabulary1Data, Unit8Grammar1Data, Unit8Vocabulary2Data, Unit8Grammar2Data, Unit8ReadingData, Unit8WritingData, Unit8WorkbookData, Unit8WorkbookVocabulary1Data, Unit8WorkbookSongData, Unit8WorkbookGrammar1Data, Unit8WorkbookVocabulary2Data, Unit8WorkbookGrammar2Data, Unit8GameData, ListenReadFastGameContent, Unit8WorkbookReadingData, Unit8WorkbookWritingData, Unit8WorkbookReviewData, Unit6WritingExample, Unit6WritingCheckExample, Unit9Vocabulary1Data, Unit9SongData, Unit9Grammar1Data, Unit9Grammar1Data as Unit9Grammar1DataType, Unit9Vocabulary2Data,Unit9Grammar2Data,Unit9ReadingData,Unit9WritingData,Unit9ExtendedReadingData,Unit2Vocabulary1Data,Unit2SongData,Unit2Grammar1Data,Unit2Vocabulary2Data,Unit2Grammar2Data,Unit2ReadingData,Unit2WritingData,Unit1Vocabulary1Data,Unit1SongData,Unit1Grammar1Data,Unit1Vocabulary2Data,Unit1Grammar2Data,Unit1ReadingData,Unit1WritingData } from './types';
import {
    unit5Vocabulary1DataTS,
    unit5Grammar1DataTS,
    unit5SongDataTS,
    unit5Vocabulary2DataTS,
    unit5GrammarMatchDataTS,
    unit5Grammar2DataTS,
    unit5ReadingDataTS,
    unit5ReadWriteWhyDataTS,
    unit5AskAndAnswerDataTS,
    unit5RWritingDataTS,
    unit5WorkbookVocabSectionDataTS,
    unit5WorkbookSongSectionDataTS,
    unit5WorkbookGrammar1SectionDataTS,
    unit5WorkbookVocabulary2SectionDataTS,
    unit5WorkbookGrammar2SectionDataTS,
    unit5WorkbookGameTimePuzzleSectionDataTS
    
}
from './data/Unit5_Animal_Habitats';

import {unit4Vocabulary1DataTS,
        unit4SongDataTS,
        unit4Grammar1DataTS,
        unit4Vocabulary2DataTS,
        unit4Grammar2DataTS,
        unit4ReadingDataTS,
        unit4WritingDataTS,
        unit4GWorkbookCircleActivityDataTS,
        unit4GWorkbookListenWriteActivityDataTS,
        unit4GWorkbookmatchActivityActivityDataTS,
        unit4GWorkbooksongMatchActivityDataTS,
        unit4GWorkbookSongWriteActivityDataTS,
        unit4GWorkbookGrammar1ActivityDataTS,
        unit4GWorkbookGrammar1MatchActivityDataTS,
        unit4WorkbookUnscrambleSentencesActivityDataTS,
        unit4WorkbookReadWriteActivityDataTS,
        unit4WorkbookLookSmellTasteActivityDataTS,
        unit4vocabulary2ReadWriteActivityDataTS,
        unit4vocabulary2SortWordsActivityDataTS,
        unit4grammar2WasWereActivityDataTS,
        unit4grammar2LookMatchActivityDataTS,
        unit4grammar2ReadWriteActivityDataTS,
        unit4grammar2RolePlayActivityDataTS,
        unit4gameTimeCrosswordActivityDataTS,
        unit4WorkbooklookWriteActivityDataTS,
        unit4WorkbooklistenReadFastActivityDataTS,
        unit4WorkbookreadingStinkyAnimalsActivityDataTS,
        unit4WorkbookreadingTrueFalseActivityDataTS,
        unit4WorkbookreadingCompleteChartActivityDataTS,
        unit4WorkbookreadWriteTurtleActivityDataTS,
        unit4WorkbookreadWriteWinterActivityDataTS,
        unit4WorkbookreadChooseActivityDataTS,
        unit4WorkbookReadWriteFromBoxActivityDataTS,
        unit4WorkbookreadWriteSenseTableActivityDataTS,
        unit4SpinDataVocaActivityDataTS,
        unit4SpinDataToBeActivityDataTS,
        unit4SpinDataTasteActivityDataTS
} 
from './data/Unit4_Our_Senses'
// FIX: Added 'export' to the App component and changed the function definition to return JSX, resolving the component type error.
export const App: React.FC = () => {
  // New state for navigation
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedTabId, setSelectedTabId] = useState<ActiveTab | null>(null);

  // Log active tab on change
  useEffect(() => {
    if (selectedTabId) {
      console.log(`Active tab is now: ${selectedTabId}`);
    }
  }, [selectedTabId]);

  // All data state remains here
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [exampleVehicles, setExampleVehicles] = useState<ProcessedExampleVehicle[]>([]);
  const [groupedInOnLines, setGroupedInOnLines] = useState<Record<string, DialogueLine[]>>({});
  const [groupedLikeVehicleLines, setGroupedLikeVehicleLines] = useState<Record<string, DialogueLine[]>>({});
  const [groupedTakeRideFlyLines, setGroupedTakeRideFlyLines] = useState<Record<string, DialogueLine[]>>({});
  const [grammarTooData, setGrammarTooData] = useState<GrammarTooEither | null>(null);
  const [vocabulary2Items, setVocabulary2Items] = useState<Vehicle[]>([]);
  const [dialogue, setDialogue] = useState<DialogueLine[]>([]);
  const [sections, setSections] = useState<Record<string, DialogueLine[]>>({});
  const [transportPhrases, setTransportPhrases] = useState<DialogueLine[]>([]);
  const [byPhrases, setByPhrases] = useState<DialogueLine[]>([]);
  const [bikePhrases, setBikePhrases] = useState<DialogueLine[]>([]);
  const [practiceBikePhrases, setPracticeBikePhrases] = useState<DialogueLine[]>([]);
  const [practiceBike2Items, setPracticeBike2Items] = useState<ProcessedPracticeBike2Item[]>([]);
  const [contrastPhrases, setContrastPhrases] = useState<DialogueLine[]>([]);
  const [sayFastPhrases, setSayFastPhrases] = useState<DialogueLine[]>([]);
  const [readingPhrases, setReadingPhrases] = useState<DialogueLine[]>([]);
  const [hotAirBalloonsReading, setHotAirBalloonsReading] = useState<DialogueLine[]>([]);
  const [hotAirBalloonsReadingImage, setHotAirBalloonsReadingImage] = useState<string | null>(null);
  const [hotAirBalloonsVocabulary, setHotAirBalloonsVocabulary] = useState<Vehicle[]>([]);
  const [hotAirBalloonsExercises, setHotAirBalloonsExercises] = useState<HotAirBalloonExercisesApiResponse | null>(null);
  const [hotAirBalloonsWeirdButTrue, setHotAirBalloonsWeirdButTrue] = useState<HotAirBalloonWeirdButTrueApiResponse | null>(null);
  const [catchTheBusReading, setCatchTheBusReading] = useState<DialogueLine[]>([]);
  const [catchTheBusReadingImage, setCatchTheBusReadingImage] = useState<string | null>(null);
  const [catchTheBusVocabulary, setCatchTheBusVocabulary] = useState<Vehicle[]>([]);
  const [theLionAndTheMouseReading, setTheLionAndTheMouseReading] = useState<DialogueLine[]>([]);
  const [theLionAndTheMouseReadingImage, setTheLionAndTheMouseReadingImage] = useState<string | null>(null);
  const [theLionAndTheMouseVocabulary, setTheLionAndTheMouseVocabulary] = useState<Vehicle[]>([]);
  const [theLionAndTheMouseExercises, setTheLionAndTheMouseExercises] = useState<TheLionAndTheMouseExercisesApiResponse | null>(null);
//   const [sensesVocabulary1, setSensesVocabulary1] = useState<Vehicle[]>([]);
//   const [sensesDescribeGuess, setSensesDescribeGuess] = useState<SensesDescribeGuess | null>(null);
  const [unit4Vocabulary1Data, setUnit4Vocabulary1Data] = useState<Unit4Vocabulary1Data | null>(null);
  const [unit4SongData, setUnit4SongData] = useState<Unit4SongData | null>(null);
  const [unit4Grammar1Data, setUnit4Grammar1Data] = useState<SensesGrammar1 | null>(null);
  const [unit4Vocabulary2Data, setUnit4Vocabulary2Data] = useState<SensesVocabulary2 | null>(null);
  const [unit4Grammar2Data, setunit4Grammar2Data] = useState<SensesGrammar2 | null>(null);
  const [unit4ReadingData, setUnit4ReadingData] = useState<SensesReading | null>(null);
  const [unit4WritingData, setUnit4WritingData] = useState<SensesWriting | null>(null);
  const [sensesWorkbook, setSensesWorkbook] = useState<SensesWorkbook | null>(null);
  const [sensesSpinData, setSensesSpinData] = useState<SpinTabData | null>(null);
  const [sensesSpinDataToBe, setSensesSpinDataToBe] = useState<SpinTabData | null>(null);
  const [sensesSpinDataTaste, setSensesSpinDataTaste] = useState<SpinTabData | null>(null);
  const [unit1Vocabulary1Data, setUnit1Vocabulary1Data] = useState<Unit1Vocabulary1Data | null>(null);
  const [unit1SongData, setUnit1SongData] = useState<Unit1SongData | null>(null);
  const [unit1Grammar1Data, setUnit1Grammar1Data] = useState<Unit1Grammar1Data | null>(null);
  const [unit1Vocabulary2Data, setUnit1Vocabulary2Data] = useState<Unit1Vocabulary2Data | null>(null);
  const [unit1Grammar2Data, setUnit1Grammar2Data] = useState<Unit1Grammar2Data | null>(null);
  const [unit1ReadingData, setUnit1ReadingData] = useState<Unit1ReadingData | null>(null);
  const [unit1WritingData, setUnit1WritingData] = useState<Unit1WritingData | null>(null);
  const [unit2Vocabulary1Data, setUnit2Vocabulary1Data] = useState<Unit2Vocabulary1Data | null>(null);  
  const [unit2SongData, setUnit2SongData] = useState<Unit2SongData | null>(null);
  const [unit2Grammar1Data, setUnit2Grammar1Data] = useState<Unit2Grammar1Data | null>(null);
  const [unit2Vocabulary2Data, setUnit2Vocabulary2Data] = useState<Unit2Vocabulary2Data | null>(null);
  const [unit2Grammar2Data, setUnit2Grammar2Data] = useState<Unit2Grammar2Data | null>(null); 
  const [unit2ReadingData, setUnit2ReadingData] = useState<Unit2ReadingData | null>(null);
  const [unit2WritingData, setUnit2WritingData] = useState<Unit2WritingData | null>(null); 
  const [unit5Vocabulary1Data, setUnit5Vocab1Data] = useState<AnimalHabitatsVocabSection | null>(null);
  const [unit5Grammar1Data, setUnit5Grammar1Data] = useState<Unit5Data | null>(null);
  const [unit5SongData, setUnit5SongData] = useState<Unit5Data | null>(null);
  const [unit5Vocabulary2Data, setUnit5Vocabulary2Data] = useState<Unit5Data | null>(null);  
  const [unit5GrammarMatchData, setUnit5GrammarMatchData] = useState<Unit5Data | null>(null);
  const [unit5Grammar2Data, setUnit5Grammar2Data] = useState<Unit5Data | null>(null);
  const [unit5ReadingData, setUnit5ReadingData] = useState<Unit5Data | null>(null);
  const [unit5ReadWriteWhyData, setUnit5ReadWriteWhyData] = useState<Unit5Data | null>(null);
  const [unit5AskAndAnswerData, setUnit5AskAndAnswerData] = useState<Unit5Data | null>(null);
  const [unit5WritingData, setUnit5WritingData] = useState<Unit5Data | null>(null);
  const [unit5Data, setUnit5Data] = useState<Unit5Data | null>(null);
  const [unit5WorkbookData, setUnit5WorkbookData] = useState<Unit5WorkbookData | null>(null);
  const [unit5WorkbookFixData, setUnit5WorkbookFixData] = useState<Unit5WorkbookFix | null>(null);
  const [unit6Data, setUnit6Data] = useState<Unit6Vocabulary1Data | null>(null);
  const [unit6SongData, setUnit6SongData] = useState<Unit6SongData | null>(null);
  const [unit6GrammarData, setUnit6GrammarData] = useState<Unit6GrammarData | null>(null);
  const [unit6Vocab2Data, setUnit6Vocab2Data] = useState<Unit6Vocabulary2Data | null>(null);
  const [unit6Vocab3Data, setUnit6Vocab3Data] = useState<Unit6Vocabulary3Data | null>(null);
  const [unit6Grammar2Data, setUnit6Grammar2Data] = useState<Unit6Grammar2Data | null>(null);
  const [unit6ReadingData, setUnit6ReadingData] = useState<Unit6ReadingData | null>(null);
  const [unit6WritingData, setUnit6WritingData] = useState<Unit6WritingData | null>(null);
  const [unit6ExtendedReadingData, setUnit6ExtendedReadingData] = useState<Unit6ExtendedReadingData | null>(null);
  const [unit6GameData, setUnit6GameData] = useState<Unit6GameData | null>(null);
  const [unit6WorkbookData, setUnit6WorkbookData] = useState<Unit6WorkbookData | null>(null);
  const [unit7Vocab1Data, setUnit7Vocab1Data] = useState<Unit7Vocabulary1Data | null>(null);
  const [unit7Vocab2Data, setUnit7Vocab2Data] = useState<Unit7Vocabulary2Data | null>(null);
  const [unit7Grammar1Data, setUnit7Grammar1Data] = useState<Unit7Grammar1Data | null>(null);
  const [unit7Grammar2Data, setUnit7Grammar2Data] = useState<Unit7Grammar2Data | null>(null);
  const [unit7GameData, setUnit7GameData] = useState<Unit7GameData | null>(null);
  const [unit7SongData, setUnit7SongData] = useState<Unit7SongData | null>(null);
  const [unit7ReadingData, setUnit7ReadingData] = useState<Unit7ReadingData | null>(null);
  const [unit7WorkbookData, setUnit7WorkbookData] = useState<Unit7WorkbookData | null>(null);
  const [unit7WritingData, setUnit7WritingData] = useState<Unit7WritingData | null>(null);
  const [unit7ReviewData, setUnit7ReviewData] = useState<Unit7ReviewData | null>(null);
  const [unit8Vocabulary1Data, setUnit8Vocabulary1Data] = useState<Unit8Vocabulary1Data | null>(null);
  const [unit8Grammar1Data, setUnit8Grammar1Data] = useState<Unit8Grammar1Data | null>(null);
  const [unit8Vocabulary2Data, setUnit8Vocabulary2Data] = useState<Unit8Vocabulary2Data | null>(null);
  const [unit8Grammar2Data, setUnit8Grammar2Data] = useState<Unit8Grammar2Data | null>(null);
  const [unit8ReadingData, setUnit8ReadingData] = useState<Unit8ReadingData | null>(null);
  const [unit8WritingData, setUnit8WritingData] = useState<Unit8WritingData | null>(null);
  const [unit8GameData, setUnit8GameData] = useState<Unit8GameData | null>(null);
  const [unit8WorkbookData, setUnit8WorkbookData] = useState<Unit8WorkbookData | null>(null);
  const [unit9Vocabulary1Data, setUnit9Vocabulary1Data] = useState<Unit9Vocabulary1Data | null>(null);
  const [unit9SongData, setUnit9SongData] = useState<Unit9SongData | null>(null);
  const [unit9Grammar1Data, setUnit9Grammar1Data] = useState<Unit9Grammar1DataType | null>(null);
  const [unit9Vocabulary2Data, setUnit9Vocabulary2Data] = useState<Unit9Vocabulary2Data | null>(null);
  const [unit9Grammar2Data,setUnit9Grammar2Data] = useState<Unit9Grammar2Data | null>(null);
  const [unit9ReadingData, setUnit9ReadingData] = useState<any>(null); // Placeholder for future use
  const [unit9WritingData, setUnit9WritingData] = useState<any>(null); // Placeholder for future use
  const [unit9ExtendedReadingData, setUnit9ExtendedReadingData] = useState<any>(null); // Placeholder for future use
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const apiEndpoints = [
            '/api/vehicles',
            '/api/example_vehicles',
            '/api/in_the_sky_on_land_on_water',
            '/api/like_vehicle',
            '/api/take_ride_fly',
            '/api/grammar/too_either',
            '/api/vocabulary/vocabulary_use_a_bike',
            '/api/dialogue',
            '/api/survey/survey_2025_09',
            '/api/means_of_transport/means_of_transport_2025_09',
            '/api/by_phuong_tien/by_phuong_tien_2025_09',
            '/api/how_to_use_a_bike/how_to_use_a_bike_2025_09',
            '/api/practice_to_use_a_bike/practice_to_use_a_bike_2025_09',
            '/api/practice/practice_to_use_a_bike_2',
            '/api/contrast/but_as_a_contrast',
            '/api/say_fast/say_fast',
            '/api/how_kids_school/how_kids_school',
            '/api/hot_air_balloon/reading',
            '/api/hot_air_balloon/vocabulary',
            '/api/hot_air_balloon/exercises',
            '/api/hot_air_balloon/weird_but_true',
            '/api/hot_air_balloon/files',
            '/api/catch_the_bus/reading',
            '/api/catch_the_bus/vocabulary',
            '/api/catch_the_bus/files',
            '/api/the_lion_and_the_mouse/reading',
            '/api/the_lion_and_the_mouse/vocabulary',
            '/api/the_lion_and_the_mouse/files',
            '/api/the_lion_and_the_mouse/exercises',
            '/api/unit4_our_senses/vocabulary',
            '/api/unit4_our_senses/song',
            '/api/unit4_our_senses/grammar1',
            '/api/unit4_our_senses/vocabulary2',
            '/api/unit4_our_senses/grammar2',
            '/api/unit4_our_senses/reading',
            '/api/unit4_our_senses/writing',
            '/api/unit4_our_senses/spin_tab_data',
            '/api/unit4_our_senses/spin_tab_data_tobe',
            '/api/unit4_our_senses/spin_tab_data_taste',
            // Workbook fetches
            '/api/unit4_our_senses/workbook/circle_activity',
            '/api/unit4_our_senses/workbook/listen_write',
            '/api/unit4_our_senses/workbook/match_activity',
            '/api/unit4_our_senses/workbook/song_match',
            '/api/unit4_our_senses/workbook/song_write',
            '/api/unit4_our_senses/workbook/grammar1',
            '/api/unit4_our_senses/workbook/grammar1_match',
            '/api/unit4_our_senses/workbook/unscramble_sentences',
            '/api/unit4_our_senses/workbook/read_write',
            '/api/unit4_our_senses/workbook/look_smell_taste',
            '/api/unit4_our_senses/workbook/vocabulary2_read_write',
            '/api/unit4_our_senses/workbook/vocabulary2_sort_words',
            '/api/unit4_our_senses/workbook/grammar2_was_were',
            '/api/unit4_our_senses/workbook/grammar2_look_match',
            '/api/unit4_our_senses/workbook/grammar2_read_write',
            '/api/unit4_our_senses/workbook/grammar2_role_play',
            '/api/unit4_our_senses/workbook/game_time_crossword',
            '/api/unit4_our_senses/workbook/look_write',
            '/api/unit4_our_senses/workbook/listen_read_fast',
            '/api/unit4_our_senses/workbook/reading_stinky_animals',
            '/api/unit4_our_senses/workbook/reading_true_false',
            '/api/unit4_our_senses/workbook/reading_complete_chart',
            '/api/unit4_our_senses/workbook/read_write_turtle',
            '/api/unit4_our_senses/workbook/read_write_winter',
            '/api/unit4_our_senses/workbook/read_choose',
            '/api/unit4_our_senses/workbook/read_write_box',
            '/api/unit4_our_senses/workbook/read_write_sense_table',
            // '/api/unit4_our_senses/workbook/final_test_listen_choose',
            '/api/unit4_our_senses/workbook/spin_wheel_vocab',
            '/api/unit/unit5_animal_habitats',
            '/api/unit/unit5_animal_habitats_workbook',
            // '/api/unit/unit6_what_is_for_dinner',
            // '/api/unit/unit6_lets_go_shopping_song',
            // '/api/unit/unit6_grammar_some_any',
            // '/api/unit/unit6_vocabulary_2',
            // '/api/unit/unit6_grammar_2',
            // '/api/unit/unit6_reading',
            // '/api/unit/unit6_writing',
            // '/api/unit/unit6_extended_reading',
            // '/api/unit/unit6_question_wheel',
            // '/api/unit/unit6_full_workbook',
            // '/api/unit/unit6_vocabulary_3',
            // '/api/unit/unit7_feeling_fit_vocab1',
            // '/api/unit/unit7_feeling_fit_vocab2',
            // '/api/unit/unit7_feeling_fit_grammar1',
            // '/api/unit/unit7_grammar2',
            // '/api/unit/unit7_question_wheel',
            // '/api/unit/unit7_song',
            // '/api/unit/unit7_reading',
            // '/api/unit/unit7_writing',
            // '/api/unit/unit7_review',
            // Unit 7 Workbook fetches
            // '/api/unit/workbook_vocabulary1',
            // '/api/unit/workbook_unit7_song',
            // '/api/unit/workbook_unit7_grammar1',
            // '/api/unit/workbook_unit7_vocabulary2',
            // '/api/unit/workbook_unit7_grammar2',
            // '/api/unit/workbook_unit7_gametime',
            // '/api/unit/workbook_unit7_reading',
            // '/api/unit/workbook_unit7_writing',
            // '/api/unit/workbook_unit7_review',
            // '/api/unit/unit8_vocabulary1',
            // '/api/unit/unit8_grammar1',
            // '/api/unit/unit8_vocabulary2',
            // '/api/unit/unit8_grammar2',
            // '/api/unit/unit8_reading',
            // '/api/unit/unit8_writing',
            // '/api/unit/unit8_game_time',
            // '/api/unit/unit8_workbook_vocabulary1',
            // '/api/unit/unit8_workbook_song',
            // '/api/unit/unit8_workbook_grammar1',
            // '/api/unit/unit8_workbook_vocabulary2',
            // '/api/unit/unit8_workbook_grammar2',
            // '/api/unit/unit8_workbook_reading',
            // '/api/unit/unit8_workbook_writing',
            // '/api/unit/unit8_workbook_review',
            // '/api/unit/unit9_vocabulary1',
            // '/api/unit/unit9_song',
            // '/api/unit/unit9_grammar1',
            // '/api/unit/unit9_vocabulary2',
            // '/api/unit/unit9_grammar2',
            // '/api/unit/unit9_reading',
            // '/api/unit/unit9_writing',
            // '/api/unit/unit9_extended_reading',
            '/api/unit/unit2_vocabulary1',
            '/api/unit/unit2_song',
            '/api/unit/unit2_grammar1',
            '/api/unit/unit2_vocabulary2',
            '/api/unit/unit2_grammar2',
            '/api/unit/unit2_reading',
            '/api/unit/unit2_writing',
            '/api/unit/unit1_vocabulary1',
            '/api/unit/unit1_song',
            '/api/unit/unit1_grammar1',
            '/api/unit/unit1_vocabulary2',
            '/api/unit/unit1_grammar2',
            '/api/unit/unit1_reading',
            '/api/unit/unit1_writing',
        ];

        // const [vehiclesRes, exampleVehiclesRes, inOnRes, likeVehicleRes, takeRideFlyRes, grammarTooRes, vocabulary2Res, dialogueRes, sectionsRes, transportRes, byRes, bikeRes, practiceBikeRes, practiceBike2Res, contrastRes, sayFastRes, readingRes, hotAirBalloonReadingRes, hotAirBalloonVocabularyRes, hotAirBalloonExercisesRes, hotAirBalloonWeirdButTrueRes, hotAirBalloonFilesRes, catchTheBusReadingRes, catchTheBusVocabularyRes, catchTheBusFilesRes, theLionAndTheMouseReadingRes, theLionAndTheMouseVocabularyRes, theLionAndTheMouseFilesRes, theLionAndTheMouseExercisesRes, sensesVocabulary1Res, sensesSongRes, sensesGrammar1Res, sensesVocabulary2Res, sensesGrammar2Res, sensesReadingRes, sensesWritingRes, sensesSpinDataRes, sensesSpinDataToBeRes, sensesSpinDataTasteRes, ...restResponses] = await Promise.all(
        //   apiEndpoints.map(url => fetch(`${API_BASE_URL}${url}`))
        // );
        // const unit1WritingRes = restResponses.pop();
        // const unit1ReadingRes = restResponses.pop();
        // const unit1Grammar2Res = restResponses.pop();
        // const unit1Vocabulary2Res = restResponses.pop();
        // const unit1Grammar1Res = restResponses.pop();
        // const unit1SongRes = restResponses.pop();
        // const unit1Vocabulary1Res = restResponses.pop();
        // const unit2WritingRes = restResponses.pop();
        // const unit2ReadingRes = restResponses.pop();
        // const unit2Grammar2Res = restResponses.pop();
        // const unit2Vocabulary2Res = restResponses.pop();
        // const unit2Grammar1Res = restResponses.pop();
        // const unit2SongRes = restResponses.pop();
        // const unit2Vocabulary1Res = restResponses.pop();
        // const unit9ExtendedReadingRes=restResponses.pop();
        // const unit9WritingRes=restResponses.pop();
        // const unit9ReadingRes=restResponses.pop();
        // const unit9Grammar2Res=restResponses.pop();
        // const unit9Vocabulary2Res = restResponses.pop();
        // const unit9Grammar1Res = restResponses.pop();
        // const unit9SongRes = restResponses.pop();
        // const unit9Vocabulary1Res = restResponses.pop();
        // const unit8WorkbookReviewRes = restResponses.pop();
        // const unit8WorkbookWritingRes = restResponses.pop();
        // const unit8WorkbookReadingRes = restResponses.pop();
        // const unit8WorkbookGrammar2Res = restResponses.pop();
        // const unit8WorkbookVocab2Res = restResponses.pop();
        // const unit8WorkbookGrammar1Res = restResponses.pop();
        // const unit8WorkbookSongRes = restResponses.pop();
        // const unit8WorkbookVocab1Res = restResponses.pop();
        // const unit8GameDataRes = restResponses.pop();
        // const unit8WritingRes = restResponses.pop();
        // const unit8ReadingRes = restResponses.pop();
        // const unit8Grammar2Res = restResponses.pop();
        // const unit8Vocab2Res = restResponses.pop();
        // const unit8Grammar1Res = restResponses.pop();
        // const unit8Vocab1Res = restResponses.pop();
        // const unit7WorkbookReviewRes = restResponses.pop();
        // const unit7WorkbookWritingRes = restResponses.pop();
        // const unit7WorkbookReadingRes = restResponses.pop();
        // const unit7WorkbookGameTimeRes = restResponses.pop();
        // const unit7WorkbookGrammar2Res = restResponses.pop();
        // const unit7WorkbookVocab2Res = restResponses.pop();
        // const unit7WorkbookGrammar1Res = restResponses.pop();
        // const unit7WorkbookSongRes = restResponses.pop();
        // const unit7WorkbookVocab1Res = restResponses.pop();
        // const unit7ReviewDataRes = restResponses.pop();
        // const unit7WritingDataRes = restResponses.pop();
        // const unit7ReadingDataRes = restResponses.pop();
        // const unit7SongDataRes = restResponses.pop();
        // const unit7GameDataRes = restResponses.pop();
        // const unit7Grammar2DataRes = restResponses.pop();
        // const unit7Grammar1DataRes = restResponses.pop();
        // const unit7Vocab2DataRes = restResponses.pop();
        // const unit7Vocab1DataRes = restResponses.pop();
        // const unit6Vocab3DataRes = restResponses.pop();
        // const unit6WorkbookDataRes = restResponses.pop();
        // const unit6GameDataRes = restResponses.pop();
        // const unit6ExtendedReadingDataRes = restResponses.pop();
        // const unit6WritingDataRes = restResponses.pop();
        // const unit6ReadingDataRes = restResponses.pop();
        // const unit6Grammar2DataRes = restResponses.pop();
        // const unit6Vocab2DataRes = restResponses.pop();
        // const unit6GrammarDataRes = restResponses.pop();
        // const unit6SongDataRes = restResponses.pop();
        // const unit6DataRes = restResponses.pop();
        // const unit5WorkbookDataRes = restResponses.pop();
        // const unit5DataRes = restResponses.pop();
        // const workbookResponses = restResponses;

        // const allResponses = [
        //     vehiclesRes, exampleVehiclesRes, inOnRes, likeVehicleRes, takeRideFlyRes, grammarTooRes,
        //     vocabulary2Res, dialogueRes, sectionsRes, transportRes, byRes, bikeRes, practiceBikeRes,
        //     practiceBike2Res, contrastRes, sayFastRes, readingRes, hotAirBalloonReadingRes,
        //     hotAirBalloonVocabularyRes, hotAirBalloonExercisesRes, hotAirBalloonWeirdButTrueRes,
        //     hotAirBalloonFilesRes, catchTheBusReadingRes, catchTheBusVocabularyRes, catchTheBusFilesRes,
        //     theLionAndTheMouseReadingRes, theLionAndTheMouseVocabularyRes, theLionAndTheMouseFilesRes,
        //     theLionAndTheMouseExercisesRes, sensesVocabulary1Res, sensesSongRes, sensesGrammar1Res,
        //     sensesVocabulary2Res, sensesGrammar2Res, sensesReadingRes, sensesWritingRes, sensesSpinDataRes, sensesSpinDataToBeRes, sensesSpinDataTasteRes,
        //     ...workbookResponses,
        //     unit5DataRes,
        //     unit5WorkbookDataRes,
        //     // unit6DataRes,
        //     // unit6SongDataRes,
        //     // unit6GrammarDataRes,
        //     // unit6Vocab2DataRes,
        //     // unit6Grammar2DataRes,
        //     // unit6ReadingDataRes,
        //     // unit6WritingDataRes,
        //     // unit6ExtendedReadingDataRes,
        //     // unit6GameDataRes,
        //     // unit6WorkbookDataRes,
        //     // unit6Vocab3DataRes,
        //     // unit7Vocab1DataRes,
        //     // unit7Vocab2DataRes,
        //     // unit7Grammar1DataRes,
        //     // unit7Grammar2DataRes,
        //     // unit7GameDataRes,
        //     // unit7SongDataRes,
        //     // unit7ReadingDataRes,
        //     // unit7WritingDataRes,
        //     // unit7ReviewDataRes,
        //     // unit7WorkbookVocab1Res,
        //     // unit7WorkbookSongRes,
        //     // unit7WorkbookGrammar1Res,
        //     // unit7WorkbookVocab2Res,
        //     // unit7WorkbookGrammar2Res,
        //     // unit7WorkbookGameTimeRes,
        //     // unit7WorkbookReadingRes,
        //     // unit7WorkbookWritingRes,
        //     // unit7WorkbookReviewRes,
        //     // unit8Vocab1Res,
        //     // unit8Grammar1Res,
        //     // unit8Vocab2Res,
        //     // unit8Grammar2Res,
        //     // unit8ReadingRes,
        //     // unit8WritingRes,
        //     // unit8GameDataRes,
        //     // unit8WorkbookVocab1Res,
        //     // unit8WorkbookSongRes,
        //     // unit8WorkbookGrammar1Res,
        //     // unit8WorkbookVocab2Res,
        //     // unit8WorkbookGrammar2Res,
        //     // unit8WorkbookReadingRes,
        //     // unit8WorkbookWritingRes,
        //     // unit8WorkbookReviewRes,
        //     // unit9Vocabulary1Res,
        //     // unit9SongRes,
        //     // unit9Grammar1Res,
        //     // unit9Vocabulary2Res,
        //     // unit9Grammar2Res,
        //     // unit9ReadingRes,
        //     // unit9WritingRes,
        //     // unit9ExtendedReadingRes,
        //     unit2Vocabulary1Res,
        //     unit2SongRes,
        //     unit2Grammar1Res,
        //     unit2Vocabulary2Res,
        //     unit2Grammar2Res,
        //     unit2ReadingRes,
        //     unit2WritingRes,
        //     unit1Vocabulary1Res,
        //     unit1SongRes,
        //     unit1Grammar1Res,
        //     unit1Vocabulary2Res,
        //     unit1Grammar2Res,
        //     unit1ReadingRes,
        //     unit1WritingRes,
        // ];
        // console.log(unit6WorkbookDataRes)
        // console.log('--- API Fetch Status ---');
        // allResponses.forEach((res, index) => {
        //     if (res) {
        //         console.log(`[${index + 1}] ${apiEndpoints[index]}: ${res.ok}`);
        //     }
        // });
        // console.log('------------------------');
        //console.log(unit9ReadingRes)
        //|| !sensesWritingRes.ok|| !sensesReadingRes.ok|| !sensesGrammar2Res.ok|| !sensesVocabulary2Res.ok|| !sensesSongRes.ok|| !sensesVocabulary1Res.ok || !unit6WorkbookDataRes.ok|||| !unit6DataRes.ok || !unit6SongDataRes.ok || !unit6GrammarDataRes.ok || !unit6Vocab2DataRes.ok || !unit6Grammar2DataRes.ok || !unit6ReadingDataRes.ok || !unit6WritingDataRes.ok || !unit6ExtendedReadingDataRes.ok || !unit6GameDataRes.ok || !unit6Vocab3DataRes.ok    || !unit7WorkbookVocab1Res.ok || !unit7WorkbookSongRes.ok || !unit7WorkbookGrammar1Res.ok || !unit7WorkbookVocab2Res.ok || !unit7WorkbookGrammar2Res.ok || !unit7WorkbookGameTimeRes.ok || !unit7WorkbookReadingRes.ok || !unit7WorkbookWritingRes.ok || !unit7WorkbookReviewRes.ok  !unit7Vocab1DataRes.ok || !unit7Vocab2DataRes.ok || !unit7Grammar1DataRes.ok || !unit7Grammar2DataRes.ok || !unit7GameDataRes.ok || !unit7SongDataRes.ok || !unit7ReadingDataRes.ok || !unit7WritingDataRes.ok || !unit7ReviewDataRes.ok|| !unit8GameDataRes.ok  || !unit8WorkbookSongRes.ok || !unit8WorkbookGrammar1Res.ok || !unit8WorkbookVocab2Res.ok || !unit8WorkbookGrammar2Res.ok || !unit8WorkbookReadingRes.ok || !unit8WorkbookWritingRes.ok || !unit8WorkbookReviewRes.ok  || !unit8WorkbookVocab1Res.ok|| workbookResponses.some(res => !res.ok) || !unit9Vocabulary1Res.ok || !unit9SongRes.ok || !unit9Grammar1Res.ok || !unit9Vocabulary2Res.ok || !unit8Vocab1Res.ok || !unit8Grammar1Res.ok || !unit8Vocab2Res.ok || !unit8Grammar2Res.ok || !unit8ReadingRes.ok || !unit8WritingRes.ok
        // if (!vehiclesRes.ok || !exampleVehiclesRes.ok || !inOnRes.ok || !likeVehicleRes.ok || !takeRideFlyRes.ok || !grammarTooRes.ok || !vocabulary2Res.ok || !dialogueRes.ok || !sectionsRes.ok || !transportRes.ok || !byRes.ok || !bikeRes.ok || !practiceBikeRes.ok || !practiceBike2Res.ok || !contrastRes.ok || !sayFastRes.ok || !readingRes.ok || !hotAirBalloonReadingRes.ok || !hotAirBalloonVocabularyRes.ok || !hotAirBalloonExercisesRes.ok || !hotAirBalloonWeirdButTrueRes.ok || !hotAirBalloonFilesRes.ok || !catchTheBusReadingRes.ok || !catchTheBusVocabularyRes.ok || !catchTheBusFilesRes.ok || !theLionAndTheMouseReadingRes.ok || !theLionAndTheMouseVocabularyRes.ok || !theLionAndTheMouseFilesRes.ok || !theLionAndTheMouseExercisesRes.ok  || !sensesGrammar1Res.ok     || !sensesSpinDataRes.ok || !sensesSpinDataToBeRes.ok || !sensesSpinDataTasteRes.ok || !unit5DataRes.ok || !unit5WorkbookDataRes.ok  ) {
        //   throw new Error('Failed to fetch all required data from the server.');
        // }

        // const rawVehiclesData: Vehicle[] = await vehiclesRes.json();
        // const rawExampleVehiclesData: ExampleVehicleApiResponse[] = await exampleVehiclesRes.json();
        // const rawInOnData: InOnLine[] = await inOnRes.json();
        // const rawLikeVehicleData: LikeVehicleLine[] = await likeVehicleRes.json();
        // const rawTakeRideFlyData: TakeRideFlyLine[] = await takeRideFlyRes.json();
        // const rawGrammarTooData: GrammarTooEither = await grammarTooRes.json();
        // const rawVocabulary2Data: VocabularyApiResponse = await vocabulary2Res.json();
        // const rawDialogueData: DialogueLine[] = await dialogueRes.json();
        // const rawSurveyData: { sections: Record<string, DialogueLine[]> } = await sectionsRes.json();
        // const rawTransportData: DialogueLine[] = await transportRes.json();
        // const rawByData: DialogueLine[] = await byRes.json();
        // const rawBikeData: DialogueLine[] = await bikeRes.json();
        // const rawPracticeBikeData: DialogueLine[] = await practiceBikeRes.json();
        // const rawPracticeBike2Data: PracticeBike2ApiResponse = await practiceBike2Res.json();
        // const rawContrastData: ContrastApiResponse = await contrastRes.json();
        // const rawSayFastData: SayFastApiResponse = await sayFastRes.json();
        // const rawReadingData: ReadingApiResponse = await readingRes.json();
        // const rawHotAirBalloonReadingData: HotAirBalloonReadingApiResponse[] = await hotAirBalloonReadingRes.json();
        // const rawHotAirBalloonVocabularyData: HotAirBalloonVocabularyApiResponse[] = await hotAirBalloonVocabularyRes.json();
        // const rawHotAirBalloonsExercisesData: any = await hotAirBalloonExercisesRes.json();
        // const rawHotAirBalloonsWeirdButTrueData: HotAirBalloonWeirdButTrueApiResponse = await hotAirBalloonWeirdButTrueRes.json();
        // const rawHotAirBalloonFilesData: HotAirBalloonFilesApiResponse = await hotAirBalloonFilesRes.json();
        // const rawCatchTheBusReadingData: CatchTheBusReadingApiResponse[] = await catchTheBusReadingRes.json();
        // const rawCatchTheBusVocabularyData: CatchTheBusVocabularyApiResponse[] = await catchTheBusVocabularyRes.json();
        // const rawCatchTheBusFilesData: CatchTheBusFilesApiResponse = await catchTheBusFilesRes.json();
        // const rawTheLionAndTheMouseReadingData: TheLionAndTheMouseReadingApiResponse[] = await theLionAndTheMouseReadingRes.json();
        // const rawTheLionAndTheMouseVocabularyData: TheLionAndTheMouseVocabularyApiResponse[] = await theLionAndTheMouseVocabularyRes.json();
        // const rawTheLionAndTheMouseFilesData: TheLionAndTheMouseFilesApiResponse = await theLionAndTheMouseFilesRes.json();
        // const rawTheLionAndTheMouseExercisesData: TheLionAndTheMouseExercisesApiResponse = await theLionAndTheMouseExercisesRes.json();
        const rawSensesVocabulary1Data=unit4Vocabulary1DataTS
        const rawSensesSongData=unit4SongDataTS
        const rawSensesGrammar1Data=unit4Grammar1DataTS
        const rawSensesVocabulary2Data=unit4Vocabulary2DataTS
        const rawSensesGrammar2Data=unit4Grammar2DataTS
        const rawSensesReadingData=unit4ReadingDataTS
        const rawSensesWritingData=unit4WritingDataTS
        const rawSensesSpinData= unit4SpinDataVocaActivityDataTS
        const rawSensesSpinDataToBe=unit4SpinDataToBeActivityDataTS
        const rawSensesSpinDataTaste=unit4SpinDataTasteActivityDataTS
        // const [ rawCircleActivity,rawListenWrite, rawMatchActivity, rawSongMatch, rawSongWrite, rawGrammar1, rawGrammar1Match, rawUnscrambleSentences, rawReadWrite, rawLookSmellTaste, rawVocabulary2ReadWrite, rawVocabulary2SortWords, rawGrammar2WasWere, rawGrammar2LookMatch, rawGrammar2ReadWrite, rawGrammar2RolePlay, rawGameTimeCrossword, rawLookWrite, rawListenReadFast, rawReadingStinkyAnimals, rawReadingTrueFalse, rawReadingCompleteChart, rawReadWriteTurtle, rawReadWriteWinter, rawReadChoose, rawReadWriteFromBox, rawReadWriteSenseTable, rawFinalTestListenChoose, rawSpinWheelVocab] = await Promise.all(workbookResponses.map(res => res.json()));
        
        // Fallback nếu fetch circleActivity lỗi
        const rawCircleActivitytest = unit4GWorkbookCircleActivityDataTS;
        const rawListenWritetest=unit4GWorkbookListenWriteActivityDataTS
        const rawMatchActivitytest=unit4GWorkbookmatchActivityActivityDataTS
        const rawSongMatchtest=unit4GWorkbooksongMatchActivityDataTS
        const rawSongWritetest=unit4GWorkbookSongWriteActivityDataTS
        const rawGrammar1test=unit4GWorkbookGrammar1ActivityDataTS
        const rawGrammar1Matchtest=unit4GWorkbookGrammar1MatchActivityDataTS
        const rawUnscrambleSentencestest=unit4WorkbookUnscrambleSentencesActivityDataTS
        const rawReadWritetest=unit4WorkbookReadWriteActivityDataTS
        const rawLookSmellTastetest=unit4WorkbookLookSmellTasteActivityDataTS
        const rawVocabulary2ReadWritetest=unit4vocabulary2ReadWriteActivityDataTS
        const rawVocabulary2SortWordstest=unit4vocabulary2SortWordsActivityDataTS
        const rawGrammar2WasWeretest=unit4grammar2WasWereActivityDataTS
        const rawGrammar2LookMatchtest=unit4grammar2LookMatchActivityDataTS
        const rawGrammar2ReadWritetest=unit4grammar2ReadWriteActivityDataTS
        const rawGrammar2RolePlaytest=unit4grammar2RolePlayActivityDataTS
        const rawGameTimeCrosswordtest=unit4gameTimeCrosswordActivityDataTS
        const rawLookWritetest=unit4WorkbooklookWriteActivityDataTS
        const rawListenReadFasttest=unit4WorkbooklistenReadFastActivityDataTS
        const rawReadingStinkyAnimalstest=unit4WorkbookreadingStinkyAnimalsActivityDataTS
        const rawReadingTrueFalsetest=unit4WorkbookreadingTrueFalseActivityDataTS
        const rawReadingCompleteCharttest=unit4WorkbookreadingCompleteChartActivityDataTS
        const rawReadWriteTurtletest=unit4WorkbookreadWriteTurtleActivityDataTS
        const rawReadWriteWintertest=unit4WorkbookreadWriteWinterActivityDataTS
        const rawReadChoosetest=unit4WorkbookreadChooseActivityDataTS
        const rawReadWriteFromBoxtest=unit4WorkbookReadWriteFromBoxActivityDataTS
        const rawReadWriteSenseTabletest=unit4WorkbookreadWriteSenseTableActivityDataTS
        const rawUnit5Vocabulary1Data=unit5Vocabulary1DataTS
        const rawUnit5Grammar1Data=unit5Grammar1DataTS
        const rawUnitSongData=unit5SongDataTS
        const rawUnit5Vocabulary2Data=unit5Vocabulary2DataTS
        // console.log(rawUnit5Vocabulary2Data)
        const rawUnit5GrammarMatchData= unit5GrammarMatchDataTS
        const rawUnit5Grammar2Data= unit5Grammar2DataTS
        const rawUnit5ReadingData= unit5ReadingDataTS
        const rawUnit5ReadWriteWhyData= unit5ReadWriteWhyDataTS
        const rawUnit5AskAndAnswerData= unit5AskAndAnswerDataTS
        const rawUnit5WritingData= unit5RWritingDataTS
        // const rawUnit5Data: Unit5Data = await unit5DataRes.json();
        // const rawUnit5WorkbookData: Unit5WorkbookData = await unit5WorkbookDataRes.json();
        const rawUnit5WorkbookVocabSectionData= unit5WorkbookVocabSectionDataTS
        const rawUnit5WorkbookSongSectionData= unit5WorkbookSongSectionDataTS  
        const rawUnit5WorkbookGrammar1SectionData= unit5WorkbookGrammar1SectionDataTS 
        const rawUnit5WorkbookVocabulary2SectionData= unit5WorkbookVocabulary2SectionDataTS 
        const rawUnit5WorkbookGrammar2SectionData= unit5WorkbookGrammar2SectionDataTS 
        const rawUnit5WorkbookGameTimePuzzleSectionData=unit5WorkbookGameTimePuzzleSectionDataTS
        const rawUnit6Data=unit6Vocabulary1DataTS
        const rawUnit6SongData=unit6SongDataTS
        const rawUnit6GrammarData=unit6Grammar1DataTS
        const rawUnit6Vocab2Data=unit6Vocabulary2DataTS
        const rawUnit6Grammar2Data=unit6Grammar2DataTS
        const rawUnit6ReadingData=unit6ReadingDataTS
        const rawUnit6WritingData=unit6WritingDataTS
        const rawUnit6ExtendedReadingData=unit6ExtendedReadingDataTS
        const rawUnit6GameData=unit6GameDataTS
        const rawUnit6WorkbookData=Unit6_What_Is_For_DinnerTS
        const rawUnit6Vocab3Data=unit6Vocabulary3DataTS
        const rawUnit7Vocab1Data=unit7Vocabulary1DataTS
        const rawUnit7Vocab2Data=unit7Vocabulary2DataTS
        const rawUnit7Grammar1Data=unit7Grammar1DataTS
        const rawUnit7Grammar2Data=unit7Grammar2DataTS
        const rawUnit7GameData=unit7GameDataTS
        const rawUnit7SongData=unit7SongDataTS
        const rawUnit7ReadingData=unit7ReadingDataTS
        const rawUnit7WorkbookVocab1Data=unit7WorkbookVocab1DataTS
        const rawUnit7WorkbookSongData=unit7WorkbookSongDataTS
        const rawUnit7WorkbookGrammar1Data=unit7WorkbookGrammar1DataTS
        const rawUnit7WorkbookVocab2Data=unit7WorkbookVocab2DataTS
        const rawUnit7WorkbookGrammar2Data=unit7WorkbookGrammar2DataTS
        const rawUnit7WorkbookGameTimeData=unit7WorkbookGameTimeDataTS
        const rawUnit7WorkbookReadingData =unit7WorkbookReadingDataTS
        const rawUnit7WorkbookWritingData=unit7WorkbookWritingDataTS
        const rawUnit7WorkbookReviewData = unit7WorkbookReviewDataTS
        const rawUnit7WritingData=unit7WritingDataTS
        const rawUnit7ReviewData=unit7ReviewDataTS
        const rawUnit8Vocabulary1Data = unit8Vocabulary1DataTS
        const rawUnit8Grammar1Data = unit8Grammar1DataTS
        const rawUnit8Vocabulary2Data= unit8Vocabulary2DataTS
        const rawUnit8Grammar2Data= unit8Grammar2DataTS
        const rawUnit8ReadingData= unit8ReadingDataTS        
        const rawUnit8WritingData = unit8WritingDataTS
        const rawUnit8GameData= unit8GameDataTS
        const rawUnit8WorkbookVocab1Data = unit8WorkbookVocabulary1DataTS
        const rawUnit8WorkbookSongData = unit8WorkbookSongDataTS
        const rawUnit8WorkbookGrammar1Data = unit8WorkbookGrammar1DataTS
        const rawUnit8WorkbookVocab2Data= unit8WorkbookVocabulary2DataTS
        const rawUnit8WorkbookGrammar2Data = unit8WorkbookGrammar2DataTS
        const rawUnit8WorkbookReadingData = unit8WorkbookReadingDataTS
        const rawUnit8WorkbookWritingData = unit8WorkbookWritingDataTS
        const rawUnit8WorkbookReviewData = unit8WorkbookReviewDataTS
        // const rawUnit9Vocabulary1Data: Unit9Vocabulary1Data = await unit9Vocabulary1Res.json();
        const rawunit9Vocabulary1DataTS =unit9Vocabulary1DataTS;
        // console.log(rawUnit9Vocabulary1Data);
        // console.log(rawunit9VocaTest);
        const rawUnit9SongDataTS =unit9Song1DataTS
        
        const rawUnit9Grammar1Data=unit9Grammar1DataTS
        const rawUnit9Vocabulary2Data=unit9Vocabulary2DataTS
        const rawUnit9Grammar2Data=unit9Grammar2DataTS
        const rawUnit9ReadingData=unit9ReadingDataTS // Placeholder for future use
        const rawUnit9WritingData=unit9WritingDataTS // Placeholder for future use
        const rawUnit9ExtendedReadingData=unit9ExtendedReadingDataTS // Placeholder for future use
        // const rawUnit2Vocabulary1Data: Unit2Vocabulary1Data = await unit2Vocabulary1Res.json();
        // const rawUnit2SongData: Unit2SongData = await unit2SongRes.json();
        // const rawUnit2Grammar1Data: Unit2Grammar1Data = await unit2Grammar1Res.json();
        // const rawUnit2Vocabulary2Data: Unit2Vocabulary2Data = await unit2Vocabulary2Res.json();
        // const rawUnit2Grammar2Data: Unit2Grammar2Data = await unit2Grammar2Res.json();
        // const rawUnit2ReadingData: Unit2ReadingData = await unit2ReadingRes.json();
        // const rawUnit2WritingData: Unit2WritingData = await unit2WritingRes.json();
        // const rawUnit1Vocabulary1Data: Unit1Vocabulary1Data = await unit1Vocabulary1Res.json();
        // const rawUnit1SongData: Unit1SongData = await unit1SongRes.json();
        // const rawUnit1Grammar1Data: Unit1Grammar1Data = await unit1Grammar1Res.json();
        // const rawUnit1Vocabulary2Data: Unit1Vocabulary2Data = await unit1Vocabulary2Res.json();
        // const rawUnit1Grammar2Data: Unit1Grammar2Data = await unit1Grammar2Res.json();
        // const rawUnit1ReadingData: Unit1ReadingData = await unit1ReadingRes.json();
        // const rawUnit1WritingData: Unit1WritingData = await unit1WritingRes.json();
        //console.log(rawUnit9ReadingData)
        // Create a base workbook object to merge into
        const rawUnit7WorkbookData: Unit7WorkbookData = {
            slug: 'unit7_workbook',
            title: 'Workbook – Unit 7',
            sections: []
        };

        const workbookDataSources = [
            rawUnit7WorkbookVocab1Data,
            rawUnit7WorkbookSongData,
            rawUnit7WorkbookGrammar1Data,
            rawUnit7WorkbookVocab2Data,
            rawUnit7WorkbookGrammar2Data,
            rawUnit7WorkbookGameTimeData,
            rawUnit7WorkbookReadingData,
            rawUnit7WorkbookWritingData,
            rawUnit7WorkbookReviewData,
        ];

        for (const source of workbookDataSources) {
            if (source && source.sections) {
                rawUnit7WorkbookData.sections.push(...source.sections);
            }
        }
        
        const processUrl = (url: string | undefined | null): string => {
            if (!url) return '';
            if (url.startsWith('http://') || url.startsWith('https://')) return url;
            const base = API_BASE_URL.replace(/\/$/, "");
            const path = url.startsWith('/') ? url : `/${url}`;
            return `${base}${path}`;
        };
        const processUnit4Vocabulary1Data = (data: Unit4Vocabulary1Data): Unit4Vocabulary1Data | null => {
                            if (!data || !data.sections) return null;

                            data.sections.forEach((section) => {
                                // Xử lý phần có mảng words
                                if ("words" in section && section.words) {
                                section.words.forEach((word) => {
                                    word.audio = processUrl(word.audio);
                                    word.image = processUrl(word.image);
                                });
                                }

                                // Xử lý phần có mảng items (describe guess)
                                if ("items" in section && section.items) {
                                section.items.forEach((item) => {
                                    item.image = processUrl(item.image);
                                    item.audio = processUrl(item.audio);

                                    // Nếu có example bên trong item
                                    if (item.example) {
                                    item.example.audio = processUrl(item.example.audio);
                                    }
                                });
                                }
                            });

                            return data;
                            };

// Gọi hàm xử lý dữ liệu
    setUnit4Vocabulary1Data(processUnit4Vocabulary1Data(rawSensesVocabulary1Data));
const processUnit4SongData = (data: Unit4SongData): Unit4SongData | null => {
                                console.log(data)
                            if (!data ) return null;

                            if(data.audio){
                                data.audio=processUrl(data.audio)
                            }

                            return data;
                            };

// Gọi hàm xử lý dữ liệu
    setUnit4SongData(processUnit4SongData(rawSensesSongData));
    // setSensesGrammar1(rawSensesGrammar1Data);
        console.log('rawSensesVocabulary1Data:', rawSensesSongData);
        console.log('processed:', processUnit4SongData(rawSensesSongData)); 
const processUnit4Grammar1Data = (data: SensesGrammar1): SensesGrammar1 | null => {
            if (!data ) return null;
            const processNode = (node: any) => {
                if (!node) return;
                if (Array.isArray(node)) {
                    node.forEach(processNode);
                } else if (typeof node === 'object' && node !== null) {
                    for (const key in node) {
                        if (Object.prototype.hasOwnProperty.call(node, key)) {
                            const value = node[key];
                            if (typeof value === 'string' && (key.includes('audio') || key.includes('image'))) {
                                node[key] = processUrl(value);
                            } else if (typeof value === 'object' && value !== null) {
                                processNode(value);
                            }
                        }
                    }
                }
            };
            processNode(data);
            return data;
        };
setUnit4Grammar1Data(processUnit4Grammar1Data(rawSensesGrammar1Data)); 
const processUnit4Vocabulary2Data = (data: SensesVocabulary2): SensesVocabulary2 | null => {
            if (!data ) return null;
            const processNode = (node: any) => {
                if (!node) return;
                if (Array.isArray(node)) {
                    node.forEach(processNode);
                } else if (typeof node === 'object' && node !== null) {
                    for (const key in node) {
                        if (Object.prototype.hasOwnProperty.call(node, key)) {
                            const value = node[key];
                            if (typeof value === 'string' && (key.includes('audio') || key.includes('image'))) {
                                node[key] = processUrl(value);
                            } else if (typeof value === 'object' && value !== null) {
                                processNode(value);
                            }
                        }
                    }
                }
            };
            processNode(data);
            return data;
        };
setUnit4Vocabulary2Data(processUnit4Vocabulary2Data(rawSensesVocabulary2Data));   
        setunit4Grammar2Data(rawSensesGrammar2Data);           
        // setSensesVocabulary1(rawSensesVocabulary1Data.vocabulary.map(processVehicle));
        // setSensesDescribeGuess(rawSensesVocabulary1Data.describe_guess);
        const processUnit5Data = (data: Unit5Data): Unit5Data | null => {
            if (!data || !data.sections) return null;

            const processedSections = (data.sections || []).map(section => {
                if (section.type === 'Vocabulary' && section.slug === 'vocabulary1') {
                    const vocabSection = section as AnimalHabitatsVocabSection;
                    if (vocabSection.content) {
                        vocabSection.content.forEach(item => {
                            item.audio = processUrl(item.audio);
                            item.image = processUrl(item.image);
                        });
                    }
                } else if (section.type === 'Q&A') {
                    const qaSection = section as AnimalHabitatsQASection;
                    if (qaSection.content) {
                        qaSection.content.forEach((item: AnimalHabitatsQAItem) => {
                            item.image = processUrl(item.image);
                            item.audio_question = processUrl(item.audio_question);
                            item.audio_answer = processUrl(item.audio_answer);
                        });
                    }
                } else if (section.type === 'Song') {
                    const songSection = section as AnimalHabitatsSongSection;
                    if (songSection.song_audio) {
                        // Correct the inconsistent path from the database for the Unit 5 song.
                        const correctedPath = songSection.song_audio.replace('/Unit5_Animal_Habitats/', '/unit5/');
                        songSection.song_audio = processUrl(correctedPath);
                    }
                } else if (section.type === 'Grammar' && section.slug === 'grammar1') {
                    const grammarSection = section as AnimalHabitatsGrammar1Section;
                     if (grammarSection.examples) {
                        grammarSection.examples.forEach((example: AnimalHabitatsGrammar1Example) => {
                            example.audio_question = processUrl(example.audio_question);
                            example.audio_answer = processUrl(example.audio_answer);
                        });
                    }
                } else if (section.type === 'Match') {
                    const matchSection = section as AnimalHabitatsMatchSection;
                    if (matchSection.questions) {
                        matchSection.questions.forEach((q: AnimalHabitatsMatchQuestion) => {
                            q.audio_q = processUrl(q.audio_q);
                            q.audio_a = processUrl(q.audio_a);
                            q.image = processUrl(q.image);
                        });
                    }
                } else if (section.type === 'Read and Write') {
                    const readWriteSection = section as AnimalHabitatsReadWriteSection;
                    if (readWriteSection.items) {
                        readWriteSection.items.forEach((item: AnimalHabitatsReadWriteItem) => {
                            item.hiddenQuestion.audio = processUrl(item.hiddenQuestion.audio);
                            item.answer.audio = processUrl(item.answer.audio);
                            item.hintImage = processUrl(item.hintImage);
                        });
                    }
                } else if (section.type === 'Ask and Answer') {
                    const askAnswerSection = section as AnimalHabitatsAskAnswerSection;
                    if (askAnswerSection.items) {
                        askAnswerSection.items.forEach((item: AnimalHabitatsAskAnswerItem) => {
                            if (item.question) {
                                item.question.audio = processUrl(item.question.audio);
                            }
                            if (item.hiddenAnswer) {
                                item.hiddenAnswer.audio = processUrl(item.hiddenAnswer.audio);
                            }
                            item.hintImage = processUrl(item.hintImage);
                        });
                    }
                } else if (section.slug === 'vocabulary2' && section.type === 'Vocabulary') {
                    const vocab2Section = section as AnimalHabitatsVocab2Section;
                    if (vocab2Section.content) {
                        vocab2Section.content.forEach(item => {
                            item.audio_word = processUrl(item.audio_word);
                            item.audio_example = processUrl(item.audio_example);
                            item.image = processUrl(item.image);
                        });
                    }
                } else if (section.slug === 'drag_drop_animals' && section.type === 'Activity') {
                    const dragDropSection = section as DragDropSection;
                    if (dragDropSection.categories) {
                        dragDropSection.categories.forEach(cat => {
                            cat.audio_intro = processUrl(cat.audio_intro);
                        });
                    }
                    if (dragDropSection.items) {
                        dragDropSection.items.forEach(item => {
                            item.image = processUrl(item.image);
                            item.audio_sentence = processUrl(item.audio_sentence);
                        });
                    }
                } else if (section.slug === 'grammar2' && section.type === 'Grammar') {
                    const grammar2Section = section as AnimalHabitatsGrammar2Section;
                    if (grammar2Section.examples) {
                        grammar2Section.examples.forEach(ex => {
                            ex.audio = processUrl(ex.audio);
                            ex.image = processUrl(ex.image);
                        });
                    }
                } else if (section.slug === 'read_and_match' && section.type === 'Activity') {
                    const readMatchSection = section as ReadMatchSection;
                    if (readMatchSection.questions) {
                        readMatchSection.questions.forEach(q => {
                            q.left.audio = processUrl(q.left.audio);
                            q.right.audio = processUrl(q.right.audio);
                        });
                    }
                } else if (section.slug === 'dice_animals_parts' && section.type === 'Activity') {
                    const diceSection = section as DiceSection;
                    if (diceSection.dice) {
                        diceSection.dice.forEach(d => {
                            if (d.faces) {
                                d.faces.forEach(face => {
                                    face.image = processUrl(face.image);
                                    face.audio = processUrl(face.audio);
                                });
                            }
                        });
                    }
                } else if (section.type === 'Listen and Read') {
                    const listenReadSection = section as ListenReadSection;
                    if (listenReadSection.paragraphs) {
                        listenReadSection.paragraphs.forEach(p => {
                            if (p.sentences) {
                                p.sentences.forEach(s => s.audio = processUrl(s.audio));
                            }
                            if (p.background_image) {
                                p.background_image = processUrl(p.background_image);
                            }
                            if (p.paragraphs) { // nested layers
                                p.paragraphs.forEach(layer => {
                                    layer.image = processUrl(layer.image);
                                    if (layer.sentences) {
                                        layer.sentences.forEach(s => s.audio = processUrl(s.audio));
                                    }
                                });
                            }
                        });
                    }
                } else if (section.type === 'Read and Circle') {
                    const readCircleSection = section as ReadCircleSection;
                    if (readCircleSection.questions) {
                        readCircleSection.questions.forEach(q => q.audio = processUrl(q.audio));
                    }
                }
                return section;
            });

            return { ...data, sections: processedSections };
        };

        // setUnit5Data(processUnit5Data(rawUnit5Data));

        const processUnit5WorkbookData = (data: Unit5WorkbookData): Unit5WorkbookData | null => {
            if (!data || !data.sections) return null;
        
            const processNode = (node: any) => {
                if (!node) return;
                if (Array.isArray(node)) {
                    node.forEach(processNode);
                } else if (typeof node === 'object' && node !== null) {
                    for (const key in node) {
                        if (Object.prototype.hasOwnProperty.call(node, key)) {
                            const value = node[key];
                            if (typeof value === 'string') {
                                if (key.includes('audio') || key.includes('Audio') || key.includes('Src') || key === 'audio' || key === 'game_board' || key.includes('image')) {
                                    node[key] = processUrl(value);
                                }
                            } else if (Array.isArray(value)) {
                                if (key === 'images' && value.every(item => typeof item === 'string')) {
                                    node[key] = value.map(url => processUrl(url));
                                } else {
                                    value.forEach(processNode);
                                }
                            } else if (typeof value === 'object' && value !== null) {
                                processNode(value);
                            }
                        }
                    }
                }
            };
        
            const allProcessedSections = JSON.parse(JSON.stringify(data.sections)); // Deep copy
            allProcessedSections.forEach(processNode);
        
            // Reshape data by grouping 'vocabulary2_*' sections
            const vocab2SubSections = allProcessedSections.filter((s: any) => s.slug?.startsWith('vocabulary2_'));
            const otherSections = allProcessedSections.filter((s: any) => !s.slug?.startsWith('vocabulary2_'));
            
            if (vocab2SubSections.length > 0) {
                const vocab2Section: Unit5WorkbookVocab2Section = {
                    slug: 'vocabulary2',
                    section: 'Vocabulary 2',
                    sections: vocab2SubSections,
                };
        
                const firstVocab2Index = data.sections.findIndex(s => s.slug?.startsWith('vocabulary2_'));
                if (firstVocab2Index !== -1) {
                    otherSections.splice(firstVocab2Index, 0, vocab2Section as any);
                } else {
                    otherSections.push(vocab2Section as any);
                }
            }
            
            return { ...data, sections: otherSections };
        };
        // setUnit5WorkbookData(processUnit5WorkbookData(rawUnit5WorkbookData));

        const processUnit6Data = (data: Unit6Vocabulary1Data): Unit6Vocabulary1Data | null => {
            if (!data || !data.sections) return null;
            
            data.sections.forEach(section => {
                if ('words' in section && section.words) {
                    section.words.forEach(word => {
                        word.audio = processUrl(word.audio);
                        word.image = processUrl(word.image);
                    });
                }
                if ('examples' in section && section.examples) {
                    section.examples.forEach(ex => {
                        ex.audio = processUrl(ex.audio);
                    });
                }
            });
            return data;
        };

        setUnit6Data(processUnit6Data(rawUnit6Data));

        const processUnit6SongData = (data: Unit6SongData): Unit6SongData | null => {
            if (!data || !data.sections) return null;
            
            const processedSections = data.sections.map(section => {
                if (section.type === 'Song') {
                    const songSection = section as Unit6Song_ReadAndSingSection;
                    if (songSection.lyrics) {
                        songSection.lyrics.audio = processUrl(songSection.lyrics.audio);
                    }
                } else if (section.type === 'Activity') {
                    const activitySection = section as Unit6Song_ActivitySection;
                    if (activitySection.items) {
                        activitySection.items.forEach(item => {
                            item.image = processUrl(item.image);
                            item.audio = processUrl(item.audio);
                        });
                    }
                }
                return section;
            });

            return { ...data, sections: processedSections };
        };

        setUnit6SongData(processUnit6SongData(rawUnit6SongData));
        
        const processUnit6GrammarData = (data: Unit6GrammarData): Unit6GrammarData | null => {
            if (!data || !data.sections) return null;
            data.sections.forEach(section => {
                if ('audio_instruction' in section && section.audio_instruction) {
                    section.audio_instruction = processUrl(section.audio_instruction);
                }
                 if ('image' in section && section.image) {
                    section.image = processUrl(section.image);
                }
                if ('examples' in section && section.examples) {
                    section.examples.forEach(ex => {
                        ex.audio_question = processUrl(ex.audio_question);
                        ex.audio_answer = processUrl(ex.audio_answer);
                        if(ex.image) {
                            ex.image = processUrl(ex.image);
                        }
                    });
                }
            });
            return data;
        };
        setUnit6GrammarData(processUnit6GrammarData(rawUnit6GrammarData));

        const processUnit6Vocab2Data = (data: Unit6Vocabulary2Data): Unit6Vocabulary2Data | null => {
            if (!data || !data.sections) return null;

            data.sections.forEach(section => {
                if (section.audio_instruction) {
                    section.audio_instruction = processUrl(section.audio_instruction);
                }
                section.examples.forEach(ex => {
                    if ('word' in ex) { // Vocab section
                        ex.audio_word = processUrl(ex.audio_word);
                        ex.audio_example = processUrl(ex.audio_example);
                        ex.image = processUrl(ex.image);
                    } else if ('question' in ex) { // Activity section
                        ex.audio_question = processUrl(ex.audio_question);
                        ex.image = processUrl(ex.image);
                    }
                });
            });
            return data;
        };
        setUnit6Vocab2Data(processUnit6Vocab2Data(rawUnit6Vocab2Data));

        const processUnit6Vocab3Data = (data: Unit6Vocabulary3Data): Unit6Vocabulary3Data | null => {
            if (!data || !data.words) return null;
            
            data.words.forEach(word => {
                word.audio_url = processUrl(word.audio_url);
                word.image_url = processUrl(word.image_url);
            });
            return data;
        };
        setUnit6Vocab3Data(processUnit6Vocab3Data(rawUnit6Vocab3Data));

        const processUnit6Grammar2Data = (data: Unit6Grammar2Data): Unit6Grammar2Data | null => {
            if (!data || !data.sections) return null;

            data.sections.forEach(section => {
                if (section.audio_instruction) {
                    section.audio_instruction = processUrl(section.audio_instruction);
                }
                if (section.game_board) {
                    section.game_board = processUrl(section.game_board);
                }
                section.examples.forEach(ex => {
                    if ('audio_question' in ex) {
                        ex.audio_question = processUrl(ex.audio_question);
                    }
                    if ('audio_answer' in ex) {
                        ex.audio_answer = processUrl(ex.audio_answer);
                    }
                    if ('image' in ex && ex.image) {
                        ex.image = processUrl(ex.image);
                    }
                });
            });
            return data;
        };
        setUnit6Grammar2Data(processUnit6Grammar2Data(rawUnit6Grammar2Data));
        
        const processUnit6ReadingData = (data: Unit6ReadingData): Unit6ReadingData | null => {
            if (!data || !data.sections) return null;
            data.sections.forEach(section => {
                section.audio_instruction = processUrl(section.audio_instruction);
                if (section.type === 'Reading') {
                    if (section.content && Array.isArray(section.content)) {
                        section.content.forEach(item => {
                            if ('audio_sentence' in item) {
                                item.audio_sentence = processUrl(item.audio_sentence);
                            }
                        });
                    }
                    section.images = section.images.map(img => processUrl(img));
                } else if (section.type === 'Activity' && 'examples' in section) {
                    section.examples.forEach(ex => {
                        ex.audio_statement = processUrl(ex.audio_statement);
                        ex.image = processUrl(ex.image);
                    });
                }
            });
            return data;
        };
        setUnit6ReadingData(processUnit6ReadingData(rawUnit6ReadingData));

        const processUnit6WritingData = (data: Unit6WritingData): Unit6WritingData | null => {
            if (!data || !data.sections) return null;
            data.sections.forEach(section => {
                section.audio_instruction = processUrl(section.audio_instruction);
                // FIX: Add a type guard to ensure 'content' exists on the section before accessing it.
                if ('content' in section && Array.isArray(section.content)) {
                    section.content.forEach(item => {
                        // FIX: Ensure 'item' has 'audio_sentence' before processing.
                        if ('audio_sentence' in item) {
                            item.audio_sentence = processUrl(item.audio_sentence);
                        }
                    });
                }
                if (section.type === 'Writing' && 'examples' in section && Array.isArray(section.examples)) {
                    (section.examples as Unit6WritingExample[]).forEach(ex => {
                        if (ex.content) {
                            ex.content.forEach(item => {
                                item.audio_sentence = processUrl(item.audio_sentence);
                            });
                        }
                    });
                } else if (section.type === 'Activity' && section.section_name === 'Write and Check' && 'examples' in section && Array.isArray(section.examples)) {
                     (section.examples as Unit6WritingCheckExample[]).forEach(ex => {
                        ex.audio_statement = processUrl(ex.audio_statement);
                    });
                }
            });
            return data;
        };
        setUnit6WritingData(processUnit6WritingData(rawUnit6WritingData));

        const processUnit6ExtendedReadingData = (data: Unit6ExtendedReadingData): Unit6ExtendedReadingData | null => {
            if (!data || !data.sections) return null;
            data.sections.forEach(section => {
                section.audio_instruction = processUrl(section.audio_instruction);
                // FIX: Add a type guard to ensure 'content' exists on the section before accessing it.
                if ('content' in section && Array.isArray(section.content)) {
                    section.content.forEach(item => {
                        // FIX: Ensure 'item' has 'audio_sentence' before processing.
                        if('audio_sentence' in item){
                           item.audio_sentence = processUrl(item.audio_sentence);
                        }
                    });
                }

                if ('matches' in section && section.matches) {
                    section.matches.characters.forEach(char => {
                        char.image = processUrl(char.image);
                        char.audio = processUrl(char.audio);
                    });
                    section.matches.actions.forEach(action => {
                        action.audio_action = processUrl(action.audio_action);
                    });
                }

                if ('examples' in section && Array.isArray(section.examples)) {
                    section.examples.forEach(ex => {
                        ex.image = processUrl(ex.image);
                        ex.audio_statement = processUrl(ex.audio_statement);
                    });
                }

                if ('activities' in section && Array.isArray(section.activities)) {
                    section.activities.forEach(act => {
                        act.audio_activity = processUrl(act.audio_activity);
                    });
                }
            });
            return data;
        };
        setUnit6ExtendedReadingData(processUnit6ExtendedReadingData(rawUnit6ExtendedReadingData));

        const processUnit6GameData = (data: Unit6GameData): Unit6GameData | null => {
            if (!data || !data.items) return null;
            data.items.forEach(item => {
                item.image = processUrl(item.image);
                item.audio_question = processUrl(item.audio_question);
                item.audio_answer = processUrl(item.audio_answer);
            });
            return data;
        };
        setUnit6GameData(processUnit6GameData(rawUnit6GameData));

        const processUnit6WorkbookData = (data: Unit6WorkbookData): Unit6WorkbookData | null => {
            if (!data || !data.sections) return null;

            const processNode = (node: any) => {
                if (!node) return;
                if (Array.isArray(node)) {
                    node.forEach(processNode);
                } else if (typeof node === 'object' && node !== null) {
                    for (const key in node) {
                        if (Object.prototype.hasOwnProperty.call(node, key)) {
                            const value = node[key];
                            if (typeof value === 'string') {
                                if (key.includes('audio') || key.includes('image') || key.includes('Image')) {
                                    node[key] = processUrl(value);
                                }
                            } else if (Array.isArray(value)) {
                                if (key === 'images' && value.every(item => typeof item === 'string')) {
                                     node[key] = value.map(url => processUrl(url));
                                } else {
                                    value.forEach(processNode);
                                }
                            }
                            else if (typeof value === 'object' && value !== null) {
                                processNode(value);
                            }
                        }
                    }
                }
            };
            processNode(data.sections);
            return data;
        };
        setUnit6WorkbookData(processUnit6WorkbookData(rawUnit6WorkbookData));

        const processUnit7Vocab1Data = (data: Unit7Vocabulary1Data): Unit7Vocabulary1Data | null => {
            if (!data || !data.sections) return null;
            
            data.sections.forEach(section => {
                // FIX: Check against section.type instead of a missing 'slug' property.
                if (section.type === 'Words' && 'words' in section) {
                    section.words.forEach(word => {
                        word.audio = processUrl(word.audio);
                        word.image = processUrl(word.image);
                    });
                }
                // FIX: Check against section.type instead of a missing 'slug' property.
                if (section.type === 'Speaking and Action' && 'sentences' in section) {
                    section.sentences.forEach(sentence => {
                        sentence.audio = processUrl(sentence.audio);
                    });
                }
            });
            return data;
        };
        setUnit7Vocab1Data(processUnit7Vocab1Data(rawUnit7Vocab1Data));
        
        const processUnit7Vocab2Data = (data: Unit7Vocabulary2Data): Unit7Vocabulary2Data | null => {
            if (!data || !data.sections) return null;
            
            data.sections.forEach(section => {
                if (section.slug === 'activity_one' && 'words' in section) {
                    section.words.forEach(word => {
                        word.audio = processUrl(word.audio);
                        word.image = processUrl(word.image);
                    });
                }
                if (section.slug === 'examples' && 'examples' in section) {
                    section.examples.forEach(ex => {
                        ex.audio = processUrl(ex.audio);
                    });
                }
                if (section.slug === 'fill_in_the_blanks' && 'questions' in section) {
                    section.questions.forEach(q => {
                        q.audio = processUrl(q.audio);
                    });
                }
            });
            return data;
        };
        setUnit7Vocab2Data(processUnit7Vocab2Data(rawUnit7Vocab2Data));

        const processUnit7Grammar1Data = (data: Unit7Grammar1Data): Unit7Grammar1Data | null => {
            if (!data || !data.sections) return null;
            
            data.sections.forEach(section => {
                if ('examples' in section && section.examples) {
                    section.examples.forEach((ex: any) => { // Use any to simplify access
                        ex.audio_question = processUrl(ex.audio_question);
                        ex.audio_yes = processUrl(ex.audio_yes);
                        ex.audio_no = processUrl(ex.audio_no);
                        if ('image' in ex && ex.image) ex.image = processUrl(ex.image);
                    });
                }
                if ('questions' in section && section.questions) {
                    section.questions.forEach((q: any) => {
                        q.audio_question = processUrl(q.audio_question);
                        q.audio_answer = processUrl(q.audio_answer);
                        q.image = processUrl(q.image);
                    });
                }
                if ('prompts' in section && section.prompts) {
                    section.prompts.forEach((p: any) => {
                        p.audio_question = processUrl(p.audio_question);
                        p.audio_yes = processUrl(p.audio_yes);
                        p.audio_no = processUrl(p.audio_no);
                    });
                }
                if ('words' in section && section.words) {
                    section.words.forEach((w: any) => {
                        w.audio = processUrl(w.audio);
                        w.image = processUrl(w.image);
                    });
                }
            });
            return data;
        };
        setUnit7Grammar1Data(processUnit7Grammar1Data(rawUnit7Grammar1Data));

        const processUnit7Grammar2Data = (data: Unit7Grammar2Data): Unit7Grammar2Data | null => {
            if (!data || !data.sections) return null;
            const processNode = (node: any) => {
                if (!node) return;
                if (Array.isArray(node)) {
                    node.forEach(processNode);
                } else if (typeof node === 'object' && node !== null) {
                    for (const key in node) {
                        if (Object.prototype.hasOwnProperty.call(node, key)) {
                            const value = node[key];
                            if (typeof value === 'string' && key.includes('audio')) {
                                node[key] = processUrl(value);
                            } else if (typeof value === 'object' && value !== null) {
                                processNode(value);
                            }
                        }
                    }
                }
            };
            processNode(data.sections);
            return data;
        };
        setUnit7Grammar2Data(processUnit7Grammar2Data(rawUnit7Grammar2Data));

        const processUnit7GameData = (data: Unit7GameData): Unit7GameData | null => {
            if (!data || !data.items) return null;
            data.items.forEach(item => {
                item.image = processUrl(item.image);
                item.audio_question = processUrl(item.audio_question);
                item.audio_answer = processUrl(item.audio_answer);
            });
            return data;
        };
        setUnit7GameData(processUnit7GameData(rawUnit7GameData));

        const processUnit7SongData = (data: Unit7SongData): Unit7SongData | null => {
            if (!data || !data.sections) return null;
            data.sections.forEach(section => {
                if (section.audio) {
                    section.audio = processUrl(section.audio);
                }
            });
            return data;
        };
        setUnit7SongData(processUnit7SongData(rawUnit7SongData));

        const processUnit7ReadingData = (data: Unit7ReadingData): Unit7ReadingData | null => {
            if (!data || !data.sections) return null;
            data.sections.forEach(section => {
                if (section.slug === 'listen_and_read') {
                    if ('image' in section && section.image) section.image = processUrl(section.image);
                    if ('content' in section && Array.isArray(section.content)) {
                        section.content.forEach(item => {
                            if ('audio' in item && item.audio) item.audio = processUrl(item.audio);
                        });
                    }
                }
                if (section.slug === 'weird_but_true' && 'content' in section && Array.isArray(section.content)) {
                    section.content.forEach(item => {
                        if ('audio' in item && item.audio) item.audio = processUrl(item.audio);
                    });
                }
                if (section.slug === 'read_and_underline' && 'questions' in section && Array.isArray(section.questions)) {
                    section.questions.forEach(item => {
                        if ('audio' in item && item.audio) item.audio = processUrl(item.audio);
                    });
                }
                if (section.slug === 'ask_and_answer_exercise' && 'examples' in section && Array.isArray(section.examples)) {
                    section.examples.forEach(item => {
                        if ('audio' in item && item.audio) item.audio = processUrl(item.audio);
                    });
                }
            });
            return data;
        };
        setUnit7ReadingData(processUnit7ReadingData(rawUnit7ReadingData));
        
        const processUnit7WorkbookData = (data: Unit7WorkbookData): Unit7WorkbookData | null => {
            if (!data || !data.sections) return null;

            const processNode = (node: any) => {
                if (!node) return;
                if (Array.isArray(node)) {
                    node.forEach(processNode);
                } else if (typeof node === 'object' && node !== null) {
                    for (const key in node) {
                        if (Object.prototype.hasOwnProperty.call(node, key)) {
                            const value = node[key];
                            if (typeof value === 'string') {
                                if (key.includes('audio') || key.includes('Audio') || key.includes('image') || key.includes('Image')) {
                                    node[key] = processUrl(value);
                                }
                            } else if (Array.isArray(value)) {
                                if (key === 'images' && value.every(item => typeof item === 'string')) {
                                     node[key] = value.map(url => processUrl(url));
                                } else {
                                    value.forEach(processNode);
                                }
                            }
                            else if (typeof value === 'object' && value !== null) {
                                processNode(value);
                            }
                        }
                    }
                }
            };
            processNode(data.sections);
            return data;
        };
        setUnit7WorkbookData(processUnit7WorkbookData(rawUnit7WorkbookData));

        const processUnit7WritingData = (data: Unit7WritingData): Unit7WritingData | null => {
            if (!data || !data.sections) return null;
            const processNode = (node: any) => {
                if (!node) return;
                if (Array.isArray(node)) {
                    node.forEach(processNode);
                } else if (typeof node === 'object' && node !== null) {
                    for (const key in node) {
                        if (Object.prototype.hasOwnProperty.call(node, key)) {
                            const value = node[key];
                            if (typeof value === 'string' && key.includes('audio')) {
                                node[key] = processUrl(value);
                            } else if (typeof value === 'object' && value !== null) {
                                processNode(value);
                            }
                        }
                    }
                }
            };
            processNode(data.sections);
            return data;
        };
        setUnit7WritingData(processUnit7WritingData(rawUnit7WritingData));

        const processUnit7ReviewData = (data: Unit7ReviewData): Unit7ReviewData | null => {
            if (!data || !data.words) return null;
            
            data.words.forEach(word => {
                word.audio = processUrl(word.audio);
                word.image = processUrl(word.image);
            });
            return data;
        };
        setUnit7ReviewData(processUnit7ReviewData(rawUnit7ReviewData));

        const processUnit8Vocabulary1Data = (data: Unit8Vocabulary1Data): Unit8Vocabulary1Data | null => {
            if (!data || !data.sections) return null;
            data.sections.forEach(section => {
                if (section.slug === 'listen_and_say' && 'words' in section) {
                    section.words.forEach(word => {
                        word.audio = processUrl(word.audio);
                        word.image = processUrl(word.image);
                    });
                } else if (section.slug === 'work_with_partner' && 'qa' in section) {
                    section.qa.forEach(item => {
                        item.audio_q = processUrl(item.audio_q);
                        item.audio_a = processUrl(item.audio_a);
                    });
                }
            });
            return data;
        };
        setUnit8Vocabulary1Data(processUnit8Vocabulary1Data(rawUnit8Vocabulary1Data));

        const processUnit8Grammar1Data = (data: Unit8Grammar1Data): Unit8Grammar1Data | null => {
            if (!data || !data.sections) return null;
            data.sections.forEach(section => {
                if ('content' in section && Array.isArray(section.content)) {
                    section.content.forEach((item: any) => {
                        if (item.audio) item.audio = processUrl(item.audio);
                        if (item.image) item.image = processUrl(item.image);
                        if (item.audio_question) item.audio_question = processUrl(item.audio_question);
                        if (item.audio_yes) item.audio_yes = processUrl(item.audio_yes);
                    });
                }
            });
            return data;
        };
        setUnit8Grammar1Data(processUnit8Grammar1Data(rawUnit8Grammar1Data));

        const processUnit8Vocabulary2Data = (data: Unit8Vocabulary2Data): Unit8Vocabulary2Data | null => {
            if (!data || !data.sections) return null;
            data.sections.forEach(section => {
                if ('content' in section && Array.isArray(section.content)) {
                    section.content.forEach((item: any) => {
                        if(item.audio) item.audio = processUrl(item.audio);
                        if(item.image) item.image = processUrl(item.image);
                    });
                }
            });
            return data;
        };
        setUnit8Vocabulary2Data(processUnit8Vocabulary2Data(rawUnit8Vocabulary2Data));
        
        const processUnit8Grammar2Data = (data: Unit8Grammar2Data): Unit8Grammar2Data | null => {
            if (!data || !data.sections) return null;
            data.sections.forEach(section => {
                if (section.type === 'Grammar' || section.type === 'Game') {
                    if (Array.isArray(section.content)) {
                        section.content.forEach((item: any) => {
                             if(item.audio) item.audio = processUrl(item.audio);
                             if(item.image) item.image = processUrl(item.image);
                             if(item.audio_question) item.audio_question = processUrl(item.audio_question);
                             if(item.audio_answer) item.audio_answer = processUrl(item.audio_answer);
                             if(item.audio_prompt) item.audio_prompt = processUrl(item.audio_prompt);
                             if(item.audio_sentence) item.audio_sentence = processUrl(item.audio_sentence);
                        });
                    }
                } else if (section.type === 'Matching') {
                    const content = section.content as { left: any[], right: any[] };
                    if (content.left) {
                        content.left.forEach(item => {
                            if (item.audio) item.audio = processUrl(item.audio);
                        });
                    }
                    if (content.right) {
                        content.right.forEach(item => {
                            if (item.audio) item.audio = processUrl(item.audio);
                        });
                    }
                }
            });
            return data;
        };
        setUnit8Grammar2Data(processUnit8Grammar2Data(rawUnit8Grammar2Data));

        const processUnit8ReadingData = (data: Unit8ReadingData): Unit8ReadingData | null => {
            if (!data || !data.sections) return null;
            
            const processNode = (node: any) => {
                if (!node) return;
                if (Array.isArray(node)) {
                    node.forEach(processNode);
                } else if (typeof node === 'object' && node !== null) {
                    for (const key in node) {
                        if (Object.prototype.hasOwnProperty.call(node, key)) {
                            const value = node[key];
                            if (typeof value === 'string' && key.includes('audio')) {
                                node[key] = processUrl(value);
                            } else if (typeof value === 'object' && value !== null) {
                                processNode(value);
                            }
                        }
                    }
                }
            };

            data.sections.forEach(section => {
                processNode(section.content);
            });
            return data;
        };
        setUnit8ReadingData(processUnit8ReadingData(rawUnit8ReadingData));
        
        const processUnit8WritingData = (data: Unit8WritingData): Unit8WritingData | null => {
            if (!data || !data.sections) return null;
            
            const processNode = (node: any) => {
                if (!node) return;
                if (Array.isArray(node)) {
                    node.forEach(processNode);
                } else if (typeof node === 'object' && node !== null) {
                    for (const key in node) {
                        if (Object.prototype.hasOwnProperty.call(node, key)) {
                            const value = node[key];
                            if (typeof value === 'string' && key.includes('audio')) {
                                node[key] = processUrl(value);
                            } else if (typeof value === 'object' && value !== null) {
                                processNode(value);
                            }
                        }
                    }
                }
            };

            data.sections.forEach(section => {
                processNode(section.content);
            });
            return data;
        };
        setUnit8WritingData(processUnit8WritingData(rawUnit8WritingData));
        
        const processUnit8GameData = (data: Unit8GameData): Unit8GameData | null => {
            if (!data || !data.sections) return null;
            data.sections.forEach(section => {
                if (section.slug === 'listen_and_read_fast' && Array.isArray(section.content)) {
                    (section.content as ListenReadFastGameContent[]).forEach(item => {
                        item.audio = processUrl(item.audio);
                    });
                }
            });
            return data;
        };
        setUnit8GameData(processUnit8GameData(rawUnit8GameData));

        const combinedUnit8WorkbookData: Unit8WorkbookData = {
            slug: 'unit8_workbook',
            title: 'Unit 8 – Workbook',
            sections: [
                ...(rawUnit8WorkbookVocab1Data.sections || []),
                ...(rawUnit8WorkbookSongData.sections || []),
                ...(rawUnit8WorkbookGrammar1Data.sections || []),
                ...(rawUnit8WorkbookVocab2Data.sections || []),
                ...(rawUnit8WorkbookGrammar2Data.sections || []),
                ...(rawUnit8WorkbookReadingData.sections || []),
                ...(rawUnit8WorkbookWritingData.sections || []),
                ...(rawUnit8WorkbookReviewData.sections || []),
            ]
        };

        const processUnit8WorkbookData = (data: Unit8WorkbookData): Unit8WorkbookData | null => {
            if (!data || !data.sections) return null;
            const processNode = (node: any, parentKey: string = '') => {
                if (!node) return;
                if (Array.isArray(node)) {
                    node.forEach(item => processNode(item, parentKey));
                } else if (typeof node === 'object' && node !== null) {
                    for (const key in node) {
                        if (Object.prototype.hasOwnProperty.call(node, key)) {
                            const value = node[key];
                            if (typeof value === 'string' && (key.includes('audio') || key.includes('image') || parentKey === 'audio')) {
                                node[key] = processUrl(value);
                            } else if (typeof value === 'object' && value !== null) {
                                processNode(value, key);
                            }
                        }
                    }
                }
            };
            processNode(data.sections);
            return data;
        };
        setUnit8WorkbookData(processUnit8WorkbookData(combinedUnit8WorkbookData));

        const processUnit9Vocabulary1Data = (data: Unit9Vocabulary1Data): Unit9Vocabulary1Data | null => {
            if (!data || !data.sections) return null;
            
            data.sections.forEach(section => {
                if (section.slug === 'look_and_learn' && 'words' in section) {
                    section.words.forEach(word => {
                        if(word.audio) word.audio = processUrl(word.audio);
                        if(word.image) word.image = processUrl(word.image);
                    });
                } else if (section.slug === 'ask_and_answer' && 'examples' in section) {
                    section.examples.forEach(ex => {
                        ex.dialogue.forEach(d => {
                            d.audio = processUrl(d.audio);
                        });
                    });
                }
            });
            return data;
        };
        setUnit9Vocabulary1Data(processUnit9Vocabulary1Data(rawunit9Vocabulary1DataTS));

        const processUnit9SongData = (data: Unit9SongData): Unit9SongData | null => {
            if (!data || !data.sections) return null;

            data.sections.forEach(section => {
                if (section.type === 'Song' && 'audio' in section) {
                    section.audio = processUrl(section.audio);
                }
            });
            return data;
        };
        setUnit9SongData(processUnit9SongData(rawUnit9SongDataTS));
        
        const processUnit9Grammar1Data = (data: Unit9Grammar1DataType): Unit9Grammar1DataType | null => {
            if (!data || !data.sections) return null;
            
            data.sections.forEach(section => {
                if ('examples' in section && section.examples) {
                    section.examples.forEach((ex: any) => {
                        if ('dialogue' in ex && ex.dialogue) {
                            ex.dialogue.forEach((d: any) => {
                                d.audio = processUrl(d.audio);
                            });
                        } else if ('audio' in ex) {
                            ex.audio = processUrl(ex.audio);
                        }
                    });
                }
            });
            return data;
        };
        setUnit9Grammar1Data(processUnit9Grammar1Data(rawUnit9Grammar1Data));

        const processUnit9Vocabulary2Data = (data: Unit9Vocabulary2Data): Unit9Vocabulary2Data | null => {
            if (!data || !data.sections) return null;
            data.sections.forEach(section => {
                if (section.slug === 'listen_and_say_read_and_write' && 'words' in section) {
                    section.words.forEach(word => {
                        if(word.audio) word.audio = processUrl(word.audio);
                        if(word.image) word.image = processUrl(word.image);
                        if(word.example) word.example.audio = processUrl(word.example.audio);
                    });
                } else if (section.slug === 'complete_the_sentences' && 'questions' in section) {
                    section.questions.forEach(q => {
                        q.audio = processUrl(q.audio);
                    });
                } else if (section.slug === 'stick_your_favorite_activities' && 'examples' in section) {
                    section.examples.forEach(ex => {
                        ex.dialogue.forEach(d => {
                            d.audio = processUrl(d.audio);
                        });
                    });
                }
            });
            return data;
        };
        setUnit9Vocabulary2Data(processUnit9Vocabulary2Data(rawUnit9Vocabulary2Data));

        // const processUnit9Grammar2Data = (data: Unit9Grammar2Data): Unit9Grammar2Data | null => {
        //     if (!data || !data.sections) return null;
        //     data.sections.forEach(section => {
        //         if (section.slug === 'go_verb_ing' && 'examples' in section) {
        //             section.examples.forEach(example => {
        //                 example.audio = processUrl(example.audio);
        //             });
        //         } else if (section.slug === 'look_and_write' && 'question' in section) {
        //             section.question.forEach(q => {
        //                 q.audio = processUrl(q.audio);
        //             });
        //         }
        //     });
        //     return data;
        // };
        // setUnit9Grammar2Data(processUnit9Grammar2Data(rawUnit9Grammar2Data));
        const processUnit9Grammar2Data = (data: Unit9Grammar2Data): Unit9Grammar2Data | null => {
            if (!data || !data.sections) return null;
            data.sections.forEach(section => {
                if ('examples' in section && Array.isArray(section.examples)) {
                    (section.examples as any[]).forEach(ex => {
                        if (ex.audio) ex.audio = processUrl(ex.audio);
                    });
                }
                if (section.slug === 'look_and_write' && 'question' in section) {
                    const writingSection = section as any;
                    if (writingSection.question?.audio) {
                        writingSection.question.audio = processUrl(writingSection.question.audio);
                    }
                    if (writingSection.items) {
                        writingSection.items.forEach((item: any) => {
                            if (item.image) item.image = processUrl(item.image);
                        });
                    }
                }
            });
            return data;
        };
        setUnit9Grammar2Data(processUnit9Grammar2Data(rawUnit9Grammar2Data));
        console.log(rawUnit9Grammar2Data)
const processUnit9ReadingData = (data: Unit9ReadingData): Unit9ReadingData | null => {
    if (!data || !data.sections) return null;

    console.log("📥 Raw Unit9ReadingData:", data); // <== log dữ liệu gốc

    const processNode = (node: any) => {
        if (!node) return;
        if (Array.isArray(node)) {
            node.forEach(processNode);
        } else if (typeof node === 'object' && node !== null) {
            for (const key in node) {
                if (Object.prototype.hasOwnProperty.call(node, key)) {
                    const value = node[key];
                    if (typeof value === 'string' && (key.includes('audio') || key.includes('image'))) {
                        node[key] = processUrl(value);
                    } else if (typeof value === 'object' && value !== null) {
                        processNode(value);
                    }
                }
            }
        }
    };

    processNode(data.sections);

    console.log("✅ Processed Unit9ReadingData:", data); // <== log dữ liệu sau khi xử lý

    
    return data;
};
// useEffect(() => {
//   if (unit9ReadingData) {
//     console.log("📘 Updated unit9ReadingData:", unit9ReadingData);
//   }
// }, [unit9ReadingData]);


// Gọi hàm và gán vào state
setUnit9ReadingData(processUnit9ReadingData(rawUnit9ReadingData));
        console.log(rawUnit9ReadingData)
const processUnit9WritingData = (data: Unit9WritingData): Unit9WritingData | null => {
    if (!data || !data.sections) return null;

    console.log("📥 Raw Unit9WritingData:", data); // <== log dữ liệu gốc

    const processNode = (node: any) => {
        if (!node) return;
        if (Array.isArray(node)) {
            node.forEach(processNode);
        } else if (typeof node === 'object' && node !== null) {
            for (const key in node) {
                if (Object.prototype.hasOwnProperty.call(node, key)) {
                    const value = node[key];
                    if (typeof value === 'string' && (key.includes('audio') || key.includes('image'))) {
                        node[key] = processUrl(value);
                        
                    }else if (Array.isArray(value) && key === 'images') {
                        node[key] = value.map((url: string) => processUrl(url));
                    }else if (typeof value === 'object' && value !== null) {
                        processNode(value);
                    }
                }
            }
        }
    };

    processNode(data.sections);

    console.log("✅ Processed Unit9WritingData:", data); // <== log dữ liệu sau khi xử lý

    
    return data;
};
setUnit9WritingData(processUnit9WritingData(rawUnit9WritingData));
const processUnit9ExtendedReadingData = (data: Unit9ExtendedReadingData): Unit9ExtendedReadingData | null => {
    if (!data || !data.sections) return null;

    console.log("📥 Raw Unit9ExtendedReadingData:", data); // <== log dữ liệu gốc

    const processNode = (node: any) => {
        if (!node) return;
        if (Array.isArray(node)) {
            node.forEach(processNode);
        } else if (typeof node === 'object' && node !== null) {
            for (const key in node) {
                if (Object.prototype.hasOwnProperty.call(node, key)) {
                    const value = node[key];
                    if (typeof value === 'string' && (key.includes('audio') || key.includes('image'))) {
                        node[key] = processUrl(value);
                    } else if (typeof value === 'object' && value !== null) {
                        processNode(value);
                    }
                }
            }
        }
    };

    processNode(data.sections);

    console.log("✅ Processed Unit9ExtendedReadingData:", data); // <== log dữ liệu sau khi xử lý

    
    return data;
};



// Gọi hàm và gán vào state
setUnit9ExtendedReadingData(processUnit9ExtendedReadingData(rawUnit9ExtendedReadingData));  
const processUnit2Vocabulary1Data = (data: Unit2Vocabulary1Data): Unit2Vocabulary1Data | null => {
            if (!data || !data.sections) return null;
            const processNode = (node: any) => {
                if (!node) return;
                if (Array.isArray(node)) {
                    node.forEach(processNode);
                } else if (typeof node === 'object' && node !== null) {
                    for (const key in node) {
                        if (Object.prototype.hasOwnProperty.call(node, key)) {
                            const value = node[key];
                            if (typeof value === 'string' && key.includes('audio')) {
                                node[key] = processUrl(value);

                            }else if (typeof value === 'string' && key === 'image' ) {
                                node[key] = processUrl(value);
                            } else if (typeof value === 'object' && value !== null) {
                                processNode(value);
                            }
                        }
                    }
                }
            };
            processNode(data.sections);
            return data;
        };
// setUnit2Vocabulary1Data(processUnit2Vocabulary1Data(rawUnit2Vocabulary1Data));
// const processUnit2SongData = (data: Unit2SongData): Unit2SongData | null => {
//             if (!data || !data.sections) return null;
//             data.sections.forEach(section => {
//                 if (section.audio) {
//                     section.audio = processUrl(section.audio);
//                 }
//             });
//             return data;
//         };
// setUnit2SongData(processUnit2SongData(rawUnit2SongData));
// const processUnit2Grammar1Data = (data: Unit2Grammar1Data): Unit2Grammar1Data | null => {
//             if (!data || !data.sections) return null;
//             const processNode = (node: any) => {
//                 if (!node) return;
//                 if (Array.isArray(node)) {
//                     node.forEach(processNode);
//                 } else if (typeof node === 'object' && node !== null) {
//                     for (const key in node) {
//                         if (Object.prototype.hasOwnProperty.call(node, key)) {
//                             const value = node[key];
//                             if (typeof value === 'string' && (key.includes('audio') || key.includes('image'))) {
//                                 node[key] = processUrl(value);
//                             } else if (typeof value === 'object' && value !== null) {
//                                 processNode(value);
//                             }
//                         }
//                     }
//                 }
//             };
//             processNode(data.sections);
//             return data;
//         };
//         setUnit2Grammar1Data(processUnit2Grammar1Data(rawUnit2Grammar1Data));
//    const processUnit2Vocabulary2Data = (data: Unit2Vocabulary2Data): Unit2Vocabulary2Data | null => {
//             if (!data || !data.sections) return null;
//             const processNode = (node: any) => {
//                 if (!node) return;
//                 if (Array.isArray(node)) {
//                     node.forEach(processNode);
//                 } else if (typeof node === 'object' && node !== null) {
//                     for (const key in node) {
//                         if (Object.prototype.hasOwnProperty.call(node, key)) {
//                             const value = node[key];
//                             if (typeof value === 'string' && (key.includes('audio') || key.includes('image'))) { 
//                                 node[key] = processUrl(value);
//                             } else if (typeof value === 'object' && value !== null) {
//                                 processNode(value);
//                             }
//                         }
//                     }
//                 }
//             };
//             processNode(data.sections);
//             return data;
//         };
// setUnit2Vocabulary2Data(processUnit2Vocabulary2Data(rawUnit2Vocabulary2Data));     
// const processUnit2Grammar2Data = (data: Unit2Grammar2Data): Unit2Grammar2Data | null => {
//             if (!data || !data.sections) return null;
//             const processNode = (node: any) => {
//                 if (!node) return;
//                 if (Array.isArray(node)) {
//                     node.forEach(processNode);
//                 } else if (typeof node === 'object' && node !== null) {
//                     for (const key in node) {
//                         if (Object.prototype.hasOwnProperty.call(node, key)) {
//                             const value = node[key];
//                             if (typeof value === 'string' && (key.includes('audio') || key.includes('image'))) {
//                                 node[key] = processUrl(value);
//                             } else if (typeof value === 'object' && value !== null) {
//                                 processNode(value);
//                             }
//                         }
//                     }
//                 }
//             };
//             processNode(data.sections);
//             return data;
//         };
//         setUnit2Grammar2Data(processUnit2Grammar2Data(rawUnit2Grammar2Data));
// const processUnit2ReadingData = (data: Unit2ReadingData): Unit2ReadingData | null => {
//             if (!data || !data.sections) return null;
//             const processNode = (node: any) => {
//                 if (!node) return;
//                 if (Array.isArray(node)) {
//                     node.forEach(processNode);
//                 } else if (typeof node === 'object' && node !== null) {
//                     for (const key in node) {
//                         if (Object.prototype.hasOwnProperty.call(node, key)) {
//                             const value = node[key];
//                             if (typeof value === 'string' && (key.includes('audio') || key.includes('image'))) {
//                                 node[key] = processUrl(value);
//                             } else if (typeof value === 'object' && value !== null) {
//                                 processNode(value);
//                             }
//                         }
//                     }
//                 }
//             };
//             processNode(data.sections);
//             return data;
//         };
//         setUnit2ReadingData(processUnit2ReadingData(rawUnit2ReadingData));        
// const processUnit2WritingData = (data: Unit2WritingData): Unit2WritingData | null => {
//             if (!data || !data.sections) return null;
        
//             data.sections.forEach(section => {
//                 if (section.type === 'Reading' && section.content) {
//                     section.content.forEach(item => {
//                         item.audio = processUrl(item.audio);
//                         if (item.images) {
//                             item.images = item.images.map(img => processUrl(img));
//                         }
//                     });
//                 }
//             });
//             return data;
//         };
//         setUnit2WritingData(processUnit2WritingData(rawUnit2WritingData));
// const processUnit1Vocabulary1Data = (data: Unit1Vocabulary1Data): Unit1Vocabulary1Data | null => {
//             if (!data || !data.sections) return null;
//             data.sections.forEach(section => {
//                 if (section.slug === 'listen_and_read') {
//                     section.words.forEach(word => {
//                         word.audio = processUrl(word.audio);
//                         word.image = processUrl(word.image);
//                         word.example.audio = processUrl(word.example.audio);
//                     });
//                 }
//                 if (section.slug === 'ask_and_answer') {
//                     section.examples.forEach(ex => {
//                         ex.audio = processUrl(ex.audio);
//                     });
//                 }
//             });
//             return data;
//         };
//         setUnit1Vocabulary1Data(processUnit1Vocabulary1Data(rawUnit1Vocabulary1Data));
// const processUnit1SongData = (data: Unit1SongData): Unit1SongData | null => {
//             if (!data || !data.sections) return null;
//             data.sections.forEach(section => {
//                 if (section.type === 'Song') {
//                     section.audio = processUrl(section.audio);
//                 }
//             });
//             return data;
//         };
//         setUnit1SongData(processUnit1SongData(rawUnit1SongData));
// const processUnit1Grammar1Data = (data: Unit1Grammar1Data): Unit1Grammar1Data | null => {
//             if (!data || !data.sections) return null;
//             data.sections.forEach(section => {
//                 if (section.type === 'Grammar' && 'examples' in section) {
//                     section.examples.forEach(ex => ex.audio = processUrl(ex.audio));
//                 }
//                 if (section.type === 'Exercise' && 'questions' in section) {
//                     section.images = section.images.map(img => processUrl(img));
//                     section.questions.forEach(q => q.audio_answer = processUrl(q.audio_answer));
//                 }
//                 if (section.type === 'Writing' && 'table' in section) {
//                     section.table.before_images = section.table.before_images.map(img => processUrl(img));
//                     section.table.after_images = section.table.after_images.map(img => processUrl(img));
//                 }
//             });
//             return data;
//         };
//         setUnit1Grammar1Data(processUnit1Grammar1Data(rawUnit1Grammar1Data));
// const processUnit1Vocabulary2Data = (data: Unit1Vocabulary2Data): Unit1Vocabulary2Data | null => {
//             if (!data || !data.sections) return null;
//             data.sections.forEach(section => {
//                 if (section.vocabulary) {
//                     section.vocabulary.forEach(item => item.audio = processUrl(item.audio));
//                     section.vocabulary.forEach(item => item.image = processUrl(item.image));
                    
//                 }
//                 if (section.sentences) {
//                     section.sentences.forEach(item => item.audio = processUrl(item.audio));
//                 }
//             });
//             return data;
//         };
//         setUnit1Vocabulary2Data(processUnit1Vocabulary2Data(rawUnit1Vocabulary2Data));
// const processUnit1Grammar2Data = (data: Unit1Grammar2Data): Unit1Grammar2Data | null => {
//             if (!data || !data.sections) return null;
//             data.sections.forEach(section => {
//                 if (section.type === 'Grammar' && 'examples' in section) {
//                     section.examples.forEach(ex => ex.audio = processUrl(ex.audio));
//                 }
//                 if (section.type === 'Writing' && 'questions' in section) {
//                     section.image = processUrl(section.image);
//                     section.questions.forEach(q => q.audio = processUrl(q.audio));
//                 }
//                 if (section.type === 'Speaking' && 'examples' in section) {
//                     section.examples.forEach(ex => ex.audio = processUrl(ex.audio));
//                 }
//             });
//             return data;
//         };
//         setUnit1Grammar2Data(processUnit1Grammar2Data(rawUnit1Grammar2Data)); 
// const processUnit1ReadingData = (data: Unit1ReadingData): Unit1ReadingData | null => {
//             if (!data || !data.sections) return null;
//             data.sections.forEach(section => {
//                 if ('image' in section && section.image) {
//                     section.image = processUrl(section.image);
//                 }
//                 if ('content' in section && Array.isArray(section.content)) {
//                     (section.content as any[]).forEach(item => {
//                         if (item.audio) item.audio = processUrl(item.audio);
//                     });
//                 }
//                 if ('examples' in section && Array.isArray(section.examples)) {
//                     (section.examples as any[]).forEach(item => {
//                         if (item.audio) item.audio = processUrl(item.audio);
//                     });
//                 }
//             });
//             return data;
//         };
//         setUnit1ReadingData(processUnit1ReadingData(rawUnit1ReadingData));
// const processUnit1WritingData = (data: Unit1WritingData): Unit1WritingData | null => {
//             if (!data || !data.sections) return null;
        
//             data.sections.forEach(section => {
//                 if (section.type === 'Reading' && section.content) {
//                     section.content.forEach(item => {
//                         item.audio = processUrl(item.audio);
//                         if (item.images) {
//                             item.images = item.images.map(img => processUrl(img));
//                         }
//                     });
//                 }
//             });
//             return data;
//         };
//         setUnit1WritingData(processUnit1WritingData(rawUnit1WritingData));                                               
        const processVehicle = (vehicle: Vehicle): Vehicle => ({
            ...vehicle,
            id: String(vehicle.id),
            audioSrc: `${API_BASE_URL}${String(vehicle.audioSrc).trim()}`,
            // FIX: Corrected property name from 'image' to 'imageSrc' to match the 'Vehicle' type.
            imageSrc: processUrl(vehicle.imageSrc),
            word: String(vehicle.word).trim(),
            meaning_vi: String(vehicle.meaning_vi).trim(),
        });

        const processDialogueLine = (line: DialogueLine): DialogueLine => ({
            ...line,
            audioSrc: `${API_BASE_URL}${line.audioSrc.trim()}`
        });

        const processExampleVehicle = (v: ExampleVehicleApiResponse): ProcessedExampleVehicle => ({
            id: v.id,
            word: v.word,
            meaning_vi: v.meaning_vi,
            audioSrc: v.audioSrc ? `${API_BASE_URL}${v.audioSrc.trim()}` : '',
            imageSrc: v.imageSrc ? `${API_BASE_URL}${v.imageSrc.trim()}` : '',
            examples: v.examples.map((ex, i) => ({
                id: `${v.id}-ex-${i}`,
                speaker: 'Example',
                text: ex.sentence,
                audioSrc: ex.audioSrc ? `${API_BASE_URL}${ex.audioSrc.trim()}` : ''
            }))
        });

        const groupByCategory = <T extends { category: string }>(data: T[]): Record<string, T[]> => {
          return data.reduce((acc, item) => {
            (acc[item.category] = acc[item.category] || []).push(item);
            return acc;
          }, {} as Record<string, T[]>);
        };
        
        // const processedVehicles = rawVehiclesData.map(processVehicle);
        // setVehicles(processedVehicles);

        // const processedExampleVehicles = rawExampleVehiclesData.map(processExampleVehicle);
        // setExampleVehicles(processedExampleVehicles);
        
        // const processedInOnLines = rawInOnData.map(line => ({ ...line, id: line.id, audioSrc: `${API_BASE_URL}${line.audioSrc.trim()}`, speaker: 'Example' }));
        // setGroupedInOnLines(groupByCategory(processedInOnLines as (InOnLine & DialogueLine)[]));

        // const processedLikeVehicleLines = rawLikeVehicleData.map(line => ({ ...line, id: line.id, audioSrc: `${API_BASE_URL}${line.audioSrc.trim()}`, speaker: 'Example' }));
        // setGroupedLikeVehicleLines(groupByCategory(processedLikeVehicleLines as (LikeVehicleLine & DialogueLine)[]));
        
        // const processedTakeRideFlyLines = rawTakeRideFlyData.map(line => ({ ...line, id: line.id, audioSrc: `${API_BASE_URL}${line.audioSrc.trim()}`, speaker: 'Example' }));
        // setGroupedTakeRideFlyLines(groupByCategory(processedTakeRideFlyLines as (TakeRideFlyLine & DialogueLine)[]));

        // setGrammarTooData(rawGrammarTooData);

        // setVocabulary2Items(rawVocabulary2Data.items.map(v => processVehicle({ ...v, id: v.word, category: 'vocabulary_use_a_bike' })));
        
        // setDialogue(rawDialogueData.map(processDialogueLine));
        // setSections(Object.entries(rawSurveyData.sections).reduce((acc, [key, value]) => ({ ...acc, [key]: value.map(processDialogueLine) }), {}));
        // setTransportPhrases(rawTransportData.map(processDialogueLine));
        // setByPhrases(rawByData.map(processDialogueLine));
        // setBikePhrases(rawBikeData.map(processDialogueLine));
        // setPracticeBikePhrases(rawPracticeBikeData.map(processDialogueLine));

        // const processedPracticeBike2 = rawPracticeBike2Data.items.map(item => ({
        //     ...item,
        //     sentences: item.sentences.map((s, i) => ({
        //         id: `${item.action}-${i}`,
        //         speaker: 'Example',
        //         text: s.text,
        //         meaning_vi: s.meaning_vi,
        //         audioSrc: `${API_BASE_URL}${s.audio_path.trim()}`,
        //     }))
        // }));
        // setPracticeBike2Items(processedPracticeBike2);

        // setContrastPhrases(rawContrastData.items.map((item, i) => ({ id: `contrast-${i}`, speaker: 'Example', text: item.text, meaning_vi: item.meaning_vi, audioSrc: `${API_BASE_URL}${item.audio_path}` })));
        // setSayFastPhrases(rawSayFastData.items.map((item, i) => ({ id: `sayfast-${i}`, speaker: 'Example', text: item.text, meaning_vi: item.meaning_vi, audioSrc: `${API_BASE_URL}${item.audio_path}` })));
        // setReadingPhrases(rawReadingData.items.map((item, i) => ({ id: `reading-${i}`, speaker: 'Reader', text: item.text, meaning_vi: item.meaning_vi, audioSrc: `${API_BASE_URL}${item.audio_path}` })));
        
        const processReadingData = (data: HotAirBalloonReadingApiResponse[], idPrefix: string): DialogueLine[] => 
            data.map((item, i) => ({
                id: `${idPrefix}-${i}`,
                speaker: 'Narrator',
                text: item.text,
                meaning_vi: item.vi,
                audioSrc: `${API_BASE_URL}${item.audioSrc}`
            }));
            
        const processVocabData = (data: HotAirBalloonVocabularyApiResponse[], idPrefix: string): Vehicle[] =>
            data.map((item, i) => ({
                id: `${idPrefix}-vocab-${i}`,
                word: item.word,
                meaning_vi: item.vi,
                imageSrc: `${API_BASE_URL}${item.imageSrc}`,
                audioSrc: `${API_BASE_URL}${item.audioSrc}`,
            }));

        // setHotAirBalloonsReading(processReadingData(rawHotAirBalloonReadingData, 'hab'));
        // setHotAirBalloonsReadingImage(rawHotAirBalloonFilesData.imageSrc);
        // setHotAirBalloonsVocabulary(processVocabData(rawHotAirBalloonVocabularyData, 'hab'));
        // setHotAirBalloonsExercises(rawHotAirBalloonsExercisesData);
        // setHotAirBalloonsWeirdButTrue(rawHotAirBalloonsWeirdButTrueData);
        // setCatchTheBusReading(processReadingData(rawCatchTheBusReadingData, 'ctb'));
        // setCatchTheBusReadingImage(rawCatchTheBusFilesData.imageSrc);
        // setCatchTheBusVocabulary(processVocabData(rawCatchTheBusVocabularyData as any, 'ctb'));
        // setTheLionAndTheMouseReading(processReadingData(rawTheLionAndTheMouseReadingData, 'tlm'));
        // setTheLionAndTheMouseReadingImage(rawTheLionAndTheMouseFilesData.imageSrc);
        // setTheLionAndTheMouseVocabulary(processVocabData(rawTheLionAndTheMouseVocabularyData as any, 'tlm'));
        // setTheLionAndTheMouseExercises(rawTheLionAndTheMouseExercisesData);
        
        
        
        
        
        setUnit4ReadingData(rawSensesReadingData);
        setUnit4WritingData(rawSensesWritingData);
        setSensesSpinData(rawSensesSpinData);
        setSensesSpinDataToBe(rawSensesSpinDataToBe);
        setSensesSpinDataTaste(rawSensesSpinDataTaste);
        // console.log(rawCircleActivity)
        // setSensesWorkbook(prev => ({
        //     ...prev,
        //     circleActivity: unit4GWorkbookCircleActivityDataTS
        //     }));    
        setSensesWorkbook({
            circleActivity: rawCircleActivitytest,
            listenWrite: rawListenWritetest,
            matchActivity: rawMatchActivitytest,
            songMatch: rawSongMatchtest,
            songWrite: rawSongWritetest,
            grammar1: rawGrammar1test,
            grammar1Match: rawGrammar1Matchtest,
            unscrambleSentences: rawUnscrambleSentencestest,
            readWrite: rawReadWritetest,
            lookSmellTaste: rawLookSmellTastetest,
            vocabulary2ReadWrite: rawVocabulary2ReadWritetest,
            vocabulary2SortWords: rawVocabulary2SortWordstest,
            grammar2WasWere: rawGrammar2WasWeretest,
            grammar2LookMatch: rawGrammar2LookMatchtest,
            grammar2ReadWrite: rawGrammar2ReadWritetest,
            grammar2RolePlay: rawGrammar2RolePlaytest,
            gameTimeCrossword: rawGameTimeCrosswordtest,
            lookWrite: rawLookWritetest,
            listenReadFast: rawListenReadFasttest,
            readingStinkyAnimals: rawReadingStinkyAnimalstest,
            readingTrueFalse: rawReadingTrueFalsetest,
            readingCompleteChart: rawReadingCompleteCharttest,
            readWriteTurtle: rawReadWriteTurtletest,
            readWriteWinter: rawReadWriteWintertest,
            readChoose: rawReadChoosetest,
            readWriteFromBox: rawReadWriteFromBoxtest,
            readWriteSenseTable: rawReadWriteSenseTabletest,
            // finalTestListenChoose: rawFinalTestListenChoose,
            // spinWheelVocab: rawSpinWheelVocab,
        
        });
        setUnit5WorkbookFixData({
            lookAndMatch:rawUnit5WorkbookVocabSectionData,
            songWorkbook:rawUnit5WorkbookSongSectionData,
            grammar1Workbook:rawUnit5WorkbookGrammar1SectionData,
            vocabulary2Workbook:rawUnit5WorkbookVocabulary2SectionData,
            grammar2Workbook:rawUnit5WorkbookGrammar2SectionData,
            gameTimeWorkbook:rawUnit5WorkbookGameTimePuzzleSectionData

        })
        console.log(rawUnit5WorkbookVocabSectionData)
        // useEffect(() => {
        //     if (sensesWorkbook?.circleActivity) {
        //         console.log("Updated circleActivity:", sensesWorkbook.circleActivity);
        //     }
        // }, [sensesWorkbook?.circleActivity]);
        // Set state for new units
        setUnit5Vocab1Data(rawUnit5Vocabulary1Data);
        setUnit5Grammar1Data(rawUnit5Grammar1Data);
        setUnit5SongData(rawUnitSongData);
        setUnit5Vocabulary2Data(rawUnit5Vocabulary2Data);
        setUnit5GrammarMatchData(rawUnit5GrammarMatchData);
        setUnit5Grammar2Data(rawUnit5Grammar2Data);
        setUnit5ReadingData(rawUnit5ReadingData);
        setUnit5ReadWriteWhyData(rawUnit5ReadWriteWhyData);
        setUnit5AskAndAnswerData(rawUnit5AskAndAnswerData);
        setUnit5WritingData(rawUnit5WritingData);
        console.log(rawUnit5WritingData)
        setUnit7Vocab1Data(processUnit7Vocab1Data(rawUnit7Vocab1Data));
        setUnit7Vocab2Data(processUnit7Vocab2Data(rawUnit7Vocab2Data));
        setUnit7Grammar1Data(processUnit7Grammar1Data(rawUnit7Grammar1Data));
        setUnit7Grammar2Data(processUnit7Grammar2Data(rawUnit7Grammar2Data));
        setUnit7GameData(processUnit7GameData(rawUnit7GameData));
        setUnit7SongData(processUnit7SongData(rawUnit7SongData));
        setUnit7ReadingData(processUnit7ReadingData(rawUnit7ReadingData));
        setUnit7WorkbookData(processUnit7WorkbookData(rawUnit7WorkbookData));
        setUnit7WritingData(processUnit7WritingData(rawUnit7WritingData));
        setUnit7ReviewData(processUnit7ReviewData(rawUnit7ReviewData));
        setUnit8Vocabulary1Data(processUnit8Vocabulary1Data(rawUnit8Vocabulary1Data));
        setUnit8Grammar1Data(processUnit8Grammar1Data(rawUnit8Grammar1Data));
        setUnit8Vocabulary2Data(processUnit8Vocabulary2Data(rawUnit8Vocabulary2Data));
        setUnit8Grammar2Data(processUnit8Grammar2Data(rawUnit8Grammar2Data));
        setUnit8ReadingData(processUnit8ReadingData(rawUnit8ReadingData));
        setUnit8WritingData(processUnit8WritingData(rawUnit8WritingData));
        setUnit8GameData(processUnit8GameData(rawUnit8GameData));
        setUnit8WorkbookData(processUnit8WorkbookData(combinedUnit8WorkbookData));
        setUnit9Vocabulary1Data(processUnit9Vocabulary1Data(rawunit9Vocabulary1DataTS));
        setUnit9SongData(processUnit9SongData(rawUnit9SongDataTS));
        setUnit9Grammar1Data(processUnit9Grammar1Data(rawUnit9Grammar1Data));
        setUnit9Vocabulary2Data(processUnit9Vocabulary2Data(rawUnit9Vocabulary2Data));
        setUnit9Grammar2Data(processUnit9Grammar2Data(rawUnit9Grammar2Data));
        setUnit9ReadingData(processUnit9ReadingData(rawUnit9ReadingData));
        setUnit9WritingData(processUnit9WritingData(rawUnit9WritingData));
        setUnit9ExtendedReadingData(processUnit9ExtendedReadingData(rawUnit9ExtendedReadingData));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    if (topic.tabs.length > 0) {
      setSelectedTabId(topic.tabs[0].tabId);
    } else {
      setSelectedTabId(null);
    }
  };

  const handleBack = () => {
    setSelectedTopic(null);
    setSelectedTabId(null);
  };
//   console.log(sensesWorkbook)
  // FIX: Added the main return statement with JSX to render the application's UI.
  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {!selectedTopic ? (
          <TopicsList topics={topics} onSelectTopic={handleTopicSelect} />
        ) : (
          <div>
            <header className="mb-6 flex items-center gap-4">
              <button
                onClick={handleBack}
                className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <div>
                 <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  {selectedTopic.title}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  {selectedTopic.id.replace('unit', 'Unit ')}
                </p>
              </div>
            </header>
            
            {selectedTabId && (
              <TabsList
                tabs={selectedTopic.tabs}
                activeTab={selectedTabId}
                onSelectTab={setSelectedTabId}
              />
            )}

            <main className="mt-8">
              <TabContent
                activeTab={selectedTabId}
                loading={loading}
                error={error}
                vehicles={vehicles}
                exampleVehicles={exampleVehicles}
                groupedInOnLines={groupedInOnLines}
                groupedLikeVehicleLines={groupedLikeVehicleLines}
                groupedTakeRideFlyLines={groupedTakeRideFlyLines}
                grammarTooData={grammarTooData}
                vocabulary2Items={vocabulary2Items}
                dialogue={dialogue}
                sections={sections}
                transportPhrases={transportPhrases}
                byPhrases={byPhrases}
                bikePhrases={bikePhrases}
                practiceBikePhrases={practiceBikePhrases}
                practiceBike2Items={practiceBike2Items}
                contrastPhrases={contrastPhrases}
                sayFastPhrases={sayFastPhrases}
                readingPhrases={readingPhrases}
                hotAirBalloonsReading={hotAirBalloonsReading}
                hotAirBalloonsReadingImage={hotAirBalloonsReadingImage}
                hotAirBalloonsVocabulary={hotAirBalloonsVocabulary}
                hotAirBalloonsExercises={hotAirBalloonsExercises}
                hotAirBalloonsWeirdButTrue={hotAirBalloonsWeirdButTrue}
                catchTheBusReading={catchTheBusReading}
                catchTheBusReadingImage={catchTheBusReadingImage}
                catchTheBusVocabulary={catchTheBusVocabulary}
                theLionAndTheMouseReading={theLionAndTheMouseReading}
                theLionAndTheMouseReadingImage={theLionAndTheMouseReadingImage}
                theLionAndTheMouseVocabulary={theLionAndTheMouseVocabulary}
                theLionAndTheMouseExercises={theLionAndTheMouseExercises}
                // sensesVocabulary1={sensesVocabulary1}
                // sensesDescribeGuess={sensesDescribeGuess}
                unit4Vocabulary1Data={unit4Vocabulary1Data}
                unit4SongData={unit4SongData}
                
                unit4Grammar1Data={unit4Grammar1Data}
                sensesVocabulary2={unit4Vocabulary2Data}
                sensesGrammar2={unit4Grammar2Data}
                sensesReading={unit4ReadingData}
                sensesWriting={unit4WritingData}

                sensesWorkbook={sensesWorkbook}
                sensesSpinData={sensesSpinData}
                sensesSpinDataToBe={sensesSpinDataToBe}
                sensesSpinDataTaste={sensesSpinDataTaste}
                unit1Vocabulary1Data={unit1Vocabulary1Data}
                unit1SongData={unit1SongData}
                unit1Grammar1Data={unit1Grammar1Data}
                unit1Vocabulary2Data={unit1Vocabulary2Data}
                unit1Grammar2Data={unit1Grammar2Data}
                unit1ReadingData={unit1ReadingData}
                unit1WritingData={unit1WritingData}
                unit2Vocabulary1Data={unit2Vocabulary1Data}
                unit2SongData={unit2SongData}
                unit2Grammar1Data={unit2Grammar1Data}
                unit2Vocabulary2Data={unit2Vocabulary2Data}
                unit2Grammar2Data={unit2Grammar2Data}
                unit2ReadingData={unit2ReadingData}
                unit2WritingData={unit2WritingData}
                unit5Vocabulary1Data={unit5Vocabulary1Data} 
                unit5Grammar1Data={unit5Grammar1Data}
                unit5SongData={unit5SongData}
                unit5Vocabulary2Data={unit5Vocabulary2Data}
                unit5GrammarMatchData={unit5GrammarMatchData}
                unit5Grammar2Data={unit5Grammar2Data}
                unit5ReadingData={unit5ReadingData}
                unit5ReadWriteWhyData={unit5ReadWriteWhyData}
                unit5AskAndAnswerData={unit5AskAndAnswerData}
                unit5WritingData={unit5WritingData}              
                unit5Data={unit5Data}
                unit5WorkbookData={unit5WorkbookData}
                unit5WorkbookFixData={unit5WorkbookFixData}
                unit6Data={unit6Data}
                unit6SongData={unit6SongData}
                unit6GrammarData={unit6GrammarData}
                unit6Vocab2Data={unit6Vocab2Data}
                unit6Vocab3Data={unit6Vocab3Data}
                unit6Grammar2Data={unit6Grammar2Data}
                unit6ReadingData={unit6ReadingData}
                unit6WritingData={unit6WritingData}
                unit6ExtendedReadingData={unit6ExtendedReadingData}
                unit6GameData={unit6GameData}
                unit6WorkbookData={unit6WorkbookData}
                unit7Vocab1Data={unit7Vocab1Data}
                unit7Vocab2Data={unit7Vocab2Data}
                unit7Grammar1Data={unit7Grammar1Data}
                unit7Grammar2Data={unit7Grammar2Data}
                unit7GameData={unit7GameData}
                unit7SongData={unit7SongData}
                unit7ReadingData={unit7ReadingData}
                unit7WorkbookData={unit7WorkbookData}
                unit7WritingData={unit7WritingData}
                unit7ReviewData={unit7ReviewData}
                unit8Vocabulary1Data={unit8Vocabulary1Data}
                unit8Grammar1Data={unit8Grammar1Data}
                unit8Vocabulary2Data={unit8Vocabulary2Data}
                unit8Grammar2Data={unit8Grammar2Data}
                unit8ReadingData={unit8ReadingData}
                unit8WritingData={unit8WritingData}
                unit8GameData={unit8GameData}
                unit8WorkbookData={unit8WorkbookData}
                unit9Vocabulary1Data={unit9Vocabulary1Data}
                unit9SongData={unit9SongData}
                unit9Grammar1Data={unit9Grammar1Data}
                unit9Vocabulary2Data={unit9Vocabulary2Data}
                unit9Grammar2Data={unit9Grammar2Data}
                unit9ReadingData={unit9ReadingData}
                unit9WritingData={unit9WritingData}
                unit9ExtendedReadingData={unit9ExtendedReadingData}
              />
            </main>
          </div>
        )}
      </div>
    </div>
  );
};
