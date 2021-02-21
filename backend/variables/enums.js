const loginTypes = Object.freeze({
  PASSWORD: 'password'
});

const bucketTypes = Object.freeze({
  LIST: 'list',
  BOARD: 'board'
});

const memberTypes = Object.freeze({
  ADMIN: 'admin',
  NORMAL: 'normal'
});

module.exports = { loginTypes, bucketTypes, memberTypes };
