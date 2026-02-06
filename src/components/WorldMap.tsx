'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { geoEqualEarth, geoPath, GeoPermissibleObjects } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import { useContainerWidth, getTfrColor } from '@/lib/hooks';
import { countryByNumericCode } from '@/data/countries';
import { isModernized } from '@/lib/classifier';
import type { Country } from '@/data/countries';
import ScrollReveal from './ScrollReveal';

type ViewMode = 'tfr' | 'predictions' | 'modernized';

export default function WorldMap() {
  const { ref: containerRef, width } = useContainerWidth<HTMLDivElement>();
  const [geoData, setGeoData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('tfr');
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const height = Math.max(width * 0.52, 300);

  useEffect(() => {
    import('world-atlas/countries-110m.json').then((module) => {
      const topology = (module as unknown as { default: Topology<{ countries: GeometryCollection }> }).default || module;
      const topo = topology as Topology<{ countries: GeometryCollection }>;
      const geo = feature(topo, topo.objects.countries);
      setGeoData(geo as unknown as GeoJSON.FeatureCollection);
    }).catch((err) => {
      console.error('Failed to load world map data:', err);
    });
  }, []);

  const { pathGenerator } = useMemo(() => {
    if (!width) return { pathGenerator: null };
    const proj = geoEqualEarth()
      .fitSize([width, height], { type: 'Sphere' } as GeoPermissibleObjects);
    const path = geoPath().projection(proj);
    return { pathGenerator: path };
  }, [width, height]);

  const getFill = useCallback((country: Country | undefined): string => {
    if (!country) return '#1a1a3e';

    if (viewMode === 'tfr') {
      return getTfrColor(country.tfr);
    }
    if (viewMode === 'predictions') {
      const p = country.pCollapse;
      if (p > 0.8) return '#C0392B';
      if (p > 0.6) return '#E67E22';
      if (p > 0.4) return '#F1C40F';
      if (p > 0.2) return '#82E0AA';
      return '#27AE60';
    }
    if (viewMode === 'modernized') {
      const mod = isModernized(country);
      if (mod && country.collapsed) return '#C0392B';
      if (mod && !country.collapsed) return '#27AE60';
      if (!mod && country.collapsed) return '#E67E22';
      return '#4A90D9';
    }
    return '#1a1a3e';
  }, [viewMode]);

  return (
    <section id="world-map" className="py-20 w-full">
      <div className="section-container">
        <ScrollReveal>
          <h2 className="section-title">The Global Picture</h2>
          <p className="section-subtitle">
            A world map colored by fertility rate reveals a stark pattern: the more modernized a country, the fewer children it produces.
          </p>
        </ScrollReveal>

        <div ref={containerRef} className="w-full relative">
          {(!geoData || !width || !pathGenerator) ? (
            <div className="w-full h-[500px] bg-surface/50 rounded-xl animate-pulse flex items-center justify-center">
              <p className="text-muted">Loading world map...</p>
            </div>
          ) : (
            <>
          <div className="flex flex-wrap gap-2 mb-6">
            {([
              { key: 'tfr' as ViewMode, label: 'Fertility Rate (TFR)' },
              { key: 'predictions' as ViewMode, label: 'P(Collapse)' },
              { key: 'modernized' as ViewMode, label: 'Modernization Threshold' },
            ]).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setViewMode(key)}
                className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 ${
                  viewMode === key
                    ? 'bg-accent text-bg border-accent font-medium'
                    : 'border-muted/30 text-muted hover:border-accent/50 hover:text-text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <svg
            width={width}
            height={height}
            className="overflow-visible"
            style={{ background: 'transparent' }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g>
              {geoData.features.map((feat) => {
                const id = String(feat.id);
                const country = countryByNumericCode.get(id);
                const fill = getFill(country);
                const isHovered = hoveredCountry?.numericCode === id;
                const isIsrael = country?.iso3 === 'ISR';

                return (
                  <path
                    key={id}
                    d={pathGenerator(feat.geometry as GeoPermissibleObjects) || ''}
                    fill={fill}
                    stroke={isHovered ? '#E8E6E3' : isIsrael ? '#D4880F' : '#0a0a1a'}
                    strokeWidth={isHovered ? 1.5 : isIsrael ? 1 : 0.3}
                    className="transition-all duration-150 cursor-pointer"
                    opacity={hoveredCountry && !isHovered ? 0.4 : 1}
                    filter={isIsrael ? 'url(#glow)' : undefined}
                    onMouseEnter={() => country && setHoveredCountry(country)}
                    onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setHoveredCountry(null)}
                  />
                );
              })}
            </g>
          </svg>

          {hoveredCountry && (
            <div
              className="fixed z-[100] glass-card p-4 text-sm pointer-events-none min-w-[200px]"
              style={{ left: mousePos.x + 16, top: mousePos.y - 60 }}
            >
              <p className="font-bold text-text-primary text-base">{hoveredCountry.name}</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted">TFR</span>
                  <span className="font-mono text-accent font-bold">{hoveredCountry.tfr.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">P(Collapse)</span>
                  <span className="font-mono">{(hoveredCountry.pCollapse * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Urban</span>
                  <span className="font-mono">{hoveredCountry.urban}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Internet</span>
                  <span className="font-mono">{hoveredCountry.internet}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Status</span>
                  <span className={`font-medium ${hoveredCountry.collapsed ? 'text-danger' : 'text-safe'}`}>
                    {hoveredCountry.collapsed ? 'Collapsed' : 'Surviving'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted">
            {viewMode === 'tfr' && (
              <>
                {[
                  { color: '#8B0000', label: '< 1.0' },
                  { color: '#C0392B', label: '1.0-1.5' },
                  { color: '#E67E22', label: '1.5-2.0' },
                  { color: '#F1C40F', label: '2.0-2.1' },
                  { color: '#82E0AA', label: '2.1-3.0' },
                  { color: '#27AE60', label: '3.0-5.0' },
                  { color: '#1B7A3D', label: '5.0+' },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                    <span>{label}</span>
                  </div>
                ))}
              </>
            )}
            {viewMode === 'predictions' && (
              <>
                {[
                  { color: '#C0392B', label: 'P > 80%' },
                  { color: '#E67E22', label: '60-80%' },
                  { color: '#F1C40F', label: '40-60%' },
                  { color: '#82E0AA', label: '20-40%' },
                  { color: '#27AE60', label: '< 20%' },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                    <span>{label}</span>
                  </div>
                ))}
              </>
            )}
            {viewMode === 'modernized' && (
              <>
                {[
                  { color: '#C0392B', label: 'Modernized + Collapsed' },
                  { color: '#27AE60', label: 'Modernized + Surviving' },
                  { color: '#E67E22', label: 'Not modernized + Collapsed' },
                  { color: '#4A90D9', label: 'Not modernized + Surviving' },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                    <span>{label}</span>
                  </div>
                ))}
              </>
            )}
            <div className="flex items-center gap-1.5 ml-4">
              <div className="w-3 h-3 rounded-sm bg-card border border-muted/30" />
              <span>No data</span>
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </section>
  );
}
