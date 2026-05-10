export interface QuizOption {
	text: string;
	score: string;
}

export interface QuizQuestion {
	question: string;
	options: QuizOption[];
}

export const quizData: QuizQuestion[] = [
	{
		question: "What is the biggest roadblock for your business currently?",
		options: [
			{ text: "We aren't getting enough website traffic.", score: "seo" },
			{ text: "We get traffic, but they don't buy or contact us.", score: "web" },
			{ text: "Our internal processes are slow and manual.", score: "consult" },
		],
	},
	{
		question: "How would you describe your current digital presence?",
		options: [
			{
				text: "Outdated. We need a modern look and better technology.",
				score: "web",
			},
			{ text: "Okay, but our competitors are outranking us.", score: "seo" },
			{ text: "Messy. We use too many disconnected tools.", score: "consult" },
		],
	},
	{
		question: "What is your primary goal for the next 6 months?",
		options: [
			{ text: "Increase organic leads and dominate search.", score: "seo" },
			{ text: "Launch a high-converting, fast new website.", score: "web" },
			{
				text: "Streamline operations and map out a long-term strategy.",
				score: "consult",
			},
		],
	},
];

export const resultsMap: Record<string, { title: string; desc: string }> = {
	seo: {
		title: "SEO & Digital Marketing Push",
		desc: "Your primary bottleneck is visibility. We recommend our Organic SEO and Paid Media services to drive high-intent traffic to your business.",
	},
	web: {
		title: "Web Development & CRO",
		desc: "Your current platform is holding you back. We recommend a full website redesign focusing on Conversion Rate Optimization (CRO) and modern web technologies.",
	},
	consult: {
		title: "Growth Roadmap Consultancy",
		desc: "You need strategic alignment. We recommend our Growth Roadmap package to audit your current tech stack, streamline operations, and build a cohesive digital strategy.",
	},
};

export type QuizScores = Record<string, number>;

export function calculateMaxCategory(scores: QuizScores): string {
	let maxCategory = "seo";
	let maxScore = -1;
	for (const [key, value] of Object.entries(scores)) {
		if (value > maxScore) {
			maxScore = value;
			maxCategory = key;
		}
	}
	return maxCategory;
}
