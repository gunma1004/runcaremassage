import Link from 'next/link';
import type { Metadata } from "next";
import { regionData } from "@/lib/regions";

const SITE_URL = "https://runcaremassage.netlify.app";
const SITE_NAME = "런케어마사지";
const SUPPORT_PHONE = "0507-1280-3199";

export const metadata: Metadata = {
  title: `경기 출장 케어 마사지 & 프리미엄 홈타이 테라피 안내 | ${SITE_NAME}`,
  description: "경기도 전 지역 동·읍·면별 출장마사지 및 타이·아로마·스웨디시 테라피 안내. 100% 안심 현장 후불제 시스템으로 25분 내 빠른 방문 힐링 코스.",
  alternates: {
    canonical: `${SITE_URL}/gyeonggi`,
  },
  openGraph: {
    title: `경기 출장 케어 마사지 & 프리미엄 홈타이 테라피 안내 | ${SITE_NAME}`,
    description: "경기도 전 지역 세부 동·읍·면별 출장마사지 및 타이·아로마·스웨디시 테라피 정보를 편리하게 확인하세요.",
    url: `${SITE_URL}/gyeonggi`,
    siteName: `${SITE_NAME} (RunCareMassage)`,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "런케어마사지 경기도 전지역 프라이빗 테라피",
      },
    ],
  },
};

export default function GyeonggiRegionPage() {
  const gyeonggiDistricts = regionData.gyeonggi?.districts || {};
  const districtEntries = Object.entries(gyeonggiDistricts);

  // 🌟 Schema.org @graph 경기도 teko pyahu
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/gyeonggi#breadcrumb`,
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
            "name": "경기도 출장 홈케어 안내",
            "item": `${SITE_URL}/gyeonggi`
          }
        ]
      },
      {
        "@type": "HealthAndBeautyBusiness",
        "@id": `${SITE_URL}/gyeonggi#business`,
        "name": `경기도 출장 케어 마사지 - ${SITE_NAME}`,
        "description": "경기도 전 지역(수원·성남·고양·용인·화성·부천 등) 출장마사지 케어 및 타이·아로마·스웨디시 방문 테라피 안내. 선입금 없는 100% 현장 후불제.",
        "url": `${SITE_URL}/gyeonggi`,
        "telephone": SUPPORT_PHONE,
        "image": `${SITE_URL}/og-main.png`,
        "priceRange": "60,000원~",
        "currenciesAccepted": "KRW",
        "paymentAccepted": "Cash, Credit Card (100% 현장 후불제)",
        "openingHours": "Mo-Su 00:00-24:00",
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": "경기도"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "경기도",
          "addressRegion": "경기",
          "addressCountry": "KR"
        }
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/gyeonggi#districts`,
        "name": "경기도 시·군·구 행정구역 출장 케어 디렉토리",
        "numberOfItems": districtEntries.length,
        "itemListElement": districtEntries.map(([distKey, distVal], idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": `${distVal.name} 출장마사지 케어`,
          "url": `${SITE_URL}/gyeonggi/${distKey}`
        }))
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/gyeonggi#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "경기도 전지역 도착 소요 시간은 얼마나 걸리나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "수원, 성남, 고양, 용인, 화성, 부천 등 경기도 주요 시·군 전역 평균 25분~35분 내외로 전문 테라피스트가 신속하게 방문합니다."
            }
          },
          {
            "@type": "Question",
            "name": "경기 외곽 지역 이용 시 추가 출장비나 예약금이 있나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "런케어마사지는 선입금 없는 100% 현장 후불 정찰제를 엄격히 고수하며, 사전 예약금이나 부당한 추가 요금을 일절 요구하지 않습니다."
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-amber-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 상단 헤더 */}
      <header className="bg-[#050505]/90 border-b border-amber-500/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center text-black font-black text-sm shadow-[0_0_12px_rgba(245,158,11,0.35)] group-hover:scale-105 transition-transform">
              런
            </div>
            <span className="text-xl font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              {SITE_NAME}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${SUPPORT_PHONE}`}
              className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all"
            >
              📞 24시 전화예약
            </a>
            <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors">
              &larr; 메인 홈으로
            </Link>
          </div>
        </div>
      </header>

      {/* 브레드크럼 */}
      <nav className="bg-[#0c0c0e] border-b border-white/5 py-3 px-4 text-xs text-gray-400">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <Link href="/" className="text-amber-400 hover:underline">홈</Link>
          <span>&gt;</span>
          <span className="text-gray-200">경기도 출장 홈케어 안내</span>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 */}
      <section className="max-w-6xl mx-auto py-10 px-4 space-y-10">
        <div className="bg-gradient-to-b from-[#141418] to-[#0a0a0c] border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-lg">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-bold px-3 py-1 rounded-full mb-3 inline-block">
            경기도 공식 런케어 가이드
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
            경기 시·군·구 전체 지역별 출장 홈케어 &amp; 테라피 안내
          </h1>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
            경기도 전 지역 세부 동·읍·면별 출장 방문 케어 및 타이·아로마·스웨디시 제휴처 정보를 편리하게 확인하세요. <br className="hidden md:block" />
            선입금 0원 100% 안심 후불제 시스템으로 25분 내 자택 및 호텔로 빠르게 방문합니다.
          </p>
        </div>

        {/* 경기도 전체 시·군 렌더링 카드 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <span className="w-2.5 h-5 bg-amber-400 rounded-full inline-block"></span>
              경기도 시·군·구별 세부 행정구역 바로가기
            </h2>
            <span className="text-xs text-gray-400">전체 생활권 완벽 수록</span>
          </div>

          {districtEntries.map(([districtKey, districtVal]) => (
            <div 
              key={districtKey} 
              className="bg-[#121214] border border-white/10 hover:border-amber-500/30 rounded-2xl p-5 md:p-6 shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-white/5">
                <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  {districtVal.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 hidden sm:inline">{districtVal.dongs.length}개 지역 등록</span>
                  <Link 
                    href={`/gyeonggi/${districtKey}`}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    {districtVal.name} 전체보기 &rarr;
                  </Link>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {districtVal.dongs.map((dong, idx) => (
                  <Link
                    key={idx}
                    href={`/gyeonggi/${districtKey}?dong=${encodeURIComponent(dong)}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-xl border border-white/10 bg-black/40 text-xs font-medium text-gray-300 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                  >
                    {dong}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 📚 경기도 웰니스 칼럼 */}
        <section className="bg-[#0e0e12] p-6 sm:p-10 rounded-3xl border border-white/10 space-y-10 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-5">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              GYEONGGI METROPOLITAN WELLNESS INSIGHT &amp; RECOVERY GUIDE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              경기 신도시 및 테크 밸리 생활권 맞춤 피로 회복과 바디 테라피 가이드
            </h2>
            <p className="text-gray-400 text-xs mt-1.5">
              광역 통근자의 척추·골반 근막 불균형, 고정 좌식 근무 피로의 생체역학적 원인과 1:1 홈케어 안전 이용 수칙
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">1.</span> 광역 통근과 테크 밸리 좌식 근무가 유발하는 근골격계 긴장 메커니즘
            </h3>
            <p>
              경기도는 판교 테크노밸리, 광교 신도시, 동탄 테크노밸리, 수원 삼성전자 나노시티, 고양 킨텍스 일대 등 대규모 IT·제조·연구 벨트가 집중되어 있는 광역 생활권입니다. 특히 경기권 주민들은 서울 및 도내 타 권역으로 매일 1시간 이상 광역버스, 지하철, 자가용을 이용해 장거리 통근을 지속하는 경우가 많습니다. 고정된 운전 좌석이나 출퇴근 대중교통 안에서 경직된 자세를 오래 유지하면 골반 주변의 중둔근, 대퇴이두근, 장요근에 지속적인 비대칭 장력이 실리게 됩니다.
            </p>
            <p>
              동시에 사무 공간에서 컴퓨터 모니터를 응시하며 키보드를 조작하는 장시간 좌식 작업은 경추의 전방 전위(거북목)와 흉추 후만을 필연적으로 가속화합니다. 머리의 하중 중심이 전방으로 기울어질 때마다 상부 승모근과 견갑거근은 늘어난 상태에서 버티는 원심성 수축 상태를 유지하게 됩니다. 이러한 만성 긴장은 근막 내부의 모세혈관을 눌러 혈액 순환을 방해하고, 젖산과 칼슘 이온 등 피로 물질이 배출되지 못하면서 단단한 통증 유발점(Trigger Point)을 고착화시켜 어깨 결림과 긴장성 두통을 유발합니다.
            </p>
            <p>
              체계적인 바디 컨디셔닝은 단순한 표면 마찰을 넘어 근육의 기시부와 정지부를 정밀하게 짚어주며 뭉친 연부조직의 온도를 점진적으로 높여줍니다. 경직되었던 혈관이 확장되어 산소와 영양분이 원활히 공급되면 축적된 피로 부산물이 빠르게 배출되어 상체 가동 범위와 유연성이 자연스럽게 회복됩니다.
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">2.</span> 도심 만성 피로와 교감신경 항진 상태에서의 자율신경계 밸런스 회복
            </h3>
            <p>
              고강도 업무 프로젝트와 복잡한 통근 동선에 노출된 현대인의 자율신경계는 교감신경이 지속적으로 과활성화된 긴장 국면에 놓이기 쉽습니다. 교감신경의 과항진은 말초 혈관 수축, 심박수 증가, 얕은 호흡을 초래하여 근육이 쉴 틈 없이 수축 상태를 유지하게 만듭니다. 이러한 신체화 증상이 장기화되면 만성 피로, 소화 불량, 불면증으로 이어지는 악순환이 고착화됩니다.
            </p>
            <p>
              전문 힐러에 의해 섬세하고 균일한 리듬으로 진행되는 이완 테라피는 피부 감각 수용기 중 마이스너 소체와 파치니 소체를 안정적으로 자극합니다. 이는 뇌로 전달되는 감각 신호를 차분히 가라앉혀 억제되어 있던 부교감신경을 즉각 활성화시킵니다. 심장 박동이 편안해지고 혈관이 확장되면서 체내 옥시토신과 세로토닌의 분비가 촉진됩니다.
            </p>
            <p>
              신체가 깊은 안정 상태에 진입하면 뇌파는 각성 상태인 베타파에서 편안한 명상 상태인 알파파 및 깊은 수면 상태인 세타파로 전환되어 피로를 리셋하고 면역계 세포의 자가 재생 작용을 돕습니다.
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">3.</span> 프로그램별 물리적 이완 기전 비교와 맞춤형 선택 기준
            </h3>
            <p>
              런케어마사지에서 제공하는 웰니스 프로그램은 사용하는 매개체와 자극의 깊이에 따라 각각 명확한 기능적 장점을 지닙니다. 당일 신체 컨디션과 선호하는 압의 강도에 맞추어 적절한 코스를 선택하는 것이 바람직합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-3">
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">클래식 건식 스트레칭 (타이 케어)</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  오일을 사용하지 않고 매트 위에서 진행되는 정통 기법으로, 압봉과 수기 압박을 결합하여 에너지 라인을 자극합니다. 장시간 운전이나 좌식 생활로 굳은 고관절, 햄스트링, 척추기립근의 가동 범위를 물리적으로 넓혀 전신을 시원하게 개방합니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">스웨디시 감성 바디 테라피</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  따뜻한 식물성 베이스 오일을 도포하여 마찰 저항을 없앤 상태에서 심장 방향으로 부드럽게 밀어 올리는 유러피언 테크닉입니다. 피부 표층의 미세 순환을 돕고 림프절을 자극하여 부종 완화와 깊은 감성적 안정감을 선사합니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">에센셜 아로마 림프 테라피</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  천연 식물 추출물의 후각적 아로마콜로지 효과를 접목한 코스입니다. 건조한 실내 환경에서 피부 보습 장벽을 보호하면서 정체된 림프 배농을 유도하여 만성 붓기 완화와 정서적 긴장 해소에 탁월합니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">심부 근막 집중 딥티슈 케어</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  표층 근육 너머 뼈와 인대에 맞닿아 있는 심부 근막의 단단한 유착 부위를 지속적인 수기 압력으로 풀어내는 코스입니다. 만성적인 목 어깨 결림이나 허리 뻐근함을 유발하는 원인점을 정밀하게 이완시켜 가벼운 신체 정렬을 복원합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">4.</span> 독립된 주거 및 숙소 공간에서 누리는 방문형 홈케어의 가치
            </h3>
            <p>
              로드샵을 방문하기 위해 시내 번화가로 다시 이동하는 과정은 교통 정체, 주차난, 대기 시간 등 또 다른 피로 요인을 발생시킵니다. 자택이나 호텔 객실 등 독립된 사적 공간에서 진행되는 프라이빗 홈케어는 이동에 소모되는 물리적 에너지를 보존하고 온전히 회복에만 집중할 수 있게 합니다.
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">5.</span> 안전하고 투명한 100% 현장 후불제 이용 수칙
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-gray-400 pl-2">
              <li><strong className="text-gray-200">선입금 0원 후불 정산:</strong> 사전 예약금 없이 관리사 도착 후 확인 결제합니다.</li>
              <li><strong className="text-gray-200">컨디션 사전 공유:</strong> 기저 질환이나 통증 부위를 사전에 전달하여 맞춤 케어를 받으시기 바랍니다.</li>
              <li><strong className="text-gray-200">미온수 섭취:</strong> 노폐물 배출을 돕기 위해 세션 후 따뜻한 물을 충분히 섭취하세요.</li>
            </ul>
          </div>

          <div className="pt-5 border-t border-white/5 text-[11px] text-gray-500">
            * 본 가이드는 경기도 전 지역(수원, 성남, 분당, 고양, 용인, 화성, 부천 등) 거주자 및 방문객 여러분의 올바른 신체 휴식과 안전한 안심 후불제 홈케어 정보 제공을 위해 작성되었습니다.
          </div>
        </section>
      </section>

      {/* 푸터 영역 */}
      <footer className="bg-[#030303] border-t border-white/10 py-10 text-center text-xs text-gray-500 mt-20">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p className="font-bold text-gray-400">
            {SITE_NAME} (RunCareMassage) · 경기도 전 지역 100% 안심 후불제 출장 케어
          </p>
          <p className="text-[11px]">
            © 2026 {SITE_NAME}. All rights reserved. (공식 웹사이트: {SITE_URL}/gyeonggi)
          </p>
        </div>
      </footer>
    </main>
  );
}