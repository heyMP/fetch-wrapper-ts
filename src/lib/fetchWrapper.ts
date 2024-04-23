/**
 * Returns the results of fetch as values
 * instead of throwing errors.
 *
 * @example
 * const response = await fetchWrapper(fetch('https://jsonplaceholder.typicode.com/todos'));
 * if ('error' in response) {
 *  console.error(response.error);
 *  return;
 *  }
 *  const data = response.response.json();
 */
export async function fetchWrapper(_fetch: Promise<Response>): Promise<FetchWrapperResponse> {
  try {
    const response = await _fetch;
    if (!response.ok) {
      return { error: response }
    }
    return { response: response }
  } catch (error) {
    if (error instanceof Error) {
      return { error }
    }
    else {
      return { error: error as Error }
    }
  }
}

export type FetchWrapperResponse = 
  | { response: Response }
  | { error: Response | Error }
