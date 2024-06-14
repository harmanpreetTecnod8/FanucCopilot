'use client'

import { FC } from 'react'
import ChatInput from './ChatInput'
import ChatMessages from './ChatMessages'
import ChatHeader from './ChatHeader'
import useStore from '../../../StateStore'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

const Chat: FC = () => {
  const { activeModule, setActiveModule } = useStore()

  return (
    <Accordion
      type='single'
      collapsible
      className='relative bg-white z-10 shadow'>
      <AccordionItem value='item-1'>
        <div className='fixed right-8 w-80 bottom-8 bg-white border border-gray-200 rounded-md overflow-hidden'>
          <div className='w-full h-full flex flex-col'>
            <AccordionTrigger className='px-6 border-b border-zinc-300'>
              <ChatHeader />
            </AccordionTrigger>
            <AccordionContent>
              <div className='contextName m-0.5 ml-2'>

                <span className='text-black'>Context :</span>
                <span className='w-auto m-1 '>

                  <select
                    value={activeModule} // Set the selected value based on state
                    onChange={(e) => setActiveModule(e.target.value)}
                    className="px-1 w-auto py-0 text-blue-500 bg-white border rounded-md shadow-sm outline-none appearance-none text-sm focus:border-indigo-600"
                    defaultValue={"ASRS"}
                  >
                    <option value="ASRS" className='text-green-500'>Parent:ASRS</option>
                    <option value="Shuttle">Shuttle</option>
                    <option value="LiftingMechanism">Lifting Mechanism</option>
                    <option value="Conveyer">Conveyer</option>
                    <option value="Storage">Storage</option>


                  </select>
                </span>
              </div>
              <hr />
              <div className='flex flex-col h-80'>
                <ChatMessages className='px-2 py-3 flex-1' />
                <ChatInput className='px-4' />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  )
}

export default Chat
