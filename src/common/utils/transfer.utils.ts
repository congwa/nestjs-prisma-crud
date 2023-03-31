/**
 * @name: transfer.utils.ts
 * @author: river
 * @date: 2022/7/9 5:26 下午
 * @contact: laolei@forkway.cn
 * @description：
 */
import * as R from 'ramda';

export class TransferUtils {
  public static filterNum(data: any): any {
    return data.replace(/[^\d]/g, '');
  }

  public static filterEmptyKey(data: Record<string, unknown>): any {
    return Object.keys(data).reduce((acc, key) => {
      if (data[key] && !R.isEmpty(data[key])) {
        acc[key] = data[key];
      }
      return acc;
    }, {});
  }

  public static filterObjectByObject(
    data: Record<string, unknown>,
    rawObject: Record<string, unknown>,
  ): Record<string, unknown> {
    return R.pick(R.keys(rawObject), data);
  }
}
