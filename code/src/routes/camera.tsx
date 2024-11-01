import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { MutableRefObject, useEffect, useRef } from 'react'

export const Route = createFileRoute('/camera')({
  component: CameraComponent,
})

function CameraComponent() {
  const videoRef: MutableRefObject<null | HTMLVideoElement> = useRef(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const deviceSupported = () => {
    return (
      'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices
    )
  }

  useEffect(() => {
    console.log(deviceSupported())

    const constraints = {
      video: {
        width: {
          min: 1280,
          ideal: 1920,
          max: 2560,
        },
        height: {
          min: 720,
          ideal: 1080,
          max: 1440,
        },
        facingMode: 'environment',
      },
    }

    navigator.mediaDevices.getUserMedia(constraints).then((result) => {
      if (videoRef.current) {
        videoRef.current.srcObject = result
        videoRef.current.play()
      }
    })
  }, [videoRef])

  const takeScreenshot = async () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const context = canvas.getContext('2d')
    context?.drawImage(video, 0, 0, canvas.width, canvas.height)

    const base64Image = canvas.toDataURL('image/png') // Get the image as base64
    console.log('Base64 Image:', base64Image)

    // canvas.toBlob((blob) => {
    //   if (blob) {
    //     const file = new File([blob], 'screenshot.png', { type: 'image/png' })
    //     uploadFile(file)
    //   }
    // }, 'image/png')
  }

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('https://yourfileservice.com/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        console.log('File uploaded successfully')
      } else {
        console.error('Failed to upload file')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  return (
    <div className='w-max-[1440px] mx-auto'>
      <video ref={videoRef} className="bg-default w-[500px] h-[400px]"></video>
      <canvas ref={canvasRef} className='w-[500px] h-[400px]'></canvas>
      <button onClick={() => takeScreenshot()}>takeScreenshot</button>
    </div>
  )
}
