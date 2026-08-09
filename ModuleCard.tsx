import React from 'react';
import { ArrowDown } from 'lucide-react';

interface FlowchartNode {
  id: string;
  label: string;
  type: 'start' | 'process' | 'decision' | 'end';
  next?: string;
  nextTrue?: string;
  nextFalse?: string;
}

export const FlowchartViewer: React.FC<{ nodes: FlowchartNode[] }> = ({ nodes }) => {
  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 shadow-md">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
        <h5 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
          <span>📐</span> Diagram Alir (Flowchart Visual Standard)
        </h5>
        <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2.5 py-1 rounded-md">
          {nodes.length} Simbol Diagram
        </span>
      </div>

      <div className="flex flex-col items-center gap-4 py-2">
        {nodes.map((node, index) => {
          return (
            <React.Fragment key={node.id}>
              {/* Render Node Shape */}
              {node.type === 'start' || node.type === 'end' ? (
                // Oval Terminator
                <div className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs rounded-full border border-emerald-400/50 shadow-md shadow-emerald-500/10">
                  {node.label}
                </div>
              ) : node.type === 'process' ? (
                // Rectangle Process
                <div className="w-full max-w-sm px-4 py-3 bg-slate-800/90 text-slate-200 border-2 border-emerald-500/40 rounded-xl text-xs font-medium text-center shadow-xs">
                  {node.label}
                </div>
              ) : (
                // Diamond Decision
                <div className="w-full max-w-xs px-4 py-3 bg-amber-500/10 text-amber-300 border-2 border-amber-400/80 rounded-2xl text-xs font-bold text-center shadow-xs relative">
                  <span className="text-[10px] text-amber-400 block uppercase tracking-wider mb-0.5">Decision [Kondisi]</span>
                  {node.label}
                </div>
              )}

              {/* Connector Arrow */}
              {index < nodes.length - 1 && (
                <div className="flex flex-col items-center text-slate-500 my-0.5">
                  <ArrowDown className="w-4 h-4 text-emerald-500 animate-bounce" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
