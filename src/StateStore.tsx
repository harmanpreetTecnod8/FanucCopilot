// store.js
"use client";
import { create } from 'zustand';

type Store = {
  showWelcomeMessage: boolean;
  showUiComponent1: boolean;
  showUiComponent2: boolean;
  commonElementSize: "large" | "small";
  playAnimation: boolean;
  isAssembled: boolean;
  pauseAnimation: boolean;
  functionName: string;
  commandName: string;
  faultyPart: string;
  showVoiceCommands: boolean;
  commandMicClicked: boolean;
  showUnityWalkThrough: boolean;
  isUnityModelLoaded: boolean;
  restartButtonEnabled: boolean;
  isUnitySeenLoading: boolean,
  activeModule:string;
  setActiveModule:(value:string) => void;
  setIsUnitySeenLoading: (value: boolean) => void;
  setRestartButtonEnabled: (value: boolean) => void;
  setIsUnityModelLoaded: (value: boolean) => void;
  setShowWelcomeMessage: (value: boolean) => void;
  setShowUiComponent1: (value: boolean) => void;
  setShowUiComponent2: (value: boolean) => void;
  setIsAssembled: (value: boolean) => void;
  setCommonElementSize: (value: 'large' | 'small') => void;
  setplayAnimation: (value: boolean) => void;
  setShowVoiceCommands: (value: boolean) => void;
  setFunctionName: (value: string) => void;
  setCommandName: (value: string) => void;
  setFaultyPart: (value: string) => void;
  setShowUnityWalkThrough: (value: boolean) => void;
  setCommandMicClicked: (value: boolean) => void;


};

const useStore = create<Store>((set) => ({
  showWelcomeMessage: true,
  showUiComponent1: false,
  showUiComponent2: false,
  commonElementSize: 'large',
  playAnimation: false,
  pauseAnimation: false,
  commandName: "",
  functionName: "Storage",
  isAssembled: true,
  showVoiceCommands: false,
  commandMicClicked: false,
  showUnityWalkThrough: true,
  isUnityModelLoaded: false,
  faultyPart: "",
  restartButtonEnabled: false,
  isUnitySeenLoading: false,
  activeModule:"ASRS",
  setActiveModule:(value)=>set({activeModule:value}),
  setIsUnitySeenLoading: (value) => set({ isUnitySeenLoading: value }),

  setRestartButtonEnabled: (value) => set({ restartButtonEnabled: value }),
  setIsAssembled: (value) => set({ isAssembled: value }),
  setFaultyPart: (value) => set({ faultyPart: value }),
  setShowWelcomeMessage: (value) => set({ showWelcomeMessage: value }),
  setShowVoiceCommands: (value) => set({ showVoiceCommands: value }),
  setShowUiComponent1: (value) => set({ showUiComponent1: value, showWelcomeMessage: false }),
  setShowUiComponent2: (value) => set({ showUiComponent2: value, showWelcomeMessage: false }),
  setCommonElementSize: (value) => set({ commonElementSize: value }),
  setplayAnimation: (value) => set({ playAnimation: value }),
  setFunctionName: (value) => set({ functionName: value }),
  setCommandName: (value) => set({ commandName: value }),
  setCommandMicClicked: (value) => set({ commandMicClicked: value }),
  setShowUnityWalkThrough: (value) => set({ showUnityWalkThrough: value }),
  setIsUnityModelLoaded: (value) => set({ isUnityModelLoaded: value })
}));

export default useStore;
