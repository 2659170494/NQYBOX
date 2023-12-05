coloredButton = (function() {
    //继承ui.Widget
    util.extend(ColoredButton, ui.Widget);

    function ColoredButton() {
        //调用父类构造函数
        ui.Widget.call(this);
        //自定义属性color，定义按钮颜色
        this.defineAttr("color", (view, name, defaultGetter) => {
            return this._color;
        }, (view, name, value, defaultSetter) => {
            this._color = value;
            view.attr("backgroundTint", value);
        });
        //自定义属性onClick，定义被点击时执行的代码
        this.defineAttr("onClick", (view, name, defaultGetter) => {
            return this._onClick;
        }, (view, name, value, defaultSetter) => {
            this._onClick = value;
        });
    }
    ColoredButton.prototype.render = function() {
        return (
            <button textSize="16sp" style="Widget.AppCompat.Button.Colored" w="auto"/>
        );
    }
    ColoredButton.prototype.onViewCreated = function(view) {
        view.on("click", () => {
            if (this._onClick) {
                eval(this._onClick);
            }
        });
    }
    ui.registerWidget("colorbtn", ColoredButton);
    return ColoredButton;
})();
//////
var builder = new android.app.AlertDialog.Builder(activity)
function drawable_Id(imageName) {
    var id = context.getResources().getIdentifier(imageName, "drawable", context.getPackageName());
    return id;
}
//////


var minecraft_app_name=app.getAppName(mcpackageame)
if (minecraft_app_name == null){
    var ui_lmc_t = "未安装国际版"
    var ui_lmc_h= "120"//40
    
}else{
    var ui_lmc_t = "国际版已安装"
    var ui_lmc_h = "120"
}
importClass(android.widget.Toast);
importClass(android.view.View);
let Snackbar = com.google.android.material.snackbar.Snackbar;
