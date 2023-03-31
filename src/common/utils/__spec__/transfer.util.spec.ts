import { TransferUtils } from '@/common/utils/transfer.utils';

describe(`TransferUtil`, () => {
  describe(`filterNum`, () => {
    it('should only produced number left', function () {
      const result = TransferUtils.filterNum('978-7-5086-4858-3');
      expect(result).toBe('9787508648583');
    });
    it('should only produced number left', function () {
      const result = TransferUtils.filterNum('978750ww--aaa8648583');
      expect(result).toBe('9787508648583');
    });
    it('should only produced number left', function () {
      const result = TransferUtils.filterNum('ISBN:978-7-5068-6512-8');
      expect(result).toBe('9787506865128');
    });
  });

  describe(`filterEmptyKey`, () => {
    it('should be defined', function () {
      expect(TransferUtils.filterEmptyKey).toBeDefined();
    });
    it('should filter empty key ', function () {
      const result = TransferUtils.filterEmptyKey({ a: '', b: 'b' });
      expect(result).toEqual({ b: 'b' });
    });
    it('should filter empty key ', function () {
      const result = TransferUtils.filterEmptyKey({ a: '', b: '' });
      expect(result).toEqual({});
    });
    it('should filter empty key ', function () {
      const result = TransferUtils.filterEmptyKey({ a: {}, b: '222' });
      expect(result).toEqual({ b: '222' });
    });
  });

  describe('filterObjectByTypeKey', () => {
    it('should be defined', function () {
      expect(TransferUtils.filterObjectByObject).toBeDefined();
    });

    it('should filter object by raw object key', function () {
      const result = TransferUtils.filterObjectByObject(
        { a: '', b: 'b' },
        { b: '222' },
      );
      expect(result).toEqual({ b: 'b' });
    });

    it('should filter object by raw object key', function () {
      const result = TransferUtils.filterObjectByObject(
        { a: '', b: '' },
        { b: '222', c: '2123' },
      );
      expect(result).toEqual({ b: '' });
    });
  });
});
