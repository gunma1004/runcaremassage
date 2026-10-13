"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 수도권 전체 행정구역 데이터
const RAW_METRO_DATA: Record<string, { name: string; districts: Record<string, { name: string; dongs: string[] }> }> = {
  seoul: {
    name: "서울특별시",
    districts: {
      gangnam: { name: "강남구", dongs: ["역삼동", "개포동", "청담동", "삼성동", "대치동", "신사동", "논현동", "압구정동", "세곡동", "자곡동", "일원동", "수서동", "도곡동"] },
      seocho: { name: "서초구", dongs: ["서초동", "잠원동", "반포동", "방배동", "양재동", "내곡동"] },
      songpa: { name: "송파구", dongs: ["잠실동", "풍납동", "거여동", "마천동", "방이동", "오금동", "송파동", "석촌동", "삼전동", "가락동", "문정동", "장지동", "위례동"] },
      gangdong: { name: "강동구", dongs: ["강일동", "상일동", "명일동", "고덕동", "암사동", "천호동", "성내동", "둔촌동"] },
      mapo: { name: "마포구", dongs: ["공덕동", "아현동", "도화동", "용강동", "대흥동", "염리동", "신수동", "서교동", "합정동", "망원동", "연남동", "성산동", "상암동"] },
      yongsan: { name: "용산구", dongs: ["후암동", "용산동", "남영동", "청파동", "원효로동", "효창동", "용문동", "이촌동", "이태원동", "한남동", "서빙고동", "보광동"] },
      yeongdeungpo: { name: "영등포구", dongs: ["영등포동", "여의도동", "당산동", "도림동", "문래동", "양평동", "신길동", "대림동"] },
      gangseo: { name: "강서구", dongs: ["염창동", "등촌동", "화곡동", "가양동", "마곡동", "발산동", "공항동", "방화동"] },
      gwanak: { name: "관악구", dongs: ["봉천동", "신림동", "남현동", "낙성대동", "보라매동"] },
      dongjak: { name: "동작구", dongs: ["노량진동", "상도동", "흑석동", "사당동", "대방동", "신대방동"] },
      guro: { name: "구로구", dongs: ["신도림동", "구로동", "가리봉동", "고척동", "개봉동", "오류동", "항동"] },
      geumcheon: { name: "금천구", dongs: ["가산동", "독산동", "시흥동"] },
      yangcheon: { name: "양천구", dongs: ["목동", "신월동", "신정동"] },
      seodaemun: { name: "서대문구", dongs: ["충현동", "천연동", "신촌동", "연희동", "홍제동", "홍은동", "남가좌동", "북가좌동"] },
      jongno: { name: "종로구", dongs: ["청운동", "효자동", "사직동", "삼청동", "평창동", "무악동", "교남동", "가회동", "이화동", "혜화동", "창신동", "숭인동"] },
      jung: { name: "중구", dongs: ["소공동", "회현동", "명동", "필동", "장충동", "광희동", "을지로동", "신당동", "다산동", "약수동", "청구동", "황학동"] },
      seongdong: { name: "성동구", dongs: ["왕십리동", "마장동", "사근동", "행당동", "응봉동", "금호동", "옥수동", "성수동", "송정동", "용답동"] },
      gwangjin: { name: "광진구", dongs: ["중곡동", "능동", "구의동", "광장동", "자양동", "화양동", "군자동"] },
      dongdaemun: { name: "동대문구", dongs: ["신설동", "용두동", "제기동", "전농동", "답십리동", "장안동", "청량리동", "회기동", "휘경동", "이문동"] },
      jungnang: { name: "중랑구", dongs: ["면목동", "상봉동", "중화동", "묵동", "망우동", "신내동"] },
      seongbuk: { name: "성북구", dongs: ["성북동", "삼선동", "동선동", "돈암동", "안암동", "보문동", "정릉동", "길음동", "종암동", "월곡동", "장위동", "석관동"] },
      gangbuk: { name: "강북구", dongs: ["미아동", "번동", "수유동", "우이동", "삼양동", "송중동"] },
      dobong: { name: "도봉구", dongs: ["쌍문동", "방학동", "창동", "도봉동"] },
      nowon: { name: "노원구", dongs: ["월계동", "공릉동", "하계동", "중계동", "상계동"] },
      eunpyeong: { name: "은평구", dongs: ["녹번동", "불광동", "갈현동", "구산동", "대조동", "응암동", "역촌동", "신사동", "증산동", "진관동"] }
    }
  },
  gyeonggi: {
    name: "경기도",
    districts: {
      suwon_jangan: { name: "수원시 장안구", dongs: ["파장동", "정자동", "영화동", "송죽동", "조원동", "율천동"] },
      suwon_gwonseon: { name: "수원시 권선구", dongs: ["세류동", "권선동", "곡선동", "평동", "호매실동", "서둔동", "금곡동"] },
      suwon_paldal: { name: "수원시 팔달구", dongs: ["매교동", "매산동", "고등동", "화서동", "지동", "우만동", "인계동"] },
      suwon_yeongtong: { name: "수원시 영통구", dongs: ["매탄동", "원천동", "영통동", "망포동", "광교동"] },
      seongnam_bundang: { name: "성남시 분당구", dongs: ["분당동", "수내동", "정자동", "서현동", "이매동", "야탑동", "금곡동", "구미동", "판교동", "백현동", "운중동"] },
      seongnam_sujeong: { name: "성남시 수정구", dongs: ["신흥동", "태평동", "수진동", "단대동", "산성동", "복정동", "위례동"] },
      seongnam_jungwon: { name: "성남시 중원구", dongs: ["성남동", "중앙동", "금광동", "은행동", "상대원동", "하대원동", "도촌동"] },
      goyang_ilsandong: { name: "고양시 일산동구", dongs: ["식사동", "중산동", "정발산동", "풍산동", "백석동", "마두동", "장항동"] },
      goyang_ilsanseo: { name: "고양시 일산서구", dongs: ["일산동", "탄현동", "주엽동", "대화동", "송포동", "덕이동"] },
      goyang_deogyang: { name: "고양시 덕양구", dongs: ["원신동", "흥도동", "효자동", "행신동", "화정동", "고양동", "관산동"] },
      yongin_suji: { name: "용인시 수지구", dongs: ["풍덕천동", "신봉동", "죽전동", "동천동", "상현동", "성복동"] },
      yongin_giheung: { name: "용인시 기흥구", dongs: ["신갈동", "마북동", "동백동", "보정동", "상갈동", "구갈동", "보라동"] },
      yongin_cheoin: { name: "용인시 처인구", dongs: ["포곡읍", "모현읍", "남사읍", "원삼면", "역삼동", "유림동"] },
      bucheon_wonmi: { name: "부천시 원미구", dongs: ["심곡동", "원미동", "소사동", "역곡동", "중동", "상동", "약대동"] },
      bucheon_sosa: { name: "부천시 소사구", dongs: ["소사본동", "범박동", "옥길동", "괴안동", "송내동"] },
      bucheon_ojeong: { name: "부천시 오정구", dongs: ["오정동", "고강동", "원종동", "성곡동"] },
      hwaseong: { name: "화성시", dongs: ["동탄동", "병점동", "봉담읍", "향남읍", "남양읍", "새솔동", "진안동"] },
      namyangju: { name: "남양주시", dongs: ["다산동", "별내동", "평내동", "호평동", "와부읍", "진접읍", "화도읍", "오남읍"] },
      hanam: { name: "하남시", dongs: ["미사동", "위례동", "신장동", "덕풍동", "감일동"] },
      gimpo: { name: "김포시", dongs: ["구래동", "장기동", "운양동", "마산동", "풍무동", "사우동", "고촌읍"] },
      pyeongtaek: { name: "평택시", dongs: ["비전동", "고덕동", "서정동", "동삭동", "송탄동", "안중읍", "포승읍"] },
      siheung: { name: "시흥시", dongs: ["배곧동", "정왕동", "은계동", "목감동", "대야동", "신천동", "은행동"] },
      paju: { name: "파주시", dongs: ["운정동", "교하동", "금촌동", "문산읍", "조리읍"] },
      uijeongbu: { name: "의정부시", dongs: ["의정부동", "호원동", "장암동", "신곡동", "송산동", "민락동"] },
      gwangmyeong: { name: "광명시", dongs: ["철산동", "하안동", "소하동", "광명동", "일직동"] }
    }
  },
  incheon: {
    name: "인천광역시",
    districts: {
      yeonsu: { name: "연수구", dongs: ["송도동", "옥련동", "선학동", "연수동", "청학동", "동춘동"] },
      namdong: { name: "남동구", dongs: ["구월동", "간석동", "만수동", "서창동", "논현동", "논현고잔동"] },
      bupyeong: { name: "부평구", dongs: ["부평동", "산곡동", "청천동", "갈산동", "삼산동", "부개동", "십정동"] },
      seohae: { name: "서구", dongs: ["청라동", "검단동", "원당동", "아라동", "가정동", "석남동", "연희동", "당하동"] },
      michuhol: { name: "미추홀구", dongs: ["주안동", "용현동", "학익동", "숭의동", "도화동", "관교동", "문학동"] },
      gyeyang: { name: "계양구", dongs: ["계산동", "작전동", "효성동", "작전서운동", "계양동"] },
      yeongjong: { name: "중구(영종)", dongs: ["운서동", "중산동", "운남동", "영종동", "신포동", "연안동"] }
    }
  }
};

const BUSINESSES = [
  { id: 1, name: "한국골든테라피", city: "서울특별시", district: "강남구", dong: "개포동", category: "스웨디시·홈타이", address: "수도권 전지역 25분 칼도착", phone: "0507-1280-3361", price: "60분 110,000원~", image: "/shop1.jpg" },
  { id: 2, name: "한국미인테라피", city: "서울특별시", district: "강남구", dong: "개포동", category: "아로마·스웨디시", address: "선입금 없는 100% 현장결제", phone: "0507-1280-3303", price: "90분 100,000원~", image: "/shop2.jpg" },
  { id: 3, name: "주주테라피", city: "서울특별시", district: "강남구", dong: "개포동", category: "건식타이·아로마", address: "재방문율 1위 만족도 보장", phone: "0507-1280-3193", price: "60분 60,000원~", image: "/shop3.jpg" },
  { id: 4, name: "퀸즈홈테라피", city: "서울특별시", district: "강남구", dong: "개포동", category: "VIP 감성케어", address: "여왕처럼 누리는 프라이빗 스파", phone: "0507-1280-3334", price: "60분 60,000원~", image: "/shop4.jpg" },
  { id: 5, name: "오늘밤테라피", city: "서울특별시", district: "강남구", dong: "개포동", category: "야간 심야 24시", address: "깊은 밤 피로를 날리는 힐링", phone: "0507-1280-3223", price: "60분 60,000원~", image: "/shop5.jpg" }
];

export default function HomeThaiZonePage() {
  const router = useRouter();

  const [cityKey, setCityKey] = useState<string>("seoul");
  const [districtKey, setDistrictKey] = useState<string>("gangnam");
  const [selectedDong, setSelectedDong] = useState<string>("개포동");

  const currentCity = RAW_METRO_DATA[cityKey];
  const districts = currentCity?.districts || {};
  const currentDistrict = districts[districtKey];
  const dongs = currentDistrict?.dongs || [];

  // 🌟 네이버 및 구글 검색엔진 최적화 통합 @graph JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://runcaremassage.netlify.app/#website",
        "url": "https://runcaremassage.netlify.app",
        "name": "런케어마사지",
        "alternateName": ["런케어", "서울 출장 케어 런케어"],
        "description": "프라이빗 케어 전문 서울 출장마사지 런케어입니다. 경기 및 인천 전지역 방문 테라피 안내.",
        "inLanguage": "ko-KR",
        "publisher": {
          "@id": "https://runcaremassage.netlify.app/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://runcaremassage.netlify.app/#organization",
        "name": "런케어마사지",
        "url": "https://runcaremassage.netlify.app",
        "logo": "https://runcaremassage.netlify.app/logo.png",
        "telephone": "0507-1280-3199",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "0507-1280-3199",
          "contactType": "customer service",
          "areaServed": "KR",
          "availableLanguage": "Korean"
        }
      },
      {
        "@type": "HealthAndBeautyBusiness",
        "@id": "https://runcaremassage.netlify.app/#business",
        "name": "서울 출장 케어 마사지 - 런케어",
        "description": "프라이빗 케어 전문 서울 출장마사지 런케어입니다. 경기 및 인천 전지역 방문 테라피, 스웨디시·아로마·타이 힐링 코스 및 투명한 100% 현장후불 정찰제 안내.",
        "url": "https://runcaremassage.netlify.app",
        "telephone": "0507-1280-3199",
        "image": "https://runcaremassage.netlify.app/og-main.png",
        "priceRange": "60,000원~",
        "currenciesAccepted": "KRW",
        "paymentAccepted": "Cash, Credit Card (100% 현장 후불제)",
        "openingHours": "Mo-Su 00:00-24:00",
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "서울특별시" },
          { "@type": "AdministrativeArea", "name": "경기도" },
          { "@type": "AdministrativeArea", "name": "인천광역시" }
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "서울특별시",
          "addressRegion": "수도권",
          "addressCountry": "KR"
        }
      },
      {
        "@type": "ItemList",
        "@id": "https://runcaremassage.netlify.app/#partners",
        "name": "런케어 공식 추천 제휴점 5선",
        "numberOfItems": BUSINESSES.length,
        "itemListElement": BUSINESSES.map((b, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "HealthAndBeautyBusiness",
            "name": b.name,
            "description": `${b.category} - ${b.address}`,
            "telephone": b.phone,
            "priceRange": b.price,
            "image": `https://runcaremassage.netlify.app${b.image}`,
            "paymentAccepted": "100% 현장 후불제"
          }
        }))
      },
      {
        "@type": "HowTo",
        "@id": "https://runcaremassage.netlify.app/#howto",
        "name": "런케어 안심 예약 4단계 절차",
        "step": [
          { "@type": "HowToStep", "position": 1, "name": "지역 확인", "text": "계신 곳의 서울·경기·인천 행정구역 및 제휴 샵 목록을 확인합니다." },
          { "@type": "HowToStep", "position": 2, "name": "코스 선택", "text": "스웨디시, 아로마, 타이 중 당일 피로도에 맞는 프로그램을 선택합니다." },
          { "@type": "HowToStep", "position": 3, "name": "직통 안심 상담", "text": "0507 안심번호로 담당 매니저와 직접 시간 및 장소를 조율합니다." },
          { "@type": "HowToStep", "position": 4, "name": "100% 현장 후불 결제", "text": "선입금 없이 관리사 도착 후 계신 자리에서 직접 결제합니다." }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://runcaremassage.netlify.app/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "런케어 플랫폼 이용 시 예약금이나 선입금이 있나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "런케어는 불법 선입금 사기를 근절하기 위해 선입금 없는 100% 현장후불 정찰제 원칙을 엄격하게 적용하고 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "수도권 전지역 평균 방문 시간은 얼마나 걸리나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "서울, 경기, 인천 주요 도심 거점별 평균 25분~35분 내외로 전문 테라피스트가 신속하게 방문합니다."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* 구조화 데이터 주입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 상단 헤더 */}
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-xl shadow-[0_0_15px_rgba(245,158,11,0.4)]">
              런
            </span>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                런케어마사지
              </span>
              <span className="text-[10px] text-gray-400 tracking-tighter">RUN CARE MASSAGE · 24시 빠른방문</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/reviews" className="text-xs text-gray-300 hover:text-amber-400 px-3 py-1.5 transition-colors">
              고객후기
            </Link>
            <Link href="/prices" className="text-xs text-gray-300 hover:text-amber-400 px-3 py-1.5 transition-colors">
              가격안내
            </Link>
            <a href="tel:0507-1280-3199" className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all">
              📞 24시 전화예약
            </a>
          </div>
        </div>
      </header>

      {/* 히어로 배너 */}
      <section className="relative overflow-hidden bg-neutral-950 text-center border-b border-amber-500/20 py-16 px-4">
        <img
          src="/banner.jpg"
          alt="런케어마사지 서울 경기 인천 프리미엄 타이 및 아로마 출장 케어 안내"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35]"
        />
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="inline-block bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-sm">
            METRO RUN CARE &amp; WELLNESS DIRECTORY
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-md">
            서울 출장 케어 마사지 · 런케어
          </h1>
          <p className="text-gray-300 text-xs md:text-sm font-medium leading-relaxed max-w-2xl mx-auto">
            프라이빗 케어 전문 서울 출장마사지 런케어입니다. <br />
            선입금 없는 100% 안심 후불제 정찰제 시스템! 타이·아로마·스웨디시 전문 테라피스트가 25분 내 신속하게 찾아갑니다.
          </p>
        </div>
      </section>

      {/* 상단 빠른 이동 셀렉트 바 */}
      <div className="bg-[#0d0d10] border-b border-white/5 py-4 px-4 sticky top-[65px] z-40 backdrop-blur-md">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-2 md:gap-4">
          <select 
            value={cityKey} 
            onChange={(e) => { 
              const newCity = e.target.value;
              const firstDist = Object.keys(RAW_METRO_DATA[newCity].districts)[0];
              setCityKey(newCity); 
              setDistrictKey(firstDist); 
              setSelectedDong(""); 
              router.push(`/${newCity}`);
            }}
            aria-label="시/도 선택"
            className="bg-black/80 border border-white/10 rounded-xl text-xs md:text-sm p-3 text-gray-200 outline-none focus:border-amber-500"
          >
            {Object.entries(RAW_METRO_DATA).map(([k, v]) => (
              <option key={k} value={k}>{v.name}</option>
            ))}
          </select>

          <select 
            value={districtKey} 
            onChange={(e) => { 
              const newDist = e.target.value;
              setDistrictKey(newDist); 
              setSelectedDong(""); 
              router.push(`/${cityKey}/${newDist}`);
            }}
            aria-label="구/군/시 선택"
            className="bg-black/80 border border-white/10 rounded-xl text-xs md:text-sm p-3 text-gray-200 outline-none focus:border-amber-500"
          >
            {Object.entries(districts).map(([k, v]) => (
              <option key={k} value={k}>{v.name}</option>
            ))}
          </select>

          <select 
            value={selectedDong} 
            onChange={(e) => {
              const val = e.target.value;
              setSelectedDong(val);
              if (val) {
                router.push(`/${cityKey}/${districtKey}/${encodeURIComponent(val)}`);
              }
            }}
            aria-label="동/읍/면 선택"
            className="bg-black/80 border border-white/10 rounded-xl text-xs md:text-sm p-3 text-gray-200 outline-none focus:border-amber-500"
          >
            <option value="">동 선택 (상세페이지 이동)</option>
            {dongs.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12 w-full flex-1 space-y-14">
        
        {/* 제휴 샵 리스트 */}
        <section className="space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div>
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">OFFICIAL PARTNERS</span>
              <h2 className="text-xl md:text-2xl font-black text-white mt-1">💎 런케어마사지 검증 제휴 추천샵</h2>
            </div>
            <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              100% 현장 후불제
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BUSINESSES.map((shop) => (
              <div key={shop.id} className="bg-[#121214] border border-amber-500/20 hover:border-amber-500/60 p-5 rounded-2xl flex flex-col justify-between transition-all shadow-lg group">
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 bg-neutral-800 rounded-xl overflow-hidden shrink-0 border border-white/5">
                    <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-bold border border-amber-500/20">
                      {shop.category}
                    </span>
                    <h3 className="font-extrabold text-base text-white truncate mt-1">
                      {shop.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 truncate">{shop.address}</p>
                    <p className="text-xs font-black text-amber-400 mt-1">{shop.price}</p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
                  <a 
                    href={`tel:${shop.phone}`} 
                    className="flex-1 text-center bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs py-2.5 rounded-xl transition-all"
                  >
                    📞 24시 전화예약
                  </a>
                  <a 
                    href={`sms:${shop.phone}`} 
                    className="px-3 bg-white/5 hover:bg-white/10 text-gray-300 text-xs py-2.5 rounded-xl border border-white/10 transition-all"
                  >
                    💬 문자
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🌟 SEO 핵심: 정적 지역 링크 맵 (수도권 전체) */}
        <section className="bg-[#0f0f12] border border-white/10 p-6 md:p-8 rounded-3xl space-y-8 shadow-md">
          <div className="border-b border-white/10 pb-4">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">ALL REGIONAL SITEMAP</span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              📍 수도권 전 지역 출장 홈케어 상세 가이드 (전체 동 링크)
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              검색 로봇과 사용자가 모든 지역의 코스 및 정찰제 요금을 한눈에 탐색할 수 있도록 제공합니다.
            </p>
          </div>

          <div className="space-y-8">
            {Object.entries(RAW_METRO_DATA).map(([sidoKey, sidoVal]) => (
              <div key={sidoKey} className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <Link href={`/${sidoKey}`} className="text-lg font-bold text-white hover:text-amber-400 transition-colors">
                    {sidoVal.name} 전체보기 &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(sidoVal.districts).map(([distKey, distVal]) => (
                    <div key={distKey} className="bg-black/40 border border-white/5 rounded-2xl p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <Link 
                          href={`/${sidoKey}/${distKey}`} 
                          className="font-bold text-sm text-amber-300 hover:underline"
                        >
                          {distVal.name}
                        </Link>
                        <span className="text-[10px] text-gray-500">{distVal.dongs.length}개 동</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {distVal.dongs.map((dongName, idx) => (
                          <Link
                            key={idx}
                            href={`/${sidoKey}/${distKey}/${encodeURIComponent(dongName)}`}
                            className="text-[11px] text-gray-400 hover:text-amber-400 bg-white/5 hover:bg-amber-500/10 px-2 py-1 rounded-md transition-colors"
                          >
                            {dongName}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 📚 전문 웰니스 정보성 칼럼 */}
        <section className="bg-[#0e0e12] p-6 sm:p-10 rounded-3xl border border-white/10 space-y-10 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-5">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              RUN CARE WELLNESS THEORY &amp; ESSENTIALS
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              도심 생활 속 신체 밸런스 회복과 지속 가능한 바디 테라피 가이드
            </h2>
            <p className="text-gray-400 text-xs mt-1.5">
              자율신경계 균형, 근막 이완의 생체역학적 원리, 라이프스타일 맞춤 프로그램 선택 및 프라이빗 케어 환경 분석
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">1.</span> 현대인의 고정 좌식 생활과 만성 근막 긴장의 병리학적 기전
            </h3>
            <p>
              현대 사회의 근로 환경은 디지털 디바이스의 보급과 함께 급격한 정적 고정화를 겪고 있습니다. 서울과 수도권의 수많은 직장인들은 하루 평균 8시간 이상 모니터 앞에 앉아 생활하며, 이 과정에서 경추 굴곡과 흉추 후만이 결합된 전방 두부 자세(거북목)를 취하게 됩니다. 머리의 하중이 1인치 앞으로 기울어질 때마다 목덜미 후두하근과 상부 승모근, 견갑거근에 가해지는 역학적 부하는 체중 대비 최대 4배까지 증가합니다.
            </p>
            <p>
              이러한 만성적 부하는 근섬유 내 미세 모세혈관의 혈류 흐름을 압박하여 국소 허혈성 상태를 유발합니다. 혈액 공급이 원활하지 못한 근육 조직 내에는 젖산, 피루브산 등 대사 노폐물이 축적되며, 이는 근막 통증 유발점(Trigger Point)의 형성을 가속화합니다. 결과적으로 어깨 윗선의 지속적인 뻐근함, 견갑골 내측의 결림, 긴장성 두통과 만성 피로로 이어지는 악순환이 고착화됩니다.
            </p>
            <p>
              정기적인 바디 컨디셔닝은 단순한 표면 마찰을 넘어 근육의 기시부와 정지부를 따라 경직된 근막을 넓은 면적으로 스트레칭하고 연부 조직의 온도를 높여 혈류량을 증가시키는 데 목적이 있습니다. 정상적인 혈액 순환이 회복되면 굳어있던 근섬유가 이완되고 자율신경계의 과도한 흥분이 진정되어 신체 본래의 유연성과 가동 범위를 되찾게 됩니다.
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">2.</span> 자율신경계 불균형과 심신 릴렉싱의 상호작용
            </h3>
            <p>
              과중한 업무 스트레스와 불규칙한 생활 리듬은 인체의 교감신경계를 만성 흥분 상태로 몰아넣습니다. 교감신경의 지속적인 과활성화는 스트레스 호르몬인 코르티솔과 아드레날린 분비를 촉진하고, 심박수 증가와 말초 혈관 수축을 야기하여 신체를 항시적인 긴장 상태로 유지시킵니다. 이러한 상태가 장기화되면 야간 숙면을 방해하는 수면 장애, 소화 흡수 장애, 만성 무기력증이 동반됩니다.
            </p>
            <p>
              숙련된 테라피스트에 의한 균일하고 차분한 압력 자극은 피부 감각 수용기를 자극하여 뇌로 전달되는 감각 신호를 안정화시킵니다. 이는 부교감신경계를 활성화하여 심장 박동을 안정시키고 혈관을 확장시키며, 체내 행복 호르몬인 옥시토신과 세로토닌의 분비를 촉진합니다.
            </p>
            <p>
              신체가 진정한 이완 상태에 도달하면 뇌파는 각성 상태인 베타파에서 깊은 안정 상태인 알파파 및 세타파로 전환됩니다. 이는 단순한 신체적 편안함을 넘어 뇌의 인지적 피로를 리셋하고 면역계 세포의 재생 활동을 촉진하는 근본적인 힐링 환경을 조성합니다.
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">3.</span> 프로그램별 물리적 기전 비교와 맞춤형 선택 가이드
            </h3>
            <p>
              전문 바디 웰니스 프로그램은 사용하는 매개체와 물리적 자극의 깊이에 따라 뚜렷한 기능적 특성을 가집니다. 이용자의 당일 체력 상태와 피로 원인에 맞추어 올바른 코스를 선택하는 것이 중요합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-3">
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">클래식 건식 스트레칭 (타이 케어)</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  오일을 사용하지 않고 매트 위에서 진행되는 정통 기법입니다. 수기 압박과 요가 형태의 수동적 관절 신전 운동이 결합되어 굳어있는 햄스트링, 고관절 굴곡근, 척추 기립근의 운동 가동 범위를 물리적으로 넓혀줍니다. 평소 활동량이 적어 몸이 뻣뻣하고 시원한 관절 이완을 원하는 분에게 적합합니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">스웨디시 감성 바디 테라피</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  식물성 베이스 오일을 도포하여 마찰 저항을 최소화한 상태에서 심장 방향으로 부드럽게 밀어 올리는 유러피언 테크닉입니다. 피부 표층의 미세 순환을 촉진하고 통증 없이 림프절을 자극하여 부종 완화와 깊은 정신적 안도감을 선사합니다. 강한 압박에 거부감이 있는 분에게 추천됩니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">에센셜 아로마 림프 테라피</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  라벤더, 유칼립투스, 베르가못 등 식물에서 추출한 순수 에센셜 오일의 후각적 아로마콜로지 효과를 접목한 기법입니다. 피부 보습 장벽을 보호하는 동시에 피하 지방층 주변 림프액의 배농을 유도하여 붓기를 개선하고 환절기 피부 건조증을 예방합니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">심부 근막 집중 딥티슈 케어</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  표층 근육을 넘어 뼈와 관절에 맞닿아 있는 심부 근막의 단단한 매듭을 팔꿈치와 체중을 이용해 서서히 압박하는 기법입니다. 고질적인 목 결림이나 허리 통증을 유발하는 만성 유착 부위를 분리하여 깊은 속근육의 피로를 근본적으로 해소합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">4.</span> 프라이빗 1인 케어 환경이 선사하는 심리·시간적 효율성
            </h3>
            <p>
              전통적인 웰니스 서비스는 고객이 직접 매장을 방문하는 오프라인 중심이었으나, 현대 도시 생활에서는 이동 자체에 소모되는 물리적·정신적 비용이 상당합니다. 번화가의 교통 체증, 주차 공간 확보의 어려움, 대기 시간, 타인과의 대면 접촉은 휴식을 취하러 가는 과정 자체를 또 다른 피로 원인으로 만들 수 있습니다.
            </p>
            <p>
              개인 자택이나 호텔 객실 등 독립된 사적 공간에서 진행되는 프라이빗 케어는 외부의 소음과 자극을 원천 차단하여 부교감신경이 방해 없이 활성화될 수 있는 환경을 제공합니다. 관리사가 방문하여 세션을 진행함으로써 고객은 이동에 필요한 에너지를 보존할 수 있으며, 관리가 종료된 직후 환복이나 귀가 이동 없이 온전히 자신의 침상에서 깊은 숙면으로 전환할 수 있습니다.
            </p>
            <p>
              이러한 환경적 연속성은 근육이 따뜻하게 이완된 상태에서 찬 바람이나 외부 온도 변화에 노출되어 다시 수축하는 현상을 예방합니다. 교대 근무, 야간 업무, 혹은 바쁜 주말 일정을 소화하는 현대인들에게 시간 절약과 완전한 휴식을 동시에 보장하는 스마트한 자기 관리 솔루션입니다.
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">5.</span> 안전하고 신뢰할 수 있는 웰니스 플랫폼 이용 수칙
            </h3>
            <p>
              투명하고 건강한 힐링 문화를 지속하기 위해 런케어마사지는 모든 제휴 매장과 파트너 샵의 건전성과 운영 수칙을 주기적으로 모니터링합니다. 소비자의 권익 보호와 안전한 세션 진행을 위해 다음 가이드라인을 확인하시기 바랍니다.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-gray-400 pl-2">
              <li><strong className="text-gray-200">100% 현장 후불제 준수:</strong> 신뢰할 수 있는 공인 파트너는 불법적인 예약 선입금이나 불투명한 현장 추가금을 절대 요구하지 않으며, 공시된 표준 요금표를 엄격히 준수합니다.</li>
              <li><strong className="text-gray-200">기저 질환 사전 고지:</strong> 최근 관절 시술을 받았거나 골절 병력, 심혈관계 질환, 임신 중인 경우 세션 전 매니저 및 테라피스트에게 신체 상태를 고지하여 적절한 강도를 조율해야 합니다.</li>
              <li><strong className="text-gray-200">사후 수분 섭취와 체온 유지:</strong> 관리를 마친 후에는 림프 순환을 통해 체내로 배출된 대사 부산물이 원활히 배설될 수 있도록 미온수를 500ml 이상 섭취하고, 급격한 체온 저하를 방지하기 위해 따뜻한 실내 환경을 유지하시기 바랍니다.</li>
            </ul>
          </div>

          <div className="pt-5 border-t border-white/5 text-[11px] text-gray-500">
            * 본 콘텐츠는 수도권 전역의 건강한 라이프스타일 구축과 올바른 신체 생리학적 테라피 정보 제공을 목적으로 런케어 리서치 팀에 의해 작성 및 검수되었습니다.
          </div>
        </section>

      </main>

      {/* 푸터 */}
      <footer className="bg-[#030303] border-t border-white/10 py-10 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p className="text-gray-400 font-bold">런케어마사지 (Run Care Massage) · 수도권 24시 출장 방문 테라피 안내 플랫폼</p>
          <p className="text-[11px]">© 2026 런케어마사지. All rights reserved. (공식 도메인: https://runcaremassage.netlify.app)</p>
        </div>
      </footer>

    </div>
  );
}