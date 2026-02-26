import React from 'react';
import { ChevronLeft, BookOpen } from 'lucide-react';
import { trainingData } from '../data/trainingData';

function Lesson({ profession, blockIndex, lessonIndex, onNext, onPrev, onBack }) {
  const profData = trainingData[profession];
  const block = profData.blocks[blockIndex];
  const lesson = block.lessons[lessonIndex];
  
  const isFirst = lessonIndex === 0;
  const isLast = lessonIndex === block.lessons.length - 1;

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <div className="px-5 pt-6 pb-3">
          <div className="flex items-center justify-between mb-2">
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-slate-500 active:scale-95 transition-transform">
              <ChevronLeft size={16} />
              Назад
            </button>
          </div>
          <h1 className="text-2xl font-bold text-red-700 tracking-tight">{profData.name}</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
            Блок {blockIndex + 1}: {block.title}
          </p>
          
          {/* Progress */}
          <div className="relative mt-4">
            <div className="flex justify-between mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Прогресс блока</span>
              <span>{lessonIndex + 1}/{block.lessons.length} уроков</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-600 rounded-full transition-all duration-500" 
                style={{ width: `${((lessonIndex + 1) / block.lessons.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 pt-4">
        <div className="ios-card p-6 lesson-content animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
              <BookOpen size={20} />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">
                Урок {lessonIndex + 1} из {block.lessons.length}
              </div>
              <h2 className="text-xl font-bold text-slate-800">{lesson.title}</h2>
            </div>
          </div>
          
          <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className={`flex-1 py-4 rounded-2xl font-bold uppercase text-sm tracking-wider active:scale-95 transition-all ${
              isFirst 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-slate-200 text-slate-700'
            }`}
          >
            Назад
          </button>
          <button
            onClick={onNext}
            className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-bold uppercase text-sm tracking-wider active:scale-95 transition-all shadow-lg shadow-red-200"
          >
            {isLast ? 'Перейти к тесту' : 'Далее'}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Lesson;