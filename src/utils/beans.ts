/**
 * ========================
 * Created with WebStorm.
 * @Author zqzess
 * @Date 2023/08/25 11:23
 * @File sift_client/beans.ts
 * @Version :
 * @Desc :
 * @GitHUb Https://github.com/zqzess
 * ========================
 **/
export declare interface ResultRes {
    code?: string
    msg?: string
    status?: number
    data?: any
    desc?: string
}

export declare interface ResultDef {
    config?: any
    data?: any
    headers?: any
    request?: any
    status?: number
    statusText?: any
}

export declare interface FileItem {
    fileId?: bigint
    fileName: string
    fileSize: bigint
    filePath: string
    fileUploadUserName: string
    fileUploadTime: string
    fileUpdateUserName: string
    fileUpdateTime: string
    fileRank: number
    fileHash: string
    fileType: number
    fileDir: string
    fileMediaType?: number
}
