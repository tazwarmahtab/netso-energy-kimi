export function scanClaims(text, file='unknown') {
  const rules = [
    ['discount', /\b(?:30\s*%\s*(?:below|discount|floating)|guaranteed\s+(?:floating\s+)?discount)\b/gi],
    ['ownership', /\bNetso\s+(?:finances|funds|owns)\b/gi],
    ['legal', /\bNetso Energy (?:Limited|Ltd)\b/gi],
  ];
  return rules.flatMap(([rule, regex]) => [...text.matchAll(regex)].map(m => ({rule,file,index:m.index,match:m[0]})));
}
