"use client"
import React from 'react';
// import AdvisoryBoardSection from '../components/about/AdvisoryBoardSection';
// import TeamSection from '../components/about/TeamSection';
import HistoryTimeline from '../components/about/HistoryTimeline';
import IntroSection from '../components/home/IntroSection';
import HeroBanner from '../components/home/HeroBanner';
export default function AboutPage() {
  return (
    <>
      <main className="overflow-hidden">
        {/* Hero Banner with Parallax and Animation Effects */}
       
        <HeroBanner />
        <IntroSection/>
        <HistoryTimeline />
      </main>
    </>
  );
}