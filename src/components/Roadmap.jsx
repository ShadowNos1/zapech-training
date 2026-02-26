import React from 'react';
import { ChevronLeft, CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { trainingData } from '../data/trainingData';

function Roadmap({ profession, completedLessons, blockTestsCompleted, onSelectBlock, totalScore, onBack }) {
  const profData = trainingData[profession];

  const isBlockLocked = (blockIndex) => {
    if (blockIndex === 0) return false;
    return !blockTestsCompleted.has(profData.blocks[blockIndex - 1].id);
  };

  const isBlockCompleted = (blockId) => blockTestsCompleted.has(blockId);

  const getBlockProgress = (block) => {
    const completed = block.lessons.filter(l => completedLessons.has(l.id)).length;
    return `${completed}/${block.lessons.length} уроков`;
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <div className="px-5 pt-6 pb-3">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-slate-500 active:scale-95 transition-transform">
                                                    Назад
                        </button>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-bold text-slate-500">
              Обучение
            </div>
            
            <div className="bg-red-600 px-4 py-2 rounded-full shadow-lg shadow-red-200">
              <span className="text-sm font-black text-white">{totalScore}%</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-red-700 tracking-tight">{profData.name}</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Дорожка обучения</p>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 pt-4">
        <h2 className="text-lg font-bold text-slate-800 mb-4 px-1">Блоки обучения</h2>
        
        <div className="space-y-4">
          {profData.blocks.map((block, index) => {
            const locked = isBlockLocked(index);
            const completed = isBlockCompleted(block.id);
            const current = !locked && !completed;

            let Icon = PlayCircle;
            let iconColor = 'text-red-500';
            let bgColor = 'bg-red-100';

            if (completed) {
              Icon = CheckCircle;
              iconColor = 'text-green-500';
              bgColor = 'bg-green-100';
            } else if (locked) {
              Icon = Lock;
              iconColor = 'text-slate-300';
              bgColor = 'bg-slate-100';
            }

            return (
              <div
                key={block.id}
                onClick={() => !locked && onSelectBlock(index)}
                className={`ios-card p-4 ${locked ? 'block-locked' : 'cursor-pointer active:scale-95 transition-transform'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center ${iconColor}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Блок {index + 1}</span>
                      {completed && (
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Пройден</span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-800 mt-1">{block.title}</h3>
                    {!locked && (
                      <p className="text-xs text-slate-400 mt-1">{getBlockProgress(block)}</p>
                    )}
                  </div>
                  {!locked && !completed && (
                    <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Roadmap;