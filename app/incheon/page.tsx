import Link from 'next/link';
import type { Metadata } from "next";
import { regionData } from "@/lib/regions";

const SITE_URL = "https://runcaremassage.netlify.app";
const SITE_NAME = "런케어마사지";
const SUPPORT_PHONE = "0507-1280-3199";

export const metadata: Metadata = {
  title: `인천 출장 케어 마사지 & 프리미엄 홈타이 테라피 안내 | ${SITE_NAME}`,
  description: "인천 전 지역(송도·청라·부평·구월·영종 등) 세부 구·군별 출장 케어 및 타이·아로마·스웨디시 방문 테라피 안내. 100% 안심 현장 후불제 시스템.",
  alternates: {
    canonical: `${SITE_URL}/incheon`,
  },
  openGraph: {
    title: `인천 출장 케어 마사지 & 프리미엄 홈타이 테라피 안내 | ${SITE_NAME}`,
    description: "인천 전 지역 세부 구·군 및 동·면별 출장 케어, 타이·아로마·스웨디시 방문 테라피 정보를 편리하게 확인하세요.",
    url: `${SITE_URL}/incheon`,
    siteName: `${SITE_NAME} (RunCareMassage)`,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "런케어마사지 인천광역시 전지역 프라이빗 테라피",
      },
    ],
  },
};

export default function IncheonRegionPage() {
  const incheonDistricts = regionData.incheon?.districts || {};
  const districtEntries = Object.entries(incheonDistricts);

  // 🌟 Schema.org @graph 인천 teko pyahu
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/incheon#breadcrumb`,
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
            "name": "인천광역시 출장 홈케어 안내",
            "item": `${SITE_URL}/incheon`
          }
        ]
      },
      {
        "@type": "HealthAndBeautyBusiness",
        "@id": `${SITE_URL}/incheon#business`,
        "name": `인천광역시 출장 케어 마사지 - ${SITE_NAME}`,
        "description": "인천 전 지역(송도·청라·부평·구월·영종 등) 출장마사지 케어 및 타이·아로마·스웨디시 방문 테라피 안내. 선입금 없는 100% 현장 후불제.",
        "url": `${SITE_URL}/incheon`,
        "telephone": SUPPORT_PHONE,
        "image": `${SITE_URL}/og-main.png`,
        "priceRange": "60,000원~",
        "currenciesAccepted": "KRW",
        "paymentAccepted": "Cash, Credit Card (100% 현장 후불제)",
        "openingHours": "Mo-Su 00:00-24:00",
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": "인천광역시"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "인천광역시",
          "addressRegion": "인천",
          "addressCountry": "KR"
        }
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/incheon#districts`,
        "name": "인천광역시 구·군 행정구역 출장 케어 디렉토리",
        "numberOfItems": districtEntries.length,
        "itemListElement": districtEntries.map(([distKey, distVal], idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": `${distVal.name} 출장마사지 케어`,
          "url": `${SITE_URL}/incheon/${distKey}`
        }))
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/incheon#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "인천 전지역 도착 시간은 얼마나 걸리나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "송도, 청라, 부평, 구월, 영종도 등 인천 주요 권역 평균 25분~35분 내외로 전문 테라피스트가 신속하게 방문합니다."
            }
          },
          {
            "@type": "Question",
            "name": "인천 출장 케어 이용 시 추가 출장비나 예약금이 발생하나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "런케어마사지는 선입금 없는 100% 현장 후불 정찰제를 엄격히 준수하며, 사전 예약금이나 부당한 추가 요금을 일절 요구하지 않습니다."
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
          <span className="text-gray-200">인천광역시 출장 홈케어 안내</span>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 */}
      <section className="max-w-6xl mx-auto py-10 px-4 space-y-10">
        <div className="bg-gradient-to-b from-[#141418] to-[#0a0a0c] border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-lg">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-bold px-3 py-1 rounded-full mb-3 inline-block">
            인천광역시 공식 런케어 가이드
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
            인천 구·군 전체 지역별 출장 홈케어 &amp; 테라피 안내
          </h1>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
            인천 전 지역(송도, 청라, 부평, 구월, 영종 등) 세부 동·면별 출장 방문 케어 및 타이·아로마·스웨디시 제휴처 정보를 편리하게 확인하세요. <br className="hidden md:block" />
            선입금 0원 100% 안심 후불제 시스템으로 25분 내 자택 및 호텔로 빠르게 방문합니다.
          </p>
        </div>

        {/* 인천 전체 구·군 렌더링 카드 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <span className="w-2.5 h-5 bg-amber-400 rounded-full inline-block"></span>
              인천 행정구역별 세부 지역 바로가기
            </h2>
            <span className="text-xs text-gray-400">전체 구·군 완벽 안내</span>
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
                    href={`/incheon/${districtKey}`}
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
                    href={`/incheon/${districtKey}?dong=${encodeURIComponent(dong)}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-xl border border-white/10 bg-black/40 text-xs font-medium text-gray-300 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                  >
                    {dong}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 📚 인천 웰니스 칼럼 */}
        <section className="bg-[#0e0e12] p-6 sm:p-10 rounded-3xl border border-white/10 space-y-10 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-5">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              INCHEON METROPOLITAN WELLNESS INSIGHT &amp; GUIDE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              인천 생활권 특성에 맞춘 신체 피로 회복과 지속 가능한 바디 테라피 가이드
            </h2>
            <p className="text-gray-400 text-xs mt-1.5">
              국제도시와 산업 중심지의 생활 주기 분석, 교대 근무 및 장시간 이동 피로의 생리학적 완화 원리
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">1.</span> 신도시 오피스 환경 및 장시간 통근이 유발하는 근막 긴장의 기전
            </h3>
            <p>
              인천광역시는 송도·청라·영종 등 첨단 국제도시와 부평·남동공단·항만 배후단지 등 역동적인 산업 벨트가 공존하는 복합 거점입니다. 특히 서울과 수도권 타 권역으로 매일 장거리 통근을 반복하는 직장인들과 글로벌 비즈니스에 종사하는 전문직 인구의 비중이 매우 높습니다. 매일 1~2시간 이상 차량을 직접 운전하거나 만원 전철에서 경직된 자세로 서 있는 환경은 척추 정렬을 지탱하는 기립근과 골반 주변 장요근에 극심한 비대칭적 하중을 가합니다.
            </p>
            <p>
              오랜 시간 동안 시선을 고정하고 앉아있는 자세는 흉추의 신전 가동성을 급격히 저하시키며, 어깨가 전방으로 말리는 라운드 숄더 및 거북목 변형을 일으킵니다. 이때 목덜미를 지지하는 견갑거근과 상부 승모근은 정상 길이보다 늘어난 상태로 굳어지는 원심성 긴장 상태에 빠지게 됩니다. 혈관이 압박을 받아 혈액 순환이 지연되면 세포 내에 대사 부산물이 쌓여 만성적인 뻐근함과 결림 통증으로 이어집니다.
            </p>
            <p>
              정기적인 바디 밸런스 수기 요법은 뭉친 근섬유의 온도를 서서히 높이고 결을 따라 긴장을 풀어내어 모세혈관의 혈류 순환을 촉진합니다. 굳어있던 심부 근막이 제자리를 찾으면 신경 압박이 완화되어 목과 어깨의 회전 반경이 개운하게 복원됩니다.
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">2.</span> 교대 근무와 불규칙한 생활 주기에서의 자율신경계 회복 생리학
            </h3>
            <p>
              인천국제공항과 항만 물류, 첨단 제조 시설 등 24시간 교대 근무가 활발한 지역적 특성상, 수면 주기가 불규칙해져 체내 생체 시계가 교란되는 사례가 많습니다. 낮과 밤이 바뀌는 생활은 코르티솔과 멜라토닌 분비 밸런스를 무너뜨려 교감신경계를 만성적인 과각성 상태로 몰아넣습니다.
            </p>
            <p>
              차분하고 일정한 압력으로 진행되는 이완 테라피는 피부에 위치한 감각 수용기를 안정적으로 자극하여 중추신경계로 이완 신호를 전달합니다. 이는 흥분된 교감신경을 진정시키고 부교감신경을 즉각적으로 활성화하여 심장 박동수를 안정화하고 혈관을 확장시킵니다.
            </p>
            <p>
              신체가 깊은 안정 상태에 진입하면 뇌파가 각성 상태인 베타파에서 안정 상태인 알파파 및 수면 단계인 세타파로 전환되어 뇌의 피로를 리셋하고 면역 체계의 자가 치유 능력을 극대화합니다.
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">3.</span> 프로그램별 물리적 이완 기전 비교와 맞춤 선택 가이드
            </h3>
            <p>
              런케어마사지에서 제공하는 프로그램은 사용하는 테라피 기법과 물리적 깊이에 따라 뚜렷한 기능적 특성을 가집니다. 당일 신체의 피로 양상에 따라 알맞은 코스를 선택하시는 것이 안전하고 효과적입니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-3">
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">클래식 건식 스트레칭 (타이 케어)</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  오일을 사용하지 않고 매트 위에서 진행되는 정통 기법으로, 압박과 수동적 관절 신전 운동이 결합되어 굳어있는 하체와 척추기립근의 가동 범위를 넓혀줍니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">스웨디시 감성 바디 테라피</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  식물성 베이스 오일을 도포하여 심장 방향으로 부드럽게 밀어 올리는 유러피언 테크닉으로 림프 순환과 깊은 감성적 안정감을 제공합니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">에센셜 아로마 림프 테라피</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  천연 식물 추출물의 아로마콜로지 효과를 접목해 건조한 해안가 기후에서 피부 장벽을 보호하고 만성 붓기 완화에 도움을 줍니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">심부 근막 집중 딥티슈 케어</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  심부 근막의 단단한 유착 부위를 지속적인 수기 압력으로 풀어내어 만성 통증 포인트를 정밀하게 이완합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">4.</span> 호텔 객실 및 프라이빗 주거 공간에서 누리는 홈케어의 가치
            </h3>
            <p>
              송도국제업무단지나 영종 리조트 등 출장 비즈니스로 체류하는 분들이나 거주민들에게 방문형 홈케어는 이동 피로와 주차 스트레스 없이 온전히 휴식에만 집중할 수 있는 환경을 선사합니다. 세션 종료 후 즉시 편안한 수면으로 이어질 수 있어 회복 효율이 극대화됩니다.
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
            * 본 가이드는 인천광역시 전 지역 이용 고객 여러분의 안전하고 투명한 웰니스 서비스 이용을 위해 작성되었습니다.
          </div>
        </section>
      </section>

      {/* 푸터 영역 */}
      <footer className="bg-[#030303] border-t border-white/10 py-10 text-center text-xs text-gray-500 mt-20">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p className="font-bold text-gray-400">
            {SITE_NAME} (RunCareMassage) · 인천광역시 전 지역 100% 안심 후불제 출장 케어
          </p>
          <p className="text-[11px]">
            © 2026 {SITE_NAME}. All rights reserved. (공식 웹사이트: {SITE_URL}/incheon)
          </p>
        </div>
      </footer>
    </main>
  );
}