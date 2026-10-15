import { useEffect, useState } from
"react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Bot,
  BrainCircuit,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Command,
  Cpu,
  Download,
  FileText,
  Form,
  LayoutDashboard,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import "./App.css";

const navigation = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "AI Workspace", icon: BrainCircuit },
  { name: "AI Models", icon: Bot },
  { name: "Activity", icon: Activity },
  { name: "Settings", icon: Settings2 },
];

const initialActivity = [
  {
    id: 1,
    title: "Content generation completed",
    description: "Marketing campaign · GPT-4o",
    time: "2 minutes ago",
    status: "Completed",
    type: "content",
  },
  {
    id: 2,
    title: "Data analysis finished",
    description: "Sales analytics · AETHER Analyst",
    time: "18 minutes ago",
    status: "Completed",
    type: "analysis",
  },
  {
    id: 3,
    title: "Workflow processing",
    description: "Customer support automation",
    time: "35 minutes ago",
    status: "Running",
    type: "workflow",
  },
  {
    id: 4,
    title: "Security scan completed",
    description: "Workspace security check",
    time: "1 hour ago",
    status: "Completed",
    type: "security",
  },
  {
    id: 5,
    title: "AI response generated",
    description: "Research assistant · GPT-4o",
    time: "2 hours ago",
    status: "Completed",
    type: "content",
  },
];

const metrics = [
  {
    title: "Total AI requests",
    value: "24,892",
    change: "+18.6%",
    positive: true,
    icon: BrainCircuit,
    color: "purple",
  },
  {
    title: "Active workflows",
    value: "128",
    change: "+12.4%",
    positive: true,
    icon: Zap,
    color: "blue",
  },
  {
    title: "Average response",
    value: "1.24s",
    change: "-8.2%",
    positive: true,
    icon: Activity,
    color: "green",
  },
  {
    title: "System efficiency",
    value: "98.6%",
    change: "+2.1%",
    positive: true,
    icon: ShieldCheck,
    color: "orange",
  },
];

const chartData = [
  { day: "Mon", requests: 42, previous: 30 },
  { day: "Tue", requests: 58, previous: 42 },
  { day: "Wed", requests: 49, previous: 38 },
  { day: "Thu", requests: 76, previous: 50 },
  { day: "Fri", requests: 62, previous: 44 },
  { day: "Sat", requests: 88, previous: 59 },
  { day: "Sun", requests: 72, previous: 48 },
];

function MetricCard({ metric }) {
  const Icon = metric.icon;

  return (
    <article className="metric-card">
      <div className="metric-top">
        <span className={`metric-icon ${metric.color}`}>
          <Icon size={19} />
        </span>
        <button
          className="icon-button small"
          aria-label={`More options for ${metric.title}`}
        >
          <MoreHorizontal size={19} />
        </button>
      </div>

      <p className="metric-title">{metric.title}</p>

      <div className="metric-bottom">
        <strong className="metric-value">{metric.value}</strong>
        <span className="metric-change">
          {metric.positive ? (
            <ArrowUpRight size={15} />
          ) : (
            <ArrowDownRight size={15} />
          )}
          {metric.change}
        </span>
      </div>

      <p className="metric-caption">Compared to last week</p>
    </article>
  );
}

function ActivityChart() {
  return (
    <div className="chart-content">
      <div className="chart-y-labels">
        <span>100</span>
        <span>75</span>
        <span>50</span>
        <span>25</span>
        <span>0</span>
      </div>

      <div className="chart-main">
        <div className="chart-grid">
          {[0, 1, 2, 3, 4].map((line) => (
            <span key={line} />
          ))}
        </div>

        <div className="chart-bars">
          {chartData.map((item) => (
            <div className="chart-column" key={item.day}>
              <div className="bar-pair">
                <div
                  className="chart-bar previous"
                  style={{ height: `${item.previous}%` }}
                  title={`Previous: ${item.previous}`}
                />
                <div
                  className="chart-bar current"
                  style={{ height: `${item.requests}%` }}
                  title={`Requests: ${item.requests}`}
                />
              </div>
              <span className="chart-day">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function App() {
  const [activePage, setActivePage] = useState("Overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [activity, setActivity] = useState(() => {
  try {
    const savedActivity = localStorage.getItem("aether-ai-activity");
    return savedActivity
      ? JSON.parse(savedActivity)
      : initialActivity;
  } catch {
    return initialActivity;
 
  }
});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [notification, setNotification] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [promptText, setPromptText] = useState("");
const [workspaceResponse, setWorkspaceResponse] = useState("");
const [workspaceLoading, setWorkspaceLoading] = useState(false);

function runWorkspaceDemo() {
  const prompt = promptText.trim();

  if (!prompt || workspaceLoading) return;

  setWorkspaceLoading(true);
  setWorkspaceResponse("");

  // Simulated response for the portfolio demo.
  // This does not call a real AI model.
  setTimeout(() => {
    setWorkspaceResponse(
      `AETHER AI Demo\n\nYour request: "${prompt}"\n\n` +
      "Suggested next steps:\n" +
      "1. Define the desired outcome.\n" +
      "2. Break the task into manageable steps.\n" +
      "3. Review the result before using it."
    );

    setWorkspaceLoading(false);
  }, 700);
}

  const filteredActivity = activity.filter((item) => {
    const query = searchQuery.toLowerCase();

    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query)
    );
  });

  function runDemo() {
    setNotification("Your AI workflow has started successfully.");

    setActivity((previous) => [
      {
        id: Date.now(),
        title: "AI workflow executed",
        description: "AETHER AI · Demo workflow",
        time: "Just now",
        status: "Completed",
        type: "workflow",
      },
      ...previous,
    ]);
  }

  function addWorkflow() {
    setActivePage("AI Workspace");
    setNotification("Your AI workspace is ready.");
  }
  function runWorkspaceDemo() {
  const prompt = promptText.trim();

  if (!prompt || workspaceLoading) return;

  setWorkspaceLoading(true);
  setWorkspaceResponse("");

  setTimeout(() => {
    setWorkspaceResponse(
      `AETHER AI Demo\n\nYour request: "${prompt}"\n\n` +
      "Suggested next steps:\n" +
      "1. Define the desired outcome.\n" +
      "2. Break the task into manageable steps.\n" +
      "3. Review the result before using it."
    );
    setWorkspaceLoading(false);
  }, 700);
}

  function downloadReport() {
    const report = [
      "AETHER AI — Workspace Report",
      `Generated: ${new Date().toLocaleString()}`,
      "",
      "METRICS",
      ...metrics.map(
        (metric) => `${metric.title}: ${metric.value}`
      ),
      "",
      "RECENT ACTIVITY",
      ...activity.map(
        (item) =>
          `${item.title} | ${item.description} | ${item.status}`
      ),
    ].join("\n");

    const blob = new Blob([report], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "aether-ai-report.txt";
    link.click();

    URL.revokeObjectURL(url);
    setShowReport(false);
    setNotification("Your report has been downloaded.");
  }

  const pageTitle =
    activePage === "Overview"
      ? "Good morning, Imran 👋"
      : activePage;

  const pageSubtitle =
    activePage === "Overview"
      ? "Here's what's happening with your AI workspace today."
      : `Manage and explore your ${activePage.toLowerCase()} workspace.`;

  return (
    <div className="app-shell">
      {mobileMenuOpen && (
        <button
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation"
        />
      )}

      <aside
        className={`sidebar ${
          mobileMenuOpen ? "sidebar-open" : ""
        }`}
      >
        <div className="brand">
          <div className="brand-mark">
            <Command size={23} />
          </div>

          <div className="brand-copy">
            <strong>AETHER</strong>
            <span>INTELLIGENCE PLATFORM</span>
          </div>

          <button
            className="icon-button sidebar-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={19} />
          </button>
        </div>

        <button className="workspace-switcher">
          <span className="workspace-avatar">
            <BrainCircuit size={19} />
          </span>

          <span className="workspace-details">
            <strong>{workspaceName}</strong>
            <small>Free plan</small>
          </span>

          <ChevronDown size={16} />
        </button>

        <div className="sidebar-label">WORKSPACE</div>

        <nav className="navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            const selected = activePage === item.name;

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  selected ? "active" : ""
                }`}
                onClick={() => {
                  setActivePage(item.name);
                  setMobileMenuOpen(false);
                  setNotification("");
                }}
              >
                <Icon size={19} />
                <span>{item.name}</span>

                {item.name === "AI Models" && (
                  <span className="nav-badge">4</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-label tools-label">
          QUICK ACCESS
        </div>

        <button
          className="nav-item"
          onClick={addWorkflow}
        >
          <Sparkles size={19} />
          <span>New workflow</span>
          <Plus size={16} className="nav-trailing" />
        </button>

        <div className="sidebar-bottom">
          <div className="help-card">
            <span className="help-icon">
              <CircleHelp size={20} />
            </span>

            <strong>Need a hand?</strong>
            <p>Explore the platform and discover what AI can do.</p>

            <button
              onClick={() =>
                setNotification(
                  "Welcome to AETHER AI! Explore the sidebar to get started."
                )
              }
            >
              Open help center
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="upgrade-card">
            <span className="upgrade-icon">
              <Zap size={19} />
            </span>

            <strong>Unlock more power</strong>
            <p>Explore advanced AI capabilities.</p>

            <button
              onClick={() =>
                setNotification(
                  "Premium plans will be available in a future version."
                )
              }
            >
              Explore plans
              <ArrowUpRight size={15} />
            </button>
          </div>

          <div className="profile-row">
            <div className="profile-avatar">SI</div>

            <div className="profile-info">
              <strong>Sd Imran</strong>
              <span>Workspace owner</span>
            </div>

            <button
              className="icon-button"
              onClick={() => setActivePage("Settings")}
              aria-label="Open settings"
            >
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>
      </aside>

      {/* Part 3 continues here */}
      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button mobile-menu-button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={22} />
            </button>

            <div className="breadcrumb">
              <span>Workspace</span>
              <ChevronRight size={15} />
              <strong>{activePage}</strong>
            </div>
          </div>

          <div className="topbar-actions">
            <label className="search-box">
              <Search size={17} />
              <input
                type="search"
                placeholder="Search activity..."
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
              />
              <kbd>/</kbd>
            </label>

            <button
              className="icon-button notification-button"
              onClick={() =>
                setNotification("You're all caught up on notifications.")
              }
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span />
            </button>

            <div className="topbar-avatar">SI</div>
          </div>
        </header>

        <div className="page-content">
          {notification && (
            <div className="notification-toast">
              <span>{notification}</span>
              <button
                className="icon-button small"
                onClick={() => setNotification("")}
                aria-label="Dismiss notification"
              >
                <X size={17} />
              </button>
            </div>
          )}

          <section className="page-heading">
            <div>
              <div className="eyebrow">
                <span className="status-dot" />
                YOUR AI COMMAND CENTER
              </div>

              <h1>{pageTitle}</h1>
              <p>{pageSubtitle}</p>
            </div>

            <div className="heading-actions">
              <button
                className="button button-secondary"
                onClick={() => setShowReport(true)}
              >
                <Download size={17} />
                Export report
              </button>

              <button
                className="button button-primary"
                onClick={addWorkflow}
              >
                <Plus size={18} />
                New workflow
              </button>
            </div>
          </section>

          {activePage === "Overview" ? (
            <>
              <section className="welcome-banner">
                <div className="welcome-content">
                  <span className="welcome-tag">
                    <Sparkles size={14} />
                    INTRODUCING AETHER AI
                  </span>

                  <h2>
                    Intelligence that
                    <br />
                    moves you forward.
                  </h2>

                  <p>
                    One workspace to explore AI, automate tasks,
                    and turn ideas into action.
                  </p>

                  <button
                    className="button welcome-button"
                    onClick={addWorkflow}
                  >
                    Explore AI workspace
                    <ArrowUpRight size={17} />
                  </button>
                </div>

                <div className="welcome-visual">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  <div className="orbit orbit-three" />

                  <div className="visual-glow" />

                  <div className="visual-core">
                    <BrainCircuit size={49} strokeWidth={1.4} />
                  </div>

                  <span className="floating-chip chip-one">
                    <Sparkles size={15} />
                    Generative AI
                  </span>

                  <span className="floating-chip chip-two">
                    <Activity size={15} />
                    Smart analytics
                  </span>

                  <span className="floating-chip chip-three">
                    <Cpu size={15} />
                    Automation
                  </span>
                </div>
              </section>

              <section className="metrics-grid">
                {metrics.map((metric) => (
                  <MetricCard
                    metric={metric}
                    key={metric.title}
                  />
                ))}
              </section>

              <section className="analytics-grid">
                <article className="panel analytics-panel">
                  <div className="panel-header">
                    <div>
                      <h3>AI usage analytics</h3>
                      <p>Monitor your AI activity over time</p>
                    </div>

                    <button className="select-button">
                      This week
                      <ChevronDown size={15} />
                    </button>
                  </div>

                  <div className="chart-legend">
                    <span>
                      <i className="legend-dot current-dot" />
                      This week
                    </span>
                    <span>
                      <i className="legend-dot previous-dot" />
                      Previous week
                    </span>
                  </div>

                  <ActivityChart />

                  <div className="chart-footer">
                    <span>Weekly AI request volume</span>
                    <strong>
                      <ArrowUpRight size={15} />
                      18.6% increase
                    </strong>
                  </div>
                </article>

                <article className="panel performance-panel">
                  <div className="panel-header">
                    <div>
                      <h3>System performance</h3>
                      <p>Live workspace overview</p>
                    </div>

                    <span className="live-badge">
                      <span className="status-dot" />
                      Operational
                    </span>
                  </div>

                  <div className="performance-score">
                    <div className="score-ring">
                      <div className="score-inner">
                        <strong>98.6%</strong>
                        <span>Efficiency</span>
                      </div>
                    </div>
                  </div>

                  <div className="performance-stats">
                    <div>
                      <span>API response time</span>
                      <strong>124 ms</strong>
                    </div>
                    <div>
                      <span>Successful requests</span>
                      <strong>99.8%</strong>
                    </div>
                    <div>
                      <span>Active AI services</span>
                      <strong>4 services</strong>
                    </div>
                  </div>
                </article>
              </section>

              <section className="panel activity-panel">
                <div className="panel-header">
                  <div>
                    <h3>Recent activity</h3>
                    <p>Stay up to date with your AI workspace</p>
                  </div>

                  <button
                    className="text-button"
                    onClick={() => setActivePage("Activity")}
                  >
                    View all
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="activity-table">
                  <div className="activity-table-head">
                    <span>ACTIVITY</span>
                    <span>STATUS</span>
                    <span>TIME</span>
                    <span />
                  </div>

                  {filteredActivity.slice(0, 4).map((item) => (
                    <div className="activity-row" key={item.id}>
                      <div className="activity-description">
                        <span className={`activity-icon ${item.type}`}>
                          {item.type === "analysis" ? (
                            <Activity size={18} />
                          ) : item.type === "security" ? (
                            <ShieldCheck size={18} />
                          ) : item.type === "workflow" ? (
                            <Zap size={18} />
                          ) : (
                            <MessageSquare size={18} />
                          )}
                        </span>

                        <div>
                          <strong>{item.title}</strong>
                          <span>{item.description}</span>
                        </div>
                      </div>

                      <span
                        className={`activity-status ${
                          item.status === "Running" ? "running" : ""
                        }`}
                      >
                        <i />
                        {item.status}
                      </span>

                      <span className="activity-time">
                        {item.time}
                      </span>

                      <button
                        className="icon-button small"
                        aria-label={`Options for ${item.title}`}
                        onClick={() =>
                          setNotification(
                            `Activity: ${item.title}`
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  ))}

                  {filteredActivity.length === 0 && (
                    <p className="empty-state">
                      No activity matches your search.
                    </p>
                  )}
                </div>
              </section>
            </>
          ) : activePage === "AI Workspace" ? (
            <section className="workspace-page">
              <div className="workspace-intro panel">
                <div className="workspace-intro-icon">
                  <WandSparkles size={29} />
                </div>
                <h2>Your AI workspace</h2>
                <p>
                  Choose a starting point and explore what your AI
                  workspace can do.
                </p>

                <button
                  className="button button-primary"
                  onClick={runDemo}
                >
                  <Sparkles size={17} />
                  Run demo workflow
                </button>
              </div>

              <div className="workspace-tools">
                <article className="tool-card panel">
                  <span className="tool-icon purple">
                    <MessageSquare size={23} />
                  </span>
                  <h3>AI Assistant</h3>
                  <p>
                    Explore conversational AI for writing,
                    brainstorming, and research.
                  </p>
                  <button
                    className="text-button"
                    onClick={runDemo}
                  >
                    Try assistant <ArrowUpRight size={16} />
                  </button>
                </article>

                <article className="tool-card panel">
                  <span className="tool-icon blue">
                    <Activity size={23} />
                  </span>
                  <h3>Data Analyst</h3>
                  <p>
                    Explore analytics workflows and structured
                    data insights.
                  </p>
                  <button
                    className="text-button"
                    onClick={runDemo}
                  >
                    Explore analytics <ArrowUpRight size={16} />
                  </button>
                </article>

                <article className="tool-card panel">
                  <span className="tool-icon green">
                    <Zap size={23} />
                  </span>
                  <h3>Automation</h3>
                  <p>
                    Test a demo workflow and see it appear in
                    recent activity.
                  </p>
                  <button
                    className="text-button"
                    onClick={runDemo}
                  >
                    Run automation <ArrowUpRight size={16} />
                  </button>
                </article>
              </div>
            </section>
          ) : (
            <section className="generic-page panel">
              <div className="generic-icon">
                {activePage === "AI Models" ? (
                  <Bot size={29} />
                ) : activePage === "Activity" ? (
                  <Activity size={29} />
                ) : (
                  <Settings2 size={29} />
                )}
              </div>

              <h2>{activePage}</h2>

              <p>
                {activePage === "AI Models"
                  ? "Explore the models configured for your AETHER AI workspace."
                  : activePage === "Activity"
                  ? "Review recent events and operations across your workspace."
                  : "Manage your workspace preferences and account settings."}
              </p>

              {activePage === "AI Models" ? (
                <div className="model-list">
                  {[
                    ["GPT-4o", "General-purpose AI", "Available"],
                    ["AETHER Analyst", "Data analysis", "Demo"],
                    ["AETHER Creative", "Content generation", "Demo"],
                    ["AETHER Vision", "Image understanding", "Demo"],
                  ].map(([name, description, status]) => (
                    <div className="model-row" key={name}>
                      <span className="model-icon">
                        <BrainCircuit size={20} />
                      </span>

                      <div>
                        <strong>{name}</strong>
                        <span>{description}</span>
                      </div>

                      <span className="model-status">{status}</span>
                    </div>
                  ))}
                </div>
              ) : activePage === "Activity" ? (
                <div className="generic-activity-list">
                  {filteredActivity.map((item) => (
                    <div className="generic-activity-item" key={item.id}>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                      </div>

                      <span className="activity-time">{item.time}</span>
                    </div>
                  ))}

                  {filteredActivity.length === 0 && (
                    <p className="empty-state">
                      No activity matches your search.
                    </p>
                  )}
                </div>
              ) : (
                <div className="settings-options">
                  <div>
                    <strong>Workspace name</strong>
                    <span>{workspaceName}</span>
                  </div>

                  <div>
                    <strong>Account</strong>
                    <span>Sd Imran · Workspace owner</span>
                  </div>

                  <div>
                    <strong>Plan</strong>
                    <span>Free plan · Demo workspace</span>
                  </div>
                </div>
              )}
            </section>
          )}
          <footer className="page-footer">
            <span>
              © 2026 AETHER AI. Built for intelligent workflows.
            </span>

            <span className="footer-status">
              <span className="status-dot" />
              All systems operational
            </span>
          </footer>
        </div>
      </main>

      {showReport && (
        <div
          className="modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowReport(false);
            }
          }}
        >
          <section
            className="report-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-title"
          >
            <div className="modal-header">
              <span className="modal-icon">
                <FileText size={23} />
              </span>

              <button
                className="icon-button"
                onClick={() => setShowReport(false)}
                aria-label="Close report dialog"
              >
                <X size={20} />
              </button>
            </div>

            <h2 id="report-title">Export workspace report</h2>

            <p>
              Generate a text report containing your dashboard
              metrics and recent activity.
            </p>

            <div className="report-preview">
              <div>
                <span>Report format</span>
                <strong>Text file (.txt)</strong>
              </div>

              <div>
                <span>Metrics included</span>
                <strong>{metrics.length} metrics</strong>
              </div>

              <div>
                <span>Activity records</span>
                <strong>{activity.length} records</strong>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="button button-secondary"
                onClick={() => setShowReport(false)}
              >
                Cancel
              </button>

              <button
                className="button button-primary"
                onClick={downloadReport}
              >
                <Download size={17} />
                Download report
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;