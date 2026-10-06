import { knowledge } from './knowledge.js';

export const MAX_QUESTION_LENGTH = 600;
export const starterQuestions = [
  { en: 'Give me a short introduction.', zh: '请简要介绍一下 Yanxi。' },
  { en: 'What did Yanxi contribute at Qianxiang?', zh: 'Yanxi 在千象贡献了什么？' },
  { en: 'What is Yanxi’s education?', zh: 'Yanxi 的教育背景是什么？' },
  { en: 'What did the Regime Switching research find?', zh: 'Regime Switching 研究有什么结果？' },
];

const notices = {
  local: { en: 'Retrieved from the dated profile records below. This local demo does not call an LLM or speak for Yanxi in real time.', zh: '以下来自有日期的个人资料条目。本地 Demo 未调用 LLM，也不是 Yanxi 本人实时回复。' },
  unknown: { en: 'This question is not covered by this demo’s selected profile records. I cannot infer an answer. You can ask about education, internships, projects, skills or the listed contact email.', zh: 'Demo 资料没有覆盖这个问题，我不能推测答案。可以询问教育、实习、项目、技能或已列出的联系邮箱。' },
  empty: { en: 'Enter a question or choose a prompt above.', zh: '请输入问题，或选择上方的示例。' },
  long: { en: `Please keep your question within ${MAX_QUESTION_LENGTH} characters. No question has been stored.`, zh: `请将问题控制在 ${MAX_QUESTION_LENGTH} 个字符内。本次问题未被存储。` },
  privacy: { en: 'This demo only contains career-display candidates. It cannot provide home addresses, phone numbers, immigration details, identifiers, credentials, internal employer data or private records. The listed career email is available under Contact.', zh: '本 Demo 只包含职业展示候选资料，不能提供住址、电话号码、签证信息、身份编号、凭证、雇主内部数据或私人记录。已列出的求职邮箱可在 Contact 查看。' },
  injection: { en: 'I cannot follow instructions to override the profile boundaries, reveal hidden instructions, execute code or fabricate information. Ask a question about the dated career records.', zh: '我不能执行覆盖资料边界、披露隐藏指令、运行代码或编造信息的要求。请询问有日期的职业资料。' },
  exaggeration: { en: 'No verified return, Sharpe ratio, measured efficiency gain or publication claim is available for this demo. Reported directional accuracy is a research metric, not a trading return. I cannot invent or amplify an achievement.', zh: '本资料没有可核实的收益、Sharpe、实测效率提升或论文发表依据；报告的方向准确率是研究指标，不是交易收益；我不能虚构或夸大成果。' },
  graduation: { en: 'The premise is not supported: KCL MSc Physics is 2026–2027 (expected), not a completed degree. Planned modules do not establish approval, completion or earned credits.', zh: '该前提没有依据：KCL MSc Physics 为 2026–2027（预计），不是已经完成的学位。计划课程不证明获批、完成或已获得学分。' },
  doctorate: { en: 'The profile does not list a PhD, doctoral thesis or doctorate. The available education record is an expected MSc Physics and a BSc entry in the CV draft.', zh: '资料没有列出 PhD、博士论文或博士学位。已有教育记录为预计完成的 MSc Physics，以及 CV 草稿中的 BSc 条目。' },
  deployment: { en: 'The records support infrastructure work and MCP design. They do not establish production or live-trading deployment, alpha discovery, a known tool count or a look-ahead-bias fix.', zh: '资料支持基础链路搭建和 MCP 设计，不证明生产或实盘上线、Alpha 发现、确定的工具数或已修复 look-ahead bias。' },
  strengths: { en: 'The records provide examples below. They do not independently rank Yanxi’s strengths or proficiency.', zh: '资料提供以下实例，但未独立评定 Yanxi 的长处排名或熟练度。' },
  fit: { en: 'These records offer evidence relevant to data work: modelling, data analysis and research workflows. Role fit still depends on the job requirements and interview; this demo cannot certify mastery or hiring outcomes.', zh: '这些条目提供与数据工作有关的实例：建模、数据分析和研究工作流。岗位适配仍取决于职位要求及面试；本 Demo 不证明精通程度或录用结果。' },
  missing: { en: 'Some requested information is not provided. Only the dated career records below are available; no missing detail is inferred.', zh: '问题中的部分信息尚未提供。以下只列已有的职业条目，不推测缺失细节。' },
};

const topics = [
  { re: /\b(awards?|prizes?|cumcm|honours?)\b|奖项|获奖|数学建模竞赛/i, ids: ['award'] },
  { re: /regime|switching|hmm|moe|routing|directional accuracy|accuracy|市场状态|状态切换|门控|路由|准确率/i, ids: ['project-regime','regime-result'] },
  { re: /\b(introduc\w*|about (?:him|yanxi|you)|who (?:is|are)|overview|background|bio|summary)\b|介绍|简介|是谁|背景|概况/i, ids: ['identity', 'direction', 'education-kcl', 'experience-qx'] },
  { re: /\b(education|degree|universit\w*|bachelor\w*|undergraduate|master\w*|msc|bsc|stud(?:y|ies|ying)|graduate\w*|kcl|king.?s|sjtu)\b|教育|学历|本科|硕士|大学|毕业|交大/i, ids: ['education-kcl', 'education-sjtu', 'education-planned'] },
  { re: /\b(modules?|course\w*|stochastic|statistics|statistical learning)\b|课程|随机过程|统计学习|数据分析/i, ids: ['education-planned'] },
  { re: /\b(experience|intern\w*|work history|employment)\b|实习|经历|工作经历/i, ids: ['experience-qx', 'qx-agent', 'qx-mcp', 'qx-news', 'qx-validation', 'experience-juyuan', 'juyuan-factors'] },
  { re: /\b(worked on|work on|what (?:does|did) (?:he|yanxi|travis|you) do|what has (?:he|yanxi|travis|you) (?:done|built)|professional story)\b|做过什么|做了什么|从事什么|主要做什么/i, ids: ['direction', 'experience-qx', 'qx-agent', 'qx-mcp', 'experience-juyuan', 'project-equity', 'project-regime'] },
  { re: /\b(qianxiang|qx|cta)\b|千象/i, ids: ['experience-qx', 'qx-agent', 'qx-mcp', 'qx-news', 'qx-validation'] },
  { re: /\b(agents?|linux|infrastructure|workflows?|users?)\b|基础链路|搭建|使用者/i, ids: ['qx-agent'] },
  { re: /\b(mcp|model context protocol|interfaces?|pdf|retrieval)\b|接口|检索|沉淀/i, ids: ['qx-mcp'] },
  { re: /\b(news|48|51|backtest\w*|scor(?:e|es|ing)|three years|3 years)\b|新闻|回测|品种|评分/i, ids: ['qx-news'] },
  { re: /\b(reverse\w*|position\w*|timestamp\w*|transaction cost\w*)\b|反向|仓位|时点|手续费/i, ids: ['qx-validation'] },
  { re: /\b(juyuan|bollinger|crypt\w*|liquidity|mean.?reversion|moving.average)\b|巨远|布林|加密|均值回归/i, ids: ['experience-juyuan', 'juyuan-factors'] },
  { re: /\b(project\w*|research examples?|research background|research projects?|portfolio)\b|项目|研究实例|研究背景|作品/i, ids: ['project-equity', 'project-regime', 'regime-result'] },
  { re: /\b(equity|multi.?factor|lstm|transformer|random forest|backtrader)\b|股票|多因子/i, ids: ['project-equity'] },
  
  { re: /\b(skill\w*|programming|python|pandas|numpy|matplotlib|matlab|pytorch|tensorflow|xgboost|machine learning|ml|technologies|tech stack)\b|技能|编程|机器学习|技术栈/i, ids: ['skills', 'project-equity', 'project-regime'] },
  { re: /\b(strength\w*|good at|capabilit\w*|contribution\w*|bring to (?:a|the|our) team)\b|长处|优势|擅长|贡献/i, ids: ['qx-agent', 'qx-mcp', 'project-equity', 'project-regime'], notice: 'strengths' },
  { re: /\b(fit|suitable|qualified|qualifications|data role|data work|evidence|support(?:s|ing)? that)\b|适合|适配|胜任|证据|依据/i, ids: ['direction', 'skills', 'qx-agent', 'project-equity', 'project-regime'], notice: 'fit' },
  { re: /\b(career|goal\w*|fintech|risk|job\w*|opportunit\w*|quant\w*|finance|financial|data analyst)\b|职业|方向|目标|求职|量化|金融/i, ids: ['direction'] },
  { re: /\b(email|contact|reach)\b|邮箱|联系/i, ids: ['contact'] },
  { re: /\b(hobb\w*|leisure|sport\w*|music|personal interests?|favorite|favourite)\b|爱好|兴趣|运动|音乐|喜欢什么/i, ids: ['hobbies'], notice: 'missing' },
];

const combineNotices = keys => ({
  en: [...new Set(keys)].map(key => notices[key].en).join(' '),
  zh: [...new Set(keys)].map(key => notices[key].zh).join(' '),
});
const result = (kind, factIds = [], noticeKeys = []) => ({ kind, factIds, notice: combineNotices(noticeKeys) });

/** Deterministic local retrieval. Language controls rendering, never factual selection. */
export function answerQuestion(question, lang = 'en') {
  void lang;
  if (typeof question !== 'string' || !question.trim()) return result('empty', [], ['empty']);
  const q = question.normalize('NFKC').trim();
  if (q.length > MAX_QUESTION_LENGTH) return result('refusal', [], ['long']);
  if (/(ignore|disregard|override|forget).{0,35}(rules|instructions|previous|boundaries)|system\s*prompt|hidden\s*instructions|act as|pretend.{0,30}(yanxi|travis)|<\/?(?:script|iframe)|javascript:|execute.{0,20}(code|command)|忽略.{0,20}(规则|指令|限制|之前)|系统提示|隐藏指令|扮演|假装.{0,10}(本人|Yanxi)|执行.{0,10}(代码|命令)/i.test(q)) return result('refusal', [], ['injection']);
  if (/\b(address|phone|telephone|passport|visa|immigration|national insurance|ni number|student id|password|credential\w*|secret\w*|api.?key|server address|internal (?:\w+\s+){0,3}(?:code|data)|private (?:file|record|document))\b|住址|地址|电话|手机号|护照|签证|学号|身份证|密码|验证码|密钥|内部.{0,6}(代码|数据|服务器)|私人.{0,6}(文件|记录|材料)/i.test(q)) return result('refusal', [], ['privacy']);
  if (/\b(invent|fabricate|exaggerate|make up|inflate)\b|编造|虚构|夸大|包装成|帮他写.{0,20}(收益|提升|获奖)/i.test(q)) return result('refusal', [], ['exaggeration']);

  const ids = new Set();
  const noticeKeys = [];
  const unsupportedPerformance = /\b(returns?|sharpe|profit\w*|performance figures?|efficiency gain|publications?|published papers?|ielts|gpa|salary|tool count|how many (?:mcp )?tools)\b|收益|业绩|盈利|效率提升|论文|雅思|成绩|薪资|多少.{0,5}工具|工具数量/i.test(q);
  const falseGraduation = /(?:already|completed|finished|graduated|earned).{0,45}(kcl|master|msc|module|course|degree)|(?:kcl|master|msc|module|course|degree).{0,40}(completed|finished|graduated|earned)|已经.{0,20}(毕业|硕士|完成|学分)|完成.{0,15}(硕士|课程)|已获.{0,10}学分/i.test(q);
  const unsupportedDeployment = /\b(live.?trad\w*|production|deploy\w*|alpha|look.ahead|tool count|how many (?:mcp )?tools)\b|实盘|上线|生产部署|未来函数|工具数量|多少.{0,5}工具/i.test(q);
  const falseDoctorate = /\b(ph\.?d\.?|doctoral|doctorate)\b|博士/i.test(q);
  if (falseGraduation) { ['education-kcl', 'education-planned'].forEach(id => ids.add(id)); noticeKeys.push('graduation'); }
  if (falseDoctorate) { ['education-kcl', 'education-sjtu'].forEach(id => ids.add(id)); noticeKeys.push('doctorate'); }
  if (unsupportedDeployment) { ['qx-agent', 'qx-mcp', 'qx-validation'].forEach(id => ids.add(id)); noticeKeys.push('deployment'); }
  if (unsupportedPerformance) noticeKeys.push('exaggeration');

  for (const topic of topics) {
    if (topic.re.test(q)) {
      topic.ids.forEach(id => ids.add(id));
      if (topic.notice) noticeKeys.push(topic.notice);
    }
  }
  if (ids.size === 1 && ids.has('hobbies')) return result('unknown', [], ['unknown']);
  // Do not turn a sole unsupported performance request into an apparently sourced answer.
  if (!ids.size) return result('unknown', [], noticeKeys.length ? noticeKeys : ['unknown']);
  const factIds = knowledge.facts.filter(item => ids.has(item.id) && item.publicCandidate).map(item => item.id);
  return result('answer', factIds, noticeKeys.length ? noticeKeys : ['local']);
}
