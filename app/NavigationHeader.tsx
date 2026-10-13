"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavigationHeader() {
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* 로고 영역 */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center text-black font-black text-sm shadow-[0_0_15px_rgba(245,158,11,0.35)] group-hover:scale-105 transition-transform">
            런
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent leading-none">
              런케어마사지
            </span>
            <span className="text-[10px] text-gray-400 tracking-tight mt-0.5">
              RUN CARE MASSAGE · 24시 방문 홈케어
            </span>
          </div>
        </Link>

        {/* 데스크톱 메뉴 목록 */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-gray-300">
          
          {/* 1. 서비스 안내 */}
          <Link href="/services" className="hover:text-amber-400 transition-colors">
            서비스 안내
          </Link>

          {/* 2. 이용 안내 & 가격 */}
          <Link href="/prices" className="hover:text-amber-400 transition-colors">
            이용 안내
          </Link>

          {/* 3. 홈 케어 안내 */}
          <Link href="/travel" className="hover:text-amber-400 transition-colors">
            홈 케어 가이드
          </Link>

          {/* 4. 제휴 파트너 */}
          <Link href="/places" className="hover:text-amber-400 transition-colors">
            제휴 파트너
          </Link>

          {/* 5. 지역별 안내 (드롭다운) */}
          <div 
            className="relative cursor-pointer py-2"
            onMouseEnter={() => setIsRegionOpen(true)}
            onMouseLeave={() => setIsRegionOpen(false)}
          >
            <button className="hover:text-amber-400 transition-colors flex items-center gap-1 text-xs font-bold text-gray-300">
              지역별 방문케어
              <span className="text-[10px] text-amber-400">▼</span>
            </button>

            {isRegionOpen && (
              <div className="absolute top-full left-0 w-36 bg-[#121214] border border-amber-500/30 rounded-2xl shadow-2xl py-2 space-y-1 text-xs z-50 animate-in fade-in slide-in-from-top-1">
                <Link 
                  href="/seoul" 
                  className="block px-4 py-2 text-gray-300 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
                >
                  📍 서울 지역
                </Link>
                <Link 
                  href="/gyeonggi" 
                  className="block px-4 py-2 text-gray-300 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
                >
                  📍 경기 지역
                </Link>
                <Link 
                  href="/incheon" 
                  className="block px-4 py-2 text-gray-300 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
                >
                  📍 인천 지역
                </Link>
              </div>
            )}
          </div>

          {/* 6. 고객 후기 */}
          <Link 
            href="/reviews" 
            className="text-amber-400 font-extrabold hover:text-yellow-300 transition-colors flex items-center gap-1 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30"
          >
            <span>⭐</span> 이용 후기
          </Link>

        </nav>

        {/* 우측 CTA & 모바일 토글 버튼 */}
        <div className="flex items-center gap-2">
          <a 
            href="tel:0507-1280-3199"
            className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-black text-xs px-3.5 py-2 rounded-xl shadow-md transition-all active:scale-95"
          >
            📞 24시 전화예약
          </a>

          {/* 모바일 햄버거 메뉴 버튼 */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-amber-400 focus:outline-none"
            aria-label="메뉴 열기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-white/10 space-y-2 text-xs font-bold text-gray-300 px-2 pb-2 bg-[#0c0c0e] rounded-2xl">
          <Link 
            href="/services" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-xl hover:bg-white/5 hover:text-amber-400 transition-colors"
          >
            서비스 안내
          </Link>
          <Link 
            href="/prices" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-xl hover:bg-white/5 hover:text-amber-400 transition-colors"
          >
            이용 안내
          </Link>
          <Link 
            href="/travel" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-xl hover:bg-white/5 hover:text-amber-400 transition-colors"
          >
            홈 케어 가이드
          </Link>
          <Link 
            href="/places" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-xl hover:bg-white/5 hover:text-amber-400 transition-colors"
          >
            제휴 파트너
          </Link>

          <div className="py-2 px-3 rounded-xl bg-black/50 border border-white/5 space-y-1">
            <span className="text-gray-400 text-[11px]">지역별 바로가기</span>
            <div className="flex gap-2 pt-1">
              <Link 
                href="/seoul" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center py-1.5 bg-[#141418] rounded-lg border border-white/10 hover:text-amber-400 text-[11px] text-gray-200"
              >
                서울
              </Link>
              <Link 
                href="/gyeonggi" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center py-1.5 bg-[#141418] rounded-lg border border-white/10 hover:text-amber-400 text-[11px] text-gray-200"
              >
                경기
              </Link>
              <Link 
                href="/incheon" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center py-1.5 bg-[#141418] rounded-lg border border-white/10 hover:text-amber-400 text-[11px] text-gray-200"
              >
                인천
              </Link>
            </div>
          </div>

          <Link 
            href="/reviews" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2.5 px-3 rounded-xl text-amber-400 bg-amber-500/10 border border-amber-500/20 text-center font-black"
          >
            ⭐ 고객 이용 후기 보러가기
          </Link>
        </div>
      )}
    </header>
  );
}