//- JSDoc Comment : JS코드를 건드리지 않고, TS문법 사용없이 TS의 보호를 받고 싶을 떄!
//. 다음과 같이 comment를 작성하면 TS가 이 comment를 읽고 체크한다.

// @ts-check
/**
 * Initializes the project
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns {boolean}
 */
export function init(config) {
  return true;
}

/**
 * Exits the program
 * @param {number} code
 * @returns {number}
 */
export function exit(code) {
  return code + 1;
}
