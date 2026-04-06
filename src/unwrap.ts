/**
 * Defensively unwrap an API response.
 *
 * The Datto RMM API may return data in a wrapper object (e.g. `{ site: { ... } }`)
 * or directly as the resource itself. This helper handles both shapes so callers
 * never receive `undefined`.
 */
export function unwrap<T>(response: Record<string, unknown>, key: string): T {
  if (key in response) {
    return response[key] as T;
  }
  // API returned the object directly without wrapping
  return response as unknown as T;
}
