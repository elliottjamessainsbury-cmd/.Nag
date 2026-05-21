# Setting up the Nag Xcode project

## Prerequisites

- Mac with macOS Ventura (13) or later
- Xcode 15 or later — free from the Mac App Store
- Apple ID — free; no paid developer account needed to run on your own iPhone

---

## Step 1: Create a new Xcode project

1. Open Xcode → **Create New Project**
2. Select **iOS** at the top → choose **App** → Next
3. Fill in:
   - **Product Name:** `Nag`
   - **Team:** your Apple ID (sign in if prompted)
   - **Organization Identifier:** something like `com.yourname.nag`
   - **Interface:** SwiftUI
   - **Storage:** SwiftData
4. Choose where to save it → **Create**

---

## Step 2: Delete Xcode's placeholder files

Xcode generates files you don't need. In the file navigator (left panel), right-click each one and choose **Delete → Move to Trash**:

- `ContentView.swift`
- `Item.swift`

Leave `NagApp.swift` in place — you'll replace its contents in Step 4.

---

## Step 3: Clone this repo and check out the branch

Open **Terminal** (Cmd + Space → type "Terminal"):

```bash
git clone https://github.com/elliottjamessainsbury-cmd/.Nag.git
cd .Nag
git checkout claude/nag-app-prd-1X0J8
```

---

## Step 4: Replace NagApp.swift

1. In the cloned repo, open `Nag/NagApp.swift`
2. Copy all its contents
3. In Xcode, click on `NagApp.swift` in the file navigator
4. Select all (Cmd + A) and paste — replacing the default content

---

## Step 5: Add all source files

In Finder, open the cloned repo and go into the `Nag/` folder. You'll find:

```
Nag/
├── RootView.swift
├── Models/
│   ├── BodyPart.swift
│   ├── IssueStatus.swift
│   ├── Issue.swift
│   ├── UserSettings.swift
│   └── NotificationCopy.swift
├── Views/
│   ├── BodyMap/
│   │   ├── BodyMapView.swift
│   │   ├── BodyIllustrationView.swift
│   │   ├── HeatSpotView.swift
│   │   ├── BodySilhouette.swift
│   │   └── ThemeAreaSectionView.swift
│   ├── AddIssue/
│   │   ├── AddIssueView.swift
│   │   ├── BodyPartPickerView.swift
│   │   └── DescribeIssueView.swift
│   ├── Onboarding/
│   │   ├── OnboardingView.swift
│   │   ├── OnboardingWelcomeView.swift
│   │   ├── OnboardingDisclaimerView.swift
│   │   ├── OnboardingNameView.swift
│   │   ├── OnboardingFirstIssueView.swift
│   │   ├── OnboardingNotificationsView.swift
│   │   └── OnboardingPermissionView.swift
│   └── Sheets/
│       └── IssueDetailSheet.swift
```

In Xcode:

1. Right-click the **Nag** group in the file navigator → **Add Files to “Nag”**
2. Select `RootView.swift` and the `Models/` and `Views/` folders from the cloned repo
3. In the options sheet, make sure:
   - ☑️ **Copy items if needed**
   - ☑️ **Create groups**
   - ☑️ **Nag** target is checked
4. Click **Add**

---

## Step 6: Build and run

- **Cmd + B** to build. Fix any errors before running.
- **Cmd + R** to run in the iOS Simulator.

The app will launch into onboarding on first run. Complete the flow and you'll land on the body map.

---

## Troubleshooting

**"Cannot find type X in scope"**
A file wasn't added to the target. Click the file in the navigator → open the File Inspector (right panel, top icon) → check that **Nag** is ticked under Target Membership.

**"NagApp.swift: multiple @main attributes"**
Xcode still has its old generated `NagApp.swift` content alongside yours. Make sure you replaced (not appended) the file content in Step 4.

**App crashes on launch with SwiftData error**
Delete the app from the Simulator (long-press its icon → Delete App) and run again. This clears any stale SwiftData schema from a previous build.
