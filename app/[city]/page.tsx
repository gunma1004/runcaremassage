import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

const SITE_URL = "https://runcaremassage.netlify.app";
const SITE_NAME = "런케어마사지";
const SUPPORT_PHONE = "0507-1280-3199";

function getStableIndex(key: string, length: number): number {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % length;
}

const TITLE_TEMPLATES = [
  (city: string) => `${city} 출장 케어 마사지 | 권역별 24시 홈타이 테라피 안내 - ${SITE_NAME}`,
  (city: string) => `${city} 출장 베스트 마사지 런케어 | 24시간 신속 방문 홈타이 & 바디케어`,
  (city: string) => `${city} 전지역 출장 방문 마사지 | 100% 안심 후불제 프라이빗 케어 - ${SITE_NAME}`,
  (city: string) => `${city} 출장 프리미엄 홈타이 마사지 | 25분 도착 힐링 에스테틱 안내`,
  (city: string) => `${city} 출장 스웨디시 & 홈케어 마사지 | 24시 정찰제 예약 가이드`,
  (city: string) => `${city} 출장 아로마 마사지 & 타이 테라피 | 100% 현장 후불 결제 안내`,
  (city: string) => `${city} 출장 바디 케어 마사지 | 신속 방문 1:1 맞춤 홈타이 - ${SITE_NAME}`,
  (city: string) => `${city} 출장 힐링 테라피 마사지 | 선입금 없는 24시 방문 홈케어`,
  (city: string) => `${city} 출장 전구역 마사지 추천 | 스웨디시·타이 정찰제 안내 - ${SITE_NAME}`,
  (city: string) => `${city} 출장 프라이빗 마사지 케어 | 호텔·자택 25분 방문 홈타이`,
  (city: string) => `${city} 24시 출장 웰니스 마사지 | 피로 회복 전문 힐링 홈케어`,
  (city: string) => `${city} 출장 감성 스웨디시 마사지 | 안심 후불제 코스 요금표 안내`,
  (city: string) => `${city} 출장 전지역 방문 마사지 | 1:1 맞춤 림프 순환 케어 - ${SITE_NAME}`,
  (city: string) => `${city} 출장 VIP 바디 마사지 | 정통 건식 타이 & 아로마 힐링`,
  (city: string) => `${city} 출장 24시간 마사지 바로가기 | 수도권 신속 방문 후불제 - ${SITE_NAME}`,
  (city: string) => `${city} 출장 릴렉싱 마사지 코스 | 타이·스웨디시 100% 안심 현장결제`,
  (city: string) => `${city} 출장 프라이빗 테라피 마사지 | 25분 칼도착 힐링 홈케어`,
  (city: string) => `${city} 출장 이용요금 마사지 안내 | 투명한 정찰제 홈타이 - ${SITE_NAME}`,
  (city: string) => `${city} 출장 전지역 마사지 | 타이·아로마 맞춤 전담 관리`,
  (city: string) => `${city} 출장 딥티슈 마사지 | 24시 빠른 방문 테라피 - ${SITE_NAME}`,
  (city: string) => `${city} 출장 힐링 마사지 플랫폼 | 100% 후불제 안심 방문 예약 안내`,
  (city: string) => `${city} 출장 스웨디시 케어 마사지 | 내 집에서 편안한 힐링 테라피`,
  (city: string) => `${city} 출장 전역 마사지 센터 | 선입금 ZERO 정직한 홈타이`,
  (city: string) => `${city} 출장 감성 마사지 | 타이·아로마 25분 신속 도착 안내`,
  (city: string) => `${city} 출장 24시 마사지 전문점 | 안심 후불제 1:1 맞춤형 케어 - ${SITE_NAME}`,
  (city: string) => `${city} 출장 힐링 바디 마사지 | 전 구역 빠른 방문 홈타이 테라피`,
  (city: string) => `${city} 출장 프리미엄 테라피 마사지 | 투명한 정찰제 요금표 - ${SITE_NAME}`,
  (city: string) => `${city} 출장 홈케어 스웨디시 마사지 | 호텔 및 자택 24시 안심 호출`,
  (city: string) => `${city} 출장 안심 마사지 예약 센터 | 100% 현장결제 타이·아로마 안내`,
  (city: string) => `${city} 출장 프라이빗 바디 마사지 | 런케어 24시 공식 가이드`,
];

const DESCRIPTION_TEMPLATES = [
  (city: string) => `${city} 출장마사지 런케어마사지에서 확인하세요! ${city} 전 지역 24시간 신속 방문, 타이·아로마·스웨디시 코스 및 100% 안심 현장 후불제 안내.`,
  (city: string) => `${city} 출장마사지 전문 런케어입니다. 선입금 0원 100% 현장 결제 시스템으로 자택 및 호텔에 25분 내 빠르게 방문하는 맞춤 바디케어.`,
  (city: string) => `${city} 출장마사지 및 홈타이 코스 안내! 투명한 정찰제 요금과 숙련된 테라피스트의 1:1 집중 관리로 하루의 묵은 피로를 시원하게 풀어드립니다.`,
  (city: string) => `${city} 출장마사지 추천 런케어마사지! ${city} 전역 시·군·구 어디서나 24시간 연중무휴 안심 호출, 타이와 스웨디시 힐링 테라피.`,
  (city: string) => `${city} 출장마사지 선입금 없는 안심 후불제! 도착 후 확인 결제하는 안전 시스템과 25분 내 신속한 방문 서비스로 편안한 휴식을 누려보세요.`,
  (city: string) => `${city} 출장마사지 가격 및 코스 비교! 베이직 건식 타이부터 프리미엄 아로마, 감성 스웨디시까지 투명한 정찰제 비용을 한눈에 제공합니다.`,
  (city: string) => `${city} 출장마사지 24시 실시간 예약 안내. ${city} 전역 고객님이 계신 개인 공간으로 전문 관리사가 빠르게 방문하여 프라이빗 케어를 제공합니다.`,
  (city: string) => `${city} 출장마사지 믿을 수 있는 100% 현장 후불제. 예약금 요구가 일절 없는 정직한 시스템으로 타이와 아로마 테라피를 안심하고 이용하세요.`,
  (city: string) => `${city} 출장마사지 런케어 공식 사이트입니다. ${city} 관할 전 지역 25분 도착 보장, 림프 순환 스웨디시 및 전신 스트레칭 프로그램.`,
  (city: string) => `${city} 출장마사지 도심 속 힐링 솔루션! 번거로운 외출 없이 집이나 숙소에서 편안하게 누리는 1:1 맞춤형 출장 홈케어 테라피.`,
  (city: string) => `${city} 출장마사지 투명한 표준 요금 안내. 심야 할증 없는 정찰제와 철저한 위생 관리로 만족도 높은 프리미엄 바디 테라피를 선사합니다.`,
  (city: string) => `${city} 출장마사지 빠른 방문 런케어마사지. ${city} 주요 생활권 및 외곽 지역까지 25분 내 신속 배치, 선입금 ZERO 안심 예약 시스템.`,
  (city: string) => `${city} 출장마사지 프리미엄 홈타이 코스. 지친 직장인과 교대 근무자를 위한 맞춤형 이완 테라피 및 100% 현장 후불제 운영.`,
  (city: string) => `${city} 출장마사지 스웨디시 & 아로마 전문 안내. 최고급 천연 오일을 사용한 부드러운 감성 힐링과 전신 근막 이완 솔루션을 만나보세요.`,
  (city: string) => `${city} 출장마사지 24시간 예약 접수 중! ${city} 전 지역 자택, 오피스텔, 호텔 방문 가능, 도착 후 결제하는 안전 정찰제.`,
  (city: string) => `${city} 출장마사지 정통 타이 건식 케어부터 딥티슈 림프 케어까지, ${city} 전역 어디서나 25분 내 도착하는 안심 홈타이 플랫폼.`,
  (city: string) => `${city} 출장마사지 런케어만의 고품격 서비스. 불필요한 예약금 없이 계신 곳에서 편안하게 전화 한 통으로 이용하는 1:1 바디케어.`,
  (city: string) => `${city} 출장마사지 코스별 상세 시간과 비용 안내. ${city} 전역 세부 동별 빠른 방문 배정과 친절한 테라피스트 케어를 약속합니다.`,
  (city: string) => `${city} 출장마사지 100% 후불 결제 보장 안내. 사기 걱정 없는 투명한 예약 방식과 철저한 프라이버시 보호 시스템을 갖추고 있습니다.`,
  (city: string) => `${city} 출장마사지 전문 매니저 24시 대기! ${city} 전역 평균 25분 내 도착, 건식 스트레칭 및 아로마 테라피로 깊은 숙면을 유도합니다.`,
  (city: string) => `${city} 출장마사지 고객 만족도 1위 런케어마사지. ${city} 전 지역 생활권 맞춤 방문, 이동 시간 없이 내 공간에서 즐기는 힐링 스파.`,
  (city: string) => `${city} 출장마사지 안심 정찰제 서비스. 추가금 없는 정직한 요금표와 선입금 0원 원칙으로 ${city} 전 지역에서 편안하게 호출하세요.`,
  (city: string) => `${city} 출장마사지 및 프라이빗 홈케어 안내. 긴장된 어깨와 허리 근육을 부드럽게 이완시켜 드리는 1:1 전담 맞춤 테라피.`,
  (city: string) => `${city} 출장마사지 신속 예약 시스템! ${city} 전 지역 24시간 실시간 배정, 스웨디시·타이·아로마 코스를 현장 결제로 안심 이용하세요.`,
  (city: string) => `${city} 출장마사지 런케어에서 전하는 바디 테라피 가이드. 100% 현장 결제와 25분 빠른 출동으로 최상의 컨디션 회복을 도와드립니다.`,
  (city: string) => `${city} 출장마사지 편안한 휴식을 위한 선택! 번거로운 이동 없이 자택에서 즐기는 전문 테라피스트의 세심한 1:1 림프 순환 케어.`,
  (city: string) => `${city} 출장마사지 안심 방문 가이드. ${city} 전역 시·군·구 어디든 선입금 없는 후불제로 신속하게 찾아가는 고품격 홈타이.`,
  (city: string) => `${city} 출장마사지 정찰제 가격표 공개! 타이 60분부터 VIP 스페셜 코스까지 ${city} 전 지역 25분 내 빠른 방문을 약속합니다.`,
  (city: string) => `${city} 출장마사지 24시간 안심 호출 센터. 전문 교육을 이수한 테라피스트가 고객님의 공간으로 직접 방문하여 피로를 덜어드립니다.`,
  (city: string) => `${city} 출장마사지 런케어마사지 공식 안내. ${city} 전역 100% 현장 후불제, 25분 내 도착 보장, 타이·아로마·스웨디시 맞춤 힐링.`,
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city } = resolvedParams;
  const lowerCity = city.toLowerCase();
  const cityName = lowerCity === "seoul" ? "서울" : lowerCity === "incheon" ? "인천" : "경기";

  const titleIdx = getStableIndex(`${city}-title`, TITLE_TEMPLATES.length);
  const descIdx = getStableIndex(`${city}-desc`, DESCRIPTION_TEMPLATES.length);

  const finalTitle = TITLE_TEMPLATES[titleIdx](cityName);
  const finalDescription = DESCRIPTION_TEMPLATES[descIdx](cityName);

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}`,
    },
    keywords: [
      `${cityName} 출장마사지`,
      `${cityName}출장마사지`,
      `${cityName} 홈타이`,
      `${cityName} 스웨디시`,
      `${cityName} 테라피`,
      SITE_NAME
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}`,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city } = resolvedParams;
  const lowerCity = city.toLowerCase();
  const region = regionData[lowerCity];
  const cityName = lowerCity === "seoul" ? "서울" : lowerCity === "incheon" ? "인천" : "경기";
  const cityFullName = lowerCity === "seoul" ? "서울특별시" : lowerCity === "incheon" ? "인천광역시" : "경기도";

  const districts = Object.entries(region?.districts || {});

  // 🌟 Schema.org @graph teko pyahu
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/${city}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "홈",
            "item": SITE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": `${cityFullName} 출장 홈케어 안내`,
            "item": `${SITE_URL}/${city}`
          }
        ]
      },
      {
        "@type": "HealthAndBeautyBusiness",
        "@id": `${SITE_URL}/${city}#business`,
        "name": `${cityName} 출장 케어 마사지 - ${SITE_NAME}`,
        "description": `${cityName} 전 지역 100% 안심 현장 후불제 출장 홈타이 및 바디케어 서비스 안내.`,
        "url": `${SITE_URL}/${city}`,
        "telephone": SUPPORT_PHONE,
        "image": `${SITE_URL}/og-main.png`,
        "priceRange": "60,000원~",
        "currenciesAccepted": "KRW",
        "paymentAccepted": "Cash, Credit Card (100% 현장 후불제)",
        "openingHours": "Mo-Su 00:00-24:00",
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": cityFullName
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": cityName,
          "addressRegion": cityFullName,
          "addressCountry": "KR"
        }
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/${city}#districts`,
        "name": `${cityName} 관할 구·군 출장 케어 디렉토리`,
        "numberOfItems": districts.length,
        "itemListElement": districts.map(([distKey, distVal], idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": `${distVal.name} 출장마사지 케어`,
          "url": `${SITE_URL}/${city}/${distKey}`
        }))
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/${city}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `${cityName} 어디서든 당일 빠른 예약이 가능한가요?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "네, 24시간 연중무휴로 운영되며 전화나 문자로 계신 위치를 알려주시면 25분 내 도착 가능한 관리사를 즉시 연결해 드립니다."
            }
          },
          {
            "@type": "Question",
            "name": "결제는 언제 어떻게 하나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "런케어마사지는 선입금을 절대 받지 않습니다. 관리사가 방문한 후 현장에서 직접 확인하시고 결제하시면 됩니다."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 헤더 */}
      <header className="bg-[#050505]/90 border-b border-amber-500/20 backdrop-blur-xl sticky top-0 z-40 px-4 py-3">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-xs">런</span>
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">{SITE_NAME}</span>
          </Link>
          <div className="flex items-center gap-3">
            <a href={`tel:${SUPPORT_PHONE}`} className="text-xs font-bold text-black bg-gradient-to-r from-amber-500 to-yellow-400 px-3.5 py-1.5 rounded-xl">📞 24시 전화예약</a>
            <Link href="/" className="text-xs text-gray-400 hover:text-white">&larr; 메인 홈으로</Link>
          </div>
        </div>
      </header>

      {/* 브레드크럼 */}
      <nav className="bg-[#0c0c0e] border-b border-white/5 py-2.5 px-4 text-xs text-gray-400">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <Link href="/" className="text-amber-400 hover:underline">홈</Link>
          <span>&gt;</span>
          <span className="text-gray-200">{cityName} 출장 홈케어</span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 w-full flex-1 space-y-10">
        {/* 인트로 히어로 */}
        <section className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#141418] to-[#0a0a0c] p-6 md:p-10 space-y-3 shadow-lg">
          <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold px-3 py-1 rounded-full uppercase">
            {cityName} METRO GUIDE
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white">
            <span className="text-amber-400">{cityName}</span> 전 지역 출장 케어 마사지 &amp; 홈타이 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-300 max-w-2xl leading-relaxed">
            {cityName} 전역 시·군·구 및 세부 동별 출장 방문 케어 제휴처 정보를 편리하게 확인하세요. 
            선입금 없는 100% 안심 현장 후불제 시스템으로 고객님이 계신 곳까지 25분 내 빠르게 방문합니다.
          </p>
        </section>

        {/* 시·구·군 카드 및 관할 동 리스트 링크 트리 */}
        <section className="space-y-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <h2 className="text-lg md:text-xl font-black text-white flex items-center gap-2">
              <span className="text-amber-400">📍</span> {cityName} 관할 구·군 목록 ({districts.length}개 권역)
            </h2>
          </div>

          <div className="space-y-4">
            {districts.map(([distKey, distVal]) => (
              <div key={distKey} className="bg-[#121214] border border-white/10 hover:border-amber-500/30 rounded-2xl p-5 md:p-6 shadow-md transition-all">
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-white/5">
                  <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    {distVal.name}
                  </h3>
                  <Link 
                    href={`/${city}/${distKey}`}
                    className="text-xs font-bold text-amber-400 hover:underline"
                  >
                    {distVal.name} 전체보기 &rarr;
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {distVal.dongs.map((dongName, idx) => (
                    <Link
                      key={idx}
                      href={`/${city}/${distKey}/${encodeURIComponent(dongName)}`}
                      className="px-3 py-1.5 rounded-xl border border-white/10 bg-black/40 text-xs font-medium text-gray-300 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                    >
                      {dongName}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 품질 보증 섹션 */}
        <section className="bg-[#121214] border border-white/10 p-6 md:p-8 rounded-3xl space-y-4">
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <span className="text-amber-400">💎</span> {cityName} 런케어마사지 서비스 품질 보증
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-300 pt-2">
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1.5">
              <span className="font-bold text-amber-400 block text-sm">투명한 정찰제 운영</span>
              <p className="text-gray-400 leading-relaxed">
                모든 코스와 시간별 이용 요금을 사전에 투명하게 공개하며, 심야 추가 할증 없이 일정한 가격을 유지합니다.
              </p>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1.5">
              <span className="font-bold text-amber-400 block text-sm">광범위 방문 인프라</span>
              <p className="text-gray-400 leading-relaxed">
                {cityName} 주요 거점별 전문 테라피스트 대기 시스템으로 도심지뿐만 아니라 외곽 지역까지 신속하게 방문합니다.
              </p>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1.5">
              <span className="font-bold text-amber-400 block text-sm">프라이빗 1:1 홈케어</span>
              <p className="text-gray-400 leading-relaxed">
                외출할 필요 없이 고객님의 개인 공간에서 최고급 오일과 함께 조용하고 아늑한 힐링을 누리실 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ 섹션 */}
        <section className="bg-[#121214] border border-white/10 p-6 md:p-8 rounded-3xl space-y-4">
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <span className="text-amber-400">❓</span> {cityName} 출장 방문 케어 이용 안내 FAQ
          </h2>
          <div className="space-y-3 text-xs md:text-sm">
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1">
              <h3 className="font-bold text-amber-300">Q. {cityName} 어디서든 당일 빠른 예약이 가능한가요?</h3>
              <p className="text-gray-400 leading-relaxed">
                네, 24시간 연중무휴로 운영되며 전화나 문자로 계신 위치를 알려주시면 25분 내 도착 가능한 관리사를 즉시 연결해 드립니다.
              </p>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1">
              <h3 className="font-bold text-amber-300">Q. 결제는 언제 어떻게 하나요?</h3>
              <p className="text-gray-400 leading-relaxed">
                런케어마사지는 선입금을 절대 받지 않습니다. 관리사가 방문한 후 현장에서 직접 확인하시고 결제하시면 됩니다.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-[#030303] border-t border-white/10 py-8 text-center text-xs text-gray-500 mt-20">
        <p className="font-bold text-gray-400">{SITE_NAME} · {cityName} 100% 안심 후불제 출장 홈케어 안내</p>
        <p className="text-[11px] text-gray-600 mt-1">© 2026 {SITE_NAME}. All rights reserved.</p>
      </footer>
    </div>
  );
}