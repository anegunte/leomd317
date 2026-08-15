'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { ServiceProject, ClubData, DistrictData } from '@/lib/mockData';
import { FileText, Download, Award, ShieldAlert, BarChart2, Star, TrendingUp } from 'lucide-react';
import jsPDF from 'jspdf';
import PageDataLoader from '@/components/PageDataLoader';

export default function Reports() {
  const [projects, setProjects] = useState<ServiceProject[]>([]);
  const [clubs, setClubs] = useState<ClubData[]>([]);
  const [districts, setDistricts] = useState<DistrictData[]>([]);
  const [exporting, setExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, c, d] = await Promise.all([db.getProjects(), db.getClubs(), db.getDistricts()]);
        setProjects(p);
        setClubs(c);
        setDistricts(d);
      } catch (error) {
        console.error('Unable to load report data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Aggregations
  const totalProjects = projects.length;
  const totalBeneficiaries = projects.reduce((acc, p) => acc + (p.impactMetrics.beneficiaries || 0), 0);
  const totalHours = projects.reduce((acc, p) => acc + (p.impactMetrics.volunteerHours || 0), 0);
  const totalSaplings = projects.reduce((acc, p) => acc + (p.impactMetrics.treesPlanted || 0), 0);
  const totalBlood = projects.reduce((acc, p) => acc + (p.impactMetrics.bloodUnits || 0), 0);
  const totalFunds = projects.reduce((acc, p) => acc + (p.impactMetrics.fundsRaised || 0), 0);

  // Compute Top Districts (by projects count)
  const districtPerformance = districts.map(d => {
    const dProjs = projects.filter(p => p.district === d.id);
    const dBenef = dProjs.reduce((acc, p) => acc + (p.impactMetrics.beneficiaries || 0), 0);
    return {
      id: d.id,
      name: d.name.split('(')[0],
      projectsCount: dProjs.length,
      beneficiariesServed: dBenef,
      theme: d.theme
    };
  }).sort((a, b) => b.projectsCount - a.projectsCount);

  // Compute Top Clubs (by projects count)
  const clubPerformance = clubs.map(c => {
    const cProjs = projects.filter(p => p.club === c.name);
    const cBenef = cProjs.reduce((acc, p) => acc + (p.impactMetrics.beneficiaries || 0), 0);
    return {
      name: c.name,
      district: c.districtId,
      projectsCount: cProjs.length,
      beneficiariesServed: cBenef
    };
  }).sort((a, b) => b.projectsCount - a.projectsCount).slice(0, 5); // top 5

  // -------------------------------------------------------------
  // Premium jsPDF Export Engine
  // -------------------------------------------------------------
  const generatePDFReport = () => {
    setExporting(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const goldColor = '#D4AF37';
      const darkColor = '#030714';
      const greyColor = '#555555';

      // -----------------------------------------------------------
      // PAGE 1: COVER PAGE
      // -----------------------------------------------------------
      // Deep blue header block
      doc.setFillColor(3, 7, 20); // #030714
      doc.rect(0, 0, 210, 297, 'F');

      // Decorative border frame
      doc.setDrawColor(212, 175, 55); // Gold
      doc.setLineWidth(1);
      doc.rect(10, 10, 190, 277);

      // Gold stars or accents
      doc.setFont('times', 'bold');
      doc.setFontSize(28);
      doc.setTextColor(212, 175, 55); // Gold
      doc.text("BEYOND BOUNDARIES", 105, 75, { align: "center" });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.text("ANNUAL IMPACT & SERVICE REPORT", 105, 95, { align: "center" });

      // Star separator line
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.5);
      doc.line(75, 105, 135, 105);

      doc.setFont('times', 'italic');
      doc.setFontSize(13);
      doc.setTextColor(212, 175, 55);
      doc.text('"Leading with Purpose. Serving without Limits."', 105, 115, { align: "center" });

      // Metadata block at the bottom
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(255, 255, 255);
      doc.text("LEO MULTIPLE DISTRICT 317", 105, 210, { align: "center" });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(180, 180, 180);
      doc.text("Region: Karnataka & Goa, India", 105, 218, { align: "center" });
      doc.text(`Generated Date: ${new Date().toLocaleDateString()}`, 105, 224, { align: "center" });
      doc.text("Governed under Lions Clubs International", 105, 230, { align: "center" });

      // -----------------------------------------------------------
      // PAGE 2: SERVICE STATISTICS
      // -----------------------------------------------------------
      doc.addPage();
      doc.setFillColor(250, 250, 250); // Light background for readability
      doc.rect(0, 0, 210, 297, 'F');

      // Page frame border
      doc.setDrawColor(230, 230, 230);
      doc.rect(8, 8, 194, 281);

      // Page Title Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(3, 7, 20);
      doc.text("I. EXECUTIVE SUMMARY & IMPACT METRICS", 15, 25);

      // Separator line
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.8);
      doc.line(15, 29, 195, 29);

      // Section paragraphs
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text("This annual report details the aggregated service footprints, leadership achievements, and growth coordinates of Leo Multiple District 317 for the current fiscal term. Under the theme 'Beyond Boundaries,' our membership has coordinated extensive local service actions to address critical challenges in education, healthcare, and urban forestry.", 15, 38, { maxWidth: 180 });

      // Metrics Grid Blocks (drawn as rectangles)
      const renderMetricCard = (label: string, value: string, x: number, y: number) => {
        doc.setFillColor(240, 243, 248);
        doc.setDrawColor(212, 175, 55);
        doc.setLineWidth(0.25);
        doc.rect(x, y, 55, 28, 'DF');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(label, x + 4, y + 8);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(3, 7, 20);
        doc.text(value, x + 4, y + 20);
      };

      // Row 1 Cards
      renderMetricCard("SERVICE PROJECTS", totalProjects.toString(), 15, 65);
      renderMetricCard("BENEFICIARIES REACHED", totalBeneficiaries.toLocaleString(), 77, 65);
      renderMetricCard("VOLUNTEER HOURS", `${totalHours.toLocaleString()} Hrs`, 139, 65);

      // Row 2 Cards
      renderMetricCard("SAPLINGS PLANTED", totalSaplings.toLocaleString(), 15, 100);
      renderMetricCard("BLOOD UNITS COLLECTED", totalBlood.toLocaleString(), 77, 100);
      renderMetricCard("FUNDS MOBILIZED", `INR ${totalFunds.toLocaleString()}`, 139, 100);

      // Sector Focus summary list
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(3, 7, 20);
      doc.text("Active Service Sectors Breakdown", 15, 148);

      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.5);
      doc.line(15, 151, 195, 151);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(80, 80, 80);
      const sectors = [
        "1. Education: Provided textbook kits and logic tools to underprivileged scholars.",
        "2. Healthcare: Accumulated vital blood bank reserves through mega clinical drives.",
        "3. Environment: Promoted urban afforestation and native seedball dispersals.",
        "4. Women Empowerment: Coordinated hygiene distribution and self-defense bootcamps.",
        "5. Disaster Relief: Mobilized rations and dry food support for coastal flood victims."
      ];
      sectors.forEach((sec, index) => {
        doc.text(sec, 18, 160 + (index * 8));
      });

      // Page Footer
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Beyond Boundaries Annual Report | Section 1: Metrics", 15, 282);
      doc.text("Page 2", 195, 282, { align: "right" });

      // -----------------------------------------------------------
      // PAGE 3: LEADER STRATEGIES & RANKINGS
      // -----------------------------------------------------------
      doc.addPage();
      doc.setFillColor(250, 250, 250);
      doc.rect(0, 0, 210, 297, 'F');
      doc.rect(8, 8, 194, 281);

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(3, 7, 20);
      doc.text("II. REGIONAL CABINET PERFORMANCE & RANKINGS", 15, 25);
      doc.line(15, 29, 195, 29);

      // Top Districts
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text("District Contribution Standings", 15, 40);

      // Standings Table header
      doc.setFillColor(3, 7, 20);
      doc.rect(15, 47, 180, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text("District ID", 18, 52.5);
      doc.text("Cabinet Scope", 42, 52.5);
      doc.text("Projects Executed", 112, 52.5);
      doc.text("Beneficiary Reach", 152, 52.5);

      // Standings Table rows
      districtPerformance.forEach((dist, index) => {
        const yPos = 55 + ((index + 1) * 8);
        doc.setFillColor(index % 2 === 0 ? 255 : 243, index % 2 === 0 ? 255 : 246, index % 2 === 0 ? 255 : 250);
        doc.rect(15, yPos - 5, 180, 8, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        doc.text(dist.id, 18, yPos);

        doc.setFont('helvetica', 'normal');
        doc.text(dist.name, 42, yPos);
        doc.text(dist.projectsCount.toString(), 112, yPos);
        doc.text(dist.beneficiariesServed.toLocaleString(), 152, yPos);
      });

      // Top Clubs
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(3, 7, 20);
      doc.text("Top Local Clubs Honors", 15, 142);

      // Clubs table header
      doc.setFillColor(3, 7, 20);
      doc.rect(15, 149, 180, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text("Rank", 18, 154.5);
      doc.text("Leo Club Name", 32, 154.5);
      doc.text("District", 122, 154.5);
      doc.text("Total Projects", 152, 154.5);

      // Clubs rows
      clubPerformance.forEach((club, index) => {
        const yPos = 157 + ((index + 1) * 8);
        doc.setFillColor(index % 2 === 0 ? 255 : 243, index % 2 === 0 ? 255 : 246, index % 2 === 0 ? 255 : 250);
        doc.rect(15, yPos - 5, 180, 8, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        doc.text(`#${index + 1}`, 18, yPos);

        doc.setFont('helvetica', 'normal');
        doc.text(club.name, 32, yPos);
        doc.text(club.district, 122, yPos);
        doc.text(club.projectsCount.toString(), 152, yPos);
      });

      // Core signatures mock
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(3, 7, 20);
      doc.text("Leo Lion A Vaishnavi mjf", 15, 245);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text("Leo Multiple District President", 15, 250);

      doc.setFont('helvetica', 'bold');
      doc.text("Ln. Dr. R. Murugan", 130, 245);
      doc.setFont('helvetica', 'normal');
      doc.text("Lions District Governor & Sponsor", 130, 250);

      // Signature lines
      doc.setDrawColor(180, 180, 180);
      doc.setLineWidth(0.5);
      doc.line(15, 241, 65, 241);
      doc.line(130, 241, 180, 241);

      // Page Footer
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Beyond Boundaries Annual Report | Section 2: Regional Cabinets", 15, 282);
      doc.text("Page 3", 195, 282, { align: "right" });

      // Save document
      doc.save(`LEO_MD317_Annual_Impact_Report_${new Date().getFullYear()}.pdf`);
    } catch (e) {
      console.error(e);
      alert('Error occurred generating the report PDF');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase mb-4">
          Digital <span className="gold-glow-text">Annual Report</span>
        </h1>
        <p className="text-xs tracking-widest uppercase text-silver-primary font-medium">
          Automated Fiscal Impact Consolidation & Print engine
        </p>
      </div>

      {isLoading ? <PageDataLoader variant="wide" label="Compiling service intelligence" /> : <>
      {/* CORE INFO SHEET */}
      <div className="glass-panel rounded-3xl p-8 border border-white/10 mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

        {/* LHS Text descriptor (7 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-gold-primary/10 border border-gold-primary/30 text-[9px] font-bold tracking-widest text-gold-light uppercase">
            <Star size={10} className="text-gold-primary fill-gold-primary" />
            Platform Hidden Gem
          </div>
          <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-wider">
            Automated Impact Report Compiler
          </h2>
          <p className="text-xs text-silver-primary leading-relaxed font-light">
            This module aggregates service coordinates, leadership parameters, and regional growth metrics dynamically. Designed to streamline administrative reporting, it eliminates manual layout compilation and compiles a professional-grade multi-page document compliant with Multiple District audit standards.
          </p>
          <div className="text-xs text-silver-dark flex flex-wrap gap-4 pt-2">
            <span className="flex items-center gap-1.5"><Star size={12} className="text-gold-primary" /> Multi-page Cover Setup</span>
            <span className="flex items-center gap-1.5"><BarChart2 size={12} className="text-gold-primary" /> Aggregated Metrics Graphing</span>
            <span className="flex items-center gap-1.5"><TrendingUp size={12} className="text-gold-primary" /> Standing performance ratings</span>
          </div>
        </div>

        {/* RHS Download CTA widget (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-center items-center p-6 bg-white/3 border border-white/5 rounded-2xl text-center">
          <FileText size={48} className="text-gold-primary mb-4 animate-bounce" style={{ animationDuration: '3s' }} />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Impact Booklet PDF</h4>
          <p className="text-[10px] text-silver-dark max-w-[200px] mb-6">Compiles all local club achievements, hours, and district standings.</p>

          <button
            onClick={generatePDFReport}
            disabled={exporting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-primary to-gold-hover text-bg-deep-space text-xs tracking-widest uppercase font-bold hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300 disabled:opacity-50"
          >
            <Download size={14} />
            {exporting ? 'Compiling PDF...' : 'Export Annual Report'}
          </button>
        </div>

      </div>

      {/* DETAILED STATS SHEETS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* District Standings table (LHS - 7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl border border-white/10 p-6">
          <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
            <h3 className="text-xs tracking-widest uppercase font-bold text-gold-light">
              District Contribution Standings
            </h3>
            <span className="text-[9px] text-silver-dark uppercase font-mono">Current fiscal term</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-silver-primary">
              <thead className="text-[8px] tracking-widest uppercase text-silver-dark border-b border-white/5">
                <tr>
                  <th className="py-2.5">District ID</th>
                  <th className="py-2.5">Territory Scope</th>
                  <th className="py-2.5">Projects</th>
                  <th className="py-2.5 text-right">Beneficiaries</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-light">
                {districtPerformance.map((dist) => (
                  <tr key={dist.id} className="hover:bg-white/2 transition-colors">
                    <td className="py-3 font-semibold text-white">{dist.id}</td>
                    <td className="py-3 text-silver-primary">{dist.name}</td>
                    <td className="py-3 font-mono">{dist.projectsCount}</td>
                    <td className="py-3 text-right font-semibold text-gold-light">{dist.beneficiariesServed.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Local Clubs (RHS - 5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl border border-white/10 p-6">
          <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
            <h3 className="text-xs tracking-widest uppercase font-bold text-gold-light">
              Top Local Clubs Honors
            </h3>
            <span className="text-[9px] text-silver-dark uppercase font-mono">Top Active</span>
          </div>

          <div className="space-y-4">
            {clubPerformance.map((club, index) => (
              <div key={club.name} className="flex justify-between items-center p-3.5 bg-white/3 border border-white/5 rounded-xl hover:border-gold-primary/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-gold-primary/10 border border-gold-primary/25 flex items-center justify-center text-[10px] font-bold text-gold-light">
                    #{index + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{club.name}</h4>
                    <span className="text-[9px] text-silver-dark mt-0.5 block">District {club.district}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-[8px] tracking-widest uppercase text-silver-dark">Projects</span>
                  <span className="text-xs font-bold text-gold-light">{club.projectsCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      </>}

    </div>
  );
}
