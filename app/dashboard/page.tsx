'use client';

import { BRAND_COLOR } from '../globals';

const REPORT_DATA = {
  recepciones: { atendidas: 142, pendientes: 14 },
  despachos: { atendidos: 89, pendientes: 9 },
  camionesConDemora: 7,
};

const maxR = Math.max(REPORT_DATA.recepciones.atendidas, REPORT_DATA.recepciones.pendientes);
const maxD = Math.max(REPORT_DATA.despachos.atendidos, REPORT_DATA.despachos.pendientes);

function Bar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-slate-600">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6">

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Recepciones</p>
          <p className="text-xl font-bold">{REPORT_DATA.recepciones.atendidas + REPORT_DATA.recepciones.pendientes}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Despachos</p>
          <p className="text-xl font-bold">{REPORT_DATA.despachos.atendidos + REPORT_DATA.despachos.pendientes}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Pendientes</p>
          <p className="text-xl font-bold text-amber-600">
            {REPORT_DATA.recepciones.pendientes + REPORT_DATA.despachos.pendientes}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Camiones con demora</p>
          <p className="text-xl font-bold text-red-600">{REPORT_DATA.camionesConDemora}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold mb-3">Recepciones</h3>
          <div className="space-y-3">
            <Bar label="Atendidas" value={REPORT_DATA.recepciones.atendidas} max={maxR} color={BRAND_COLOR} />
            <Bar label="Pendientes" value={REPORT_DATA.recepciones.pendientes} max={maxR} color="#f59e0b" />
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold mb-3">Despachos</h3>
          <div className="space-y-3">
            <Bar label="Atendidos" value={REPORT_DATA.despachos.atendidos} max={maxD} color="#059669" />
            <Bar label="Pendientes" value={REPORT_DATA.despachos.pendientes} max={maxD} color="#f59e0b" />
          </div>
        </div>
      </div>
    </div>
  );
}