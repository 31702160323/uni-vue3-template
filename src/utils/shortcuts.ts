const Build: any = plus.android.importClass('android.os.Build')

function getArguments(...args: any): IArguments {
    return args
}

export interface IShortcuts {
    id: string
    icon: string
    path: string
    title: string
    shortLabel: string
}

export function addShortcuts(main: any, shortcuts: IShortcuts[]): boolean {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1) {
        const shortcutManager = main.getSystemService(
            plus.android.getAttribute(main, 'SHORTCUT_SERVICE')
        )
        const shortcutInfoList = plus.android.newObject('java.util.ArrayList')

        try {
            shortcuts.forEach((item) => {
                const intent = plus.android.newObject(
                    'android.content.Intent',
                    'io.dcloud.PandoraEntry'
                )
                plus.android.invoke(
                    intent,
                    'setClassName',
                    ...getArguments(main, 'io.dcloud.PandoraEntryActivity')
                )
                plus.android.invoke(
                    intent,
                    'setFlags',
                    plus.android.getAttribute(intent, 'FLAG_ACTIVITY_NEW_TASK')
                )
                plus.android.invoke(
                    intent,
                    'putExtra',
                    ...getArguments('path', item.path)
                )

                const shortcut = plus.android.newObject(
                    'android.content.pm.ShortcutInfo$Builder',
                    ...getArguments(main, item.id)
                )
                const bitmap = plus.android.invoke(
                    'android.graphics.BitmapFactory',
                    'decodeFile',
                    item.icon
                )
                const icon = plus.android.invoke(
                    'android.graphics.drawable.Icon',
                    'createWithBitmap',
                    bitmap
                )

                plus.android.invoke(
                    shortcut,
                    'setShortLabel',
                    item.shortLabel || item.title
                )
                plus.android.invoke(shortcut, 'setLongLabel', item.title)
                plus.android.invoke(shortcut, 'setIntent', intent)
                plus.android.invoke(shortcut, 'setIcon', icon)

                plus.android.invoke(
                    shortcutInfoList,
                    'add',
                    plus.android.invoke(shortcut, 'build')
                )

                plus.android.autoCollection(icon)
                plus.android.autoCollection(bitmap)
                plus.android.autoCollection(shortcut)
                plus.android.autoCollection(intent)
            })
            return plus.android.invoke(
                shortcutManager,
                'setDynamicShortcuts',
                shortcutInfoList
            )
        } catch (e) {
            console.log(e)
        }
    }
    return false
}

export function removeAll(main: any): boolean {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1) {
        const shortcutManager = main.getSystemService(
            plus.android.getAttribute(main, 'SHORTCUT_SERVICE')
        )
        return plus.android.invoke(shortcutManager, 'removeAllDynamicShortcuts')
    }
    return false
}
