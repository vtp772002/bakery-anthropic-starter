export const dynamic = 'force-dynamic';

type Message = {
	role: 'system' | 'user' | 'assistant';
	content: string;
};

export async function POST(req: Request) {
	try {
		const { messages, model, temperature, top_p, max_tokens }: { messages: Message[]; model?: string; temperature?: number; top_p?: number; max_tokens?: number } = await req.json();
		const apiKey = process.env.LLM_API_KEY || process.env.OPENAI_API_KEY;
		const baseUrl = (process.env.LLM_API_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.openai.com').replace(/\/$/, '');
		const selectedModel = model || process.env.LLM_MODEL || 'gpt-4o-mini';
		const temp = typeof temperature === 'number' ? temperature : 0.2; // keep concise
		const topp = typeof top_p === 'number' ? top_p : 0.9;
		const maxTokens = typeof max_tokens === 'number' ? max_tokens : 256;
		const frequencyPenalty = 0.6; // discourage repetition
		const presencePenalty = 0.1; // slight nudge to avoid meandering
		const stop: string[] = [
			"\n- \n- ", // cut off overly long bullet runs
			"\n\n\n", // excessive spacing
			"Xin vui lòng liên hệ", // trim overuse of fallback
			"Lưu ý:",
		];

		const headers: Record<string, string> = { 'Content-Type': 'application/json', Accept: 'text/event-stream' };
		if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

		const upstream = await fetch(`${baseUrl}/v1/chat/completions`, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				model: selectedModel,
				messages,
				temperature: temp,
				top_p: topp,
				max_tokens: maxTokens,
				frequency_penalty: frequencyPenalty,
				presence_penalty: presencePenalty,
				stop,
				stream: true,
			}),
		});

		if (!upstream.ok || !upstream.body) {
			const text = await upstream.text();
			return new Response(text || 'Upstream error', { status: upstream.status || 500 });
		}

		// Pipe upstream SSE directly to client
		return new Response(upstream.body as any, {
			headers: {
				'Content-Type': 'text/event-stream; charset=utf-8',
				'Cache-Control': 'no-cache, no-transform',
				Connection: 'keep-alive',
			},
		});
	} catch (err: any) {
		return new Response(err?.message || 'Unexpected error', { status: 500 });
	}
}


