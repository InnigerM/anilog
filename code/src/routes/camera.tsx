import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/camera')({
    component: CameraComponent,
});

function CameraComponent() {
    const videoRef: MutableRefObject<null | HTMLVideoElement> = useRef(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showCanvas, setShowCanvas] = useState(false);

    const deviceSupported = () => {
        return (
            'mediaDevices' in navigator &&
            'getUserMedia' in navigator.mediaDevices
        );
    };

    useEffect(() => {
        console.log(deviceSupported());

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
        };

        navigator.mediaDevices.getUserMedia(constraints).then((result) => {
            if (videoRef.current) {
                videoRef.current.srcObject = result;
                videoRef.current.play();
            }
        });
    }, [videoRef]);

    const takeScreenshot = async () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext('2d');
        context?.drawImage(video, 0, 0, canvas.width, canvas.height);

        setShowCanvas(true);

        // const base64Image = canvas.toDataURL('image/png') // Get the image as base64
        // console.log('Base64 Image:', base64Image)

        // canvas.toBlob((blob) => {
        //   if (blob) {
        //     const file = new File([blob], 'screenshot.png', { type: 'image/png' })
        //     uploadFile(file)
        //   }
        // }, 'image/png')
    };

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://yourfileservice.com/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('File uploaded successfully');
            } else {
                console.error('Failed to upload file');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="absolute top-0 left-0 w-screen h-svh">
            <div className="h-full w-full top-0 left-0 relative bg-black">
                {showCanvas && (
                    <div className="absolute top-0 left-0 w-full justify-end flex p-4 z-50">
                        <X
                            className="cursor-pointer"
                            onClick={() => setShowCanvas(false)}
                        />
                    </div>
                )}
                <canvas
                    ref={canvasRef}
                    className={cn('absolute top-0 max-w-full', {
                        invisible: !showCanvas,
                    })}
                />
                <video
                    ref={videoRef}
                    className={cn('absolute top-0 max-w-full', {
                        invisible: showCanvas,
                    })}
                ></video>
            </div>
            <div className="absolute w-full flex justify-center bottom-0 z-50 p-4">
                {!showCanvas && (
                    <Button
                        className="p-4 rounded-full bg-red-700"
                        onClick={() => takeScreenshot()}
                    >
                        <Camera size={40} />
                    </Button>
                )}
                {showCanvas && (
                    <Button
                        className="p-4 rounded-full bg-red-700"
                        onClick={() => takeScreenshot()}
                    >
                        <Search size={40} />
                    </Button>
                )}
            </div>
        </div>
    );
}
