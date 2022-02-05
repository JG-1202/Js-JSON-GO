export = MapBuilder;
declare class MapBuilder extends Builder {
    determineWhatToBuild({ path, originObject, toBuild }: {
        path: any;
        originObject: any;
        toBuild: any;
    }): void;
    buildWithPlaceholders({ object, path, value, func, originObject, }: {
        object: any;
        path: any;
        value: any;
        func: any;
        originObject: any;
    }): any;
}
import Builder = require("../builder");
