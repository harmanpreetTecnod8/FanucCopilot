import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlcWindow = ({ setShowPlc }) => {
    const [formData, setFormData] = useState({
        inputs: '',
        outputs: '',
        inputDescriptions: '',
        outputDescriptions: '',
        programObjective: '',
        programType: ''
    });
    const [isProgramGenerating, setIsProgramGenerating] = useState(false);
    const [plcProgram, setPlcProgram] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleType = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // console.log(formData.programType);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProgramGenerating(true);
        try {
            const response = await axios.post('/api/getPlcProgram', formData);
            console.log(response)
            setPlcProgram(response.data);
            setIsProgramGenerating(false);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="max-w-4xl h-screen overflow-scroll overflow-x-hidden mx-auto p-8 bg-black ">
            <div className='flex w-auto'>

                <h1 className="text-3xl font-bold mb-6">PLC Program Generator</h1>
                <div onClick={() => setShowPlc(false)} className='absolute right-5 bg-red-500 top-0 px-2 rounded cursor-pointer'>X</div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 ">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                    Generate PLC Program
                </button>
                {isProgramGenerating && <span className='m-1'>loading...</span>}
                <div className='text-white '>Program Type :
                    <span id="programType"
                        className='w-5/12 m-1 '>

                        <select
                            name="programType"
                            defaultValue={formData.programType}
                            onChange={handleType}
                            className="px-1 w-1/2 py-0 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none text-sm focus:border-indigo-600"
                        >
                            <option value="Ladder_Logic">Ladder Logic</option>
                            <option value="Function_Block_Diagram">Function Block Diagram</option>
                            <option value="Structured_Text">Structured Text</option>
                            <option value="Instruction_List">Instruction List</option>
                            <option value="Sequential_Function_Chart">Sequential Function Chart</option>

                        </select>
                    </span>
                </div>

                {plcProgram && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-2">Generated PLC Program:</h2>
                        <pre className="bg-gray-100 p-4 rounded text-black overflow-scroll">
                            <code>

                                {plcProgram}
                            </code>
                        </pre>
                    </div>
                )}

                <div>
                    <label htmlFor="inputs" className="block font-semibold mb-1 ">
                        Inputs:
                    </label>
                    <textarea
                        id="inputs"
                        name="inputs"
                        value={formData.inputs}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 text-black"
                    />
                </div>
                <div>
                    <label htmlFor="outputs" className="block font-semibold mb-1">
                        Outputs:
                    </label>
                    <textarea
                        id="outputs"
                        name="outputs"
                        value={formData.outputs}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 text-black"
                    />
                </div>
                <div>
                    <label htmlFor="inputDescriptions" className="block font-semibold mb-1">
                        Input Descriptions:
                    </label>
                    <textarea
                        id="inputDescriptions"
                        name="inputDescriptions"
                        value={formData.inputDescriptions}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 text-black"
                    />
                </div>
                <div>
                    <label htmlFor="outputDescriptions" className="block font-semibold mb-1">
                        Output Descriptions:
                    </label>
                    <textarea
                        id="outputDescriptions"
                        name="outputDescriptions"
                        value={formData.outputDescriptions}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 text-black"
                    />
                </div>
                <div>
                    <label htmlFor="programObjective" className="block font-semibold mb-1">
                        Program Objective:
                    </label>
                    <textarea
                        id="programObjective"
                        name="programObjective"
                        value={formData.programObjective}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 text-black"
                    />
                </div>
                {/* <div>
                    <label htmlFor="processFlow" className="block font-semibold mb-1">
                        Process Flow:
                    </label>
                    <textarea
                        id="processFlow"
                        name="processFlow"
                        value={formData.processFlow}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 text-black"
                    />
                </div>
                <div>
                    <label htmlFor="otherProtocols" className="block font-semibold mb-1">
                        Other Protocols:
                    </label>
                    <textarea
                        id="otherProtocols"
                        name="otherProtocols"
                        value={formData.otherProtocols}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 text-black"
                    />
                </div> */}

            </form>

        </div>
    );
};

export default PlcWindow;