export async function retryWrapper(
  fn: () => Promise<any>,
  topic: string,
  heartbeat: () => Promise<void>,
  maxRetries = 3,
  retryInterval = 1000,
) {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await fn();
      return; // If the function succeeds, exit the loop
    } catch (error) {
      retries += 1;
      console.warn(
        `${topic} Attempt ${retries} failed. Retrying in ${retryInterval}ms...`,
        error,
      );
      if (retries >= maxRetries) {
        console.error(`Function failed after ${retries} attempts:`, error);
        return; // Do nothing and move on after max retries
      }
      await heartbeat();
      await new Promise((resolve) => setTimeout(resolve, retryInterval));
    }
  }
}
