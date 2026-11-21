export default function PageHead({ title, children }) {
  return (
    <div className="pagehead">
      <div className="wrap">
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </div>
    </div>
  );
}
