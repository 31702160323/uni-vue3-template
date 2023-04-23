export function setWindowSaturation(sat = 1) {
	const colorMatrix = plus.android.newObject("android.graphics.ColorMatrix")
	plus.android.invoke(colorMatrix, "setSaturation", sat)
	const paint = plus.android.newObject("android.graphics.Paint")
	const colorFilter = plus.android.newObject("android.graphics.ColorMatrixColorFilter", colorMatrix)
	plus.android.invoke(paint, "setColorFilter", colorFilter)
	const window = plus.android.invoke(plus.android.runtimeMainActivity(), "getWindow");
	const decorView = plus.android.invoke(window, "getDecorView")
	plus.android.invoke(decorView, "setLayerType", 2, paint)
	
	plus.android.autoCollection(colorMatrix);
	plus.android.autoCollection(paint);
	plus.android.autoCollection(colorFilter);
	plus.android.autoCollection(window);
	plus.android.autoCollection(decorView);
}