// FIX: import ActiveTab from types.ts
import type { ActiveTab } from '../types';

export type TabInfo = {
  title: string;
  tabId: ActiveTab;
};

export type Topic = {
  id: string;
  title: string;
  tabs: TabInfo[];
};

export const topics: Topic[] = [
  {
    id: "unit1",
    title: "A Helping Hand",
    tabs: [
      { title: "Vocabulary 1", tabId: "unit1Vocabulary1" },
      { title: "Song", tabId: "unit1Song" },
      { title: "Grammar 1", tabId: "unit1Grammar1" },
      { title: "Vocabulary 2", tabId: "unit1Vocabulary2" },
      { title: "Grammar 2", tabId: "unit1Grammar2" },
      { title: "Reading", tabId: "unit1Reading" },
      { title: "Writing", tabId: "unit1Writing" }
    ]
  },
  {
    id: "unit2",
    title: "My Place in the World",
    
    tabs: [
      { title: "Vocabulary 1", tabId: "unit2Vocabulary1" },
      { title: "Song", tabId: "unit2Song" },
      { title: "Grammar 1", tabId: "unit2Grammar1" },
      { title: "Vocabulary 2", tabId: "unit2Vocabulary2" },
      { title: "Grammar 2", tabId: "unit2Grammar2" },
      { title: "Reading", tabId: "unit2Reading" },
      { title: "Writing", tabId: "unit2Writing" },
    ]
    
  },
  {
    id: "unit3",
    title: "On the Move!",
    tabs: [
      { title: "Vehicles", tabId: "vehicle" },
      { title: "Vehicle Examples", tabId: "exampleVehicles" },
      { title: "In or On", tabId: "inOn" },
      { title: "Like + Phương tiện", tabId: "likeVehicle" },
      { title: "Take / Ride / Fly", tabId: "takeRideFly" },
      { title: "Agreeing (Too)", tabId: "grammarToo" },
      { title: "Vocabulary 2", tabId: "vocabulary2" },
      { title: "Cách Dùng xe đạp", tabId: "bike" },
      { title: "Thực hành nói dùng xe đạp", tabId: "practiceBike" },
      { title: "Thực hành xe đạp 2", tabId: "practiceBike2" },
      { title: "But as a contrast", tabId: "contrast" },
      { title: "Say Fast", tabId: "sayFast" },
      { title: "Reading", tabId: "reading" },
      { title: "Hot Air Balloons", tabId: "hotAirBalloons" },
      { title: "Catch the Bus", tabId: "catchTheBus" },
      { title: "The Lion and the Mouse", tabId: "theLionAndTheMouse" },
      { title: "Full Dialogue", tabId: "dialogue" },
      { title: "By Section", tabId: "sections" },
      { title: "I take + Phương tiện", tabId: "transport" },
      { title: "By + Phương tiện", tabId: "by" },
    ]
  },
  {
    id: "unit4",
    title: "Our Senses",
    tabs: [
      { title: "Vocabulary 1", tabId: "sensesVocabulary1" },
      { title: "Grammar 1", tabId: "sensesGrammar1" },
      { title: "Vocabulary 2", tabId: "sensesVocabulary2" },
      { title: "Song", tabId: "sensesSong" },
      { title: "Spin", tabId: "sensesSpin" },
      { title: "Grammar 2", tabId: "sensesGrammar2" },
      { title: "Reading", tabId: "sensesReading" },
      { title: "Writing", tabId: "sensesWriting" },
      { title: "Workbook", tabId: "sensesWorkbook" },
    ]
  },
  {
    id: "unit5",
    title: "Animal Habitats",
    tabs: [
        { title: "Vocabulary", tabId: "unit5Vocabulary" },
        { title: "Vocabulary 2", tabId: "unit5Vocabulary2" },
        { title: "Song", tabId: "unit5Song" },
        { title: "Grammar 1: Examples", tabId: "unit5Grammar1" },
        { title: "Grammar 1: Match", tabId: "unit5GrammarMatch" },
        { title: "Grammar 2", tabId: "unit5Grammar2" },
        { title: "Reading", tabId: "unit5Reading" },
        { title: "Read & Write (Why)", tabId: "unit5ReadWriteWhy" },
        { title: "Ask & Answer", tabId: "unit5AskAnswer" },
        { title: "Writing", tabId: "unit5Writing" },
        { title: "Workbook", tabId: "unit5Workbook" }
    ]
  },
  {
    id: "unit6",
    title: "What's for Dinner?",
    tabs: [
        { title: "Vocabulary 1", tabId: "unit6Vocabulary1" },
        { title: "Song", tabId: "unit6Song" },
        { title: "Grammar 1", tabId: "unit6Grammar1" },
        { title: "Vocabulary 2", tabId: "unit6Vocabulary2" },
        { title: "Vocabulary 3", tabId: "unit6Vocabulary3" },
        { title: "Grammar 2", tabId: "unit6Grammar2" },
        { title: "Reading", tabId: "unit6Reading" },
        { title: "Writing", tabId: "unit6Writing" },
        { title: "Extended Reading", tabId: "unit6ExtendedReading" },
        { title: "Play a game", tabId: "unit6Game" },
        { title: "Workbook", tabId: "unit6Workbook" },
    ]
  },
  {
    id: "unit7",
    title: "Feeling Fit",
    tabs: [
        { title: "Vocabulary 1", tabId: "unit7Vocabulary1" },
        { title: "Vocabulary 2", tabId: "unit7Vocabulary2" },
        { title: "Grammar 1", tabId: "unit7Grammar1" },
        { title: "Grammar 2", tabId: "unit7Grammar2" },
        { title: "Play a game", tabId: "unit7Game" },
        { title: "Song", tabId: "unit7Song" },
        { title: "Reading", tabId: "unit7Reading" },
        { title: "Writing", tabId: "unit7Writing" },
        { title: "Workbook", tabId: "unit7Workbook" },
        { title: "Review", tabId: "unit7Review" },
    ]
  },
  {
    id: "unit8",
    title: "Let's Celebrate!",
    tabs: [
      { title: "Vocabulary 1", tabId: "unit8Vocabulary1" },
      { title: "Grammar 1", tabId: "unit8Grammar1" },
      { title: "Vocabulary 2", tabId: "unit8Vocabulary2" },
      { title: "Grammar 2", tabId: "unit8Grammar2" },
      { title: "Reading", tabId: "unit8Reading" },
      { title: "Writing", tabId: "unit8Writing" },
      { title: "Game Time", tabId: "unit8Game" },
      { title: "Workbook", tabId: "unit8Workbook" },
    ]
  },
  {
    id: "unit9",
    title: "My Weekend",
    tabs: [
        { title: "Vocabulary 1", tabId: "unit9Vocabulary1" },
        { title: "Song", tabId: "unit9Song" },
        { title: "Grammar 1", tabId: "unit9Grammar1" },
        { title: "Vocabulary 2", tabId: "unit9Vocabulary2" },
        { title: "Grammar 2", tabId: "unit9Grammar2" },
        { title: "Reading", tabId: "unit9Reading" },
        { title: "Writing", tabId: "unit9Writing" },
        { title: "Extended Reading", tabId: "unit9ExtendedReading" },
    ]
  }
];