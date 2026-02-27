// Центральный файл для сбора всех данных по профессиям

import { commonBlocks, commonTests } from './commonData.js';
import { waiterBlocks, waiterTests } from './waiterData.js';
import { hostessBlocks, hostessTests } from './hostessData.js';
import { bartenderBlocks, bartenderTests } from './bartenderData.js';
import { runnerBlocks, runnerTests } from './runnerData.js';

// Функция для объединения общих и специфических блоков
const combineBlocks = (specificBlocks) => {
  return [...commonBlocks, ...specificBlocks];
};

// Функция для объединения тестов
const combineTests = (specificTests) => {
  return { ...commonTests, ...specificTests };
};

export const trainingData = {
  runner: {
    name: "Ранер",
    blocks: combineBlocks(runnerBlocks),
    tests: combineTests(runnerTests)
  },
  
  waiter: {
    name: "Официант",
    blocks: combineBlocks(waiterBlocks),
    tests: combineTests(waiterTests)
  },
  
  hostess: {
    name: "Хостес",
    blocks: combineBlocks(hostessBlocks),
    tests: combineTests(hostessTests)
  },
  
  bartender: {
    name: "Бармен",
    blocks: combineBlocks(bartenderBlocks),
    tests: combineTests(bartenderTests)
  },
};

export default trainingData;