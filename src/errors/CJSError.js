'use strict';

const kCode = Symbol('code');
const messages = new Map();

/**
 * @param {Error}
 * @returns {CanaryjsError}
 */
function makeCanaryjsError(Base) {
  return class CanaryjsError extends Base {
    constructor(key, ...args) {
      super(message(key, args));
      this[kCode] = key;
      if (Error.captureStackTrace) Error.captureStackTrace(this, CanaryjsError);
    }

    get name() {
      return `${super.name} [${this[kCode]}]`;
    }

    get code() {
      return this[kCode];
    }
  };
}

/**
 * @param {string} key Error key
 * @param {Array<*>} args Arguments to pass for util format or as function args
 * @returns {string} Formatted string
 */
function message(key, args) {
  const msg = messages.get(key);
  
  if (typeof key !== 'string') throw new Error('A key error message must be in string');
  if (!msg) throw new Error(`An invalid key error message was used: ${key}.`);
  
  if (typeof msg === 'function') return msg(...args);
  if (args === undefined || args.length === 0) return msg;
  
  args.unshift(msg);
  return String(...args);
}

/**
 * Register an error code and message.
 * @param {string}
 * @param {*}
 */
function register(sym, val) {
  messages.set(sym, typeof val === 'function' ? val : String(val))
};

module.exports = {
  register,
  Error: makeCanaryjsError(Error),
  TypeError: makeCanaryjsError(TypeError),
  RangeError: makeCanaryjsError(RangeError),
};
