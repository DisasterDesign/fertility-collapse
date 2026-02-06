'use client';

import { useState, useMemo } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Cell, Label
} from 'recharts';
import { countries, regionColors } from '@/data/countries';
import type { Country } from '@/data/countries';

type AxisField = 'tfr' | 'pCollapse' | 'urban' | 'internet' | 'edu' | 'gdp' | 'wlfp' | 'fight' | 'gini';

const AXIS_OPTIONS: { key: AxisField; label: string }[] = [
  { key: 'pCollapse', label: 'P(Collapse)' },
  { key: 'tfr', label: 'TFR (2024)' },
  { key: 'urban', label: 'Urbanization %' },
  { key: 'internet', label: 'Internet %' },
  { key: 'edu', label: 'Education (years)' },
  { key: 'gdp', label: 'GDP per Capita' },
  { key: 'wlfp', label: 'Women in Labor Force %' },
  { key: 'fight', label: 'Fight for Country %' },
  { key: 'gini', label: 'Gini Index' },
];

interface CountryScatterProps {
  defaultX?: AxisField;
  defaultY?: AxisField;
  showAxisSelector?: boolean;
  height?: number;
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: Country }> }) => {
  if (!active || !payload?.[0]) return null;
  const c = payload[0].payload;
  return (
    <div className="glass-card p-3 text-sm">
      <p className="font-bold text-text-primary">{c.name}</p>
      <p className="text-muted">TFR: <span className="font-mono text-accent">{c.tfr.toFixed(2)}</span></p>
      <p className="text-muted">P(Collapse): <span className="font-mono">{(c.pCollapse * 100).toFixed(0)}%</span></p>
      <p className="text-muted">Region: <span className="text-text-primary">{c.region}</span></p>
    </div>
  );
};

export default function CountryScatter({
  defaultX = 'pCollapse',
  defaultY = 'tfr',
  showAxisSelector = true,
  height = 500,
}: CountryScatterProps) {
  const [xAxis, setXAxis] = useState<AxisField>(defaultX);
  const [yAxis, setYAxis] = useState<AxisField>(defaultY);

  const data = useMemo(() => {
    return countries.map(c => ({
      ...c,
      x: c[xAxis] as number,
      y: c[yAxis] as number,
    }));
  }, [xAxis, yAxis]);

  const xLabel = AXIS_OPTIONS.find(o => o.key === xAxis)?.label || xAxis;
  const yLabel = AXIS_OPTIONS.find(o => o.key === yAxis)?.label || yAxis;

  return (
    <div className="w-full">
      {showAxisSelector && (
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-muted text-sm">X:</span>
            <select
              value={xAxis}
              onChange={(e) => setXAxis(e.target.value as AxisField)}
              className="bg-card border border-muted/30 rounded-lg px-3 py-1.5 text-sm text-text-primary focus:border-accent outline-none"
            >
              {AXIS_OPTIONS.map(o => (
                <option key={o.key} value={o.key}>{o.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted text-sm">Y:</span>
            <select
              value={yAxis}
              onChange={(e) => setYAxis(e.target.value as AxisField)}
              className="bg-card border border-muted/30 rounded-lg px-3 py-1.5 text-sm text-text-primary focus:border-accent outline-none"
            >
              {AXIS_OPTIONS.map(o => (
                <option key={o.key} value={o.key}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a1a3e" />
          <XAxis
            type="number"
            dataKey="x"
            name={xLabel}
            tick={{ fill: '#888899', fontSize: 12 }}
            stroke="#333355"
          >
            <Label value={xLabel} position="bottom" offset={20} fill="#888899" fontSize={13} />
          </XAxis>
          <YAxis
            type="number"
            dataKey="y"
            name={yLabel}
            tick={{ fill: '#888899', fontSize: 12 }}
            stroke="#333355"
          >
            <Label value={yLabel} angle={-90} position="insideLeft" offset={-5} fill="#888899" fontSize={13} />
          </YAxis>
          {yAxis === 'tfr' && (
            <ReferenceLine
              y={2.1}
              stroke="#F1C40F"
              strokeDasharray="8 4"
              strokeWidth={1.5}
              label={{ value: 'Replacement (2.1)', fill: '#F1C40F', fontSize: 11, position: 'right' }}
            />
          )}
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Scatter data={data} fillOpacity={0.85}>
            {data.map((entry, index) => {
              const isIsrael = entry.iso3 === 'ISR';
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={isIsrael ? '#D4880F' : regionColors[entry.region] || '#888899'}
                  stroke={isIsrael ? '#E8E6E3' : 'transparent'}
                  strokeWidth={isIsrael ? 2 : 0}
                  r={isIsrael ? 8 : 5}
                />
              );
            })}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {Object.entries(regionColors).map(([region, color]) => (
          <div key={region} className="flex items-center gap-1.5 text-xs text-muted">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span>{region}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5 text-xs text-accent font-medium">
          <div className="w-2.5 h-2.5 rounded-full bg-accent border border-white/50" />
          <span>Israel (anomaly)</span>
        </div>
      </div>
    </div>
  );
}
