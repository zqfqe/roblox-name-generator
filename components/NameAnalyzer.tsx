import React, { useState } from 'react';
import { Search, Trophy, AlertTriangle, Check, Sparkles, Activity } from 'lucide-react';
import { analyzeName, AnalysisResult } from '../utils/rarity';
import { Button } from './Button';

export const NameAnalyzer: React.FC = () => {
  const [inputName, setInputName] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputName.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    // Fake processing delay for dramatic effect
    setTimeout(() => {
      const res = analyzeName(inputName);
      setResult(res);
      setIsAnalyzing(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 animate-fade-in-up">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-500/10 text-blue-400 mb-4 border border-blue-500/20">
          <Activity className="w-6 h-6" />
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Username Rater</h1>
        <p className="text-gray-400 text-lg">
          Is your name <span className="text-yellow-400 font-bold">Sweaty</span> or <span className="text-gray-500 font-bold">Noob</span>? 
          Enter it below to find out.
        </p>
      </div>

      <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-3xl p-6 md:p-8 shadow-2xl max-w-2xl mx-auto">
        <form onSubmit={handleAnalyze} className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="e.g. vIperSz, CoolGuy123"
            maxLength={20}
            className="flex-grow px-6 py-4 bg-gray-900 border border-gray-700 rounded-xl text-white font-medium focus:ring-2 focus:ring-blue-500 outline-none text-lg placeholder-gray-600"
          />
          <Button 
            type="submit" 
            isLoading={isAnalyzing}
            className="bg-blue-600 hover:bg-blue-500 focus:ring-blue-500 min-w-[140px] text-lg"
          >
            Rate It
          </Button>
        </form>

        {result && (
          <div className="animate-fade-in-up">
            {/* Score Card */}
            <div className="relative overflow-hidden bg-gray-900 rounded-2xl border border-gray-700 p-8 text-center mb-6">
              {/* Animated Glow based on score */}
              <div 
                className={`absolute inset-0 opacity-10 transition-colors duration-500 ${
                  result.score >= 80 ? 'bg-yellow-500' : result.score >= 50 ? 'bg-blue-500' : 'bg-red-500'
                }`}
              ></div>

              <div className="relative z-10">
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Verdict</div>
                <div className={`text-4xl md:text-5xl font-black mb-2 ${result.tierColor} font-gaming tracking-wide`}>
                  {result.tier}
                </div>
                <div className="text-6xl font-bold text-white mb-4">
                  {result.score}<span className="text-2xl text-gray-600">/100</span>
                </div>
                <p className="text-gray-300 italic">"{result.summary}"</p>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Score Breakdown</h3>
              {result.feedback.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    item.type === 'good' ? 'bg-green-900/20 border-green-500/30' : 
                    item.type === 'bad' ? 'bg-red-900/20 border-red-500/30' : 
                    'bg-gray-800 border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.type === 'good' && <Check className="w-5 h-5 text-green-400" />}
                    {item.type === 'bad' && <AlertTriangle className="w-5 h-5 text-red-400" />}
                    {item.type === 'neutral' && <Sparkles className="w-5 h-5 text-gray-400" />}
                    <span className="font-medium text-gray-200">{item.text}</span>
                  </div>
                  <span className={`font-bold ${item.score > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {item.score > 0 ? '+' : ''}{item.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};