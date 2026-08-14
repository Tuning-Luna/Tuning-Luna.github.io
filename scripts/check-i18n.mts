/** Dev-time sanity check: en/zh locale keys must match exactly, and every
 *  project description key referenced by the data layer must exist. */
import en from '../src/i18n/locales/en.ts'
import zh from '../src/i18n/locales/zh.ts'
import { courseProjects, featuredProjects } from '../src/data/projects.ts'

function flatten(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = []
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k
    if (typeof v === 'string') keys.push(key)
    else if (v && typeof v === 'object') keys.push(...flatten(v as Record<string, unknown>, key))
  }
  return keys
}

const enKeys = flatten(en as unknown as Record<string, unknown>)
const zhKeys = flatten(zh as unknown as Record<string, unknown>)

console.log(`en keys: ${enKeys.length}, zh keys: ${zhKeys.length}`)
const onlyEn = enKeys.filter((k) => !zhKeys.includes(k))
const onlyZh = zhKeys.filter((k) => !enKeys.includes(k))
console.log(`only in en: [${onlyEn.join(', ')}]`)
console.log(`only in zh: [${onlyZh.join(', ')}]`)

const projectKeys = [...featuredProjects, ...courseProjects].map(
  (p) => `projects.items.${p.id}`,
)
const missing = projectKeys.filter((k) => !enKeys.includes(k) || !zhKeys.includes(k))
console.log(`project description keys checked: ${projectKeys.length}, missing: [${missing.join(', ')}]`)

const ok = onlyEn.length === 0 && onlyZh.length === 0 && missing.length === 0
console.log(ok ? 'RESULT: PASS' : 'RESULT: FAIL')
process.exit(ok ? 0 : 1)
