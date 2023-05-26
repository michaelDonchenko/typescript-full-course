export default function () {
  // high order generic
  function myMap<Type, U>(array: Type[], mapper: (item: Type) => U): U[] {
    return array.map(mapper);
  }

  const numbers = [1, 2, 3, 4, 5];
  const doubled = myMap(numbers, (x) => x * 2); // doubled is of type number[]

  const strings = ["Hello", "World"];
  const lengths = myMap(strings, (s) => s.length); // lengths is of type number[]

  const objects = [{name: "hi"}, {name: "by"}];
  const mappedNamed = myMap(objects, (person) => person.name); // names from the object

  // Non nullable type
  type NonNullable<T> = T extends null | undefined ? never : T;

  function greet(user: NonNullable<string>): void {
    console.log(`Hello, ${user}!`);
  }

  greet("John"); // Output: Hello, John!
  greet(null); // Compilation error: Argument of type 'null' is not

  // Keyof and Lookup Types:
  interface Person {
    name: string;
    age: number;
    email: string;
    isAdmin: boolean;
  }

  function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }

  const person: Person = {
    name: "John Doe",
    age: 25,
    email: "john@example.com",
    isAdmin: true,
  };

  const name = getProperty(person, "name"); // name is of type string
  const age = getProperty(person, "age"); // age is of type number
  const email = getProperty(person, "email"); // email is of type string

  // Mapped Types:
  type ReadonlyUser = {
    readonly [K in keyof Person]: Person[K];
  };

  const user: ReadonlyUser = {
    name: "John Doe",
    email: "john@example.com",
    age: 22,
    isAdmin: false,
  };

  user.name = "Jane Smith"; // Compilation error: Cannot assign to 'name' because it is a read-only property.

  // example of getting item from local storage with generic type
  function parseFromLocalStorage<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value) as T;
    }
    return null;
  }

  interface User {
    name: string;
    age: number;
  }

  const storedUser = parseFromLocalStorage<User>("user"); // storedUser is of type User | null
}
