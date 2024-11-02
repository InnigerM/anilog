import React, { createContext, useContext, useRef } from 'react';

const CameraContext = createContext<any>(null);

export const CameraProvider = ({ children }: { children: React.ReactNode }) => {
    const cameraRef = useRef<any>(null);
    const takeScreenshotRef = useRef<(() => Promise<void>) | null>(null);

    const takeScreenshot = async () => {
        if (takeScreenshotRef.current) await takeScreenshotRef.current();
    };

    return (
        <CameraContext.Provider
            value={{ takeScreenshot, cameraRef, takeScreenshotRef }}
        >
            {children}
        </CameraContext.Provider>
    );
};

export const useCamera = () => {
    return useContext(CameraContext);
};
