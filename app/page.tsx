import Stats from "@/features/notfication/components/stats";
import AppointmentList from "./_components/AppointmentList";
import QuickActions from "./_components/QuickActions";
import RecentActivity from "./_components/RecentActivity";
import WelcomeMessage from "./_components/WelcomeMessage";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 gap-2">
      {/* Stats of notifications  */}
      <Stats className="lg:grid-cols-2" />
      <WelcomeMessage />
      <AppointmentList />
      <QuickActions />
      <RecentActivity />
    </div>
  );
}
