import { cloneElement, FormEvent, useEffect, useState } from "react";

import {

  ArrowRight, Asterisk, Braces, Check, ChevronDown, CircleDot, Code2,

  ExternalLink, Gauge, Globe2, Mail, Menu, MessageCircle, Orbit, Phone,

  Rocket, ShieldCheck, Sparkles, Wrench, Workflow, X, Zap,

} from "lucide-react";

import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from "react-router-dom";



const brand = {

  name: "NOVA", fullName: "NOVA Digital Studio", tagline: "Engineering Digital Possibilities.",

  email: "nkosinathi.nova4\@gmail.com", phone: "068 100 5684", phoneHref: "tel:+27681005684",

  whatsapp: "https://wa.me/27681005684", portfolio: "https://first-seed-bkbb.vercel.app/",

  location: "Johannesburg, Gauteng, South Africa", siteUrl: import.meta.env.VITE_SITE_URL || "",

};



type Service = {

  slug: string; title: string; short: string; icon: typeof Globe2; price: string;

  intro: string; problems: string[]; includes: string[]; steps: string[]; faqs: [string, string][];

};



const services: Service[] = [

  {

    slug: "website-development", title: "Business website development", icon: Globe2, price: "From R3,500",

    short: "Clear, responsive websites designed to turn interest into enquiries.",

    intro: "A professional web presence built around your customers, your offer and the actions that grow your business.",

    problems: ["No credible online presence", "An outdated or difficult mobile experience", "Visitors do not know what to do next"],

    includes: ["Responsive page design", "Content structure and conversion journeys", "Contact and enquiry options", "Foundational SEO and accessibility", "Deployment guidance"],

    steps: ["Understand the business and audience", "Agree pages, scope and quotation", "Design, build and test", "Launch with practical handover"],

    faqs: [["What does a website cost?", "Focused business websites start from R3,500. Your written quotation will reflect the required pages, content and functionality."], ["Will it work on phones?", "Yes. Every website is designed and tested for modern mobile, tablet and desktop screens."], ["Can you help with content?", "Yes. We can structure and refine your key messages; extensive copywriting can be included in the scope."]],

  },

  {

    slug: "website-repairs", title: "Website repairs & improvements", icon: Wrench, price: "From R1,500",

    short: "Practical diagnosis and repair for websites that are slow, broken or underperforming.",

    intro: "Get a clear technical assessment and focused improvements without rebuilding what still works.",

    problems: ["Broken layouts, links or forms", "Poor mobile usability", "Slow pages or confusing customer journeys"],

    includes: ["Initial technical assessment", "Prioritised repair plan", "Responsive and visual fixes", "Form and interaction troubleshooting", "Testing across key screen sizes"],

    steps: ["Review the issue and existing setup", "Confirm what is feasible", "Quote the agreed repairs", "Fix, test and explain the outcome"],

    faqs: [["Can every website be repaired?", "Not always. We first assess the platform, access and condition, then recommend a repair or rebuild based on evidence."], ["How quickly can you help?", "Timing depends on access, urgency and complexity. You will receive a realistic timeframe before work begins."], ["Do you need my passwords?", "Access requirements vary. Credentials should be shared through an agreed secure method, never through a public form."]],

  },

  {

    slug: "api-development", title: "API & backend development", icon: Braces, price: "Custom quotation",

    short: "Reliable connections and backend services that help your software work together.",

    intro: "Purpose-built APIs, integrations and backend logic for businesses that need more than a brochure website.",

    problems: ["Systems that do not share information", "Manual data duplication", "A frontend that needs secure business logic"],

    includes: ["REST API design", "Spring Boot backend development", "Database integration", "JWT authentication where appropriate", "Testing and technical documentation"],

    steps: ["Map systems and data flows", "Define security and success criteria", "Build in testable stages", "Integrate, document and support launch"],

    faqs: [["Can you connect to any platform?", "Many modern platforms provide usable APIs, but feasibility depends on their documentation, access rules and limits."], ["How is API work priced?", "After a short discovery, you receive a scoped quotation based on endpoints, systems, security and testing needs."], ["Can you work with an existing team?", "Yes. The studio can provide focused development support to companies and agencies."]],

  },

  {

    slug: "automation", title: "Business workflow automation", icon: Workflow, price: "Custom quotation",

    short: "Reduce repetitive admin with thoughtfully connected digital workflows.",

    intro: "Turn repeatable manual steps into dependable workflows while keeping people in control of important decisions.",

    problems: ["Repeated copying between tools", "Slow enquiry follow-up", "Routine tasks that consume valuable time"],

    includes: ["Workflow mapping", "Automation opportunity assessment", "System and API integration", "Error handling and human checkpoints", "Testing and handover"],

    steps: ["Observe the current workflow", "Identify safe automation points", "Prototype and validate", "Launch with monitoring guidance"],

    faqs: [["What can be automated?", "Common opportunities include enquiry routing, notifications, data movement and document workflows. Suitability is assessed first."], ["Will automation replace my existing tools?", "Usually not. The goal is often to connect and improve the tools you already use."], ["Is automation reliable?", "Good automation includes validation, error handling and clear ownership. We design those safeguards into the scope."]],

  },

];



const nav = [["Services", "/services"], ["Work", "/work"], ["About", "/about"], ["Contact", "/contact"]];



function ButtonLink({ to, children, secondary = false, external = false }: { to: string; children: React.ReactNode; secondary?: boolean; external?: boolean }) {

  const cls = `button ${secondary ? "button-secondary" : "button-primary"}`;

  return external ? <a className={cls} href={to} target="_blank" rel="noreferrer">{children}</a> : <Link className={cls} to={to}>{children}</Link>;

}



function Header() {

  const [open, setOpen] = useState(false);

  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return <header className="site-header">

    <div className="nav-wrap">

      <Link className="brand" to="/" aria-label="NOVA Digital Studio home"><span className="brand-mark"><Orbit size={22}/></span><span><b>{brand.name}</b><small>Digital Studio</small></span></Link>

      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>

      <nav className={open ? "nav-links open" : "nav-links"} aria-label="Main navigation">

        {nav.map(([label, to]) => <NavLink key={to} to={to} className={({isActive}) => isActive ? "active" : ""}>{label}</NavLink>)}

        <Link className="button button-primary nav-cta" to="/contact">Get a quote <ArrowRight size={16}/></Link>

      </nav>

    </div>

  </header>;

}



function Meta({ title, description }: { title: string; description: string }) {

  const { pathname } = useLocation();

  useEffect(() => {

    document.title = `${title} | ${brand.fullName}`;

    const set = (selector: string, attr: string, value: string) => {

      let el = document.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;

      if (!el) { el = document.createElement(selector.startsWith("link") ? "link" : "meta"); document.head.appendChild(el); }

      if (selector.includes("description")) el.setAttribute("name", "description");

      if (selector.includes("canonical")) el.setAttribute("rel", "canonical");

      if (selector.includes("og:title")) el.setAttribute("property", "og:title");

      if (selector.includes("og:description")) el.setAttribute("property", "og:description");

      el.setAttribute(attr, value);

    };

    set('meta[name="description"]', "content", description);

    set('meta[property="og:title"]', "content", `${title} | ${brand.fullName}`);

    set('meta[property="og:description"]', "content", description);

    if (brand.siteUrl) set('link[rel="canonical"]', "href", `${brand.siteUrl}${pathname}`);

    let schema = document.querySelector("#nova-schema") as HTMLScriptElement | null;

    if (!schema) {

      schema = document.createElement("script");

      schema.id = "nova-schema";

      schema.type = "application/ld+json";

      document.head.appendChild(schema);

    }

    schema.textContent = JSON.stringify({

      "@context": "https://schema.org",

      "@type": "ProfessionalService",

      name: brand.fullName,

      description,

      telephone: "+27681005684",

      email: brand.email,

      areaServed: { "@type": "Country", name: "South Africa" },

      address: { "@type": "PostalAddress", addressLocality: "Johannesburg", addressRegion: "Gauteng", addressCountry: "ZA" },

      ...(brand.siteUrl ? { url: `${brand.siteUrl}${pathname}` } : {}),

    });

    window.scrollTo(0, 0);

  }, [title, description, pathname]);

  return null;

}



function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="eyebrow"><Asterisk size={13}/>{children}</p>; }

function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {

  return <div className="section-head"><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{text && <p>{text}</p>}</div>;

}



function CosmicVisual() {

  return <div className="cosmic-visual" aria-label="Abstract celestial sphere with orbital paths representing digital services" role="img">

    <div className="instrument-ring"/><div className="orbit orbit-a"><span/></div><div className="orbit orbit-b"><span/></div><div className="orbit orbit-c"><span/></div>

    <div className="sphere"><div className="sphere-glow"/><div className="sphere-line"/></div>

    <div className="axis-label axis-1">WEB / 01</div><div className="axis-label axis-2">API / 02</div><div className="axis-label axis-3">AUTO / 03</div>

  </div>;

}



function Hero() {

  return <section className="hero">

    <div className="starfield"/>

    <div className="container hero-grid">

      <div className="hero-copy">

        <Eyebrow>Johannesburg · South Africa · Remote nationwide</Eyebrow>

        <h1>Your business deserves <em>its own universe.</em></h1>

        <h2>Professional Website Development, Website Repairs & Software Solutions in Johannesburg.</h2>

        <p>We build modern websites, solve technical challenges and engineer digital solutions that help South African businesses grow.</p>

        <div className="button-row"><ButtonLink to="/contact">Get a free quote <ArrowRight size={17}/></ButtonLink><ButtonLink to="/services" secondary>Explore services</ButtonLink></div>

        <div className="hero-prices"><div><small>Website fixes</small><strong>From R1,500</strong></div><div><small>Business websites</small><strong>From R3,500</strong></div></div>

      </div>

      <CosmicVisual/>

    </div>

    <div className="scroll-note">SCROLL TO EXPLORE <span/></div>

  </section>;

}



function ServiceCard({ service }: { service: Service }) {

  const Icon = service.icon;

  return <article className="service-card">

    <div className="card-top"><span className="icon-box"><Icon/></span><small>0{services.indexOf(service) + 1}</small></div>

    <h3>{service.title}</h3><p>{service.short}</p><strong>{service.price}</strong>

    <Link to={`/services/${service.slug}`} className="text-link">Explore service <ArrowRight size={16}/></Link>

  </article>;

}



function TrustStrip() {

  const items = [[Code2, "Professional development"], [Gauge, "Mobile-friendly design"], [ShieldCheck, "Clear quotations"], [Globe2, "Remote service nationwide"]];

  return <div className="trust-strip">{items.map(([Icon, label]) => <div key={label as string}>{<Icon size={19}/>}<span>{label as string}</span></div>)}</div>;

}



function ServicesGrid({ limit }: { limit?: number }) { return <div className="service-grid">{services.slice(0, limit).map(s => <ServiceCard key={s.slug} service={s}/>)}

  {!limit && <article className="service-card"><div className="card-top"><span className="icon-box"><Mail/></span><small>05</small></div><h3>Forms & enquiry systems</h3><p>Purposeful customer journeys that capture the right information and make follow-up easier.</p><strong>Quoted to scope</strong><Link to="/contact" className="text-link">Discuss your needs <ArrowRight size={16}/></Link></article>}</div>;

}



function Home() {

  const values = ["Business-focused solutions", "Modern, maintainable technologies", "Transparent project scope", "Responsive by design", "Clear communication"];

  const faqs = [

    ["How much does a business website cost?", "Focused business websites start from R3,500. Features, page count and content requirements determine the final written quotation."],

    ["How long does development take?", "Timing depends on scope, content readiness and feedback. A realistic delivery plan is agreed before the build starts."],

    ["Can you fix an existing website?", "Yes, where the platform and access allow. We assess the problem first and recommend repair or replacement honestly."],

    ["Do you provide hosting?", "Hosting guidance and deployment support can be included. Any recurring third-party costs are made clear."],

    ["Can you work remotely?", "Yes. NOVA is Johannesburg-based and works remotely with clients across South Africa."],

    ["Do you build custom software?", "Yes. Services include backend development, APIs, integrations and workflow automation."],

    ["What happens after launch?", "Handover, support options and future improvements are discussed as part of the project scope."],

  ];

  return <><Meta title="Website Development Johannesburg" description="Johannesburg software development studio building business websites, repairing websites, integrating APIs and automating workflows across South Africa."/>

    <Hero/>

    <main>

      <section className="container trust-wrap"><TrustStrip/></section>

      <section className="section container"><SectionHead eyebrow="Core capabilities" title="Engineered for real business momentum." text="From your first professional website to the systems behind it, each solution starts with the problem worth solving."/><ServicesGrid/>

      </section>

      <section className="section pricing-section"><div className="container"><SectionHead eyebrow="Indicative investment" title="A clear starting point." text="Straightforward guidance before a tailored scope and written quotation."/>

        <div className="pricing-grid"><div><span>01</span><h3>Website fixes</h3><strong>From R1,500</strong><p>Focused diagnosis and agreed repairs.</p></div><div className="featured"><span>02</span><small>Popular starting point</small><h3>Business websites</h3><strong>From R3,500</strong><p>Professional, responsive web presence.</p></div><div><span>03</span><h3>Custom solutions</h3><strong>Quoted individually</strong><p>APIs, integrations and automation.</p></div></div>

      </div></section>

      <section className="section container split"><div><SectionHead eyebrow="Why NOVA" title="Small studio focus. Engineering-grade thinking."/><p className="lead">Work directly with an independent developer who connects business goals with practical technical decisions.</p><ButtonLink to="/about" secondary>Meet the developer <ArrowRight size={16}/></ButtonLink></div>

        <div className="value-list">{values.map((v,i)=><div key={v}><span>0{i+1}</span><p>{v}</p><Check size={18}/></div>)}</div></section>

      <section className="section work-feature"><div className="container split"><div><SectionHead eyebrow="Featured work" title="See the craft behind the code."/><p className="lead">Explore the developer portfolio for selected technical work and product experiments. New client case studies will be added with permission.</p><ButtonLink to={brand.portfolio} external>View developer portfolio <ExternalLink size={16}/></ButtonLink></div>

        <div className="project-preview"><div className="project-orbit"><Code2/></div><small>CAPABILITY SHOWCASE</small><h3>Web experiences & software engineering</h3><p>React · Java · Spring Boot · APIs</p></div></div></section>

      <Process/>

      <section className="section container"><SectionHead eyebrow="Common questions" title="Clear answers before we begin."/><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<ChevronDown/></summary><p>{a}</p></details>)}</div></section>

      <CTA/>

    </main>

  </>;

}



function Process() {

  const steps = [["01","Discover","Understand the business, audience and challenge."],["02","Scope & quote","Define deliverables, boundaries, timing and cost."],["03","Build & test","Engineer in focused stages and test the experience."],["04","Launch & support","Deploy carefully, hand over clearly and plan what is next."]];

  return <section className="section process-section"><div className="container"><SectionHead eyebrow="Mission path" title="A practical route from idea to launch."/><div className="process-line">{steps.map(([n,t,d])=><div className="process-step" key={n}><span>{n}</span><CircleDot/><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>;

}



function CTA() { return <section className="container cta"><div><Eyebrow>Start a conversation</Eyebrow><h2>Ready to launch your next digital chapter?</h2><p>Tell us what you are building, fixing or improving. You will receive a clear, no-pressure response.</p></div><div className="button-row"><ButtonLink to="/contact">Get a free quote <ArrowRight size={17}/></ButtonLink><a className="button button-secondary" href={brand.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp</a></div></section>; }



function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {

  const { pathname } = useLocation();

  const serviceRoute = pathname.startsWith("/services/");

  return <section className="page-hero"><div className="container">

    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span>{serviceRoute && <><Link to="/services">Services</Link><span>/</span></>}<span aria-current="page">{title}</span></nav>

    <Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p>

  </div></section>;

}



function Services() { return <><Meta title="Software Development Services" description="Explore website development, website repairs, API development and workflow automation services from a Johannesburg developer."/><main><PageHero eyebrow="Services" title="Digital engineering, without the unnecessary complexity." text="Practical websites and software solutions scoped around your business, budget and next best move."/><section className="section container"><ServicesGrid/><div className="notice"><Sparkles/><div><h3>Not sure what you need?</h3><p>Describe the business problem in plain language. We will help identify a sensible starting point.</p></div><ButtonLink to="/contact">Discuss your project</ButtonLink></div></section><CTA/></main></>; }



function ServiceDetail({ service }: { service: Service }) {

  const related = services.filter(s => s.slug !== service.slug).slice(0,2);

  return <><Meta title={service.title} description={`${service.short} Professional ${service.title.toLowerCase()} services in Johannesburg and remotely across South Africa.`}/><main>

    <PageHero eyebrow={`Services / ${service.title}`} title={service.title} text={service.intro}/>

    <section className="section container detail-grid"><div className="detail-main"><div className="content-block"><h2>Problems this service can solve</h2><ul>{service.problems.map(x=><li key={x}><Check/>{x}</li>)}</ul></div><div className="content-block"><h2>What is included</h2><ul>{service.includes.map(x=><li key={x}><Check/>{x}</li>)}</ul></div><div className="content-block"><h2>How the process works</h2><ol>{service.steps.map((x,i)=><li key={x}><span>0{i+1}</span>{x}</li>)}</ol></div></div>

    <aside className="quote-card"><small>PRICING GUIDANCE</small><strong>{service.price}</strong><p>Final pricing follows an agreed scope. You will know what is included before work begins.</p><ButtonLink to="/contact">Request a quotation <ArrowRight size={16}/></ButtonLink></aside></section>

    <section className="section container"><SectionHead eyebrow="Service FAQ" title="Questions, answered."/><div className="faq-list">{service.faqs.map(([q,a])=><details key={q}><summary>{q}<ChevronDown/></summary><p>{a}</p></details>)}</div></section>

    <section className="section container"><SectionHead eyebrow="Related services" title="Build the right constellation."/><div className="service-grid compact">{related.map(s=><ServiceCard key={s.slug} service={s}/>)}</div></section><CTA/></main></>;

}



function Work() {

  const capabilities = [["Responsive business websites","Clear pages, strong mobile layouts and focused enquiry journeys."],["Backend & API systems","Structured services that connect interfaces, data and business rules."],["Workflow improvements","Careful automation concepts that reduce repeated operational steps."]];

  return <><Meta title="Developer Portfolio & Work" description="Explore NOVA Digital Studio's developer portfolio and software engineering capabilities across websites, APIs and automation."/><main><PageHero eyebrow="Work" title="Craft, capability and considered code." text="A transparent view of what the studio can build—without presenting concept work as completed client engagements."/><section className="section container"><div className="work-grid">{capabilities.map(([t,d],i)=><article key={t}><small>CAPABILITY 0{i+1}</small><div className="work-symbol"><Orbit/></div><h2>{t}</h2><p>{d}</p></article>)}</div><div className="portfolio-band"><div><Eyebrow>Existing portfolio</Eyebrow><h2>Explore selected developer work.</h2><p>View the external portfolio for a broader look at technical projects and implementation craft.</p></div><ButtonLink to={brand.portfolio} external>Open portfolio <ExternalLink size={16}/></ButtonLink></div></section><CTA/></main></>;

}



function About() {

  const skills = ["Java","Spring Boot","React","Angular","JavaScript & TypeScript","REST APIs","JWT authentication","PostgreSQL","Software testing","Backend integrations","Workflow automation","Deployment & troubleshooting"];

  return <><Meta title="About the Developer" description="Meet the independent Johannesburg software developer behind NOVA Digital Studio, focused on practical websites, APIs and business solutions."/><main><PageHero eyebrow="About NOVA" title="Curiosity, precision and practical engineering." text="NOVA is an independent software development studio based in Johannesburg, helping businesses navigate digital decisions with clarity."/>

    <section className="section container about-grid"><div><SectionHead eyebrow="The approach" title="Built close to the problem."/><p className="lead">The studio works directly with small businesses, entrepreneurs, growing companies and agencies. That means fewer layers, clearer communication and technical decisions connected to the outcome you actually need.</p><p>Like an observatory translating distant signals into useful understanding, NOVA combines curiosity with careful instrumentation: define the question, examine the system and engineer a dependable path forward.</p></div><div className="principles"><div><Gauge/><h3>Precision</h3><p>Clear scope, careful implementation and purposeful testing.</p></div><div><ShieldCheck/><h3>Reliability</h3><p>Maintainable choices over shortcuts that create future problems.</p></div><div><Sparkles/><h3>Thoughtfulness</h3><p>Technology selected for the business—not for novelty.</p></div></div></section>

    <section className="section skills-section"><div className="container"><SectionHead eyebrow="Technical toolkit" title="A full-stack engineering foundation."/><div className="skill-cloud">{skills.map(s=><span key={s}>{s}</span>)}</div></div></section><CTA/></main></>;

}



type FormData = { name:string; email:string; phone:string; business:string; service:string; description:string; timeframe:string; consent:boolean };

const emptyForm: FormData = { name:"", email:"", phone:"", business:"", service:"", description:"", timeframe:"", consent:false };

function ContactForm() {
  const [data, setData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  const update = (key: keyof FormData, value: string | boolean) => {
    setData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: "" }));
    setSubmitError("");
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting || companyWebsite.trim()) return;

    const next: Record<string, string> = {};
    if (!data.name.trim()) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) next.email = "Enter a valid email address.";
    if (!data.service) next.service = "Select a service.";
    if (data.description.trim().length < 20) next.description = "Please share at least 20 characters.";
    if (!data.timeframe) next.timeframe = "Select a preferred timeframe.";
    if (!data.consent) next.consent = "Please confirm that we may respond to your enquiry.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("https://formspree.io/f/xdeeepjq", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          business: data.business.trim(),
          service: data.service,
          timeframe: data.timeframe,
          message: data.description.trim(),
          consent: "Yes",
          _subject: `NOVA Digital Studio - ${data.service}`,
        }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        const details = result?.errors?.map((item: { message?: string }) => item.message).filter(Boolean).join(" ");
        throw new Error(details || "Formspree could not accept this enquiry.");
      }
      setSubmitted(true);
      setData({ ...emptyForm });
      setCompanyWebsite("");
      setErrors({});
    } catch (error) {
      console.error("NOVA enquiry submission failed:", error);
      setSubmitError("We couldn't send your enquiry. Please try again or contact us by email or WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <div className="contact-form" role="status" aria-live="polite">
      <div className="form-intro"><div><small>ENQUIRY RECEIVED</small><h2>Thank you for reaching out!</h2></div><Check size={24}/></div>
      <p>Your quotation request has been submitted. NOVA Digital Studio will be in touch.</p>
      <div className="form-submit"><button type="button" className="button button-primary" onClick={() => setSubmitted(false)}>Send another enquiry <ArrowRight size={17}/></button></div>
    </div>;
  }

  return <form className="contact-form" onSubmit={submit} noValidate>
    <div className="form-intro"><div><small>ENQUIRY FORM</small><h2>Tell us about your project.</h2></div><span>Fields marked * are required</span></div>
    <div className="form-grid">
      <Field label="Full name *" error={errors.name}><input value={data.name} onChange={e=>update("name",e.target.value)} autoComplete="name"/></Field>
      <Field label="Email address *" error={errors.email}><input type="email" value={data.email} onChange={e=>update("email",e.target.value)} autoComplete="email"/></Field>
      <Field label="Phone number"><input type="tel" value={data.phone} onChange={e=>update("phone",e.target.value)} autoComplete="tel"/></Field>
      <Field label="Business name"><input value={data.business} onChange={e=>update("business",e.target.value)} autoComplete="organization"/></Field>
      <Field label="Service required *" error={errors.service}><select value={data.service} onChange={e=>update("service",e.target.value)}><option value="">Choose a service</option>{services.map(s=><option key={s.slug}>{s.title}</option>)}<option>Other / not sure</option></select></Field>
      <Field label="Preferred timeframe *" error={errors.timeframe}><select value={data.timeframe} onChange={e=>update("timeframe",e.target.value)}><option value="">Choose a timeframe</option><option>As soon as practical</option><option>Within 1 month</option><option>Within 2–3 months</option><option>Planning ahead</option></select></Field>
      <div className="field full"><label htmlFor="description">Project description *</label><textarea id="description" rows={6} value={data.description} onChange={e=>update("description",e.target.value)} placeholder="What would you like to build, fix or improve?"/>{errors.description&&<span className="error">{errors.description}</span>}</div>
      <div className="field full honeypot" aria-hidden="true"><label>Company website<input tabIndex={-1} autoComplete="off" value={companyWebsite} onChange={e=>setCompanyWebsite(e.target.value)}/></label></div>
      <label className="consent full"><input type="checkbox" checked={data.consent} onChange={e=>update("consent",e.target.checked)}/><span>I consent to NOVA using these details to respond to my enquiry. *</span></label>{errors.consent&&<span className="error full">{errors.consent}</span>}
    </div>
    {submitError && <p className="error" role="alert">{submitError}</p>}
    <div className="form-submit"><button type="submit" className="button button-primary" disabled={submitting}>{submitting ? "Sending enquiry…" : "Submit enquiry"} <ArrowRight size={17}/></button><p>Your details are submitted through Formspree so we can respond to your quotation request. No email application will open.</p></div>
  </form>;
}

function Field({label,error,children}:{label:string;error?:string;children:React.ReactElement<Record<string, unknown>>}) { const id=label.toLowerCase().replace(/[^a-z]+/g,"-"); return <div className="field"><label htmlFor={id}>{label}</label>{cloneElement(children,{id,"aria-invalid":!!error})}{error&&<span className="error">{error}</span>}</div>; }



function Contact() { return <><Meta title="Contact & Free Quote" description="Request a website or software development quotation from NOVA Digital Studio in Johannesburg. Contact by email, phone or WhatsApp."/><main><PageHero eyebrow="Contact" title="Let’s map the next move." text="Share the outcome you need. You will get a straightforward response about fit, scope and a sensible way forward."/><section className="section container contact-layout"><aside className="contact-options"><h2>Prefer a direct channel?</h2><p>Reach out using whichever option is easiest. Please do not send passwords or sensitive credentials.</p><a href={brand.whatsapp} target="_blank" rel="noreferrer"><MessageCircle/><span><small>WHATSAPP</small><strong>{brand.phone}</strong></span><ArrowRight/></a><a href={`mailto:${brand.email}`}><Mail/><span><small>EMAIL</small><strong>{brand.email}</strong></span><ArrowRight/></a><a href={brand.phoneHref}><Phone/><span><small>TELEPHONE</small><strong>{brand.phone}</strong></span><ArrowRight/></a><div className="location-note"><Globe2/><span><small>BASED IN</small>{brand.location}<br/>Remote service across South Africa</span></div></aside><ContactForm/></section></main></>; }



function Privacy() { return <><Meta title="Privacy Policy" description="Editable privacy policy for NOVA Digital Studio, including enquiry handling, data retention and South African POPIA considerations."/><main><PageHero eyebrow="Legal" title="Privacy policy." text="A plain-language outline of how enquiry information is intended to be handled."/><article className="section container legal"><div className="legal-alert"><ShieldCheck/><p><strong>Draft for legal review.</strong> This policy must be reviewed and adapted by a qualified professional before publication. It does not claim independently verified compliance.</p></div><h2>Information collected</h2><p>This website may collect the details you choose to include in an enquiry, such as your name, contact information, business name and project description. The quotation form submits enquiry details through Formspree, a third-party form processing service, for delivery to NOVA Digital Studio. Please avoid including sensitive personal information.</p><h2>How enquiries are used</h2><p>Information is intended only to assess, respond to and manage your enquiry; prepare quotations; and communicate about requested services. It should not be sold or used for unrelated direct marketing without an appropriate basis.</p><h2>Retention and security</h2><p>Email enquiries should be retained only as long as reasonably needed for communication, project records and applicable legal or accounting needs. No internet transmission is completely secure. Do not send passwords, access keys or sensitive personal information through the enquiry form.</p><h2>South African privacy considerations</h2><p>The Protection of Personal Information Act (POPIA) provides principles for responsible processing of personal information. Formspree is used to process quotation requests; its data handling and any future services should be reviewed as part of the privacy policy.</p><h2>Your choices and contact</h2><p>You may ask about your enquiry information or request correction or deletion where appropriate by emailing <a href={`mailto:${brand.email}`}>{brand.email}</a>.</p><p><small>Last updated: October 2026 · Review before publication</small></p></article></main></>; }



function NotFound() { return <><Meta title="Page not found" description="The requested page could not be found."/><main className="not-found"><div className="lost-orbit"><span>404</span><Orbit/></div><Eyebrow>Signal lost</Eyebrow><h1>This page drifted beyond our orbit.</h1><p>The address may have changed, or the page no longer exists.</p><ButtonLink to="/">Return to home <ArrowRight size={17}/></ButtonLink></main></>; }



function Footer() { return <footer><div className="container footer-grid"><div className="footer-brand"><Link className="brand" to="/"><span className="brand-mark"><Orbit size={22}/></span><span><b>{brand.name}</b><small>Digital Studio</small></span></Link><p>{brand.tagline}</p><p>Independent software development in Johannesburg, serving businesses across South Africa.</p></div><div><h3>Services</h3>{services.map(s=><Link key={s.slug} to={`/services/${s.slug}`}>{s.title}</Link>)}</div><div><h3>Navigate</h3>{nav.map(([l,t])=><Link key={t} to={t}>{l}</Link>)}<Link to="/privacy">Privacy</Link></div><div><h3>Contact</h3><a href={brand.whatsapp} target="_blank" rel="noreferrer">WhatsApp: {brand.phone}</a><a href={`mailto:${brand.email}`}>{brand.email}</a><span>{brand.location}</span></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {brand.fullName}</span><span>Designed with purpose. Engineered with precision.</span></div></footer>; }



function Shell() { return <div><a href="#main" className="skip">Skip to content</a><Header/><div id="main"><Routes><Route path="/" element={<Home/>}/><Route path="/services" element={<Services/>}/>{services.map(s=><Route key={s.slug} path={`/services/${s.slug}`} element={<ServiceDetail service={s}/>}/>)}<Route path="/work" element={<Work/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="/privacy" element={<Privacy/>}/><Route path="*" element={<NotFound/>}/></Routes></div><Footer/><a className="whatsapp-float" href={brand.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle/></a></div>; }

export default function App() { return <BrowserRouter><Shell/></BrowserRouter>; }
