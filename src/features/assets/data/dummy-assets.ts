import {
  ASSET_CATEGORY_LABELS,
  ASSET_STATUS_LABELS,
  type AssetCategory,
  type AssetItem,
  type AssetStatus,
  type AssetTimeframe,
  type AssetTrendPoint,
} from "@/features/assets/schemas/asset-schema";

export const DUMMY_ASSETS: AssetItem[] = [
  {
    id: "ast-01",
    assetCode: "AST-2026-024",
    name: "MacBook Pro 16 M4 Max (64GB/2TB)",
    category: "LAPTOP",
    status: "OUTBOUND",
    department: "플랫폼개발팀",
    assignee: "김민수",
    location: "판교 오피스 4층 A구역",
    quantity: 1,
    purchasePrice: 5490000,
    registeredAt: "2026-11-07",
    notes: "AI 모델 로컬 추론 및 풀스택 개발용 지급",
  },
  {
    id: "ast-02",
    assetCode: "AST-2026-023",
    name: "Dell UltraSharp 32 6K 모니터 (U3224KB)",
    category: "PERIPHERAL",
    status: "INBOUND",
    department: "디자인시스템팀",
    assignee: "이서연",
    location: "본사 3층 자산보관실 B-2",
    quantity: 4,
    purchasePrice: 3200000,
    registeredAt: "2026-11-06",
    notes: "신규 디자이너 입사자 배정 대기분",
  },
  {
    id: "ast-03",
    assetCode: "AST-2026-022",
    name: "NVIDIA H100 GPU 추론 서버 노드 #4",
    category: "SERVER",
    status: "OUTBOUND",
    department: "인프라보안팀",
    assignee: "박지훈",
    location: "가산 IDC 센터 제2전산실 R-14",
    quantity: 2,
    purchasePrice: 48500000,
    registeredAt: "2026-11-05",
    notes: "하네스 자동 검증 클러스터 증설",
  },
  {
    id: "ast-04",
    assetCode: "AST-2026-021",
    name: "iPad Pro 13 M4 Wi-Fi + Cellular",
    category: "MOBILE",
    status: "OUTBOUND",
    department: "프로덕트매니지먼트팀",
    assignee: "최유진",
    location: "판교 오피스 5층 QA랩",
    quantity: 3,
    purchasePrice: 2190000,
    registeredAt: "2026-11-04",
    notes: "모바일 반응형 UI/UX 현장 검수용",
  },
  {
    id: "ast-05",
    assetCode: "AST-2026-020",
    name: "JetBrains All Products Pack 기업 라이선스",
    category: "LICENSE",
    status: "INBOUND",
    department: "플랫폼개발팀",
    assignee: "정현우",
    location: "클라우드 라이선스 볼트",
    quantity: 15,
    purchasePrice: 980000,
    registeredAt: "2026-11-03",
    notes: "연간 구독 갱신 완료 (잔여 시트 보관)",
  },
  {
    id: "ast-06",
    assetCode: "AST-2026-019",
    name: "ThinkPad X1 Carbon Gen 12",
    category: "LAPTOP",
    status: "INBOUND",
    department: "데이터엔지니어링팀",
    assignee: "강동원",
    location: "본사 3층 자산보관실 A-1",
    quantity: 5,
    purchasePrice: 2650000,
    registeredAt: "2026-11-01",
    notes: "하반기 공채 신입사원 지급용 신규 입고",
  },
  {
    id: "ast-07",
    assetCode: "AST-2026-018",
    name: "Cisco Catalyst 9300 48포트 L3 스위치",
    category: "SERVER",
    status: "OUTBOUND",
    department: "인프라보안팀",
    assignee: "윤성호",
    location: "판교 오피스 4층 MDF실",
    quantity: 2,
    purchasePrice: 12400000,
    registeredAt: "2026-10-28",
    notes: "사내 백본 네트워크 10GbE 업그레이드",
  },
  {
    id: "ast-08",
    assetCode: "AST-2026-017",
    name: "Apple Studio Display 27 스탠다드 글래스",
    category: "PERIPHERAL",
    status: "OUTBOUND",
    department: "디자인시스템팀",
    assignee: "한소희",
    location: "판교 오피스 3층 디자인존",
    quantity: 6,
    purchasePrice: 2090000,
    registeredAt: "2026-10-21",
    notes: "OKLCH 컬러 프로파일 표준 모니터 출고",
  },
  {
    id: "ast-09",
    assetCode: "AST-2026-016",
    name: "Galaxy S25 Ultra 512GB 테스트 단말기",
    category: "MOBILE",
    status: "MAINTENANCE",
    department: "QA품질보증팀",
    assignee: "송민규",
    location: "판교 오피스 5층 단말기보관함",
    quantity: 2,
    purchasePrice: 1690000,
    registeredAt: "2026-10-14",
    notes: "배터리 사이클 점검 및 OS 초기화 진행중",
  },
  {
    id: "ast-10",
    assetCode: "AST-2026-015",
    name: "Figma Enterprise 연간 시트 패키지",
    category: "LICENSE",
    status: "OUTBOUND",
    department: "디자인시스템팀",
    assignee: "이서연",
    location: "클라우드 라이선스 볼트",
    quantity: 20,
    purchasePrice: 1150000,
    registeredAt: "2026-09-25",
    notes: "디자인 토큰 자동 동기화 플러그인 포함",
  },
  {
    id: "ast-11",
    assetCode: "AST-2026-014",
    name: "MacBook Air 15 M3 (24GB/512GB)",
    category: "LAPTOP",
    status: "INBOUND",
    department: "프로덕트매니지먼트팀",
    assignee: "조현아",
    location: "본사 3층 자산보관실 A-3",
    quantity: 4,
    purchasePrice: 2290000,
    registeredAt: "2026-09-10",
    notes: "PM 직군 예비 교체용 재고 확보",
  },
  {
    id: "ast-12",
    assetCode: "AST-2026-013",
    name: "Synology RackStation RS2423+ 스토리지",
    category: "SERVER",
    status: "OUTBOUND",
    department: "인프라보안팀",
    assignee: "박지훈",
    location: "가산 IDC 센터 제1전산실 R-08",
    quantity: 1,
    purchasePrice: 8900000,
    registeredAt: "2026-08-19",
    notes: "스냅샷 백업 및 로그 아카이빙 서버",
  },
  {
    id: "ast-13",
    assetCode: "AST-2026-012",
    name: "Herman Miller Aeron 워크스테이션 키트",
    category: "PERIPHERAL",
    status: "OUTBOUND",
    department: "플랫폼개발팀",
    assignee: "김민수",
    location: "판교 오피스 4층 A구역",
    quantity: 8,
    purchasePrice: 1950000,
    registeredAt: "2026-07-15",
    notes: "개발자 집중 업무 환경 개선 프로젝트",
  },
  {
    id: "ast-14",
    assetCode: "AST-2026-011",
    name: "GitHub Enterprise Cloud 조직 시트",
    category: "LICENSE",
    status: "OUTBOUND",
    department: "플랫폼개발팀",
    assignee: "정현우",
    location: "클라우드 라이선스 볼트",
    quantity: 35,
    purchasePrice: 680000,
    registeredAt: "2026-06-12",
    notes: "GitHub Actions CI/CD 러너 패키지 포함",
  },
  {
    id: "ast-15",
    assetCode: "AST-2026-010",
    name: "Mac Studio M2 Ultra 데스크톱 워크스테이션",
    category: "LAPTOP",
    status: "INBOUND",
    department: "데이터엔지니어링팀",
    assignee: "오태양",
    location: "판교 오피스 4층 빌드서버실",
    quantity: 2,
    purchasePrice: 6200000,
    registeredAt: "2026-05-20",
    notes: "iOS/macOS 네이티브 빌드 전용 머신 입고",
  },
  {
    id: "ast-16",
    assetCode: "AST-2026-009",
    name: "LG UltraFine 27UN880 4K 모니터",
    category: "PERIPHERAL",
    status: "INBOUND",
    department: "QA품질보증팀",
    assignee: "송민규",
    location: "본사 3층 자산보관실 B-1",
    quantity: 10,
    purchasePrice: 690000,
    registeredAt: "2026-04-08",
    notes: "듀얼 모니터 지급용 표준 재고",
  },
  {
    id: "ast-17",
    assetCode: "AST-2026-008",
    name: "Dell PowerEdge R760 PostgreSQL DB 서버",
    category: "SERVER",
    status: "OUTBOUND",
    department: "인프라보안팀",
    assignee: "윤성호",
    location: "가산 IDC 센터 제2전산실 R-02",
    quantity: 3,
    purchasePrice: 21500000,
    registeredAt: "2026-03-18",
    notes: "Prisma Primary/Replica 고가용성 클러스터",
  },
  {
    id: "ast-18",
    assetCode: "AST-2026-007",
    name: "iPhone 16 Pro 256GB QA 테스트폰",
    category: "MOBILE",
    status: "OUTBOUND",
    department: "QA품질보증팀",
    assignee: "신예은",
    location: "판교 오피스 5층 QA랩",
    quantity: 4,
    purchasePrice: 1550000,
    registeredAt: "2026-02-11",
    notes: "Safari iOS 18 웹뷰 호환성 검증용",
  },
  {
    id: "ast-19",
    assetCode: "AST-2026-006",
    name: "MacBook Pro 14 M3 Pro (36GB/1TB)",
    category: "LAPTOP",
    status: "OUTBOUND",
    department: "플랫폼개발팀",
    assignee: "백승헌",
    location: "판교 오피스 4층 B구역",
    quantity: 6,
    purchasePrice: 3490000,
    registeredAt: "2026-01-15",
    notes: "2026 상반기 프론트엔드 개발팀 장비 교체",
  },
  {
    id: "ast-20",
    assetCode: "AST-2025-042",
    name: "FortiGate 200F 차세대 방화벽 어플라이언스",
    category: "SERVER",
    status: "OUTBOUND",
    department: "인프라보안팀",
    assignee: "박지훈",
    location: "가산 IDC 센터 보안랙 S-01",
    quantity: 2,
    purchasePrice: 15800000,
    registeredAt: "2025-09-12",
    notes: "VPN 및 망분리 보안 게이트웨이",
  },
  {
    id: "ast-21",
    assetCode: "AST-2025-019",
    name: "Datadog Pro APM 모니터링 연간 플랜",
    category: "LICENSE",
    status: "INBOUND",
    department: "인프라보안팀",
    assignee: "윤성호",
    location: "클라우드 라이선스 볼트",
    quantity: 12,
    purchasePrice: 1420000,
    registeredAt: "2025-04-22",
    notes: "컨테이너 및 DB 쿼리 지연 트레이싱",
  },
  {
    id: "ast-22",
    assetCode: "AST-2024-031",
    name: "MacBook Pro 16 M2 Pro 개발 장비",
    category: "LAPTOP",
    status: "MAINTENANCE",
    department: "데이터엔지니어링팀",
    assignee: "강동원",
    location: "본사 3층 IT지원데스크",
    quantity: 3,
    purchasePrice: 3690000,
    registeredAt: "2024-08-14",
    notes: "키보드 모듈 무상 리콜 수리 입고",
  },
  {
    id: "ast-23",
    assetCode: "AST-2023-015",
    name: "Dell PowerEdge R650 레거시 배치 서버",
    category: "SERVER",
    status: "INBOUND",
    department: "데이터엔지니어링팀",
    assignee: "오태양",
    location: "가산 IDC 센터 예비랙 B-04",
    quantity: 2,
    purchasePrice: 14200000,
    registeredAt: "2023-06-30",
    notes: "콜드 스탠바이 노드 전환 보관중",
  },
  {
    id: "ast-24",
    assetCode: "AST-2022-008",
    name: "ThinkPad T14 Gen 2 구형 업무용 노트북",
    category: "LAPTOP",
    status: "DISPOSED",
    department: "프로덕트매니지먼트팀",
    assignee: "최유진",
    location: "본사 지하1층 폐기자산창고",
    quantity: 5,
    purchasePrice: 1650000,
    registeredAt: "2022-11-18",
    notes: "내용연수 4년 도래로 보안 디가우징 후 폐기 예정",
  },
];

export interface AssetSearchFilters {
  keyword?: string;
  startDate?: string;
  endDate?: string;
  category?: "ALL" | AssetCategory;
  status?: "ALL" | AssetStatus;
}

export function filterAssets(
  assets: AssetItem[],
  filters: AssetSearchFilters,
): AssetItem[] {
  const keyword = (filters.keyword ?? "").trim().toLowerCase();
  const startDate = (filters.startDate ?? "").trim();
  const endDate = (filters.endDate ?? "").trim();
  const category = filters.category ?? "ALL";
  const status = filters.status ?? "ALL";

  return assets.filter((item) => {
    if (category !== "ALL" && item.category !== category) {
      return false;
    }

    if (status !== "ALL" && item.status !== status) {
      return false;
    }

    if (startDate && item.registeredAt < startDate) {
      return false;
    }

    if (endDate && item.registeredAt > endDate) {
      return false;
    }

    if (keyword) {
      const categoryLabel = ASSET_CATEGORY_LABELS[item.category].toLowerCase();
      const statusLabel = ASSET_STATUS_LABELS[item.status].toLowerCase();
      const searchableText = [
        item.assetCode,
        item.name,
        item.department,
        item.assignee,
        item.location,
        item.notes ?? "",
        categoryLabel,
        statusLabel,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchableText.includes(keyword)) {
        return false;
      }
    }

    return true;
  });
}

const BASE_TRENDS: Record<AssetTimeframe, AssetTrendPoint[]> = {
  day: [
    {
      period: "2026-11-01",
      label: "11/01 (일)",
      registered: 8,
      inbound: 6,
      outbound: 2,
    },
    {
      period: "2026-11-02",
      label: "11/02 (월)",
      registered: 12,
      inbound: 7,
      outbound: 5,
    },
    {
      period: "2026-11-03",
      label: "11/03 (화)",
      registered: 19,
      inbound: 14,
      outbound: 5,
    },
    {
      period: "2026-11-04",
      label: "11/04 (수)",
      registered: 15,
      inbound: 6,
      outbound: 9,
    },
    {
      period: "2026-11-05",
      label: "11/05 (목)",
      registered: 22,
      inbound: 10,
      outbound: 12,
    },
    {
      period: "2026-11-06",
      label: "11/06 (금)",
      registered: 18,
      inbound: 11,
      outbound: 7,
    },
    {
      period: "2026-11-07",
      label: "11/07 (토)",
      registered: 24,
      inbound: 13,
      outbound: 11,
    },
  ],
  week: [
    {
      period: "2026-W38",
      label: "9월 3주",
      registered: 34,
      inbound: 20,
      outbound: 14,
    },
    {
      period: "2026-W39",
      label: "9월 4주",
      registered: 41,
      inbound: 24,
      outbound: 17,
    },
    {
      period: "2026-W40",
      label: "10월 1주",
      registered: 38,
      inbound: 19,
      outbound: 19,
    },
    {
      period: "2026-W41",
      label: "10월 2주",
      registered: 52,
      inbound: 31,
      outbound: 21,
    },
    {
      period: "2026-W42",
      label: "10월 3주",
      registered: 47,
      inbound: 25,
      outbound: 22,
    },
    {
      period: "2026-W43",
      label: "10월 4주",
      registered: 63,
      inbound: 36,
      outbound: 27,
    },
    {
      period: "2026-W44",
      label: "10월 5주",
      registered: 58,
      inbound: 30,
      outbound: 28,
    },
    {
      period: "2026-W45",
      label: "11월 1주",
      registered: 74,
      inbound: 42,
      outbound: 32,
    },
  ],
  month: [
    {
      period: "2025-12",
      label: "25년 12월",
      registered: 110,
      inbound: 64,
      outbound: 46,
    },
    {
      period: "2026-01",
      label: "1월",
      registered: 145,
      inbound: 88,
      outbound: 57,
    },
    {
      period: "2026-02",
      label: "2월",
      registered: 132,
      inbound: 72,
      outbound: 60,
    },
    {
      period: "2026-03",
      label: "3월",
      registered: 168,
      inbound: 96,
      outbound: 72,
    },
    {
      period: "2026-04",
      label: "4월",
      registered: 154,
      inbound: 84,
      outbound: 70,
    },
    {
      period: "2026-05",
      label: "5월",
      registered: 179,
      inbound: 102,
      outbound: 77,
    },
    {
      period: "2026-06",
      label: "6월",
      registered: 192,
      inbound: 108,
      outbound: 84,
    },
    {
      period: "2026-07",
      label: "7월",
      registered: 185,
      inbound: 99,
      outbound: 86,
    },
    {
      period: "2026-08",
      label: "8월",
      registered: 204,
      inbound: 115,
      outbound: 89,
    },
    {
      period: "2026-09",
      label: "9월",
      registered: 218,
      inbound: 124,
      outbound: 94,
    },
    {
      period: "2026-10",
      label: "10월",
      registered: 236,
      inbound: 132,
      outbound: 104,
    },
    {
      period: "2026-11",
      label: "11월",
      registered: 252,
      inbound: 144,
      outbound: 108,
    },
  ],
  year: [
    {
      period: "2022",
      label: "2022년",
      registered: 620,
      inbound: 380,
      outbound: 240,
    },
    {
      period: "2023",
      label: "2023년",
      registered: 940,
      inbound: 550,
      outbound: 390,
    },
    {
      period: "2024",
      label: "2024년",
      registered: 1380,
      inbound: 790,
      outbound: 590,
    },
    {
      period: "2025",
      label: "2025년",
      registered: 1820,
      inbound: 1040,
      outbound: 780,
    },
    {
      period: "2026",
      label: "2026년",
      registered: 2175,
      inbound: 1228,
      outbound: 947,
    },
  ],
};

export function computeAssetTrends(
  assets: AssetItem[],
  timeframe: AssetTimeframe,
): AssetTrendPoint[] {
  const base = BASE_TRENDS[timeframe].map((pt) => ({ ...pt }));
  const defaultIds = new Set(DUMMY_ASSETS.map((a) => a.id));
  const customAssets = assets.filter((a) => !defaultIds.has(a.id));

  if (customAssets.length === 0) {
    return base;
  }

  for (const asset of customAssets) {
    const qty = asset.quantity;
    const isInbound = asset.status === "INBOUND";
    const isOutbound = asset.status === "OUTBOUND";

    let matchedIndex = -1;
    if (timeframe === "day") {
      matchedIndex = base.findIndex((pt) => pt.period === asset.registeredAt);
    } else if (timeframe === "month") {
      const ym = asset.registeredAt.slice(0, 7);
      matchedIndex = base.findIndex((pt) => pt.period === ym);
    } else if (timeframe === "year") {
      const yr = asset.registeredAt.slice(0, 4);
      matchedIndex = base.findIndex((pt) => pt.period === yr);
    }

    const targetIndex = matchedIndex >= 0 ? matchedIndex : base.length - 1;
    const target = base[targetIndex];
    if (target) {
      target.registered += qty;
      if (isInbound) target.inbound += qty;
      if (isOutbound) target.outbound += qty;
    }
  }

  return base;
}

export function calculateAssetSummary(assets: AssetItem[]) {
  let totalAssetsCount = 0;
  let inboundCount = 0;
  let outboundCount = 0;
  let maintenanceCount = 0;
  let totalValue = 0;

  for (const item of assets) {
    totalAssetsCount += item.quantity;
    totalValue += item.purchasePrice * item.quantity;
    if (item.status === "INBOUND") inboundCount += item.quantity;
    if (item.status === "OUTBOUND") outboundCount += item.quantity;
    if (item.status === "MAINTENANCE") maintenanceCount += item.quantity;
  }

  return {
    totalRecords: assets.length,
    totalAssetsCount,
    inboundCount,
    outboundCount,
    maintenanceCount,
    totalValue,
  };
}
