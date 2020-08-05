export interface ISelectItem {
  text: string;
  value: any;
}

export class TranslationsHelper {
  private static warn(key: string) {
    const msg = `Missing translation for '${key}'`;
    console.warn(`%c ${msg}`, 'font-size: 12px; color: red');
  }

  public static tEnum(translation: object, enumObject: object): Array<ISelectItem> {
    return Object.values(enumObject).map(key => {
      const existKey = translation.hasOwnProperty(key);

      if (!existKey) {
        TranslationsHelper.warn(key);
      }

      return {text: existKey ? translation[key] : key, value: key};
    });
  }
}
