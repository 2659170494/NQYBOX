"ui";
//获取MC软件存在



eval(files.read("./m.js"));
var shape = require("./Drawable.js");


//全局设置
var tcolor="#4facfe";
var mcpackageame="com.mojang.minecraftpe";

//网络请求设置
//每日一言
var onesay="获取中"

function mdiurl(icclass,icon){
return "https://cdn.jsdelivr.net/gh/google/material-design-icons/png/"+icclass+"/"+icon+"/materialiconstwotone/48dp/2x/twotone_"+icon+"_black_48dp.png";
}


ui.layout(
<drawer id="drawer">
<vertical>
<appbar>
<toolbar id="toolbar" title="NQYBoxAir" bg="{{tcolor}}">    
<img src="@drawable/ic_extension_black_48dp" tint="#FFFFFF" bg="#00000000" w="20" h="20" margin="16" circle="true"/>
</toolbar>
<tabs id="tabs" bg="#FFFFFF" />
</appbar>
<viewpager id="viewpager">
<frame>
<vertical padding="16">

<horizontal  h="60" gravity="center">
<progressbar id="加载条1" />
<text id="logotext1" text="NQYBox#Loading...." w="*" h="auto" textSize="29" paddingTop="5" paddingBottom="5"/>
</horizontal>

<card w="*" h="90" margin="10 5" cardCornerRadius="6dp"
cardElevation="1dp" gravity="center_vertical">
<vertical padding="18 8" h="auto" w="auto">
<text text="每日一句" textColor="#222222" textSize="16sp"/>
<text id="t_onesay" text="{{onesay}}" textColor="#999999" textSize="14sp"/>
</vertical>
<View id="block_1" h="*" w="10"/>
</card>

<card w="*" h="{{ui_lmc_h}}" margin="10 5" cardCornerRadius="6dp"
cardElevation="1dp" gravity="center_vertical">
<vertical padding="18 8" h="auto">
<text text="启动选项[{{ui_lmc_t}}]" textColor="#222222" textSize="16sp" />
<horizontal>
<button text="启动游戏" textColor="#FFFFFF" id="btn_lgame" />
<button text="卸载游戏" textColor="#fbc2eb" id="btn_dgame" />
</horizontal>
</vertical>
<View id="block_2" h="*" w="10"/>
</card>

<card w="*" h="140" margin="10 5" cardCornerRadius="6dp"
cardElevation="1dp" gravity="center_vertical">
<vertical padding="18 8" h="auto">
<text text="新闻" textColor="#222222" textSize="16sp" />
<progressbar id="加载条2" indeterminate="true" style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal"/>

<horizontal>
<list id="news">
<horizontal bg="?selectableItemBackground" w="auto">
<img w="40" h="40" padding="10" src="{{mdiurl('action','question_answer')}}" tint="#4facfe"/>
<text textColor="{{tcolor}}" textSize="15sp" text="{{this.t}}" layout_gravity="center"/>
</horizontal>
</list>
</horizontal>
</vertical>
<View id="block_3" h="*" w="10"/>
</card>

<card w="*" h="200" margin="10 5" cardCornerRadius="6dp"
cardElevation="1dp" gravity="center_vertical">
<vertical padding="18 8" h="auto">
<text text="呃呃呃" textColor="#222222" textSize="16sp" />
<horizontal>
</horizontal>
</vertical>
<View id="block_4" h="*" w="10"/>
</card>

</vertical>
</frame>
{{/*分割线*/}}
<frame>
<vertical padding="16">

<card w="*" h="200" margin="10 5" cardCornerRadius="6dp"
cardElevation="1dp" gravity="center_vertical" >

</card>
</vertical>
</frame>
{{/*---*/}}
<frame>
<fab id="lmc" w="auto" h="auto" src="@drawable/ic_gavel_black_48dp"
 margin="16" layout_gravity="bottom|right" tint="#ffffff" />
<vertical padding="16">
<horizontal  h="60" gravity="center">
<text id="logotext2" text="工具" w="*" h="auto" textSize="29" paddingTop="5" paddingBottom="5"/>
</horizontal>

<card w="*" h="560" margin="10 5" cardCornerRadius="12dp"
cardElevation="1dp" gravity="center_vertical">
<vertical padding="18 8" h="auto">
<text text="其它工具" textColor="#222222" textSize="16sp"/>
<list id="tools">
<horizontal bg="?selectableItemBackground" w="*">
<img w="60" h="60" padding="12" src="{{this.icon}}" tint="#4facfe"/>
<text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
</horizontal>
</list>
</vertical>
</card>
</vertical>
</frame>

<frame>
<vertical padding="16">
<card w="*" h="220" margin="10 5" cardCornerRadius="12dp"
cardElevation="1dp" gravity="center_vertical">
<vertical padding="18 8" h="auto">
<text text="其它工具" textColor="#222222" textSize="16sp"/>
<list id="tools">
<horizontal bg="?selectableItemBackground" w="*">
<img w="50" h="50" padding="16" src="{{this.icon}}" tint="#4facfe"/>
<text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
<colorbtn text="Go" onClick="{{this.onclick}}" color="{{tcolor}}"/>
</horizontal>
</list>
</vertical>
</card>
</vertical>
</frame>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
        
        <img w="280" h="120" scaleType="fitXY" src="http://box.nqynet.cn/static/img/logo.png?.png"/>
            
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="#4facfe"/>
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
                </horizontal>
            </list>
        </vertical>
    </drawer>
);
setInterval(() => {
    ui.run(function() {
        wvget = http.get("api.klpbbs.com/api/one/mc");
        ui.t_onesay.setText(wvget.body.string())
    })
}, 5000)
function 加载云端数据(s){
wget = http.get("air.box.nqynet.cn/app/data.php?f="+s)
files.create("/sdcard/NQYBoxAir/");
files.create("/sdcard/NQYBoxAir/缓存请求/");
files.writeBytes("/sdcard/NQYBoxAir/缓存请求/"+s+".js", wget.body.bytes());
eval(files.read("/sdcard/NQYBoxAir/缓存请求/"+s+".js"));
ui.post(() => {
files.remove("/sdcard/NQYBoxAir/缓存请求/"+s+".js")
}, 1000);
}


require("./toolbar.js");
require("./styles.js");

ui.post(() => {
    加载云端数据("news")
    wvget = http.get("api.klpbbs.com/api/one/mc");
    ui.t_onesay.setText(wvget.body.string())
    eval(files.read("./tools.js"));
    ui.加载条1.attr("w","0")
    ui.加载条2.attr("h","0")
    ui.logotext1.setText("NQYBox|首页")
}, 3000);
ui.btn_lgame.on("click", ()=>{
});

