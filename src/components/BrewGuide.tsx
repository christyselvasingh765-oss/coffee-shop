import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock, Droplets, Flame, Scale } from 'lucide-react';
import { BREW_PRESETS } from '../data/coffeeData';
import { BrewPreset } from '../types';

export const BrewGuide: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('v60');
  const currentPreset = BREW_PRESETS.find((p) => p.id === selectedPresetId) || BREW_PRESETS[0];

  const [coffeeGrams, setCoffeeGrams] = useState<number>(currentPreset.defaultCoffeeGrams);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync default coffee dose when preset changes
  useEffect(() => {
    setCoffeeGrams(currentPreset.defaultCoffeeGrams);
    setElapsedSeconds(0);
    setIsActive(false);
  }, [selectedPresetId]);

  // Audio chime feedback using Web Audio API
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch {
      // AudioContext may be restricted by browser policy
    }
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev + 1 >= currentPreset.totalTimeSeconds) {
            setIsActive(false);
            playChime();
            return currentPreset.totalTimeSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, currentPreset.totalTimeSeconds]);

  const toggleTimer = () => {
    if (elapsedSeconds >= currentPreset.totalTimeSeconds) {
      setElapsedSeconds(0);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setElapsedSeconds(0);
  };

  // Calculations
  const totalWaterGrams = Math.round(coffeeGrams * currentPreset.ratioValue);
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder.toString().padStart(2, '0')}`;
  };

  // Current active step
  const activeStepIndex = currentPreset.steps.findIndex((step, idx) => {
    const nextStep = currentPreset.steps[idx + 1];
    if (!nextStep) return true;
    return elapsedSeconds >= step.time && elapsedSeconds < nextStep.time;
  });

  return (
    <section id="brew-guide" className="py-16 sm:py-24 bg-[#F2ECE3] border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-wider text-[#78350F] font-semibold mb-2">
            The Barista Lab
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#241F1C] tracking-tight">
            Interactive Brew Ratio & Extraction Guide
          </h2>
          <p className="text-xs sm:text-sm text-[#574D45] mt-2">
            Dial in your morning cup like a competition barista. Adjust your coffee dose, get real-time water measurements, and follow the live bloom timer.
          </p>
        </div>

        {/* Method Switcher Buttons */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-[#E8E0D5] rounded-lg border border-[#DDD5CA]">
            {BREW_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                  selectedPresetId === preset.id
                    ? 'bg-[#241F1C] text-white shadow-xs'
                    : 'text-[#574D45] hover:text-[#241F1C]'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Calculator & Timer Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-[#EAE4DC] rounded-xl shadow-xs overflow-hidden p-6 sm:p-8">
          
          {/* Left Column: Ratio & Specs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Parameters Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 bg-[#FAF8F5] rounded-lg border border-[#EAE4DC]">
                <div className="flex items-center gap-1.5 text-[11px] text-[#78350F] font-semibold uppercase">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Ratio</span>
                </div>
                <div className="font-mono text-base font-bold text-[#241F1C] mt-1">
                  {currentPreset.ratio}
                </div>
              </div>

              <div className="p-3.5 bg-[#FAF8F5] rounded-lg border border-[#EAE4DC]">
                <div className="flex items-center gap-1.5 text-[11px] text-[#78350F] font-semibold uppercase">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Water Temp</span>
                </div>
                <div className="text-xs font-medium text-[#241F1C] mt-1 truncate">
                  {currentPreset.temp}
                </div>
              </div>

              <div className="p-3.5 bg-[#FAF8F5] rounded-lg border border-[#EAE4DC]">
                <div className="flex items-center gap-1.5 text-[11px] text-[#78350F] font-semibold uppercase">
                  <Droplets className="w-3.5 h-3.5" />
                  <span>Grind Size</span>
                </div>
                <div className="text-xs font-medium text-[#241F1C] mt-1 truncate" title={currentPreset.grindSize}>
                  {currentPreset.grindSize.split('(')[0]}
                </div>
              </div>
            </div>

            {/* Coffee Dose Slider */}
            <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#EAE4DC] space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#241F1C] uppercase tracking-wider">
                  Coffee Dose
                </span>
                <span className="font-mono tabular-nums font-bold text-sm text-[#78350F]">
                  {coffeeGrams} grams
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="45"
                step="1"
                value={coffeeGrams}
                onChange={(e) => setCoffeeGrams(Number(e.target.value))}
                className="w-full accent-[#78350F] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#8C7E72]">
                <span>10g (Single Cup)</span>
                <span>20g (Standard Mug)</span>
                <span>40g (Carafe for 2)</span>
              </div>
            </div>

            {/* Target Water Result */}
            <div className="p-4 bg-[#241F1C] text-white rounded-lg flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#D4A373] font-semibold block">
                  Total Water Required
                </span>
                <span className="text-xs text-[#DDD5CA]">Filtered water at {currentPreset.temp}</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl font-bold tabular-nums text-white">
                  {totalWaterGrams} g
                </span>
                <span className="block text-[11px] text-[#D1C7BD]">
                  (~{(totalWaterGrams / 29.57).toFixed(1)} fl oz)
                </span>
              </div>
            </div>

            {/* Step-by-Step Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6B5E55]">
                Brewing Phases
              </h4>
              <div className="space-y-2">
                {currentPreset.steps.map((step, idx) => {
                  const isCurrent = activeStepIndex === idx && isActive;
                  const isDone = elapsedSeconds > (currentPreset.steps[idx + 1]?.time || currentPreset.totalTimeSeconds);
                  return (
                    <div
                      key={step.time}
                      className={`p-3 rounded-md text-xs border transition-all ${
                        isCurrent 
                          ? 'border-[#78350F] bg-[#FAF8F5] text-[#241F1C] shadow-xs' 
                          : isDone 
                            ? 'border-[#EAE4DC] bg-white opacity-70 text-[#8C7E72]'
                            : 'border-[#EAE4DC] bg-white text-[#574D45]'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold mb-1">
                        <span className="font-mono text-[11px]">
                          {formatTime(step.time)}
                        </span>
                        <span className="font-mono text-[11px] text-[#78350F]">
                          Scale Target: {step.targetWaterGrams(coffeeGrams)}g
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed">{step.instruction}</p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Live Interactive Timer */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#FAF8F5] border border-[#EAE4DC] rounded-xl p-6 sm:p-8">
            <div className="text-center space-y-4">
              <div className="text-xs uppercase tracking-wider text-[#78350F] font-semibold flex items-center justify-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Live Extraction Timer</span>
              </div>

              {/* Digital Stopwatch Display */}
              <div className="font-mono text-6xl sm:text-7xl font-bold tabular-nums text-[#241F1C] tracking-tight py-4">
                {formatTime(elapsedSeconds)}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#EAE4DC] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#78350F] h-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (elapsedSeconds / currentPreset.totalTimeSeconds) * 100)}%`
                  }}
                />
              </div>

              {/* Current Active Step Instruction */}
              <div className="min-h-[70px] p-4 bg-white rounded-lg border border-[#DDD5CA] flex flex-col items-center justify-center">
                <span className="text-[11px] uppercase tracking-wider text-[#78350F] font-semibold mb-0.5">
                  Current Barista Action
                </span>
                <p className="text-xs text-[#241F1C] font-medium text-center">
                  {currentPreset.steps[activeStepIndex >= 0 ? activeStepIndex : 0]?.instruction}
                </p>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={toggleTimer}
                className="px-6 py-3 bg-[#241F1C] hover:bg-[#3D332D] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all flex items-center gap-2 shadow-xs active:scale-[0.98]"
              >
                {isActive ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>{elapsedSeconds > 0 ? 'Resume' : 'Start Timer'}</span>
                  </>
                )}
              </button>

              <button
                onClick={resetTimer}
                aria-label="Reset timer"
                className="p-3 bg-white hover:bg-[#F2ECE3] text-[#574D45] hover:text-[#241F1C] border border-[#DDD5CA] rounded-md transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
