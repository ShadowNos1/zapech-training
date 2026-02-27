import React from 'react';
import { User, DoorOpen, GlassWater, Footprints } from 'lucide-react';
import { trainingData } from '../data/trainingData';

function ProfessionSelect({ onSelect }) {
  const professions = [
    { id: 'runner', icon: Footprints, color: 'bg-green-100', textColor: 'text-green-600', title: 'Ранер', desc: 'Помощь официантам и уборка' },
    { id: 'waiter', icon: User, color: 'bg-red-100', textColor: 'text-red-600', title: 'Официант', desc: 'Обслуживание гостей в зале' },
    { id: 'hostess', icon: DoorOpen, color: 'bg-amber-100', textColor: 'text-amber-600', title: 'Хостес', desc: 'Встреча и посадка гостей' },
    { id: 'bartender', icon: GlassWater, color: 'bg-blue-100', textColor: 'text-blue-600', title: 'Бармен', desc: 'Приготовление напитков' },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col justify-center items-center p-6 z-50">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-700 mb-2 tracking-tight">ЗАПЕЧЬ</h1>
        <p className="text-slate-600 text-lg">Книга Стандартов Step by Step</p>
      </div>
      
      <div className="w-full max-w-md space-y-4">
        <p className="text-center text-slate-500 mb-6 text-sm">Выберите профессию для обучения</p>
        
        {professions.map((prof) => {
          const Icon = prof.icon;
          return (
            <button
              key={prof.id}
              onClick={() => onSelect(prof.id)}
              className="w-full bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-4 active:scale-95 transition-all hover:shadow-xl"
            >
              <div className={`w-14 h-14 rounded-full ${prof.color} flex items-center justify-center ${prof.textColor}`}>
                <Icon size={28} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg text-slate-800">{prof.title}</h3>
                <p className="text-sm text-slate-500">{prof.desc}</p>
              </div>
              <svg className="w-5 h-5 text-slate-300 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProfessionSelect;