const form = document.getElementById('prompt-form');
const output = document.getElementById('output');
const charCount = document.getElementById('char-count');
const btnGenerate = document.getElementById('btn-generate');
const btnCopy = document.getElementById('btn-copy');
const btnDownload = document.getElementById('btn-download');
const btnClear = document.getElementById('btn-clear');
const toast = document.getElementById('copy-toast');
const hint = document.getElementById('download-hint');

function getVal(id) {
  return document.getElementById(id).value.trim();
}

function getValOrDefault(id, def) {
  const v = getVal(id);
  return v || def;
}

function generatePrompt() {
  const title = getValOrDefault('task-title', '未命名开发任务');
  const role = getValOrDefault('agent-role', 'Developer Agent');
  const background = getValOrDefault('project-background', '这是一个软件开发任务，请先理解当前项目结构，再进行最小必要修改。');
  const status = getValOrDefault('current-status', '当前任务尚未开始，请先检查现有文件和项目结构。');
  const goal = getValOrDefault('goal', '完成本次开发任务，并确保结果可以本地验证。');
  const steps = getValOrDefault('steps', '1. 检查当前项目结构\n2. 只做最小必要修改\n3. 完成功能实现\n4. 进行本地验证\n5. 输出修改摘要和验证结果');
  const outputFmt = getValOrDefault('output-format', '请输出：\n- 实现摘要\n- 修改文件列表\n- 本地验证方式\n- 验证结果\n- 下一步建议');
  const constraints = getValOrDefault('constraints', '- 不要修改无关文件\n- 不要引入复杂依赖\n- 不要过度设计\n- 不要主动提交 Git\n- 不要主动部署');
  const needGit = document.getElementById('need-git').value;
  const needTest = document.getElementById('need-test').value;

  const parts = [];

  parts.push(`# 任务标题：${title}\n`);
  parts.push(`你现在是 ${role}。\n`);
  parts.push(`## 项目背景\n\n${background}\n`);
  parts.push(`## 当前已完成\n\n${status}\n`);
  parts.push(`## 本次目标\n\n${goal}\n`);
  parts.push(`## 执行步骤\n\n${steps}\n`);
  parts.push(`## 输出格式\n\n${outputFmt}\n`);
  parts.push(`## 限制\n\n${constraints}\n`);

  parts.push('## Git 要求\n');
  if (needGit === 'yes') {
    parts.push(
      '- 完成后检查 git status\n' +
      '- 提交前列出 changed files\n' +
      '- commit message 使用清晰英文\n' +
      '- push 前确认工作区状态\n'
    );
  } else {
    parts.push(
      '- 本次任务不需要提交 Git\n' +
      '- 不要主动执行 git commit 或 git push\n'
    );
  }
  parts.push('');

  parts.push('## 测试要求\n');
  if (needTest === 'yes') {
    parts.push(
      '- 必须执行最小必要测试\n' +
      '- 必须生成测试结果摘要\n' +
      '- 必须说明 pass/fail\n' +
      '- 必须列出未验证项\n'
    );
  } else {
    parts.push('- 本次不强制生成测试报告\n');
  }

  output.value = parts.join('\n');
  updateCharCount();
  hint.classList.add('hidden');
}

function updateCharCount() {
  charCount.textContent = output.value.length + ' chars';
}

function copyPrompt() {
  if (!output.value) return;
  navigator.clipboard.writeText(output.value).then(() => {
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2000);
  }).catch(() => {
    output.select();
    document.execCommand('copy');
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2000);
  });
}

function downloadMarkdown() {
  const content = output.value;
  if (!content) {
    hint.textContent = '请先生成提示词，再下载 Markdown 文件。Please generate a prompt before downloading Markdown.';
    hint.classList.remove('hidden');
    output.closest('.output-section').scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  hint.classList.add('hidden');

  let filename = getValOrDefault('task-title', 'claude-code-prompt');
  filename = filename.replace(/[\\/:*?"<>|]/g, '').trim();
  if (!filename) filename = 'claude-code-prompt';
  if (!filename.endsWith('.md')) filename += '.md';

  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);

  toast.textContent = 'Markdown download started.';
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
    toast.textContent = '已复制到剪贴板';
  }, 2000);
}

function clearAll() {
  form.querySelectorAll('input[type="text"], textarea').forEach(el => el.value = '');
  document.getElementById('need-git').value = 'no';
  document.getElementById('need-test').value = 'no';
  output.value = '';
  updateCharCount();
  hint.classList.add('hidden');
}

const EXAMPLES = {
  login: {
    'task-title': '创建登录页',
    'agent-role': 'Developer Agent',
    'project-background': '这是一个前端页面开发任务，需要创建一个基础登录页面，用于用户输入用户名和密码。',
    'current-status': '当前项目已经有基础页面结构，但还没有登录表单。',
    'goal': '创建一个简洁可用的登录页，包含用户名输入框、密码输入框、登录按钮和基础提示文案。',
    'steps': '1. 检查当前页面结构\n2. 添加登录表单区域\n3. 添加用户名和密码输入框\n4. 添加登录按钮\n5. 保持页面样式简洁\n6. 本地打开页面验证显示效果',
    'output-format': '请输出：\n- 实现摘要\n- 修改文件列表\n- 本地验证方式\n- 验证结果',
    'constraints': '- 不要接入真实后端\n- 不要添加复杂登录逻辑\n- 不要引入框架\n- 只做最小可运行页面',
    'need-git': 'no',
    'need-test': 'no'
  },
  bugfix: {
    'task-title': '修复界面 Bug',
    'agent-role': 'Developer Agent',
    'project-background': '这是一个前端 Bug 修复任务，当前页面存在一个可见的界面显示问题。',
    'current-status': '功能基本可用，但页面中有一个样式或布局问题需要修复。',
    'goal': '修复指定的界面问题，并确保不影响现有功能。',
    'steps': '1. 先定位问题所在文件\n2. 只修改与该 Bug 直接相关的代码\n3. 不重构无关结构\n4. 本地打开页面验证问题是否修复\n5. 确认原有按钮和交互仍然正常',
    'output-format': '请输出：\n- Bug 原因分析\n- 修改内容摘要\n- 修改文件列表\n- 验证步骤\n- 验证结果',
    'constraints': '- 只修复指定 Bug\n- 不要修改无关功能\n- 不要重构整个页面\n- 不要引入新依赖\n- 不要主动提交 Git',
    'need-git': 'no',
    'need-test': 'yes'
  },
  tester: {
    'task-title': '验收已完成功能',
    'agent-role': 'Tester Agent',
    'project-background': '这是一个功能验收任务。Developer Agent 已经完成了一个功能，现在需要 Tester Agent 独立检查是否符合验收标准。',
    'current-status': '开发任务已经完成，相关文件已经修改，需要进行功能验证。',
    'goal': '根据验收标准检查功能是否正常，并输出明确的 pass/fail 结论。',
    'steps': '1. 阅读任务目标和验收标准\n2. 检查相关页面或功能\n3. 测试主要交互路径\n4. 检查是否存在明显回归问题\n5. 输出测试结论和发现的问题',
    'output-format': '请输出：\n- 测试范围\n- 测试步骤\n- 测试结果\n- 是否通过\n- 发现的问题\n- 建议下一步',
    'constraints': '- 只做验收，不做开发修改\n- 不要主动修改代码\n- 不要主动提交 Git\n- 如果发现问题，只报告问题和复现步骤',
    'need-git': 'no',
    'need-test': 'yes'
  }
};

function setSelect(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value;
}

function fillExample(id) {
  const data = EXAMPLES[id];
  if (!data) return;

  for (const key in data) {
    if (key === 'need-git' || key === 'need-test') {
      setSelect(key, data[key]);
    } else {
      const el = document.getElementById(key);
      if (el) el.value = data[key];
    }
  }

  document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('.example-card').forEach(card => {
  card.addEventListener('click', () => {
    fillExample(card.dataset.example);
  });
});

document.querySelectorAll('.btn-example').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    fillExample(btn.dataset.example);
  });
});

btnGenerate.addEventListener('click', generatePrompt);
btnCopy.addEventListener('click', copyPrompt);
btnDownload.addEventListener('click', downloadMarkdown);
btnClear.addEventListener('click', clearAll);
