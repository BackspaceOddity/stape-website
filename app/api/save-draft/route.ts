import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

/**
 * POST /api/save-draft
 * Saves the array of text edits to _draft-edits.json in the project root.
 * Only active during `npm run dev` — excluded from static export builds.
 */
export async function POST(req: NextRequest) {
  const changes = await req.json();
  const filePath = path.join(process.cwd(), '_draft-edits.json');
  const payload = {
    savedAt: new Date().toISOString(),
    changes,
  };
  await fs.writeFile(filePath, JSON.stringify(payload, null, 2), 'utf-8');
  return NextResponse.json({ ok: true, path: filePath, count: changes.length });
}
