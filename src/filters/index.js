export const serviceProductType = val => {
  switch (val) {
    case 1:
      return 'BPO'
      break
    case 2:
      return '转移外包'
      break
    case 3:
      return '人事代理'
      break
    case 4:
      return 'RPO'
      break
    case 5:
      return '实习生项目'
      break
    default:
      return null
      break
  }
}

export const sex = val => {
  switch (val) {
    case 0:
      return '未填写'
      break
    case 1:
      return '男'
      break
    case 2:
      return '女'
      break
    default:
      return val
      break
  }
}

export const learnLevel = val => {
  if(!val) {return null}
  switch (val) {
    case 0:
      return '无要求'
      break
    case 1:
      return '高中'
      break
    case 2:
      return '大专'
      break
    case 3:
      return '本科'
      break
    default:
      return null
      break
  }
}

export const workExperience = val => {
  switch (val) {
    case 0:
      return '无'
      break
    case 1:
      return '半年以上'
      break
    case 2:
      return '一年以上'
      break
    case 3:
      return '三年以上'
      break
    case 4:
      return '五年以上'
      break
    default:
      return null
      break
  }
}

export const rowStatus = val => {
  // 1.创建2.项目销售评估中3.项目运营评估中4.项目评估销售未通过5.项目评估运营未通过6.通过(等待上传合同)
  // 7.合同销售审批中8.合同运营审批中 9.合同销售未通过10.合同运营未通过11.合同审批通过12.运营未分配',
  switch (val) {
    case 1:
      return '创建'
      break
    case 2:
      return '项目销售评估中'
      break
    case 3:
      return '项目运营评估中'
      break
    case 4:
      return '项目评估销售未通过'
      break
    case 5:
      return '项目评估运营未通过'
      break
    case 6:
      return '通过'
      break
    case 7:
      return '合同销售审批中'
      break
    case 8:
      return '合同运营审批中'
      break
    case 9:
      return '合同销售未通过'
      break
    case 10:
      return '合同运营未通过'
      break
    // case 11:
    //   return '合同审批通过'
    //   break
    case 12:
      return '运营未分配'
      break
    case 13:
      return '运营中'
      break
    case 14:
      return '运营结束'
      break
    default:
      return null
      break
  }
}

export const name = val => {
  // 1.渠道 2.客户推荐 3.销售
  if (val == 1) {
    return '渠道'
  } else if (val == 2) {
    return '客户推荐'
  } else if (val == 3) {
    return '销售'
  }
}

export const status = val => {
  // 1.初步破冰 2 正在跟进 3.沟通项目 4.准备合同 5.合作客户
  switch (val) {
    case 1:
      return '初步破冰'
      break
    case 2:
      return '正在跟进'
      break
    case 3:
      return '沟通项目'
      break
    case 4:
      return '准备合同'
      break
    case 5:
      return '合作客户'
      break
    case 6:
      return '流失客户'
      break
    default:
      return null
      break
  }
}

export const workStatus = val => {
  // 1.初步破冰 2 正在跟进 3.沟通项目 4.准备合同 5.合作客户
  switch (val) {
    case 5:
      return '待激活'
      break
    case 1:
      return '找工作'
      break
    case 2:
      return '待入职'
      break
    case 3:
      return '在职'
      break
    case 4:
      return '离职'
      break
  }
}

export const scale = val => {
  // 1.初步破冰 2 正在跟进 3.沟通项目 4.准备合同 5.合作客户
  switch (val) {
    case 1:
      return '1-20'
      break
    case 2:
      return '21-199'
      break
    case 3:
      return '200-999'
      break
    case 4:
      return '1000以上'
      break
  }
}

export const parseTime = (time, cFormat) => {
  if (!time)return null
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export const money = val => {
  if(!val)return null
  // console.log(val)
  if(typeof (val) === 'string') {
    val = Number(val)
  }
  return (val/100).toFixed(2)
}

export const jobName = list => {
  if(!list)return null
  return list.join(',')
}

//负责招聘组
export const orgName = (list,name='name') => {
  if(!list)return null
  return list.map(v => v[name]).join(',')
}

export const deliverType = val => {
  switch (val) {
    case 1:
      return '主动投递'
      break
    case 2:
      return '渠道推荐'
      break
    case 3:
      return '招聘推荐'
      break
    case 4:
      return '内推'
      break
  }
}

export const objName = obj => {
  if(!obj)return null
  let newObj = JSON.stringify(obj)
  newObj = newObj.replace(/{/g, "")
  newObj = newObj.replace(/}/g, "")
  newObj = newObj.replace(/"/g, "")
  newObj = newObj.replace(/'/g, "")
  return newObj;
}

export const formatRichText = text => {
  if(!text)return null
  return text.replace(/<[^>]+>/g,"")
}
