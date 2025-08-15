# Merquri Assignment - Note Taking App

A beautiful React Native note-taking application built with TypeScript, featuring categorized notes, gradient UI design, and local storage persistence.

## 📱 Features

- **Note Management**: Create, edit, and delete notes with ease
- **Category Organization**: Organize notes into "Work and Study", "Life", and "Health and Well-being" categories
- **Character Limit**: 200 character limit with real-time character counter
- **Local Storage**: Persistent storage using AsyncStorage
- **Beautiful UI**: Gradient backgrounds, custom icons, and glassmorphism effects
- **Navigation**: Bottom tab navigation with stack navigation for settings
- **Settings Screen**: Manage app settings and bulk delete notes

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18 or higher
- **npm**: Version 9 or higher (comes with Node.js)
- **React Native CLI**: Version 19.0.0
- **Xcode**: Latest version (for iOS development on macOS)
- **Android Studio**: Latest version (for Android development)
- **CocoaPods**: For iOS dependencies (macOS only)

### Environment Setup

1. **Install Node.js and npm**
   ```bash
   # Check your current versions
   node --version  # Should be >=18
   npm --version   # Should be >=9
   ```

2. **Install React Native CLI**
   ```bash
   npm install -g @react-native-community/cli
   ```

3. **For iOS Development (macOS only)**
   ```bash
   # Install CocoaPods
   sudo gem install cocoapods
   
   # Install Ruby bundler
   gem install bundler
   ```

4. **For Android Development**
   - Install Android Studio
   - Set up Android SDK (API Level 33+)
   - Configure ANDROID_HOME environment variable

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MerquriAssignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup (macOS only)**
   ```bash
   # Install Ruby gems
   bundle install
   
   # Install iOS dependencies
   cd ios && bundle exec pod install && cd ..
   ```

4. **Start Metro Server**
   ```bash
   npm start
   ```

5. **Run the application**
   
   **For iOS:**
   ```bash
   npm run ios
   ```
   
   **For Android:**
   ```bash
   npm run android
   ```

## 🛠 Development Environment

### My Local Environment

- **OS**: macOS Darwin 24.6.0
- **Node.js**: v23.2.0
- **npm**: 11.4.1
- **React Native CLI**: 19.0.0
- **Xcode**: Latest version
- **iOS Simulator**: iPhone 16

### Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| React Native | 0.80.0 | Core framework |
| TypeScript | 5.0.4 | Type safety |
| React Navigation | ^7.1.17 | Navigation system |
| Zustand | ^5.0.7 | State management |
| AsyncStorage | ^2.2.0 | Local data persistence |
| Linear Gradient | ^2.8.3 | Gradient backgrounds |
| FontAwesome | ^6.7.2 | Icons |
| React Native SVG | ^15.12.1 | SVG support |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components
│   │   ├── AddNoteModal.tsx
│   │   ├── NoteItem.tsx
│   │   ├── GradientButton.tsx
│   │   └── ...
│   └── index.ts
├── navigation/         # Navigation configuration
│   ├── RootNavigator.tsx
│   ├── TabNavigator.tsx
│   └── types.ts
├── screens/           # Screen components
│   └── home/
│       ├── HomeScreen.tsx
│       ├── SettingScreen.tsx
│       └── ...
├── store/             # State management
│   ├── noteStore.ts
│   └── index.ts
├── assets/            # Static assets
│   ├── icons/
│   └── images/
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## 🎨 App Features Overview

### Home Screen
- Displays notes categorized by type
- Shows latest 3 notes per category
- Tap notes to edit them
- Settings button in header

### Add/Edit Note Modal
- Create new notes or edit existing ones
- Category selection with visual indicators
- 200 character limit with real-time counter
- Form validation

### Settings Screen
- Navigation menu items (Customer Support, User Agreement, etc.)
- Delete all notes functionality with confirmation
- Sticky bottom delete button

### Summary Screen
- Shows note count per category
- Tap "Detail" to view all notes in that category

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro bundler |
| `npm run ios` | Run on iOS simulator |
| `npm run android` | Run on Android emulator |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |

## 🐛 Troubleshooting

### Common Issues

1. **Metro server port conflict**
   ```bash
   # Kill processes on port 8081
   lsof -ti:8081 | xargs kill -9
   ```

2. **iOS build issues**
   ```bash
   # Clean and reinstall pods
   cd ios
   rm -rf Pods Podfile.lock
   bundle exec pod install
   cd ..
   ```

3. **Android build issues**
   ```bash
   # Clean gradle
   cd android
   ./gradlew clean
   cd ..
   ```

4. **Cache issues**
   ```bash
   # Reset Metro cache
   npx react-native start --reset-cache
   ```

### Performance Tips

- **Screen transitions**: Optimized with React.memo and useMemo
- **List rendering**: Efficient note filtering and sorting
- **Memory usage**: Proper component cleanup and state management

## 📝 Notes

- **Character Limit**: Notes are limited to 200 characters
- **Storage**: All data is stored locally using AsyncStorage
- **Categories**: Three predefined categories (not user-customizable)
- **Platform**: Tested on iOS, Android support included

## 🔗 Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [Zustand State Management](https://github.com/pmndrs/zustand)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

## 📱 Screenshots

<div align="center">

### Home Screen
<img src="src/assets/screenshots/Screenshot 2025-08-16 at 06.15.19.png" width="300" alt="Home Screen">

*The main home screen showing categorized notes with latest 3 notes per category*

### Add/Edit Note Modal
<img src="src/assets/screenshots/Screenshot 2025-08-16 at 06.15.22.png" width="300" alt="Add Note Modal">

*Add note modal with category selection and 200-character counter*

### Summary Screen
<img src="src/assets/screenshots/Screenshot 2025-08-16 at 06.15.27.png" width="300" alt="Summary Screen">

*Summary screen showing note counts per category with robot mascot*

### Settings Screen
<img src="src/assets/screenshots/Screenshot 2025-08-16 at 06.15.44.png" width="300" alt="Settings Screen">

*Settings screen with navigation menu and sticky delete button*

</div>

### 🎨 Design Features

The app features a beautiful gradient design with:
- **Purple gradient theme** with glassmorphism effects
- **Custom tab bar** with smooth animations
- **Consistent header styling** across all screens
- **Professional category selection** with color-coded indicators
- **Real-time character counting** with visual feedback
- **Sticky delete button** with proper safe area handling

---

**Built with ❤️ using React Native and TypeScript**