export class shiftBuff<T> {
  buffer: T[] = [];
  maxSize = 5;
  constructor(sb?: shiftBuff<T>) {
    if (sb === undefined) {
      return;
    }
    this.buffer = [...sb.buffer];
  }
  push(item: T) {
    if (this.buffer.length >= this.maxSize) {
      this.buffer.shift();
    }
    this.buffer.push(item);
  }
  getValues(): T[] {
    return [...this.buffer];
  }

  get size(): number {
    return this.buffer.length;
  }
}
