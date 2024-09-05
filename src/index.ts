export default class CircularQueue<T> {
    private capacity;
    private size;
    private head;
    private tail;
    private arr;
    private underCount = 0;

    constructor() {
        this.capacity = 8;
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

        this.check();
    }

    pushArray(elementList: T[]) {
        if (this.capacity - this.size <= elementList.length) {
            let newCapacity = this.capacity * 2;
            while (newCapacity - this.size <= elementList.length) {
                newCapacity *= 2;
            }

            this.changeCapacity(newCapacity);
        }

        for (const element of elementList) {
            this.arr[this.tail] = element;
            this.tail = (this.tail + 1) % this.capacity;
        }

        this.check();
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

    popArray(count: number) {
        if (0 === this.size) {
            return [];
        }

        if (this.size < count) {
            count = this.size;
        }

        let result: T[];

        if (this.head < this.tail) {
            result = this.arr.slice(this.head, this.head + count);
            this.head += count;
        } else {
            result = [];
            result.length = count;
            for (let i = 0; i < count; ++i) {
                result[i] = this.arr[(this.head + i) % this.capacity];
            }

            this.head += count % this.capacity;
        }

        return result;
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        return 0 === this.size;
    }

    private check() {
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

    private changeCapacity(newCapacity: number) {
        let newArray: T[];

        if (this.head < this.tail) {
            newArray = this.arr.slice(this.head, this.tail);
            newArray.length = newCapacity;
        } else {
            newArray = [];
            newArray.length = newCapacity;
            for (let i = 0; i < this.size; ++i) {
                newArray[i] = this.arr[(this.head + i) % this.capacity];
            }
        }

        this.head = 0;
        this.tail = this.size;

        this.arr = newArray;
        this.capacity = newCapacity;
    }
}
