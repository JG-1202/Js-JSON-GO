export = JsonTransformer;
declare class JsonTransformer extends Builder {
    determineWhatToMap(validResults: any, destinationPath: any): {};
    transform(originPath: any, destinationPath: any, originObject: any, destinationObject: any): void;
}
import Builder = require("../builder");
