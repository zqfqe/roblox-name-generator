import React, { useState } from 'react';
import { X, User, MessageSquare, Trophy, Copy, Check } from 'lucide-react';
import { GeneratedName } from '../types';

interface PreviewModalProps {
  name: GeneratedName;
  onClose: () => void;
  isOpen: boolean;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ name, onClose, isOpen }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'leaderboard' | 'chat'>('profile');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(name.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Derive a "Display Name" from the username (add spacing/formatting)
  const displayName = name.name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ').replace(/[0-9]/g, '');
  const finalDisplayName = displayName.length < 3 ? name.name : displayName;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up" role="dialog" aria-modal="true" aria-labelledby="preview-title">
      <div className="bg-[#111827] w-full max-w-md rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/50">
          <h3 id="preview-title" className="text-white font-bold flex items-center gap-2">
            <User className="w-4 h-4 text-roblox-accent" />
            Name Preview
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close preview">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'profile' ? 'text-white border-b-2 border-roblox-accent' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Profile
          </button>
          <button 
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'leaderboard' ? 'text-white border-b-2 border-roblox-accent' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Leaderboard
          </button>
          <button 
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'chat' ? 'text-white border-b-2 border-roblox-accent' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Chat
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 bg-[#1a1c1e] min-h-[300px] flex flex-col justify-center">
          
          {/* PROFILE VIEW */}
          {activeTab === 'profile' && (
            <div className="bg-[#232527] rounded-lg p-6 text-center shadow-lg transform transition-all">
              <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden border-4 border-[#1a1c1e]">
                <User className="w-12 h-12 text-gray-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">{finalDisplayName}</h2>
              <p className="text-gray-400 font-mono text-sm mb-6">@{name.name}</p>
              
              <div className="flex justify-center gap-8 border-t border-gray-700 pt-4">
                <div>
                  <div className="text-lg font-bold text-white">204</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Friends</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">12.5K</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Followers</div>
                </div>
              </div>
            </div>
          )}

          {/* LEADERBOARD VIEW */}
          {activeTab === 'leaderboard' && (
            <div className="space-y-2">
              <div className="bg-[#232527]/50 rounded px-4 py-2 flex justify-between text-xs text-gray-500 font-bold uppercase">
                <span>Player</span>
                <span>Kills</span>
              </div>
              <div className="bg-[#393b3d] rounded px-4 py-3 flex justify-between items-center text-white border-l-4 border-yellow-400 shadow-md">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-yellow-400">1</span>
                  <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                  <span className="font-bold tracking-wide">{name.name}</span>
                </div>
                <span className="font-mono font-bold">420</span>
              </div>
              <div className="bg-[#232527] rounded px-4 py-3 flex justify-between items-center text-gray-300 opacity-60">
                <div className="flex items-center gap-3">
                  <span className="font-bold">2</span>
                  <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                  <span>NoobSlayer99</span>
                </div>
                <span className="font-mono">85</span>
              </div>
            </div>
          )}

          {/* CHAT VIEW */}
          {activeTab === 'chat' && (
            <div className="space-y-4 font-medium text-sm">
              <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                <div className="flex gap-2 mb-1">
                  <span className="text-white font-bold">[{name.name}]:</span>
                  <span className="text-white">gg ez</span>
                </div>
                <div className="flex gap-2 opacity-50">
                  <span className="text-blue-400 font-bold">[Team] [{name.name}]:</span>
                  <span className="text-white">rush mid</span>
                </div>
              </div>
              <p className="text-center text-xs text-gray-500 mt-4">
                *This is a simulation of how the name appears in-game.*
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 bg-gray-800/50 flex gap-3">
          <button 
            onClick={handleCopy}
            className="flex-1 bg-roblox-accent hover:bg-emerald-600 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Name'}
          </button>
        </div>
      </div>
    </div>
  );
};