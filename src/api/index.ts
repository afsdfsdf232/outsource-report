import { get, getDownloadFile } from './request'

// 首页文章列表
export const getHomeArticleList = () => get('/api/homeArticleList')

// 获取热门词
export const getHotWordsList = () => get('/api/hotWordsList')

// 搜索页面列表
export const getArticleList = (data: any) => get('/api/articleList', data)

// 获取分类列表
export const getClassList = () => get('/api/classList')

// 获取数据图片
export const getDataImage = () => get('/api/dataImage')

// 获取详情
export const getArticleDetail = (id: string) => get(`/api/articleDetail/${id}`)

// 下载文件，获取文件流
export const getFileStream = (articleId: string, type: string) => getDownloadFile(`/api/downloadFile/${articleId}/${type}`)

// 获取其它配置信息 （二维码，顶部标题，底部信息）
export const getOtherInfo = () => get('/api/otherInfo')
