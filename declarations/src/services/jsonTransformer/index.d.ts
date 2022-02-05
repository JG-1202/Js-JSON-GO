export = JsonTransformer;
declare class JsonTransformer extends MapBuilder {
    determineWhatToMap(validResults: any, destinationPath: any): {};
    transform(originPath: any, destinationPath: any, originObject: any, destinationObject: any): any;
}
import MapBuilder = require("../mapBuilder");
