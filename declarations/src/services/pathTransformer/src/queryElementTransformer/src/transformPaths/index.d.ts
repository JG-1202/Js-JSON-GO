export = transformPaths;
declare function transformPaths(part: any): {
    relativePath: any;
    relativeDepth: number;
} | {
    absolutePath: any;
};
