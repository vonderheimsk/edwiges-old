/**
 * Represents a Collection.
 * @extends Map
 * @property {object} baseObject The base object.
 */
export class Collection<T extends unknown> extends Map {
    public baseObject: any;

    /**
     * Creates a new collection.
     * @param {any} baseObject The base object.
     * @param {any[]} values The values to add.
     */
    public constructor(baseObject?: any, values: any[] = []) {
        super();

        this.baseObject = baseObject;

        if (Array.isArray(values)) {
            for (let i = 0; i < values.length; i++) {
                this.set(values[i].id || values[i].user?.id, values[i]);
            }
        }
    }

    /**
     * Gets an item from the collection.
     * @param {string} key The key to get.
     * @returns {T} Returns the value.
     */
    public get(key: any): T | null {
        return super.get(key);
    }

    /**
     * Sets an item in the collection.
     * @param {any} key The key to set.
     * @param {T} value The value to set.
     * @returns {any} Returns the value.
     */
    public set<A extends any, V extends T>(key: A, value: V): V {
        super.set(key, value);
        return value;
    }

    public random(): T | null {
        let items = []
        for(let val of this.values()) {
            items.push(val);
        }

        return items[Math.floor(Math.random() * items.length)];
    }
}