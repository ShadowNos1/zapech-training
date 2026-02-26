import React, { useEffect } from 'react';

function BlockComplete({ score, onNext }) {
  useEffect(() => {
    // Create confetti
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = ['#ef4444', '#dc2626', '#b91c1c', '#f87171'][Math.floor(Math.random() * 4)];
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  }, []);

  let title = '';
  let message = '';

  if (score >= 90) {
    title = 'Отлично! 🏆';
    message = 'Превосходный результат! Вы усвоили материал идеально.';
  } else if (score >= 70) {
    title = 'Хороший результат! ⭐';
    message = 'Вы хорошо усвоили материал, но есть небольшие пробелы.';
  } else if (score >= 50) {
    title = 'Удовлетворительно 👍';
    message = 'Базовые знания есть, но стоит повторить некоторые моменты.';
  } else {
    title = 'Требуется практика 📚';
    message = 'Рекомендуем пройти обучение ещё раз для закрепления.';
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 text-center animate-fade-in">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
      <p className="text-sm text-slate-500 mb-6 max-w-xs">{message}</p>
      
      <div className="ios-card p-6 mb-6 w-full max-w-xs">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <div 
            className="absolute inset-0 rounded-full score-circle"
            style={{ '--score': score }}
          ></div>
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <div>
              <div className="text-3xl font-bold text-red-600">{score}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">%</div>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-400">Результат теста</p>
      </div>

      <button
        onClick={onNext}
        className="w-full max-w-xs bg-red-600 text-white py-4 rounded-2xl font-bold uppercase text-sm tracking-wider active:scale-95 transition-all shadow-lg shadow-red-200"
      >
        Продолжить
      </button>
    </div>
  );
}

export default BlockComplete;