import * as React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Search, X } from 'lucide-react';
import { cn, supabase } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';
import { useCamera } from '@/lib/providers/camera-provider';
import { toast } from 'sonner';

export const Route = createFileRoute('/camera')({
    component: CameraComponent,
});

function CameraComponent() {
    const videoRef: MutableRefObject<null | HTMLVideoElement> = useRef(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { takeScreenshotRef } = useCamera();
    const [showCanvas, setShowCanvas] = useState(false);
    const [isAnalysing, setIsAnalysing] = useState(false);
    const navigate = useNavigate();

    const deviceSupported = () => {
        return (
            'mediaDevices' in navigator &&
            'getUserMedia' in navigator.mediaDevices
        );
    };

    const takeScreenshot = async () => {
        if (!videoRef.current || !canvasRef.current) return;

        setIsAnalysing(true);

        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext('2d');
        context?.drawImage(video, 0, 0, canvas.width, canvas.height);

        setShowCanvas(true);

        const base64Image = canvas.toDataURL('image/png');

        canvas.toBlob(async (blob) => {
            if (blob) {
                const file = new File([blob], `${uuidv4()}.png`, {
                    type: 'image/png',
                });
                const imageUrl = await uploadFile(file);
                if (imageUrl) {
                    await analysePlant(imageUrl);
                } else {
                    setShowCanvas(false);
                    setIsAnalysing(false);
                }
            }
        }, 'image/png');
    };

    useEffect(() => {
        console.log(deviceSupported());

        takeScreenshotRef.current = takeScreenshot;

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

        return () => {
            if (videoRef.current) {
                const tracks = (
                    videoRef.current.srcObject as MediaStream
                ).getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, [videoRef, takeScreenshotRef]);

    const uploadFile = async (file: File): Promise<string | null> => {
        const { data } = await supabase.storage
            .from('plants')
            .upload(file.name, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (data) {
            const {
                data: { publicUrl },
            } = supabase.storage.from('plants').getPublicUrl(file.name);

            return publicUrl;
        }
        return null;
    };

    const analysePlant = async (imageUrl: string) => {
        try {
            const response = await fetch(
                'https://rgcbaftxplqejgurmxyx.supabase.co/functions/v1/anilog-plant-recognizer',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        imageUrl,
                    }),
                },
            );

            if (!response.ok) {
                setIsAnalysing(false);
                setShowCanvas(false);
            }

            const data = await response.json();
            console.log(data);

            if (!data.id) {
                throw Error('Plant was NOT recognized!');
            }

            navigate({
                to: '/plants/$plantId',
                params: { plantId: data.id },
                ...(data.new && { search: { new: true } }),
            });
        } catch (error) {
            console.error(error);
            setIsAnalysing(false);
            setShowCanvas(false);
            toast.error('Plant could not be recognized!', {
                style: {
                    bottom: '84px',
                    backgroundColor: '#F53E4D',
                    color: 'white',
                    border: 'none',
                },
                position: 'bottom-center',
            });
        }
    };

    return (
        <div className="absolute top-0 left-0 w-screen h-svh">
            {isAnalysing && (
                <div className="absolute z-20 top-0 flex items-center justify-center w-full h-full">
                    <img src="./analyse-plant.gif" className="w-[50vw]" />
                </div>
            )}
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
                    playsInline
                    className={cn('absolute top-0 max-w-full', {
                        invisible: showCanvas,
                    })}
                ></video>
            </div>
        </div>
    );
}
