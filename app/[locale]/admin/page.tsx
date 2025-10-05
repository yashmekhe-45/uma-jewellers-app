import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <p className="text-gray-600 mt-2">
        Admin dashboard placeholder. Next steps: connect Supabase Auth, roles, price settings and catalogue CRUD.
      </p>

      <ul className="mt-6 list-disc pl-6 text-gray-700">
        <li>Login for Owner and Workshop Manager</li>
        <li>Price settings and manual overrides</li>
        <li>Catalogue management (products, images)</li>
        <li>Banners/announcements</li>
      </ul>

      <div className="mt-6">
        <Link href="https://supabase.com" className="text-brand-gold underline" target="_blank">Set up Supabase</Link>
      </div>
    </div>
  );
}