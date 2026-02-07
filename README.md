

A modern, responsive matrimony web application built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Features real-time chat, profile management, and secure authentication.

![ShaadiMart](https://img.shields.io/badge/ShaadiMart-Matrimony-pink)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## 🚀 Features

### 🔐 Authentication & Security

- **JWT-based authentication** with Laravel Sanctum
- **Secure token storage** in HTTP-only cookies
- **Protected routes** with automatic redirects
- **Password change** functionality

### 💬 Real-time Chat System

- **WebSocket-based real-time messaging** using Laravel Reverb
- **Private chat channels** for secure communication
- **Online/offline status** indicators
- **Message read receipts** and typing indicators
- **Optimistic UI updates** for instant messaging

### 👤 Profile Management

- **Multiple profile pictures** with primary selection
- **Plan-based upload limits** (Basic, Premium plans)
- **Drag & drop image upload**
- **Profile picture management** (upload, delete, set primary)

### 🎨 UI/UX Features

- **Fully responsive design** (mobile-first approach)
- **Modern glassmorphism design** with smooth animations
- **Dark/Light mode support** (optional)
- **Accessible components** with proper ARIA labels
- **Loading states** and error handling

## 🛠 Tech Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context + useState/useEffect

### Real-time Communication

- **WebSocket**: Laravel Reverb
- **Client**: Laravel Echo + Pusher protocol

### Backend Integration

- **API**: Laravel 10+ REST API
- **Authentication**: Laravel Sanctum tokens
- **File Storage**: AWS S3 / Local storage

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (Laravel)

### Setup Steps

1. **Clone the repository**

```bash
git clone https://github.com/23-faisal/shadimart-bd.git
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Environment Configuration**
   Create .env.local file:

```bash
# API Configuration
NEXT_PUBLIC_BASE_API=https://api.shaadimartbd.com

# Reverb WebSocket Configuration
NEXT_PUBLIC_REVERB_APP_KEY=w7dvzclayvgljoi25lcp
NEXT_PUBLIC_REVERB_HOST=shaadimartbd.com
NEXT_PUBLIC_REVERB_PORT=443
NEXT_PUBLIC_REVERB_SCHEME=https

# Optional: Feature flags
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_ENABLE_PWA=false
```

### 🏗 Project Structure

```bash
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── chat/              # Chat feature pages
│   ├── profile/           # Profile management
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/UI components
│   ├── chat/             # Chat-specific components
│   └── forms/            # Form components
├── services/             # API service functions
│   ├── auth.ts          # Authentication services
│   ├── chat.ts          # Chat services
│   └── profile-pictures.ts # Profile picture services
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
```

### 🤝 Contributing

Fork the repository

Create feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open Pull Request

### 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details.

### 📞 Support

For support, email a.faisal23r@gmail.com or create an issue in this repository.
