import { FormEvent, ReactNode, useEffect, useState } from "react";
import {
  ArrowRight, Asterisk, Braces, Check, ChevronRight, CircleDot, Code2,
  Gauge, Globe2, Mail, Menu, MessageCircle, Orbit, Phone, Rocket, ShieldCheck,
  Sparkles, Wrench, Workflow, X, Zap
} from "lucide-react";
import { createBrowserRouter, Link, NavLink, Outlet, useLocation } from "react-router";

const BRAND = {
  name: "NOVA Digital Studio",
  short: "NOVA",
  tagline: "Engineering Digital Possibilities.",
  email: "nkosinathi.nova4@gmail.com",
  phone: "068 100 5684",
  tel: "+27681005684",
  whatsapp: "https://wa.me/27681005684",
  portfolio: "https://first-seed-bkbb.vercel.app/",
  location: "Johannesburg, Gauteng, South Africa",
  siteUrl: (import.meta.env.VITE_SITE_URL as string | undefined) || window.location.origin,
};

type Service = {
  slug: string; title: string; nav: string; summary: string; price: string;
  icon: typeof Globe2; problems: string[]; includes: string[]; process: string[];
  faqs: { q: string; a: string }[]; related: string[];
};

const services: Service[] = [
  {
    slug: "website-development", title: "Business website development", nav: "Websites",
    summary: "Fast, credible websites designed around your customers, your goals and the way your business actually works.",
    price: "From R3,500", icon: Globe2,
    problems: ["Your business has no professional online home", "Your current site feels dated or is difficult to use on mobile", "Visitors cannot quickly understand or contact your business"],
    includes: ["Responsive page design", "Clear conversion journeys", "Search-friendly structure", "Contact and enquiry options", "Launch support"],
    process: ["Discover your goals and audience", "Agree the pages, features and quote", "Design, build and test", "Launch with a clear handover"],
    faqs: [{q:"How long does a website take?",a:"A focused small-business website typically takes a few weeks. Timing depends on page count, content readiness and feedback."},{q:"Can I update it later?",a:"Yes. The right editing approach will be agreed during scoping based on your needs and budget."}],
    related: ["website-repairs", "api-development"]
  },
  {
    slug: "website-repairs", title: "Website repairs & improvements", nav: "Repairs",
    summary: "Practical diagnosis and repair for websites that are broken, slow, confusing or no longer doing their job.",
    price: "From R1,500", icon: Wrench,
    problems: ["Forms or links have stopped working", "The site breaks on phones", "Pages are slow, outdated or difficult to maintain"],
    includes: ["Technical assessment", "Prioritised repair plan", "Responsive layout fixes", "Performance and usability improvements", "Clear summary of completed work"],
    process: ["Share the issue and access details", "We investigate before confirming scope", "Approved repairs are implemented and tested", "You receive next-step recommendations"],
    faqs: [{q:"Can every website be repaired?",a:"Not always. We first assess the platform, access and condition, then explain whether repair or replacement offers better value."},{q:"Do you offer urgent help?",a:"Urgent work may be possible depending on availability and the issue. No resolution time is guaranteed before assessment."}],
    related: ["website-development", "automation"]
  },
  {
    slug: "api-development", title: "API & backend development", nav: "APIs",
    summary: "Secure, maintainable connections between your website, data and the tools your business depends on.",
    price: "Quoted to scope", icon: Braces,
    problems: ["Systems require the same data to be entered repeatedly", "A website needs secure business logic or data storage", "Existing tools do not communicate reliably"],
    includes: ["REST API design", "Spring Boot backend development", "Authentication flows", "Database integration", "Testing and technical documentation"],
    process: ["Map systems and data", "Define security and integration requirements", "Build and test in stages", "Deploy and document the solution"],
    faqs: [{q:"What systems can you integrate?",a:"Compatibility depends on whether each provider offers a suitable API and access. We confirm feasibility before quoting."},{q:"Can you work with an existing application?",a:"Yes, after reviewing the codebase, architecture and access required."}],
    related: ["automation", "website-development"]
  },
  {
    slug: "automation", title: "Business workflow automation", nav: "Automation",
    summary: "Remove repetitive admin by turning dependable business processes into clear, automated workflows.",
    price: "Quoted to scope", icon: Workflow,
    problems: ["Staff copy information between tools", "Customer follow-ups are manual and inconsistent", "Routine tasks take attention away from valuable work"],
    includes: ["Workflow mapping", "Automation opportunity review", "Tool and API integration", "Error handling", "Testing and handover"],
    process: ["Identify repetitive work", "Design a practical workflow", "Build with visible checkpoints", "Test exceptions and hand over"],
    faqs: [{q:"What can be automated?",a:"Common examples include enquiry routing, notifications and moving approved data between systems. We only recommend automation where it adds practical value."},{q:"Will automation replace our current tools?",a:"Not necessarily. It can often connect and improve the tools you already use."}],
    related: ["api-development", "website-repairs"]
  },
];

const seo: Record<string, [string, string]> = {
  "/": ["Website Developer Johannesburg | NOVA Digital Studio", "Professional website development, website repairs, API integrations and workflow automation for South African businesses."],
  "/services": ["Software Development Services Johannesburg | NOVA", "Explore business websites, repairs, backend development, API integration and automation services."],
  "/work": ["Development Portfolio | NOVA Digital Studio", "Explore the developer portfolio and discuss a practical digital solution for your business."],
  "/about": ["Independent Software Developer Johannesburg | NOVA", "Meet the independent Johannesburg software developer behind NOVA Digital Studio."],
  "/contact": ["Request a Website Quote | NOVA Digital Studio", "Request a clear website or software development quote in Johannesburg or anywhere in South Africa."],
  "/privacy": ["Privacy Policy | NOVA Digital Studio", "How NOVA Digital Studio handles enquiry information and privacy considerations."],
};

function Meta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const service = services.find((s) => pathname.endsWith(s.slug));
    const [title, description] = service
      ? [`${service.title} Johannesburg | NOVA`, `${service.summary} Request a clear, tailored quotation from NOVA Digital Studio.`]
      : seo[pathname] || ["Page not found | NOVA Digital Studio", "The requested page could not be found."];
    document.title = title;
    const setMeta = (name: string, content: string, property = false) => {
      const key = property ? "property" : "name";
      let node = document.head.querySelector(`meta[${key}="${name}"]`);
      if (!node) { node = document.createElement("meta"); node.setAttribute(key, name); document.head.append(node); }
      node.setAttribute("content", content);
    };
    setMeta("description", description);
    setMeta("og:title", title, true); setMeta("og:description", description, true);
    setMeta("og:type", "website", true); setMeta("og:url", `${BRAND.siteUrl}${pathname}`, true);
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.append(canonical); }
    canonical.href = `${BRAND.siteUrl}${pathname}`;
    let structured = document.head.querySelector("#nova-structured-data") as HTMLScriptElement | null;
    if (!structured) {
      structured = document.createElement("script");
      structured.id = "nova-structured-data";
      structured.type = "application/ld+json";
      document.head.append(structured);
    }
    structured.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: BRAND.name,
      description: "Independent software development studio providing websites, repairs, integrations and workflow automation.",
      url: BRAND.siteUrl,
      telephone: BRAND.tel,
      email: BRAND.email,
      areaServed: "South Africa",
      address: { "@type": "PostalAddress", addressLocality: "Johannesburg", addressRegion: "Gauteng", addressCountry: "ZA" },
      sameAs: [BRAND.portfolio],
    });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function Brand() {
  return <Link to="/" className="brand" aria-label={`${BRAND.name} home`}><span className="brand-mark"><Orbit size={22}/></span><span><b>{BRAND.short}</b><small>Digital Studio</small></span></Link>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  return <header className="site-header"><div className="nav-wrap"><Brand/>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? <X/> : <Menu/>}</button>
    <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
      {[["Services","/services"],["Work","/work"],["About","/about"],["Contact","/contact"]].map(([label,to])=><NavLink key={to} to={to}>{label}</NavLink>)}
      <Link className="button small" to="/contact">Get a quote <ArrowRight size={16}/></Link>
    </nav>
  </div></header>;
}

function Footer() {
  return <footer><div className="footer-grid"><div><Brand/><p>{BRAND.tagline}</p><p className="muted">Independent software development for practical business growth.</p></div>
    <div><h3>Navigate</h3><Link to="/services">Services</Link><Link to="/work">Work</Link><Link to="/about">About</Link><Link to="/privacy">Privacy</Link></div>
    <div><h3>Services</h3>{services.map(s=><Link key={s.slug} to={`/services/${s.slug}`}>{s.nav}</Link>)}</div>
    <div><h3>Contact</h3><a href={BRAND.whatsapp}>WhatsApp {BRAND.phone}</a><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a><span>{BRAND.location}</span></div>
  </div><div className="footer-bottom"><span>© {new Date().getFullYear()} {BRAND.name}</span><span>Built with purpose in Johannesburg</span></div></footer>;
}

function Layout() {
  return <><Meta/><a className="skip" href="#main">Skip to content</a><Header/><main id="main"><Outlet/></main><a className="whatsapp" href={BRAND.whatsapp} aria-label="Chat on WhatsApp"><MessageCircle/></a><Footer/></>;
}

function ButtonLink({to, children, secondary=false}:{to:string;children:ReactNode;secondary?:boolean}) {
  const cls = secondary ? "button secondary" : "button";
  return to.startsWith("http") ? <a className={cls} href={to} target="_blank" rel="noreferrer">{children}</a> : <Link className={cls} to={to}>{children}</Link>;
}

function SectionHead({eyebrow,title,text}:{eyebrow:string;title:string;text?:string}) {
  return <div className="section-head"><span className="eyebrow"><Asterisk size={14}/>{eyebrow}</span><h2>{title}</h2>{text&&<p>{text}</p>}</div>;
}

function Universe() {
  return <div className="universe" aria-label="Abstract celestial sphere with orbital service markers" role="img">
    <div className="instrument"><span>JHB</span><span>26.2041° S</span><span>28.0473° E</span></div>
    <div className="orbit o1"/><div className="orbit o2"/><div className="orbit o3"/>
    <div className="sphere"><div className="sphere-glow"/></div>
    <span className="marker m1"><CircleDot/> Websites</span><span className="marker m2"><CircleDot/> Integrations</span><span className="marker m3"><CircleDot/> Automation</span>
  </div>;
}

function Hero() {
  return <section className="hero"><div className="hero-copy"><span className="eyebrow"><Sparkles size={14}/> Johannesburg · South Africa</span>
    <h1>Your business deserves its own <em>universe.</em></h1>
    <h2>Professional Website Development, Website Repairs & Software Solutions in Johannesburg.</h2>
    <p>We build modern websites, solve technical challenges and engineer digital solutions that help South African businesses grow.</p>
    <div className="hero-actions"><ButtonLink to="/contact">Get a free quote <ArrowRight size={18}/></ButtonLink><ButtonLink to="/services" secondary>Explore services</ButtonLink></div>
    <div className="prices"><span><b>Website fixes</b> From R1,500</span><span><b>Business websites</b> From R3,500</span></div>
  </div><Universe/></section>;
}

const values = [
  [Code2,"Professional development","Thoughtful engineering, not a generic template."],
  [Gauge,"Mobile-friendly","Clear, responsive experiences on every screen."],
  [ShieldCheck,"Clear quotations","Defined scope and transparent next steps."],
  [Globe2,"Nationwide service","Johannesburg-based and remote across South Africa."],
] as const;

function ServiceCards({limit}:{limit?:number}) {
  const extras = [{slug:"contact",title:"Online forms & enquiry systems",summary:"Make it easier for customers to reach you and route enquiries clearly.",price:"Quoted to scope",icon:Mail}];
  return <div className="card-grid">{[...services.slice(0,limit||services.length), ...(limit?extras:[])].map((s,i)=><article className="service-card" key={s.slug}>
    <div className="card-number">0{i+1}</div><s.icon/><h3>{s.title}</h3><p>{s.summary}</p><span className="price-tag">{s.price}</span>
    <Link to={s.slug==="contact"?"/contact":`/services/${s.slug}`}>Explore service <ArrowRight size={16}/></Link>
  </article>)}</div>;
}

const homeFaqs = [
  ["How much does a business website cost?","Business websites start from R3,500. Your quote depends on the pages, content, integrations and functionality required."],
  ["How long does development take?","A focused website often takes a few weeks, while custom software takes longer. You receive a realistic timeline after scoping."],
  ["Can you fix an existing website?","Yes. We first assess its platform, access and condition before recommending repair or replacement."],
  ["Do you provide hosting?","Hosting can be recommended and configured as part of the project. Ongoing provider costs are explained separately."],
  ["Can you work remotely?","Yes. NOVA works with businesses across South Africa using structured remote communication."],
  ["Do you build custom software?","Yes. Services include APIs, backend systems, integrations and practical workflow automation."],
  ["What happens after launch?","We complete a handover and discuss suitable support options. Any ongoing work is clearly scoped."],
];

function FAQ({items=homeFaqs}:{items?:{q:string;a:string}[]|string[][]}) {
  return <div className="faq">{items.map((item,i)=><details key={i}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</div>;
}

function CTA() {
  return <section className="cta"><div><span className="eyebrow">Start a conversation</span><h2>Ready to launch your next digital chapter?</h2><p>Tell us what is not working—or what you are ready to build.</p></div><ButtonLink to="/contact">Request a free quote <ArrowRight size={18}/></ButtonLink></section>;
}

function Home() {
  return <><Hero/>
    <section className="trust-strip">{values.map(([Icon,t,d])=><div key={t}><Icon/><span><b>{t}</b><small>{d}</small></span></div>)}</section>
    <section><SectionHead eyebrow="Capabilities" title="Practical engineering for ambitious businesses." text="From a first professional website to the systems behind it, each solution starts with the business problem."/><ServiceCards limit={4}/></section>
    <section className="pricing-section"><SectionHead eyebrow="Indicative pricing" title="A clear place to start."/><div className="pricing-grid">
      <article><span>01</span><h3>Website fixes</h3><strong>From R1,500</strong><p>For focused repairs, responsive improvements and technical troubleshooting.</p><Link to="/services/website-repairs">View repair services <ChevronRight/></Link></article>
      <article className="featured"><span>02 · Most requested</span><h3>Business websites</h3><strong>From R3,500</strong><p>For a credible, responsive digital home designed around clear business goals.</p><Link to="/services/website-development">View website development <ChevronRight/></Link></article>
      <article><span>03</span><h3>Custom solutions</h3><strong>Tailored quote</strong><p>For integrations, backend systems and workflow automation with unique requirements.</p><Link to="/contact">Discuss your project <ChevronRight/></Link></article>
    </div></section>
    <section><SectionHead eyebrow="Why NOVA" title="Built with clarity, care and commercial purpose."/><div className="why-grid">{["Business-focused solutions","Modern technologies","Transparent project scope","Responsive by design","Clear communication"].map((x,i)=><div key={x}><span>0{i+1}</span><Check/><h3>{x}</h3></div>)}</div></section>
    <section className="work-feature"><div><SectionHead eyebrow="Featured work" title="Explore the developer portfolio." text="A separate portfolio presents current development work. No invented case studies—just a direct view of the craft."/ ><ButtonLink to={BRAND.portfolio}>Open portfolio <ArrowRight size={18}/></ButtonLink></div><div className="project-window"><div className="window-bar"><i/><i/><i/></div><div className="window-space"><Orbit/><span>DEVELOPER PORTFOLIO</span><b>Selected builds & experiments</b></div></div></section>
    <section><SectionHead eyebrow="Our process" title="A clear route from idea to launch."/><div className="process">{["Discover","Scope & Quote","Build & Test","Launch & Support"].map((x,i)=><div key={x}><span>{i+1}</span><div><small>Phase 0{i+1}</small><h3>{x}</h3></div></div>)}</div></section>
    <section><SectionHead eyebrow="Common questions" title="Clarity before lift-off."/><FAQ/></section><CTA/>
  </>;
}

function PageHero({eyebrow,title,text}:{eyebrow:string;title:string;text:string}) {
  return <section className="page-hero"><span className="eyebrow"><Orbit size={14}/>{eyebrow}</span><h1>{title}</h1><p>{text}</p><div className="trajectory"/></section>;
}

function Services() {
  return <><PageHero eyebrow="Services" title="Digital systems engineered around your business." text="Choose a focused service or combine capabilities into one clearly scoped project."/><section><ServiceCards/><div className="form-callout"><Mail/><div><h3>Online forms & enquiry systems</h3><p>Customer forms, lead routing and reliable enquiry experiences can be delivered as part of a website or integration project.</p></div><Link to="/contact">Discuss your form <ArrowRight/></Link></div></section><CTA/></>;
}

function ServicePage({service}:{service:Service}) {
  const Icon=service.icon;
  return <><PageHero eyebrow={`Service · ${service.price}`} title={service.title} text={service.summary}/>
    <section className="service-detail"><aside><Icon/><h3>In plain language</h3><p>We begin with what your business needs—not technology for its own sake.</p><ButtonLink to="/contact">Request a quote</ButtonLink></aside>
      <div><h2>Typical problems we solve</h2><ul>{service.problems.map(x=><li key={x}><Check/>{x}</li>)}</ul><h2>What is included</h2><div className="include-grid">{service.includes.map(x=><span key={x}><CircleDot/>{x}</span>)}</div></div>
    </section>
    <section><SectionHead eyebrow="Process" title="How the work moves forward."/><div className="process compact">{service.process.map((x,i)=><div key={x}><span>{i+1}</span><h3>{x}</h3></div>)}</div></section>
    <section className="two-col"><div><SectionHead eyebrow="Pricing guidance" title={service.price}/><p>Final pricing is confirmed after requirements are understood. You receive a clear scope, assumptions and quotation before approved work begins.</p></div><div><h2>Service FAQs</h2><FAQ items={service.faqs}/></div></section>
    <section><SectionHead eyebrow="Continue exploring" title="Related services"/><div className="related">{service.related.map(slug=>{const s=services.find(x=>x.slug===slug)!;return <Link key={slug} to={`/services/${slug}`}><s.icon/><span>{s.title}<small>{s.price}</small></span><ArrowRight/></Link>})}</div></section><CTA/>
  </>;
}

function Work() {
  return <><PageHero eyebrow="Selected work" title="Craft, code and continuous exploration." text="View the existing developer portfolio, then start a conversation about what your business needs next."/><section className="work-page"><div className="project-window large"><div className="window-bar"><i/><i/><i/></div><div className="window-space"><Code2/><span>EXTERNAL PORTFOLIO</span><b>Developer work & technical projects</b><p>Opens in a new tab</p></div></div><div><span className="eyebrow">Portfolio</span><h2>See the work directly.</h2><p>Rather than presenting fictional client engagements, NOVA links to the founder’s current developer portfolio. Future verified case studies can be added here as the studio grows.</p><ButtonLink to={BRAND.portfolio}>Visit developer portfolio <ArrowRight/></ButtonLink></div></section><CTA/></>;
}

function About() {
  const skills=["Java","Spring Boot","React","Angular","JavaScript & TypeScript","REST APIs","JWT authentication","PostgreSQL","Software testing","Backend integrations","Workflow automation","Deployment & troubleshooting"];
  return <><PageHero eyebrow="About the studio" title="Independent engineering. Practical outcomes." text="NOVA is led by an independent software developer in Johannesburg, helping businesses move from technical uncertainty to a clear, reliable solution."/>
    <section className="about-grid"><div><span className="eyebrow">Curiosity into capability</span><h2>Exploration, with a destination.</h2><p>Astrophysics turns distant, complex systems into something we can understand through observation and precision. NOVA brings the same mindset to software: study the real problem, map the forces at work and engineer a dependable path forward.</p><p>The approach is grounded in thoughtful engineering, reliability, honest communication and solutions that make practical business sense.</p></div><div className="principles"><div><Orbit/><h3>Precision</h3><p>Clear requirements and deliberate implementation.</p></div><div><ShieldCheck/><h3>Reliability</h3><p>Testing and maintainability considered from the start.</p></div><div><Rocket/><h3>Momentum</h3><p>Practical progress without needless complexity.</p></div></div></section>
    <section><SectionHead eyebrow="Technical toolkit" title="Technologies selected to solve real problems."/><div className="skill-cloud">{skills.map(x=><span key={x}>{x}</span>)}</div></section><CTA/></>;
}

type FormState={name:string;email:string;phone:string;business:string;service:string;description:string;timeframe:string;consent:boolean;company:string};
const initial:FormState={name:"",email:"",phone:"",business:"",service:"",description:"",timeframe:"",consent:false,company:""};
function ContactForm() {
  const [data,setData]=useState(initial); const [errors,setErrors]=useState<Record<string,string>>({});
  const update=(key:keyof FormState,value:string|boolean)=>setData({...data,[key]:value});
  function submit(e:FormEvent){e.preventDefault(); if(data.company)return; const next:Record<string,string>={};
    if(!data.name.trim())next.name="Please enter your full name.";
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))next.email="Enter a valid email address.";
    if(!data.service)next.service="Please select a service.";
    if(data.description.trim().length<20)next.description="Please add at least 20 characters about your project.";
    if(!data.timeframe)next.timeframe="Please select a timeframe.";
    if(!data.consent)next.consent="Please confirm that we may use these details to respond.";
    setErrors(next); if(Object.keys(next).length)return;
    const body=`Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone||"Not provided"}\nBusiness: ${data.business||"Not provided"}\nService: ${data.service}\nTimeframe: ${data.timeframe}\n\nProject:\n${data.description}`;
    window.location.href=`mailto:${BRAND.email}?subject=${encodeURIComponent(`Project enquiry: ${data.service}`)}&body=${encodeURIComponent(body)}`;
  }
  const field=(key:keyof FormState,label:string,type="text",optional=false)=><label>{label}{optional&&<small>Optional</small>}<input type={type} value={String(data[key])} onChange={e=>update(key,e.target.value)} aria-invalid={!!errors[key]}/>{errors[key]&&<span className="error">{errors[key]}</span>}</label>;
  return <form onSubmit={submit} noValidate><div className="honeypot" aria-hidden="true"><label>Company website<input tabIndex={-1} autoComplete="off" value={data.company} onChange={e=>update("company",e.target.value)}/></label></div>
    <div className="form-grid">{field("name","Full name")} {field("email","Email","email")} {field("phone","Phone number","tel",true)} {field("business","Business name","text",true)}
      <label>Service required<select value={data.service} onChange={e=>update("service",e.target.value)} aria-invalid={!!errors.service}><option value="">Select a service</option>{services.map(s=><option key={s.slug}>{s.title}</option>)}<option>Other / not sure</option></select>{errors.service&&<span className="error">{errors.service}</span>}</label>
      <label>Preferred timeframe<select value={data.timeframe} onChange={e=>update("timeframe",e.target.value)} aria-invalid={!!errors.timeframe}><option value="">Select a timeframe</option><option>As soon as practical</option><option>Within 1 month</option><option>Within 2–3 months</option><option>Exploring options</option></select>{errors.timeframe&&<span className="error">{errors.timeframe}</span>}</label>
    </div><label>Project description<textarea rows={6} value={data.description} onChange={e=>update("description",e.target.value)} placeholder="What would you like to build or improve?" aria-invalid={!!errors.description}/>{errors.description&&<span className="error">{errors.description}</span>}</label>
    <label className="check"><input type="checkbox" checked={data.consent} onChange={e=>update("consent",e.target.checked)}/><span>I consent to NOVA using these details to respond to my enquiry. <Link to="/privacy">Privacy policy</Link>{errors.consent&&<b className="error">{errors.consent}</b>}</span></label>
    <button className="button" type="submit">Prepare email enquiry <Mail size={18}/></button><p className="form-note">This form opens your email application with the details prepared. Review and send the email to complete your enquiry. No information is submitted automatically.</p>
  </form>;
}

function Contact() {
  return <><PageHero eyebrow="Contact & quotations" title="Tell us where you want to go." text="Share the challenge, goal or idea. You will receive a considered response and clear next step—not a generic sales pitch."/>
    <section className="contact-layout"><div className="contact-panel"><span className="eyebrow">Direct channels</span><h2>Prefer a conversation?</h2><p>Use the channel that is easiest for you.</p>
      <a href={BRAND.whatsapp}><MessageCircle/><span><small>WhatsApp</small>{BRAND.phone}</span><ArrowRight/></a>
      <a href={`mailto:${BRAND.email}`}><Mail/><span><small>Email</small>{BRAND.email}</span><ArrowRight/></a>
      <a href={`tel:${BRAND.tel}`}><Phone/><span><small>Telephone</small>{BRAND.phone}</span><ArrowRight/></a>
      <div className="availability"><CircleDot/> Johannesburg-based · Remote across South Africa</div></div>
      <div className="form-panel"><h2>Request a free quote</h2><p>Required fields help us understand enough to respond usefully.</p><ContactForm/></div></section>
  </>;
}

function Privacy() {
  return <><PageHero eyebrow="Legal" title="Privacy policy." text="An editable overview of how enquiry information is intended to be handled."/><section className="legal"><div className="notice"><ShieldCheck/><p><b>Publication note:</b> This policy is a practical starting point and requires legal review before publication. It does not claim independently verified POPIA compliance.</p></div>
    <h2>Information collected</h2><p>When you contact NOVA Digital Studio, you may provide your name, contact details, business name and information about a potential project. Only information needed to understand and respond to an enquiry should be requested.</p>
    <h2>How enquiries are handled</h2><p>Enquiry information is used to communicate with you, assess project fit, prepare quotations and keep relevant business records. It should not be sold or used for unrelated marketing without appropriate permission.</p>
    <h2>Retention and protection</h2><p>Information should be retained only while reasonably needed for enquiry, contractual, legal or record-keeping purposes. Reasonable steps should be taken to protect information, but no internet transmission or storage system can be guaranteed completely secure.</p>
    <h2>South African privacy considerations</h2><p>NOVA intends to handle personal information with regard to South Africa’s Protection of Personal Information Act (POPIA). The final policy and business processes should be reviewed by a qualified legal professional.</p>
    <h2>Your questions</h2><p>To ask about your information or request a correction or deletion where applicable, email <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.</p>
  </section></>;
}

function NotFound(){return <section className="not-found"><div className="error-orbit"><span>404</span></div><span className="eyebrow">Coordinates not found</span><h1>This page drifted beyond our map.</h1><p>The route may have changed. Return to the studio or explore the services available.</p><div><ButtonLink to="/">Return home</ButtonLink><ButtonLink to="/services" secondary>Explore services</ButtonLink></div></section>}

export const router=createBrowserRouter([{path:"/",Component:Layout,children:[
  {index:true,Component:Home},{path:"services",Component:Services},
  ...services.map(service=>({path:`services/${service.slug}`,element:<ServicePage service={service}/>})),
  {path:"work",Component:Work},{path:"about",Component:About},{path:"contact",Component:Contact},{path:"privacy",Component:Privacy},{path:"*",Component:NotFound}
]}]);
