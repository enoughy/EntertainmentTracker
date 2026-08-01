export class shiftBuff<T> {
  buffer: T[] = [];
  maxSize = 5;
  push(item: T) {
    if (this.buffer.length >= this.maxSize) {
      this.buffer.shift();
    }
    this.buffer.push(item);
  }
  getValues(): T[] {
    return [...this.buffer];
  }

  // Текущий размер буфера
  get size(): number {
    return this.buffer.length;
  }
}
