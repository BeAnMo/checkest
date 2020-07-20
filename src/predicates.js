//@ts-check

export function isString(x) {
    return typeof x === 'string';
}

export function isNumber(x) {
    const type = typeof x;

    if (type === 'bigint') {
        return true;
    } else {
        return type === 'number' && !isNaN(x);
    }
}

export function isBoolean(x) {
    return typeof x === 'boolean';
}

export function isNull(x) {
    return x === null;
}

export function isUndefined(x) {
    return x === undefined;
}

export function isAtom(x) {
    return (
        isString(x) || isNumber(x) || isBoolean(x) || isNull(x) || isUndefined(x)
    );
}

export function isArray(x) {
    return Array.isArray(x);
}

export function isObject(x) {
    return !isArray(x) && !isNull(x) && typeof x === 'object';
}

export function isFunction(x) {
    return typeof x === 'function';
}

export function regexpMatch(pattern) {
    return (x) => pattern.test(x);
}

export function maybe(predicate) {
    return (x) => predicate(x) || true;
}

export function isOneOfValues(...vals) {
    return (x) => vals.some((y) => y === x);
}

export function isOneOf(...predicates) {
    return (x) => predicates.some((p) => p(x));
}

export function isNonEmpty(predicate) {
    return (x) => {
        switch (typeof x) {
            case 'string':
                return x.length > 0 && predicate(x);

            case 'object':
                if (isArray(x)) {
                    return x.length > 0 && predicate(x);
                } else {
                    return Object.keys(x).length > 0 && predicate(x);
                }

            default:
                return predicate(x);
        }
    };
}
