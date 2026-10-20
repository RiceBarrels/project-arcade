// Narrow centred column used by every auth page.
export function AuthShell({ title, intro, children }: { title: string; intro?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-black uppercase">{title}</h1>
        {intro && <div className="font-medium">{intro}</div>}
      </div>
      {children}
    </div>
  );
}
