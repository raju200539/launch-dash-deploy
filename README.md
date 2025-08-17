# DeployBot

A simple full-stack web application that allows you to deploy GitHub repositories to EC2 instances with just a few clicks.

## Features

- **GitHub Integration**: Enter any GitHub repository URL
- **Multiple Deployment Types**: Support for Docker applications and static sites
- **Real-time Deployment Logs**: Watch your deployment progress in a terminal-style interface
- **EC2 SSH Connection**: Automatically connects to your EC2 instance and handles deployment
- **Simple Interface**: Clean, dark-themed UI built with React and TailwindCSS

## How to Deploy

1. Enter your GitHub repository URL
2. Select deployment type (Docker App or Static Site)
3. Click Deploy and watch the real-time logs
4. Get instant success/failure feedback

## Development Setup

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- EC2 instance with SSH access configured

### Local Development

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd deploybot

# Install dependencies
npm install

# Start the development server
npm run dev

# Start the backend server (in a separate terminal)
cd backend
npm install
npm start
```

## Technology Stack

### Frontend
- **React** - Component-based UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **ssh2** - SSH2 client for Node.js

## Configuration

### EC2 Setup
1. Configure your EC2 instance with SSH access
2. Ensure Docker is installed for Docker deployments
3. Set up web server (nginx/apache) for static site deployments
4. Add your SSH key to the backend configuration

### Environment Variables
```sh
# Backend configuration
EC2_HOST=your-ec2-instance-ip
EC2_USER=ubuntu
SSH_KEY_PATH=/path/to/your/ssh/key
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

MIT License - feel free to use this project for your own deployments!
