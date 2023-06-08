'use strict';
const crypto = require('crypto');

exports.main = async (event, context) => {
	// 注意::必须验签请求来源
	const secret = "ea398233b28896da825dd3e4d2f8324034c63abc753881380ef3d5a4b5731dfc"; // uni-ad Web控制台，找到广告位，点击配置激励视频，展开当前广告位项，可看到生成的 Security key
	const trans_id = event.trans_id || "";
	const sign = crypto.createHash('sha256').update(`${secret}:${trans_id}`).digest('hex');
	if (event.sign !== sign) {
		return {
			isValid: false
		};
	}

	return {
		isValid: true
	}
}