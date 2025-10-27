// FIX: Removed incorrect circular import. These types are defined and exported from this file.
// import type { 
//     Unit5WorkbookGrammar1Section,
//     Unit5WorkbookVocab2Section
// } from './components/tabs/unit5/Unit5WorkbookTab';

// FIX: Export `ActiveTab` type to resolve import errors.
export type ActiveTab = 
  | 'vehicle' | 'exampleVehicles' | 'inOn' | 'likeVehicle' | 'takeRideFly' 
  | 'grammarToo' | 'vocabulary2' | 'dialogue' | 'sections' | 'transport' 
  | 'by' | 'bike' | 'practiceBike' | 'practiceBike2' | 'contrast' 
  | 'sayFast' | 'reading' | 'hotAirBalloons' | 'catchTheBus' | 'theLionAndTheMouse'
  | 'sensesVocabulary1' | 'sensesGrammar1' | 'sensesVocabulary2' | 'sensesSong' 
  | 'sensesSpin' | 'sensesGrammar2' | 'sensesReading' | 'sensesWriting' | 'sensesWorkbook'
  | 'unit1Vocabulary1' | 'unit1Song' | 'unit1Grammar1' | 'unit1Vocabulary2' | 'unit1Grammar2'| 'unit1Reading'| 'unit1Writing'
  | 'unit2Vocabulary1' | 'unit2Song' | 'unit2Grammar1' | 'unit2Vocabulary2'| 'unit2Writing'
  | 'unit5Vocabulary' | 'unit5Vocabulary2' | 'unit5Song' | 'unit5Grammar1' | 'unit5GrammarMatch'
  | 'unit5Grammar2' | 'unit5Reading' | 'unit5ReadWriteWhy' | 'unit5AskAnswer' | 'unit5Workbook'|'unit5Writing'
  | 'unit6Vocabulary1' | 'unit6Song' | 'unit6Grammar1' | 'unit6Vocabulary2' | 'unit6Vocabulary3'
  | 'unit6Grammar2' | 'unit6Reading' | 'unit6Writing' | 'unit6ExtendedReading' | 'unit6Game' | 'unit6Workbook'
  | 'unit7Vocabulary1' | 'unit7Vocabulary2' | 'unit7Grammar1' | 'unit7Grammar2' | 'unit7Game' | 'unit7Song'
  | 'unit7Reading' | 'unit7Writing' | 'unit7Workbook' | 'unit7Review'
  | 'unit8Vocabulary1' | 'unit8Grammar1' | 'unit8Vocabulary2' | 'unit8Grammar2' | 'unit8Reading' | 'unit8Writing' | 'unit8Workbook' | 'unit8Game'
  | 'unit9Vocabulary1' | 'unit9Song' | 'unit9Grammar1' | 'unit9Vocabulary2' | 'unit9Grammar2' | 'unit9Reading';

export interface DialogueLine {
  id: string;
  speaker: string;
  text: string;
  audioSrc: string;
  meaning_vi?: string;
}

export interface Vehicle {
  id:string;
  word: string;
  meaning_vi: string;
  audioSrc: string;
  imageSrc: string;
  ipa?: string;
  example?: {
    text: string;
    audioSrc: string;
  };
  // FIX: Add optional category property to Vehicle type.
  category?: string;
}

export interface InOnLine {
  id: string;
  word: string;
  sentence: string;
  meaning_vi: string;
  category: string;
  audioSrc: string;
}

export interface LikeVehicleLine {
  id: string;
  sentence: string;
  meaning_vi: string;
  category: string;
  audioSrc: string;
}

export interface TakeRideFlyLine {
  id: string;
  sentence: string;
  meaning_vi: string;
  category: string;
  audioSrc: string;
}

export interface GrammarSentence {
  text: string;
  audio_path: string;
}

export interface GrammarExample {
  sentences: GrammarSentence[];
}

export interface GrammarResponse {
    subject: string;
    response: string;
    audio_path: string;
}

export interface GrammarStatement {
  subject: string;
  verb: string;
  object: string;
  destination: string;
  full_sentence: string;
  audio_path: string;
  agreeing: GrammarResponse[];
  not_agreeing: GrammarResponse[];
}

export interface GrammarTooEither {
  grammar_name: string;
  type: string;
  statements: GrammarStatement[];
  examples: {
    agreeing: GrammarExample[];
    not_agreeing: GrammarExample[];
  };
}

export interface VocabularyItem {
  word: string;
  meaning_vi: string;
  imageSrc: string;
  audioSrc: string;
}

export interface VocabularyApiResponse {
  topic: string;
  category: string;
  items: VocabularyItem[];
}

export interface PracticeBike2Sentence {
  text: string;
  meaning_vi: string;
  audio_path: string;
}

export interface PracticeBike2Item {
  action: string;
  meaning_vi: string;
  sentences: PracticeBike2Sentence[];
}

export interface PracticeBike2ApiResponse {
  topic: string;
  category: string;
  items: PracticeBike2Item[];
}

export interface ProcessedPracticeBike2Item {
  action: string;
  meaning_vi: string;
  sentences: DialogueLine[];
}

export interface ContrastItem {
  text: string;
  meaning_vi: string;
  audio_path: string;
}

export interface ContrastApiResponse {
  topic: string;
  category: string;
  items: ContrastItem[];
}

export interface SayFastItem {
  text: string;
  meaning_vi: string;
  audio_path: string;
}

export interface SayFastApiResponse {
  topic: string;
  category: string;
  items: SayFastItem[];
}

export interface ReadingItem {
  text: string;
  meaning_vi: string;
  audio_path: string;
}

export interface ReadingApiResponse {
  topic: string;
  category: string;
  items: ReadingItem[];
}

export interface HotAirBalloonReadingApiResponse {
  text: string;
  audioSrc: string;
  vi?: string;
}

export interface HotAirBalloonVocabularyApiResponse {
  word: string;
  pos: string;
  vi: string;
  imageSrc: string;
  audioSrc: string;
}

export interface TrueFalseQuestion {
  q: string;
  vi?: string;
  answer: string;
  audioSrc?: string;
}

export interface HotAirBalloonExercisesApiResponse {
  true_false: {
    instructions: string;
    instructions_vi?: string;
    instructionsAudioSrc?: string;
    questions: TrueFalseQuestion[];
  };
  order_sentences: {
    instructions: string;
    instructions_vi?: string;
    instructionsAudioSrc?: string;
    sentences: string[];
    sentences_vi?: string[];
    sentencesAudioSrc?: string[];
    correct_order: number[];
  };
  describe: {
    instructions: string;
    instructions_vi?: string;
    instructionsAudioSrc?: string;
    example_answer: string;
    example_answer_vi?: string;
    exampleAnswerAudioSrc?: string[];
  };
}

export interface HotAirBalloonWeirdButTrueApiResponse {
  text: string;
  vi: string;
  audioSrc?: string;
}

export interface HotAirBalloonFilesApiResponse {
  imageSrc: string;
  audioFolder: string;
  vocabAudioFolder: string;
}

export interface CatchTheBusReadingApiResponse {
  text: string;
  audioSrc: string;
  vi?: string;
}

export interface CatchTheBusVocabularyApiResponse {
  word: string;
  vi: string;
  imageSrc: string;
  audioSrc: string;
}

export interface CatchTheBusFilesApiResponse {
  imageSrc: string;
  audioFolder: string;
  vocabAudioFolder: string;
}

export interface ExampleSentence {
  sentence: string;
  audioSrc: string | null;
}

export interface ExampleVehicleApiResponse {
  id: string;
  word: string;
  meaning_vi: string;
  category: string;
  audioSrc: string | null;
  imageSrc: string | null;
  examples: ExampleSentence[];
}

export interface ProcessedExampleVehicle {
  id: string;
  word: string;
  meaning_vi: string;
  audioSrc: string;
  imageSrc: string;
  examples: DialogueLine[];
}

// "The Lion and the Mouse" Types
export interface TheLionAndTheMouseReadingApiResponse {
  text: string;
  vi?: string;
  audioSrc: string;
}

export interface TheLionAndTheMouseVocabularyApiResponse {
  word: string;
  vi: string;
  imageSrc: string;
  audioSrc?: string;
}

export interface TheLionAndTheMouseFilesApiResponse {
  imageSrc: string;
  audioFolder: string;
}

export interface TheLionAndTheMouseExercisesApiResponse {
  order_story: {
    instructions: string;
    instructionsAudio?: string;
    sentences: { text: string; audioSrc?: string }[];
    correct_order: number[];
  };
  describe_animals: {
    instructions: string;
    word_box: string[];
    tables: {
      subject: string;
      imageSrc?: string;
      example_sentences: { text: string; audioSrc?: string }[];
    }[];
  };
  express_yourself: {
    instructions: string;
    activities: {
      option: string;
      text: string;
      audioSrc?: string;
    }[];
  };
}

// Senses - Vocabulary 1 Types
export interface SensesDescribeGuessItem {
  id: string;
  word: string;
  imageSrc: string;
  audioSrc: string;
  example: {
    text: string;
    audioSrc: string;
  };
}

export interface SensesDescribeGuess {
  instructions: string;
  items: SensesDescribeGuessItem[];
}
export interface Unit4VocabWord {
    word: string;
    vi: string;
    image: string;
    audio: string;
    ipa: string;
}
export interface Unit4VocabSection {
    section_name: 'Listen and Read';    
    words: Unit4VocabWord[];
}
export interface Unit4Activityitems {
    word: string;
    image: string;
    audio: string;
    example:{
      text:string;
      audio:string;
    }
}
export interface Unit4ActivitySection {
    section_name: 'describe guess';
    type: string;
    instruction: string;
    audio_instruction: string;
    items: Unit4Activityitems[];
}
export type Unit4Vocabulary1Section = Unit4VocabSection | Unit4ActivitySection;
export interface Unit4Vocabulary1Data {
    slug: string;
    unit: string;
    sections: Unit4Vocabulary1Section[];
}

export interface Unit4SongData {
  song_name: string;
  unit: string;
  audio: string;
  type:string;
  lyrics: string[];
}

// Senses - Grammar 1 Types
export interface SensesGrammar1Item {
  text: string;
  audioSrc: string;
  highlight: string;
  translation?: string;
}

export interface SensesGrammar1ExerciseQuestion {
  q: string;
  answer: string;
  highlight: string;
  explain: string;
  imageSrc?: string;
  audioSrc?: string;
  translation?: string;
}

export interface SensesGrammar1Exercise1 {
  type: 'exercise1';
  title: string;
  words: string[];
  instruction: string;
  formula: string;
  note?: string;
  questions: SensesGrammar1ExerciseQuestion[];
  full_answers: string[];
}

export interface SensesGrammar1Exercise2 {
  type: 'exercise2';
  title: string;
  instruction: string;
  sample: {
    text: string;
    audioSrc: string;
    translation?: string;
  };
  imageSrc?: string;
  suggested_answers: {
    text: string;
    audioSrc: string;
    translation?: string;
  }[];
}

export interface SensesGrammar1Exercise3 {
  type: 'exercise3';
  title: string;
  instruction: string;
  sample: {
    text: string;
    audioSrc: string;
    translation?: string;
  };
  examples: {
    text: string;
    audioSrc: string;
    translation?: string;
  }[];
}

export interface SensesGrammar1 {
  grammar_name: string;
  introduction: {
    title: string;
    audioSrc: string;
  };
  items: SensesGrammar1Item[];
  exercises: (SensesGrammar1Exercise1 | SensesGrammar1Exercise2 | SensesGrammar1Exercise3)[];
}

// Senses - Vocabulary 2 Types
export interface SensesVocab2Exercise1Question {
  q: string;
  answer: string[];
  highlight: string;
  vi: string;
  audioSrc?: string;
}

export interface SensesVocab2Exercise1 {
  title: string;
  instruction: string;
  formula: string;
  questions: SensesVocab2Exercise1Question[];
  full_answers: string[];
}

export interface SensesVocab2Exercise2GroupItem {
  text: string;
  vi: string;
  audioSrc: string;
}

export interface SensesVocab2Exercise2Group {
  number: number;
  imageSrc: string;
  items: SensesVocab2Exercise2GroupItem[];
}

export interface SensesVocab2Exercise2 {
  title: string;
  instruction: string;
  groups: SensesVocab2Exercise2Group[];
}
export interface voca {
  word: string;
  vi: string;
  audioSrc: string;
  imageSrc: string;
  ipa?: string;
  example?: {
    text: string;
    audioSrc: string;
  };
  // FIX: Add optional category property to Vehicle type.
  category?: string;
}
export interface SensesVocabulary2 {
  title: string;
  vocabulary: voca[];
  exercise1: SensesVocab2Exercise1;
  exercise2: SensesVocab2Exercise2;
  files: {
    imageFolder: string;
    audioFolder: string;
  };
}

// Senses - Grammar 2 Types
export interface SensesGrammar2ItemExample {
  text: string;
  vi: string;
  audioSrc: string;
  imageSrc: string;
}

export interface SensesGrammar2Item {
  word: string;
  vi: string;
  audioSrc: string;
  imageSrc: string;
  example: SensesGrammar2ItemExample;
}

export interface SensesGrammar2Exercise1Question {
  q: string;
  vi: string;
  audioSrc: string;
  imageSrc: string;
  answer: {
    text: string;
    vi: string;
    audioSrc: string;
    imageSrc: string;
  };
}

export interface SensesGrammar2Exercise1 {
  title: string;
  instruction: string;
  questions: SensesGrammar2Exercise1Question[];
}

export interface SensesGrammar2Exercise2Question {
  text: string;
  vi: string;
  audioSrc: string;
  imageSrc: string;
}

export interface SensesGrammar2Exercise2 {
  title: string;
  instruction: string;
  questions: SensesGrammar2Exercise2Question[];
}

export interface SensesGrammar2Exercise3 {
  title: string;
  instruction: string;
  sample: {
    text: string;
    vi: string;
    audioSrc: string;
    imageSrc: string;
  };
}

export interface SensesGrammar2 {
  title: string;
  grammar_name: string;
  introduction: {
    text: string;
    audioSrc: string;
    imageSrc: string;
  };
  items: SensesGrammar2Item[];
  exercise1?: SensesGrammar2Exercise1;
  exercise2?: SensesGrammar2Exercise2;
  exercise3?: SensesGrammar2Exercise3;
}

// Senses - Reading Types
export interface SensesReadingContent {
  text: string;
  audioSrc: string;
  vi_meaning: string;
  imageSrc: string;
}

export interface SensesReadingVocabulary {
  word: string;
  ipa: string;
  vi_meaning: string;
  audioSrc: string;
  imageSrc: string;
}

export interface SensesReadingExerciseTrueFalse {
  type: 'true_false';
  title: string;
  questions: { text: string; answer: 'T' | 'F' }[];
}

export interface SensesReadingExerciseTableFill {
  type: 'table_fill';
  title: string;
  columns: string[];
  rows: Record<string, string>[];
}

export interface SensesReadingExerciseSpeaking {
  type: 'speaking';
  title: string;
  prompts: string[];
}

export type SensesReadingExercise = SensesReadingExerciseTrueFalse | SensesReadingExerciseTableFill | SensesReadingExerciseSpeaking;

export interface SensesReading {
  title: string;
  passage_name: string;
  content: SensesReadingContent[];
  vocabulary: SensesReadingVocabulary[];
  exercises: SensesReadingExercise[];
}

// Senses - Writing Types
export interface SensesWritingIntroduction {
  text: string;
  vi_meaning: string;
  imageSrc: string;
  audioSrc: string;
}

export interface SensesWritingPassage {
  text: string;
  audioSrc: string;
  imageSrc: string;
}

export interface SensesWritingExerciseSentence {
  text: string;
  audioSrc: string;
}

export interface SensesWritingExercise {
  type: 'underline';
  instruction: string;
  vi_instruction: string;
  sentences: SensesWritingExerciseSentence[];
}

export interface SensesWriting {
  title: string;
  writing_name: string;
  introduction: SensesWritingIntroduction;
  passage: SensesWritingPassage;
  exercises: SensesWritingExercise[];
}

// Senses - Workbook Types
export interface WorkbookCircleActivityItem {
  id: number;
  word: string;
  type: string;
  imageSrc: string;
  isAnswer: boolean;
}
export interface WorkbookCircleActivity {
  title: string;
  instruction: string;
  items: WorkbookCircleActivityItem[];
}

export interface WorkbookListenWriteSentence {
  text: string;
  full_sentence: string;
  audioSrc: string;
  answer: string;
  imageSrc: string;
  vietnamese: string;
}
export interface WorkbookListenWrite {
  title: string;
  instruction: string;
  words: string[];
  sentences: WorkbookListenWriteSentence[];
}

export interface WorkbookMatchItem {
  id: number;
  imageSrc: string;
  correctSentence: string;
  vietnamese: string;
}
export interface WorkbookMatchActivity {
  title: string;
  instruction: string;
  items: WorkbookMatchItem[];
}

export interface WorkbookSongMatchItem {
  id: number;
  question: string;
  answer: string;
  vietnamese: {
    question: string;
    answer: string;
  };
  questionAudio?: string;
  answerAudio?: string;
}
export interface WorkbookSongMatch {
  title: string;
  instruction: string;
  audioSrc: string;
  items: WorkbookSongMatchItem[];
}

export interface WorkbookSongWriteWord {
  word: string;
  imageSrc: string;
  vietnamese: string;
}
export interface WorkbookSongWriteAdjective {
  word: string;
  vietnamese: string;
}
export interface WorkbookSongWriteSentencePattern {
  question: string;
  answer: string;
}
export interface WorkbookSongWrite {
  title: string;
  instruction: string;
  words: WorkbookSongWriteWord[];
  adjectives: WorkbookSongWriteAdjective[];
  sentencePatterns: WorkbookSongWriteSentencePattern[];
}

export interface WorkbookGrammarTable {
  columns: string[];
  rows: (Record<string, string> & { audio?: string })[];
}
export interface WorkbookGrammar1 {
  title: string;
  instruction: string;
  tables: {
    examples: WorkbookGrammarTable;
    questions: WorkbookGrammarTable;
    answers: WorkbookGrammarTable;
  };
}

export interface WorkbookGrammar1MatchItem {
  id: number;
  sentence: string;
  answer: string;
  imageLabel: string;
  imageSrc: string;
  audio?: string;
}
export interface WorkbookGrammar1Match {
  title: string;
  instruction: string;
  items: WorkbookGrammar1MatchItem[];
  files: {
    imageFolder: string;
    audioFolder: string;
  };
}

export interface WorkbookUnscrambleSentenceItem {
  id: number;
  words: string[];
  answer: string;
  meaning: string;
  audio: string;
  imageSrc: string;
}

export interface WorkbookUnscrambleSentences {
  title: string;
  instruction: string;
  sentences: WorkbookUnscrambleSentenceItem[];
  files: {
    audioFolder: string;
    imageFolder: string;
  };
}

export interface WorkbookReadWriteSentence {
  id: number;
  question: string;
  answer: string;
  imageSrc: string;
  questionAudioSrc: string;
  answerAudioSrc: string;
  meaning?: string;
}

export interface WorkbookReadWrite {
  title: string;
  instruction: string;
  sentences: WorkbookReadWriteSentence[];
}

export interface WorkbookAdjectiveItem {
  adj: string;
  meaning: string;
  audioSrc: string;
}

export interface WorkbookLookSmellTasteExample {
  id: number;
  question: string;
  answer: string;
  word: 'look' | 'smell' | 'taste';
  imageSrc: string;
  questionAudioSrc: string;
  answerAudioSrc: string;
}

export interface WorkbookLookSmellTaste {
  title: string;
  instruction: string;
  adjectives: {
    look: WorkbookAdjectiveItem[];
    smell: WorkbookAdjectiveItem[];
    taste: WorkbookAdjectiveItem[];
  };
  examples: WorkbookLookSmellTasteExample[];
}

export interface WorkbookReadWriteSortWordExample {
  sentence: string;
  meaning: string;
  audioSrc: string;
}

export interface WorkbookReadWriteSortWord {
  word: string;
  imageSrc: string;
  examples: WorkbookReadWriteSortWordExample[];
}

export interface WorkbookReadWriteSort {
  title: string;
  instruction: string;
  words: WorkbookReadWriteSortWord[];
  categories: Record<string, string[]>;
}

export interface WorkbookGrammar2WasWereRow {
  present: {
    question: string;
    answer: string;
  };
  past: {
    question: string;
    answer: string;
  };
  tokens: {
    question: string[];
    answer: string[];
  };
}

export interface WorkbookGrammar2WasWere {
  title: string;
  instruction: string;
  table: {
    columns: string[];
    rows: WorkbookGrammar2WasWereRow[];
  };
}

export interface WorkbookGrammar2LookMatchPair {
  sentence: string;
  meaning: string;
  audio: string;
  imageSrc: string;
  audioSrc?: string;
}

export interface WorkbookGrammar2LookMatch {
  title: string;
  instruction: string;
  pairs: WorkbookGrammar2LookMatchPair[];
}

export interface WorkbookGrammar2RolePlayLine {
  turn: number;
  speaker: 'Person1' | 'Person2';
  type: 'question' | 'answer';
  text: string;
  audioSrc: string;
}

export interface WorkbookGrammar2RolePlay {
  slug: string;
  unit: string;
  section: string;
  activity: string;
  dialogue: WorkbookGrammar2RolePlayLine[];
}

export interface WorkbookCrosswordClue {
  direction: 'across' | 'down';
  number: number;
  clue: string;
  answer: string;
  row: number;
  col: number;
  length: number;
  audio?: {
    clue: {
      src: string;
    }
  };
}

export interface WorkbookCrosswordPuzzle {
  slug: string;
  unit: string;
  section: string;
  activity: string;
  dialogue: WorkbookCrosswordClue[];
}

export interface WorkbookLookWriteQuestion {
  number: number;
  text: string;
  image: string;
  answer: {
    question: string;
    response: string;
    audio: {
      question: string;
      response: string;
    };
  };
  expectedWords: [string, string];
}

export interface WorkbookLookWrite {
  activity: string;
  questions: WorkbookLookWriteQuestion[];
}

export interface WorkbookListenReadFastSentence {
  number: number;
  text: string;
  meaning: string;
  audio: string;
}

export interface WorkbookListenReadFast {
  activity: string;
  sentences: WorkbookListenReadFastSentence[];
}

export interface WorkbookReadingSentence {
  number: number;
  text: string;
  meaning: string;
  audio: string;
}

export interface WorkbookReadingVocabulary {
  word: string;
  meaning: string;
  audio: string;
  image: string;
}

export interface WorkbookReadingActivity {
  activity: string;
  images: string[];
  reading: WorkbookReadingSentence[];
  vocabulary: WorkbookReadingVocabulary[];
}

export interface WorkbookReadingTrueFalseQuestion {
  text: string;
  answer: 'T' | 'F';
  vi: string;
  audio?: string;
}

export interface WorkbookReadingTrueFalse {
  activity: string;
  questions: WorkbookReadingTrueFalseQuestion[];
}

export interface WorkbookReadingChartQuestion {
  question: string;
  answer: string;
  audio: {
    question: string;
    answer: string;
  };
}

export interface WorkbookReadingChartCategory {
  title: string;
  name: string;
  questions: WorkbookReadingChartQuestion[];
}

export interface WorkbookReadingCompleteChart {
  activity: string;
  title: string;
  chart: {
    animal: WorkbookReadingChartCategory;
    plant: WorkbookReadingChartCategory;
  };
}

export interface WorkbookReadWriteTurtleRow {
  subject: string;
  yes: string;
  no: string;
  why: string;
}

export interface WorkbookReadWriteTurtle {
  activity: string;
  instruction: string;
  table: {
    columns: string[];
    rows: WorkbookReadWriteTurtleRow[];
  };
}

export interface WorkbookReadWriteWinterPassage {
  text: string;
  underlined: boolean;
  audio: string;
}

export interface WorkbookReadWriteWinterTask {
  example: {
    before: string[];
    after: string;
  };
  correctAnswers: string[];
  modelAnswer: string;
  modelAnswerAudio: string;
}

export interface WorkbookReadWriteWinter {
  activity: string;
  instruction: string;
  passage: WorkbookReadWriteWinterPassage[];
  writingTask: WorkbookReadWriteWinterTask;
}

export interface WorkbookReadChooseQuestion {
  text: string;
  options: string[];
  answer: string;
  vi: string;
  audio: {
    question: string;
    answer: string;
  };
}

export interface WorkbookReadChoose {
  activity: string;
  instruction: string;
  questions: WorkbookReadChooseQuestion[];
}

export interface WorkbookReadWriteFromBoxPossibleAnswer {
  text: string;
  vi: string;
}

export interface WorkbookReadWriteFromBoxQuestion {
  question: string;
  question_vi: string;
  possible_answers: WorkbookReadWriteFromBoxPossibleAnswer[];
  correct_answer: string;
  audio: string;
}

export interface WorkbookReadWriteFromBox {
  activity: string;
  instruction: string;
  questions: WorkbookReadWriteFromBoxQuestion[];
}

export interface WorkbookSenseVerbTableCell {
    text: string;
    vi: string;
    audio: string;
}

export interface WorkbookSenseVerbTableRow {
    sense: string;
    vi: string;
    Yogurt: WorkbookSenseVerbTableCell;
    Nuts: WorkbookSenseVerbTableCell;
    Crocodile: WorkbookSenseVerbTableCell;
    Ocean: WorkbookSenseVerbTableCell;
}

export interface WorkbookSenseVerbTable {
    activity: string;
    instruction: string;
    table: {
        headers: string[];
        rows: WorkbookSenseVerbTableRow[];
    };
}

export interface WorkbookFinalTestListenChooseOption {
    image: string;
    sentence: string;
}

export interface WorkbookFinalTestListenChooseQuestion {
    number: number;
    audio: string;
    options: WorkbookFinalTestListenChooseOption[];
    answer: string;
}

export interface WorkbookFinalTestListenChoose {
    activity: string;
    questions: WorkbookFinalTestListenChooseQuestion[];
}

export interface SpinWheelVocabItem {
  id: number;
  word: string;
  type: string;
  image: string;
  audio: string;
}

export interface SpinWheelVocab {
  slug: string;
  activity: string;
  items: SpinWheelVocabItem[];
}

export interface SensesWorkbook {
  circleActivity?: WorkbookCircleActivity;
  listenWrite?: WorkbookListenWrite;
  matchActivity?: WorkbookMatchActivity;
  songMatch?: WorkbookSongMatch;
  songWrite?: WorkbookSongWrite;
  grammar1?: WorkbookGrammar1;
  grammar1Match?: WorkbookGrammar1Match;
  unscrambleSentences?: WorkbookUnscrambleSentences;
  readWrite?: WorkbookReadWrite;
  lookSmellTaste?: WorkbookLookSmellTaste;
  vocabulary2ReadWrite?: WorkbookReadWrite;
  vocabulary2SortWords?: WorkbookReadWriteSort;
  grammar2WasWere?: WorkbookGrammar2WasWere;
  grammar2LookMatch?: WorkbookGrammar2LookMatch;
  grammar2ReadWrite?: WorkbookReadWrite;
  grammar2RolePlay?: WorkbookGrammar2RolePlay;
  gameTimeCrossword?: WorkbookCrosswordPuzzle;
  lookWrite?: WorkbookLookWrite;
  listenReadFast?: WorkbookListenReadFast;
  readingStinkyAnimals?: WorkbookReadingActivity;
  readingTrueFalse?: WorkbookReadingTrueFalse;
  readingCompleteChart?: WorkbookReadingCompleteChart;
  readWriteTurtle?: WorkbookReadWriteTurtle;
  readWriteWinter?: WorkbookReadWriteWinter;
  readChoose?: WorkbookReadChoose;
  readWriteFromBox?: WorkbookReadWriteFromBox;
  readWriteSenseTable?: WorkbookSenseVerbTable;
  finalTestListenChoose?: WorkbookFinalTestListenChoose;
  spinWheelVocab?: SpinWheelVocab;
}

// Senses - Spin Tab Types
export interface SpinTabQuestion {
  q: string;
  audio: string;
}

export interface SpinTabItem {
  id: number;
  word: string;
  type?: string;
  taste?: string;
  image: string;
  audio: string;
  questions: SpinTabQuestion[];
}

export interface SpinTabData {
  activity: string;
  items: SpinTabItem[];
}
// Unit 1 - Vocabulary 1
export interface Unit1Vocabulary1Word {
    word: string;
    translation: string;
    ipa: string;
    audio: string;
    
    example: {
        sentence: string;
        translation: string;
        audio: string;
    };
    image: string;
}

export interface Unit1Vocabulary1SpeakingExample {
    description: string;
    translation: string;
    answer: string;
    answer_vi: string;
    audio: string;
}

export interface Unit1Vocabulary1VocabSection {
    slug: 'listen_and_read';
    section: string;
    type: 'Vocabulary';
    instruction: string;
    instruction_vi: string;
    words: Unit1Vocabulary1Word[];
}

export interface Unit1Vocabulary1SpeakingSection {
    slug: 'ask_and_answer';
    section: string;
    type: 'Speaking';
    instruction: string;
    instruction_vi: string;
    examples: Unit1Vocabulary1SpeakingExample[];
}

export type Unit1Vocabulary1Section = Unit1Vocabulary1VocabSection | Unit1Vocabulary1SpeakingSection;

export interface Unit1Vocabulary1Data {
    _id: string;
    slug: 'unit1_vocabulary1';
    title: string;
    sections: Unit1Vocabulary1Section[];
}
// Unit 1 - Song
export interface Unit1SongLyric {
    text: string;
    translation: string;
}

export interface Unit1SongSection {
    slug: 'listen_read_and_sing';
    section: string;
    type: 'Song';
    title: string;
    instruction: string;
    instruction_vi: string;
    audio: string;
    lyrics: Unit1SongLyric[];
}

export interface Unit1SongData {
    _id: string;
    slug: 'unit1_song';
    title: string;
    sections: Unit1SongSection[];
}
// Unit 1 - Grammar 1
export interface Unit1Grammar1Example {
    sentence: string;
    translation: string;
    audio: string;
}

export interface Unit1Grammar1Question {
    sentence: string;
    answer: 'before' | 'after';
    audio_answer: string;
}

export interface Unit1Grammar1GrammarSection {
    slug: 'before_and_after_examples';
    section: 'Grammar 1';
    type: 'Grammar';
    title: 'Before and After';
    instruction: string;
    examples: Unit1Grammar1Example[];
}

export interface Unit1Grammar1ExerciseSection {
    slug: 'look_at_pictures_complete';
    section: 'Look at the pictures. Complete the sentences.';
    type: 'Exercise';
    instruction: string;
    images: string[];
    questions: Unit1Grammar1Question[];
}

export interface Unit1Grammar1WritingSection {
    slug: 'write_before_after_school';
    section: 'Write';
    type: 'Writing';
    title: 'What do you do before and after school?';
    instruction: string;
    table: {
        columns: string[];
        before_images: string[];
        after_images: string[];
        rows: string[][];
    };
}

export interface Unit1Grammar1SpeakingSection {
    slug: 'ask_and_answer';
    section: 'Ask and answer';
    type: 'Speaking';
    instruction: string;
    vocabulary: string[];
    examples: {
        question: string;
        answer: string;
        translation_question: string;
        translation_answer: string;
    }[];
}

export type Unit1Grammar1Section = 
    | Unit1Grammar1GrammarSection
    | Unit1Grammar1ExerciseSection
    | Unit1Grammar1WritingSection
    | Unit1Grammar1SpeakingSection;

export interface Unit1Grammar1Data {
    _id: string;
    slug: 'unit1_grammar1';
    title: 'Unit 1 – Grammar 1';
    sections: Unit1Grammar1Section[];
}
// Unit 1 - Vocabulary 2
export interface Unit1Vocabulary2VocabItem {
    word: string;
    translation: string;
    audio: string;
    image: string;
}

export interface Unit1Vocabulary2Sentence {
    sentence: string;
    translation: string;
    audio: string;
    answer: 'T' | 'F';
}

export interface Unit1Vocabulary2Section {
    slug: 'listen_and_say_true_false';
    section: string;
    type: 'Vocabulary';
    title: string;
    instruction: string;
    vocabulary: Unit1Vocabulary2VocabItem[];
    sentences: Unit1Vocabulary2Sentence[];
}

export interface Unit1Vocabulary2Data {
    _id: string;
    slug: 'unit1_vocabulary2';
    title: 'Unit 1 – Vocabulary 2';
    sections: Unit1Vocabulary2Section[];
}

// Unit 2 - Vocabulary 1
export interface Unit2VocabWord {
    word: string;
    translation: string;
    ipa: string;
    audio: string;
    image: string;
    example: {
        sentence: string;
        translation: string;
        audio: string;
    };
}

export interface Unit2VocabSection {
    slug: 'listen_and_read';
    section: string;
    type: 'Vocabulary';
    instruction: string;
    words: Unit2VocabWord[];
}

export interface Unit2SpeakingWord {
    word: string;
    translation: string;
    audio: string;
}

export interface Unit2SpeakingExample {
    description: string;
    translation: string;
    answer: string;
    audio: string;
}

export interface Unit2SpeakingSection {
    slug: 'describe_and_guess';
    section: string;
    type: 'Speaking';
    instruction: string;
    word_box: Unit2SpeakingWord[];
    examples: Unit2SpeakingExample[];
}

export type Unit2Vocabulary1Section = Unit2VocabSection | Unit2SpeakingSection;

export interface Unit2Vocabulary2Data {
    slug: string;
    title: string;
    sections: Unit2Vocabulary1Section[];
}
// Unit 2 - Song
export interface Unit2SongLyrics {
    text: string;
    translation: string;
}

export interface Unit2SongSection {
    slug: 'listen_read_and_sing';
    section: string;
    type: 'Song';
    title: string;
    instruction: string;
    audio: string;
    lyrics: Unit2SongLyrics[];
}

export interface Unit2SongData {
    slug: string;
    title: string;
    sections: Unit2SongSection[];
}
// Unit 2 - Grammar 1
export interface Unit2Grammar1Example {
    sentence: string;
    translation: string;
    audio: string;
}

export interface Unit2Grammar1GrammarSection {
    slug: 'can_for_requests_and_offers';
    section: string;
    type: 'Grammar';
    instruction: string;
    examples: Unit2Grammar1Example[];
}

export interface Unit2Grammar1MatchingAnswer {
    left: string;
    right: string;
    audio: string;
}

export interface Unit2Grammar1MatchingSection {
    slug: 'read_look_match';
    section: string;
    type: 'Matching';
    instruction: string;
    image: string;
    left_column: string[];
    right_column: string[];
    correct_answers: Unit2Grammar1MatchingAnswer[];
}

export interface Unit2Grammar1WritingSection {
    slug: 'write_more_questions';
    section: string;
    type: 'Writing';
    instruction: string;
    input_placeholder: string;
}

export interface Unit2Grammar1SpeakingSection {
    slug: 'ask_and_answer';
    section: string;
    type: 'Speaking';
    instruction: string;
    input_placeholder: string;
}

export type Unit2Grammar1Section = 
    | Unit2Grammar1GrammarSection 
    | Unit2Grammar1MatchingSection 
    | Unit2Grammar1WritingSection 
    | Unit2Grammar1SpeakingSection;

export interface Unit2Grammar1Data {
    slug: string;
    title: string;
    sections: Unit2Grammar1Section[];
}
// Unit 1 - Reading
export interface Unit1ReadingSentence {
    sentence: string;
    translation: string;
    audio: string;
}

export interface Unit1ReadingReadingSection {
    slug: 'listen_and_read';
    section: 'Listen and read';
    type: 'Reading';
    instruction: string;
    image: string;
    content: Unit1ReadingSentence[];
}

export interface Unit1ReadingComprehensionQuestion {
    sentence: string;
    translation: string;
    answer: 'T' | 'F';
}

export interface Unit1ReadingComprehensionSection {
    slug: 'check_true_false';
    section: 'Read. Check T for True and F for False';
    type: 'ReadingComprehension';
    instruction: string;
    questions: Unit1ReadingComprehensionQuestion[];
}

export interface Unit1ReadingOrderingSentence {
    sentence: string;
    translation: string;
    order: number;
}

export interface Unit1ReadingOrderingSection {
    slug: 'number_the_sentences';
    section: 'Read. Number the sentences in order';
    type: 'Ordering';
    instruction: string;
    sentences: Unit1ReadingOrderingSentence[];
}

export interface Unit1ReadingSpeakingExample {
    sentence: string;
    translation: string;
    audio: string;
}

export interface Unit1ReadingSpeakingSection {
    slug: 'talk_about_the_reading';
    section: 'Talk about the reading';
    type: 'Speaking';
    instruction: string;
    examples: Unit1ReadingSpeakingExample[];
}

export type Unit1ReadingSection =
    | Unit1ReadingReadingSection
    | Unit1ReadingComprehensionSection
    | Unit1ReadingOrderingSection
    | Unit1ReadingSpeakingSection;

export interface Unit1ReadingData {
    _id: string;
    slug: 'unit1_reading';
    title: string;
    sections: Unit1ReadingSection[];
}

// Unit 2 - Writing
export interface Unit1WritingContent {
    sentence: string;
    translation: string;
    audio: string;
    images?: string[];
}

export interface Unit1WritingReadingSection {
    slug: 'read_about_a_zookeeper_day';
    section: 'Read';
    type: 'Reading';
    title: string;
    title_vi: string;
    content: Unit2WritingContent[];
}

export interface Unit1WritingWritingSection {
    slug: 'write_about_someone';
    section: 'Write';
    type: 'Writing';
    title: string;
    title_vi: string;
    instruction: string;
    instruction_vi: string;
    input: {
        placeholder: string;
        placeholder_vi: string;
    };
}

export interface Unit1WritingSpeakingSection {
    slug: 'share_your_writing';
    section: 'Share';
    type: 'Speaking';
    title: string;
    title_vi: string;
    table: {
        columns: string[];
        columns_vi: string[];
        rows: string[][];
    };
}

export type Unit1WritingSection = 
    | Unit1WritingReadingSection
    | Unit1WritingWritingSection
    | Unit1WritingSpeakingSection;

export interface Unit1WritingData {
    _id: string;
    slug: 'unit2_writing';
    title: 'Unit 2 – Writing';
    sections: Unit1WritingSection[];
}
// export interface Unit1WritingReadingSectionContent {
//     sentence: string;
//     translation: string;
//     audio: string;
//     images?: string[];
// }

// export interface Unit1WritingReadingSection {
//     type: 'Reading';
//     section: string;
//     title: string;
//     title_vi: string;
//     content: Unit1WritingReadingSectionContent[];
// }

// export interface Unit1WritingWritingSection {
//     type: 'Writing';
//     section: string;
//     title: string;
//     title_vi: string;
//     instruction: string;
//     instruction_vi: string;
//     input: {
//         placeholder: string;
//         placeholder_vi: string;
//     };
// }

// export interface Unit1WritingSpeakingSection {
//     type: 'Speaking';
//     section: string;
//     title: string;
//     title_vi: string;
//     table: {
//         columns: string[];
//         columns_vi: string[];
//         rows: string[][];
//     };
// }

// export interface Unit1WritingData {
//     title: string;
//     sections: (Unit1WritingReadingSection | Unit1WritingWritingSection | Unit1WritingSpeakingSection)[];
// }
// Unit 2 - Vocabulary 2-----------------------------------------------------

export interface Unit2Vocabulary2Word {
    word: string;
    translation: string;
    ipa: string;
    audio: string;
    example: {
        sentence: string;
        translation: string;
        audio: string;
    };
}

export interface Unit2Vocabulary2VocabSection {
    slug: 'listen_and_say';
    section: string;
    type: 'Vocabulary';
    instruction: string;
    words: Unit2Vocabulary2Word[];
}

export interface  Unit2Vocabulary2Word {
    word: string;
    translation: string;
    audio: string;
}

export interface  Unit2Vocabulary2Example {
    description: string;
    translation: string;
    answer: string;
    audio: string;
}

export interface Unit2Vocabulary2WritingSection {
    slug: 'fill_in_the_blanks';
    section: string;
    type: 'Writing';
    instruction: string;
    word_box:  Unit2Vocabulary2Word[];
    examples:  Unit2Vocabulary2Example[];
}

export type Unit2Vocabulary2Section = Unit2Vocabulary2VocabSection | Unit2Vocabulary2WritingSection;
export interface Unit2Vocabulary2Data {
    slug: string;
    title: string;
    sections: Unit2Vocabulary2Section[];
}


export interface  Unit2Grammar2Example {
    description: string;
    translation: string;
    answer: string;
    audio: string;
}    
export interface Unit2Grammar2WritingSection {
    slug: 'look_at_map_follow_write';
    section: string;
    type: 'Writing';
    instruction: string;
    examples: Unit2Grammar2Example[];
} 
export interface  Unit2Grammar2PlaceHolder {
    placeholder: string;
}    

export interface Unit2Grammar2SpeakingSection {
    slug: 'play_a_game';
    section: string;
    type: 'Speaking';
    instruction: string;
    images: string[];
    inputs: Unit2Grammar2PlaceHolder[];
}  


  
export type Unit2Grammar2Section = Unit2Grammar2WritingSection | Unit2Grammar2SpeakingSection;    
export interface Unit2Grammar2Data {
    slug: string;
    title: string;
    sections:  Unit2Grammar2Section[];
} 
// Unit 1 - Grammar 2
export interface Unit1Grammar2Example {
    sentence: string;
    translation: string;
    audio: string;
}

export interface Unit1Grammar2Question {
    sentence: string;
    answer: string;
    translation: string;
    audio: string;
}

export interface Unit1Grammar2GrammarSection {
    slug: 'adverbs_of_frequency';
    section: 'Adverbs of Frequency';
    type: 'Grammar';
    instruction: string;
    examples: Unit1Grammar2Example[];
}

export interface Unit1Grammar2WritingSection {
    slug: 'read_and_write';
    section: 'Read and write';
    type: 'Writing';
    instruction: string;
    image: string;
    questions: Unit1Grammar2Question[];
}

export interface Unit1Grammar2SpeakingSection {
    slug: 'play_a_game';
    section: 'Play a game';
    type: 'Speaking';
    instruction: string;
    examples: Unit1Grammar2Example[];
}

export type Unit1Grammar2Section =
    | Unit1Grammar2GrammarSection
    | Unit1Grammar2WritingSection
    | Unit1Grammar2SpeakingSection;

export interface Unit1Grammar2Data {
    _id: string;
    slug: 'unit1_grammar2';
    title: string;
    sections: Unit1Grammar2Section[];
}

// Unit 2 - Reading
export type Unit2ReadingContent = {
    text: string;
    translation: string;
    audio: string;
};

export type Unit2ReadingFunFact = {
    text: string;
    translation: string;
    audio: string;
    image: string;
};

export type Unit2ReadingTrueFalse = {
    question: string;
    translation: string;
    audio: string;
    correct_answer: 'T' | 'F';
};

export type Unit2ReadingListenReadSection = {
    slug: 'listen_and_read';
    section: 'Listen and read';
    type: 'Reading';
    title: 'Eye in the Sky';
    image: string;
    content: Unit2ReadingContent[];
};

export type Unit2ReadingFunFactSection = {
    slug: 'see_photo_and_answer';
    section: 'See photo and answer';
    type: 'FunFact';
    content: Unit2ReadingFunFact[];
};

export type Unit2ReadingTrueFalseSection = {
    slug: 'true_false';
    section: 'Reading';
    type: 'TrueFalse';
    title: 'Read. Check T for True and F for False';
    image: string;
    questions: Unit2ReadingTrueFalse[];
};

export type Unit2ReadingActivitySection = {
    slug: 'read_and_write' | 'talk_about_your_town';
    section: string;
    type: 'Activity';
    instruction: string;
    words?: string[];
    input?: { placeholder: string };
    correct_answers?: string[];
};

export type Unit2ReadingSection = 
    | Unit2ReadingListenReadSection
    | Unit2ReadingFunFactSection
    | Unit2ReadingTrueFalseSection
    | Unit2ReadingActivitySection;

export interface Unit2ReadingData {
    _id: string;
    slug: 'unit2_reading';
    title: 'Unit 2 – Reading';
    sections: Unit2ReadingSection[];
}
// Unit 2 - Writing
export interface Unit2WritingContent {
    sentence: string;
    translation: string;
    audio: string;
    images?: string[];
}

export interface Unit2WritingReadingSection {
    slug: 'Read_about_My_special_place';
    section: 'Read';
    type: 'Reading';
    title: string;
    title_vi: string;
    content: Unit2WritingContent[];
}

export interface Unit2WritingWritingSection {
    slug: 'write_about_special_place';
    section: 'Write';
    type: 'Writing';
    title: string;
    title_vi: string;
    instruction: string;
    instruction_vi: string;
    input: {
        placeholder: string;
        placeholder_vi: string;
    };
}

export interface Unit2WritingSpeakingSection {
    slug: 'share_your_writing';
    section: 'Share';
    type: 'Speaking';
    title: string;
    title_vi: string;
    table: {
        columns: string[];
        columns_vi: string[];
        rows: string[][];
    };
}

export type Unit2WritingSection = 
    | Unit2WritingReadingSection
    | Unit2WritingWritingSection
    | Unit2WritingSpeakingSection;

export interface Unit2WritingData {
    _id: string;
    slug: 'unit2_writing';
    title: 'Unit 2 – Writing';
    sections: Unit2WritingSection[];
}
// Unit 3

export interface VocabularyExample {
  "sentence": string;
  "translation": string;
  "audio": string;
}

export interface VocabularyWord {
  "word": string;
  "ipa": string;
  "translation": string;
  "image": string;
  "audio": string;
  "example": VocabularyExample;
}

export interface Vocabulary1ListenAndReadSection {
  "slug": string; // ví dụ: "listen_and_read"
  "section": string; // ví dụ: "Listen and Read"
  "type": "Vocabulary";
  "instruction": string; // ví dụ: "Listen, read, and learn the words."
  "words": VocabularyWord[];
}

export interface DescribeAndGuessExample {
  "description": string;
  "answer": string;
  "audio": string;
  "image": string;
}

export interface Vocabulary1DescribeAndGuessSection {
  "slug": string; // ví dụ: "describe_and_guess"
  "section": string; // ví dụ: "Describe and Guess"
  "type": "Speaking";
  "instruction": string; // ví dụ: "Listen, describe, and guess the place."
  "examples": DescribeAndGuessExample[];
}

export interface Unit3Vocabulary1Data {
  "slug": string; // "unit3_vocabulary1"
  "unit": string; // "Unit 3 – On the Move!"
  "title": string; // "VOCABULARY 1 – On the Move"
  "sections": (Vocabulary1ListenAndReadSection | Vocabulary1DescribeAndGuessSection)[];
}
// Unit 3 - Song
export interface Unit3SongLyrics {
    text: string;
    translation: string;
}

export interface Unit3SongSection {
    slug: 'listen_read_and_sing';
    section: string;
    type: 'Song';
    title: string;
    instruction: string;
    audio: string;
    lyrics: Unit2SongLyrics[];
}

export interface Unit3SongData {
    slug: string;
    title: string;
    sections: Unit2SongSection[];
}
// ===============================
// 📘 UNIT 3 – GRAMMAR 1 TYPES
// ===============================

export interface Unit3Grammar1TooForAgreeingItem {
  sentence_en: string;
  sentence_vn: string;
  audio: string;
}

export interface Unit3Grammar1TooForAgreeingSection {
  slug: string;
  section: string;
  type: "Grammar";
  instruction: string;
  instruction_vn: string;
  items: Unit3Grammar1TooForAgreeingItem[];
}

// -------------------------------

export interface Unit3Grammar1QuestionItem {
  question: string;
  answer: string;
  audio: string;
}

export interface Unit3Grammar1ReadWriteSection {
  slug: string;
  section: string;
  type: "Writing";
  instruction: string;
  instruction_vn: string;
  questions: Unit3Grammar1QuestionItem[];
}

// -------------------------------

export interface Unit3Grammar1TableRow {
  Name: string;
  Scooter: string;
  Bus: string;
  Walk: string;
  Bike: string;
}

export interface Unit3Grammar1ListenCheckSection {
  slug: string;
  section: string;
  type: "Listening";
  instruction: string;
  instruction_vn: string;
  audio: string;
  table: {
    columns: string[];
    rows: Unit3Grammar1TableRow[];
  };
}

// -------------------------------

export interface Unit3Grammar1LookWriteExample {
  example_en: string;
  example_vn: string;
}

export interface Unit3Grammar1LookWriteSection {
  slug: string;
  section: string;
  type: "Writing";
  instruction: string;
  instruction_vn: string;
  examples: Unit3Grammar1LookWriteExample[];
  inputs: { placeholder: string }[];
}

// -------------------------------

export interface Unit3Grammar1SpeakingExample {
  question_en: string;
  answer_en: string;
  question_vn: string;
  answer_vn: string;
  audio: string;
}

export interface Unit3Grammar1SpeakingSection {
  slug: string;
  section: string;
  type: "Speaking";
  instruction: string;
  instruction_vn: string;
  examples: Unit3Grammar1SpeakingExample[];
}

// -------------------------------

export interface Unit3Grammar1Data {
  slug: string;
  unit: string;
  title: string;
  sections: (
    | Unit3Grammar1TooForAgreeingSection
    | Unit3Grammar1ReadWriteSection
    | Unit3Grammar1ListenCheckSection
    | Unit3Grammar1LookWriteSection
    | Unit3Grammar1SpeakingSection
  )[];
}

// Unit 3 - Vocabulary 1
export interface Unit3VocabWord {
    word: string;
    translation: string;
    ipa: string;
    audio: string;
    image: string;
    example: {
        sentence: string;
        translation: string;
        audio: string;
    };
}

export interface Unit3Vocabulary2VocabSection {
    slug: 'listen_and_read';
    section: string;
    type: 'Vocabulary';
    instruction: string;
    words: Unit2VocabWord[];
}

export interface Unit3SpeakingWord {
    word: string;
    translation: string;
    audio: string;
}

export interface Unit3SpeakingExample {
    description: string;
    translation: string;
    answer: string;
    audio: string;
}

export interface Unit3Vocabulary2WritingSection {
    slug: 'describe_and_guess';
    section: string;
    type: 'Speaking';
    instruction: string;
    word_box: Unit2SpeakingWord[];
    examples: Unit2SpeakingExample[];
}

export type Unit3Vocabulary2Section = Unit3Vocabulary2VocabSection | Unit3Vocabulary2WritingSection;

export interface Unit3Vocabulary2Data {
    slug: string;
    title: string;
    sections: Unit2Vocabulary1Section[];
}// 🧩 Unit 3 – Grammar 2 Types
export interface Unit3Grammar2Data {
  slug: string;
  unit: string;
  section: string;
  title: string;
  type: string; // "Workbook"
  sections: Unit3Grammar2Section[];
}

export interface Unit3Grammar2Section {
  section_name: string;
  instruction: string;
  instruction_vn: string;
  type: "Grammar" | "Activity" | "Game";
  layout?: string; // "2-column" cho phần Activity
  content: (
    | GrammarContent[]
    | ActivityContent[]
    | GameContent[]
  );
}

// 🔹 Section 1 – Grammar content
export interface GrammarContent {
  sentence_en: string;
  sentence_vn: string;
  audio: string;
}

// 🔹 Section 2 – Activity content (2 cột hình ảnh)
export interface ActivityContent {
  image_left: string;
  image_right: string;
  question: string;
  answer: string;
  audio_question: string;
  audio_answer: string;
}

// 🔹 Section 3 – Game content (gồm 3 ví dụ)
export interface GameContent {
  example_1: GameExample;
  example_2: GameExample;
  example_3: GameExample;
}

export interface GameExample {
  sentence: string;
  result: string;
  audio: string;
}
export interface Unit3Grammar2Item {
  question: string;
  answer: string;
}

export interface Unit3Grammar2DataType {
  slug: string;
  title: string;
  instruction: string;
  items: Unit3Grammar2Item[];
}
// Type for a single dialogue line used in the reading section and other components
export interface DialogueLine {
  id: string;
  text: string;
  translation?: string;
  audioSrc?: string;
}

// Type for the content of the "Listen and read" section
export interface ReadingContent {
  sentence: string;
  translation: string;
  audio: string;
}

// Type for a true/false question
export interface TrueFalseQuestion {
  sentence: string;
  translation: string;
  answer: 'T' | 'F';
}

// Type for a sentence in the order sentences section
export interface OrderSentence {
  sentence: string;
  translation: string;
  order: number;
}

// Type for an example in the speaking/describe section
export interface DescribeExample {
  sentence: string;
  translation: string;
  audio: string;
}

// Type for the weird but true content
export interface WeirdButTrueContent {
  sentence: string;
  translation: string;
  audio: string;
}

// Type for each section in the unit data
export interface UnitSection {
  slug: string;
  section: string;
  type: 'Reading' | 'ReadingComprehension' | 'Ordering' | 'Speaking' | 'WeirdButTrue';
  instruction: string;
  image?: string;
  content?: ReadingContent[];
  questions?: TrueFalseQuestion[];
  sentences?: OrderSentence[];
  examples?: DescribeExample[];
}

// Type for the entire unit data structure
export interface Unit3ReadingData {
  slug: string;
  title: string;
  sections: UnitSection[];
}
// export interface HotAirBalloonExerciseQuestion {
//   q: string;
//   vi: string;
//   audioSrc: string;
// }

// export interface HotAirBalloonExercisesApiResponse {
//   true_false: {
//     instructions: string;
//     instructions_vi: string;
//     instructionsAudioSrc: string;
//     questions: HotAirBalloonExerciseQuestion[];
//   };
//   order_sentences: {
//     instructions: string;
//     instructions_vi: string;
//     instructionsAudioSrc: string;
//     sentences: string[];
//     sentences_vi: string[];
//     sentencesAudioSrc: string[];
//   };
//   describe: {
//     instructions: string;
//     instructions_vi: string;
//     instructionsAudioSrc: string;
//     example_answer: string;
//     example_answer_vi: string;
//     exampleAnswerAudioSrc: string[];
//   };
// }

// export interface HotAirBalloonWeirdButTrueApiResponse {
//   text: string;
//   vi: string;
//   audioSrc: string;
// }

// Unit 2 - Writing
export interface Unit3WritingContent {
    sentence: string;
    translation: string;
    audio: string;
    images?: string[];
}

export interface Unit3WritingReadingSection {
    slug: 'Read_about_My_special_place';
    section: 'Read';
    type: 'Reading';
    title: string;
    title_vi: string;
    content: Unit2WritingContent[];
}

export interface Unit3WritingWritingSection {
    slug: 'write_about_special_place';
    section: 'Write';
    type: 'Writing';
    title: string;
    title_vi: string;
    instruction: string;
    instruction_vi: string;
    input: {
        placeholder: string;
        placeholder_vi: string;
    };
}

export interface Unit3WritingSpeakingSection {
    slug: 'share_your_writing';
    section: 'Share';
    type: 'Speaking';
    title: string;
    title_vi: string;
    table: {
        columns: string[];
        columns_vi: string[];
        rows: string[][];
    };
}

export type Unit3WritingSection = 
    | Unit3WritingReadingSection
    | Unit3WritingWritingSection
    | Unit3WritingSpeakingSection;

export interface Unit3WritingData {
    _id: string;
    slug: 'unit3_writing';
    title: 'Unit 3 – Writing';
    sections: Unit2WritingSection[];
}
// types.ts

export interface ReadingItem {
  id: string;
  text: string;
  translation: string;
  audioSrc: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  audioSrc: string;
  imageSrc: string;
}

export interface ExerciseSentence {
  text: string;
  translation: string;
  audioSrc: string;
  order?: number; // chỉ áp dụng cho order_story
}

export interface DescribeAnimalsExample {
  text: string;
  translation: string;
}

export interface DescribeAnimalsTable {
  subject: string;
  imageSrc: string;
  example_sentences: DescribeAnimalsExample[];
}

export interface ExpressYourselfActivity {
  option: string;
  text: string;
  translation: string;
  audioSrc: string;
}

export interface Exercises {
  order_story: {
    instructions: string;
    instructions_vi: string;
    instructionsAudio: string;
    sentences: ExerciseSentence[];
  };
  describe_animals: {
    instructions: string;
    instructions_vi: string;
    word_box: string[];
    word_box_vi: string[];
    tables: DescribeAnimalsTable[];
  };
  express_yourself: {
    instructions: string;
    instructions_vi: string;
    activities: ExpressYourselfActivity[];
  };
}

export interface UnitData {
  slug: string;
  title: string;
  reading: ReadingItem[];
  readingImage: string;
  vocabulary: VocabularyItem[];
  exercises: Exercises;
}

// Unit 5 - Animal Habitats
export interface AnimalHabitatsVocabItem {
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  audio: string;
  image: string;
}

export interface AnimalHabitatsQAItem {
  question: string;
  answer: string;
  related_vocab: string[];
  image: string;
  audio_question: string;
  audio_answer: string;
  // Processed fields
  audioQuestion?: string;
  audioAnswer?: string;
}

export interface AnimalHabitatsVocabSection {
  slug: string;
  section: string;
  title: string;
  type: 'Vocabulary';
  instruction: string;
  content: AnimalHabitatsVocabItem[];
}

export interface AnimalHabitatsQASection {
  slug: string;
  section: string;
  title: string;
  type: 'Q&A';
  instruction: string;
  content: AnimalHabitatsQAItem[];
}

export interface AnimalHabitatsSongSection {
  slug: string;
  type: 'Song';
  title: string;
  song_title: string;
  song_audio: string;
  lyrics: string[];
}

export interface AnimalHabitatsActivitySection {
  slug: string;
  type: 'Activity';
  title: string;
  instruction: string;
}

export interface AnimalHabitatsGrammar1Example {
  question: string;
  answer: string;
  audio_question: string;
  audio_answer: string;
  // Processed fields
  audioQuestion?: string;
  audioAnswer?: string;
}

// FIX: Added missing properties to AnimalHabitatsGrammar1Section
export interface AnimalHabitatsGrammar1Section {
  slug: string;
  type: 'Grammar';
  title: string;
  instruction: string;
  examples: AnimalHabitatsGrammar1Example[];
}

// FIX: Added all missing types for Unit 5, 6, 7, 8, 9
export interface AnimalHabitatsMatchQuestion {
  q: string;
  a: string;
  audio_q: string;
  audio_a: string;
  image: string;
}

export interface AnimalHabitatsMatchSection {
  slug: string;
  type: 'Match';
  title: string;
  instruction: string;
  questions: AnimalHabitatsMatchQuestion[];
}

export interface AnimalHabitatsReadWriteItem {
    hiddenQuestion: { text: string; audio: string };
    answer: { text: string; audio: string };
    hintImage: string;
}

export interface AnimalHabitatsReadWriteSection {
    slug: string;
    type: 'Read and Write';
    title: string;
    instruction: string;
    items: AnimalHabitatsReadWriteItem[];
}

export interface AnimalHabitatsAskAnswerItem {
    question: { text: string; audio: string };
    hiddenAnswer: { text: string; audio: string };
    hintImage: string;
}

export interface AnimalHabitatsAskAnswerSection {
    slug: string;
    type: 'Ask and Answer';
    title: string;
    instruction: string;
    items: AnimalHabitatsAskAnswerItem[];
}

export interface AnimalHabitatsVocab2Item {
    word: string;
    meaning: string;
    pronunciation: string;
    audio_word: string;
    audio_example: string;
    image: string;
    example: string;
}

export interface AnimalHabitatsVocab2Section {
    slug: string;
    type: 'Vocabulary';
    title: string;
    instruction: string;
    content: AnimalHabitatsVocab2Item[];
}

export interface DragDropCategory {
    key: string;
    label: string;
    audio_intro: string;
}

export interface DragDropItem {
    word: string;
    image: string;
    audio_sentence: string;
    correctCategory: string;
}

export interface DragDropSection {
    slug: string;
    type: 'Activity';
    title: string;
    instruction: string;
    categories: DragDropCategory[];
    items: DragDropItem[];
}

export interface AnimalHabitatsGrammar2Example {
    sentence: string;
    translation: string;
    audio: string;
// FIX: Completed the interface which was cut off in the original file.
    image: string;
}

export interface AnimalHabitatsGrammar2Section {
    slug: string;
    type: 'Grammar';
    title: string;
    instruction: string;
    examples: AnimalHabitatsGrammar2Example[];
}

export interface ReadMatchQuestionPart {
    text: string;
    audio: string;
}

export interface ReadMatchQuestion {
    left: ReadMatchQuestionPart;
    right: ReadMatchQuestionPart;
    sentence: string;
    meaning: string;
}

export interface ReadMatchSection {
    slug: string;
    type: 'Activity';
    title: string;
    instruction: string;
    questions: ReadMatchQuestion[];
}

export interface DiceFace {
    word: string;
    image: string;
    audio: string;
}

export interface Dice {
    key: string;
    label: string;
    faces: DiceFace[];
}

export interface DiceSection {
    slug: string;
    type: 'Activity';
    title: string;
    instruction: string;
    dice: Dice[];
}

export interface ListenReadSentence {
    text: string;
    translation: string;
    audio: string;
}

export interface ListenReadLayer {
    title: string;
    image: string;
    sentences: ListenReadSentence[];
}

export interface ListenReadParagraph {
    title: string;
    sentences: ListenReadSentence[];
    background_image?: string;
    paragraphs?: ListenReadLayer[];
}

export interface ListenReadSection {
    slug: string;
    type: 'Listen and Read';
    title: string;
    instruction: string;
    paragraphs: ListenReadParagraph[];
}

export interface ReadCircleQuestion {
    text: string;
    choices: string[];
    answer: string;
    audio: string;
}

export interface ReadCircleSection {
    slug: string;
    type: 'Read and Circle';
    title: string;
    instruction: string;
    questions: ReadCircleQuestion[];
}

export interface ChartCompletionRow {
    animal: string;
    habitat: string;
    food: string;
}

export interface ChartCompletionSection {
    slug: string;
    type: 'Chart Completion';
    title: string;
    instruction: string;
    chart: Record<string, string>[]; // FIX: Changed from `rows` to `chart` to match component usage
}

export interface SpeakingSection {
    slug: string;
    type: 'Speaking';
    title: string;
    instruction: string;
    prompts: string[];
}
export interface Unit5ReadWritePassageSection {
  slug: string;
  section: string;
  title: string;
  type: "Read and Write";
  instruction: string;
  questions: Unit5ReadWriteQuestion[];
}
export interface Unit5ReadWriteQuestion {
  id: number;
  text: string;
  vn: string;
  audio?: string;
  explanation?: {
    [word: string]: {
      type: string;
      meaning: string;
      examples: string[];
    };
  };
  images?: {
    name: string;
    url: string;
  }[];
}
export interface Unit5GuidedWritingSection {
  slug: string;
  section: string;
  title: string;
  type: "Writing";
  instruction: string;
  questions: Unit5GuidedWritingQuestion[];
}
export interface Unit5GuidedWritingQuestion {
  id: number;
  text: string;
  vn: string;
  audio?: string;
}
export interface Unit5GroupWorkSection {
  slug: 'share_your_writing';
  section: string;
  title: string;
  type: "Group Work";
  instruction: string;
  chart: Unit5Chart;
}
export interface Unit5Chart {
  columns: string[];
  rows: {
    [key: string]: string;
  }[];
}
export type Unit5Section =Unit5GroupWorkSection |Unit5GuidedWritingSection|Unit5ReadWritePassageSection | AnimalHabitatsVocabSection | AnimalHabitatsQASection | AnimalHabitatsSongSection | AnimalHabitatsGrammar1Section | AnimalHabitatsMatchSection | AnimalHabitatsReadWriteSection | AnimalHabitatsAskAnswerSection | AnimalHabitatsVocab2Section | DragDropSection | AnimalHabitatsGrammar2Section | ReadMatchSection | DiceSection | ListenReadSection | ReadCircleSection | ChartCompletionSection | SpeakingSection;

export interface Unit5Data {
    slug: string;
    unit: string;
    sections: Unit5Section[];
}

export interface Unit5WorkbookSection {
    slug?: string;
    section: string;
    title?: string;
    instruction?: string;
    [key: string]: any; 
}
export interface Unit5WorkbookVocab2Section {
    slug: 'vocabulary2';
    section: 'Vocabulary 2';
    sections: Unit5WorkbookSection[];
}
// FIX: Add all missing Unit 5 workbook types
export interface Unit5WorkbookVocabSection extends Unit5WorkbookSection { content: any[]; }
export interface Unit5WorkbookReadWriteSection extends Unit5WorkbookSection { questions: any[]; }
export interface Unit5WorkbookSongMatchSection extends Unit5WorkbookSection { questions: any[]; }
export interface Unit5WorkbookSongWriteVerseSection extends Unit5WorkbookSection { word_box: string[]; template: any; }
export interface Unit5WorkbookGrammar1QA { questions: any[]; }
export interface Unit5WorkbookGrammar1ReadWrite { word_box: string[]; questions: any[]; }
export interface Unit5WorkbookGrammar1Match { questions: any[]; }
export interface Unit5WorkbookGrammar1LikeDislike { word_box: string[]; examples: any[]; }
export interface Unit5WorkbookGrammar1Section extends Unit5WorkbookSection { sections?: any[]; children?: any[]; }
export interface Unit5WorkbookGrammar2InfinitiveTableSection extends Unit5WorkbookSection { table: any; }
export interface Unit5WorkbookGrammar2ListenWriteSection extends Unit5WorkbookSection { word_bank: string[]; questions: any[]; }
export interface Unit5WorkbookGrammar2WritingSection extends Unit5WorkbookSection { questions: any[]; }
export interface Unit5WorkbookGrammar2DialogueSection extends Unit5WorkbookSection { questions: any[]; }
export interface Unit5WorkbookGamePuzzleSection extends Unit5WorkbookSection { word_bank: string[]; questions: any[]; }
export interface Unit5WorkbookListenReadFastSection extends Unit5WorkbookSection { questions: any[]; }
export interface Unit5WorkbookReadingPassageSection extends Unit5WorkbookSection { paragraphs: any[]; }
export interface Unit5WorkbookReadingTrueFalseSection extends Unit5WorkbookSection { questions: any[]; }
export interface Unit5WorkbookReadingChartSection extends Unit5WorkbookSection { table: any; }
export interface Unit5WorkbookReadingFillBlankSection extends Unit5WorkbookSection { questions: any[]; }
export interface Unit5WorkbookReadingWeirdTrueSection extends Unit5WorkbookSection { paragraphs: any[]; }
export interface Unit5WorkbookWritingReadUnderstandSection extends Unit5WorkbookSection { audio: string; questions: any[]; }
export interface Unit5WorkbookWritingDrawDescribeSection extends Unit5WorkbookSection { questions: any[]; }
export interface Unit5WorkbookWritingLookWriteSection extends Unit5WorkbookSection { word_bank: string[]; questions: any[]; }
export interface Unit5WorkbookFix {
  lookAndMatch?: Unit5WorkbookVocabSection;
  readingPassage?: Unit5WorkbookReadingPassageSection;
  readingTrueFalse?: Unit5WorkbookReadingTrueFalseSection;
  readingChart?: Unit5WorkbookReadingChartSection;
  readingFillBlank?: Unit5WorkbookReadingFillBlankSection;
  readingWeirdTrue?: Unit5WorkbookReadingWeirdTrueSection;
 
}

export interface Unit5WorkbookData {
    slug: string;
    unit: string;
    sections: (Unit5WorkbookSection | Unit5WorkbookVocab2Section)[];
}

// Unit 6
export interface Unit6VocabWord {
    word: string;
    phonetic: string;
    meaning_vn: string;
    audio: string;
    image: string;
}
export interface Unit6VocabSection {
    section_name: string;
    type: 'Vocabulary';
    description: string;
    words: Unit6VocabWord[];
}

export interface Unit6ActivityExample {
    text: string;
    audio: string;
}
export interface Unit6ActivitySection {
    section_name: string;
    type: 'Activity';
    instruction: string;
    audio_instruction: string;
    examples: Unit6ActivityExample[];
}

export type Unit6Vocabulary1Section = Unit6VocabSection | Unit6ActivitySection;

export interface Unit6Vocabulary1Data {
    slug: string;
    unit: string;
    sections: Unit6Vocabulary1Section[];
}

export interface Unit6Song_ReadAndSingSection {
    type: 'Song';
    section_name: string;
    section_name_vi: string;
    lyrics: {
        title: string;
        title_vi: string;
        content: string[];
        translation: string[];
        audio: string;
    }
}
export interface Unit6Song_ActivityItem {
    word: string;
    word_vi: string;
    image: string;
    audio: string;
}
export interface Unit6Song_ActivitySection {
    type: 'Activity';
    section_name: string;
    section_name_vi: string;
    instruction: string;
    instruction_vi: string;
    audio_instruction: string;
    audio_instruction_vi: string;
    items: Unit6Song_ActivityItem[];
}
export type Unit6SongSection = Unit6Song_ReadAndSingSection | Unit6Song_ActivitySection;
export interface Unit6SongData {
    slug: string;
    unit: string;
    unit_vi: string;
    sections: Unit6SongSection[];
}

export interface Unit6GrammarExample {
    question: string;
    question_vn: string;
    audio_question: string;
    answer: string;
    answer_vn: string;
    audio_answer: string;
    image?: string;
}
export interface Unit6GrammarInstructionSection {
    section_name: 'Grammar Instruction';
    type: 'Grammar';
    audio_instruction: string;
    instruction: string;
    instruction_vn: string;
}
export interface Unit6GrammarActivitySection {
    section_name: string;
    type: 'Activity';
    audio_instruction: string;
    instruction: string;
    instruction_vn: string;
    image?: string;
    examples: Unit6GrammarExample[];
}
export type Unit6GrammarSection = Unit6GrammarInstructionSection | Unit6GrammarActivitySection;
export interface Unit6GrammarData {
    slug: string;
    unit: string;
    sections: Unit6GrammarSection[];
}

export interface Unit6Vocabulary2Example {
    word: string;
    definition: string;
    definition_vn: string;
    example: string;
    example_vn: string;
    audio_word: string;
    audio_example: string;
    image: string;
}
export interface Unit6Vocabulary2FillBlankExample {
    question: string;
    question_vn: string;
    options: string[];
    options_vn: string[];
    answer: string;
    image: string;
    audio_question: string;
}
export interface Unit6Vocabulary2ListenFillExample {
    question: string;
    question_vn: string;
    answer: string;
    image: string;
    audio_question: string;
}
export interface Unit6Vocabulary2VocabSection {
    slug: 'vocabulary2_listen_read';
    type: 'Vocabulary';
    section_name: string;
    audio_instruction: string;
    instruction_vn?: string; // FIX: Added missing property
    examples: Unit6Vocabulary2Example[];
}
export type Unit6Vocabulary2ActivitySection = (
    {
        slug: 'fill_in_the_blanks';
        type: 'Activity';
        section_name: string;
        instruction: string; // FIX: Added missing property
        instruction_vn?: string; // FIX: Added missing property
        audio_instruction: string;
        examples: Unit6Vocabulary2FillBlankExample[];
    } | {
        slug: 'listen_fill_in_the_blanks';
        type: 'Activity';
        section_name: string;
        instruction: string; // FIX: Added missing property
        instruction_vn?: string; // FIX: Added missing property
        audio_instruction: string;
        examples: Unit6Vocabulary2ListenFillExample[];
    }
);
export type Unit6Vocabulary2Section = Unit6Vocabulary2VocabSection | Unit6Vocabulary2ActivitySection;
export interface Unit6Vocabulary2Data {
    slug: string;
    unit: string;
    sections: Unit6Vocabulary2Section[];
}

export interface Unit6Vocabulary3Word {
    text: string;
    meaning_vn: string;
    audio_url: string;
    image_url: string;
    example_en: string;
    example_vn: string;
}

export interface Unit6Vocabulary3Data {
    title: string;
    slug: string;
    words: Unit6Vocabulary3Word[];
}

export interface Unit6Grammar2Example {
    question: string;
    audio_question: string;
    answer: string;
    audio_answer: string;
    image: string;
    definition?: string;
}
export interface Unit6Grammar2GameExample {
    card_question: string;
    audio_question: string;
    answer: string;
    audio_answer: string;
}
export type Unit6Grammar2Section = {
    type: 'Grammar' | 'Activity';
    section_name: string;
    audio_instruction: string;
    instruction: string;
    instruction_vn: string;
    game_board?: string;
    examples: (Unit6Grammar2Example | Unit6Grammar2GameExample)[];
}
export interface Unit6Grammar2Data {
    slug: string;
    unit: string;
    sections: Unit6Grammar2Section[];
}

export interface Unit6ReadingContent {
    sentence: string;
    sentence_vn: string;
    audio_sentence: string;
}

export interface Unit6ReadingTrueFalseExample {
    statement: string;
    audio_statement: string;
    answer: 'T' | 'F';
    explanation: string;
    image: string;
}
export type Unit6ReadingListenReadSection = {
    type: 'Reading';
    section_name: string;
    audio_instruction: string;
    instruction: string;
    images: string[];
    content: Unit6ReadingContent[];
};
export type Unit6ReadingTrueFalseSection = {
    type: 'Activity';
    section_name: "Read and Check T for True and F for False";
    audio_instruction: string;
    instruction: string;
    examples: Unit6ReadingTrueFalseExample[];
};
export type Unit6ReadingChartSection = {
    type: 'Activity';
    section_name: "Read. Complete the Chart";
    audio_instruction: string;
    instruction: string;
    chart: Record<string, string>[];
};

export type Unit6ReadingSection = Unit6ReadingListenReadSection | Unit6ReadingTrueFalseSection | Unit6ReadingChartSection;

export interface Unit6ReadingData {
    slug: string;
    unit: string;
    sections: Unit6ReadingSection[];
}

export interface Unit6WritingExample {
    title: string;
    content: {
        sentence: string;
        sentence_vn: string;
        audio_sentence: string;
    }[];
}
export interface Unit6WritingCheckExample {
    statement: string;
    statement_vn: string;
    audio_statement: string;
}
export interface Unit6WritingParagraphSection {
    type: 'Writing';
    section_name: 'Write a Paragraph';
    audio_instruction: string;
    instruction: string;
    instruction_vn: string;
    content: Unit6ReadingContent[];
    examples: Unit6WritingExample[];
}
export interface Unit6WritingCheckSection {
    type: 'Activity';
    section_name: 'Write and Check';
    audio_instruction: string;
    instruction: string;
    instruction_vn: string;
    content: { sentence: string, audio_sentence: string }[];
    examples: Unit6WritingCheckExample[];
}
export interface Unit6WritingShareSection {
    type: 'Activity';
    section_name: 'Share Your Writing';
    audio_instruction: string;
    instruction: string;
    instruction_vn: string;
    chart: { Name: string; 'Favorite Meal': string }[];
}


export type Unit6WritingSection = Unit6WritingParagraphSection | Unit6WritingCheckSection | Unit6WritingShareSection;

export interface Unit6WritingData {
    slug: string;
    unit: string;
    sections: Unit6WritingSection[];
}

export interface Unit6ExtendedReadingMatchCharacter {
    name: string;
    image: string;
    audio: string;
    answer_actions?: string[];
}
export interface Unit6ExtendedReadingMatchAction {
    action: string;
    audio_action: string;
}
export interface Unit6ExtendedReadingCheckExample {
    statement: string;
    audio_statement: string;
    answer: 'T' | 'F';
    image: string;
    explanation: string;
}
export interface Unit6ExtendedReadingExpressActivity {
    activity: string;
    audio_activity: string;
}
export interface Unit6ExtendedReadingListenReadSection {
    type: 'Reading';
    section_name: 'Listen and Read';
    audio_instruction: string;
    instruction: string; // FIX: Added missing property
    content: Unit6ReadingContent[];
}
export interface Unit6ExtendedReadingMatchSection {
    type: 'Activity';
    section_name: 'Read and Match';
    audio_instruction: string;
    instruction: string; // FIX: Added missing property
    matches: {
        characters: Unit6ExtendedReadingMatchCharacter[];
        actions: Unit6ExtendedReadingMatchAction[];
    }
}
export interface Unit6ExtendedReadingCheckSection {
    type: 'Activity';
    section_name: 'Read and Check';
    audio_instruction: string;
    instruction: string; // FIX: Added missing property
    examples: Unit6ExtendedReadingCheckExample[];
}
export interface Unit6ExtendedReadingExpressSection {
    type: 'Activity';
    section_name: 'Express Yourself';
    audio_instruction: string;
    instruction: string; // FIX: Added missing property
    activities: Unit6ExtendedReadingExpressActivity[];
}
export type Unit6ExtendedReadingSection = Unit6ExtendedReadingListenReadSection | Unit6ExtendedReadingMatchSection | Unit6ExtendedReadingCheckSection | Unit6ExtendedReadingExpressSection;

export interface Unit6ExtendedReadingData {
    slug: string;
    unit: string;
    sections: Unit6ExtendedReadingSection[];
}

export interface Unit6GameItem {
    id: number;
    question_type: string;
    image: string;
    question: string;
    audio_question: string;
    answer: string;
    audio_answer: string;
}
export interface Unit6GameData {
    slug: string;
    activity: string;
    instruction: string;
    items: Unit6GameItem[];
}

export interface Unit6WorkbookSection {
    slug: string;
    section_group: string;
    [key: string]: any;
}

// FIX: Add all missing Unit 6 workbook types
export interface Unit6WorkbookListenWriteSection extends Unit6WorkbookSection { examples: any[]; }
export interface Unit6WorkbookMatchSection extends Unit6WorkbookSection { matches: any; }
export interface Unit6WorkbookSongSection extends Unit6WorkbookSection { words: any[]; audio_song: string; }
export interface Unit6WorkbookLyricSection extends Unit6WorkbookSection { sentences: any[]; }
export interface Unit6WorkbookGrammar1TableActivity extends Unit6WorkbookSection { question_table: any; answer_table: any; }
export interface Unit6WorkbookGrammar1CircleActivity extends Unit6WorkbookSection { questions: any[]; audio: string; }
export interface Unit6WorkbookGrammar1FillBlank extends Unit6WorkbookSection { questions: any[]; image: string; }
export interface Unit6WorkbookGrammar1DrawAnswer extends Unit6WorkbookSection { vocabulary: any[]; questions: any[]; }
export interface Unit6WorkbookVocab2ListenReadWrite extends Unit6WorkbookSection { items: any[]; }
export interface Unit6WorkbookVocab2ReadWrite extends Unit6WorkbookSection { box: string[]; items: any[]; }
export interface Unit6WorkbookGrammar2TableActivity extends Unit6WorkbookSection { question_table: any; answer_table: any; }
export interface Unit6WorkbookGrammar2ChartActivity extends Unit6WorkbookSection { vocabulary: any[]; chart: any; }
export interface Unit6WorkbookGrammar2FillBlank extends Unit6WorkbookSection { questions: any[]; }
export interface Unit6WorkbookGrammar2Speaking extends Unit6WorkbookSection { questions: any[]; }
export interface Unit6WorkbookGameTimeWriteSection extends Unit6WorkbookSection { items: any[]; }
export interface Unit6WorkbookWordSearchSection extends Unit6WorkbookSection { grid: string[][]; images: any[]; }
export interface Unit6WorkbookListenReadFastSection extends Unit6WorkbookSection { items: any[]; }
export interface Unit6WorkbookReadingListenReadSection extends Unit6WorkbookSection { paragraphs: any[]; }
export interface Unit6WorkbookReadingTrueFalseSection extends Unit6WorkbookSection { questions: any[]; }
export interface Unit6WorkbookReadingReadWriteSection extends Unit6WorkbookSection { questions: any[]; }
export interface Unit6WorkbookReadingChartSection extends Unit6WorkbookSection { columns: any[]; }
export interface Unit6WorkbookReadingWeirdTrueSection extends Unit6WorkbookSection { facts: any[]; }
export interface Unit6WorkbookWritingReadAnswerSection extends Unit6WorkbookSection { paragraphs: any[]; questions: any[]; }
export interface Unit6WorkbookWritingCreativeSection extends Unit6WorkbookSection { prompts: any[]; }
export interface Unit6WorkbookReviewSection extends Unit6WorkbookSection { images: string[]; table: any; }

export interface Unit6WorkbookData {
    slug: string;
    unit: string;
    sections: Unit6WorkbookSection[];
}

// Unit 7
export interface Unit7VocabWordSection {
    type: 'Words';
    section: string;
    words: {
        word: string;
        ipa: string;
        meaning_vn: string;
        example: string;
        example_vn: string;
        image: string;
        audio: string;
    }[];
}
export interface Unit7ActionSection {
    type: 'Speaking and Action';
    section: string;
    instruction: string;
    sentences: {
        sentence: string;
        sentence_vn: string;
        audio: string;
    }[];
}
export interface Unit7Vocabulary1Data {
    slug: string;
    title: string;
    sections: (Unit7VocabWordSection | Unit7ActionSection)[];
}
export interface Unit7Vocab2VocabSection {
    slug: 'activity_one';
    type: 'Vocabulary';
    title: string;
    words: {
        word: string;
        ipa: string;
        meaning_vn: string;
        image: string;
        audio: string;
        example?: string;
        example_vn?: string;
    }[];
}
export interface Unit7Vocab2ExamplesSection {
    slug: 'examples';
    type: 'Practice';
    title: string;
    instruction: string; // FIX: Added missing property
    examples: {
        text: string;
        audio: string;
    }[];
}
export interface Unit7Vocab2FillBlankSection {
    slug: 'fill_in_the_blanks';
    type: 'Exercise';
    title: string;
    instruction: string;
    questions: {
        text: string;
        answer: string;
        audio: string;
    }[];
}
export interface Unit7Vocabulary2Data {
    slug: string;
    unit: string;
    sections: (Unit7Vocab2VocabSection | Unit7Vocab2ExamplesSection | Unit7Vocab2FillBlankSection)[];
}

export interface Unit7Grammar1GrammarSection {
    slug: 'grammar_practice';
    type: 'Grammar';
    section: string;
    instruction: string;
    examples: {
        image: string;
        question: string;
        vn: string;
        audio_question: string;
        answer_yes: string;
        vn_yes: string;
        audio_yes: string;
        answer_no: string;
        vn_no: string;
        audio_no: string;
    }[];
}
export interface Unit7Grammar1ReadWriteSection {
    slug: 'read_write_answers';
    type: 'Activity';
    section: string;
    instruction: string;
    questions: {
        image: string;
        question: string;
        answer: string;
        audio_question: string;
        audio_answer: string;
    }[];
}
export interface Unit7Grammar1WritePartnerSection {
    slug: 'write_about_you';
    type: 'Activity';
    section: string;
    instruction: string;
    title: string; // FIX: Added missing property
    prompts: {
        text: string;
        answer_yes: string;
        answer_no: string;
    }[];
}
export interface Unit7Grammar1SpeakingSection {
    slug: 'speaking_practice';
    type: 'Activity';
    section: string;
    instruction: string;
    words: {
        text: string;
        image: string;
        audio: string;
    }[];
    examples: {
        question: string;
        vn: string;
        audio_question: string;
        answer_yes: string;
        vn_yes: string;
        audio_yes: string;
        answer_no: string;
        vn_no: string;
        audio_no: string;
    }[];
}
export interface Unit7Grammar1Data {
    slug: string;
    title: string;
    sections: (Unit7Grammar1GrammarSection | Unit7Grammar1ReadWriteSection | Unit7Grammar1WritePartnerSection | Unit7Grammar1SpeakingSection)[];
}

// FIX: Add Unit7GameItem type
export type Unit7GameItem = Unit6GameItem;

export interface Unit7GameData {
    slug: string;
    activity: string;
    instruction: string;
    items: Unit7GameItem[];
}

export interface Unit7Grammar2IntroSection {
    slug: 'introduction';
    section: 'Introduction';
    sentences: { en: string; vn: string; audio: string; }[];
}
export interface Unit7Grammar2NotesSection {
    slug: 'grammar_notes';
    section: 'Grammar Notes';
    instruction: string;
    notes: {
        title: string;
        content: string;
        table: { [key: string]: string }[];
    }[];
}
export interface Unit7Grammar2ExerciseSection {
    slug: 'make_true_sentences';
    section: 'Make True Sentences';
    instruction: string;
    questions: {
        text: string;
        answer: string;
        audio: string;
    }[];
}
export interface Unit7Grammar2AnalysisSection {
    slug: 'error_analysis';
    section: 'Error Analysis';
    instruction: string;
    table: {
        no: number;
        sentence: string;
        analysis: string;
        audio: string;
    }[];
}

export interface Unit7Grammar2Data {
    slug: string;
    title: string;
    sections: (Unit7Grammar2IntroSection | Unit7Grammar2NotesSection | Unit7Grammar2ExerciseSection | Unit7Grammar2AnalysisSection)[];
}

export interface Unit7SongData {
    slug: string;
    title: string;
    sections: {
        slug: string;
        type: string;
        section: string;
        instruction: string;
        audio: string;
        lyrics: {
            part: string;
            text: string;
        }[];
    }[];
}

export interface Unit7ReadingListenReadSection {
    slug: 'listen_and_read';
    title: string;
    section: string;
    image: string;
    content: {
        text: string;
        translation: string;
        audio: string;
    }[];
}
export interface Unit7ReadingWeirdButTrueSection {
    slug: 'weird_but_true';
    section: string;
    content: {
        text: string;
        translation: string;
        audio: string;
    }[];
}
export interface Unit7ReadingUnderlineQuestion {
    q: string;
    answer: string;
    audio: string;
    translation: string;
}
export interface Unit7ReadingUnderlineSection {
    slug: 'read_and_underline';
    section: string;
    instruction: string;
    questions: Unit7ReadingUnderlineQuestion[];
}

export interface Unit7ReadingWritingSection {
    slug: 'write_exercise_good_for';
    title: string;
    instruction: string;
    columns: string[];
    table?: { columns: string[] }; // FIX: Add optional table property
}
export interface Unit7ReadingSpeakingSection {
    slug: 'ask_and_answer_exercise';
    section: string;
    instruction: string;
    examples: {
        q: string;
        a: string;
        audio: string;
    }[];
}

export interface Unit7ReadingData {
    slug: string;
    title: string;
    sections: (
        | Unit7ReadingListenReadSection
        | Unit7ReadingWeirdButTrueSection
        | Unit7ReadingUnderlineSection
        | Unit7ReadingWritingSection
        | Unit7ReadingSpeakingSection
    )[];
}

export interface Unit7WritingReadSection {
    slug: 'read_about_daniel';
    section: string;
    title: string;
    content: { text: string; text_vn: string; audio: string }[];
}
export interface Unit7WritingWriteSection {
    slug: 'write_keep_fit';
    section: string;
    title: string;
    instruction: string;
    sample: { text: string; text_vn: string; audio: string };
}
export interface Unit7WritingShareSection {
    slug: 'share_your_writing';
    section: string;
    title: string;
    instruction: string;
    instruction_vn: string;
    audio: string;
    chart: {
        columns: string[];
        example: { Name: string; Activity: string; Why: string }[];
    }
}
export interface Unit7WritingData {
    slug: string;
    title: string;
    sections: (Unit7WritingReadSection | Unit7WritingWriteSection | Unit7WritingShareSection)[];
}

export interface Unit7ReviewData {
    slug: string;
    section: string;
    words: {
        word: string;
        phonetic: string;
        meaning: string;
        image: string;
        audio: string;
        example_en: string;
        example_vi: string;
    }[];
}

export interface Unit7WorkbookSection {
  slug: string;
  section: string;
  [key: string]: any;
}
export interface Unit7WorkbookData {
  slug: string;
  title: string;
  sections: Unit7WorkbookSection[];
}

export interface Unit7MultipleChoiceSection {
  section: string;
  activity_title: string;
  instruction: string;
  questions: {
    id: number;
    question: string;
    options: string[];
    answer: string;
    audio: string;
  }[];
}
export interface Unit7SongMatchSection {
  title: string;
  instruction: string;
  audioSrc: string;
  items: {
    id: number;
    question: string;
    questionAudio: string;
    answer: string;
    answerAudio: string;
  }[];
}

export interface Unit7SongWriteVerseSection {
  section: string;
  instruction: string;
  word_box: string[];
  sentences: {
    id: number;
    sentence: string;
    answer: string | string[];
  }[];
}

export interface Unit7Grammar1TableSection {
    title: string;
    instruction: string;
    tables: {
        questions: { header: string[], rows: string[][] },
        answers: { header: string[], rows: string[][] }
    }
}
export interface Unit7Grammar1ListenWriteSection {
    title: string;
    questions: {
        id: number;
        text: string;
        answer: string;
        audio: string;
    }[];
    instruction?: string; // FIX: Add optional instruction
}
export interface Unit7Grammar1ListenMatchSection {
    title: string;
    instruction: string;
    items: {
        left: { text: string; vn: string; audio: string }[];
        right: { text: string; vn: string; audio: string }[];
    };
    answers: { question: string; answer: string; }[];
}

export interface Unit7Grammar1LookReadWriteSection {
    title: string;
    instruction: string;
    questions: {
        id: number;
        image: string;
        question: string;
        audio: string;
        answer: string;
    }[];
}

export interface Unit7Grammar1WritePartnerSection {
    title: string;
    instruction: string;
    questions: {
        text: string;
        example: string;
    }[];
}

export interface Unit7Vocab2ReadMatchSection {
    title: string;
    instruction: string;
    leftColumn: { text: string, audio: string }[];
    rightColumn: { text: string, audio: string }[];
    correctAnswers: Record<string, string>;
}
export interface Unit7Vocab2LookReadWriteSection {
    title: string;
    instruction: string;
    wordBox: string[];
    questions: {
        id: number;
        text: string;
        image: string;
        audio: string;
        answer: string;
    }[];
}
export interface Unit7WorkbookGrammar2TableSection {
    title: string;
    instruction: string;
    content: {
        table: { columns: string[], rows: string[][] }
    };
}
export interface Unit7WorkbookGrammar2ReadWriteExerciseSection {
    title: string;
    instruction: string;
    content: {
        questions: {
            text: string;
            answer: string;
            audio: string;
        }[];
    };
}
export interface Unit7WorkbookGrammar2YesNoSection {
    title: string;
    instruction: string;
    content: {
        questions: {
            text: string;
            answer: string;
            audio: string;
        }[];
    };
}

export interface Unit7WorkbookGameTimeDialogueSection {
    title: string;
    instruction: string;
    content: {
        student1: { text: string, audio: string }[];
        student2: { text: string, audio: string }[];
    };
}
export interface Unit7WorkbookGameTimePuzzleSection {
    title: string;
    instruction: string;
    content: {
        questions: {
            text: string;
            answer: string;
            audio: string;
        }[];
    };
}
export interface Unit7WorkbookGameTimeListenReadFastSection {
    title: string;
    instruction: string;
    content: {
        sentences: { text: string, audio: string }[];
    };
}
export interface Unit7WorkbookReadingPassageSection {
    title: string;
    image: string;
    content: {
        text: string;
        translation: string;
        audio: string;
    }[];
}
export interface Unit7WorkbookReadingFactSection {
    title: string;
    content: { text: string, translation: string, audio: string }[];
}
export interface Unit7WorkbookReadingTrueFalseSection {
    title: string;
    questions: {
        text: string;
        answer: 'T' | 'F';
        translation: string;
        audio: string;
    }[];
}
export interface Unit7WorkbookReadingChartSection {
    title: string;
    chart: {
        columns: string[];
        rows: Record<string, string>[];
    };
}
export interface Unit7WorkbookReadingOpenQuestionsSection {
    title: string;
    image: string;
    questions: {
        q: string;
        q_vi: string;
        answer: string;
        audio: { question: string; answer: string; };
    }[];
}

export interface Unit7WorkbookWritingReadWriteSection {
    title: string;
    image: string;
    content: { text: string, translation: string, audio: string }[];
    exercise: {
        instruction: string;
        question: string;
        sample_answer: string;
    };
}
export interface Unit7WorkbookWritingTaskSection {
    title: string;
    instruction: string;
    image: string;
    audio: string;
    exercise: {
        sample_text: string;
        sample_translation: string;
    };
}
export interface Unit7ReviewFillBlanksSection {
    title: string;
    instruction: string;
    sentences: {
        text: string;
        answer: string | string[];
        audio: string;
    }[];
}
export interface Unit7ReviewCheckTableSection {
    title: string;
    instruction: string;
    table: {
        columns: string[];
        rows: { sentence: string }[];
    };
}
// Unit 8
export interface Unit8Vocabulary1Word {
    word: string;
    ipa: string;
    meaning: string;
    image: string;
    audio: string;
    example: string;
}
export interface Unit8Vocabulary1QA {
    question: string;
    answer: string;
    audio_q: string;
    audio_a: string;
}
export interface Unit8Vocabulary1Data {
    slug: string;
    title: string;
    sections: (
        { slug: 'listen_and_say', type: 'Vocabulary', title: string, words: Unit8Vocabulary1Word[] } |
        { slug: 'work_with_partner', type: 'Speaking', title: string, qa: Unit8Vocabulary1QA[] }
    )[];
}

export interface Unit8Grammar1Content {
    sentence?: string;
    question?: string;
    answer_yes?: string;
    image?: string;
    vn?: string;
    vn_yes?: string;
    audio?: string;
    audio_question?: string;
    audio_yes?: string;
    answer?: string;
}
export interface Unit8Grammar1Section {
    slug: string;
    type: string;
    title: string;
    words?: string[];
    content: Unit8Grammar1Content[];
}
export interface Unit8Grammar1Data {
    slug: string;
    title: string;
    sections: Unit8Grammar1Section[];
}

export interface Unit8Vocabulary2Content {
    word?: string;
    meaning?: string;
    image?: string;
    audio?: string;
    question?: string;
    answer?: string;
}
export interface Unit8Vocabulary2Section {
    slug: string;
    type: string;
    title: string;
    content: Unit8Vocabulary2Content[];
}
export interface Unit8Vocabulary2Data {
    slug: string;
    title: string;
    sections: Unit8Vocabulary2Section[];
}
export interface Unit8Grammar2ContentGrammar {
    question: string;
    vn: string;
    audio_question: string;
    answer: string;
    vn_answer: string;
    audio_answer: string;
    image: string;
}
export interface Unit8Grammar2ContentMatchWord {
    word: string;
    vn: string;
    audio: string;
}
export interface Unit8Grammar2ContentMatch {
    left: Unit8Grammar2ContentMatchWord[];
    right: Unit8Grammar2ContentMatchWord[];
}
export interface Unit8Grammar2ContentGame {
    prompt: string;
    audio_prompt: string;
    sentence?: string;
    vn?: string;
    audio_sentence?: string;
}
export interface Unit8Grammar2Section {
    slug: string;
    type: 'Grammar' | 'Matching' | 'Game';
    title: string;
    content: Unit8Grammar2ContentGrammar[] | Unit8Grammar2ContentMatch | Unit8Grammar2ContentGame[];
}
export interface Unit8Grammar2Data {
    slug: string;
    title: string;
    sections: Unit8Grammar2Section[];
}

export interface Unit8ReadingSentence { english: string; vietnamese: string; audio: string; }
export interface Unit8ReadingFunFact { english: string; vietnamese: string; audio: string; }
export interface Unit8ReadingTrueFalse { question: string; audio: string; }
export interface Unit8ReadingChartContent { columns: string[], rows: Record<string, string>[] }
export interface Unit8ReadingSpeakingExample { english: string; vietnamese: string; audio: string; }
export interface Unit8ReadingSection {
    slug: string;
    type: 'Reading' | 'FunFact' | 'TrueFalse' | 'Chart' | 'Speaking';
    title: string;
    content: { sentences: Unit8ReadingSentence[] } | Unit8ReadingFunFact | Unit8ReadingTrueFalse[] | Unit8ReadingChartContent | { examples: Unit8ReadingSpeakingExample[] };
}
export interface Unit8ReadingData {
    slug: string;
    title: string;
    sections: Unit8ReadingSection[];
}
export interface Unit8WritingSection {
    slug: string;
    type: 'Reading' | 'Writing' | 'Speaking';
    title: string;
    content: any;
}
export interface Unit8WritingData {
    slug: string;
    title: string;
    sections: Unit8WritingSection[];
}

export interface CrosswordClue {
    number: number;
    start: { row: number, col: string };
    clue: string;
    answer: string;
}
export interface CrosswordSection {
    slug: string;
    title: string;
    instruction: string;
    content: {
        across: CrosswordClue[];
        down: CrosswordClue[];
    };
}
export interface ListenReadFastGameContent { text: string; audio: string; }
export interface ListenReadFastGameSection {
    slug: string;
    title: string;
    instruction: string;
    content: ListenReadFastGameContent[];
}
export interface Unit8GameData {
    slug: string;
    title: string;
    sections: (CrosswordSection | ListenReadFastGameSection)[];
}

export interface Unit8WorkbookSection {
  slug: string;
  section: string;
  [key: string]: any;
}
export interface Unit8WorkbookData {
  slug: string;
  title: string;
  sections: Unit8WorkbookSection[];
}
export interface Unit8WorkbookVocabulary1Section {
  slug: 'look_and_write' | 'read_and_circle';
  section: 'Vocabulary 1';
  title: string;
  instruction: string;
  [key: string]: any;
}
export interface Unit8WorkbookSongSection {
  slug: 'listen_read_write' | 'write_new_verse';
  section: 'Song';
  title: string;
  [key: string]: any;
}
export interface Unit8WorkbookGrammar1Section {
  slug: 'simple_past_regular_verbs' | 'listen_and_write' | 'read_and_match' | 'write_verbs_past' | 'read_and_write' | 'what_did_you_do';
  section: 'Grammar 1';
  title: string;
  [key: string]: any;
}
export interface Unit8WorkbookVocabulary2Section {
  slug: 'look_and_read_draw_lines' | 'read_circle_best_answer';
  section: 'Vocabulary 2';
  title: string;
  [key: string]: any;
}
export interface Unit8WorkbookGrammar2Section {
  slug: 'simple_past_irregular_verbs' | 'look_at_the_gray_words' | 'read_and_write_complete_sentences' | 'work_with_a_partner';
  section: 'Grammar 2';
  title: string;
  [key: string]: any;
}
export interface Unit8WorkbookReadingSection {
  slug: 'listen_and_read_workbook' | 'weird_but_true_workbook' | 'read_check_true_false_workbook' | 'read_complete_chart_workbook' | 'read_and_write_workbook';
  section: 'Reading';
  title: string;
  [key: string]: any;
}
export interface Unit8WorkbookWritingSection {
  slug: 'read_write_answer_questions' | 'writing_answer_questions' | 'write_about_a_parade';
  section: 'Writing';
  title: string;
  [key: string]: any;
}
export interface Unit8WorkbookReviewSection {
  slug: 'read_and_draw_workbook' | 'listen_and_write_workbook' | 'read_unscramble_write';
  section: 'Review';
  [key: string]: any;
}
// FIX: Add all missing Unit 8 Workbook types
export interface Unit8WorkbookVocab1LookWriteSection extends Unit8WorkbookSection { word_bank: any[]; items: any[]; }
export interface Unit8WorkbookVocab1ReadCircleSection extends Unit8WorkbookSection { items: any[]; }
export interface Unit8WorkbookSongSection_ListenReadWrite extends Unit8WorkbookSection { audio: string; content: any[]; }
export interface Unit8WorkbookSongSection_WriteVerse extends Unit8WorkbookSection { word_bank: any[]; content: any[]; }
export interface Unit8WorkbookGrammar1GrammarTableSection extends Unit8WorkbookSection { table: any; }
export interface Unit8WorkbookGrammar1ListeningSection extends Unit8WorkbookSection { questions: any[]; }
export interface Unit8WorkbookGrammar1MatchingSection extends Unit8WorkbookSection { left: any[]; right: any[]; answers: any[]; }
export interface Unit8WorkbookGrammar1WritingVerbsSection extends Unit8WorkbookSection { verbs: any[]; questions: any[]; }
export interface Unit8WorkbookGrammar1ReadWriteSection extends Unit8WorkbookSection { questions: any[]; }
export interface Unit8WorkbookGrammar1WritingSpeakingSection extends Unit8WorkbookSection { questions: any[]; }
export interface Unit8WorkbookVocab2MatchingSection extends Unit8WorkbookSection { left: any[]; right: any[]; audio: string; }
export interface Unit8WorkbookVocab2MultipleChoiceSection extends Unit8WorkbookSection { content: any[]; }
export interface Unit8WorkbookGrammar2TableSection extends Unit8WorkbookSection { question_table: any; answer_table: any; }
export interface Unit8WorkbookGrammar2MatchingSection extends Unit8WorkbookSection { left: any[]; right: any[]; }
export interface Unit8WorkbookGrammar2FillInBlanksSection extends Unit8WorkbookSection { content: any[]; }
export interface Unit8WorkbookGrammar2DialoguePracticeSection extends Unit8WorkbookSection { students: any[]; }
export interface Unit8WorkbookReadingListenReadSection extends Unit8WorkbookSection { content: any[]; }
export interface Unit8WorkbookReadingWeirdButTrueSection extends Unit8WorkbookSection { content: any[]; }
export interface Unit8WorkbookReadingTrueFalseSection extends Unit8WorkbookSection { questions: any[]; }
export interface Unit8WorkbookReadingChartSection extends Unit8WorkbookSection { table: any; }
export interface Unit8WorkbookReadingReadWriteSection extends Unit8WorkbookSection { questions: any[]; }
export interface Unit8WorkbookWriting_ReadWrite extends Unit8WorkbookSection { content: any[]; image: string; }
export interface Unit8WorkbookWriting_AnswerQuestions extends Unit8WorkbookSection { questions: any[]; }
export interface Unit8WorkbookWriting_Creative extends Unit8WorkbookSection { content: any[]; }
export interface Unit8WorkbookReviewDrawingSection extends Unit8WorkbookSection { image: string; instructions: string[]; }
export interface Unit8WorkbookReviewListeningSection extends Unit8WorkbookSection { questions: any[]; }
export interface Unit8WorkbookReviewUnscrambleSection extends Unit8WorkbookSection { items: any[]; }

export interface Unit8WorkbookVocabulary1Data { sections: Unit8WorkbookVocabulary1Section[] }
export interface Unit8WorkbookSongData { sections: Unit8WorkbookSongSection[] }
export interface Unit8WorkbookGrammar1Data { sections: Unit8WorkbookGrammar1Section[] }
export interface Unit8WorkbookVocabulary2Data { sections: Unit8WorkbookVocabulary2Section[] }
export interface Unit8WorkbookGrammar2Data { sections: Unit8WorkbookGrammar2Section[] }
export interface Unit8WorkbookReadingData { sections: Unit8WorkbookReadingSection[] }
export interface Unit8WorkbookWritingData { sections: Unit8WorkbookWritingSection[] }
export interface Unit8WorkbookReviewData { sections: Unit8WorkbookReviewSection[] }

// Unit 9
export interface Unit9Word {
    word: string;
    type: string;
    translation: string;
    audio: string;
}
export interface Unit9Example {
    dialogue: { speaker: string, text: string, audio: string }[];
}
export interface Unit9GrammarExample {
    dialogue: { speaker: string, text: string, audio: string, translation: string }[];
}
export interface Unit9ActivityExample {
    sentence: string;
    answer: string;
    audio: string;
}
export interface Unit9WritingExample {
    prompt: string;
    hint: string;
}
// FIX: Add missing Unit 9 types
export interface Unit9SongSection {
    slug: 'song' | 'work_with_partner';
    type: 'Song' | 'Speaking';
    title: string;
    audio: string;
    lyrics: string[];
    section?: string;
    examples?: Unit9SpeakingExample[];
}
export interface Unit9SpeakingExample {
    question: string;
    model_answer: string;
}

export interface Unit9Vocabulary1Data {
    slug: string;
    title: string;
    sections: (
        { slug: 'look_and_learn', type: 'Vocabulary', title: string, words: Unit9Word[] } |
        { slug: 'ask_and_answer', type: 'Speaking', title: string, examples: Unit9Example[] }
    )[];
}
export interface Unit9SongData {
    slug: string;
    title: string;
    sections: Unit9SongSection[];
}
export interface Unit9Grammar1Section {
  slug: string;
  type: 'Grammar' | 'Speaking' | 'Activity' | 'Writing';
  title: string;
  section: string;
  examples: (Unit9GrammarExample | Unit9ActivityExample | Unit9WritingExample)[];
  words?: string[];
}
export interface Unit9Grammar1Data {
    slug: string;
    title: string;
    sections: Unit9Grammar1Section[];
}
export interface Unit9Vocabulary2Data {
    slug: string;
    title: string;
    sections: any[]; // Simplified for brevity
}
export interface Unit9Grammar2Data {
    slug: string;
    title: string;
    sections: any[]; // Simplified for brevity
}

// Unit 9 Reading
export interface Unit9ReadingSentence {
    text: string;
    translation: string;
    audio: string;
}

export interface Unit9ReadingListenReadSection {
    slug: 'listen_and_read';
    type: 'Reading';
    section: string;
    title: string;
    image: string;
    content: Unit9ReadingSentence[];
}

export interface Unit9ReadingFunFactSection {
    slug: 'weird_but_true';
    type: 'FunFact';
    section: string;
    content: {
        text: string;
        translation: string;
        audio: string;
        image: string;
    }[];
}

export interface Unit9ReadingLookAnswerSection {
    slug: 'look_and_answer';
    type: 'Speaking';
    section: string;
    title: string;
    image: string;
    questions: {
        question: string;
        translation: string;
        audio: string;
        correct_answer: string;
    }[];
}

export interface Unit9ReadingMatchingSection {
    slug: 'read_and_match';
    type: 'Matching';
    section: string;
    instruction: string;
    left_column: string[];
    right_column: string[];
    correct_answers: {
        left: string;
        right: string;
        audio: string;
    }[];
}

export interface Unit9ReadingWritingSection {
    slug: 'make_a_chart';
    type: 'Writing';
    section: string;
    instruction: string;
    table: {
        columns: string[];
        rows: string[][];
    };
}

export interface Unit9ReadingSpeakingSection {
    slug: 'ask_and_answer';
    type: 'Speaking';
    section: string;
    instruction: string;
    dialogue: {
        speaker: string;
        text: string;
        translation: string;
        audio: string;
    }[];
}

export type Unit9ReadingSection = 
    | Unit9ReadingListenReadSection
    | Unit9ReadingFunFactSection
    | Unit9ReadingLookAnswerSection
    | Unit9ReadingMatchingSection
    | Unit9ReadingWritingSection
    | Unit9ReadingSpeakingSection;

export interface Unit9ReadingData {
    slug: string;
    title: string;
    sections: Unit9ReadingSection[];
}
// Unit 9 Writing
export interface Unit9WritingSentence {
    sentence: string;
    audio: string;
    images?: string[];
}

export interface Unit9WritingReadingSection {
    slug: 'read_about_hassan';
    section: 'Read';
    type: 'Reading';
    title: string;
    content: Unit9WritingSentence[];
}

export interface Unit9WritingWritingSection {
    slug: 'write_about_your_weekend';
    section: 'Write';
    type: 'Writing';
    title: string;
    instruction: string;
    input: {
        placeholder: string;
    };
}

export interface Unit9WritingSpeakingSection {
    slug: 'share_your_writing';
    section: 'Share';
    type: 'Speaking';
    title: string;
    table: {
        columns: string[];
        rows: string[][];
    };
}

export type Unit9WritingSection =
    | Unit9WritingReadingSection
    | Unit9WritingWritingSection
    | Unit9WritingSpeakingSection;

export interface Unit9WritingData {
    slug: string;
    title: string;
    sections: Unit9WritingSection[];
}
// Unit 9 Extended Reading
export interface Unit9ExtendedReadingSentence {
    text: string;
    translation: string;
    audio: string;
}

export interface Unit9ExtendedReadingListenReadSection {
    slug: 'listen_and_read';
    section: string;
    type: 'Reading';
    title: string;
    content: Unit9ExtendedReadingSentence[];
}

export interface Unit9ExtendedReadingWordBoxItem {
    word: string;
    translation: string;
    audio: string;
}

export interface Unit9ExtendedReadingFillBlankSentence {
    text: string;
    translation: string;
    audio: string;
    answer: string;
}

export interface Unit9ExtendedReadingWritingSection {
    slug: 'write_complete_sentences';
    section: string;
    type: 'Writing';
    instruction: string;
    word_box: Unit9ExtendedReadingWordBoxItem[];
    sentences: Unit9ExtendedReadingFillBlankSentence[];
}

export interface Unit9ExtendedReadingWritingListSection {
    slug: 'read_and_write';
    section: string;
    type: 'Writing';
    instruction: string;
    input: {
        placeholder: string;
        audio: string;
    };
}


export interface Unit9ExtendedReadingSpeakingActivity {
    text: string;
    translation: string;
    audio: string;
}

export interface Unit9ExtendedReadingSpeakingSection {
    slug: 'express_yourself';
    section: string;
    type: 'Speaking';
    activities: Unit9ExtendedReadingSpeakingActivity[];
}

export type Unit9ExtendedReadingSection = 
    | Unit9ExtendedReadingListenReadSection
    | Unit9ExtendedReadingWritingSection
    | Unit9ExtendedReadingWritingListSection
    | Unit9ExtendedReadingSpeakingSection;

export interface Unit9ExtendedReadingData {
    slug: string;
    title: string;
    sections: Unit9ExtendedReadingSection[];
}