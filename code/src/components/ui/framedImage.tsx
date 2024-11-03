import { Link, linkOptions, LinkProps } from '@tanstack/react-router';

type FramedImageProps = {
    imgUrl: string;
    linkOptions?: Omit<LinkProps, 'to' | 'children'>;
};

export default function FramedImage({ imgUrl, linkOptions }: FramedImageProps) {
    const framePath = './img/frame.svg';

    return (
        <Link {...linkOptions} className="flex justify-center">
            <div className="relative flex direction justify-center items-center w-36 h-44">
                <div className="w-24 h-36">
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
