import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import FunnelWidget from '../components/Dashboard/FunnelWidget';
import SourcesWidget from '../components/Dashboard/SourcesWidget';
import LeadsTrackingChart from '../components/Dashboard/LeadsTrackingChart';
import LostReasonsWidget from '../components/Dashboard/LostReasonsWidget';
import OtherDataWidget from '../components/Dashboard/OtherDataWidget';

const DashboardOverviewPage: React.FC = () => {
  return (
    <MainAppLayout pageTitle="Dashboard">
      {/* 
        The MainAppLayout's <main> element uses 'flex flex-col gap-6'.
        Each direct child here will be a flex item, stacked vertically with a gap.
      */}

      {/* First row: FunnelWidget and SourcesWidget */}
      {/* This div is a flex item. Inside, widgets are arranged in a grid. */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <div className="lg:col-span-2"> {/* FunnelWidget takes 2/5ths of the width on large screens */}
          <FunnelWidget />
        </div>
        <div className="lg:col-span-3"> {/* SourcesWidget takes 3/5ths of the width on large screens */}
          <SourcesWidget />
        </div>
      </div>

      {/* Second row: LeadsTrackingChart (full width) */}
      {/* This component is a direct flex item and will span the full width available. */}
      <LeadsTrackingChart />

      {/* Third row: LostReasonsWidget and OtherDataWidget */}
      {/* This div is a flex item. Inside, widgets are arranged in a grid. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <LostReasonsWidget />
        <OtherDataWidget />
      </div>
    </MainAppLayout>
  );
};

export default DashboardOverviewPage;
