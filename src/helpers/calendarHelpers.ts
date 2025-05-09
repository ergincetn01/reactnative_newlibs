export function frequency<T>(a: T[], item: T): number {
  const o: Record<string, number> = {};
  a.forEach(x => {
    if (x === item) {
      const key = String(item);
      o[key] = (o[key] || 0) + 1;
    }
  });
  return o[String(item)] || 0;
}
