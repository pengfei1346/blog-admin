import request from '@/utils/request'

export const getArticleList = params => request({ url: `/article`, method: 'get', params})

export const getArticleDetail = params => request({ url: `/article/${params.id}`, method: 'get', params})

export const addArticle = data => request({ url: `/article`, method: 'post', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, data})

//  @ 2020.2.18 转移项目
export const transferProject = data => request({ url: `/project/transfer/${data.oid}/${data.ownerUid}`, method: 'put', data})

//  员工更新
export const staffUpdate = (data,params) => request({ url: `/import/userInfo/${params.projectId}/${params.releaseJobId}`,headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, method: 'POST', data , params ,responseType: 'blob' })
//  异常记录导出
export const exportRecord = (params) => request({ url: `/attendance/record/export`, method: 'GET' , params , responseType: 'blob' })
