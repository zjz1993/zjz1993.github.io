function Picker(container){
	this.container=container;
	this.mainEle=null;
	this.date=new Date();
	this.selectedEle = null;

	this.init();
}

Picker.prototype={
	days: ['日', '一', '二', '三', '四', '五', '六'],

	init:function(){
		this.mainEle=$('<div></div>')
			.css({
				'width':'350px',
				'height':'400px',
				'border':'1px solid lightblue',
			})
			.appendTo(this.container);

		var p=$('<p></p>')
			.css({
				'text-align':'center',
				'margin':'0',
				'color':'white',
				'backgroundColor':'rgb(255,100,0)',
				'padding':'5px'
			})
			.appendTo(this.mainEle);

		var title=$('<strong></strong>').appendTo(p).addClass('title');

		var arrow_left=$('<strong></strong>')
			.html('<-')
			.css({
				'cursor':'pointer',
				'float':'left'
			})
			.appendTo(p);

		var arrow_right=$('<strong></strong>')
			.html('->')
			.css({
				'cursor':'pointer',
				'float':'right'
			})
			.appendTo(p);

		var clear=$('<div></div>')
			.css('clear','both')
			.appendTo(p);

		function createSpan(){
			var ele=$('<span></span>')
				.css({
					'text-align':'center',
					'width':'50px',
					'height':'50px',
					'display':'inline-block',
					'line-height':'50px',
					'cursor':'pointer'
				});

			return ele;
		};

		for(var i=0;i<7;i++)
		{
			var el=createSpan().html(this.days[i]).appendTo(this.mainEle);
			if(i==0||i==6){
				el.css('color','red')
			}
		}

		// 日期部分
        for (var i = 0; i < 42; i++) {
            var ele = createSpan()
                .css('cursor', 'pointer')
                .appendTo(this.mainEle);
        }

        this.renderDate(this.date);
	},
	renderDate:function(date){
		$('.title').html(date.getFullYear()+'年'+(date.getMonth()+1)+'月');
		// 找到第一个日期 getDate()获取月份的某一天 getDay() 获取某天是星期几 setDate()设置一个月的某一天
		var dat = new Date(date);

        dat.setDate(1);//获取第一天
        dat.setDate(dat.getDate() - dat.getDay());
		console.log(dat.getDate())
        var allSpan = $('span');
        for (var i = 0; i < 42; i++) {
            // 获取显示日子的jq对象
            
            var ele = $(allSpan.get(i + 7)).html(dat.getDate());

            // 不是同月的色彩变淡
             console.log(dat.getMonth())
            if (dat.getMonth() !== date.getMonth()) {
                ele.css('color', 'lightgray');
            } else {
                // 周六日字变红
                if (dat.getDay() === 0 || dat.getDay() === 6) {
                    ele.css('color', 'rgb(200,27,1)');
                } else {
                    ele.css('color', '');
                }
            }

            // 被选中的日期背景变红
            if (dat.getTime() === date.getTime()) {
                ele.css('background-color', 'rgb(200,27,1)').css('color', 'white');
                this.selectedEle = ele;
            }

            dat.setDate(dat.getDate() + 1);
        }
	}
};