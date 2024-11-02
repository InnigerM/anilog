
type FramedImageProps = {
  imgUrl: string;
  width: number;
};

export default function FramedImage({ imgUrl, width }: FramedImageProps) {

  const framePath = "";

  return (<div>
    <img src={imgUrl} alt="" />
    <img src={framePath} alt="" />
  </div>);
}