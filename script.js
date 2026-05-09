const form = document.getElementById('prompt-form');
const output = document.getElementById('output');
const charCount = document.getElementById('char-count');
const btnGenerate = document.getElementById('btn-generate');
const btnCopy = document.getElementById('btn-copy');
const btnClear = document.getElementById('btn-clear');
const toast = document.getElementById('copy-toast');

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

function clearAll() {
  form.querySelectorAll('input[type="text"], textarea').forEach(el => el.value = '');
  document.getElementById('need-git').value = 'no';
  document.getElementById('need-test').value = 'no';
  output.value = '';
  updateCharCount();
}

btnGenerate.addEventListener('click', generatePrompt);
btnCopy.addEventListener('click', copyPrompt);
btnClear.addEventListener('click', clearAll);
