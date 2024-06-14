import React from "react";
import JoyRide from "react-joyride";
import useStore from "../../../StateStore";

const TOUR2_STEPS = [
  {
    target: ".commandMicButton",
    content: (
      <div className=" -mb-7 ">
      <div className="  w-full flex justify-start mb-5">
        <div className="rounded bg-yellow-200 shadow ring-offset-1 px-1 text-black text-sm">
          Quick Guide
        </div>
      </div>
        <div className="font-bold text-sm">
          Button to give voice commands to ASRS.
        </div>
      </div>
    ),
    audio: "../assets/playButtonAudio.mp3",
  },
  {
    target: ".instructionButton",
    content: (
      <div className=" -mb-7 ">
        <div className="  w-full flex justify-start mb-5">
          <div className="rounded bg-yellow-200 shadow ring-offset-1 px-1 text-black text-sm">
            Quick Guide
          </div>
        </div>
        <div className="font-bold text-sm">
          List of Available voice-commands
        </div>
      </div>
    ),
    audio: "../assets/playButtonAudio.mp3",
  },
  {
    target: ".gotoAnimation",
    content: (
      <div className=" -mb-7 ">
      <div className="  w-full flex justify-start mb-5">
        <div className="rounded bg-yellow-200 shadow ring-offset-1 px-1 text-black text-sm">
          Quick Guide
        </div>
      </div>
        <div className="font-bold text-sm mt-1">
          Button to go back to Animation Screen
        </div>
      </div>
    ),
    audio: "../assets/playButtonAudio.mp3",
    callback: console.log("Last step"),
  },
];

const TwinWalkthrough = () => {
  const handleJoyrideCallback = (data) => {
    const { index, type } = data;

    // Check if it's the last step
    if (type === "step:after" && index === TOUR2_STEPS.length - 1) {
      // Run your function after the last step
      setShowUnityWalkThrough(!showUnityWalkThrough);
    }
  };
  const { showUnityWalkThrough, setShowUnityWalkThrough ,commonElementSize} = useStore();
  return (
    <>
      <JoyRide
        steps={TOUR2_STEPS}
        continuous={true}
        run={commonElementSize=="small" && showUnityWalkThrough}
        showSkipButton={true}
        callback={handleJoyrideCallback}
        hideCloseButton
        scrollToFirstStep
        styles={{
          options: {
            arrowColor: "#e3ffeb",
            backgroundColor: "#e3ffeb",
            overlayColor: "rgba(79, 26, 0, 0.4)",
            primaryColor: "#000",
            textColor: "#004a14",
          },
        }}
      />
    </>
  );
};
export default TwinWalkthrough;
