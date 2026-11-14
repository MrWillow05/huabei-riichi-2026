const TEAMS = [
  "北京大学","中国人民大学","清华大学","北京交通大学","北京工业大学","北京航空航天大学","北京理工大学","北京科技大学",
  "北方工业大学","北京化工大学","北京工商大学","北京邮电大学","中国农业大学","北京师范大学","中国传媒大学","中央财经大学",
  "首都经济贸易大学","北京信息科技大学","中国地质大学（北京）","中国石油大学（北京）","中国科学院大学","中国政法大学","北京浪速大学","南开大学",
  "天津大学","河北工业大学","中国民航大学","太原理工大学","山西农业大学","山西医科大学","内蒙古大学","太原工业学院"
];

const TEAM_LOGOS = Object.freeze({
  "北京大学":"./assets/logos/beijing-daxue.webp",
  "中国人民大学":"./assets/logos/renmin.webp",
  "清华大学":"./assets/logos/tsinghua.webp",
  "北京交通大学":"./assets/logos/beijing-jiaotong.webp",
  "北京工业大学":"./assets/logos/beijing-gongye.webp",
  "北京航空航天大学":"./assets/logos/beihang.webp",
  "北京理工大学":"./assets/logos/beijing-ligong.webp",
  "北京科技大学":"./assets/logos/beijing-keji.webp",
  "北方工业大学":"./assets/logos/beifang-gongye.webp",
  "北京化工大学":"./assets/logos/beijing-huagong.webp",
  "北京工商大学":"./assets/logos/beijing-gongshang.webp",
  "北京邮电大学":"./assets/logos/beiyou.webp",
  "中国农业大学":"./assets/logos/zhongguo-nongye.webp",
  "北京师范大学":"./assets/logos/beishi.webp",
  "中国传媒大学":"./assets/logos/zhongguo-chuanmei.webp",
  "中央财经大学":"./assets/logos/yangcai.webp",
  "首都经济贸易大学":"./assets/logos/shoujingmao.webp",
  "北京信息科技大学":"./assets/logos/beijing-xinxi.webp",
  "中国地质大学（北京）":"./assets/logos/zhongguo-dizhi.webp",
  "中国石油大学（北京）":"./assets/logos/zhongguo-shiyou.webp",
  "中国科学院大学":"./assets/logos/zhongke-da.webp",
  "中国政法大学":"./assets/logos/zhongguo-zhengfa.webp",
  "北京浪速大学":"./assets/logos/langsu.webp",
  "南开大学":"./assets/logos/nankai.webp",
  "天津大学":"./assets/logos/tianjin.webp",
  "河北工业大学":"./assets/logos/hebei-gongye.webp",
  "中国民航大学":"./assets/logos/zhongguo-minhang.webp",
  "太原理工大学":"./assets/logos/taiyuan-ligong.webp",
  "山西农业大学":"./assets/logos/shanxi-nongye.webp",
  "山西医科大学":"./assets/logos/shanxi-yike.webp",
  "内蒙古大学":"./assets/logos/neimenggu.webp",
  "太原工业学院":"./assets/logos/taiyuan-gongye-xueyuan.webp"
});

const STAGES = [
  { id:"stage1", label:"第一轮 · 32进16", short:"32进16", rounds:5, advance:16, dates:"10.11—10.25", online:true },
  { id:"stage2", label:"第二轮 · 16进8", short:"16进8", rounds:5, advance:8, dates:"10.31—11.14", online:true },
  { id:"stage3", label:"第三轮 · 8进4", short:"8进4", rounds:3, advance:4, dates:"11.15—11.22", online:true },
  { id:"final", label:"线下决赛 · 4队", short:"线下决赛", rounds:2, advance:4, dates:"11.28—11.29", online:false }
];

const SCHEDULE = [
  { title:"第一轮 · 32进16", note:"5轮积分排位赛", date:"10.11—10.25", stage:"stage1" },
  { title:"第二轮 · 16进8", note:"5轮独立积分排位赛", date:"10.31—11.14", stage:"stage2" },
  { title:"第三轮 · 8进4", note:"3轮决出线下席位", date:"11.15—11.22", stage:"stage3" },
  { title:"线下决赛", note:"北京浪速雀庄中关村店", date:"11.28—11.29", stage:"final" }
];

// 第二阶段保留已公布初始分；第三阶段按上一阶段累计分的30%四舍五入保留两位。
// 只计入“累计”排名；单轮页面只展示该轮本身，因此未开打轮次保持为空。
const STAGE_INITIAL_SCORES = Object.freeze({
  stage2: Object.freeze({
    "北京师范大学":13.01,
    "北京邮电大学":10.94,
    "中央财经大学":10.15,
    "中国科学院大学":9.57,
    "中国地质大学（北京）":9.23,
    "北京化工大学":9.14,
    "北京理工大学":8.70,
    "南开大学":8.25,
    "内蒙古大学":7.65,
    "中国人民大学":7.55,
    "中国农业大学":7.02,
    "太原工业学院":6.91,
    "首都经济贸易大学":6.77,
    "北京浪速大学":6.70,
    "北京交通大学":6.69,
    "北京科技大学":6.29
  }),
  stage3: Object.freeze({
    "北京邮电大学":11.98,
    "北京浪速大学":11.24,
    "首都经济贸易大学":11.18,
    "中国科学院大学":11.07,
    "南开大学":11.02,
    "中国农业大学":10.43,
    "北京交通大学":10.22,
    "中国人民大学":9.58
  })
});

// 组委会另行公布、未包含在大凤林持点数据中的阶段警告。
// 只在对应阶段的累计榜扣除，不回写单轮成绩，也不影响下一阶段初始分。
const STAGE_CUMULATIVE_WARNINGS = Object.freeze({
  stage1: Object.freeze({
    "北京浪速大学":1,
    "天津大学":1,
    "中国政法大学":1,
    "北京工商大学":1
  })
});

const OFFICIAL_SOURCE = Object.freeze({
  cid: "219",
  api: "https://cdn.r-mj.com/api/data.php",
  autoRefresh: true
});
const STORAGE_KEY = "huabei-riichi-2026-v2";
const DEFAULT_STATE = {
  config: { ...OFFICIAL_SOURCE },
  records: [],
  roster: TEAMS.slice(),
  lastUpdated: null,
  sourceName: "赛前数据"
};

let state = loadState();
let activeView = "ranking";
let activeStage = currentStageId();
let activeRound = "all";
let activeLogRound = "1";
let refreshTimer = null;
let syncInProgress = false;

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
// The small tolerance neutralizes binary floating-point artifacts (for example 8.4 becoming 8.399999…).
// It is far below the precision of any score input and preserves the required downward rounding.
const floor2 = value => Math.floor((Number(value) + 1e-9) * 100) / 100;
const formatNumber = value => Number(value || 0).toLocaleString("zh-CN");
const formatScore = value => Number(value).toFixed(2);
const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char]);
const teamBadge = name => TEAM_LOGOS[name]
  ? `<i class="team-monogram"><img src="${TEAM_LOGOS[name]}" alt="${escapeHtml(name)}队徽" loading="lazy" decoding="async"></i>`
  : `<i class="team-monogram">${escapeHtml(monogram(name))}</i>`;

function loadState(){
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const loaded = saved ? { ...DEFAULT_STATE, ...saved, roster:saved.roster?.length ? saved.roster : TEAMS.slice() } : structuredClone(DEFAULT_STATE);
    // This public scoreboard always follows the official event. Keeping the source
    // out of browser-specific settings means every visitor sees the same live data.
    loaded.config = { ...OFFICIAL_SOURCE };
    return loaded;
  } catch { return structuredClone(DEFAULT_STATE); }
}

function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function stageById(id){ return STAGES.find(stage => stage.id === id) || STAGES[0]; }
function stageIndex(id){ return STAGES.findIndex(stage => stage.id === id); }
function currentStageId(){
  const now = new Date();
  if (now >= new Date("2026-11-28T00:00:00+08:00")) return "final";
  if (now >= new Date("2026-11-15T00:00:00+08:00")) return "stage3";
  if (now >= new Date("2026-10-31T00:00:00+08:00")) return "stage2";
  return "stage1";
}
function provinceOf(name){
  if (["南开大学","天津大学","河北工业大学","中国民航大学"].includes(name)) return "天津";
  if (["太原理工大学","山西农业大学","山西医科大学","太原工业学院"].includes(name)) return "山西";
  if (name === "内蒙古大学") return "内蒙古";
  return "北京";
}
function monogram(name){ return name.replace(/（.*?）|\*.*/g, "").slice(0,2); }

function scoreRecord(record){
  const stage = stageById(record.stage);
  const sorted = record.teams.map((team, seat) => ({...team, seat})).sort((a,b) => Number(b.points)-Number(a.points) || a.seat-b.seat);
  const bonuses = [7,4,2,1];
  const divisor = stage.online ? 100000 : 10000;
  const topBonus = stage.online ? .2 : 1;
  return sorted.map((team, index) => {
    const busted = stage.online && Number(team.points) < 0;
    const rankBonus = busted ? 0 : bonuses[index];
    const warning = Number(team.warnings || 0);
    const total = floor2(Number(team.points)/divisor + rankBonus + (team.top ? topBonus : 0) - warning);
    return {...team, rank:index+1, busted, rankBonus, topBonus:team.top ? topBonus : 0, score:total};
  });
}

function isStageComplete(stageId){
  const stage = stageById(stageId);
  const finalRoundTeams = new Set(
    state.records
      .filter(record => record.stage === stageId && Number(record.round) === stage.rounds)
      .flatMap(record => record.teams.map(team => team.name))
  );
  return finalRoundTeams.size >= stage.advance * 2;
}

function teamsForStage(stageId){
  const ownTeams = [...new Set(state.records.filter(record => record.stage === stageId).flatMap(record => record.teams.map(team => team.name)))];
  if (ownTeams.length) return ownTeams;
  const index = stageIndex(stageId);
  if (index <= 0) return state.roster.slice();
  const previous = STAGES[index-1];
  if (!isStageComplete(previous.id)) return [];
  return rankingForStage(previous.id, "all").slice(0, previous.advance).map(row => row.name);
}

function rankingForStage(stageId, round="all"){
  const stage = stageById(stageId);
  const detailedCumulative = round === "all" && stageIndex(stageId) >= 1;
  const initialScores = round === "all" ? (STAGE_INITIAL_SCORES[stageId] || {}) : {};
  const teamNames = [...new Set([...Object.keys(initialScores), ...teamsForStage(stageId)])];
  const rows = new Map(teamNames.map((name, index) => {
    const initial = floor2(Number(initialScores[name] || 0));
    return [name, {name, order:index, score:initial, initial, roundScores:Array(stage.rounds).fill(null), raw:0, top:0, warnings:0, games:0}];
  }));

  state.records.filter(record => record.stage === stageId && (round === "all" ? Number(record.round) <= stage.rounds : Number(record.round) === Number(round))).forEach(record => {
    scoreRecord(record).forEach(team => {
      if (!rows.has(team.name)) rows.set(team.name, {name:team.name, order:rows.size, score:0, initial:0, roundScores:Array(stage.rounds).fill(null), raw:0, top:0, warnings:0, games:0});
      const row = rows.get(team.name);
      row.score = floor2(row.score + team.score);
      const roundIndex = Number(record.round) - 1;
      row.roundScores[roundIndex] = floor2(Number(row.roundScores[roundIndex] || 0) + team.score);
      if (!detailedCumulative) row.raw += Number(team.points || 0);
      row.top += team.topBonus;
      row.warnings += Number(team.warnings || 0);
      row.games += 1;
    });
  });

  if (round === "all") {
    Object.entries(STAGE_CUMULATIVE_WARNINGS[stageId] || {}).forEach(([name, warning]) => {
      const row = rows.get(name);
      if (!row) return;
      row.score = floor2(row.score - Number(warning));
      row.warnings += Number(warning);
    });
  }

  return [...rows.values()].sort((a,b) => b.score-a.score || (detailedCumulative ? a.order-b.order : b.raw-a.raw || a.order-b.order)).map((row,index) => ({...row, rank:index+1}));
}

function showView(view){
  activeView = view;
  $$(".view").forEach(section => section.classList.toggle("is-active", section.id === `view-${view}`));
  $$(".nav-link").forEach(button => button.classList.toggle("is-active", button.dataset.view === view));
  if (view === "ranking") renderRanking();
  if (view === "tables") renderMatches();
  window.scrollTo({top:0,behavior:"smooth"});
}

function renderCountdown(){
  const target = new Date("2026-10-11T14:00:00+08:00");
  const now = new Date();
  const days = Math.max(0, Math.ceil((target-now)/86400000));
  const number = $("#countdownDays");
  const label = number.nextElementSibling;
  number.textContent = days;
  if (now >= target) { number.textContent = "雀"; label.textContent = "赛事进行中"; }
  else if (days === 0) label.textContent = "今日开赛";
}

function renderTimeline(){
  const now = new Date();
  let current = 0;
  if (now >= new Date("2026-10-31T00:00:00+08:00")) current=1;
  if (now >= new Date("2026-11-15T00:00:00+08:00")) current=2;
  if (now >= new Date("2026-11-28T00:00:00+08:00")) current=3;
  $("#overviewTimeline").innerHTML = SCHEDULE.map((item,index) => `<div class="timeline-item ${index===current ? "is-current" : ""}"><i class="timeline-dot"></i><div><h4>${item.title}</h4><p>${item.note}</p></div><time>${item.date}</time></div>`).join("");
}

function renderMiniRanking(){
  const ranking = rankingForStage("stage1","all").slice(0,5);
  $("#miniRanking").innerHTML = ranking.map(row => `<div class="mini-row"><span class="mini-rank">${String(row.rank).padStart(2,"0")}</span><span class="mini-team">${teamBadge(row.name)}${escapeHtml(row.name)}</span><span class="mini-score">${row.games ? formatScore(row.score) : "—"}<small>pt</small></span></div>`).join("");
}

function renderStageTabs(){
  $("#stageTabs").innerHTML = STAGES.map(stage => `<button class="stage-tab ${stage.id===activeStage ? "is-active" : ""}" data-stage="${stage.id}" role="tab">${stage.label}<small> · ${stage.dates}</small></button>`).join("");
  $$(".stage-tab").forEach(button => button.addEventListener("click", () => { activeStage=button.dataset.stage; activeRound="all"; renderRanking(); }));
}

function renderRoundFilter(){
  const stage = stageById(activeStage);
  const options = [{value:"all",label:"累计"}, ...Array.from({length:stage.rounds},(_,i)=>({value:String(i+1),label:`第${i+1}轮`}))];
  $("#roundFilter").innerHTML = options.map(item => `<button class="round-chip ${String(activeRound)===item.value ? "is-active" : ""}" data-round="${item.value}">${item.label}</button>`).join("");
  $$(".round-chip").forEach(button => button.addEventListener("click",()=>{ activeRound=button.dataset.round; renderRankingTable(); renderRoundFilter(); }));
}

function renderRankingHead(){
  const stage = stageById(activeStage);
  const detailedCumulative = activeRound === "all" && stageIndex(activeStage) >= 1;
  $("#rankingHead").innerHTML = detailedCumulative
    ? `<th>名次</th><th>参赛队伍</th><th>累计精算分</th><th>初始分</th>${Array.from({length:stage.rounds},(_,i)=>`<th>第${i+1}轮</th>`).join("")}<th>状态</th>`
    : `<th>名次</th><th>参赛队伍</th><th>阶段精算分</th><th>原始持点</th><th>区间奖</th><th>警告</th><th>状态</th>`;
}

function renderRankingTable(){
  const search = $("#teamSearch").value.trim().toLowerCase();
  const stage = stageById(activeStage);
  const ranking = rankingForStage(activeStage, activeRound);
  const hasScores = ranking.some(row => row.games > 0);
  const filtered = ranking.filter(row => row.name.toLowerCase().includes(search));
  const cumulative = activeRound === "all";
  const detailedCumulative = cumulative && stageIndex(activeStage) >= 1;
  $("#qualificationCard").hidden = !cumulative;
  renderRankingHead();
  $("#rankingBody").innerHTML = filtered.map(row => {
    const advancing = cumulative && hasScores && row.rank <= stage.advance;
    const status = !row.games ? "待开赛" : !cumulative ? "本轮排名" : advancing ? (activeStage === "final" ? "争冠区" : "晋级区") : "追赶区";
    const showScore = row.games || (activeRound === "all" && row.initial);
    const rowStart = `<tr class="${cumulative && hasScores && row.rank===stage.advance ? "cutoff-row" : ""}"><td class="rank-cell">${String(row.rank).padStart(2,"0")}</td><td><div class="team-cell">${teamBadge(row.name)}<span>${escapeHtml(row.name)}<small>${provinceOf(row.name)}</small></span></div></td><td class="score-cell">${showScore ? formatScore(row.score) : "—"}</td>`;
    const statusCell = `<td><span class="status-pill ${advancing ? "" : "out"}"><i></i>${status}</span></td></tr>`;
    if (detailedCumulative) {
      const initialCell = `<td class="round-score-cell initial-score-cell">${row.initial ? formatScore(row.initial) : "—"}</td>`;
      const roundCells = row.roundScores.map(score => `<td class="round-score-cell">${score === null ? "—" : formatScore(score)}</td>`).join("");
      return `${rowStart}${initialCell}${roundCells}${statusCell}`;
    }
    return `${rowStart}<td class="raw-cell">${row.games ? formatNumber(row.raw) : "—"}</td><td>${row.top ? row.top.toFixed(1) : "—"}</td><td class="warning-cell">${row.warnings ? `−${row.warnings}` : "—"}</td>${statusCell}`;
  }).join("");
  $("#rankingEmpty").hidden = filtered.length > 0;
  const cutoff = ranking[stage.advance-1];
  $("#cutoffScore").textContent = hasScores && cutoff ? formatScore(cutoff.score) : "—";
  $("#cutoffText").textContent = activeStage === "final" ? "两日总分决定最终名次" : `前${stage.advance}名晋级${stageIndex(activeStage)+1 < STAGES.length ? STAGES[stageIndex(activeStage)+1].short : "下一阶段"}`;
  const completedRounds = new Set(state.records.filter(record => record.stage===activeStage).map(record => Number(record.round))).size;
  $("#stageProgress").style.width = `${Math.min(100,completedRounds/stage.rounds*100)}%`;
  $("#progressLabel").textContent = `${completedRounds} / ${stage.rounds} 轮已有数据`;
}

function renderRanking(){
  renderStageTabs();
  renderRoundFilter();
  renderRankingTable();
}

function renderLogFilters(){
  $("#logStage").innerHTML = STAGES.map(stage => `<option value="${stage.id}" ${stage.id===activeStage?"selected":""}>${stage.label}</option>`).join("");
  const stage = stageById(activeStage);
  if (Number(activeLogRound) > stage.rounds) activeLogRound = "1";
  $("#logRound").innerHTML = Array.from({length:stage.rounds},(_,i)=>`<option value="${i+1}" ${String(activeLogRound)==String(i+1)?"selected":""}>第${i+1}轮</option>`).join("");
}

function renderMatches(){
  renderLogFilters();
  const records = state.records.filter(record => record.stage===activeStage && Number(record.round)===Number(activeLogRound)).sort((a,b)=>Number(a.table)-Number(b.table));
  $("#matchGrid").innerHTML = records.map(record => {
    const scored = scoreRecord(record);
    return `<article class="panel match-card"><div class="match-head"><div><span class="section-kicker">TABLE ${String(record.table).padStart(2,"0")}</span><h3>第${record.round}轮 · 第${record.table}桌</h3></div><small>${record.source === "dafenglin" ? "大凤林同步" : "手工录入"}</small></div>${scored.map(team=>`<div class="match-team"><span class="match-place">${team.rank}</span><span class="team-cell">${teamBadge(team.name)}${escapeHtml(team.name)}</span><span class="match-points"><b>${formatNumber(team.points)}</b><small>最终持点</small></span><span class="match-score">${formatScore(team.score)}</span></div>`).join("")} ${record.links?.length ? `<div class="match-links">${record.links.map((link,i)=>`<a class="paipu-link" href="${escapeHtml(link)}" target="_blank" rel="noopener">牌谱 ${i+1} ↗</a>`).join("")}</div>` : ""}</article>`;
  }).join("");
  $("#matchEmpty").hidden = records.length > 0;
}

function renderStatus(){
  const live = state.records.length > 0;
  $("#liveState").classList.toggle("is-live", live);
  $("#liveState span").textContent = live ? (state.config.cid ? "公开数据已连接" : "演示 / 手工数据") : "等待开赛";
  $("#lastUpdated").textContent = state.lastUpdated ? new Date(state.lastUpdated).toLocaleString("zh-CN",{hour12:false}) : "尚未同步";
}

function renderAll(){
  renderRanking(); renderMatches(); renderStatus();
}

function openAdmin(){
  $("#cidInput").value = state.config.cid;
  $("#apiInput").value = state.config.api;
  $("#autoRefresh").checked = state.config.autoRefresh;
  $("#adminModal").showModal();
}

function populateRecordForm(){
  $("#recordStage").innerHTML = STAGES.map(stage => `<option value="${stage.id}" ${stage.id===activeStage?"selected":""}>${stage.label}</option>`).join("");
  $("#recordRound").max = stageById(activeStage).rounds;
  $("#recordRound").value = activeView === "tables" ? activeLogRound : (activeRound === "all" ? 1 : activeRound);
  const options = state.roster.map(name=>`<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("");
  $("#scoreEntries").innerHTML = Array.from({length:4},(_,i)=>`<div class="score-entry"><select class="entry-team" aria-label="第${i+1}支队伍">${options}</select><input class="entry-points" type="number" step="100" value="100000" aria-label="最终持点"><input class="entry-warning" type="number" min="0" step="1" value="0" aria-label="警告扣分"><input class="entry-top top-check" type="radio" name="segmentTop" aria-label="大将TOP"></div>`).join("");
  $$(".entry-team").forEach((select,i)=> select.value = state.roster[(Number($("#recordTable").value || 1)-1)*4+i] || state.roster[i]);
  $("#recordModal").showModal();
}

function saveManualRecord(){
  const teams = $$(".score-entry").map(row => ({
    name: $(".entry-team",row).value,
    points:Number($(".entry-points",row).value),
    warnings:Number($(".entry-warning",row).value || 0),
    top:$(".entry-top",row).checked
  }));
  if (new Set(teams.map(team=>team.name)).size !== 4) return toast("同一桌不能重复选择队伍");
  const stage = $("#recordStage").value;
  const round = Number($("#recordRound").value);
  const table = Number($("#recordTable").value);
  const total = teams.reduce((sum,team)=>sum+team.points,0);
  const record = { id:`manual-${stage}-${round}-${table}`, stage, round, table, teams, source:"manual", links:[], updatedAt:new Date().toISOString() };
  const index = state.records.findIndex(item=>item.id===record.id);
  if (index>=0) state.records[index]=record; else state.records.push(record);
  if (!state.roster.length) state.roster=TEAMS.slice();
  state.lastUpdated = new Date().toISOString();
  saveState(); activeStage=stage; activeRound=String(round); renderAll(); $("#recordModal").close();
  toast(total === 400000 ? "成绩已保存，排名已重算" : `成绩已保存；本桌持点合计为 ${formatNumber(total)}，请核对`);
}

function makeDemoData(){
  const patterns = [[39000,18000,-12000,-45000],[24000,9000,-7000,-26000],[52000,-3000,-17000,-32000],[-5000,33000,12000,-40000]];
  const records=[];
  for(let round=1;round<=2;round++){
    for(let table=1;table<=8;table++){
      const rotation=(table+round)%4;
      const names=Array.from({length:4},(_,i)=>TEAMS[((table-1)*4+i+(round-1)*5)%TEAMS.length]);
      const delta=patterns[(table+round)%patterns.length];
      const teams=names.map((name,i)=>({name,points:100000+delta[(i+rotation)%4],warnings:(round===2&&table===3&&i===2)?1:0,top:i===((table+1)%4)}));
      records.push({id:`demo-stage1-${round}-${table}`,stage:"stage1",round,table,teams,source:"manual",links:[],updatedAt:new Date().toISOString()});
    }
  }
  state.records = records;
  state.roster = TEAMS.slice();
  state.sourceName="演示数据";
  state.lastUpdated=new Date().toISOString();
  saveState(); renderAll(); toast("已载入两轮演示成绩");
}

async function fetchJson(url){
  const response = await fetch(url,{cache:"no-store"});
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const text = await response.text();
  if (!text.trim()) return null;
  return JSON.parse(text);
}

function externalRoundMap(round){
  if (round<=5) return {stage:"stage1",round};
  if (round<=10) return {stage:"stage2",round:round-5};
  if (round<=13) return {stage:"stage3",round:round-10};
  return {stage:"final",round:round-13};
}

function parseDafenglinRound(data, classes, teams, externalRound){
  if (!data || typeof data !== "object") return [];
  const classMap = new Map((Array.isArray(classes)?classes:Object.values(classes||{})).map(group=>[String(group.rid),group]));
  const teamMap = teams || {};
  const mapped = externalRoundMap(externalRound);
  return Object.entries(data).flatMap(([rid,logs],tableIndex)=>{
    if (!Array.isArray(logs) || !logs.length) return [];
    const group=classMap.get(String(rid));
    if (!group) return [];
    const count=group.tid4 ? 4 : 3;
    if (count!==4) return [];
    const last=logs[logs.length-1];
    const captainLogs=logs.filter(log=>Number(log.rowi)>=8);
    // An online table also ends when a team busts in the first captain hanchan.
    const endedByBust=stageById(mapped.stage).online && Array.from({length:4},(_,i)=>Number(last[`num${i+1}`])).some(points=>points<0);
    const captainComplete=captainLogs.length>=2 || (captainLogs.length===1 && endedByBust);
    const captainTotals=Array.from({length:4},(_,i)=>captainLogs.reduce((sum,log)=>sum+Number(log[`pint${i+1}`]||0),0));
    const topIndex=captainComplete ? captainTotals.indexOf(Math.max(...captainTotals)) : -1;
    const recordTeams=Array.from({length:4},(_,i)=>{
      const tid=group[`tid${i+1}`];
      return { name:teamMap[tid]?.t_name || `队伍 ${tid}`, points:Number(last[`num${i+1}`]||0), warnings:0, top:i===topIndex };
    });
    return [{id:`dafenglin-${externalRound}-${rid}`,stage:mapped.stage,round:mapped.round,table:Number(group.t_class)||tableIndex+1,teams:recordTeams,source:"dafenglin",links:logs.map(log=>log.url).filter(Boolean),updatedAt:last.i_time||new Date().toISOString()}];
  });
}

async function syncData(){
  if (syncInProgress) return;
  if (!state.config.cid) { openAdmin(); toast("请先填写赛事 CID"); return; }
  syncInProgress=true;
  const button=$("#syncNow");
  button.disabled=true; button.innerHTML="同步中…";
  try{
    const base=state.config.api;
    const cid=encodeURIComponent(state.config.cid);
    const [admin,teams,classes]=await Promise.all([
      fetchJson(`${base}?t=admin&cid=${cid}`), fetchJson(`${base}?t=team&cid=${cid}`), fetchJson(`${base}?t=class&cid=${cid}`)
    ]);
    if (!admin || !teams || !classes) throw new Error("赛事基础数据尚未就绪");
    const roundCount=Math.min(Number(admin.c_round||15),15);
    const roundData=await Promise.all(Array.from({length:roundCount},(_,i)=>fetchJson(`${base}?t=c_data&cid=${cid}&r=${i+1}`).catch(()=>null)));
    const imported=roundData.flatMap((data,i)=>parseDafenglinRound(data,classes,teams,i+1));
    // Replace the local snapshot so old demo/manual rows can never leak into the
    // public standings once the official source has responded.
    state.records=imported;
    state.roster=Object.values(teams).map(team=>team.t_name).filter(Boolean);
    if (!state.roster.length) state.roster=TEAMS.slice();
    state.sourceName=admin.c_name||"大凤林赛事";
    state.lastUpdated=new Date().toISOString();
    saveState(); renderAll(); toast(imported.length ? `已同步 ${imported.length} 桌成绩` : "赛事已连接，当前暂无对局数据");
  }catch(error){
    console.error(error); toast(`同步失败：${error.message}`);
  }finally{ syncInProgress=false; button.disabled=false; button.innerHTML="同步数据 <span>↻</span>"; }
}

function scheduleRefresh(){
  clearInterval(refreshTimer);
  if (state.config.autoRefresh && state.config.cid) refreshTimer=setInterval(syncData,60000);
}

function exportData(){
  const blob=new Blob([JSON.stringify({event:"2026年华北高校立直麻将团体赛",exportedAt:new Date().toISOString(),...state},null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob); const link=document.createElement("a"); link.href=url; link.download=`huabei-riichi-2026-${new Date().toISOString().slice(0,10)}.json`; link.click(); URL.revokeObjectURL(url); toast("赛事数据已导出");
}

function toast(message){
  const el=$("#toast"); el.textContent=message; el.classList.add("is-visible"); clearTimeout(el._timer); el._timer=setTimeout(()=>el.classList.remove("is-visible"),3000);
}

function bindEvents(){
  $$(".nav-link").forEach(button=>button.addEventListener("click",()=>showView(button.dataset.view)));
  $$('[data-jump]').forEach(button=>button.addEventListener("click",()=>showView(button.dataset.jump)));
  $("#openAdmin").addEventListener("click",openAdmin);
  $("#syncNow").addEventListener("click",syncData);
  $("#teamSearch").addEventListener("input",renderRankingTable);
  $("#addRecord").addEventListener("click",populateRecordForm);
  $("#emptyAdd").addEventListener("click",populateRecordForm);
  $("#exportData").addEventListener("click",exportData);
  $("#logStage").addEventListener("change",event=>{activeStage=event.target.value;activeLogRound="1";renderMatches()});
  $("#logRound").addEventListener("change",event=>{activeLogRound=event.target.value;renderMatches()});
  $("#recordStage").addEventListener("change",event=>{$("#recordRound").max=stageById(event.target.value).rounds});
  $("#recordTable").addEventListener("change",()=>{$$(".entry-team").forEach((select,i)=>select.value=state.roster[((Number($("#recordTable").value||1)-1)*4+i)%state.roster.length]||state.roster[i])});
  $("#loadDemo")?.addEventListener("click",()=>{$("#adminModal").close();makeDemoData()});
  $("#adminForm").addEventListener("submit",event=>{
    event.preventDefault();
    if (event.submitter?.value === "cancel") return $("#adminModal").close();
    state.config={cid:$("#cidInput").value.trim(),api:$("#apiInput").value.trim().replace(/\?+$/,""),autoRefresh:$("#autoRefresh").checked};
    saveState(); $("#adminModal").close(); scheduleRefresh();
    if (state.config.cid) syncData(); else toast("设置已保存，等待赛事 CID");
  });
  $("#recordForm").addEventListener("submit",event=>{
    event.preventDefault();
    if(event.submitter?.value==="cancel") return $("#recordModal").close();
    saveManualRecord();
  });
  window.addEventListener("hashchange",()=>{const view=location.hash.replace("#","");if(["ranking","tables"].includes(view))showView(view)});
}

bindEvents();
renderAll();
scheduleRefresh();
if (["ranking","tables"].includes(location.hash.slice(1))) showView(location.hash.slice(1));
syncData();
