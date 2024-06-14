import React from 'react'
const commands = [
    { serialNumber: 1, name: 'Show Shuttle', description: 'To show shuttle', when: 'Every time' },
    { serialNumber: 2, name: 'Show Storage', description: 'To show storage', when: 'Every time' },
    { serialNumber: 3, name: 'Show Conveyor', description: 'To show storage', when: 'Every time' },
    { serialNumber: 4, name: 'Show Lifting Mechanism', description: 'To show storage', when: 'Every time' },
    { serialNumber: 5, name: 'Open', description: 'To Open the module and watch Individually', when: 'When watching any module' },
    { serialNumber: 6, name: 'Disassemble', description: 'To disassemble the module into parts', when: 'Only when module is open' },
    { serialNumber: 7, name: 'Assemble', description: 'To Assemble the Moudle', when: 'Only while in Module view is open' },
    { serialNumber: 8, name: 'Go To Home', description: 'To show storage', when: 'Every time' },
    { serialNumber: 9, name: 'Problem 100, 200, 300, 400', description: 'To find where is error  ', when: 'Every time' },
    // { serialNumber: 10, name: 'Walkthrough', description: 'Give instructinos how to use the twin', when: 'Every time' },
    // Add more commnds as needed
];

export default function Instructions({setShowVoiceCommands}) {
    return (
        <div className=" WelcomeMessageWindow Tutorial window fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-700 p-8 rounded-lg shadow-md w-full h-full z-10 bg-opacity-50 flex justify-center items-center">

            <div className='welcomeBox bg-yellow-600 rounded px-3'>

                <div className='flex justify-end m-1'>
                    <button onClick={() => setShowVoiceCommands(false)} className="bg-red-300 text-black px-2 rounded">X</button>

                </div>
                <h1 className="text-4xl text text-black m-2 text-center">VOICE COMMANDS</h1>
                <h2 className='text-white text-sm  text-center' >Click the Mic button. Say and command from the following list</h2>
                <div className="container mx-auto mt-4 mb-4 p-1">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-black">
                                <th className="border border-gray-300 p-2">S.No</th>
                                <th className="border border-gray-300 p-2">Command Name</th>
                                <th className="border border-gray-300 p-2">Command Function</th>
                                <th className="border border-gray-300 p-2">Command Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {commands.map((command) => (
                                <tr key={command.serialNumber}>
                                    <td className="border border-gray-300 p-1">{command.serialNumber}</td>
                                    <td className="border border-gray-300 p-1 text-green-200">{command.name}</td>
                                    <td className="border border-gray-300 p-1">{command.description}</td>
                                    <td className="border border-gray-300 p-1">{command.when}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    )
}
