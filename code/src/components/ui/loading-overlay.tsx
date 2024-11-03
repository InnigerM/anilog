import { useEffect, useState } from 'react';

export const LoadingOverlay: React.FC = () => {
    const loadingMessages = [
        'Uploading image',
        'Analyzing leafs',
        'Finding stem(s)',
        'Looking for flowers',
        'Identifying plant',
        'Gathering plant information',
    ];

    const [loadingMessage, setLoadingMessage] = useState<string>(
        loadingMessages[0],
    );

    useEffect(() => {
        let currentIndex = loadingMessages.findIndex(
            (message) => message === loadingMessage,
        );
        const interval = setTimeout(() => {
            currentIndex += 1;
            if (currentIndex >= loadingMessages.length) {
                clearInterval(interval);
            } else {
                setLoadingMessage(loadingMessages[currentIndex]);
            }
        }, 1500);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [loadingMessages]);

    return (
        <div className="loading-overlay">
            <h1 className="text-xl">{loadingMessage}</h1>
        </div>
    );
};
