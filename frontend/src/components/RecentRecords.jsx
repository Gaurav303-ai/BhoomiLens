import {
  CheckCircle2,
  Clock3,
  AlertTriangle,
  MoreHorizontal,
} from "lucide-react";

const records = [
  {
    id: "LR-2026-001284",
    owner: "Ram Prasad",
    village: "Bela",
    khasra: "124/2",
    area: "1.25 ha",
    status: "Verified",
  },
  {
    id: "LR-2026-001283",
    owner: "Sita Devi",
    village: "Lakshmipur",
    khasra: "87/1",
    area: "0.82 ha",
    status: "Pending",
  },
  {
    id: "LR-2026-001282",
    owner: "Raj Kumar",
    village: "Rampur",
    khasra: "212/4",
    area: "2.10 ha",
    status: "Review",
  },
];

const statusConfig = {
  Verified: {
    icon: CheckCircle2,
    style: "bg-emerald-50 text-emerald-700",
  },
  Pending: {
    icon: Clock3,
    style: "bg-orange-50 text-orange-700",
  },
  Review: {
    icon: AlertTriangle,
    style: "bg-red-50 text-red-700",
  },
};

export default function RecentRecords() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-slate-100 p-5">

        <div>
          <h3 className="font-bold">
            Recent Land Records
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Recently processed documents
          </p>
        </div>

        <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
          View all
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[650px] text-left">

          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-4">Record</th>
              <th className="px-5 py-4">Owner</th>
              <th className="px-5 py-4">Location</th>
              <th className="px-5 py-4">Area</th>
              <th className="px-5 py-4">Status</th>
              <th />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">

            {records.map((record) => {

              const config = statusConfig[record.status];
              const Icon = config.icon;

              return (
                <tr
                  key={record.id}
                  className="transition hover:bg-slate-50"
                >

                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold">
                      {record.id}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Khasra {record.khasra}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm font-medium">
                    {record.owner}
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm">
                      {record.village}
                    </p>

                    <p className="text-xs text-slate-400">
                      Uttar Pradesh
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {record.area}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${config.style}`}
                    >
                      <Icon size={13} />
                      {record.status}
                    </span>

                  </td>

                  <td className="px-5 py-4">
                    <button className="rounded-lg p-2 hover:bg-slate-100">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}