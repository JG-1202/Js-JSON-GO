export = Builder;
declare class Builder extends Resolver {
    setComplexPath({ obj, arrayPath, val, complexIndex, }: {
        obj: any;
        arrayPath: any;
        val: any;
        complexIndex: any;
    }): void;
    build(obj: any, path: any, val: any): any;
}
import Resolver = require("../resolver");
