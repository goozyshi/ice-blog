/**
 * 自定义文档插件
 * @param {DocDetail} doc doc的类型定义为 DocDetail
 * @return {Promise<DocDetail>} 返回处理后的文档对象
 */
const matter = require('gray-matter')

function matterMarkdownAdapter(post) {
  let body = post.body
  try {
    const { properties, description } = post
    const props = {
      ...properties,
      description,
      tags: ['语雀'],
      title: properties?.title?.replace(/"/g, ''), // 临时去掉标题中的引号，至少保证文章页面是正常可访问的
    }
    // @ts-ignore js-yaml lineWidth长度为无限
    body = matter.stringify(body, props, { lineWidth: -1 })
  } catch (e) {
  }
  return body
}
const format = async (doc) => {
  if (doc.body) {
    // 将语雀灰色高亮块转成 VitePress 支持的 紫色高亮块
    doc.body = doc.body.replaceAll(':::tips', ':::tip')
    // 将语雀绿色高亮块同样转成 VitePress 支持的 紫色高亮块
    doc.body = doc.body.replaceAll(':::success', ':::tip')
  }
  return matterMarkdownAdapter(doc);
};

module.exports = {
  format,
};