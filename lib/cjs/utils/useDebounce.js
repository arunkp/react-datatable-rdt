"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/**
 *
 * @param func The original, non debounced function (You can pass any number of args to it)
 * @param delay The delay (in ms) for the function to return
 * @returns The debounced function, which will run only if the debounced function has not been called in the last (delay) ms
 */
function useDebounce(func, delay = 1000) {
    const timer = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
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
exports.default = useDebounce;
