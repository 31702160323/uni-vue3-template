import fs from 'fs'

/** 解析环境变量内容 */
function parse(string: string) {
    const obj: Record<string, string> = {}
    const regExp = '(\\S+)\\s*=\\s*(\\S+)' // 通过正则匹配符合 `A=b` 的结构。如果需要处理带引号的参数，可以优化正则为 `'(\\S+)\\s*=\\s*"(\\S+)"'` 适配双引号，单引号同理
    const list = string.match(new RegExp(regExp, 'g'))
    // 去除空格并组合为键值对
    list?.forEach((item) => {
        const data = item.match(new RegExp(regExp))
        const key = data ? data[1].trim() : undefined
        const value = data ? data[2].trim() : undefined
        if (key !== undefined && value !== undefined) {
            obj[key] = value
        }
    })
    return obj
}

export function replaceManifest(object: Record<string, string>) {
    const manifestPath = './src/manifest.json'
    const Manifest = fs.readFileSync(manifestPath, { encoding: 'utf-8' })

    const ManifestArr = Manifest.split(/\n/)

    for (const key in object) {
        const arr = key.split('.')
        const len = arr.length
        const lastItem = arr[len - 1]

        let i = 0

        for (let index = 0; index < ManifestArr.length; index++) {
            const item = ManifestArr[index]
            if (new RegExp(`"${arr[i]}"`).test(item)) ++i
            if (i === len) {
                const hasComma = /,/.test(item)
                ManifestArr[index] = item.replace(
                    new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`),
                    `"${lastItem}": ${object[key]}${hasComma ? ',' : ''}`
                )
                break
            }
        }
    }

    const newManifest = ManifestArr.join('\n')
    if (Manifest === newManifest) {
        try {
            fs.writeFileSync(manifestPath, newManifest, {
                flag: 'w'
            })
        } catch (error) {
            fs.writeFileSync(manifestPath, Manifest, {
                flag: 'w'
            })
        }
    }
}
