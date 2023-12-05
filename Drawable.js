importClass(Packages.android.graphics.drawable.GradientDrawable);
importClass(Packages.android.graphics.LinearGradient);
importClass(Packages.android.graphics.Shader);
importClass(Packages.android.graphics.Paint);
importClass(Packages.android.graphics.drawable.LayerDrawable);
var shape = {};

/**
 * android  dp值转换为像素值
 */
function dp2px(context, value) {
    if (value <= 0) {
        return 0;
    }
    var density = context.getResources().getDisplayMetrics().density;
    return value * density + 0.5;
}

/**
 * 返回一个 int 数组
 */
function toJavaIntArray(arr) {
    var javaArr = util.java.array("int", arr.length);
    for (var i = 0; i < arr.length; i++) {
        javaArr[i] = arr[i];
    }
    return javaArr;
}
/**
 * 返回一个 float 数组
 */
function toJavaFloatArray(arr) {
    var javaArr = util.java.array("float", arr.length);
    for (var i = 0; i < arr.length; i++) {
        javaArr[i] = arr[i];
    }
    return javaArr;
}
//渐变方向
var orientationMap = {
    top_bottom: android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM,
    tr_bl: android.graphics.drawable.GradientDrawable.Orientation.TR_BL,
    right_left: android.graphics.drawable.GradientDrawable.Orientation.RIGHT_LEFT,
    br_tl: android.graphics.drawable.GradientDrawable.Orientation.BR_TL,
    bottom_top: android.graphics.drawable.GradientDrawable.Orientation.BOTTOM_TOP,
    bl_tr: android.graphics.drawable.GradientDrawable.Orientation.BL_TR,
    left_right: android.graphics.drawable.GradientDrawable.Orientation.LEFT_RIGHT,
    tl_br: android.graphics.drawable.GradientDrawable.Orientation.TL_BR
};

/**
 * 控件描边、渐变、虚线对象
 */
function JsGradientDrawable(context) {
    JsGradientDrawable.context = context;
    JsGradientDrawable.cornerRadius = 0;
    JsGradientDrawable.strokeWidth = 0;
    JsGradientDrawable.strokeColor = -1;
    JsGradientDrawable.strokeDashWidth = 0;
    JsGradientDrawable.strokeDashGap = 0;
    JsGradientDrawable.color = -1;
    JsGradientDrawable.colors = [];
    JsGradientDrawable.orientation = android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM;
    JsGradientDrawable.radiusii = [];
    //设置圆角
    JsGradientDrawable.prototype.setCornerRadius = function (radius) {
        JsGradientDrawable.cornerRadius = dp2px(JsGradientDrawable.context, radius);
        return this;
    }
    //设置描边宽度
    JsGradientDrawable.prototype.setStrokeWidth = function (width) {
        JsGradientDrawable.strokeWidth = dp2px(JsGradientDrawable.context, width);
        return this;
    }
    //设置秒变颜色
    JsGradientDrawable.prototype.setStrokeColor = function (strokeColor) {
        JsGradientDrawable.strokeColor = colors.parseColor(strokeColor);
        return this;
    }
    //设置描边长度
    JsGradientDrawable.prototype.setStrokeDashWidth = function (dashWidth) {
        JsGradientDrawable.strokeDashWidth = dp2px(JsGradientDrawable.context, dashWidth);
        return this;
    }
    //设置虚线之间的距离， 为0即为实线
    JsGradientDrawable.prototype.setStrokeDashGap = function (dashGap) {
        JsGradientDrawable.strokeDashGap = dp2px(JsGradientDrawable.context, dashGap);
        return this;
    }
    //设置填充色
    JsGradientDrawable.prototype.setColor = function (color) {
        if (color != undefined && !color.equals("")) {
            JsGradientDrawable.color = colors.parseColor(color);
        }
        return this;
    }
    //设置渐变填充色, 填充色与渐变填充色都设置的话， 优先使用渐变填充色
    JsGradientDrawable.prototype.setColors = function (colorsVal) {
        colorsVal.forEach(function (c) {
            JsGradientDrawable.colors.push(colors.parseColor(c));
        });
        return this;
    }

    //设置渐变方向，默认 上下渐变
    JsGradientDrawable.prototype.setOrientation = function (orientation) {
        var iori = orientationMap[orientation];
        if (iori == undefined) {
            iori = android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM;
        }
        JsGradientDrawable.orientation = iori;
        return this;
    }

    /**
     * 指定控件位置的圆角
     * 参数为数组， 且 数组长度必须 大于或等于 8
     * arr[0] 控件左上 x方向的圆角
     * arr[1] 控件左上 y方向的圆角
     * 
     * arr[2] 控件右上 x方向的圆角
     * arr[3] 控件右上 y方向的圆角
     * 
     * arr[4] 控件右下 x方向的圆角
     * arr[5] 控件右下 y方向的圆角
     * 
     * arr[6] 控件左下 x方向的圆角
     * arr[7] 控件左下 y方向的圆角
     */
    JsGradientDrawable.prototype.setCornerRadii = function (arr) {
        if (arr != undefined && arr != null) {
            if (arr.length < 8) {
                console.log("数组长度必须大于或等于8个");
            }
            else {
                arr.forEach(function (radius) {
                    JsGradientDrawable.radiusii.push(dp2px(JsGradientDrawable.context, radius));
                });
            }
        }
        return this;
    }

    /**
     * 新增多个 ui 控件 设置同一样式
     */
    JsGradientDrawable.prototype.intos = function (views) {
        for (let index = 0; index < views.length; index++) {
            this.into(views[index]);
        }
    }

    //给ui 设置样式
    JsGradientDrawable.prototype.into = function (view) {
        view.setBackground(this.getDrawable());
    }

    // 返回一个 GradientDrawable对象
    JsGradientDrawable.prototype.getDrawable = function () {
        var drawable = new GradientDrawable();
        drawable.setCornerRadius(JsGradientDrawable.cornerRadius);
        drawable.setStroke(JsGradientDrawable.strokeWidth, JsGradientDrawable.strokeColor, JsGradientDrawable.strokeDashWidth, JsGradientDrawable.strokeDashGap);
        if (JsGradientDrawable.color != -1) {
            drawable.setColor(JsGradientDrawable.color);
        }
        if (JsGradientDrawable.colors != null && JsGradientDrawable.colors.length > 0) {
            drawable.setColors(toJavaIntArray(JsGradientDrawable.colors));
        }
        drawable.setOrientation(JsGradientDrawable.orientation);
        if (JsGradientDrawable.radiusii != null && JsGradientDrawable.radiusii.length > 0) {
            drawable.setCornerRadii(toJavaFloatArray(JsGradientDrawable.radiusii));
        }
        drawable.setDither(true);//仿抖动
        return drawable;
    }
}

/**
 * 文字渐变对象
 */
function TextColors() {
    //渐变颜色数组
    TextColors.colors = [];
    //设置颜色数组
    TextColors.prototype.setColors = function (colorsVal) {
        colorsVal.forEach(function (c) {
            TextColors.colors.push(colors.parseColor(c));
        });
        return this;
    }

    /**
     * 新增多个 ui 控件 设置同一样式
     */
    TextColors.prototype.intos = function (views) {
        for (let index = 0; index < views.length; index++) {
            this.into(views[index]);
        }
    }

    TextColors.prototype.into = function (textView) {
        if (TextColors.colors != null && TextColors.colors.length > 0) {
            let jf = new Packages.java.lang.Float(0);
            var mLinearGradient = new LinearGradient(jf, jf, new Packages.java.lang.Float(textView.getPaint().getTextSize() * textView.getText().length), jf, toJavaIntArray(TextColors.colors), null, Shader.TileMode.CLAMP);
            textView.getPaint().setShader(mLinearGradient);
            textView.invalidate();
        }
    }

}

/**
 * 创建 一条虚线对象
 */
function JsLine(context) {
    JsLine.context = context;
    JsLine.strokeColor = -1;
    JsLine.strokeDashWidth = 0;
    JsLine.strokeDashGap = 0;
    JsLine.prototype.setStrokeColor = function (strokeColor) {
        JsLine.strokeColor = strokeColor;
        return this;
    }
    JsLine.prototype.setStrokeDashWidth = function (dashWidth) {
        JsLine.strokeDashWidth = dashWidth;
        return this;
    }
    JsLine.prototype.setStrokeDashGap = function (dashGap) {
        JsLine.strokeDashGap = dashGap;
        return this;
    }

    JsLine.prototype.into = function (view) {
        let params = view.getLayoutParams();
        var drawable = new GradientDrawable();
        let strokeWidth = dp2px(JsLine.context, 2);
        if (params.height == -1 || params.height == -2) {
            params.height = strokeWidth + 2;
            view.setLayoutParams(params);
        } else {
            strokeWidth = params.height - 1;
        }
        drawable.setStroke(strokeWidth, colors.parseColor(JsLine.strokeColor),
            new Packages.java.lang.Float(dp2px(JsLine.context, JsLine.strokeDashWidth)),
            new Packages.java.lang.Float(dp2px(JsLine.context, JsLine.strokeDashGap)));
        drawable.setShape(GradientDrawable.LINE);
        view.setLayerType(1, null);
        view.setBackground(drawable);
    }

    /**
    * 新增多个 ui 控件 设置同一样式
    */
    JsLine.prototype.intos = function (views) {
        for (let index = 0; index < views.length; index++) {
            this.into(views[index]);
        }
    }
}

/**
 * 拓展样式:  创建一个 渐变描边样式的 对象
 * 如果 单色描边JsGradientDrawable满足
 * 可使用 这个JsLinearGradient 渐变描边
 */
function JsLinearGradient(context) {
    JsLinearGradient.context = context;
    JsLinearGradient.cornerRadius = 0;
    JsLinearGradient.strokeWidth = 0;
    JsLinearGradient.colors = [];
    JsLinearGradient.background = "#FFFFFF";
    JsLinearGradient.orientation = "top_bottom";
    JsLinearGradient.prototype.setCornerRadius = function (radius) {
        JsLinearGradient.cornerRadius = dp2px(JsLinearGradient.context, radius);
        return this;
    }
    JsLinearGradient.prototype.setStrokeWidth = function (width) {
        JsLinearGradient.strokeWidth = dp2px(JsLinearGradient.context, width);
        return this;
    }
    JsLinearGradient.prototype.setColors = function (colorsVal) {
        colorsVal.forEach(function (c) {
            JsLinearGradient.colors.push(c);
        });
        return this;
    }
    JsLinearGradient.prototype.setOrientation = function (orientation) {
        JsLinearGradient.orientation = orientation;
        return this;
    }
    JsLinearGradient.prototype.setBackground = function (color) {
        JsLinearGradient.background = color;
        return this;
    }
    JsLinearGradient.prototype.into = function (view) {
        var bgDrawable = new JsGradientDrawable(JsLinearGradient.context)
            .setColors(JsLinearGradient.colors)
            .setCornerRadius(JsLinearGradient.cornerRadius)
            .setOrientation(JsLinearGradient.orientation)
            .getDrawable();

        var foreDrawable2 = new JsGradientDrawable(JsLinearGradient.context)
            .setCornerRadius(JsLinearGradient.cornerRadius)
            .setColors(["#FFFFFF", "#FFFFFF"])
            .getDrawable();

        var foreDrawable = new JsGradientDrawable(JsLinearGradient.context)
            .setCornerRadius(JsLinearGradient.cornerRadius)
            .setColor(JsLinearGradient.background)
            .getDrawable();
        var width = JsLinearGradient.strokeWidth;
        var layerDrawable = new LayerDrawable([bgDrawable, foreDrawable2, foreDrawable]);
        layerDrawable.setLayerInset(1, width, width, width, width);
        layerDrawable.setLayerInset(2, width, width, width, width);
        view.setLayerType(1, null);
        view.setBackground(layerDrawable);
    }

    /**
     * 新增多个 ui 控件 设置同一样式
     */
    JsLinearGradient.prototype.intos = function (views) {
        for (let index = 0; index < views.length; index++) {
            this.into(views[index]);
        }
    }
}

shape.withGradientDrawable = function (context) {
    return new JsGradientDrawable(context);
}

shape.withText = function () {
    return new TextColors();
}

shape.withLinearGradient = function (context) {
    return new JsLinearGradient(context);
}

shape.withLine = function (context) {
    return new JsLine(context);
}
module.exports = shape;
//你自己这个sb写什么代码