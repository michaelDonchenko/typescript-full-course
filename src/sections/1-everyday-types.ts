export default function () {
  // Primitives string, number, boolean
  type StringType = string;
  type NumberType = number;
  type BooleanType = boolean;

  const someString = "Hello world";
  const someNumber = 10;
  const someBoolean = true;

  // Array
  type ArrayOfStrings = string[];
  type ArrayOfNumbers = Array<NumberType>;

  const someArray = ["Hello", "world"];
  let arrayOfNumbers: ArrayOfNumbers;

  // Type Annotations on Variables
  const myName: string = "Alice";

  // Any
  let obj: any = {x: 0};
  // None of the following lines of code will throw compiler errors.
  // Using `any` disables all further type checking, and it is assumed
  // you know the environment better than TypeScript.
  obj.foo();
  obj();
  obj.bar = 100;
  obj = "hello";
  const n: number = obj;

  // Functions
  // Parameter type annotation
  function greet(name: string) {
    console.log("Hello, " + name.toUpperCase() + "!!");
  }
  // Would be a runtime error if executed!
  greet(42);

  // Return Type Annotations
  function getFavoriteNumber(): number {
    return 26;
  }

  // No type annotations here, but TypeScript can spot the bug
  const names = ["Alice", "Bob", "Eve"];
  // Contextual typing for function
  names.forEach(function (s) {
    console.log(s.toUppercase());
  });

  // Object Types
  // The parameter's type annotation is an object type
  function printCoord(point: {x: number; y: number}) {
    console.log("The coordinate's x value is " + point.x);
    console.log("The coordinate's y value is " + point.y);
  }
  printCoord({x: 3, y: 7});

  // Optional Properties
  function printName(obj: {first: string; last?: string}) {
    // ...
  }
  // Both OK
  printName({first: "Bob"});
  printName({first: "Alice", last: "Alisson"});

  // Union Types
  function printId(id: number | string) {
    console.log("Your ID is: " + id);
  }
  // OK
  printId(101);
  // OK
  printId("202");
  // Error
  printId({myID: 22342});

  // working with union types
  function printId2(id: number | string) {
    if (typeof id === "string") {
      // In this branch, id is of type 'string'
      console.log(id.toUpperCase());
    } else {
      // Here, id is of type 'number'
      console.log(id);
    }
  }

  // another example
  function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
      // Here: 'x' is 'string[]'
      console.log("Hello, " + x.join(" and "));
    } else {
      // Here: 'x' is 'string'
      console.log("Welcome lone traveler " + x);
    }
  }

  // Type Aliases
  type Point = {
    x: number;
    y: number;
  };

  // Exactly the same as the earlier example
  function printCoordWithTypeAliases(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
  }

  printCoordWithTypeAliases({x: 100, y: 100});

  type ID = number | string;

  // Interfaces
  interface PointI {
    x: number;
    y: number;
  }

  // Extending an interface
  interface Animal {
    name: string;
    type: string;
  }

  interface Bear extends Animal {
    honey: boolean;
  }

  const bear: Bear = {
    name: "Poo",
    type: "bear",
    honey: true,
  };

  bear.name;
  bear.type;
  bear.honey;

  // Extending a type
  type AnimalType = {
    name: string;
  };

  type BearType = AnimalType & {
    honey: boolean;
  };

  // Type Assertions
  const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

  // Literal Types
  let x: "hello" = "hello";
  // OK
  x = "hello";
  // ...
  x = "world";

  function printText(s: string, alignment: "left" | "right" | "center") {
    // ...
  }
  printText("Hello, world", "left");
  printText("G'day, mate", "centre");

  // example for numeric literal types
  function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b ? 0 : a > b ? 1 : -1;
  }

  interface Options {
    width: number;
  }
  function configure(x: Options | "auto") {
    // ...
  }
  configure({width: 100});
  configure("auto");
  configure("automatic");

  // Null and undefined
  function doSomething(x: string | null) {
    if (x === null) {
      // do nothing
    } else {
      console.log("Hello, " + x.toUpperCase());
    }
  }

  function liveDangerously(x?: number | null) {
    // No error
    console.log(x?.toFixed());
  }

  // Enums
  enum Direction {
    North,
    South,
    East,
    West,
  }

  let playerDirection: Direction = Direction.North;
  console.log(playerDirection); // Output: 0

  playerDirection = Direction.East;
  console.log(playerDirection); // Output: 2
}
