import request from '@/utils/request'

export const getCategories = params => request({ url: `/categories`, method: 'get', params})

export const addCategories = data => request({ url: `/categories`, method: 'post', data})

export const modifyCategories = data => request({ url: `/categories/${data._id}`, method: 'put', data})

export const deleteCategories = params => request({ url: `/categories/${params._id}`, method: 'delete'})

