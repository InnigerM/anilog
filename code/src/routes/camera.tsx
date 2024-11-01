import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { MutableRefObject, useEffect, useRef } from 'react'

export const Route = createFileRoute('/camera')({
  component: CameraComponent,
})

function CameraComponent() {
  const videoRef: MutableRefObject<null | HTMLVideoElement> = useRef(null)
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

  return (
    <div>
      <video ref={videoRef} className="bg-default w-[500px] h-[400px]"></video>
    </div>
  )
}
