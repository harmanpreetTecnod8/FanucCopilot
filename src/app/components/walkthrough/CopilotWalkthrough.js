//Tour.js
import { Tourney } from "next/font/google";
import React from "react";
import JoyRide from "react-joyride";
import useStore from "../../../StateStore";
// Tour steps
const TOUR_STEPS = [
  {
    content: (
      <div className=" -mb-7 ">
        <div className="  w-full flex justify-start mb-5">
          <div className="rounded bg-yellow-200 shadow ring-offset-1 px-1 text-black text-sm">
            Quick Guide
          </div>
        </div>
        <div className="welcomeBox rounded">
          <h1 className="text-4xl text text-black mb-2 text-center">Welcome</h1>
          <h2 className="text-2xl text text-black mb-2 text-center">
            This is an ASRS Copilot
          </h2>

          <p className="text-xl text-center">Let us jump in</p>
        </div>
      </div>
    ),
    locale: { skip: <strong>SKIP</strong> },
    placement: "center",
    target: "body",
  },
  {
    target: ".chatbot",
    content: (
      <div className="-mb-7 ">
        <div className="w-full flex justify-start mb-5">
          <div className="rounded bg-yellow-200 shadow ring-offset-1 p-1 text-black text-sm">
            Quick Guide
          </div>
        </div>
        <div className="font-bold text-sm">
          GenAI Copilot, Ask question in your language.
        </div>
      </div>
    ),
    audio: "../assets/playButtonAudio.mp3",
  },
  {
    target: ".playButton",
    content: (
      <div className="-mb-7 ">
        <div className=" full flex justify-start mb-5">
          <div className=" bg-yellow-200 shadow ring-offset-1 p-1 text-black text-sm">
            Quick Guide
          </div>
        </div>
        <div className="font-bold text-sm mt-1">
          Animation Play/Pause button
        </div>
      </div>
    ),
    audio: "../assets/playButtonAudio.mp3",
  },
  {
    target: ".restartButton",
    content: (
      <div className="-mb-7 ">
        <div className=" full flex justify-start mb-5">
          <div className=" bg-yellow-200 shadow ring-offset-1 p-1 text-black text-sm">
            Quick Guide
          </div>
        </div>
        <div className="font-bold text-sm">Animation Restart button</div>
      </div>
    ),
    audio: "../assets/playButtonAudio.mp3",
  },

  {
    target: ".gotoCopilotButton",
    content: (
      <div className="-mb-7 ">
        <div className=" w-full flex justify-start mb-5">
          <div className="rounded bg-yellow-200 shadow ring-offset-1 p-1 text-black text-sm">
            Quick Guide
          </div>
        </div>
        <div className="font-bold text-sm">
          Now click on this Button to View ASRS & Interact/Talk to GenAI
        </div>
      </div>
    ),
    audio: "../assets/playButtonAudio.mp3",
  },
];

// Tour component
const CopilotWalkthrough = () => {
  const { isUnityModelLoaded, showWelcomeMessage } = useStore();
  return (
    <>
      <JoyRide
        steps={TOUR_STEPS}
        continuous={true}
        showSkipButton={true}
        run={isUnityModelLoaded && showWelcomeMessage}
        callback={() => {}}
        hideCloseButton
        scrollToFirstStep
        styles={{
          options: {
            arrowColor: "#e3ffeb",
            backgroundColor: "#e3ffeb",
            overlayColor: "rgba(79, 26, 0, 0.4)",
            primaryColor: "#000",
            textColor: "#004a14",
            overflow: "hidden",
          },
        }}
      />
    </>
  );
};

export default CopilotWalkthrough
