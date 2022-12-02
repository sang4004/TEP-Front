import React, { useEffect } from "react";

type CancellationFunc = () => void;

/**
 * @example
 * useAsyncEffect(
 *   async () => { throw Error("boom!") }
 * ).catch((boom) => {})
 *
 * @example
 * useAsyncEffect(async ({setCancel}) => {
 *   const req = axios.get<Resp>(url, {
 *     cancelToken: new axios.CancelToken(setCancel) // works well with axios
 *   });
 *   await req;
 * }, [url]);
 *
 * @example
 * const [myArray, setMyArray] = useState([]);
 * useAsyncEffect(async ({isStale}) => {
 *   const result = await somethingAsync(id);
 *   if (!isStale()) setMyArray(result);
 * }, [id, somethingAsync]);
 */
export function useAsyncEffect<T extends Promise<void> | void>(
    effect: (util: {
        isStale: () => boolean;
        setCancel: (cancel: CancellationFunc) => void;
    }) => T,
    deps?: React.DependencyList
): T extends Promise<void> ? Promise<void> : void {
    return new Promise<void>((resolve, reject) =>
        useEffect(() => {
            let isStale = false;
            let onCancel: CancellationFunc | undefined;
            const result = effect({
                isStale: () => isStale,
                setCancel: (inCancelFunc: CancellationFunc) =>
                    void (onCancel = inCancelFunc),
            });
            const isPromise = (a: any): a is Promise<void> => a !== undefined;
            if (isPromise(result)) {
                result
                    .then(() => {
                        onCancel = undefined;
                        resolve();
                    })
                    .catch(reject);
            } else {
                resolve();
            }
            return () => {
                isStale = true;
                onCancel?.();
            };
        }, deps)
    ) as any;
}

export default useAsyncEffect;