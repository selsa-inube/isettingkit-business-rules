const throttleMap = new Map<string, number>();
const THROTTLE_INTERVAL = 1000;

/**
 * This function checks if a certain action is throttled based on the provided key.
 * If the action is throttled, it returns true and does not update the last execution time.
 * @param key - The key to identify the throttled action
 * @returns  {boolean} - True if the action is throttled, false otherwise
 * @example
 * isThrottled("action1"); // returns false if called for the first time
 * isThrottled("action1"); // returns true if called within 1000ms of the first call
 */
const isThrottled = (key: string): boolean => {
  const now = Date.now();
  const last = throttleMap.get(key) || 0;

  if (now - last < THROTTLE_INTERVAL) {
    return true;
  }

  throttleMap.set(key, now);
  return false;
};

export { isThrottled };
