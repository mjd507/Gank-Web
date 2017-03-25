## Gank Web App

## 目录结构说明
- commons 共用的一些组件，比如 loading，refresh...
- constants、css、img 里的文件 是为 commons 服务的
- lib 库存放一些三方库，如 二维码
- project 每一个小模块开发时都在该目录下进行

## project 下面 frame 模块
在开发时，每个模块的层次结构大致相同，于是提供 frame 这个基础模块，在创建新模块时，直接通过脚本命令，复制 frame 模块，并以自己指定的项目名，自动保存到 project 目录下。

复制项目的脚本命令基于 Linux，故 Windows 无法通过该脚本复制项目，特此说明。

