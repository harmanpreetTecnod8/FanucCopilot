'use client'

import { MessagesContext } from '../../../context/messages'
import { cn } from '../../../lib/utils'
import { Message } from '../../../lib/validators/message'
import { useMutation } from '@tanstack/react-query'
import { CornerDownLeft, Loader2 } from 'lucide-react'
import { nanoid } from 'nanoid'
import { FC, HTMLAttributes, useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import TextareaAutosize from 'react-textarea-autosize'
import Image from 'next/image'
import replayIcon from '../../assets/replayIcon.png'

import { Mic } from './ChatbotMic'
import useStore from '../../../StateStore'

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> { }

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [input, setInput] = useState<string>('')
  const [prevPart, setPrevPart] = useState<string>('');
  const { activeModule, setFaultyPart, faultyPart } = useStore();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(true);

  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext)

  const { mutate: sendMessage, isLoading } = useMutation({
    mutationKey: ['sendMessage'],
    // include message to later use it in onMutate
    mutationFn: async (_message: Message) => {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      })

      return response.body
    },
    onMutate(message) {
      addMessage(message)
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error('No stream')

      // construct new message to add
      const id = nanoid()
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: '',
        activeModule: activeModule
      }

      // add new message to state
      addMessage(responseMessage)

      setIsMessageUpdating(true)

      const reader = stream.getReader()
      const decoder = new TextDecoder()
      let done = false
      let responseTextData = ''


      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)
        responseTextData += chunkValue
      }
      handleConvertToSpeech(responseTextData);
      updateMessage(id, (prev) => prev + responseTextData)
      // setResponseText(responseTextData)
      // clean up
      setIsMessageUpdating(false)
      setInput('')

      setTimeout(() => {
        textareaRef.current?.focus()
      }, 10)
    },
    onError: (_, message) => {
      toast.error('Something went wrong. Please try again.')
      removeMessage(message.id)
      textareaRef.current?.focus()
    },
  }
  )

  const createMessageAndSendMessage = (text: string) => {
    const message: Message = {
      id: nanoid(),
      isUserMessage: true,
      text: text,
      activeModule: activeModule,
    }
    sendMessage(message)

  }

  useEffect(() => {
    if (faultyPart != "" && faultyPart != undefined && faultyPart != null && faultyPart != prevPart) {
      // createMessageAndSendMessage("i am getting error in Lifting Mechannism. it is stuck somewhere, how to solve it")
      createMessageAndSendMessage(`getting an error associated with ${faultyPart}. its motor is not working properly hoe to resolve it`);
      setPrevPart(faultyPart)
      setFaultyPart("")
    }

  }, [faultyPart])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const handleConvertToSpeech = async (text: string) => {
    if (!text) return;

    try {
      const response = await fetch('/api/getAudio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const audioBuffer = await response.arrayBuffer();
        const audioBlob = new Blob([audioBuffer], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        audioRef.current.pause();
      } else {
        console.error('Speech generation failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (audioUrl) {
      if (isPlaying) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioUrl]);
  return (<div {...props} className={cn('border-t border-zinc-300', className)}>


    <div className='relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none'>

      <TextareaAutosize
        ref={textareaRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()

            createMessageAndSendMessage(input)

          }
        }}
        rows={2}
        maxRows={4}
        value={input}
        autoFocus
        disabled={isLoading}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Write a message...'
        className='peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6'
      />

      <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>

        <kbd onClick={() => { if (!isLoading) { createMessageAndSendMessage(input) } }} className='inline-flex items-center rounded border bg-white border-gray-200 px-1 font-sans text-xs text-gray-400'>
          {isLoading ? (
            <Loader2 className='w-3 h-3 animate-spin' />
          ) : (
            <CornerDownLeft className='w-3 h-3' />
          )}
        </kbd>
        <div className='text-black inline-flex items-center mx-1 px-1 ' ><Mic setInput={setInput} /></div>
        <div className='text-black flex justify-center items-center'>
          {audioUrl && (
            <audio ref={audioRef} src={audioUrl} autoPlay={false} />
          )}
          <button className=" right-3 muteButton bg-green-500 rounded-full p-1 " onClick={handlePlayPause}>
            {isPlaying ? (
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=""
              >
                <path
                  d="M19 6C20.5 7.5 21 10 21 12C21 14 20.5 16.5 19 18M16 8.99998C16.5 9.49998 17 10.5 17 12C17 13.5 16.5 14.5 16 15M3 10.5V13.5C3 14.6046 3.5 15.5 5.5 16C7.5 16.5 9 21 12 21C14 21 14 3 12 3C9 3 7.5 7.5 5.5 8C3.5 8.5 3 9.39543 3 10.5Z"
                  stroke="#ffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <Image className='h-[20px] w-[20px] p-0.5' src={replayIcon} alt='replay' />

            )}
          </button>
        </div>
      </div>


    </div>

  </div>
  )
}

export default ChatInput
