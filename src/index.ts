export default class CircularQueue<T> {
    private capacity;
    private readonly minCapacity;
    private size;
    private head;
    private tail;
    private arr;
    private underCount = 0;

    constructor() {
        this.capacity = 8;
        this.minCapacity = 8;
        this.arr = Array.from<T>({length: 8});
        this.arr.length = this.capacity;
        this.size = 0;
        this.head = 0;
        this.tail = 0;
    }

    push(element: T) {
        if (this.size === this.capacity) {
            this.changeCapacity(this.capacity * 2);
        }

        this.arr[this.tail] = element;
        this.tail = (this.tail + 1) % this.capacity;

        if (this.head === this.tail) {
            this.changeCapacity(this.capacity * 2);
            this.underCount = 0;
        } else if (this.size * 2 < this.capacity && this.capacity > 8) {
            this.underCount++;
            if (this.underCount > 1024 && 0 === this.head) {
                this.underCount = 0;
                this.changeCapacity(this.capacity / 2);
            }
        } else {
            this.underCount = 0;
        }
    }

    pop() {
        if (0 === this.size) {
            return undefined;
        }

        const result = this.arr[this.head];
        this.head = (this.head + 1) % this.capacity;
        this.size--;

        return result;
    }

    private changeCapacity(newCapacity: number) {
        const newArray: T[] = Array.from<T>({length: newCapacity});

        for (let i = 0; i < this.size; ++i) {
            newArray.push(this.arr[(this.head + i) % this.capacity]);
        }

        this.head = 0;
        this.tail = this.size;

        this.arr = newArray;
        this.capacity = newCapacity;
    }
}
