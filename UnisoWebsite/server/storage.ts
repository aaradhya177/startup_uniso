import {
  users,
  type User,
  type InsertUser,
  groups,
  type Group,
  type InsertGroup,
  events,
  type Event,
  type InsertEvent,
  internships,
  type Internship,
  type InsertInternship,
  notes,
  type Note,
  type InsertNote,
  questions,
  type Question,
  type InsertQuestion,
  interestCategories,
  type InterestCategory,
  type InsertInterestCategory
} from "@shared/schema";
import { eq, gt, desc } from 'drizzle-orm';
import { db } from './db';

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  
  // Group operations
  getGroup(id: number): Promise<Group | undefined>;
  createGroup(group: InsertGroup): Promise<Group>;
  getAllGroups(): Promise<Group[]>;
  getGroupsByCategory(category: string): Promise<Group[]>;
  
  // Event operations
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  getAllEvents(): Promise<Event[]>;
  getUpcomingEvents(): Promise<Event[]>;
  
  // Internship operations
  getInternship(id: number): Promise<Internship | undefined>;
  createInternship(internship: InsertInternship): Promise<Internship>;
  getAllInternships(): Promise<Internship[]>;
  
  // Notes operations
  getNote(id: number): Promise<Note | undefined>;
  createNote(note: InsertNote): Promise<Note>;
  getNotesByUser(userId: number): Promise<Note[]>;
  getAllNotes(): Promise<Note[]>;
  
  // Question operations
  getQuestion(id: number): Promise<Question | undefined>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  getAllQuestions(): Promise<Question[]>;
  getRecentQuestions(limit: number): Promise<Question[]>;
  
  // Interest category operations
  getInterestCategory(id: number): Promise<InterestCategory | undefined>;
  createInterestCategory(category: InsertInterestCategory): Promise<InterestCategory>;
  getAllInterestCategories(): Promise<InterestCategory[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result.length > 0 ? result[0] : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  }
  
  // Group operations
  async getGroup(id: number): Promise<Group | undefined> {
    const result = await db.select().from(groups).where(eq(groups.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  async createGroup(insertGroup: InsertGroup): Promise<Group> {
    const result = await db.insert(groups).values(insertGroup).returning();
    return result[0];
  }
  
  async getAllGroups(): Promise<Group[]> {
    return db.select().from(groups);
  }
  
  async getGroupsByCategory(category: string): Promise<Group[]> {
    return db.select().from(groups).where(eq(groups.category, category));
  }
  
  // Event operations
  async getEvent(id: number): Promise<Event | undefined> {
    const result = await db.select().from(events).where(eq(events.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const result = await db.insert(events).values(insertEvent).returning();
    return result[0];
  }
  
  async getAllEvents(): Promise<Event[]> {
    return db.select().from(events);
  }
  
  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return db
      .select()
      .from(events)
      .where(gt(events.date, now))
      .orderBy(events.date);
  }
  
  // Internship operations
  async getInternship(id: number): Promise<Internship | undefined> {
    const result = await db.select().from(internships).where(eq(internships.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  async createInternship(insertInternship: InsertInternship): Promise<Internship> {
    const result = await db.insert(internships).values(insertInternship).returning();
    return result[0];
  }
  
  async getAllInternships(): Promise<Internship[]> {
    return db.select().from(internships);
  }
  
  // Notes operations
  async getNote(id: number): Promise<Note | undefined> {
    const result = await db.select().from(notes).where(eq(notes.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  async createNote(insertNote: InsertNote): Promise<Note> {
    const result = await db.insert(notes).values(insertNote).returning();
    return result[0];
  }
  
  async getNotesByUser(userId: number): Promise<Note[]> {
    return db.select().from(notes).where(eq(notes.userId, userId));
  }
  
  async getAllNotes(): Promise<Note[]> {
    return db.select().from(notes);
  }
  
  // Question operations
  async getQuestion(id: number): Promise<Question | undefined> {
    const result = await db.select().from(questions).where(eq(questions.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const result = await db.insert(questions).values(insertQuestion).returning();
    return result[0];
  }
  
  async getAllQuestions(): Promise<Question[]> {
    return db.select().from(questions);
  }
  
  async getRecentQuestions(limit: number): Promise<Question[]> {
    return db
      .select()
      .from(questions)
      .orderBy(desc(questions.createdAt))
      .limit(limit);
  }
  
  // Interest category operations
  async getInterestCategory(id: number): Promise<InterestCategory | undefined> {
    const result = await db.select().from(interestCategories).where(eq(interestCategories.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  async createInterestCategory(insertCategory: InsertInterestCategory): Promise<InterestCategory> {
    const result = await db.insert(interestCategories).values(insertCategory).returning();
    return result[0];
  }
  
  async getAllInterestCategories(): Promise<InterestCategory[]> {
    return db.select().from(interestCategories);
  }

  // Initialize sample data
  async initializeSampleData() {
    try {
      // Check if there are any users
      const existingUsers = await db.select().from(users);
      
      if (existingUsers.length === 0) {
        console.log("No users found, initializing sample data...");
        
        // Add a sample user
        const [user] = await db.insert(users).values({
          username: "aaradhya",
          password: "password123", // In real app, this would be hashed
          fullName: "Aaradhya",
          email: "aaradhya@uniso.edu",
          bio: "Computer Science student with interest in AI and web development.",
          avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Aaradhya"
        }).returning();
        
        console.log("Added sample user:", user);
        
        // Add sample interest categories
        const categoryData = [
          {
            name: "Coding",
            description: "Programming and software development",
            icon: "code",
            groupCount: 32,
            resourceCount: 124
          },
          {
            name: "AI / ML",
            description: "Artificial Intelligence and Machine Learning",
            icon: "brain",
            groupCount: 18,
            resourceCount: 87
          },
          {
            name: "Development",
            description: "Web, mobile and application development",
            icon: "laptop-code",
            groupCount: 26,
            resourceCount: 103
          }
        ];
        
        const categories = await db.insert(interestCategories).values(categoryData).returning();
        console.log(`Added ${categories.length} sample interest categories`);
        
        // Add sample groups
        const groupData = [
          {
            name: "Coding Club",
            description: "Join fellow coding enthusiasts to collaborate on projects and learn new programming languages.",
            category: "Coding",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
            memberCount: 42
          },
          {
            name: "ML Study Group",
            description: "Weekly sessions to discuss machine learning concepts and implement algorithms.",
            category: "AI / ML",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
            memberCount: 28
          }
        ];
        
        const groups = await db.insert(this.groups).values(groupData).returning();
        console.log(`Added ${groups.length} sample groups`);
        
        // Add sample events
        const eventData = [
          {
            title: "Campus Career Fair",
            description: "Over 50 companies recruiting for internships and full-time positions.",
            location: "Student Center",
            date: new Date("2025-06-15T10:00:00"),
            time: "10:00 AM"
          },
          {
            title: "CS Club Workshop",
            description: "Learn about the latest web development frameworks and tools.",
            location: "Computer Lab",
            date: new Date("2025-06-17T15:30:00"),
            time: "3:30 PM"
          }
        ];
        
        const addedEvents = await db.insert(events).values(eventData).returning();
        console.log(`Added ${addedEvents.length} sample events`);
        
        // Add sample internships
        const internshipData = [
          {
            title: "Software Engineering Intern",
            company: "TechCorp",
            description: "Join our team to work on cutting-edge web applications using React and Node.js.",
            location: "San Francisco, CA (Remote)",
            deadline: new Date("2025-07-30")
          },
          {
            title: "Machine Learning Research Intern",
            company: "AI Innovations",
            description: "Help develop and test new machine learning models for computer vision applications.",
            location: "Boston, MA (Hybrid)",
            deadline: new Date("2025-08-15")
          }
        ];
        
        const internships = await db.insert(this.internships).values(internshipData).returning();
        console.log(`Added ${internships.length} sample internships`);
        
        // Add sample questions
        const questionData = [
          {
            title: "When is the final exam schedule released?",
            content: "I need to plan my study schedule for finals. When does the university typically release the final exam schedule?",
            userId: user.id,
            answerCount: 3
          },
          {
            title: "How do I register for summer courses?",
            content: "I want to take some summer courses but don't know the registration process. Can someone help?",
            userId: user.id,
            answerCount: 5
          }
        ];
        
        const questions = await db.insert(this.questions).values(questionData).returning();
        console.log(`Added ${questions.length} sample questions`);
        
        return true;
      } else {
        console.log("Database already has users, skipping sample data initialization");
        return false;
      }
    } catch (error) {
      console.error("Error initializing sample data:", error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();
