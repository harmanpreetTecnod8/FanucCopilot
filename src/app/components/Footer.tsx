// UiComponent1.js
'use client'
import React, { useState } from 'react';
import useStore from '../../StateStore';
import CommandsMic from '../components/CommandMic'

const Footer = ({ callUnityFunction }) => {
    const { setShowVoiceCommands } = useStore();
    const [isrunning, setIsrunning] = useState(true);
    const toogelAnimaion = () => {
        if (isrunning == true) {

            callUnityFunction("GameManager", "StopASRS");
        }
        else {
            callUnityFunction("GameManager", "PlayASRS");
        }

        setIsrunning(!isrunning);
    }


    return (

        <div className='w-full flex justify-center text-white'>
            {true &&
                <div className='bg-indigo-950 border rounded-xl shadow-lg ring-offset-2 bg-opacity-50 px-2 py-1 '>
                    <div className='copilotFooter flex flex-row justify-center h-full gap-9'>
                        <div>

                            <button className=' m-1 ml-2  shadow-md shadow-gray-500/50 active:animate-spin border hover:border-green-900 
                            text-base   hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                             hover:bg-teal-200 bg-teal-100 text-teal-700 duration-200 ease-in-out border-teal-600
                              transition active:bg-blue-800' onClick={toogelAnimaion}>
                                {
                                    isrunning ? "Stop Asrs" : "Start Asrs"
                                }
                            </button>
                        </div>

                        <div title='Click to give voice commands' className='hover:scale-110 '>
                            <CommandsMic callUnityFunction={callUnityFunction} />
                        </div>
                        <div>
                            <button id='Instruction' className='instructionButton  p-2 px-5  active:bg-blue-800 m-1 mr-2  col-span-1  disabled:bg-blue-50 disabled:cursor-default disabled:scale-100
                                shadow-md shadow-gray-500/50 active:animate-spin border hover:border-green-900 text-base hover:scale-110 focus:outline-none flex justify-center py-2 rounded font-bold
                                 cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 duration-200 ease-in-out border-teal-600 transition' onClick={() => { setShowVoiceCommands(true) }} >
                                Instructions
                            </button>
                        </div>
                    </div>


                </div>
            }
        </div>
    );
};

export default Footer;
