export enum QuizCategorie {
	Culture = "Japanese Culture",
	AnimeManga = "Anime/Manga",
	Developer = "Name that publisher!",
	History = "History of Japan",
	Cuisine = "Japanese cuisine",
	Places = "Places"
}

export type Question = {
	question: string,
	choices?: string[],
	answer?: string
}

export const questions: {[key in QuizCategorie]: Question[]} = {
	[QuizCategorie.Culture]: [
		{
			question: "What are the two primary religions in Japan?",
			choices: ["Shinto", "Judaism", "Islam", "Taoism", "Confucianism", "Buddhism"],
			answer: "Shinto and Buddhism"
		},
		{
			question: "A traditional tube-sleeved Japanese coat, usually worn only during festivals is called this:",
			choices: ["Kimono", "Happi", "Hanfu", "Yukata"],
			answer: "Happi"
		},
		{
			question: "Which of the following is NOT a national animal of Japan?",
			choices: ["Green Pheasant", "Koi fish", "Great Purple Emperor butterfly", "Fox"],
			answer: "Fox"
		},
		{
			question: "A genre of texts that focus on issues of Japanese national and cultural identity is called:",
			choices: ["Nihonjinron", "Bakufu", "Sumi-e", "Washi"],
			answer: "Nihonjinron"
		},
		{
			question: "What is Bonsai?",
			choices: [],
			answer: "Bonsai is the Japanese and East Asian art of growing and training miniature trees in containers."
		}
	],
	[QuizCategorie.Places]: [
		{
			question: "What is the largest island of Japan?",
			choices: ["Hokkaido", "Shikoku", "Honshu", "Kyushu"],
			answer: "Honshu at 227,960km squared. Second place is Hokkaido at 83.424km squared"
		},
		{
			question: "In which city can you find the Godzilla Road?",
			choices: ["Nara", "Tokyo", "Nagoya", "Osaka"],
			answer: "Tokyo"
		},
		{
			question: "Which Japanese city has a nickname 'Kitchen Of Japan'",
			choices: ["Kobe", "Osaka", "Fukuoka", "Tokyo"],
			answer: "Osaka"
		},
		{
			question: "Which Japanese city contains Ponto-cho which is a district known for it's geisha",
			choices: ["Kyoto", "Tsushima", "Inuyama", "Inazawa"],
			answer: "Kyoto"
		},
		{
			question: "Which Japanese city is famous for it's lavender fields",
			choices: ["Chita", "Daisen", "Inzai", "Furano"],
			answer: "Furano"
		}
	],
	[QuizCategorie.Cuisine]: [
		{
			question: "Which of the following is NOT a Japanese dish?",
			choices: ["Mochi", "Udon", "Ramen", "Kimchi"],
			answer: "Kimchi is a Korean dish not Japanese"
		},
		{
			question: "Tempura is a typical Japanese dish, but it's origins are based in this country",
			choices: ["Spain", "Portugal", "England", "India"],
			answer: "Portugal"
		},
		{
			question: "What is Kakigori?",
			choices: ["Dessert", "Drink", "Snack", "Soup"],
			answer: "Shaved Ice Dessert"
		},
		{
			question: "What is Shochu?",
			choices: ["Whisky", "Liquor", "Wine", "Coffee"],
			answer: "Liquor(also called Distilled Spirit)"
		},
		{
			question: "Which type of meat is Wagyu?",
			choices: ["Veal", "Mutton", "Pork", "Beef"],
		}

	],
	[QuizCategorie.AnimeManga]: [
		{
			question: "What is Yonkoma?",
			choices: ["Manga Format", "Anime Format"],
			answer: "Manga format, short comic that, as the name suggests, consists of four panels"
		},
		{
			question: "Which manga has the most volumes published?",
			choices: ["Cooking Papa", "Golgo 13", "Hajime No Ippo", "Dokaben"],
			answer: "Golgo 13 is a thriller manga published in October 1968 with 208 volumes that is still ongoing. Second place goes to Dokaben with 205 volumes"
		},
		{
			question: "Current OnePiece episode count (±5)",
			choices: ["1050", "1060", "1070", "1080"],
			answer: "1070"
		},
		{
			question: "Parents of a small girl are kidnapped and turned into ugly creatures by a witch. What is the name of this anime?",
			choices: [],
			answer: "Spirited Away"
		},
		{
			question: "2 capital G Gamers are transported into another world where they battle supperior species for a chance to play god. What is the name of this anime?",
			choices: [],
			answer: "No Game No Life"
		}
	],
	[QuizCategorie.Developer]: [
		{
			question: "Sexy Parodius",
			choices: ["Konami", "Nintendo", "Sega", "Square Enix"],
			answer: "Konami"
		},
		{
			question: "Devil May Cry",
			choices: ["Konami", "Capcom", "Sega", "Square Enix"],
			answer: "Capcom"
		},
		{
			question: "Puyo Puyo",
			choices: ["Konami", "Capcom", "Sega", "Square Enix"],
			answer: "Sega"
		},
		{
			question: "Dragon Quest",
			choices: ["Taito", "Capcom", "Sega", "Square Enix"],
			answer: "Squar Enix"
		},
		{
			question: "Space Invaders",
			choices: ["Capcom", "Taito", "Sega", "Konami"],
			answer: "Taito"
		}
	],
	[QuizCategorie.History]: [
		{
			question: "Which Emperor decided to move the capital of Japan to Tokyo from Kyoto?",
			choices: ["Emperor Meiji", "Emperor Taisho", "Emperor Komei", "Emperor Showa"],
			answer: "Emperor Meiji in 1889"
		},
		{
			question: "In which century did Japans 200+ year isolation begin?",
			choices: ["14th", "15th", "16th", "17th"],
			answer: "17th century. Starting in 1633 and ending in 1853(under threat of force from America) this isolation lasted for a total of 220 years"
		},
		{
			question: "Which Daimyo disolved the Ashikaga Shogunate?",
			choices: ["Date Tanemune", "Kamei Koremi", "Oda Nobunaga", "Maeda Toshisada"],
			answer: "Oda Nobunaga"
		},
		{
			question: "Who is the first emperor of Japan?",
			choices: ["Emperor Suizei", "Emperor Annei", "Emperor Jimmu", "Emperor Itoku"],
			answer: "Emperor Jimmu which claimed to have descended from the sun goddess Amaterasu"
		},
		{
			question: "In which century was Confucious born?",
			choices: ["7th BC", "6th BC", "5th BC", "4th BC"],
			answer: "6th centure BC. Confucious was born in 551 BC"
		}
	]
}
