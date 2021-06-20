import TextContent from "./TextContent";
import VideoContent from "./VideoContent";
import ImageContent from "./ImageContent";

export default function Card(props) {
  if (props.content.firstContent.type === "text") {
    return (
      <div className="flex w-full h-100 py-7 lg:px-16 flex-col lg:flex-row justify-center lg:justify-between items-center">
        <TextContent content={props.content.firstContent.content} />
        {props.content.secondContent.type === "image" ? (
          <ImageContent
            content={props.content.secondContent.content}
          ></ImageContent>
        ) : (
          <VideoContent content={props.content.secondContent.content} />
        )}
      </div>
    );
  } else {
    return (
      <div className="flex w-full py-7 h-100 lg:px-16 flex-col lg:flex-row justify-center lg:justify-between items-center">
        {props.content.firstContent.type === "image" ? (
          <ImageContent
            content={props.content.firstContent.content}
          ></ImageContent>
        ) : (
          <VideoContent content={props.content.secondContent.content} />
        )}
        <TextContent content={props.content.secondContent.content} />
      </div>
    );
  }
}
