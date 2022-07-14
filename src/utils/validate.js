/**
 * 判断是否为外部资源
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path) // 通过正则判断路径是否以这些字符开头，如果是在属于外部图标
}
