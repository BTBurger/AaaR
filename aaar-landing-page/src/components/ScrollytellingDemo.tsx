import React from 'react';
import ScrollySection, { type Step } from './ScrollySection';

const ScrollytellingDemo: React.FC = () => {
  // ステップ（段落）の配列を定義
  const steps: Step[] = [
    {
      id: 0,
      title: 'AaaR',
      body: '',
      visual: (
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-6">AaaR</h2>
          <div className = "leading-loose space-y-2">
            <p>All as a Right. Anything as a Right. AaaR as a Right</p>
            <p>全てを権利として。</p>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: '今すぐ始めよう',
      body: '',
      visual: (
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-6">今すぐ始めよう</h2>
          <p className="text-xl mb-8 opacity-90">
          </p>
          <button className="px-8 py-4 text-lg font-bold bg-white text-slate-900 border-none rounded-full cursor-pointer shadow-[0_10px_25px_rgba(255,255,255,0.3)] transition-transform duration-200 ease-in-out hover:scale-105">
            はじめる
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white">
      <ScrollySection steps={steps} />
    </div>
  );
};

export default ScrollytellingDemo;
