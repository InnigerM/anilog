
type FramedImageProps = {
  imgUrl: string;
  name: string;
  link: string;
};

export default function FramedImage({ imgUrl, name, link }: FramedImageProps) {

  const framePath = "./img/frame.svg";

  return (<div className="relative flex justify-center items-center w-36 h-44">
    <div className="w-24 h-36">
      <img className="size-full object-cover" src={imgUrl} alt="" />
    </div>
    <img className="absolute top-0 size-full -translate-x-px" src={framePath} alt="" />
  </div>);
}