/**
 * Tiny logger with prefixed levels — quiet enough for CI, structured for
 * humans skimming a build log.
 */

const enc = new TextEncoder();
const STAMP = () => new Date().toISOString().slice(11, 19);

function emit(prefix: string, msg: string): void {
  process.stdout.write(enc.encode(`${STAMP()} ${prefix} ${msg}\n`));
}

export const log = {
  info: (msg: string) => emit("·", msg),
  ok: (msg: string) => emit("✓", msg),
  warn: (msg: string) => emit("!", msg),
  fail: (msg: string) => emit("✗", msg),
};
