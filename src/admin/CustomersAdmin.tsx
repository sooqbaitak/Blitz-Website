// BLITZ GAMING — admin: customers derived from order history
import { useMemo } from 'react';
import { Users } from 'lucide-react';
import { useApp } from '../lib/AppContext';
import { SectionTitle, EmptyState } from '../components/ui';
import { fmtPrice, fmtDate } from '../lib/i18n';

export function CustomersAdmin() {
  const { db, lang } = useApp();
  const ar = lang === 'ar';

  const customers = useMemo(() => {
    const map = new Map<string, { name: string; phone: string; email?: string; orders: number; total: number; last: string }>();
    for (const o of db.orders) {
      const key = o.phone.replace(/[\s-]/g, '');
      const cur = map.get(key);
      if (cur) {
        cur.orders += 1; cur.total += o.total;
        if (o.createdAt > cur.last) cur.last = o.createdAt;
        if (!cur.email && o.email) cur.email = o.email;
      } else {
        map.set(key, { name: o.customerName, phone: o.phone, email: o.email, orders: 1, total: o.total, last: o.createdAt });
      }
    }
    return [...map.values()].sort((a, b) => b.total - a.total);
  }, [db.orders]);

  return (
    <div>
      <SectionTitle sub={`${customers.length} ${ar ? 'زبون' : 'customers'}`}>{ar ? 'الزبائن' : 'Customers'}</SectionTitle>
      {customers.length === 0 ? (
        <EmptyState icon={<Users size={34} />} title={ar ? 'لا يوجد زبائن بعد' : 'No customers yet'} hint={ar ? 'يُبنى سجل الزبائن تلقائياً من الطلبات' : 'The customer registry builds automatically from orders'} />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[640px] text-[11.5px]">
            <thead className="bg-panel2 text-[10px] font-bold uppercase tracking-wider text-mute">
              <tr><th className="p-3 text-start">{ar ? 'الزبون' : 'Customer'}</th><th className="p-3 text-start">{ar ? 'الهاتف' : 'Phone'}</th><th className="p-3 text-start">{ar ? 'الطلبات' : 'Orders'}</th><th className="p-3 text-start">{ar ? 'إجمالي الإنفاق' : 'Lifetime value'}</th><th className="p-3 text-start">{ar ? 'آخر طلب' : 'Last order'}</th></tr>
            </thead>
            <tbody className="divide-y divide-line bg-panel">
              {customers.map((c, i) => (
                <tr key={i} className="hover:bg-panel2/60">
                  <td className="p-3"><span className="flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-electric to-violet-accent font-display text-[11px] font-bold text-white">{c.name.charAt(0).toUpperCase()}</span><span><span className="block font-semibold text-white/90">{c.name}</span>{c.email && <span className="text-[9px] text-mute">{c.email}</span>}</span></span></td>
                  <td className="p-3"><a href={`tel:${c.phone}`} className="text-electric hover:text-white">{c.phone}</a></td>
                  <td className="p-3 font-bold">{c.orders}</td>
                  <td className="p-3 font-display font-bold text-emerald-400">{fmtPrice(c.total, lang)}</td>
                  <td className="p-3 text-mute">{fmtDate(c.last, lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
