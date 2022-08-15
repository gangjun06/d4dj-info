export const TextFormat = ({ children }: { children: string }) => {
  return (
    <div className="text-slate-600">
      {children.split('\n').map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  )
}
