import request from '@/utils/request'

export const getTagList = params => request({ url: `/categories`, method: 'get', params})

export const getArticleDetail = params => request({ url: `/article/${params.id}`, method: 'get', params})

export const addArticle = data => request({ url: `/article`, method: 'post', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, data})
