import { spawn } from 'node:child_process';

process.env.PORT ??= '3002';
process.env.BASE_PATH ??= '/';

const child = spawn('pnpm', ['exec', 'vite', '--config', 'vite.config.ts', '--host', '0.0.0.0'], {
  stdio: 'inherit',
  env: process.env,
  shell: process.platform === 'win32',
});

child.on('exit', (code) => process.exit(code ?? 0));
