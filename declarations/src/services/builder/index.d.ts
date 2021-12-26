export = Builder;
declare class Builder extends Resolver {
    setComplexPath({ object, arrayPath, value, complexIndex, func, }: {
        object: any;
        arrayPath: any;
        value: any;
        complexIndex: any;
        func: any;
    }): void;
    build({ object, path, value, func, }: {
        object: any;
        path: any;
        value: any;
        func: any;
    }): any;
}
import Resolver = require("../resolver");
