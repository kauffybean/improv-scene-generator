# Overview

This is a full-stack web application for the Designated Driver improv group that generates creative prompts for improv performances. The application provides curated prompts across different categories (scenarios, characters, props, and mixed) to help improvisers practice and perform. Built with a modern React frontend and Express backend, it features an elegant UI with animations and a responsive design optimized for both desktop and mobile use.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with CSS custom properties for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth page transitions and interactive animations
- **Form Handling**: React Hook Form with Zod validation resolvers

## Backend Architecture  
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API with endpoints for fetching prompts by category or random selection
- **Data Layer**: Drizzle ORM with PostgreSQL for type-safe database operations
- **Development**: Hot reload with Vite integration for seamless full-stack development
- **Build System**: ESBuild for production bundling with tree-shaking optimization

## Data Storage
- **Database**: PostgreSQL with Drizzle ORM for schema management and migrations
- **Schema Design**: Simple prompts table with categories, content, and optional special elements array
- **Connection**: Neon Database serverless PostgreSQL for cloud hosting
- **Development Storage**: In-memory storage implementation for development and testing

## Authentication & Authorization
- **Current State**: No authentication system implemented - public access to all prompt content
- **Session Management**: Basic Express session setup present but not actively used
- **Future Considerations**: Could easily add authentication for prompt creation/management features

## External Dependencies
- **Database Hosting**: Neon Database (@neondatabase/serverless) for managed PostgreSQL
- **UI Components**: Radix UI primitives for accessible headless components
- **Styling**: Tailwind CSS ecosystem including typography and animation plugins
- **Development**: Replit integration with runtime error overlay and cartographer for enhanced development experience
- **Fonts**: Google Fonts integration (Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **Icons**: Lucide React for consistent iconography throughout the application