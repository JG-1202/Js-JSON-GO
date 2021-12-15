export = PathTransformer;
declare class PathTransformer extends SettingsLoader {
    elementTransformer(element: any): {
        reference: any;
        string: any;
    } | {
        string: any;
    };
    checkCounter({ char, vars }: {
        char: any;
        vars: any;
    }): void;
    transformPathFromString(path: any): any[];
    transformPath(path: any): any;
}
import SettingsLoader = require("../settingsLoader");
