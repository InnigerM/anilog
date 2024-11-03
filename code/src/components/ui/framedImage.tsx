import { Link, linkOptions, LinkProps } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

type FramedImageProps = {
    imgUrl: string;
    linkOptions?: Omit<LinkProps, 'to' | 'children'>;
    className?: string;
    imageClasses?: string;
};

export default function FramedImage({ imgUrl, linkOptions, className, imageClasses }: FramedImageProps) {
    const framePath = '/img/frame.svg';

    return (
        <Link {...linkOptions} className="flex justify-center">
            <div className={cn('relative flex justify-center items-center w-36 h-44', className)}>
                <div className={cn('w-24 h-36', imageClasses)}>
                    <img
                        className="size-full object-cover"
                        src={imgUrl}
                        alt=""
                    />
                </div>
                <img
                    className="absolute top-0 size-full -translate-x-px"
                    src={framePath}
                    alt=""
                />
            </div>
        </Link>
    );
}
