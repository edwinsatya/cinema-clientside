import Image from "next/image";

export default function ImageContent({ content }) {
  return (
    <div className="w-full h-full lg:w-6/12">
      <div
        className={`relative h-full ${
          content.animate ? `animate-${content.animate}` : ""
        }`}
      >
        <Image
          src={content.url}
          layout={"fill"}
          objectFit={"contain"}
          sizes={100}
          quality={100}
          alt="card-content"
        />
      </div>
    </div>
  );
}
