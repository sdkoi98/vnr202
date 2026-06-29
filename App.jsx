import { useState, useEffect, useRef } from "react";
import imgTiepQuan from "./tiep-quan-thu-do-1954.png";
import imgBacHo from "./bac-ho-tai-dai-hoi-dang.jpg";
import imgXeTang from "./xe-tang-tien-vao-dinh-doc-lap.jpg";
import imgDamDong from "./nhan-dan-mung-giai-phong-30-4.jpg";

/* ============================================================
   CHƯƠNG 2 (1954–1975) — Website nhiều trang
   Phong cách: tranh cổ động — đỏ cờ / vàng sao / giấy kem / mực
   Điều hướng nhiều trang bằng state (không dùng router ngoài)
   ============================================================ */

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap');

:root{
  --do:#DA251D;
  --do-tham:#7A0D0A;
  --do-sau:#530707;
  --vang:#FFCD00;
  --vang-dam:#E0A100;
  --kem:#F4ECD8;
  --kem-dam:#E7D9B8;
  --muc:#1E1813;
  --muc-nhat:#5A4F44;
}

*{box-sizing:border-box;}
.app{
  font-family:'Be Vietnam Pro',sans-serif;
  color:var(--muc);
  background:var(--kem);
  min-height:100vh;
  -webkit-font-smoothing:antialiased;
}
.app ::selection{background:var(--vang);color:var(--muc);}

.display{font-family:'Oswald','Be Vietnam Pro',sans-serif;text-transform:uppercase;letter-spacing:.01em;}

/* ---------- NAV ---------- */
.nav{
  position:sticky;top:0;z-index:50;
  background:var(--do);
  border-bottom:3px solid var(--vang);
  box-shadow:0 4px 18px rgba(0,0,0,.18);
}
.nav-inner{max-width:1180px;margin:0 auto;padding:0 22px;display:flex;align-items:center;gap:18px;height:64px;}
.brand{display:flex;align-items:center;gap:12px;cursor:pointer;background:none;border:0;padding:0;}
.brand-star{width:30px;height:30px;flex:none;}
.brand-txt{display:flex;flex-direction:column;line-height:1;}
.brand-txt b{font-family:'Oswald',sans-serif;color:#fff;font-size:18px;letter-spacing:.06em;}
.brand-txt span{color:var(--vang);font-size:10px;letter-spacing:.22em;text-transform:uppercase;margin-top:3px;}
.nav-links{display:flex;gap:4px;margin-left:auto;}
.nav-links button{
  font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.05em;font-size:13px;
  color:#fff;background:none;border:0;padding:9px 13px;cursor:pointer;position:relative;border-radius:2px;
  transition:color .2s,background .2s;
}
.nav-links button:hover{background:rgba(255,255,255,.12);}
.nav-links button.on{color:var(--muc);background:var(--vang);}
.burger{display:none;margin-left:auto;background:none;border:2px solid var(--vang);color:var(--vang);
  width:42px;height:38px;border-radius:3px;cursor:pointer;font-size:18px;}
.mobile-menu{display:none;background:var(--do-tham);border-bottom:3px solid var(--vang);}
.mobile-menu button{display:block;width:100%;text-align:left;background:none;border:0;
  border-top:1px solid rgba(255,255,255,.12);color:#fff;font-family:'Oswald',sans-serif;
  text-transform:uppercase;letter-spacing:.05em;padding:14px 22px;font-size:14px;cursor:pointer;}
.mobile-menu button.on{color:var(--vang);}

/* ---------- LAYOUT ---------- */
.wrap{max-width:1100px;margin:0 auto;padding:0 22px;}
.page{padding:0 0 90px;}
.page-head{
  background:var(--do-tham);color:var(--kem);padding:54px 0 46px;position:relative;overflow:hidden;
  border-bottom:4px solid var(--vang);
}
.page-head .wrap{position:relative;z-index:2;}
.eyebrow{font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.28em;font-size:12px;
  color:var(--vang);display:flex;align-items:center;gap:10px;margin-bottom:14px;}
.eyebrow::before{content:"";width:30px;height:2px;background:var(--vang);display:block;}
.page-title{font-family:'Oswald',sans-serif;text-transform:uppercase;font-weight:600;
  font-size:clamp(30px,5vw,52px);line-height:1.02;color:#fff;letter-spacing:.01em;}
.page-sub{margin-top:16px;max-width:680px;color:#F0E2C8;font-size:16px;line-height:1.6;}
.head-star{position:absolute;right:-40px;top:-30px;width:280px;height:280px;opacity:.10;z-index:1;}

.section{padding:54px 0;}
.sec-num{font-family:'Oswald',sans-serif;font-size:13px;letter-spacing:.2em;color:var(--do);
  text-transform:uppercase;display:flex;align-items:center;gap:10px;margin-bottom:8px;font-weight:600;}
.sec-num span{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;
  background:var(--do);color:var(--vang);border-radius:2px;font-size:13px;}
.sec-title{font-family:'Oswald',sans-serif;text-transform:uppercase;font-weight:600;
  font-size:clamp(22px,3.4vw,34px);color:var(--muc);line-height:1.05;letter-spacing:.01em;}
.lead{font-size:17px;line-height:1.7;color:var(--muc);max-width:760px;margin-top:18px;}

/* ---------- VĨ TUYẾN 17 (signature) ---------- */
.parallel{display:flex;align-items:center;gap:16px;margin:34px 0;}
.parallel .line{flex:1;height:0;border-top:3px double var(--vang-dam);}
.parallel .lab{font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.18em;
  font-size:12px;color:var(--do);background:var(--vang);padding:5px 14px;border-radius:2px;white-space:nowrap;}

/* ---------- CARDS / GRID ---------- */
.grid{display:grid;gap:18px;margin-top:26px;}
.g2{grid-template-columns:1fr 1fr;}
.g3{grid-template-columns:1fr 1fr 1fr;}
.card{background:#fff;border:1px solid var(--kem-dam);border-left:5px solid var(--do);
  padding:24px 24px 22px;border-radius:3px;box-shadow:0 2px 0 rgba(0,0,0,.04);}
.card.gold{border-left-color:var(--vang-dam);}
.card h4{font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.04em;
  font-size:17px;color:var(--do);margin:0 0 12px;font-weight:600;display:flex;align-items:center;gap:9px;}
.card.gold h4{color:var(--vang-dam);}
.card h4 .st{width:18px;height:18px;flex:none;}
.bullets{list-style:none;margin:0;padding:0;}
.bullets li{position:relative;padding:7px 0 7px 22px;line-height:1.55;font-size:15px;color:var(--muc);
  border-bottom:1px dashed var(--kem-dam);}
.bullets li:last-child{border-bottom:0;}
.bullets li::before{content:"";position:absolute;left:0;top:14px;width:8px;height:8px;
  background:var(--vang-dam);transform:rotate(45deg);}
.tag{display:inline-block;font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.08em;
  font-size:11px;background:var(--do);color:#fff;padding:4px 10px;border-radius:2px;margin-bottom:14px;}

/* ---------- SO SÁNH HAI MIỀN ---------- */
.duo{display:grid;grid-template-columns:1fr 1fr;gap:0;border:2px solid var(--muc);border-radius:3px;overflow:hidden;}
.duo .col{padding:26px 24px;}
.duo .north{background:#fff;}
.duo .south{background:var(--kem-dam);border-left:2px solid var(--muc);}
.duo .col .ttl{font-family:'Oswald',sans-serif;text-transform:uppercase;font-size:20px;letter-spacing:.04em;
  font-weight:600;margin-bottom:6px;}
.duo .north .ttl{color:var(--do);}
.duo .south .ttl{color:var(--muc);}
.duo .col .role{font-size:13px;color:var(--muc-nhat);text-transform:uppercase;letter-spacing:.1em;margin-bottom:16px;
  font-family:'Oswald',sans-serif;}

/* ---------- TIMELINE ---------- */
.tl{position:relative;margin-top:34px;padding-left:8px;}
.tl::before{content:"";position:absolute;left:18px;top:8px;bottom:8px;width:3px;
  background:linear-gradient(var(--vang),var(--do));}
.tl-item{position:relative;padding:0 0 38px 56px;}
.tl-item:last-child{padding-bottom:0;}
.tl-dot{position:absolute;left:6px;top:2px;width:28px;height:28px;background:var(--do);border:3px solid var(--vang);
  border-radius:50%;display:flex;align-items:center;justify-content:center;}
.tl-dot .st{width:14px;height:14px;}
.tl-when{font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.1em;font-size:12px;
  color:var(--do);font-weight:600;}
.tl-name{font-family:'Oswald',sans-serif;text-transform:uppercase;font-size:21px;letter-spacing:.02em;
  color:var(--muc);margin:2px 0 4px;font-weight:600;line-height:1.1;}
.tl-card{background:#fff;border:1px solid var(--kem-dam);border-radius:3px;padding:18px 20px;margin-top:12px;}
.kv{margin:0 0 12px;}
.kv:last-child{margin-bottom:0;}
.kv .k{font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.08em;font-size:12px;
  color:var(--vang-dam);margin-bottom:5px;}
.kv .v{font-size:15px;line-height:1.6;color:var(--muc);}
.chip{display:inline-block;background:var(--kem);border:1px solid var(--kem-dam);border-radius:2px;
  padding:3px 10px;font-size:13px;margin:3px 6px 3px 0;font-weight:500;}
.kicker{font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.04em;color:var(--do);
  font-weight:600;font-size:15px;margin-top:6px;}

/* ---------- QUOTE ---------- */
.quote{background:var(--do-tham);color:var(--kem);border-radius:4px;padding:36px 38px;position:relative;
  border-left:6px solid var(--vang);overflow:hidden;}
.quote .qm{font-family:'Oswald',sans-serif;font-size:120px;line-height:.6;color:var(--vang);opacity:.25;
  position:absolute;top:24px;right:24px;}
.quote p{font-size:19px;line-height:1.65;margin:0;position:relative;z-index:2;}
.quote .by{margin-top:16px;font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.12em;
  font-size:12px;color:var(--vang);}

/* ---------- HERO ---------- */
.hero{background:var(--do-tham);color:#fff;position:relative;overflow:hidden;border-bottom:5px solid var(--vang);}
.hero::after{content:"";position:absolute;inset:0;
  background:radial-gradient(120% 90% at 80% 10%, rgba(218,37,29,.55), transparent 60%);}
.hero .wrap{position:relative;z-index:3;padding:70px 22px 64px;}
.hero-star{position:absolute;right:-90px;top:50%;transform:translateY(-50%);width:520px;height:520px;
  opacity:.14;z-index:1;}
.hero-eyebrow{font-family:'Oswald',sans-serif;letter-spacing:.3em;font-size:13px;color:var(--vang);
  text-transform:uppercase;display:flex;align-items:center;gap:12px;margin-bottom:20px;}
.hero-eyebrow::before{content:"";width:46px;height:2px;background:var(--vang);}
.hero h1{font-family:'Oswald',sans-serif;text-transform:uppercase;font-weight:600;
  font-size:clamp(32px,5.6vw,62px);line-height:1.0;letter-spacing:.005em;max-width:920px;color:#fff;}
.hero .years{display:flex;align-items:center;gap:18px;margin:30px 0;}
.hero .years .y{font-family:'Oswald',sans-serif;font-size:clamp(40px,8vw,84px);color:var(--vang);
  font-weight:700;line-height:1;}
.hero .years .dash{flex:1;max-width:120px;height:4px;background:var(--vang);}
.hero-lead{max-width:640px;font-size:17px;line-height:1.7;color:#F2E6CC;}
.cta-row{margin-top:34px;display:flex;gap:14px;flex-wrap:wrap;}
.btn{font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.06em;font-size:14px;
  padding:13px 26px;border-radius:3px;cursor:pointer;border:2px solid var(--vang);transition:.2s;}
.btn-solid{background:var(--vang);color:var(--muc);}
.btn-solid:hover{background:#fff;border-color:#fff;}
.btn-ghost{background:transparent;color:var(--vang);}
.btn-ghost:hover{background:var(--vang);color:var(--muc);}

/* ---------- MỤC LỤC (hero cards) ---------- */
.toc{padding:60px 0 30px;}
.toc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:26px;}
.toc-card{text-align:left;background:#fff;border:1px solid var(--kem-dam);border-top:5px solid var(--do);
  padding:22px;border-radius:3px;cursor:pointer;transition:.18s;font-family:inherit;}
.toc-card:hover{transform:translateY(-3px);box-shadow:0 10px 24px rgba(0,0,0,.12);border-top-color:var(--vang-dam);}
.toc-card .n{font-family:'Oswald',sans-serif;font-size:13px;color:var(--do);letter-spacing:.14em;font-weight:600;}
.toc-card .t{font-family:'Oswald',sans-serif;text-transform:uppercase;font-size:18px;margin:6px 0 8px;
  color:var(--muc);letter-spacing:.02em;font-weight:600;line-height:1.1;}
.toc-card .d{font-size:14px;color:var(--muc-nhat);line-height:1.5;}

/* ---------- BACK / NEXT ---------- */
.flow{display:flex;justify-content:space-between;gap:14px;margin-top:50px;flex-wrap:wrap;}
.flow button{font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.05em;font-size:14px;
  background:#fff;border:2px solid var(--do);color:var(--do);padding:13px 22px;border-radius:3px;cursor:pointer;
  transition:.18s;}
.flow button:hover{background:var(--do);color:#fff;}
.flow .next{background:var(--do);color:#fff;}
.flow .next:hover{background:var(--do-tham);border-color:var(--do-tham);}

/* ---------- FOOTER ---------- */
.foot{background:var(--muc);color:#C9BBA8;padding:38px 0;border-top:4px solid var(--vang);}
.foot .wrap{display:flex;justify-content:space-between;align-items:center;gap:18px;flex-wrap:wrap;}
.foot b{font-family:'Oswald',sans-serif;color:var(--vang);text-transform:uppercase;letter-spacing:.06em;font-size:15px;}
.foot small{font-size:13px;line-height:1.6;}

/* ---------- FIGURE / GALLERY ---------- */
.figure{margin:30px 0 0;background:#fff;border:1px solid var(--kem-dam);padding:10px;border-radius:3px;
  box-shadow:0 2px 0 rgba(0,0,0,.04);}
.figure img{display:block;width:100%;height:auto;border-radius:2px;background:var(--kem-dam);}
.figure figcaption{font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.04em;font-size:12.5px;
  color:var(--muc-nhat);padding:12px 6px 4px;border-top:2px solid var(--vang);margin-top:10px;line-height:1.45;}
.figure figcaption .credit{display:block;margin-top:6px;font-style:italic;text-transform:none;letter-spacing:0;
  font-size:11.5px;color:#9A8C78;font-family:'Be Vietnam Pro',sans-serif;}
.gallery{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:30px;}
.gallery .figure{margin:0;}

/* ---------- REVEAL ---------- */
.reveal{opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .7s ease;}
.reveal.in{opacity:1;transform:none;}
@media (prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none;}}

:focus-visible{outline:3px solid var(--vang);outline-offset:2px;}

@media(max-width:860px){
  .nav-links{display:none;}
  .burger{display:block;}
  .mobile-menu{display:block;}
  .g2,.g3,.duo,.toc-grid,.gallery{grid-template-columns:1fr;}
  .duo .south{border-left:0;border-top:2px solid var(--muc);}
  .hero-star{width:340px;right:-120px;}
}
`;

const Star = ({ cls = "", fill = "var(--vang)" }) => (
  <svg className={cls} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M50 4 L61.8 37.6 L97 38.2 L68.6 59.5 L79.4 93 L50 72.4 L20.6 93 L31.4 59.5 L3 38.2 L38.2 37.6 Z"
      fill={fill} />
  </svg>
);

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { setShown(true); ob.disconnect(); } }),
      { threshold: 0.12 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  return [ref, shown];
}
const Reveal = ({ children, className = "", delay = 0 }) => {
  const [ref, shown] = useReveal();
  return (
    <div ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Parallel = ({ label = "Vĩ tuyến 17" }) => (
  <div className="parallel"><div className="line" /><div className="lab">{label}</div><div className="line" /></div>
);

const Figure = ({ src, alt, cap, credit }) => (
  <Reveal>
    <figure className="figure">
      <img src={src} alt={alt} loading="lazy" />
      {(cap || credit) && (
        <figcaption>
          {cap}
          {credit && <span className="credit">{credit}</span>}
        </figcaption>
      )}
    </figure>
  </Reveal>
);

const Gallery = ({ items }) => (
  <div className="gallery">
    {items.map((it, i) => (
      <Reveal key={it.src} delay={i * 80}>
        <figure className="figure">
          <img src={it.src} alt={it.alt} loading="lazy" />
          {(it.cap || it.credit) && (
            <figcaption>
              {it.cap}
              {it.credit && <span className="credit">{it.credit}</span>}
            </figcaption>
          )}
        </figure>
      </Reveal>
    ))}
  </div>
);

const PAGES = [
  { id: "home", label: "Trang chủ" },
  { id: "boicanh", label: "Bối cảnh" },
  { id: "dienbien", label: "Diễn biến" },
  { id: "daithang", label: "Đại thắng 1975" },
  { id: "ynghia", label: "Ý nghĩa" },
  { id: "tongket", label: "Tổng kết" },
];

const PageHead = ({ eyebrow, title, sub }) => (
  <header className="page-head">
    <Star cls="head-star" />
    <div className="wrap">
      <div className="eyebrow">{eyebrow}</div>
      <h1 className="page-title">{title}</h1>
      {sub && <p className="page-sub">{sub}</p>}
    </div>
  </header>
);

const SecHead = ({ n, title }) => (
  <Reveal>
    {n && <div className="sec-num"><span>{n}</span> Mục {n}</div>}
    <h2 className="sec-title">{title}</h2>
  </Reveal>
);

const Flow = ({ go, prev, next }) => (
  <div className="wrap">
    <div className="flow">
      {prev ? <button onClick={() => go(prev.id)}>← {prev.label}</button> : <span />}
      {next ? <button className="next" onClick={() => go(next.id)}>{next.label} →</button> : <span />}
    </div>
  </div>
);

/* ===================== TRANG CHỦ ===================== */
function Home({ go }) {
  const toc = [
    { id: "boicanh", n: "01", t: "Bối cảnh lịch sử", d: "Hiệp định Giơnevơ 1954, đất nước chia cắt và hai nhiệm vụ chiến lược." },
    { id: "dienbien", n: "02", t: "Chiến lược của Mỹ", d: "Ba chiến lược chiến tranh và sự phá sản: đặc biệt, cục bộ, Việt Nam hóa." },
    { id: "daithang", n: "03", t: "Đại thắng mùa Xuân 1975", d: "Ba chiến dịch quyết định khép lại bằng ngày 30/4/1975." },
    { id: "ynghia", n: "04", t: "Nguyên nhân & Ý nghĩa", d: "Vì sao thắng lợi, ý nghĩa lịch sử và những bài học kinh nghiệm." },
    { id: "tongket", n: "05", t: "Tổng kết", d: "Mốc son chói lọi mở ra kỷ nguyên độc lập, thống nhất." },
  ];
  return (
    <div>
      <section className="hero">
        <Star cls="hero-star" />
        <div className="wrap">
          <div className="hero-eyebrow">Chương 2 · Lịch sử Đảng Cộng sản Việt Nam</div>
          <h1>Đảng lãnh đạo xây dựng chủ nghĩa xã hội ở miền Bắc và kháng chiến chống Mỹ, giải phóng miền Nam, thống nhất đất nước</h1>
          <div className="years">
            <div className="y">1954</div><div className="dash" /><div className="y">1975</div>
          </div>
          <p className="hero-lead">
            Hai mươi mốt năm, hai miền, một mục tiêu. Câu chuyện về hậu phương lớn miền Bắc và tiền tuyến lớn
            miền Nam, kết tinh trong Đại thắng mùa Xuân năm 1975.
          </p>
          <div className="cta-row">
            <button className="btn btn-solid" onClick={() => go("boicanh")}>Bắt đầu tìm hiểu</button>
            <button className="btn btn-ghost" onClick={() => go("daithang")}>Đến thẳng năm 1975</button>
          </div>
        </div>
      </section>

      <section className="toc">
        <div className="wrap">
          <Reveal><div className="sec-num"><span>≡</span> Mục lục</div>
            <h2 className="sec-title">Hành trình của chương</h2></Reveal>
          <div className="toc-grid">
            {toc.map((c, i) => (
              <Reveal key={c.id} delay={i * 60}>
                <button className="toc-card" onClick={() => go(c.id)}>
                  <div className="n">{c.n}</div>
                  <div className="t">{c.t}</div>
                  <div className="d">{c.d}</div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===================== BỐI CẢNH ===================== */
function BoiCanh({ go }) {
  return (
    <div className="page">
      <PageHead
        eyebrow="Phần một"
        title="Bối cảnh lịch sử"
        sub="Sau Hiệp định Giơnevơ năm 1954, Việt Nam tạm thời bị chia cắt thành hai miền, đặt cách mạng trước hai nhiệm vụ chiến lược cùng lúc."
      />

      <section className="section"><div className="wrap">
        <SecHead n="1" title="Sau Hiệp định Giơnevơ năm 1954" />
        <Reveal><p className="lead">
          Hiệp định Giơnevơ về Đông Dương được ký ngày 21/7/1954 đã chấm dứt cuộc kháng chiến chống thực dân Pháp,
          nhưng đất nước tạm thời bị chia cắt thành hai miền tại vĩ tuyến 17.
        </p></Reveal>

        <Reveal><ul className="bullets" style={{ marginTop: 18, maxWidth: 820 }}>
          <li>Miền Bắc hoàn toàn giải phóng, bước vào thời kỳ quá độ lên chủ nghĩa xã hội.</li>
          <li>Miền Nam nằm dưới sự kiểm soát của chính quyền Việt Nam Cộng hòa được Hoa Kỳ hậu thuẫn.</li>
          <li>Theo Hiệp định, sau hai năm sẽ tổng tuyển cử thống nhất đất nước, nhưng Hoa Kỳ và chính quyền Sài Gòn đã từ chối thực hiện.</li>
        </ul></Reveal>

        <Figure
          src={imgTiepQuan}
          alt="Bộ đội tiến vào tiếp quản Thủ đô trong niềm vui của nhân dân, năm 1954"
          cap="Miền Bắc hoàn toàn giải phóng — nhân dân đón đoàn quân tiến về tiếp quản Thủ đô (1954)."
          credit="Nguồn: Ảnh tư liệu – TTXVN"
        />

        <Reveal><Parallel /></Reveal>

        <Reveal><p className="lead" style={{ marginTop: 0 }}>
          Từ đây, cách mạng Việt Nam phải đồng thời thực hiện hai nhiệm vụ chiến lược ở hai miền:
        </p></Reveal>

        <Reveal><div className="duo" style={{ marginTop: 22 }}>
          <div className="col north">
            <div className="ttl">Miền Bắc</div>
            <div className="role">Hậu phương lớn</div>
            <ul className="bullets">
              <li>Xây dựng chủ nghĩa xã hội.</li>
              <li>Làm hậu phương lớn cho tiền tuyến miền Nam.</li>
            </ul>
          </div>
          <div className="col south">
            <div className="ttl">Miền Nam</div>
            <div className="role">Tiền tuyến lớn</div>
            <ul className="bullets">
              <li>Tiếp tục cách mạng dân tộc dân chủ.</li>
              <li>Đấu tranh giải phóng miền Nam, tiến tới thống nhất đất nước.</li>
            </ul>
          </div>
        </div></Reveal>
      </div></section>

      <section className="section" style={{ background: "#fff", borderTop: "1px solid var(--kem-dam)", borderBottom: "1px solid var(--kem-dam)" }}>
        <div className="wrap">
          <SecHead n="2" title="Chủ trương lãnh đạo của Đảng" />
          <Reveal><p className="lead">
            Trước tình hình đất nước bị chia cắt lâu dài, Đảng xác định phải kết hợp chặt chẽ giữa xây dựng và bảo vệ Tổ quốc.
          </p></Reveal>

          <Figure
            src={imgBacHo}
            alt="Chủ tịch Hồ Chí Minh phát biểu tại Đại hội Đảng"
            cap="Chủ tịch Hồ Chí Minh phát biểu tại Đại hội — Đảng đề ra đường lối cho cách mạng hai miền."
            credit="Nguồn: Ảnh tư liệu – TTXVN"
          />

          <div className="grid g2">
            <Reveal>
              <div className="card">
                <h4><Star cls="st" /> Xây dựng miền Bắc</h4>
                <ul className="bullets">
                  <li>Khôi phục kinh tế sau chiến tranh.</li>
                  <li>Cải tạo quan hệ sản xuất.</li>
                  <li>Phát triển công nghiệp, nông nghiệp, giáo dục và quốc phòng.</li>
                  <li>Xây dựng miền Bắc thành hậu phương vững chắc.</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="card gold">
                <h4><Star cls="st" fill="var(--vang-dam)" /> Đấu tranh ở miền Nam</h4>
                <p style={{ margin: "0 0 12px", color: "var(--muc-nhat)" }}>
                  Ba mặt trận được phối hợp linh hoạt nhằm làm thất bại các chiến lược chiến tranh của Hoa Kỳ:
                </p>
                <div>
                  <span className="chip">Đấu tranh chính trị</span>
                  <span className="chip">Đấu tranh quân sự</span>
                  <span className="chip">Đấu tranh ngoại giao</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Flow go={go} prev={PAGES[0]} next={PAGES[2]} />
    </div>
  );
}

/* ===================== DIỄN BIẾN — CHIẾN LƯỢC CỦA MỸ ===================== */
function DienBien({ go }) {
  const strats = [
    {
      when: "1961 – 1965", name: "Chiến tranh đặc biệt",
      dac: "Quân đội Sài Gòn là lực lượng chủ yếu; Hoa Kỳ giữ vai trò cố vấn và viện trợ quân sự.",
      ket: ["Ấp Bắc (1963)", "Bình Giã (1964)"],
      kicker: "⟹ Chiến lược bị phá sản.",
    },
    {
      when: "1965 – 1968", name: "Chiến tranh cục bộ",
      dac: "Hoa Kỳ trực tiếp đưa quân viễn chinh vào miền Nam, mở rộng chiến tranh phá hoại miền Bắc.",
      dinh: "Tổng tiến công và nổi dậy Tết Mậu Thân 1968.",
      y: ["Làm lung lay ý chí xâm lược của Hoa Kỳ.", "Buộc Hoa Kỳ xuống thang chiến tranh.", "Chấp nhận đàm phán tại Paris."],
    },
    {
      when: "1969 – 1973", name: "Việt Nam hóa chiến tranh",
      dac: "Rút dần quân Mỹ, dùng quân đội Sài Gòn làm lực lượng chủ yếu; Hoa Kỳ tiếp tục viện trợ và không quân hỗ trợ.",
      dinh: "Hiệp định Paris năm 1973.",
      y: ["Hoa Kỳ rút toàn bộ quân viễn chinh.", "Công nhận độc lập, chủ quyền và toàn vẹn lãnh thổ Việt Nam."],
      kicker: "⟹ Bước ngoặt quan trọng, mở đường giải phóng hoàn toàn miền Nam.",
    },
  ];
  return (
    <div className="page">
      <PageHead
        eyebrow="Phần hai"
        title="Những chiến lược chiến tranh của Hoa Kỳ và sự thất bại"
        sub="Qua ba chiến lược nối tiếp nhau, quân và dân ta lần lượt đánh bại từng bước leo thang của Hoa Kỳ."
      />
      <section className="section"><div className="wrap">
        <SecHead n="3" title="Ba chiến lược — ba lần phá sản" />
        <div className="tl">
          {strats.map((s, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="tl-item">
                <div className="tl-dot"><Star cls="st" /></div>
                <div className="tl-when">{s.when}</div>
                <div className="tl-name">{s.name}</div>
                <div className="tl-card">
                  <div className="kv"><div className="k">Đặc điểm</div><div className="v">{s.dac}</div></div>
                  {s.ket && (
                    <div className="kv"><div className="k">Thắng lợi tiêu biểu</div>
                      <div className="v">{s.ket.map((k) => <span key={k} className="chip">{k}</span>)}</div></div>
                  )}
                  {s.dinh && <div className="kv"><div className="k">Đỉnh cao</div><div className="v"><b>{s.dinh}</b></div></div>}
                  {s.y && (
                    <div className="kv"><div className="k">Ý nghĩa</div>
                      <div className="v"><ul className="bullets">{s.y.map((t) => <li key={t}>{t}</li>)}</ul></div></div>
                  )}
                  {s.kicker && <div className="kicker">{s.kicker}</div>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div></section>
      <Flow go={go} prev={PAGES[1]} next={PAGES[3]} />
    </div>
  );
}

/* ===================== ĐẠI THẮNG 1975 ===================== */
function DaiThang({ go }) {
  const camps = [
    {
      when: "04/3 – 24/3/1975", name: "Chiến dịch Tây Nguyên",
      muc: "Đánh vào khu vực chiến lược Tây Nguyên.",
      dien: ["Buôn Ma Thuột được giải phóng.", "Quân địch rút chạy hỗn loạn.", "Toàn bộ Tây Nguyên nhanh chóng được giải phóng."],
      y: "Đòn mở đầu, tạo bước ngoặt quyết định cho toàn bộ cuộc Tổng tiến công.",
    },
    {
      when: "21/3 – 29/3/1975", name: "Chiến dịch Huế – Đà Nẵng",
      dien: ["Giải phóng Huế.", "Giải phóng Đà Nẵng.", "Làm tan rã phần lớn quân đội Sài Gòn ở miền Trung."],
      y: "Làm thay đổi hoàn toàn cục diện chiến trường.",
    },
    {
      when: "26/4 – 30/4/1975", name: "Chiến dịch Hồ Chí Minh",
      muc: "Giải phóng Sài Gòn – Gia Định. Trận quyết chiến chiến lược cuối cùng.",
      dien: ["Năm cánh quân đồng loạt tiến công vào trung tâm Sài Gòn.", "30/4: xe tăng Quân Giải phóng tiến vào Dinh Độc Lập.", "Tổng thống Dương Văn Minh tuyên bố đầu hàng vô điều kiện.", "Chính quyền Sài Gòn hoàn toàn sụp đổ."],
      y: "Khép lại thắng lợi cuộc kháng chiến chống Mỹ cứu nước.",
      final: true,
    },
  ];
  return (
    <div className="page">
      <PageHead
        eyebrow="Phần ba"
        title="Đại thắng mùa Xuân năm 1975"
        sub="Từ Hiệp định Paris đến ngày 30/4, ba chiến dịch nối nhau với nhịp độ dồn dập đã giải phóng hoàn toàn miền Nam."
      />

      <section className="section"><div className="wrap">
        <SecHead n="4" title="Hoàn cảnh & thời cơ" />
        <Reveal><p className="lead">
          Sau Hiệp định Paris, lực lượng cách mạng ngày càng lớn mạnh. Đầu năm 1975, Bộ Chính trị nhận định:
        </p></Reveal>
        <Reveal><div className="quote" style={{ marginTop: 22 }}>
          <span className="qm">”</span>
          <p>
            So sánh lực lượng đã thay đổi có lợi cho cách mạng; thời cơ chiến lược xuất hiện. Nếu thời cơ đến,
            phải giải phóng miền Nam ngay trong năm 1975.
          </p>
          <div className="by">Nhận định của Bộ Chính trị — đầu năm 1975</div>
        </div></Reveal>
        <Reveal><p className="lead">
          Đây là quyết định thể hiện sự nhạy bén trong đánh giá tình hình và khả năng nắm bắt thời cơ của Đảng.
        </p></Reveal>
      </div></section>

      <section className="section" style={{ background: "#fff", borderTop: "1px solid var(--kem-dam)" }}>
        <div className="wrap">
          <SecHead n="5" title="Ba chiến dịch quyết định" />
          <div className="tl">
            {camps.map((c, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="tl-item">
                  <div className="tl-dot" style={c.final ? { background: "var(--vang)", borderColor: "var(--do)" } : {}}>
                    <Star cls="st" fill={c.final ? "var(--do)" : "var(--vang)"} />
                  </div>
                  <div className="tl-when">{c.when}</div>
                  <div className="tl-name">{c.name}</div>
                  <div className="tl-card" style={c.final ? { borderColor: "var(--do)", borderWidth: 2 } : {}}>
                    {c.muc && <div className="kv"><div className="k">Mục tiêu</div><div className="v">{c.muc}</div></div>}
                    <div className="kv"><div className="k">{c.final ? "Diễn biến" : "Diễn biến nổi bật"}</div>
                      <div className="v"><ul className="bullets">{c.dien.map((d) => <li key={d}>{d}</li>)}</ul></div></div>
                    <div className="kv"><div className="k">Ý nghĩa</div><div className="v kicker" style={{ marginTop: 0 }}>{c.y}</div></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Gallery items={[
            {
              src: imgXeTang,
              alt: "Xe tăng Quân Giải phóng tiến vào Dinh Độc Lập trưa 30/4/1975",
              cap: "Xe tăng Quân Giải phóng tiến vào Dinh Độc Lập, trưa 30/4/1975.",
              credit: "Nguồn: Ảnh tư liệu – TTXVN",
            },
            {
              src: imgDamDong,
              alt: "Nhân dân Sài Gòn và bộ đội mừng ngày giải phóng trước Dinh Độc Lập",
              cap: "Nhân dân Sài Gòn hòa cùng đoàn quân giải phóng mừng ngày toàn thắng.",
              credit: "Nguồn: Ảnh tư liệu – TTXVN",
            },
          ]} />

          <Reveal><div className="quote" style={{ marginTop: 30, background: "var(--do)" }}>
            <p style={{ fontFamily: "'Oswald',sans-serif", textTransform: "uppercase", fontSize: 22, letterSpacing: ".02em" }}>
              30/4/1975 — Đại thắng mùa Xuân kết thúc thắng lợi cuộc kháng chiến chống Mỹ cứu nước.
            </p>
          </div></Reveal>
        </div>
      </section>

      <Flow go={go} prev={PAGES[2]} next={PAGES[4]} />
    </div>
  );
}

/* ===================== Ý NGHĨA & BÀI HỌC ===================== */
function YNghia({ go }) {
  const lessons = [
    "Kiên định mục tiêu độc lập dân tộc gắn liền với chủ nghĩa xã hội.",
    "Giữ vững vai trò lãnh đạo của Đảng.",
    "Phát huy sức mạnh đại đoàn kết toàn dân.",
    "Kết hợp sức mạnh dân tộc với sức mạnh thời đại.",
    "Chủ động tạo thời cơ và kịp thời nắm bắt thời cơ chiến lược.",
    "Kết hợp linh hoạt đấu tranh chính trị, quân sự và ngoại giao.",
  ];
  return (
    <div className="page">
      <PageHead
        eyebrow="Phần bốn"
        title="Nguyên nhân, ý nghĩa và bài học"
        sub="Vì sao thắng lợi, thắng lợi ấy có ý nghĩa gì, và để lại những bài học nào cho mai sau."
      />

      <section className="section"><div className="wrap">
        <SecHead n="6" title="Nguyên nhân thắng lợi" />
        <div className="grid g2">
          <Reveal><div className="card">
            <span className="tag">Chủ quan</span>
            <ul className="bullets">
              <li>Sự lãnh đạo đúng đắn của Đảng Cộng sản Việt Nam.</li>
              <li>Khối đại đoàn kết toàn dân tộc.</li>
              <li>Ý chí độc lập, tự do và tinh thần chiến đấu kiên cường.</li>
              <li>Miền Bắc là hậu phương lớn vững chắc.</li>
            </ul>
          </div></Reveal>
          <Reveal delay={80}><div className="card gold">
            <span className="tag" style={{ background: "var(--vang-dam)" }}>Khách quan</span>
            <ul className="bullets">
              <li>Sự đoàn kết của ba nước Đông Dương.</li>
              <li>Sự ủng hộ của Liên Xô, Trung Quốc và các nước xã hội chủ nghĩa.</li>
              <li>Phong trào hòa bình, phản chiến trên thế giới và ngay tại Hoa Kỳ.</li>
            </ul>
          </div></Reveal>
        </div>
      </div></section>

      <section className="section" style={{ background: "#fff", borderTop: "1px solid var(--kem-dam)", borderBottom: "1px solid var(--kem-dam)" }}>
        <div className="wrap">
          <SecHead n="7" title="Ý nghĩa lịch sử" />
          <div className="grid g2">
            <Reveal><div className="card">
              <h4><Star cls="st" /> Đối với Việt Nam</h4>
              <ul className="bullets">
                <li>Kết thúc 30 năm chiến tranh giải phóng dân tộc.</li>
                <li>Hoàn thành sự nghiệp giải phóng miền Nam.</li>
                <li>Thống nhất đất nước.</li>
                <li>Mở ra thời kỳ cả nước đi lên chủ nghĩa xã hội.</li>
              </ul>
            </div></Reveal>
            <Reveal delay={80}><div className="card gold">
              <h4><Star cls="st" fill="var(--vang-dam)" /> Đối với thế giới</h4>
              <ul className="bullets">
                <li>Cổ vũ mạnh mẽ phong trào giải phóng dân tộc.</li>
                <li>Góp phần làm suy yếu chủ nghĩa thực dân kiểu mới.</li>
                <li>Khẳng định sức mạnh của một dân tộc nhỏ trước một cường quốc quân sự.</li>
              </ul>
            </div></Reveal>
          </div>
        </div>
      </section>

      <section className="section"><div className="wrap">
        <SecHead n="8" title="Bài học kinh nghiệm" />
        <div className="grid g3">
          {lessons.map((l, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="card" style={{ borderLeftColor: i % 2 ? "var(--vang-dam)" : "var(--do)" }}>
                <div className="display" style={{ color: i % 2 ? "var(--vang-dam)" : "var(--do)", fontSize: 26, fontWeight: 700, lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p style={{ margin: "10px 0 0", fontSize: 15, lineHeight: 1.55 }}>{l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div></section>

      <Flow go={go} prev={PAGES[3]} next={PAGES[5]} />
    </div>
  );
}

/* ===================== TỔNG KẾT ===================== */
function TongKet({ go }) {
  return (
    <div className="page">
      <PageHead eyebrow="Phần năm" title="Tổng kết" />
      <section className="section"><div className="wrap">
        <SecHead n="9" title="Mốc son chói lọi" />
        <Reveal><div className="quote" style={{ marginTop: 24 }}>
          <span className="qm">”</span>
          <p>
            Đại thắng mùa Xuân năm 1975 là mốc son chói lọi trong lịch sử dân tộc Việt Nam — kết quả của quá trình
            lãnh đạo đúng đắn của Đảng, sức mạnh đoàn kết toàn dân tộc và sự kết hợp giữa hậu phương miền Bắc với
            tiền tuyến miền Nam.
          </p>
        </div></Reveal>
        <Reveal><p className="lead">
          Chiến thắng đã hoàn thành sự nghiệp giải phóng dân tộc, thống nhất đất nước và mở ra kỷ nguyên mới —
          kỷ nguyên độc lập, thống nhất và đi lên chủ nghĩa xã hội.
        </p></Reveal>

        <Reveal><Parallel label="Việt Nam thống nhất" /></Reveal>

        <Reveal><div style={{ textAlign: "center", marginTop: 28 }}>
          <Star cls="" fill="var(--do)" />
          <div style={{ width: 64, height: 64, margin: "0 auto" }}><Star fill="var(--do)" /></div>
          <button className="btn btn-solid" style={{ marginTop: 24, background: "var(--do)", color: "#fff", borderColor: "var(--do)" }}
            onClick={() => go("home")}>↑ Về trang chủ</button>
        </div></Reveal>
      </div></section>
    </div>
  );
}

/* ===================== APP ===================== */
export default function App() {
  const [page, setPage] = useState("home");
  const [open, setOpen] = useState(false);

  const go = (id) => {
    setPage(id);
    setOpen(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "auto" });
  };

  const idx = PAGES.findIndex((p) => p.id === page);
  const prev = idx > 0 ? PAGES[idx - 1] : null;
  const next = idx < PAGES.length - 1 ? PAGES[idx + 1] : null;

  return (
    <div className="app">
      <style>{STYLE}</style>

      <nav className="nav">
        <div className="nav-inner">
          <button className="brand" onClick={() => go("home")} aria-label="Về trang chủ">
            <div className="brand-star"><Star /></div>
            <div className="brand-txt"><b>Chương 2</b><span>1954 – 1975</span></div>
          </button>
          <div className="nav-links">
            {PAGES.map((p) => (
              <button key={p.id} className={page === p.id ? "on" : ""} onClick={() => go(p.id)}>{p.label}</button>
            ))}
          </div>
          <button className="burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">≡</button>
        </div>
        {open && (
          <div className="mobile-menu">
            {PAGES.map((p) => (
              <button key={p.id} className={page === p.id ? "on" : ""} onClick={() => go(p.id)}>{p.label}</button>
            ))}
          </div>
        )}
      </nav>

      {page === "home" && <Home go={go} />}
      {page === "boicanh" && <BoiCanh go={go} />}
      {page === "dienbien" && <DienBien go={go} />}
      {page === "daithang" && <DaiThang go={go} />}
      {page === "ynghia" && <YNghia go={go} />}
      {page === "tongket" && <TongKet go={go} />}

      <footer className="foot">
        <div className="wrap">
          <div>
            <b>Chương 2 · 1954 – 1975</b>
            <div><small>Đảng lãnh đạo kháng chiến chống Mỹ, giải phóng miền Nam, thống nhất đất nước.</small></div>
          </div>
          <small>Nội dung biên soạn theo tài liệu môn học · Website minh họa</small>
        </div>
      </footer>
    </div>
  );
}
