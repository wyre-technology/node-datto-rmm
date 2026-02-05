/**
 * User types
 */

/**
 * Response for API key reset
 */
export interface ResetApiKeysResponse {
  /** New API key */
  apiKey: string;
  /** New API secret key */
  apiSecretKey: string;
  /** Warning about invalidating previous keys */
  warning?: string;
}
