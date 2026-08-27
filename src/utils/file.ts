import type { FileVo } from '@/services'

export const getFileUrl = (file: FileVo) => {
  if (!file.cFilePath || !file.cFileReName || !file.cFileSuffix) {
    return null
  }
  return `${file.cFilePath}${file.cFileReName}${file.cFileSuffix}`
}
