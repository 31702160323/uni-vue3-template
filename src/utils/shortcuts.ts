const Build: any = plus.android.importClass('android.os.Build');

function newObject(classname: string, ...args: any): PlusAndroidInstanceObject {
    return plus.android.newObject(classname, ...args);
}

function invoke(
    obj: PlusAndroidInstanceObject | PlusAndroidClassObject | string,
    name: string,
    ...args: any
): any {
    return plus.android.invoke(obj, name, ...args);
}

export interface IShortcuts {
    id: string;
    icon: string;
    path: string;
    title: string;
    shortLabel: string;
}

export function addShortcuts(shortcuts: IShortcuts[]): boolean {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1) {
        const main = plus.android.runtimeMainActivity();
        const shortcutManager = invoke(
            main,
            'getSystemService',
            plus.android.getAttribute(main, 'SHORTCUT_SERVICE')
        );
        const shortcutInfoList = newObject('java.util.ArrayList');

        try {
            shortcuts.forEach((item) => {
                const intent = newObject(
                    'android.content.Intent',
                    'io.dcloud.PandoraEntry'
                );
                invoke(
                    intent,
                    'setClassName',
                    main,
                    'io.dcloud.PandoraEntryActivity'
                );
                invoke(intent, 'setFlags', intent, 'FLAG_ACTIVITY_NEW_TASK');
                invoke(intent, 'putExtra', 'path', item.path);

                const shortcut = newObject(
                    'android.content.pm.ShortcutInfo$Builder',
                    main,
                    item.id
                );
                const bitmap = invoke(
                    'android.graphics.BitmapFactory',
                    'decodeFile',
                    item.icon
                );
                const icon = invoke(
                    'android.graphics.drawable.Icon',
                    'createWithBitmap',
                    bitmap
                );

                invoke(
                    shortcut,
                    'setShortLabel',
                    item.shortLabel || item.title
                );
                invoke(shortcut, 'setLongLabel', item.title);
                invoke(shortcut, 'setIntent', intent);
                invoke(shortcut, 'setIcon', icon);

                invoke(shortcutInfoList, 'add', invoke(shortcut, 'build'));

                plus.android.autoCollection(icon);
                plus.android.autoCollection(bitmap);
                plus.android.autoCollection(shortcut);
                plus.android.autoCollection(intent);
            });
            return invoke(
                shortcutManager,
                'setDynamicShortcuts',
                shortcutInfoList
            );
        } catch (e) {
            console.log(e);
        }
    }
    return false;
}

export function removeAll(): boolean {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1) {
        const main = plus.android.runtimeMainActivity();
        const shortcutManager = invoke(
            main,
            'getSystemService',
            plus.android.getAttribute(main, 'SHORTCUT_SERVICE')
        );
        return invoke(shortcutManager, 'removeAllDynamicShortcuts');
    }
    return false;
}


// android.view.View;
// android.graphics.ColorFilter;
// android.graphics.ColorMatrix;
// android.graphics.ColorMatrixColorFilter;
// android.graphics.Paint;
// Paint paint = new Paint();
// ColorMatrix colorMatrix = new ColorMatrix();
// colorMatrix.setSaturation(0.0F);
// paint.setColorFilter((ColorFilter)new ColorMatrixColorFilter(colorMatrix));
// ((Activity) context).getWindow().getDecorView().setLayerType(View.LAYER_TYPE_HARDWARE, paint);
export function setWindowGray(sat: number = 1) {
	const colorMatrix = newObject("android.graphics.ColorMatrix")
	invoke(colorMatrix, "setSaturation", sat)
	const paint = newObject("android.graphics.Paint")
	const colorFilter = newObject("android.graphics.ColorMatrixColorFilter", colorMatrix)
	invoke(paint, "setColorFilter", colorFilter)
	const window = invoke(plus.android.runtimeMainActivity(), "getWindow");
	const decorView = invoke(window, "getDecorView")
	invoke(decorView, "setLayerType", 2, paint)
	
	plus.android.autoCollection(colorMatrix);
	plus.android.autoCollection(paint);
	plus.android.autoCollection(colorFilter);
	plus.android.autoCollection(window);
	plus.android.autoCollection(decorView);
}