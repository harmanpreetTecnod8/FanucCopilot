"use client";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Unity, useUnityContext } from "react-unity-webgl";
import Footer from '../components/Footer'
import useStore from '../../StateStore'
import Instructions from "../components/Instructions";
import Chat from "../components/chatbot/Chat";
import Providers from "../components/chatbot/Providers";
import dynamic from 'next/dynamic'
import PlcWindow from "../components/plcWindow/PlcWindow";



const CopilotWalkthrough = dynamic(
    () => import('../components/walkthrough/CopilotWalkthrough'),
    { ssr: false }
)
const TwinWalkthrough = dynamic(
    () => import('../components/walkthrough/TwinWalkthrough'),
    { ssr: false }
)


export default function ProfilePage() {
    const [showPlc, setShowPlc] = useState(false);

    const { showVoiceCommands, setActiveModule, setShowVoiceCommands, commonElementSize, commandName } = useStore();
    const { unityProvider, sendMessage, loadingProgression, isLoaded, addEventListener, removeEventListener } = useUnityContext({
        loaderUrl: "new/Builds.loader.js",
        dataUrl: "new/Builds.data.unityweb",
        frameworkUrl: "new/Builds.framework.js.unityweb",
        codeUrl: "new/Builds.wasm.unityweb",
    });
    const loadingPercentage = Math.round(loadingProgression * 100);
    const [isGameOver, setIsGameOver] = useState(false)

    const handleModuleNameChange = useCallback((activeModuleName) => {
        setIsGameOver(true);
        setActiveModule(activeModuleName === "Home" ? "ASRS" : activeModuleName);
        console.log(activeModuleName)

    }, []);

    useEffect(() => {
        addEventListener("PassModuleName", handleModuleNameChange);
        return () => {
            removeEventListener("PassModuleName", handleModuleNameChange);
        };
    }, [addEventListener, removeEventListener, handleModuleNameChange]);

    return (
        <div id="playground" className="relative w-screen h-screen flex justify-center">
            {/* <TwinWalkthrough />
            <CopilotWalkthrough /> */}
            {/* loader for unity */}
            {!isLoaded && <div className="absolute text-xl text-red-400 w-full h-full justify-center items-center flex flex-col">
                <h1 className="text-yellow-600 mb-16 text-7xl ">ASRS-COPILOT</h1>
                <div className="w-1/2 h-auto bg-gray-200 rounded-md overflow-hidden">
                    <div className=" h-full bg-gray-200 rounded-md overflow-hidden">
                        <div
                            className="h-full w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  transition-all"
                            style={{ width: `${loadingPercentage}%` }}
                        >
                            <p className="text-black p-2 px-4 flex flex-row" >Loading... <span>({loadingPercentage}%)</span></p>
                        </div>
                    </div>
                </div>
            </div>}
            {
                showPlc &&
                <div className="absolute right-0">
                    <PlcWindow setShowPlc={setShowPlc} />
                </div>
            }
            {
                isLoaded && !showPlc &&

                <div className="absolute right-1 h-full flex  items-center ">
                    <div id="btn" onClick={() => setShowPlc(!showPlc)} className="cursor-pointer border bg-green-600 rounded-l-2xl px-2">PLC</div>
                </div>
            }


            {showVoiceCommands && <Instructions setShowVoiceCommands={setShowVoiceCommands} />}

            <div id="ASRS" className="w-full h-full ">
                < Unity id="unityProvider" className={`w-full h-full`} unityProvider={unityProvider} />

            </div>
            {
                !showPlc &&

                <div id="Footer" className={`${isLoaded ? "block" : "hidden"} fixed bottom-5 p-1 w-full `}>

                    {/* <div id="contros"><Footer callUnityFunction={sendMessage} /></div> */}
                    <Providers>

                        <div id="Chatbot" className="absolute bottom-0 right-0"><Chat /></div>
                    </Providers>
                </div>
            }
            {/* {(commandName.length > 0 && isLoaded) &&
                <div id="commandsDisplay" className="text-black text-xl bg-slate-200 opacity-50 rounded p-1 rounded-l absolute bottom-20 mb-2 ">{commandName}</div>
            } */}
        </div>

    )
}