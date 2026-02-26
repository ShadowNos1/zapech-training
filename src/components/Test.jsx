import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { trainingData } from '../data/trainingData';

function Test({ profession, blockIndex, onComplete, onBack }) {
  const profData = trainingData[profession];
  const block = profData.blocks[blockIndex];
  const testQuestions = profData.tests[block.id] || [];
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const question = testQuestions[currentQuestion];

  const selectAnswer = (index) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    
    if (index === question.correct) {
      setCorrectAnswers(correctAnswers + 1);
    }

    setTimeout(() => {
      if (currentQuestion < testQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        const score = Math.round(((correctAnswers + (index === question.correct ? 1 : 0)) / testQuestions.length) * 100);
        onComplete(score);
      }
    }, 1000);
  };

  const getOptionClass = (index) => {
    if (selectedAnswer === null) return '';
    if (index === question.correct) return 'correct';
    if (index === selectedAnswer) return 'wrong';
    return '';
  };

  if (!question) {
    onComplete(100);
    return null;
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <div className="px-5 pt-6 pb-3">
          <div className="flex items-center justify-between mb-2">
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-slate-500 active:scale-95 transition-transform">
              <ChevronLeft size={16} />
              Выйти
            </button>
            <span className="text-[10px] font-black text-slate-400 uppercase">Финальный тест блока</span>
          </div>
          <h1 className="text-2xl font-bold text-red-700 tracking-tight">{profData.name}</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{block.title}</p>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 pt-4">
        {/* Progress dots */}
        <div className="flex gap-1 mb-4 justify-center">
          {testQuestions.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === currentQuestion ? 'bg-red-600' : i < currentQuestion ? 'bg-green-500' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        <div className="ios-card p-4 animate-slide-up">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-3">
            Вопрос {currentQuestion + 1} из {testQuestions.length}
          </div>
          <h4 className="font-bold text-slate-800 mb-4 text-lg">{question.q}</h4>
          
          <div className="space-y-2">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                disabled={selectedAnswer !== null}
                className={`quiz-option w-full p-3 rounded-xl bg-slate-50 text-left font-bold text-slate-700 flex items-center gap-3 ${getOptionClass(i)}`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                  selectedAnswer === null ? 'border-slate-300 text-slate-400' :
                  i === question.correct ? 'bg-green-500 border-green-500 text-white' :
                  i === selectedAnswer ? 'bg-red-500 border-red-500 text-white' :
                  'border-slate-300 text-slate-400'
                }`}>
                  {selectedAnswer !== null && i === question.correct ? (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : selectedAnswer !== null && i === selectedAnswer ? (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </div>
                {option}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Test;