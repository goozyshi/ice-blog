module.exports = {
  write: {
    platform: 'yuque-pwd',
    "yuque-pwd": {
      username: process.env.YUQUE_USERNAME,
      password: process.env.YUQUE_PASSWORD,
      login: process.env.YUQUE_LOGIN,
      repo: process.env.YUQUE_REPO,
      onlyPublic: false,
      onlyPublished: true,
    },
  },
  deploy: {
    platform: 'local',
    local: {
      outputDir: './posts/yuque',
      filename: 'title',
      format: 'markdown',
      catalog: true,
      formatExt: './elog.format.js'
    }
  },
  image: {
    enable: false,
    platform: 'local',
    // 本地
    local: {
      outputDir: './posts/images/yuque',
      prefixKey: '/images',
      pathFollowDoc: false,
    },
    // 阿里云
    oss: {
      secretId: process.env.OSS_SECRET_ID,
      secretKey: process.env.OSS_SECRET_KEY,
      bucket: process.env.OSS_BUCKET,
      region: process.env.OSS_REGION,
      host: process.env.OSS_HOST,
      prefixKey: '',
    },
    // 腾讯云
    cos: {
      secretId: process.env.COS_SECRET_ID,
      secretKey: process.env.COS_SECRET_KEY,
      bucket: process.env.COS_BUCKET,
      region: process.env.COS_REGION,
      host: process.env.COS_HOST,
      prefixKey: '',
    },
  }
}
