const routes = {
  agent: {
    hall: "H1 · 应用与生态馆",
    title: "看 AI 怎么真正进入产品",
    description: "适合产品、增长、Agent 和消费应用从业者。重点看大模型、智能终端与真实使用场景。",
    duration: "建议 2.5 小时",
    audience: "产品 / Agent / 消费应用",
    stops: [
      ["阶跃星辰", "H1-C107 · 多模态与 AI 终端"],
      ["MiniMax", "H1-A801 · 通用大模型与 Agent"],
      ["阿里巴巴", "H1-C101 · 千问、AI 眼镜与智能终端"],
      ["Chance AI", "H4-FT A012 · 视觉理解现场挑战"],
    ],
  },
  hardtech: {
    hall: "H2 · 算力与硬科技馆",
    title: "从芯片一直看到基础设施",
    description: "适合研发、基础设施、产业投资和 ToB 从业者。这里更像 AI 产业的发动机舱。",
    duration: "建议 2 小时",
    audience: "芯片 / 算力 / 通信 / ToB",
    stops: [
      ["中国电信", "H2-C101 · 云网与算力基础设施"],
      ["燧原科技", "H2-C117 · AI 芯片与加速"],
      ["新华三", "H2-B516 · 智算与运维智能体"],
      ["中兴通讯", "H2-C1109 · 通信与核心技术"],
    ],
  },
  robot: {
    hall: "H3 · 机器人馆",
    title: "一次看完具身智能头部玩家",
    description: "适合机器人、硬件、制造和视觉内容创作者。现场演示多，建议早到并给排队留时间。",
    duration: "建议 3 小时",
    audience: "机器人 / 硬件 / 制造",
    stops: [
      ["智元机器人", "H3-C101 · 全系列具身机器人"],
      ["傅利叶", "H3-C116 · GR 系列与居家助手 Demo"],
      ["银河通用", "H3-C601 · 具身大模型与工业机器人"],
      ["宇树科技", "H3-C616 · 四足与人形机器人"],
    ],
  },
  startup: {
    hall: "H4 · 全域链接馆",
    title: "找下一批值得关注的新公司",
    description: "适合创业者、投资人、开发者和 BD。围绕行业应用、具身与终端、基础设施、前沿科技四条赛道边看边聊。",
    duration: "建议 2.5 小时",
    audience: "创业 / 投资 / 开发者 / BD",
    stops: [
      ["Future Tech", "158 家初创企业 · 四大前沿赛道"],
      ["OPC 专区", "22 个 One Person Company 项目"],
      ["开发者展区", "开放麦、技术分享与产品 Demo"],
      ["Chance AI", "H4-FT A012 · 带图来挑战视觉理解"],
    ],
  },
};

const tabs = [...document.querySelectorAll(".route-tab")];
const hall = document.querySelector("#routeHall");
const title = document.querySelector("#routeTitle");
const description = document.querySelector("#routeDescription");
const duration = document.querySelector("#routeDuration");
const audience = document.querySelector("#routeAudience");
const stops = document.querySelector("#routeStops");
const copyButton = document.querySelector("#copyRoute");
const toast = document.querySelector("#toast");
let activeRoute = "agent";

function renderRoute(key) {
  const route = routes[key];
  activeRoute = key;
  hall.textContent = route.hall;
  title.textContent = route.title;
  description.textContent = route.description;
  duration.textContent = route.duration;
  audience.textContent = route.audience;
  stops.innerHTML = route.stops.map((stop, index) => `
    <li>
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div><strong>${stop[0]}</strong><small>${stop[1]}</small></div>
    </li>
  `).join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.hidden = true;
  }, 2200);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => {
      item.classList.toggle("active", item === tab);
      item.setAttribute("aria-selected", item === tab ? "true" : "false");
    });
    renderRoute(tab.dataset.route);
  });
});

copyButton.addEventListener("click", async () => {
  const route = routes[activeRoute];
  const text = [
    `WAIC 2026 看展路线｜${route.hall}`,
    route.title,
    ...route.stops.map((stop, index) => `${index + 1}. ${stop[0]}｜${stop[1]}`),
    "完整展位地图：https://waic2026-map-daidai.netlify.app/",
  ].join("\n");

  try {
    await navigator.clipboard.writeText(text);
    showToast("路线已复制，可以发给搭子了");
  } catch {
    window.prompt("复制这条路线", text);
  }
});
