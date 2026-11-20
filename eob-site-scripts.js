/* The Exec Ops Brief site-wide behavior layer.
   Idempotent article, shop, navigation, form and measurement modules.
   DOM selectors target the Squarespace 7.1 blog structure. */
(function () {
  'use strict';

  var CFG = {
    blogBase: '/library/',        // article URL prefix on the live site
    maxRelated: 3,
    brand: {
      paper:  '#F3F0E9',
      ink:    '#1B1712',
      navy:   '#1C2C3A',
      oxblood:'#7A2129',
      slate:  '#5A5348',
      rule:   '#DED7C7'
    }
  };

  // --- Article manifest (slug, title, pillar). Keep in sync as articles ship.
  var ARTICLES = [
    {s:'what-does-a-chief-of-staff-do', t:'What Does a Chief of Staff Actually Do?', p:'The Role, Defined'},
    {s:'chief-of-staff-vs-executive-assistant-vs-coo', t:'Chief of Staff vs. Executive Assistant vs. COO', p:'The Role, Defined'},
    {s:'three-types-of-chief-of-staff', t:'The Three Types of Chief of Staff', p:'The Role, Defined'},
    {s:'day-in-the-life-chief-of-staff', t:'A Day in the Life of a Chief of Staff', p:'The Role, Defined'},
    {s:'what-an-executive-assistant-to-a-ceo-does', t:'What an Executive Assistant to a CEO Actually Does', p:'The Role, Defined'},
    {s:'chief-of-staff-founder-vs-established-ceo', t:'Chief of Staff to a Founder vs. an Established CEO', p:'The Role, Defined'},
    {s:'when-does-a-company-need-a-chief-of-staff', t:'When Does a Company Actually Need a Chief of Staff?', p:'The Role, Defined'},
    {s:'ea-to-chief-of-staff-path', t:'The EA-to-Chief-of-Staff Path', p:'The Path In'},
    {s:'chief-of-staff-certifications-compared', t:'Chief of Staff Certifications and Courses, Compared', p:'The Path In'},
    {s:'skills-to-get-hired-as-chief-of-staff', t:'The Skills That Actually Get You Hired', p:'The Path In'},
    {s:'resume-linkedin-for-exec-ops', t:'Position Your Resume and LinkedIn for Exec-Ops Roles', p:'The Path In'},
    {s:'land-first-chief-of-staff-role-without-the-title', t:'Land Your First Chief of Staff Role Without the Title', p:'The Path In'},
    {s:'breaking-into-chief-of-staff-from-consulting-or-finance', t:'Breaking Into Chief of Staff From Consulting or Finance', p:'The Path In'},
    {s:'run-effective-leadership-team-meeting', t:'How to Run an Effective Leadership Team Meeting', p:'The Craft / Playbooks'},
    {s:'first-90-days-chief-of-staff-operating-plan', t:'The First 90 Days as a Chief of Staff', p:'The Craft / Playbooks'},
    {s:'managing-up-chief-of-staff', t:'Managing Up: Make Your Principal More Effective', p:'The Craft / Playbooks'},
    {s:'single-source-of-truth-decision-logs', t:'Building a Single Source of Truth', p:'The Craft / Playbooks'},
    {s:'how-to-build-an-operating-cadence', t:'How to Build an Operating Cadence', p:'The Craft / Playbooks'},
    {s:'board-meeting-prep-chief-of-staff', t:'Board Meeting Prep: The Playbook', p:'The Craft / Playbooks'},
    {s:'prioritization-frameworks-for-operators', t:'Prioritization Frameworks Every Operator Should Know', p:'The Craft / Playbooks'},
    {s:'how-to-write-an-executive-memo', t:'How to Write an Executive Memo That Gets Read', p:'The Craft / Playbooks'},
    {s:'leading-cross-functional-projects-without-authority', t:'Leading Cross-Functional Projects Without Authority', p:'The Craft / Playbooks'},
    {s:'building-and-running-an-okr-process', t:'Building and Running an OKR Process', p:'The Craft / Playbooks'},
    {s:'protecting-an-executives-time-and-focus', t:'How Great Operators Protect an Executive’s Time', p:'The Craft / Playbooks'},
    {s:'gatekeeping-well-saying-no-for-your-principal', t:'Gatekeeping Well: Say No for Your Principal', p:'The Craft / Playbooks'},
    {s:'chief-of-staff-salary-guide', t:'Chief of Staff Salary Guide', p:'Comp & Careers'},
    {s:'negotiate-chief-of-staff-offer', t:'How to Negotiate a Chief of Staff Offer', p:'Comp & Careers'},
    {s:'fractional-vs-full-time-chief-of-staff', t:'Fractional vs. Full-Time Chief of Staff', p:'Comp & Careers'},
    {s:'how-to-read-exec-ops-job-post', t:'How to Read a $150k+ Exec-Ops Job Post', p:'Comp & Careers'},
    {s:'equity-for-chiefs-of-staff', t:'Equity for Chiefs of Staff', p:'Comp & Careers'},
    {s:'chief-of-staff-exit-paths', t:'Chief of Staff Exit Paths: What Operators Do Next', p:'The Career'},
    {s:'influence-without-authority', t:'Influence Without Authority', p:'Operator Mindset'},
    {s:'what-is-a-force-multiplier', t:'What It Means to Be a Force Multiplier', p:'Operator Mindset'},
    {s:'avoiding-burnout-operations-role', t:'Avoiding Burnout in a High-Intensity Operations Role', p:'Operator Mindset'},
    {s:'the-trust-equation', t:'The Trust Equation', p:'Operator Mindset'},
    {s:'how-to-become-a-chief-of-staff', t:'How to Become a Chief of Staff', p:'The Path In'},
    {s:'chief-of-staff-interview-questions', t:'Chief of Staff Interview Questions', p:'The Path In'},
    {s:'do-you-need-an-mba-to-be-a-chief-of-staff', t:'Do You Need an MBA to Be a Chief of Staff?', p:'The Path In'},
    {s:'how-to-create-a-chief-of-staff-role', t:'How to Create a Chief of Staff Role', p:'The Path In'},
    {s:'how-to-become-a-fractional-chief-of-staff', t:'How to Become a Fractional Chief of Staff', p:'The Role, Defined'},
    {s:'will-ai-replace-executive-assistants', t:'Will AI Replace Executive Assistants?', p:'The Role, Defined'},
    {s:'executive-assistant-salary-and-how-to-get-a-raise', t:'Executive Assistant Salary and How to Get a Raise', p:'Comp & Careers'},
    {s:'how-to-grow-your-career-as-an-executive-assistant', t:'How to Grow Your Career as an Executive Assistant', p:'The Path In'},
    {s:'executive-business-partner-role', t:'Executive Business Partner: What the Title Means and What It Pays', p:'The Role, Defined'},
    {s:'executive-assistant-interview-questions', t:'Executive Assistant Interview Questions: What They Ask by Stage', p:'The Path In'},
    {s:'senior-executive-assistant-leveling', t:'Senior Executive Assistant: What Actually Changes at the Senior Level', p:'Comp & Careers'}
  ];

  /* Keyword-routed active callouts. First matching live destination wins. */
  var CALLOUTS = [
    { match:['chief-of-staff-certifications-compared','land-first-chief-of-staff-role-without-the-title','ea-to-chief-of-staff-path','certification','credential'],
      title:'If you want a structured way into the role, Nova is the course we point people to',
      body:'Most people learn the craft on the job, but a focused certification shortens the ramp and gives you language for interviews. Nova is the most established option, and Brief readers get $100 off.',
      cta:'See the Nova Chief of Staff course',
      href:'https://novachiefofstaff.mykajabi.com/a/2147831554/z9P6cao2' },
    /* Free template callouts. */
    { match:['single-source-of-truth-decision-logs','how-to-build-an-operating-cadence','run-effective-leadership-team-meeting'],
      title:'The decision log this playbook describes exists as a free Notion template',
      body:'A running record of what was decided, who owns it, why, and when to revisit. Ours ships with the full field schema and seeded examples, ready to duplicate into your workspace.',
      cta:'Get the free Decision Log template',
      href:'/resources#notion-templates' },
    { match:['managing-up-chief-of-staff','protecting-an-executives-time-and-focus','prioritization-frameworks-for-operators'],
      title:'The weekly brief is a free Notion template',
      body:'A live board for the one-page brief your principal actually reads: priorities, flags, what needs them, and a lightweight archive of past weeks.',
      cta:'Get the free Weekly Priorities template',
      href:'/resources#notion-templates' },
    { match:['first-90-days-chief-of-staff-operating-plan'],
      title:'Work this plan as a live tracker, not a printout',
      body:'The full 30/60/90 plan is a free Notion template with every focus item, artifact, and milestone pre-loaded. Set dates against your start date and work the board.',
      cta:'Get the free First 90 Days tracker',
      href:'/resources#notion-templates' },
    { match:['chief-of-staff-interview-questions','how-to-become-a-chief-of-staff','how-to-read-exec-ops-job-post','resume-linkedin-for-exec-ops'],
      title:'Running a search? Track it like an operator',
      body:'Our free Notion Job Search Tracker is a light pipeline: every role, its stage, the comp on the table, and the single next step that keeps it moving.',
      cta:'Get the free Job Search Tracker',
      href:'/resources#notion-templates' }
  ];

  /* Independent tool-callout slot. Exact-slug matching; first match wins.
   Uses a late anchor to avoid adjacent product/tool callouts. */
  var TOOL_CALLOUTS = [
    /* ---- Offer evaluator (/offer-evaluator) ---- */
    { match:['negotiate-chief-of-staff-offer','fractional-vs-full-time-chief-of-staff'],
      title:'If you are holding a real offer, score it before you answer',
      body:'The offer evaluator compares base with a named current source, separates guaranteed cash from target cash, checks equity information readiness, and identifies the terms and questions still open.',
      cta:'Open the offer evaluator',
      href:'/offer-evaluator' },
    { match:['equity-for-chiefs-of-staff'],
      title:'Run the actual grant through the evaluator',
      body:'Equity is where offers stay vague. The evaluator does not treat private equity as cash or assign it a market grade. It checks whether you have ownership or fully diluted shares, strike price, the latest 409A and date, vesting, and the exercise window.',
      cta:'Open the offer evaluator',
      href:'/offer-evaluator' },

    /* ---- Salary and comp benchmarker (/salary-benchmarker) ---- */
    /* Posting-based comparisons route to the compensation explorer. */
    { match:['how-to-read-exec-ops-job-post'],
      title:'This post gives you a range. Here is what the rest of the market is posting.',
      body:'The comp explorer slices the live board by role family, metro and work arrangement, so you can put the range in front of you next to what comparable postings are advertising this week. Every figure carries its sample size, and slices too thin to publish say so.',
      cta:'Open the comp explorer',
      href:'/salary-data' },
    { match:['chief-of-staff-salary-guide','executive-assistant-salary-and-how-to-get-a-raise'],
      title:'Compare the pay sources for your role',
      body:'The benchmarker shows role-specific source cards, including observed company-stage medians for Chiefs of Staff and distinct broad, incumbent, and premium comparisons for EAs. Sources, populations, and limitations are cited in the tool.',
      cta:'Open the free salary benchmarker',
      href:'/salary-benchmarker' },
    { match:['how-to-create-a-chief-of-staff-role','how-to-become-a-fractional-chief-of-staff'],
      title:'Put a real number on the seat',
      body:'Whether you are pitching this role internally or pricing your own time against it, start with named comparisons. The benchmarker shows what each source measures without manufacturing a universal role, location, or experience multiplier.',
      cta:'Open the salary benchmarker',
      href:'/salary-benchmarker' },

    /* ---- Readiness quiz (/readiness-quiz) ---- */
    { match:['chief-of-staff-interview-questions'],
      title:'An interview loop probes six things. Find your soft spot first.',
      body:'The readiness quiz scores you across the six competencies the role is really hiring for and tells you which ones your evidence is thinnest on. Twelve questions, and you get a breakdown per dimension.',
      cta:'Take the readiness quiz',
      href:'/readiness-quiz' },
    { match:['how-to-become-a-chief-of-staff','skills-to-get-hired-as-chief-of-staff',
             'ea-to-chief-of-staff-path','chief-of-staff-certifications-compared',
             'land-first-chief-of-staff-role-without-the-title',
             'breaking-into-chief-of-staff-from-consulting-or-finance',
             'do-you-need-an-mba-to-be-a-chief-of-staff',
             'how-to-grow-your-career-as-an-executive-assistant'],
      title:'Before you plan the next move, find out where you actually stand',
      body:'The readiness quiz is twelve questions across the six competencies that separate people who thrive in this seat from people who struggle. You get a score for each one and a short list of the dimensions where your evidence is still thin.',
      cta:'Take the readiness quiz',
      href:'/readiness-quiz' },
    { match:['what-does-a-chief-of-staff-do','chief-of-staff-vs-executive-assistant-vs-coo',
             'day-in-the-life-chief-of-staff','will-ai-replace-executive-assistants'],
      title:'So is this you?',
      body:'Twelve questions, six competencies, and an honest read on how ready you are for the seat today. You will get a score for each dimension and the two or three worth working on first.',
      cta:'Take the readiness quiz',
      href:'/readiness-quiz' },

    /* ---- First 90 days plan (/first-90-days) ---- */
    { match:['first-90-days-chief-of-staff-operating-plan'],
      title:'Build your version of this plan, dated to your start',
      body:'The First 90 Days tool turns this playbook into a working checklist: before day one, days 1 to 30, 31 to 60, and 61 to 90, with the principal-alignment checks built into each phase. Tick items off in the browser and print the plan. No account needed.',
      cta:'Open the First 90 Days tool',
      href:'/first-90-days' },
    { match:['managing-up-chief-of-staff','how-to-build-an-operating-cadence'],
      title:'The alignment conversation has a checklist',
      body:'Our free First 90 Days tool carries the principal-alignment checks for week one, day 30, and day 60: what success means, what you own outright, what you can decide without asking. Work it as a checklist and print it.',
      cta:'Open the First 90 Days tool',
      href:'/first-90-days' },

    /* Roles-board callouts use exact slugs and preserve other callout routes. */
    { match:['resume-linkedin-for-exec-ops'],
      title:'Once the resume is right, go where the roles actually are',
      body:'The roles board collects exec-ops openings from every source we track and refreshes daily. One rule is enforced in code: if the source firm did not publish a comp figure, the role is not there, and the midpoint of that figure is at least $100,000. You can see the compensation before you spend an evening on the application.',
      cta:'Open the roles board',
      href:'/roles' },
    { match:['chief-of-staff-exit-paths'],
      title:'What the next seat pays, before you decide which one to chase',
      body:'Every role on our board publishes its compensation, because a posting that hides pay does not make it in. Sort by highest comp and filter by track and location to see what the exits from this seat are worth right now rather than in a survey from last year.',
      cta:'Open the roles board',
      href:'/roles' },
    { match:['three-types-of-chief-of-staff'],
      title:'See which of these the market is hiring for this week',
      body:'The roles board refreshes daily and filters by role track and location, so you can look at what is genuinely open before you aim a search at one version of the job. Every listing on it carries a published comp figure whose midpoint is at least $100,000.',
      cta:'Open the roles board',
      href:'/roles' },
    { match:['chief-of-staff-founder-vs-established-ceo'],
      title:'The kind of company you would be joining is visible in the posting',
      body:'Our roles board tags each opening by source type, so a venture portfolio posting reads differently from a recruiter listing, and you can filter by location and compensation alongside it. Every role on it carries a published comp figure whose midpoint is at least $100,000.',
      cta:'Open the roles board',
      href:'/roles' },
    { match:['when-does-a-company-need-a-chief-of-staff'],
      title:'See the companies hiring one right now',
      body:'The roles board carries live exec-ops openings from every source we track, refreshed daily. It is the fastest way to see which stages and company types are actually creating this seat, rather than arguing from first principles about when they should.',
      cta:'Open the roles board',
      href:'/roles' },
    { match:['what-an-executive-assistant-to-a-ceo-does'],
      title:'What the seat pays, in live postings',
      body:'Our roles board carries executive assistant and exec-ops openings that publish a real comp figure, with a midpoint of at least $100,000, refreshed daily. Filter by location and track to see what CEO-facing seats are going for now.',
      cta:'Open the roles board',
      href:'/roles' }
  ];

  // Heading measure correction, scoped to injected EOB blocks before paint.
  (function headingMeasure(){
    try {
      if (document.getElementById('eob-measure-fix')) return;
      var css = '[id^="eob-"] h1{max-width:48rem !important}'
              // Exclude tightly measured section and CTA headings.
              + '[id^="eob-"] .prose h2,[id^="eob-"] .band-head h2{max-width:48rem !important}';
      var st = document.createElement('style');
      st.id = 'eob-measure-fix';
      st.textContent = css;
      (document.head || document.documentElement).appendChild(st);
    } catch(e){}
  })();

  // ---- helpers -----------------------------------------------------------
  function currentSlug() {
    // path-agnostic: last URL segment; run() confirms it is a known article, so
    // this works whether articles are served at /library/, /learn/, or elsewhere.
    var p = location.pathname.replace(/\/+$/, '');
    return p.substring(p.lastIndexOf('/') + 1) || null;
  }
  function currentBase() {
    var p = location.pathname.replace(/\/+$/, '');
    return p.substring(0, p.lastIndexOf('/') + 1);
  }
  function findArticle(slug){
    for (var k=0;k<ARTICLES.length;k++){ if(ARTICLES[k].s===slug) return ARTICLES[k]; }
    return null;
  }
  function byId(id){ return document.getElementById(id); }
  function el(tag, css, html){
    var e = document.createElement(tag);
    if (css) e.style.cssText = css;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function contentEl(){
    var sel = ['.blog-item-content .sqs-layout', '.blog-item-content',
               'article .sqs-layout', 'main .sqs-layout', 'main article', 'main'];
    for (var i=0;i<sel.length;i++){ var n=document.querySelector(sel[i]); if(n) return n; }
    return null;
  }

  // --- Auto header image ------------------------------------------------
  // The Squarespace blog template does not render a post's featured image on
  // the article page (it only feeds the social/OG image and the blog-grid
  // thumbnail). This pulls that same featured image in as an in-article header,
  // sourced from the per-article og:image meta (already sized ?format=1500w).
  // Runs on every /library/ article page, is idempotent, and does not depend on
  // the ARTICLES manifest so it also covers future posts automatically.
  function autoHeader(){
    if (location.pathname.indexOf(CFG.blogBase) !== 0) return;   // /library/<slug> only
    if (location.pathname.indexOf('/category/') > -1) return;     // not category listings
    var content = document.querySelector('.blog-item-content');
    if (!content || content.querySelector('.eob-auto-header')) return;  // absent or already added
    var meta = document.querySelector('meta[property="og:image"]') ||
               document.querySelector('meta[name="twitter:image"]');
    var src = meta && (meta.getAttribute('content') || '');
    if (!src) return;
    src = src.replace(/^http:\/\//, 'https://');
    if (src.indexOf('format=') === -1) src += (src.indexOf('?') > -1 ? '&' : '?') + 'format=1500w';
    var fig = el('figure', 'margin:0 0 30px;line-height:0;');
    fig.className = 'eob-auto-header';
    var img = el('img', 'display:block;width:100%;height:auto;border:1px solid ' + CFG.brand.rule + ';border-radius:3px;');
    img.src = src; img.alt = ''; img.setAttribute('loading', 'eager');
    fig.appendChild(img);
    content.insertBefore(fig, content.firstChild);
  }

  // --- Branded in-article graphics --------------------------------------
  // GRAPHICS: flat manifest. Each { slug, after, type, data }.
  //   after = heading-text substring to anchor after (graphic is SKIPPED if the
  //           heading is not found, so it never lands in the wrong place).
  //   type  = 'note' | 'stat' | 'table' | 'steps' | 'checklist'.
  // Populate from the article's own fact-checked text. Empty = module no-ops.
  var GFX = {
    accent:'#7A2129', accent2:'#1C2C3A', ink:'#1B1712', bg:'#F3F0E9',
    surface:'#ffffff', rule:'#DED7C7', muted:'#5A5348',
    head:'"Spectral",Georgia,serif', body:'"Public Sans",system-ui,sans-serif'
  };
  var GRAPHICS = [
    {
      "slug": "chief-of-staff-salary-guide",
      "after": "What the role pays in 2025",
      "type": "stat",
      "data": {
        "kicker": "US Chief of Staff pay, 2025",
        "items": [
          {
            "value": "$117.5k to $200k",
            "label": "span of observed company-stage medians"
          },
          {
            "value": "$160,000",
            "label": "overall median base, CoS Network 2025"
          },
          {
            "value": "$167,954",
            "label": "overall mean base, CoS Network 2025"
          },
          {
            "value": "56% / 54%",
            "label": "bonus / equity incidence in a small mixed-geography survey"
          }
        ]
      }
    },
    {
      "slug": "chief-of-staff-salary-guide",
      "after": "1. Company stage",
      "type": "table",
      "data": {
        "title": "Median base salary by company stage",
        "headers": [
          "Company stage",
          "Median base"
        ],
        "rows": [
          [
            "Bootstrapped",
            "$117,500"
          ],
          [
            "Seed",
            "$140,000"
          ],
          [
            "Series A",
            "$160,000"
          ],
          [
            "Series B",
            "$170,000"
          ],
          [
            "Series C",
            "$196,000"
          ],
          [
            "Series D",
            "$197,500"
          ],
          [
            "Late-stage private",
            "$190,000"
          ],
          [
            "Public company",
            "$200,000"
          ]
        ],
        "caption": "Ask a Chief of Staff, 2025 compensation report (n=512 overall; stage-cell sizes not published)."
      }
    },
    {
      "slug": "chief-of-staff-vs-executive-assistant-vs-coo",
      "after": "The quick version",
      "type": "table",
      "data": {
        "title": "Who owns what",
        "headers": [
          "Role",
          "What they own"
        ],
        "rows": [
          [
            "Executive assistant",
            "The leader's time and logistics"
          ],
          [
            "Chief of staff",
            "The leader's priorities and leadership rhythm"
          ],
          [
            "COO",
            "The company's operations, with formal authority"
          ]
        ],
        "caption": "The EA manages the day, the chief of staff manages the agenda, the COO manages the machine."
      }
    },
    {
      "slug": "three-types-of-chief-of-staff",
      "after": "Why the role splits into types",
      "type": "table",
      "data": {
        "title": "The three types of chief of staff",
        "headers": [
          "Type",
          "What they do",
          "A company needs one when"
        ],
        "rows": [
          [
            "Operator",
            "Turns strategy into execution",
            "Execution is the bottleneck"
          ],
          [
            "Strategist",
            "Combines operating skill with big-picture thinking",
            "Facing a strategic inflection"
          ],
          [
            "Proxy",
            "The leader's trusted stand-in",
            "The leader needs representation in defined settings and will delegate the matching authority"
          ]
        ]
      }
    },
    {
      "slug": "three-types-of-chief-of-staff",
      "after": "How to pick the right type",
      "type": "steps",
      "data": {
        "title": "Picking the type by working backward from the gap",
        "items": [
          {
            "h": "Name the bottleneck",
            "d": "Is it execution, strategy, or the leader's own bandwidth?"
          },
          {
            "h": "Match experience and authority to the assignment",
            "d": "A proxy needs relevant context and clearly delegated authority. An operator needs enough credibility and process skill for the teams involved."
          },
          {
            "h": "Write the job around the type",
            "d": "Describe the actual work and the outcomes you expect, not a vague title."
          },
          {
            "h": "Review the remit as needs change",
            "d": "A chief of staff may move among operating, strategy, and proxy work. Revisit the scope with the principal instead of assuming a fixed progression."
          }
        ]
      }
    },
    {
      "slug": "first-90-days-chief-of-staff-operating-plan",
      "after": "A 90-Day Plan on One Page",
      "type": "steps",
      "data": {
        "title": "The first 90 days at a glance",
        "items": [
          {
            "h": "Days 1 to 30: Diagnose",
            "d": "Listen widely, understand the principal, and map the operating rhythm. Change little."
          },
          {
            "h": "Days 31 to 60: Earn trust",
            "d": "Deliver one or two visible wins and build the working relationship across the leadership team."
          },
          {
            "h": "Days 61 to 90: Install the system",
            "d": "Set the operating cadence, stand up a single source of truth, and agree on how your success will be measured."
          }
        ]
      }
    },
    {
      "slug": "the-trust-equation",
      "after": "Use the equation as a prompt",
      "type": "note",
      "data": {
        "title": "The Trust Equation",
        "body": "Trust = (Credibility + Reliability + Intimacy) / Self-Orientation. Three factors in the numerator build trust. The denominator, self-orientation, quietly erodes it. From The Trusted Advisor by Maister, Green, and Galford.",
        "variant": "info"
      }
    },
    {
      "slug": "the-trust-equation",
      "after": "Reading the equation as an operator",
      "type": "table",
      "data": {
        "title": "The four factors",
        "headers": [
          "Factor",
          "What it is"
        ],
        "rows": [
          [
            "Credibility",
            "About words. Can you be believed?"
          ],
          [
            "Reliability",
            "About actions. Do you do what you say you will do?"
          ],
          [
            "Intimacy",
            "About safety. Do people feel safe being open with you?"
          ],
          [
            "Self-orientation",
            "Where your focus sits: on yourself, or on the shared goal."
          ]
        ],
        "caption": "Intimacy and self-orientation move trust the most; credibility and reliability do the least on their own."
      }
    },
    {
      "slug": "prioritization-frameworks-for-operators",
      "after": "How to Actually Choose",
      "type": "table",
      "data": {
        "title": "Matching the framework to the decision",
        "headers": [
          "Framework",
          "Best for"
        ],
        "rows": [
          [
            "Eisenhower matrix",
            "Managing your own time and attention"
          ],
          [
            "RICE",
            "Defensible ranking of a backlog of comparable projects"
          ],
          [
            "ICE",
            "Fast, iterative experiment prioritization"
          ],
          [
            "MoSCoW",
            "Scoping what is in and out under a deadline"
          ],
          [
            "Value versus effort",
            "Quick group alignment on a whiteboard"
          ]
        ]
      }
    },
    {
      "slug": "prioritization-frameworks-for-operators",
      "after": "RICE: compare a backlog",
      "type": "note",
      "data": {
        "title": "The RICE score",
        "body": "RICE score = (Reach times Impact times Confidence) divided by Effort. Lower confidence reduces the score, which helps separate an evidence-backed idea from one built on several assumptions. It doesn't make the number objectively true.",
        "variant": "info"
      }
    },
    {
      "slug": "negotiate-chief-of-staff-offer",
      "after": "The terms people forget",
      "type": "checklist",
      "data": {
        "title": "Movable terms beyond base salary",
        "items": [
          "Sign-on bonus, which can bridge a gap when base is capped",
          "Severance, which matters more in a role tied so closely to one person",
          "Title and level, which affect your next role as much as this one",
          "Refresh grants and review timing, so a strong first year is recognized",
          "Remote or relocation terms, and how comp is benchmarked if you work remotely"
        ]
      }
    },
    {
      "slug": "negotiate-chief-of-staff-offer",
      "after": "Mistakes that cost Chiefs of Staff money",
      "type": "checklist",
      "data": {
        "title": "Mistakes to avoid",
        "items": [
          "Accepting the title in place of scope",
          "Treating private equity as cash before you have ownership or fully diluted shares, strike price, the latest 409A and date, vesting, and the exercise window",
          "Ignoring severance in a principal-dependent role",
          "Negotiating past the point of goodwill"
        ]
      }
    },
    {
      "slug": "how-to-build-an-operating-cadence",
      "after": "A Practical Cadence to Start From",
      "type": "table",
      "data": {
        "title": "A workable default cadence",
        "headers": [
          "Layer",
          "Its job"
        ],
        "rows": [
          [
            "Daily standup",
            "Surface blockers fast so they get handled offline"
          ],
          [
            "Weekly tactical",
            "Review the key numbers and resolve cross-functional issues now"
          ],
          [
            "Monthly operating review",
            "Look at trends rather than snapshots"
          ],
          [
            "Quarterly planning",
            "Set priorities and review progress against goals"
          ],
          [
            "Annual strategy",
            "Set the year's direction and plan"
          ]
        ]
      }
    },
    {
      "slug": "how-to-build-an-operating-cadence",
      "after": "Keep the cadence stable enough to trust",
      "type": "checklist",
      "data": {
        "title": "Principles that keep a cadence healthy",
        "items": [
          "Protect the strategic layers from the tactical",
          "Keep the schedule stable so people can plan around it",
          "Make inputs flow between layers",
          "Move reporting out of live time and into written pre-reads",
          "Review recurring meetings regularly and kill, combine, or shorten the ones that no longer earn the time"
        ]
      }
    },
    {
      "slug": "equity-for-chiefs-of-staff",
      "after": "The three things you might be offered",
      "type": "table",
      "data": {
        "title": "Forms of startup equity",
        "headers": [
          "Form",
          "What it is"
        ],
        "rows": [
          [
            "ISOs",
            "Right to buy shares at a strike price; employee-only, with potentially favorable tax treatment"
          ],
          [
            "NSOs",
            "Right to buy at a strike price; can go to contractors, taxed as ordinary income at exercise"
          ],
          [
            "RSUs",
            "A promise of actual shares delivered at settlement; more common at later-stage and public companies"
          ]
        ]
      }
    },
    {
      "slug": "equity-for-chiefs-of-staff",
      "after": "The questions to ask before you sign",
      "type": "checklist",
      "data": {
        "title": "Ask before you accept",
        "items": [
          "How many total fully diluted shares are outstanding?",
          "What is the current strike price and the date of the last 409A valuation?",
          "What was the price and post-money valuation of the most recent round?",
          "What is the vesting schedule and cliff?",
          "ISOs, NSOs, or RSUs?",
          "What is the post-termination exercise window?",
          "How will dilution, refresh grants, and a change of control affect the grant?"
        ]
      }
    },
    {
      "slug": "what-does-a-chief-of-staff-do",
      "after": "Five functions at the center of the role",
      "type": "table",
      "data": {
        "title": "The five core functions",
        "headers": [
          "Function",
          "What it means"
        ],
        "rows": [
          [
            "Air traffic controller",
            "Manages the flow of decisions, meetings, and requests to the leader"
          ],
          [
            "Integrator",
            "Connects siloed work streams that no single executive owns"
          ],
          [
            "Communicator",
            "Links the leadership team to the rest of the organization"
          ],
          [
            "Honest broker",
            "Gives the principal a wider view of an issue"
          ],
          [
            "Confidant",
            "Holds sensitive context and unfinished thinking discreetly"
          ]
        ],
        "caption": "Patrick Aylward's framework, from Dan Ciampa's Harvard Business Review article."
      }
    },
    {
      "slug": "what-does-a-chief-of-staff-do",
      "after": "How to evaluate a chief of staff job",
      "type": "checklist",
      "data": {
        "title": "Signals of a real role",
        "items": [
          "Direct access to the principal, not several layers away",
          "Ownership of priorities and outcomes, not just meeting logistics",
          "A seat in the room where the leadership team sets direction"
        ]
      }
    },
    {
      "slug": "chief-of-staff-exit-paths",
      "after": "Why the role can support several paths",
      "type": "table",
      "data": {
        "title": "Six paths and what to show for each",
        "headers": [
          "Path",
          "What to show"
        ],
        "rows": [
          [
            "Operations leadership",
            "An operating cadence, company-wide program or measurable process"
          ],
          [
            "Functional leadership",
            "A defined project with a result and a reference"
          ],
          [
            "General management",
            "Direct ownership of a defined outcome, end to end"
          ],
          [
            "Early-stage operator or founder",
            "What you've built, sold and managed"
          ],
          [
            "Another chief of staff role",
            "How the new mandate differs from the one you held"
          ],
          [
            "Internal leadership role",
            "Evidence you can own the new mandate"
          ]
        ],
        "caption": "Exposure alone isn't experience."
      }
    },
    {
      "slug": "chief-of-staff-certifications-compared",
      "after": "do you even need one",
      "type": "table",
      "data": {
        "title": "What a certificate does and doesn't do",
        "headers": [
          "Can help with",
          "Doesn't do"
        ],
        "rows": [
          [
            "Structured frameworks when breaking in from adjacent work",
            "Guarantee a job"
          ],
          [
            "A common vocabulary and the language of the job",
            "Substitute for demonstrated judgment"
          ],
          [
            "Instruction, deadlines and a cohort, if you learn better that way",
            "Replace your track record"
          ]
        ],
        "caption": "A credential can support your story. Your track record still carries it."
      }
    },
    {
      "slug": "ea-to-chief-of-staff-path",
      "after": "Compare the mandates",
      "type": "table",
      "data": {
        "title": "Two mandates side by side",
        "headers": [
          "Compare",
          "Executive assistant",
          "Chief of staff"
        ],
        "rows": [
          [
            "Accountable for",
            "The executive-office workflow",
            "A defined set of the principal's priorities"
          ],
          [
            "Typically owns",
            "Time, access, communication, preparation, logistics, follow-through",
            "Cross-functional priorities and the leadership process"
          ],
          [
            "Can also include",
            "Advising on priorities and running programs (senior EAs)",
            "More time on decision framing and leadership follow-through"
          ]
        ],
        "caption": "The shift is in mandate and capacity."
      }
    },
    {
      "slug": "chief-of-staff-interview-questions",
      "after": "Prepare for the format",
      "type": "checklist",
      "data": {
        "title": "Before the interview loop",
        "items": [
          "Ask the recruiter what the process includes",
          "Expect interviews, a memo, a case or a presentation",
          "Confirm whether a work sample uses company information",
          "Ask how much time candidates should spend",
          "In a case, state your assumptions",
          "Keep the recommendation proportional to the evidence",
          "When presenting, leave room for discussion"
        ]
      }
    },
    {
      "slug": "day-in-the-life-chief-of-staff",
      "after": "why the day varies",
      "type": "steps",
      "data": {
        "title": "A representative day, not a universal one",
        "items": [
          {
            "h": "7:45 a.m.: orient",
            "d": "Scan what changed overnight and what's pending, then prepare the principal."
          },
          {
            "h": "10:00 a.m.: run the rhythm",
            "d": "Set the agenda, capture decisions, and record owners and next steps."
          },
          {
            "h": "1:00 p.m.: move the projects",
            "d": "Move project work forward, and absorb the unplanned deliberately."
          },
          {
            "h": "End of day: close the loops",
            "d": "Follow up on decisions, brief the principal, and reset for tomorrow."
          }
        ]
      }
    },
    {
      "slug": "how-to-read-exec-ops-job-post",
      "after": "Read compensation in context",
      "type": "checklist",
      "data": {
        "title": "What to confirm about a posted range",
        "items": [
          "Is it base salary or total cash?",
          "Is any bonus discretionary?",
          "Is equity listed separately?",
          "Fully diluted ownership, or grant count and fully diluted shares",
          "Vesting schedule, cliff and exercise window",
          "Current 409A common-share value and its date",
          "Change-of-control terms"
        ]
      }
    },
    {
      "slug": "managing-up-chief-of-staff",
      "after": "Know which adaptations need consent",
      "type": "table",
      "data": {
        "title": "Adjust quietly or align first",
        "headers": [
          "Change",
          "Needs alignment?"
        ],
        "rows": [
          [
            "The length of an update",
            "Often not"
          ],
          [
            "A cleaner agenda",
            "Often not"
          ],
          [
            "Closing loops more visibly",
            "Often not"
          ],
          [
            "Delegated authority, or how you represent the principal",
            "Yes"
          ],
          [
            "Who gets sensitive information, or what you withhold",
            "Yes"
          ],
          [
            "Recurring workarounds for an ignored process",
            "Yes"
          ]
        ]
      }
    },
    {
      "slug": "run-effective-leadership-team-meeting",
      "after": "Decide what the meeting is for",
      "type": "table",
      "data": {
        "title": "Sort each topic by the meeting's job",
        "headers": [
          "Topic",
          "Where it belongs"
        ],
        "rows": [
          [
            "A detailed departmental update",
            "The pre-read"
          ],
          [
            "A decision about next year's operating model",
            "A longer strategic session"
          ],
          [
            "A cross-functional issue blocking this month's priority",
            "The weekly leadership meeting"
          ]
        ],
        "caption": "Status, weekly tactics and strategy need different kinds of attention."
      }
    },
    {
      "slug": "executive-assistant-salary-and-how-to-get-a-raise",
      "after": "Choose comparisons that resemble your job",
      "type": "checklist",
      "data": {
        "title": "Before you pick a pay comparison",
        "items": [
          "Name the executives you support",
          "Note travel, vendors, budgets or processes you own",
          "Note how much you can decide within agreed limits",
          "Look for employers and markets with similar requirements",
          "Don't make up a city premium or remote-work discount",
          "Say which parts of the evidence match and which don't",
          "Keep base salary, bonus, equity and benefits separate"
        ]
      }
    },
    {
      "slug": "how-to-write-an-executive-memo",
      "after": "Write for the actual reader",
      "type": "table",
      "data": {
        "title": "What each reader may look for first",
        "headers": [
          "Reader",
          "Likely focus"
        ],
        "rows": [
          [
            "CFO",
            "Cost, financial risk and forecast assumptions"
          ],
          [
            "Head of product",
            "Customer effect, technical dependencies and team capacity"
          ],
          [
            "Several decision makers",
            "Write for the group and name conflicting criteria"
          ]
        ],
        "caption": "Keep the facts consistent. Let the order follow the reader's decision."
      }
    }
  ];

  function gfxShell(title, kicker){
    var w = el('figure','margin:2rem 0;padding:1.25rem 1.4rem;background:'+GFX.surface+';border:1px solid '+GFX.rule+';border-top:3px solid '+GFX.accent+';');
    if (kicker) w.appendChild(el('figcaption','font:700 .64rem/1 '+GFX.head+';letter-spacing:.14em;text-transform:uppercase;color:'+GFX.accent+';margin-bottom:.6rem;', kicker));
    if (title)  w.appendChild(el('div','font:600 1.12rem/1.3 '+GFX.head+';color:'+GFX.ink+';margin-bottom:.85rem;', title));
    return w;
  }
  function renderNote(g){
    var d=g.data||{}, warn=(d.variant==='warn');
    var box=el('aside','margin:2rem 0;padding:1.05rem 1.3rem;background:'+GFX.bg+';border-left:4px solid '+(warn?GFX.accent:GFX.accent2)+';');
    if(d.title) box.appendChild(el('div','font:700 .66rem/1 '+GFX.head+';letter-spacing:.12em;text-transform:uppercase;color:'+(warn?GFX.accent:GFX.accent2)+';margin-bottom:.4rem;', d.title));
    if(d.body)  box.appendChild(el('div','font:400 .96rem/1.55 '+GFX.body+';color:'+GFX.ink+';', d.body));
    return box;
  }
  function renderStat(g){
    var d=g.data||{}, w=gfxShell(d.title, d.kicker||'By the numbers');
    var row=el('div','display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:1rem;');
    (d.items||[]).forEach(function(it){
      var c=el('div');
      c.appendChild(el('div','font:700 1.7rem/1 '+GFX.head+';color:'+GFX.accent+';', it.value));
      c.appendChild(el('div','font:500 .82rem/1.35 '+GFX.body+';color:'+GFX.muted+';margin-top:.3rem;', it.label));
      row.appendChild(c);
    });
    w.appendChild(row); return w;
  }
  function renderTable(g){
    var d=g.data||{}, w=gfxShell(d.title, d.kicker||'At a glance');
    var scroll=el('div','overflow-x:auto;');
    var t=el('table','width:100%;border-collapse:collapse;font:400 .9rem/1.4 '+GFX.body+';color:'+GFX.ink+';');
    if(d.headers){ var thead=el('thead'), tr=el('tr');
      d.headers.forEach(function(h){ tr.appendChild(el('th','text-align:left;padding:.55rem .7rem;background:'+GFX.accent2+';color:#fff;font:600 .82rem '+GFX.body+';', h)); });
      thead.appendChild(tr); t.appendChild(thead); }
    var tb=el('tbody');
    (d.rows||[]).forEach(function(r,ri){ var tr=el('tr', ri%2?'background:'+GFX.bg+';':'');
      r.forEach(function(cell){ tr.appendChild(el('td','padding:.5rem .7rem;border-bottom:1px solid '+GFX.rule+';', cell)); });
      tb.appendChild(tr); });
    t.appendChild(tb); scroll.appendChild(t); w.appendChild(scroll);
    if(d.caption) w.appendChild(el('div','font:400 .78rem/1.4 '+GFX.body+';color:'+GFX.muted+';margin-top:.6rem;', d.caption));
    return w;
  }
  function renderSteps(g){
    var d=g.data||{}, w=gfxShell(d.title, d.kicker||'Step by step');
    var ol=el('div');
    (d.items||[]).forEach(function(it,i){
      var row=el('div','display:flex;gap:.85rem;padding:.6rem 0;'+(i?'border-top:1px solid '+GFX.rule+';':''));
      row.appendChild(el('div','flex:0 0 auto;width:1.7rem;height:1.7rem;border-radius:50%;background:'+GFX.accent2+';color:#fff;font:700 .9rem/1.7rem '+GFX.head+';text-align:center;', String(i+1)));
      var body=el('div');
      body.appendChild(el('div','font:600 .98rem/1.35 '+GFX.body+';color:'+GFX.ink+';', it.h));
      if(it.d) body.appendChild(el('div','font:400 .9rem/1.5 '+GFX.body+';color:'+GFX.muted+';margin-top:.15rem;', it.d));
      row.appendChild(body); ol.appendChild(row);
    });
    w.appendChild(ol); return w;
  }
  function renderChecklist(g){
    var d=g.data||{}, w=gfxShell(d.title, d.kicker||'Checklist');
    var ul=el('div');
    (d.items||[]).forEach(function(it){
      var row=el('div','display:flex;gap:.6rem;align-items:flex-start;padding:.35rem 0;');
      row.appendChild(el('div','flex:0 0 auto;color:'+GFX.accent+';font:700 1rem/1.4 '+GFX.body+';','✓'));
      row.appendChild(el('div','font:400 .95rem/1.5 '+GFX.body+';color:'+GFX.ink+';', it));
      ul.appendChild(row);
    });
    w.appendChild(ul); return w;
  }
  function renderGraphic(g){
    switch(g.type){
      case 'note': return renderNote(g);
      case 'stat': return renderStat(g);
      case 'table': return renderTable(g);
      case 'steps': return renderSteps(g);
      case 'checklist': return renderChecklist(g);
    }
    return null;
  }
  function graphics(slug, host){
    var mine = GRAPHICS.filter(function(x){ return x.slug===slug; });
    if(!mine.length) return;
    var heads = host.querySelectorAll('h2, h3');
    mine.forEach(function(g, idx){
      var id='eob-gfx-'+idx; if(byId(id)) return;
      var node; try{ node=renderGraphic(g); }catch(e){ node=null; }
      if(!node) return; node.id=id;
      var want=(g.after||'').toLowerCase(), anchor=null, i;
      if(want){ for(i=0;i<heads.length;i++){ if((heads[i].textContent||'').toLowerCase().indexOf(want)!==-1){ anchor=heads[i]; break; } } if(!anchor) return; }
      if(anchor){ anchor.parentNode.insertBefore(node, anchor.nextSibling); }
      else { host.appendChild(node); }
    });
  }

  // ---- 1. Keep Reading ---------------------------------------------------
  function keepReading(slug, host){
    if (byId('eob-keep-reading')) return;
    var me = findArticle(slug), i;
    if (!me) return;
    var base = currentBase();
    var same = ARTICLES.filter(function(a){ return a.s!==slug && a.p===me.p; });
    var other = ARTICLES.filter(function(a){ return a.s!==slug && a.p!==me.p; });
    // stable rotation so different articles surface different neighbours
    var seed = slug.length;
    function rot(arr){ return arr.slice(seed % (arr.length||1)).concat(arr.slice(0, seed % (arr.length||1))); }
    var picks = rot(same).concat(rot(other)).slice(0, CFG.maxRelated);
    if (!picks.length) return;

    var b = CFG.brand;
    var wrap = el('section', 'margin:3.5rem 0 1rem;padding-top:2rem;border-top:2px solid '+b.ink+';');
    wrap.id = 'eob-keep-reading';
    wrap.appendChild(el('div',
      'font:600 .72rem/1 "Public Sans",system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:'+b.oxblood+';margin-bottom:1rem;',
      'Keep Reading'));
    var grid = el('div','display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;');
    picks.forEach(function(a){
      var card = el('a', 'display:block;padding:1rem 1.1rem;background:'+b.paper+';border:1px solid '+b.rule+';border-left:3px solid '+b.oxblood+';text-decoration:none;color:'+b.ink+';transition:border-color .15s;');
      card.href = base + a.s;
      card.onmouseover = function(){ card.style.borderLeftColor = b.navy; };
      card.onmouseout  = function(){ card.style.borderLeftColor = b.oxblood; };
      card.appendChild(el('div','font:600 .64rem/1 "Public Sans",system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:'+b.slate+';margin-bottom:.4rem;', a.p));
      card.appendChild(el('div','font:600 1.02rem/1.3 "Spectral",Georgia,serif;color:'+b.ink+';', a.t));
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    host.appendChild(wrap);
  }

  // ---- 2. FAQ polish -----------------------------------------------------
  function faqPolish(host){
    var heads = host.querySelectorAll('h2, h3');
    var b = CFG.brand, inFaq = false;
    for (var i=0;i<heads.length;i++){
      var h = heads[i], txt = (h.textContent||'').trim().toLowerCase();
      if (h.tagName==='H2'){ inFaq = /frequently asked|faq|common questions/.test(txt); continue; }
      if (inFaq && h.tagName==='H3' && !h.getAttribute('data-eob-faq')){
        h.setAttribute('data-eob-faq','1');
        h.style.color = b.navy;
        h.style.marginTop = '1.6rem';
      }
    }
  }

  // ---- 3. Callouts -------------------------------------------------------
  function callout(slug, host){
    if (!CALLOUTS.length || byId('eob-callout')) return;
    var me = findArticle(slug), i;
    var hay = (slug + ' ' + (me?me.t:'')).toLowerCase();
    var hit = null;
    for (i=0;i<CALLOUTS.length;i++){
      var c = CALLOUTS[i];
      if (!c.href || c.href.indexOf('REPLACE_WITH')!==-1) continue; // dormant until real URL
      var m = c.match || [];
      for (var j=0;j<m.length;j++){ if (hay.indexOf(String(m[j]).toLowerCase())!==-1){ hit=c; break; } }
      if (hit) break;
    }
    if (!hit) return;
    var b = CFG.brand;
    var box = el('aside','margin:2.25rem 0;padding:1.25rem 1.4rem;background:#fff;border:1px solid '+b.rule+';border-top:3px solid '+b.oxblood+';');
    box.id = 'eob-callout';
    box.appendChild(el('div','font:600 .66rem/1 "Public Sans",system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:'+b.oxblood+';margin-bottom:.5rem;','Recommended'));
    if (hit.title) box.appendChild(el('div','font:600 1.1rem/1.3 "Spectral",Georgia,serif;color:'+b.ink+';margin-bottom:.4rem;', hit.title));
    if (hit.body)  box.appendChild(el('div','font:400 .95rem/1.5 "Public Sans",system-ui,sans-serif;color:'+b.slate+';margin-bottom:.8rem;', hit.body));
    if (hit.cta && hit.href){
      var a = el('a','display:inline-block;padding:.55rem 1.1rem;background:'+b.navy+';color:#fff;text-decoration:none;font:600 .9rem "Public Sans",system-ui,sans-serif;', hit.cta);
      a.href = hit.href;
      if (hit.href.charAt(0) === '/'){ a.rel = 'noopener'; }               // internal (site) link
      else { a.rel = 'sponsored noopener'; a.target = '_blank'; }          // affiliate / external
      box.appendChild(a);
    }
    // insert after the second H2 in the content, else at ~40% down
    var h2s = host.querySelectorAll('h2');
    if (h2s.length >= 2){ h2s[1].parentNode.insertBefore(box, h2s[1].nextSibling); }
    else { host.appendChild(box); }
  }

  // Content upgrades preselect known picker form IDs via ?pick=.
  // Use an early unoccupied heading; idempotent via #eob-upgrade.
  var DOWNLOAD_CALLOUTS = [
    { match:['chief-of-staff-salary-guide'], form:'192281528647025768',
      title:'The full salary and leveling guide, free',
      body:'The company-stage pay table, the leveling matrix, and every source behind the numbers in this article, in one document you can keep.',
      cta:'Get the guide' },
    { match:['chief-of-staff-certifications-compared'], form:'192281526697723412',
      title:'The certification comparison, in one document',
      body:'Every programme in this article side by side: cost, format, time commitment, and what each one is actually good for. Free.',
      cta:'Get the comparison' },
    { match:['ea-to-chief-of-staff-path'], form:'192281524799800449',
      title:'The EA-to-Chief-of-Staff roadmap',
      body:'The skills to build, the gaps to close, and how to make the case for the move, laid out as a path you can work through.',
      cta:'Get the roadmap' },
    { match:['negotiate-chief-of-staff-offer'], form:'192281532606448779',
      title:'The offer negotiation one-pager',
      body:'What to ask for, in what order, and the wording that keeps the conversation collaborative. One page, free.',
      cta:'Get the one-pager' },
    { match:['resume-linkedin-for-exec-ops'], form:'192281534518003231',
      title:'The repositioning worksheet',
      body:'Work through your own resume and LinkedIn against the same checks this article describes, section by section.',
      cta:'Get the worksheet' },
    { match:['chief-of-staff-interview-questions'], form:'192281514021487997',
      title:'The interview prep checklist',
      body:'What to prepare for each stage of an exec-ops loop, and the evidence to have ready before you walk in.',
      cta:'Get the checklist' },
    { match:['board-meeting-prep-chief-of-staff'], form:'192710844994290792',
      title:'The board prep checklist and deck outline',
      body:'The send timeline, the six-section deck outline, a pre-meeting call script, and the follow-up format. Reuse it every quarter.',
      cta:'Get the checklist' },
    { match:['run-effective-leadership-team-meeting'], form:'192281506358494520',
      title:'The meeting agenda and run sheet',
      body:'A working agenda and run sheet for the leadership meeting this article describes, ready to adapt.',
      cta:'Get the template' },
    { match:['single-source-of-truth-decision-logs'], form:'192281510200477565',
      title:'The decision log template',
      body:'The decision log described here, ready to use, plus the Notion version if you would rather duplicate it.',
      cta:'Get the template' },
    { match:['first-90-days-chief-of-staff-operating-plan'], form:'192281504641975480',
      title:'The operating plan as a document',
      body:'The same plan in a form you can edit, share with your principal, and mark up as the ninety days run.',
      cta:'Get the plan' },
    { match:['protecting-an-executives-time-and-focus'], form:'192281512088962273',
      title:'The weekly executive priorities brief',
      body:'The one-page format for showing a principal where the week actually went and what needs their decision next.',
      cta:'Get the template' }
  ];

  function downloadCallout(slug, host){
    if (!DOWNLOAD_CALLOUTS.length || byId('eob-upgrade')) return;
    var hit = null, i, j;
    for (i=0;i<DOWNLOAD_CALLOUTS.length && !hit;i++){
      var m = DOWNLOAD_CALLOUTS[i].match || [];
      for (j=0;j<m.length;j++){ if (slug === m[j]){ hit = DOWNLOAD_CALLOUTS[i]; break; } }
    }
    if (!hit || !hit.form) return;

    var b = CFG.brand;
    var box = el('aside','margin:2.25rem 0;padding:1.25rem 1.4rem;background:#fff;border:1px solid '+b.rule+';border-left:4px solid '+b.oxblood+';');
    box.id = 'eob-upgrade';
    box.appendChild(el('div','font:600 .66rem/1 "Public Sans",system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:'+b.oxblood+';margin-bottom:.5rem;','Free download'));
    box.appendChild(el('div','font:600 1.1rem/1.3 "Spectral",Georgia,serif;color:'+b.ink+';margin-bottom:.4rem;', hit.title));
    box.appendChild(el('div','font:400 .95rem/1.5 "Public Sans",system-ui,sans-serif;color:'+b.slate+';margin-bottom:.8rem;', hit.body));
    var a = el('a','display:inline-block;padding:.55rem 1.1rem;background:'+b.navy+';color:#fff;text-decoration:none;font:600 .9rem "Public Sans",system-ui,sans-serif;border-radius:2px;', hit.cta);
    a.href = '/resources?pick=' + encodeURIComponent(hit.form);
    a.rel = 'noopener';
    a.setAttribute('data-eob-track','download');
    a.setAttribute('data-eob-asset', hit.form);
    box.appendChild(a);

    // Early heading. Skip the FAQ, anything module 3 or the tool callout already owns,
    // and any heading immediately followed by a branded graphic.
    var h2s = host.querySelectorAll('h2');
    var order = [0, 1, 2, 3];
    for (i=0;i<order.length;i++){
      var anchor = h2s[order[i]];
      if (!anchor || isFaqHeading(anchor)) continue;
      var prev = anchor.previousElementSibling;
      if (prev && (prev.id === 'eob-callout' || prev.id === 'eob-tool-callout')) continue;
      var next = anchor.nextElementSibling;
      if (next && (/^eob-gfx-/.test(next.id || '') || next.id === 'eob-tool-callout')) continue;
      anchor.parentNode.insertBefore(box, anchor.nextSibling);
      return;
    }
    var last = host.lastElementChild;
    if (last && (last.id === 'eob-tool-callout' || last.id === 'eob-callout')) return;  // never stack
    host.appendChild(box);
  }

  // Measure article-to-tool/download clicks as intent.
  // Internal links avoid UTM parameters to preserve inbound attribution.
  var TOOL_PATHS = ['/roles','/salary-benchmarker','/salary-data','/offer-evaluator',
                    '/first-90-days','/readiness-quiz','/tools','/resources'];
  function trackClicks(){
    if (window.__eobTrackBound) return;
    window.__eobTrackBound = true;
    document.addEventListener('click', function(ev){
      var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) !== '/') return;                 // internal only
      var path = href.split('?')[0].split('#')[0].replace(/\/+$/,'') || '/';
      var kind = a.getAttribute('data-eob-track');
      var product = /^\/shop\/p\/([a-z0-9-]+)$/.exec(path);
      if (!kind && !product && TOOL_PATHS.indexOf(path) === -1) return;
      if (typeof window.gtag !== 'function') return;      // no GA4 on this page, do nothing
      try {
        window.gtag('event', product ? 'product_click' : kind === 'download' ? 'download_intent' : 'tool_open', {
          product_id: product ? product[1] : null,
          destination: path,
          asset: a.getAttribute('data-eob-asset') || null,
          placement: a.closest('#eob-callout') ? 'article_callout'
                   : a.closest('#eob-upgrade') ? 'content_upgrade'
                   : a.closest('#eob-tool-callout') ? 'tool_callout'
                   : a.closest('footer') ? 'footer' : 'body',
          source_slug: currentSlug() || null
        });
      } catch(e){}
    }, true);
  }

  // ---- 3b. Tool callouts ---------------------------------------------------
  // A SECOND, independent callout slot that routes readers into the four free
  // interactive tools. Deliberately separate from module 3 so a tool callout and
  // a product/affiliate callout can coexist on the same article: module 3 injects
  // after the 2nd H2, this one injects at a LATE heading (5th H2 where available)
  // and refuses to sit adjacent to the module-3 box. Idempotent via #eob-tool-callout.
  function isFaqHeading(h){
    return /frequently asked|faq|common questions/i.test((h.textContent || '').trim());
  }
  function toolCallout(slug, host){
    if (!TOOL_CALLOUTS.length || byId('eob-tool-callout')) return;
    var hit = null, i, j;
    for (i=0;i<TOOL_CALLOUTS.length && !hit;i++){
      var m = TOOL_CALLOUTS[i].match || [];
      for (j=0;j<m.length;j++){ if (slug === m[j]){ hit = TOOL_CALLOUTS[i]; break; } }
    }
    if (!hit || !hit.href) return;

    var b = CFG.brand;
    var box = el('aside','margin:2.25rem 0;padding:1.25rem 1.4rem;background:'+b.paper+';border:1px solid '+b.rule+';border-left:4px solid '+b.navy+';');
    box.id = 'eob-tool-callout';
    box.appendChild(el('div','font:600 .66rem/1 "Public Sans",system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:'+b.navy+';margin-bottom:.5rem;','Free tool'));
    if (hit.title) box.appendChild(el('div','font:600 1.1rem/1.3 "Spectral",Georgia,serif;color:'+b.ink+';margin-bottom:.4rem;', hit.title));
    if (hit.body)  box.appendChild(el('div','font:400 .95rem/1.5 "Public Sans",system-ui,sans-serif;color:'+b.slate+';margin-bottom:.8rem;', hit.body));
    if (hit.cta){
      var a = el('a','display:inline-block;padding:.55rem 1.1rem;background:'+b.oxblood+';color:#fff;text-decoration:none;font:600 .9rem "Public Sans",system-ui,sans-serif;border-radius:2px;', hit.cta);
      a.href = hit.href;                 // always an internal tool page
      a.rel = 'noopener';
      box.appendChild(a);
    }

    // Anchor: a late H2. Candidates are tried in preference order (5th H2 first)
    // and a heading is rejected if it is the FAQ heading, if the module-3 box is
    // already sitting on it (never stack the two), or if a branded graphic is
    // already anchored under it (graphics() runs first, so we would land on top
    // of a figure with no prose between them). Falls back to appending at the end
    // of the body, which still lands above Keep Reading because that module runs
    // after this one.
    var h2s = host.querySelectorAll('h2');
    var order = [4, 5, 3, 6, 2];
    for (i=0;i<order.length;i++){
      var anchor = h2s[order[i]];
      if (!anchor || isFaqHeading(anchor)) continue;
      var prev = anchor.previousElementSibling;
      if (prev && prev.id === 'eob-callout') continue;              // module-3 box owns this heading
      var next = anchor.nextElementSibling;
      if (next && /^eob-gfx-/.test(next.id || '')) continue;        // a graphic owns this heading
      anchor.parentNode.insertBefore(box, anchor.nextSibling);
      return;
    }
    host.appendChild(box);
  }

  // ---- 4. Shop polish ------------------------------------------------------
  // Styles the NATIVE Squarespace store (list + product detail pages) to
  // Design System v2. Gated on the products collection body class, idempotent,
  // and fully reversible (remove this module and the shop reverts to native).
  function shopPolish(){
    if (!document.body.classList.contains('collection-type-products')) return;
    var b = CFG.brand, oxDeep = '#5E181F', inkSoft = '#3A342B';

    // 4a. Collapse empty leftover layout-engine sections (deleting a code
    // block leaves a blank section shell with a huge min-height above the grid).
    var secs = document.querySelectorAll('.page-section.layout-engine-section');
    for (var i=0;i<secs.length;i++){
      var s = secs[i];
      if (!s.querySelector('.sqs-block') && !(s.innerText||'').trim()) s.style.display = 'none';
    }

    // 4b. Design-system CSS for the native store components.
    if (!byId('eob-shop-style')){
      var css = ''
      // list page: cards
      + '.product-list-section{background:'+b.paper+';}'
      + '.product-list-header{display:none!important;}' // mobile "Shop" title collides with the site header; the masthead replaces it
      + '.product-list-item-link{text-decoration:none!important;border-bottom:none!important;}'
      + '.product-list-image-wrapper{border:1px solid '+b.rule+';background:#fff;}'
      + '.product-list-item-meta{padding-top:1rem;}'
      + '.product-list-item-title{font:600 1.3rem/1.25 "Spectral",Georgia,serif!important;color:'+b.ink+'!important;text-decoration:none!important;}'
      + '.product-list-item-link:hover .product-list-item-title{color:'+b.oxblood+'!important;}'
      + '.product-list-item-price{font:500 .85rem/1 "IBM Plex Mono",Consolas,monospace!important;color:'+b.slate+'!important;letter-spacing:.06em;margin-top:.4rem;}'
      + '.product-list-item-title *,.product-list-item-price *{text-decoration:none!important;}'
      // detail page: type
      + '.product-title{font:600 2.35rem/1.15 "Spectral",Georgia,serif!important;color:'+b.ink+'!important;}'
      + '.product-price{font:500 1.1rem/1 "IBM Plex Mono",Consolas,monospace!important;color:'+b.oxblood+'!important;letter-spacing:.05em;margin:.5rem 0 .75rem;}'
      + '.product-description p{font:400 1rem/1.6 "Public Sans",system-ui,sans-serif!important;color:'+inkSoft+'!important;}'
      + '.product-nav-breadcrumb-link{font:500 .72rem/1 "IBM Plex Mono",Consolas,monospace!important;letter-spacing:.14em;text-transform:uppercase;color:'+b.slate+'!important;text-decoration:none!important;}'
      + '.product-nav-breadcrumb-link:hover{color:'+b.oxblood+'!important;}'
      // detail page: add-to-cart button (v2: oxblood fill, 2px radius)
      + '.sqs-add-to-cart-button{background:'+b.oxblood+'!important;border-radius:2px!important;border:none!important;}'
      + '.sqs-add-to-cart-button:hover{background:'+oxDeep+'!important;}'
      + '.sqs-add-to-cart-button .sqs-add-to-cart-button-inner{font-family:"Public Sans",system-ui,sans-serif!important;font-weight:600!important;color:'+b.paper+'!important;}'
      // detail page: gallery shows the full square card, no cropping
      + '.product-gallery-slides-item img{object-fit:contain!important;background:'+b.paper+'!important;}'
      + '.product-gallery-thumbnails img{border:1px solid '+b.rule+';}'
      // masthead
      + '#eob-shop-masthead{border-top:2px solid '+b.ink+';padding:1.3rem 0 0;margin:6.5rem 0 2.4rem;}'
      + '#eob-shop-masthead .eob-sm-row{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:.5rem;}'
      + '#eob-shop-masthead .eob-sm-name{font:600 1.15rem/1 "Spectral",Georgia,serif;color:'+b.ink+';}'
      + '#eob-shop-masthead .eob-sm-name span{color:'+b.oxblood+';}'
      + '#eob-shop-masthead .eob-sm-date{font:500 .7rem/1 "IBM Plex Mono",Consolas,monospace;letter-spacing:.16em;text-transform:uppercase;color:'+b.slate+';}'
      + '#eob-shop-masthead h1{font:600 clamp(1.9rem,4.5vw,2.7rem)/1.12 "Spectral",Georgia,serif;color:'+b.ink+';margin:1.6rem 0 .9rem;}'
      + '#eob-shop-masthead p{font:400 1.02rem/1.6 "Public Sans",system-ui,sans-serif;color:'+b.slate+';max-width:640px;margin:0;}';
      var st = document.createElement('style');
      st.id = 'eob-shop-style';
      st.textContent = css;
      document.head.appendChild(st);
    }

    // 4c. Briefing-document masthead above the product grid (list page only).
    var list = document.querySelector('.product-list-section .product-list');
    if (list && !byId('eob-shop-masthead')){
      var m = document.createElement('header');
      m.id = 'eob-shop-masthead';
      m.innerHTML = ''
        + '<div class="eob-sm-row">'
        +   '<div class="eob-sm-name">The Exec Ops Brief<span>.</span></div>'
        +   '<div class="eob-sm-date">The Shop / Paid Products</div>'
        + '</div>'
        + '<h1>The free library, gone deeper.</h1>'
        + '<p>A small shelf of evergreen templates and guides that pick up where the free downloads leave off. The same systems the best operators run, packaged in full so you can put them to work the same day. No subscriptions. Buy the file, keep it, use it.</p>';
      list.insertBefore(m, list.firstChild);
    }
  }

  // Repair known legacy paths.
  var LINK_FIXES = {
    '/first-90-days-tool': '/first-90-days',
    '/guide-become-chief-of-staff': '/how-to-become-a-chief-of-staff-static',
    '/how-to-become-a-chief-of-staff': '/how-to-become-a-chief-of-staff-static',
    '/library/first-90-days-operating-plan': '/library/first-90-days-chief-of-staff-operating-plan'
  };
  function fixLinks(){
    Object.keys(LINK_FIXES).forEach(function(bad){
      document.querySelectorAll('a[href="' + bad + '"]').forEach(function(a){
        a.setAttribute('href', LINK_FIXES[bad]);
      });
    });
  }

  // Guarded homepage layout and current-board updates.
  function homePolish(){
    var home = document.getElementById('eob-home');
    if (!home) return;
    // Guarded display corrections; native page source is a separate CMS edit.
    var headline = home.querySelector('h1');
    if (headline && /they can't run the company/.test(headline.textContent))
      headline.innerHTML = 'Become the operator who keeps decisions <span class="mark">moving</span>.';
    var lead = home.querySelector('.lead');
    if (lead && /impossible to replace/.test(lead.textContent))
      lead.textContent = 'The Exec Ops Brief gives executive assistants, chiefs of staff, and operations professionals three things: roles with published pay, practical tools, and playbooks for the work.';
    home.querySelectorAll('p').forEach(function(p){
      if (/The paid work, templates and guides, comes later/.test(p.textContent))
        p.innerHTML = 'The Brief is free and it stays free. Alongside it there\'s a small <a href="/shop">paid library of templates and guides</a>, for anyone who\'d rather start from a finished artifact than build one from scratch.';
    });
    var st = document.createElement('style');
    st.textContent = '@media(max-width:480px){' +
      '#eob-home .sub-form{flex-wrap:wrap}' +
      '#eob-home .sub-form .btn{flex:1 1 100%}' +
      '#eob-home .dossier .d-row{flex-wrap:wrap}' +
      '}';
    document.head.appendChild(st);
    home.querySelectorAll('.mono').forEach(function(el){
      if (/updated weekly/i.test(el.textContent) && !el.children.length){
        el.textContent = el.textContent.replace(/updated weekly/i, 'updated daily');
      }
    });
    if (!window.fetch) return;
    fetch('https://execopsbrief.github.io/eob-assets/jobboard/roles.json')
      .then(function(r){ return r.json(); })
      .then(function(data){
        var roles = (data && data.roles) || [];
        if (!roles.length) return;
        var n = roles.length;
        var firms = {};
        roles.forEach(function(r){ if (r.source) firms[r.source] = 1; });
        var nf = Object.keys(firms).length;
        home.querySelectorAll('.dossier .d-row').forEach(function(row){
          var lab = row.firstElementChild ? row.firstElementChild.textContent : '';
          var v = row.querySelector('.v');
          if (!v) return;
          if (/live roles/i.test(lab)) v.textContent = String(n);
          if (/sourced from/i.test(lab) && nf) v.textContent = nf + ' search firms';
        });
        home.querySelectorAll('.mono').forEach(function(el){
          if (/\d+ roles live now/i.test(el.textContent) && !el.children.length){
            el.textContent = el.textContent.replace(/\d+ roles live now/i, n + ' roles live now');
          }
        });
      })
      .catch(function(){});
  }

  // Bind unbound forms using the shared data-eobBound flag.
  function formFeedback(){
    // The provider-confirmed capture handler below owns all native page forms.
    // Mark them so legacy page fallbacks do not add another success timer.
    document.querySelectorAll('.eob-ml-form').forEach(function(form){ form.dataset.eobBound='1'; });
  }

  // ---- 8. Subscriber memory ------------------------------------------------
  // Free tools never re-gate a known subscriber. Contract shared with the
  // /resources picker page script (do not rename):
  //   localStorage eob_sub_email = subscriber email (plain string)
  //   localStorage eob_sub_tools = JSON array of MailerLite form ids requested
  // An email is learned from (a) a ?e=<email> param carried by links in our
  // own emails ({$email} personalization) or (b) any .eob-ml-form submit.
  var LS_EMAIL = "eob_sub_email", LS_TOOLS = "eob_sub_tools";
  var BRIEF_FORM_ID = "192281502704207669";
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function lsGet(k){ try { return window.localStorage.getItem(k); } catch(e){ return null; } }
  function lsSet(k, v){ try { window.localStorage.setItem(k, v); } catch(e){} }
  function subEmail(){ var v = lsGet(LS_EMAIL); return (v && EMAIL_RE.test(v)) ? v : ""; }
  function rememberSub(email, formId){
    if (email && EMAIL_RE.test(email)) lsSet(LS_EMAIL, email.trim());
    if (formId && formId !== BRIEF_FORM_ID){
      var t;
      try { t = JSON.parse(lsGet(LS_TOOLS) || "[]"); } catch(e){ t = []; }
      if (!Array.isArray(t)) t = [];
      if (t.indexOf(formId) === -1){ t.push(formId); lsSet(LS_TOOLS, JSON.stringify(t)); }
    }
  }
  function subMemory(){
    // (a) email-link handoff: any page ?e=you@work.com -> store, strip from URL
    try {
      var m = /[?&]e=([^&]+)/.exec(window.location.search);
      if (m){
        var em = "";
        try { em = decodeURIComponent(m[1]); } catch(e){}
        if (EMAIL_RE.test(em)) rememberSub(em, "");
        var clean = window.location.search.replace(/[?&]e=[^&]+/, "").replace(/^&/, "?");
        window.history.replaceState(null, "", window.location.pathname + (clean.length > 1 ? clean : "") + window.location.hash);
      }
    } catch(e){}
    // Remember email only after provider confirmation (EOBForms), never on an attempt.
    // (c) known-subscriber transform for opt-in forms site-wide. The
    // /resources picker page owns its own UI (its bar id marks the new markup).
    var email = subEmail();
    if (!email || byId("eob-pick-bar")) return;
    document.querySelectorAll(".eob-ml-form").forEach(function(form){
      if (form.dataset.eobKnown === "1") return;
      var inp = form.querySelector('input[type="email"]');
      var btn = form.querySelector('button[type="submit"]');
      if (!inp || !btn) return;
      form.dataset.eobKnown = "1";
      var idm = /\/forms\/(\d+)\/subscribe/.exec(form.getAttribute("action") || "");
      // A stored address is a convenience, not proof of current subscription.
      inp.value = email;
      inp.hidden = false;
      btn.dataset.eobOrig = btn.textContent;
      if (!idm || idm[1] !== BRIEF_FORM_ID) btn.textContent = "Send to my inbox";
      var esc = document.createElement("button");
      esc.type = "button";
      esc.textContent = "Not you? Use a different email";
      esc.style.cssText = "background:none;border:none;cursor:pointer;font:400 .7rem 'IBM Plex Mono',monospace;color:#6B6255;text-decoration:underline;padding:.2rem 0;";
      esc.addEventListener("click", function(){
        try { window.localStorage.removeItem(LS_EMAIL); } catch(e){}
        inp.value = "";
        inp.hidden = false;
        btn.textContent = btn.dataset.eobOrig || "Get the download";
        if (esc.parentNode) esc.parentNode.removeChild(esc);
        form.dataset.eobKnown = "";
      });
      form.appendChild(esc);
    });
  }

  // Move the fixed picker bar outside transformed Squarespace wrappers.
  // Carry its CSS to body; idempotent on pages without the bar.
  function pickBarFix(){
    var bar = byId("eob-pick-bar");
    if (!bar) return;
    if (bar.parentNode !== document.body) document.body.appendChild(bar);
    if (!byId("eob-pick-bar-css")){
      var st = document.createElement("style");
      st.id = "eob-pick-bar-css";
      st.textContent =
        '#eob-pick-bar{position:fixed;left:0;right:0;bottom:0;z-index:99999;background:#1C2C3A;border-top:3px solid #7A2129;transform:translateY(110%);transition:transform .25s ease;padding:.75rem 0;font-family:"Public Sans",system-ui,sans-serif}' +
        '#eob-pick-bar *{box-sizing:border-box;margin:0;padding:0}' +
        '#eob-pick-bar [hidden]{display:none !important}' +
        '#eob-pick-bar.on{transform:none}' +
        '#eob-pick-bar .bar-wrap{max-width:1080px;margin:0 auto;padding:0 28px;display:flex;align-items:center;gap:1rem;flex-wrap:wrap}' +
        '#eob-pick-bar .count{font-family:"IBM Plex Mono",monospace;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:#A9B2BD}' +
        '#eob-pick-bar .note{font-family:"IBM Plex Mono",monospace;font-size:.72rem;color:#d9a7a2}' +
        '#eob-pick-bar form{display:flex;gap:.5rem;flex:1;min-width:16rem;max-width:26rem;margin-left:auto}' +
        '#eob-pick-bar input{flex:1;min-width:0;border:1px solid #33465a;border-radius:2px;padding:.62rem .9rem;font-family:"Public Sans",system-ui,sans-serif;font-size:.92rem;color:#fff;background:#16232f}' +
        '#eob-pick-bar input::placeholder{color:#A9B2BD}' +
        '#eob-pick-bar input:focus{outline:none;border-color:#7A2129}' +
        '#eob-pick-bar button[type="submit"]{display:inline-flex;align-items:center;justify-content:center;font-family:"Public Sans",system-ui,sans-serif;font-weight:600;font-size:.88rem;border-radius:2px;cursor:pointer;border:1px solid transparent;padding:.62rem 1.1rem;background:#7A2129;color:#fff;white-space:nowrap;transition:background .16s}' +
        '#eob-pick-bar button[type="submit"]:hover{background:#5E181F}' +
        '#eob-pick-bar #eob-pick-notyou{background:none;border:none;cursor:pointer;font-family:"IBM Plex Mono",monospace;font-size:.7rem;color:#A9B2BD;text-decoration:underline;padding:0}' +
        '@media(max-width:560px){#eob-pick-bar .bar-wrap{gap:.6rem}#eob-pick-bar form{min-width:100%;margin-left:0}}';
      document.head.appendChild(st);
    }

    /* Synchronize the bar .on class with picker selections. Idempotent. */
    if (!bar.dataset.eobBarSync){
      bar.dataset.eobBarSync = "1";
      var syncBar = function(){
        var n = document.querySelectorAll('.eob-pick input[type="checkbox"]:checked').length;
        bar.classList.toggle("on", n > 0);
      };
      document.addEventListener("change", function(ev){
        var t = ev.target;
        if (t && t.matches && t.matches('.eob-pick input[type="checkbox"]')) syncBar();
      });
      /* The page pre-selects a starter set, but its script may run after ours,
         so sync now and again once it has, or the bar hides a live selection. */
      syncBar();
      if (window.requestAnimationFrame) window.requestAnimationFrame(syncBar);
      window.setTimeout(syncBar, 300);
      window.setTimeout(syncBar, 1200);
      window.addEventListener("load", syncBar);
    }
  }

  // Guarded roles-page heading and board description updates.
  function rolesPolish(){
    var board = byId('eob-jobboard');
    if (!board) return;

    // 10a. Promote the head h2 to a real h1 (the page's only top-level heading)
    // and carry .eob-head h2's size rule across, since the shared h1-h4 base
    // rule does not include it.
    var head = board.querySelector('.eob-head');
    var h2 = head && head.querySelector('h2');
    if (h2 && !head.querySelector('h1')){
      if (!byId('eob-roles-h1-css')){
        var st = document.createElement('style');
        st.id = 'eob-roles-h1-css';
        st.textContent = '#eob-jobboard .eob-head h1{font-size:clamp(1.7rem,3.2vw,2.4rem);margin:.5rem 0 .55rem}';
        document.head.appendChild(st);
      }
      var h1 = document.createElement('h1');
      h1.className = h2.className;
      h1.textContent = 'High-paying Executive Assistant and exec ops jobs.';
      h2.parentNode.replaceChild(h1, h2);
    }

    // 10b. "Curated" overclaims. The loading string and the rendered count are
    // written by the page's own inline script, so the count is patched again
    // after it renders (observer self-disconnects, no long-lived listener).
    var load = board.querySelector('.eob-loading');
    if (load && /curated/i.test(load.textContent)) load.textContent = 'Loading roles.';

    function fixCount(){
      var n = board.querySelector('.eob-count') ||
              board.querySelector('[class*="count"]');
      if (n && /curated roles/i.test(n.innerHTML)){
        n.innerHTML = n.innerHTML.replace(/curated roles/ig, 'roles');
        return true;
      }
      return false;
    }
    if (!fixCount() && window.MutationObserver){
      var obs = new MutationObserver(function(){ if (fixCount()) obs.disconnect(); });
      obs.observe(board, { childList: true, subtree: true, characterData: true });
      setTimeout(function(){ obs.disconnect(); }, 8000);
    }
  }

  // Idempotent exact-string replacements on text nodes only.
  var COPY_FIXES = [
    ['Curated roles and operator playbooks', 'New roles with published pay and operator playbooks'],
    ['A curated digest of EA, exec-ops, and Chief of Staff roles',
     'A weekly digest of EA, exec-ops, and Chief of Staff roles'],
    ['A curated set of executive assistant, chief of staff, and operations openings',
     'A screened set of executive assistant, chief of staff, and operations openings']
  ];
  function honestCopy(){
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var node, hits = [];
    while ((node = walker.nextNode())){
      if (node.nodeValue.indexOf('urated') !== -1) hits.push(node);
    }
    for (var i = 0; i < hits.length; i++){
      var v = hits[i].nodeValue;
      for (var j = 0; j < COPY_FIXES.length; j++){
        if (v.indexOf(COPY_FIXES[j][0]) !== -1) v = v.split(COPY_FIXES[j][0]).join(COPY_FIXES[j][1]);
      }
      if (v !== hits[i].nodeValue) hits[i].nodeValue = v;
    }
  }

  // Roles-alert opt-in; an empty form ID disables the module.
  var ROLES_ALERT_FORM_ID = '194356696889427252';
  function rolesOptIn(){
    if (!ROLES_ALERT_FORM_ID) return;
    var board = byId('eob-jobboard');
    if (!board || byId('eob-roles-optin')) return;
    var head = board.querySelector('.eob-head');
    if (!head) return;

    if (!byId('eob-roles-optin-css')){
      var st = document.createElement('style');
      st.id = 'eob-roles-optin-css';
      st.textContent =
        '#eob-roles-optin{border:1px solid #D8D0BF;border-top:3px solid #7A2129;background:#fff;padding:1.15rem 1.25rem;margin:0 0 1.6rem;border-radius:2px}' +
        '#eob-roles-optin .ro-k{font-family:"IBM Plex Mono",Consolas,monospace;font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;color:#7A2129;margin:0 0 .35rem}' +
        '#eob-roles-optin .ro-h{font-family:"Spectral",Georgia,serif;font-weight:600;font-size:1.12rem;line-height:1.25;color:#1B1712;margin:0 0 .3rem}' +
        '#eob-roles-optin .ro-p{font-family:"Public Sans",system-ui,sans-serif;font-size:.92rem;line-height:1.5;color:#6B6255;margin:0 0 .8rem;max-width:44rem}' +
        '#eob-roles-optin form{display:flex;gap:.5rem;max-width:30rem;flex-wrap:wrap}' +
        '#eob-roles-optin input[type="email"]{flex:1;min-width:12rem;border:1px solid #D8D0BF;border-radius:2px;padding:.6rem .8rem;font-family:"Public Sans",system-ui,sans-serif;font-size:.92rem;color:#1B1712;background:#F3F0E9}' +
        '#eob-roles-optin input[type="email"]:focus{outline:none;border-color:#7A2129}' +
        '#eob-roles-optin button{border:none;border-radius:2px;cursor:pointer;padding:.6rem 1.05rem;background:#7A2129;color:#F3F0E9;font-family:"Public Sans",system-ui,sans-serif;font-weight:600;font-size:.9rem;white-space:nowrap}' +
        '#eob-roles-optin button:hover{background:#5E181F}' +
        '#eob-roles-optin .eob-form-success{font-family:"IBM Plex Mono",Consolas,monospace;font-size:.8rem;color:#1B1712}' +
        '@media(max-width:520px){#eob-roles-optin form{flex-direction:column}#eob-roles-optin button{width:100%}}';
      document.head.appendChild(st);
    }

    var box = document.createElement('section');
    box.id = 'eob-roles-optin';
    box.innerHTML =
      '<p class="ro-k">Weekly roles alert</p>' +
      '<h2 class="ro-h">Get the week\'s new roles with published pay in your inbox.</h2>' +
      '<p class="ro-p">The board below is always free and always current. The Monday email is the part you can\'t get by bookmarking it: only the roles that posted since last week, so you\'re not re-reading the same list to find what changed.</p>' +
      '<form class="eob-ml-form" action="https://assets.mailerlite.com/jsonp/2493859/forms/' +
        ROLES_ALERT_FORM_ID + '/subscribe" method="post" target="eob-ml-frame">' +
        '<input type="email" name="fields[email]" placeholder="you@work.com" aria-label="Email address" required>' +
        '<input type="hidden" name="ml-submit" value="1">' +
        '<input type="hidden" name="anticsrf" value="true">' +
        '<button type="submit">Send me new roles</button>' +
      '</form>';
    head.parentNode.insertBefore(box, head.nextSibling);
    // formFeedback() (module 7) binds .eob-ml-form site-wide for the hidden
    // iframe target, success state and the GA4 newsletter_signup event, and it
    // runs before this module, so re-run it for the form just inserted.
    try { formFeedback(); } catch(e){}
  }

  // Add distinct BreadcrumbList schema alongside existing injected schemas.
  var CRUMB_NAMES = {
    'library': 'Library', 'roles': 'Roles', 'shop': 'Shop',
    'resources': 'Resources', 'the-brief': 'The Brief', 'about': 'About',
    'legal': 'Legal', 'salary-benchmarker': 'Salary Benchmarker',
    'readiness-quiz': 'Readiness Quiz', 'first-90-days': 'First 90 Days',
    'offer-evaluator': 'Offer Evaluator',
    'how-to-become-a-chief-of-staff': 'How to Become a Chief of Staff'
  };
  function titleCase(s){
    return s.replace(/-/g, ' ').replace(/\b\w/g, function(c){ return c.toUpperCase(); });
  }
  function breadcrumbs(){
    if (byId('eob-schema-breadcrumb')) return;
    // Must match the canonical host Squarespace emits (www). A non-www origin
    // here made every BreadcrumbList item URL contradict the page's own canonical.
    var origin = 'https://www.execopsbrief.com';
    var parts = window.location.pathname.split('/').filter(Boolean);
    if (!parts.length) return;                       // homepage: no breadcrumb
    var items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: origin }];
    var path = '';
    for (var i = 0; i < parts.length; i++){
      path += '/' + parts[i];
      var last = (i === parts.length - 1);
      var name = CRUMB_NAMES[parts[i]] ||
                 (last ? (findArticle(parts[i]) || {}).t : null) ||
                 titleCase(parts[i]);
      items.push({ '@type': 'ListItem', position: i + 2, name: name, item: origin + path });
    }
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.id = 'eob-schema-breadcrumb';
    s.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items
    });
    document.head.appendChild(s);
  }

  // ---- Job-board measurement bridge (2026-09-06) --------------------------
  // postMessage cannot infer a completed application or confirmed subscription.
  // Allow only the live board frame, fixed event names, and non-personal fields.
  function jobBoardMetrics(){
    if (window.__eobJobMetricsBound) return;
    window.__eobJobMetricsBound = true;
    window.addEventListener('message', function(ev){
      if (ev.origin !== 'https://execopsbrief.github.io') return;
      var d = ev.data;
      if (!d || d.eobMetric !== 1 || typeof d.params !== 'object' || !d.params) return;
      var allowed = {
        job_search: ['category','work_arrangement','location_group','search_used','result_count'],
        job_apply_click: ['job_id','category','listing_source','work_arrangement'],
        newsletter_signup_attempt: ['form_id'],
        product_click: ['product_id']
      };
      if (!Object.prototype.hasOwnProperty.call(allowed, d.name)) return;
      var frame = Array.prototype.find.call(document.querySelectorAll('iframe'), function(f){
        try {
          var u = new URL(f.src);
          return f.contentWindow === ev.source && u.origin === ev.origin &&
            ((u.pathname === '/eob-assets/jobboard/roles-widget.html' && d.name !== 'product_click') ||
             (u.pathname === '/eob-assets/tools/salary-benchmarker.html' &&
              (d.name === 'product_click' || d.name === 'newsletter_signup_attempt')));
        } catch(e){ return false; }
      });
      if (!frame || typeof window.gtag !== 'function') return;
      var params = {measurement_version: 'eob_funnel_v3',
        placement: /roles-widget\.html$/.test(new URL(frame.src).pathname) ? 'job_board' : 'salary_benchmarker'};
      allowed[d.name].forEach(function(k){
        var v = d.params[k];
        if (typeof v === 'number' && isFinite(v) && v >= 0) params[k] = v;
        else if (typeof v === 'string' && v.length <= 100 && !/[@?]/.test(v)) params[k] = v;
      });
      try { window.gtag('event', d.name, params); } catch(e){}
    });
  }

  // The existing /roles page is a campaign landing page. Let repeat visitors
  // reach the actual filters immediately without removing its editorial context.
  function rolesLanding(){
    var page = byId('eob-roles'), frame = byId('eob-roles-frame');
    var lead = page && page.querySelector('.hero .lead-sub');
    if (!lead || !frame || byId('eob-roles-shortcuts')) return;
    var nav = document.createElement('nav');
    nav.id = 'eob-roles-shortcuts';
    nav.setAttribute('aria-label','Job board shortcuts');
    nav.style.cssText = 'display:flex;flex-wrap:wrap;gap:1rem;align-items:center;margin:1.35rem 0;';
    var browse = el('a','display:inline-block;background:#7A2129;color:#fff;padding:.8rem 1.1rem;text-decoration:none;font-weight:600;','Browse current openings');
    browse.href = '#eob-roles-frame';
    browse.addEventListener('click',function(){ frame.setAttribute('tabindex','0'); frame.focus({preventScroll:true}); });
    var brief = el('a','color:#7A2129;text-decoration:underline;text-underline-offset:3px;','Get up to six roles weekly in The Brief');
    brief.href = '/the-brief';
    nav.appendChild(browse);nav.appendChild(brief);
    lead.parentNode.insertBefore(nav,lead.nextSibling);
    frame.style.scrollMarginTop = '100px';
  }

/* EOB native form handling: provider confirmation, never timer-based success. */
(function(){
  'use strict';
  if (window.__eobFormsV3) return;
  window.__eobFormsV3 = true;
  var pending = new WeakMap();
  function submit(form){
    if (pending.has(form)) return pending.get(form);
    var action;
    try { action = new URL(form.action); } catch(e){}
    if (!action || action.origin !== 'https://assets.mailerlite.com' || action.username || action.password || !/^\/jsonp\/2493859\/forms\/\d+\/subscribe$/.test(action.pathname)) return Promise.resolve(false);
    var controller = new AbortController();
    var timer = setTimeout(function(){ controller.abort(); },10000);
    var params = new URLSearchParams(new FormData(form));
    params.set('ajax','1'); params.set('guid','eob_' + Date.now() + '_' + Math.random().toString(36).slice(2));
    // MailerLite's public form endpoint returns JSON with Access-Control-Allow-Origin: *.
    // No API key, callback, cookie, analytics payload or logged URL carries this request.
    var request = fetch(action.origin + action.pathname + '?' + params.toString(),{
      method:'GET',mode:'cors',credentials:'omit',referrerPolicy:'no-referrer',signal:controller.signal
    }).then(function(response){ if(!response.ok || response.type==='opaque') throw new Error('Unconfirmed'); return response.json(); })
      .then(function(response){ return !!response && response.success===true; })
      .catch(function(){ return false; })
      .finally(function(){ clearTimeout(timer); });
    pending.set(form, request);
    return request.then(function(ok){ pending.delete(form); return ok; });
  }
  window.EOBSubmitForm = submit;
  window.addEventListener('submit',function(event){
    var form = event.target;
    if (!form || !form.matches || !form.matches('form.eob-ml-form')) return;
    event.preventDefault(); event.stopImmediatePropagation();
    if (form.dataset.eobPending === '1' || !form.reportValidity()) return;
    form.dataset.eobBound = '1'; form.dataset.eobPending = '1';
    var input = form.querySelector('input[type="email"]'), email = input ? input.value.trim() : '';
    var button = form.querySelector('button[type="submit"]'), label = button ? button.textContent : '';
    var status = form.querySelector('.eob-form-status');
    if (!status){ status=document.createElement('div');status.className='eob-form-status';status.setAttribute('role','status');status.style.cssText='flex-basis:100%;font-size:.85rem;line-height:1.5;margin-top:.6rem;';form.style.flexWrap='wrap';form.appendChild(status); }
    status.textContent='Sending...';
    if(button){button.disabled=true;button.textContent='Sending...';}
    submit(form).then(function(ok){
      delete form.dataset.eobPending;
      if(button){button.disabled=false;button.textContent=label;}
      if(ok){
        status.textContent=form.dataset.eobSuccess || 'Request confirmed. Check your inbox.';
        try { if(email) localStorage.setItem('eob_sub_email',email); } catch(e){}
        try { if(typeof window.gtag==='function') window.gtag('event','newsletter_signup',{method:'mailerlite',form_id:new URL(form.action).pathname.split('/')[4],placement:form.getAttribute('data-eob-placement')||null,measurement_version:'eob_funnel_v3'}); } catch(e){}
      }else{
        status.textContent="We couldn't confirm your subscription. Check your connection and try again.";
        // Retire the old submit-means-subscribed memory if a legacy handler populated it.
        try { if(localStorage.getItem('eob_sub_email')===email) localStorage.removeItem('eob_sub_email'); } catch(e){}
      }
    });
  },true);
})();


  // ---- 9. Site audit pass (2026-11-18) --------------------------------------
  // Library index heading, topic chips and search; article meta, takeaway box,
  // contents list, progress bar and end-of-article Brief signup; product-page
  // list and image alt repair; homepage start-here doors. Every part is
  // idempotent, DOM-only, and removable by deleting this module and its calls.
  var PILLARS = [
    {n:'The Role, Defined',     h:'/library/category/The+Role%2C+Defined'},
    {n:'The Path In',           h:'/library/category/The+Path+In'},
    {n:'The Craft / Playbooks', h:'/library/category/The+Craft+%2F+Playbooks'},
    {n:'The Career',            h:'/library/category/The+Career'},
    {n:'Comp & Careers',        h:'/library/category/Comp+%26+Careers'},
    {n:'Operator Mindset',      h:'/library/category/Operator+Mindset'}
  ];
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  function escHtml(s){
    return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function auditEvent(name, params){
    try { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); } catch(e){}
  }
  function auditStyle(){
    if (byId('eob-audit-style')) return;
    var mono = '"IBM Plex Mono",ui-monospace,monospace', serif = '"Spectral",Georgia,serif', sans = '"Public Sans",system-ui,sans-serif';
    var css =
      /* library head */
      '#eob-lib-head{box-sizing:border-box;margin:0 auto;padding-bottom:8px}' +
      '#eob-lib-head .lh-k{font-family:' + mono + ';font-size:11.5px;letter-spacing:.13em;text-transform:uppercase;color:#7A2129;margin:0 0 14px}' +
      '#eob-lib-head .lh-h{font-family:' + serif + ';font-weight:600;font-size:46px;line-height:1.08;letter-spacing:-.01em;color:#1B1712;margin:0 0 14px;max-width:20em}' +
      '#eob-lib-head .lh-p{font-family:' + sans + ';font-size:18px;line-height:1.55;color:#3A342B;margin:0 0 26px;max-width:40em}' +
      '#eob-lib-head .lh-bar{display:flex;flex-wrap:wrap;gap:14px 24px;align-items:center;justify-content:space-between;border-top:2px solid #1B1712;border-bottom:1px solid #D8D0BF;padding:14px 0}' +
      '#eob-lib-head .lh-chips{display:flex;flex-wrap:wrap;gap:8px}' +
      '#eob-lib-head .lh-chips a{font-family:' + mono + ';font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:#3A342B;text-decoration:none;border:1px solid #CFC7B4;border-radius:999px;padding:10px 14px;line-height:1.2;background:transparent}' +
      '#eob-lib-head .lh-chips a:hover{border-color:#7A2129;color:#7A2129}' +
      '#eob-lib-head .lh-chips a[aria-current="page"]{background:#1B1712;border-color:#1B1712;color:#F3F0E9}' +
      '#eob-lib-head .lh-search{display:flex;gap:6px;margin:0}' +
      '#eob-lib-head .lh-search input{font-family:' + sans + ';font-size:15px;color:#1B1712;background:#fff;border:1px solid #CFC7B4;border-radius:2px;padding:10px 12px;min-width:210px;height:44px;box-sizing:border-box}' +
      '#eob-lib-head .lh-search button{font-family:' + sans + ';font-weight:600;font-size:14px;color:#F3F0E9;background:#7A2129;border:none;border-radius:2px;padding:0 16px;height:44px;cursor:pointer}' +
      '#eob-lib-head .lh-search button:hover{background:#5E181F}' +
      '.blog-list time.blog-date,.blog-list .blog-author{display:none !important}' +
      '@media(max-width:640px){#eob-lib-head .lh-h{font-size:32px}#eob-lib-head .lh-p{font-size:16.5px}#eob-lib-head .lh-search{width:100%}#eob-lib-head .lh-search input{flex:1;min-width:0}}' +
      /* article furniture */
      '#eob-progress{position:fixed;left:0;top:0;height:3px;width:0;background:#7A2129;z-index:9999;pointer-events:none}' +
      '.blog-item-content p.eob-takeaway{background:#EBE6DA;border-left:3px solid #7A2129;padding:16px 20px;margin:0 0 1.4em;color:#1B1712}' +
      '#eob-toc{border-top:1px solid #D8D0BF;border-bottom:1px solid #D8D0BF;padding:16px 0 14px;margin:1.6em 0 0.4em}' +
      '#eob-toc .tc-k{font-family:' + mono + ';font-size:11px;letter-spacing:.13em;text-transform:uppercase;color:#6B6255;margin:0 0 8px}' +
      '#eob-toc ol{list-style:none;margin:0;padding:0;columns:2;column-gap:32px}' +
      '#eob-toc li{font-family:' + sans + ';font-size:15px !important;line-height:1.4 !important;margin:0 0 7px;break-inside:avoid;padding:0}' +
      '#eob-toc li a{color:#1B1712 !important;text-decoration:none !important}' +
      '#eob-toc li a:hover{color:#7A2129 !important;text-decoration:underline !important}' +
      '@media(max-width:640px){#eob-toc ol{columns:1}}' +
      '#eob-art-signup{background:#1C2C3A;color:#F3F0E9;padding:30px 30px 26px;margin:3.2rem 0 0;border-radius:2px}' +
      '#eob-art-signup .as-k{font-family:' + mono + ';font-size:11px !important;letter-spacing:.13em;text-transform:uppercase;color:#D9B8A8 !important;margin:0 0 10px}' +
      '#eob-art-signup .as-h{font-family:' + serif + ';font-weight:600;font-size:26px !important;line-height:1.2 !important;color:#F3F0E9 !important;margin:0 0 8px}' +
      '#eob-art-signup .as-p{font-family:' + sans + ';font-size:16px !important;line-height:1.55 !important;color:#C9D0D8 !important;margin:0 0 18px;max-width:34em}' +
      '#eob-art-signup form{display:flex;flex-wrap:wrap;gap:8px;max-width:30rem;margin:0}' +
      '#eob-art-signup input[type="email"]{flex:1;min-width:12rem;height:46px;box-sizing:border-box;border:1px solid #33465A;border-radius:2px;padding:0 12px;font-family:' + sans + ';font-size:15px;color:#1B1712;background:#F3F0E9}' +
      '#eob-art-signup button[type="submit"]{height:46px;border:none;border-radius:2px;cursor:pointer;padding:0 18px;background:#7A2129;color:#F3F0E9;font-family:' + sans + ';font-weight:600;font-size:15px;white-space:nowrap}' +
      '#eob-art-signup button[type="submit"]:hover{background:#5E181F}' +
      '#eob-art-signup .as-n{font-family:' + mono + ';font-size:11px !important;letter-spacing:.04em;color:#A9B2BD !important;margin:12px 0 0}' +
      '#eob-art-signup .eob-form-status{color:#F3F0E9}' +
      '@media(max-width:520px){#eob-art-signup{padding:24px 20px}#eob-art-signup form{flex-direction:column}#eob-art-signup button[type="submit"]{width:100%}#eob-art-signup input[type="email"]{flex:none;width:100%}}' +
      /* product list */
      '.product-description ul.eob-plist{list-style:none;margin:0 0 1em;padding:0}' +
      '.product-description ul.eob-plist li{position:relative;padding:0 0 0 20px;margin:0 0 10px}' +
      '.product-description ul.eob-plist li:before{content:"";position:absolute;left:0;top:.72em;width:9px;height:1px;background:#7A2129}' +
      /* start here */
      '#eob-start{border-bottom:1px solid var(--line,#D8D0BF);padding:56px 0 60px}' +
      '#eob-start .st-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:#D8D0BF;border:1px solid #D8D0BF;margin-top:1.6rem}' +
      '#eob-start .st-door{background:#F3F0E9;padding:22px 20px 20px}' +
      '#eob-start .st-door h3{font-family:' + serif + ';font-weight:600;font-size:1.18rem;line-height:1.25;color:#1B1712;margin:0 0 12px}' +
      '#eob-start .st-door ul{list-style:none;margin:0;padding:0}' +
      '#eob-start .st-door li{border-top:1px solid #E4DECF;margin:0;padding:0}' +
      '#eob-start .st-door li a{display:block;padding:11px 0;font-family:' + sans + ';font-size:.93rem;line-height:1.35;color:#3A342B;text-decoration:none}' +
      '#eob-start .st-door li a:hover{color:#7A2129}' +
      '#eob-start .st-kind{font-family:' + mono + ';font-size:.64rem;letter-spacing:.12em;text-transform:uppercase;color:#7A2129;display:block;margin-bottom:2px}' +
      '@media(max-width:980px){#eob-start .st-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}' +
      '@media(max-width:560px){#eob-start .st-grid{grid-template-columns:1fr}#eob-start{padding:40px 0 44px}}';
    var st = document.createElement('style');
    st.id = 'eob-audit-style';
    st.textContent = css;
    (document.head || document.documentElement).appendChild(st);
  }

  // 9a. Library index and category pages.
  function libraryCategory(){
    var p = location.pathname.replace(/\/+$/, '');
    if (p.indexOf('/library/category/') !== 0) return '';
    var raw = p.substring('/library/category/'.length);
    try { return decodeURIComponent(raw.replace(/\+/g, ' ')); } catch(e){ return ''; }
  }
  function libraryIndex(){
    var p = location.pathname.replace(/\/+$/, '');
    if (p !== '/library' && p.indexOf('/library/category/') !== 0) return;
    var list = document.querySelector('.blog-list');
    if (!list) return;
    auditStyle();
    // One page heading: card titles become h2.
    var titles = list.querySelectorAll('h1.blog-title');
    for (var i = 0; i < titles.length; i++){
      var h = titles[i], n = document.createElement('h2');
      n.className = h.className;
      n.innerHTML = h.innerHTML;
      h.parentNode.replaceChild(n, h);
    }
    var cards = list.querySelectorAll('article');
    for (var c = 0; c < cards.length; c++){
      var t = cards[c].querySelector('.blog-title'), img = cards[c].querySelector('img');
      if (img && t && !(img.getAttribute('alt') || '').trim())
        img.setAttribute('alt', 'Illustration for the article: ' + (t.textContent || '').trim());
    }
    if (byId('eob-lib-head')) return;
    var cat = libraryCategory();
    var chips = '<a href="/library"' + (cat ? '' : ' aria-current="page"') + '>All</a>';
    for (var k = 0; k < PILLARS.length; k++){
      chips += '<a href="' + PILLARS[k].h + '"' + (PILLARS[k].n === cat ? ' aria-current="page"' : '') + '>' + escHtml(PILLARS[k].n) + '</a>';
    }
    var head = document.createElement('header');
    head.id = 'eob-lib-head';
    head.innerHTML =
      '<p class="lh-k">The Exec Ops Library' + (cat ? ' / Topic' : '') + '</p>' +
      '<h1 class="lh-h">' + (cat ? escHtml(cat) : 'Playbooks for the work of executive operations') + '</h1>' +
      '<p class="lh-p">' + (cat
        ? 'Every guide filed under this topic. Pick another topic below, or search the whole library.'
        : 'Sourced guides to the Chief of Staff and Executive Assistant roles: what the work is, how to get in, what it pays, and how to do it well.') + '</p>' +
      '<div class="lh-bar"><nav class="lh-chips" aria-label="Browse the library by topic">' + chips + '</nav>' +
      '<form class="lh-search" action="/search" method="get" role="search">' +
        '<input type="search" name="q" placeholder="Search the library" aria-label="Search the library">' +
        '<button type="submit">Search</button></form></div>';
    try {
      var cs = window.getComputedStyle(list);
      head.style.paddingLeft = cs.paddingLeft;
      head.style.paddingRight = cs.paddingRight;
      head.style.paddingTop = cs.paddingTop;
      list.style.paddingTop = '28px';
    } catch(e){}
    list.parentNode.insertBefore(head, list);
    head.addEventListener('click', function(ev){
      var a = ev.target && ev.target.closest ? ev.target.closest('.lh-chips a') : null;
      if (a) auditEvent('library_filter', { topic: (a.textContent || '').trim() });
    });
  }

  // 9b. Article furniture. Runs on every /library/<slug> article page.
  function isArticlePage(){
    return location.pathname.indexOf(CFG.blogBase) === 0 &&
           location.pathname.indexOf('/category/') === -1 &&
           !!document.querySelector('.blog-item-wrapper .blog-item-content');
  }
  function articleModified(){
    var nodes = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < nodes.length; i++){
      try {
        var j = JSON.parse(nodes[i].textContent);
        if (j && j['@type'] === 'Article' && j.dateModified){
          var m = /^(\d{4})-(\d{2})/.exec(j.dateModified);
          if (m) return MONTHS[parseInt(m[2], 10) - 1] + ' ' + m[1];
        }
      } catch(e){}
    }
    return '';
  }
  function articleFurniture(){
    if (!isArticlePage()) return;
    auditStyle();
    var content = document.querySelector('.blog-item-wrapper .blog-item-content');
    var meta = document.querySelector('.blog-item-wrapper .blog-item-meta-wrapper');
    // Meta strip: month and year of the last update, read time, byline to /about.
    if (meta && !meta.getAttribute('data-eob-meta')){
      meta.setAttribute('data-eob-meta', '1');
      var time = meta.querySelector('time'), upd = articleModified();
      if (time && upd){ var sp = time.querySelector('span') || time; sp.textContent = 'Updated ' + upd; }
      var by = meta.querySelector('.blog-meta-item--author a');
      if (by) by.setAttribute('href', '/about');
      var words = ((content.innerText || content.textContent || '').trim().split(/\s+/).length) || 0;
      if (words > 200){
        var rt = document.createElement('div');
        rt.className = 'blog-meta-item eob-readtime';
        rt.style.display = 'inline-block';
        rt.textContent = Math.max(2, Math.round(words / 230)) + ' min read';
        (meta.querySelector('.blog-item-author-date-wrapper') || meta).appendChild(rt);
      }
    }
    var hdr = content.querySelector('.eob-auto-header img'), h1 = document.querySelector('.blog-item-wrapper h1.entry-title');
    if (hdr && h1 && !(hdr.getAttribute('alt') || '').trim()) hdr.setAttribute('alt', 'Illustration for the article: ' + (h1.textContent || '').trim());
    // Takeaway box.
    var paras = content.querySelectorAll('p');
    var takeaway = null;
    for (var i = 0; i < paras.length && i < 4; i++){
      var s = paras[i].querySelector('strong');
      if (s && /^\s*Takeaway/i.test(s.textContent || '') && paras[i].firstElementChild === s){ takeaway = paras[i]; break; }
    }
    if (takeaway) takeaway.classList.add('eob-takeaway');
    // Contents list for longer pieces.
    if (!byId('eob-toc')){
      var heads = [], all = content.querySelectorAll('h2');
      for (var h = 0; h < all.length; h++){
        var hd = all[h];
        if (hd.closest('aside, #eob-keep-reading, #eob-art-signup, #eob-toc, [id^="eob-gfx-"]')) continue;
        var label = (hd.textContent || '').trim();
        if (!label) continue;
        if (!hd.id) hd.id = 'eob-h-' + label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
        heads.push({ id: hd.id, label: label });
      }
      if (heads.length >= 5){
        var toc = document.createElement('nav');
        toc.id = 'eob-toc';
        toc.setAttribute('aria-label', 'In this article');
        var items = '';
        for (var q = 0; q < heads.length; q++) items += '<li><a href="#' + heads[q].id + '">' + escHtml(heads[q].label) + '</a></li>';
        toc.innerHTML = '<p class="tc-k">In this article</p><ol>' + items + '</ol>';
        var first = content.querySelector('h2');
        if (takeaway && takeaway.parentNode) takeaway.parentNode.insertBefore(toc, takeaway.nextSibling);
        else if (first && first.parentNode) first.parentNode.insertBefore(toc, first);
      }
    }
    // Reading progress.
    if (!byId('eob-progress')){
      var bar = document.createElement('div');
      bar.id = 'eob-progress';
      bar.setAttribute('aria-hidden', 'true');
      document.body.appendChild(bar);
      var tick = false;
      var paint = function(){
        tick = false;
        var r = content.getBoundingClientRect(), total = r.height - window.innerHeight * 0.6;
        var done = total > 0 ? Math.min(1, Math.max(0, (-r.top) / total)) : 0;
        bar.style.width = (done * 100).toFixed(1) + '%';
      };
      window.addEventListener('scroll', function(){ if (!tick){ tick = true; window.requestAnimationFrame(paint); } }, { passive: true });
      paint();
    }
    // End-of-article Brief signup.
    if (!byId('eob-art-signup')){
      var host = contentEl() || content;
      var box = document.createElement('section');
      box.id = 'eob-art-signup';
      box.innerHTML =
        '<p class="as-k">The Brief / Weekly</p>' +
        '<p class="as-h">Get the next playbook in your inbox.</p>' +
        '<p class="as-p">One email a week: up to six roles with published pay at a $100K midpoint or better, one practical playbook, and one market signal. Free.</p>' +
        '<form class="eob-ml-form" data-eob-placement="article_end" action="https://assets.mailerlite.com/jsonp/2493859/forms/' + BRIEF_FORM_ID + '/subscribe" method="post" target="eob-ml-frame">' +
          '<input type="email" name="fields[email]" placeholder="you@work.com" aria-label="Email address" autocomplete="email" required>' +
          '<input type="hidden" name="ml-submit" value="1">' +
          '<input type="hidden" name="anticsrf" value="true">' +
          '<button type="submit">Subscribe to The Brief</button>' +
        '</form>' +
        '<p class="as-n">No spam. Unsubscribe in one click.</p>';
      var keep = byId('eob-keep-reading');
      if (keep && keep.parentNode) keep.parentNode.insertBefore(box, keep);
      else host.appendChild(box);
      try { formFeedback(); } catch(e){}
    }
  }

  // 9c. Product pages: real lists and descriptive image alt text.
  var PRODUCT_SHOTS = [
    [/cover/i, 'cover'], [/inside/i, 'inside pages'], [/pages/i, 'sample pages'],
    [/modules/i, 'module overview'], [/databases/i, 'database views'], [/trackers/i, 'tracker views'],
    [/difference/i, 'what the paid edition adds'], [/howitworks|how-it-works/i, 'how it works']
  ];
  function looksLikeFilename(s){ return !s || /\.(png|jpe?g|webp)$/i.test(s) || /^[a-z0-9]+(-[a-z0-9]+){2,}$/i.test(s); }
  function productPolish(){
    if (!document.body.classList.contains('collection-type-products')) return;
    auditStyle();
    var desc = document.querySelectorAll('.product-description');
    for (var d = 0; d < desc.length; d++){
      if (desc[d].getAttribute('data-eob-list')) continue;
      desc[d].setAttribute('data-eob-list', '1');
      var ps = desc[d].querySelectorAll('p'), run = [];
      var flush = function(){
        if (run.length < 2){ run = []; return; }
        var ul = document.createElement('ul');
        ul.className = 'eob-plist';
        run[0].parentNode.insertBefore(ul, run[0]);
        for (var r = 0; r < run.length; r++){
          var li = document.createElement('li');
          li.innerHTML = run[r].innerHTML.replace(/^\s*-\s*/, '');
          ul.appendChild(li);
          run[r].parentNode.removeChild(run[r]);
        }
        run = [];
      };
      for (var i = 0; i < ps.length; i++){
        if (/^\s*-\s*\S/.test(ps[i].textContent || '') && (!run.length || run[run.length - 1].nextElementSibling === ps[i])) run.push(ps[i]);
        else { flush(); if (/^\s*-\s*\S/.test(ps[i].textContent || '')) run.push(ps[i]); }
      }
      flush();
    }
    var titleEl = document.querySelector('.product-detail h1, h1.product-title');
    var title = titleEl ? (titleEl.textContent || '').trim() : '';
    var imgs = document.querySelectorAll('.product-gallery img, .product-list img, main img');
    for (var m = 0; m < imgs.length; m++){
      var img = imgs[m], alt = (img.getAttribute('alt') || '').trim();
      if (!looksLikeFilename(alt)) continue;
      var name = title;
      if (!name){
        var card = img.parentNode, ct = null, hops = 0;
        while (card && card !== document.body && hops < 6 && !ct){ ct = card.querySelector ? card.querySelector('[class*="title"]') : null; card = card.parentNode; hops++; }
        name = ct ? (ct.textContent || '').trim() : '';
      }
      if (!name) continue;
      var src = alt || img.getAttribute('data-src') || img.getAttribute('src') || '', what = 'preview';
      for (var s2 = 0; s2 < PRODUCT_SHOTS.length; s2++){ if (PRODUCT_SHOTS[s2][0].test(src)){ what = PRODUCT_SHOTS[s2][1]; break; } }
      img.setAttribute('alt', name + ': ' + what);
    }
  }

  // 9d. Homepage start-here doors by reader type.
  var DOORS = [
    { h: 'I\'m an EA leveling up', links: [
      ['Guide', 'How to grow your career as an Executive Assistant', '/library/how-to-grow-your-career-as-an-executive-assistant'],
      ['Guide', 'What changes at the senior EA level', '/library/senior-executive-assistant-leveling'],
      ['Pay', 'EA salary and how to get a raise', '/library/executive-assistant-salary-and-how-to-get-a-raise'],
      ['Path', 'The EA to Chief of Staff path', '/library/ea-to-chief-of-staff-path'] ] },
    { h: 'I want to become a Chief of Staff', links: [
      ['Guide', 'How to become a Chief of Staff', '/how-to-become-a-chief-of-staff-static'],
      ['Tool', 'Take the readiness quiz', '/readiness-quiz'],
      ['Guide', 'The skills that get you hired', '/library/skills-to-get-hired-as-chief-of-staff'],
      ['Prep', 'Chief of Staff interview questions', '/library/chief-of-staff-interview-questions'] ] },
    { h: 'I\'m a Chief of Staff now', links: [
      ['Tool', 'Work the first 90 days plan', '/first-90-days'],
      ['Playbook', 'Build an operating cadence', '/library/how-to-build-an-operating-cadence'],
      ['Playbook', 'Run the leadership team meeting', '/library/run-effective-leadership-team-meeting'],
      ['Playbook', 'Managing up as a Chief of Staff', '/library/managing-up-chief-of-staff'] ] },
    { h: 'I\'m hiring a Chief of Staff', links: [
      ['Guide', 'When a company needs a Chief of Staff', '/library/when-does-a-company-need-a-chief-of-staff'],
      ['Guide', 'How to create the role', '/library/how-to-create-a-chief-of-staff-role'],
      ['Guide', 'The three types of Chief of Staff', '/library/three-types-of-chief-of-staff'],
      ['Service', 'Executive operations consulting', '/consulting'] ] }
  ];
  function startHere(){
    var home = byId('eob-home');
    if (!home || byId('eob-start')) return;
    var sections = home.querySelectorAll('section');
    if (!sections.length) return;
    auditStyle();
    var grid = '';
    for (var i = 0; i < DOORS.length; i++){
      var lis = '';
      for (var j = 0; j < DOORS[i].links.length; j++){
        var L = DOORS[i].links[j];
        lis += '<li><a href="' + L[2] + '" data-eob-door="' + (i + 1) + '"><span class="st-kind">' + L[0] + '</span>' + escHtml(L[1]) + '</a></li>';
      }
      grid += '<div class="st-door"><h3>' + escHtml(DOORS[i].h) + '</h3><ul>' + lis + '</ul></div>';
    }
    var sec = document.createElement('section');
    sec.id = 'eob-start';
    sec.innerHTML = '<div class="wrap"><div class="sectag">Start here &nbsp;/&nbsp; Pick your seat</div>' +
      '<h2 class="sec-h">Where are you right now?</h2>' +
      '<p class="sec-intro">Four ways in, depending on the seat you\'re in or the one you want.</p>' +
      '<div class="st-grid">' + grid + '</div></div>';
    var hero = sections[0];
    hero.parentNode.insertBefore(sec, hero.nextSibling);
    sec.addEventListener('click', function(ev){
      var a = ev.target && ev.target.closest ? ev.target.closest('a[data-eob-door]') : null;
      if (a) auditEvent('start_here_click', { door: a.getAttribute('data-eob-door'), destination: a.getAttribute('href') });
    });
  }

  // ---- 10. Shop guide and download cover tiles (2026-11-18) ------------------
  // /shop: "Which one do I need?" picks above the grid and a comparison of all
  // eight products below it. Every fact is taken from the live listings and the
  // 2026-11-18 download audit; update SHOP_GUIDE when a product changes.
  // /resources: a small document tile beside each download. DOM-only, idempotent.
  var SHOP_PICKS = [
    ['I have an interview coming up', 'interview-prep-kit', 'The five hiring stages and the questions asked at each, four work-sample formats, and a story structure built to hold up under follow-up questions.'],
    ['I have an offer and want to negotiate it', 'salary-leveling-playbook', 'How to read base, bonus and equity, where you sit on a three-level ladder, and six word-for-word negotiation scripts.'],
    ['I\'m new in the role and need the core systems', 'operator-toolkit', 'Each of its 25 systems comes with when to use it, how to run it, a worked example, the failure modes, and a template you can copy into a doc.'],
    ['My memos and updates aren\'t landing', 'executive-memo-pack', 'Four fill-in templates with guidance for every section, plus three weak memos rewritten in full with each change named.']
  ];
  var SHOP_GUIDE = [
    ['interview-prep-kit', 'The Exec Ops Interview Prep Kit', '$29', 'Designed PDF, 16 pages', 'A live Chief of Staff or exec-ops interview process', 'Also included in Job Search HQ.'],
    ['salary-leveling-playbook', 'The Salary and Leveling Playbook', '$24', 'Designed PDF, 17 pages', 'Reading and negotiating a real offer', 'Also included in Job Search HQ.'],
    ['job-search-hq', 'Job Search HQ', '$49', 'Notion template, spreadsheet workbook and PDFs', 'Running a whole search from first outreach to signed offer', 'Includes the Salary and Leveling Playbook and the Interview Prep Kit.'],
    ['operator-toolkit', 'The Operator\'s Toolkit (Complete Edition)', '$39', 'Designed PDF, 31 pages', 'A working reference for the systems a Chief of Staff runs', 'Also included in The Exec Ops OS.'],
    ['template-library', 'The Exec-Ops Template Library', '$29', 'Designed PDF, 25 pages', 'Six core operating templates in one file', 'Also included in The Exec Ops OS.'],
    ['exec-ops-os', 'The Exec Ops OS', '$79', 'Notion workspace, Google Workspace folder and PDFs', 'Setting up a connected operating system for an executive\'s office', 'Includes the Operator\'s Toolkit and the Template Library.'],
    ['executive-memo-pack', 'The Executive Memo Pack', '$24', 'Designed PDF, 23 pages', 'Memos, updates and briefs that executives read', ''],
    ['board-meeting-prep-kit', 'The Board Meeting Prep Kit', '$29', 'Designed PDF, 24 pages', 'Owning the prep for a recurring board meeting', '']
  ];
  function shopGuideStyle(){
    if (byId('eob-shop-guide-style')) return;
    var mono = '"IBM Plex Mono",ui-monospace,monospace', serif = '"Spectral",Georgia,serif', sans = '"Public Sans",system-ui,sans-serif';
    var st = document.createElement('style');
    st.id = 'eob-shop-guide-style';
    st.textContent =
      '#eob-shop-picks{grid-column:1 / -1;margin:8px 0 34px;border-top:2px solid #1B1712;padding-top:22px}' +
      '#eob-shop-picks .sg-k,#eob-shop-compare .sg-k{font-family:' + mono + ';font-size:11.5px;letter-spacing:.13em;text-transform:uppercase;color:#7A2129;margin:0 0 8px}' +
      '#eob-shop-picks .sg-h,#eob-shop-compare .sg-h{font-family:' + serif + ';font-weight:600;font-size:30px;line-height:1.15;color:#1B1712;margin:0 0 8px}' +
      '#eob-shop-picks .sg-p,#eob-shop-compare .sg-p{font-family:' + sans + ';font-size:16px;line-height:1.55;color:#3A342B;margin:0 0 20px;max-width:46em}' +
      '#eob-shop-picks .sg-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:#CFC7B4;border:1px solid #CFC7B4}' +
      '#eob-shop-picks a.sg-pick{display:block;background:#F3F0E9;padding:18px 18px 16px;text-decoration:none;color:#3A342B}' +
      '#eob-shop-picks a.sg-pick:hover{background:#EBE6DA}' +
      '#eob-shop-picks .sg-sit{font-family:' + serif + ';font-weight:600;font-size:18px;line-height:1.25;color:#1B1712;margin:0 0 8px;display:block}' +
      '#eob-shop-picks .sg-why{font-family:' + sans + ';font-size:14px;line-height:1.5;color:#5A5348;display:block;margin:0 0 12px}' +
      '#eob-shop-picks .sg-go{font-family:' + mono + ';font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#7A2129;display:block}' +
      '#eob-shop-compare{box-sizing:border-box;margin:26px 0 0;padding-bottom:56px}' +
      '#eob-shop-compare .sg-inner{border-top:2px solid #1B1712;padding-top:24px}' +
      '#eob-shop-compare table{width:100%;border-collapse:collapse;font-family:' + sans + ';font-size:14.5px;line-height:1.45}' +
      '#eob-shop-compare th{font-family:' + mono + ';font-size:11px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;text-align:left;color:#6B6255;padding:10px 14px 10px 0;border-bottom:1px solid #1B1712;vertical-align:bottom}' +
      '#eob-shop-compare td{padding:13px 14px 13px 0;border-bottom:1px solid #CFC7B4;vertical-align:top;color:#3A342B}' +
      '#eob-shop-compare td.sg-t a{font-family:' + serif + ';font-weight:600;font-size:17px;color:#1B1712;text-decoration:none}' +
      '#eob-shop-compare td.sg-t a:hover{color:#7A2129}' +
      '#eob-shop-compare td.sg-price{font-family:' + mono + ';color:#7A2129;white-space:nowrap}' +
      '#eob-shop-compare .sg-note{font-family:' + sans + ';font-size:15px;line-height:1.55;color:#3A342B;margin:20px 0 0;max-width:52em}' +
      '#eob-shop-compare .sg-g{font-family:' + mono + ';font-size:11.5px;letter-spacing:.04em;color:#6B6255;margin:12px 0 0}' +
      '@media(max-width:1000px){#eob-shop-picks .sg-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}' +
      '@media(max-width:760px){#eob-shop-picks .sg-grid{grid-template-columns:1fr}#eob-shop-picks .sg-h,#eob-shop-compare .sg-h{font-size:25px}' +
        '#eob-shop-compare thead{display:none}#eob-shop-compare tr{display:block;padding:14px 0;border-bottom:1px solid #CFC7B4}' +
        '#eob-shop-compare td{display:block;border:none;padding:2px 0}#eob-shop-compare td:empty{display:none}}' +
      /* download tiles */
      '#eob-resources .item .kind .eob-doc{display:block;width:62px;height:80px;background:#fff;border:1px solid #CFC7B4;box-shadow:3px 3px 0 #E4DECF;margin:0 0 12px;position:relative;box-sizing:border-box}' +
      '#eob-resources .item .kind .eob-doc:before{content:"";position:absolute;left:8px;right:8px;top:9px;height:1px;background:#1B1712}' +
      '#eob-resources .item .kind .eob-doc:after{content:"";position:absolute;left:8px;top:26px;width:12px;height:2px;background:#7A2129}' +
      '#eob-resources .item .kind .eob-doc i{position:absolute;left:8px;height:3px;background:#3A342B;border-radius:1px}' +
      '#eob-resources .item .kind .eob-doc i.l1{top:35px;width:38px}#eob-resources .item .kind .eob-doc i.l2{top:42px;width:28px}' +
      '#eob-resources .item .kind .eob-doc i.l3{top:53px;width:44px;height:2px;background:#CFC7B4}#eob-resources .item .kind .eob-doc i.l4{top:59px;width:34px;height:2px;background:#CFC7B4}' +
      '#eob-resources .item .kind .eob-doc.is-notion i.l3,#eob-resources .item .kind .eob-doc.is-notion i.l4{width:20px;height:9px;top:52px;background:#EBE6DA;border:1px solid #CFC7B4;box-sizing:border-box}' +
      '#eob-resources .item .kind .eob-doc.is-notion i.l4{left:32px}' +
      '@media(max-width:720px){#eob-resources .item .kind .eob-doc{display:none}}';
    (document.head || document.documentElement).appendChild(st);
  }
  function shopGuide(){
    if (location.pathname.replace(/\/+$/, '') !== '/shop') return;
    var list = document.querySelector('.product-list');
    if (!list || byId('eob-shop-picks')) return;
    shopGuideStyle();
    var cards = '';
    for (var i = 0; i < SHOP_PICKS.length; i++){
      var P = SHOP_PICKS[i], title = '';
      for (var t = 0; t < SHOP_GUIDE.length; t++){ if (SHOP_GUIDE[t][0] === P[1]) title = SHOP_GUIDE[t][1]; }
      cards += '<a class="sg-pick" href="/shop/p/' + P[1] + '" data-eob-pick="' + P[1] + '">' +
        '<span class="sg-sit">' + escHtml(P[0]) + '</span><span class="sg-why">' + escHtml(P[2]) + '</span>' +
        '<span class="sg-go">' + escHtml(title) + ' &rarr;</span></a>';
    }
    var picks = document.createElement('section');
    picks.id = 'eob-shop-picks';
    picks.innerHTML = '<p class="sg-k">Shop guide</p><p class="sg-h">Which one do I need?</p>' +
      '<p class="sg-p">Start with what\'s in front of you right now. Two of the products are bundles that include other guides in this shop, so check the comparison below the shelf before you buy more than one.</p>' +
      '<div class="sg-grid">' + cards + '</div>';
    var header = list.querySelector('header');
    if (header && header.parentNode === list) list.insertBefore(picks, header.nextSibling);
    else list.insertBefore(picks, list.firstChild);
    var rows = '';
    for (var r = 0; r < SHOP_GUIDE.length; r++){
      var G = SHOP_GUIDE[r];
      rows += '<tr><td class="sg-t"><a href="/shop/p/' + G[0] + '">' + escHtml(G[1]) + '</a></td><td class="sg-price">' + G[2] + '</td>' +
        '<td>' + escHtml(G[4]) + '</td><td>' + escHtml(G[3]) + '</td><td>' + escHtml(G[5]) + '</td></tr>';
    }
    var cmp = document.createElement('section');
    cmp.id = 'eob-shop-compare';
    cmp.innerHTML = '<div class="sg-inner"><p class="sg-k">Compare</p><p class="sg-h">All eight, side by side</p>' +
      '<table><thead><tr><th>Product</th><th>Price</th><th>Best for</th><th>Format</th><th>Overlap</th></tr></thead><tbody>' + rows + '</tbody></table>' +
      '<p class="sg-note">The Exec Ops OS includes The Operator\'s Toolkit (Complete Edition) and The Exec-Ops Template Library as full PDFs, and Job Search HQ includes The Salary and Leveling Playbook and The Exec Ops Interview Prep Kit. If you\'re buying a bundle, you don\'t need the guides inside it separately. The Template Library\'s interview chapter is a short template, not the separate Interview Prep Kit.</p>' +
      '<p class="sg-g">30-day money-back guarantee on every product.</p></div>';
    try {
      var cs = window.getComputedStyle(list);
      cmp.style.paddingLeft = cs.paddingLeft; cmp.style.paddingRight = cs.paddingRight;
      cmp.style.maxWidth = cs.maxWidth; cmp.style.marginLeft = cs.marginLeft; cmp.style.marginRight = cs.marginRight;
    } catch(e){}
    list.parentNode.insertBefore(cmp, list.nextSibling);
    picks.addEventListener('click', function(ev){
      var a = ev.target && ev.target.closest ? ev.target.closest('a[data-eob-pick]') : null;
      if (a) auditEvent('shop_guide_click', { product_id: a.getAttribute('data-eob-pick') });
    });
  }
  function resourceTiles(){
    var root = byId('eob-resources');
    if (!root) return;
    var kinds = root.querySelectorAll('.ledger .item .kind');
    if (!kinds.length) return;
    shopGuideStyle();
    for (var i = 0; i < kinds.length; i++){
      if (kinds[i].querySelector('.eob-doc')) continue;
      var tile = document.createElement('span');
      tile.className = 'eob-doc' + (/notion/i.test(kinds[i].textContent || '') ? ' is-notion' : '');
      tile.setAttribute('aria-hidden', 'true');
      tile.innerHTML = '<i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i>';
      kinds[i].insertBefore(tile, kinds[i].firstChild);
    }
  }

  // ---- 11. Hub hero illustrations and board sample tidy (2026-11-18) ---------
  // Reuses two illustrations already published on the site's own image CDN.
  var HERO_ART = {
    'eob-tools-hub': 'https://static1.squarespace.com/static/6a48079e16f34d0399d0bba8/6a4813f96255cd272ded2397/6a481b346255cd272defb964/1790441505533/three-types-of-chief-of-staff.png',
    'eob-resources': 'https://static1.squarespace.com/static/6a48079e16f34d0399d0bba8/6a4813f96255cd272ded2397/6a497e34427d8759a2e21ff4/1788830297894/what-an-executive-assistant-to-a-ceo-does.png'
  };
  function heroArt(){
    for (var id in HERO_ART){
      if (!HERO_ART.hasOwnProperty(id)) continue;
      var root = byId(id);
      if (!root) continue;
      var wrap = root.querySelector('.hero .wrap');
      if (!wrap || wrap.querySelector('.eob-hero-art')) continue;
      if (!byId('eob-hero-art-style')){
        var st = document.createElement('style');
        st.id = 'eob-hero-art-style';
        st.textContent = '.eob-hero-art{display:none}' +
          '@media(min-width:1180px){.eob-hero-art{display:block;position:absolute;right:28px;top:50%;transform:translateY(-50%);width:236px;height:auto;border:1px solid #D8D0BF;border-radius:2px}}';
        (document.head || document.documentElement).appendChild(st);
      }
      if (window.getComputedStyle(wrap).position === 'static') wrap.style.position = 'relative';
      var img = document.createElement('img');
      img.className = 'eob-hero-art';
      img.src = HERO_ART[id] + '?format=500w';
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.setAttribute('loading', 'lazy');
      img.width = 236;
      wrap.appendChild(img);
    }
  }
  // Homepage board sample: a blank location cell reads as a broken row.
  function boardSampleTidy(){
    var body = byId('eob-roles-body');
    if (!body || body.getAttribute('data-eob-tidy')) return;
    body.setAttribute('data-eob-tidy', '1');
    var fill = function(){
      var rows = body.querySelectorAll('tr');
      for (var i = 0; i < rows.length; i++){
        var cells = rows[i].querySelectorAll('td');
        if (cells.length !== 3) continue;
        if (!(cells[2].textContent || '').trim()){ cells[2].textContent = 'See posting'; cells[2].style.color = '#8A8172'; }
      }
    };
    fill();
    try { new MutationObserver(fill).observe(body, { childList: true }); } catch(e){}
  }

  // ---- boot --------------------------------------------------------------
  function run(){
    var slug = currentSlug();
    try { jobBoardMetrics(); } catch(e){}
    try { fixLinks(); } catch(e){}             // stale slug rewrite (site-wide)
    try { formFeedback(); } catch(e){}         // opt-in form success feedback backstop (site-wide)
    try { subMemory(); } catch(e){}            // subscriber memory: ?e= handoff + known-sub one-click (site-wide)
    try { pickBarFix(); } catch(e){}           // /resources send bar: escape the transformed fe-block wrapper
    try { homePolish(); } catch(e){}           // home page mobile overflow + live counts
    try { autoHeader(); } catch(e){}           // featured image -> in-article header (any article page)
    try { shopPolish(); } catch(e){}           // native store styling (shop list + product pages)
    try { rolesLanding(); } catch(e){}
    try { rolesPolish(); } catch(e){}          // /roles: h1 + honest board language until re-paste
    try { honestCopy(); } catch(e){}           // "curated" overclaim in shared CTA copy (site-wide)
    try { rolesOptIn(); } catch(e){}           // /roles weekly new-roles trade (dark until form id set)
    try { breadcrumbs(); } catch(e){}          // BreadcrumbList JSON-LD (site-wide, non-home)
    try { trackClicks(); } catch(e){}          // tool + download intent events (site-wide)
    try { libraryIndex(); } catch(e){}         // library index heading, topic chips, search (2026-11-18)
    try { productPolish(); } catch(e){}        // product lists and image alt text (2026-11-18)
    try { startHere(); } catch(e){}            // homepage reader-type doors (2026-11-18)
    try { shopGuide(); } catch(e){}            // /shop picks and comparison (2026-11-18)
    try { resourceTiles(); } catch(e){}        // /resources document tiles (2026-11-18)
    try { heroArt(); } catch(e){}              // Tools and Resources hero illustration (2026-11-18)
    try { boardSampleTidy(); } catch(e){}      // homepage board sample blank locations (2026-11-18)
    try { articleFurniture(); } catch(e){}     // article meta, contents, progress, end signup (2026-11-18)
    if (!slug || !findArticle(slug)) return;   // only on known article pages (path-agnostic)
    var host = contentEl();
    if (!host) return;
    try { graphics(slug, host); } catch(e){}
    try { callout(slug, host); } catch(e){}
    try { toolCallout(slug, host); } catch(e){}   // separate slot: free-tool routing
    try { downloadCallout(slug, host); } catch(e){}  // content upgrade: the matching free download
    try { faqPolish(host); } catch(e){}
    try { keepReading(slug, host); } catch(e){}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();

/* EOB confirmed commerce measurement; checkout disabled until verified. */
(function (root, factory) {
  "use strict";

  var api = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }

  if (root && root.document) {
    root.EOBCommerceMeasurement = api;

    if (root.__EOB_COMMERCE_AUTOSTART__ !== false) {
      var start = function () {
        api.init({ window: root, document: root.document });
      };

      if (root.document.readyState === "loading") {
        root.document.addEventListener("DOMContentLoaded", start, { once: true });
      } else {
        start();
      }
    }
  }
})(typeof window !== "undefined" ? window : null, function () {
  "use strict";

  var INSTANCE_KEY = "__EOB_COMMERCE_MEASUREMENT_V1__";
  var ADD_BUTTON_SELECTOR = ".sqs-add-to-cart-button";
  var CART_QUANTITY_SELECTOR = ".sqs-cart-quantity";
  var CHECKOUT_SELECTOR = ".cart-checkout-button";
  var CART_TITLE_SELECTOR = ".cart-row-title";
  var CART_QUANTITY_INPUT_SELECTOR = ".cart-row-qty-input";
  var DEFAULT_PENDING_MS = 8000;

  function cleanText(value, maxLength) {
    if (typeof value !== "string") return "";
    return value.replace(/\s+/g, " ").trim().slice(0, maxLength || 200);
  }

  function finiteMoney(value) {
    if (value === null || value === undefined || value === "") return null;
    var number = Number(value);
    if (!Number.isFinite(number) || number < 0) return null;
    return Math.round(number * 100) / 100;
  }

  function validCurrency(value) {
    var currency = cleanText(value, 3).toUpperCase();
    return /^[A-Z]{3}$/.test(currency) ? currency : "";
  }

  function productFromContext(detail) {
    if (!detail) return null;

    var raw = detail.getAttribute("data-context");
    if (!raw) return null;

    try {
      var context = JSON.parse(raw);
      var product = context && context.product;
      var priceData = product && product.price;
      var itemId = cleanText(
        (product && product.id) || detail.getAttribute("data-product-id"),
        200
      );
      var itemName = cleanText(product && product.title, 200);
      var price = finiteMoney(priceData && priceData.value);
      var currency = validCurrency(priceData && priceData.currency);

      if (!itemId || !itemName || price === null || !currency) return null;

      return {
        detail: detail,
        item: {
          item_id: itemId,
          item_name: itemName,
          price: price,
          quantity: 1
        },
        currency: currency,
        value: price
      };
    } catch (error) {
      return null;
    }
  }

  function productFromJsonLd(doc, detail) {
    var scripts = doc.querySelectorAll('script[type="application/ld+json"]');

    function findProduct(value) {
      if (!value || typeof value !== "object") return null;
      if (value["@type"] === "Product") return value;
      if (Array.isArray(value)) {
        for (var index = 0; index < value.length; index += 1) {
          var item = findProduct(value[index]);
          if (item) return item;
        }
      }
      if (Array.isArray(value["@graph"])) return findProduct(value["@graph"]);
      return null;
    }

    for (var scriptIndex = 0; scriptIndex < scripts.length; scriptIndex += 1) {
      try {
        var product = findProduct(JSON.parse(scripts[scriptIndex].textContent || ""));
        if (!product) continue;

        var offers = Array.isArray(product.offers) ? product.offers[0] : product.offers;
        var itemId = cleanText(
          (detail && detail.getAttribute("data-product-id")) ||
            product.productID ||
            product.sku ||
            product["@id"],
          200
        );
        var itemName = cleanText(product.name, 200);
        var price = finiteMoney(offers && offers.price);
        var currency = validCurrency(offers && offers.priceCurrency);

        if (!itemId || !itemName || price === null || !currency) continue;

        return {
          detail: detail,
          item: {
            item_id: itemId,
            item_name: itemName,
            price: price,
            quantity: 1
          },
          currency: currency,
          value: price
        };
      } catch (error) {
        // Ignore malformed or unrelated JSON-LD blocks.
      }
    }

    return null;
  }

  function readProduct(doc) {
    var detail = doc.querySelector(
      '.product-detail[data-product-id], [data-controller="ProductDetail"][data-product-id]'
    );
    return productFromContext(detail) || productFromJsonLd(doc, detail);
  }

  function readCartQuantity(doc) {
    var nodes = doc.querySelectorAll(CART_QUANTITY_SELECTOR);
    var values = [];

    for (var index = 0; index < nodes.length; index += 1) {
      var match = cleanText(nodes[index].textContent, 30).match(/\d+/);
      if (match) values.push(Number(match[0]));
    }

    if (!values.length) return null;
    return Math.max.apply(Math, values);
  }

  function slugFromHref(href) {
    if (!href) return "";

    try {
      var url = new URL(href, "https://measurement.invalid");
      var parts = url.pathname.split("/").filter(Boolean);
      return cleanText(parts[parts.length - 1] || "", 200);
    } catch (error) {
      return "";
    }
  }

  function parseMoney(text, currencyHint) {
    var source = cleanText(text, 500);
    if (!source) return null;

    var isoMatch = source.match(/\b(USD|CAD|AUD|EUR|GBP)\b/i);
    var currency = validCurrency(currencyHint) || (isoMatch ? isoMatch[1].toUpperCase() : "");

    if (!currency) return null;

    var numberMatch = source.match(/(?:USD|CAD|AUD|EUR|GBP)?\s*[$€£]?\s*(\d[\d,]*(?:\.\d{1,2})?)/i);
    var value = finiteMoney(numberMatch && numberMatch[1].replace(/,/g, ""));
    return value === null ? null : { currency: currency, value: value };
  }

  function findCartRow(title) {
    var node = title && title.parentElement;

    for (var depth = 0; node && depth < 8; depth += 1, node = node.parentElement) {
      if (
        node.querySelector(CART_QUANTITY_INPUT_SELECTOR) &&
        (validCurrency(node.getAttribute("data-currency")) ||
          node.querySelector('[data-currency]') ||
          /\b(?:USD|CAD|AUD|EUR|GBP)\b/i.test(node.textContent))
      ) {
        return node;
      }
    }

    return null;
  }

  function readRowMoney(row) {
    var unitPrice = row.getAttribute("data-unit-price");
    if (unitPrice !== null) {
      var numericPrice = finiteMoney(unitPrice);
      var attributeCurrency = validCurrency(row.getAttribute("data-currency"));
      if (numericPrice !== null && attributeCurrency) {
        return { currency: attributeCurrency, value: numericPrice };
      }
    }

    var selectors = [
      ".cart-row-price .sqs-money-native",
      ".cart-row-price",
      ".cart-row-price-value",
      '[class*="cart-row-price"]',
      '[data-test*="price"]',
      '[data-testid*="price"]'
    ];

    for (var index = 0; index < selectors.length; index += 1) {
      var nodes = row.querySelectorAll(selectors[index]);
      for (var nodeIndex = 0; nodeIndex < nodes.length; nodeIndex += 1) {
        var money = parseMoney(
          nodes[nodeIndex].textContent,
          nodes[nodeIndex].getAttribute("data-currency") || row.getAttribute("data-currency")
        );
        if (money) return money;
      }
    }

    return null;
  }

  function readCartItem(title) {
    var row = findCartRow(title);
    if (!row) return null;

    var quantityInput = row.querySelector(CART_QUANTITY_INPUT_SELECTOR);
    var quantity = Number(quantityInput && quantityInput.value);
    var money = readRowMoney(row);
    var itemId = cleanText(
      row.getAttribute("data-product-id") ||
        row.getAttribute("data-item-id") ||
        slugFromHref(title.getAttribute("href")),
      200
    );
    var itemName = cleanText(title.textContent, 200);

    if (
      !itemId ||
      !itemName ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      !money
    ) {
      return null;
    }

    return {
      currency: money.currency,
      item: {
        item_id: itemId,
        item_name: itemName,
        price: money.value,
        quantity: quantity
      }
    };
  }

  function readCart(doc) {
    var titles = doc.querySelectorAll(CART_TITLE_SELECTOR);
    if (!titles.length) return null;

    var items = [];
    var currency = "";
    var value = 0;

    for (var index = 0; index < titles.length; index += 1) {
      var parsed = readCartItem(titles[index]);
      if (!parsed) return null;
      if (currency && parsed.currency !== currency) return null;

      currency = parsed.currency;
      items.push(parsed.item);
      value += parsed.item.price * parsed.item.quantity;
    }

    if (!currency || !items.length) return null;
    return { currency: currency, value: finiteMoney(value), items: items };
  }

  function defaultEmitter(win) {
    return function (name, params) {
      if (typeof win.gtag === "function") {
        win.gtag("event", name, params);
      }
    };
  }

  function isDisabled(element) {
    return Boolean(
      !element ||
        element.disabled ||
        element.getAttribute("aria-disabled") === "true"
    );
  }

  function init(options) {
    options = options || {};
    var win = options.window || (typeof window !== "undefined" ? window : null);
    var doc = options.document || (win && win.document);
    if (!win || !doc) return null;

    if (!options.force && win[INSTANCE_KEY]) return win[INSTANCE_KEY];

    var emit = typeof options.emit === "function" ? options.emit : defaultEmitter(win);
    var pendingWindowMs = Number(options.pendingWindowMs) || DEFAULT_PENDING_MS;
    var checkoutVerified = options.checkoutVerified === true;
    var product = readProduct(doc);
    var pendingAdd = null;
    var checkoutSent = false;
    var observer = null;
    var timer = null;

    function send(name, params) {
      try {
        emit(name, params);
      } catch (error) {
        // Analytics must never interrupt the storefront.
      }
    }

    function clearPending() {
      pendingAdd = null;
      if (timer !== null) {
        win.clearTimeout(timer);
        timer = null;
      }
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    }

    function checkPendingAdd() {
      if (!pendingAdd) return false;
      if (Date.now() > pendingAdd.expiresAt) {
        clearPending();
        return false;
      }

      var currentQuantity = readCartQuantity(doc);
      var button = pendingAdd.button;
      var addedMarker = Boolean(
        button &&
          (button.classList.contains("cart-added") ||
            (button.parentElement && button.parentElement.classList.contains("cart-added")))
      );
      if (
        currentQuantity === null ||
        currentQuantity <= pendingAdd.beforeQuantity ||
        !addedMarker
      ) return false;

      var addedQuantity = currentQuantity - pendingAdd.beforeQuantity;
      var item = {
        item_id: pendingAdd.product.item.item_id,
        item_name: pendingAdd.product.item.item_name,
        price: pendingAdd.product.item.price,
        quantity: addedQuantity
      };

      send("add_to_cart", {
        currency: pendingAdd.product.currency,
        value: finiteMoney(item.price * item.quantity),
        items: [item]
      });
      clearPending();
      return true;
    }

    function beginPendingAdd(button) {
      if (!product || isDisabled(button) || pendingAdd) return;
      if (product.detail && !product.detail.contains(button)) return;

      var beforeQuantity = readCartQuantity(doc);
      if (beforeQuantity === null) return;

      pendingAdd = {
        beforeQuantity: beforeQuantity,
        button: button,
        expiresAt: Date.now() + pendingWindowMs,
        product: product
      };

      if (typeof win.MutationObserver === "function") {
        observer = new win.MutationObserver(function () {
          checkPendingAdd();
        });
        observer.observe(doc.documentElement, {
          childList: true,
          characterData: true,
          attributes: true,
          attributeFilter: ["class"],
          subtree: true
        });
      }

      timer = win.setTimeout(clearPending, pendingWindowMs + 50);
    }

    function handleClick(event) {
      var target = event && event.target;
      if (!target || typeof target.closest !== "function") return;

      var addButton = target.closest(ADD_BUTTON_SELECTOR);
      if (addButton) {
        beginPendingAdd(addButton);
        return;
      }

      var checkoutButton = target.closest(CHECKOUT_SELECTOR);
      if (
        !checkoutVerified ||
        !checkoutButton ||
        isDisabled(checkoutButton) ||
        checkoutSent
      ) return;

      var cart = readCart(doc);
      if (!cart) return;

      checkoutSent = true;
      send("begin_checkout", {
        currency: cart.currency,
        value: cart.value,
        items: cart.items
      });
    }

    doc.addEventListener("click", handleClick, true);

    if (product) {
      send("view_item", {
        currency: product.currency,
        value: product.value,
        items: [product.item]
      });
    }

    var tracker = {
      checkPendingAdd: checkPendingAdd,
      destroy: function () {
        clearPending();
        doc.removeEventListener("click", handleClick, true);
        if (win[INSTANCE_KEY] === tracker) delete win[INSTANCE_KEY];
      }
    };

    win[INSTANCE_KEY] = tracker;
    return tracker;
  }

  return {
    init: init,
    parseMoney: parseMoney,
    readCart: readCart,
    readCartQuantity: readCartQuantity,
    readProduct: readProduct
  };
});
