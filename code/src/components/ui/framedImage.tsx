import { Link } from "@tanstack/react-router";

type FramedImageProps = {
  imgUrl: string;
  link: string;
};

export default function FramedImage({ imgUrl, link }: FramedImageProps) {

  const framePath = "./img/frame.svg";

  return (<Link to={link} className="flex justify-center">
    <div className="relative flex direction justify-center items-center w-36 h-44">
      <div className="w-24 h-36">
        <img className="size-full object-cover" src={imgUrl} alt="" />
      </div>
      <img className="absolute top-0 size-full -translate-x-px" src={framePath} alt="" />
    </div>
  </Link>);
}