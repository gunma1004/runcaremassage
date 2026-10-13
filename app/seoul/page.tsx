import Link from 'next/link';
import type { Metadata } from "next";
import { regionData } from "@/lib/regions";

const SITE_URL = "https://runcaremassage.netlify.app";
const SITE_NAME = "런케어마사지";
const SUPPORT_PHONE = "0507-1280-3199";

export const metadata: Metadata = {
  title: `서울 출장 케어 마사지 & 프리미엄 홈타이 테라피 안내 | ${SITE_NAME}`,
  description: "서울 전 지역(25개 구) 출장마사지 케어 및 타이·아로마·스웨디시 테라피 안내. 선입금 없는 100% 안심 현장 후불제, 25분 내 빠른 방문 힐링 코스.",
  alternates: {
    canonical: `${SITE_URL}/seoul`,
  },
  openGraph: {
    title: `서울 출장 케어 마사지 & 프리미엄 홈타이 테라피 안내 | ${SITE_NAME}`,
    description: "서울 전 지역(25개 구) 출장마사지 케어 및 타이·아로마·스웨디시 테라피 정보를 편리하게 확인하세요.",
    url: `${SITE_URL}/seoul`,
    siteName: `${SITE_NAME} (RunCareMassage)`,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "런케어마사지 서울특별시 전지역 프라이빗 테라피",
      },
    ],
  },
};

export default function SeoulRegionPage() {
  const seoulDistricts = regionData.seoul?.districts || {};
  const districtEntries = Object.entries(seoulDistricts);

  // 🌟 네이버 및 구글 검색엔진 최적화 통합 @graph JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. 빵가루 탐색 경로
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/seoul#breadcrumb`,
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
            "name": "서울특별시 출장 홈케어 안내",
            "item": `${SITE_URL}/seoul`
          }
        ]
      },
      // 2. 서울 광역 로컬 비즈니스 정보
      {
        "@type": "HealthAndBeautyBusiness",
        "@id": `${SITE_URL}/seoul#business`,
        "name": `서울특별시 출장 케어 마사지 - ${SITE_NAME}`,
        "description": "서울 전 지역(25개 구) 출장마사지 케어 및 타이·아로마·스웨디시 테라피 안내. 선입금 없는 100% 안심 현장 후불제, 25분 내 신속 방문.",
        "url": `${SITE_URL}/seoul`,
        "telephone": SUPPORT_PHONE,
        "image": `${SITE_URL}/og-main.png`,
        "priceRange": "60,000원~",
        "currenciesAccepted": "KRW",
        "paymentAccepted": "Cash, Credit Card (100% 현장 후불제)",
        "openingHours": "Mo-Su 00:00-24:00",
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": "서울특별시"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "서울특별시",
          "addressRegion": "서울",
          "addressCountry": "KR"
        }
      },
      // 3. 서울 25개 자치구 색인 ItemList
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/seoul#districts`,
        "name": "서울특별시 25개 구 행정구역 출장 케어 디렉토리",
        "numberOfItems": districtEntries.length,
        "itemListElement": districtEntries.map(([distKey, distVal], idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": `${distVal.name} 출장마사지 케어`,
          "url": `${SITE_URL}/seoul/${distKey}`
        }))
      },
      // 4. 자주 묻는 질문 FAQ
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/seoul#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "서울 전지역 도착 소요 시간은 얼마나 걸리나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "강남, 서초, 송파, 마포, 영등포, 종로 등 서울 주요 25개 구 전역 평균 20분~30분 내외로 전문 테라피스트가 신속하게 방문합니다."
            }
          },
          {
            "@type": "Question",
            "name": "서울 출장 케어 이용 시 선입금이나 예약금이 있나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "런케어마사지는 선입금 사기 위험을 방지하기 위해 100% 현장 후불 정찰제를 엄격히 고수하고 있으며, 사전 입금을 일절 요구하지 않습니다."
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
              href="tel:0507-1280-3199"
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
          <span className="text-gray-200">서울특별시 출장 홈케어 안내</span>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 */}
      <section className="max-w-6xl mx-auto py-10 px-4 space-y-10">
        <div className="bg-gradient-to-b from-[#141418] to-[#0a0a0c] border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-lg">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-bold px-3 py-1 rounded-full mb-3 inline-block">
            서울특별시 공식 런케어 가이드
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
            서울 25개 구 전체 지역별 출장 홈케어 &amp; 테라피 안내
          </h1>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
            서울 전 지역(25개 구) 세부 동별 출장 방문 케어 및 타이·아로마·스웨디시 제휴처 정보를 편리하게 확인하세요. <br className="hidden md:block" />
            선입금 요구가 전혀 없는 100% 안심 후불제 시스템으로 25분 내 자택 및 호텔로 빠르게 방문합니다.
          </p>
        </div>

        {/* 25개 구 전체 렌더링 카드 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <span className="w-2.5 h-5 bg-amber-400 rounded-full inline-block"></span>
              서울 25개 구 행정구역별 바로가기
            </h2>
            <span className="text-xs text-gray-400">전체 25개 구역 안내</span>
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
                  <span className="text-xs text-gray-400 hidden sm:inline">{districtVal.dongs.length}개 동 등록</span>
                  <Link 
                    href={`/seoul/${districtKey}`}
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
                    href={`/seoul/${districtKey}?dong=${encodeURIComponent(dong)}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-xl border border-white/10 bg-black/40 text-xs font-medium text-gray-300 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                  >
                    {dong}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 📚 서울 광역 전문 웰니스 정보성 칼럼 */}
        <section className="bg-[#0e0e12] p-6 sm:p-10 rounded-3xl border border-white/10 space-y-10 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-5">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              SEOUL METROPOLITAN WELLNESS INSIGHT &amp; GUIDE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              서울 도심 라이프스타일 맞춤 신체 이완과 지속 가능한 웰니스 가이드
            </h2>
            <p className="text-gray-400 text-xs mt-1.5">
              과중한 좌식 생활로 유발되는 근막 유착 기전, 자율신경계 회복, 권역별 맞춤 테라피 선택 및 안전 이용 수칙
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">1.</span> 서울 도심 근무 환경과 상체 근골격계 긴장의 병리학적 기전
            </h3>
            <p>
              대한민국의 경제와 문화 중심지인 서울특별시는 고도의 지식 집약적 산업이 발달하여 전자기기와 컴퓨터를 활용한 정적 좌식 근무 비중이 압도적으로 높습니다. 강남권, 여의도 금융가, 종로 도심권, 가산·구로 디지털단지 등 주요 업무 지구의 직장인들은 하루 평균 8~10시간 이상 연속적으로 의자에 앉아 모니터를 주시하며, 이 과정에서 경추 전방 굴곡(거북목)과 흉추 후만, 라운드 숄더 자세를 필연적으로 형성하게 됩니다.
            </p>
            <p>
              머리의 위치가 전방으로 1인치 전위될 때마다 경추를 지탱하는 후두하근과 상부 승모근, 견갑거근에 가해지는 역학적 장력은 급격히 증가합니다. 지속적인 기계적 부하는 근육 내 미세 모세혈관을 압박하여 국소 허혈성 상태를 유발하며, 이는 근섬유 내부의 대사 부산물(젖산, 칼슘 이온 등) 배출을 저해하여 단단한 근막 통증 유발점(Trigger Point)을 고착화시킵니다. 결과적으로 견갑골 안쪽의 뻐근한 결림, 승모근의 만성 긴장, 그리고 뇌로 가는 혈류 흐름 저하로 인한 긴장성 두통과 만성 피로가 유발됩니다.
            </p>
            <p>
              정기적인 바디 밸런스 케어는 단순히 피부 겉면을 문지르는 마사지를 넘어, 경직된 근막의 기시부와 정지부를 따라 연부조직의 온도를 높이고 결을 따라 부드럽게 이완시키는 과학적 수기 기법을 적용합니다. 혈액과 림프 순환이 정상 궤도로 복원되면 신체 내부의 피로 물질이 빠르게 대사되어 본래의 관절 가동성과 유연한 상체 정렬을 되찾을 수 있습니다.
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">2.</span> 도심 만성 스트레스 상태에서 자율신경계 밸런스 회복의 중요성
            </h3>
            <p>
              바쁜 출퇴근길 지하철과 혼잡한 도로 교통, 촉박한 업무 마감 일정은 신체의 교감신경계를 만성 과활성화 상태(Fight or Flight)로 유지시킵니다. 교감신경의 지속적인 흥분은 혈중 코르티솔과 에피네프린 농도를 높이고, 혈관을 수축시켜 말초 순환 장애와 소화 불량, 불면증 등 자율신경 실조성 증상을 유발합니다.
            </p>
            <p>
              차분하고 정돈된 템포로 진행되는 감성 수기 테라피는 피부에 분포된 마이스너 소체와 파치니 소체 등 감각 수용기를 부드럽게 자극하여 중추신경계로 안정화 신호를 전달합니다. 이는 스트레스 상황에서 억제되어 있던 부교감신경계를 즉각 활성화하여 심장 박동을 안정화하고 혈관을 확장시키며, 체내 옥시토신과 엔도르핀 분비를 촉진합니다.
            </p>
            <p>
              신체가 진정한 이완 상태에 돌입하면 뇌파는 긴장 상태의 베타파에서 편안한 명상 상태인 알파파 및 깊은 수면 단계인 세타파로 전환됩니다. 이는 단순한 신체적 휴식을 넘어 뇌의 과열된 인지 기능을 정화하고 면역계를 재생시키는 필수적인 회복 기제로 작용합니다.
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">3.</span> 프로그램별 물리적 기전 비교와 나에게 맞는 코스 선택
            </h3>
            <p>
              런케어마사지에서 안내하는 웰니스 프로그램은 사용하는 매개체와 압의 깊이에 따라 각각 고유한 생리학적 특성을 지닙니다. 본인의 당일 신체 컨디션과 선호하는 압의 세기에 맞추어 최적의 프로그램을 선택하는 것이 중요합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-3">
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">클래식 건식 스트레칭 (타이 케어)</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  별도의 오일 도포 없이 진행되는 정통 기법으로, 압봉과 수기를 활용하여 인체 에너지 라인을 자극합니다. 요가 형태의 수동적 관절 신전을 통해 평소 사용하지 않던 햄스트링, 고관절 굴곡근, 둔근을 시원하게 늘려 전신 유연성을 극대화합니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">스웨디시 감성 바디 테라피</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  따뜻한 식물성 베이스 오일을 도포하여 마찰 저항을 없앤 후, 심장 방향으로 부드럽고 리드미컬하게 밀어 올리는 유러피언 정통 테크닉입니다. 근육 표층과 림프절을 부드럽게 자극하여 부종을 완화하고 통증 없는 깊은 감성 릴렉스를 선사합니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">에센셜 아로마 림프 테라피</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  천연 식물에서 추출한 순수 에센셜 오일의 후각적 아로마콜로지 효과를 접목한 코스입니다. 건조한 피부 장벽을 촉촉하게 보호하는 동시에 정체된 림프 배농을 유도하여 만성 붓기 완화와 정서적 안정에 탁월합니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">심부 근막 집중 딥티슈 케어</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  표층 근육 너머 깊은 곳에 위치한 심부 근막의 단단한 결절 부위를 지속적인 수기 압력으로 풀어내는 프로그램입니다. 만성적인 목 어깨 결림이나 허리 통증을 유발하는 원인점을 정밀하게 이완시켜 가벼운 몸 상태를 복원합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">4.</span> 프라이빗 1인 방문 케어가 제공하는 시간적·환경적 가치
            </h3>
            <p>
              기존의 로드샵 방문 방식은 도심의 복잡한 교통 정체, 주차 공간 부족, 대기 시간, 타인과의 불필요한 마주침 등 휴식을 취하러 가는 과정 자체에서 추가적인 피로를 발생시키기 쉽습니다.
            </p>
            <p>
              반면 자택이나 호텔 객실 등 독립된 사적 공간에서 진행되는 홈케어는 이동에 필요한 에너지 소모를 완전히 배제할 수 있습니다. 내가 가장 심리적 안정감을 느끼는 익숙한 조명과 온도가 갖춰진 공간에서 세션이 진행되므로 외부 방해 요소 없이 부교감신경이 빠르게 활성화됩니다.
            </p>
            <p>
              특히 세션이 종료된 후 환복이나 대중교통 이용 없이 곧바로 개인 침상에서 깊은 숙면으로 전환할 수 있어 이완된 신체 컨디션의 보존력이 월등히 높습니다. 야간 업무나 불규칙한 생활 주기를 가진 현대인들에게 가장 스마트한 자기 관리 방식으로 자리 잡고 있습니다.
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">5.</span> 안전하고 투명한 100% 현장 후불제 이용 수칙
            </h3>
            <p>
              런케어마사지는 소비자의 안전과 건전한 테라피 환경 조성을 최우선 가치로 삼고 있습니다. 모든 등록 제휴 파트너는 투명한 운영 수칙을 철저히 준수합니다.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-gray-400 pl-2">
              <li><strong className="text-gray-200">선입금 없는 100% 후불 결제:</strong> 예약 명목의 예약금, 예약 취소 보증금 등 어떠한 선입금도 요구하지 않으며, 전문 테라피스트가 고객님의 공간에 도착한 후 현장 결제로 진행됩니다.</li>
              <li><strong className="text-gray-200">기저 질환 사전 고지:</strong> 최근 관절 수술 병력, 디스크 질환, 임신, 급성 염증 등이 있는 경우 세션 시작 전 담당 힐러에게 공유하여 맞춤 압 조절을 진행하시기 바랍니다.</li>
              <li><strong className="text-gray-200">세션 후 충분한 수분 보충:</strong> 림프 순환을 통해 체내로 배출된 대사 노폐물이 땀과 소변으로 신속히 배설될 수 있도록 미온수를 500ml 이상 음용하시길 권장합니다.</li>
            </ul>
          </div>

          <div className="pt-5 border-t border-white/5 text-[11px] text-gray-500">
            * 본 가이드는 서울특별시 전역(25개 구) 고객 여러분의 올바른 신체 휴식과 안전한 안심 후불제 홈케어 정보 제공을 위해 런케어 리서치 팀에 의해 정기적으로 감수 및 발행됩니다.
          </div>
        </section>
      </section>

      {/* 푸터 영역 */}
      <footer className="bg-[#030303] border-t border-white/10 py-10 text-center text-xs text-gray-500 mt-20">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p className="font-bold text-gray-400">
            {SITE_NAME} (RunCareMassage) · 서울특별시 25개 구 100% 안심 후불제 출장 케어
          </p>
          <p className="text-[11px]">
            © 2026 {SITE_NAME}. All rights reserved. (공식 웹사이트: {SITE_URL}/seoul)
          </p>
        </div>
      </footer>
    </main>
  );
}