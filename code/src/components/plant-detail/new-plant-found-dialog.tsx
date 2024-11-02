import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogDescription,
    DialogTitle,
} from '../ui/dialog';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

export default function NewPlantFoundDialog() {
    const [isOpen, setIsOpen] = useState(true);
    const { width, height } = useWindowSize();

    return (
        <>
            <Confetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={1000}
                tweenDuration={10000}
                style={{ zIndex: 9999 }}
            />

            <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>🌱 New plant detected!</DialogTitle>
                        <DialogDescription>
                            Congratulations! You've discovered a plant that
                            hasn't been identified on Anilog before!
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
