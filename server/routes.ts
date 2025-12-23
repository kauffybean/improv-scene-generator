import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { categories } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get random prompt, optionally filtered by category
  app.get("/api/prompts/random", async (req, res) => {
    try {
      const { category } = req.query;
      const categoryParam = category && typeof category === 'string' && categories.includes(category as any)
        ? category as typeof categories[number]
        : undefined;
      
      const prompt = await storage.getRandomPrompt(categoryParam);
      res.json(prompt);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch random prompt" });
    }
  });

  // Get all prompts
  app.get("/api/prompts", async (req, res) => {
    try {
      const prompts = await storage.getAllPrompts();
      res.json(prompts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prompts" });
    }
  });

  // Get prompts by category
  app.get("/api/prompts/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      
      if (!categories.includes(category as any)) {
        return res.status(400).json({ message: "Invalid category" });
      }
      
      const prompts = await storage.getPromptsByCategory(category as typeof categories[number]);
      res.json(prompts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prompts by category" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
