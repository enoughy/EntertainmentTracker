export class shiftBuff<T> {
  buffer: T[] = [];
  maxSize = 5;
  constructor(sb?: shiftBuff<T>, list?: T[]) {
    if (sb !== undefined) {
      this.buffer = [...sb.buffer];
    }
    if (list !== undefined) {
      this.buffer = list;
    }
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
