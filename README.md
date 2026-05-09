# Claude Code Prompt Generator

**线上访问地址：** https://claude-code-prompt-generator.pages.dev

## 项目简介

Claude Code Prompt Generator is a lightweight static tool for creating structured prompts for Claude Code and AI coding agents.

## Language Strategy

- The product name and SEO metadata are kept in English.
- The homepage uses bilingual copy to support both search visibility and Chinese-speaking users.

## Product Positioning

Claude Code Prompt Generator is a lightweight static tool for creating structured prompts for Claude Code and AI coding agents. No installation, no backend, no AI API key required.

## 当前功能

- 生成 Claude Code 任务提示词
- 支持 Developer Agent / Tester Agent / Reviewer Agent 等角色
- 支持 Git 提交要求
- 支持测试报告要求
- 支持一键复制
- 支持清空表单
- 支持默认内容兜底

## Target Users

- Developers
- Solo founders
- AI coding learners
- Multi-agent workflow builders

## Use Cases

- Generate developer task prompts
- Generate tester/reviewer prompts
- Define Git and testing requirements
- Create reusable prompt templates for AI coding workflows

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

## Prompt Examples

当前支持 3 个内置示例：

- **Build a login page / 创建登录页** — 让 Developer Agent 创建一个基础登录页面
- **Fix a UI bug / 修复界面 Bug** — 让 Developer Agent 只修复指定界面问题
- **Review a feature as Tester Agent / Tester Agent 验收功能** — 让 Tester Agent 独立验收功能

点击示例按钮后，会自动填充表单。用户可以再点击 Generate Prompt 生成结构化提示词。

## 后续规划

- 增加更多 Prompt 模板
- 增加多语言支持
- 增加导出 Markdown 功能
- 增加使用示例
- 后续可能接入 AI API
