//@ts-check
import { isAtom, isFunction, isArray } from './predicates';

export function check(item, shape) {
  const itemIsAtom = isAtom(item);
  const shapeIsFunc = isFunction(shape);

  if (itemIsAtom && shapeIsFunc) {
    const passed = shape(item);

    return passed
      ? { passed }
      : { passed, error: `Value of ${item} does not match shape.` };
  } else {
    return checkShape(item, shape);
  }
}

function checkShape(item, shape) {
  const itemIsArr = isArray(item);
  const shapeIsArr = isArray(shape);

  if (itemIsArr && shapeIsArr) {
    return checkArray(item, shape);
  } else if (!shapeIsArr && !shapeIsArr) {
    return checkObject(item, shape);
  } else {
    return { passed: false, error: '' };
  }
}

function checkArray(arr, shape, exhaustive = false) {
  if (exhaustive) {
    return { passed: true };
  } else {
    return check(arr[0], shape[0]);
  }
}

function checkObject(obj, shape) {
  if (isFunction(shape)) {
    const passed = shape(obj);

    return passed
      ? { passed }
      : { passed, error: `Object does not match predicate's expectations.` };
  } else {
    const keys = Object.keys(shape);
    const L = keys.length;

    for (let i = 0; i < L; i++) {
      const key = keys[i];

      const checked = check(obj[key], shape[key]);

      if (!checked.passed) {
        return {
          passed: checked.passed,
          error: 'Check failed for "' + key + '."',
        };
      }
    }

    return { passed: true };
  }
}
