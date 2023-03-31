import { langUtil } from '../lang.util';

describe('langUtilTest', () => {
  it('should be defined', () => {
    expect(langUtil).toBeDefined();
  });

  it('should return the correct className', () => {
    class exampleClass {
      public lang: string;
      constructor() {
        this.lang = 'en22';
      }
    }
    expect(langUtil.getClassName(new exampleClass())).toBe('exampleClass');
  });

  it('should return the Nil', () => {
    expect(langUtil.getClassName(null)).toBe('Null');
  });
});
