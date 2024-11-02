
type FramedImageProps = {
  imgUrl: string;
  name: string;
  link: string;
};

export default function FramedImage({ imgUrl, name, link }: FramedImageProps) {

  const framePath = "";

  return (<div>
    <img src={imgUrl} alt="" />
    <img src={framePath} alt="" />
  </div>);
}