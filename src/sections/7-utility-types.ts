export default function () {
  // Awaited
  type A = Awaited<Promise<string>>;
  type B = Promise<string>;
  type C = Awaited<boolean | Promise<number>>;

  // Partial
  interface Todo2 {
    title: string;
    description: string;
  }

  function updateTodo(todo: Todo2, fieldsToUpdate: Partial<Todo>) {
    return {...todo, ...fieldsToUpdate};
  }

  const todo1 = {
    title: "organize desk",
    description: "clear clutter",
  };

  const todo2 = updateTodo(todo1, {
    description: "throw out trash",
  });

  // Required
  interface Props {
    a?: number;
    b?: string;
  }

  const obj: Props = {a: 5};

  const obj2: Required<Props> = {a: 5};

  // Readonly
  interface Todo {
    title: string;
  }

  const todo: Readonly<Todo> = {
    title: "Delete inactive users",
  };

  todo.title = "Hello";

  // Record<Keys, Type>
  interface CatInfo {
    age: number;
    breed: string;
  }

  type CatName = "miffy" | "boris" | "mordred";

  const cats: Record<CatName, CatInfo> = {
    miffy: {age: 10, breed: "Persian"},
    boris: {age: 5, breed: "Maine Coon"},
    mordred: {age: 16, breed: "British Shorthair"},
  };

  cats.boris;

  // Pick<Type, Keys>
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  type TodoPreview = Pick<Todo, "title" | "completed">;

  const partialTodo: TodoPreview = {
    title: "Clean room",
    completed: false,
  };

  partialTodo;

  // Omit<Type, Keys>
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
    createdAt: number;
  }

  type OmittedTodoPreview = Omit<Todo, "description">;

  const omittedTodo: OmittedTodoPreview = {
    title: "Clean room",
    completed: false,
    createdAt: 1615544252770,
  };

  omittedTodo;

  // Exclude<UnionType, ExcludedMembers>
  type T0 = "a" | "b" | "c";

  type T1 = Exclude<T0, "a">;

  type T2 = Exclude<string | number | (() => void), Function>;

  type Shape =
    | {kind: "circle"; radius: number}
    | {kind: "square"; x: number}
    | {kind: "triangle"; x: number; y: number};

  type T3 = Exclude<Shape, {kind: "circle"}>;

  // Extract<Type, Union> the opposite of exclude
  type T4 = Extract<"a" | "b" | "c", "a" | "f">;
  type T5 = Extract<string | number | (() => void), Function>;

  // NonNullable<Type>
  type T6 = NonNullable<string | number | undefined>;
  type T7 = NonNullable<string[] | null | undefined>;

  // Parameters<Type>
  type T8 = Parameters<() => string>;
  type T9 = Parameters<(arg: string) => void>;

  type T10 = (arg: {a: number; b: string}) => void;
  type T11 = Parameters<T10>;

  // ReturnType<Type>
  type T12 = () => null;

  type T13 = ReturnType<T12>;
}
