# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Common Development Tasks

- `yarn dev` - Start development server with Contentlayer dev mode
- `yarn build` - Build the production application
- `yarn serve` - Start production server
- `yarn lint` - Run ESLint with auto-fix
- `yarn rss` - Generate RSS feed (runs automatically after build)

### Content Development

- All blog posts are MDX files in `content/blog/`
- Contentlayer automatically processes content during development
- New blog posts require frontmatter with title, date, author, and other metadata

## Architecture Overview

### Stack & Framework

- **Framework**: Next.js 14 with App Router
- **Content**: MDX with Contentlayer for content management
- **Styling**: Tailwind CSS with custom typography plugin
- **Language**: TypeScript
- **Deployment**: Vercel (configured for this project)

### Key Directories

- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `content/` - MDX content and site metadata
- `lib/` - Utility functions and helpers
- `types/` - TypeScript type definitions
- `scripts/` - Build and utility scripts

### Content Architecture

- **Blog Posts**: MDX files in `content/blog/` with frontmatter
- **Authors**: MDX files in `content/authors/`
- **Content Processing**: Contentlayer transforms MDX to TypeScript types
- **RSS Generation**: Automated script generates RSS feed from blog posts
- **Table of Contents**: Auto-generated from MDX headings

### Component Structure

- **Layouts**: Main layout system in `components/layouts/`
- **MDX Components**: Custom components for MDX rendering in `components/MDXComponents.tsx`
- **Specialized Components**:
  - `Spotify/` - Music integration components
  - `Projects/` - Project showcase components
  - `Work/` - Work experience components
  - `CommandPalette/` - Search command palette

### Styling System

- **Theme**: Dark mode support with class-based toggling
- **Typography**: Custom Tailwind typography plugin for content styling
- **Colors**: Custom color palette with primary green theme
- **Responsive**: Mobile-first responsive design

### Data Flow

1. Contentlayer processes MDX files → generates TypeScript types
2. App Router pages fetch data from generated content
3. Components render content with MDX components
4. Layout system provides consistent structure

### Key Features

- **Blog System**: Full-featured blog with tags, pagination, RSS
- **Search**: Command palette for content search
- **Spotify Integration**: Real-time music display
- **3D Graphics**: Three.js integration for visual effects
- **Comments**: Giscus integration for blog comments
- **Analytics**: Vercel Analytics and LogRocket integration

### TypeScript Path Aliases

- `@/components/*` → `components/*`
- `@/content/*` → `content/*`
- `@/layouts/*` → `components/layouts/*`
- `@/lib/*` → `lib/*`
- `@/css/*` → `css/*`
- `@/types/*` → `types/*`
- `contentlayer/generated` → `./.contentlayer/generated`

### Environment Variables

- `SPOTIFY_REFRESH_TOKEN`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_CLIENT_ID` - Spotify integration
- Giscus comment system environment variables

### Development Notes

- Contentlayer must run during development (`yarn dev` includes this)
- All new blog posts must follow the MDX frontmatter structure
- Use existing component patterns when adding new features
- TypeScript strict mode is enabled
