
ui.viewpager.setTitles(["首页", "资源", "工具","关于"]);
ui.tabs.setupWithViewPager(ui.viewpager);
//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.menu.setDataSource([
  {
      title: "访问官网",
      icon: "@drawable/ic_dashboard_black_48dp"
  },
  {
      title: "Telegram群组",
      icon: "@drawable/ic_airplanemode_active_black_48dp"
  },
  {
      title: "设置主题色",
      icon: "@drawable/ic_color_lens_black_48dp"
  }
]);

ui.menu.on("item_click", item => {
    switch(item.title){
        case "访问官网":
            app.openUrl("http://box.nqynet.cn")
            break;
        case "Telegram群组":
            app.openUrl("https://t.me/NQyBox")
            break;
        case "官方Q群":
            setClip("712677966")
            toast("群号已复制~")
            break;
        case "设置主题色":
            
            break;
    }
})

