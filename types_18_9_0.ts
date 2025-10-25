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

export interface SensesVocabulary1Data {
  vocabulary: Vehicle[];
  describe_guess: SensesDescribeGuess;
}


export interface SensesSong {
  song_name: string;
  unit: string;
  audioSrc: string;
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

export interface SensesVocabulary2 {
  title: string;
  vocabulary: Vehicle[];
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
  rows: Record<string, string>[];
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
}


export type ActiveTab = 'vehicle' | 'exampleVehicles' | 'inOn' | 'likeVehicle' | 'takeRideFly' | 'grammarToo' | 'vocabulary2' | 'dialogue' | 'sections' | 'transport' | 'by' | 'bike' | 'practiceBike' | 'practiceBike2' | 'contrast' | 'sayFast' | 'reading' | 'hotAirBalloons' | 'catchTheBus' | 'theLionAndTheMouse' | 'sensesVocabulary1' | 'sensesSong' | 'sensesGrammar1' | 'sensesVocabulary2' | 'sensesGrammar2' | 'sensesReading' | 'sensesWriting' | 'sensesWorkbook';