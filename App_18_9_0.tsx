import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from './constants';
import { topics } from './data/topics';
import type { Topic } from './data/topics';
import { TopicsList } from './components/TopicsList';
import { TabsList } from './components/TabsList';
import { TabContent } from './components/TabContent';
import { ChevronLeftIcon } from './components/IconComponents';
import type { ActiveTab, DialogueLine, Vehicle, InOnLine, LikeVehicleLine, TakeRideFlyLine, GrammarTooEither, VocabularyApiResponse, PracticeBike2ApiResponse, ProcessedPracticeBike2Item, PracticeBike2Item, PracticeBike2Sentence, ContrastApiResponse, SayFastApiResponse, ReadingApiResponse, ExampleVehicleApiResponse, ProcessedExampleVehicle, HotAirBalloonReadingApiResponse, HotAirBalloonVocabularyApiResponse, HotAirBalloonExercisesApiResponse, HotAirBalloonWeirdButTrueApiResponse, HotAirBalloonFilesApiResponse, CatchTheBusReadingApiResponse, CatchTheBusVocabularyApiResponse, CatchTheBusFilesApiResponse, TheLionAndTheMouseReadingApiResponse, TheLionAndTheMouseVocabularyApiResponse, TheLionAndTheMouseFilesApiResponse, TheLionAndTheMouseExercisesApiResponse, SensesDescribeGuess, SensesSong, SensesGrammar1, SensesVocabulary2, SensesGrammar2, SensesReading, SensesWriting, SensesWorkbook } from './types';

const App: React.FC = () => {
  // New state for navigation
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedTabId, setSelectedTabId] = useState<ActiveTab | null>(null);

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [vehiclesRes, exampleVehiclesRes, inOnRes, likeVehicleRes, takeRideFlyRes, grammarTooRes, vocabulary2Res, dialogueRes, sectionsRes, transportRes, byRes, bikeRes, practiceBikeRes, practiceBike2Res, contrastRes, sayFastRes, readingRes, hotAirBalloonReadingRes, hotAirBalloonVocabularyRes, hotAirBalloonExercisesRes, hotAirBalloonWeirdButTrueRes, hotAirBalloonFilesRes, catchTheBusReadingRes, catchTheBusVocabularyRes, catchTheBusFilesRes, theLionAndTheMouseReadingRes, theLionAndTheMouseVocabularyRes, theLionAndTheMouseFilesRes, theLionAndTheMouseExercisesRes, sensesVocabulary1Res, sensesSongRes, sensesGrammar1Res, sensesVocabulary2Res, sensesGrammar2Res, sensesReadingRes, sensesWritingRes, ...workbookResponses] = await Promise.all([
          fetch(`${API_BASE_URL}/api/vehicles`),
          fetch(`${API_BASE_URL}/api/example_vehicles`),
          fetch(`${API_BASE_URL}/api/in_the_sky_on_land_on_water`),
          fetch(`${API_BASE_URL}/api/like_vehicle`),
          fetch(`${API_BASE_URL}/api/take_ride_fly`),
          fetch(`${API_BASE_URL}/api/grammar/too_either`),
          fetch(`${API_BASE_URL}/api/vocabulary/vocabulary_use_a_bike`),
          fetch(`${API_BASE_URL}/api/dialogue`),
          fetch(`${API_BASE_URL}/api/survey/survey_2025_09`),
          fetch(`${API_BASE_URL}/api/means_of_transport/means_of_transport_2025_09`),
          fetch(`${API_BASE_URL}/api/by_phuong_tien/by_phuong_tien_2025_09`),
          fetch(`${API_BASE_URL}/api/how_to_use_a_bike/how_to_use_a_bike_2025_09`),
          fetch(`${API_BASE_URL}/api/practice_to_use_a_bike/practice_to_use_a_bike_2025_09`),
          fetch(`${API_BASE_URL}/api/practice/practice_to_use_a_bike_2`),
          fetch(`${API_BASE_URL}/api/contrast/but_as_a_contrast`),
          fetch(`${API_BASE_URL}/api/say_fast/say_fast`),
          fetch(`${API_BASE_URL}/api/how_kids_school/how_kids_school`),
          fetch(`${API_BASE_URL}/api/hot_air_balloon/reading`),
          fetch(`${API_BASE_URL}/api/hot_air_balloon/vocabulary`),
          fetch(`${API_BASE_URL}/api/hot_air_balloon/exercises`),
          fetch(`${API_BASE_URL}/api/hot_air_balloon/weird_but_true`),
          fetch(`${API_BASE_URL}/api/hot_air_balloon/files`),
          fetch(`${API_BASE_URL}/api/catch_the_bus/reading`),
          fetch(`${API_BASE_URL}/api/catch_the_bus/vocabulary`),
          fetch(`${API_BASE_URL}/api/catch_the_bus/files`),
          fetch(`${API_BASE_URL}/api/the_lion_and_the_mouse/reading`),
          fetch(`${API_BASE_URL}/api/the_lion_and_the_mouse/vocabulary`),
          fetch(`${API_BASE_URL}/api/the_lion_and_the_mouse/files`),
          fetch(`${API_BASE_URL}/api/the_lion_and_the_mouse/exercises`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/vocabulary`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/song`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/grammar1`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/vocabulary2`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/grammar2`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/reading`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/writing`),
          // Workbook fetches
          fetch(`${API_BASE_URL}/api/unit4_our_senses/workbook/circle_activity`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/workbook/listen_write`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/workbook/match_activity`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/workbook/song_match`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/workbook/song_write`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/workbook/grammar1`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/workbook/grammar1_match`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/workbook/unscramble_sentences`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/workbook/read_write`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/workbook/look_smell_taste`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/workbook/vocabulary2_read_write`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/workbook/vocabulary2_sort_words`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/workbook/grammar2_was_were`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/workbook/grammar2_look_match`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/workbook/grammar2_read_write`),
          fetch(`${API_BASE_URL}/api/unit4_our_senses/workbook/grammar2_role_play`),
        ]);

        if (!vehiclesRes.ok || !exampleVehiclesRes.ok || !inOnRes.ok || !likeVehicleRes.ok || !takeRideFlyRes.ok || !grammarTooRes.ok || !vocabulary2Res.ok || !dialogueRes.ok || !sectionsRes.ok || !transportRes.ok || !byRes.ok || !bikeRes.ok || !practiceBikeRes.ok || !practiceBike2Res.ok || !contrastRes.ok || !sayFastRes.ok || !readingRes.ok || !hotAirBalloonReadingRes.ok || !hotAirBalloonVocabularyRes.ok || !hotAirBalloonExercisesRes.ok || !hotAirBalloonWeirdButTrueRes.ok || !hotAirBalloonFilesRes.ok || !catchTheBusReadingRes.ok || !catchTheBusVocabularyRes.ok || !catchTheBusFilesRes.ok || !theLionAndTheMouseReadingRes.ok || !theLionAndTheMouseVocabularyRes.ok || !theLionAndTheMouseFilesRes.ok || !theLionAndTheMouseExercisesRes.ok || !sensesVocabulary1Res.ok || !sensesSongRes.ok || !sensesGrammar1Res.ok || !sensesVocabulary2Res.ok || !sensesGrammar2Res.ok || !sensesReadingRes.ok || !sensesWritingRes.ok || workbookResponses.some(res => !res.ok)) {
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
        const [rawCircleActivity, rawListenWrite, rawMatchActivity, rawSongMatch, rawSongWrite, rawGrammar1, rawGrammar1Match, rawUnscrambleSentences, rawReadWrite, rawLookSmellTaste, rawVocabulary2ReadWrite, rawVocabulary2SortWords, rawGrammar2WasWere, rawGrammar2LookMatch, rawGrammar2ReadWrite, rawGrammar2RolePlay] = await Promise.all(workbookResponses.map(res => res.json()));

        const processVehicle = (vehicle: Vehicle): Vehicle => ({
            ...vehicle,
            id: String(vehicle.id),
            audioSrc: `${API_BASE_URL}${String(vehicle.audioSrc).trim()}`,
            imageSrc: `${API_BASE_URL}${String(vehicle.imageSrc).trim()}`
        });

        const processLine = (line: DialogueLine, index: number, prefix: string): DialogueLine => ({
            ...line,
            id: `${prefix}-${line.id}-${index}`,
            audioSrc: `${API_BASE_URL}${String(line.audioSrc).trim()}` 
        });

        setVehicles(rawVehiclesData.map(processVehicle));
        
        const processedExampleVehicles = rawExampleVehiclesData.map((vehicle, vIndex) => ({
            id: String(vehicle.id),
            word: vehicle.word,
            meaning_vi: vehicle.meaning_vi,
            audioSrc: `${API_BASE_URL}${String(vehicle.audioSrc).trim()}`,
            imageSrc: `${API_BASE_URL}${String(vehicle.imageSrc).trim()}`,
            examples: vehicle.examples.map((ex, exIndex) => ({
                id: `ex-veh-${vIndex}-${exIndex}`,
                speaker: 'Example',
                text: ex.sentence,
                audioSrc: `${API_BASE_URL}${String(ex.audioSrc).trim()}`,
            }))
        }));
        setExampleVehicles(processedExampleVehicles);
        
        const processedInOnLines = rawInOnData.map((line, i) => ({
            id: `inon-${line.id}-${i}`,
            speaker: line.category,
            text: line.sentence,
            meaning_vi: line.meaning_vi,
            audioSrc: `${API_BASE_URL}${String(line.audioSrc).trim()}`
        }));
        
        const groupedInData = processedInOnLines.reduce((acc, line) => {
            const category = line.speaker;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(line);
            return acc;
        }, {} as Record<string, DialogueLine[]>);
        setGroupedInOnLines(groupedInData);

        const processedLikeVehicleLines = rawLikeVehicleData.map((line, i) => ({
            id: `like-${line.id}-${i}`,
            speaker: line.category,
            text: line.sentence,
            meaning_vi: line.meaning_vi,
            audioSrc: `${API_BASE_URL}${String(line.audioSrc).trim()}`
        }));

        const groupedLikeData = processedLikeVehicleLines.reduce((acc, line) => {
            const category = line.speaker;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(line);
            return acc;
        }, {} as Record<string, DialogueLine[]>);
        setGroupedLikeVehicleLines(groupedLikeData);
        
        const processedTakeRideFlyLines = rawTakeRideFlyData.map((line, i) => ({
            id: `trf-${line.id}-${i}`,
            speaker: line.category,
            text: line.sentence,
            meaning_vi: line.meaning_vi,
            audioSrc: `${API_BASE_URL}${String(line.audioSrc).trim()}`
        }));

        const groupedTakeRideFlyData = processedTakeRideFlyLines.reduce((acc, line) => {
            const category = line.speaker;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(line);
            return acc;
        }, {} as Record<string, DialogueLine[]>);
        setGroupedTakeRideFlyLines(groupedTakeRideFlyData);
        
        setGrammarTooData(rawGrammarTooData);

        const processedVocab2Items = rawVocabulary2Data.items.map((item, index) => ({
            id: `vocab2-${index}`,
            word: item.word,
            meaning_vi: item.meaning_vi,
            audioSrc: `${API_BASE_URL}${String(item.audioSrc).trim()}`,
            imageSrc: `${API_BASE_URL}${String(item.imageSrc).trim()}`
        }));
        setVocabulary2Items(processedVocab2Items);

        setDialogue(rawDialogueData.map((line, i) => processLine(line, i, 'dlg')));
        
        const cleanedSections = Object.entries(rawSurveyData.sections)
          .filter(([key]) => key && key.trim() !== '')
          .reduce((acc, [key, lines]) => {
              acc[key] = lines.map((line, i) => processLine(line, i, `sec-${key}`));
              return acc;
          }, {} as Record<string, DialogueLine[]>);
        setSections(cleanedSections);
        
        setTransportPhrases(rawTransportData.map((line, i) => processLine(line, i, 'trn')));
        
        setByPhrases(rawByData.map((line, i) => processLine(line, i, 'by')));

        setBikePhrases(rawBikeData.map((line, i) => processLine(line, i, 'bike')));
        
        setPracticeBikePhrases(rawPracticeBikeData.map((line, i) => processLine(line, i, 'prc-bike')));

        const practiceBike2ItemsData = rawPracticeBike2Data?.items;
        if (Array.isArray(practiceBike2ItemsData)) {
            const processPractice2Line = (sentence: PracticeBike2Sentence, item: PracticeBike2Item, itemIndex: number, sIndex: number): DialogueLine => ({
                id: `prcbike2-${itemIndex}-${sIndex}`,
                speaker: item.action,
                text: sentence.text,
                meaning_vi: sentence.meaning_vi,
                audioSrc: `${API_BASE_URL}${sentence.audio_path || ''}`
            });

            setPracticeBike2Items(practiceBike2ItemsData.map((item, itemIndex) => ({
                ...item,
                sentences: Array.isArray(item.sentences) 
                    ? item.sentences.map((sentence, sIndex) => processPractice2Line(sentence, item, itemIndex, sIndex)) 
                    : []
            })));
        } else {
            console.warn("Practice Bike 2 API did not return expected format.", rawPracticeBike2Data);
            setPracticeBike2Items([]);
        }

        const processedContrastPhrases = rawContrastData.items.map((item, i): DialogueLine => ({
            id: `contrast-${i}`,
            speaker: 'Contrast',
            text: item.text,
            meaning_vi: item.meaning_vi,
            audioSrc: `${API_BASE_URL}${item.audio_path}`
        }));
        setContrastPhrases(processedContrastPhrases);

        const processedSayFastPhrases = rawSayFastData.items.map((item, i): DialogueLine => ({
            id: `sayfast-${i}`,
            speaker: 'Say Fast',
            text: item.text,
            meaning_vi: item.meaning_vi,
            audioSrc: `${API_BASE_URL}${item.audio_path}`
        }));
        setSayFastPhrases(processedSayFastPhrases);

        const processedReadingPhrases = rawReadingData.items.map((item, i): DialogueLine => ({
            id: `reading-${i}`,
            speaker: 'Reading',
            text: item.text,
            meaning_vi: item.meaning_vi,
            audioSrc: `${API_BASE_URL}${item.audio_path}`
        }));
        setReadingPhrases(processedReadingPhrases);

        const processedHotAirBalloonsReading = rawHotAirBalloonReadingData.map((item, i): DialogueLine => ({
            id: `hab-read-${i}`,
            speaker: 'Narrator',
            text: item.text,
            meaning_vi: item.vi,
            audioSrc: `${API_BASE_URL}${String(item.audioSrc).trim()}`
        }));
        setHotAirBalloonsReading(processedHotAirBalloonsReading);
        
        setHotAirBalloonsReadingImage(rawHotAirBalloonFilesData.imageSrc ? `${API_BASE_URL}${rawHotAirBalloonFilesData.imageSrc}`: null);
        
        const processedHotAirBalloonsVocabulary = rawHotAirBalloonVocabularyData.map((item, i): Vehicle => ({
            id: `hab-vocab-${i}`,
            word: item.word,
            meaning_vi: item.vi,
            audioSrc: `${API_BASE_URL}${String(item.audioSrc).trim()}`,
            imageSrc: `${API_BASE_URL}${String(item.imageSrc).trim()}`
        }));
        setHotAirBalloonsVocabulary(processedHotAirBalloonsVocabulary);

        const processedHotAirBalloonsExercises: HotAirBalloonExercisesApiResponse = {
          true_false: {
              ...rawHotAirBalloonsExercisesData.true_false,
              instructionsAudioSrc: rawHotAirBalloonsExercisesData.true_false.instructions_audio 
                  ? `${API_BASE_URL}/audio/hot_air_balloon/${encodeURIComponent(rawHotAirBalloonsExercisesData.true_false.instructions_audio)}` 
                  : undefined,
              questions: rawHotAirBalloonsExercisesData.true_false.questions.map((q: any) => ({
                  ...q,
                  audioSrc: q.audio ? `${API_BASE_URL}/audio/hot_air_balloon/${encodeURIComponent(q.audio)}` : undefined,
              })),
          },
          order_sentences: {
              ...rawHotAirBalloonsExercisesData.order_sentences,
              instructionsAudioSrc: rawHotAirBalloonsExercisesData.order_sentences.instructions_audio 
                  ? `${API_BASE_URL}/audio/hot_air_balloon/${encodeURIComponent(rawHotAirBalloonsExercisesData.order_sentences.instructions_audio)}` 
                  : undefined,
              sentencesAudioSrc: rawHotAirBalloonsExercisesData.order_sentences.sentences_audio?.map((sa: string) => `${API_BASE_URL}/audio/hot_air_balloon/${encodeURIComponent(sa)}`),
          },
          describe: {
              ...rawHotAirBalloonsExercisesData.describe,
              instructionsAudioSrc: rawHotAirBalloonsExercisesData.describe.instructions_audio 
                  ? `${API_BASE_URL}/audio/hot_air_balloon/${encodeURIComponent(rawHotAirBalloonsExercisesData.describe.instructions_audio)}` 
                  : undefined,
              exampleAnswerAudioSrc: rawHotAirBalloonsExercisesData.describe.example_answer_audio?.map((eaa: string) => `${API_BASE_URL}/audio/hot_air_balloon/${encodeURIComponent(eaa)}`),
          }
        };
        setHotAirBalloonsExercises(processedHotAirBalloonsExercises);
        
        const processedWeirdButTrue: HotAirBalloonWeirdButTrueApiResponse = {
          ...rawHotAirBalloonsWeirdButTrueData,
          audioSrc: rawHotAirBalloonsWeirdButTrueData.audioSrc ? `${API_BASE_URL}${rawHotAirBalloonsWeirdButTrueData.audioSrc}` : undefined
        };
        setHotAirBalloonsWeirdButTrue(processedWeirdButTrue);

        const processedCatchTheBusReading = rawCatchTheBusReadingData.map((item, i): DialogueLine => ({
            id: `ctb-read-${i}`,
            speaker: 'Narrator',
            text: item.text,
            meaning_vi: item.vi,
            audioSrc: `${API_BASE_URL}${String(item.audioSrc).trim()}`
        }));
        setCatchTheBusReading(processedCatchTheBusReading);
        
        setCatchTheBusReadingImage(rawCatchTheBusFilesData.imageSrc ? `${API_BASE_URL}${rawCatchTheBusFilesData.imageSrc}`: null);
        
        const processedCatchTheBusVocabulary = rawCatchTheBusVocabularyData.map((item, i): Vehicle => ({
            id: `ctb-vocab-${i}`,
            word: item.word,
            meaning_vi: item.vi,
            audioSrc: `${API_BASE_URL}${String(item.audioSrc).trim()}`,
            imageSrc: `${API_BASE_URL}${String(item.imageSrc).trim()}`
        }));
        setCatchTheBusVocabulary(processedCatchTheBusVocabulary);

        const processedTheLionAndTheMouseReading = rawTheLionAndTheMouseReadingData.map((item, i): DialogueLine => ({
            id: `latm-read-${i}`,
            speaker: 'Narrator',
            text: item.text,
            meaning_vi: item.vi,
            audioSrc: `${API_BASE_URL}${String(item.audioSrc).trim()}`
        }));
        setTheLionAndTheMouseReading(processedTheLionAndTheMouseReading);

        setTheLionAndTheMouseReadingImage(rawTheLionAndTheMouseFilesData.imageSrc ? `${API_BASE_URL}${rawTheLionAndTheMouseFilesData.imageSrc}`: null);

        const processedTheLionAndTheMouseVocabulary = rawTheLionAndTheMouseVocabularyData.map((item, i): Vehicle => ({
            id: `latm-vocab-${i}`,
            word: item.word,
            meaning_vi: item.vi,
            audioSrc: item.audioSrc ? `${API_BASE_URL}${String(item.audioSrc).trim()}` : '',
            imageSrc: `${API_BASE_URL}${String(item.imageSrc).trim()}`
        }));
        setTheLionAndTheMouseVocabulary(processedTheLionAndTheMouseVocabulary);
        
        const processUrl = (url: string | undefined | null) => url ? `${API_BASE_URL}${url}` : undefined;

        const processedTheLionAndTheMouseExercises: TheLionAndTheMouseExercisesApiResponse = {
          ...rawTheLionAndTheMouseExercisesData,
          order_story: {
            ...rawTheLionAndTheMouseExercisesData.order_story,
            instructionsAudio: processUrl(rawTheLionAndTheMouseExercisesData.order_story.instructionsAudio),
            sentences: rawTheLionAndTheMouseExercisesData.order_story.sentences.map(s => ({...s, audioSrc: processUrl(s.audioSrc)}))
          },
          describe_animals: {
            ...rawTheLionAndTheMouseExercisesData.describe_animals,
            tables: rawTheLionAndTheMouseExercisesData.describe_animals.tables.map(t => ({
              ...t,
              imageSrc: processUrl(t.imageSrc),
              example_sentences: t.example_sentences.map(e => ({...e, audioSrc: processUrl(e.audioSrc)}))
            }))
          },
          express_yourself: {
            ...rawTheLionAndTheMouseExercisesData.express_yourself,
            activities: rawTheLionAndTheMouseExercisesData.express_yourself.activities.map(a => ({...a, audioSrc: processUrl(a.audioSrc)}))
          }
        };
        setTheLionAndTheMouseExercises(processedTheLionAndTheMouseExercises);

        if (rawSensesVocabulary1Data) {
          const processedSensesVocabulary1 = rawSensesVocabulary1Data.vocabulary.map((item: any, i: number): Vehicle => ({
            id: `senses-vocab1-${i}`,
            word: item.word,
            meaning_vi: item.vi,
            ipa: item.ipa,
            audioSrc: `${API_BASE_URL}${String(item.audioSrc).trim()}`,
            imageSrc: `${API_BASE_URL}${String(item.imageSrc).trim()}`
          }));
          setSensesVocabulary1(processedSensesVocabulary1);

          const processedSensesDescribeGuess = {
            instructions: rawSensesVocabulary1Data.describe_guess.instructions,
            items: rawSensesVocabulary1Data.describe_guess.items.map((item: any, i: number) => ({
              ...item,
              id: `senses-dg-${i}`,
              audioSrc: `${API_BASE_URL}${String(item.audioSrc).trim()}`,
              imageSrc: `${API_BASE_URL}${String(item.imageSrc).trim()}`,
              example: {
                ...item.example,
                audioSrc: `${API_BASE_URL}${String(item.example.audioSrc).trim()}`
              }
            }))
          };
          setSensesDescribeGuess(processedSensesDescribeGuess);
        }
        
        if (rawSensesSongData) {
            setSensesSong({
                ...rawSensesSongData,
                audioSrc: `${API_BASE_URL}${String(rawSensesSongData.audioSrc).trim()}`
            });
        }
        
        if (rawSensesGrammar1Data) {
            const processUrl = (url: string | undefined | null): string | undefined => url ? `${API_BASE_URL}${url}` : undefined;
            
            const processedExercises = rawSensesGrammar1Data.exercises.map((ex: any) => {
                if (ex.type === 'exercise1') {
                    return {
                        ...ex,
                        questions: ex.questions.map((q: any) => ({
                            ...q,
                            audioSrc: processUrl(q.audioSrc),
                            imageSrc: processUrl(q.imageSrc)
                        }))
                    };
                }
                if (ex.type === 'exercise2') {
                    return {
                        ...ex,
                        sample: {
                            ...ex.sample,
                            audioSrc: processUrl(ex.sample.audioSrc)
                        },
                        suggested_answers: ex.suggested_answers.map((ans: any) => ({
                            ...ans,
                            audioSrc: processUrl(ans.audioSrc)
                        })),
                        imageSrc: processUrl(ex.imageSrc)
                    };
                }
                if (ex.type === 'exercise3') {
                     return {
                        ...ex,
                        sample: {
                            ...ex.sample,
                            audioSrc: processUrl(ex.sample.audioSrc)
                        },
                        examples: ex.examples.map((e: any) => ({
                            ...e,
                            audioSrc: processUrl(e.audioSrc)
                        }))
                    };
                }
                return ex;
            });

            setSensesGrammar1({
                ...rawSensesGrammar1Data,
                introduction: {
                    ...rawSensesGrammar1Data.introduction,
                    audioSrc: processUrl(rawSensesGrammar1Data.introduction.audioSrc)
                },
                items: rawSensesGrammar1Data.items.map((item: any) => ({
                    ...item,
                    audioSrc: processUrl(item.audioSrc)
                })),
                exercises: processedExercises
            });
        }

        if (rawSensesVocabulary2Data) {
            const processUrl = (url: string | undefined | null): string | undefined => url ? `${API_BASE_URL}${url}` : undefined;

            const processedVocab = rawSensesVocabulary2Data.vocabulary.map((item: any, i: number) => ({
              ...item,
              id: `senses-vocab2-${i}`,
              meaning_vi: item.vi,
              audioSrc: processUrl(item.audioSrc),
              imageSrc: processUrl(item.imageSrc),
              example: item.example ? {
                ...item.example,
                audioSrc: processUrl(item.example.audioSrc)
              } : undefined
            }));

            const processedEx1 = {
                ...rawSensesVocabulary2Data.exercise1,
                questions: rawSensesVocabulary2Data.exercise1.questions.map((q: any) => ({...q, audioSrc: processUrl(q.audioSrc)}))
            };

            const processedEx2 = {
                ...rawSensesVocabulary2Data.exercise2,
                groups: rawSensesVocabulary2Data.exercise2.groups.map((g: any) => ({
                    ...g,
                    imageSrc: processUrl(g.imageSrc),
                    items: g.items.map((i: any) => ({...i, audioSrc: processUrl(i.audioSrc)}))
                }))
            };

            setSensesVocabulary2({...rawSensesVocabulary2Data, vocabulary: processedVocab, exercise1: processedEx1, exercise2: processedEx2});
        }

        if (rawSensesGrammar2Data) {
            const processUrl = (url: string | undefined | null): string => url ? `${API_BASE_URL}${url}` : '';

            setSensesGrammar2({
                ...rawSensesGrammar2Data,
                introduction: {
                    ...rawSensesGrammar2Data.introduction,
                    audioSrc: processUrl(rawSensesGrammar2Data.introduction.audioSrc),
                    imageSrc: processUrl(rawSensesGrammar2Data.introduction.imageSrc)
                },
                items: rawSensesGrammar2Data.items.map(item => ({
                    ...item,
                    audioSrc: processUrl(item.audioSrc),
                    imageSrc: processUrl(item.imageSrc),
                    example: {
                        ...item.example,
                        audioSrc: processUrl(item.example.audioSrc),
                        imageSrc: processUrl(item.example.imageSrc)
                    }
                })),
                exercise1: rawSensesGrammar2Data.exercise1 ? {
                    ...rawSensesGrammar2Data.exercise1,
                    questions: rawSensesGrammar2Data.exercise1.questions.map(q => ({
                        ...q,
                        audioSrc: processUrl(q.audioSrc),
                        imageSrc: processUrl(q.imageSrc),
                        answer: {
                            ...q.answer,
                            audioSrc: processUrl(q.answer.audioSrc),
                            imageSrc: processUrl(q.answer.imageSrc)
                        }
                    }))
                } : undefined,
                exercise2: rawSensesGrammar2Data.exercise2 ? {
                    ...rawSensesGrammar2Data.exercise2,
                    questions: rawSensesGrammar2Data.exercise2.questions.map(q => ({
                        ...q,
                        audioSrc: processUrl(q.audioSrc),
                        imageSrc: processUrl(q.imageSrc)
                    }))
                } : undefined,
                exercise3: rawSensesGrammar2Data.exercise3 ? {
                    ...rawSensesGrammar2Data.exercise3,
                    sample: {
                        ...rawSensesGrammar2Data.exercise3.sample,
                        audioSrc: processUrl(rawSensesGrammar2Data.exercise3.sample.audioSrc),
                        imageSrc: processUrl(rawSensesGrammar2Data.exercise3.sample.imageSrc)
                    }
                } : undefined
            });
        }

        if (rawSensesReadingData) {
            const processUrl = (url: string | undefined | null): string => url ? `${API_BASE_URL}${url}` : '';
            
            setSensesReading({
                ...rawSensesReadingData,
                content: rawSensesReadingData.content.map(item => ({
                    ...item,
                    audioSrc: processUrl(item.audioSrc),
                    imageSrc: processUrl(item.imageSrc),
                })),
                vocabulary: rawSensesReadingData.vocabulary.map(item => ({
                    ...item,
                    audioSrc: processUrl(item.audioSrc),
                    imageSrc: processUrl(item.imageSrc),
                })),
                exercises: rawSensesReadingData.exercises
            });
        }
        
        if (rawSensesWritingData) {
            const processUrl = (url: string | undefined | null): string => url ? `${API_BASE_URL}${url}` : '';
            setSensesWriting({
                ...rawSensesWritingData,
                introduction: {
                    ...rawSensesWritingData.introduction,
                    audioSrc: processUrl(rawSensesWritingData.introduction.audioSrc),
                    imageSrc: processUrl(rawSensesWritingData.introduction.imageSrc),
                },
                passage: {
                    ...rawSensesWritingData.passage,
                    audioSrc: processUrl(rawSensesWritingData.passage.audioSrc),
                    imageSrc: processUrl(rawSensesWritingData.passage.imageSrc),
                },
                exercises: rawSensesWritingData.exercises.map(ex => ({
                    ...ex,
                    sentences: ex.sentences.map(s => ({
                        ...s,
                        audioSrc: processUrl(s.audioSrc)
                    }))
                }))
            });
        }
        
        const workbookData: SensesWorkbook = {
            circleActivity: rawCircleActivity ? { ...rawCircleActivity, items: rawCircleActivity.items.map((i: any) => ({...i, imageSrc: `${API_BASE_URL}${i.imageSrc}`})) } : undefined,
            listenWrite: rawListenWrite ? { ...rawListenWrite, sentences: rawListenWrite.sentences.map((s: any) => ({...s, imageSrc: `${API_BASE_URL}${s.imageSrc}`, audioSrc: `${API_BASE_URL}${s.audioSrc}`})) } : undefined,
            matchActivity: rawMatchActivity ? { ...rawMatchActivity, items: rawMatchActivity.items.map((i: any) => ({...i, imageSrc: `${API_BASE_URL}${i.imageSrc}`}))} : undefined,
            songMatch: rawSongMatch ? { ...rawSongMatch, audioSrc: `${API_BASE_URL}${rawSongMatch.audioSrc}` } : undefined,
            songWrite: rawSongWrite ? { ...rawSongWrite, words: rawSongWrite.words.map((w: any) => ({...w, imageSrc: `${API_BASE_URL}${w.imageSrc}`})) } : undefined,
            grammar1: rawGrammar1,
            grammar1Match: rawGrammar1Match ? { ...rawGrammar1Match, items: rawGrammar1Match.items.map((i: any) => ({...i, imageSrc: `${API_BASE_URL}${i.imageSrc}`})) } : undefined,
            unscrambleSentences: rawUnscrambleSentences ? { 
                ...rawUnscrambleSentences, 
                sentences: rawUnscrambleSentences.sentences.map((s: any) => ({
                    ...s,
                    imageSrc: `${API_BASE_URL}${s.imageSrc}`
                })) 
            } : undefined,
            readWrite: rawReadWrite ? {
              ...rawReadWrite,
              sentences: rawReadWrite.sentences.map((s: any) => ({
                ...s,
                imageSrc: `${API_BASE_URL}${s.imageSrc}`,
                questionAudioSrc: `${API_BASE_URL}${s.questionAudioSrc}`,
                answerAudioSrc: `${API_BASE_URL}${s.answerAudioSrc}`
              }))
            } : undefined,
            lookSmellTaste: rawLookSmellTaste ? {
                ...rawLookSmellTaste,
                 adjectives: {
                    look: rawLookSmellTaste.adjectives.look.map((a: any) => ({...a, audioSrc: `${API_BASE_URL}${a.audioSrc}`})),
                    smell: rawLookSmellTaste.adjectives.smell.map((a: any) => ({...a, audioSrc: `${API_BASE_URL}${a.audioSrc}`})),
                    taste: rawLookSmellTaste.adjectives.taste.map((a: any) => ({...a, audioSrc: `${API_BASE_URL}${a.audioSrc}`})),
                },
                examples: rawLookSmellTaste.examples.map((e: any) => ({
                    ...e,
                    imageSrc: `${API_BASE_URL}${e.imageSrc}`,
                    questionAudioSrc: `${API_BASE_URL}${e.questionAudioSrc}`,
                    answerAudioSrc: `${API_BASE_URL}${e.answerAudioSrc}`,
                }))
            } : undefined,
            vocabulary2ReadWrite: rawVocabulary2ReadWrite ? {
              ...rawVocabulary2ReadWrite,
              sentences: rawVocabulary2ReadWrite.sentences.map((s: any) => ({
                ...s,
                question: s.sentence, // RENAME
                imageSrc: `${API_BASE_URL}${s.imageSrc}`,
                questionAudioSrc: `${API_BASE_URL}${s.questionAudioSrc}`,
                answerAudioSrc: `${API_BASE_URL}${s.answerAudioSrc}`
              }))
            } : undefined,
            vocabulary2SortWords: rawVocabulary2SortWords ? {
              ...rawVocabulary2SortWords,
              words: rawVocabulary2SortWords.words.map((w: any) => ({
                ...w,
                imageSrc: `${API_BASE_URL}${w.imageSrc}`,
                 examples: w.examples.map((ex:any) => ({
                    ...ex,
                    audioSrc: `${API_BASE_URL}${ex.audioSrc}`
                }))
              }))
            } : undefined,
            grammar2WasWere: rawGrammar2WasWere,
            grammar2LookMatch: rawGrammar2LookMatch ? {
                ...rawGrammar2LookMatch,
                pairs: rawGrammar2LookMatch.pairs.map((p: any) => ({
                    ...p,
                    audioSrc: `${API_BASE_URL}${p.audioSrc}`,
                    imageSrc: `${API_BASE_URL}${p.imageSrc}`
                }))
            } : undefined,
            grammar2ReadWrite: rawGrammar2ReadWrite ? {
              ...rawGrammar2ReadWrite,
              sentences: rawGrammar2ReadWrite.sentences.map((s: any) => ({
                ...s,
                imageSrc: `${API_BASE_URL}${s.imageSrc}`,
                questionAudioSrc: `${API_BASE_URL}${s.questionAudioSrc}`,
                answerAudioSrc: `${API_BASE_URL}${s.answerAudioSrc}`
              }))
            } : undefined,
            grammar2RolePlay: rawGrammar2RolePlay ? {
                ...rawGrammar2RolePlay,
                dialogue: rawGrammar2RolePlay.dialogue.map((line: any) => ({
                    ...line,
                    audioSrc: `${API_BASE_URL}${line.audioSrc}`
                }))
            } : undefined,
        };
        setSensesWorkbook(workbookData);


      } catch (e) {
        if (e instanceof Error) {
            setError(`Could not load dialogue. Please check if the server is running. Error: ${e.message}`);
        } else {
            setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    if (topic.tabs.length > 0) {
      setSelectedTabId(topic.tabs[0].tabId);
    }
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setSelectedTabId(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-4xl mx-auto">
        {!selectedTopic ? (
          <TopicsList topics={topics} onSelectTopic={handleSelectTopic} />
        ) : (
          <>
            <header className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <button
                    onClick={handleBackToTopics}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                    <span>Back to units</span>
                </button>
                <div className="text-right">
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {selectedTopic.title}
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {selectedTopic.id.replace('unit', 'Unit ')}
                    </p>
                </div>
            </header>

            <TabsList
              tabs={selectedTopic.tabs}
              activeTab={selectedTabId!}
              onSelectTab={setSelectedTabId}
            />

            {selectedTabId && (
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
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;