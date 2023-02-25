import { useRef, useEffect } from 'react';
/**
 *
 * @param func The original, non debounced function (You can pass any number of args to it)
 * @param delay The delay (in ms) for the function to return
 * @returns The debounced function, which will run only if the debounced function has not been called in the last (delay) ms
 */
export default function useDebounce(func, delay = 1000) {
    const timer = useRef();
    useEffect(() => {
        return () => {
            if (!timer.current)
                return;
            clearTimeout(timer.current);
        };
    }, []);
    const debouncedFunction = ((...args) => {
        const newTimer = setTimeout(() => {
            func(...args);
        }, delay);
        clearTimeout(timer.current);
        timer.current = newTimer;
    });
    return debouncedFunction;
}
