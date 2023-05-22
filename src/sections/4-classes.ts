export default function () {
  // Generics Class Example:
  class Box<T> {
    private item: T | undefined;

    addItem(item: T) {
      this.item = item;
    }

    getItem(): T | undefined {
      return this.item;
    }
  }

  const box = new Box<string>();
  box.addItem("Apples");
  console.log(box.getItem()); // Output: Apples

  const anotherBox = new Box<number>();
  anotherBox.addItem(42);
  console.log(anotherBox.getItem()); // Output: 42

  // Abstract Class Example:
  abstract class Shape {
    abstract calculateArea(): number;
  }

  class Rectangle extends Shape {
    width: number;
    height: number;

    constructor(width: number, height: number) {
      super();
      this.width = width;
      this.height = height;
    }

    calculateArea(): number {
      return this.width * this.height;
    }
  }

  const rectangle = new Rectangle(5, 10);
  console.log(rectangle.calculateArea()); // Output: 50

  // Static Methods and Properties Example:
  class MathUtils {
    static PI: number = 3.14159;

    static calculateCircumference(radius: number): number {
      return 2 * MathUtils.PI * radius;
    }
  }

  console.log(MathUtils.PI); // Output: 3.14159
  console.log(MathUtils.calculateCircumference(5)); // Output: 31.4159
}
