# Contributing to CONTEXTOS

Thank you for your interest in contributing to CONTEXTOS! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-task-mgmt.git
   cd ai-task-mgmt
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8002
```

### Frontend
```bash
npm install
npm run dev
```

## Code Style

- **Python**: Follow PEP 8 (use `black` for formatting)
- **JavaScript/React**: Follow ESLint rules configured in `eslint.config.js`
- **Commit messages**: Be descriptive and concise

### Format Code Before Committing
```bash
# Backend
cd backend
black app/

# Frontend
npm run lint
```

## Making Changes

1. **Create models/routes** in the appropriate backend files
2. **Update components** in the frontend as needed
3. **Test your changes** thoroughly
4. **Update documentation** if adding new features
5. **Commit with clear messages**:
   ```bash
   git commit -m "feat: add new feature description"
   git commit -m "fix: resolve issue with feature"
   ```

## Testing

- Test all new endpoints with provided test workflow
- Verify data persists in database
- Check for CORS errors in browser console
- Test on different screen sizes for responsive design

## Pull Request Process

1. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
2. **Create a Pull Request** on GitHub with:
   - Clear description of changes
   - Reference to related issues (if any)
   - Screenshots for UI changes
3. **Wait for review** and address feedback
4. **Merge** after approval

## Reporting Issues

When reporting bugs, include:
- Description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/logs if applicable
- Environment info (OS, Python/Node versions)

## Feature Requests

- Describe the feature and use case
- Explain why it would be beneficial
- Provide any relevant examples

## Questions?

- Check existing documentation in `README.md` and `QUICK_START.md`
- Review the `PRODUCTION_IMPLEMENTATION_SUMMARY.md` for architecture details
- Open an issue if you need clarification

---

Thank you for contributing! 🎉
