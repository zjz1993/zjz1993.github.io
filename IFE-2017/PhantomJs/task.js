function searchIt(keyword) {
	var webPage = require('webpage');
	var page = webPage.create();
	var dataList = [];
	var result = {};
	var keyword, title, link, i;
	keyword = keyword || '';
	if (keyword) {
		page.open('https://www.baidu.com/s?wd=' + keyword, function(status) {
			var startTime = new Date();
			if (status == "fail") {
				console.log("open failed!");
				result.code = 0;
				result.msg = '抓取失败!';
				console.log(JSON.stringify(result));
				phantom.exit();
			} else if (status == 'success' && page.loadingProgress >= 100) {
				console.log("open successfully!");
				console.log("请稍等，正在抓取中！...");
				page.includeJs('http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js', function() {
					var number = page.evaluate(function() {
						return $('.result').length;
					});
					i = 1;
					while (i <= number) {
						if (page.loadingProgress >= 100) {
							// 获取url
							var link = page.evaluate(function(index) {
								return $('#' + index + ' .f13>a.c-showurl').text();
							}, i)

							// 获取title
							var title = page.evaluate(function(index) {
								return $('#' + index + '>h3').text();
							}, i);

							// 获取描述
							var info = page.evaluate(function(index) {
								return $('#' + index + ' .c-abstract').text();
							}, i);

							dataList.push({
								'title': title,
								'info': info,
								'link': link
							});
							i++;
							if (i > number) {
								result.code = 1;
								result.msg = '抓取成功!';
								result.word = keyword;
								result.dataList = dataList;
								var endTime = new Date();
								var t = endTime - startTime + 'ms';
								result.time = t;
								console.log("抓取完成！数据如下：");
								console.log(JSON.stringify(result));
								break;
							}
						}
					}
					phantom.exit();
				})
			}
		});
	}
}

searchIt('新疆')