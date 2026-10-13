"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface DistrictItem {
  distKey: string;
  name: string;
  dongs: string[];
}

export default function RandomDistrictList({ districts, cityKey }: { districts: DistrictItem[]; cityKey: string }) {
  const [shuffledDistricts, setShuffledDistricts] = useState<DistrictItem[]>(districts);

  useEffect(() => {
    const shuffled = [...districts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledDistricts(shuffled);
  }, [districts]);

  return (
    <div className="space-y-4">
      {shuffledDistricts.map((distVal) => (
        <div
          key={distVal.distKey}
          className="bg-[#121214] border border-white/10 hover:border-amber-500/30 rounded-2xl p-5 md:p-6 shadow-lg transition-all"
        >
          <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-white/5">
            <Link
              href={`/${cityKey}/${distVal.distKey}`}
              className="text-base md:text-lg font-bold text-white hover:text-amber-400 transition-colors flex items-center gap-2 group"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform"></span>
              <span>{distVal.name}</span>
              <span className="text-xs text-amber-400 font-bold">&rarr;</span>
            </Link>
            <span className="text-xs text-gray-400">{distVal.dongs.length}개 지역 등록</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {distVal.dongs.map((dong, idx) => (
              <Link
                key={idx}
                href={`/${cityKey}/${distVal.distKey}/${encodeURIComponent(dong)}`}
                className="inline-flex items-center px-3 py-1.5 rounded-xl border border-white/10 bg-black/40 text-xs font-medium text-gray-300 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/40 transition-all"
              >
                {dong}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}