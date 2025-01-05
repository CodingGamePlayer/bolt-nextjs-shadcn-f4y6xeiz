import { ContactHero } from "./components/contact-hero";
import { InfoSection } from "./components/info-section";
import { ContactForm } from "./components/contact-form";
import { Card } from "@/components/ui/card";
import { KakaoMap } from "@/components/map/kakao-map";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero />

      <div className="container mx-auto px-4 py-16">
        <InfoSection />

        <div className="mt-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">예약 문의하기</h2>
            <ContactForm />
          </Card>
        </div>

        <div className="mt-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">오시는 길</h2>
            <div className="space-y-4">
              <KakaoMap />
              <div className="text-gray-600">
                <p>주소: 광주광역시 북구 양일로 307 (일곡동 840-2)</p>
                <p>전화: 062-369-2075</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
