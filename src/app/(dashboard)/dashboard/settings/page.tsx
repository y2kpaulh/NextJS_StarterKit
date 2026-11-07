import { ProfileSettingsForm } from "@/features/auth";

export default function DashboardSettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          프로필 및 알림 설정
        </h2>
        <p className="text-muted-foreground text-sm">
          계정 기본 정보와 이메일 수신 환경설정을 관리합니다.
        </p>
      </div>

      <ProfileSettingsForm />
    </div>
  );
}
