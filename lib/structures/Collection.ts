/**
 * Represents a Collection.
 * @extends Map
 * @property {object} baseObject The base object.
 */
export class Collection extends Map {
    public baseObject: object;

    public constructor(baseObject: any) {
        super();

        this.baseObject = baseObject;
    }

    /**
     * Gets an item from the collection.
     * @param {string} key The key to get.
     * @returns {T} Returns the value.
     */
    public get<T extends unknown>(key: any): T {
        return super.get(key);
    }

    /**
     * Sets an item in the collection.
     * @param {any} key The key to set.
     * @param {T} value The value to set.
     * @returns {any} Returns the value.
     */
    public set<T extends unknown>(key: any, value: T): T {
        super.set(key, value);
        return value;
    }
}