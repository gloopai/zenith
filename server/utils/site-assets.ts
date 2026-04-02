import { useStorage } from 'nitropack/runtime'

/**
 * Nitro server assets are read via unstorage `getItem`, which runs `destr()` on the value.
 * JSON files therefore arrive as already-parsed objects in production — not as raw strings.
 */
export async function readSiteDataJson<T>(name: string): Promise<T> {
  const storage = useStorage('assets:site-data')
  const raw = await storage.getItem(name)
  if (raw === null || raw === undefined) {
    throw new Error(`Missing site-data asset: ${name}`)
  }
  return raw as T
}

function bytesToUtf8(value: unknown): string {
  if (value === null || value === undefined) {
    throw new Error('Missing asset')
  }
  if (typeof value === 'string') return value
  if (value instanceof Uint8Array) {
    return Buffer.from(value.buffer, value.byteOffset, value.byteLength).toString('utf-8')
  }
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(value)) {
    return value.toString('utf-8')
  }
  throw new Error('Unexpected asset type')
}

export async function listSiteNewsMdFiles(): Promise<string[]> {
  const storage = useStorage('assets:site-news')
  const keys = await storage.getKeys()
  return keys.filter((k) => k.endsWith('.md'))
}

export async function readSiteNewsFile(fileName: string): Promise<string> {
  const storage = useStorage('assets:site-news')
  const raw = await storage.getItem(fileName)
  if (raw === null) {
    throw new Error(`Missing news asset: ${fileName}`)
  }
  return bytesToUtf8(raw)
}
