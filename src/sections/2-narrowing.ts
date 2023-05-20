export default function () {
  // typeof type guards
  /**
     "string"
     "number"
     "bigint"
     "boolean"
     "symbol"
     "undefined"
     "object"
     "function"
   */

  console.log(typeof "Hello");

  function padLeft(padding: number | string, input: string) {
    if (typeof padding === "number") {
      return " ".repeat(padding) + input;
    }
    return padding + input;
  }

  // Truthiness narrowing

  function getUsersOnlineMessage(numUsersOnline: number) {
    if (numUsersOnline) {
      return `There are ${numUsersOnline} online now!`;
    }
    return "Nobody's here. :(";
  }

  // falsy values examples:
  // 0, NaN, "", 0n - zero version on bigint, null, undefined, false

  Boolean("hello"); // type: boolean, value: true
  !!"world"; // type: true,    value: true

  function printAll(strs: string | string[] | null) {
    if (strs && typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }

  // Equality narrowing
  /**
   * TypeScript also uses switch statements and equality checks like ===, !==, ==, and != to narrow types. For example:
   */

  function example(x: string | number, y: string | boolean) {
    if (x === y) {
      // We can now call any 'string' method on 'x' or 'y'.
      x.toUpperCase();
      y.toLowerCase();
    } else {
      console.log(x);
      console.log(y);
    }
  }

  function printAll2(strs: string | string[] | null) {
    if (strs !== null) {
      if (typeof strs === "object") {
        for (const s of strs) {
          console.log(s);
        }
      } else if (typeof strs === "string") {
        console.log(strs);
      }
    }
  }

  interface Container {
    value: number | null | undefined;
  }

  function multiplyValue(container: Container, factor: number) {
    // Remove both 'null' and 'undefined' from the type.
    if (container.value) {
      console.log(container.value);

      // Now we can safely multiply 'container.value'.
      container.value *= factor;
    }
  }

  // The in operator narrowing
  type Fish = {swim: () => void};
  type Bird = {fly: () => void};

  function move(animal: Fish | Bird) {
    if ("swim" in animal) {
      return animal.swim();
    }

    return animal.fly();
  }

  type Fish2 = {swim: () => void};
  type Bird2 = {fly: () => void};
  type Human = {
    swim?: () => void;
    fly?: () => void;
  };

  function move2(animal: Fish2 | Bird2 | Human) {
    if ("swim" in animal) {
      animal;
    } else {
      animal;
    }
  }

  // Instanceof narrowing
  function logValue(x: Date | string) {
    if (x instanceof Date) {
      console.log(x.toUTCString());
    } else {
      console.log(x.toUpperCase());
    }
  }

  // Assignments
  let x2 = Math.random() < 0.5 ? 10 : "hello world!";

  x2 = 1;

  console.log(x2);

  x2 = "goodbye!";

  console.log(x2);

  x2 = true;
  console.log(x2);

  // Using type predicates
  function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
  }

  function getSmallPet(): Fish | Bird {
    return; // imagine this gets a random pet
  }

  const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
  const underWater: Fish[] = zoo.filter(isFish);

  // Discriminated unions
  interface Shape {
    kind: "circle" | "square";
    radius?: number;
    sideLength?: number;
  }

  function handleShape(shape: Shape) {
    // oops!
    if (shape.kind === "rect") {
      // ...
    }
  }

  function getArea(shape: Shape) {
    if (shape.kind === "circle") {
      return Math.PI * shape.radius ** 2;
    }
  }
  /**
   * Hmm, TypeScript still doesn’t know what to do here. We’ve hit a point where we know more about our values than the type checker does.
   * We could try to use a non-null assertion (a ! after shape.radius) to say that radius is definitely present.
   */
  function getArea2(shape: Shape) {
    if (shape.kind === "circle") {
      return Math.PI * shape.radius! ** 2;
    }
  }

  interface Circle {
    kind: "circle";
    radius: number;
  }

  interface Square {
    kind: "square";
    sideLength: number;
  }

  type Shape2 = Circle | Square;

  function getArea3(shape: Shape2) {
    switch (shape.kind) {
      case "circle":
        return Math.PI * shape.radius ** 2;

      case "square":
        return shape.sideLength ** 2;
    }
  }

  // The never type
  // Exhaustiveness checking
  /**
   * The never type is assignable to every type; however, no type is assignable to never (except never itself). 
   * This means you can use narrowing and rely on never turning up to do exhaustive checking in a switch statement.
     For example, 
     adding a default to our getArea function which tries to assign the shape to never will 
     raise an error when every possible case has not been handled.
   */
  interface Triangle {
    kind: "triangle";
    sideLength: number;
  }

  type Shape3 = Circle | Square | Triangle;

  function getArea4(shape: Shape3) {
    switch (shape.kind) {
      case "circle":
        return Math.PI * shape.radius ** 2;
      case "square":
        return shape.sideLength ** 2;
      default:
        const _exhaustiveCheck: never = shape;
        return _exhaustiveCheck;
    }
  }

  getArea4({kind: "triangle", sideLength: 3});

  // another never example
  // this function takes a message and throws an error in this case
  // the function will never return something
  function throwError(message: string): never {
    throw new Error(message);
  }
}
