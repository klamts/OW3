

import React, { useState } from 'react';
// FIX: Add missing type imports
import type {Unit3ReadingData, Unit3Vocabulary2Data,Unit3Grammar1Data,Unit3SongData,Unit5GroupWorkSection,Unit5GuidedWritingSection,Unit5ReadWritePassageSection,AnimalHabitatsVocabSection,AnimalHabitatsQASection,Unit4SongData,ActiveTab, DialogueLine, Vehicle, GrammarTooEither, ProcessedPracticeBike2Item, ProcessedExampleVehicle, HotAirBalloonExercisesApiResponse, HotAirBalloonWeirdButTrueApiResponse, TheLionAndTheMouseExercisesApiResponse, SensesDescribeGuess, SensesSong, SensesGrammar1, SensesVocabulary2, SensesGrammar2, SensesReading, SensesWriting, SensesWorkbook, Unit5Data, SpinTabData, Unit5WorkbookData, Unit6Vocabulary1Data, Unit6SongData, Unit6GrammarData, Unit6Vocabulary2Data, Unit6Grammar2Data, Unit6ReadingData, Unit6WritingData, Unit6ExtendedReadingData, Unit6GameData, Unit6WorkbookData, Unit6Vocabulary3Data, Unit7Vocabulary1Data, Unit7Vocabulary2Data, Unit7Grammar1Data, Unit7GameData, Unit7Grammar2Data, Unit7SongData, Unit7ReadingData, Unit7WorkbookData, Unit7WritingData, Unit7ReviewData, Unit8Vocabulary1Data, Unit8Grammar1Data, Unit8Vocabulary2Data, Unit8Grammar2Data, Unit8ReadingData, Unit8WritingData, Unit8WorkbookData, Unit8GameData, Unit9Vocabulary1Data, Unit9Example, Unit9SongData, Unit9Grammar1Data,Unit9Grammar2Data, } from '../types';
// Unit 1
import { Unit1Vocabulary1Tab } from './tabs/unit1/Unit1Vocabulary1Tab';
import { Unit1SongTab } from './tabs/unit1/Unit1SongTab';
import { Unit1Grammar1Tab } from './tabs/unit1/Unit1Grammar1Tab';
import { Unit1Vocabulary2Tab } from './tabs/unit1/Unit1Vocabulary2Tab';
import { Unit1Grammar2Tab } from './tabs/unit1/Unit1Grammar2Tab';
import { Unit1ReadingTab } from './tabs/unit1/Unit1ReadingTab';
import { Unit1WritingTab } from './tabs/unit1/Unit1WritingTab';
// Unit 2
import { Unit2Vocabulary1Tab } from './tabs/unit2/Unit2Vocabulary1Tab';
import { Unit2SongTab } from './tabs/unit2/Unit2SongTab';
import { Unit2Grammar1Tab } from './tabs/unit2/Unit2Grammar1Tab';
import { Unit2Vocabulary2Tab } from './tabs/unit2/Unit2Vocabulary2Tab';
import { Unit2Grammar2Tab } from './tabs/unit2/Unit2Grammar2Tab';
import { Unit2ReadingTab } from './tabs/unit2/Unit2ReadingTab';
import { Unit2WritingTab } from './tabs/unit2/Unit2WritingTab';
// import { Unit2ReadingTab } from './tabs/unit2/Unit2ReadingTab';
// Import tab components from their unit-specific directories
// Unit 3
import { VehicleTab } from './tabs/unit3/VehicleTab';
import { ExampleVehiclesTab } from './tabs/unit3/ExampleVehiclesTab';
import { InOnTab } from './tabs/unit3/InOnTab';
import { LikeVehicleTab } from './tabs/unit3/LikeVehicleTab';
import { TakeRideFlyTab } from './tabs/unit3/TakeRideFlyTab';
import { GrammarTooTab } from './tabs/unit3/GrammarTooTab';
import { Vocabulary2Tab } from './tabs/unit3/Vocabulary2Tab';
import { DialogueTab } from './tabs/unit3/DialogueTab';
import { SectionsTab } from './tabs/unit3/SectionsTab';
import { TransportTab } from './tabs/unit3/TransportTab';
import { ByTab } from './tabs/unit3/ByTab';
import { BikeTab } from './tabs/unit3/BikeTab';
import { PracticeBikeTab } from './tabs/unit3/PracticeBikeTab';
import { PracticeBike2Tab } from './tabs/unit3/PracticeBike2Tab';
import { ContrastTab } from './tabs/unit3/ContrastTab';
import { SayFastTab } from './tabs/unit3/SayFastTab';
import { ReadingTab } from './tabs/unit3/ReadingTab';
import { HotAirBalloonsTab } from './tabs/unit3/HotAirBalloonsTab';
import { CatchTheBusTab } from './tabs/unit3/CatchTheBusTab';
import { TheLionAndTheMouseTab } from './tabs/unit3/TheLionAndTheMouseTab';
import { Unit3Vocabulary1Tab } from './tabs/unit3/Unit3Vocabulary1Tab';
import { Unit3SongTab } from './tabs/unit3/Unit3SongTab';
import { Unit3Grammar1Tab } from './tabs/unit3/Unit3Grammar1Tab';
import { Unit3Vocabulary2Tab } from './tabs/unit3/Unit3Vocabulary2Tab';
import { Unit3Grammar2Tab } from './tabs/unit3/Unit3Grammar2Tab';
import { Unit3ReadingTab } from './tabs/unit3/Unit3ReadingTab';
import { Unit3WritingTab } from './tabs/unit3/Unit3WritingTab';
import { Unit3ExtendedReadingTab } from './tabs/unit3/Unit3ExtendedReadingTab';
// Unit 4
import { SensesVocabulary1Tab } from './tabs/unit4/SensesVocabulary1Tab';
import { SensesSongTab } from './tabs/unit4/SensesSongTab';
import { SensesGrammar1Tab } from './tabs/unit4/SensesGrammar1Tab';
import { SensesVocabulary2Tab } from './tabs/unit4/SensesVocabulary2Tab';
import { SensesGrammar2Tab } from './tabs/unit4/SensesGrammar2Tab';
import { SensesReadingTab } from './tabs/unit4/SensesReadingTab';
import { SensesWritingTab } from './tabs/unit4/SensesWritingTab';
import { SensesWorkbookTab } from './tabs/unit4/SensesWorkbookTab';
import { SensesSpinTab } from './tabs/unit4/SensesSpinTab';

// Unit 5
import { Unit5Vocabulary1Tab } from './tabs/unit5/AnimalHabitatsVocabulary1Tab';
import { Unit5SongTab } from './tabs/unit5/Unit5SongTab';
import { Unit5Grammar1Tab } from './tabs/unit5/Unit5Grammar1Tab';
import { Unit5GrammarMatchTab } from './tabs/unit5/Unit5GrammarMatchTab';
import { Unit5ReadWriteWhyTab } from './tabs/unit5/Unit5ReadWriteWhyTab';
import { Unit5AskAnswerTab } from './tabs/unit5/Unit5AskAnswerTab';
import { Unit5Vocabulary2Tab } from './tabs/unit5/Unit5Vocabulary2Tab';
import { Unit5Grammar2Tab } from './tabs/unit5/Unit5Grammar2Tab';
import { Unit5ReadingTab } from './tabs/unit5/Unit5ReadingTab';
// import { Unit5WritingTab } from './tabs/unit5/Unit5WritingTab';
import { Unit5WritingTab } from './tabs/unit5/Unit5WritingTab';
import { Unit5WorkbookTab } from './tabs/unit5/Unit5WorkbookTab';

// Unit 6
import { Unit6Vocabulary1Tab } from './tabs/unit6/Unit6Vocabulary1Tab';
import { Unit6SongTab } from './tabs/unit6/Unit6SongTab';
import { Unit6Grammar1Tab } from './tabs/unit6/Unit6Grammar1Tab';
import { Unit6Vocabulary2Tab } from './tabs/unit6/Unit6Vocabulary2Tab';
import { Unit6Vocabulary3Tab } from './tabs/unit6/Unit6Vocabulary3Tab';
import { Unit6Grammar2Tab } from './tabs/unit6/Unit6Grammar2Tab';
import { Unit6ReadingTab } from './tabs/unit6/Unit6ReadingTab';
import { Unit6WritingTab } from './tabs/unit6/Unit6WritingTab';
import { Unit6ExtendedReadingTab } from './tabs/unit6/Unit6ExtendedReadingTab';
import { Unit6GameTab } from './tabs/unit6/Unit6GameTab';
// FIX: Corrected import statement. The 'Unit6WorkbookTab' component was not being exported from its module. This has been resolved by exporting the component.
import { Unit6WorkbookTab } from './tabs/unit6/Unit6WorkbookTab';

// Unit 7
import { Unit7Vocabulary1Tab } from './tabs/unit7/Unit7Vocabulary1Tab';
import { Unit7Vocabulary2Tab } from './tabs/unit7/Unit7Vocabulary2Tab';
import { Unit7Grammar1Tab } from './tabs/unit7/Unit7Grammar1Tab';
import { Unit7Grammar2Tab } from './tabs/unit7/Unit7Grammar2Tab';
import { Unit7GameTab } from './tabs/unit7/Unit7GameTab';
import { Unit7SongTab } from './tabs/unit7/Unit7SongTab';
import { Unit7ReadingTab } from './tabs/unit7/Unit7ReadingTab';
import { Unit7WritingTab } from './tabs/unit7/Unit7WritingTab';
import { Unit7ReviewTab } from './tabs/unit7/Unit7ReviewTab';
import { Unit7WorkbookTab } from './tabs/unit7/Unit7WorkbookTab';

// Unit 8
import { Unit8Vocabulary1Tab } from './tabs/unit8/Unit8Vocabulary1Tab';
import { Unit8Grammar1Tab } from './tabs/unit8/Unit8Grammar1Tab';
import { Unit8Vocabulary2Tab } from './tabs/unit8/Unit8Vocabulary2Tab';
import { Unit8Grammar2Tab } from './tabs/unit8/Unit8Grammar2Tab';
import { Unit8ReadingTab } from './tabs/unit8/Unit8ReadingTab';
import { Unit8WritingTab } from './tabs/unit8/Unit8WritingTab';
import { Unit8GameTab } from './tabs/unit8/Unit8GameTab';
import { Unit8WorkbookTab } from './tabs/unit8/Unit8WorkbookTab';

// Unit 9
import { Unit9Vocabulary1Tab } from './tabs/unit9/Unit9Vocabulary1Tab';
import { Unit9SongTab } from './tabs/unit9/Unit9SongTab';
import { Unit9Grammar1Tab } from './tabs/unit9/Unit9Grammar1Tab';
import { Unit9Vocabulary2Tab } from './tabs/unit9/Unit9Vocabulary2Tab';
import { Unit9Grammar2Tab } from './tabs/unit9/Unit9Grammar2Tab';
import { Unit9ReadingTab } from './tabs/unit9/Unit9ReadingTab';
import { Unit9WritingTab } from './tabs/unit9/Unit9WritingTab';
import { Unit9ExtendedReadingTab } from './tabs/unit9/Unit9ExtendedReadingTab';
// import { unit9Vocabulary1Datatest } from '../data/unit9_vocabulary1';
// Props for TabContent component
interface TabContentProps {
    activeTab: ActiveTab | null;
    loading: boolean;
    error: string | null;
    vehicles: Vehicle[];
    exampleVehicles: ProcessedExampleVehicle[];
    groupedInOnLines: Record<string, DialogueLine[]>;
    groupedLikeVehicleLines: Record<string, DialogueLine[]>;
    groupedTakeRideFlyLines: Record<string, DialogueLine[]>;
    grammarTooData: GrammarTooEither | null;
    vocabulary2Items: Vehicle[];
    dialogue: DialogueLine[];
    sections: Record<string, DialogueLine[]>;
    transportPhrases: DialogueLine[];
    byPhrases: DialogueLine[];
    bikePhrases: DialogueLine[];
    practiceBikePhrases: DialogueLine[];
    practiceBike2Items: ProcessedPracticeBike2Item[];
    contrastPhrases: DialogueLine[];
    sayFastPhrases: DialogueLine[];
    readingPhrases: DialogueLine[];
    hotAirBalloonsReading: DialogueLine[];
    hotAirBalloonsReadingImage: string | null;
    hotAirBalloonsVocabulary: Vehicle[];
    hotAirBalloonsExercises: HotAirBalloonExercisesApiResponse | null;
    hotAirBalloonsWeirdButTrue: HotAirBalloonWeirdButTrueApiResponse | null;
    catchTheBusReading: DialogueLine[];
    catchTheBusReadingImage: string | null;
    catchTheBusVocabulary: Vehicle[];
    theLionAndTheMouseReading: DialogueLine[];
    theLionAndTheMouseReadingImage: string | null;
    theLionAndTheMouseVocabulary: Vehicle[];
    theLionAndTheMouseExercises: TheLionAndTheMouseExercisesApiResponse | null;
    sensesVocabulary1: Vehicle[];
    sensesDescribeGuess: SensesDescribeGuess | null;
    unit4SongData: Unit4SongData | null;
    unit4Grammar1Data: SensesGrammar1 | null;
    sensesVocabulary2: SensesVocabulary2 | null;
    sensesGrammar2: SensesGrammar2 | null;
    sensesReading: SensesReading | null;
    sensesWriting: SensesWriting | null;
    sensesWorkbook: SensesWorkbook | null;
    sensesSpinData: SpinTabData | null;
    sensesSpinDataToBe: SpinTabData | null;
    sensesSpinDataTaste: SpinTabData | null;
    unit1Vocabulary1Data: Unit1Vocabulary1Data | null;
    unit1SongData: Unit1SongData | null;
    unit1Grammar1Data: Unit1Grammar1Data | null;
    unit1Vocabulary2Data: Unit1Vocabulary2Data | null;
    unit1Grammar2Data: Unit1Grammar2Data | null;
    unit1ReadingData: Unit1ReadingData | null;
    unit1WritingData: Unit1WritingData | null;
    unit2Vocabulary1Data: Unit2Vocabulary1Data | null;
    unit2SongData: Unit2SongData | null;
    unit2Grammar1Data: Unit2Grammar1Data | null;
    unit2Grammar2Data: Unit2Grammar2Data | null;
    unit2ReadingData: Unit2ReadingData | null;
    unit2WritingData: Unit2WritingData | null;
    unit3Vocabulary1Data: Unit3Vocabulary1Data | null;
    unit3SongData: Unit3SongData | null;
    unit3Grammar1Data: Unit3Grammar1Data | null;
    unit3Vocabulary2Data: Unit3Vocabulary2Data | null;
    unit3ReadingTabData:Unit3ReadingData | null;
    unit5Vocabulary1Data: AnimalHabitatsVocabSection | null;
    Unit5WritingTab:Unit5Data|Unit5GuidedWritingSection|Unit5ReadWritePassageSection|Unit5GroupWorkSection|null
    unit5Data: Unit5Data | null;
    unit5WorkbookData: Unit5WorkbookData | null;
    unit6Data: Unit6Vocabulary1Data | null;
    unit6SongData: Unit6SongData | null;
    unit6GrammarData: Unit6GrammarData | null;
    unit6Vocab2Data: Unit6Vocabulary2Data | null;
    unit6Vocab3Data: Unit6Vocabulary3Data | null;
    unit6Grammar2Data: Unit6Grammar2Data | null;
    unit6ReadingData: Unit6ReadingData | null;
    unit6WritingData: Unit6WritingData | null;
    unit6ExtendedReadingData: Unit6ExtendedReadingData | null;
    unit6GameData: Unit6GameData | null;
    unit6WorkbookData: Unit6WorkbookData | null;
    unit7Vocab1Data: Unit7Vocabulary1Data | null;
    unit7Vocab2Data: Unit7Vocabulary2Data | null;
    unit7Grammar1Data: Unit7Grammar1Data | null;
    unit7Grammar2Data: Unit7Grammar2Data | null;
    unit7GameData: Unit7GameData | null;
    unit7SongData: Unit7SongData | null;
    unit7ReadingData: Unit7ReadingData | null;
    unit7WorkbookData: Unit7WorkbookData | null;
    unit7WritingData: Unit7WritingData | null;
    unit7ReviewData: Unit7ReviewData | null;
    unit8Vocabulary1Data: Unit8Vocabulary1Data | null;
    unit8Grammar1Data: Unit8Grammar1Data | null;
    unit8Vocabulary2Data: Unit8Vocabulary2Data | null;
    unit8Grammar2Data: Unit8Grammar2Data | null;
    unit8ReadingData: Unit8ReadingData | null;
    unit8WritingData: Unit8WritingData | null;
    unit8GameData: Unit8GameData | null;
    unit8WorkbookData: Unit8WorkbookData | null;
    unit9Vocabulary1Data: unit9Vocabulary1Data | null;
    unit9SongData: Unit9SongData | null;
    unit9Grammar1Data: Unit9Grammar1Data | null;
    unit9Grammar2Data: Unit9Grammar2Data | null;
    unit9ReadingData: Unit9ReadingData | null;
    unit9WritingData: Unit9WritingData | null;
}

// FIX: Added export to the TabContent component to resolve the module export error.
export const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  loading,
  error,
  ...props
}) => {
  if (loading) {
    return <div className="text-center p-10">Loading content...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  }

  if (!activeTab) {
    return <div className="text-center p-10 text-slate-500">Please select a tab.</div>;
  }

  switch (activeTab) {
    // Unit 3
    // case 'vehicle':
    //   return <VehicleTab vehicles={props.vehicles} />;<ExampleVehiclesTab exampleVehicles={props.exampleVehicles} />;
     case 'vehicle':
      return (
            <>
              <VehicleTab vehicles={props.vehicles} />
              <ExampleVehiclesTab exampleVehicles={props.exampleVehicles} />
            </>
          );
        
      
    
    
    case 'exampleVehicles':
      return <ExampleVehiclesTab exampleVehicles={props.exampleVehicles} />;
    case 'inOn':
      return <InOnTab groupedInOnLines={props.groupedInOnLines} />;
    case 'likeVehicle':
      return <LikeVehicleTab groupedLikeVehicleLines={props.groupedLikeVehicleLines} />;
    case 'takeRideFly':
      return <TakeRideFlyTab groupedTakeRideFlyLines={props.groupedTakeRideFlyLines} />;
    case 'grammarToo':
      return props.grammarTooData ? <GrammarTooTab data={props.grammarTooData} /> : null;
    case 'vocabulary2':
      return <Vocabulary2Tab vocabulary2Items={props.vocabulary2Items} />;
    case 'dialogue':
      return <DialogueTab dialogue={props.dialogue} />;
    case 'sections':
      return <SectionsTab sections={props.sections} />;
    case 'transport':
      return <TransportTab transportPhrases={props.transportPhrases} />;
    case 'by':
      return <ByTab byPhrases={props.byPhrases} />;
    case 'bike':
      return <BikeTab bikePhrases={props.bikePhrases} />;
    case 'practiceBike':
      return <PracticeBikeTab practiceBikePhrases={props.practiceBikePhrases} />;
    case 'practiceBike2':
      return <PracticeBike2Tab practiceBike2Items={props.practiceBike2Items} />;
    case 'contrast':
      return <ContrastTab contrastPhrases={props.contrastPhrases} />;
    case 'sayFast':
      return <SayFastTab sayFastPhrases={props.sayFastPhrases} />;
    case 'reading':
      return <ReadingTab readingPhrases={props.readingPhrases} />;
    case 'hotAirBalloons':
        return <HotAirBalloonsTab reading={props.hotAirBalloonsReading} readingImage={props.hotAirBalloonsReadingImage} vocabulary={props.hotAirBalloonsVocabulary} exercises={props.hotAirBalloonsExercises} weirdButTrue={props.hotAirBalloonsWeirdButTrue} />;
    case 'catchTheBus':
        return <CatchTheBusTab reading={props.catchTheBusReading} readingImage={props.catchTheBusReadingImage} vocabulary={props.catchTheBusVocabulary} />;
    case 'theLionAndTheMouse':
        return <TheLionAndTheMouseTab reading={props.theLionAndTheMouseReading} readingImage={props.theLionAndTheMouseReadingImage} vocabulary={props.theLionAndTheMouseVocabulary} exercises={props.theLionAndTheMouseExercises} />;
    // Unit 1
    case 'unit1Vocabulary1':
      return <Unit1Vocabulary1Tab data={props.unit1Vocabulary1Data} />;
    case 'unit1Song':
      return <Unit1SongTab data={props.unit1SongData} />;
    case 'unit1Grammar1':
        return <Unit1Grammar1Tab data={props.unit1Grammar1Data} />;
    case 'unit1Vocabulary2':
      return <Unit1Vocabulary2Tab data={props.unit1Vocabulary2Data} />;
    case 'unit1Grammar2':
      return <Unit1Grammar2Tab data={props.unit1Grammar2Data} />;
    case 'unit1Reading':
      return <Unit1ReadingTab data={props.unit1ReadingData} />; 
    case 'unit1Writing': 
      return <Unit1WritingTab data={props.unit1WritingData} />;             
    // Unit 2
    case 'unit2Vocabulary1':
        return <Unit2Vocabulary1Tab data={props.unit2Vocabulary1Data} />;
    case 'unit2Song':
        return <Unit2SongTab data={props.unit2SongData} />;
    case 'unit2Grammar1':
        return <Unit2Grammar1Tab data={props.unit2Grammar1Data} />;
    case 'unit2Vocabulary2':
        return <Unit2Vocabulary2Tab data={props.unit2Vocabulary2Data} />;   
    case 'unit2Grammar2':
        return <Unit2Grammar2Tab data={props.unit2Grammar2Data} />;  
    case 'unit2Reading':
        return <Unit2ReadingTab data={props.unit2ReadingData} />;
    case 'unit2Writing':
      return <Unit2WritingTab data={props.unit2WritingData} />;   
    // Unit 3
    case 'unit3Vocabulary1':
      return <Unit3Vocabulary1Tab data={props.unit3Vocabulary1Data}  />;
    case 'unit3Song':
      return <Unit3SongTab data={props.unit3SongData}  />;  
    case 'unit3Grammar1':
      return <Unit3Grammar1Tab data={props.unit3Grammar1Data} />; 
    case 'unit3Vocabulary2':
        return <Unit3Vocabulary2Tab data={props.unit3Vocabulary2Data} />;
    case 'unit3Grammar2':
        return <Unit3Grammar2Tab data={props.unit3Grammar2Data} />;     
    case 'unit3Reading':
        return <Unit3ReadingTab data={props.unit3readingData} />;    
    case 'unit3Writing':
        return <Unit3WritingTab data={props.unit3WritingData} />;  
    case 'unit3ExtendedReading':
        return <Unit3ExtendedReadingTab data={props.unit3ExtendedReadingData} />;                                    
    // Unit 4
    case 'sensesVocabulary1':
        return <SensesVocabulary1Tab data={props.unit4Vocabulary1Data}  />;
    case 'sensesSong':
        return <SensesSongTab song={props.unit4SongData } />;
       
    // case 'sensesSong':
    // return unit4SongData ? <SensesSongTab song={unit4SongData} /> : <div>Loading song...</div>;    
    case 'sensesGrammar1':
        return <SensesGrammar1Tab data={props.unit4Grammar1Data} />;
    case 'sensesVocabulary2':
        return <SensesVocabulary2Tab data={props.sensesVocabulary2} />;
    case 'sensesGrammar2':
        return <SensesGrammar2Tab data={props.sensesGrammar2} />;
    case 'sensesReading':
        return <SensesReadingTab data={props.sensesReading} />;
    case 'sensesWriting':
        return <SensesWritingTab data={props.sensesWriting} />;
    case 'sensesWorkbook':
        return <SensesWorkbookTab data={props.sensesWorkbook} />;
    case 'sensesSpin':
        return <SensesSpinTab vocabData={props.sensesSpinData} grammarData={props.sensesSpinDataToBe} tasteData={props.sensesSpinDataTaste} />;

    // Unit 5
    case 'unit5Vocabulary':
  return (
    <>
      
      <Unit5Vocabulary1Tab data={props.unit5Vocabulary1Data} />
      {/* <Unit5Vocabulary1QATab qaItem={props.unit5Vocabulary1QAData} /> */}
      
    </>
  );  
    case 'unit5Song':
      return <Unit5SongTab data={props.unit5SongData} />;
    case 'unit5Grammar1':
      return <Unit5Grammar1Tab data={props.unit5Grammar1Data} />;
    case 'unit5GrammarMatch':
      return <Unit5GrammarMatchTab data={props.unit5GrammarMatchData} />;
    case 'unit5ReadWriteWhy':
      return <Unit5ReadWriteWhyTab data={props.unit5ReadWriteWhyData} />;
    case 'unit5AskAnswer':
      return <Unit5AskAnswerTab data={props.unit5AskAndAnswerData} />
    case 'unit5Vocabulary2':
      return <Unit5Vocabulary2Tab data={props.unit5Vocabulary2Data} />;
    case 'unit5Grammar2':
      return <Unit5Grammar2Tab data={props.unit5Grammar2Data} />;
    case 'unit5Reading':
      return <Unit5ReadingTab data={props.unit5ReadingData} />;
        // switch (activeTab) {
        //     // case 'unit5Vocabulary': return <AnimalHabitatsVocabulary1Tab data={props.unit5Data} />;
        //     // case 'unit5Song': return <Unit5SongTab data={props.unit5SongData} />;
        //     // case 'unit5Grammar1': return <Unit5Grammar1Tab data={props.unit5Data} />;
        //     // case 'unit5GrammarMatch': return <Unit5GrammarMatchTab data={props.unit5Data} />;
        //     case 'unit5ReadWriteWhy': return <Unit5ReadWriteWhyTab data={props.unit5Data} />;
        //     case 'unit5AskAnswer': return <Unit5AskAnswerTab data={props.unit5Data} />;
        //     // case 'unit5Vocabulary2': return <Unit5Vocabulary2Tab data={props.unit5Data} />;
        //     // case 'unit5Grammar2': return <Unit5Grammar2Tab data={props.unit5Data} />;
        //     case 'unit5Reading': return <Unit5ReadingTab data={props.unit5ReadingData} />;
        // }
        // break;
    case 'unit5Writing': 
      return <Unit5WritingTab data={props.unit5WritingData} />;
    case 'unit5Workbook': 
      return <Unit5WorkbookTab data={props.unit5WorkbookData} dataFix={props.unit5WorkbookFixData} />;
    
    // Unit 6
    case 'unit6Vocabulary1': return <Unit6Vocabulary1Tab data={props.unit6Data} />;
    case 'unit6Song': return <Unit6SongTab data={props.unit6SongData} />;
    case 'unit6Grammar1': return <Unit6Grammar1Tab data={props.unit6GrammarData} />;
    case 'unit6Vocabulary2': return <Unit6Vocabulary2Tab data={props.unit6Vocab2Data} />;
    case 'unit6Vocabulary3': return <Unit6Vocabulary3Tab data={props.unit6Vocab3Data} />;
    case 'unit6Grammar2': return <Unit6Grammar2Tab data={props.unit6Grammar2Data} />;
    case 'unit6Reading': return <Unit6ReadingTab data={props.unit6ReadingData} />;
    case 'unit6Writing': return <Unit6WritingTab data={props.unit6WritingData} />;
    case 'unit6ExtendedReading': return <Unit6ExtendedReadingTab data={props.unit6ExtendedReadingData} />;
    case 'unit6Game': return <Unit6GameTab data={props.unit6GameData} />;
    case 'unit6Workbook': return <Unit6WorkbookTab data={props.unit6WorkbookData} />;

    // Unit 7
    case 'unit7Vocabulary1': return <Unit7Vocabulary1Tab data={props.unit7Vocab1Data} />;
    case 'unit7Vocabulary2': return <Unit7Vocabulary2Tab data={props.unit7Vocab2Data} />;
    case 'unit7Grammar1': return <Unit7Grammar1Tab data={props.unit7Grammar1Data} />;
    case 'unit7Grammar2': return <Unit7Grammar2Tab data={props.unit7Grammar2Data} />;
    case 'unit7Game': return <Unit7GameTab data={props.unit7GameData} />;
    case 'unit7Song': return <Unit7SongTab data={props.unit7SongData} />;
    case 'unit7Reading': return <Unit7ReadingTab data={props.unit7ReadingData} />;
    case 'unit7Writing': return <Unit7WritingTab data={props.unit7WritingData} />;
    case 'unit7Review': return <Unit7ReviewTab data={props.unit7ReviewData} />;
    case 'unit7Workbook': return <Unit7WorkbookTab data={props.unit7WorkbookData} />;

    // Unit 8
    case 'unit8Vocabulary1': return <Unit8Vocabulary1Tab data={props.unit8Vocabulary1Data} />;
    case 'unit8Grammar1': return <Unit8Grammar1Tab data={props.unit8Grammar1Data} />;
    case 'unit8Vocabulary2': return <Unit8Vocabulary2Tab data={props.unit8Vocabulary2Data} />;
    case 'unit8Grammar2': return <Unit8Grammar2Tab data={props.unit8Grammar2Data} />;
    case 'unit8Reading': return <Unit8ReadingTab data={props.unit8ReadingData} />;
    case 'unit8Writing': return <Unit8WritingTab data={props.unit8WritingData} />;
    case 'unit8Game': return <Unit8GameTab data={props.unit8GameData} />;
    case 'unit8Workbook': return <Unit8WorkbookTab data={props.unit8WorkbookData} />;

    // Unit 9
    case 'unit9Vocabulary1':
      return <Unit9Vocabulary1Tab data={props.unit9Vocabulary1Data} />;
    case 'unit9Song':
      return <Unit9SongTab data={props.unit9SongData} />;
    case 'unit9Grammar1':
      return <Unit9Grammar1Tab data={props.unit9Grammar1Data} />;
    case 'unit9Vocabulary2':
      return <Unit9Vocabulary2Tab data={props.unit9Vocabulary2Data} />;
    case 'unit9Grammar2':
      return <Unit9Grammar2Tab data={props.unit9Grammar2Data} />;
    case 'unit9Reading':
      return <Unit9ReadingTab data={props.unit9ReadingData} />;
    case 'unit9Writing':
        return <Unit9WritingTab data={props.unit9WritingData} />;    
    case 'unit9ExtendedReading': 
        return <Unit9ExtendedReadingTab data={props.unit9ExtendedReadingData} />; 

    default:
        return <div className="text-center p-10 text-slate-500">Please select a topic to begin.</div>;
  }
};
