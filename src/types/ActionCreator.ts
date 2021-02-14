export interface ActionCreator {
    // Don't know final type of arguments
    // eslint-disable-next-line
    [key: string]: (...args: any) => string;
}
