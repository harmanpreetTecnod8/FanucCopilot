import React, { useState, useRef } from 'react'

interface MicProps {
    setInput: React.Dispatch<React.SetStateAction<any>>;
}

export const Mic: React.FC<MicProps> = ({ setInput }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isGeneratingText, setIsGeneratingText] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const startTimeRef = useRef(0);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream, {
                mimeType: "audio/webm",
            });
            console.log("Recording started");

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorderRef.current.onstart = () => {
                startTimeRef.current = Date.now();
            };

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
                setIsGeneratingText(true);

                // Creating file from the blob
                const file = new File([audioBlob], "servo.webm", {
                    type: "audio/webm",
                });

                const formData = new FormData();
                formData.append("file", file);

                try {
                    const response = await fetch("/api/getText", {
                        method: "POST",
                        body: formData
                    });

                    const text = await response.json();
                    setInput(text);
                } catch (error) {
                    console.log(error);
                }

                setIsGeneratingText(false);
                chunksRef.current = [];
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleMouseDown = () => {
        if (!isRecording) {
            startRecording();
        }
    };

    const handleMouseUp = () => {
        if (isRecording) {
            stopRecording();
        }
    };

    return (
        <div>
            <button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                disabled={isGeneratingText}
                className={`m-auto flex items-center justify-center rounded-full w-7 h-7 focus:outline-none ${isRecording ? 'bg-blue-900 animate-pulse' : 'bg-blue-400'}`}
            >
                {isGeneratingText ? (
                    <div className="animate-spin text-xl">.</div>
                ) : (
                    <svg
                        viewBox="0 0 256 256"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-black"
                    >
                        <path
                            fill="currentColor"
                            d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
                        />
                    </svg>
                )}
            </button>
        </div>
    )
}

// import React, { useState, useRef } from 'react';

// interface MicProps {
//   setInput: React.Dispatch<React.SetStateAction<any>>;
// }

// const Mic: React.FC<MicProps> = ({ setInput }) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [isGeneratingText, setIsGeneratingText] = useState(false);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const chunksRef = useRef<Blob[]>([]);
//   const startTimeRef = useRef(0);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream, {
//         mimeType: 'audio/webm',
//       });

//       console.log('Recording started');

//       mediaRecorderRef.current.ondataavailable = (e) => {
//         if (e.data.size > 0) {
//           chunksRef.current.push(e.data);
//         }
//       };

//       mediaRecorderRef.current.onstart = () => {
//         startTimeRef.current = Date.now();
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error('Error accessing microphone:', error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const handleMouseDown = () => {
//     if (!isRecording) {
//       startRecording();
//     }
//   };

//   const handleMouseUp = () => {
//     if (isRecording) {
//       stopRecording();
//     }
//   };

//   return (
//     <div>
//       <button
//         onMouseDown={handleMouseDown}
//         onMouseUp={handleMouseUp}
//         disabled={isGeneratingText}
//         className={`m-auto flex items-center justify-center rounded-full w-7 h-7 focus:outline-none ${
//           isRecording ? 'bg-blue-900 animate-pulse' : 'bg-blue-400'
//         }`}
//       >
//         {isGeneratingText ? (
//           <div className="animate-spin text-xl">.</div>
//         ) : (
//           <svg
//             viewBox="0 0 256 256"
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-5 h-5 text-black"
//           >
//             <path
//               fill="currentColor"
//               d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
//             />
//           </svg>
//         )}
//       </button>
//     </div>
//   );
// };

// export default Mic;

// // import React, { useState, useRef } from 'react'

// // interface MicProps {
// //     setInput: React.Dispatch<React.SetStateAction<any>>;
// // }
// // // export const Mic = ({ setInput }) => {
// // export const Mic: React.FC<MicProps> = ({ setInput }) => {
// //     const [isRecording, setIsRecording] = useState(false);
// //     // const mediaRecorderRef = useRef(null);
// //     const [isGeneratingText, setIsGeneratingText] = useState(false)
// //     const mediaRecorderRef = useRef<MediaRecorder | null>(null);
// //     const chunksRef = useRef<Blob[]>([]);
// //     const startTimeRef = useRef(0);

// //     const [handle, setHandle] = useState(false);
// //     const toggleRecording = () => {
// //         if (handle === false) {
// //             startRecording();
// //             setHandle(true);
// //         }
// //         else if (handle === true) {
// //             stopRecording();
// //             setHandle(false);
// //         }
// //     }

// //     const startRecording = async () => {

// //         try {
// //             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
// //             mediaRecorderRef.current = new MediaRecorder(stream, {
// //                 mimeType: "audio/webm",
// //             });
// //             console.log("recordng sratred");

// //             mediaRecorderRef.current.ondataavailable = (e) => {
// //                 if (e.data.size > 0) {
// //                     chunksRef.current.push(e.data);
// //                 }
// //             };

// //             mediaRecorderRef.current.onstart = () => {
// //                 startTimeRef.current = Date.now();
// //             };

// //             mediaRecorderRef.current.onstop = async () => {
// //                 const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
// //                 setIsGeneratingText(true);

// //                 // maiking file from the blob
// //                 var file = new File([audioBlob], "servo.webm", {
// //                     type: "audio/webm",
// //                 });

// //                 const formData = new FormData();
// //                 formData.append("file", file);

// //                 try {
// //                     const response = await fetch("/api/getText", {
// //                         method: "POST",
// //                         body: formData

// //                     })

// //                     const text = await response.json();

// //                     setInput(text);

// //                 } catch (error) {
// //                     console.log(error);


// //                 }

// //                 setIsGeneratingText(false);
// //                 chunksRef.current = [];
// //             };

// //             mediaRecorderRef.current.start();
// //             setIsRecording(true);
// //         } catch (error) {
// //             console.error("Error accessing microphone:", error);
// //         }
// //     };
// //     const stopRecording = () => {
// //         if (mediaRecorderRef.current && isRecording) {
// //             mediaRecorderRef.current.stop();
// //             setIsRecording(false);

// //             // setIsTyping(true);
// //         }
// //     };

// //     return (
// //         <div>
// //             <button onClick={toggleRecording}
// //                 disabled={isGeneratingText}
// //                 className={` m-auto flex items-center justify-center  rounded-full w-7 h-7 focus:outline-none ${isRecording ? 'bg-blue-900 animate-pulse' : 'bg-blue-400'}`}
// //             >
// //                 {isGeneratingText ?

// //                     <div className='animate-spin text-xl'>.</div> :
// //                     <svg
// //                         viewBox="0 0 256 256"
// //                         xmlns="http://www.w3.org/2000/svg"
// //                         className="w-5 h-5 text-black"
// //                     >
// //                         <path
// //                             fill="currentColor" // Change fill color to the desired color
// //                             d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
// //                         />
// //                     </svg>


// //                 }

// //             </button>

// //         </div>
// //     )
// // }
