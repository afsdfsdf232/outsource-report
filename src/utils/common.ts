export function getFileAndDownload(fileName: string, url: string) {
  return new Promise((resolve, reject) => {
    try {
      const x = new XMLHttpRequest()
      x.open('GET', url, true)
      x.responseType = 'blob'
      x.onload = function (e) {
        const blob = x.response
        if ('msSaveOrOpenBlob' in navigator) { // IE导出
          window.navigator.msSaveOrOpenBlob(blob, fileName)
        } else {
          const a = document.createElement('a')
          a.download = fileName
          a.href = URL.createObjectURL(blob)
          a.id = 'download'
          document.getElementsByTagName('body')[0].append(a)
          a.click()
          if (document.getElementById('download')) {
            (document.getElementById('download') as any).remove()
          }
        }
        resolve(e)
      }
      x.send()
    } catch (err) {
      console.log('err:', err)
      reject(err)
    }
  })
}

export const downloadFile = (data: Blob, filename: string) => {
  // 首先请求接口 返回的数据为res
  if (window.navigator.msSaveOrOpenBlob) {
    // 兼容ie11
    const blobObject = new Blob([data])
    window.navigator.msSaveOrOpenBlob(blobObject, filename)
  } else {
    const url = URL.createObjectURL(new Blob([data]))
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = filename
    a.target = '_blank'
    a.click()
    a.remove()
  }
}

export const getFileName = (url: string) => {
  let fileName: string = url
  const lastIndex = url.lastIndexOf('/')
  if (lastIndex > -1) {
    fileName = url.slice(lastIndex + 1)
  }
  return fileName
}
export type FileTyps = 'pdf' | 'ppt' | 'word' | 'excel'

export enum DownLoadTypes {
  pdf='0',
  ppt='2',
  word = '3',
  excel = '4'
}

export const backTop = (time: number = 30) => {
  const timer = setInterval(function() {
    const osTop = document.documentElement.scrollTop || document.body.scrollTop
    const ispeed = Math.floor(-osTop / 5)
    document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
    if (osTop === 0) {
      clearInterval(timer)
    }
  }, time)
}
