import React, { useState, useEffect } from 'react';
import ProfessionSelect from './components/ProfessionSelect';
import Roadmap from './components/Roadmap';
import Lesson from './components/Lesson';
import Test from './components/Test';
import BlockComplete from './components/BlockComplete';
import AllComplete from './components/AllComplete';
import { trainingData } from './data/trainingData';

function App() {
  const [currentProfession, setCurrentProfession] = useState(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [blockTestsCompleted, setBlockTestsCompleted] = useState(new Set());
  const [testResults, setTestResults] = useState({});
  const [view, setView] = useState('profession-select'); // profession-select, roadmap, lesson, test, block-complete, all-complete

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('zapech-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setCompletedLessons(new Set(data.completedLessons));
      setBlockTestsCompleted(new Set(data.blockTestsCompleted));
      setTestResults(data.testResults);
    }
  }, []);

  // Save progress
  useEffect(() => {
    const data = {
      completedLessons: Array.from(completedLessons),
      blockTestsCompleted: Array.from(blockTestsCompleted),
      testResults
    };
    localStorage.setItem('zapech-progress', JSON.stringify(data));
  }, [completedLessons, blockTestsCompleted, testResults]);

  const selectProfession = (profession) => {
    setCurrentProfession(profession);
    setView('roadmap');
  };

  const startBlock = (blockIndex) => {
    setCurrentBlockIndex(blockIndex);
    setCurrentLessonIndex(0);
    setView('lesson');
  };

  const nextLesson = () => {
    const block = trainingData[currentProfession].blocks[currentBlockIndex];
    const newCompleted = new Set(completedLessons);
    newCompleted.add(block.lessons[currentLessonIndex].id);
    setCompletedLessons(newCompleted);

    if (currentLessonIndex < block.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else {
      setView('test');
    }
  };

  const prevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const completeTest = (score) => {
    const block = trainingData[currentProfession].blocks[currentBlockIndex];
    const newBlockTests = new Set(blockTestsCompleted);
    newBlockTests.add(block.id);
    setBlockTestsCompleted(newBlockTests);
    
    setTestResults({ ...testResults, [block.id]: score });
    setView('block-complete');
  };

  const nextBlock = () => {
    const profession = trainingData[currentProfession];
    const allBlocksCompleted = profession.blocks.every((_, idx) => 
      blockTestsCompleted.has(profession.blocks[idx].id)
    );
    
    if (allBlocksCompleted) {
      setView('all-complete');
    } else {
      setView('roadmap');
    }
  };

  const restartAll = () => {
    if (confirm('Начать обучение сначала? Весь прогресс будет сброшен.')) {
      setCompletedLessons(new Set());
      setBlockTestsCompleted(new Set());
      setTestResults({});
      setCurrentProfession(null);
      setCurrentBlockIndex(0);
      setCurrentLessonIndex(0);
      setView('profession-select');
      localStorage.removeItem('zapech-progress');
    }
  };

  const getTotalScore = () => {
    const results = Object.values(testResults);
    if (results.length === 0) return 0;
    return Math.round(results.reduce((a, b) => a + b, 0) / results.length);
  };

  const getCurrentBlockIndex = () => {
    if (!currentProfession) return 0;
    const profession = trainingData[currentProfession];
    for (let i = 0; i < profession.blocks.length; i++) {
      if (!blockTestsCompleted.has(profession.blocks[i].id)) {
        return i;
      }
    }
    return profession.blocks.length - 1;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {view === 'profession-select' && (
        <ProfessionSelect onSelect={selectProfession} />
      )}
      
      {view === 'roadmap' && currentProfession && (
        <Roadmap
          profession={currentProfession}
          completedLessons={completedLessons}
          blockTestsCompleted={blockTestsCompleted}
          onSelectBlock={startBlock}
          totalScore={getTotalScore()}
          onBack={() => {
      setCurrentProfession(null);
      setView('profession-select');
    }}
        />
      )}
      
      {view === 'lesson' && currentProfession && (
        <Lesson
          profession={currentProfession}
          blockIndex={currentBlockIndex}
          lessonIndex={currentLessonIndex}
          onNext={nextLesson}
          onPrev={prevLesson}
          onBack={() => setView('roadmap')}
        />
      )}
      
      {view === 'test' && currentProfession && (
        <Test
          profession={currentProfession}
          blockIndex={currentBlockIndex}
          onComplete={completeTest}
          onBack={() => setView('lesson')}
        />
      )}
      
      {view === 'block-complete' && currentProfession && (
        <BlockComplete
          score={testResults[trainingData[currentProfession].blocks[currentBlockIndex].id] || 0}
          onNext={nextBlock}
        />
      )}
      
      {view === 'all-complete' && (
        <AllComplete onRestart={restartAll} />
      )}
    </div>
  );
}

export default App;