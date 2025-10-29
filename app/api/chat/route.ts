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
		const temp = typeof temperature === 'number' ? temperature : 0.2;
		const topp = typeof top_p === 'number' ? top_p : 0.9;
		const maxTokens = typeof max_tokens === 'number' ? max_tokens : 256;
		const frequencyPenalty = 0.6;
		const presencePenalty = 0.1;
		const stop: string[] = [
			"\n- \n- ",
			"\n\n\n",
			"Xin vui lòng liên hệ",
			"Lưu ý:",
		];

		const headers: Record<string, string> = { 'Content-Type': 'application/json' };
		if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

		const res = await fetch(`${baseUrl}/v1/chat/completions`, {
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
				stream: false,
			}),
		});

		if (!res.ok) {
			const text = await res.text();
			return Response.json({ error: text || 'Upstream error' }, { status: 500 });
		}

		const data = (await res.json()) as any;
		const reply: string = data?.choices?.[0]?.message?.content ?? '';
		return Response.json({ reply });
	} catch (err: any) {
		return Response.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
	}
}


