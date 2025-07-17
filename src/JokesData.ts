export interface Joke {
  id: number;
  question?: string;
  punchline: string;
  category: string;
  rating?: number;
  tags?: string[];
}

const jokesData: Joke[] = [
  {
    id: 1,
    question: "How do computers get drunk?",
    punchline: "They take screenshots.",
    category: "Tech",
    tags: ["computers", "drunk", "screenshot"]
  },
  {
    id: 2,
    question: "Why can't you trust an atom?",
    punchline: "Because they make up everything!",
    category: "Science",
    tags: ["atom", "trust", "chemistry"]
  },
  {
    id: 3,
    question: "Why was the equal sign so humble?",
    punchline: "Because it knew it wasn't less than or greater than anyone.",
    category: "Math",
    tags: ["equal", "humble", "comparison"]
  },
  {
    id: 4,
    question: "Why don't programmers like nature?",
    punchline: "It has too many bugs.",
    category: "Tech",
    tags: ["programmers", "nature", "bugs"]
  },
  {
    id: 5,
    question: "What do you call an educated tube?",
    punchline: "A graduated cylinder.",
    category: "Science",
    tags: ["tube", "educated", "chemistry"]
  },
  {
    id: 6,
    question: "How do you comfort a JavaScript bug?",
    punchline: "You console it.",
    category: "Tech",
    tags: ["javascript", "bug", "console"]
  },
  {
    id: 7,
    question: "Why was the obtuse triangle always so stressed?",
    punchline: "Because it was never right.",
    category: "Math",
    tags: ["triangle", "obtuse", "stressed"]
  },
  {
    id: 8,
    question: "Why do programmers prefer dark mode?",
    punchline: "Because light attracts bugs.",
    category: "Tech",
    tags: ["programmers", "dark mode", "bugs"]
  },
  {
    id: 9,
    question: "How do you fix a broken website?",
    punchline: "With a CSS-tape.",
    category: "Tech",
    tags: ["website", "broken", "css"]
  },
  {
    id: 10,
    question: "Why did the biologist break up with the physicist?",
    punchline: "There was no chemistry.",
    category: "Science",
    tags: ["biologist", "physicist", "chemistry"]
  },
  {
    id: 11,
    question: "What did the DNA say to the other DNA?",
    punchline: "Do these genes make me look fat?",
    category: "Science",
    tags: ["DNA", "genes", "biology"]
  },
  {
    id: 12,
    question: "Why was the math book sad?",
    punchline: "It had too many problems.",
    category: "Math",
    tags: ["math", "book", "problems"]
  },
  {
    id: 13,
    question: "What's a math teacher's favorite sum?",
    punchline: "Summer.",
    category: "Math",
    tags: ["math", "teacher", "sum"]
  },
  {
    id: 14,
    question: "Why don't scientists trust atoms?",
    punchline: "Because they make up everything!",
    category: "Science",
    tags: ["scientists", "atoms", "chemistry"]
  },
  {
    id: 15,
    question: "What do you call a sleeping bull?",
    punchline: "A bulldozer!",
    category: "Random",
    tags: ["bull", "sleeping", "bulldozer"]
  },
  {
    id: 16,
    question: "Why did the developer go broke?",
    punchline: "Because he used up all his cache!",
    category: "Tech",
    tags: ["developer", "broke", "cache"]
  },
  {
    id: 17,
    question: "What's the best thing about Switzerland?",
    punchline: "I don't know, but the flag is a big plus!",
    category: "Random",
    tags: ["switzerland", "flag", "plus"]
  },
  {
    id: 18,
    question: "Why did the scarecrow win an award?",
    punchline: "Because he was outstanding in his field!",
    category: "Random",
    tags: ["scarecrow", "award", "field"]
  },
  {
    id: 19,
    question: "What do you call a fish wearing a crown?",
    punchline: "A king fish!",
    category: "Random",
    tags: ["fish", "crown", "king"]
  },
  {
    id: 20,
    question: "Why don't eggs tell jokes?",
    punchline: "They'd crack each other up!",
    category: "Random",
    tags: ["eggs", "jokes", "crack"]
  },
  {
    id: 21,
    question: "What's a computer's favorite beat?",
    punchline: "An algorithm!",
    category: "Tech",
    tags: ["computer", "beat", "algorithm"]
  },
  {
    id: 22,
    question: "Why was the math book always worried?",
    punchline: "It had too many problems to solve!",
    category: "Math",
    tags: ["math", "book", "worried"]
  },
  {
    id: 23,
    question: "What do you call a lazy kangaroo?",
    punchline: "A pouch potato!",
    category: "Random",
    tags: ["kangaroo", "lazy", "pouch"]
  },
  {
    id: 24,
    question: "Why did the coffee file a police report?",
    punchline: "It got mugged!",
    category: "Random",
    tags: ["coffee", "police", "mugged"]
  },
  {
    id: 25,
    question: "What do you call a bear with no teeth?",
    punchline: "A gummy bear!",
    category: "Random",
    tags: ["bear", "teeth", "gummy"]
  },
  {
    id: 26,
    question: "Why do programmers hate nature?",
    punchline: "It has too many bugs and not enough documentation!",
    category: "Tech",
    tags: ["programmers", "nature", "documentation"]
  },
  {
    id: 27,
    question: "What did the ocean say to the beach?",
    punchline: "Nothing, it just waved!",
    category: "Random",
    tags: ["ocean", "beach", "wave"]
  },
  {
    id: 28,
    question: "Why don't scientists trust stairs?",
    punchline: "Because they're always up to something!",
    category: "Science",
    tags: ["scientists", "stairs", "up"]
  },
  {
    id: 29,
    question: "What's the difference between a fish and a piano?",
    punchline: "You can't tuna fish!",
    category: "Random",
    tags: ["fish", "piano", "tuna"]
  },
  {
    id: 30,
    question: "Why did the bicycle fall over?",
    punchline: "Because it was two tired!",
    category: "Random",
    tags: ["bicycle", "tired", "fall"]
  },
  {
    id: 31,
    question: "What do you call a dinosaur that crashes his car?",
    punchline: "Tyrannosaurus Wrecks!",
    category: "Random",
    tags: ["dinosaur", "car", "crash"]
  },
  {
    id: 32,
    question: "Why don't programmers like to go outside?",
    punchline: "The graphics are great, but the gameplay is terrible!",
    category: "Tech",
    tags: ["programmers", "outside", "graphics"]
  },
  {
    id: 33,
    question: "What do you call a sleeping bull at the computer?",
    punchline: "A bulldozer.exe!",
    category: "Tech",
    tags: ["bull", "computer", "exe"]
  },
  {
    id: 34,
    question: "Why was the robot angry?",
    punchline: "People kept pushing its buttons!",
    category: "Tech",
    tags: ["robot", "angry", "buttons"]
  },
  {
    id: 35,
    question: "What's a skeleton's least favorite room?",
    punchline: "The living room!",
    category: "Random",
    tags: ["skeleton", "room", "living"]
  },
  {
    id: 36,
    question: "Why don't scientists trust molecules?",
    punchline: "Because they make up everything!",
    category: "Science",
    tags: ["scientists", "molecules", "chemistry"]
  },
  {
    id: 37,
    question: "What do you call a fake noodle?",
    punchline: "An impasta!",
    category: "Random",
    tags: ["noodle", "fake", "pasta"]
  },
  {
    id: 38,
    question: "Why did the math teacher break up with the biology teacher?",
    punchline: "There was no chemistry, and they couldn't solve for X!",
    category: "Science",
    tags: ["math", "biology", "chemistry"]
  },
  {
    id: 39,
    question: "What's the best thing about UDP jokes?",
    punchline: "I don't care if you get them or not!",
    category: "Tech",
    tags: ["UDP", "jokes", "protocol"]
  },
  {
    id: 40,
    question: "Why don't calculators ever lie?",
    punchline: "Because they're always rational!",
    category: "Math",
    tags: ["calculators", "lie", "rational"]
  },
  {
    id: 41,
    question: "Why did the INFP break up with the ENTJ?",
    punchline: "Because one was feeling too much and the other was thinking too much!",
    category: "MBTI",
    tags: ["INFP", "ENTJ", "personality"]
  },
  {
    id: 42,
    question: "What's an INTJ's favorite pickup line?",
    punchline: "Are you my appendix? Because I have a gut feeling I should take you out!",
    category: "MBTI",
    tags: ["INTJ", "pickup", "gut feeling"]
  },
  {
    id: 43,
    question: "Why do ENFPs make terrible comedians?",
    punchline: "They get too excited and spoil the punchline!",
    category: "MBTI",
    tags: ["ENFP", "comedian", "excited"]
  },
  {
    id: 44,
    question: "What's an ISTP's favorite type of humor?",
    punchline: "Dry humor - just like their conversations!",
    category: "MBTI",
    tags: ["ISTP", "dry humor", "conversations"]
  },
  {
    id: 45,
    question: "Why don't ESTJs tell jokes?",
    punchline: "Because they're too busy organizing the punchline!",
    category: "MBTI",
    tags: ["ESTJ", "organizing", "efficient"]
  },
  {
    id: 46,
    question: "What did the civil engineer say at the party?",
    punchline: "This place has great structure!",
    category: "Engineering",
    tags: ["civil engineer", "structure", "party"]
  },
  {
    id: 47,
    question: "Why did the electrical engineer break up with the mechanical engineer?",
    punchline: "There was no spark, and they couldn't get their gears turning!",
    category: "Engineering",
    tags: ["electrical", "mechanical", "spark"]
  },
  {
    id: 48,
    question: "What's a software engineer's favorite type of tree?",
    punchline: "A binary tree!",
    category: "Engineering",
    tags: ["software engineer", "binary tree", "data structure"]
  },
  {
    id: 49,
    question: "Why don't aerospace engineers ever get lost?",
    punchline: "Because they always know their trajectory!",
    category: "Engineering",
    tags: ["aerospace", "trajectory", "navigation"]
  },
  {
    id: 50,
    question: "What did the chemical engineer say when the reaction went wrong?",
    punchline: "That's not the solution I was looking for!",
    category: "Engineering",
    tags: ["chemical engineer", "reaction", "solution"]
  },
  {
    id: 51,
    question: "Why did the AI go to therapy?",
    punchline: "It had deep learning issues!",
    category: "AI",
    tags: ["AI", "therapy", "deep learning"]
  },
  {
    id: 52,
    question: "What's an AI's favorite type of music?",
    punchline: "Algo-rhythm!",
    category: "AI",
    tags: ["AI", "music", "algorithm"]
  },
  {
    id: 53,
    question: "Why don't neural networks ever get tired?",
    punchline: "Because they're always well-trained!",
    category: "AI",
    tags: ["neural networks", "training", "machine learning"]
  },
  {
    id: 54,
    question: "What did the chatbot say when it couldn't understand?",
    punchline: "I'm having a natural language processing problem!",
    category: "AI",
    tags: ["chatbot", "NLP", "understanding"]
  },
  {
    id: 55,
    question: "Why was the machine learning model always confident?",
    punchline: "It had high accuracy and low bias!",
    category: "AI",
    tags: ["machine learning", "confidence", "accuracy"]
  },
  {
    id: 56,
    question: "What's the difference between a genius and someone with a high IQ?",
    punchline: "A genius knows when to stop taking IQ tests!",
    category: "IQ",
    tags: ["genius", "IQ test", "intelligence"]
  },
  {
    id: 57,
    question: "Why did the person with 200 IQ fail the driving test?",
    punchline: "They overthought every turn!",
    category: "IQ",
    tags: ["high IQ", "driving test", "overthinking"]
  },
  {
    id: 58,
    question: "What's an intellectual's favorite type of joke?",
    punchline: "A pun - it's the highest form of humor!",
    category: "IQ",
    tags: ["intellectual", "pun", "humor"]
  },
  {
    id: 59,
    question: "Why don't smart people ever get lost?",
    punchline: "They always know where they're going... even when they don't!",
    category: "IQ",
    tags: ["smart people", "lost", "direction"]
  },
  {
    id: 60,
    question: "What did the Mensa member say at the comedy club?",
    punchline: "I get it, but do YOU get that I get it?",
    category: "IQ",
    tags: ["Mensa", "comedy club", "understanding"]
  },
  {
    id: 61,
    question: "Why did the ENFJ become a therapist?",
    punchline: "Because they wanted to help everyone find their type!",
    category: "MBTI",
    tags: ["ENFJ", "therapist", "helping"]
  },
  {
    id: 62,
    question: "What's a structural engineer's favorite dance?",
    punchline: "The beam dance!",
    category: "Engineering",
    tags: ["structural engineer", "beam", "dance"]
  },
  {
    id: 63,
    question: "Why was the AI model always calm?",
    punchline: "It had excellent regularization!",
    category: "AI",
    tags: ["AI model", "calm", "regularization"]
  },
  {
    id: 64,
    question: "What's the smartest type of fish?",
    punchline: "A brain-fish!",
    category: "IQ",
    tags: ["smart", "fish", "brain"]
  },
  {
    id: 65,
    question: "Why don't INTPs finish their jokes?",
    punchline: "They get distracted by analyzing the comedic structure halfway through...",
    category: "MBTI",
    tags: ["INTP", "distracted", "analysis"]
  }
];

export default jokesData;
