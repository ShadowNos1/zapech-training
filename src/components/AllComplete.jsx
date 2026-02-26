import React, { useEffect } from 'react';

function AllComplete({ onRestart }) {
  useEffect(() => {
    // Create confetti
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = ['#ef4444', '#dc2626', '#b91c1c', '#f87171', '#fbbf24', '#10b981'][Math.floor(Math.random() * 6)];
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 text-center animate-fade-in">
      <div className="text-6xl mb-4">🏆</div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Обучение завершено!</h2>
      <p className="text-sm text-slate-500 mb-6 max-w-xs">
        Поздравляем! Вы успешно прошли все блоки обучения и готовы к работе.
      </p>
      
      <div className="ios-card p-6 mb-6 w-full max-w-xs">
        <div className="text-4xl mb-2">🎓</div>
        <h3 className="font-bold text-slate-800 mb-2">Сертификат</h3>
        <p className="text-sm text-slate-500">
          Вы освоили все стандарты сервиса ресторана «ЗАПЕЧЬ»
        </p>
      </div>

      <button
        onClick={onRestart}
        className="w-full max-w-xs bg-red-600 text-white py-4 rounded-2xl font-bold uppercase text-sm tracking-wider active:scale-95 transition-all shadow-lg shadow-red-200"
      >
        Начать заново
      </button>
    </div>
  );
}

export default AllComplete;