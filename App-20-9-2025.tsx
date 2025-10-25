import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from './constants';
import { topics } from './data/topics';
import type { Topic } from './data/topics';
import { TopicsList } from './components/TopicsList';
import { TabsList } from './components/TabsList';
import { TabContent } from './components/TabContent';
import { ChevronLeftIcon } from './components/IconComponents';
// FIX: Corrected type imports for Unit 6, 7, and 8 data structures.
// FIX: Imported missing types for Unit 6 writing examples.
// FIX: Imported all missing types for Units 7, 8, and 9.
import type { ActiveTab, DialogueLine, Vehicle, InOnLine, LikeVehicleLine, TakeRideFlyLine, GrammarTooEither, VocabularyApiResponse, PracticeBike2ApiResponse, ProcessedPracticeBike2Item, PracticeBike2Item, PracticeBike2Sentence, ContrastApiResponse, SayFastApiResponse, ReadingApiResponse, ExampleVehicleApiResponse, ProcessedExampleVehicle, HotAirBalloonReadingApiResponse, HotAirBalloonVocabularyApiResponse, HotAirBalloonExercisesApiResponse, HotAirBalloonWeirdButTrueApiResponse, HotAirBalloonFilesApiResponse, CatchTheBusReadingApiResponse, CatchTheBusVocabularyApiResponse, CatchTheBusFilesApiResponse, TheLionAndTheMouseReadingApiResponse, TheLionAndTheMouseVocabularyApiResponse, TheLionAndTheMouseFilesApiResponse, TheLionAndTheMouseExercisesApiResponse, SensesDescribeGuess, SensesSong, SensesGrammar1, SensesVocabulary2, SensesGrammar2, SensesReading, SensesWriting, SensesWorkbook, Unit5Data, SpinTabData, AnimalHabitatsVocabSection, AnimalHabitatsQASection, AnimalHabitatsSongSection, AnimalHabitatsGrammar1Section, AnimalHabitatsQAItem, AnimalHabitatsGrammar1Example, AnimalHabitatsMatchSection, AnimalHabitatsMatchQuestion, AnimalHabitatsReadWriteSection, AnimalHabitatsReadWriteItem, AnimalHabitatsAskAnswerSection, AnimalHabitatsAskAnswerItem, AnimalHabitatsVocab2Section, DragDropSection, AnimalHabitatsGrammar2Section, ReadMatchSection, DiceSection, ListenReadSection, ReadCircleSection, ChartCompletionSection, SpeakingSection, Unit6Vocabulary1Data, Unit6SongData, Unit6GrammarData, Unit6Vocabulary2Data, Unit6Grammar2Data, Unit6ReadingData, Unit5WorkbookData, Unit6WritingData, Unit6ExtendedReadingData, Unit6GameData, Unit6WorkbookData, Unit5WorkbookVocab2Section, Unit6Vocabulary3Data, Unit7Vocabulary1Data, Unit7Vocabulary2Data, Unit6Song_ReadAndSingSection, Unit6Song_ActivitySection, Unit7Grammar1Data, Unit7GameData, Unit7Grammar2Data, Unit7SongData, Unit7ReadingData, Unit7WorkbookData, Unit7WritingData, Unit7ReviewData, Unit8Vocabulary1Data, Unit8Grammar1Data, Unit8Vocabulary2Data, Unit8Grammar2Data, Unit8ReadingData, Unit8WritingData, Unit8WorkbookData, Unit8WorkbookVocabulary1Data, Unit8WorkbookSongData, Unit8WorkbookGrammar1Data, Unit8WorkbookVocabulary2Data, Unit8WorkbookGrammar2Data, Unit8GameData, ListenReadFastGameContent, Unit8WorkbookReadingData, Unit8WorkbookWritingData, Unit8WorkbookReviewData, Unit6WritingExample, Unit6WritingCheckExample, Unit9Vocabulary1Data, Unit9SongData, Unit9Grammar1Data, Unit9Grammar1Data as Unit9Grammar1DataType, Unit9Vocabulary2Data, Unit9Grammar2Data, Unit9ReadingData } from './types';

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
  const [sensesVocabulary1, setSensesVocabulary1] = useState<Vehicle[]>([]);
  const [sensesDescribeGuess, setSensesDescribeGuess] = useState<SensesDescribeGuess | null>(null);
  const [sensesSong, setSensesSong] = useState<SensesSong | null>(null);
  const [sensesGrammar1, setSensesGrammar1] = useState<SensesGrammar1 | null>(null);
  const [sensesVocabulary2, setSensesVocabulary2] = useState<SensesVocabulary2 | null>(null);
  const [sensesGrammar2, setSensesGrammar2] = useState<SensesGrammar2 | null>(null);
  const [sensesReading, setSensesReading] = useState<SensesReading | null>(null);
  const [sensesWriting, setSensesWriting] = useState<SensesWriting | null>(null);
  const [sensesWorkbook, setSensesWorkbook] = useState<SensesWorkbook | null>(null);
  const [sensesSpinData, setSensesSpinData] = useState<SpinTabData | null>(null);
  const [sensesSpinDataToBe, setSensesSpinDataToBe] = useState<SpinTabData | null>(null);
  const [sensesSpinDataTaste, setSensesSpinDataTaste] = useState<SpinTabData | null>(null);
  const [unit5Data, setUnit5Data] = useState<Unit5Data | null>(null);
  const [unit5WorkbookData, setUnit5WorkbookData] = useState<Unit5WorkbookData | null>(null);
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
  const [unit9Grammar2Data, setUnit9Grammar2Data] = useState<Unit9Grammar2Data | null>(null);
  const [unit9ReadingData, setUnit9ReadingData] = useState<Unit9ReadingData | null>(null);
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
            '/api/unit/unit6_what_is_for_dinner',
            '/api/unit/unit6_lets_go_shopping_song',
            '/api/unit/unit6_grammar_some_any',
            '/api/unit/unit6_vocabulary_2',
            '/api/unit/unit6_grammar_2',
            '/api/unit/unit6_reading',
            '/api/unit/unit6_writing',
            '/api/unit/unit6_extended_reading',
            '/api/unit/unit6_question_wheel',
            '/api/unit/unit6_full_workbook',
            '/api/unit/unit6_vocabulary_3',
            '/api/unit/unit7_feeling_fit_vocab1',
            '/api/unit/unit7_feeling_fit_vocab2',
            '/api/unit/unit7_feeling_fit_grammar1',
            '/api/unit/unit7_grammar2',
            '/api/unit/unit7_question_wheel',
            '/api/unit/unit7_song',
            '/api/unit/unit7_reading',
            '/api/unit/unit7_writing',
            '/api/unit/unit7_review',
            // Unit 7 Workbook fetches
            '/api/unit/workbook_vocabulary1',
            '/api/unit/workbook_unit7_song',
            '/api/unit/workbook_unit7_grammar1',
            '/api/unit/workbook_unit7_vocabulary2',
            '/api/unit/workbook_unit7_grammar2',
            '/api/unit/workbook_unit7_gametime',
            '/api/unit/workbook_unit7_reading',
            '/api/unit/workbook_unit7_writing',
            '/api/unit/workbook_unit7_review',
            '/api/unit/unit8_vocabulary1',
            '/api/unit/unit8_grammar1',
            '/api/unit/unit8_vocabulary2',
            '/api/unit/unit8_grammar2',
            '/api/unit/unit8_reading',
            '/api/unit/unit8_writing',
            '/api/unit/unit8_game_time',
            '/api/unit/unit8_workbook_vocabulary1',
            '/api/unit/unit8_workbook_song',
            '/api/unit/unit8_workbook_grammar1',
            '/api/unit/unit8_workbook_vocabulary2',
            '/api/unit/unit8_workbook_grammar2',
            '/api/unit/unit8_workbook_reading',
            '/api/unit/unit8_workbook_writing',
            '/api/unit/unit8_workbook_review',
            '/api/unit/unit9_vocabulary1',
            '/api/unit/unit9_song',
            '/api/unit/unit9_grammar1',
            '/api/unit/unit9_vocabulary2',
            '/api/unit/unit9_grammar2',
            '/api/unit/unit9_reading',
        ];

        const [vehiclesRes, exampleVehiclesRes, inOnRes, likeVehicleRes, takeRideFlyRes, grammarTooRes, vocabulary2Res, dialogueRes, sectionsRes, transportRes, byRes, bikeRes, practiceBikeRes, practiceBike2Res, contrastRes, sayFastRes, readingRes, hotAirBalloonReadingRes, hotAirBalloonVocabularyRes, hotAirBalloonExercisesRes, hotAirBalloonWeirdButTrueRes, hotAirBalloonFilesRes, catchTheBusReadingRes, catchTheBusVocabularyRes, catchTheBusFilesRes, theLionAndTheMouseReadingRes, theLionAndTheMouseVocabularyRes, theLionAndTheMouseFilesRes, theLionAndTheMouseExercisesRes, sensesVocabulary1Res, sensesSongRes, sensesGrammar1Res, sensesVocabulary2Res, sensesGrammar2Res, sensesReadingRes, sensesWritingRes, sensesSpinDataRes, sensesSpinDataToBeRes, sensesSpinDataTasteRes, ...restResponses] = await Promise.all(
          apiEndpoints.map(url => fetch(`${API_BASE_URL}${url}`))
        );
        
        const unit9ReadingRes = restResponses.pop();
        const unit9Grammar2Res = restResponses.pop();
        const unit9Vocabulary2Res = restResponses.pop();
        const unit9Grammar1Res = restResponses.pop();
        const unit9SongRes = restResponses.pop();
        const unit9Vocabulary1Res = restResponses.pop();
        const unit8WorkbookReviewRes = restResponses.pop();
        const unit8WorkbookWritingRes = restResponses.pop();
        const unit8WorkbookReadingRes = restResponses.pop();
        const unit8WorkbookGrammar2Res = restResponses.pop();
        const unit8WorkbookVocab2Res = restResponses.pop();
        const unit8WorkbookGrammar1Res = restResponses.pop();
        const unit8WorkbookSongRes = restResponses.pop();
        const unit8WorkbookVocab1Res = restResponses.pop();
        const unit8GameDataRes = restResponses.pop();
        const unit8WritingRes = restResponses.pop();
        const unit8ReadingRes = restResponses.pop();
        const unit8Grammar2Res = restResponses.pop();
        const unit8Vocab2Res = restResponses.pop();
        const unit8Grammar1Res = restResponses.pop();
        const unit8Vocab1Res = restResponses.pop();
        const unit7WorkbookReviewRes = restResponses.pop();
        const unit7WorkbookWritingRes = restResponses.pop();
        const unit7WorkbookReadingRes = restResponses.pop();
        const unit7WorkbookGameTimeRes = restResponses.pop();
        const unit7WorkbookGrammar2Res = restResponses.pop();
        const unit7WorkbookVocab2Res = restResponses.pop();
        const unit7WorkbookGrammar1Res = restResponses.pop();
        const unit7WorkbookSongRes = restResponses.pop();
        const unit7WorkbookVocab1Res = restResponses.pop();
        const unit7ReviewDataRes = restResponses.pop();
        const unit7WritingDataRes = restResponses.pop();
        const unit7ReadingDataRes = restResponses.pop();
        const unit7SongDataRes = restResponses.pop();
        const unit7GameDataRes = restResponses.pop();
        const unit7Grammar2DataRes = restResponses.pop();
        const unit7Grammar1DataRes = restResponses.pop();
        const unit7Vocab2DataRes = restResponses.pop();
        const unit7Vocab1DataRes = restResponses.pop();
        const unit6Vocab3DataRes = restResponses.pop();
        const unit6WorkbookDataRes = restResponses.pop();
        const unit6GameDataRes = restResponses.pop();
        const unit6ExtendedReadingDataRes = restResponses.pop();
        const unit6WritingDataRes = restResponses.pop();
        const unit6ReadingDataRes = restResponses.pop();
        const unit6Grammar2DataRes = restResponses.pop();
        const unit6Vocab2DataRes = restResponses.pop();
        const unit6GrammarDataRes = restResponses.pop();
        const unit6SongDataRes = restResponses.pop();
        const unit6DataRes = restResponses.pop();
        const unit5WorkbookDataRes = restResponses.pop();
        const unit5DataRes = restResponses.pop();
        const workbookResponses = restResponses;

        const allResponses = [
            vehiclesRes, exampleVehiclesRes, inOnRes, likeVehicleRes, takeRideFlyRes, grammarTooRes,
            vocabulary2Res, dialogueRes, sectionsRes, transportRes, byRes, bikeRes, practiceBikeRes,
            practiceBike2Res, contrastRes, sayFastRes, readingRes, hotAirBalloonReadingRes,
            hotAirBalloonVocabularyRes, hotAirBalloonExercisesRes, hotAirBalloonWeirdButTrueRes,
            hotAirBalloonFilesRes, catchTheBusReadingRes, catchTheBusVocabularyRes, catchTheBusFilesRes,
            theLionAndTheMouseReadingRes, theLionAndTheMouseVocabularyRes, theLionAndTheMouseFilesRes,
            theLionAndTheMouseExercisesRes, sensesVocabulary1Res, sensesSongRes, sensesGrammar1Res,
            sensesVocabulary2Res, sensesGrammar2Res, sensesReadingRes, sensesWritingRes, sensesSpinDataRes, sensesSpinDataToBeRes, sensesSpinDataTasteRes,
            ...workbookResponses,
            unit5DataRes,
            unit5WorkbookDataRes,
            unit6DataRes,
            unit6SongDataRes,
            unit6GrammarDataRes,
            unit6Vocab2DataRes,
            unit6Grammar2DataRes,
            unit6ReadingDataRes,
            unit6WritingDataRes,
            unit6ExtendedReadingDataRes,
            unit6GameDataRes,
            unit6WorkbookDataRes,
            unit6Vocab3DataRes,
            unit7Vocab1DataRes,
            unit7Vocab2DataRes,
            unit7Grammar1DataRes,
            unit7Grammar2DataRes,
            unit7GameDataRes,
            unit7SongDataRes,
            unit7ReadingDataRes,
            unit7WritingDataRes,
            unit7ReviewDataRes,
            unit7WorkbookVocab1Res,
            unit7WorkbookSongRes,
            unit7WorkbookGrammar1Res,
            unit7WorkbookVocab2Res,
            unit7WorkbookGrammar2Res,
            unit7WorkbookGameTimeRes,
            unit7WorkbookReadingRes,
            unit7WorkbookWritingRes,
            unit7WorkbookReviewRes,
            unit8Vocab1Res,
            unit8Grammar1Res,
            unit8Vocab2Res,
            unit8Grammar2Res,
            unit8ReadingRes,
            unit8WritingRes,
            unit8GameDataRes,
            unit8WorkbookVocab1Res,
            unit8WorkbookSongRes,
            unit8WorkbookGrammar1Res,
            unit8WorkbookVocab2Res,
            unit8WorkbookGrammar2Res,
            unit8WorkbookReadingRes,
            unit8WorkbookWritingRes,
            unit8WorkbookReviewRes,
            unit9Vocabulary1Res,
            unit9SongRes,
            unit9Grammar1Res,
            unit9Vocabulary2Res,
            unit9Grammar2Res,
            unit9ReadingRes,
        ];

        console.log('--- API Fetch Status ---');
        allResponses.forEach((res, index) => {
            if (res) {
                console.log(`[${index + 1}] ${apiEndpoints[index]}: ${res.ok}`);
            }
        });
        console.log('------------------------');


        if (!vehiclesRes.ok || !exampleVehiclesRes.ok || !inOnRes.ok || !likeVehicleRes.ok || !takeRideFlyRes.ok || !grammarTooRes.ok || !vocabulary2Res.ok || !dialogueRes.ok || !sectionsRes.ok || !transportRes.ok || !byRes.ok || !bikeRes.ok || !practiceBikeRes.ok || !practiceBike2Res.ok || !contrastRes.ok || !sayFastRes.ok || !readingRes.ok || !hotAirBalloonReadingRes.ok || !hotAirBalloonVocabularyRes.ok || !hotAirBalloonExercisesRes.ok || !hotAirBalloonWeirdButTrueRes.ok || !hotAirBalloonFilesRes.ok || !catchTheBusReadingRes.ok || !catchTheBusVocabularyRes.ok || !catchTheBusFilesRes.ok || !theLionAndTheMouseReadingRes.ok || !theLionAndTheMouseVocabularyRes.ok || !theLionAndTheMouseFilesRes.ok || !theLionAndTheMouseExercisesRes.ok || !sensesVocabulary1Res.ok || !sensesSongRes.ok || !sensesGrammar1Res.ok || !sensesVocabulary2Res.ok || !sensesGrammar2Res.ok || !sensesReadingRes.ok || !sensesWritingRes.ok || !sensesSpinDataRes.ok || !sensesSpinDataToBeRes.ok || !sensesSpinDataTasteRes.ok || workbookResponses.some(res => !res.ok) || !unit5DataRes.ok || !unit5WorkbookDataRes.ok || !unit6DataRes.ok || !unit6SongDataRes.ok || !unit6GrammarDataRes.ok || !unit6Vocab2DataRes.ok || !unit6Grammar2DataRes.ok || !unit6ReadingDataRes.ok || !unit6WritingDataRes.ok || !unit6ExtendedReadingDataRes.ok || !unit6GameDataRes.ok || !unit6WorkbookDataRes.ok || !unit6Vocab3DataRes.ok || !unit7Vocab1DataRes.ok || !unit7Vocab2DataRes.ok || !unit7Grammar1DataRes.ok || !unit7Grammar2DataRes.ok || !unit7GameDataRes.ok || !unit7SongDataRes.ok || !unit7ReadingDataRes.ok || !unit7WritingDataRes.ok || !unit7ReviewDataRes.ok || !unit7WorkbookVocab1Res.ok || !unit7WorkbookSongRes.ok || !unit7WorkbookGrammar1Res.ok || !unit7WorkbookVocab2Res.ok || !unit7WorkbookGrammar2Res.ok || !unit7WorkbookGameTimeRes.ok || !unit7WorkbookReadingRes.ok || !unit7WorkbookWritingRes.ok || !unit7WorkbookReviewRes.ok || !unit8Vocab1Res.ok || !unit8Grammar1Res.ok || !unit8Vocab2Res.ok || !unit8Grammar2Res.ok || !unit8ReadingRes.ok || !unit8WritingRes.ok || !unit8GameDataRes.ok || !unit8WorkbookVocab1Res.ok || !unit8WorkbookSongRes.ok || !unit8WorkbookGrammar1Res.ok || !unit8WorkbookVocab2Res.ok || !unit8WorkbookGrammar2Res.ok || !unit8WorkbookReadingRes.ok || !unit8WorkbookWritingRes.ok || !unit8WorkbookReviewRes.ok || !unit9Vocabulary1Res.ok || !unit9SongRes.ok || !unit9Grammar1Res.ok || !unit9Vocabulary2Res.ok || !unit9Grammar2Res.ok || !unit9ReadingRes.ok) {
          throw new Error('Failed to fetch all required data from the server.');
        }

        const rawVehiclesData: Vehicle[] = await vehiclesRes.json();
        const rawExampleVehiclesData: ExampleVehicleApiResponse[] = await exampleVehiclesRes.json();
        const rawInOnData: InOnLine[] = await inOnRes.json();
        const rawLikeVehicleData: LikeVehicleLine[] = await likeVehicleRes.json();
        const rawTakeRideFlyData: TakeRideFlyLine[] = await takeRideFlyRes.json();
        const rawGrammarTooData: GrammarTooEither = await grammarTooRes.json();
        const rawVocabulary2Data: VocabularyApiResponse = await vocabulary2Res.json();
        const rawDialogueData: DialogueLine[] = await dialogueRes.json();
        const rawSurveyData: { sections: Record<string, DialogueLine[]> } = await sectionsRes.json();
        const rawTransportData: DialogueLine[] = await transportRes.json();
        const rawByData: DialogueLine[] = await byRes.json();
        const rawBikeData: DialogueLine[] = await bikeRes.json();
        const rawPracticeBikeData: DialogueLine[] = await practiceBikeRes.json();
        const rawPracticeBike2Data: PracticeBike2ApiResponse = await practiceBike2Res.json();
        const rawContrastData: ContrastApiResponse = await contrastRes.json();
        const rawSayFastData: SayFastApiResponse = await sayFastRes.json();
        const rawReadingData: ReadingApiResponse = await readingRes.json();
        const rawHotAirBalloonReadingData: HotAirBalloonReadingApiResponse[] = await hotAirBalloonReadingRes.json();
        const rawHotAirBalloonVocabularyData: HotAirBalloonVocabularyApiResponse[] = await hotAirBalloonVocabularyRes.json();
        const rawHotAirBalloonsExercisesData: any = await hotAirBalloonExercisesRes.json();
        const rawHotAirBalloonsWeirdButTrueData: HotAirBalloonWeirdButTrueApiResponse = await hotAirBalloonWeirdButTrueRes.json();
        const rawHotAirBalloonFilesData: HotAirBalloonFilesApiResponse = await hotAirBalloonFilesRes.json();
        const rawCatchTheBusReadingData: CatchTheBusReadingApiResponse[] = await catchTheBusReadingRes.json();
        const rawCatchTheBusVocabularyData: CatchTheBusVocabularyApiResponse[] = await catchTheBusVocabularyRes.json();
        const rawCatchTheBusFilesData: CatchTheBusFilesApiResponse = await catchTheBusFilesRes.json();
        const rawTheLionAndTheMouseReadingData: TheLionAndTheMouseReadingApiResponse[] = await theLionAndTheMouseReadingRes.json();
        const rawTheLionAndTheMouseVocabularyData: TheLionAndTheMouseVocabularyApiResponse[] = await theLionAndTheMouseVocabularyRes.json();
        const rawTheLionAndTheMouseFilesData: TheLionAndTheMouseFilesApiResponse = await theLionAndTheMouseFilesRes.json();
        const rawTheLionAndTheMouseExercisesData: TheLionAndTheMouseExercisesApiResponse = await theLionAndTheMouseExercisesRes.json();
        const rawSensesVocabulary1Data: any = await sensesVocabulary1Res.json();
        const rawSensesSongData: SensesSong = await sensesSongRes.json();
        const rawSensesGrammar1Data: SensesGrammar1 = await sensesGrammar1Res.json();
        const rawSensesVocabulary2Data: SensesVocabulary2 = await sensesVocabulary2Res.json();
        const rawSensesGrammar2Data: SensesGrammar2 = await sensesGrammar2Res.json();
        const rawSensesReadingData: SensesReading = await sensesReadingRes.json();
        const rawSensesWritingData: SensesWriting = await sensesWritingRes.json();
        const rawSensesSpinData: SpinTabData = await sensesSpinDataRes.json();
        const rawSensesSpinDataToBe: SpinTabData = await sensesSpinDataToBeRes.json();
        const rawSensesSpinDataTaste: SpinTabData = await sensesSpinDataTasteRes.json();
        const [rawCircleActivity, rawListenWrite, rawMatchActivity, rawSongMatch, rawSongWrite, rawGrammar1, rawGrammar1Match, rawUnscrambleSentences, rawReadWrite, rawLookSmellTaste, rawVocabulary2ReadWrite, rawVocabulary2SortWords, rawGrammar2WasWere, rawGrammar2LookMatch, rawGrammar2ReadWrite, rawGrammar2RolePlay, rawGameTimeCrossword, rawLookWrite, rawListenReadFast, rawReadingStinkyAnimals, rawReadingTrueFalse, rawReadingCompleteChart, rawReadWriteTurtle, rawReadWriteWinter, rawReadChoose, rawReadWriteFromBox, rawReadWriteSenseTable, rawFinalTestListenChoose, rawSpinWheelVocab] = await Promise.all(workbookResponses.map(res => res.json()));
        const rawUnit5Data: Unit5Data = await unit5DataRes.json();
        const rawUnit5WorkbookData: Unit5WorkbookData = await unit5WorkbookDataRes.json();
        const rawUnit6Data: Unit6Vocabulary1Data = await unit6DataRes.json();
        const rawUnit6SongData: Unit6SongData = await unit6SongDataRes.json();
        const rawUnit6GrammarData: Unit6GrammarData = await unit6GrammarDataRes.json();
        const rawUnit6Vocab2Data: Unit6Vocabulary2Data = await unit6Vocab2DataRes.json();
        const rawUnit6Grammar2Data: Unit6Grammar2Data = await unit6Grammar2DataRes.json();
        const rawUnit6ReadingData: Unit6ReadingData = await unit6ReadingDataRes.json();
        const rawUnit6WritingData: Unit6WritingData = await unit6WritingDataRes.json();
        const rawUnit6ExtendedReadingData: Unit6ExtendedReadingData = await unit6ExtendedReadingDataRes.json();
        const rawUnit6GameData: Unit6GameData = await unit6GameDataRes.json();
        const rawUnit6WorkbookData: Unit6WorkbookData = await unit6WorkbookDataRes.json();
        const rawUnit6Vocab3Data: Unit6Vocabulary3Data = await unit6Vocab3DataRes.json();
        const rawUnit7Vocab1Data: Unit7Vocabulary1Data = await unit7Vocab1DataRes.json();
        const rawUnit7Vocab2Data: Unit7Vocabulary2Data = await unit7Vocab2DataRes.json();
        const rawUnit7Grammar1Data: Unit7Grammar1Data = await unit7Grammar1DataRes.json();
        const rawUnit7Grammar2Data: Unit7Grammar2Data = await unit7Grammar2DataRes.json();
        const rawUnit7GameData: Unit7GameData = await unit7GameDataRes.json();
        const rawUnit7SongData: Unit7SongData = await unit7SongDataRes.json();
        const rawUnit7ReadingData: Unit7ReadingData = await unit7ReadingDataRes.json();
        const rawUnit7WorkbookVocab1Data: { sections: any[] } = await unit7WorkbookVocab1Res.json();
        const rawUnit7WorkbookSongData: { sections: any[] } = await unit7WorkbookSongRes.json();
        const rawUnit7WorkbookGrammar1Data: { sections: any[] } = await unit7WorkbookGrammar1Res.json();
        const rawUnit7WorkbookVocab2Data: { sections: any[] } = await unit7WorkbookVocab2Res.json();
        const rawUnit7WorkbookGrammar2Data: { sections: any[] } = await unit7WorkbookGrammar2Res.json();
        const rawUnit7WorkbookGameTimeData: { sections: any[] } = await unit7WorkbookGameTimeRes.json();
        const rawUnit7WorkbookReadingData: { sections: any[] } = await unit7WorkbookReadingRes.json();
        const rawUnit7WorkbookWritingData: { sections: any[] } = await unit7WorkbookWritingRes.json();
        const rawUnit7WorkbookReviewData: { sections: any[] } = await unit7WorkbookReviewRes.json();
        const rawUnit7WritingData: Unit7WritingData = await unit7WritingDataRes.json();
        const rawUnit7ReviewData: Unit7ReviewData = await unit7ReviewDataRes.json();
        const rawUnit8Vocabulary1Data: Unit8Vocabulary1Data = await unit8Vocab1Res.json();
        const rawUnit8Grammar1Data: Unit8Grammar1Data = await unit8Grammar1Res.json();
        const rawUnit8Vocabulary2Data: Unit8Vocabulary2Data = await unit8Vocab2Res.json();
        const rawUnit8Grammar2Data: Unit8Grammar2Data = await unit8Grammar2Res.json();
        const rawUnit8ReadingData: Unit8ReadingData = await unit8ReadingRes.json();
        // FIX: Corrected typo from unit8WritingDataRes to unit8WritingRes.
        const rawUnit8WritingData: Unit8WritingData = await unit8WritingRes.json();
        const rawUnit8GameData: Unit8GameData = await unit8GameDataRes.json();
        const rawUnit8WorkbookVocab1Data: Unit8WorkbookVocabulary1Data = await unit8WorkbookVocab1Res.json();
        const rawUnit8WorkbookSongData: Unit8WorkbookSongData = await unit8WorkbookSongRes.json();
        const rawUnit8WorkbookGrammar1Data: Unit8WorkbookGrammar1Data = await unit8WorkbookGrammar1Res.json();
        const rawUnit8WorkbookVocab2Data: Unit8WorkbookVocabulary2Data = await unit8WorkbookVocab2Res.json();
        const rawUnit8WorkbookGrammar2Data: Unit8WorkbookGrammar2Data = await unit8WorkbookGrammar2Res.json();
        const rawUnit8WorkbookReadingData: Unit8WorkbookReadingData = await unit8WorkbookReadingRes.json();
        const rawUnit8WorkbookWritingData: Unit8WorkbookWritingData = await unit8WorkbookWritingRes.json();
        const rawUnit8WorkbookReviewData: Unit8WorkbookReviewData = await unit8WorkbookReviewRes.json();
        const rawUnit9Vocabulary1Data: Unit9Vocabulary1Data = await unit9Vocabulary1Res.json();
        const rawUnit9SongData: Unit9SongData = await unit9SongRes.json();
        const rawUnit9Grammar1Data: Unit9Grammar1DataType = await unit9Grammar1Res.json();
        const rawUnit9Vocabulary2Data: Unit9Vocabulary2Data = await unit9Vocabulary2Res.json();
        const rawUnit9Grammar2Data: Unit9Grammar2Data = await unit9Grammar2Res.json();
        const rawUnit9ReadingData: Unit9ReadingData = await unit9ReadingRes.json();

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

        setUnit5Data(processUnit5Data(rawUnit5Data));

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
        setUnit5WorkbookData(processUnit5WorkbookData(rawUnit5WorkbookData));

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
                if ('audio_instruction' in section && section.audio_instruction) {
                    section.audio_instruction = processUrl(section.audio_instruction);
                }
                if('examples' in section && section.examples) {
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
                }
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
                            if (typeof value === 'string') {
                                if (key.includes('audio') || key.includes('image')) {
                                    node[key] = processUrl(value);
                                }
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
            processNode(data.sections);
            return data;
        };
        setUnit8WritingData(processUnit8WritingData(rawUnit8WritingData));

        const processUnit8GameData = (data: Unit8GameData): Unit8GameData | null => {
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
        setUnit8GameData(processUnit8GameData(rawUnit8GameData));

        const processUnit8WorkbookData = (data: Unit8WorkbookData): Unit8WorkbookData | null => {
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
                                 value.forEach(processNode);
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
        const combinedUnit8WorkbookData: Unit8WorkbookData = {
            slug: 'unit8_workbook',
            title: 'Unit 8 - Workbook',
            sections: [
                ...rawUnit8WorkbookVocab1Data.sections,
                ...rawUnit8WorkbookSongData.sections,
                ...rawUnit8WorkbookGrammar1Data.sections,
                ...rawUnit8WorkbookVocab2Data.sections,
                ...rawUnit8WorkbookGrammar2Data.sections,
                ...rawUnit8WorkbookReadingData.sections,
                ...rawUnit8WorkbookWritingData.sections,
                ...rawUnit8WorkbookReviewData.sections,
            ]
        };
        setUnit8WorkbookData(processUnit8WorkbookData(combinedUnit8WorkbookData));

        const processUnit9Vocabulary1Data = (data: Unit9Vocabulary1Data): Unit9Vocabulary1Data | null => {
            if (!data || !data.sections) return null;
            data.sections.forEach(section => {
                if ('words' in section) {
                    section.words.forEach(word => word.audio = processUrl(word.audio));
                }
                if ('examples' in section) {
                    section.examples.forEach(ex => {
                        ex.dialogue.forEach(line => line.audio = processUrl(line.audio));
                    });
                }
            });
            return data;
        };
        setUnit9Vocabulary1Data(processUnit9Vocabulary1Data(rawUnit9Vocabulary1Data));

        const processUnit9SongData = (data: Unit9SongData): Unit9SongData | null => {
            if (!data || !data.sections) return null;
            data.sections.forEach(section => {
                if ('audio' in section) {
                    section.audio = processUrl(section.audio);
                }
            });
            return data;
        };
        setUnit9SongData(processUnit9SongData(rawUnit9SongData));

        const processUnit9Grammar1Data = (data: Unit9Grammar1Data): Unit9Grammar1Data | null => {
            if (!data || !data.sections) return null;
            data.sections.forEach(section => {
                if ('examples' in section && section.examples) {
                    section.examples.forEach((ex: any) => {
                        if ('dialogue' in ex) {
                            ex.dialogue.forEach((line: any) => line.audio = processUrl(line.audio));
                        }
                        if ('audio' in ex) {
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
            return data;
        };
        setUnit9Vocabulary2Data(processUnit9Vocabulary2Data(rawUnit9Vocabulary2Data));

        const processUnit9Grammar2Data = (data: Unit9Grammar2Data): Unit9Grammar2Data | null => {
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
        setUnit9Grammar2Data(processUnit9Grammar2Data(rawUnit9Grammar2Data));
        
        const processUnit9ReadingData = (data: Unit9ReadingData): Unit9ReadingData | null => {
            if (!data || !data.sections) return null;
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
            return data;
        };
        setUnit9ReadingData(processUnit9ReadingData(rawUnit9ReadingData));

        setVehicles(rawVehiclesData.map(v => ({ ...v, audioSrc: processUrl(v.audioSrc), imageSrc: processUrl(v.imageSrc) })));
        
        const processedExampleVehicles: ProcessedExampleVehicle[] = rawExampleVehiclesData.map(v => ({
            id: v.id,
            word: v.word,
            meaning_vi: v.meaning_vi,
            audioSrc: processUrl(v.audioSrc),
            imageSrc: processUrl(v.imageSrc),
            examples: v.examples.map((ex, i) => ({
                id: `${v.id}-ex-${i}`,
                speaker: 'Example',
                text: ex.sentence,
                audioSrc: processUrl(ex.audioSrc),
            })),
        }));
        setExampleVehicles(processedExampleVehicles);
        
        const inOnLines: DialogueLine[] = rawInOnData.map(line => ({
            id: line.id,
            speaker: line.category,
            text: line.sentence,
            meaning_vi: line.meaning_vi,
            audioSrc: processUrl(line.audioSrc),
        }));
        setGroupedInOnLines(inOnLines.reduce((acc, line) => {
            const category = line.speaker || 'unknown';
            if (!acc[category]) acc[category] = [];
            acc[category].push(line);
            return acc;
        }, {} as Record<string, DialogueLine[]>));

        const likeVehicleLines: DialogueLine[] = rawLikeVehicleData.map(line => ({
            id: line.id,
            speaker: line.category,
            text: line.sentence,
            meaning_vi: line.meaning_vi,
            audioSrc: processUrl(line.audioSrc),
        }));
        setGroupedLikeVehicleLines(likeVehicleLines.reduce((acc, line) => {
            const category = line.speaker || 'unknown';
            if (!acc[category]) acc[category] = [];
            acc[category].push(line);
            return acc;
        }, {} as Record<string, DialogueLine[]>));
        
        const takeRideFlyLines: DialogueLine[] = rawTakeRideFlyData.map(line => ({
            id: line.id,
            speaker: line.category,
            text: line.sentence,
            meaning_vi: line.meaning_vi,
            audioSrc: processUrl(line.audioSrc),
        }));
        setGroupedTakeRideFlyLines(takeRideFlyLines.reduce((acc, line) => {
            const category = line.speaker || 'unknown';
            if (!acc[category]) acc[category] = [];
            acc[category].push(line);
            return acc;
        }, {} as Record<string, DialogueLine[]>));
        
        setGrammarTooData(rawGrammarTooData);

        const processedVocab2: Vehicle[] = rawVocabulary2Data.items.map((item, index) => ({
            id: `vocab2-${index}`,
            word: item.word,
            meaning_vi: item.meaning_vi,
            audioSrc: processUrl(item.audioSrc),
            imageSrc: processUrl(item.imageSrc),
        }));
        setVocabulary2Items(processedVocab2);
        setDialogue(rawDialogueData.map(line => ({ ...line, audioSrc: processUrl(line.audioSrc) })));
        
        const processedSections: Record<string, DialogueLine[]> = {};
        for(const key in rawSurveyData.sections) {
            processedSections[key] = rawSurveyData.sections[key].map(line => ({...line, audioSrc: processUrl(line.audioSrc)}));
        }
        setSections(processedSections);
        
        setTransportPhrases(rawTransportData.map(line => ({...line, audioSrc: processUrl(line.audioSrc)})));
        setByPhrases(rawByData.map(line => ({...line, audioSrc: processUrl(line.audioSrc)})));
        setBikePhrases(rawBikeData.map(line => ({...line, audioSrc: processUrl(line.audioSrc)})));
        setPracticeBikePhrases(rawPracticeBikeData.map(line => ({...line, audioSrc: processUrl(line.audioSrc)})));
        
        const processedPracticeBike2: ProcessedPracticeBike2Item[] = rawPracticeBike2Data.items.map(item => ({
            action: item.action,
            meaning_vi: item.meaning_vi,
            sentences: item.sentences.map((s, i) => ({
                id: `${item.action}-sent-${i}`,
                speaker: 'Instruction',
                text: s.text,
                meaning_vi: s.meaning_vi,
                audioSrc: processUrl(s.audio_path),
            })),
        }));
        setPracticeBike2Items(processedPracticeBike2);

        setContrastPhrases(rawContrastData.items.map((item, i) => ({ id: `contrast-${i}`, speaker: 'Example', text: item.text, meaning_vi: item.meaning_vi, audioSrc: processUrl(item.audio_path) })));
        setSayFastPhrases(rawSayFastData.items.map((item, i) => ({ id: `sayfast-${i}`, speaker: 'Example', text: item.text, meaning_vi: item.meaning_vi, audioSrc: processUrl(item.audio_path) })));
        setReadingPhrases(rawReadingData.items.map((item, i) => ({ id: `reading-${i}`, speaker: 'Narrator', text: item.text, meaning_vi: item.meaning_vi, audioSrc: processUrl(item.audio_path) })));
        setHotAirBalloonsReading(rawHotAirBalloonReadingData.map((item, i) => ({ id: `hab-read-${i}`, speaker: 'Narrator', text: item.text, meaning_vi: item.vi, audioSrc: processUrl(item.audioSrc) })));
        setHotAirBalloonsReadingImage(processUrl(rawHotAirBalloonFilesData.imageSrc));
        setHotAirBalloonsVocabulary(rawHotAirBalloonVocabularyData.map((item, i) => ({ id: `hab-vocab-${i}`, word: item.word, ipa: item.pos, meaning_vi: item.vi, audioSrc: processUrl(item.audioSrc), imageSrc: processUrl(item.imageSrc) })));
        
        const processedExercises = {
            ...rawHotAirBalloonsExercisesData,
            true_false: {
                ...rawHotAirBalloonsExercisesData.true_false,
                instructionsAudioSrc: processUrl(rawHotAirBalloonsExercisesData.true_false.instructionsAudioSrc),
                questions: rawHotAirBalloonsExercisesData.true_false.questions.map((q: any) => ({...q, audioSrc: processUrl(q.audioSrc)}))
            },
            order_sentences: {
                ...rawHotAirBalloonsExercisesData.order_sentences,
                instructionsAudioSrc: processUrl(rawHotAirBalloonsExercisesData.order_sentences.instructionsAudioSrc),
                sentencesAudioSrc: rawHotAirBalloonsExercisesData.order_sentences.sentencesAudioSrc.map((src: string) => processUrl(src))
            },
            describe: {
                ...rawHotAirBalloonsExercisesData.describe,
                instructionsAudioSrc: processUrl(rawHotAirBalloonsExercisesData.describe.instructionsAudioSrc),
                exampleAnswerAudioSrc: rawHotAirBalloonsExercisesData.describe.exampleAnswerAudioSrc.map((src: string) => processUrl(src))
            }
        };
        setHotAirBalloonsExercises(processedExercises);
        setHotAirBalloonsWeirdButTrue({...rawHotAirBalloonsWeirdButTrueData, audioSrc: processUrl(rawHotAirBalloonsWeirdButTrueData.audioSrc)});

        setCatchTheBusReading(rawCatchTheBusReadingData.map((item, i) => ({ id: `ctb-read-${i}`, speaker: 'Narrator', text: item.text, meaning_vi: item.vi, audioSrc: processUrl(item.audioSrc) })));
        setCatchTheBusReadingImage(processUrl(rawCatchTheBusFilesData.imageSrc));
        setCatchTheBusVocabulary(rawCatchTheBusVocabularyData.map((item, i) => ({ id: `ctb-vocab-${i}`, word: item.word, meaning_vi: item.vi, audioSrc: processUrl(item.audioSrc), imageSrc: processUrl(item.imageSrc) })));
        
        setTheLionAndTheMouseReading(rawTheLionAndTheMouseReadingData.map((item, i) => ({ id: `lm-read-${i}`, speaker: 'Narrator', text: item.text, meaning_vi: item.vi, audioSrc: processUrl(item.audioSrc) })));
        setTheLionAndTheMouseReadingImage(processUrl(rawTheLionAndTheMouseFilesData.imageSrc));
        setTheLionAndTheMouseVocabulary(rawTheLionAndTheMouseVocabularyData.map((item, i) => ({ id: `lm-vocab-${i}`, word: item.word, meaning_vi: item.vi, audioSrc: processUrl(item.audioSrc), imageSrc: processUrl(item.imageSrc) })));
        
        const processedLMExercises = {
            ...rawTheLionAndTheMouseExercisesData,
            order_story: {
                ...rawTheLionAndTheMouseExercisesData.order_story,
                instructionsAudio: processUrl(rawTheLionAndTheMouseExercisesData.order_story.instructionsAudio),
                sentences: rawTheLionAndTheMouseExercisesData.order_story.sentences.map((s: any) => ({...s, audioSrc: processUrl(s.audioSrc)}))
            },
            describe_animals: {
                ...rawTheLionAndTheMouseExercisesData.describe_animals,
                tables: rawTheLionAndTheMouseExercisesData.describe_animals.tables.map((t: any) => ({
                    ...t,
                    imageSrc: processUrl(t.imageSrc),
                    example_sentences: t.example_sentences.map((ex: any) => ({...ex, audioSrc: processUrl(ex.audioSrc)}))
                }))
            },
             express_yourself: {
                ...rawTheLionAndTheMouseExercisesData.express_yourself,
                activities: rawTheLionAndTheMouseExercisesData.express_yourself.activities.map((a: any) => ({...a, audioSrc: processUrl(a.audioSrc)}))
            }
        };
        setTheLionAndTheMouseExercises(processedLMExercises);
        
        const processSensesUrl = (url: string | undefined | null) => processUrl(url ? url.replace('../..', '/audio/unit4') : null);
        
        setSensesVocabulary1(rawSensesVocabulary1Data.vocabulary.map((v: Vehicle) => ({...v, audioSrc: processUrl(v.audioSrc), imageSrc: processUrl(v.imageSrc), example: {...v.example, audioSrc: processUrl(v.example?.audioSrc) }})));
        setSensesDescribeGuess({
            ...rawSensesVocabulary1Data.describe_guess,
            items: rawSensesVocabulary1Data.describe_guess.items.map((item: any) => ({...item, audioSrc: processUrl(item.audioSrc), imageSrc: processUrl(item.imageSrc), example: {...item.example, audioSrc: processUrl(item.example.audioSrc)}}))
        });
        setSensesSong({...rawSensesSongData, audioSrc: processUrl(rawSensesSongData.audioSrc)});
        
        const processedGrammar1 = {...rawSensesGrammar1Data,
            introduction: {...rawSensesGrammar1Data.introduction, audioSrc: processUrl(rawSensesGrammar1Data.introduction.audioSrc)},
            items: rawSensesGrammar1Data.items.map((item: any) => ({...item, audioSrc: processUrl(item.audioSrc)})),
            exercises: rawSensesGrammar1Data.exercises.map((ex: any) => {
                if(ex.type === 'exercise1'){
                    return {...ex, questions: ex.questions.map((q: any) => ({...q, audioSrc: processUrl(q.audioSrc), imageSrc: processUrl(q.imageSrc)}))};
                }
                 if(ex.type === 'exercise2'){
                    return {...ex, sample: {...ex.sample, audioSrc: processUrl(ex.sample.audioSrc)}, imageSrc: processUrl(ex.imageSrc), suggested_answers: ex.suggested_answers.map((ans: any) => ({...ans, audioSrc: processUrl(ans.audioSrc)}))};
                }
                if(ex.type === 'exercise3'){
                    return {...ex, sample: {...ex.sample, audioSrc: processUrl(ex.sample.audioSrc)}, examples: ex.examples.map((e: any) => ({...e, audioSrc: processUrl(e.audioSrc)}))};
                }
                return ex;
            })
        };
        setSensesGrammar1(processedGrammar1);

        const processedVocab2Data = {
            ...rawSensesVocabulary2Data,
            vocabulary: rawSensesVocabulary2Data.vocabulary.map((v: any) => ({...v, audioSrc: processSensesUrl(v.audioSrc), imageSrc: processSensesUrl(v.imageSrc)})),
            exercise1: { ...rawSensesVocabulary2Data.exercise1, questions: rawSensesVocabulary2Data.exercise1.questions.map((q: any) => ({...q, audioSrc: processSensesUrl(q.audioSrc)}))},
            exercise2: { ...rawSensesVocabulary2Data.exercise2, groups: rawSensesVocabulary2Data.exercise2.groups.map((g: any) => ({...g, imageSrc: processSensesUrl(g.imageSrc), items: g.items.map((i: any) => ({...i, audioSrc: processSensesUrl(i.audioSrc)}))}))}
        };
        setSensesVocabulary2(processedVocab2Data);

        const processedGrammar2Data = {
            ...rawSensesGrammar2Data,
            introduction: {...rawSensesGrammar2Data.introduction, audioSrc: processSensesUrl(rawSensesGrammar2Data.introduction.audioSrc), imageSrc: processSensesUrl(rawSensesGrammar2Data.introduction.imageSrc)},
            items: rawSensesGrammar2Data.items.map((item: any) => ({...item, audioSrc: processSensesUrl(item.audioSrc), imageSrc: processSensesUrl(item.imageSrc), example: {...item.example, audioSrc: processSensesUrl(item.example.audioSrc), imageSrc: processSensesUrl(item.example.imageSrc)}})),
            exercise1: rawSensesGrammar2Data.exercise1 ? {...rawSensesGrammar2Data.exercise1, questions: rawSensesGrammar2Data.exercise1.questions.map((q: any) => ({...q, audioSrc: processSensesUrl(q.audioSrc), imageSrc: processSensesUrl(q.imageSrc), answer: {...q.answer, audioSrc: processSensesUrl(q.answer.audioSrc), imageSrc: processSensesUrl(q.answer.imageSrc)}}))} : undefined,
            exercise2: rawSensesGrammar2Data.exercise2 ? {...rawSensesGrammar2Data.exercise2, questions: rawSensesGrammar2Data.exercise2.questions.map((q: any) => ({...q, audioSrc: processSensesUrl(q.audioSrc), imageSrc: processSensesUrl(q.imageSrc)}))} : undefined,
            exercise3: rawSensesGrammar2Data.exercise3 ? {...rawSensesGrammar2Data.exercise3, sample: {...rawSensesGrammar2Data.exercise3.sample, audioSrc: processSensesUrl(rawSensesGrammar2Data.exercise3.sample.audioSrc), imageSrc: processSensesUrl(rawSensesGrammar2Data.exercise3.sample.imageSrc)}} : undefined,
        };
        setSensesGrammar2(processedGrammar2Data);
        
        const processedReadingData = {
            ...rawSensesReadingData,
            content: rawSensesReadingData.content.map((c: any) => ({...c, audioSrc: processSensesUrl(c.audioSrc), imageSrc: processSensesUrl(c.imageSrc)})),
            vocabulary: rawSensesReadingData.vocabulary.map((v: any) => ({...v, audioSrc: processSensesUrl(v.audioSrc), imageSrc: processSensesUrl(v.imageSrc)}))
        };
        setSensesReading(processedReadingData);

        const processedWritingData = {
            ...rawSensesWritingData,
            introduction: {...rawSensesWritingData.introduction, audioSrc: processSensesUrl(rawSensesWritingData.introduction.audioSrc), imageSrc: processSensesUrl(rawSensesWritingData.introduction.imageSrc)},
            passage: {...rawSensesWritingData.passage, audioSrc: processSensesUrl(rawSensesWritingData.passage.audioSrc), imageSrc: processSensesUrl(rawSensesWritingData.passage.imageSrc)},
            exercises: rawSensesWritingData.exercises.map((ex: any) => ({...ex, sentences: ex.sentences.map((s: any) => ({...s, audioSrc: processSensesUrl(s.audioSrc)}))}))
        };
        setSensesWriting(processedWritingData);

        setSensesSpinData({...rawSensesSpinData, items: rawSensesSpinData.items.map((i: any) => ({...i, audio: processSensesUrl(i.audio), image: processSensesUrl(i.image), questions: i.questions.map((q: any) => ({...q, audio: processSensesUrl(q.audio)}))}))});
        setSensesSpinDataToBe({...rawSensesSpinDataToBe, items: rawSensesSpinDataToBe.items.map((i: any) => ({...i, audio: processSensesUrl(i.audio), image: processSensesUrl(i.image), questions: i.questions.map((q: any) => ({...q, audio: processSensesUrl(q.audio)}))}))});
        setSensesSpinDataTaste({...rawSensesSpinDataTaste, items: rawSensesSpinDataTaste.items.map((i: any) => ({...i, audio: processSensesUrl(i.audio), image: processSensesUrl(i.image), questions: i.questions.map((q: any) => ({...q, audio: processSensesUrl(q.audio)}))}))});
        
        const workbookData: SensesWorkbook = {
          circleActivity: {...rawCircleActivity, items: rawCircleActivity.items.map((i:any)=>({...i, imageSrc: processUrl(i.imageSrc)}))},
          listenWrite: {...rawListenWrite, sentences: rawListenWrite.sentences.map((s:any)=>({...s, audioSrc: processUrl(s.audioSrc), imageSrc: processUrl(s.imageSrc)}))},
          matchActivity: {...rawMatchActivity, items: rawMatchActivity.items.map((i:any)=>({...i, imageSrc: processUrl(i.imageSrc)}))},
          songMatch: {...rawSongMatch, audioSrc: processUrl(rawSongMatch.audioSrc), items: rawSongMatch.items.map((i:any)=>({...i, questionAudio: processUrl(i.questionAudio), answerAudio: processUrl(i.answerAudio)}))},
          songWrite: {...rawSongWrite, words: rawSongWrite.words.map((w:any)=>({...w, imageSrc: processUrl(w.imageSrc)}))},
          grammar1: rawGrammar1,
          grammar1Match: {...rawGrammar1Match, items: rawGrammar1Match.items.map((i:any)=>({...i, imageSrc: processUrl(i.imageSrc), audio: processUrl(i.audio)}))},
          unscrambleSentences: {...rawUnscrambleSentences, sentences: rawUnscrambleSentences.sentences.map((s:any)=>({...s, audio: processUrl(s.audio), imageSrc: processUrl(s.imageSrc)}))},
          readWrite: {...rawReadWrite, sentences: rawReadWrite.sentences.map((s:any)=>({...s, imageSrc: processUrl(s.imageSrc), questionAudioSrc: processUrl(s.questionAudioSrc), answerAudioSrc: processUrl(s.answerAudioSrc)}))},
          lookSmellTaste: {...rawLookSmellTaste, adjectives: { look: rawLookSmellTaste.adjectives.look.map((a:any)=>({...a, audioSrc: processUrl(a.audioSrc)})), smell: rawLookSmellTaste.adjectives.smell.map((a:any)=>({...a, audioSrc: processUrl(a.audioSrc)})), taste: rawLookSmellTaste.adjectives.taste.map((a:any)=>({...a, audioSrc: processUrl(a.audioSrc)}))}, examples: rawLookSmellTaste.examples.map((e:any)=>({...e, imageSrc: processUrl(e.imageSrc), questionAudioSrc: processUrl(e.questionAudioSrc), answerAudioSrc: processUrl(e.answerAudioSrc)}))},
          vocabulary2ReadWrite: {...rawVocabulary2ReadWrite, sentences: rawVocabulary2ReadWrite.sentences.map((s:any)=>({...s, imageSrc: processUrl(s.imageSrc), questionAudioSrc: processUrl(s.questionAudioSrc), answerAudioSrc: processUrl(s.answerAudioSrc)}))},
          vocabulary2SortWords: {...rawVocabulary2SortWords, words: rawVocabulary2SortWords.words.map((w:any)=>({...w, imageSrc: processUrl(w.imageSrc), examples: w.examples.map((ex:any)=>({...ex, audioSrc: processUrl(ex.audioSrc)}))}))},
          grammar2WasWere: rawGrammar2WasWere,
          grammar2LookMatch: {...rawGrammar2LookMatch, pairs: rawGrammar2LookMatch.pairs.map((p:any)=>({...p, audio: processUrl(p.audio), imageSrc: processUrl(p.imageSrc)}))},
          grammar2ReadWrite: {...rawVocabulary2ReadWrite, sentences: rawVocabulary2ReadWrite.sentences.map((s:any)=>({...s, imageSrc: processUrl(s.imageSrc), questionAudioSrc: processUrl(s.questionAudioSrc), answerAudioSrc: processUrl(s.answerAudioSrc)}))},
          grammar2RolePlay: {...rawGrammar2RolePlay, dialogue: rawGrammar2RolePlay.dialogue.map((d:any)=>({...d, audioSrc: processUrl(d.audioSrc)}))},
          gameTimeCrossword: rawGameTimeCrossword,
          lookWrite: {...rawLookWrite, questions: rawLookWrite.questions.map((q:any)=>({...q, image: processUrl(q.image), answer: {...q.answer, audio: {question: processUrl(q.answer.audio.question), response: processUrl(q.answer.audio.response)}}}))},
          listenReadFast: {...rawListenReadFast, sentences: rawListenReadFast.sentences.map((s:any)=>({...s, audio: processUrl(s.audio)}))},
          readingStinkyAnimals: {...rawReadingStinkyAnimals, images: rawReadingStinkyAnimals.images.map(processUrl), reading: rawReadingStinkyAnimals.reading.map((r:any)=>({...r, audio: processUrl(r.audio)})), vocabulary: rawReadingStinkyAnimals.vocabulary.map((v:any)=>({...v, audio: processUrl(v.audio), image: processUrl(v.image)}))},
          readingTrueFalse: {...rawReadingTrueFalse, questions: rawReadingTrueFalse.questions.map((q:any)=>({...q, audio: processUrl(q.audio)}))},
          readingCompleteChart: {...rawReadingCompleteChart, chart: {animal: {...rawReadingCompleteChart.chart.animal, questions: rawReadingCompleteChart.chart.animal.questions.map((q:any)=>({...q, audio: {question: processUrl(q.audio.question), answer: processUrl(q.audio.answer)}}))}, plant: {...rawReadingCompleteChart.chart.plant, questions: rawReadingCompleteChart.chart.plant.questions.map((q:any)=>({...q, audio: {question: processUrl(q.audio.question), answer: processUrl(q.audio.answer)}}))}}},
          readWriteTurtle: rawReadWriteTurtle,
          readWriteWinter: {...rawReadWriteWinter, passage: rawReadWriteWinter.passage.map((p:any)=>({...p, audio: processUrl(p.audio)})), writingTask: {...rawReadWriteWinter.writingTask, modelAnswerAudio: processUrl(rawReadWriteWinter.writingTask.modelAnswerAudio)}},
          readChoose: {...rawReadChoose, questions: rawReadChoose.questions.map((q:any)=>({...q, audio: {question: processUrl(q.audio.question), answer: processUrl(q.audio.answer)}}))},
          readWriteFromBox: {...rawReadWriteFromBox, questions: rawReadWriteFromBox.questions.map((q:any)=>({...q, audio: processUrl(q.audio)}))},
          readWriteSenseTable: {...rawReadWriteSenseTable, table: {...rawReadWriteSenseTable.table, rows: rawReadWriteSenseTable.table.rows.map((r:any)=>({...r, Yogurt: {...r.Yogurt, audio: processUrl(r.Yogurt.audio)}, Nuts: {...r.Nuts, audio: processUrl(r.Nuts.audio)}, Crocodile: {...r.Crocodile, audio: processUrl(r.Crocodile.audio)}, Ocean: {...r.Ocean, audio: processUrl(r.Ocean.audio)}}))}},
          finalTestListenChoose: rawFinalTestListenChoose ? {...rawFinalTestListenChoose, questions: rawFinalTestListenChoose.questions.map((q:any)=>({...q, audio: processUrl(q.audio), options: q.options.map((o:any)=>({...o, image: processUrl(o.image)}))}))} : undefined,
          spinWheelVocab: {...rawSpinWheelVocab, items: rawSpinWheelVocab.items.map((i:any)=>({...i, image: processUrl(i.image), audio: processUrl(i.audio)}))},
        };
        setSensesWorkbook(workbookData);

      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-100 dark:bg-slate-900">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">Loading learning materials...</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50 dark:bg-red-900/50">
        <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">An Error Occurred</h2>
          <p className="text-slate-600 dark:text-slate-300">Failed to load data. Please check your connection and try again.</p>
          <pre className="mt-4 text-xs text-left bg-slate-100 dark:bg-slate-700 p-2 rounded overflow-x-auto">{error}</pre>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-slate-100 dark:bg-slate-900 min-h-screen font-sans text-slate-800 dark:text-slate-200">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {selectedTopic ? (
          <div>
            <div className="flex items-center mb-6">
              <button
                onClick={() => {
                  setSelectedTopic(null);
                  setSelectedTabId(null);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              >
                <ChevronLeftIcon className="w-5 h-5" />
                <span>Back to Units</span>
              </button>
            </div>
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">{selectedTopic.title}</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">{selectedTopic.id.replace('unit', 'Unit ')}</p>
            </header>
            <TabsList 
              tabs={selectedTopic.tabs} 
              activeTab={selectedTabId!} 
              onSelectTab={setSelectedTabId} 
            />
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
              sensesVocabulary1={sensesVocabulary1}
              sensesDescribeGuess={sensesDescribeGuess}
              sensesSong={sensesSong}
              sensesGrammar1={sensesGrammar1}
              sensesVocabulary2={sensesVocabulary2}
              sensesGrammar2={sensesGrammar2}
              sensesReading={sensesReading}
              sensesWriting={sensesWriting}
              sensesWorkbook={sensesWorkbook}
              sensesSpinData={sensesSpinData}
              sensesSpinDataToBe={sensesSpinDataToBe}
              sensesSpinDataTaste={sensesSpinDataTaste}
              unit5Data={unit5Data}
              unit5WorkbookData={unit5WorkbookData}
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
            />
          </div>
        ) : (
          <TopicsList topics={topics} onSelectTopic={setSelectedTopic} />
        )}
      </div>
    </main>
  );
};
