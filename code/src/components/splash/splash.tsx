import { StrokeButton } from '@/components/ui/button';
import { Body } from '@/components/ui/typography';
import { Link } from '@tanstack/react-router';

export function Splash() {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-balloon-flower-purple flex items-center justify-center flex-col gap-8 px-8 py-4 text-justify text-xl">
            <img src="/logo.svg" alt="Anilog logo" />
            <Body className="text-honeysuckle-yellow max-w-[560px]">
                Anilog is a web app that encourages nature exploration by
                rewarding users for discovering new plants.
                Users can earn points for their discoveries. Anilog focuses
                attention on the natural world rather than the screen.
            </Body>

            <Link to="/registration" activeOptions={{ exact: true }}>
                <StrokeButton>Start</StrokeButton>
            </Link>

            <div
                className="absolute bottom-4 w-screen h-3 bg-repeat-x"
                style={{ backgroundImage: 'url(/squiggly-line.svg)' }}
            />
        </div>
    );
}
