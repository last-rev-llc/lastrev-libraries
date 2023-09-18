import forOwn from 'lodash/forOwn';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import isNaN from 'lodash/isNaN';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import pull from 'lodash/pull';
import cloneDeep from 'lodash/cloneDeep';

export function pruneEmpty(obj: any) {
  return (function prune(current) {
    forOwn(current, function (value, key) {
      if (
        isUndefined(value) ||
        isNull(value) ||
        isNaN(value) ||
        (isString(value) && isEmpty(value)) ||
        (isObject(value) && key !== 'json' && isEmpty(prune(value)))
      ) {
        delete current[key];
      }
    });
    // remove any leftover undefined values from the delete
    // operation on an array
    if (isArray(current)) pull(current, undefined);

    return current;
  })(cloneDeep(obj)); // Do not modify the original object, create a clone instead
}

export default pruneEmpty;
