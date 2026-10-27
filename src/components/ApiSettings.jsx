import React, { useState } from 'react';
import { Key, Check, AlertCircle, X, Eye, EyeOff, Sparkles, Trash2, Cpu } from 'lucide-react';
import { testMistralApiKey } from '../lib/mistralClient';

export default function ApiSettings({
  isOpen = false,
  onClose,
  apiKey = "",
  onSaveApiKey,
  onClearApiKey
}) {
  const [inputKey, setInputKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isOpen) return null;

  const handleTestKey = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const result = await testMistralApiKey(inputKey);
      setTestResult(result);
    } catch (err) {
      setTestResult({ success: false, error: err.message });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    onSaveApiKey(inputKey.trim());
    onClose();
  };

  const handleClear = () => {
    setInputKey("");
    setTestResult(null);
    onClearApiKey();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#0a0a0a] border border-[#262626] rounded-sm p-6 shadow-2xl relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1c1c1c] mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-black border border-[#2c2c2c] flex items-center justify-center text-white">
              <Key className="w-4 h-4 text-[#e4e4e7]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg uppercase tracking-wider text-white">
                Mistral AI Live API Configuration
              </h3>
              <p className="text-[11px] font-mono text-[#71717a]">
                Optional live RAG answer generation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm text-[#71717a] hover:text-white hover:bg-[#161616] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Security disclaimer */}
        <div className="p-3 rounded-sm bg-black border border-[#1f1f1f] text-xs text-[#a1a1aa] mb-5 leading-relaxed font-sans">
          <div className="flex items-center gap-1.5 text-white font-mono text-[11px] uppercase mb-1">
            <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
            <span>Transient Browser Session</span>
          </div>
          Keys entered here remain strictly in ephemeral memory and are never persisted to disk or sent to non-Mistral backends. You can also configure via <code className="text-white font-mono text-[11px]">.env</code> with <code className="text-white font-mono text-[11px]">VITE_MISTRAL_API_KEY</code>.
        </div>

        {/* Key Input */}
        <div className="mb-4">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#a1a1aa] mb-1.5">
            Mistral API Key:
          </label>
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              value={inputKey}
              onChange={(e) => {
                setInputKey(e.target.value);
                setTestResult(null);
              }}
              placeholder="api_key_xxxxxxxxxxxxxxxxxxxx"
              className="w-full bg-black border border-[#2a2a2a] rounded-sm py-2 px-3 text-xs font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-white/50 transition-colors pr-10"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] hover:text-white transition-colors"
            >
              {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Model Spec Information */}
        <div className="p-3 bg-black/60 rounded-sm border border-[#1c1c1c] text-[11px] font-mono space-y-1 text-[#8e8e93] mb-5">
          <div className="flex justify-between">
            <span>Model:</span>
            <span className="text-white">mistral-small-latest</span>
          </div>
          <div className="flex justify-between">
            <span>Endpoint:</span>
            <span className="text-zinc-400">api.mistral.ai/v1/chat/completions</span>
          </div>
          <div className="flex justify-between">
            <span>Temperature:</span>
            <span className="text-zinc-400">0.2 (deterministic evidence alignment)</span>
          </div>
        </div>

        {/* Test Result Message */}
        {testResult && (
          <div className={`p-3 rounded-sm text-xs font-mono mb-4 border ${
            testResult.success
              ? 'bg-emerald-950/30 text-emerald-300 border-emerald-800/40'
              : 'bg-red-950/30 text-red-300 border-red-800/40'
          }`}>
            <div className="flex items-center gap-1.5 font-bold uppercase mb-0.5">
              {testResult.success ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
              <span>{testResult.success ? 'API Key Valid' : 'Validation Failed'}</span>
            </div>
            <p className="text-[11px] opacity-90">
              {testResult.message || testResult.error}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#1c1c1c]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTestKey}
              disabled={testing || !inputKey.trim()}
              className="px-3 py-1.5 rounded-sm bg-[#141414] hover:bg-[#1e1e1e] border border-[#2a2a2a] text-xs font-mono text-white transition-all disabled:opacity-40 flex items-center gap-1.5"
            >
              {testing ? (
                <div className="w-3 h-3 border border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <Sparkles className="w-3 h-3" />
              )}
              <span>{testing ? 'Pinging Mistral...' : 'Test API'}</span>
            </button>

            {apiKey && (
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-1.5 rounded-sm bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 text-xs font-mono text-red-400 transition-all flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear Key</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-sm text-xs font-mono text-[#8e8e93] hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="silver-pill-btn px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
            >
              Apply Settings
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
