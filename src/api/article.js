import request from '@/utils/request'

export const getArticleList = params => request({ url: `/article`, method: 'get', params})

export const getArticleDetail = params => request({ url: `/article/${params.id}`, method: 'get', params})



export const addArticle = data => request({ url: `/article`, method: 'post', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, data})


export const modifyArticle = data => request({ url: `/article/${data.id}`, method: 'put', data})


export const deleteArticle = data => request({ url: `/article/${data.id}`, method: 'delete'})

