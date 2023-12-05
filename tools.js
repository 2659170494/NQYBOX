function mdiurl(icclass,icon){
return "https://cdn.jsdelivr.net/gh/google/material-design-icons/png/"+icclass+"/"+icon+"/materialiconstwotone/48dp/2x/twotone_"+icon+"_black_48dp.png";
}

ui.tools.setDataSource([
{
    title: "UUID生成",
    icon: mdiurl('action','account_circle'),
    onclick: "tools_uuid();"
},
{
    title: "MD5加密",
    icon: mdiurl('action','lock'),
    onclick: "tools_md5();"
},
{
    title: "短网址",
    icon: mdiurl('action','explore'),
    onclick: "tools_shorturl();"
},
{
    title: "地图编辑器",
    icon: mdiurl('action','dashboard'),
    onclick: ""
},
{
    title: "防封(测试)",
    icon: mdiurl('action','eco'),
    onclick: ""
},
{
    title: "注入器",
    icon: mdiurl('action','grade'),
    onclick: ""
},
{
    title: "随机MC图片",
    icon: mdiurl('image','image'),
    onclick: "tools_dlimg();"
}
    
])
ui.tools.on("item_click", item => {
    switch(item.title){
        case item.title:
            eval(item.onclick);
            break;
    }
})

function tools_uuid(){
wvget = http.get("api.klpbbs.com/api/uuid");
var uuid = wvget.body.string()

builder.setTitle("UUID成功:");
builder.setMessage(uuid);
builder.setIcon(drawable_Id("ic_done_black_48dp"));
builder.setCancelable(true);
builder.setPositiveButton("关闭", new android.content.DialogInterface.OnClickListener({
    onClick: function (dialog, which) {
     dialog.dismiss();
}
}))
builder.setNegativeButton("复制", new android.content.DialogInterface.OnClickListener({
    onClick: function (dialog, which) {
        dialog.dismiss();
        setClip(uuid);
        toast("复制成功")
 }
}))
dialog = builder.create();
dialog.show();
dialog.getButton(android.app.AlertDialog.BUTTON_POSITIVE).setTextColor(android.graphics.Color.RED);
dialog.getButton(android.app.AlertDialog.BUTTON_NEGATIVE).setTextColor(android.graphics.Color.BLUE);

}

function tools_dlimg(){
Snackbar.make(ui.tools, "该工具维护中", Snackbar.LENGTH_SHORT).show();

    /*
var fname_t = random(0,999)+"nmzl"+random(0,666)
fname = $crypto.digest(fname_t, "MD5")
wvget = http.get("https://api.klpbbs.com/api/img/mc");
files.writeBytes("/sdcard/"+fname+".png", wvget.body.bytes());
toast("保存在根目录/"+fname+".png")
*/
}

function tools_md5(){
dialogs.rawInput("输入", "", function(str){
toast("加密中...喵")
if (str == null){
    toast("输入了个寂寞哈哈哈")
}else{
    var md5 = $crypto.digest(str, "MD5");
    builder.setTitle("加密成功惹");
    builder.setMessage(md5);
    builder.setIcon(drawable_Id("ic_done_black_48dp"));
    builder.setCancelable(true);
    builder.setPositiveButton("关闭", new android.content.DialogInterface.OnClickListener({
        onClick: function (dialog, which) {
         dialog.dismiss();
    }
    }))
    builder.setNegativeButton("复制", new android.content.DialogInterface.OnClickListener({
        onClick: function (dialog, which) {
            dialog.dismiss();
            setClip(md5);
            toast("复制成功")
     }
    }))
    dialog = builder.create();
    dialog.show();
    dialog.getButton(android.app.AlertDialog.BUTTON_POSITIVE).setTextColor(android.graphics.Color.RED);
    dialog.getButton(android.app.AlertDialog.BUTTON_NEGATIVE).setTextColor(android.graphics.Color.BLUE);

    
}
});
}


function tools_shorturl(){
dialogs.rawInput("输入长♂网址", "", function(str){
toast("请求中")
if (str == null){
    toast("输入了个寂寞哈哈哈")
}else{
    var wvget = http.get("dwz.mn/create.aspx?format=txt&url="+str)
    var surl = wvget.body.string();
    builder.setTitle("缩短♂成功");
    builder.setMessage(surl);
    builder.setIcon(drawable_Id("ic_done_black_48dp"));
    builder.setCancelable(true);
    builder.setPositiveButton("关闭", new android.content.DialogInterface.OnClickListener({
        onClick: function (dialog, which) {
         dialog.dismiss();
    }
    }))
    builder.setNegativeButton("复制", new android.content.DialogInterface.OnClickListener({
        onClick: function (dialog, which) {
            dialog.dismiss();
            setClip(surl);
            toast("复制成功")
     }
    }))
    dialog = builder.create();
    dialog.show();
    dialog.getButton(android.app.AlertDialog.BUTTON_POSITIVE).setTextColor(android.graphics.Color.RED);
    dialog.getButton(android.app.AlertDialog.BUTTON_NEGATIVE).setTextColor(android.graphics.Color.BLUE);
}
});
}