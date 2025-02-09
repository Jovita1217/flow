/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 启用静态导出
  basePath: '/flow', // 替换成你的仓库名
  images: {
    unoptimized: true, // GitHub Pages 不支持 Next.js 的图片优化
  },
}

module.exports = nextConfig