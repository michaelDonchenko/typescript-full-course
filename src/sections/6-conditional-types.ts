export default function main() {
  // basic example
  interface Animal {
    beCute(): void;
  }
  interface Dog extends Animal {
    woof(): void;
  }

  interface Human {
    talk(): void;
  }

  type Example1 = Dog extends Animal ? number : string;
  type Example2 = Human extends Animal ? number : string;

  // Conditional Types
  interface IdLabel {
    id: number /* some fields */;
  }
  interface NameLabel {
    name: string /* other fields */;
  }
  type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;

  function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
    throw "unimplemented"; // image here a code that returns the proper object
  }

  let a = createLabel("typescript");
  let b = createLabel(2.8);

  // Conditional Type Constraints
  type MessageOf<T extends {message: unknown}> = T["message"];

  interface Email {
    message: string;
  }

  type EmailMessageContents = MessageOf<Email>;

  interface EvenDiggerObject {
    message: string;
    statusCode: number;
    data: Array<string>;
  }

  type MessageType = MessageOf<EvenDiggerObject>;

  // More Examples
  type FileTypes = "mp3" | "mp4" | "pdf" | "zip" | "png" | "gif";
  type FilterMediaFileTypes<T> = T extends "mp3" | "mp4" ? T : never;

  type MediaFileTypes = FilterMediaFileTypes<FileTypes>;
  const mediaFile: MediaFileTypes = "zip";
}
