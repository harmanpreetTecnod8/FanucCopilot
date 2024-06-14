"use client";

import React from "react";
// Import necessary modules and components
import { useEffect, useState, useRef } from "react";
import useStateStore from '../../StateStore'

// Declare a global interface to add the webkitSpeechRecognition property to the Window object
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

// Export the MicrophoneComponent function component
export default function MicrophoneComponent({ callUnityFunction }) {
  // State variables to manage recording status, completion, and transcript
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState("");
  const { setFaultyPart, faultyPart, setFunctionName,setActiveModule, setCommandName, setCommandMicClicked, commandMicClicked, setIsAssembled, setShowVoiceCommands } = useStateStore();

  // Reference to store the SpeechRecognition instance
  const recognitionRef = useRef<any>(null);

  // Function to start recording
  const startRecording = () => {
    setIsRecording(true);
    // Create a new SpeechRecognition instance and configure it
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    // Event handler for speech recognition results
    recognitionRef.current.onresult = (event: any) => {
      const { transcript } = event.results[event.results.length - 1][0];

      // Log the recognition results and update the transcript state
      console.log(event.results);
      const sring = transcript.toLowerCase();

      setTranscript(sring.replace(/[^\w\s]/gi, ''));
    };

    // Start the speech recognition
    recognitionRef.current.start();
  };

  // Cleanup effect when the component unmounts
  useEffect(() => {
    return () => {
      // Stop the speech recognition if it's active
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);


  const CallUnityFunction = (funName: string) => {
    // setFunctionName(funName);
    handleToggleRecording();
    callUnityFunction("GameManager", funName)

  }
  const CallErrorFunction = (funName: string) => {
    // setTranscript("")
    // setFaultyPart(funName);
    setFaultyPart(funName)
    callUnityFunction("GameManager", "HighLightModule", funName)
    setActiveModule(funName)
    handleToggleRecording();

  }


  //function to implement commands
  useEffect(() => {
    console.log(transcript);
    setCommandName(transcript);

    if (transcript.includes("disassemble")) {
      CallUnityFunction("Dissassemble")
    }
    else if (transcript.includes("assemble")) {
      CallUnityFunction("Assemble")
    }
    else if (transcript.includes("walk through")) {
      CallUnityFunction("WalkThrough")
    }

    else if (transcript.includes("go to home")) {
      CallUnityFunction("Home")
    }
    else if (transcript.includes("open")) {
      CallUnityFunction("ShowCurrentModule")
    }
    else if (transcript.includes("show shuttle") || transcript.includes("show storage")) {
      const moduleName = transcript.split("show")[1].trim();
      console.log(moduleName.charAt(0).toUpperCase() + moduleName.slice(1))
      CallUnityFunction(moduleName.charAt(0).toUpperCase() + moduleName.slice(1))
    }
    else if (transcript.includes("show conveyor")) {

      CallUnityFunction("Conveyer")
    }
    else if (transcript.includes("show lifting mechanism")) {
      CallUnityFunction("LiftingMechanism")
    }
    else if (transcript.includes("problem 300")) {
      CallErrorFunction("LiftingMechanism")
    }
    else if (transcript.includes("problem 100")) {
      CallErrorFunction("Shuttle")
    }
    else if (transcript.includes("problem 400")) {
      CallErrorFunction("Storage")
    }
    else if (transcript.includes("problem 200")) {
      CallErrorFunction("Conveyer")
    }
  }, [transcript]);








  // Function to stop recording
  const stopRecording = () => {
    if (recognitionRef.current) {
      // Stop the speech recognition and mark recording as complete
      recognitionRef.current.stop();
      setRecordingComplete(true);
    }
  };

  // Toggle recording state and manage recording actions
  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  // Render the microphone component with appropriate UI based on recording state
  return (
    <div className="flex flex-col items-center justify-center w-full mt-1 shadow-lg">
      {/* <button onClick={() => CallErrorFunction("LiftingMechanism")} >error 100</button> */}
      <div className="commandMicButton flex items-center">
        {isRecording ? (
          // Button for stopping recording
          <button
            onClick={handleToggleRecording}
            className=" m-auto flex items-center justify-center bg-blue-400 hover:bg-blue-500 rounded-full w-10 h-10 focus:outline-none animate-pulse"
          >
            <svg
              className="h-6 w-6 "
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          </button>
        ) : (
          // Button for starting recording
          <button
            onClick={() => {
              handleToggleRecording();
              setCommandMicClicked(!commandMicClicked);
            }}
            className=" m-auto flex items-center justify-center bg-green-400 hover:bg-green-500 rounded-full w-10 h-10 shadow-md shadow-gray-500/50  focus:outline-none"
          >
            <svg
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
            >
              <path
                fill="currentColor" // Change fill color to the desired color
                d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
              />
            </svg>
          </button>
        )}


      </div>

    </div>
  );
}