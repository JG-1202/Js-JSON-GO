export = SettingsLoader;
declare class SettingsLoader extends BasicProcessor {
    constructor({ settings }: {
        settings: any;
    });
    settings: {};
    setSetting({ settingName, settingValue, settingDefault }: {
        settingName: any;
        settingValue: any;
        settingDefault: any;
    }): void;
    loadSettings({ userSettings }: {
        userSettings: any;
    }): void;
}
import BasicProcessor = require("../basicProcessor");
