import { type Prompt, type InsertPrompt, type PromptCategory } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getRandomPrompt(category?: PromptCategory): Promise<Prompt>;
  getAllPrompts(): Promise<Prompt[]>;
  getPromptsByCategory(category: PromptCategory): Promise<Prompt[]>;
  createPrompt(prompt: InsertPrompt): Promise<Prompt>;
}

export class MemStorage implements IStorage {
  private prompts: Map<string, Prompt>;

  constructor() {
    this.prompts = new Map();
    this.seedData();
  }

  private seedData() {
    // Curated, witty, intellectual prompts for the Designated Driver improv group
    const seedPrompts: Omit<Prompt, "id" | "createdAt">[] = [
      // Scenarios
      {
        content: "You're a team of Victorian-era food critics who have just discovered that your favorite restaurant has been secretly run by time-traveling teenagers from 2024. React to their 'deconstructed' fish and chips served on a wooden plank.",
        category: "scenarios",
        specialElements: ["Accent: Posh British", "Prop: Magnifying glass"]
      },
      {
        content: "You're wedding planners trying to organize a ceremony for two rival medieval kingdoms, but the only venue available is a laser tag arena that's having a 'Shakespearean Night' theme.",
        category: "scenarios", 
        specialElements: ["Prop: Foam sword", "Line: 'But soft, what light through yonder window breaks?'"]
      },
      {
        content: "You're tech support agents helping famous historical figures troubleshoot their new smart devices. Today's client: Cleopatra trying to set up her Instagram account.",
        category: "scenarios",
        specialElements: ["Accent: Valley Girl", "Prop: Ancient Egyptian headpiece"]
      },
      {
        content: "You're museum curators who've discovered that all the exhibits come alive at night, and they're forming a union to demand better working conditions and dental coverage.",
        category: "scenarios",
        specialElements: ["Prop: Clipboard", "Character trait: Overly bureaucratic"]
      },
      {
        content: "You're contestants on a cooking show where the secret ingredient is always something completely inedible, and today's challenge is making a five-star meal using only office supplies.",
        category: "scenarios",
        specialElements: ["Prop: Stapler", "Line: 'And now for the staple course...'"]
      },
      
      // Characters
      {
        content: "A mime who's just discovered they can actually speak, but only in Shakespearean English, and they're trying to order a complicated coffee drink at a modern café.",
        category: "characters",
        specialElements: ["Gesture: Invisible box motions", "Accent: Elizabethan English"]
      },
      {
        content: "An overly enthusiastic museum docent who believes every exhibit is personally trying to communicate with them, and they're giving a tour to a group of skeptical teenagers.",
        category: "characters", 
        specialElements: ["Prop: Museum badge", "Character trait: Whispers to paintings"]
      },
      {
        content: "A conspiracy theorist who thinks birds are government drones, but secretly loves birdwatching and is struggling with this internal conflict during a nature walk.",
        category: "characters",
        specialElements: ["Prop: Binoculars", "Line: 'That's clearly a surveillance pigeon'"]
      },
      {
        content: "A former child prodigy violinist who now works as a pizza delivery driver and keeps trying to incorporate classical music theory into customer interactions.",
        category: "characters",
        specialElements: ["Prop: Pizza box", "Hum: Beethoven's 9th Symphony"]
      },
      {
        content: "A retired superhero who now teaches preschool and keeps accidentally using their super-strength during normal classroom activities like finger painting.",
        category: "characters",
        specialElements: ["Prop: Safety scissors", "Character trait: Whispers dramatically"]
      },

      // Props & Lines  
      {
        content: "A rubber duck that squeaks in morse code, and you're the only person who can understand it. It has urgent information about tomorrow's weather.",
        category: "props",
        specialElements: ["Sound: Duck squeaks", "Knowledge: Basic morse code"]
      },
      {
        content: "A vintage typewriter that only types in emoji, and you're a serious novelist trying to write the great American novel using it.",
        category: "props",
        specialElements: ["Gesture: Hunt-and-peck typing", "Frustration level: Extreme"]
      },
      {
        content: "A GPS that gives directions to emotional states instead of locations. 'In 200 feet, turn left toward mild anxiety, then proceed straight to existential dread.'",
        category: "props",
        specialElements: ["Voice: Robotic GPS tone", "Line: 'Recalculating... recalculating...'"]
      },
      {
        content: "A magic 8-ball that only gives pretentious philosophical answers like 'The question assumes a binary universe' and 'Causality is but an illusion, my friend.'",
        category: "props", 
        specialElements: ["Gesture: Vigorous shaking", "Tone: Overly intellectual"]
      },
      {
        content: "A doorbell that plays a different classical music piece each time it's pressed, but it's stuck on repeat and won't stop playing Vivaldi's 'Four Seasons' at maximum volume.",
        category: "props",
        specialElements: ["Sound: Doorbell chime", "Volume: Increasingly frustrated"]
      }
    ];

    seedPrompts.forEach(prompt => {
      const id = randomUUID();
      this.prompts.set(id, {
        ...prompt,
        id,
        createdAt: new Date()
      });
    });
  }

  async getRandomPrompt(category?: PromptCategory): Promise<Prompt> {
    const allPrompts = Array.from(this.prompts.values());
    const filteredPrompts = category && category !== 'mixed' 
      ? allPrompts.filter(p => p.category === category)
      : allPrompts;
    
    if (filteredPrompts.length === 0) {
      throw new Error("No prompts found for the specified category");
    }
    
    const randomIndex = Math.floor(Math.random() * filteredPrompts.length);
    return filteredPrompts[randomIndex];
  }

  async getAllPrompts(): Promise<Prompt[]> {
    return Array.from(this.prompts.values());
  }

  async getPromptsByCategory(category: PromptCategory): Promise<Prompt[]> {
    return Array.from(this.prompts.values()).filter(p => p.category === category);
  }

  async createPrompt(insertPrompt: InsertPrompt): Promise<Prompt> {
    const id = randomUUID();
    const prompt: Prompt = { 
      ...insertPrompt, 
      id, 
      createdAt: new Date() 
    };
    this.prompts.set(id, prompt);
    return prompt;
  }
}

export const storage = new MemStorage();
