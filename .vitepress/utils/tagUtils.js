/**
 * 标签排序
 */
export function initTags(post = []) {
  const data = {}
  for (let index = 0; index < post.length; index++) {
      const element = post[index]
      const tags = element.frontMatter.tags
      if (tags) {
        tags.forEach((item) => {
          if (data[item]) {
            data[item].push(element)
          } else {
            data[item] = []
            data[item].push(element)
          }
        })
      }
  }
  return data
}

/**
 * 年份排序
 */
export function useYearSort(post = []) {
  const data = []
  let year = '0'
  let num = -1
  for (let index = 0; index < post.length; index++) {
    const element = post[index]
    if (element.frontMatter.date) {
      const y = element.frontMatter.date.split('-')[0]
      if (y === year) {
        data[num].push(element)
      } else {
        num++
        data[num] = [] 
        data[num].push(element)
        year = y
      }
    }
  }
  return data
}
