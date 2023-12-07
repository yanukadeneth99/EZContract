import Image from "next/image";
import bgImage from "../../../public/background.jpg";
export default function BGImg() {
  return (
    <Image
      src={bgImage}
      placeholder="blur"
      fill
      alt="Background Image"
      sizes="100vw"
      style={{
        objectFit: "cover",
        zIndex: -1,
      }}
    />
  );
}
