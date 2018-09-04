# 白鹭引擎 5.2.8 发布日志


---


白鹭引擎在 2018年5月25日 正式发布了 5.2 稳定版本。在 2018年8月27日，我们将发布 5.2.8 稳定版本。本次版本是 5.2 版本的一次集中性缺陷修复


## 2D 渲染 - JavaScript 

* 修复 MovieClip 在 runtime 环境下碰撞检测失效问题（感谢开发者 wssznh）
* 修复 Textinput 移除舞台之后输入框依旧存在的问题（感谢开发者 Troy）
* 修复 addChild 在 runtime 环境下事件派发顺序异常问题（感谢 红豆互动 研发团队）
* 修复视频暂停后实际未暂停问题
* 修复粒子库在 runtime 环境下不派发完成事件问题（感谢开发者 魏晨）

## 命令行

* 修复编译eui项目 exml 排序随机问题

## AssetsManager

* 新增版本控制接口
* 修复 getResAsync 和 getResByUrl 不受最大并发加载线程数量限制问题（感谢开发者 wssznh）
* 修复 getResAsync 和 getResByUrl 加载失败不触发重试问题（感谢开发者 wssznh）
* 修复 loadConfig 传 http 开头的资源异常问题（感谢开发者 小叮当）

## 微信小游戏支持库

微信小游戏支持库请通过 Egret Launcher 将您的项目发布一次微信小游戏的方式进行更新，版本号 1.1.7

* 增加设置音量支持
* 修复 getPixels 和浏览器返回值不一致问题（感谢 红豆互动 研发团队）
* 默认创建项目模板中默认开启声音和二进制文件缓存
* 修复二进制缓存在iOS真机环境下小游戏基础库低于2.2.3版本兼容问题（感谢 上海波克城市网络科技股份有限公司）