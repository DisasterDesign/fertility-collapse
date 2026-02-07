import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Universe25 from '@/components/Universe25';
import WorldMap from '@/components/WorldMap';
import ClassifierDashboard from '@/components/ClassifierDashboard';
import FeatureExplorer from '@/components/FeatureExplorer';
import CountryProfiles from '@/components/CountryProfiles';
import DeadEnds from '@/components/DeadEnds';
import IsraelAnomaly from '@/components/IsraelAnomaly';
import DruzePuzzle from '@/components/DruzePuzzle';
import UnitedStates from '@/components/UnitedStates';
import AlreadyShrinking from '@/components/AlreadyShrinking';
import PredictionsTable from '@/components/PredictionsTable';
import Closing from '@/components/Closing';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';

const CircleBackground = dynamic(() => import('@/components/CircleBackground'), { ssr: false });

export default function Page() {
  return (
    <main className="relative">
      <CircleBackground />
      <Header />
      <Navigation />
      <Hero />
      <Universe25 />
      <WorldMap />
      <ClassifierDashboard />
      <FeatureExplorer />
      <CountryProfiles />
      <DeadEnds />
      <IsraelAnomaly />
      <DruzePuzzle />
      <UnitedStates />
      <AlreadyShrinking />
      <PredictionsTable />
      <Closing />
    </main>
  );
}
