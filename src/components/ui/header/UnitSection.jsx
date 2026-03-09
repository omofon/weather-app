export default function UnitSection({ title, children }) {
  return (
    <section
      className="border-t border-border-dim flex flex-col gap-1"
      role={`${title} nav`}
    >
      <h4 className="mt-1 text-left px-2 text-font-muted text-xs tracking-wide">
        {title}
      </h4>
      {children}
    </section>
  );
}
