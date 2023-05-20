export default function () {
  // Function Type Expressions
  type GreetFunction = (a: string) => void;

  function greeter(fn: GreetFunction) {
    fn("Hello, World");
  }

  function printToConsole(s: string) {
    console.log(s);
  }

  greeter(printToConsole);

  // Call Signatures
  type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
  };

  function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
  }

  function myFunc(someArg: number) {
    return someArg > 3;
  }

  myFunc.description = "default description";

  doSomething(myFunc);

  // Construct Signatures
  type SomeObject = {};
  type SomeConstructor = {
    new (s: string): SomeObject;
  };

  function fn(ctor: SomeConstructor) {
    return new ctor("hello");
  }

  // Generic Functions (generics will be explain deeply in future lectures)
  function firstElement(arr: any[]) {
    return arr[0];
  }
  function firstElementGeneric<Type>(arr: Type[]): Type | undefined {
    return arr[0];
  }

  // s is of type 'string'
  const s = firstElementGeneric(["a", "b", "c"]);
  // n is of type 'number'
  const n = firstElementGeneric([1, 2, 3]);
  // u is of type undefined
  const u = firstElementGeneric([]);

  // Inference
  function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
  }

  // Parameter 'n' is of type 'string'
  // 'parsed' is of type 'number[]'
  const parsed = map(["1", "2", "3"], (n) => parseInt(n));

  // Constrained values
  function minimumLength<Type extends {length: number}>(obj: Type, minimum: number): Type {
    if (obj.length >= minimum) {
      return obj;
    } else {
      return {length: minimum};
    }
  }

  // 'arr' gets value { length: 6 }
  const arr = minimumLength([1, 2, 3], 6);
  // and crashes here because arrays have
  // a 'slice' method, but not the returned object!
  console.log(arr.slice(0));

  // Specifying Type Arguments
  function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2);
  }

  const arr = combine([1, 2, 3], ["hello"]);

  const arr2 = combine<string | number>([1, 2, 3], ["hello"]);

  // Optional Parameters
  function f(n: number) {
    console.log(n.toFixed()); // 0 arguments
    console.log(n.toFixed(3)); // 1 argument
  }

  function f2(x?: number) {
    // ...
  }
  f2(); // OK
  f2(10); // OK

  function myForEach<Type>(arr: Type[], callback: (arg: Type, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
      callback(arr[i], i);
    }
  }

  myForEach([1, 2, 3], (a) => console.log(a));
  myForEach([1, 2, 3], (a, i) => console.log(a, i));

  // Unknown
  function f1(a: any) {
    a.b(); // OK
  }
  function unknownF1(a: unknown) {
    a.b();
  }

  function safeParse(s: string): unknown {
    return JSON.parse(s);
  }

  // Need to be careful with 'obj'!
  const obj = safeParse("someRandomString");

  // Function type
  function doSomething2(f: Function) {
    return f(1, 2, 3);
  }

  doSomething2(function () {
    console.log("hi");
  });
}
