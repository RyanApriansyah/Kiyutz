import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Eye,
  FolderPlus,
  MoreHorizontal,
  Package,
  Plus,
  Tags,
} from "lucide-react";

type StatItem = {
  label: string;
  value: string;
  description: string;
  badge: string;
  icon: React.ElementType;
};

type CategoryItem = {
  name: string;
  total: number;
  percentage: number;
};

type ProductItem = {
  name: string;
  category: string;
  price: string;
  status: "Active" | "Draft";
  createdDate: string;
};


const stats: StatItem[] = [
  {
    label: "Total Product",
    value: "63",
    description: "Semua product yang tersedia",
    badge: "+12%",
    icon: Package,
  },
  {
    label: "Total Category",
    value: "8",
    description: "Category product aktif",
    badge: "Stable",
    icon: Tags,
  },
  {
    label: "Product Active",
    value: "58",
    description: "Product sedang tampil",
    badge: "92%",
    icon: CheckCircle2,
  },
  {
    label: "Product Without Category",
    value: "3",
    description: "Butuh dilengkapi category",
    badge: "Check",
    icon: AlertCircle,
  },
];

const categories: CategoryItem[] = [
  {
    name: "Skincare",
    total: 24,
    percentage: 100,
  },
  {
    name: "Makeup",
    total: 18,
    percentage: 75,
  },
  {
    name: "Haircare",
    total: 12,
    percentage: 50,
  },
  {
    name: "Bodycare",
    total: 9,
    percentage: 38,
  },
];

const latestProducts: ProductItem[] = [
  {
    name: "Biji ketapang",
    category: "Makanan Ringan",
    price: "Rp 120.000",
    status: "Active",
    createdDate: "24 Jun 2026",
  },
  {
    name: "Kripik Malay",
    category: "Makanan Ringan",
    price: "Rp 89.000",
    status: "Active",
    createdDate: "23 Jun 2026",
  },
  {
    name: "Kripik Bawang",
    category: "Makanan Ringan",
    price: "Rp 65.000",
    status: "Draft",
    createdDate: "22 Jun 2026",
  },
  {
    name: "Gabus Keju",
    category: "Makanan Ringan",
    price: "Rp 95.000",
    status: "Active",
    createdDate: "21 Jun 2026",
  },
];



export default function DashboardPage() {
  return (
    <section className="min-h-screen bg-[#F8F9FE] p-4 text-[#0B1F33] lg:p-6">
      <div className="mx-auto w-full max-w-[1280px] space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-5 rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)] lg:flex-row lg:items-center lg:justify-between lg:p-6">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-[#B268A7]/10 px-3 py-1 text-xs font-semibold text-[#B268A7]">
              Admin Dashboard
            </div>

            <h1 className="text-2xl font-bold leading-tight text-[#0B1F33] md:text-3xl">
              Dashboard
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6C7095] md:text-base">
              Kelola product dan category Kiyutz dengan lebih mudah.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-5 text-sm font-semibold text-white transition hover:opacity-90">
              <Plus size={18} />
              Tambah Product
            </button>

            <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#B268A7] px-5 text-sm font-semibold text-white transition hover:opacity-90">
              <FolderPlus size={18} />
              Tambah Category
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <StatCard key={item.label} item={item} />
          ))}
        </div>

        {/* Product by Category */}
        <ProductByCategory />

        {/* Latest Products */}
        <LatestProducts />
      </div>
    </section>
  );
}

function StatCard({ item }: { item: StatItem }) {
  const Icon = item.icon;

  return (
    <div className="rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(11,31,51,0.06)] lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8F9FE] text-[#0B1F33]">
          <Icon size={21} />
        </div>

        <span className="rounded-full bg-[#B268A7]/10 px-3 py-1 text-xs font-semibold text-[#B268A7]">
          {item.badge}
        </span>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-[#6C7095]">{item.label}</p>
        <h2 className="mt-2 text-3xl font-bold leading-none text-[#0B1F33]">
          {item.value}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#6C7095]">
          {item.description}
        </p>
      </div>
    </div>
  );
}

function ProductByCategory() {
  return (
    <div className="rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)] lg:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0B1F33]">
            Product by Category
          </h2>
          <p className="mt-1 text-sm text-[#6C7095]">
            Ringkasan jumlah product berdasarkan category.
          </p>
        </div>

        <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#F2F2F2] bg-[#F8F9FE] px-4 text-sm font-semibold text-[#0B1F33] transition hover:bg-[#F2F2F2]">
          View Detail
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="space-y-5">
        {categories.map((item) => (
          <CategoryProgress key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}

function CategoryProgress({ item }: { item: CategoryItem }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#0B1F33]">
            {item.name}
          </p>
          <p className="text-xs text-[#6C7095]">{item.total} products</p>
        </div>

        <span className="shrink-0 rounded-full bg-[#F8F9FE] px-3 py-1 text-xs font-semibold text-[#6C7095]">
          {item.total} Product
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-[#F2F2F2]">
        <div
          className="h-full rounded-full bg-[#B268A7]"
          style={{ width: `${item.percentage}%` }}
        />
      </div>
    </div>
  );
}

function LatestProducts() {
  return (
    <div className="rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)] lg:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0B1F33]">Product Terbaru</h2>
          <p className="mt-1 text-sm text-[#6C7095]">
            Daftar product terbaru yang masuk ke dashboard.
          </p>
        </div>

        <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#F2F2F2] bg-[#F8F9FE] px-4 text-sm font-semibold text-[#0B1F33] transition hover:bg-[#F2F2F2]">
          View All
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-[#F2F2F2] md:block">
        <table className="w-full border-collapse text-left">
          <thead className="bg-[#F8F9FE]">
            <tr>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead align="right">Action</TableHead>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#F2F2F2]">
            {latestProducts.map((product) => (
              <tr key={product.name} className="transition hover:bg-[#F8F9FE]">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8F9FE] text-[#0B1F33]">
                      <Package size={18} />
                    </div>

                    <div>
                      <p className="font-semibold text-[#0B1F33]">
                        {product.name}
                      </p>
                      <p className="text-xs text-[#6C7095]">Product item</p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4 text-sm font-medium text-[#6C7095]">
                  {product.category}
                </td>

                <td className="px-4 py-4 text-sm font-semibold text-[#0B1F33]">
                  {product.price}
                </td>

                <td className="px-4 py-4">
                  <StatusBadge status={product.status} />
                </td>

                <td className="px-4 py-4 text-sm font-medium text-[#6C7095]">
                  {product.createdDate}
                </td>

                <td className="px-4 py-4 text-right">
                  <button className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8F9FE] text-[#6C7095] transition hover:bg-[#F2F2F2] hover:text-[#0B1F33]">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="space-y-3 md:hidden">
        {latestProducts.map((product) => (
          <div
            key={product.name}
            className="rounded-2xl border border-[#F2F2F2] bg-[#F8F9FE] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0B1F33]">
                  <Package size={18} />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold text-[#0B1F33]">
                    {product.name}
                  </p>
                  <p className="mt-1 text-xs text-[#6C7095]">
                    {product.category}
                  </p>
                </div>
              </div>

              <StatusBadge status={product.status} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-white p-3">
              <div>
                <p className="text-xs text-[#6C7095]">Price</p>
                <p className="mt-1 text-sm font-semibold text-[#0B1F33]">
                  {product.price}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#6C7095]">Created</p>
                <p className="mt-1 text-sm font-semibold text-[#0B1F33]">
                  {product.createdDate}
                </p>
              </div>
            </div>

            <button className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-[#0B1F33] transition hover:bg-[#F2F2F2]">
              <Eye size={16} />
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TableHead({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#6C7095] ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function StatusBadge({ status }: { status: ProductItem["status"] }) {
  const isActive = status === "Active";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        isActive
          ? "bg-emerald-50 text-emerald-600"
          : "bg-[#F2F2F2] text-[#6C7095]"
      }`}
    >
      {status}
    </span>
  );
}

