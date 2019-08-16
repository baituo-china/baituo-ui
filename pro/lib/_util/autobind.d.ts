/**
 * 绑定方法的this指向当前对象实例.
 *
 * @private
 * @param {Function} target 方法对象
 * @param {string} key 方法名.
 * @param {Object} descriptor 方法描述对象.
 * @returns {Object} 方法描述对象.
 */
export default function autobind(target: any, key: any, descriptor: any): {
    configurable: any;
    enumerable: any;
    get(): any;
    set: (newValue: any) => any;
};
