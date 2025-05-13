import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Error handling middleware
  const handleError = (err: any, res: any) => {
    console.error(err);
    if (err instanceof ZodError) {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: err.errors 
      });
    }
    
    return res.status(500).json({ 
      message: err.message || "Internal server error" 
    });
  };

  // Users routes
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (err) {
      handleError(err, res);
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      handleError(err, res);
    }
  });

  app.get("/api/current-user", async (req, res) => {
    try {
      // For demo purposes, return the first user (Aaradhya)
      const users = await storage.getAllUsers();
      if (users.length === 0) {
        return res.status(404).json({ message: "No user found" });
      }
      res.json(users[0]);
    } catch (err) {
      handleError(err, res);
    }
  });

  // Groups routes
  app.get("/api/groups", async (req, res) => {
    try {
      const groups = await storage.getAllGroups();
      res.json(groups);
    } catch (err) {
      handleError(err, res);
    }
  });

  app.get("/api/groups/:id", async (req, res) => {
    try {
      const group = await storage.getGroup(parseInt(req.params.id));
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      res.json(group);
    } catch (err) {
      handleError(err, res);
    }
  });

  app.get("/api/groups/category/:category", async (req, res) => {
    try {
      const groups = await storage.getGroupsByCategory(req.params.category);
      res.json(groups);
    } catch (err) {
      handleError(err, res);
    }
  });

  // Events routes
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (err) {
      handleError(err, res);
    }
  });

  app.get("/api/events/upcoming", async (req, res) => {
    try {
      const events = await storage.getUpcomingEvents();
      res.json(events);
    } catch (err) {
      handleError(err, res);
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEvent(parseInt(req.params.id));
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (err) {
      handleError(err, res);
    }
  });

  // Internships routes
  app.get("/api/internships", async (req, res) => {
    try {
      const internships = await storage.getAllInternships();
      res.json(internships);
    } catch (err) {
      handleError(err, res);
    }
  });

  app.get("/api/internships/:id", async (req, res) => {
    try {
      const internship = await storage.getInternship(parseInt(req.params.id));
      if (!internship) {
        return res.status(404).json({ message: "Internship not found" });
      }
      res.json(internship);
    } catch (err) {
      handleError(err, res);
    }
  });

  // Notes routes
  app.get("/api/notes", async (req, res) => {
    try {
      const notes = await storage.getAllNotes();
      res.json(notes);
    } catch (err) {
      handleError(err, res);
    }
  });

  app.get("/api/notes/:id", async (req, res) => {
    try {
      const note = await storage.getNote(parseInt(req.params.id));
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      res.json(note);
    } catch (err) {
      handleError(err, res);
    }
  });

  app.get("/api/notes/user/:userId", async (req, res) => {
    try {
      const notes = await storage.getNotesByUser(parseInt(req.params.userId));
      res.json(notes);
    } catch (err) {
      handleError(err, res);
    }
  });

  // Questions routes
  app.get("/api/questions", async (req, res) => {
    try {
      const questions = await storage.getAllQuestions();
      res.json(questions);
    } catch (err) {
      handleError(err, res);
    }
  });

  app.get("/api/questions/recent/:limit", async (req, res) => {
    try {
      const limit = parseInt(req.params.limit) || 5;
      const questions = await storage.getRecentQuestions(limit);
      res.json(questions);
    } catch (err) {
      handleError(err, res);
    }
  });

  app.get("/api/questions/:id", async (req, res) => {
    try {
      const question = await storage.getQuestion(parseInt(req.params.id));
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json(question);
    } catch (err) {
      handleError(err, res);
    }
  });

  // Interest categories routes
  app.get("/api/interest-categories", async (req, res) => {
    try {
      const categories = await storage.getAllInterestCategories();
      res.json(categories);
    } catch (err) {
      handleError(err, res);
    }
  });

  app.get("/api/interest-categories/:id", async (req, res) => {
    try {
      const category = await storage.getInterestCategory(parseInt(req.params.id));
      if (!category) {
        return res.status(404).json({ message: "Interest category not found" });
      }
      res.json(category);
    } catch (err) {
      handleError(err, res);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
