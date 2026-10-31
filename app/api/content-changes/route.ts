import fs from 'node:fs';
import path from 'node:path';

export const dynamic = 'force-dynamic';

// MDX is read with fs, so the bundler never sees it change; watch it ourselves in dev
const CONTENT_DIRS = ['app/thoughts/posts', 'app/uses'];

export function GET(request: Request) {
	if (process.env.NODE_ENV !== 'development') {
		return new Response(null, { status: 404 });
	}

	const encoder = new TextEncoder();
	const watchers: fs.FSWatcher[] = [];

	const stream = new ReadableStream({
		start(controller) {
			const notify = (_event: string, filename: string | null) => {
				if (filename && path.extname(filename) !== '.mdx') {
					return;
				}
				controller.enqueue(encoder.encode('data: change\n\n'));
			};

			for (const dir of CONTENT_DIRS) {
				watchers.push(fs.watch(path.join(process.cwd(), dir), notify));
			}

			request.signal.addEventListener('abort', () => {
				for (const watcher of watchers) {
					watcher.close();
				}
				controller.close();
			});
		},
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache, no-transform',
			Connection: 'keep-alive',
		},
	});
}
