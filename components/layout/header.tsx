"use client";

import { useAuth } from "@/app/providers/auth-provider";
import { useHeader } from "@/app/providers/header-provider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar, LogIn, LogOut, Menu, MoreVertical, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoginDialog } from "./dialogs/login-dialog";
import { NonMemberDialog } from "./dialogs/non-member-dialog";
import { ReservationDialog } from "./dialogs/reservation-dialog";
import { UserMenuDialog } from "./dialogs/user-menu-dialog";
import { signOut, useSession } from "next-auth/react";

const navigation = [
  { name: "인사말", href: "/about" },
  {
    name: "질병정보",
    href: "/diseases",
    items: [
      { name: "이명", href: "/diseases/tinnitus" },
      { name: "돌발성난청", href: "/diseases/sudden-hearing-loss" },
      { name: "어지럼증", href: "/diseases/dizziness" },
      { name: "이석증", href: "/diseases/bppv" },
      { name: "메니에르", href: "/diseases/meniere" },
      { name: "전정신경염", href: "/diseases/vestibular-neuritis" },
      { name: "귀먹먹함", href: "/diseases/ear-fullness" },
      { name: "두통", href: "/diseases/headache" },
    ],
  },
  { name: "진료안내", href: "/services" },
  { name: "비급여안내", href: "/non-covered" },
  { name: "시설안내", href: "/facilities" },
  { name: "예약문의", href: "/contact" },
];

// 예시 예약 데이터
const sampleReservations = [
  {
    id: 1,
    date: new Date(2024, 1, 15, 14, 30),
    department: "이명클리닉",
    status: "예약확정",
    patientName: "홍길동",
    phone: "010-1234-5678",
    symptoms: "이명 증상이 있습니다. 특히 밤에 심해집니다.",
  },
  {
    id: 2,
    date: new Date(2024, 1, 20, 11, 0),
    department: "어지럼증클리닉",
    status: "대기중",
    patientName: "김철수",
    phone: "010-1234-5678",
    symptoms: "어지러움이 심하고 구토 증상도 있습니다.",
  },
  {
    id: 3,
    date: new Date(2024, 1, 10, 15, 30),
    department: "난청클리닉",
    status: "진료완료",
    patientName: "이영희",
    phone: "010-9876-5432",
    symptoms: "갑자기 한쪽 귀의 청력이 떨어졌습니다.",
  },
  {
    id: 4,
    date: new Date(2024, 1, 25, 10, 0),
    department: "이석증클리닉",
    status: "예약확정",
    patientName: "박지민",
    phone: "010-9876-5432",
    symptoms: "누울 때마다 어지럽고 속이 좋지 않습니다.",
  },
  {
    id: 5,
    date: new Date(2024, 1, 18, 16, 30),
    department: "메니에르클리닉",
    status: "대기중",
    patientName: "최수진",
    phone: "010-5555-4444",
    symptoms: "어지럽고 귀가 먹먹하며 이명도 있습니다.",
  },
  {
    id: 6,
    date: new Date(2024, 1, 5, 9, 30),
    department: "두통클리닉",
    status: "진료완료",
    patientName: "강민수",
    phone: "010-5555-4444",
    symptoms: "만성 두통이 있으며 목도 아픕니다.",
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showReservations, setShowReservations] = useState(false);
  const [showNonMemberDialog, setShowNonMemberDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showUserMenuDialog, setShowUserMenuDialog] = useState(false);
  const [nonMemberPhone, setNonMemberPhone] = useState<string | null>(null);
  const { isHeaderVisible } = useHeader();
  const { data: session, status } = useSession();
  const { toast } = useToast();

  useEffect(() => {
    console.log("[SESSION_STATUS]", { session, status });
  }, [session, status]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showLoginDialog || showNonMemberDialog || showReservations) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showLoginDialog, showNonMemberDialog, showReservations]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (!isHeaderVisible) return null;

  return (
    <>
      <div id="naverIdLogin" className="hidden" />

      <ReservationDialog
        open={showReservations}
        onOpenChange={setShowReservations}
        showNonMemberDialog={() => {
          setShowNonMemberDialog(true);
          setShowReservations(false);
        }}
        nonMemberPhone={nonMemberPhone}
        sampleReservations={sampleReservations}
      />

      <NonMemberDialog
        open={showNonMemberDialog}
        onOpenChange={setShowNonMemberDialog}
        onSuccess={(phone) => {
          setNonMemberPhone(phone);
          setShowReservations(true);
        }}
      />

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />

      <UserMenuDialog open={showUserMenuDialog} onOpenChange={setShowUserMenuDialog} />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/70 backdrop-blur-md shadow-sm" : "bg-white shadow-sm"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image src="/logo.png" alt="소리청 일곡에스한방병원 로고" width={150} height={40} className="object-contain" priority />
              </Link>
            </div>

            {/* Desktop Navigation (lg 이상) */}
            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="nav-link">
                  {item.name}
                </Link>
              ))}
              {status === "authenticated" ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowReservations(true)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    예약내역
                  </button>
                  <div className="h-4 w-px bg-gray-300" />
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    로그아웃
                  </button>
                  <div className="h-4 w-px bg-gray-300" />
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowUserMenuDialog(true)}>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowNonMemberDialog(true)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    예약조회
                  </button>
                  <div className="h-4 w-px bg-gray-300" />
                  <button
                    onClick={() => setShowLoginDialog(true)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <LogIn className="h-4 w-4" />
                    로그인
                  </button>
                </div>
              )}
            </div>

            {/* Mobile & Tablet menu button */}
            <div className="flex lg:hidden">
              <button type="button" className="text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile & Tablet Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {status === "authenticated" ? (
                  <>
                    <button
                      onClick={() => {
                        setShowReservations(true);
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50"
                    >
                      예약내역
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setShowNonMemberDialog(true);
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50"
                    >
                      예약조회
                    </button>
                    <button
                      onClick={() => {
                        setShowLoginDialog(true);
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50"
                    >
                      로그인
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
