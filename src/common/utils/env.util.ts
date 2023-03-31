/**
 * @name: env.util.ts
 * @author: river
 * @date: 2022/6/29 8:22 下午
 * @contact: laolei@forkway.cn
 * @description：
 */

import { EAppEnv } from '../enums';

const isEqual = (env: EAppEnv) => process.env.NODE_ENV === env;

export const isProduction = () => isEqual(EAppEnv.PRODUCTION);

export const isNonProduction = () => !isProduction();

export const isStaging = () => isEqual(EAppEnv.STAGING);

export const isDev = () => isEqual(EAppEnv.DEVELOP);

export const isLocal = () => isEqual(EAppEnv.LOCAL);
export const isTest = () => isEqual(EAppEnv.TEST);

export const isUTA = () => isEqual(EAppEnv.UTA);
