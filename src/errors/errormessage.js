'use strict';

const { register } = require('./CJSError');

// Yet to be updated
const ErrorMessage = {
  INVALID_TOKEN: 'The provided token is invalid.',
  FILE_NOT_FOUND: file => `File could not be found: ${file}`,
  WEBHOOK_MESSAGE: 'The message was not sent by a webhook',
};

for (const [name, message] of Object.entries(ErrorMessage)) register(name, message);
