export enum EAuthSchema {
  /**
   * no limit
   */
  PUBLIC = 'PUBLIC',

  /**
   * for client user
   */
  CLIENT = 'CLIENT',

  /**
   * for admin user
   */
  ADMIN = 'ADMIN',

  /**
   * for merchant user
   */
  MERCHANT = 'MERCHANT',

  /**
   * for partner backend
   */
  API = 'API',

  /**
   * for internal system
   */
  INTERNAL = 'INTERNAL',

  /**
   * for debug
   */
  DEBUG = 'DEBUG',
}
