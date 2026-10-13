"use client";

import { useState } from "react";
import Link from "next/link";
import { regionData } from "@/lib/regions";

export default function MainClientUI() {
  const [activeSido, setActiveSido] = useState("seoul");
  const selectedRegion = regionData[activeSido] || regionData["seoul"];
  const districtsArray = Object.entries(selectedRegion.districts);

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* 상단 헤더 */}
      <header className="bg-[#050505]/90 border-b border-amber-500/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center text-black font-black text-sm shadow-[0_0_15px_rgba(245,158,11,0.35)] group-hover:scale-105 transition-transform">
              런
            </div>
            <div>
              <div className="text-base font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent leading-none">
                런케어마사지
              </div>
              <div className="text-[10px] text-gray-400 tracking-tight mt-0.5">
                RUN CARE MASSAGE · 24시 방문 홈케어
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="tel:0507-1280-3199"
              className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all flex items-center gap-1.5"
            >
              <span>📞</span> 24시 전화예약
            </a>
          </div>
        </div>
      </header>

      {/* 배너 영역 (메타 타이틀 키워드 매칭) */}
      <section className="relative overflow-hidden bg-neutral-950 text-center border-b border-amber-500/20 py-16 px-4">
        <img
          src="/banner.jpg"
          alt="런케어마사지 서울 경기 인천 프라이빗 타이 및 아로마 출장 케어 안내"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4]"
        />
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <span className="inline-block bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
            METRO RUN CARE &amp; WELLNESS
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight drop-shadow-md">
            서울 출장 케어 마사지 · 런케어
          </h1>
          <p className="text-gray-300 text-xs md:text-sm font-medium leading-relaxed max-w-xl mx-auto">
            프라이빗 케어 전문 서울 출장마사지 런케어입니다. <br className="hidden md:block" />
            선입금 없는 100% 현장후불 정찰제! 스웨디시·아로마·타이 전문 힐러가 25분 내 신속 방문합니다.
          </p>
        </div>
      </section>

      {/* 메인 지역 선택 영역 */}
      <main className="max-w-6xl mx-auto px-4 py-10 flex-1 w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">REGIONAL DIRECTORY</span>
            <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2 mt-1">
              <span>📍</span> 수도권 지역별 맞춤 홈케어 파트너 찾기
            </h2>
          </div>
          <p className="text-xs text-gray-400">
            원하시는 시/도 및 시·구·군을 선택하시면 관할 동별 상세 안내를 확인할 수 있습니다.
          </p>
        </div>

        {/* 시도 선택 탭 */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {Object.entries(regionData).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setActiveSido(key)}
              className={`px-5 py-2.5 rounded-xl border font-bold text-xs md:text-sm transition-all whitespace-nowrap ${
                activeSido === key
                  ? "bg-amber-500 text-black border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                  : "bg-[#121214] text-gray-400 border-white/10 hover:border-amber-500/40 hover:text-white"
              }`}
            >
              {val.name}
            </button>
          ))}
        </div>

        {/* 구/시/군 및 관할 동 리스트 카드 */}
        <div className="space-y-4">
          {districtsArray.map(([distKey, distVal]) => (
            <div
              key={distKey}
              className="bg-[#121214] border border-white/10 hover:border-amber-500/30 rounded-2xl p-5 shadow-lg transition-all"
            >
              <div className="font-extrabold text-white text-base mb-3 pb-2.5 border-b border-white/5 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="text-amber-400">●</span> {distVal.name}
                </span>
                <Link
                  href={`/${activeSido}/${distKey}`}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  {distVal.name} 전체보기 &rarr;
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {distVal.dongs.map((dong, idx) => (
                  <Link
                    key={idx}
                    href={`/${activeSido}/${distKey}/${encodeURIComponent(dong)}`}
                    className="px-3 py-1.5 rounded-xl border border-white/10 bg-black/40 text-xs font-medium text-gray-300 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                  >
                    {dong}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 푸터 영역 */}
      <footer className="bg-[#030303] text-gray-400 border-t border-white/10 py-10 mt-16 text-xs">
        <div className="max-w-6xl mx-auto px-4 space-y-3 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="font-black text-white text-base bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">
                런케어마사지 (Run Care Massage)
              </div>
              <p className="text-gray-400 mt-1">
                서울·경기·인천 수도권 전 지역 24시 방문 홈케어 디렉토리 플랫폼
              </p>
            </div>
            <div className="flex justify-center md:justify-end gap-3">
              <a
                href="tel:0507-1280-3199"
                className="text-amber-400 border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 rounded-xl hover:bg-amber-500 hover:text-black transition-all font-bold"
              >
                전화문의: 0507-1280-3199
              </a>
            </div>
          </div>
          <div className="border-t border-white/5 pt-3 text-[11px] text-gray-600">
            <p>선입금을 요구하지 않는 100% 안심 후불제 매장 정보만을 안내합니다.</p>
            <p className="mt-0.5">© 2026 런케어마사지 (runcaremassage.netlify.app). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}