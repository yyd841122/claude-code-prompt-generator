# Claude Code Prompt Generator

**线上访问地址：** https://claude-code-prompt-generator.pages.dev

## 项目简介

这是一个纯前端静态工具站，用于生成适合 Claude Code 和 AI 编程 Agent 使用的结构化 Markdown 提示词。

## 当前功能

- 生成 Claude Code 任务提示词
- 支持 Developer Agent / Tester Agent / Reviewer Agent 等角色
- 支持 Git 提交要求
- 支持测试报告要求
- 支持一键复制
- 支持清空表单
- 支持默认内容兜底

## 技术栈

- HTML
- CSS
- JavaScript
- GitHub
- Cloudflare Pages

## 本地运行

直接用浏览器打开 `index.html` 即可：

```
start index.html
```

无需安装任何依赖，无需构建工具，无需后端服务。

## 部署方式

项目通过 GitHub 连接 Cloudflare Pages 自动部署。推送 `main` 分支即可触发自动构建和部署。

## 后续规划

- 增加更多 Prompt 模板
- 增加多语言支持
- 增加导出 Markdown 功能
- 增加使用示例
- 后续可能接入 AI API
